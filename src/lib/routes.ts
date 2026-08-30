// روابط المعالم المركزية — المصدر الوحيد لبناء رابط صفحة معلم.
//
// لماذا: canonical يصدر بشرطة ختامية، وأي href أو hreflang بدونها يُهمَل زوجه
// ويمرّ بـ301 (تدقيق 2026-08-28 — كانت 11 موضعاً متفرقاً تبني الرابط يدوياً
// وكلها بلا شرطة). أُصلحت المواضع بالشرطة في الدفعة الثانية، وهذه الدالة تحسم
// الأمر بنيوياً: من يبني رابط معلم يستدعيها ولا يركّب المسار بنفسه.
import type { Lang } from '../i18n/ui';

type AttractionSlugs = { slug_ar: string; slug_en: string; title_zh?: string };

/** رابط صفحة المعلم بلغة الطلب — بشرطة ختامية دائماً (تطابق canonical).
 *  الصينية تشارك الإنجليزية الـslug اللاتيني تحت /zh/. */
export const attractionHref = (d: AttractionSlugs, lang: Lang): string =>
  lang === 'ar' ? `/معالم/${d.slug_ar}/`
  : lang === 'zh' ? `/zh/attractions/${d.slug_en}/`
  : `/en/attractions/${d.slug_en}/`;

/** روابط المعلم بلغاته — لحقول alt (مصدر hreflang ومبدّل اللغة).
 *  zh يُدرج فقط حين يحمل المعلم ترجمة صينية معتمدة (title_zh) — فلا يظهر
 *  hreflang أو خيار 中文 لصفحة صينية غير موجودة. */
export const attractionAlt = (d: AttractionSlugs): { ar: string; en: string; zh?: string } => ({
  ar: attractionHref(d, 'ar'),
  en: attractionHref(d, 'en'),
  ...(d.title_zh ? { zh: attractionHref(d, 'zh') } : {}),
});

type DiningSlugs = { slug_ar: string; slug_en: string };

/** رابط صفحة المنشأة (مطعم/مقهى) — بشرطة ختامية دائماً، للسبب نفسه أعلاه. */
export const diningHref = (d: DiningSlugs, lang: Lang): string =>
  lang === 'ar' ? `/مطاعم-ومقاهي/${d.slug_ar}/` : `/en/restaurants-cafes/${d.slug_en}/`;

/** روابط المنشأة بلغتيها — مصدر hreflang ومبدّل اللغة. لا نسخة صينية بعد،
 *  فلا يُدرج zh هنا لئلا يقود المبدّل إلى 404. */
export const diningAlt = (d: DiningSlugs): { ar: string; en: string } => ({
  ar: diningHref(d, 'ar'),
  en: diningHref(d, 'en'),
});
