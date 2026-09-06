import { ui, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : seg === 'zh' ? 'zh' : seg === 'de' ? 'de' : seg === 'ru' ? 'ru' : 'ar';
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui['ar']): string {
    // تراجع الصينية والألمانية والروسية إلى الإنجليزية: قواميس zh وde وru
    // جزئية عمداً (تُملأ صفحةً بعد صفحة عبر خطوط الإنتاج الثلاثة)، والزائر يقرأ
    // الإنجليزية أينما غابت الترجمة بدل أن يرى مفتاحاً خاماً.
    return (
      (ui[lang] as Record<string, string>)[key] ??
      (ui.en as Record<string, string>)[key] ??
      (ui.ar as Record<string, string>)[key] ??
      String(key)
    );
  };
}

/** كتلة نصوص واجهة متعددة اللغات (نمط C الموحّد — دفعة 3، 2026-08-29).
 *  النوع يُستنتج من الكتل مجتمعةً فتُلزَم بشكلٍ واحد، فأي مفتاح يغيب عن إحداها
 *  يكسر البناء عند استعماله بدل أن يتباعد الشكلان بصمت — كانت كتل C في 10
 *  واجهات ثلاثية الأشكال بلا أي إلزام (تدقيق 2026-08-28).
 *  كتل zh وde وru اختيارية: إن غابت إحداها تراجعت لغتها للإنجليزية.
 *
 *  **لا NoInfer هنا عمداً** (جُرِّب 2026-09-05 فكسر بناءين): كتلة الجمع العربية
 *  تحمل خمس صيغ (one/two/few/many/other) والإنجليزية صيغتين، فحصرُ الاستنتاج
 *  في العربية يجعل كل كتلة إنجليزية ناقصةً خطأً — وهي ليست ناقصة بل لغةٌ لها
 *  صيغتان. الاستنتاج المشترك هو الصحيح لغوياً لا تساهلاً.
 *
 *  **صيغة السجلّ نُفِّذت 2026-09-05 مع تكامل الروسية** تنفيذاً للقرار المكتوب هنا
 *  منذ تكامل الألمانية: «عند إضافة لغة خامسة تُحوَّل الدالة إلى صيغة السجلّ —
 *  خمسة وسائط من النوع نفسه تتجاوز ما تحتمله القراءة». الروسية هي الخامسة.
 *  والصيغة الموضعية **أُزيلت ولم تُبقَ للتوافق**: واجهتان لدالة واحدة تعنيان أن
 *  الترتيب يظل مكتوباً في مئات المواضع بلا مفاتيح — وهو عين ما نُقض. المواضع
 *  الثلاثة عشر كلها مُرحَّلة. */
export const localize = <T,>(
  lang: Lang,
  blocks: { ar: T; en: T; zh?: T; de?: T; ru?: T },
): T =>
  lang === 'ar' ? blocks.ar
  : lang === 'zh' ? (blocks.zh ?? blocks.en)
  : lang === 'de' ? (blocks.de ?? blocks.en)
  : lang === 'ru' ? (blocks.ru ?? blocks.en)
  : blocks.en;

export const dir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const htmlLang = (lang: Lang) =>
  lang === 'ar' ? 'ar' : lang === 'zh' ? 'zh-CN' : lang === 'de' ? 'de' : lang === 'ru' ? 'ru' : 'en';

// مسارات النظائر باللغات الأخرى (للمبدّل وhreflang). تمرَّر لكل صفحة.
// zh وde وru اختيارية: لا تُدرج لغة إلا حين توجد نسخة فعلية للصفحة بها
// — hreflang ومبدّل اللغة يظهرانها عند وجودها فقط، فلا خيار يقود إلى 404.
export interface AltLinks { ar: string; en: string; zh?: string; de?: string; ru?: string; }

/** رابط الصفحة بلغة الطلب من alt — مع تراجع zh/de/ru للإنجليزية إن غاب نظيرها
 *  (الثلاثة اختيارية في AltLinks، وبدون هذا المساعد يصير alt[lang] قابلاً
 *  للغياب نوعياً في كل موضع استهلاك). */
export const altHref = (alt: AltLinks, lang: Lang): string => alt[lang] ?? alt.en;

/** فاصل عنوان الصفحة عن اسم الموقع في وسم <title>.
 *  الألمانية تستعمل شرطة نصف الجيم U+2013 (Halbgeviertstrich) — والطويلة
 *  U+2014 علامة إنجليزية يقرؤها القارئ الألماني خللاً طباعياً. لا تكتب
 *  الشرطة حرفياً في قالب عنوان: استدعِ هذه، ويحرسها الفحص C17.
 *  **الروسية تبقى على U+2014** (тире — حكم مثبَّت في معجم ru-translation)، فلا
 *  فرع لها هنا ولا يُوسَّع C17 إلى /ru/.
 */
export const titleSep = (lang: Lang): string => (lang === 'de' ? '\u2013' : '\u2014');
