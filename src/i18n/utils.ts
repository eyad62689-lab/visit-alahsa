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

export const dir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const htmlLang = (lang: Lang) => (lang === 'ar' ? 'ar' : 'en');

// مسار النظير في اللغة الأخرى (للمبدّل وhreflang). يمرّر لكل صفحة.
export interface AltLinks { ar: string; en: string; }
