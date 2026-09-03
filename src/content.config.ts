// نموذج محتوى «المعلم» — Content Collection عبر طبقة المحتوى (glob loader).
// مصدر الحقيقة لكل صفحات المعالم. الحقول العملية موسومة وتُملأ بعد التحقق.
import { defineCollection } from 'astro:content';
// z من astro/zod لا astro:content: التصدير القديم مهمل في Astro 7 (38 تحذيراً في astro check)
import { z } from 'astro/zod';
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
    mapUrl: z.url().optional(),               // رابط خرائط جوجل
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
      // ── التوثيق (2026-08-31) ───────────────────────────────────────────
      // بند دراسة التطوير: «لا معلومة تشغيلية دون مصدر وتاريخ تحقق».
      // الحقول اختيارية في النوع لكن الفحص أدناه يجعلها إلزامية متى verified=true،
      // فيستحيل نشر موعدٍ أو رسمٍ بلا إسناد — يفشل البناء لا المراجعة البشرية.
      source: z.string().optional(),                                   // اسم الجهة أو المرجع (عربي)
      // اسم المصدر بلغة كل نسخة: بدونه يظهر اسمٌ عربي داخل الصفحة الإنجليزية —
      // وهي المخالفة نفسها التي يحرسها فلتر label_en/value_en أعلاه.
      // الصينية تتراجع للإنجليزية على سلسلة الموقع (zh ← en ← ar).
      source_en: z.string().optional(),
      source_zh: z.string().optional(),
      sourceUrl: z.string().url().optional(),                          // رابطه إن وُجد
      verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),  // تاريخ التحقق YYYY-MM-DD
      nextReview: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),  // تجاوز دورة المراجعة الافتراضية
    }).refine((p) => !p.verified || (p.source && p.source_en && p.verifiedAt), {
      message: 'البند الموثّق (verified: true) يلزمه source وsource_en وverifiedAt — لا معلومة تشغيلية بلا إسناد بلغة قارئها',
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

// المطاعم والمقاهي — مصدر الحقيقة الوحيد للفهرس وللصفحات المفردة معاً
// (هُجِّرت من src/data/dining.ts في 2026-08-30؛ القرار وحججه في
// docs/قرار-بنية-صفحات-المنشآت.md). نمط الحقول `_en` كنمط `attractions`.
//
// **بوابة توليد الصفحة المفردة هي المتن**: منشأةٌ بمتنٍ دون العتبة (80 كلمة
// عربية / 100 إنجليزية) لا تُولَّد لها صفحة، وتبقى بطاقةً في الفهرس ترتبط
// بخرائط قوقل — على سابقة `title_zh` في المعالم. فلا تُنشر صفحة رقيقة أبداً.
// `bakery` أُضيف مع دفعة مخابز الخبز الأحمر (2026-09-01): مخبزٌ تقليدي ليس
// مطعماً ولا مقهى، وحشره في `cafe` كان يفسد مرشّح النوع ونوع schema.org معاً.
const DINING_KINDS = ['restaurant', 'cafe', 'bakery'] as const;
// `khudud` و`qarah` أُضيفا مع الدفعة نفسها — حي الخدود شرق الهفوف، والقارة
// شرق الواحة عند جبل القارة.
const DISTRICTS = ['alkoot', 'downtown', 'rafah-north', 'khalidiyah', 'rawdah',
  'mazrou', 'uwaimriyah', 'olaya', 'khaleej', 'mubarraz', 'khudud', 'qarah'] as const;

const dining = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dining' }),
  schema: z.object({
    name: z.string(),                          // الاسم العربي (displayName من خرائط قوقل)
    name_en: z.string(),
    slug_ar: z.string(),
    slug_en: z.string(),
    kind: z.enum(DINING_KINDS),
    // الموقع حقيقةٌ مصدرها عنوان خرائط قوقل نفسه (تحقق HTTP فعلي — رأس
    // DiningView.astro). منشأةٌ لم يُتحقَّق من عنوانها بعد تُترك بلا حقلَي
    // الموقع بدل تخمين حيّها: البطاقة تظهر تحت «كل المواقع» بلا سطر موقع،
    // على سابقة التدهور الرشيق في `title_zh`. لا تُملأ هذه الحقول إلا بمصدر.
    district: z.enum(DISTRICTS).optional(),    // الموقع المعياري — مفتاح التصفية
    area: z.string().optional(),               // الموقع كما يُعرض
    area_en: z.string().optional(),
    blurb: z.string(),                         // نبذة البطاقة — لا ادعاء جودة ولا أصناف
    blurb_en: z.string(),
    alt: z.string(),                           // النص البديل للصورة
    alt_en: z.string(),
    // الصينية (الدفعة 14 — 2026-09-03): نبذة البطاقة وسطر الموقع والنص البديل، على نمط
    // title_zh الاختياري في المعالم؛ بدونها تتراجع البطاقة للإنجليزية. الاسم لا يُترجم
    // (يبقى name_en اللاتيني كما تسمّي المنشأة نفسها) — قاعدة الموقع.
    blurb_zh: z.string().optional(),
    area_zh: z.string().optional(),
    alt_zh: z.string().optional(),
    img: z.string(),                           // المسار الأساسي بلا امتداد
    maps: z.url(),
    order: z.number().default(99),
    body_en: z.string().default(''),           // المتن الإنجليزي (المتن العربي في جسم الملف)
  }),
});

// أماكن الإقامة — قسمٌ مستقل أُنشئ في 2026-09-01 (قرار إياد) لأن الفندق ليس
// منشأة طعام: نُزل تراثي أو فندق شاطئي يُقصد للمبيت لا للوجبة. النموذج نسخة
// مطابقة لنموذج `dining` عمداً — نفس نمط الحقول `_en`، ونفس بوابة النشر
// بالمتن (80 كلمة عربية / 100 إنجليزية)، فتنطبق عليه أدوات الفحص نفسها.
//
// حياد الترشيح: هذه بطاقاتٌ وصفية بصور ومواقع، لا توصيات ولا تقييمات جودة —
// وهو ما يبقي نبرة «خطط لرحلتك» (لا نرشّح منشأة بعينها) صحيحةً كما هي.
const STAY_KINDS = ['heritage-inn', 'hotel'] as const;

const stay = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stay' }),
  schema: z.object({
    name: z.string(),
    name_en: z.string(),
    slug_ar: z.string(),
    slug_en: z.string(),
    kind: z.enum(STAY_KINDS),
    area: z.string().optional(),
    area_en: z.string().optional(),
    blurb: z.string(),
    blurb_en: z.string(),
    alt: z.string(),
    alt_en: z.string(),
    // الصينية (الدفعة 14) — كنموذج dining: اختيارية، والبطاقة تتراجع للإنجليزية بدونها
    blurb_zh: z.string().optional(),
    area_zh: z.string().optional(),
    alt_zh: z.string().optional(),
    img: z.string(),                           // المسار الأساسي بلا امتداد
    maps: z.url(),
    order: z.number().default(99),
    body_en: z.string().default(''),           // المتن الإنجليزي (العربي في جسم الملف)
  }),
});

export const collections = { attractions, blog, dining, stay };
