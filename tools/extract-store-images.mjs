// استخراج صور دليل المتاجر الإلكترونية من ملف الوورد المسلَّم.
//
// الربط صفّاً بصفّ: لكل جدول في الملف، الخلية الأولى (م) تُطابَق مع docx_row في
// src/data/stores-directory.ar.json، وتُقرأ علاقة r:embed من خليتي «صورة المتجر»
// و«الشعار» في الصف نفسه — لا اعتماد على ترتيب ملفات word/media إطلاقاً.
// صفوف الملحق غير المذكورة في JSON تُتجاهل (لا تُستخرج صورها).
//
// المخرج (sharp، لا Pillow — عُرف المشروع):
//   public/img/stores/<image>.jpg + .webp  1200×675، webp جودة 82 (تُخفّض حتى ≤150KB)
//   public/img/stores/<logo>               webp داخل مربع 256×256 (contain، بلا مطّ ولا قص)
// ثم شغّل: node tools/gen-image-widths.mjs  لتوليد عروض 400/800 لبطاقات Photo.astro.
//
// التشغيل: node tools/extract-store-images.mjs "<مسار الملف.docx>"

import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public', 'img', 'stores');
const DATA = join(ROOT, 'src', 'data', 'stores-directory.ar.json');
const MAX_WEBP_BYTES = 150 * 1024;

const docxPath = process.argv[2];
if (!docxPath) { console.error('الاستعمال: node tools/extract-store-images.mjs <file.docx>'); process.exit(1); }

// ── قارئ zip بسيط (المجلد المركزي) — يكفي لملفات docx (deflate أو مخزَّن) ──
function readZip(buf) {
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) throw new Error('ليس ملف zip');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let i = 0; i < count; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('مجلد مركزي تالف');
    const method = buf.readUInt16LE(p + 10);
    const csize = buf.readUInt32LE(p + 20);
    const nlen = buf.readUInt16LE(p + 28);
    const elen = buf.readUInt16LE(p + 30);
    const clen = buf.readUInt16LE(p + 32);
    const lho = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    entries.set(name, { method, csize, lho });
    p += 46 + nlen + elen + clen;
  }
  return (name) => {
    const e = entries.get(name);
    if (!e) return null;
    const nlen = buf.readUInt16LE(e.lho + 26);
    const elen = buf.readUInt16LE(e.lho + 28);
    const start = e.lho + 30 + nlen + elen;
    const raw = buf.subarray(start, start + e.csize);
    return e.method === 8 ? inflateRawSync(raw) : Buffer.from(raw);
  };
}

const xmlText = (s) => s
  .replace(/<w:tab\/>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .trim();

async function main() {
  const zip = readZip(await readFile(docxPath));
  const doc = zip('word/document.xml').toString('utf8');
  const rels = zip('word/_rels/document.xml.rels').toString('utf8');
  const relMap = new Map();
  for (const m of rels.matchAll(/<Relationship\b[^>]*>/g)) {
    const id = /Id="([^"]+)"/.exec(m[0])?.[1];
    const target = /Target="([^"]+)"/.exec(m[0])?.[1];
    if (id && target) relMap.set(id, target);
  }

  // خريطة م → {screenshot, logo} من كل الجداول
  const rows = new Map();
  for (const tbl of doc.matchAll(/<w:tbl>[\s\S]*?<\/w:tbl>/g)) {
    for (const tr of tbl[0].matchAll(/<w:tr[ >][\s\S]*?<\/w:tr>/g)) {
      const cells = [...tr[0].matchAll(/<w:tc>[\s\S]*?<\/w:tc>/g)].map((c) => c[0]);
      if (cells.length < 8) continue;
      const key = xmlText(cells[0]).replace(/\s+/g, '');
      const embed = (cell) => {
        const rid = /r:embed="([^"]+)"/.exec(cell)?.[1];
        return rid ? relMap.get(rid) : null;
      };
      const shot = embed(cells[6]);
      const logo = embed(cells[7]);
      if (key) rows.set(key, { shot, logo });
    }
  }

  const data = JSON.parse(await readFile(DATA, 'utf8'));
  await mkdir(OUT, { recursive: true });
  const missing = [];
  let done = 0;

  for (const s of data.stores) {
    const key = String(s.docx_row).replace(/\s+/g, '');
    const row = rows.get(key);
    if (!row) { missing.push(`${s.name}: لا صفّ «${s.docx_row}» في الملف`); continue; }

    const base = s.image.replace(/\.webp$/i, '');
    if (row.shot) {
      const src = zip('word/' + row.shot);
      const pipeline = () => sharp(src).resize(1200, 675, { fit: 'cover', position: 'centre' }).rotate();
      await writeFile(join(OUT, `${base}.jpg`), await pipeline().jpeg({ quality: 82, mozjpeg: true }).toBuffer());
      let q = 82, webp;
      do {
        webp = await pipeline().webp({ quality: q }).toBuffer();
        q -= 6;
      } while (webp.length > MAX_WEBP_BYTES && q >= 50);
      await writeFile(join(OUT, `${base}.webp`), webp);
      if (webp.length > MAX_WEBP_BYTES) missing.push(`${s.name}: اللقطة ${Math.round(webp.length / 1024)}KB فوق الحدّ حتى بجودة ${q + 6}`);
    } else missing.push(`${s.name}: لا لقطة في الصف ${s.docx_row}`);

    if (row.logo) {
      const src = zip('word/' + row.logo);
      await writeFile(join(OUT, s.logo), await sharp(src)
        .resize(256, 256, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 88 }).toBuffer());
    } else missing.push(`${s.name}: لا شعار في الصف ${s.docx_row}`);
    done++;
  }

  console.log(`متاجر مُعالجة: ${done} من ${data.stores.length} | صفوف في الملف: ${rows.size}`);
  if (missing.length) { console.log('النواقص:'); for (const m of missing) console.log('  - ' + m); }
  else console.log('النواقص: لا شيء');
}

main().catch((e) => { console.error(e); process.exit(1); });
