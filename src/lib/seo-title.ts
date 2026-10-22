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
  };
}

export function attractionTitle(entry: TitleSource, lang: SeoLang): string {
  const a = entry.data;
  const title = lang === 'ar' ? a.title : (a.title_en ?? a.title);
  const seo = a.seo;
  if (!seo) return title;
  const place = lang === 'ar' ? seo.place : seo.place_en;
  const benefit = seo.benefit ? SEO_BENEFITS[seo.benefit][lang] : undefined;
  if (!benefit) return title;
  const forms = [
    ...(place ? [lang === 'ar' ? `${title} في ${place}: ${benefit}` : `${title} in ${place}: ${benefit}`] : []),
    `${title}: ${benefit}`,
  ];
  return forms.find((f) => titleLen(f) <= SEO_LIMITS.titleMax) ?? title;
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

/** عنوان المنشأة: «الاسم — الفهرس»، ويسقط الفهرس إن جاوزت النواة حد العنوان. */
export function facilityTitleCore(name: string, indexName: string, sep: string): string {
  const full = `${name} ${sep} ${indexName}`;
  return titleLen(full) <= SEO_LIMITS.titleMax ? full : name;
}
