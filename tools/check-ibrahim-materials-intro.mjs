// C40 — تمهيد جملة المواد في متن قصر إبراهيم: «مواد العمارة المحلية» (حكم إياد 2026-10-02).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة. يكمّل C36 (tools/check-ibrahim-materials.mjs) الذي يحرس
// قائمة المواد بعد النقطتين؛ هذا يحرس التمهيد قبلها.
//
// كان المتن يقول «بُني من مواد الواحة نفسها: … جذوع النخل والشندل والحجارة»، والشندل ليس من
// الواحة (المتن الصيني نفسه يصفه خشباً مستورداً 进口木料)، فالتمهيد ينفي ما تقوله القائمة بعده.
// صار «من مواد العمارة المحلية» — مواد التقليد البنائي، لا مواد محلية المنشأ.
//
// يحرس:
//   (أ) لا تمهيد «مواد الواحة نفسها» ولا نظيره في أي صفحة بأي لغة.
//   (ب) إيجاباً: التمهيد الجديد في صفحة القصر بكل لغة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 5 };

export const OLD = [
  { lang: 'ar', re: /مواد\s+الواحة\s+نفسها/ },
  { lang: 'en', re: /oasis[’']s\s+own\s+materials/i },
  { lang: 'de', re: /Baustoffen\s+der\s+Oase\s+selbst/ },
  { lang: 'ru', re: /материалов\s+самого\s+оазиса/i },
  { lang: 'zh', re: /绿洲传统建材/ },
];

export const OK = {
  ar: /مواد\s+العمارة\s+المحلية/,
  en: /materials\s+of\s+the\s+local\s+building\s+tradition/i,
  de: /__DE_PENDING__/,
  ru: /__RU_PENDING__/,
  zh: /__ZH_PENDING__/,
};

const TARGET = /^(?:معالم\/قصر-إبراهيم|(?:en|zh|de|ru)\/attractions\/qasr-ibrahim)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
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
    if (!OK[lang].test(html)) problems.push(`${rel}: تمهيد «مواد العمارة المحلية» غائب`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات قصر إبراهيم المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
