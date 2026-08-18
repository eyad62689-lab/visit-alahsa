// تراجع الخريطة التضاريسية — Leaflet المستضاف ذاتياً (نفس ملفات vendor
// المستخدمة في صفحة الخريطة التقليدية، فهي غالباً في كاش الزائر أصلاً).
// يُستدعى حين يغيب WebGL2 أو يفشل MapLibre — بلا أي رسالة خطأ للمستخدم.
import type { TmapCfg, TmapBus } from './index';
import { buildPopupNode, catColors, fetchLandmarks, type LandmarkProps } from './shared';

type Opts = { reduceMotion: boolean; bus: TmapBus };

// Leaflet يُحمَّل كسكربت عام (نفس أسلوب صفحة الخريطة القائمة)
declare const L: any;

function loadCss(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) return resolve();
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = href;
    l.onload = () => resolve(); l.onerror = () => reject(new Error(href));
    document.head.appendChild(l);
  });
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => resolve(); s.onerror = () => reject(new Error(src));
    document.head.appendChild(s);
  });
}

export async function initLeafletFallback(host: HTMLElement, cfg: TmapCfg, opts: Opts) {
  const el = host.querySelector<HTMLElement>('.tmap-canvas');
  if (!el) throw new Error('tmap-canvas missing');

  await Promise.all([
    loadCss('/vendor/leaflet-1.9.4/leaflet.css'),
    loadCss('/vendor/leaflet.markercluster-1.5.3/MarkerCluster.css'),
  ]);
  await loadScript('/vendor/leaflet-1.9.4/leaflet.js');
  await loadScript('/vendor/leaflet.markercluster-1.5.3/leaflet.markercluster.js');

  const gj = await fetchLandmarks(cfg);
  const colors = catColors(host);

  const map = L.map(el, { scrollWheelZoom: false });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19,
  }).addTo(map);

  const cluster = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 48,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: (c: any) => {
      const n = c.getChildCount();
      const size = n < 10 ? 34 : n < 25 ? 40 : 46;
      return L.divIcon({ html: '<span>' + n + '</span>', className: 'va-cluster', iconSize: [size, size], iconAnchor: [size / 2, size / 2] });
    },
  });
  map.addLayer(cluster);

  const byId = new Map<string, any>();
  for (const f of gj.features) {
    const p = f.properties as LandmarkProps;
    const [lng, lat] = (f.geometry as GeoJSON.Point).coordinates;
    const m = L.marker([lat, lng], {
      title: cfg.lang === 'ar' ? p.name_ar : p.name_en,
      icon: L.divIcon({
        className: 'tmap-pin',
        html: `<span style="--pin:${colors[p.category] ?? colors.default}"></span>`,
        iconSize: [24, 24], iconAnchor: [12, 12],
      }),
    });
    m.bindPopup(buildPopupNode(p, cfg));
    cluster.addLayer(m);
    byId.set(p.id, m);
  }

  map.fitBounds([[cfg.bbox[1], cfg.bbox[0]], [cfg.bbox[3], cfg.bbox[2]]], { padding: [40, 40] });

  const locate = (id: string) => {
    const m = byId.get(id);
    if (m) cluster.zoomToShowLayer(m, () => m.openPopup());
  };
  opts.bus.onLocate = locate;
  if (opts.bus.pendingLocate) { locate(opts.bus.pendingLocate); opts.bus.pendingLocate = null; }
}
