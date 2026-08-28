// خريطة الموقع ثنائية اللغة — كل صفحة بنسختيها مع روابط hreflang البديلة.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { EVENTS_AR, EVENTS_EN } from '../data/events';
import { attractionAlt } from '../lib/routes';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://visit-alahsa.com');
  const abs = (p: string) => new URL(p, base).href;
  const items = await getCollection('attractions');
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  // أزواج (عربي/إنجليزي) — تُستبعد «رحلتي» الشخصية (noindex)
  const pairs: { ar: string; en?: string }[] = [
    { ar: '/', en: '/en/' },
    { ar: '/معالم/', en: '/en/attractions/' },
    { ar: '/أسواق-ومنتزهات-ومزارع/', en: '/en/souqs-parks-farms/' },
    { ar: '/خريطة/', en: '/en/map/' },
    { ar: '/خريطة-تضاريس/', en: '/en/terrain-map/' },
    { ar: '/ثمار/', en: '/en/fruits/' },
    { ar: '/أكلات/', en: '/en/food/' },
    { ar: '/مطاعم-ومقاهي/', en: '/en/restaurants-cafes/' },
    { ar: '/فعاليات/', en: '/en/events/' },
    { ar: '/خطط/', en: '/en/plan-your-trip/' },
    { ar: '/مدونة/', en: '/en/blog/' },
    // مقالات المدونة — الاقتران بحقل key المشترك بين الترجمتين
    ...posts
      .filter((p) => p.data.lang === 'ar')
      .map((p) => {
        const en = posts.find((x) => x.data.key === p.data.key && x.data.lang === 'en');
        return { ar: '/مدونة/' + p.data.slug + '/', en: en ? '/en/blog/' + en.data.slug + '/' : undefined };
      }),
    // مقال إنجليزي بلا نظير عربي: يدخل بحقل ar (الحقل الإلزامي للرابط) بلا hreflang
    ...posts
      .filter((p) => p.data.lang === 'en' && !posts.some((x) => x.data.key === p.data.key && x.data.lang === 'ar'))
      .map((p) => ({ ar: '/en/blog/' + p.data.slug + '/' })),
    ...items.map((e) => attractionAlt(e.data)),
    // صفحات الفعاليات المفردة — تُقرن بالمعرّف id لا بالترتيب
    ...EVENTS_AR.map((e) => ({
      ar: '/فعاليات/' + e.slug + '/',
      en: EVENTS_EN.find((x) => x.id === e.id) ? '/en/events/' + EVENTS_EN.find((x) => x.id === e.id)!.slug + '/' : undefined,
    })),
  ];

  const alts = (p: { ar: string; en?: string }) => {
    if (!p.en) return '';
    return (
      `\n    <xhtml:link rel="alternate" hreflang="ar" href="${abs(p.ar)}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="en" href="${abs(p.en)}"/>` +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.ar)}"/>`
    );
  };

  const urls: string[] = [];
  for (const p of pairs) {
    urls.push(`  <url><loc>${abs(p.ar)}</loc>${alts(p)}</url>`);
    if (p.en) urls.push(`  <url><loc>${abs(p.en)}</loc>${alts(p)}</url>`);
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    urls.join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
