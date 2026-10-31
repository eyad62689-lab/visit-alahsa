// بطاقة معرفة المستشار الذكي — تُولَّد وقت البناء من مصادر الحقيقة نفسها التي تبني الصفحات،
// ولا تُكتب يدوياً. تُبنى إلى dist/data/advisor-kb.json، ثم ينسخها tools/gen-advisor-kb.mjs
// (postbuild) إلى netlify/functions/advisor/kb.generated.json بعد التحقق من أن كل رابط فيها
// صفحة مبنية فعلاً — فلا يحيل المستشار إلى صفحة غير موجودة.
//
// القاعدة الحاكمة: المستشار لا يعرف إلا ما في هذه البطاقة، والبطاقة لا تحمل إلا ما ينشره
// الموقع: الملخّص وفقرة الإجابة والبنود العملية **الموثّقة** (verified: true) والأسئلة الشائعة.
// المعلم بلا بند موثّق للمواعيد أو الرسوم يُوسم pending فيقول المستشار «بانتظار التأكيد».
// لا متن كامل: الحجم بالرموز هو كلفة كل محادثة (الخزن المؤقت للبرومبت يقرأها بخُمس السعر).
//
// النصوص لكل لغة من حقولها المعتمدة وحدها (title_zh/_de/_ru/_ur من خطوط الترجمة)؛ ما يغيب
// بلغة تتركه الدالة للإنجليزية مع رابط الصفحة الإنجليزية — السابقة نفسها في بقية الموقع.
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

import { ui, type Lang } from '../../i18n/ui';
import { LANGS } from '../../i18n/langs';
import manifest from '../../data/image-widths.json';
import { isUnlisted } from '../../i18n/unlisted';
import { attractionHref, diningHref, blogHref, staticHref, storesHref, guidesHref, aboutHref } from '../../lib/routes';
import { isThinAttraction, hasDiningPage } from '../../lib/publish';
import { eventsFor, eventAlt, evView } from '../../data/events';
import { TRAILS, trailText, stopText, type TrailLang } from '../../data/trails';
import { trailHref, trailsIndexHref } from '../../lib/trails';
import { DISH_GROUPS_AR, DISH_GROUPS_EN, DISH_GROUPS_ZH, DISH_GROUPS_RU, DISH_GROUPS_DE, DISH_GROUPS_UR, type DishGroup } from '../../data/dishes';
import { fruitGroupsFor } from '../../data/fruits';
import { visaHref } from '../../lib/visa-guide.mjs';
import { storesPage, storesLangs } from '../../lib/stores';

/** نصّ بلغات متعددة — المفاتيح الموجودة وحدها (لا قيمة فارغة ولا تراجع هنا؛ التراجع في الدالة). */
type L = Partial<Record<Lang, string>>;

export type KbEntry = {
  id: string;
  kind: 'attraction' | 'dining' | 'stay' | 'post' | 'event' | 'trail' | 'dish' | 'fruit' | 'store' | 'page';
  name: L;
  /** رابط الصفحة بكل لغة لها نسخة مبنية؛ ما يغيب تتراجع له الدالة إلى الإنجليزية */
  href: L;
  summary?: L;
  area?: L;
  category?: string;
  img?: string;
  /** البنود العملية الموثّقة فقط (المواعيد، الرسوم، مناسب لـ…) */
  facts?: { label: L; value: L }[];
  faq?: { q: L; a: L }[];
  bestTime?: L;
  /** لا بند موثّق للمواعيد أو الرسوم وليس موقعاً مفتوحاً — المستشار يقول «بانتظار التأكيد» */
  pending?: boolean;
  openSite?: boolean;
  /** صفحة رقيقة (متن قصير، noindex) — تُبنى للزائر لكن معلوماتها قليلة */
  thin?: boolean;
  unesco?: string;
  /** محطات المسار / مكوّنات أخرى بأسمائها بلغة كل نسخة */
  stops?: L[];
};

// التركية خارج قاعدة المعرفة حتى تمرّ دفعة المستشار بخطها: المستشار على /tr/ يحاور بالإنجليزية
// (Advisor.astro)، ولا تُكتب له مداخل تركية قبل ذلك.
const L_ALL = LANGS.filter((l) => l !== 'tr');
const SUF: Record<Lang, string> = { ar: '', en: '_en', zh: '_zh', de: '_de', ru: '_ru', ur: '_ur', tr: '_tr' };

