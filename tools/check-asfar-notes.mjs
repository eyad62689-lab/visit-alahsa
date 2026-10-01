// C37 — ملاحظات القرّاء العميان على بحيرة الأصفر (أحكام إياد 2026-10-01).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// ثلاثة أحكام:
//   1. فئة nature صارت «الطبيعة» لا «الطبيعة والمغارات» — 11 من معالمها الـ12 بلا مغارات.
//   2. موقع البحيرة «شمال شرق نخيل الواحة» لا «شمال شرق الواحة» — البحيرة أحد مكوّنات موقع
//      «واحة الأحساء» في اليونسكو، فكانت الصفحة تجعلها داخل الواحة وخارجها معاً.
//   3. «المحمية» منسوبة إلى إعلان الوزارة عام 2019 (واس، مارس 2019) لا دعوى حاضرة في الملخص.
//
// يحرس:
//   (أ) لا تسمية الفئة القديمة في أي صفحة بأي لغة.
//   (ب) في صفحة الأصفر بكل لغة: لا «شمال شرق الواحة» القديمة، وإيجاباً «نخيل الواحة» وجملة 2019.

export const EXPECT = { minPages: 5 };

// «بحيرة شرق العمران» في مسار الأصفر كانت مُسنَدة إلى خبر عن «مدينة الأصفر» المخطّطة شرق العمران
// لا عن البحيرة (حكم إياد 2026-10-01: تُحذف).
export const OLD_UMRAN = /بحيرة\s+شرق\s+العمران|lake\s+east\s+of\s+Al-(?:Umran|Omran)/i;

export const OLD_LABEL =/الطبيعة\s+والمغارات|Nature\s+(?:&|&amp;)\s+caves|自然与洞穴|Natur\s+und\s+Höhlen|Природа\s+и\s+пещеры/i;

export const OLD_AREA = {
  ar: /شمال\s+شرق\s+الواحة/,
  en: /northeast\s+of\s+the\s+oasis(?!\s+palm)/i,
  zh: /在绿洲东北部|绿洲东北部/,
  de: /Nordöstlich\s+der\s+Oase(?![-\w])/,
  ru: /к\s+северо-востоку\s+от\s+оазиса/i,
};

export const GROVES = {
  ar: /شمال\s+شرق\s+نخيل/,
  en: /northeast\s+of\s+the\s+(?:Al-Ahsa\s+)?oasis\s+palm\s+groves/i,
  zh: /椰枣林(?:的)?东北方/,
  de: /nordöstlich\s+der\s+Palmenhaine/i,
  ru: /к\s+северо-востоку\s+от\s+пальмовых\s+рощ/i,
};

export const RESERVE_2019 = {
  ar: /أعلنت\s+وزارة\s+البيئة\s+والمياه\s+والزراعة\s+عام\s+2019\s+تحويلها\s+إلى\s+محمية/,
  en: /In\s+2019\s+the\s+Ministry\s+of\s+Environment,\s+Water\s+and\s+Agriculture\s+announced\s+its\s+conversion\s+into\s+a\s+nature\s+reserve/,
  zh: /2019\s*年，沙特环境水务与农业部宣布将这片湖辟为自然保护区/,
  de: /2019\s+gab\s+das\s+Ministerium\s+für\s+Umwelt,\s+Wasser\s+und\s+Landwirtschaft\s+die\s+Umwandlung\s+des\s+Sees\s+in\s+ein\s+Naturreservat\s+bekannt/,
  ru: /В\s+2019\s+году\s+Министерство\s+окружающей\s+среды,\s+водных\s+ресурсов\s+и\s+сельского\s+хозяйства\s+объявило,\s+что\s+озеро\s+станет\s+охраняемой\s+территорией/,
};

// عبور الطيور مرتين في العام (واس، مارس 2019) وبند الوصول بسيارات الدفع الرباعي (تأكيد إياد 2026-10-01)
export const BIRDS = {
  ar: /وتعبرها\s+الطيور\s+المهاجرة\s+مرتين\s+في\s+العام/,
  en: /Migratory\s+birds\s+pass\s+through\s+twice\s+a\s+year/,
  zh: /候鸟每年两度途经这里/,
  de: /Zweimal\s+im\s+Jahr\s+ziehen\s+die\s+Vögel\s+hier\s+durch/,
  ru: /Птицы\s+пролетают\s+здесь\s+дважды\s+в\s+год/i,
};

export const ACCESS = {
  ar: /بسيارات\s+الدفع\s+الرباعي/,
  en: /By\s+four-wheel-drive\s+vehicle/,
  zh: /需乘坐四驱车前往/,
  de: /Mit\s+Allradfahrzeug/,
  ru: /На\s+полноприводных\s+автомобилях/,
};

const TARGET =/^(?:معالم\/بحيرة-الأصفر|(?:en|zh|de|ru)\/attractions\/asfar)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkAsfarNotes(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    const m = OLD_LABEL.exec(html);
    if (m) problems.push(`${rel}: تسمية الفئة القديمة ⇐ «${snip(html, m.index)}»`);
    const u = OLD_UMRAN.exec(html);
    if (u) problems.push(`${rel}: «شرق العمران» غير المُسنَدة ⇐ «${snip(html, u.index)}»`);
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    const a = OLD_AREA[lang].exec(html);
    if (a) problems.push(`${rel}: الموقع القديم ⇐ «${snip(html, a.index)}»`);
    if (!GROVES[lang].test(html)) problems.push(`${rel}: «نخيل الواحة» غائبة`);
    if (!RESERVE_2019[lang].test(html)) problems.push(`${rel}: جملة إعلان المحمية 2019 غائبة`);
    if (!BIRDS[lang].test(html)) problems.push(`${rel}: جملة عبور الطيور غائبة`);
    if (!ACCESS[lang].test(html)) problems.push(`${rel}: بند الوصول بالدفع الرباعي غائب`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات الأصفر المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
