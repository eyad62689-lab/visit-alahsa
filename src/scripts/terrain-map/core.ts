// نواة الخريطة التضاريسية — MapLibre GL. لا يصل هذا الملف إلى المتصفح إلا
// عبر import() ديناميكي من التمهيد، فلا يدخل في حزمة أي صفحة.
// v6 يصدّر أسماءً (named exports) فقط — لا default
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { TmapCfg, TmapBus } from './index';

type Opts = { reduceMotion: boolean; small: boolean; bus: TmapBus };

/** توسيع مربع محيط [minLng, minLat, maxLng, maxLat] بهامش بالدرجات */
const expand = (b: [number, number, number, number], m: number): [number, number, number, number] =>
  [b[0] - m, b[1] - m, b[2] + m, b[3] + m];

export async function initMapLibre(host: HTMLElement, cfg: TmapCfg, opts: Opts) {
  const el = host.querySelector<HTMLElement>('.tmap-canvas');
  if (!el) throw new Error('tmap-canvas missing');

  // ملحق تشكيل النص العربي (مستضاف ذاتياً) — lazy: يُجلب فقط حين تظهر تسميات RTL
  try { maplibregl.setRTLTextPlugin(cfg.rtlPluginUrl, true); } catch { /* مضبوط سابقاً */ }

  const map = new maplibregl.Map({
    container: el,
    style: cfg.styleUrl,
    bounds: cfg.bbox,
    fitBoundsOptions: { padding: 48 },
    // يحصر التجوال في محيط الأحساء — يمنع أيضاً طلب بلاطات لا نحتاجها
    maxBounds: expand(cfg.bbox, 0.6),
    maxPitch: 75,
    attributionControl: { compact: true },
    // التمرير فوق الخريطة لا يخطف تمرير الصفحة (نظير scrollWheelZoom:false في Leaflet)
    cooperativeGestures: true,
    fadeDuration: opts.reduceMotion ? 0 : 300,
    locale: {
      'CooperativeGesturesHandler.WindowsHelpText': cfg.labels.gestWin ?? '',
      'CooperativeGesturesHandler.MacHelpText': cfg.labels.gestMac ?? '',
      'CooperativeGesturesHandler.MobileHelpText': cfg.labels.gestTouch ?? '',
    },
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }));
  map.addControl(new maplibregl.ScaleControl({}));

  // ننتظر اكتمال النمط؛ فشل تحميل النمط نفسه (لا بلاطة عابرة) يرمي فيتراجع التمهيد إلى Leaflet
  await new Promise<void>((resolve, reject) => {
    map.once('load', () => resolve());
    map.once('error', (e) => { if (!map.isStyleLoaded()) reject(e?.error ?? new Error('style load failed')); });
  });

  // تسميات الأساس بلغة الصفحة: name:ar (أو name:en) مع تراجع إلى name.
  // نلمس فقط الطبقات التي حقلها النصي مبني على الاسم — لا أرقام الطرق ونحوها.
  const langField = ['coalesce', ['get', `name:${cfg.lang}`], ['get', 'name']];
  for (const layer of map.getStyle().layers ?? []) {
    if (layer.type !== 'symbol') continue;
    const tf = (layer as { layout?: Record<string, unknown> }).layout?.['text-field'];
    if (tf && JSON.stringify(tf).includes('name')) {
      map.setLayoutProperty(layer.id, 'text-field', langField as never);
    }
  }

  // ---------- التضاريس ----------
  // encoding: 'terrarium' إلزامي — الافتراضي في MapLibre هو 'mapbox'،
  // وتَركُه يُنتج ارتفاعات خاطئة بصمت (أشهر نقطة فشل في هذا التكامل).
  const demSource = {
    type: 'raster-dem' as const,
    tiles: [cfg.demTiles],
    encoding: 'terrarium' as const,
    tileSize: 256,
    maxzoom: 13, // ما فوقه يُستنبط بالتمديد تلقائياً — لا تطلب z14
    // حصر طلب البلاطات في محيط الأحساء — لا تحميل لما لا نحتاجه
    bounds: expand(cfg.bbox, 0.25),
    attribution: 'Terrain: Joerd / AWS Open Data',
  };
  // مصدران منفصلان للتضريس والظلال — الاصطلاح الموصى به في MapLibre
  map.addSource('terrain-dem', demSource);
  map.addSource('hillshade-dem', demSource);

  // الظلال فوق الأساس وتحت التسميات: تُدرج قبل أول طبقة رموز.
  // تبقى ظاهرة حتى في 2D — تُظهر العلاقة المكانية (الجبل، حافة الرمال) بلا ميلان.
  const firstSymbol = (map.getStyle().layers ?? []).find((l) => l.type === 'symbol')?.id;
  map.addLayer({
    id: 'va-hillshade',
    type: 'hillshade',
    source: 'hillshade-dem',
    paint: {
      'hillshade-exaggeration': 0.4,
      'hillshade-shadow-color': '#6E5A3F',
      'hillshade-highlight-color': '#FFFBF0',
      'hillshade-accent-color': '#8A6224',
    },
  }, firstSymbol);

  // سماء بتدرّج دافئ يناسب هوية الموقع (رملي/ذهبي)
  try {
    map.setSky({
      'sky-color': '#A9C4CE',
      'horizon-color': '#F2E3C6',
      'fog-color': '#F7F3EA',
      'sky-horizon-blend': 0.6,
      'horizon-fog-blend': 0.6,
      'fog-ground-blend': 0.65,
    });
  } catch { /* إن تغيّرت واجهة السماء مستقبلاً تعمل الخريطة بلا سماء */ }

  // حالة 2D/3D: الخيار المحفوظ يغلب؛ وإلا 3D على الشاشات الواسعة و2D على الجوال
  // (قيد الخطة: لا تضاريس دون 820px إلا بطلب صريح — والخيار المحفوظ طلبٌ صريح سابق)
  const saved = localStorage.getItem('va-map-3d');
  let is3d = saved !== null ? saved === '1' : !opts.small;

  const btn = document.getElementById('tmap-3d') as HTMLButtonElement | null;
  const apply3d = (on: boolean, animate: boolean) => {
    is3d = on;
    // exaggeration 2.0: تضاريس الأحساء منخفضة الحدّة، و1.0 تُخرج جبل القارة باهتاً
    map.setTerrain(on ? { source: 'terrain-dem', exaggeration: 2.0 } : null);
    const cam = on ? { pitch: 62, bearing: -18 } : { pitch: 0, bearing: 0 };
    // «تقليل الحركة»: انتقال فوري بلا easeTo
    if (animate && !opts.reduceMotion) map.easeTo({ ...cam, duration: 900 });
    else map.jumpTo(cam);
    // نصّ الزر يصف ما سيحدث عند الضغط (الوضع الآخر)
    if (btn) btn.textContent = on ? (cfg.labels.d3off ?? '2D') : (cfg.labels.d3on ?? '3D');
  };
  if (btn) {
    btn.hidden = false;
    btn.addEventListener('click', () => {
      const next = !is3d;
      localStorage.setItem('va-map-3d', next ? '1' : '0');
      apply3d(next, true);
    });
  }
  apply3d(is3d, false);

  return map;
}
