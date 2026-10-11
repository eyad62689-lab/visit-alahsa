// C42 — علل القرّاء الصينيين على العقير (2026-10-02): صيغ صينية ملتبسة لا تعود.
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// - «首座海港» تحتمل «الأول» و«الرئيسي» ← «第一座海港» (المصدر: أول ميناء بحري).
// - «这里是…首座海港» في القلعة كانت تجعل القلعة ميناءً ← «乌盖尔港是…».
// - «都曾在此礼拜» في المسجد كانت تُقرأ الميناء ← «都曾在寺中礼拜».
// - «用它为绿洲两日收尾» و«也有它的一页»: «它» بلا مرجع واضح.
//
// يحرس: (أ) لا صيغة سابقة في أي صفحة صينية؛ (ب) إيجاباً «第一座海港» في صفحات العقير الثلاث بالصينية.

export const EXPECT = { minPages: 3 };

export const RETIRED = [
  '首座海港', '都曾在此礼拜', '用它为绿洲两日收尾', '也有它的一页', '在这里签署',
  // دفعة polish-six (قرارات إياد 2026-10-03): نجد «内志»، حصن العقير «城堡»، الواحة صراحةً، رمل بلا لون، «阴影»
  '纳季德', '老堡垒', '第二天留给它的', '黄沙在这里', '荫影',
];

// «要塞» لحصن العقير متقاعدة في صفحاته وحدها — قصر خزام يحملها مشروعاً
export const RETIRED_IN_TARGET = ['要塞'];

const TARGET = /^zh\/attractions\/(?:al-uqair|uqair-castle|uqair-mosque)\/index\.html$/;

/**
 * @param {{rel: string, lang: string, html: string}[]} pages كل صفحات dist
 */
export function checkZhUqair(pages) {
  const problems = [];
  let targets = 0;
  for (const { rel, lang, html } of pages) {
    if (lang !== 'zh') continue;
    for (const r of RETIRED) if (html.includes(r)) problems.push(`${rel}: صيغة سابقة «${r}»`);
    if (!TARGET.test(rel)) continue;
    targets++;
    for (const r of RETIRED_IN_TARGET) if (html.includes(r)) problems.push(`${rel}: صيغة سابقة «${r}»`);
    if (!html.includes('第一座海港')) problems.push(`${rel}: «第一座海港» غائبة`);
  }
  if (targets < EXPECT.minPages) problems.push(`صفحات العقير الصينية المفحوصة ${targets} — الحدّ الأدنى ${EXPECT.minPages}`);
  return { problems, stats: { targets } };
}
