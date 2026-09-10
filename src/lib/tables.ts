// جداول مولَّدة من البيانات القائمة — الخطوة 8 من خطة التفاعل العالمي (ف3، بند 4.2 من الدراسة).
//
// لا جدول واحد كان في 367 صفحة، ومحركات الإجابة تقتبس الجداول أولاً. الثلاثة هنا تُبنى
// من مصادر الحقيقة نفسها التي تعرضها الصفحات (بنود practical الموثّقة، events.ts،
// fruits.ts) فلا يدخلها رقم من خارجها — يحرسه C24 على dist: كل رقم في خلية وارد في مصدره.
// تسميات الأعمدة من نصوص معتمدة لكل لغة؛ وإن غابت تسمية للغةٍ لا يُبنى جدولها فيها
// (لا نصّ zh خارج خط الترجمة).
import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { attractionHref } from './routes';
import { eventsFor, evView } from '../data/events';
import { fruitGroupsFor } from '../data/fruits';

export type Table = { id: string; caption?: string; head: string[]; rows: { cells: (string | { text: string; href: string })[] }[] };

const HOURS_RE = /المواعيد|ساعات/;
const FEES_RE = /الرسوم/;

/** المواعيد والرسوم الموثّقة — صف لكل معلم يحمل بنداً موثّقاً منهما بلغة الطلب. */
export async function practicalTable(lang: Lang): Promise<Table | null> {
  const items = (await getCollection('attractions')).sort((a, b) => a.data.order - b.data.order);
  const pickL = (p: { label: string; label_en?: string; label_zh?: string; label_de?: string; label_ru?: string }) =>
    lang === 'ar' ? p.label : lang === 'zh' ? p.label_zh : lang === 'de' ? p.label_de : lang === 'ru' ? p.label_ru : p.label_en;
  const pickV = (p: { value: string; value_en?: string; value_zh?: string; value_de?: string; value_ru?: string }) =>
    lang === 'ar' ? p.value : lang === 'zh' ? p.value_zh : lang === 'de' ? p.value_de : lang === 'ru' ? p.value_ru : p.value_en;
  const title = (d: (typeof items)[number]['data']) =>
    lang === 'ar' ? d.title : lang === 'zh' ? (d.title_zh ?? d.title_en ?? d.title) : lang === 'de' ? (d.title_de ?? d.title_en ?? d.title) : lang === 'ru' ? (d.title_ru ?? d.title_en ?? d.title) : (d.title_en ?? d.title);
  // رؤوس الأعمدة من تسميات البنود المعتمدة نفسها (المواعيد/Hours/开放时间 …)
  let hoursHead: string | undefined, feesHead: string | undefined;
  const rows: Table['rows'] = [];
  for (const e of items) {
    const ok = e.data.practical.filter((p) => p.verified && pickL(p) && pickV(p));
    const h = ok.find((p) => HOURS_RE.test(p.label));
    const f = ok.find((p) => FEES_RE.test(p.label));
    if (!h && !f) continue;
    if (h && !hoursHead && /^(المواعيد|Hours|开放时间|Öffnungszeiten|Часы работы)$/.test(pickL(h) ?? '')) hoursHead = pickL(h);
    if (f && !feesHead) feesHead = pickL(f);
    const hasOwn = lang === 'ar' || lang === 'en' || (lang === 'zh' && e.data.title_zh) || (lang === 'de' && e.data.title_de) || (lang === 'ru' && e.data.title_ru);
    rows.push({ cells: [
      { text: title(e.data), href: attractionHref(e.data, hasOwn ? lang : 'en') },
      h ? (pickV(h) as string) : '—',
      f ? (pickV(f) as string) : '—',
    ] });
  }
  const nameHead = { ar: 'المعلم', en: 'Attraction', zh: '景点', de: 'Sehenswürdigkeit', ru: 'Достопримечательность' }[lang];
  if (!rows.length || !hoursHead || !feesHead) return null;
  return {
    id: 'practical',
    caption: lang === 'ar' ? 'المواعيد والرسوم الموثّقة — كما وردت في بطاقة كل معلم' : lang === 'en' ? 'Verified hours and fees — as shown on each attraction’s visit card' : undefined,
    head: [nameHead, hoursHead, feesHead],
    rows,
  };
}

/** روزنامة الفعاليات: الاسم والموقع والتوقيت التقريبي (النسخة المؤكدة ما دامت قائمة). */
export function eventsTable(lang: Lang, heads: { name: string; place: string; time: string }, base: string): Table {
  const list = eventsFor(lang).map((e) => evView(e)).sort((a, b) => a.start - b.start);
  return {
    id: 'events',
    caption: lang === 'ar' ? 'روزنامة مواسم الفعاليات — مواعيد تقريبية تعود سنوياً' : lang === 'en' ? 'Seasonal calendar of events — approximate, recurring annually' : undefined,
    head: [heads.name, heads.place, heads.time],
    rows: list.map((e) => ({ cells: [{ text: e.name, href: `${base}${e.slug}/` }, e.place, `${e.season} · ${e.time}`] })),
  };
}

/** مواسم الثمار: الثمرة وموسمها ومجموعتها — ما لا موسم له يُستثنى. */
export function fruitsTable(lang: Lang, heads: { fruit: string; season: string; group: string }, pending: string): Table {
  const rows: Table['rows'] = [];
  for (const g of fruitGroupsFor(lang)) {
    for (const f of g.fruits) {
      if (!f.season) continue;
      rows.push({ cells: [f.name + (f.namePending ? ` (${pending})` : ''), f.season + (f.seasonPending ? ` (${pending})` : ''), g.title] });
    }
  }
  return {
    id: 'fruits',
    caption: lang === 'ar' ? 'مواسم ثمار الواحة — كما في بطاقات الثمار' : lang === 'en' ? 'Oasis fruit seasons — as on the fruit cards' : undefined,
    head: [heads.fruit, heads.season, heads.group],
    rows,
  };
}
