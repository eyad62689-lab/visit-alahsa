// توليد نسخ متعددة العرض لكل صورة في public/img + بيان بالعروض المتاحة.
//
// لماذا: كان <picture> يبدّل الصيغة فقط (webp/jpg) بلا أي وصفات عرض، فالجوال
// ينزّل صورة 1600px ليعرضها في فتحة 363px. هذا المولّد يُنشئ نسخاً أصغر،
// ويكتب بياناً يقرأه Photo.astro ليبني srcset.
//
// آمن بالنسبة لقاعدة كسر الكاش: لا يمسّ أي ملف قائم — يضيف أسماء جديدة
// بلاحقة -<w>w فقط، والأصل يبقى كما هو وهو أكبر مرشّح في srcset.
//
// التشغيل: node tools/gen-image-widths.mjs   (تكراره آمن؛ يتخطّى الموجود)
//          node tools/gen-image-widths.mjs --force   (يعيد التوليد)

import sharp from 'sharp'
import { readdir, stat, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname, posix } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const IMG_DIR = join(ROOT, 'public', 'img')
const MANIFEST = join(ROOT, 'src', 'data', 'image-widths.json')

// سلّم العروض: يغطي البطاقات (224-550 نقطة CSS) والهيرو الكامل، مع مضاعفة
// لشاشات 2x. لا يُولَّد عرض يساوي الأصل أو يتجاوزه — لا تكبير إطلاقاً.
const LADDER = [400, 800, 1200, 1600]

const JPEG = { quality: 78, mozjpeg: true, chromaSubsampling: '4:4:4' }
const WEBP = { quality: 76 }

const force = process.argv.includes('--force')

const bytes = (n) => (n < 1024 * 1024 ? `${Math.round(n / 1024)}KB` : `${(n / 1048576).toFixed(1)}MB`)

// مسح تعاودي: صور الثمار والأكلات تقع في public/img/fruits و/food، وكان
// readdir المسطّح يتخطّاها كلّها — 19 صورة ثمار بلا أي srcset، ينزّلها الجوال
// بعرض 1400px ليعرضها في فتحة 358px. المفاتيح مسارات نسبية بفاصل / لتوافق
// srcsetFor في src/lib/images.ts.
async function collect(dir, prefix = '') {
  const out = []
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) out.push(...(await collect(join(dir, ent.name), prefix + ent.name + '/')))
    else if (ent.name.toLowerCase().endsWith('.jpg')) out.push(prefix + ent.name)
  }
  return out
}

async function main() {
  const files = await collect(IMG_DIR)
  // الأصل المرجعي هو ملف jpg؛ لكل واحد نظيرٌ webp بنفس الاسم
  const bases = files
    .map((f) => f.replace(/\.jpg$/i, ''))
    .filter((b) => !/-\d+w$/.test(b)) // لا نولّد من نسخة مولَّدة
    .sort()

  const manifest = {}
  let made = 0
  let skipped = 0
  let addedBytes = 0

  for (const base of bases) {
    const srcJpg = join(IMG_DIR, `${base}.jpg`)
    const srcWebp = join(IMG_DIR, `${base}.webp`)
    const full = (await sharp(srcJpg).metadata()).width
    if (!full) {
      console.warn(`تخطّي ${base}: تعذّرت قراءة العرض`)
      continue
    }
    // الأصلان قد يختلفان في العرض (حُوِّلا في وقتين مختلفين)، ووصفة w في srcset
    // يجب أن تطابق العرض الحقيقي لكل ملف وإلا اختار المتصفح مرشّحاً خاطئاً.
    const fullWebp = existsSync(srcWebp) ? (await sharp(srcWebp).metadata()).width || full : full

    const targets = LADDER.filter((w) => w < Math.min(full, fullWebp))
    manifest[base] = { full, fullWebp, widths: targets }

    for (const w of targets) {
      for (const [ext, opts] of [
        ['jpg', JPEG],
        ['webp', WEBP],
      ]) {
        const out = join(IMG_DIR, `${base}-${w}w.${ext}`)
        if (existsSync(out) && !force) {
          skipped++
          continue
        }
        const pipeline = sharp(srcJpg).resize({ width: w, withoutEnlargement: true })
        await (ext === 'jpg' ? pipeline.jpeg(opts) : pipeline.webp(opts)).toFile(out)
        addedBytes += (await stat(out)).size
        made++
      }
    }
  }

  await mkdir(dirname(MANIFEST), { recursive: true })
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n', 'utf8')

  const withVariants = Object.values(manifest).filter((m) => m.widths.length).length
  console.log(`صور أصلية: ${bases.length} | لها نسخ أصغر: ${withVariants}`)
  console.log(`ملفات مولَّدة: ${made} | متخطّاة (موجودة): ${skipped} | حجم مضاف: ${bytes(addedBytes)}`)
  console.log(`البيان: ${MANIFEST}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
