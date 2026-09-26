// نقطة نهاية ساكنة تولّد GeoJSON للمعالم من مجموعة المحتوى نفسها —
// مصدر الحقيقة الوحيد (لا ازدواج بيانات): تُبنى إلى dist/data/landmarks.geojson.
// تستهلكها الخريطة التضاريسية (MapLibre) وخريطة التراجع (Leaflet).
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { attractionHref } from '../../lib/routes';

export const GET: APIRoute = async () => {
  const items = await getCollection('attractions');
  const features = items
    .filter((e) => e.data.location)
    .map((e) => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        // GeoJSON يرتّب الإحداثيات [lng, lat] بعكس اصطلاح Leaflet
        coordinates: [e.data.location!.lng, e.data.location!.lat],
      },
      properties: {
        id: e.id,
        name_ar: e.data.title,
        name_en: e.data.title_en ?? e.data.title,
        category: e.data.category,
        slug_ar: e.data.slug_ar,
        slug_en: e.data.slug_en,
        url_ar: attractionHref(e.data, 'ar'),
        url_en: attractionHref(e.data, 'en'),
        // الصينية والألمانية والروسية (المرحلة هـ): الاسم والرابط متى حمل المعلم ترجمته المعتمدة،
        // وإلا تتراجع الخريطة إلى الإنجليزية (name_en/url_en) — فلا رابط إلى صفحة غير مبنية.
        ...(e.data.title_zh ? { name_zh: e.data.title_zh, url_zh: attractionHref(e.data, 'zh') } : {}),
        ...(e.data.title_de ? { name_de: e.data.title_de, url_de: attractionHref(e.data, 'de') } : {}),
        ...(e.data.title_ru ? { name_ru: e.data.title_ru, url_ru: attractionHref(e.data, 'ru') } : {}),
        thumb: e.data.heroImage ? `${e.data.heroImage}.webp` : null,
      },
    }));

  return new Response(
    JSON.stringify({ type: 'FeatureCollection', features }),
    { headers: { 'Content-Type': 'application/geo+json; charset=utf-8' } },
  );
};
