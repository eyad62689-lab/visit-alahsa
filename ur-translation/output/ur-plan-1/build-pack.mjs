// node build-pack.mjs <REPO> <BATCH_DIR> — حزمة دفعة «خطّط لرحلتك» الأوردية (pack.json + ref.json)
// المصدر كتلتا en (مصدراً) وar (فيصلاً) في localize() بـPlanTripView.astro، وتسمية عمود «المعلم» لجدول
// المواعيد والرسوم (tables.ts). والمنشور الأوردي الملزم من ملفات المعالم وui.ur وذاكرة الترجمة.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR] = process.argv.slice(2);
if (!REPO || !DIR) throw new Error('الاستعمال: build-pack.mjs <REPO> <BATCH_DIR>');
const { readLocalize } = await import(pathToFileURL(path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), 'localize-literal.mjs')).href);
const C = readLocalize(REPO, 'src/components/views/PlanTripView.astro');
const { ui } = await import(pathToFileURL(path.join(REPO, 'src/i18n/ui.ts')).href);

const strings = {};
const add = (k, en, ar, ctx) => {
  if (typeof en !== 'string' || typeof ar !== 'string') throw new Error(`مصدر ناقص: ${k}`);
  strings[k] = { en, ar, ctx };
};
const E = C.en, A = C.ar;

add('eyebrow', E.eyebrow, A.eyebrow, 'عنوان صغير فوق H1 في رأس الصفحة، ويُستعمل اسماً للصفحة في مسار التنقّل (البريدكرمب الظاهر يكتبه القالب من ui.nav.plan المنشورة «سفر کا منصوبہ بنائیں»). اسم قصير لا جملة.');
add('title', E.title, A.title, 'H1 الصفحة.');
add('lead', E.lead, A.lead, 'فقرة تحت H1.');
add('getThereH', E.getThereH, A.getThereH, 'H2 قسم «كيف تصل» (ثلاث بطاقات: جوّاً، براً، بالقطار).');
E.getThere.forEach((g, i) => {
  add(`getThere.${i}.h`, g.h, A.getThere[i].h, `H3 بطاقة وسيلة الوصول ${i + 1} من 3 (أيقونة ${g.icon}). كلمات متوازية قصيرة للثلاث.`);
  add(`getThere.${i}.d`, g.d, A.getThere[i].d, `فقرة بطاقة الوصول ${i + 1}. الأرقام والمسافات والمدد كما في المصدر بلا إضافة؛ الحارس الآلي يطلب كل رقم في مصدره.`);
});
add('practicalH', E.practicalH, A.practicalH, 'H2 قسم «معلومات عملية»: أربعة أزواج (تسمية/قيمة) في قائمة تعريف، ثم جدول المواعيد والرسوم المولَّد (خلاياه منشورة من بطاقات المعالم).');
E.practical.forEach((p, i) => {
  add(`practical.${i}.k`, p.k, A.practical[i].k, `تسمية <dt> للبند ${i + 1} من 4 — تسمية قصيرة بلا وقفة.`);
  add(`practical.${i}.v`, p.v, A.practical[i].v, `قيمة <dd> للبند ${i + 1} — جملة أو جملتان.`);
});
add('tipsH', E.tipsH, A.tipsH, 'H2 قسم «نصائح للزائر».');
add('tipsLead', E.tipsLead, A.tipsLead, 'فقرة تحت H2 النصائح.');
E.tips.forEach((p, i) => {
  add(`tips.${i}.h`, p.h, A.tips[i].h, `H3 النصيحة ${i + 1} من 4 (يسبقها رقم مرسوم 1–4). عنوان قصير بصيغة واحدة للأربع.`);
  add(`tips.${i}.d`, p.d, A.tips[i].d, `فقرة النصيحة ${i + 1}.`);
});
add('faqH', E.faqH, A.faqH, 'H2 قسم الأسئلة الشائعة.');
E.faq.forEach((f, i) => {
  add(`faq.${i}.q`, f.q, A.faq[i].q, `سؤال ${i + 1} من 13: <summary> قابل للطيّ، و**name في FAQPage JSON-LD** (مرشّح لنتيجة قوقل). سؤال بصيغة يكتبها الزائر الأوردي، بعلامة الاستفهام «؟».`);
  add(`faq.${i}.a`, f.a, A.faq[i].a, `جواب السؤال ${i + 1}: نص مرئي و**acceptedAnswer.text في JSON-LD**، فيقوم بذاته بلا سؤاله وبلا ماركداون. كل واقعة ورقم ووقت كما في المصدر؛ ما ورد في بطاقة معلم منشورة يوافقها (ref.places).`);
});
add('ctaH', E.ctaH, A.ctaH, 'H2 الكتلة الختامية.');
add('ctaD', E.ctaD, A.ctaD, 'فقرة الكتلة الختامية. تقتبس اسم الصفحة «My saved places» = ui.nav.myTrip المنشورة حرفاً (ref.siblings) وزرّها تحتها.');
add('ctaBrowse', E.ctaBrowse, A.ctaBrowse, 'زرّ ذهبي إلى /ur/attractions/. مصدره الإنجليزي مطابق لسلاسل منشورة (ref.siblings).');
add('ctaTrip', E.ctaTrip, A.ctaTrip, 'زرّ إلى صفحة «رحلتي» (الإنجليزية /en/plan/ — غير مبنية بالأوردية بعد). مصدره مطابق لـui.nav.myTrip المنشورة (ref.siblings): الزرّ يسمّي الصفحة، فالاسم نفسه حرفاً.');
add('seoTitle', E.seoTitle, A.seoTitle, 'عنوان التبويب ونتيجة البحث، يُلحق به القالب « — زوروا الأحساء/Visit Al-Ahsa». نحو 60 حرفاً.');
add('seoDesc', E.seoDesc, A.seoDesc, 'وصف meta لنتيجة البحث، نحو 155 حرفاً.');
add('table.nameHead', 'Attraction', 'المعلم', 'رأس العمود الأول في جدول «المواعيد والرسوم» المولَّد (العمودان الآخران «اوقات» و«فیس» تسميتان منشورتان من بطاقات المعالم). خلايا العمود أسماء المعالم المنشورة. كلمة واحدة أو اثنتان، اسم الفئة كما في الموقع.');

