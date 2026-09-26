// روابط المسارات وربط محطاتها بصفحات المعالم — مصدر واحد للفهرس وصفحة المسار
// وقسم «ضمن المسارات» في صفحة المعلم وsitemap وllms.txt.
import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { TRAILS, type Trail, type TrailStop } from '../data/trails';

/** المسارات عربي/إنجليزي فقط. المسار المحدَّد من المالك: /trails/ و/en/trails/
 *  (لا slug عربي كبقية الأقسام — طلبٌ صريح). بشرطة ختامية دائماً (تطابق canonical). */
export type TrailLang = 'ar' | 'en';
export const isTrailLang = (lang: Lang): lang is TrailLang => lang === 'ar' || lang === 'en';
export const trailsIndexHref = (lang: TrailLang) => (lang === 'ar' ? '/trails/' : '/en/trails/');
export const trailHref = (t: Pick<Trail, 'slug'>, lang: TrailLang) =>
  lang === 'ar' ? `/trails/${t.slug}/` : `/en/trails/${t.slug}/`;
export const trailAlt = (t: Pick<Trail, 'slug'>) => ({ ar: trailHref(t, 'ar'), en: trailHref(t, 'en') });

// ── ربط المحطة بالمعلم ──────────────────────────────────────────────────────
// landmarkSlugHint في المصدر تلميح لا مفتاح: يطابق حرفياً ثلاثة ملفات فقط
// (qasr-ibrahim · jabal-al-qarah · jawatha-mosque). جدول الأسماء المستعارة أدناه
// صريح ومعلَّل لكل سطر، ويقتصر على محطةٍ هي **المكان المسمّى نفسه** بلا لبس
// (مطابقة الاسم والعنوان والنبذة في ملف المعلم). ما عدا ذلك يبقى بلا رابط ولا دبوس
// ولا إحداثيات مختلَقة.
export const STOP_ALIASES: Record<string, string> = {
  // «بيت البيعة (بيت الملا)» = baiah.md «بيت البيعة» — بيت آل الملا في حي الكوت، وفيه البيعة
  'bayt-al-bayah': 'baiah',
  // «المدرسة الأميرية (بيت الثقافة)» = ameeriah.md «المدرسة الأميرية / Amiriah School» — أول مدرسة حكومية، 1356هـ/1937م
  'al-amiriya-school': 'ameeriah',
  // «سوق القيصرية» = qaisariyah.md «سوق القيصرية» — ومعرّف مكوّن اليونسكو 1563-005 نفسه
  'souq-al-qaisariya': 'qaisariyah',
  // «دوغة الغراش للفخار» = duqat-algharash.md «دوغة الغراش / Dougha Al-Gharash Pottery» — بيت فخار أسرة الغراش في القارة
  'dougha-al-gharash': 'duqat-algharash',
  // «متنزه الأحساء الوطني» = national-park.md «منتزه الأحساء الوطني» — العمران، مشروع حجز الرمال 1962م
  'al-ahsa-national-park': 'national-park',
  // «بحيرة الأصفر» = asfar.md «بحيرة الأصفر» — ومعرّف مكوّن اليونسكو 1563-012 نفسه
  'al-asfar-lake': 'asfar',
  // «شاطئ العقير» = uqair-beach.md «شاطئ العقير»
  'al-uqair-beach': 'uqair-beach',
  // «ميناء العقير التاريخي» = al-uqair.md: عنوانه «العُقير» لكن موضوعه الميناء التاريخي نفسه —
  // التسمية العلوية «ميناء ورمال»، والنبذة «أوّل موانئ المنطقة»، والمتن عن الميناء وبقايا مبانيه
  // وحصنه، وإحداثياته عند مباني الميناء (على ~200م من قلعة العقير) لا عند الشاطئ (~11كم شمالاً).
  'al-uqair-port': 'al-uqair',
};
// بلا رابط عمداً (لا معلم هو المكان المسمّى نفسه):
//   oasis-farms (تلميح al-ahsa-oasis) — «بساتين الواحة والمزارع الريفية» مشهدٌ عام لا معلم مفرد.
//   natural-springs (تلميح ain-najm) — «العيون الطبيعية» عيونٌ عدّة؛ حديقة عين النجم موقع واحد منها.

type Att = CollectionEntry<'attractions'>;

/** معلم المحطة أو undefined — المطابقة الحرفية للتلميح أولاً ثم الجدول الصريح */
export const stopAttraction = (s: TrailStop, all: Att[]): Att | undefined => {
  const slug = all.some((e) => e.data.slug_en === s.landmarkSlugHint) ? s.landmarkSlugHint : STOP_ALIASES[s.landmarkSlugHint];
  return slug ? all.find((e) => e.data.slug_en === slug) : undefined;
};

/** المسارات التي تمرّ بمعلم ما — لقسم «ضمن المسارات» في صفحة المعلم (ar/en فقط) */
export const trailsForAttraction = (slugEn: string, all: Att[]): Trail[] =>
  TRAILS.filter((t) => t.stops.some((s) => stopAttraction(s, all)?.data.slug_en === slugEn));
