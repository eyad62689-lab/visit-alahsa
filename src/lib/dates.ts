import type { Lang } from '../i18n/ui';

// تاريخ ميلادي بأرقام لاتينية دائماً (قاعدة الموقع 2026-07-21) باللغتين.
// ca-gregory صريحة: بعض اللهجات العربية (ar-SA) تفترض التقويم الهجري.
export function formatDate(d: Date, lang: Lang): string {
  // zh-CN يعطي «2026年6月21日» بأرقام لاتينية — صيغة Intl لا نصّاً مؤلَّفاً،
  // فلا تمرّ بخط الترجمة (أُضيفت 2026-08-31 مع سطر الإسناد في صفحة المعلم).
  const locale = lang === 'ar' ? 'ar-u-ca-gregory-nu-latn' : lang === 'zh' ? 'zh-CN' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

/** شهر وسنة فقط («سبتمبر 2026» / "September 2026") — لطوابع «آخر تحديث» الشهرية. */
export function formatMonth(d: Date, lang: Lang): string {
  const locale = lang === 'ar' ? 'ar-u-ca-gregory-nu-latn' : 'en-GB';
  return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);
}
