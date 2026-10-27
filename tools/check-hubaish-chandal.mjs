// C41 — شرح الشندل في متن مسجد الحبيش (حكم إياد 2026-10-02).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة. نظير شرط الشرح في C40 (قصر إبراهيم).
//
// متن الحبيش يذكر الشندل في سقفه بلا بيان، فأُلحق به الشرح المعتمد في قصر إبراهيم: خشبٌ كان يُجلب
// إلى الخليج (سند المعجم: catnaps.org وأطروحة UCL عن عمارة الدوحة؛ المنشأ المحدد لا يُذكر).
//
// يحرس إيجاباً: الشرح بعد الشندل في صفحة الحبيش بكل لغة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 6 };

export const OK = {
  ar: /الشندل\s+\(كان\s+يُجلب\s+إلى\s+الخليج\)/,
  en: /chandal\s+wood\s+\(timber\s+once\s+imported\s+to\s+the\s+Arabian\s+Gulf\s+region\)/i,
  de: /Chandal-Holz\s+\(Bauholz,\s+das\s+früher\s+in\s+die\s+Region\s+am\s+Arabischen\s+Golf\s+eingeführt\s+wurde\)/,
  ru: /шандаль\s+\(его\s+когда-то\s+привозили\s+в\s+регион\s+Арабского\s+залива\)/u,
  zh: /尚达尔木杆（chandal，阿拉伯湾传统建筑常用的进口木料）/,
  ur: /شندل\s+نامی\s+لکڑی\s+\(جو\s+کبھی\s+خلیج\s+عرب\s+کے\s+خطے\s+میں\s+درآمد\s+کی\s+جاتی\s+تھی\)/,
};

const TARGET = /^(?:معالم\/مسجد-الحبيش|(?:en|zh|de|ru|ur)\/attractions\/hubaish)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru'|'ur', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkHubaishChandal(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  for (const { rel, lang, html } of pages) {
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: شرح الشندل غائب`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات الحبيش المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
