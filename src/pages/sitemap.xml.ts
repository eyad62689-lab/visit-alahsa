// خريطة الموقع ثنائية اللغة — كل صفحة بنسختيها مع روابط hreflang البديلة.
//
// lastmod (2026-08-30): تاريخ حقيقي أو لا تاريخ. مقالات المدونة تعلن تاريخها في
// الترويسة فهو الفيصل؛ وما عداها يُشتقّ من آخر التزام git مسّ ملف مصدره. وحين
// يتعذّر git يسقط الحقل من الخريطة كلها بدل تلفيق تاريخ موحَّد (انظر git-dates.ts).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { EVENTS_AR, EVENTS_EN } from '../data/events';
import { attractionAlt } from '../lib/routes';
import { newestDate } from '../lib/git-dates';

type Pair = { ar: string; en?: string; zh?: string; lastmod?: string };

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://visit-alahsa.com');
  const abs = (p: string) => new URL(p, base).href;
  const items = await getCollection('attractions');
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // ملفات مصدر كل صفحة قائمة — تاريخها أحدث ما بين قالبها وبيانات محتواها
  const V = 'src/components/views/';
  const attractionFiles = items.map((e) => e.filePath).filter((p): p is string => Boolean(p));
  const dateOf = (...paths: string[]) => newestDate(paths);

  // أزواج (عربي/إنجليزي/صيني اختياري) — تُستبعد «رحلتي» الشخصية (noindex).
  // zh يرد من attractionAlt حين يحمل المعلم ترجمة صينية معتمدة (title_zh).
  const pairs: Pair[] = [
    { ar: '/', en: '/en/', zh: '/zh/', lastmod: dateOf(`${V}HomeView.astro`, 'src/i18n/ui.ts', ...attractionFiles) },
    { ar: '/معالم/', en: '/en/attractions/', zh: '/zh/attractions/', lastmod: dateOf(`${V}AttractionsView.astro`, ...attractionFiles) },
    // صفحة الأسواق والمنتزهات تستخدم AttractionsView نفسه بنطاق leisure
    { ar: '/أسواق-ومنتزهات-ومزارع/', en: '/en/souqs-parks-farms/', lastmod: dateOf(`${V}AttractionsView.astro`, ...attractionFiles) },
    { ar: '/خريطة/', en: '/en/map/', lastmod: dateOf(`${V}MapView.astro`, ...attractionFiles) },
    { ar: '/خريطة-تضاريس/', en: '/en/terrain-map/', lastmod: dateOf(`${V}TerrainMapView.astro`, ...attractionFiles) },
    { ar: '/ثمار/', en: '/en/fruits/', lastmod: dateOf(`${V}FruitsView.astro`, 'src/data/fruits.ts') },
    { ar: '/أكلات/', en: '/en/food/', lastmod: dateOf(`${V}FoodView.astro`, 'src/data/dishes.ts') },
    { ar: '/مطاعم-ومقاهي/', en: '/en/restaurants-cafes/', lastmod: dateOf(`${V}DiningView.astro`, 'src/data/dining.ts') },
    { ar: '/فعاليات/', en: '/en/events/', lastmod: dateOf(`${V}EventsView.astro`, 'src/data/events.ts') },
    { ar: '/خطط/', en: '/en/plan-your-trip/', lastmod: dateOf(`${V}PlanTripView.astro`) },
    { ar: '/مدونة/', en: '/en/blog/', lastmod: dateOf(`${V}BlogIndexView.astro`, ...posts.map((p) => p.filePath!).filter(Boolean)) },
    // مقالات المدونة — الاقتران بحقل key المشترك بين الترجمتين.
    // التاريخ من ترويسة المقال نفسه: هو إعلان الكاتب، وأوثق من تاريخ الالتزام.
    ...posts
      .filter((p) => p.data.lang === 'ar')
      .map((p) => {
        const en = posts.find((x) => x.data.key === p.data.key && x.data.lang === 'en');
        const d = [p.data.updatedDate ?? p.data.pubDate, en?.data.updatedDate ?? en?.data.pubDate]
          .filter((x): x is Date => Boolean(x))
          .map((x) => x.toISOString().slice(0, 10))
          .sort()
          .at(-1);
        return { ar: '/مدونة/' + p.data.slug + '/', en: en ? '/en/blog/' + en.data.slug + '/' : undefined, lastmod: d };
      }),
    // مقال إنجليزي بلا نظير عربي: يدخل بحقل ar (الحقل الإلزامي للرابط) بلا hreflang
    ...posts
      .filter((p) => p.data.lang === 'en' && !posts.some((x) => x.data.key === p.data.key && x.data.lang === 'ar'))
      .map((p) => ({
        ar: '/en/blog/' + p.data.slug + '/',
        lastmod: (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10),
      })),
    ...items.map((e) => ({ ...attractionAlt(e.data), lastmod: e.filePath ? dateOf(e.filePath) : undefined })),
    // صفحات الفعاليات المفردة — تُقرن بالمعرّف id لا بالترتيب
    ...EVENTS_AR.map((e) => ({
      ar: '/فعاليات/' + e.slug + '/',
      en: EVENTS_EN.find((x) => x.id === e.id) ? '/en/events/' + EVENTS_EN.find((x) => x.id === e.id)!.slug + '/' : undefined,
      lastmod: dateOf('src/data/events.ts', `${V}EventDetailView.astro`),
    })),
  ];

  const lm = (p: Pair) => (p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : '');
  const alts = (p: Pair) => {
    if (!p.en) return '';
    return (
      `\n    <xhtml:link rel="alternate" hreflang="ar" href="${abs(p.ar)}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="en" href="${abs(p.en)}"/>` +
      (p.zh ? `\n    <xhtml:link rel="alternate" hreflang="zh" href="${abs(p.zh)}"/>` : '') +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.ar)}"/>`
    );
  };

  const urls: string[] = [];
  for (const p of pairs) {
    urls.push(`  <url><loc>${abs(p.ar)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.en) urls.push(`  <url><loc>${abs(p.en)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.zh) urls.push(`  <url><loc>${abs(p.zh)}</loc>${lm(p)}${alts(p)}</url>`);
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
