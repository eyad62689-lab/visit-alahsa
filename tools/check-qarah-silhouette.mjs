// C38 — حجم جبل القارة يُقاس بهيئته من الخارج لا باسمه (حكم إياد 2026-10-01).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كان مقال دليل جبل القارة يقول بالعربية «وحجمه أكبر مما يوحي به اسمه» وبالروسية «больше, чем
// можно подумать по её названию» — والاسم لا يوحي بحجم؛ بينما قالت en/zh/de «silhouette» (الهيئة).
// فوُحِّدت اللغات الخمس على الهيئة: «أكبر مما يوحي به مظهره من الخارج» و«глядя снаружи».
//
// يحرس:
//   (أ) لا مقارنة بالاسم في أي صفحة بأي لغة.
//   (ب) إيجاباً: صيغة الهيئة في مقال الدليل بكل لغة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 5 };

export const OLD = [
  { lang: 'ar', re: /أكبر\s+مما\s+يوحي\s+به\s+اسمه/ },
  { lang: 'en', re: /larger\s+than\s+its\s+name\s+suggests/i },
  { lang: 'ru', re: /подумать\s+по\s+её\s+названию/i },
];

export const OK = {
  ar: /أكبر\s+مما\s+يوحي\s+به\s+مظهره\s+من\s+الخارج/,
  en: /larger\s+than\s+its\s+silhouette\s+suggests/i,
  zh: /比轮廓看上去更大/,
  de: /größer,\s+als\s+seine\s+Silhouette\s+vermuten\s+lässt/,
  ru: /больше,\s+чем\s+можно\s+подумать,\s+глядя\s+снаружи/i,
};

const TARGET = /^(?:مدونة\/دليل-زيارة-جبل-القارة|(?:en|zh|de|ru)\/blog\/jabal-al-qarah-guide)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkQarahSilhouette(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    for (const { lang: l, re } of OLD) {
      const m = re.exec(html);
      if (m) problems.push(`${rel}: مقارنة الحجم بالاسم (${l}) ⇐ «${snip(html, m.index)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: صيغة الهيئة غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`مقالات دليل جبل القارة المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
