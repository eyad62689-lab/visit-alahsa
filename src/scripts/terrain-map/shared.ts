// أدوات مشتركة بين نواة MapLibre وتراجع Leaflet — بلا استيراد أي مكتبة خرائط.
import type * as GeoJSON from 'geojson';
import type { TmapCfg } from './index';

export type LandmarkProps = {
  id: string;
  name_ar: string;
  name_en: string;
  category: string;
  url_ar: string;
  url_en: string;
  name_zh?: string; url_zh?: string;
  name_de?: string; url_de?: string;
  name_ru?: string; url_ru?: string;
  thumb: string | null;
};

/** اسم المعلم ورابطه بلغة الصفحة — zh/de/ru بتراجع إلى الإنجليزية متى غابت ترجمته */
export function nameOf(p: LandmarkProps, lang: string): string {
  if (lang === 'ar') return p.name_ar;
  return (p as Record<string, unknown>)[`name_${lang}`] as string | undefined ?? p.name_en;
}
export function urlOf(p: LandmarkProps, lang: string): string {
  if (lang === 'ar') return p.url_ar;
  return (p as Record<string, unknown>)[`url_${lang}`] as string | undefined ?? p.url_en;
}

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
  t.textContent = nameOf(p, cfg.lang);
  root.appendChild(t);
  const a = document.createElement('a');
  a.className = 'tmap-pop-a';
  a.href = urlOf(p, cfg.lang);
  a.textContent = cfg.labels.view ?? '';
  root.appendChild(a);
  return root;
}

export async function fetchLandmarks(cfg: TmapCfg): Promise<GeoJSON.FeatureCollection> {
  const res = await fetch(cfg.geojsonUrl);
  if (!res.ok) throw new Error('geojson fetch failed');
  return res.json();
}
