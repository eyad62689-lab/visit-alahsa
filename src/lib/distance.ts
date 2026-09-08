// مسافات تقريبية بخطٍّ مستقيم (haversine) وصياغتها بلغة الصفحة — الخطوة 7 من خطة
// التفاعل العالمي (ف2). كانت الدالة والنصوص داخل DetailView (بطاقات «القريب»)، ونُقلت
// هنا لتشاركها الخريطة («بالقرب مني») وزر «كم يبعد عني». لا تُقدَّر مسافات قيادة.
// النصوص الصينية من خط zh-translation (misc.underKm/aboutKm — دورة 2026-08-29)،
// والألمانية من دفعة الواجهة الألمانية (2026-09-03)، والروسية من دفعة الواجهة الروسية (2026-09-05).
import type { Lang } from '../i18n/ui';

export function kmBetween(la1: number, lo1: number, la2: number, lo2: number): number {
  const r = Math.PI / 180;
  const dLa = (la2 - la1) * r, dLo = (lo2 - lo1) * r;
  const h = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(dLo / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/** قوالب الصياغة لكل لغة — {n} موضع الرقم (أرقام لاتينية بحكم قاعدة الموقع). */
export const DIST_LABELS: Record<Lang, { under: string; about: string }> = {
  ar: { under: 'أقل من كيلومتر', about: 'نحو {n} كم' },
  en: { under: 'under 1 km', about: '~{n} km' },
  zh: { under: '不足 1 公里', about: '约 {n} 公里' },
  de: { under: 'unter 1 km', about: 'ca. {n} km' },
  ru: { under: 'менее 1 км', about: 'около {n} км' },
};

export const distLabel = (km: number, lang: Lang): string =>
  km < 1 ? DIST_LABELS[lang].under : DIST_LABELS[lang].about.replace('{n}', String(Math.round(km)));
