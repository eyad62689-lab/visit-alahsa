// روابط المعالم المركزية — المصدر الوحيد لبناء رابط صفحة معلم.
//
// لماذا: canonical يصدر بشرطة ختامية، وأي href أو hreflang بدونها يُهمَل زوجه
// ويمرّ بـ301 (تدقيق 2026-08-28 — كانت 11 موضعاً متفرقاً تبني الرابط يدوياً
// وكلها بلا شرطة). أُصلحت المواضع بالشرطة في الدفعة الثانية، وهذه الدالة تحسم
// الأمر بنيوياً: من يبني رابط معلم يستدعيها ولا يركّب المسار بنفسه.
import type { Lang } from '../i18n/ui';

type AttractionSlugs = { slug_ar: string; slug_en: string; title_zh?: string; title_de?: string; title_ru?: string; title_ur?: string };

/** لغة المسار لما لم يُبنَ بالأوردو بعد: تحت /ur/ اليوم الرئيسية وفهرس المعالم وصفحات
 *  المعالم الحاملة title_ur وحدها، وكل ما عداها (الصفحات الثابتة، دليل المتاجر، وأقسام
 *  الترويسة والتذييل) يقصد نظيره الإنجليزي — لا رابط إلى صفحة أوردية غير مبنية.
 *  يُحذف استعمالها من كل دالة يوم يُبنى مسارها تحت /ur/. */
export const builtLang = (lang: Lang): Exclude<Lang, 'ur'> => (lang === 'ur' ? 'en' : lang);

/** رابط صفحة المعلم بلغة الطلب — بشرطة ختامية دائماً (تطابق canonical).
 *  zh وde وru وur تشارك الإنجليزية الـslug اللاتيني تحت بادئة لغتها. */
export const attractionHref = (d: AttractionSlugs, lang: Lang): string =>
  lang === 'ar' ? `/معالم/${d.slug_ar}/` : `/${lang}/attractions/${d.slug_en}/`;

/** روابط المعلم بلغاته — لحقول alt (مصدر hreflang ومبدّل اللغة).
 *  zh يُدرج فقط حين يحمل المعلم ترجمة صينية معتمدة (title_zh)، وde حين يحمل
 *  ترجمة ألمانية معتمدة (title_de)، وru حين يحمل title_ru، وur حين يحمل title_ur —
 *  فلا يظهر hreflang أو خيار في المبدّل لصفحة غير موجودة. */
export const attractionAlt = (d: AttractionSlugs): { ar: string; en: string; zh?: string; de?: string; ru?: string; ur?: string } => ({
  ar: attractionHref(d, 'ar'),
  en: attractionHref(d, 'en'),
  ...(d.title_zh ? { zh: attractionHref(d, 'zh') } : {}),
  ...(d.title_de ? { de: attractionHref(d, 'de') } : {}),
  ...(d.title_ru ? { ru: attractionHref(d, 'ru') } : {}),
  ...(d.title_ur ? { ur: attractionHref(d, 'ur') } : {}),
});

type DiningSlugs = { slug_ar: string; slug_en: string; body_zh?: string; body_ru?: string; body_de?: string; body_ur?: string };

/** رابط صفحة المنشأة (مطعم/مقهى) — بشرطة ختامية دائماً، للسبب نفسه أعلاه. */
export const diningHref = (d: DiningSlugs, lang: Lang): string =>
  lang === 'ar' ? `/مطاعم-ومقاهي/${d.slug_ar}/` : `/${lang}/restaurants-cafes/${d.slug_en}/`;

/** روابط المنشأة بلغاتها — مصدر hreflang ومبدّل اللغة. الصينية والألمانية والروسية
 *  تُدرج كلٌّ منها متى حملت المنشأة body_zh/body_de/body_ru المعتمد (بوابة صفحتها،
 *  على سابقة stayAlt) — فلا يقود المبدّل إلى 404. */
export const diningAlt = (d: DiningSlugs): { ar: string; en: string; zh?: string; de?: string; ru?: string; ur?: string } => ({
  ar: diningHref(d, 'ar'),
  en: diningHref(d, 'en'),
  ...(d.body_zh?.trim() ? { zh: diningHref(d, 'zh') } : {}),
  ...(d.body_de?.trim() ? { de: diningHref(d, 'de') } : {}),
  ...(d.body_ru?.trim() ? { ru: diningHref(d, 'ru') } : {}),
  // بوابة الأوردو body_ur كأخواتها؛ ومسار /ur/restaurants-cafes/<slug>/ يُبنى مع دفعته
  // (متنٌ أوردي قبل المسار يُفشل فاحص الروابط لا يمرّ صامتاً)
  ...(d.body_ur?.trim() ? { ur: diningHref(d, 'ur') } : {}),
});

type StaySlugs = { slug_ar: string; slug_en: string; body_zh?: string; body_ru?: string; body_de?: string; body_ur?: string };

/** رابط صفحة مكان الإقامة — بشرطة ختامية دائماً، للسبب نفسه أعلاه. */
export const stayHref = (d: StaySlugs, lang: Lang): string =>
  lang === 'ar' ? `/إقامة/${d.slug_ar}/` : `/${lang}/stay/${d.slug_en}/`;

/** روابط مكان الإقامة بلغاتها — مصدر hreflang ومبدّل اللغة. الصينية والألمانية
 *  والروسية تُدرج كلٌّ منها متى حمل المكان body_zh/body_de/body_ru المعتمد (بوابة
 *  صفحته، على سابقة title_de/title_ru) — فلا يقود المبدّل إلى 404. */
