// مسارات صفحات المعالم بلغةٍ تتراجع عن الإنجليزية: تُولَّد فقط للمعالم الحاملة ترجمةً معتمدة بتلك اللغة
// (حقل العنوان بوابةً، على سابقة title_zh)، وتحمل كلٌّ نظائرها من attractionAlt — فلا hreflang ولا خيار
// في مبدّل اللغة لصفحة غير مولَّدة.
import { getCollection } from 'astro:content';
import { attractionAlt } from './routes';

type TitleGate = 'title_zh' | 'title_de' | 'title_ru' | 'title_ur' | 'title_tr';

export async function attractionPagesBy(gate: TitleGate) {
  const items = await getCollection('attractions', ({ data }) => Boolean(data[gate]));
  return items.map((entry) => ({
    params: { slug: entry.data.slug_en },
    props: { entry, alt: attractionAlt(entry.data) },
  }));
}
