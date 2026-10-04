// C43 — اسم القسم في الترويسة = عنوان صفحته (حكم إياد 2026-10-04).
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بصفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// كانت الترويسة تختصر («مطاعم ومقاهي» · «الإقامة» · «أسواق ومنتزهات» · «خطّط زيارتك») والتذييل
// والمقالات تسمّي الأقسام بعناوين صفحاتها، فقرأها القرّاء العميان أبواباً مختلفة.
//
// يحرس في الرئيسية بكل لغة:
//   (أ) نصّ رابط الترويسة إلى المطاعم والإقامة والأسواق = H1 صفحته حرفياً؛
//   (ب) نصّ الزرّ الذهبي = نصّ رابط الخطة داخل القائمة (وجهة واحدة باسم واحد).

export const EXPECT = { minLangs: 5 };

const HOME = { ar: 'index.html', en: 'en/index.html', de: 'de/index.html', ru: 'ru/index.html', zh: 'zh/index.html' };
const SECTIONS = {
  dine: { ar: 'مطاعم-ومقاهي', other: 'restaurants-cafes' },
  stay: { ar: 'إقامة', other: 'stay' },
  leisure: { ar: 'أسواق-ومنتزهات-ومزارع', other: 'souqs-parks-farms' },
};

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (h) => decode(h.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const h1Of = (html) => { const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/); return m ? text(m[1]) : null; };
const headerOf = (html) => { const i = html.indexOf('<header'); const j = html.indexOf('</header>', i); return i === -1 || j === -1 ? '' : html.slice(i, j); };
const anchors = (html) => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attrs, inner]) => ({
  href: (() => { const h = attrs.match(/href="([^"]*)"/)?.[1] ?? ''; try { return decodeURI(h); } catch { return h; } })(),
  cls: attrs.match(/class="([^"]*)"/)?.[1] ?? '',
  text: text(inner),
}));

/**
 * @param {{rel: string, lang: string, html: string}[]} pages كل صفحات dist (rel بشرطة أمامية)
 */
export function checkNavTitles(pages) {
  const problems = [];
  const byRel = new Map(pages.map((p) => [p.rel.replace(/\\/g, '/'), p.html]));
  let langs = 0;
  for (const [lang, homeRel] of Object.entries(HOME)) {
    const home = byRel.get(homeRel);
    if (!home) continue;
    langs++;
    const links = anchors(headerOf(home));
    for (const [key, slug] of Object.entries(SECTIONS)) {
      const path = lang === 'ar' ? `/${slug.ar}/` : `/${lang}/${slug.other}/`;
      const target = byRel.get(`${path.slice(1)}index.html`);
      const h1 = target && h1Of(target);
      if (!h1) { problems.push(`${lang}: صفحة ${key} بلا H1 (${path})`); continue; }
      const link = links.find((a) => a.href === path);
      if (!link) problems.push(`${lang}: لا رابط في الترويسة إلى ${path}`);
      else if (link.text !== h1) problems.push(`${lang}: ${key} في الترويسة «${link.text}» ≠ عنوان الصفحة «${h1}»`);
    }
    const gold = links.find((a) => /\bbtn-gold\b/.test(a.cls));
    const plan = links.find((a) => /\bnav-plan\b/.test(a.cls));
    if (!gold || !plan) problems.push(`${lang}: الزرّ الذهبي أو رابط الخطة غائب`);
    else if (gold.text !== plan.text) problems.push(`${lang}: الزرّ «${gold.text}» ≠ رابط الخطة «${plan.text}»`);
  }
  if (langs < EXPECT.minLangs) problems.push(`لغات الترويسة المفحوصة ${langs} — الحدّ الأدنى ${EXPECT.minLangs}`);
  return { problems, stats: { langs } };
}
