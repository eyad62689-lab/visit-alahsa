// C31 — بحيرة الأصفر بصياغة واس: «من أكبر التجمعات المائية في منطقة الخليج العربي»
// (حكم إياد 2026-09-29).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كانت الصفحة تقول «من أكبر البحيرات الطبيعية في الخليج العربي» وورثتها الترجمات الثلاث. لا سند
// لهذه الصيغة: ملف الترشيح السعودي لليونسكو (2017) وتقييم إيكوموس (2018) يصفان البحيرة
// «drainage zone collecting the waters from the oasis»، والسند الرسمي الوحيد للحجم — واس
// (2019-03-20، spa.gov.sa/1901639) — يقول «من أكبر التجمعات المائية في منطقة الخليج العربي».
// وكانت الإنجليزية «in the Arabian Gulf» تعني «داخل البحر».
//
// يحرس:
//   (أ) لا دعوى «أكبر البحيرات الطبيعية» في أي صفحة، بأيّ من صيغ اللغات الست (كل الأنماط على
//       كل صفحة — نصّ تراجعٍ إنجليزي داخل صفحة غير إنجليزية لا يفلت).
//   (ب) لا «in the Arabian Gulf» في صفحة الأصفر الإنجليزية (قراءة البحر).
//   (ج) إيجاباً: صفحة الأصفر بكل لغة مبنية تحمل صياغة واس، ولا يقلّ عددها عن EXPECT.minPages
//       — فلا يصير الحارس فارغاً.
//
// الأنماط الروسية بـ[а-яё] لا \w ولا \b: آسكيّان في JS فلا يطابقان السيريلية ولا يُخفقان.

export const EXPECT = { minPages: 6 };

// المفرد والجمع والتعريف والتنكير معاً: «أكبر بحيرة طبيعية» و«最大天然湖泊» بلا 的 لا تفلت. و«طبيعي»
// مع «المسطح المائي» ممنوعة كذلك: VisitSaudi الصينية تنشر «海湾地区最大的天然水域»، وهي الصيغة التي
// سيجدها أي مترجم قادم.
export const NATURAL_LAKE = {
  ar: /أكبر (?:ال)?(?:بحير(?:ة|ات)|تجمعات المائية|مسطحات المائية) (?:ال)?طبيعي/,
  en: /largest natural (?:lakes?|bod(?:y|ies) of water)/i,
  zh: /最大的?天然(?:湖|水域)/,
  de: /größte[nrs]? natürliche[nrs]? (?:Seen?|Gewässer)/i,
  ru: /крупнейш[а-яё]* природн[а-яё]* (?:оз[её]р|водо[её]м)/i,
  ur: /سب سے بڑ[یے] قدرتی (?:جھیل|آبی)/,
};

export const SEA_READING = { en: /in the Arabian Gulf/ };

// صياغة واس بكل لغة كما اعتمدتها خطوط الترجمة (دفعة asfar-wording). الألمانية بلا الضمير
// (Eines/eines) فتطابق النبذة والمتن معاً؛ والروسية على الجذع لأنها تُصرَّف.
export const SPA_WORDING = {
  ar: /من أكبر التجمعات المائية في منطقة الخليج العربي/,
  en: /largest bodies of water/,
  zh: /海湾地区最大的水域之一/,
  de: /größten Gewässer der Golfregion/,
  ru: /крупнейших водоём[а-яё]* в регионе Залива/,
  ur: /خلیجی خطے کے سب سے بڑے آبی اجسام میں سے ایک/,
};

// صفحة الأصفر بكل لغة (المسار النسبي في dist بفواصل /). النمط الأوردي من نبذة الصفحة المعتمدة
// في خط ترجمتها: «من أكبر» بـ«میں سے ایک»، و«التجمعات المائية» بلا لفظ البحيرة ولا «طبيعي»،
// والخليج مجرّداً منسوباً إلى المنطقة.
const TARGET = /^(?:(?:en|zh|de|ru|ur)\/attractions\/asfar|معالم\/بحيرة-الأصفر)\/index\.html$/;

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

/**
 * @param {{rel: string, lang: 'ar'|'en'|'zh'|'de'|'ru'|'ur', html: string}[]} pages كل صفحات dist
 * @returns {{problems: string[], stats: {targets: number, perLang: Record<string, number>, scanned: number}}}
 */
export function checkAsfarWording(pages) {
  const problems = [];
  const perLang = {};
  let targets = 0;
  for (const { rel, lang, html } of pages) {
    const text = decode(html);
    // سياق المطابقة بالقصّ لا ببناء تعبير نمطي من مصدر آخر (Semgrep detect-non-literal-regexp).
    const at = (re) => {
      const m = re.exec(text);
      return m ? text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40).replace(/\s+/g, ' ') : '';
    };
    for (const [l, re] of Object.entries(NATURAL_LAKE)) {
      if (re.test(text)) problems.push(`${rel}: دعوى «أكبر البحيرات الطبيعية» (${l}) ⇐ «${at(re)}»`);
    }
    if (!TARGET.test(rel)) continue;
    targets++;
    perLang[lang] = (perLang[lang] ?? 0) + 1;
    if (SEA_READING[lang]?.test(text)) problems.push(`${rel}: «in the Arabian Gulf» تُقرأ «داخل البحر» ⇐ «${at(SEA_READING[lang])}»`);
    if (!SPA_WORDING[lang]?.test(text)) problems.push(`${rel}: صياغة واس غائبة (${SPA_WORDING[lang]})`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات الأصفر المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets, perLang, scanned: pages.length } };
}
