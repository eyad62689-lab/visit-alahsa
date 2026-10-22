// عتبة نشر صفحات المعالم — الخطوة 4 من خطة التفاعل العالمي (ع5 في التشخيص).
//
// كانت خمس صفحات معالم بمتن من 6 إلى 13 كلمة مفهرسة بثلاث لغات أو أربع (حديقة
// الاستاد، منتزه الملك عبدالله، حدائق السوسن، مزرعتا الفراولة والليمون). قاعدة
// الموقع تمنع كتابة متن بلا مصدر، فالبديل: الصفحة تبقى (البطاقة والخريطة تربطانها)
// لكنها تخرج من الفهرسة (noindex) ومن sitemap وhreflang حتى يصل متن مصدري.
//
// المقياس: كلمات المتن + كلمات الأسئلة الشائعة لكل لغة — صفحةٌ متنها 37 كلمة ومعها
// أربعة أسئلة موثّقة ليست رقيقة. العتبة 40 كلمة في **إحدى** اللغتين الأساسيتين
// (العربية أو الإنجليزية) تكفي للحجب في كل اللغات، لأن ترجمات zh/de/ru تشتق من
// الإنجليزية فترث رقّتها. يحرسه C23 على dist: المحجوب noindex وخارج sitemap،
// وغير المحجوب مفهرس وداخلها.
import type { CollectionEntry } from 'astro:content';

export const THIN_WORDS = 40;

const words = (t: string | undefined): number => (t ?? '').trim().split(/\s+/).filter(Boolean).length;

/** كلمات المحتوى المقروء (المتن + الأسئلة الشائعة) بلغة ar أو en. */
export function attractionContentWords(entry: CollectionEntry<'attractions'>, lang: 'ar' | 'en'): number {
  const d = entry.data;
  const body = lang === 'ar' ? words(entry.body) : words(d.body_en);
  const faq = d.faq.reduce((n, f) => n + (lang === 'ar' ? words(f.q) + words(f.a) : words(f.q_en) + words(f.a_en)), 0);
  return body + faq;
}

/** رقيقة = دون العتبة بالعربية أو بالإنجليزية. */
export const isThinAttraction = (entry: CollectionEntry<'attractions'>): boolean =>
  attractionContentWords(entry, 'ar') < THIN_WORDS || attractionContentWords(entry, 'en') < THIN_WORDS;

// بوابة صفحة المنشأة المفردة (مطعم/مقهى/مخبز) بالعربية والإنجليزية: متنٌ يعبر العتبة
// (80 كلمة عربية / 100 إنجليزية) ولا يكون نسخةً من النبذة. مصدر واحد لمساري
// `مطاعم-ومقاهي/[slug]` و`en/restaurants-cafes/[slug]` ولكل رابط يقصد تلك الصفحات
// (قسم «مطاعم ومقاهٍ قرب هذا المعلم») — فلا يُربط إلا ما له صفحة مبنية وإلا أخفق check-links.
export const DINING_WORD_MIN = { ar: 80, en: 100 } as const;

export function hasDiningPage(entry: CollectionEntry<'dining'>, lang: 'ar' | 'en'): boolean {
  const d = entry.data;
  const body = (lang === 'ar' ? (entry.body ?? '') : d.body_en).trim();
  return words(body) >= DINING_WORD_MIN[lang] && body !== (lang === 'ar' ? d.blurb : d.blurb_en);
}
