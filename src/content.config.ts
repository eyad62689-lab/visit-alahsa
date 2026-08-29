// نموذج محتوى «المعلم» — Content Collection عبر طبقة المحتوى (glob loader).
// مصدر الحقيقة لكل صفحات المعالم. الحقول العملية موسومة وتُملأ بعد التحقق.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORIES = ['historic', 'museum', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'] as const;

const attractions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/attractions' }),
  schema: z.object({
    title: z.string(),                         // العنوان العربي
    title_en: z.string().optional(),           // العنوان الإنجليزي (لمرحلة الإنجليزية)
    // الحقول الصينية (zh-CN): تُملأ حصراً من مخرجات خط zh-translation-pipeline
    // المعتمدة (درجة الحاكم ≥ العتبة). وجود title_zh هو مفتاح توليد صفحة /zh/
    // وإدراج hreflang وخيار 中文 في مبدّل اللغة.
    title_zh: z.string().optional(),
    kicker_zh: z.string().optional(),
    summary_zh: z.string().optional(),
    body_zh: z.string().optional(),
    area_zh: z.string().optional(),
    bestTime_zh: z.string().optional(),
    slug_ar: z.string(),                       // الرابط العربي (النسخة العربية)
    slug_en: z.string(),                       // الرابط اللاتيني (النسخة الإنجليزية)
    category: z.enum(CATEGORIES),
    kicker: z.string(),                        // تسمية علوية قصيرة
    summary: z.string(),                       // وصف البطاقة (عربي)
    summary_en: z.string().optional(),         // وصف البطاقة (إنجليزي)
    body_en: z.string().optional(),            // نصّ الصفحة (إنجليزي)
    area: z.string().optional(),               // المنطقة/الموقع (حقيقة)
    area_en: z.string().optional(),            // المنطقة بالإنجليزية (ترجمة نفس الحقيقة)
    featured: z.boolean().default(false),
    order: z.number().default(99),
    bestTime: z.string().optional(),           // أفضل وقت للزيارة (توصية عامة)
    bestTime_en: z.string().optional(),        // أفضل وقت بالإنجليزية
    location: z.object({ lat: z.number(), lng: z.number() }).optional(), // إحداثيات (للمرحلة ٣)
    mapUrl: z.string().url().optional(),       // رابط خرائط جوجل
    // معلومات عملية موسومة: verified=false تعني بحاجة لتأكيد قبل النشر.
    // label_en/value_en ترجمة البند للإنجليزية — بدونهما لا يظهر البند في الصفحة الإنجليزية.
    practical: z.array(z.object({
      label: z.string(),
      value: z.string(),
      label_en: z.string().optional(),
      value_en: z.string().optional(),
      // label_zh/value_zh ترجمة البند للصينية — بدونهما لا يظهر البند في صفحة /zh/
      label_zh: z.string().optional(),
      value_zh: z.string().optional(),
      verified: z.boolean().default(false),
    })).default([]),
    heroImage: z.string().optional(),          // مسار صورة لاحقاً (الآن عنصر نائب)
    gallery: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

// مقالات المدونة — كل لغة ملفها المستقل (المقال طويل فلا يصلح نمط الحقول _en).
// الترجمتان تُقرنان بحقل key المشترك؛ slug بلغة الملف نفسه (عربي للعربية).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),                   // وصف الميتا وبطاقة الفهرس
    lang: z.enum(['ar', 'en']),
    key: z.string(),                           // معرّف مشترك يقرن الترجمتين
    slug: z.string(),                          // رابط المقال بلغة الملف
    topic: z.string(),                         // التسمية العلوية (eyebrow) بلغة الملف
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),          // نفس اصطلاح صور المعالم (/img/… بلا امتداد)
    tags: z.array(z.string()).default([]),
    // أسئلة شائعة تُعرض بعد المقال وتُصدَّر FAQPage في JSON-LD
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    draft: z.boolean().default(false),         // المسودة لا تُبنى صفحتها ولا تظهر في الفهرس وsitemap
  }),
});

export const collections = { attractions, blog };
