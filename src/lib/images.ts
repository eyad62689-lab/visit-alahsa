// بناء srcset من بيان العروض الذي يولّده tools/gen-image-widths.mjs.
//
// الأصل يبقى أكبر مرشّح دائماً بعرضه الحقيقي، والنسخ الأصغر تُضاف بلاحقة
// -<w>w. إن لم تكن للصورة نسخ (صغيرة أصلاً أو لم يُشغَّل المولّد بعد)
// نُرجع undefined فيسقط المتصفح إلى src/srcset المفرد — تدهور آمن.

import manifest from '../data/image-widths.json';

type Entry = { full: number; fullWebp: number; widths: number[] };
const widths = manifest as Record<string, Entry>;

/** يحوّل "/img/qasr-ibrahim" إلى "qasr-ibrahim" و"/img/fruits/khalas-v2" إلى
 *  "fruits/khalas-v2" — الصور في مجلدات فرعية تحتاج المسار كاملاً كمفتاح. */
function keyOf(src: string): string {
  return src.replace(/^.*\/img\//, '');
}

export function srcsetFor(src: string): { jpg: string; webp: string } | undefined {
  const entry = widths[keyOf(src)];
  if (!entry || entry.widths.length === 0) return undefined;
  // الأصل آخر مرشّح بعرضه الحقيقي — وهو يختلف بين jpg وwebp في صورة واحدة على الأقل
  const build = (ext: 'jpg' | 'webp', fullWidth: number) =>
    [
      ...entry.widths.map((w) => `${src}-${w}w.${ext} ${w}w`),
      `${src}.${ext} ${fullWidth}w`,
    ].join(', ');
  return { jpg: build('jpg', entry.full), webp: build('webp', entry.fullWebp) };
}
