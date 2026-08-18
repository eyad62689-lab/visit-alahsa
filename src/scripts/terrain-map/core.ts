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
    maxBounds: expand(cfg.bbox, 0.8),
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

  return map;
}
