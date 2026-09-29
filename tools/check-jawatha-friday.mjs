// C30 — جمعة جواثا على لفظ الحديث: «أول موضع أُقيمت فيه صلاة الجمعة بعد المسجد النبوي»
// (حكم إياد 2026-09-29).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كانت صفحة المسجد تقول «بعد مسجد الجمعة في المدينة» — وهو مسجد آخر (في ديار بني سالم)، والحديث
// يقول «مسجد رسول الله ﷺ» — وورثتها الترجمات الثلاث؛ وكانت صفحة المنتزه تجزم «ثاني موضع أُقيمت
// فيه الجمعة في الإسلام» وهو ما لا يقوله الحديث.
//
// يحرس:
//   (أ) لا صفحة تذكر جواثا وتسمّي مسجد الجمعة، بأي لغة.
//   (ب) لا «ثاني/second» في صفحتَي المسجد والمنتزه بأي لغة (نصاً وJSON-LD وسمات). صفحة المسارات
//       خارج هذا البند عمداً: تنقل الحديث بلفظه ثم تقول «يُعرف بثاني مسجد» — نسبةٌ إلى الشهرة لا جزم.
//   (ج) إيجاباً: الصفحتان تسمّيان المسجد النبوي بكل لغة مبنية، ولا يقلّ عددها عن EXPECT.minPages
//       — فلا يصير الحارس فارغاً.
//
// الأنماط الروسية بـ[а-яё] لا \w ولا \b: آسكيّان في JS فلا يطابقان السيريلية ولا يُخفقان.

export const EXPECT = { minPages: 10 };

const JAWATHA = /جواث|Jawatha|贾瓦塔|Джават/;

export const WRONG_MOSQUE = {
  ar: /مسجد الجمعة/,
  en: /Jumu['’]ah Mosque/i,
  zh: /主麻清真寺/,
  de: /Jumu['’]ah-Moschee/i,
  ru: /аль-Джумах/i,
};
export const SECOND = {
  ar: /ثاني (?:موضع|مسجد)/,
  en: /second (?:place|mosque)/i,
  zh: /第二处/,
  de: /zweite[nrs]? (?:Ort|Moschee)/i,
  ru: /втор(?:ое|ая|ой|ым|ом|ого)(?![а-яё])/i,
};
export const PROPHET = {
  ar: /المسجد النبوي/,
  en: /Prophet['’]s Mosque/,
  zh: /先知清真寺/,
  de: /Prophetenmoschee/,
  ru: /мечет[а-яё]* Пророка/,
};

// الصفحتان المعنيّتان بكل لغة (المسار النسبي في dist بفواصل /)
const TARGET = /^(?:(?:en|zh|de|ru)\/attractions\/jawatha-(?:mosque|park)|معالم\/(?:مسجد-جواثا|منتزه-جواثا-السياحي))\/index\.html$/;

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, jawathaPages: number}}}
 */
export function checkJawathaFriday(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0, jawathaPages = 0;
  for (const { rel, lang, html } of pages) {
    const text = decode(html);
    if (!JAWATHA.test(text)) continue;
    jawathaPages++;
    // سياق المطابقة بالقصّ لا ببناء تعبير نمطي من مصدر آخر (Semgrep detect-non-literal-regexp).
    const at = (re) => {
      const m = re.exec(text);
      return m ? text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, ' ') : '';
    };
    if (WRONG_MOSQUE[lang]?.test(text)) problems.push(`${rel}: يسمّي مسجد الجمعة ⇐ «${at(WRONG_MOSQUE[lang])}»`);
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (SECOND[lang]?.test(text)) problems.push(`${rel}: «ثاني» في صفحة جواثا ⇐ «${at(SECOND[lang])}»`);
    if (!PROPHET[lang]?.test(text)) problems.push(`${rel}: لا يسمّي المسجد النبوي`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحتا المسجد والمنتزه المفحوصتان ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, jawathaPages } };
}
