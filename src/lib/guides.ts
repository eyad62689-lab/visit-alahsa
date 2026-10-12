// بوابة نشر دليل المرشدين — المصدر الوحيد لسؤال «من يُبنى؟».
//
// المرشد يُنشر فقط إن لم يكن مسودة وكانت رخصته سارية يوم البناء (license.expires ≥ اليوم).
// من انتهت رخصته: لا صفحة، ولا بطاقة في الفهرس، ولا صفّ في sitemap — حتى تُجدَّد ويُحدَّث
// الملف. البوابة تُحسب عند كل بناء، فسريانها على الموقع الحيّ يلزمه بناء دوري.
//
// وحالة الدليل كله مشتقة من العدّ نفسه بلا راية يدوية: بلا مرشد منشور يبقى الفهرس مبنياً
// (ليُوجَّه المرشدون إلى دعوة الانضمام) لكنه noindex وخارج sitemap ولا رابط إليه من الموقع؛
// وبأول مرشد منشور يُفهرَس ويدخل sitemap ويظهر رابطه في «خطّط لرحلتك» والتذييل.
import { getCollection, type CollectionEntry } from 'astro:content';

export type GuideEntry = CollectionEntry<'guides'>;
type AttractionEntry = CollectionEntry<'attractions'>;

/** يوم بصيغة YYYY-MM-DD من تاريخ الترويسة (YAML يقرؤه منتصف ليل UTC). */
export const isoDay = (d: Date): string => d.toISOString().slice(0, 10);

/** يوم البناء بتوقيت الرياض (UTC+3 بلا توقيت صيفي) — الرخصة سارية حتى نهاية يوم انتهائها هناك. */
export const buildDay = (now: Date = new Date()): string => isoDay(new Date(now.getTime() + 3 * 3600 * 1000));

/** هل يُنشر المرشد؟ ليس مسودة، ورخصته لم تنتهِ قبل يوم البناء. */
export const isPublishableGuide = (
  d: { draft: boolean; license: { expires: Date } },
  today: string = buildDay(),
): boolean => !d.draft && isoDay(d.license.expires) >= today;

let cache: Promise<GuideEntry[]> | undefined;

async function load(): Promise<GuideEntry[]> {
  const [all, attractions] = await Promise.all([getCollection('guides'), getCollection('attractions')]);
  const known = new Set(attractions.map((a) => a.data.slug_en));
  // التحقق على كل الملفات لا المنشور وحده: خطأ في ملف مسودة يُكشف قبل نشره
  const seen = { slug_ar: new Map<string, string>(), slug_en: new Map<string, string>(), license: new Map<string, string>() };
  for (const g of all) {
    const dup = (kind: keyof typeof seen, value: string) => {
      const other = seen[kind].get(value);
      if (other) throw new Error(`[guides] ${kind} مكرر «${value}» في ${other} و${g.id}`);
      seen[kind].set(value, g.id);
    };
    dup('slug_ar', g.data.slug_ar);
    dup('slug_en', g.data.slug_en);
    dup('license', g.data.license.number);
    for (const tour of g.data.tours) {
      for (const slug of tour.attractions) {
        if (!known.has(slug)) throw new Error(`[guides] ${g.id}: الجولة «${tour.title}» تشير إلى معلم غير موجود «${slug}» (المفتاح slug_en لمعلم قائم)`);
      }
    }
  }
  return all.filter((g) => isPublishableGuide(g.data));
}

/** المرشدون المنشورون — بلا ترتيب. تُحمَّل مرة واحدة لكل بناء. */
export const publishedGuides = (): Promise<GuideEntry[]> => (cache ??= load());

/** عدد المرشدين المنشورين — منه تُشتق حالة الدليل كلها. */
export const guidesCount = async (): Promise<number> => (await publishedGuides()).length;

/** هل الدليل معلَن (مفهرَس، في sitemap، مربوط من الموقع)؟ */
export const guidesListed = async (): Promise<boolean> => (await guidesCount()) > 0;

/** الترتيب محايد: أبجدي بالاسم العربي في العربية وبالاسم الإنجليزي في غيرها — لا «مميَّز». */
export function sortGuides(list: GuideEntry[], lang: string): GuideEntry[] {
  const ar = lang === 'ar';
  const collator = new Intl.Collator(ar ? 'ar' : 'en', { sensitivity: 'base' });
  return [...list].sort((a, b) => collator.compare(ar ? a.data.name : a.data.name_en, ar ? b.data.name : b.data.name_en));
}

/** معالم الجولات بمفاتيحها — لروابط صفحات المعالم وصورها في صفحة المرشد. */
export async function attractionsBySlug(): Promise<Map<string, AttractionEntry>> {
  return new Map((await getCollection('attractions')).map((a) => [a.data.slug_en, a]));
}
