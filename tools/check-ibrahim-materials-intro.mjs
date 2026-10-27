// C40 — تمهيد جملة المواد في متن قصر إبراهيم: «على الطريقة التقليدية في عمارة الخليج» (حكم إياد 2026-10-02).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة. يكمّل C36 (tools/check-ibrahim-materials.mjs) الذي يحرس
// قائمة المواد بعد النقطتين؛ هذا يحرس التمهيد قبلها.
//
// كان المتن يقول «بُني من مواد الواحة نفسها: … جذوع النخل والشندل والحجارة»، والشندل ليس من
// الواحة (المتن الصيني نفسه يصفه خشباً مستورداً 进口木料)، فالتمهيد ينفي ما تقوله القائمة بعده.
// صار «على طريقة العمارة المحلية» (حكم إياد بعد أن قرأ ثلاثة قرّاء عميان «مواد العمارة المحلية» موادَّ
// محلية المنشأ): «المحلي» صفة للطريقة لا للمواد. ثم قرأ القرّاء الطريقةَ المحليةَ دليلاً على أن الشندل
// محلي، فشُرح الشندل في موضعه «خشبٌ كان يُجلب إلى الخليج» (سند المعجم: catnaps.org وأطروحة UCL عن
// عمارة الدوحة؛ المنشأ المحدد مختلَف فيه فلا يُذكر). ثم قرأ القرّاء «محلي … مجلوب» ضدّين، فصار التمهيد
// «على الطريقة التقليدية في عمارة الخليج» (حكم إياد): تقليد خليجي وخشب جُلب إلى الخليج. (ب) يشترط التمهيد والشرح معاً.
//
// يحرس:
//   (أ) لا تمهيد «مواد الواحة نفسها» ولا نظيره في أي صفحة بأي لغة.
//   (ب) إيجاباً: التمهيد الجديد في صفحة القصر بكل لغة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 6 };

export const OLD = [
  { lang: 'ar', re: /مواد\s+الواحة\s+نفسها/ },
  { lang: 'en', re: /oasis[’']s\s+own\s+materials/i },
  { lang: 'de', re: /Baustoffen\s+der\s+Oase\s+selbst/ },
  { lang: 'ru', re: /материалов\s+самого\s+оазиса/i },
  { lang: 'zh', re: /绿洲传统建材/ },
];

export const OK = {
  ar: /على\s+الطريقة\s+التقليدية\s+في\s+عمارة\s+الخليج[\s\S]{0,300}?الشندل\s+\(خشبٌ\s+كان\s+يُجلب\s+إلى\s+الخليج\)/,
  en: /built\s+in\s+the\s+traditional\s+Gulf\s+manner[\s\S]{0,300}?chandal\s+wood\s+\(timber\s+once\s+imported\s+to\s+the\s+Gulf\)/i,
  de: /in\s+der\s+traditionellen\s+Bauweise\s+der\s+Region\s+am\s+Arabischen\s+Golf[\s\S]{0,300}?Chandal-Holz\s+\(Bauholz,\s+das\s+früher\s+in\s+die\s+Region\s+am\s+Arabischen\s+Golf\s+eingeführt\s+wurde\)/,
  ru: /в\s+традициях\s+зодчества\s+Арабского\s+залива[\s\S]{0,300}?шандаль\s+\(его\s+когда-то\s+привозили\s+в\s+регион\s+Арабского\s+залива\)/u,
  zh: /沿袭阿拉伯湾地区的营造传统[\s\S]{0,300}?阿拉伯湾传统建筑常用的进口木料/,
  // الأوردو إيجاباً فقط: الصيغة السابقة لم تُنشر بها قط، فلا نمط لها في OLD
  ur: /اسے\s+خلیج\s+عرب\s+کے\s+خطے\s+کے\s+روایتی\s+انداز\s+میں\s+تعمیر\s+کیا\s+گیا[\s\S]{0,300}?شندل\s+نامی\s+لکڑی\s+\(جو\s+کبھی\s+خلیج\s+عرب\s+کے\s+خطے\s+میں\s+درآمد\s+کی\s+جاتی\s+تھی\)/,
};

// الألمانية: «Kein Palast» تنفي معنى اسم لا يعرفه القارئ ما لم يُشرح «Qasr» عند أول ذكر (دفعة ibrahim-gloss، 2026-10-03)
export const DE_NAME_GLOSS = /Qasr\s+Ibrahim\s+\(der\s+Ibrahim-Palast\)[\s\S]{0,120}?Kein\s+Palast\s+im\s+prunkvollen\s+Sinne/;

const TARGET = /^(?:معالم\/قصر-إبراهيم|(?:en|zh|de|ru|ur)\/attractions\/qasr-ibrahim)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru'|'ur', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkIbrahimMaterialsIntro(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    for (const { lang: l, re } of OLD) {
      const m = re.exec(html);
      if (m) problems.push(`${rel}: تمهيد «مواد الواحة» (${l}) ⇐ «${snip(html, m.index)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: تمهيد «على الطريقة التقليدية في عمارة الخليج» أو شرح الشندل غائب`);
    if (lang === 'de' && !DE_NAME_GLOSS.test(html)) problems.push(`${rel}: شرح الاسم «(der Ibrahim-Palast)» قبل «Kein Palast» غائب`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات قصر إبراهيم المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
