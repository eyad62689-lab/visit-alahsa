// C53 — وجه النستعليق المشذَّب المودَع يطابق الحزمة المثبّتة والنطاق المعلَن.
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بالمحتويات، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// صفحات /ur/ تُنزّل وجهاً واحداً من Noto Nastaliq Urdu مشذَّباً إلى نطاقه المعلَن في
// src/styles/fonts.css، يولّده tools/gen-nastaliq-subset.mjs من ملف الحزمة المثبّتة
// (@fontsource/noto-nastaliq-urdu) ويُودَع في public/vendor/noto-nastaliq-urdu-<الإصدار>/.
// الملف المودَع ناتجُ أداة لا تعمل في البناء، فيتقادم بصمت إن رُفعت الحزمة أو غُيّر النطاق.
// يحرس:
//   (أ) في fonts.css وجهٌ واحد لهذه العائلة، بمدى وزن «400 700» (فلا ملف ثانٍ ولا عريض
//       مصطنع)، ومصدره المسار المسجَّل في ملف القفل، والمسار يحمل إصدار الحزمة المثبّتة.
//   (ب) ملف القفل يطابق الواقع: إصدار الحزمة، وبصمة ملفها المصدر، وبصمة الملف المودَع،
//       والنطاق المعلَن حرفياً.
//   (ج) بلا اعتماد على القفل: محارف الملف المودَع = محارف المصدر ∩ النطاق المعلَن تماماً
//       (لا محرف في النطاق يحمله المصدر وسقط بالتشذيب، ولا محرف خارجه بقي)، ومراجعة الخط
//       (head.fontRevision) واحدة، وجداول التشكيل GSUB وGPOS وGDEF حاضرة.
import { createHash } from 'node:crypto';
import { brotliDecompressSync } from 'node:zlib';

export const FAMILY = 'Noto Nastaliq Urdu';
export const PACKAGE = '@fontsource/noto-nastaliq-urdu';
export const WEIGHT_RANGE = '400 700';

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

// وسوم الجداول المعروفة في دليل WOFF2 بترتيبها المعياري (الفهرس 63 = وسم صريح يلي)
const KNOWN_TAGS = ['cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ', 'fpgm', 'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp', 'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF', 'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL', 'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc', 'feat', 'fmtx', 'fvar', 'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx', 'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat', 'Gloc', 'Feat', 'Sill'];

/**
 * جداول ملف WOFF2 بوسومها. الجداول المحوَّلة (glyf وloca وما حُوِّل من غيرهما) تُعاد
 * ببياناتها المحوَّلة كما هي — المطلوب هنا cmap وhead وحضور جداول التشكيل، ولا يُحوَّل أيٌّ منها.
 * @param {Buffer} buf
 * @returns {Map<string, Buffer>}
 */
export function woff2Tables(buf) {
  if (buf.length < 48 || buf.toString('latin1', 0, 4) !== 'wOF2') throw new Error('ليس ملف WOFF2');
  const numTables = buf.readUInt16BE(12);
  const compressedSize = buf.readUInt32BE(20);
  let p = 48;
  const base128 = () => {
    let v = 0;
    for (let i = 0; i < 5; i++) { const b = buf[p++]; v = v * 128 + (b & 0x7f); if (!(b & 0x80)) return v; }
    throw new Error('UIntBase128 غير صالح في دليل الجداول');
  };
  const dir = [];
  for (let i = 0; i < numTables; i++) {
    const flags = buf[p++];
    let tag = KNOWN_TAGS[flags & 0x3f];
    if ((flags & 0x3f) === 63) { tag = buf.toString('latin1', p, p + 4); p += 4; }
    const version = flags >> 6;
    const origLength = base128();
    const transformed = tag === 'glyf' || tag === 'loca' ? version === 0 : version !== 0;
    dir.push({ tag, length: transformed ? base128() : origLength });
  }
  const data = brotliDecompressSync(buf.subarray(p, p + compressedSize));
  const out = new Map();
  let at = 0;
  for (const t of dir) { out.set(t.tag, data.subarray(at, at + t.length)); at += t.length; }
  if (at !== data.length) throw new Error('أطوال جداول WOFF2 لا تطابق البيانات المفكوكة');
  return out;
}

