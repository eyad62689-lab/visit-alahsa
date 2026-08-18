# زوروا الأحساء — Visit Al-Ahsa

موقع Astro ثنائي اللغة (عربي RTL في الجذر، إنجليزي تحت `/en/`). يُنشر آلياً:
`git push` إلى `main` ← Netlify يبني ← visit-alahsa.com.

- البناء: `npm run build` (يشمل فهرسة Pagefind). المعاينة: إعداد `astro-preview` في `.claude/launch.json`.
- تفاصيل التحرير والقواعد التحريرية في `CLAUDE.md` في جذر المشروع الأكبر.

## الخرائط ومصادر البلاطات

صفحتا خرائط مستقلتان لكل لغة:

| الصفحة | المكتبة | البلاطات | المفتاح |
|---|---|---|---|
| `/خريطة/` و`/en/map/` | Leaflet (مستضاف ذاتياً في `public/vendor/leaflet-1.9.4`) | CARTO light (`basemaps.cartocdn.com`) | بلا مفتاح |
| `/خريطة-تضاريس/` و`/en/terrain-map/` | MapLibre GL v6 (حزمة npm، تُحمَّل كسولاً) | أساس: OpenFreeMap Liberty (`tiles.openfreemap.org`) · ارتفاعات: Terrarium من AWS Open Data (`s3.amazonaws.com/elevation-tiles-prod`) | بلا مفتاح |

شروط الإسناد (تظهر في شريط attribution داخل الخرائط ولا تُحذف):

- **OpenStreetMap** — `© OpenStreetMap contributors` (أساس بيانات CARTO وOpenFreeMap معاً).
- **CARTO** — إسناد `© CARTO` لبلاطات الخريطة التقليدية.
- **OpenFreeMap / OpenMapTiles** — إسناد النمط والبلاطات المتجهة للخريطة التضاريسية.
- **Terrain: Joerd / AWS Open Data** — بلاطات الارتفاعات (Terrarium). مجانية بلا حساب ولا سقف استخدام.

ملاحظات تقنية للخريطة التضاريسية:

- بيانات المعالم تُولَّد وقت البناء من مجموعة المحتوى إلى `/data/landmarks.geojson`
  (المصدر: `src/pages/data/landmarks.geojson.ts` — لا يُحرَّر GeoJSON يدوياً).
- ترميز الارتفاعات `encoding: 'terrarium'` **إلزامي** — الافتراضي `mapbox` يُنتج ارتفاعات خاطئة بصمت.
- عامل MapLibre v6 ملف ESM منفصل مستضاف في `public/vendor/maplibre-6.4.1/`
  (worker + shared). عند ترقية maplibre-gl انسخ الملفين من `dist/` إلى مجلد
  جديد باسم الإصدار وحدِّث `workerUrl` في `TerrainMapView.astro`.
- ملحق تشكيل النص العربي مستضاف في `public/vendor/maplibre/mapbox-gl-rtl-text-0.2.3.min.js`.
- MapLibre لا يدخل حزمة أي صفحة: يُحمَّل عبر `import()` فقط عند توفّر WebGL2
  ودخول الحاوية الشاشة (أو زر صريح على الجوال)؛ وعند غيابه يتراجع تلقائياً
  إلى Leaflet المستضاف ذاتياً. ملصق `public/img/map-poster.*` هو LCP الصفحة.
- حدث التحليلات الوحيد: `map_3d_opened` (يُرسَل مرة عند أول تفعيل للعرض ثلاثي الأبعاد).
