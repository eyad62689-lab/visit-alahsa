// نموذج محتوى «المعلم» — Content Collection عبر طبقة المحتوى (glob loader).
// مصدر الحقيقة لكل صفحات المعالم. الحقول العملية موسومة وتُملأ بعد التحقق.
import { defineCollection } from 'astro:content';
import { DISTRICTS, DISTRICT_MENTION } from './data/districts';
import { GUIDE_SPECIALTIES, GUIDE_LANGUAGES } from './data/guides';
import { SEO_BENEFIT_KEYS, SEO_BENEFITS } from './data/seo-benefits';
// z من astro/zod لا astro:content: التصدير القديم مهمل في Astro 7 (38 تحذيراً في astro check)
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const CATEGORIES = ['historic', 'museum', 'religious', 'nature', 'parks', 'market', 'farm', 'experience', 'taste', 'events'] as const;

// عدد الكلمات لفقرة الإجابة — حدّاها ملزمان في المخطط ويُعاد فحصهما في C24 على dist
const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
// وصف الصفحة (description): طوله بنقاط الترميز بين حدّين ملزمين في المخطط ويُعاد فحصهما في C24 على dist
// (وC72 يحرس السقف 160). جمله: التقسيم على . ؟ ! وكل جملة جزء حرفي من نصّ المصدر.
const cp = (s: string) => [...s].length;
const DESC_MIN = 120;
const DESC_MAX = 158;
const sentencesOf = (s: string) => s.split(/[.؟!?。]/).map((x) => x.trim()).filter(Boolean);
// مصدر جمل الوصف بلغة الصفحة: فقرة الإجابة وحدها إن وُجدت (طولها يكفي للمدى)، وإلا الملخص ومتن الصفحة.
// أي جملة (بعد التقسيم على . ؟ !) جزء حرفي من المصدر — لا جملة مختلقة ولا مُعاد صوغها.
// المتن الإنجليزي (body_en) حقل في الملف فيُفحص هنا؛ أما المتن العربي فهو نصّ الـmarkdown لا حقل في المخطط
// فلا يراه الـrefine: جملة عربية لا تَرِد في answer (أو الملخص) تُحال إلى C24 الذي يقارنها على dist
// بنصّ `.ah-sum` و`.prose` المنشورَين (حرفياً، وبلا تنسيق ماركداون)، وهو الحاسم لها.
const descriptionSourceOk = (
  a: { description?: string; description_en?: string; answer?: string; answer_en?: string; summary: string; summary_en?: string; body_en?: string },
  lang: 'ar' | 'en',
): boolean => {
  const d = lang === 'ar' ? a.description : a.description_en;
  if (!d) return true;
  const answer = lang === 'ar' ? a.answer : a.answer_en;
  if (answer) return sentencesOf(d).every((x) => answer.includes(x));
  if (lang === 'ar') return true; // خارج الملخص يتحقق منه C24 على dist (متن عربي ليس في المخطط)
  const src = [a.summary_en, a.body_en].filter((t): t is string => Boolean(t));
  return src.length > 0 && sentencesOf(d).every((x) => src.some((t) => t.includes(x)));
};

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
    // الحقول الألمانية (de-DE): تُملأ حصراً من مخرجات خط de-translation-pipeline
    // المعتمدة (درجة الحاكم ≥ العتبة). وجود title_de هو مفتاح توليد صفحة /de/
    // وإدراج hreflang وخيار Deutsch في مبدّل اللغة — على سابقة title_zh.
    title_de: z.string().optional(),
    kicker_de: z.string().optional(),
    summary_de: z.string().optional(),
    body_de: z.string().optional(),
    area_de: z.string().optional(),
    bestTime_de: z.string().optional(),
    // الحقول الروسية (ru-RU): تُملأ حصراً من مخرجات خط ru-translation-pipeline
    // المعتمدة (درجة الحاكم ≥ العتبة). وجود title_ru هو مفتاح توليد صفحة /ru/
    // وإدراج hreflang وخيار Русский في مبدّل اللغة — على سابقة title_zh.
    title_ru: z.string().optional(),
    kicker_ru: z.string().optional(),
    summary_ru: z.string().optional(),
    body_ru: z.string().optional(),
    area_ru: z.string().optional(),
    bestTime_ru: z.string().optional(),
    // الحقول الأوردية (ur-PK): تُملأ حصراً من مخرجات خط ur-translation-pipeline
    // المعتمدة (درجة الحاكم ≥ العتبة). وجود title_ur هو مفتاح توليد صفحة /ur/
    // وإدراج hreflang وخيار «اردو» في مبدّل اللغة — على سابقة title_zh.
    title_ur: z.string().optional(),
    kicker_ur: z.string().optional(),
    summary_ur: z.string().optional(),
    body_ur: z.string().optional(),
    area_ur: z.string().optional(),
    bestTime_ur: z.string().optional(),
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
    mapUrl: z.url().optional(),               // رابط خرائط قوقل
    // ── الهوية الخارجية (بند 3.1 — 2026-09-04) ────────────────────────────
    // sameAs: روابط الكيان نفسه في مراجع خارجية (Wikidata + ويكيبيديا) تُصدَّر في
    // TouristAttraction فتلتقي محركات البحث والإجابة على هوية واحدة لا تلتبس.
    // تُملأ فقط لما تحقّق كيانه بمطابقة الإحداثيات أو نصّ المقالة — لا بالاسم
    // وحده (ثمة «جبل القارة» في اليمن ومصر و«قصر خزام» في جدة). الرابط الأول
    // رابط Wikidata حصراً: مرساة الهوية، ويحرسه C19 على dist أيضاً.
    sameAs: z.array(z.url()).default([]).refine(
      (arr) => arr.length === 0 || /^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/.test(arr[0]),
      { message: 'أول رابط في sameAs يجب أن يكون كيان Wikidata (https://www.wikidata.org/wiki/Q…) — مرساة الهوية' },
    ),
    // unesco: معرّف المكوّن داخل موقع التراث العالمي 1563 (واحة الأحساء) كما في
    // جدول «خرائط» اليونسكو الرسمي (whc.unesco.org/en/list/1563/maps/) — ستة من
    // معالمنا من مكوّناته الاثني عشر. جبل القارة ليس مكوّناً مسمّى (داخل الواحة
    // الشرقية 1563-001) فلا يحمل المعرّف وإن ذُكر في نص اليونسكو.
    unesco: z.string().regex(/^1563-\d{3}$/).optional(),
    // ── أسئلة شائعة (بند 3.2 — 2026-09-05) ─────────────────────────────────
    // النمط منسوخ من مجموعة المدونة: تُعرض بعد المتن وتُصدَّر FAQPage في JSON-LD.
    // القاعدة الحاكمة: السؤال يُبنى حصراً مما هو موثّق في الصفحة نفسها (بنود
    // practical بـverified: true + المتن) — لا موعد ولا رسم ولا مسافة من خارجها.
    // يحرسه C21 على dist: كل رقم في سؤال أو جواب يجب أن يرد في متن الصفحة أو
    // بطاقتها، والمنشور (FAQPage + القسم المرئي) يطابق المصدر لكل لغة.
    // حقول اللغات على نمط _en: البند لا يظهر في لغة بلا ترجمته — والصينية
    // والألمانية والروسية والأوردو عبر خطوط ترجمتها حصراً، لا ترجمة عابرة.
    faq: z.array(z.object({
      q: z.string(), a: z.string(),
      q_en: z.string().optional(), a_en: z.string().optional(),
      q_zh: z.string().optional(), a_zh: z.string().optional(),
      q_de: z.string().optional(), a_de: z.string().optional(),
      q_ru: z.string().optional(), a_ru: z.string().optional(),
      q_ur: z.string().optional(), a_ur: z.string().optional(),
    })).default([]),
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
      // label_de/value_de ترجمة البند للألمانية — بدونهما لا يظهر البند في صفحة /de/
      label_de: z.string().optional(),
      value_de: z.string().optional(),
      // label_ru/value_ru ترجمة البند للروسية — بدونهما لا يظهر البند في صفحة /ru/
      label_ru: z.string().optional(),
      value_ru: z.string().optional(),
      // label_ur/value_ur ترجمة البند للأوردو — بدونهما لا يظهر البند في صفحة /ur/
      label_ur: z.string().optional(),
      value_ur: z.string().optional(),
      verified: z.boolean().default(false),
      // ── التوثيق (2026-08-31) ───────────────────────────────────────────
      // بند دراسة التطوير: «لا معلومة تشغيلية دون مصدر وتاريخ تحقق».
      // الحقول اختيارية في النوع لكن الفحص أدناه يجعلها إلزامية متى verified=true،
      // فيستحيل نشر موعدٍ أو رسمٍ بلا إسناد — يفشل البناء لا المراجعة البشرية.
      source: z.string().optional(),                                   // اسم الجهة أو المرجع (عربي)
      // اسم المصدر بلغة كل نسخة: بدونه يظهر اسمٌ عربي داخل الصفحة الإنجليزية —
      // وهي المخالفة نفسها التي يحرسها فلتر label_en/value_en أعلاه.
      // zh وde وru تتراجع للإنجليزية على سلسلة الموقع (اللغة ← en ← ar).
      // لا source_ur عمداً: الحقل بيانات داخلية لا تُعرض، ولا يُترجم إلى الأوردو.
      source_en: z.string().optional(),
      source_zh: z.string().optional(),
      source_de: z.string().optional(),
      source_ru: z.string().optional(),
      sourceUrl: z.string().url().optional(),                          // رابطه إن وُجد
      verifiedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),  // تاريخ التحقق YYYY-MM-DD
      nextReview: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),  // تجاوز دورة المراجعة الافتراضية
    }).refine((p) => !p.verified || (p.source && p.source_en && p.verifiedAt), {
      message: 'البند الموثّق (verified: true) يلزمه source وsource_en وverifiedAt — لا معلومة تشغيلية بلا إسناد بلغة قارئها',
    })).default([]),
    // رابط الجهة المشغّلة للموقع (حسابها أو صفحتها): حين يوجد تصير كلمة «المشغّل» في سطر
    // المواعيد والرسوم تحت بطاقة الزيارة رابطاً إليه، وتبقى نصاً عادياً في غيره.
    operatorUrl: z.string().url().optional(),
    // موقع مفتوح للعموم بلا رسوم دخول أو مفتوح على مدار الساعة: لا يُعرض تحت بطاقته سطر
    // المواعيد والرسوم (لا مشغّل يُراجَع ولا تذكرة). لا يجتمع مع operatorUrl.
    openSite: z.boolean().default(false),
    heroImage: z.string().optional(),          // مسار صورة لاحقاً (الآن عنصر نائب)
    gallery: z.array(z.string()).default([]),
    // عنوان قسم الصور بدل «من المكان» حين تكون الصور من سياق محدد (نسخ سابقة لفعالية موسمية).
    // بلا ترجمة اللغة يبقى العنوان الافتراضي لتلك اللغة.
    galleryTitle: z.string().optional(),
    galleryTitle_en: z.string().optional(),
    galleryTitle_zh: z.string().optional(),
    galleryTitle_de: z.string().optional(),
    galleryTitle_ru: z.string().optional(),
    galleryTitle_ur: z.string().optional(),
    // دعوة لإجراء خارجي في بطاقة الزيارة (تسجيل العارضين مثلاً): لا يظهر الزر في لغة بلا نصّه.
    cta: z.object({
      url: z.url(), label: z.string(), note: z.string().optional(),
      url_en: z.url().optional(), label_en: z.string().optional(), note_en: z.string().optional(),
      // zh/de/ru/ur عبر خطوط ترجمتها؛ الرابط فيها رابط الإنجليزية (لا صفحة تسجيل بلغاتها)
      label_zh: z.string().optional(), note_zh: z.string().optional(),
      label_de: z.string().optional(), note_de: z.string().optional(),
      label_ru: z.string().optional(), note_ru: z.string().optional(),
      label_ur: z.string().optional(), note_ur: z.string().optional(),
    }).optional(),
    tags: z.array(z.string()).default([]),
    // ── المواعيد والرسوم المبنيَنة (الخطوة 8 من خطة التفاعل العالمي، بند 3.3 من الدراسة) ──
    // نسخة آلية القراءة من بند practical الموثّق نفسه — لا تُملأ إلا لما بنده موثّق
    // (يفرضه الفحص أدناه ويحرسه C24 على dist)، وتُصدَّر openingHoursSpecification
    // وisAccessibleForFree/offers في TouristAttraction. الأيام برموز schema.org المختصرة.
    // ── الحيّ (الخطوة 9 من خطة التفاعل العالمي، ف4) ──
    // مفتاح حيّ المنشآت نفسه؛ يُسند فقط حين يسمّي نصّ area القائم (أو العنوان) الحيَّ —
    // يفرضه الفحص أدناه — فتعرض صفحة المنشأة «معالم قريبة في الحيّ» بلا حقيقة مضافة.
    district: z.enum(DISTRICTS).optional(),
    // ── فقرة الإجابة (الخطوة 8 من خطة التفاعل العالمي، بند 3 من ف3) ──
    // 35–45 كلمة تتصدّر المتن وتكون وصف الصفحة، مركّبة حصراً من المتن وبطاقة الزيارة
    // (كل رقم فيها يحرسه C24 على dist ضد بقية المتن والبطاقة). عربي وإنجليزي معاً أو
    // لا شيء؛ zh/de/ru لا تُكتب إلا عبر خطوط الترجمة فلا فقرة لها حتى تمرّ بها.
    answer: z.string().optional(),
    answer_en: z.string().optional(),
    // ── بنية العنوان والوصف لـSEO (ar/en فقط) ──
    // seo: «[العنوان] في [المكان]: [الفائدة]» يُركَّب في src/lib/seo-title.ts. المكان وارد حرفياً في
    // area/title (أو «الأحساء») والفائدة من معجم src/data/seo-benefits.ts بشرط دليلها على المدخل نفسه —
    // يفرضه المخطط أدناه ويحرسه C24 على dist. بلا seo يبقى العنوان كما هو.
    seo: z.object({
      place: z.string().optional(),
      place_en: z.string().optional(),
      benefit: z.enum(SEO_BENEFIT_KEYS).optional(),
    }).optional(),
    // description: وصف الصفحة (120–158 نقطة ترميز)، جمل حرفية من answer إن وُجد وإلا من summary ومتن الصفحة
    // (descriptionSourceOk أدناه؛ المتن العربي يحرسه C24 على dist). عربي وإنجليزي معاً أو لا شيء.
    // بدونه يبقى الوصف = answer ثم summary كما كان.
    description: z.string().optional(),
    description_en: z.string().optional(),
    hoursSpec: z.array(z.object({
      days: z.string().regex(/^(Mo|Tu|We|Th|Fr|Sa|Su)( (Mo|Tu|We|Th|Fr|Sa|Su))*$/),
      opens: z.string().regex(/^\d{2}:\d{2}$/),
      closes: z.string().regex(/^\d{2}:\d{2}$/),
    })).default([]),
    fee: z.union([
      z.object({ free: z.literal(true) }),
      z.object({ amount: z.number().positive(), currency: z.string().default('SAR') }),
      z.object({ min: z.number().positive(), max: z.number().positive(), currency: z.string().default('SAR') }),
    ]).optional(),
  }).refine((a) => a.hoursSpec.length === 0 || a.practical.some((p) => p.verified && /المواعيد|ساعات/.test(p.label)), {
    message: 'hoursSpec يلزمه بند practical موثّق للمواعيد — لا مواعيد مبنيَنة بلا بند موثّق',
  }).refine((a) => !a.fee || a.practical.some((p) => p.verified && /الرسوم|الدخول/.test(p.label)), {
    message: 'fee يلزمه بند practical موثّق للرسوم أو الدخول — لا رسم مبنيَن بلا بند موثّق',
  }).refine((a) => !(a.openSite && a.operatorUrl), {
    message: 'openSite وoperatorUrl لا يجتمعان — الموقع المفتوح بلا مشغّل يُراجَع',
  }).refine((a) => Boolean(a.answer) === Boolean(a.answer_en), {
    message: 'answer وanswer_en معاً أو لا شيء — فقرة الإجابة بلغتي الموقع الكاملتين',
  }).refine((a) => [a.answer, a.answer_en].every((s) => !s || (wc(s) >= 35 && wc(s) <= 45)), {
    message: 'فقرة الإجابة بين 35 و45 كلمة',
  }).refine((a) => !a.district || DISTRICT_MENTION[a.district].test(`${a.area ?? ''} ${a.title}`), {
    message: 'district يُسند فقط حين يسمّي نصّ area أو العنوان الحيَّ نفسه — لا حيّ بالتقدير',
  }).refine((a) => !a.seo?.place || a.seo.place === 'الأحساء' || `${a.area ?? ''} ${a.title}`.includes(a.seo.place), {
    message: 'seo.place يرد حرفياً في area أو العنوان أو يساوي «الأحساء» — لا مكان بالتقدير',
  }).refine((a) => !a.seo?.place_en || a.seo.place_en === 'Al-Ahsa' || `${a.area_en ?? ''} ${a.title_en ?? ''}`.includes(a.seo.place_en), {
    message: 'seo.place_en يرد حرفياً في area_en أو title_en أو يساوي "Al-Ahsa"',
  }).refine((a) => !a.seo || Boolean(a.seo.benefit), {
    message: 'seo يلزمه benefit — المكان وحده لا يبني عنواناً',
  }).refine((a) => !a.seo?.benefit || (['ar', 'en'] as const).every((l) => SEO_BENEFITS[a.seo!.benefit!].requires(a, l)), {
    message: 'seo.benefit يلزمه دليله في الملف نفسه (بند practical موثّق بترجمته للإنجليزية، أو fee مجاني، أو unesco، وبلا openSite للمواعيد والرسوم) — لا فائدة يعد بها العنوان وتغيب عن الصفحة',
  }).refine((a) => Boolean(a.description) === Boolean(a.description_en), {
    message: 'description وdescription_en معاً أو لا شيء — وصف الصفحة بلغتي الموقع الكاملتين',
  }).refine((a) => [a.description, a.description_en].every((s) => !s || (cp(s) >= DESC_MIN && cp(s) <= DESC_MAX)), {
    message: `وصف الصفحة بين ${DESC_MIN} و${DESC_MAX} نقطة ترميز`,
  }).refine((a) => descriptionSourceOk(a, 'ar') && descriptionSourceOk(a, 'en'), {
    message: 'كل جملة من الوصف جزء حرفي من answer إن وُجد، وإلا من summary أو متن الصفحة بلغتها — لا جملة مضافة من خارج الصفحة',
  }),
});