/** محارف جدول cmap (الجداول الفرعية اليونيكودية بصيغتَي 4 و12) التي تقابلها رسمة غير .notdef */
export function cmapCodePoints(cmap) {
  const out = new Set();
  const n = cmap.readUInt16BE(2);
  for (let i = 0; i < n; i++) {
    const platform = cmap.readUInt16BE(4 + i * 8), off = cmap.readUInt32BE(8 + i * 8);
    if (platform !== 0 && platform !== 3) continue;
    const format = cmap.readUInt16BE(off);
    if (format === 4) {
      const seg = cmap.readUInt16BE(off + 6) / 2;
      const ends = off + 14, starts = ends + seg * 2 + 2, deltas = starts + seg * 2, ranges = deltas + seg * 2;
      for (let s = 0; s < seg; s++) {
        const end = cmap.readUInt16BE(ends + s * 2), start = cmap.readUInt16BE(starts + s * 2);
        const delta = cmap.readUInt16BE(deltas + s * 2), ro = cmap.readUInt16BE(ranges + s * 2);
        for (let c = start; c <= end && c !== 0xFFFF; c++) {
          let gid;
          if (ro === 0) gid = (c + delta) & 0xFFFF;
          else { gid = cmap.readUInt16BE(ranges + s * 2 + ro + (c - start) * 2); if (gid !== 0) gid = (gid + delta) & 0xFFFF; }
          if (gid !== 0) out.add(c);
        }
      }
    } else if (format === 12) {
      const groups = cmap.readUInt32BE(off + 12);
      for (let g = 0; g < groups; g++) {
        const start = cmap.readUInt32BE(off + 16 + g * 12), end = cmap.readUInt32BE(off + 20 + g * 12), gid = cmap.readUInt32BE(off + 24 + g * 12);
        for (let c = start; c <= end; c++) if (gid + (c - start) !== 0) out.add(c);
      }
    }
  }
  return out;
}

/** «U+0600-06FF, U+200C» ← مجموعة أزواج [من، إلى]؛ يرفض ما ليس محرفاً أو مدى صريحاً */
export function parseUnicodeRange(value) {
  return value.split(',').map((part) => {
    const m = /^U\+([0-9A-F]{1,6})(?:-([0-9A-F]{1,6}))?$/i.exec(part.trim());
    if (!m) throw new Error(`مقطع unicode-range غير مفهوم: «${part.trim()}»`);
    return [parseInt(m[1], 16), parseInt(m[2] ?? m[1], 16)];
  });
}
const normalizeRange = (value) => value.split(',').map((s) => s.trim().toUpperCase()).join(', ');

