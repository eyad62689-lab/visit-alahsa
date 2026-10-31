// خريطة الموقع ثنائية اللغة — كل صفحة بنسختيها مع روابط hreflang البديلة.
//
// lastmod (2026-08-30): تاريخ حقيقي أو لا تاريخ. مقالات المدونة تعلن تاريخها في
// الترويسة فهو الفيصل؛ وما عداها يُشتقّ من آخر التزام git مسّ ملف مصدره. وحين
// يتعذّر git يسقط الحقل من الخريطة كلها بدل تلفيق تاريخ موحَّد (انظر git-dates.ts).
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { EVENTS_AR, EVENTS_EN, EVENTS_DE, EVENTS_RU, EVENTS_ZH, eventsFor } from '../data/events';
import { attractionAlt, blogHref, diningAlt, stayAlt, staticAlt, guideAlt, ABOUT_ALT, STORES_ALT, GUIDES_ALT } from '../lib/routes';
import { publishedGuides } from '../lib/guides';
import { storesLangs } from '../lib/stores';
import { newestDate } from '../lib/git-dates';
import { isThinAttraction } from '../lib/publish';
import { VISA_GUIDE_ALT } from '../lib/visa-guide.mjs';
import { isUnlisted } from '../i18n/unlisted';
import { TRAILS } from '../data/trails';
import { trailAlt, trailsIndexAlt } from '../lib/trails';

