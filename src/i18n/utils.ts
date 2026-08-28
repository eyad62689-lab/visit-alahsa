import { ui, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : 'ar';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui['ar']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.ar as Record<string, string>)[key] ?? String(key);
  };
}

/** كتلة نصوص واجهة ثنائية اللغة (نمط C الموحّد — دفعة 3، 2026-08-29).
 *  النوع يُستنتج من الكتلة العربية ويُفرَض على الإنجليزية، فأي مفتاح يغيب عن
 *  إحداهما يكسر البناء بدل أن يتباعد الشكلان بصمت — كانت كتل C في 10 واجهات
 *  ثلاثية الأشكال بلا أي إلزام (تدقيق 2026-08-28). */
export const localize = <T,>(lang: Lang, arText: T, enText: T): T => (lang === 'ar' ? arText : enText);

export const dir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const htmlLang = (lang: Lang) => (lang === 'ar' ? 'ar' : 'en');

// مسار النظير في اللغة الأخرى (للمبدّل وhreflang). يمرّر لكل صفحة.
export interface AltLinks { ar: string; en: string; }
