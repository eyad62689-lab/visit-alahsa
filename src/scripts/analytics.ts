// طبقة القياس الموحّدة — الخطوة 1 من خطة التفاعل العالمي
// (docs/تشخيص-التفاعل-العالمي-وخطة-التحسين-2026-09-08.md § ع4).
//
// لماذا وحدة مُجمَّعة لا سكربتاً مضمّناً: الوحدة تُنفَّذ مرة واحدة لكل تحميل كامل،
// فتُسجَّل مستمعاتها على document مرة واحدة وتصمد عبر تنقّلات ClientRouter بلا
// حارس تكرار — وهو عين ما تشترطه قاعدة «السكربتات الداخلية» في CLAUDE.md.
//
// القاعدة: كل تفاعل يُقاس من هنا — إمّا بتفويض على المحدِّدات القائمة (البحث،
// مبدّل اللغة، الحفظ، خرائط قوقل، الفيديو، الفلاتر) وإمّا بسمة `data-track`
// العامة على أي عنصر جديد (مع `data-track-*` لمعاملاته). لا نداء `gtag` مباشراً
// خارج هذه الوحدة سوى page_view وai_referral في Base.astro.
//
// gtag يُعرَّف في Base.astro سكربتاً مضمّناً كلاسيكياً (دالة عامة) قبل هذه الوحدة،
// وحين يتأخر تحميل مكتبة GA تُصفّ الأحداث في dataLayer فلا يضيع شيء. القياس
// لا يُعطّل الصفحة أبداً: كل مسار داخل try/catch.
import { onCLS, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    VATrack?: (name: string, params?: Params) => void;
    __vaAiSource?: string | null;
    __vaAnalytics?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

const currentPath = (): string => {
  try { return decodeURI(location.pathname); } catch { return location.pathname; }
};

const common = (): Params => ({
  lang: document.documentElement.lang || 'ar',
  ai_source: window.__vaAiSource || '(none)',
});

/** يرسل حدث GA4 مع المعاملات المشتركة (اللغة ومصدر محرك الإجابة). */
export function track(name: string, params: Params = {}): void {
  try {
    const clean: Params = {};
    for (const [k, v] of Object.entries({ ...common(), ...params })) {
      if (v !== undefined && v !== '') clean[k] = v;
    }
    if (typeof window.gtag === 'function') window.gtag('event', name, clean);
  } catch { /* القياس لا يكسر الصفحة */ }
}

/** معاملات العنصر من سماته: data-track-foo-bar → foo_bar */
const paramsOf = (el: HTMLElement): Params => {
  const out: Params = {};
  for (const [k, v] of Object.entries(el.dataset)) {
    if (k === 'track' || !k.startsWith('track')) continue;
    const key = k.slice(5).replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => '_' + c.toLowerCase());
    if (key) out[key] = v ?? '';
  }
  return out;
};

// مزوّد الخرائط من **المضيف** لا بتعبير نمطي على سلسلة الرابط: التعبير النمطي يطابق جزءاً من
// مضيف أطول («uri.amap.com.example.org») ما لم يُحدَّد طرفاه، وهي علّة تنبيه CodeQL «Missing regular
// expression anchor» على طلب الدمج #41. واجهة URL تفكّ الرابط فيُقارن `hostname` كاملاً.
// uri.amap.com: رابط خرائط 高德 في صفحات /zh/ (قرار المالك 6ب، 2026-09-10) — الحدث نفسه بمعامل provider.
function mapsProvider(href: string): 'google' | 'amap' | null {
  let u: URL;
  try { u = new URL(href, location.href); } catch { return null; }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
  const host = u.hostname.toLowerCase().replace(/^www\./, '');
  if (host === 'uri.amap.com') return 'amap';
  if (host === 'maps.app.goo.gl') return 'google';
  if (host === 'goo.gl') return u.pathname === '/maps' || u.pathname.startsWith('/maps/') ? 'google' : null;
  if (host === 'maps.google.com') return 'google';
  // google.com وحده: نمطٌ مثل /^google\.[a-z]+$/ يقبل نطاقاً وهمياً («google.comevil») لأن لاحقة
  // النطاق ليست مجموعة مغلقة. والموقع لا يُصدر إلا هذه المضيفات الخمسة، فمن أضاف سادساً يضيفه هنا.
  if (host === 'google.com') return u.pathname === '/maps' || u.pathname.startsWith('/maps/') ? 'google' : null;
  return null;
}