// مقالات المدونة — كل لغة ملفها المستقل (المقال طويل فلا يصلح نمط الحقول _en).
// الترجمتان تُقرنان بحقل key المشترك؛ slug بلغة الملف نفسه (عربي للعربية).
const blog = defineCollection({
  // معرّف المدخل من اسم الملف لا من حقل slug: محمّل glob يجعل slug معرّفاً ضمنياً، والمقال
  // الواحد بلغاته (الخطوة 10) يتقاسم الـslug اللاتيني عبر /en/ و/zh/ و/de/ و/ru/ فتتصادم
  // المعرّفات ويطمس مقالٌ آخر بصمت (تحذير Duplicate id في astro sync — 2026-09-10).
  loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string(),
    description: z.string(),                   // وصف الميتا وبطاقة الفهرس
    // zh/de/ru منذ الخطوة 10 من خطة التفاعل العالمي — لا يُكتب مقال بها إلا عبر خط ترجمتها (حاكم ≥ 90).
    // وur مقبولة في المخطط بلا مسار /ur/blog/ بعد: مقال أوردي قبل بناء مساره يُفشل C29 (غير منشور).
    lang: z.enum(['ar', 'en', 'zh', 'de', 'ru', 'ur']),
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
// شرق الواحة عند جبل القارة. المفاتيح وتسمياتها في src/data/districts.ts منذ
// الخطوة 9 (تشاركها المعالم والمنشآت).

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
    // معالم مجاورة من حيٍّ آخر تُضاف إلى «معالم قريبة» (معرّف ملف المعلم) — حين يذكر المتن
    // المعلم بالاسم جاراً للمنشأة (7st بجوار قصر إبراهيم، قرار إياد 2026-10-22). يفشل البناء
    // إن لم يوجد المعلم. وجودها يجعل عنوان القسم «أكمل يومك» لا «… في {الحي}».
    near: z.array(z.string()).optional(),
    area: z.string().optional(),               // الموقع كما يُعرض
    area_en: z.string().optional(),
    blurb: z.string(),                         // نبذة البطاقة — لا ادعاء جودة ولا أصناف
    blurb_en: z.string(),
    // وصف الصفحة المخصّص (ar/en) — اختياري؛ بدونه يُركَّب من النبذة والموقع والنوع (seo-title.ts). الطول فقط.
    description: z.string().refine((s) => cp(s) >= DESC_MIN && cp(s) <= DESC_MAX, { message: `وصف الصفحة بين ${DESC_MIN} و${DESC_MAX} نقطة ترميز` }).optional(),
    description_en: z.string().refine((s) => cp(s) >= DESC_MIN && cp(s) <= DESC_MAX, { message: `وصف الصفحة بين ${DESC_MIN} و${DESC_MAX} نقطة ترميز` }).optional(),
    alt: z.string(),                           // النص البديل للصورة
    alt_en: z.string(),
    // الصينية (الدفعة 14 — 2026-09-03): نبذة البطاقة وسطر الموقع والنص البديل، على نمط
    // title_zh الاختياري في المعالم؛ بدونها تتراجع البطاقة للإنجليزية. الاسم لا يُترجم
    // (يبقى name_en اللاتيني كما تسمّي المنشأة نفسها) — قاعدة الموقع.
    blurb_zh: z.string().optional(),
    area_zh: z.string().optional(),
    alt_zh: z.string().optional(),
    // الروسية (تكامل ru-RU — 2026-09-05): الحقول نفسها بوابةً للدفعة القادمة.
    blurb_ru: z.string().optional(),
    area_ru: z.string().optional(),
    alt_ru: z.string().optional(),
    // الألمانية (ج6 — 2026-09-19): من خط de-translation-pipeline حصراً، والبطاقة تتراجع
    // للإنجليزية بدونها. لا body_de بعد: البطاقة الألمانية تقصد الصفحة الإنجليزية حتى ج7.
    blurb_de: z.string().optional(),
    area_de: z.string().optional(),
    alt_de: z.string().optional(),
    // الأوردو: الحقول نفسها بوابةً لدفعتها من خط ur-translation-pipeline حصراً.
    blurb_ur: z.string().optional(),
    area_ur: z.string().optional(),
    alt_ur: z.string().optional(),
    img: z.string(),                           // المسار الأساسي بلا امتداد
    maps: z.url(),
    order: z.number().default(99),
    body_en: z.string().default(''),           // المتن الإنجليزي (المتن العربي في جسم الملف)
    // المتن الروسي من خط ru-translation-pipeline حصراً — بوابة صفحة /ru/restaurants-cafes/<slug>/
    // (على سابقة body_ru في الإقامة). بلا متنٍ روسيّ تقود البطاقة الروسية إلى الصفحة الإنجليزية.
    body_ru: z.string().optional(),
    // والألماني من خط de-translation-pipeline حصراً — بوابة صفحة /de/restaurants-cafes/<slug>/ (ج7)
    body_de: z.string().optional(),
    // والصيني من خط zh-translation-pipeline حصراً — بوابة صفحة /zh/restaurants-cafes/<slug>/ (د1)
    body_zh: z.string().optional(),
    // والأوردي من خط ur-translation-pipeline حصراً — بوابة صفحة /ur/restaurants-cafes/<slug>/ متى بُني مسارها
    body_ur: z.string().optional(),
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
    // وصف الصفحة المخصّص (ar/en) — اختياري؛ بدونه يُركَّب من النبذة والموقع والنوع (seo-title.ts). الطول فقط.
    description: z.string().refine((s) => cp(s) >= DESC_MIN && cp(s) <= DESC_MAX, { message: `وصف الصفحة بين ${DESC_MIN} و${DESC_MAX} نقطة ترميز` }).optional(),
    description_en: z.string().refine((s) => cp(s) >= DESC_MIN && cp(s) <= DESC_MAX, { message: `وصف الصفحة بين ${DESC_MIN} و${DESC_MAX} نقطة ترميز` }).optional(),
    alt: z.string(),
    alt_en: z.string(),
    // الصينية (الدفعة 14) — كنموذج dining: اختيارية، والبطاقة تتراجع للإنجليزية بدونها
    blurb_zh: z.string().optional(),
    area_zh: z.string().optional(),
    alt_zh: z.string().optional(),
    // الروسية (تكامل ru-RU — 2026-09-05) — الفرع نفسه بحرفه، كنموذج dining
    blurb_ru: z.string().optional(),
    area_ru: z.string().optional(),
    alt_ru: z.string().optional(),
    // الألمانية (ج5 — 2026-09-19) من خط de-translation-pipeline حصراً — الفرع نفسه بحرفه
    blurb_de: z.string().optional(),
    area_de: z.string().optional(),
    alt_de: z.string().optional(),
    // الأوردو من خط ur-translation-pipeline حصراً — الفرع نفسه بحرفه
    blurb_ur: z.string().optional(),
    area_ur: z.string().optional(),
    alt_ur: z.string().optional(),
    img: z.string(),                           // المسار الأساسي بلا امتداد
    maps: z.url(),
    order: z.number().default(99),
    body_en: z.string().default(''),           // المتن الإنجليزي (العربي في جسم الملف)
    // المتن الروسي من خط ru-translation-pipeline حصراً — بوابة صفحة /ru/stay/<slug>/ (على سابقة title_ru)
    body_ru: z.string().optional(),
    // والألماني بوابة صفحة /de/stay/<slug>/ بالآلية نفسها
    body_de: z.string().optional(),
    // والصيني بوابة صفحة /zh/stay/<slug>/ بالآلية نفسها (د1)
    body_zh: z.string().optional(),
    // والأوردي بوابة صفحة /ur/stay/<slug>/ بالآلية نفسها متى بُني مسارها
    body_ur: z.string().optional(),
  }),
});

