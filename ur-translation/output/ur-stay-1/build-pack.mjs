// node build-pack.mjs <REPO> <BATCH_DIR> <stay|dining-frame|dining-cards> — حزمة دفعة أوردية لصفحات الإقامة والمطاعم
// (pack.json + ref.json). المصادر: كتل en (مصدراً) وar (فيصلاً) في localize() بقوالب StayView وStayDetailView وDiningView،
// وحقول بطاقات src/content/stay|dining، وأسماء الأحياء في src/data/districts.ts. والمنشور الأوردي الملزم من ui.ur
// وكتل ur في القوالب الأخرى وأسماء المعالم وذاكرة الترجمة.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR, KIND] = process.argv.slice(2);
if (!REPO || !DIR || !['stay', 'dining-frame', 'dining-cards'].includes(KIND)) throw new Error('الاستعمال: build-pack.mjs <REPO> <BATCH_DIR> <stay|dining-frame|dining-cards>');
const TOOLS = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const { readLocalize, flatten } = await import(pathToFileURL(path.join(TOOLS, 'localize-literal.mjs')).href);
const { ui } = await import(pathToFileURL(path.join(REPO, 'src/i18n/ui.ts')).href);
const view = (v) => readLocalize(REPO, `src/components/views/${v}.astro`, { lenient: true, deep: true });

