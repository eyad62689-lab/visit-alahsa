// C35 — مطلّ جبل القارة: الـ2.5 مليون نخلة عددُ الواحة لا مدى النظر (حكم إياد 2026-09-30).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كان مقال دليل جبل القارة يقول بلغاته الخمس «أكثر من 2.5 مليون نخلة تمتد تحتك» — فيَعِد الواقفَ
// على الجبل بأن يرى نخيل الواحة كلها (أمسكها القارئ الأعمى الألماني: «أأرى فعلاً 2.5 مليون نخلة؟»).
// والرقم رقم اليونسكو للواحة كلها («more than 2.5 million palm trees»)؛ فصار: ما تراه «طرفٌ من
// واحةٍ تضمّ أكثر من 2.5 مليون نخلة».
//
// يحرس:
//   (أ) لا صياغة المشهد القديمة في أي صفحة بأي لغة.
//   (ب) إيجاباً: الصياغة المعتمدة في مقال الدليل بكل لغة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 5 };

export const OLD = [
  { lang: 'ar', re: /نخلة\s+تمتد\s+تحتك/ },
  { lang: 'en', re: /palms\s+stretching\s+below\s+you/i },
  { lang: 'zh', re: /脚下便是\s*250/ },
  { lang: 'de', re: /Palmen\s+breiten\s+sich\s+unter\s+Ihnen/ },
  { lang: 'ru', re: /под\s+вами\s+простираются\s+более\s+2,5/i },
];

export const OK = {
  ar: /طرفٌ?\s+من\s+واحةٍ?\s+تضمّ?\s+أكثر\s+من\s+2\.5\s+مليون\s+نخلة/,
  en: /part\s+of\s+an\s+oasis\s+of\s+more\s+than\s+2\.5\s+million\s+date\s+palms/i,
  zh: /这还只是绿洲的一角，整片绿洲共有\s*250\s*多万棵椰枣树/,
  de: /nur\s+einen\s+Teil\s+davon\.\s+Die\s+ganze\s+Oase\s+zählt\s+mehr\s+als\s+2,5\s+Millionen\s+Dattelpalmen/,
  ru: /лишь\s+часть\s+оазиса,\s+в\s+котором\s+растёт\s+более\s+2,5\s+млн\s+финиковых\s+пальм/i,
};

const TARGET = /^(?:مدونة\/دليل-زيارة-جبل-القارة|(?:en|zh|de|ru)\/blog\/jabal-al-qarah-guide)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkQarahPalms(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    for (const { lang: l, re } of OLD) {
      const m = re.exec(html);
      if (m) problems.push(`${rel}: صياغة المشهد القديمة (${l}) ⇐ «${snip(html, m.index)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: الصياغة المعتمدة غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`مقالات دليل جبل القارة المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
