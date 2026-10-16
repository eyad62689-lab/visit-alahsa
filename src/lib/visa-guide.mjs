// ثوابت صفحة «دليل التأشيرات» — مصدرٌ واحد للواجهة (VisaGuideView) ولبيانات الصفحة
// (src/data/visa-guide.ts) وللحارس C28 (tools/check-visa-guide.mjs). الملف ‎.mjs لا ‎.ts عمداً:
// يستورده الحارس في Node ضمن postbuild، على سابقة src/lib/ai-referrers.mjs.
//
// 2026-10-16 (قرار إياد): أُعيدت كتابة الصفحة دليلاً مختصراً بلا أي معلومة غير مؤكدة — لا
// رسوم، لا «لم يُتحقَّق»، لا وسوم مصادر داخل النص، لا مدد قرار ولا سياسات استرداد. وصارت
// بالعربية والإنجليزية (الإنجليزية كُتبت مباشرةً كصفحة «عن زوروا الأحساء»)، وما سواهما ينتظر
// خطوط الترجمة فلا رابط إليه ولا hreflang.

/** مسارا الصفحة بلغتيها — بشرطة ختامية (تطابق canonical). مصدر hreflang ومبدّل اللغة وsitemap. */
export const VISA_GUIDE_ALT = { ar: '/دليل-التأشيرات/', en: '/en/visa-guide/' };

/** المسار العربي — يبقى باسمه القديم لمن يستورده (التذييل، «خطّط»، llms.txt، sitemap). */
export const VISA_GUIDE_PATH = VISA_GUIDE_ALT.ar;

/** اللغتان المبنيتان للصفحة. zh/de/ru/ur تُضاف هنا يوم تمرّ نصوصها بخطوط الترجمة. */
export const VISA_LANGS = ['ar', 'en'];

/** رابط الصفحة بلغة الطلب — غير المبنيّ يقصد الإنجليزية (لا رابط إلى صفحة غير موجودة). */
export const visaHref = (lang) => (lang === 'ar' ? VISA_GUIDE_ALT.ar : VISA_GUIDE_ALT.en);

/** تاريخ آخر تعديل على المحتوى (ISO لـdateModified) وسطره المرئي بلغتيه — حرفياً، يحرسه C28. */
export const VISA_UPDATED_ISO = '2026-10-16';
export const VISA_UPDATED_LINE = { ar: 'تاريخ آخر تحديث: 16 أكتوبر 2026', en: 'Last updated: 16 October 2026' };

/** ملاحظة التحرير — في معاينة النشر وطلب الدمج فقط، ولا تظهر في الإنتاج (قرار إياد). */
export const VISA_PREVIEW_NOTE = 'يجب فتح كل رابط يدوياً قبل النشر';

/** الروابط الرسمية التسعة — حرفياً كما كانت في الصفحة قبل إعادة الكتابة (2026-10-16)، ولا
 *  رابط خارجي سواها في الصفحة. مفتاح كل مسار يربط البيانات بالحارس. */
export const VISA_OFFICIAL_LINKS = {
  tourist: 'https://visa.visitsaudi.com/Registration/Verify',
  gcc: 'https://ksavisa.sa/visa/tourism/details',
  umrah: 'https://umrah.nusuk.sa/',
  stopover: 'https://www.visitsaudi.com/en/campaigns/saudi-stopover',
  family: 'https://visa.mofa.gov.sa/Home/Index2?service_type=2',
  business: 'https://ksavisa.sa/visa/business-visit/apply',
  package: 'https://www.visitsaudi.com/en/campaigns/package-visa',
  uk: 'https://ksavisa.sa/explore-visa-options/aab79697-b721-4907-b772-62a9bb42c36e',
  causeway: 'https://kfca.sa/en/',
  helpCenter: 'https://www.visitsaudi.com/en/help-center',
};

/** عبارات الشك والتعليم التي لا يجوز أن تُنشر في الصفحة بعد إعادة الكتابة. */
export const VISA_FORBIDDEN_PHRASES = ['لم يُتحقَّق', 'لم يتحقق', 'لم يُتحقق', 'غير مؤكد', 'بانتظار التأكيد', 'unverified', 'not verified', 'not confirmed', 'pending confirmation'];

/** حدود الأسئلة الشائعة والروابط الداخلية والعنوان والوصف (قرار 2026-10-16). */
export const VISA_LIMITS = { faqMin: 5, faqMax: 7, internalLinksMin: 5, titleMax: 60, descMin: 140, descMax: 160 };
