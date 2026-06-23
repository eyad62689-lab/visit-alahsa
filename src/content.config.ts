// نموذج محتوى «المعلم» — Content Collection عبر طبقة المحتوى (glob loader).
// مصدر الحقيقة لكل صفحات المعالم. الحقول العملية موسومة وتُملأ بعد التحقق.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORIES = ['historic', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'] as const;

const attractions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/attractions' }),
  schema: z.object({
    title: z.string(),                         // العنوان العربي
    title_en: z.string().optional(),           // العنوان الإنجليزي (لمرحلة الإنجليزية)
    slug_ar: z.string(),                       // الرابط العربي (النسخة العربية)
    slug_en: z.string(),                       // الرابط اللاتيني (النسخة الإنجليزية)
    category: z.enum(CATEGORIES),
    kicker: z.string(),                        // تسمية علوية قصيرة
    summary: z.string(),                       // وصف البطاقة (عربي)
    summary_en: z.string().optional(),         // وصف البطاقة (إنجليزي)
    body_en: z.string().optional(),            // نصّ الصفحة (إنجليزي)
    area: z.string().optional(),               // المنطقة/الموقع (حقيقة)
    featured: z.boolean().default(false),
    order: z.number().default(99),
    bestTime: z.string().optional(),           // أفضل وقت للزيارة (توصية عامة)
    location: z.object({ lat: z.number(), lng: z.number() }).optional(), // إحداثيات (للمرحلة ٣)
    mapUrl: z.string().url().optional(),       // رابط خرائط جوجل
    // معلومات عملية موسومة: verified=false تعني بحاجة لتأكيد قبل النشر
    practical: z.array(z.object({
      label: z.string(),
      value: z.string(),
      verified: z.boolean().default(false),
    })).default([]),
    heroImage: z.string().optional(),          // مسار صورة لاحقاً (الآن عنصر نائب)
    gallery: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { attractions };
