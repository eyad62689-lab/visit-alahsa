// C76 — الخليج «الخليج العربي» في كل لغة (قرار إياد 2026-10-27، ينقض القرار المؤسِّس «الخليج بلا وصف»).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة. الأوردية يحرسها C59 في tools/check-ur-text.mjs بالقرار نفسه.
//
// يحرس في صفحات en وzh وde وru وtr (الإنجليزية بإقرار إياد «حسب السياق»، 2026-10-27):
//   (أ) كل ورود لكلمة الخليج يحمل الوصف «العربي» بصيغة اللغة، إلا علم الشارع (طريق الخليج)
//       والاسم الرسمي لمجلس التعاون.
//   (ب) لا «الخليج الفارسي» بأي صيغة.
//   (ج) إيجاباً: الاسم الموصوف وارد في EXPECT[lang] صفحة على الأقل من كل لغة مبنية — فلا يصير
//       الحارس فارغاً. والتركية بلا صفحات بعد، فحدّها صفر حتى تُبنى.
//
// الأنماط الروسية بـ[а-яё] وراية u لا \w ولا \b: آسكيّان في JS فلا يطابقان السيريلية.

export const EXPECT = { en: 24, zh: 24, de: 24, ru: 25, tr: 0 }; // المقيس عند الدفعة 2026-10-27

// كلمة الخليج في كل لغة. الروسية بلا «заливает(ся)» (فعل «يغمر»: «вода заливается золотым светом»)
export const GULF_WORD = {
  en: /\bGulf\b/g,
  zh: /湾/g,
  de: /Golf/g,
  ru: /[Зз]алив(?!ает)/gu,
  tr: /Körfez/g,
};
// ما يسبق الكلمة أو يحيط بها فيجعل الورود سليماً
export const QUALIFIED = {
  en: (t, i) => t.slice(i - 8, i) === 'Arabian ',
  zh: (t, i) => t.slice(i - 3, i) === '阿拉伯',
  de: (t, i) => /[Aa]rabische[nmrs]?\s+$/.test(t.slice(Math.max(0, i - 14), i)),
  // وسمة البحث في دليل المتاجر بأحرف صغيرة («арабского залива»)
  ru: (t, i) => /[Аа]рабск[а-яё]{1,4}\s+$/u.test(t.slice(Math.max(0, i - 14), i)),
  tr: (t, i) => t.slice(i - 5, i) === 'Arap ',
};
// المستثنى: علم الشارع والاسم الرسمي لمجلس التعاون
export const KEEP = {
  en: (t, i) => t.startsWith('Gulf Cooperation Council', i),
  zh: (t, i) => t.startsWith('湾路', i) || t.startsWith('湾合作委员会', i) || t.startsWith('湾阿拉伯国家合作委员会', i),
  de: (t, i) => t.startsWith('Golf-Kooperationsrat', i),
  ru: () => false,
  tr: (t, i) => t.startsWith('Körfez İşbirliği Konseyi', i),
};
export const PERSIAN = {
  en: /Persian Gulf/,
  zh: /波斯湾/,
  de: /[Pp]ersische[nmrs]?\s+Golf/,
  ru: /[Пп]ерсидск[а-яё]*\s+залив/u,
  tr: /Basra Körfez/,
};
export const ARABIAN = {
  en: /Arabian Gulf/,
  zh: /阿拉伯湾/,
  de: /[Aa]rabische[nmrs]?\s+Golf/,
  ru: /Арабск[а-яё]*\s+залив/u,
  tr: /Arap Körfez/,
};

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');

/**
 * @param {{rel: string, lang: string, html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {perLang: Record<string, number>, mentions: number}}}
 */
export function checkGulfName(pages) {
  const problems = [];
  const perLang = Object.fromEntries(Object.keys(EXPECT).map((l) => [l, 0]));
  let mentions = 0;
  for (const { rel, lang, html } of pages) {
    if (!(lang in GULF_WORD)) continue;
    const text = decode(html);
    const at = (i, n = 1) => text.slice(Math.max(0, i - 30), i + n + 30).replace(/\s+/g, ' ');
    const persian = PERSIAN[lang].exec(text);
    if (persian) problems.push(`${rel}: الخليج «الفارسي» ⇐ «${at(persian.index, persian[0].length)}»`);
    for (const m of text.matchAll(GULF_WORD[lang])) {
      mentions++;
      if (QUALIFIED[lang](text, m.index) || KEEP[lang](text, m.index)) continue;
      problems.push(`${rel}: الخليج بلا «العربي» ⇐ «${at(m.index, m[0].length)}»`);
    }
    if (ARABIAN[lang].test(text)) perLang[lang]++;
  }
  for (const [l, min] of Object.entries(EXPECT)) {
    if (perLang[l] < min) problems.push(`الاسم الموصوف في ${perLang[l]} صفحة ${l} فقط (الحدّ الأدنى ${min}) — الحارس صار فارغاً`);
  }
  return { problems, stats: { perLang, mentions } };
}
