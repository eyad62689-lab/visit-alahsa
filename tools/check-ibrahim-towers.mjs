// C39 — مرافق قصر إبراهيم في الصيغة الثلاثية بالجمع (حكم إياد 2026-10-02).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كانت الصيغة المكرّرة في الملخص ومقالات 24/48 ساعة و«يستحق الزيارة» وخطوة المسار في الرئيسية
// تقول «يجمع المسجد والثكنة والبرج» بالمفرد، بينما المتن والأسئلة «ثكنات عسكرية وأبراج مراقبة»،
// فيُقرأ المفرد برجاً واحداً. فجُمعت في كل المواضع. الصينية 军营/瞭望塔 بلا عدد نحوي فلا تُحرس.
//
// يحرس:
//   (أ) لا صيغة مفردة في أي صفحة بأي لغة — ولا «eine Kaserne» في قائمة مرافق متن الألمانية،
//       وقد كانت تُفرد الثكنات فتناقض الملخص «Kasernen» في الصفحة نفسها.
//   (ب) إيجاباً: صيغة الجمع في صفحة القصر (الملخص في وصف الصفحة) بكل لغة ذات عدد، ولا يقلّ
//       عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 4 };

export const OLD = [
  { lang: 'ar', re: /المسجد\s+والثكنة\s+والبرج/ },
  { lang: 'en', re: /mosque,\s+garrison\s+and\s+tower(?![a-z])/i },
  { lang: 'de', re: /Moschee,\s+Kaserne\s+und\s+Turm(?![a-zäöü])/ },
  { lang: 'de', re: /eine\s+Kaserne,\s+Wachtürme/ },
  { lang: 'ru', re: /мечеть,\s+казармы\s+и\s+башн[юя](?![а-яё])/i },
];

export const OK = {
  ar: /المسجد\s+والثكنات\s+والأبراج/,
  en: /mosque,\s+barracks\s+and\s+towers/i,
  de: /Moschee,\s+Kasernen\s+und\s+Türme(?![a-zäöü])/,
  ru: /мечеть,\s+казармы\s+и\s+башни(?![а-яё])/iu,
};

const TARGET = /^(?:معالم\/قصر-إبراهيم|(?:en|de|ru)\/attractions\/qasr-ibrahim)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkIbrahimTowers(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    for (const { lang: l, re } of OLD) {
      const m = re.exec(html);
      if (m) problems.push(`${rel}: الصيغة المفردة (${l}) ⇐ «${snip(html, m.index)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: صيغة الجمع غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات قصر إبراهيم المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
