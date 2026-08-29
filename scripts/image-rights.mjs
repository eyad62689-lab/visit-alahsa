// حقوق الصور (طبقة الحماية ٢) — يكتب بيانات الملكية (Artist / Copyright /
// ImageDescription برابط المصدر) داخل EXIF لكل صور المحتوى في dist/img.
//
// لماذا حقن ثنائي مباشر ولا sharp.withExifMerge؟ لأن sharp يعيد ترميز الصورة
// (فقد جودة تراكمي وتغيّر أحجام)، بينما إدراج مقطع EXIF في JPEG وفصل EXIF في
// WebP عمليةُ حاويةٍ بحتة: البكسلات المضغوطة لا تُمسّ إطلاقاً — صفر فقد جودة،
// وزيادة ~250 بايت للملف. sharp يُستعمل للقراءة فقط (الأبعاد + التحقق النهائي).
//
// يعمل على dist/ بعد البناء (خطوة postbuild) كي لا تتضخم ثنائيات المستودع —
// يُطبَّق تلقائياً في كل نشر على Netlify.
//
// التشغيل اليدوي: node scripts/image-rights.mjs [مجلد]     (الافتراضي dist/img)

import sharp from 'sharp'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const TARGET = process.argv[2] || join(ROOT, 'dist', 'img')
const YEAR = new Date().getFullYear()

// حقول ASCII فقط (نوع EXIF 2) — العربية توضع في الموقع نفسه لا في وسوم EXIF
const TAGS = {
  0x010e: `Original content from https://visit-alahsa.com - Visit Al-Ahsa, Saudi Arabia`, // ImageDescription
  0x013b: 'Visit Al-Ahsa (visit-alahsa.com)',                                             // Artist
  0x8298: `Copyright (c) ${YEAR} Visit Al-Ahsa - visit-alahsa.com - All rights reserved`, // Copyright
}

// بنية TIFF صغيرة (little-endian) بثلاثة مدخلات IFD0 نصية
function buildExifTiff(tags) {
  const entries = Object.entries(tags)
    .map(([t, v]) => [Number(t), Buffer.from(v + '\0', 'ascii')])
    .sort((a, b) => a[0] - b[0])
  const n = entries.length
  const ifdBytes = 2 + n * 12 + 4
  const head = Buffer.alloc(8 + ifdBytes)
  head.write('II', 0, 'ascii')          // little-endian
  head.writeUInt16LE(42, 2)             // TIFF magic
  head.writeUInt32LE(8, 4)              // IFD0 offset
  head.writeUInt16LE(n, 8)              // عدد المدخلات
  let dataOffset = 8 + ifdBytes
  const tail = []
  entries.forEach(([tag, val], i) => {
    const off = 10 + i * 12
    head.writeUInt16LE(tag, off)
    head.writeUInt16LE(2, off + 2)      // النوع ASCII
    head.writeUInt32LE(val.length, off + 4)
    if (val.length <= 4) val.copy(head, off + 8)
    else { head.writeUInt32LE(dataOffset, off + 8); tail.push(val); dataOffset += val.length }
  })
  head.writeUInt32LE(0, 10 + n * 12)    // لا IFD تالٍ
  return Buffer.concat([head, ...tail])
}

const EXIF_PAYLOAD = Buffer.concat([Buffer.from('Exif\0\0', 'ascii'), buildExifTiff(TAGS)])

// JPEG: إدراج مقطع APP1(Exif) بعد SOI مباشرة — الحمولة المضغوطة لا تُمسّ
function stampJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  // موجود Exif أصلاً؟ نفحص المقاطع حتى بداية البيانات المضغوطة
  let p = 2
  while (p + 4 < buf.length && buf[p] === 0xff) {
    const marker = buf[p + 1]
    if (marker === 0xda) break // SOS — بداية البيانات
    const len = buf.readUInt16BE(p + 2)
    if (marker === 0xe1 && buf.slice(p + 4, p + 10).toString('ascii') === 'Exif\0\0') return 'exists'
    p += 2 + len
  }
  const seg = Buffer.alloc(4)
  seg[0] = 0xff; seg[1] = 0xe1
  seg.writeUInt16BE(2 + EXIF_PAYLOAD.length, 2)
  return Buffer.concat([buf.slice(0, 2), seg, EXIF_PAYLOAD, buf.slice(2)])
}

