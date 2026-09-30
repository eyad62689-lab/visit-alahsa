// C33 — ممرات جبل القارة: «28 ممراً طولياً شاهقاً تمتد لمسافة 1.5 كيلومتر» (إفادة إياد 2026-09-30).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كان المتن العربي ومقال الدليل باللغات الخمس يقولان «قاعدة الجبل نحو 14 كم²، ويمتد من الشمال
// إلى الجنوب نحو ألف متر» — جملة متناقضة (ألف متر طولاً لا تحيط بـ14 كم²). والإفادة تُنقل حرفياً:
// لا يُعرف أهي 1.5 كم مجموع امتداد الممرات أم طول كل ممر، فلا «مجتمعةً» ولا «كلٌّ منها».
//
// يحرس:
//   (أ) لا «14 كم²» بأي لغة في أي صفحة (لا ورود مشروعاً لها في الموقع يوم كُتب الحارس).
//   (ب) لا «ألف متر» ونظائرها في الصفحات المستهدفة.
//   (ج) إيجاباً: 28 ثم 1.5 (أو 1,5) في كل صفحة مستهدفة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 6 };

export const OLD_AREA = /(?<!\d)14\s?(?:كم²|كم2|km²|km2|平方公里|км²|км2|кв\.\s?км)/;
export const OLD_LENGTH = /ألف متر|thousand met|1000\s?米|tausend Meter|тысяч[иа]? метр/i;
export const PAIR_OK = /(?<!\d)28(?!\d)[\s\S]{1,160}?(?<!\d)1[.,]5(?!\d)/;

// صفحة المعلم العربية (وحدها تحمل الجملة؛ الترجمات لا تحملها) ومقال الدليل بكل لغة
const TARGET = /^(?:معالم\/جبل-القارة|مدونة\/دليل-زيارة-جبل-القارة|(?:en|zh|de|ru)\/blog\/jabal-al-qarah-guide)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkQarahPassages(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 44).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    const a = OLD_AREA.exec(html);
    if (a) problems.push(`${rel}: مساحة القاعدة القديمة ⇐ «${snip(html, a.index)}»`);
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    const l = OLD_LENGTH.exec(html);
    if (l) problems.push(`${rel}: الامتداد القديم ⇐ «${snip(html, l.index)}»`);
    if (!PAIR_OK.test(html)) problems.push(`${rel}: «28…1.5» غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات جبل القارة المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
