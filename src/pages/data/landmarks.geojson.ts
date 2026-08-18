// نقطة نهاية ساكنة تولّد GeoJSON للمعالم من مجموعة المحتوى نفسها —
// مصدر الحقيقة الوحيد (لا ازدواج بيانات): تُبنى إلى dist/data/landmarks.geojson.
// تستهلكها الخريطة التضاريسية (MapLibre) وخريطة التراجع (Leaflet).
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

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
        url_ar: `/معالم/${e.data.slug_ar}/`,
        url_en: `/en/attractions/${e.data.slug_en}/`,
        thumb: e.data.heroImage ? `${e.data.heroImage}.webp` : null,
      },
    }));

  return new Response(
    JSON.stringify({ type: 'FeatureCollection', features }),
    { headers: { 'Content-Type': 'application/geo+json; charset=utf-8' } },
  );
};