// المرشدون السياحيون المرخّصون — دليل تعريفي يتيح التواصل المباشر، والموقع ليس طرفاً في
// أي اتفاق أو دفع. الضمان الوحيد رخصة إرشاد سارية يتحقق منها الفريق من صورة الرخصة
// (الصورة لا تُنشر ولا تُودَع في المستودع). بوابة النشر في src/lib/guides.ts: المسودة
// ومن انتهت رخصته لا تُبنى صفحته ولا يظهر في الفهرس ولا في sitemap.
//
// عربي وإنجليزي معاً لكل حقل نصّي — نمط الحقول `_en` كبقية المجموعات، والمتن العربي
// (النبذة) في جسم الملف ونظيره في bio_en. لا تقييم ولا سعر ولا عدد جولات ولا مستوى
// لغة في المخطط عمداً: ما لا حقل له لا يُنشر.
const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const pair = (a?: string, b?: string) => Boolean(a?.trim()) === Boolean(b?.trim());

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    name: z.string().min(1),                   // الاسم العربي كما في الرخصة
    name_en: z.string().min(1),
    slug_ar: z.string().regex(/^[ء-ي]+(?:-[ء-ي]+)*$/, 'slug_ar بحروف عربية وشرطات فقط'),
    slug_en: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug_en بحروف لاتينية صغيرة وأرقام وشرطات'),
    gender: z.enum(['male', 'female']),        // لصيغة «مرشد مرخّص» / «مرشدة مرخّصة»
    photo: z.string().regex(/^\/img\/guides\/[a-z0-9-]+$/, 'photo مسار أساسي بلا امتداد تحت /img/guides/').optional(),
    tagline: z.string().min(1),                // سطر التعريف — بإفادة المرشد
    tagline_en: z.string().min(1),
    specialties: z.array(z.enum(GUIDE_SPECIALTIES)).min(1),
    languages: z.array(z.enum(GUIDE_LANGUAGES)).min(1),
    // نطاق العمل: مدن وبلدات لا أحياء، فمفاتيح districts.ts (أحياء الهفوف) لا تصلح له
    areas: z.array(z.object({ ar: z.string().min(1), en: z.string().min(1) })).min(1),
    license: z.object({
      number: z.string().min(1),
      expires: z.coerce.date(),                // آخر يوم سريان — بوابة النشر
      verifiedAt: z.coerce.date(),             // يوم طابق الفريق صورة الرخصة
    }),
    // وسائل التواصل تُصيَّر أزراراً فقط (wa.me / tel: / mailto:) ولا تُعرض نصاً أبداً
    contact: z.object({
      whatsapp: z.string().regex(/^[1-9]\d{7,14}$/, 'whatsapp أرقام دولية بلا + ولا مسافات').optional(),
      phone: z.string().regex(/^\+[1-9]\d{7,14}$/, 'phone بصيغة دولية تبدأ بـ+ بلا مسافات').optional(),
      email: z.email().optional(),
    }).refine((c) => Boolean(c.whatsapp || c.phone || c.email), {
      message: 'contact يلزمه وسيلة تواصل واحدة على الأقل (whatsapp أو phone أو email)',
    }),
    // الجولات بإفادة المرشد. attractions مفاتيح slug_en لمعالم قائمة — يتحقق منها
    // src/lib/guides.ts عند البناء (مفتاح غير موجود يُفشل البناء).
    tours: z.array(z.object({
      title: z.string().min(1),
      title_en: z.string().min(1),
      duration: z.string().optional(),
      duration_en: z.string().optional(),
      groupSize: z.string().optional(),
      groupSize_en: z.string().optional(),
      attractions: z.array(z.string()).default([]),
    }).refine((t) => pair(t.duration, t.duration_en) && pair(t.groupSize, t.groupSize_en), {
      message: 'duration وgroupSize في الجولة: العربي والإنجليزي معاً أو لا شيء',
    })).default([]),
    // تفاصيل الخدمة بإفادة المرشد — كل بند بلغتيه أو لا يُكتب
    service: z.object({
      tourLength: z.string().optional(),
      tourLength_en: z.string().optional(),
      groupSize: z.string().optional(),
      groupSize_en: z.string().optional(),
      meetingPoint: z.string().optional(),
      meetingPoint_en: z.string().optional(),
      contactHours: z.string().optional(),
      contactHours_en: z.string().optional(),
    }).refine((s) => pair(s.tourLength, s.tourLength_en) && pair(s.groupSize, s.groupSize_en)
      && pair(s.meetingPoint, s.meetingPoint_en) && pair(s.contactHours, s.contactHours_en), {
      message: 'بنود service: العربي والإنجليزي معاً أو لا شيء',
    }).optional(),
    // صور يملك المرشد حق نشرها — المسار الأساسي بلا امتداد تحت /img/guides/
    gallery: z.array(z.object({
      src: z.string().regex(/^\/img\/guides\/[a-z0-9-]+$/),
      alt: z.string().min(1),
      alt_en: z.string().min(1),
    })).default([]),
    bio_en: z.string().min(1),                 // النبذة الإنجليزية (العربية في جسم الملف)
    // موافقة المرشد المكتوبة على النشر — بدونها يرفض المخطط الملف
    consent: z.literal(true, { message: 'consent: true إلزامي — لا يُنشر مرشد بلا موافقته المكتوبة' }),
    draft: z.boolean().default(false),
  }).refine((g) => isoDay(g.license.verifiedAt) <= isoDay(g.license.expires), {
    message: 'license.verifiedAt لا يتأخر عن license.expires',
  }),
});

export const collections = { attractions, blog, dining, stay, guides };
