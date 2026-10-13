// C32 — بيت البيعة بُني عام 1203هـ/1788م (حكم إياد 2026-09-30).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كان الموقع يقول «1203هـ/1789م» بسند ويكيبيديا العربية وحدها. السنة الهجرية 1203 تمتد من
// 2 أكتوبر 1788 إلى 20 سبتمبر 1789 فتحتمل الميلاديتين، والسند الرسمي يحسم: دارة الملك عبدالعزيز
// («تم تشييده في عام 1203 هـ 1788 م») وسعوديبيديا عن هيئة التراث وواس («بني… عام 1203هـ/1788م»).
//
// يحرس:
//   (أ) لا «1789» في أي صفحة تذكر 1203 — القرن الهجري هو ما يربط الرقم ببيت البيعة، فلا تُمسّ
//       سنة 1789 إن وردت يوماً في سياق آخر.
//   (ب) إيجاباً: صفحة بيت البيعة بكل لغة مبنية تقرن 1203 بـ1788، ولا يقلّ عددها عن
//       EXPECT.minPages — فلا يصير الحارس فارغاً.

export const EXPECT = { minPages: 6 };

// 1203 ثم 1788 في حدود 40 محرفاً بلا رقم بينهما: «1203هـ/1788م» · «1203 AH / 1788 CE» ·
// «1203 年（公元 1788 年）» · «1203 nach der Hidschra (1788» · «1203 году хиджры (1788».
export const PAIR_OK = /1203\D{1,40}1788/;
export const HIJRI = /(?<!\d)1203(?!\d)/;
export const OLD_YEAR = /(?<!\d)1789(?!\d)/;

// صفحة بيت البيعة بكل لغة (المسار النسبي في dist بفواصل /)
const TARGET = /^(?:(?:en|zh|de|ru|ur)\/attractions\/baiah|معالم\/بيت-البيعة)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru'|'ur', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, hijriPages: number}}}
 */
export function checkBaiahYear(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  let hijriPages = 0;
  for (const { rel, lang, html } of pages) {
    if (HIJRI.test(html)) {
      hijriPages++;
      const m = OLD_YEAR.exec(html);
      if (m) problems.push(`${rel}: «1789» في صفحة تذكر 1203 ⇐ «${html.slice(Math.max(0, m.index - 40), m.index + 44).replace(/\s+/g, ' ')}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!PAIR_OK.test(html)) problems.push(`${rel}: «1203…1788» غائبة من صفحة بيت البيعة`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات بيت البيعة المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, hijriPages } };
}