// المنشور الأوردي الملزم
const attDir = path.join(REPO, 'src/content/attractions');
const fm = (s, k) => s.match(new RegExp(`^${k}: "?(.*?)"?\\s*$`, 'm'))?.[1];
const places = {};
for (const slug of ['jabal-al-qarah', 'ardh-alhadarat', 'qasr-ibrahim', 'qaisariyah', 'jawatha-mosque', 'asfar', 'sahood']) {
  const f = fs.readdirSync(attDir).find((x) => new RegExp(`^slug_en: "?${slug}"?\\s*$`, 'm').test(fs.readFileSync(path.join(attDir, x), 'utf8')));
  const s = fs.readFileSync(path.join(attDir, f), 'utf8');
  const practical = [...s.matchAll(/label_en: "([^"]*)", value_en: "([^"]*)".*?label_ur: "([^"]*)", value_ur: "([^"]*)"/g)].map((m) => ({ label_en: m[1], value_en: m[2], label_ur: m[3], value_ur: m[4] }));
  places[slug] = { title_en: fm(s, 'title_en'), title: fm(s, 'title_ur'), summary: fm(s, 'summary_ur'), practical };
}
// نظائر بمصدر إنجليزي مطابق حرفاً: مفاتيح الواجهة وكتل ur القائمة
const siblings = {};
for (const [k, v] of Object.entries(strings)) {
  const pub = Object.entries(ui.en).filter(([uk, en]) => en === v.en && typeof ui.ur?.[uk] === 'string').map(([uk]) => ({ key: `ui.${uk}`, ur: ui.ur[uk] }));
  if (pub.length) siblings[k] = pub;
}
// وكتل ur في قوالب أخرى بمصدر إنجليزي مطابق (EventsView.ctaBrowse …)
for (const rel of ['src/components/views/EventsView.astro']) {
  const V = readLocalize(REPO, rel, { lenient: true });
  if (!V.ur) continue;
  for (const [k, v] of Object.entries(strings)) for (const [vk, en] of Object.entries(V.en)) if (en === v.en && typeof V.ur[vk] === 'string') (siblings[k] ??= []).push({ key: `${path.basename(rel, '.astro')}.${vk}`, ur: V.ur[vk] });
}
const refUi = {};
for (const k of ['nav.plan', 'nav.planVisit', 'nav.myTrip', 'fav.add', 'crumb.home', 'nav.attractions', 'nav.stay', 'nav.food', 'nav.events', 'fact.palms.l', 'fact.unesco.l', 'home.hero.lead', 'det.hoursNotice', 'site.brand']) if (typeof ui.ur?.[k] === 'string') refUi[k] = ui.ur[k];
// أزواج الذاكرة ذات الصلة: أعلام الطعام والثمار والحِرف والمواسم والجهات الواردة في المصدر
const tm = JSON.parse(fs.readFileSync(path.join(REPO, 'ur-translation/memory/tm.json'), 'utf8'));
const KW = /Khalas|red rice|harees|balaleet|date bread|red bread|fig|lomi|kanar|Suwari|pomegranate|bisht|zari|pottery|palm-frond|incense|Dates Festival|Guinness|World Heritage|Hofuf|Mubarraz|Dammam|Khobar|Riyadh|Bahrain|Causeway|Abqaiq|SAR|Saudi Arabia Railways|Saudi Post|National Address|Riyal|souq|Eastern Province|oasis|springs?/i;
const tmRel = tm.pairs.filter((p) => typeof p.en === 'string' && p.en.length <= 90 && KW.test(p.en)).map(({ en, ur, page, field }) => ({ en, ur, page, field }));
const seen = new Set();
const tmPick = tmRel.filter((p) => (seen.has(p.en) ? false : seen.add(p.en))).slice(0, 160);

fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(path.join(DIR, 'pack.json'), JSON.stringify({ batch: path.basename(DIR), lang: 'ur', strings }, null, 2));
fs.writeFileSync(path.join(DIR, 'ref.json'), JSON.stringify({
  _readme: 'المنشور الأوردي الملزم: المعالم المذكورة في الأسئلة (الاسم والخلاصة وبنود practical المعتمدة)، ومفاتيح ui.ur قائمة، والنظائر ذات المصدر الإنجليزي المطابق حرفاً (siblings)، وأزواج ذاكرة قصيرة ذات صلة (tm). النظائر المعتمدة للصفحة نفسها بالألمانية والروسية والصينية في كتل localize بـsrc/components/views/PlanTripView.astro.',
  places, ui: refUi, siblings, tm: tmPick,
}, null, 2));
console.log(`${Object.keys(strings).length} سلسلة؛ ${Object.keys(siblings).length} بنظير منشور؛ ${tmPick.length} زوج ذاكرة؛ معالم: ${Object.values(places).map((p) => p.title).join(' · ')}`);