export const stayAlt = (d: StaySlugs): { ar: string; en: string; zh?: string; de?: string; ru?: string; ur?: string } => ({
  ar: stayHref(d, 'ar'),
  en: stayHref(d, 'en'),
  ...(d.body_zh?.trim() ? { zh: stayHref(d, 'zh') } : {}),
  ...(d.body_de?.trim() ? { de: stayHref(d, 'de') } : {}),
  ...(d.body_ru?.trim() ? { ru: stayHref(d, 'ru') } : {}),
  // بوابة الأوردو body_ur، ومسار /ur/stay/<slug>/ يُبنى مع دفعته (كما في diningAlt)
  ...(d.body_ur?.trim() ? { ur: stayHref(d, 'ur') } : {}),
});

type PostSlugs = { lang: string; slug: string };

/** رابط صفحة المقال بلغة ملفه — بشرطة ختامية دائماً. العربية على الجذر، وسواها
 *  تحت بادئة لغتها (/en/blog/ و/zh/blog/ …) على النمط نفسه. */
export const blogHref = (d: PostSlugs): string =>
  d.lang === 'ar' ? `/مدونة/${d.slug}/` : `/${d.lang}/blog/${d.slug}/`;

/** الصفحات الثابتة الخمس التي صارت بلغاتها الخمس في المرحلة هـ (2026-09-26): السياسات
 *  والتقرير وشكره واليونسكو والخريطة التضاريسية. المسار العربي بمقطعه العربي، وسواه
 *  تحت بادئة لغته بالمقطع اللاتيني نفسه — مصدرٌ واحد للروابط والنظائر (alt) وsitemap. */
const STATIC_AR = {
  legal: '/السياسات/',
  report: '/أبلغ/',
  reportThanks: '/أبلغ/تم/',
  unesco: '/اليونسكو/',
  terrainMap: '/خريطة-تضاريس/',
  map: '/خريطة/',
} as const;
const STATIC_LATIN: Record<keyof typeof STATIC_AR, string> = {
  legal: 'legal/',
  report: 'report/',
  reportThanks: 'report/thanks/',
  unesco: 'unesco/',
  terrainMap: 'terrain-map/',
  map: 'map/',
};
export type StaticPage = keyof typeof STATIC_AR;

/** صفحة «عن زوروا الأحساء» (2026-09-27) — عربي/إنجليزي فقط، فلا تدخل STATIC_AR
 *  (نظائرها الخمس ستعلن zh/de/ru غير مبنية). تُترجم عبر خطوط الترجمة متى قُرّر. */
export const ABOUT_ALT = { ar: '/من-نحن/', en: '/en/about/' } as const;
export const aboutHref = (lang: Lang): string => (lang === 'ar' ? ABOUT_ALT.ar : ABOUT_ALT.en);

/** دليل المتاجر الإلكترونية (أُعلن 2026-10-09) — النظائر الخمس؛ المبنيّ منها فعلاً
 *  يقرّره وجود ملف الترجمة (src/lib/stores.ts storesLangs)، وهو ما يدخل الخريطة وhreflang. */
export const STORES_ALT = {
  ar: '/متاجر-الأحساء-الإلكترونية/', en: '/en/online-stores/', zh: '/zh/online-stores/', de: '/de/online-stores/', ru: '/ru/online-stores/',
} as const;
export const STORES_AR = STORES_ALT.ar;
export const storesHref = (lang: Lang = 'ar'): string => STORES_ALT[builtLang(lang)];

/** دليل المرشدين السياحيين المرخّصين — عربي/إنجليزي فقط (كصفحة «عن زوروا الأحساء»)،
 *  فلا يدخل STATIC_AR. اللغات الأخرى تقصد الفهرس الإنجليزي حيث يلزم رابط، ولا رابط
 *  إليه أصلاً من صفحاتها. إدراجه في sitemap والتذييل تقرّره src/lib/guides.ts من عدد
 *  المرشدين المنشورين. */
export const GUIDES_ALT = { ar: '/مرشدون-سياحيون/', en: '/en/tour-guides/' } as const;
export const guidesHref = (lang: Lang): string => (lang === 'ar' ? GUIDES_ALT.ar : GUIDES_ALT.en);

type GuideSlugs = { slug_ar: string; slug_en: string };

/** رابط صفحة المرشد — بشرطة ختامية دائماً. غير العربية تقصد الصفحة الإنجليزية. */
export const guideHref = (d: GuideSlugs, lang: Lang): string =>
  lang === 'ar' ? `${GUIDES_ALT.ar}${d.slug_ar}/` : `${GUIDES_ALT.en}${d.slug_en}/`;

/** نظيرا صفحة المرشد — مصدر hreflang ومبدّل اللغة. */
export const guideAlt = (d: GuideSlugs): { ar: string; en: string } => ({
  ar: guideHref(d, 'ar'),
  en: guideHref(d, 'en'),
});

/** رابط صفحة ثابتة بلغة — بشرطة ختامية دائماً. الأوردو تقصد الإنجليزية (builtLang). */
export const staticHref = (page: StaticPage, lang: Lang): string =>
  lang === 'ar' ? STATIC_AR[page] : `/${builtLang(lang)}/${STATIC_LATIN[page]}`;

/** نظائر الصفحة الثابتة بلغاتها الخمس — مصدر hreflang ومبدّل اللغة. */
export const staticAlt = (page: StaticPage): { ar: string; en: string; zh: string; de: string; ru: string } => ({
  ar: staticHref(page, 'ar'), en: staticHref(page, 'en'), zh: staticHref(page, 'zh'), de: staticHref(page, 'de'), ru: staticHref(page, 'ru'),
});
