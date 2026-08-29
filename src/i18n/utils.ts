import { ui, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : seg === 'zh' ? 'zh' : 'ar';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui['ar']): string {
    // تراجع الصينية إلى الإنجليزية: قاموس zh جزئي عمداً (يُملأ صفحةً بعد صفحة
    // عبر خط الإنتاج)، والزائر الصيني يقرأ الإنجليزية أينما غابت الترجمة.
    return (
      (ui[lang] as Record<string, string>)[key] ??
      (ui.en as Record<string, string>)[key] ??
      (ui.ar as Record<string, string>)[key] ??
      String(key)
    );
  };
}

/** كتلة نصوص واجهة ثنائية اللغة (نمط C الموحّد — دفعة 3، 2026-08-29).
 *  النوع يُستنتج من الكتلة العربية ويُفرَض على الإنجليزية، فأي مفتاح يغيب عن
 *  إحداهما يكسر البناء بدل أن يتباعد الشكلان بصمت — كانت كتل C في 10 واجهات
 *  ثلاثية الأشكال بلا أي إلزام (تدقيق 2026-08-28).
 *  الكتلة الصينية اختيارية: إن غابت تراجعت الصينية للإنجليزية. */
export const localize = <T,>(lang: Lang, arText: T, enText: T, zhText?: T): T =>
  lang === 'ar' ? arText : lang === 'zh' ? (zhText ?? enText) : enText;

export const dir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const htmlLang = (lang: Lang) => (lang === 'ar' ? 'ar' : lang === 'zh' ? 'zh-CN' : 'en');

// مسارات النظائر باللغات الأخرى (للمبدّل وhreflang). تمرَّر لكل صفحة.
// zh اختياري: لا يُدرج إلا حين توجد نسخة صينية فعلية للصفحة — hreflang
// ومبدّل اللغة يظهران الصينية عند وجوده فقط.
export interface AltLinks { ar: string; en: string; zh?: string; }

/** رابط الصفحة بلغة الطلب من alt — مع تراجع الصينية للإنجليزية إن غاب نظيرها
 *  (zh اختياري في AltLinks، وبدون هذا المساعد يصير alt[lang] قابلاً للغياب
 *  نوعياً في كل موضع استهلاك). */
export const altHref = (alt: AltLinks, lang: Lang): string => alt[lang] ?? alt.en;
