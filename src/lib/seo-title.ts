// بناء عنوان الصفحة ووصفها لـSEO من بيانات منشورة فقط (ar/en).
//
// عنوان المعلم يُركَّب بنية: «[العنوان] في [المكان]: [الفائدة]» ثم «[العنوان]: [الفائدة]» ثم العنوان،
// وأول صيغة نواتها ≤ 60 نقطة ترميز (بعد حذف التشكيل) هي المختارة — حد C72. المكان والفائدة
// من حقل `seo` في ملف المعلم (يفرض المخطط أن المكان وارد حرفياً في area/title وأن للفائدة دليلاً)،
// ونص الفائدة من src/data/seo-benefits.ts. بلا `seo` يبقى العنوان كما هو.
import { SEO_BENEFITS, type SeoBenefitKey } from '../data/seo-benefits';
import { titleLen, descLen, SEO_LIMITS } from './seo-len.mjs';

export type SeoLang = 'ar' | 'en';

interface TitleSource {
  data: {
    title: string;
    title_en?: string;
    seo?: { place?: string; place_en?: string; benefit?: SeoBenefitKey };
    seoTitle?: string;
    seoTitle_en?: string;
  };
}

export function attractionTitle(entry: TitleSource, lang: SeoLang): string {
  const a = entry.data;
  const title = lang === 'ar' ? a.title : (a.title_en ?? a.title);
  // عنوان مكتوب يدوياً (للعنوان <title> وحده): يسبق التركيب من seo
  const override = lang === 'ar' ? a.seoTitle : a.seoTitle_en;
  if (override) return override;
  const seo = a.seo;
  if (!seo) return title;
  const place = lang === 'ar' ? seo.place : seo.place_en;
  const benefit = seo.benefit ? SEO_BENEFITS[seo.benefit][lang] : undefined;
  if (!benefit) return title;
  // فائدة اليونسكو تسمّي الأحساء بنفسها، فلا يُكرَّر «في الأحساء» قبلها (قصر خزام: ضمن واحة الأحساء في اليونسكو)
  const redundant = seo.benefit === 'unesco' && (place === 'الأحساء' || place === 'Al-Ahsa');
  const forms = [
    ...(place && !redundant ? [lang === 'ar' ? `${title} في ${place}: ${benefit}` : `${title} in ${place}: ${benefit}`] : []),
    `${title}: ${benefit}`,
  ];
  return forms.find((f) => titleLen(f) <= SEO_LIMITS.titleMax) ?? title;
}

/** تمييز «مكان» بعد العدد في العربية: 1 «مكان واحد»، 2 «مكانان»، 3–10 جمع «أماكن»، 11–99 مفرد منصوب «مكاناً»، والمئات والآحاد بعدها بحسب آخر خانتين. */
export function arPlaces(n: number): string {
  if (n === 1) return 'مكان واحد';
  if (n === 2) return 'مكانان';
  const r = n % 100;
  if (r >= 3 && r <= 10) return `${n} أماكن`;
  if (r >= 11) return `${n} مكاناً`;
  return `${n} مكان`; // 100 و200… و101 و102: المفرد المجرور
}

/**
 * نواة عنوان فهرس المطاعم والمقاهي: العدد من القائمة المعروضة نفسها (شارة «الكل»)، والمكان من توزّعها
 * على الهفوف والمبرز (بيانات حيّ كل منشأة في فهرسها). الإنجليزية «Spots» لا «Places» كي تبقى النواة ≤ 60 مع عددين.
 */
export function diningIndexTitle(n: number, lang: SeoLang): string {
  return lang === 'ar'
    ? `مطاعم ومقاهي الأحساء: ${arPlaces(n)} في الهفوف والمبرز`
    : `Al Ahsa Restaurants & Cafés: ${n} ${n === 1 ? 'Spot' : 'Spots'} in Hofuf & Al-Mubarraz`;
}

/**
 * وصف صفحة المنشأة (مطعم/إقامة) المركَّب: «النبذة المكان · النوع» من بيانات الصفحة المنشورة نفسها
 * (النبذة، والموقع كما يعرضه الحقل area أو اسم الحيّ، وتسمية النوع المعروضة في الشارة).
 * أطول صيغة لا تتجاوز حد الوصف؛ وإن لم تُضف شيئاً بقيت النبذة كما هي.
 */
export function composeFacilityDescription(blurb: string, place: string | undefined, kindLabel: string): string {
  const forms = [
    ...(place ? [`${blurb} ${place} · ${kindLabel}`] : []),
    `${blurb} · ${kindLabel}`,
  ];
  return forms.find((f) => descLen(f) <= SEO_LIMITS.descMax) ?? blurb;
}

/**
 * عنوان المنشأة: «الاسم — الفهرس»، ويسقط الفهرس إن جاوزت النواة حد العنوان.
 * وحين تقصر النواة عن حد العنوان الأدنى (اسم قصير) وتتوفّر بيانات المنشأة، يُركَّب «الاسم: النوع، الموقع»
 * من تسمية النوع المعروضة في الشارة وحقل الموقع (area) كما يُعرض — وإلا اسم الحيّ — أول صيغة
 * ضمن الحدّين. بلا بيانات أو بلا صيغة مناسبة تبقى «الاسم — الفهرس».
 */
export function facilityTitleCore(
  name: string, indexName: string, sep: string,
  detail?: { kindLabel: string; place?: string; district?: string; comma: string },
): string {
  const full = `${name} ${sep} ${indexName}`;
  if (titleLen(full) > SEO_LIMITS.titleMax) return name;
  if (titleLen(full) >= SEO_LIMITS.titleMin || !detail) return full;
  // سطر الموقع يفصل أجزاءه بشرطة طويلة؛ في العنوان تصير فاصلة
  const flat = detail.place?.replace(/\s+[—–]\s+/g, detail.comma);
  const forms = [flat, detail.district].filter((p): p is string => Boolean(p))
    // اسم يحمل تسمية النوع («مطعم سنيار») لا يُكرَّر نوعه
    .map((p) => (name.includes(detail.kindLabel) ? `${name}: ${p}` : `${name}: ${detail.kindLabel}${detail.comma}${p}`));
  return forms.find((f) => titleLen(f) >= SEO_LIMITS.titleMin && titleLen(f) <= SEO_LIMITS.titleMax) ?? full;
}