const pathOf = (href: string): string => {
  try { return decodeURI(new URL(href, location.href).pathname); } catch { return href; }
};

function onClick(e: MouseEvent): void {
  const t = e.target;
  if (!(t instanceof Element)) return;

  // 1) السمة العامة — لأي عنصر جديد (المشاركة، الروابط ذات الصلة، «موقعي»…)
  const generic = t.closest<HTMLElement>('[data-track]');
  if (generic?.dataset.track) track(generic.dataset.track, paramsOf(generic));

  // 2) البحث: فتح النافذة، ثم النقر على نتيجة (بعبارة البحث وقت النقر)
  if (t.closest('#search-open')) track('search_open');
  const result = t.closest<HTMLAnchorElement>('a.sm-item');
  if (result) {
    const input = document.getElementById('sm-input') as HTMLInputElement | null;
    track('search_result', { search_term: (input?.value || '').trim().slice(0, 60), item_id: pathOf(result.href) });
  }

  // 3) مبدّل اللغة في الترويسة
  const lang = t.closest<HTMLAnchorElement>('a.lang-item');
  if (lang) track('lang_switch', { from: document.documentElement.lang, to: lang.getAttribute('lang') || '' });

  // 4) الحفظ في «رحلتي» — مستمع VAPlan (المضمّن في Base قبل هذه الوحدة) قلب الحالة
  //    قبلنا، فالصنف is-saved يعكس الحالة الجديدة لا القديمة.
  const fav = t.closest<HTMLElement>('[data-fav]');
  if (fav) track(fav.classList.contains('is-saved') ? 'plan_add' : 'plan_remove', { item_id: fav.dataset.fav || '' });

  // 5) الخروج إلى خرائط قوقل — من صفحة المعلم أو بطاقة المنشأة أو الفعالية
  const a = t.closest<HTMLAnchorElement>('a[href]');
  const provider = a ? mapsProvider(a.href) : null;
  if (provider) track('maps_open', { item_id: currentPath(), provider });

  // 6) الفلاتر: شرائح الخريطة والمطاعم، وزر «مفتوح الآن»، وأقسام فهرس المعالم
  const chip = t.closest<HTMLElement>('.chip[data-filter], .chip[data-kind], #dn-open');
  if (chip) {
    track('filter_use', {
      ui: chip.hasAttribute('data-filter') ? 'map' : 'dining',
      value: chip.dataset.filter ?? chip.dataset.kind ?? 'open_now',
    });
  }
  const summary = t.closest<HTMLElement>('details.cat-sec > summary');
  const section = summary?.parentElement;
  if (section instanceof HTMLDetailsElement) {
    // الفتح يقع بعد الحدث (الفعل الافتراضي)، فالقيمة الحالية هي الحالة القديمة
    track('filter_use', { ui: 'attractions', value: section.id.replace(/^cat-/, ''), open: !section.open });
  }
}

function onChange(e: Event): void {
  const t = e.target;
  if (t instanceof HTMLSelectElement && t.id === 'dn-district') track('filter_use', { ui: 'dining', value: t.value });
}

// تشغيل فيديو الهيرو — حدث الوسائط لا يفقع، فنلتقطه في مرحلة الالتقاط، مرة لكل عنصر
function onPlaying(e: Event): void {
  const v = e.target;
  if (!(v instanceof HTMLVideoElement) || v.dataset.vaPlayed) return;
  v.dataset.vaPlayed = '1';
  track('video_play', { video: (v.currentSrc || '').split('/').pop() || '' });
}

// مؤشرات الويب الحيوية ميدانياً — قيمة واحدة لكل مؤشر عند إخفاء الصفحة (سلوك
// المكتبة الافتراضي). CLS يُرسَل ×1000 لأن GA4 يقرّب المعاملات الرقمية.
function sendVital(m: Metric): void {
  const scale = m.name === 'CLS' ? 1000 : 1;
  track('web_vitals', {
    metric_name: m.name,
    metric_value: Math.round(m.value * scale),
    metric_delta: Math.round(m.delta * scale),
    metric_rating: m.rating,
    metric_id: m.id,
    value: Math.round(m.value * scale),
    page_path: currentPath(),
  });
}

function init(): void {
  if (window.__vaAnalytics) return;
  window.__vaAnalytics = true;
  window.VATrack = track;
  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
  document.addEventListener('playing', onPlaying, true);
  onLCP(sendVital);
  onCLS(sendVital);
  onINP(sendVital);
  onTTFB(sendVital);
}

init();