// سياق المفاتيح بحسب الاسم (يكمّله سياق خاص بالقالب)
const CTX = {
  heroEyebrow: 'عنوان صغير فوق H1 في رأس الصفحة.',
  title: 'H1 الصفحة، وهو أيضاً عنوان التبويب (يُلحق به القالب الفاصل واسم الموقع) والحلقة الأخيرة في مسار التنقّل. ويُسمّى به الفهرس من صفحة المنشأة.',
  heroSum: 'فقرة تحت H1، **وهي نفسها وصف meta لنتيجة البحث**.',
  listH: 'H2 فوق شبكة البطاقات.',
  newWindow: 'نص لقارئ الشاشة بعد زرّ «گوگل میپس پر دیکھیں ↗» (ui.det.openMaps المنشور) على كل بطاقة. يوضع بين قوسين.',
  moreLabel: 'رابط على البطاقة إلى صفحة المنشأة المفردة (حيث وُجدت)، يتبعه سهم.',
  ratingLabel: 'تسمية لقارئ الشاشة بجانب رقم التقييم (من خرائط Google، يظهر رقماً ونجمة).',
  closedPerm: 'شارة على البطاقة حين تقول خرائط Google إن المكان مغلق نهائياً.',
  closedTemp: 'شارة على البطاقة حين تقول خرائط Google إن المكان مغلق مؤقتاً.',
  faqH: 'H2 قسم الأسئلة الشائعة.',
  methodH: 'عنوان صندوق «حول هذه الصفحة» أسفل الصفحة.',
  methodP1: 'فقرة صندوق «حول هذه الصفحة»: المنهج — وصف لا ترشيح.',
  'kindLabels.heritage-inn': 'تسمية النوع الصغيرة فوق اسم المنشأة على البطاقة وفي رأس صفحتها: نُزل تراثي.',
  'kindLabels.hotel': 'تسمية النوع: فندق.',
  backLabel: 'رابط العودة من صفحة المنشأة إلى الفهرس («كل …») — يسمّي الفهرس باسم H1 نفسه.',
  indexName: 'اسم الفهرس في مسار التنقّل على صفحة المنشأة — يطابق H1 الفهرس (title) حرفاً.',
  areaH: 'عنوان صندوق «الموقع» في صفحة المنشأة.',
  noteH: 'عنوان صندوق «حول هذه الصفحة» في صفحة المنشأة.',
  noteP: 'فقرة صندوق «حول هذه الصفحة» في صفحة المنشأة.',
  cafesEyebrow: 'عنوان صغير فوق H2 قسم المقاهي.',
  cafesH: 'H2 قسم المقاهي.',
  bakeriesEyebrow: 'عنوان صغير فوق H2 قسم المخابز («التنور» فرن الطين).',
  bakeriesH: 'H2 قسم مخابز الخبز الأحمر.',
  bakeriesNote: 'سطر تحت H2 المخابز: الخبز الأحمر وخبز التمر اسمان لطبق واحد (حارس C5b يقرنهما).',
  hoursLabel: 'تسمية أوقات العمل على البطاقة (من خرائط Google).',
  searchPh: 'نص نائب داخل حقل البحث.',
  searchLabel: 'تسمية حقل البحث لقارئ الشاشة.',
  kindAria: 'تسمية مجموعة أزرار التصفية بالنوع لقارئ الشاشة.',
  kindRestaurants: 'زرّ تصفية: المطاعم (اسم قصير).',
  kindCafes: 'زرّ تصفية: المقاهي.',
  kindBakeries: 'زرّ تصفية: المخابز.',
  districtLabel: 'تسمية قائمة اختيار الحيّ/الموقع.',
  districtAll: 'الخيار الأول في قائمة الأحياء: كل المواقع (يقتبسه emptyMsg حرفاً).',
  openNow: 'شارة على البطاقة: مفتوح الآن (من أوقات Google).',
  closedNow: 'شارة على البطاقة: مغلق الآن.',
  openFilter: 'زرّ تبديل يُظهر المفتوح الآن فقط.',
  hoursNote: 'سطر تحت أدوات التصفية: الأوقات من خرائط Google وقد تتغير.',
  countPrefix: 'نص لقارئ الشاشة يسبق عدد البطاقات المعروضة بعد التصفية مباشرة («… 12»): يليه رقم، فلا اسم معدود بعده ولا رقم فيه.',
  emptyMsg: 'رسالة حين لا تطابق التصفية شيئاً؛ تقتبس خيار districtAll حرفاً.',
  'srcNote.then': 'سطر صغير تحت البطاقات يظهر في الإنتاج حين تُجلب بيانات خرائط Google: {fetchedLabel} تاريخ يكتبه السكربت بتنسيق اللغة — احفظ النائب حرفاً مرة واحدة.',
  countSuffix: 'لقارئ الشاشة: يُلحق بعد العدد المعروض — countPrefix ثم العدد رقماً ثم هذه السلسلة («Showing 12 of 29»). {diningEntries.length} العدد الكلي يكتبه السكربت: احفظ النائب حرفاً مرة واحدة. الترتيب ثابت (بادئة، عدد، لاحقة)، فاختر صيغة أوردية تصحّ به، وابدأ بمسافة كالمصدر.',
  'faqs.6.then.q': 'السؤال السابع في نسخة الإنتاج (حين تُجلب بيانات خرائط Google). سؤال قابل للطيّ وname في FAQPage JSON-LD، منتهٍ بـ«؟».',
  'faqs.6.then.a': 'جواب السؤال السابع في نسخة الإنتاج: مرئي وفي JSON-LD، يقوم بذاته بلا ماركداون. {fetchedLabel} تاريخ يكتبه السكربت: احفظ النائب حرفاً مرة واحدة.',
  'faqs.6.else.q': 'السؤال السابع حين لا تُجلب بيانات خرائط Google (البديل الثابت للسابق). سؤال قابل للطيّ وname في FAQPage JSON-LD، منتهٍ بـ«؟».',
  'faqs.6.else.a': 'جواب البديل الثابت للسؤال السابع: مرئي وفي JSON-LD، يقوم بذاته بلا ماركداون. «لا ننشر … حتى تُوثَّق من مصادرها الرسمية» وعد الموقع بنصّه.',
};
const ctxFor = (k, extra = '') => {
  const base = CTX[k] ?? (/^faqs\.\d+\.q$/.test(k) ? 'سؤال قابل للطيّ، و**name في FAQPage JSON-LD**: سؤال بصيغة يكتبها الزائر الأوردي، منتهٍ بـ«؟».'
    : /^faqs\.\d+\.a$/.test(k) ? 'جواب السؤال: نص مرئي و**acceptedAnswer.text في JSON-LD**، فيقوم بذاته بلا ماركداون. كل اسم ومكان كما في المصدر بلا إضافة.'
      : /^faqs\.\d+\.linkText$/.test(k) ? 'رابط يُلحق بالجواب في الصفحة (لا في JSON-LD)، يقصد صفحة أوردية منشورة. السهم في الأوردية «←» كالعربية.'
        : '');
  if (!base) throw new Error(`لا سياق لـ${k}`);
  return base + (extra ? ` ${extra}` : '');
};

