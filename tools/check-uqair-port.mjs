// C34 — ميناء العقير «أول ميناء بحري شرق المملكة على ساحل الخليج العربي» (حكم إياد 2026-09-30،
// بصياغة دارة الملك عبدالعزيز كما نقلتها واس 2018-10-04).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كان الموقع يقول دعويين متعارضتين: «أوّل موانئ المنطقة» (المعلم ومقالا الدليل، والترجمات
// «oldest») و«أقدم الموانئ البحرية في المملكة» (القلعة والمسجد). وهيئة تطوير الشرقية وعكاظ تقولان
// «أول ميناء بحري في المملكة»، والدارة أضيق: «شرق المملكة» — واعتُمدت الأضيق.
//
// يحرس:
//   (أ) لا دعوى قديمة («أقدم/أول موانئ المنطقة/أول ميناء في المملكة» ونظائرها) في أي صفحة بأي لغة.
//   (ب) إيجاباً: الصياغة المعتمدة في كل صفحة مستهدفة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 27 };

const APOS = `(?:['’]|&#39;|&#x27;)`;

export const OLD = [
  { lang: 'ar', re: /أقدم\s+الموانئ|أقدم\s+ميناء|أو[ّ]?ل\s+موانئ\s+المنطقة|أو[ّ]?ل\s+ميناء\s+بحري\s+في\s+المملكة/ },
  { lang: 'en', re: new RegExp(`oldest\\s+(?:sea)?port|first\\s+seaport\\s+in\\s+(?:Saudi\\s+Arabia|the\\s+Kingdom)|Kingdom${APOS}s\\s+first\\s+seaport`, 'i') },
  { lang: 'zh', re: /最古老的(?:海)?港/ },
  { lang: 'de', re: /ältest[a-z]*\s+(?:See)?hafen/i },
  { lang: 'ru', re: /старейш[а-яё]*\s+(?:морск[а-яё]*\s+)?порт/i },
];

export const OK = {
  ar: /أو[ّ]?ل\s+ميناء\s+بحري\s+شرق\s+المملكة/,
  en: new RegExp(
    `first\\s+seaport\\s+on\\s+(?:Saudi\\s+Arabia|the\\s+Kingdom)${APOS}s\\s+eastern` +
      `|Saudi\\s+Arabia${APOS}s\\s+first\\s+seaport\\s+on\\s+its\\s+eastern`,
    'i',
  ),
  zh: /沙特阿拉伯东部沿海的首座海港/,
  de: /(?:[Dd]er|des|dem)\s+ersten?\s+Seehafens?\s+an\s+der\s+Ostküste\s+Saudi-Arabiens/,
  ru: /исторически\s+перв[а-яё]+\s+морск[а-яё]+\s+порт[а-яё]*\s+на\s+востоке\s+Саудовской\s+Аравии/i,
};

// صفحات المعالم الثلاثة ومقالا الدليل بكل لغة، وصفحة مسار ساحل العقير (ar/en فقط)
const TARGET = new RegExp(
  '^(?:' +
    [
      'معالم/(?:العقير|قلعة-العقير|مسجد-ميناء-العقير)',
      'مدونة/(?:48-ساعة-في-الأحساء|هل-تستحق-الأحساء-الزيارة)',
      '(?:en/)?trails/al-uqair-coast',
      '(?:en|zh|de|ru)/attractions/(?:al-uqair|uqair-castle|uqair-mosque)',
      '(?:en|zh|de|ru)/blog/(?:48-hours-in-al-ahsa|is-al-ahsa-worth-visiting)',
    ].join('|') +
    ')/index\\.html$',
);

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkUqairPort(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    for (const { lang: l, re } of OLD) {
      const m = re.exec(html);
      if (m) problems.push(`${rel}: دعوى قديمة (${l}) ⇐ «${snip(html, m.index)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: الصياغة المعتمدة غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات العقير المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
