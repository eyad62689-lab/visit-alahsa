// أدوات مشتركة بين نواة MapLibre وتراجع Leaflet — بلا استيراد أي مكتبة خرائط.
import type { TmapCfg } from './index';

export type LandmarkProps = {
  id: string;
  name_ar: string;
  name_en: string;
  category: string;
  url_ar: string;
  url_en: string;
  thumb: string | null;
};

/** ألوان الفئات تُستخرج من متغيّرات CSS المعرّفة على الصفحة — لا ألوان مخترعة */
export function catColors(host: HTMLElement): Record<string, string> {
  const cs = getComputedStyle(host);
  const cats = ['historic', 'museum', 'religious', 'nature', 'parks', 'farm', 'market', 'experience', 'taste', 'events'];
  const out: Record<string, string> = {};
  for (const c of cats) {
    const v = cs.getPropertyValue('--pin-' + c).trim();
    if (v) out[c] = v;
  }
  out.default = cs.getPropertyValue('--c-turq').trim() || '#006E61';
  return out;
}

/** بطاقة المعلم — تُبنى بـDOM (textContent) لا بسلاسل HTML */
export function buildPopupNode(p: LandmarkProps, cfg: TmapCfg): HTMLElement {
  const ar = cfg.lang === 'ar';
  const root = document.createElement('div');
  root.className = 'tmap-pop';
  if (p.thumb) {
    const img = document.createElement('img');
    img.className = 'tmap-pop-img';
    img.src = p.thumb;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    root.appendChild(img);
  }
  const k = document.createElement('span');
  k.className = 'tmap-pop-k';
  k.textContent = cfg.catLabels[p.category] ?? p.category;
  root.appendChild(k);
  const t = document.createElement('strong');
  t.className = 'tmap-pop-t';
  t.textContent = ar ? p.name_ar : p.name_en;
  root.appendChild(t);
  const a = document.createElement('a');
  a.className = 'tmap-pop-a';
  a.href = ar ? p.url_ar : p.url_en;
  a.textContent = cfg.labels.view ?? '';
  root.appendChild(a);
  return root;
}

export async function fetchLandmarks(cfg: TmapCfg): Promise<GeoJSON.FeatureCollection> {
  const res = await fetch(cfg.geojsonUrl);
  if (!res.ok) throw new Error('geojson fetch failed');
  return res.json();
}