const strings = {};
const add = (k, en, ar, ctx) => {
  if (typeof en !== 'string' || typeof ar !== 'string') throw new Error(`مصدر ناقص: ${k}`);
  strings[k] = { en, ar, ctx };
};
const SKIP = /\.linkHref$/;
const addView = (v, prefix, ctxExtra = {}, { drop = new Set(), dropKeys = /^$/ } = {}) => {
  const C = view(v);
  const A = Object.fromEntries(flatten(C.ar));
  for (const [k, en] of flatten(C.en)) if (!SKIP.test(k) && !dropKeys.test(k) && !drop.has(en)) add(`${prefix}${k}`, en, A[k], ctxFor(k, ctxExtra[k]));
};
const fm = (s, k) => s.match(new RegExp(`^${k}: "?(.*?)"?\\s*$`, 'm'))?.[1];
const cards = (coll) => fs.readdirSync(path.join(REPO, 'src/content', coll)).filter((f) => f.endsWith('.md')).map((f) => {
  const s = fs.readFileSync(path.join(REPO, 'src/content', coll, f), 'utf8');
  return { file: f, s, slug: fm(s, 'slug_en'), name: fm(s, 'name'), name_en: fm(s, 'name_en'), kind: fm(s, 'kind'), district: fm(s, 'district'), order: Number(fm(s, 'order') ?? 0) };
}).sort((a, b) => a.order - b.order);
const addCard = (coll, c) => {
  const where = `البطاقة: ${c.name_en} («${c.name}»، ${c.kind}${c.district ? `، الحيّ ${c.district}` : ''}). عنوان البطاقة اسمها اللاتيني كما تسمّي نفسها ولا يُترجم.`;
  for (const [f, what] of [['area', 'سطر الموقع على البطاقة وفي صندوق «الموقع» بصفحتها: الحيّ أو الطريق بصيغته المعجمية/المنشورة.'], ['blurb', 'نبذة جملة واحدة على البطاقة وتحت اسمها في صفحتها: تصف ما تُظهره الصورة.'], ['alt', 'النص البديل لصورة المنشأة (قارئ الشاشة): وصف الصورة لا تسويق.']]) {
    const en = fm(c.s, `${f}_en`), ar = fm(c.s, f);
    if (en) add(`${coll}.${c.file.replace(/\.md$/, '')}.${f}`, en, ar, `${what} ${where}`);
  }
};

if (KIND === 'stay') {
  addView('StayView', 'ix.', { 'faqs.1.linkText': 'يقصد /ur/attractions/uqair-beach/ («ساحل العقیر» صفحة منشورة؛ ref.places).' });
  addView('StayDetailView', 'dv.', {}, { dropKeys: /^kindLabel\./, drop: new Set(flatten(view('StayView').en).filter(([k]) => ['newWindow', 'ratingLabel', 'closedPerm', 'closedTemp'].includes(k)).map(([, en]) => en)) });
  for (const c of cards('stay')) addCard('stay', c);
  const koot = cards('stay').find((c) => c.slug === 'alkoot-heritage-hotel');
  const body = (s) => s.split(/\n---\s*\n/).slice(1).join('\n---\n').trim();
  const bodyEn = koot.s.match(/^body_en: "((?:[^"\\]|\\.)*)"/m)[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
  add('stay.alkoot-heritage.body', bodyEn, body(koot.s), 'متن صفحة فندق الكوت التراثي (/ur/stay/alkoot-heritage-hotel/): نص خام بلا ماركداون، فقرات يفصلها سطر فارغ واحد (\\n\\n) حيث يفصلها المصدر. وقائعه في ix.faqs.0.a أيضاً — اتّسق حرفاً بين الموضعين (اسم الهيئة، الهجري، المحافظة).');
} else if (KIND === 'dining-frame') {
  const stayEn = new Set(flatten(view('StayView').en).map(([, en]) => en));
  addView('DiningView', 'ix.', {
    'faqs.0.linkText': 'يقصد /ur/food/ («الاحساء کے پکوان» صفحة منشورة).',
    'faqs.3.linkText': 'يقصد /ur/food/ وفيها بطاقة «کھجور کی روٹی».',
  }, { drop: stayEn });
  const { DISTRICT_NAMES } = await import(pathToFileURL(path.join(REPO, 'src/data/districts.ts')).href);
  for (const d of Object.keys(DISTRICT_NAMES.en)) add(`district.${d}`, DISTRICT_NAMES.en[d], DISTRICT_NAMES.ar[d], `اسم الحيّ/الموقع «${d}» في قائمة التصفية، وفي عنوان «معالم قريبة في …» بصفحات المنشآت. اسم علم يُنقحر من الرسم العربي (P1)، و«حي/وسط/طريق» كلمات عامة أوردية. ويرد الحيّ نفسه في أسطر مواقع البطاقات (دفعة لاحقة) وفي جواب ix.faqs.5.a: صيغة واحدة.`);
} else {
  for (const c of cards('dining')) addCard('dining', c);
}

