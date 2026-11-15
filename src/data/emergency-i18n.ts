// سجلّ لغات صفحة الطوارئ — ar/en من emergency.ts، وكل لغة أخرى من ملف emergency.<lang>.ts
// يولّده سكربت التطبيق من حكم خط ترجمتها (لا يُحرَّر يدوياً). لغة بلا ملف لا تُبنى ولا تُربط.
import type { Lang } from '../i18n/ui';
import type { AltLinks } from '../i18n/utils';
import { PAGE, type EmergencyPage } from './emergency';
import { EMERGENCY_ALL } from '../lib/routes';
import { EMERGENCY_ZH } from './emergency.zh';
import { EMERGENCY_DE } from './emergency.de';
import { EMERGENCY_RU } from './emergency.ru';
import { EMERGENCY_TR } from './emergency.tr';
import { EMERGENCY_UR } from './emergency.ur';
// @apply-imports

export const EMERGENCY_PAGES: Partial<Record<Lang, EmergencyPage>> = {
  ar: PAGE.ar,
  en: PAGE.en,
  zh: EMERGENCY_ZH,
  de: EMERGENCY_DE,
  ru: EMERGENCY_RU,
  tr: EMERGENCY_TR,
  ur: EMERGENCY_UR,
  // @apply-entries
};

export const EMERGENCY_LANGS = Object.keys(EMERGENCY_PAGES) as Lang[];

/** نظائر الصفحة المبنية — مصدر hreflang ومبدّل اللغة وsitemap. */
export const EMERGENCY_ALT = Object.fromEntries(EMERGENCY_LANGS.map((l) => [l, EMERGENCY_ALL[l as keyof typeof EMERGENCY_ALL]])) as unknown as AltLinks;

/** رابط الصفحة بلغة الطلب — غير المبنية تقصد الإنجليزية. */
export const emergencyHref = (lang: Lang): string => EMERGENCY_ALT[lang] ?? EMERGENCY_ALL.en;
