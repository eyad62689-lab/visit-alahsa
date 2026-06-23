// خريطة الموقع ثنائية اللغة — كل صفحة بنسختيها مع روابط hreflang البديلة.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://visit-alahsa.com');
  const abs = (p: string) => new URL(p, base).href;
  const items = await getCollection('attractions');

  // أزواج (عربي/إنجليزي) — تُستبعد «رحلتي» الشخصية (noindex)
  const pairs: { ar: string; en?: string }[] = [
    { ar: '/', en: '/en/' },
    { ar: '/معالم/', en: '/en/attractions/' },
    { ar: '/خريطة/', en: '/en/map/' },
    { ar: '/brand/' },
    ...items.map((e) => ({ ar: '/معالم/' + e.data.slug_ar, en: '/en/attractions/' + e.data.slug_en })),
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