const fourcc = (buf, off) => buf.slice(off, off + 4).toString('ascii')
const u24le = (v) => Buffer.from([v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff])
const chunk = (cc, payload) => {
  const head = Buffer.alloc(8)
  head.write(cc, 0, 'ascii')
  head.writeUInt32LE(payload.length, 4)
  const pad = payload.length % 2 ? Buffer.from([0]) : Buffer.alloc(0)
  return Buffer.concat([head, payload, pad])
}

// WebP: إضافة فصل EXIF في حاوية RIFF (مع ترقية VP8X عند الحاجة) — بلا إعادة ترميز
async function stampWebp(buf) {
  if (fourcc(buf, 0) !== 'RIFF' || fourcc(buf, 8) !== 'WEBP') return null
  // مسح الفصول القائمة
  let p = 12
  const chunks = []
  let hasVp8x = false
  while (p + 8 <= buf.length) {
    const cc = fourcc(buf, p)
    const size = buf.readUInt32LE(p + 4)
    const total = 8 + size + (size % 2)
    if (cc === 'EXIF') return 'exists'
    if (cc === 'VP8X') hasVp8x = true
    chunks.push(buf.slice(p, p + total))
    p += total
  }
  let out
  if (hasVp8x) {
    // تفعيل بت EXIF (0x08) في رايات VP8X ثم إلحاق الفصل
    const v = Buffer.from(chunks[0])
    v[8] |= 0x08
    out = [v, ...chunks.slice(1), chunk('EXIF', EXIF_PAYLOAD)]
  } else {
    // صيغة بسيطة (VP8/VP8L): تلزم ترقية لحاوية موسّعة بفصل VP8X أولاً
    const meta = await sharp(buf).metadata()
    if (!meta.width || !meta.height) return null
    const flags = Buffer.from([0x08 | (meta.hasAlpha ? 0x10 : 0), 0, 0, 0])
    const vp8x = chunk('VP8X', Buffer.concat([flags, u24le(meta.width - 1), u24le(meta.height - 1)]))
    out = [vp8x, ...chunks, chunk('EXIF', EXIF_PAYLOAD)]
  }
  const body = Buffer.concat(out)
  const riff = Buffer.alloc(12)
  riff.write('RIFF', 0, 'ascii')
  riff.writeUInt32LE(4 + body.length, 4)
  riff.write('WEBP', 8, 'ascii')
  return Buffer.concat([riff, body])
}

async function collect(dir, out = []) {
  let ents
  try { ents = await readdir(dir, { withFileTypes: true }) } catch { return out }
  for (const e of ents) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await collect(p, out)
    else if (/\.(jpe?g|webp)$/i.test(e.name)) out.push(p)
  }
  return out
}

async function main() {
  const files = await collect(TARGET)
  if (!files.length) { console.log(`لا صور في ${TARGET} — تخطٍّ.`); return }
  let stamped = 0, skipped = 0, failed = 0
  for (const file of files) {
    try {
      const buf = await readFile(file)
      const isJpeg = /\.jpe?g$/i.test(file)
      const result = isJpeg ? stampJpeg(buf) : await stampWebp(buf)
      if (result === 'exists' || result === null) { skipped++; continue }
      // تحقق قبل الكتابة: الصورة تُفكّ وتُقرأ منها EXIF فعلاً
      const meta = await sharp(result).metadata()
      if (!meta.exif || !meta.width) throw new Error('فشل تحقق ما بعد الحقن')
      await writeFile(file, result)
      stamped++
    } catch (e) {
      failed++
      console.warn(`تخطّي ${file}: ${e.message}`)
    }
  }
  console.log(`حقوق الصور (EXIF): مختومة ${stamped} | متخطّاة ${skipped} | متعذّرة ${failed} من أصل ${files.length}`)
  if (failed > 0 && stamped === 0) process.exit(1)
}

main().catch((e) => { console.error(e); process.exit(1) })
