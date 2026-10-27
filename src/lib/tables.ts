// جداول مولَّدة من البيانات القائمة — الخطوة 8 من خطة التفاعل العالمي (ف3، بند 4.2 من الدراسة).
//
// لا جدول واحد كان في 367 صفحة، ومحركات الإجابة تقتبس الجداول أولاً. الثلاثة هنا تُبنى
// من مصادر الحقيقة نفسها التي تعرضها الصفحات (بنود practical الموثّقة، events.ts،
// fruits.ts) فلا يدخلها رقم من خارجها — يحرسه C24 على dist: كل رقم في خلية وارد في مصدره.
// تسميات الأعمدة من نصوص معتمدة لكل لغة؛ وإن غابت تسمية للغةٍ لا يُبنى جدولها فيها
// (لا نصّ zh خارج خط الترجمة).
import { getCollection } from 'astro:content';
import { ui, type Lang } from '../i18n/ui';
import { attractionHref } from './routes';
import { eventsFor, evView } from '../data/events';
import { fruitGroupsFor } from '../data/fruits';

export type Table = { id: string; caption?: string; head: string[]; rows: { cells: (string | { text: string; href: string })[] }[] };

const HOURS_RE = /المواعيد|ساعات/;
const FEES_RE = /الرسوم/;

/** المواعيد والرسوم الموثّقة — صف لكل معلم يحمل بنداً موثّقاً منهما بلغة الطلب. */
export async function practicalTable(lang: Lang): Promise<Table | null> {
  const items = (await getCollection('attractions')).sort((a, b) => a.data.order - b.data.order);
  const pickL = (p: { label: string; label_en?: string; label_zh?: string; label_de?: string; label_ru?: string; label_ur?: string; label_tr?: string }) =>
    ({ ar: p.label, en: p.label_en, zh: p.label_zh, de: p.label_de, ru: p.label_ru, ur: p.label_ur, tr: p.label_tr })[lang];
  const pickV = (p: { value: string; value_en?: string; value_zh?: string; value_de?: string; value_ru?: string; value_ur?: string; value_tr?: string }) =>
    ({ ar: p.value, en: p.value_en, zh: p.value_zh, de: p.value_de, ru: p.value_ru, ur: p.value_ur, tr: p.value_tr })[lang];
  const title = (d: (typeof items)[number]['data']) => {
    if (lang === 'ar') return d.title;
    const local = { en: d.title_en, zh: d.title_zh, de: d.title_de, ru: d.title_ru, ur: d.title_ur, tr: d.title_tr }[lang];
    return local ?? d.title_en ?? d.title;
  };
  // رؤوس الأعمدة من تسميات البنود المعتمدة نفسها (المواعيد/Hours/开放时间 …)
  let hoursHead: string | undefined, feesHead: string | undefined;
  const rows: Table['rows'] = [];
  for (const e of items) {
    const ok = e.data.practical.filter((p) => p.verified && pickL(p) && pickV(p));
    const h = ok.find((p) => HOURS_RE.test(p.label));
    const f = ok.find((p) => FEES_RE.test(p.label));
    if (!h && !f) continue;
    if (h && !hoursHead && /^(المواعيد|Hours|开放时间|Öffnungszeiten|Часы работы|اوقات)$/.test(pickL(h) ?? '')) hoursHead = pickL(h);
    if (f && !feesHead) feesHead = pickL(f);
    const hasOwn = lang === 'ar' || lang === 'en' || (lang === 'zh' && e.data.title_zh) || (lang === 'de' && e.data.title_de) || (lang === 'ru' && e.data.title_ru) || (lang === 'ur' && e.data.title_ur) || (lang === 'tr' && e.data.title_tr);
    // الفعالية الموسمية (category: experience — قرية النخيل) تُوسَم في خانة الاسم بوسم plan.tableEvent المعتمد
    // بلغة الصفحة (قرار 2026-10-23)؛ ولغةٌ بلا وسم تعرض الاسم عارياً كما كان.
    const eventTag = e.data.category === 'experience' ? (ui[lang] as Record<string, string>)['plan.tableEvent'] : undefined;
    rows.push({ cells: [
      { text: eventTag ? (lang === 'zh' ? `${title(e.data)}（${eventTag}）` : `${title(e.data)} (${eventTag})`) : title(e.data), href: attractionHref(e.data, hasOwn ? lang : 'en') },
      h ? (pickV(h) as string) : '—',
      f ? (pickV(f) as string) : '—',
    ] });
  }
  // رأسا «اوقات» و«فیس» الأورديان من تسميات البنود المعتمدة نفسها، ورأس العمود الأول من دفعة ur-plan-1.
  const nameHead = ({ ar: 'المعلم', en: 'Attraction', zh: '景点', de: 'Sehenswürdigkeit', ru: 'Достопримечательность', ur: 'سیاحتی مقام' } as Partial<Record<Lang, string>>)[lang];
  if (!rows.length || !nameHead || !hoursHead || !feesHead) return null;
  return {
    id: 'practical',
    caption: ({ ar: 'المواعيد والرسوم — كما وردت في بطاقة كل معلم', en: 'Hours and fees — as shown on each attraction’s visit card' } as Partial<Record<Lang, string>>)[lang],
    head: [nameHead, hoursHead, feesHead],
    rows,
  };
}

/** روزنامة الفعاليات: الاسم والموقع والتوقيت التقريبي (النسخة المؤكدة ما دامت قائمة). */
export function eventsTable(lang: Lang, heads: { name: string; place: string; time: string }, base: string): Table {
  // الروزنامة للمواسم المتكرّرة سنوياً وحدها (عنوانها يقول ذلك) — الفعالية المؤقتة خارجها
  const list = eventsFor(lang).filter((e) => !e.oneOff).map((e) => evView(e)).sort((a, b) => a.start - b.start);
  return {
    id: 'events',
    caption: ({ ar: 'روزنامة مواسم الفعاليات — مواعيد تقريبية تعود سنوياً', en: 'Seasonal calendar of events — approximate, recurring annually', de: 'Saisonaler Kalender der Veranstaltungen – ungefähre Angaben, jährlich wiederkehrend', ru: 'Календарь сезонных мероприятий — даты приблизительны и повторяются ежегодно', ur: 'ہر سال لوٹنے والی تقریبات کی موسمی تقویم، تخمینی تاریخوں کے ساتھ' } as Partial<Record<Lang, string>>)[lang],
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
    caption: ({ ar: 'مواسم ثمار الواحة — كما في بطاقات الثمار', en: 'Oasis fruit seasons — as on the fruit cards', de: 'Saisons der Oasenfrüchte – wie auf den Fruchtkarten', ru: 'Сезоны плодов оазиса — те же, что на карточках', ur: 'نخلستان کے پھلوں کے موسم، جیسے اوپر پھلوں کے ساتھ درج ہیں' } as Partial<Record<Lang, string>>)[lang],
    head: [heads.fruit, heads.season, heads.group],
    rows,
  };
}