/** يجمع حقل `base` بلواحق اللغات من كائن بيانات (title, title_en, title_zh …) */
function pick(data: Record<string, unknown>, base: string, langs: readonly Lang[] = L_ALL): L {
  const out: L = {};
  for (const l of langs) {
    const v = data[`${base}${SUF[l]}`];
    if (typeof v === 'string' && v.trim()) out[l] = v.trim();
  }
  return out;
}

const hasAny = (x: L): boolean => Object.keys(x).length > 0;

/** نصّ الواجهة بلغة بعينها **بلا تراجع** (كـstr في LangSuggest) — فلا يظهر اسم إنجليزي كأنه معتمد بلغة أخرى */
const uiStr = (l: Lang, key: string): string | undefined => (ui[l] as Record<string, string>)[key];
function uiName(key: string, langs: readonly Lang[] = L_ALL): L {
  const out: L = {};
  for (const l of langs) { const v = uiStr(l, key); if (v) out[l] = v; }
  return out;
}

/** أصغر نسخة مولَّدة من الصورة تصلح مصغّرةً للبطاقة (≥ 320px)، وإلا الأصل */
const widths = manifest as Record<string, { widths: number[] }>;
function thumbOf(src?: string): string | undefined {
  if (!src) return undefined;
  const entry = widths[src.replace(/^.*\/img\//, '')];
  const w = entry?.widths.filter((x) => x >= 320).sort((a, b) => a - b)[0];
  return w ? `${src}-${w}w` : src;
}

// ── المعالم ──────────────────────────────────────────────────────────────────
type Att = CollectionEntry<'attractions'>;

function attractionEntry(e: Att): KbEntry {
  const d = e.data as unknown as Record<string, unknown>;
  // الصفحة الرقيقة (publish.ts) تُبنى للزائر وإن كانت noindex — فرابطها صالح للإحالة؛ وجود الصفحة
  // بكل لغة يتحقق منه gen-advisor-kb.mjs على dist.
  const href: L = { ar: attractionHref(e.data, 'ar'), en: attractionHref(e.data, 'en') };
  for (const l of ['zh', 'de', 'ru', 'ur'] as const) {
    if (d[`title_${l}`]) {
      const h = attractionHref(e.data, l);
      if (!isUnlisted(h)) href[l] = h;
    }
  }
  const thin = isThinAttraction(e);
  const facts = e.data.practical
    .filter((p) => p.verified)
    .map((p) => ({ label: pick(p as unknown as Record<string, unknown>, 'label'), value: pick(p as unknown as Record<string, unknown>, 'value') }));
  const faq = e.data.faq.map((f) => ({ q: pick(f as unknown as Record<string, unknown>, 'q'), a: pick(f as unknown as Record<string, unknown>, 'a') }));
  const hasHours = e.data.practical.some((p) => p.verified && /المواعيد|ساعات/.test(p.label));
  const hasFee = e.data.practical.some((p) => p.verified && /الرسوم|الدخول/.test(p.label));
  // فقرة الإجابة (35–45 كلمة، ar/en) أدقّ من الملخّص وأغنى بالوقائع الموثّقة — تتصدّر حين وُجدت
  const summary: L = { ...pick(d, 'summary'), ...pick(d, 'answer', ['ar', 'en']) };
  return {
    id: e.id,
    kind: 'attraction',
    name: pick(d, 'title'),
    href,
    summary,
    area: pick(d, 'area'),
    category: e.data.category,
    img: thumbOf(e.data.heroImage),
    facts,
    faq,
    bestTime: pick(d, 'bestTime'),
    pending: !e.data.openSite && !(hasHours && hasFee),
    thin: thin || undefined,
    openSite: e.data.openSite || undefined,
    unesco: e.data.unesco,
  };
}

// ── المطاعم والمقاهي وأماكن الإقامة ──────────────────────────────────────────
const DINE_INDEX: Record<Lang, string> = { ar: '/مطاعم-ومقاهي/', en: '/en/restaurants-cafes/', zh: '/zh/restaurants-cafes/', de: '/de/restaurants-cafes/', ru: '/ru/restaurants-cafes/', ur: '/ur/restaurants-cafes/', tr: '/en/restaurants-cafes/' };
const STAY_INDEX: Record<Lang, string> = { ar: '/إقامة/', en: '/en/stay/', zh: '/zh/stay/', de: '/de/stay/', ru: '/ru/stay/', ur: '/ur/stay/', tr: '/en/stay/' };

function diningEntry(e: CollectionEntry<'dining'>): KbEntry {
  const d = e.data as unknown as Record<string, unknown>;
  const href: L = {};
  // الصفحة المفردة تُبنى فوق عتبة الكلمات فقط (publish.ts)؛ دونها يُحال إلى الفهرس
  for (const l of ['ar', 'en'] as const) href[l] = hasDiningPage(e, l) ? diningHref(e.data, l) : DINE_INDEX[l];
  for (const l of ['zh', 'de', 'ru', 'ur'] as const) {
    const body = d[`body_${l}`];
    href[l] = typeof body === 'string' && body.trim() && hasDiningPage(e, 'en') ? diningHref(e.data, l) : DINE_INDEX[l];
  }
  return {
    id: `dining/${e.id}`,
    kind: 'dining',
    name: pick(d, 'name'),
    href,
    summary: pick(d, 'blurb'),
    area: pick(d, 'area'),
    category: e.data.kind,
    img: thumbOf(e.data.img),
  };
}

function stayEntry(e: CollectionEntry<'stay'>): KbEntry {
  const d = e.data as unknown as Record<string, unknown>;
  // صفحة الإقامة المفردة لها عتبتها الخاصة في قالبها؛ الإحالة إلى الفهرس تضمن رابطاً مبنياً دائماً
  const href: L = {};
  for (const l of L_ALL) href[l] = STAY_INDEX[l];
  return {
    id: `stay/${e.id}`,
    kind: 'stay',
    name: pick(d, 'name'),
    href,
    summary: pick(d, 'blurb'),
    area: pick(d, 'area'),
    category: e.data.kind,
    img: thumbOf(e.data.img),
  };
}

// ── المدونة: المقالات بالموضوع (key) وكل لغة ملفها ──────────────────────────
function postEntries(posts: CollectionEntry<'blog'>[]): KbEntry[] {
  const byKey = new Map<string, CollectionEntry<'blog'>[]>();
  for (const p of posts) {
    if (p.data.draft) continue;
    const list = byKey.get(p.data.key) ?? [];
    list.push(p);
    byKey.set(p.data.key, list);
  }
  return [...byKey.entries()].map(([key, files]) => {
    const name: L = {}; const href: L = {}; const summary: L = {};
    for (const f of files) {
      const l = f.data.lang as Lang;
      const h = blogHref(f.data);
      if (isUnlisted(h)) continue;
      name[l] = f.data.title; href[l] = h; summary[l] = f.data.description;
    }
    const img = thumbOf(files.find((f) => f.data.heroImage)?.data.heroImage);
    return { id: `post/${key}`, kind: 'post' as const, name, href, summary, img };
  }).filter((e) => hasAny(e.href));
}

// ── الفعاليات: نسخة كل لغة من مصدرها، بعد إسقاط بنود النسخة المنقضية (evView) ──
function eventEntries(): KbEntry[] {
  const ids = new Set(eventsFor('ar').map((e) => e.id));
  return [...ids].map((id) => {
    const name: L = {}; const summary: L = {}; const area: L = {};
    const alt = eventAlt(id) as L;
    const href: L = {};
    for (const l of L_ALL) {
      const ev = eventsFor(l).find((e) => e.id === id);
      if (!ev || !alt[l] || isUnlisted(alt[l]!)) continue;
      const v = evView(ev);
      href[l] = alt[l];
      name[l] = v.name;
      area[l] = v.place;
      // الموسم والمدة والجهة المنظّمة؛ الساعات لا تُذكر إلا منقولةً من مصدر رسمي (hours)
      summary[l] = [v.season, v.time, v.span, v.org, v.hours].filter(Boolean).join(' · ');
    }
    return { id: `event/${id}`, kind: 'event' as const, name, href, summary, area };
  }).filter((e) => hasAny(e.href));
}

// ── المسارات المقترحة ────────────────────────────────────────────────────────
function trailEntries(): KbEntry[] {
  const langs: TrailLang[] = ['ar', 'en', 'zh', 'de', 'ru', 'ur', 'tr'];
  return TRAILS.map((t) => {
    const name: L = {}; const summary: L = {}; const href: L = {};
    const stops: L[] = t.stops.map(() => ({}));
    for (const l of langs) {
      const h = trailHref(t, l);
      if (isUnlisted(h)) continue;
      const tx = trailText(t, l);
      href[l] = h; name[l] = tx.title; summary[l] = tx.tagline;
      t.stops.forEach((s, i) => { stops[i][l] = stopText(t, s, l).name; });
    }
    return { id: `trail/${t.slug}`, kind: 'trail' as const, name, href, summary, stops, category: `${t.suggestedDuration} · ${t.mode}` };
  }).filter((e) => hasAny(e.href));
}

// ── المطبخ والثمار: بطاقاتهما بلغة كل نسخة، والرابط صفحة القسم ───────────────
const FOOD_INDEX: Record<Lang, string> = { ar: '/أكلات/', en: '/en/food/', zh: '/zh/food/', de: '/de/food/', ru: '/ru/food/', ur: '/ur/food/', tr: '/en/food/' };
const FRUITS_INDEX: Record<Lang, string> = { ar: '/ثمار/', en: '/en/fruits/', zh: '/zh/fruits/', de: '/de/fruits/', ru: '/ru/fruits/', ur: '/ur/fruits/', tr: '/en/fruits/' };
const DISHES: Record<Lang, DishGroup[]> = { ar: DISH_GROUPS_AR, en: DISH_GROUPS_EN, zh: DISH_GROUPS_ZH, de: DISH_GROUPS_DE, ru: DISH_GROUPS_RU, ur: DISH_GROUPS_UR, tr: DISH_GROUPS_EN };

function dishEntries(): KbEntry[] {
  // الطبق يُعرَّف بترتيبه داخل القائمة؛ القوائم بكل لغة بالترتيب نفسه (مصدر واحد، dishes.ts)
  const flat = (g: DishGroup[]) => g.flatMap((x) => x.dishes);
  const base = flat(DISHES.ar);
  return base.map((dish, i) => {
    const name: L = {}; const summary: L = {}; const href: L = {};
    for (const l of L_ALL) {
      const d = flat(DISHES[l])[i];
      if (!d || isUnlisted(FOOD_INDEX[l])) continue;
      name[l] = d.name; summary[l] = `${d.k} — ${d.pre}`; href[l] = FOOD_INDEX[l];
    }
    return { id: `dish/${i + 1}`, kind: 'dish' as const, name, href, summary, img: thumbOf(dish.img) };
  });
}

function fruitEntries(): KbEntry[] {
  const flat = (lang: string) => fruitGroupsFor(lang).flatMap((g) => g.fruits);
  const base = flat('ar');
  return base.map((fruit, i) => {
    const name: L = {}; const summary: L = {}; const href: L = {};
    for (const l of L_ALL) {
      const f = flat(l)[i];
      if (!f || isUnlisted(FRUITS_INDEX[l])) continue;
      name[l] = f.name;
      // الموسم كما يُنشر، بوسمه إن كان بانتظار التأكيد — لا موسم مختلَق
      const season = f.seasonPending ? `${f.season} (?)` : f.season;
      summary[l] = [f.k, season, f.rare ? 'rare' : '', f.pre].filter(Boolean).join(' — ');
      href[l] = FRUITS_INDEX[l];
    }
    return { id: `fruit/${i + 1}`, kind: 'fruit' as const, name, href, summary, img: thumbOf(fruit.img) };
  });
}

// ── المتاجر الإلكترونية: كل متجر مدخل باسمه ووصفه وقسمه، ورابطه صفحة المتاجر عند قسمه ──
// (المحلّ الصحيح لسؤال «من أين أشتري التمر/الحرف»؛ الأسواق التراثية أماكن زيارة لا جواب الشراء)
function storeEntries(pageHref: L): KbEntry[] {
  const pages: Partial<Record<Lang, ReturnType<typeof storesPage>>> = {};
  for (const l of storesLangs) pages[l] = storesPage(l);
  const base = pages.ar!;
  return base.stores.map((store, i) => {
    const name: L = {}; const summary: L = {}; const href: L = {};
    const section = base.sections.find((s) => s.id === store.section);
    for (const l of L_ALL) {
      const h = pageHref[l];
      if (!h) continue;
      href[l] = `${h}#sec-${store.section}`;
      const p = pages[l];
      if (!p) continue;
      const s = p.stores[i];
      const sec = p.sections.find((x) => x.id === store.section);
      name[l] = s.name;
      summary[l] = [sec?.title, s.description, s.platform].filter(Boolean).join(' — ');
    }
    return { id: `store/${store.id}`, kind: 'store' as const, name, href, summary, category: section?.id };
  });
}

/** ملخّص صفحة المتاجر من سطرها التمهيدي (ui.ts) بعدد المتاجر الفعلي */
function storesPageSummary(n: number): L {
  const out: L = {};
  for (const l of L_ALL) { const v = uiStr(l, 'stores.lead'); if (v) out[l] = v.replace('{n}', String(n)); }
  return out;
}

// ── صفحات الأقسام: الروابط كما يبنيها الشريط العلوي (Header.astro) ────────────
const SECTION = (ar: string, latin: string): Record<Lang, string> => ({
  ar, en: `/en/${latin}`, zh: `/zh/${latin}`, de: `/de/${latin}`, ru: `/ru/${latin}`, ur: `/ur/${latin}`, tr: `/en/${latin}`,
});
function pageEntries(): KbEntry[] {
  // الاسم من مفتاح ui.ts بكل لغة له فيها نصّ معتمد (zh/de/ru/ur مرّت بخطوطها)، والإنجليزية احتياط الدالة
  const pages: { id: string; key: string; href: Partial<Record<Lang, string>> }[] = [
    { id: 'page/home', key: 'site.brand', href: { ar: '/', en: '/en/', zh: '/zh/', de: '/de/', ru: '/ru/', ur: '/ur/' } },
    { id: 'page/attractions', key: 'nav.attractions', href: SECTION('/معالم/', 'attractions/') },
    { id: 'page/leisure', key: 'nav.leisure', href: SECTION('/أسواق-ومنتزهات-ومزارع/', 'souqs-parks-farms/') },
    { id: 'page/map', key: 'nav.map', href: Object.fromEntries(L_ALL.map((l) => [l, staticHref('map', l)])) },
    { id: 'page/events', key: 'nav.events', href: SECTION('/فعاليات/', 'events/') },
    { id: 'page/fruits', key: 'nav.fruits', href: FRUITS_INDEX },
    { id: 'page/food', key: 'nav.food', href: FOOD_INDEX },
    { id: 'page/dining', key: 'nav.dining', href: DINE_INDEX },
    { id: 'page/stay', key: 'nav.stay', href: STAY_INDEX },
    { id: 'page/plan', key: 'nav.plan', href: SECTION('/خطط/', 'plan-your-trip/') },
    { id: 'page/my-trip', key: 'nav.myTrip', href: { ar: '/رحلتي/', en: '/en/plan/', zh: '/zh/plan/', de: '/de/plan/', ru: '/ru/plan/' } },
    { id: 'page/visa', key: 'foot.l.visa', href: Object.fromEntries(L_ALL.map((l) => [l, visaHref(l)])) },
    { id: 'page/unesco', key: 'foot.l.unesco', href: Object.fromEntries(L_ALL.map((l) => [l, staticHref('unesco', l)])) },
    { id: 'page/trails', key: 'nav.trails', href: Object.fromEntries((['ar', 'en', 'zh', 'de', 'ru', 'ur', 'tr'] as TrailLang[]).map((l) => [l, trailsIndexHref(l)])) },
    { id: 'page/blog', key: 'nav.blog', href: { ar: '/مدونة/', en: '/en/blog/', zh: '/zh/blog/', de: '/de/blog/', ru: '/ru/blog/' } },
    { id: 'page/stores', key: 'nav.stores', href: Object.fromEntries(L_ALL.map((l) => [l, storesHref(l)])) },
    { id: 'page/guides', key: 'guides.nav', href: { ar: guidesHref('ar'), en: guidesHref('en') } },
    { id: 'page/about', key: 'foot.l.about', href: { ar: aboutHref('ar'), en: aboutHref('en') } },
    { id: 'page/report', key: 'foot.l.report', href: Object.fromEntries(L_ALL.map((l) => [l, staticHref('report', l)])) },
  ];
  return pages.map((p) => {
    const href: L = {};
    for (const [l, h] of Object.entries(p.href) as [Lang, string][]) if (h && !isUnlisted(h)) href[l] = h;
    return { id: p.id, kind: 'page' as const, name: uiName(p.key), href };
  });
}

export const GET: APIRoute = async () => {
  const attractions = (await getCollection('attractions')).sort((a, b) => a.data.order - b.data.order);
  const dining = (await getCollection('dining')).sort((a, b) => a.data.order - b.data.order);
  const stay = (await getCollection('stay')).sort((a, b) => a.data.order - b.data.order);
  const posts = await getCollection('blog');

  const pages = pageEntries();
  const storesIndex = pages.find((p) => p.id === 'page/stores')!;
  const stores = storeEntries(storesIndex.href);
  storesIndex.summary = storesPageSummary(stores.length);

  const entries: KbEntry[] = [
    ...attractions.map(attractionEntry),
    ...dining.map(diningEntry),
    ...stay.map(stayEntry),
    ...postEntries(posts),
    ...eventEntries(),
    ...trailEntries(),
    ...dishEntries(),
    ...fruitEntries(),
    ...stores,
    ...pages,
  ];

  const body = {
    generatedAt: new Date().toISOString().slice(0, 10),
    counts: { attractions: attractions.length, dining: dining.length, stay: stay.length, stores: stores.length, entries: entries.length },
    entries,
  };
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
