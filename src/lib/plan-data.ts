// بيانات مخطِّط الرحلة (ChapterPlan) محسومةً وقت البناء: القوالب التسعة بأسماء محطاتها وروابطها،
// وفقرات المرافقين، وخريطة slug_ar → اسم ورابط لدمج ما حُفظ في «معالمي».
// يستعملها فصل التخطيط في الرئيسية (اللغات غير الهجينة) وصفحة «خطّط لرحلتك» (ar/en).
import { getCollection } from 'astro:content';
import { attractionHref } from './routes';
import type { Lang } from '../i18n/ui';
import { TRAILS, trailText } from '../data/trails';
import { TEMPLATES, COMPANION_TIPS, type Stop } from '../data/home-chapters';
import { HOME_COPY, type HomeLang } from '../data/home-copy';

type Loc = { title: string; title_en?: string; title_zh?: string; title_de?: string; title_ru?: string; title_ur?: string; title_tr?: string };

export async function planData(lang: HomeLang) {
  const H = HOME_COPY[lang];
  const L = lang as Lang;
  const xl = (d: Loc): string | undefined => (L === 'zh' ? d.title_zh : L === 'de' ? d.title_de : L === 'ru' ? d.title_ru : L === 'ur' ? d.title_ur : L === 'tr' ? d.title_tr : undefined);
  const own = (d: Loc) => L === 'ar' || L === 'en' || xl(d) !== undefined;
  const locTitle = (d: Loc) => (L === 'ar' ? d.title : xl(d) ?? d.title_en ?? d.title);
  // المحفوظات قد تشمل معلماً لم يُترجم بعد: يتراجع للإنجليزية نصاً ورابطاً
  const hrefLang = (d: Loc): Lang => (own(d) ? L : 'en');

  const all = await getCollection('attractions');
  const bySlugEn = new Map(all.map((e) => [e.data.slug_en, e.data]));
  const trails = new Map(TRAILS.map((tr) => [tr.slug, tr]));
  const resolveStop = (s: Stop) => {
    if ('trail' in s) {
      const tr = trails.get(s.trail);
      if (!tr) throw new Error(`plan-data: مسار غير موجود: ${s.trail}`);
      return { name: trailText(tr, lang).title, href: `${H.paths.trails}${s.trail}/`, kind: 'trail' as const };
    }
    const d = bySlugEn.get(s.place);
    if (!d) throw new Error(`plan-data: معلم غير موجود في المجموعة: ${s.place}`);
    // محطات القوالب مترجمة كلها إلى لغة الصفحة: الناقص يُفشل البناء لا يتراجع للإنجليزية
    if (!own(d)) throw new Error(`plan-data: ${s.place} بلا ترجمة ${lang}`);
    return { name: locTitle(d), href: attractionHref(d, L), kind: 'place' as const };
  };
  const templates = Object.fromEntries(Object.entries(TEMPLATES).map(([k, v]) => [k, {
    title: v.title[lang],
    note: v.note?.[lang],
    trails: v.days.flatMap((d) => d.stops.flatMap((s) => ('trail' in s ? [s.trail] : []))),
    days: v.days.map((d) => d.stops.map(resolveStop)),
  }]));
  const tips = Object.fromEntries(Object.entries(COMPANION_TIPS).map(([k, parts]) => [k, parts.map((p) => ({ when: p.when, text: p.text[lang] }))]));
  const places = Object.fromEntries(all.map((e) => [e.data.slug_ar, { name: locTitle(e.data), href: attractionHref(e.data, hrefLang(e.data)) }]));
  return { templates, tips, places };
}
