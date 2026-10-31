// المسارات المقترحة (مسارات) — مصدر الحقيقة الوحيد لقسم /trails/ بلغاته الخمس.
//
// المحتوى في trails.json **منسوخ بايتاً ببايت** من ملف المالك المدقَّق (md5
// cd1b8636bff88434658b144e97250044، 2026-09-26) — لا يُعاد صوغ أي نص ولا تُضاف واقعة.
// المخطط أدناه صارم (strictObject): أي حقل زائد أو ناقص يُفشل البناء لحظة الاستيراد،
// فيستحيل أن تتسلل حقيقة غير مدقَّقة عبر حقل جديد لا يعرفه القالب.
//
// ملف المالك عربي/إنجليزي (meta.languages). نصوص zh/de/ru/ur في ملفات مستقلة
// (trails.zh.json · trails.de.json · trails.ru.json · trails.ur.json) تكتبها خطوط الترجمة حصراً، بالمفاتيح
// نفسها (slug المسار ومفتاح المحطة ومفتاح المصدر) — فلا يُمسّ ملف المالك، ومخططها يرفض أي
// مسار أو محطة أو مصدر ناقص أو زائد فلا تُبنى صفحة بلغةٍ نصفها إنجليزي.
// المسارات **مقترحة من الموقع لا رسمية**: meta.attribution تُعرض في رأس الفهرس وذيل كل
// مسار، ويحرس C27 ألا تحمل العناوين والتسميات والمقدّمات وصف «المعتمدة/الرسمية/official/approved».
import { z } from 'astro/zod';
import raw from './trails.json';
import rawZh from './trails.zh.json';
import rawDe from './trails.de.json';
import rawRu from './trails.ru.json';
import rawUr from './trails.ur.json';
import rawTr from './trails.tr.json';

const Bi = z.strictObject({ ar: z.string().min(1), en: z.string().min(1) });
const TrailText = z.strictObject({ title: z.string().min(1), tagline: z.string().min(1), intro: z.string().min(1) });
const StopText = z.strictObject({ name: z.string().min(1), text: z.string().min(1) });

export const TrailsSchema = z.strictObject({
  meta: z.strictObject({
    collection: z.literal('trails'),
    version: z.string(),
    verifiedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    languages: z.tuple([z.literal('ar'), z.literal('en')]),
    attribution: Bi,
    unescoNote: Bi,
    editorialRules: z.array(z.string()),
  }),
  sources: z.record(z.string(), z.strictObject({
    // عنوان واحد للغتين، أو عنوان بكل لغة ({ ar, en })
    title: z.union([z.string().min(1), Bi]),
    url: z.url(),
    tier: z.enum(['official', 'secondary', 'press']),
  })),
  trails: z.array(z.strictObject({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number().int(),
    theme: z.string(),
    suggestedDuration: z.enum(['half-day', 'full-day']),
    mode: z.enum(['walking', 'driving', '4x4']),
    ar: TrailText,
    en: TrailText,
    stops: z.array(z.strictObject({
      key: z.string().regex(/^[a-z0-9-]+$/),
      landmarkSlugHint: z.string(),
      unesco: z.boolean(),
      ar: StopText,
      en: StopText,
      sources: z.array(z.string()).min(1),
    })).min(1),
  })).min(1),
}).superRefine((d, ctx) => {
  // مفتاح مصدر مفقود = رابط مكسور تحت «المصادر» — يُرفض هنا قبل أن يصل القالب (ويعيده C27 على dist)
  d.trails.forEach((t, i) => t.stops.forEach((s, j) => s.sources.forEach((k) => {
    if (!(k in d.sources)) ctx.addIssue({ code: 'custom', path: ['trails', i, 'stops', j, 'sources'], message: `مفتاح مصدر غير معرَّف: ${k}` });
  })));
});

export type TrailsData = z.infer<typeof TrailsSchema>;
export type Trail = TrailsData['trails'][number];
export type TrailStop = Trail['stops'][number];

export const TRAILS_DATA: TrailsData = TrailsSchema.parse(raw);
/** المسارات مرتّبة بحقل order */
export const TRAILS: Trail[] = [...TRAILS_DATA.trails].sort((a, b) => a.order - b.order);
export const TRAIL_META = TRAILS_DATA.meta;
export const TRAIL_SOURCES = TRAILS_DATA.sources;

