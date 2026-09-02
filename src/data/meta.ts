// تواريخ آخر مراجعة تحريرية للمعلومات العملية — موضع واحد بدل نصوص ثابتة
// («رُوجعت في يونيو 2026م») كانت موزّعة في أربع واجهات وتتقادم بصمت.
//
// كل مفتاح هو مجموعة معلومات رُوجعت معاً؛ حدّث الشهر هنا عند كل مراجعة فعلية
// فتتغيّر كل المواضع دفعة واحدة. الصيغة YYYY-MM (لا يوم — المراجعة شهرية).
import type { Lang } from '../i18n/ui';

export const REVIEWED = {
  /** المواعيد والرسوم في بطاقات «معلومات الزيارة» للمعالم وأسئلة «خطط لرحلتك» */
  attractions: '2026-06',
  /** مواعيد نضج الثمار في صفحة «ثمار الواحة» */
  fruits: '2026-07',
} as const;

const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

/** «يونيو 2026م» / "June 2026" / "2026 年 6 月" — أرقام لاتينية دائماً (قاعدة الموقع). */
export function reviewedLabel(key: keyof typeof REVIEWED, lang: Lang): string {
  const [y, m] = REVIEWED[key].split('-').map(Number);
  if (lang === 'ar') return `${MONTHS_AR[m - 1]} ${y}م`;
  if (lang === 'zh') return `${y} 年 ${m} 月`;
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(Date.UTC(y, m - 1, 1)));
}
