// تمهيد الخريطة التضاريسية — يبقى صغيراً ولا يستورد MapLibre إطلاقاً.
// التحميل الفعلي كسول (import ديناميكي) وفق بوابتين معاً:
// (أ) توفّر WebGL2، (ب) دخول الحاوية إلى الشاشة (سطح المكتب) أو زر صريح (الجوال).
// إن غاب WebGL2 أو فشل MapLibre: تراجع صامت إلى Leaflet المستضاف ذاتياً — بلا رسالة خطأ.

export type TmapCfg = {
  lang: 'ar' | 'en';
  /** المربع المحيط الفعلي من بيانات المعالم [minLng, minLat, maxLng, maxLat] */
  bbox: [number, number, number, number];
  /** إطار العرض الافتراضي (مئينات 5–95) — أضيق من bbox الذي يحدّ التجوال */
  viewBbox: [number, number, number, number];
  geojsonUrl: string;
  styleUrl: string;
  demTiles: string;
  rtlPluginUrl: string;
  workerUrl: string;
  labels: Record<string, string>;
  catLabels: Record<string, string>;
};

/** قناة بين التمهيد والنواة: طلبات «أظهر على الخريطة» قبل جاهزية الخريطة وبعدها */
export type TmapBus = {
  pendingLocate: string | null;
  onLocate: ((id: string) => void) | null;
};

export function setupTerrainMap() {
  const host = document.getElementById('tmap');
  const cfgEl = document.getElementById('tmap-cfg');
  if (!host || !cfgEl || (host as HTMLElement & { __tmapInit?: boolean }).__tmapInit) return;
  (host as HTMLElement & { __tmapInit?: boolean }).__tmapInit = true;

  const cfg: TmapCfg = JSON.parse(cfgEl.textContent || '{}');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 819px)').matches;
  const hasWebGL2 = (() => {
    try { return !!document.createElement('canvas').getContext('webgl2'); } catch { return false; }
  })();

  const bus: TmapBus = { pendingLocate: null, onLocate: null };
  const status = document.getElementById('tmap-status');
  let starting: Promise<void> | null = null;

  const start = () => {
    if (starting) return starting;
    host.classList.add('is-loading');
    if (status) status.textContent = cfg.labels.loading ?? '';
    starting = (async () => {
      try {
        if (hasWebGL2) {
          const { initMapLibre } = await import('./core');
          await initMapLibre(host, cfg, { reduceMotion, small, bus });
        } else {
          const { initLeafletFallback } = await import('./fallback');
          await initLeafletFallback(host, cfg, { reduceMotion, bus });
        }
      } catch {
        if (hasWebGL2) {
          try {
            const { initLeafletFallback } = await import('./fallback');
            await initLeafletFallback(host, cfg, { reduceMotion, bus });
          } catch { /* الشبكة معطّلة بالكامل — تبقى الواجهة الساكنة */ }
        }
      }
      host.classList.remove('is-loading');
      host.classList.add('is-ready');
      if (status) status.textContent = '';
    })();
    return starting;
  };

  document.getElementById('tmap-open')?.addEventListener('click', () => start());

  if (!small && hasWebGL2 && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); start(); }
    }, { rootMargin: '240px' });
    io.observe(host);
  }

  // أزرار قائمة المعالم (SSR): تشغّل الخريطة عند الحاجة ثم تُظهر المعلم
  document.querySelectorAll<HTMLElement>('[data-tmap-locate]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-tmap-locate');
      if (!id) return;
      bus.pendingLocate = id;
      bus.onLocate?.(id);
      start();
      host.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  });
}
