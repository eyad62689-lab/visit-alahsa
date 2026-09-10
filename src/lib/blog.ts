// المدونة متعددة اللغات — الخطوة 10 من خطة التفاعل العالمي (ف5).
//
// كل لغة ملف Markdown مستقل يقترن بنظائره بحقل key. النظائر هنا مصدر hreflang ومبدّل
// اللغة وشريط الاقتراح لصفحة المقال، وما لا نظير له بلغةٍ يتراجع إلى فهرسها (العربية
// والإنجليزية فهرسان كاملان؛ الصينية فهرس جزئي؛ الألمانية والروسية بلا فهرس بعد فتقصدان
// الإنجليزي — تسمية إنجليزية لصفحة إنجليزية، لا وعد مكسور).
import type { CollectionEntry } from 'astro:content';
import type { AltLinks } from '../i18n/utils';
import type { Lang } from '../i18n/ui';
import { blogHref } from './routes';

type Post = CollectionEntry<'blog'>;

/** فهرس المدونة بلغة الطلب — de/ru بلا فهرس بعد فيقصدان الإنجليزي */
export const BLOG_INDEX: Record<Lang, string> = { ar: '/مدونة/', en: '/en/blog/', zh: '/zh/blog/', de: '/en/blog/', ru: '/en/blog/' };

/** نظائر المقال بلغاته المبنية — zh/de/ru تُدرج فقط حين يوجد ملفها (بوابة التوليد كما في المعالم) */
export const postAlt = (all: Post[], entry: Post): AltLinks => {
  const sib = (l: Lang) => all.find((e) => e.data.key === entry.data.key && e.data.lang === l && !e.data.draft);
  const ar = sib('ar'), en = sib('en');
  const out: AltLinks = { ar: ar ? blogHref(ar.data) : BLOG_INDEX.ar, en: en ? blogHref(en.data) : BLOG_INDEX.en };
  for (const l of ['zh', 'de', 'ru'] as const) { const s = sib(l); if (s) out[l] = blogHref(s.data); }
  return out;
};