type Pair = { ar: string; en?: string; zh?: string; de?: string; ru?: string; ur?: string; tr?: string; lastmod?: string };

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://visit-alahsa.com');
  const abs = (p: string) => new URL(p, base).href;
  const items = await getCollection('attractions');
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const places = await getCollection('dining');
  const stays = await getCollection('stay');
  const guides = await publishedGuides();

  // ملفات مصدر كل صفحة قائمة — تاريخها أحدث ما بين قالبها وبيانات محتواها
  const V = 'src/components/views/';
  const TRAIL_FILES = ['src/data/trails.json', 'src/data/trails.zh.json', 'src/data/trails.de.json', 'src/data/trails.ru.json', 'src/data/trails.ur.json', 'src/data/trails.tr.json'];
  const attractionFiles = items.map((e) => e.filePath).filter((p): p is string => Boolean(p));
  const dateOf = (...paths: string[]) => newestDate(paths);

  // صفحة منشأة/إقامة: العربية تُبنى بمتن عربي ≥ 80 كلمة، والإنجليزية بمتن إنجليزي ≥ 100، وكل لغة
  // أخرى (zh/de/ru/ur) تُبنى بعتبة الإنجليزية نفسها مع body_<lang> معتمد (ويحمله alt من routes.ts
  // دالةً واحدة: diningAlt/stayAlt). فالخريطة تُدرج كل صفحة مبنية بلغتها — الأوردية منها (2026-10-22)،
  // وإلا حملت /ur/stay/<slug>/ hreflang="ur" وغابت عن الخريطة (يحرسه C75).
  const facilityPairs = (
    e: { body?: string; filePath?: string; data: { blurb: string; blurb_en: string; body_en: string } },
    a: { ar: string; en: string; zh?: string; de?: string; ru?: string; ur?: string; tr?: string },
  ): Pair[] => {
    const w = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
    const bodyAr = (e.body ?? '').trim();
    const okAr = w(bodyAr) >= 80 && bodyAr !== e.data.blurb;
    const okEn = w(e.data.body_en) >= 100 && e.data.body_en.trim() !== e.data.blurb_en;
    if (!okAr && !okEn) return [];
    const lastmod = e.filePath ? dateOf(e.filePath) : undefined;
    if (okAr && okEn) return [{ ar: a.ar, en: a.en, ...(a.zh ? { zh: a.zh } : {}), ...(a.de ? { de: a.de } : {}), ...(a.ru ? { ru: a.ru } : {}), ...(a.ur ? { ur: a.ur } : {}), ...(a.tr ? { tr: a.tr } : {}), lastmod }];
    const out: Pair[] = [{ ar: okAr ? a.ar : a.en, lastmod }];
    // لغات zh/de/ru/ur لا تحتاج العتبة العربية: متى عبر الإنجليزي بنيت فتدخل منفردةً (غير المعلَن في unlisted.ts يُستبعد)
    if (okEn) for (const l of ['zh', 'de', 'ru', 'ur', 'tr'] as const) if (a[l] && !isUnlisted(a[l]!)) out.push({ ar: a[l]!, lastmod });
    return out;
  };

  // أزواج (عربي/إنجليزي/صيني اختياري) — تُستبعد «رحلتي» الشخصية (noindex).
  // zh/de/ru/ur ترد من attractionAlt حين يحمل المعلم ترجمةً معتمدة بتلك اللغة.
  // التركية: فهرس المعالم وصفحات المعالم الحاملة title_tr وحدها (النواة)؛ ولا رئيسية /tr/ بعد.
  // الأوردو: الرئيسية وفهرسا المعالم والأسواق وصفحات الثمار والمطبخ والخريطة والفعاليات (وصفحاتها المفردة) لها صفّ ur هنا؛ وما عداها بلا صفحة أوردية فلا يُعلَن.
  const pairs: Pair[] = [
    { ar: '/', en: '/en/', zh: '/zh/', de: '/de/', ru: '/ru/', ur: '/ur/', tr: '/tr/', lastmod: dateOf(`${V}HomeChaptersView.astro`, 'src/data/home-copy.ts', 'src/data/home-chapters.ts', 'src/i18n/ui.ts', ...attractionFiles) },
    { ar: '/معالم/', en: '/en/attractions/', zh: '/zh/attractions/', de: '/de/attractions/', ru: '/ru/attractions/', ur: '/ur/attractions/', tr: '/tr/attractions/', lastmod: dateOf(`${V}AttractionsView.astro`, ...attractionFiles) },
    // صفحة الأسواق والمنتزهات تستخدم AttractionsView نفسه بنطاق leisure
    { ar: '/أسواق-ومنتزهات-ومزارع/', en: '/en/souqs-parks-farms/', zh: '/zh/souqs-parks-farms/', de: '/de/souqs-parks-farms/', ru: '/ru/souqs-parks-farms/', ur: '/ur/souqs-parks-farms/', lastmod: dateOf(`${V}AttractionsView.astro`, ...attractionFiles) },
    { ar: '/خريطة/', en: '/en/map/', zh: '/zh/map/', de: '/de/map/', ru: '/ru/map/', ur: '/ur/map/', lastmod: dateOf(`${V}MapView.astro`, ...attractionFiles) },
    { ...staticAlt('terrainMap'), lastmod: dateOf(`${V}TerrainMapView.astro`, ...attractionFiles) },

    // السياسات: مفهرسة وتعلن hreflang بلغاتها الخمس (يحرسه C75)
    { ...staticAlt('legal'), lastmod: dateOf(`${V}LegalView.astro`, 'src/data/legal.ts') },
    { ar: '/ثمار/', en: '/en/fruits/', zh: '/zh/fruits/', de: '/de/fruits/', ru: '/ru/fruits/', ur: '/ur/fruits/', lastmod: dateOf(`${V}FruitsView.astro`, 'src/data/fruits.ts') },
    { ar: '/أكلات/', en: '/en/food/', zh: '/zh/food/', de: '/de/food/', ru: '/ru/food/', ur: '/ur/food/', lastmod: dateOf(`${V}FoodView.astro`, 'src/data/dishes.ts') },
    { ar: '/مطاعم-ومقاهي/', en: '/en/restaurants-cafes/', zh: '/zh/restaurants-cafes/', de: '/de/restaurants-cafes/', ru: '/ru/restaurants-cafes/', ur: '/ur/restaurants-cafes/', lastmod: dateOf(`${V}DiningView.astro`, ...places.map((e) => e.filePath!).filter(Boolean)) },
    { ar: '/إقامة/', en: '/en/stay/', zh: '/zh/stay/', de: '/de/stay/', ru: '/ru/stay/', ur: '/ur/stay/', lastmod: dateOf(`${V}StayView.astro`, ...stays.map((e) => e.filePath!).filter(Boolean)) },
    { ar: '/فعاليات/', en: '/en/events/', zh: '/zh/events/', de: '/de/events/', ru: '/ru/events/', ur: '/ur/events/', lastmod: dateOf(`${V}EventsView.astro`, 'src/data/events.ts') },
    { ar: '/خطط/', en: '/en/plan-your-trip/', zh: '/zh/plan-your-trip/', de: '/de/plan-your-trip/', ru: '/ru/plan-your-trip/', ur: '/ur/plan-your-trip/', lastmod: dateOf(`${V}PlanTripView.astro`) },
    // دليل التأشيرات عربي وإنجليزي (2026-10-16) — نصّه في src/data/visa-guide.ts
    { ...VISA_GUIDE_ALT, lastmod: dateOf(`${V}VisaGuideView.astro`, 'src/data/visa-guide.ts') },
    { ...staticAlt('unesco'), lastmod: dateOf(`${V}UnescoView.astro`, ...attractionFiles) },
    // «عن زوروا الأحساء» (2026-09-27) — عربي/إنجليزي فقط
    { ...ABOUT_ALT, lastmod: dateOf(`${V}AboutView.astro`) },
    // دليل المرشدين (عربي/إنجليزي): الفهرس وصفحاته تدخل الخريطة متى وُجد مرشد منشور — بلا مرشد
    // يبقى الفهرس مبنياً لكنه noindex فلا يُعلَن هنا (src/lib/guides.ts)
    ...(guides.length ? [
      { ...GUIDES_ALT, lastmod: dateOf(`${V}GuidesView.astro`, ...guides.map((e) => e.filePath!).filter(Boolean)) },
      ...guides.map((e) => ({ ...guideAlt(e.data), lastmod: e.filePath ? dateOf(e.filePath, `${V}GuideView.astro`) : undefined })),
    ] : []),
    // دليل المتاجر الإلكترونية (أُعلن 2026-10-09) — اللغات المبنية فعلاً من ملفات ترجمته
    { ...Object.fromEntries(storesLangs.filter((l): l is keyof typeof STORES_ALT => l in STORES_ALT).map((l) => [l, STORES_ALT[l]])) as Pair, lastmod: dateOf(`${V}StoresDirectoryView.astro`, ...storesLangs.map((l) => `src/data/stores-directory.${l}.json`)) },
    // المسارات المقترحة بلغاتها الخمس — التاريخ من ملفات البيانات وقالبها
    { ...trailsIndexAlt(), lastmod: dateOf(`${V}TrailsIndexView.astro`, ...TRAIL_FILES) },
    ...TRAILS.map((tr) => ({ ...trailAlt(tr), lastmod: dateOf(`${V}TrailView.astro`, ...TRAIL_FILES) })),
    { ar: '/مدونة/', en: '/en/blog/', zh: '/zh/blog/', de: '/de/blog/', ru: '/ru/blog/', ur: '/ur/blog/', lastmod: dateOf(`${V}BlogIndexView.astro`, ...posts.map((p) => p.filePath!).filter(Boolean)) },
    // مقالات المدونة — الاقتران بحقل key المشترك بين لغاته (ar/en/zh/de/ru منذ الخطوة 10).
    // التاريخ من ترويسة المقال نفسه (أحدث نسخة): هو إعلان الكاتب، وأوثق من تاريخ الالتزام.
    ...[...new Set(posts.map((p) => p.data.key))].map((key) => {
      const by = new Map(posts.filter((p) => p.data.key === key).map((p) => [p.data.lang, p]));
      const lastmod = [...by.values()].map((p) => (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10)).sort((a, b) => a.localeCompare(b)).at(-1);
      const href = (l: 'ar' | 'en' | 'zh' | 'de' | 'ru' | 'ur') => { const p = by.get(l); return p ? blogHref(p.data) : undefined; };
      // مقال بلا نسخة عربية يدخل بحقل ar (الحقل الإلزامي للرابط) بنسخته الإنجليزية بلا hreflang
      return by.has('ar')
        ? { ar: href('ar')!, en: href('en'), zh: href('zh'), de: href('de'), ru: href('ru'), ur: href('ur'), lastmod }
        : { ar: href('en')!, lastmod };
    }),
    // المعالم الرقيقة (lib/publish.ts) noindex فلا تدخل الخريطة بأي لغة
    ...items.filter((e) => !isThinAttraction(e)).map((e) => ({ ...attractionAlt(e.data), lastmod: e.filePath ? dateOf(e.filePath) : undefined })),
    // صفحات المنشآت المفردة وأماكن الإقامة — تدخل الخريطة فقط متى عبر متنُها العتبة، تطابقاً
    // مع حارس getStaticPaths. وإن عبرت لغةٌ دون الأخرى دخلت وحدها بلا hreflang،
    // فلا يُعلَن زوجٌ لصفحة غير مولَّدة (docs/قرار-بنية-صفحات-المنشآت.md).
    ...places.flatMap((e) => facilityPairs(e, diningAlt(e.data))),
    ...stays.flatMap((e) => facilityPairs(e, stayAlt(e.data))),
    // صفحات الفعاليات المفردة — تُقرن بالمعرّف id لا بالترتيب؛ النسخة الصينية كاملة
    ...EVENTS_AR.map((e) => ({
      ar: '/فعاليات/' + e.slug + '/',
      en: EVENTS_EN.find((x) => x.id === e.id) ? '/en/events/' + EVENTS_EN.find((x) => x.id === e.id)!.slug + '/' : undefined,
      zh: EVENTS_ZH.find((x) => x.id === e.id) ? '/zh/events/' + EVENTS_ZH.find((x) => x.id === e.id)!.slug + '/' : undefined,
      de: EVENTS_DE.find((x) => x.id === e.id) ? '/de/events/' + EVENTS_DE.find((x) => x.id === e.id)!.slug + '/' : undefined,
      ru: EVENTS_RU.find((x) => x.id === e.id) ? '/ru/events/' + EVENTS_RU.find((x) => x.id === e.id)!.slug + '/' : undefined,
      // الأوردو: المواسم المتكرّرة وحدها (لا نصّ أوردي للفعالية المؤقتة، كاللغات الثلاث)
      ur: eventsFor('ur').find((x) => x.id === e.id && !x.oneOff) ? '/ur/events/' + eventsFor('ur').find((x) => x.id === e.id)!.slug + '/' : undefined,
      lastmod: dateOf('src/data/events.ts', `${V}EventDetailView.astro`),
    })),
  ];

  // الصفحات غير المعلَنة (src/i18n/unlisted.ts) تُحذف من أزواجها: لا تدخل الخريطة
  // ولا تُذكر بديلاً لنظيراتها (الخطوة 5 من خطة التفاعل العالمي)
  for (const p of pairs) {
    for (const k of ['zh', 'de', 'ru', 'ur', 'tr'] as const) if (p[k] && isUnlisted(p[k]!)) delete p[k];
  }
  const lm = (p: Pair) => (p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : '');
  const alts = (p: Pair) => {
    if (!p.en) return '';
    return (
      `\n    <xhtml:link rel="alternate" hreflang="ar" href="${abs(p.ar)}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="en" href="${abs(p.en)}"/>` +
      (p.zh ? `\n    <xhtml:link rel="alternate" hreflang="zh" href="${abs(p.zh)}"/>` : '') +
      (p.de ? `\n    <xhtml:link rel="alternate" hreflang="de" href="${abs(p.de)}"/>` : '') +
      (p.ru ? `\n    <xhtml:link rel="alternate" hreflang="ru" href="${abs(p.ru)}"/>` : '') +
      (p.ur ? `\n    <xhtml:link rel="alternate" hreflang="ur" href="${abs(p.ur)}"/>` : '') +
      (p.tr ? `\n    <xhtml:link rel="alternate" hreflang="tr" href="${abs(p.tr)}"/>` : '') +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.ar)}"/>`
    );
  };

  const urls: string[] = [];
  for (const p of pairs) {
    urls.push(`  <url><loc>${abs(p.ar)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.en) urls.push(`  <url><loc>${abs(p.en)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.zh) urls.push(`  <url><loc>${abs(p.zh)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.de) urls.push(`  <url><loc>${abs(p.de)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.ru) urls.push(`  <url><loc>${abs(p.ru)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.ur) urls.push(`  <url><loc>${abs(p.ur)}</loc>${lm(p)}${alts(p)}</url>`);
    if (p.tr) urls.push(`  <url><loc>${abs(p.tr)}</loc>${lm(p)}${alts(p)}</url>`);
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
