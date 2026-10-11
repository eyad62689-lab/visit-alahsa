// C36 — مواد بناء قصر إبراهيم بتقرير واس (رقم الخبر 1857654؛ حكم إياد 2026-09-30).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كان الموقع يقول بلغاته الخمس إن في القصر «مدرستين من البناء: متانة الحجر، ودفء الطين المحلّي
// الذي يتنفّس مع المناخ»، وإن «الطين والحجر يلتقيان» فيه. وتقرير واس: الجدران من الطين المخلوط
// بالقش، والأسقف من جذوع النخيل والشندل والحجارة، والمئذنة بسلّم حلزوني من الحجر — مادّتان في
// طريقة محلية واحدة لا مدرستان.
//
// يحرس:
//   (أ) لا عبارة «المدرستين» ولا «التقاء الطين والحجر» في أي صفحة بأي لغة.
//   (ب) إيجاباً: جملة المواد الجديدة في صفحة القصر بكل لغة، ولا يقلّ عددها عن EXPECT.minPages.

export const EXPECT = { minPages: 5 };

export const OLD = [
  { lang: 'ar', re: /مدرستان\s+من\s+البناء|يلتقي(?:ان)?\s+فيه\s+الطين\s+والحجر|الطين\s+والحجر\s+يلتقيان|يتنفّس\s+مع\s+المناخ/ },
  { lang: 'en', re: /two\s+schools\s+of\s+building|mud\s+and\s+stone\s+meet|breathes\s+with\s+the\s+climate/i },
  { lang: 'zh', re: /泥砖与石材|石材与泥砖|两种建筑传统|随气候而呼吸/ },
  { lang: 'de', re: /Zwei Bauweisen|Lehm und Stein|mit dem Klima atmet|Wärme des heimischen Lehms|Festigkeit des Steins/ },
  { lang: 'ru', re: /две строительные традиции|дышит в лад с климатом|сходятся глина и камень|глина и камень сходятся/i },
];

export const OK = {
  ar: /جدرانٌ?\s+من\s+الطين\s+المخلوط\s+بالقش/,
  en: /walls\s+of\s+mud\s+mixed\s+with\s+straw/i,
  zh: /墙体以草拌泥筑成/,
  de: /Mauern\s+bestehen\s+aus\s+strohvermischtem\s+Lehm/,
  ru: /стены\s+сложены\s+из\s+глины,\s+смешанной\s+с\s+соломой/i,
};

const TARGET = /^(?:معالم\/قصر-إبراهيم|(?:en|zh|de|ru)\/attractions\/qasr-ibrahim)\/index\.html$/;

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkIbrahimMaterials(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  const snip = (html, i) => html.slice(Math.max(0, i - 40), i + 50).replace(/\s+/g, ' ');
  for (const { rel, lang, html } of pages) {
    for (const { lang: l, re } of OLD) {
      const m = re.exec(html);
      if (m) problems.push(`${rel}: وصف المواد القديم (${l}) ⇐ «${snip(html, m.index)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (!OK[lang].test(html)) problems.push(`${rel}: جملة المواد المعتمدة غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات قصر إبراهيم المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