// ── نصوص zh/de/ru/ur ────────────────────────────────────────────────────────
export type TrailLang = 'ar' | 'en' | 'zh' | 'de' | 'ru' | 'ur' | 'tr';
type L10nLang = Exclude<TrailLang, 'ar' | 'en'>;

const sameKeys = (a: string[], b: string[]) => a.length === b.length && [...a].sort((a, b) => a.localeCompare(b)).join('\n') === [...b].sort((a, b) => a.localeCompare(b)).join('\n');
const L10nSchema = z.strictObject({
  meta: z.strictObject({ attribution: z.string().min(1), unescoNote: z.string().min(1) }),
  // وصف فهرس المسارات: {n} عددها و{titles} عناوينها موصولة بـlistSep
  seoDesc: z.string().regex(/\{n\}/).regex(/\{titles\}/),
  listSep: z.string().min(1),
  sources: z.record(z.string(), z.string().min(1)),
  trails: z.record(z.string(), z.strictObject({
    title: z.string().min(1), tagline: z.string().min(1), intro: z.string().min(1),
    stops: z.record(z.string(), StopText),
  })),
}).superRefine((d, ctx) => {
  if (!sameKeys(Object.keys(d.sources), Object.keys(TRAILS_DATA.sources))) ctx.addIssue({ code: 'custom', path: ['sources'], message: 'مفاتيح المصادر لا تطابق trails.json' });
  if (!sameKeys(Object.keys(d.trails), TRAILS.map((t) => t.slug))) ctx.addIssue({ code: 'custom', path: ['trails'], message: 'المسارات لا تطابق trails.json' });
  for (const t of TRAILS) {
    if (d.trails[t.slug] && !sameKeys(Object.keys(d.trails[t.slug].stops), t.stops.map((s) => s.key))) ctx.addIssue({ code: 'custom', path: ['trails', t.slug, 'stops'], message: 'المحطات لا تطابق trails.json' });
  }
});
const L10N: Record<L10nLang, z.infer<typeof L10nSchema>> = {
  zh: L10nSchema.parse(rawZh),
  de: L10nSchema.parse(rawDe),
  ru: L10nSchema.parse(rawRu),
  ur: L10nSchema.parse(rawUr),
  // التركية من خط tr-translation-pipeline (دفعة tr-trails-1)
  tr: L10nSchema.parse(rawTr),
};
const isBase = (lang: TrailLang): lang is 'ar' | 'en' => lang === 'ar' || lang === 'en';

/** عنوان المسار وتسميته ومقدّمته بلغة الصفحة */
export const trailText = (t: Trail, lang: TrailLang): z.infer<typeof TrailText> => {
  if (isBase(lang)) return t[lang];
  const { title, tagline, intro } = L10N[lang].trails[t.slug];
  return { title, tagline, intro };
};
/** اسم المحطة ونصها بلغة الصفحة */
export const stopText = (t: Trail, s: TrailStop, lang: TrailLang): z.infer<typeof StopText> =>
  isBase(lang) ? s[lang] : L10N[lang].trails[t.slug].stops[s.key];
export const trailAttribution = (lang: TrailLang): string => (isBase(lang) ? TRAIL_META.attribution[lang] : L10N[lang].meta.attribution);
export const trailUnescoNote = (lang: TrailLang): string => (isBase(lang) ? TRAIL_META.unescoNote[lang] : L10N[lang].meta.unescoNote);
/** عنوان المصدر بلغة الصفحة */
export const sourceTitle = (key: string, lang: TrailLang): string => {
  if (!isBase(lang)) return L10N[lang].sources[key];
  const title = TRAIL_SOURCES[key].title;
  return typeof title === 'string' ? title : title[lang];
};
/** وصف صفحة الفهرس (meta description) بلغة الصفحة */
export const trailsSeoDesc = (lang: TrailLang): string => {
  const titles = TRAILS.map((t) => trailText(t, lang).title);
  if (lang === 'ar') return `${titles.length} مسارات مقترحة بين معالم الأحساء: ${titles.join('، ')}.`;
  if (lang === 'en') return `${titles.length} suggested trails across Al-Ahsa’s landmarks: ${titles.join(', ')}.`;
  return L10N[lang].seoDesc.replace('{n}', String(titles.length)).replace('{titles}', titles.join(L10N[lang].listSep));
};
