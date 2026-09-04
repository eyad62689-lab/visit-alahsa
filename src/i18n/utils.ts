import { ui, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : seg === 'zh' ? 'zh' : seg === 'de' ? 'de' : 'ar';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui['ar']): string {
    // تراجع الصينية والألمانية إلى الإنجليزية: قاموسا zh وde جزئيان عمداً
    // (يُملآن صفحةً بعد صفحة عبر خطَّي الإنتاج)، والزائر يقرأ الإنجليزية أينما
    // غابت الترجمة بدل أن يرى مفتاحاً خاماً.
    return (
      (ui[lang] as Record<string, string>)[key] ??
      (ui.en as Record<string, string>)[key] ??
      (ui.ar as Record<string, string>)[key] ??
      String(key)
    );
  };
}

/** كتلة نصوص واجهة متعددة اللغات (نمط C الموحّد — دفعة 3، 2026-08-29).
 *  النوع يُستنتج من الكتلة العربية ويُفرَض على الإنجليزية، فأي مفتاح يغيب عن
 *  إحداهما يكسر البناء بدل أن يتباعد الشكلان بصمت — كانت كتل C في 10 واجهات
 *  ثلاثية الأشكال بلا أي إلزام (تدقيق 2026-08-28).
 *  الكتلتان الصينية والألمانية اختياريتان: إن غابت إحداهما تراجعت لغتها للإنجليزية.
 *
 *  قرار 2026-09-03 (تكامل الألمانية): أُبقيت الوسائط موضعية بدل صيغة السجلّ
 *  `{ ar, en, zh, de }` — الصيغة الموضعية تُبقي الفرق صغيراً في 10 واجهات
 *  ومئات المواضع، والكتل مكتوبة سطراً لكل لغة فيبقى الترتيب ظاهراً للعين.
 *  **عند إضافة لغة خامسة تُحوَّل الدالة إلى صيغة السجلّ** — خمسة وسائط من
 *  النوع نفسه تتجاوز ما تحتمله القراءة. */
export const localize = <T,>(lang: Lang, arText: T, enText: T, zhText?: T, deText?: T): T =>
  lang === 'ar' ? arText
  : lang === 'zh' ? (zhText ?? enText)
  : lang === 'de' ? (deText ?? enText)
  : enText;

export const dir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const htmlLang = (lang: Lang) =>
  lang === 'ar' ? 'ar' : lang === 'zh' ? 'zh-CN' : lang === 'de' ? 'de' : 'en';

// مسارات النظائر باللغات الأخرى (للمبدّل وhreflang). تمرَّر لكل صفحة.
// zh وde اختياريان: لا يُدرج أحدهما إلا حين توجد نسخة فعلية للصفحة بتلك اللغة
// — hreflang ومبدّل اللغة يظهرانها عند وجودها فقط، فلا خيار يقود إلى 404.
export interface AltLinks { ar: string; en: string; zh?: string; de?: string; }

/** رابط الصفحة بلغة الطلب من alt — مع تراجع الصينية والألمانية للإنجليزية إن
 *  غاب نظيرهما (zh وde اختياريان في AltLinks، وبدون هذا المساعد يصير alt[lang]
 *  قابلاً للغياب نوعياً في كل موضع استهلاك). */
export const altHref = (alt: AltLinks, lang: Lang): string => alt[lang] ?? alt.en;

/** فاصل عنوان الصفحة عن اسم الموقع في وسم <title>.
 *  الألمانية تستعمل شرطة نصف الجيم U+2013 (Halbgeviertstrich) — والطويلة
 *  U+2014 علامة إنجليزية يقرؤها القارئ الألماني خللاً طباعياً. لا تكتب
 *  الشرطة حرفياً في قالب عنوان: استدعِ هذه، ويحرسها الفحص C17.
 */
export const titleSep = (lang: Lang): string => (lang === 'de' ? '\u2013' : '\u2014');