// المنشور الأوردي الملزم
const attDir = path.join(REPO, 'src/content/attractions');
const places = {};
for (const f of fs.readdirSync(attDir)) {
  const s = fs.readFileSync(path.join(attDir, f), 'utf8');
  const t = fm(s, 'title_ur');
  if (t) places[fm(s, 'slug_en')] = { title_en: fm(s, 'title_en'), title: t, area: fm(s, 'area_ur') };
}
const allEn = Object.values(strings).map((v) => v.en).join('\n');
const placesUsed = Object.fromEntries(Object.entries(places).filter(([, p]) => p.title_en && allEn.includes(p.title_en.replace(/^Al-/, ''))));
const siblings = {};
const otherViews = fs.readdirSync(path.join(REPO, 'src/components/views')).filter((f) => f.endsWith('.astro'));
const urBlocks = [];
for (const f of otherViews) {
  try { const C = readLocalize(REPO, `src/components/views/${f}`, { lenient: true }); if (C.ur) urBlocks.push([f.replace('.astro', ''), Object.fromEntries(flatten(C.en)), Object.fromEntries(flatten(C.ur))]); } catch { /* قالب بلا localize */ }
}
for (const [k, v] of Object.entries(strings)) {
  const hits = Object.entries(ui.en).filter(([uk, en]) => en === v.en && typeof ui.ur?.[uk] === 'string').map(([uk]) => ({ key: `ui.${uk}`, ur: ui.ur[uk] }));
  for (const [vn, en, ur] of urBlocks) for (const [ek, e] of Object.entries(en)) if (e === v.en && ur[ek]) hits.push({ key: `${vn}.${ek}`, ur: ur[ek] });
  if (hits.length) siblings[k] = hits;
}
const refUi = {};
for (const k of ['nav.stay', 'nav.stayShort', 'nav.dine', 'nav.food', 'det.openMaps', 'list.all', 'crumb.home', 'nav.attractions', 'nav.myTrip', 'fav.add', 'det.faq']) if (typeof ui.ur?.[k] === 'string') refUi[k] = ui.ur[k];
const tm = JSON.parse(fs.readFileSync(path.join(REPO, 'ur-translation/memory/tm.json'), 'utf8'));
const KW = /Koot|Hofuf|Mubarraz|Uqair|Qasr Ibrahim|Qaisariyah|heritage|Google Maps|caravan|Municipality|governorate|Commission for Tourism|date bread|red bread|tannour|oven|café|cafe|restaurant|bakery|coffee|Hasawi|road|district|Ain Najm|Khalidiyah|Rawdah|Mazrou|Olaya|Uwaimriyah|Khudud|Raf‘ah|Qarah|Gulf/i;
const seen = new Set();
const tmPick = tm.pairs.filter((p) => typeof p.en === 'string' && !p.status && p.en.length <= 120 && KW.test(p.en) && !seen.has(p.en) && seen.add(p.en)).map(({ en, ur, page, field }) => ({ en, ur, page, field })).slice(0, 220);
fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(path.join(DIR, 'pack.json'), JSON.stringify({ batch: path.basename(DIR), lang: 'ur', strings }, null, 2));
fs.writeFileSync(path.join(DIR, 'ref.json'), JSON.stringify({
  _readme: 'المنشور الأوردي الملزم: المعالم التي يذكرها المصدر (places)، والسلاسل المنشورة بمصدر إنجليزي مطابق حرفاً (siblings)، ومفاتيح ui.ur قائمة، وأزواج ذاكرة ذات صلة (tm). النظائر المعتمدة للصفحات نفسها: كتل zh/de/ru في القوالب وحقول *_de/*_ru في البطاقات.',
  places: placesUsed, ui: refUi, siblings, tm: tmPick,
}, null, 2));
console.log(`${KIND}: ${Object.keys(strings).length} سلسلة، ${Object.values(strings).reduce((a, v) => a + v.en.length, 0)} حرفاً إنجليزياً؛ ${Object.keys(siblings).length} بنظير منشور؛ ${Object.keys(placesUsed).length} معلماً؛ ${tmPick.length} زوجاً`);
