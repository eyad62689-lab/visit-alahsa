// الصفحات غير المعلَنة — الخطوة 5 من خطة التفاعل العالمي (ع2 في التشخيص).
//
// صفحة بلغة zh/de/ru يزيد نصّها غير المترجم (كتل إنجليزية مطابقة لنظيرتها الإنجليزية)
// على 20% لا تُعلَن نسخةً بتلك اللغة: لا hreflang إليها ولا منها، ولا تدخل sitemap،
// ولا تظهر في مبدّل اللغة ولا في شريط اقتراح اللغة. تبقى مبنية ومربوطة من تنقّل
// لغتها (تسمية بلغة الزائر لصفحة تتراجع للإنجليزية، لا وعدٌ مكسور)، وتُوسم noindex
// حين يغلب عليها الإنجليزي فعلاً. يحرسها C22 على dist: كل صفحة معلَنة بهذه اللغات
// تحت 20%، وكل صفحة هنا بلا hreflang وخارج الخريطة.
//
// القياس الذي يحكم الإدراج والإخراج: tools/check-consistency.mjs (C22) — أضف أو
// احذف هنا بحسب ما يطبعه، لا بالتقدير. الخروج من القائمة يتبع اكتمال الترجمة
// عبر خطوط الترجمة الثلاثة حصراً.
import type { AltLinks } from './utils';

export const UNLISTED: ReadonlyArray<{ path: string; noindex: boolean; why: string }> = [
  // 52 من 58 معلماً بلا title_de: البطاقات إنجليزية (23%)
  { path: '/de/attractions/', noindex: false, why: 'فهرس المعالم الألماني ببطاقات إنجليزية حتى تكتمل الترجمة' },
];

const SET = new Set(UNLISTED.map((u) => u.path));

export const isUnlisted = (path: string): boolean => SET.has(path);
export const unlistedNoindex = (path: string): boolean => UNLISTED.some((u) => u.path === path && u.noindex);

/** يحذف من روابط النظائر ما هو غير معلَن — لمبدّل اللغة وhreflang وشريط الاقتراح والخريطة. */
export const listedAlt = <T extends Partial<AltLinks>>(alt: T): T => {
  const out = { ...alt };
  for (const k of Object.keys(out) as (keyof AltLinks)[]) {
    const v = out[k];
    if (v && SET.has(v)) delete out[k];
  }
  return out;
};
