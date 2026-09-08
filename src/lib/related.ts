// الفهرس العكسي «مقالات تذكر هذا المعلم» — الخطوة 9 من خطة التفاعل العالمي (ف4).
//
// كل مقال يربط معالمه بروابط صريحة (/معالم/<slug>/ أو /<lang>/attractions/<slug>/)،
// وهذا الفهرس يقلبها وقت البناء فتحمل صفحة المعلم قسم المقالات التي تذكره — بلغة
// الصفحة فقط (لا مقال إنجليزي على صفحة صينية؛ ومقالات zh/de/ru تدخل تلقائياً حين
// تُكتب عبر خطوطها). يُبنى مرة واحدة في البناء ويحرسه C25 على dist.
import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { blogHref } from './routes';

export type Mention = { key: string; title: string; topic: string; href: string };
type Slugs = { slug_ar: string; slug_en: string };

let index: Promise<Map<string, Mention[]>> | undefined;

const build = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const map = new Map<string, (Mention & { at: number })[]>();
  for (const p of posts) {
    const lang = p.data.lang;
    const re = lang === 'ar' ? /\/معالم\/([^/)\s"'#?]+)\//g : new RegExp(`/${lang}/attractions/([^/)\\s"'#?]+)/`, 'g');
    const slugs = new Set([...(p.body ?? '').matchAll(re)].map((m) => decodeURIComponent(m[1])));
    for (const s of slugs) {
      const k = `${lang}:${s}`;
      const list = map.get(k) ?? [];
      list.push({ key: p.data.key, title: p.data.title, topic: p.data.topic, href: blogHref(p.data), at: p.data.pubDate.getTime() });
      map.set(k, list);
    }
  }
  // ترتيب ثابت: الأحدث نشراً أولاً
  const out = new Map<string, Mention[]>();
  for (const [k, list] of map) out.set(k, list.sort((a, b) => b.at - a.at).map(({ at: _at, ...m }) => m));
  return out;
};

/** المقالات بلغة الطلب التي تربط صفحة هذا المعلم — [] حين لا مقال بتلك اللغة. */
export const mentionsOf = async (d: Slugs, lang: Lang): Promise<Mention[]> => {
  index ??= build();
  return (await index).get(`${lang}:${lang === 'ar' ? d.slug_ar : d.slug_en}`) ?? [];
};