/** قواعد @font-face لهذه العائلة في fonts.css — بالبحث عن الأقواس لا بتعبير نمطي على الكتلة */
export function familyFaces(css) {
  const faces = [];
  for (let i = css.indexOf('@font-face'); i !== -1; i = css.indexOf('@font-face', i + 1)) {
    const open = css.indexOf('{', i), close = css.indexOf('}', open);
    if (open === -1 || close === -1) break;
    const body = css.slice(open + 1, close);
    const decl = (name) => { const m = body.split(';').map((d) => d.trim()).find((d) => d.startsWith(name + ':')); return m ? m.slice(name.length + 1).trim() : undefined; };
    if ((decl('font-family') ?? '').replace(/['"]/g, '') !== FAMILY) continue;
    const src = decl('src') ?? '';
    const q = src.indexOf("url('");
    faces.push({ weight: decl('font-weight'), range: decl('unicode-range'), url: q === -1 ? undefined : src.slice(q + 5, src.indexOf("'", q + 5)) });
  }
  return faces;
}

/**
 * @param {{ fontsCss: string, lock: object | null, pkgVersion: string, sourceBuf: Buffer, subsetBuf: Buffer | null }} input
 *   lock = tools/nastaliq-subset.lock.json محلَّلاً؛ sourceBuf = ملف الحزمة المثبّتة المسمّى في القفل؛
 *   subsetBuf = الملف المنشور في dist على المسار المسجَّل في القفل
 */
export function checkNastaliqSubset({ fontsCss, lock, pkgVersion, sourceBuf, subsetBuf }) {
  const problems = [];
  const stats = { bytes: subsetBuf?.length ?? 0, sourceBytes: sourceBuf?.length ?? 0, codePoints: 0, declared: 0, declaredWithoutGlyph: 0 };
  if (!lock) return { problems: ['ملف القفل tools/nastaliq-subset.lock.json غائب — شغّل tools/gen-nastaliq-subset.mjs'], stats };

  // (أ) fonts.css
  const faces = familyFaces(fontsCss);
  if (faces.length !== 1) problems.push(`fonts.css يعلن ${faces.length} وجهاً لـ${FAMILY} والمتوقع وجه واحد`);
  const face = faces[0] ?? {};
  if (face.weight !== WEIGHT_RANGE) problems.push(`مدى وزن الوجه «${face.weight}» والمتوقع «${WEIGHT_RANGE}»`);
  if (face.url !== lock.file) problems.push(`مصدر الوجه في fonts.css «${face.url}» لا يطابق المسار المسجَّل في القفل «${lock.file}»`);
  if (!String(lock.file).includes(`/noto-nastaliq-urdu-${pkgVersion}/`)) problems.push(`مسار الملف المودَع «${lock.file}» لا يحمل إصدار الحزمة المثبّتة ${pkgVersion}`);

  // (ب) القفل يطابق الواقع
  if (lock.version !== pkgVersion) problems.push(`القفل لإصدار ${lock.version} والحزمة المثبّتة ${pkgVersion} — أعِد التوليد`);
  if (!sourceBuf) problems.push('ملف الحزمة المصدر غير مقروء');
  else if (sha256(sourceBuf) !== lock.sourceSha256) problems.push('بصمة ملف الحزمة المصدر لا تطابق القفل — المودَع وُلّد من ملف آخر');
  if (!subsetBuf) problems.push(`الملف المودَع غائب عن المخرج: ${lock.file}`);
  else if (sha256(subsetBuf) !== lock.sha256) problems.push('بصمة الملف المودَع لا تطابق القفل');
  let declared = null;
  if (!face.range) problems.push('الوجه بلا unicode-range');
  else {
    if (normalizeRange(face.range) !== normalizeRange(String(lock.unicodeRange))) problems.push(`النطاق المعلَن «${face.range}» غير النطاق الذي وُلّد به المودَع «${lock.unicodeRange}» — أعِد التوليد`);
    try { declared = parseUnicodeRange(face.range); } catch (e) { problems.push(e.message); }
  }

  // (ج) المحارف والمراجعة وجداول التشكيل — من الملفين نفسيهما
  if (sourceBuf && subsetBuf && declared) {
    let src, sub;
    try { src = woff2Tables(sourceBuf); sub = woff2Tables(subsetBuf); } catch (e) { problems.push(`تعذّر تحليل WOFF2: ${e.message}`); }
    if (src && sub) {
      const inRange = (c) => declared.some(([a, b]) => c >= a && c <= b);
      const want = [...cmapCodePoints(src.get('cmap'))].filter(inRange);
      const got = cmapCodePoints(sub.get('cmap'));
      const hex = (c) => 'U+' + c.toString(16).toUpperCase().padStart(4, '0');
      const missing = want.filter((c) => !got.has(c));
      const extra = [...got].filter((c) => !inRange(c));
      if (missing.length) problems.push(`${missing.length} محرفاً في النطاق المعلَن يحملها المصدر وسقطت من المودَع: ${missing.slice(0, 6).map(hex).join(' ')}`);
      if (extra.length) problems.push(`${extra.length} محرفاً في المودَع خارج النطاق المعلَن: ${extra.slice(0, 6).map(hex).join(' ')}`);
      if (src.get('head').readUInt32BE(4) !== sub.get('head').readUInt32BE(4)) problems.push('مراجعة الخط (head.fontRevision) تختلف بين المصدر والمودَع');
      for (const t of ['GSUB', 'GPOS', 'GDEF']) if (!sub.get(t)?.length) problems.push(`جدول التشكيل ${t} غائب عن المودَع`);
      stats.codePoints = got.size;
      stats.declared = declared.reduce((n, [a, b]) => n + (b - a + 1), 0);
      stats.declaredWithoutGlyph = stats.declared - want.length;
    }
  }
  return { problems, stats };
}
