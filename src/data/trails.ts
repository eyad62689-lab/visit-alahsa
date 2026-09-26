// المسارات المقترحة (مسارات) — مصدر الحقيقة الوحيد لقسم /trails/ و/en/trails/.
//
// المحتوى في trails.json **منسوخ بايتاً ببايت** من ملف المالك المدقَّق (md5
// cd1b8636bff88434658b144e97250044، 2026-09-26) — لا يُعاد صوغ أي نص ولا تُضاف واقعة.
// المخطط أدناه صارم (strictObject): أي حقل زائد أو ناقص يُفشل البناء لحظة الاستيراد،
// فيستحيل أن تتسلل حقيقة غير مدقَّقة عبر حقل جديد لا يعرفه القالب.
//
// عربي/إنجليزي فقط (meta.languages) — لا صفحات zh/de/ru لهذا القسم، ولا hreflang إليها.
// المسارات **مقترحة من الموقع لا رسمية**: meta.attribution تُعرض في رأس الفهرس وذيل كل
// مسار، ويحرس C27 ألا تحمل العناوين والتسميات والمقدّمات وصف «المعتمدة/الرسمية/official/approved».
import { z } from 'astro/zod';
import raw from './trails.json';

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
    title: z.string().min(1),
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
