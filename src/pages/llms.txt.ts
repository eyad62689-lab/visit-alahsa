// ملف llms.txt — يُولَّد وقت البناء لا يُكتب يدوياً.
//
// كان ملفاً ثابتاً في public/ فيه عددان مكتوبان بخط اليد (58 معلماً، 20 منشأة)
// يتقادمان بصمت مع أول إضافة. الأعداد هنا تُشتقّ من مجموعة المعالم ومن dining.ts،
// فيستحيل التضارب بنيوياً بين هذا الملف والرئيسية والخريطة (تدقيق 2026-08-30).
//
// قاعدة الموقع: أرقام لاتينية (0-9) دائماً.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

import { EVENTS_AR } from '../data/events';
import { attractionHref } from '../lib/routes';
import { isThinAttraction } from '../lib/publish';
import { LANG_META } from '../i18n/langs';
import { ui } from '../i18n/ui';

const SITE = 'https://visit-alahsa.com';

export const GET: APIRoute = async () => {
  const attractions = await getCollection('attractions');
  const posts = await getCollection('blog');

  const attractionCount = attractions.length;
  const zhCount = attractions.filter((e) => e.data.title_zh).length;
  const deCount = attractions.filter((e) => e.data.title_de).length;
  const ruCount = attractions.filter((e) => e.data.title_ru).length;
  const diningCount = (await getCollection('dining')).length;
  const stayCount = (await getCollection('stay')).length;
  const eventCount = EVENTS_AR.length;
  const unescoCount = attractions.filter((e) => e.data.unesco).length;
  // المقالات تُعدّ بالموضوع لا بالملف (لكل موضوع ملف عربي وآخر إنجليزي)
  const topicCount = new Set(posts.filter((p) => !p.data.draft).map((p) => p.data.key)).size;
  // قوائم النسخ الجزئية (الخطوة 8): الصفحات المعلَنة فقط — بعنوان معتمد من خط الترجمة
  // ودون عتبة الصفحة الرقيقة (المحجوبة noindex في C23) — مرتبةً كترتيب الفهرس.
  const listed = attractions.filter((e) => !isThinAttraction(e)).sort((a, b) => a.data.order - b.data.order);
  const langList = (lang: 'zh' | 'de' | 'ru') =>
    listed.filter((e) => e.data[`title_${lang}`]).map((e) => `- [${e.data[`title_${lang}`]}](${SITE}${encodeURI(attractionHref(e.data, lang))})`).join('\n');

  const body = `# زوروا الأحساء — Visit Al-Ahsa

> دليل سياحي رقمي مستقل لمحافظة الأحساء في المنطقة الشرقية بالسعودية — أكبر واحة في العالم وموقع تراث عالمي مسجل في اليونسكو منذ 2018. المحتوى موثق: المواعيد والرسوم لا تُنشر إلا بعد التحقق، وما لم يتأكد يوسم «بانتظار التأكيد».

النسخة العربية على الجذر، والإنجليزية تحت \`/en/\`، ونسخة صينية جزئية تحت \`/zh/\` (${zhCount} معلماً حتى الآن)، ونسخة ألمانية جزئية تحت \`/de/\` (${deCount} ${deCount === 1 ? 'معلم' : 'معلماً'} حتى الآن)، ونسخة روسية جزئية تحت \`/ru/\` (${ruCount} ${ruCount === 1 ? 'معلم' : 'معلماً'} حتى الآن).

## الأقسام الرئيسية — Main sections

- [المعالم (${attractionCount} معلماً بصفحات مفردة)](${SITE}/معالم/) | [Attractions](${SITE}/en/attractions/): جبل القارة، قصر إبراهيم، مسجد جواثا، العقير، المتاحف، العيون والبحيرات.
- [الأسواق والمنتزهات والمزارع](${SITE}/أسواق-ومنتزهات-ومزارع/) | [Souqs, Parks & Farms](${SITE}/en/souqs-parks-farms/): سوق القيصرية، الحدائق، مزارع النخيل والليمون الحساوي.
- [الفعاليات والمواسم (${eventCount} فعاليات)](${SITE}/فعاليات/) | [Events](${SITE}/en/events/): مهرجانات الواحة على مدار السنة — مواعيد النسخ تُنشر عند تأكيدها رسمياً فقط.
- [ثمار الواحة](${SITE}/ثمار/) | [Oasis Fruits](${SITE}/en/fruits/): تمور الخلاص، الليمون الأحسائي، ومواسم القطاف.
- [المطبخ الأحسائي](${SITE}/أكلات/) | [Hasawi Cuisine](${SITE}/en/food/): الأرز الأحسائي، المندي، الهريس، خبز التمر وحلويات الواحة.
- [المطاعم والمقاهي (${diningCount} منشأة بمواقع خرائط قوقل)](${SITE}/مطاعم-ومقاهي/) | [Restaurants & Cafés](${SITE}/en/restaurants-cafes/)
- [أماكن الإقامة (${stayCount} أماكن بمواقع خرائط قوقل)](${SITE}/إقامة/) | [Places to Stay](${SITE}/en/stay/): نُزلٌ تراثي في حي الكوت وفندقٌ على ساحل العقير — بطاقات وصفية لا ترشيحات.
- [المدونة (${topicCount} مقالات بالعربية والإنجليزية)](${SITE}/مدونة/) | [Blog](${SITE}/en/blog/): مسارات 24 و48 ساعة، الحرف اليدوية، الهدايا، وهل تستحق الأحساء الزيارة.
- [خطط لرحلتك](${SITE}/خطط/) | [Plan your trip](${SITE}/en/plan-your-trip/): كيفية الوصول ومسارات مقترحة وأسئلة شائعة.
- [واحة الأحساء في اليونسكو](${SITE}/اليونسكو/) | [UNESCO World Heritage](${SITE}/en/unesco/): ${unescoCount} من مكوّنات موقع التراث العالمي 1563 (الاثني عشر) بصفحات مفردة.
- [خريطة المعالم](${SITE}/خريطة/) | [Map](${SITE}/en/map/) — و[الخريطة التضاريسية 3D](${SITE}/خريطة-تضاريس/) | [Terrain map](${SITE}/en/terrain-map/)

## Main sections (English mirror)

- [Attractions](${SITE}/en/attractions/) — ${attractionCount} places with individual pages: Jabal Al-Qarah, Qasr Ibrahim, Jawatha Mosque, Al-Uqair, museums, springs and lakes. Each page carries verified opening hours and fees where confirmed (structured as openingHoursSpecification / isAccessibleForFree).
- [Souqs, Parks & Farms](${SITE}/en/souqs-parks-farms/) — Al-Qaisariyah Souq, gardens, date-palm and Hasawi-lime farms.
- [Events](${SITE}/en/events/) — ${eventCount} recurring seasons; dates of an edition are published only once officially confirmed.
- [Oasis Fruits](${SITE}/en/fruits/) — Khalas dates, the Hasawi lime and harvest seasons, with a season table.
- [Hasawi Cuisine](${SITE}/en/food/) — Hasawi rice, mandi, harees, date bread and oasis sweets.
- [Restaurants & Cafés](${SITE}/en/restaurants-cafes/) — ${diningCount} places with Google Maps locations; no prices, no rankings.
- [Places to Stay](${SITE}/en/stay/) — ${stayCount} places with Google Maps locations; descriptive cards, not recommendations.
- [Blog](${SITE}/en/blog/) — ${topicCount} topics in Arabic and English: 24- and 48-hour itineraries, handicrafts, gifts, and whether Al-Ahsa is worth the visit.
- [Plan your trip](${SITE}/en/plan-your-trip/) — getting there, suggested routes, FAQ, and a table of verified hours and fees.
- [UNESCO World Heritage](${SITE}/en/unesco/) — ${unescoCount} of the twelve components of site 1563 (inscribed 2018) with their own pages.
- [Map](${SITE}/en/map/) and [Terrain map](${SITE}/en/terrain-map/)

## ${LANG_META.zh.native} — ${ui.zh['nav.attractions']}

- [${SITE}/zh/](${SITE}/zh/) · [${SITE}/zh/attractions/](${SITE}/zh/attractions/)
${langList('zh')}

## ${LANG_META.de.native} — ${ui.de['nav.attractions']}

- [${SITE}/de/](${SITE}/de/)
${langList('de')}

## ${LANG_META.ru.native} — ${ui.ru['nav.attractions']}

- [${SITE}/ru/](${SITE}/ru/) · [${SITE}/ru/attractions/](${SITE}/ru/attractions/)
${langList('ru')}

## حقائق أساسية — Key facts

- الأحساء: أكثر من 2.5 مليون نخلة، تراث اليونسكو العالمي 2018، مدينتاها الرئيسيتان الهفوف والمبرز.
- Al-Ahsa: 2.5M+ date palms, UNESCO World Heritage (2018), main cities Al-Hofuf and Al-Mubarraz, Eastern Province, Saudi Arabia.

## ملفات — Meta

- [خريطة الموقع](${SITE}/sitemap.xml)
- تصحيح المعلومات: ${SITE}/أبلغ/ — والتواصل: info@visit-alahsa.com
- Corrections: ${SITE}/en/report/ — contact: info@visit-alahsa.com
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
