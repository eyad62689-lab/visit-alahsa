// حسابات «القريب» لصفحة المعلم — تُحسب وقت البناء وتُكاشَف على مستوى الوحدة (على نمط related.ts)
// فلا تعيد كل صفحة معلم قراءة المجموعتين وفرزهما:
//  • nearbyAttractions: أقرب 3 معالم بالإحداثيات الموثّقة (نُقل حسابها من DetailView بلا تغيير في ناتجه).
//  • diningNear: الفهرس العكسي لصفحة المطعم — «معالم قريبة» هناك تعرض معالم حيّ المطعم والمعالم
//    المسمّاة في near؛ فالمطعم d قريب من المعلم a إذا d.district === a.district أو d.near يحوي a.id.
//    لا مسافة هنا ولا تقدير: الأساس حيٌّ مشترك أو ذكر صريح في المصدر. يحرسه C25 (ج) على dist.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { catLabel } from './categories';
import { kmBetween, distLabel } from './distance';
import { hasDiningPage } from './publish';
import { attractionHref, diningHref } from './routes';

export type NearbyAttraction = {
  href: string; title: string; cat: string; titleLang: 'en' | undefined; id: string; img: string | undefined; km: number; dist: string;
};

export type NearbyDining = {
  href: string; name: string; kind: 'restaurant' | 'cafe' | 'bakery'; area: string | undefined; id: string; img: string; alt: string; explicit: boolean;
};

/** سقف بطاقات المطاعم في صفحة المعلم الواحدة. */
export const DINING_NEAR_MAX = 4;

let attractions: Promise<CollectionEntry<'attractions'>[]> | undefined;
const allAttractions = () => (attractions ??= getCollection('attractions'));

/** أقرب 3 معالم بخطٍّ مستقيم (kmBetween) — [] لمعلم بلا إحداثيات موثّقة. */
export async function nearbyAttractions(entry: CollectionEntry<'attractions'>, lang: Lang): Promise<NearbyAttraction[]> {
  const a = entry.data;
  if (!a.location) return [];
  const zh = lang === 'zh', de = lang === 'de', ru = lang === 'ru', ur = lang === 'ur', ar = lang === 'ar';
  return (await allAttractions())
    .filter((e) => e.data.slug_ar !== a.slug_ar && e.data.location)
    .map((e) => {
      // العنوان المتراجع للإنجليزية يُوسم lang="en" فيقرؤه قارئ الشاشة بلغته،
      // ويستثنيه الحارس C18 (تهجئة Souk الألمانية) من نصّ الصفحة الألماني.
      const fallback = (zh && !e.data.title_zh) || (de && !e.data.title_de) || (ru && !e.data.title_ru) || (ur && !e.data.title_ur);
      return {
        // البطاقة القريبة بلغة الصفحة، وعنوانها يتراجع للإنجليزية إن غابت
        // ترجمته — لكن رابطها يقصد صفحة اللغة الحالية إن وُجدت،
        // وإلا فالإنجليزية (لا رابط لصفحة /zh/ غير مولّدة).
        href: attractionHref(e.data, fallback ? 'en' : lang),
        title: ar ? e.data.title
          : zh ? (e.data.title_zh ?? e.data.title_en ?? e.data.title)
          : de ? (e.data.title_de ?? e.data.title_en ?? e.data.title)
          : ru ? (e.data.title_ru ?? e.data.title_en ?? e.data.title)
          : ur ? (e.data.title_ur ?? e.data.title_en ?? e.data.title)
          : (e.data.title_en ?? e.data.title),
        cat: catLabel(e.data.category, lang),
        titleLang: fallback ? ('en' as const) : undefined,
        id: e.data.slug_en,
        img: e.data.heroImage,
        km: kmBetween(a.location!.lat, a.location!.lng, e.data.location!.lat, e.data.location!.lng),
      };
    })
    .sort((x, y) => x.km - y.km)
    .slice(0, 3)
    // الصيني من خط الإنتاج (misc.underKm/aboutKm — دورة 2026-08-29)
    // والألماني من دفعة الواجهة الألمانية (detail.underKm/aboutKm — 2026-09-03)
    // والروسي من دفعة الواجهة الروسية (2026-09-05)
    .map((n) => ({ ...n, dist: distLabel(n.km, lang) }));
}

// فهرس المطاعم لكل لغة (ar/en فقط): معرّف ملف المعلم ← المطاعم القريبة مرتّبةً.
// الترتيب: المسمّاة صراحةً في near أولاً ثم مطاعم الحيّ، وفي كل مجموعة أبجدياً بالاسم المعروض.
// لا يدخل الفهرس إلا مطعم له صفحة مبنية بتلك اللغة (hasDiningPage — البوابة نفسها لمساري الصفحة).
const diningIndex = new Map<'ar' | 'en', Promise<Map<string, NearbyDining[]>>>();

const buildDiningIndex = async (lang: 'ar' | 'en'): Promise<Map<string, NearbyDining[]>> => {
  const places = (await getCollection('dining')).filter((e) => hasDiningPage(e, lang));
  const out = new Map<string, NearbyDining[]>();
  for (const a of await allAttractions()) {
    const hits: NearbyDining[] = [];
    for (const p of places) {
      const d = p.data;
      const explicit = d.near?.includes(a.id) ?? false;
      if (!explicit && !(d.district && d.district === a.data.district)) continue;
      hits.push({
        href: diningHref(d, lang),
        name: lang === 'ar' ? d.name : d.name_en,
        kind: d.kind,
        area: lang === 'ar' ? d.area : d.area_en,
        id: d.slug_en,
        img: d.img,
        alt: lang === 'ar' ? d.alt : d.alt_en,
        explicit,
      });
    }
    hits.sort((x, y) => Number(y.explicit) - Number(x.explicit) || x.name.localeCompare(y.name, lang));
    if (hits.length) out.set(a.id, hits.slice(0, DINING_NEAR_MAX));
  }
  return out;
};

/** مطاعم ومقاهٍ قرب هذا المعلم (الفهرس العكسي لصفحة المطعم) — [] في غير ar/en أو حين لا نتيجة. */
export async function diningNear(entry: CollectionEntry<'attractions'>, lang: Lang): Promise<NearbyDining[]> {
  if (lang !== 'ar' && lang !== 'en') return [];
  let idx = diningIndex.get(lang);
  if (!idx) diningIndex.set(lang, (idx = buildDiningIndex(lang)));
  return (await idx).get(entry.id) ?? [];
}
