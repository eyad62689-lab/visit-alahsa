// سجلّ لغات صفحة «الوصول والتنقل» — ar/en من transport.ts، وكل لغة أخرى من ملف transport.<lang>.ts
// يولّده سكربت التطبيق من حكم خط ترجمتها (لا يُحرَّر يدوياً). لغة بلا ملف لا تُبنى ولا تُربط.
import type { Lang } from '../i18n/ui';
import type { AltLinks } from '../i18n/utils';
import { PAGE, type TransportPage } from './transport';
import { TRANSPORT_ALL } from '../lib/routes';
import { TRANSPORT_ZH } from './transport.zh';
import { TRANSPORT_DE } from './transport.de';
import { TRANSPORT_RU } from './transport.ru';
import { TRANSPORT_TR } from './transport.tr';
import { TRANSPORT_UR } from './transport.ur';
// @apply-imports

export const TRANSPORT_PAGES: Partial<Record<Lang, TransportPage>> = {
  ar: PAGE.ar,
  en: PAGE.en,
  zh: TRANSPORT_ZH,
  de: TRANSPORT_DE,
  ru: TRANSPORT_RU,
  tr: TRANSPORT_TR,
  ur: TRANSPORT_UR,
  // @apply-entries
};

export const TRANSPORT_LANGS = Object.keys(TRANSPORT_PAGES) as Lang[];

/** نظائر الصفحة المبنية — مصدر hreflang ومبدّل اللغة وsitemap. */
export const TRANSPORT_ALT = Object.fromEntries(TRANSPORT_LANGS.map((l) => [l, TRANSPORT_ALL[l as keyof typeof TRANSPORT_ALL]])) as unknown as AltLinks;

/** رابط الصفحة بلغة الطلب — غير المبنية تقصد الإنجليزية. */
export const transportHref = (lang: Lang): string => TRANSPORT_ALT[lang] ?? TRANSPORT_ALL.en;
