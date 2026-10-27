import type { Lang } from '../i18n/ui';

// محليّات Intl لكل لغة؛ العربية بتقويم ميلادي وأرقام لاتينية صراحةً.
// والأوردو بأرقام لاتينية صراحةً كذلك: ur-PK تعطيها افتراضاً، لكن ur-IN تعطي U+06F0–06F9
// (مقيس على ICU 78)، فلا يُترك رقم الموقع اللاتيني لافتراض المحليّة.
const LOCALE: Record<Lang, string> = { ar: 'ar-u-ca-gregory-nu-latn', en: 'en-GB', zh: 'zh-CN', de: 'de-DE', ru: 'ru-RU', ur: 'ur-PK-u-nu-latn', tr: 'tr-TR' };

// تاريخ ميلادي بأرقام لاتينية دائماً (قاعدة الموقع 2026-07-21) باللغتين.
// ca-gregory صريحة: بعض اللهجات العربية (ar-SA) تفترض التقويم الهجري.
export function formatDate(d: Date, lang: Lang): string {
  // zh-CN يعطي «2026年6月21日» بأرقام لاتينية — صيغة Intl لا نصّاً مؤلَّفاً،
  // فلا تمرّ بخط الترجمة (أُضيفت 2026-08-31 مع سطر الإسناد في صفحة المعلم).
  return new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

/** شهر وسنة فقط («سبتمبر 2026» / "September 2026" / «2026年9月») — لطوابع «آخر تحديث» الشهرية.
 *  zh صيغة Intl لا نصّ مؤلَّف (سابقة formatDate) — أُضيفت مع فهرسَي الإقامة والمطاعم الصينيين 2026-09-02. */
export function formatMonth(d: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(LOCALE[lang], { month: 'long', year: 'numeric' }).format(d);
}
