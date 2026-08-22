import type { Lang } from '../i18n/ui';

// تاريخ ميلادي بأرقام لاتينية دائماً (قاعدة الموقع 2026-07-21) باللغتين.
// ca-gregory صريحة: بعض اللهجات العربية (ar-SA) تفترض التقويم الهجري.
export function formatDate(d: Date, lang: Lang): string {
  const locale = lang === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
