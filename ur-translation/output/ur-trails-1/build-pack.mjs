// node build-pack.mjs <REPO> <BATCH_DIR> — حزمة دفعة المسارات المقترحة بالأوردية (pack.json + ref.json)
// المصدر trails.json (en مصدراً وar فيصلاً) ومفاتيح الواجهة trails.* في ui.ts؛ والمنشور الأوردي الملزم من ملفات المعالم وui.ur.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR] = process.argv.slice(2);
if (!REPO || !DIR) throw new Error('الاستعمال: build-pack.mjs <REPO> <BATCH_DIR>');
const T = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/trails.json'), 'utf8'));
const { ui } = await import(pathToFileURL(path.join(REPO, 'src/i18n/ui.ts')).href);
const { STOP_ALIASES } = await import(pathToFileURL(path.join(REPO, 'src/lib/trails.ts')).href).catch(() => ({ STOP_ALIASES: null }));
const aliases = STOP_ALIASES ?? Object.fromEntries([...fs.readFileSync(path.join(REPO, 'src/lib/trails.ts'), 'utf8').matchAll(/^\s+'([a-z-]+)': '([a-z-]+)',$/gm)].map((m) => [m[1], m[2]]));

const strings = {};
const add = (k, ar, en, ctx, extra = {}) => { strings[k] = { en, ar, ctx, ...extra }; };

// 1) مفاتيح الواجهة
const UI_CTX = {
  'trails.title': 'H1 فهرس المسارات (/ur/trails/) وعنوانه في المتصفح.',
  'trails.lead': 'فقرة تحت H1 الفهرس.',
  'trails.duration': 'تسمية خانة المدة على بطاقة المسار وفي رأس صفحته (يليها half-day أو full-day).',
  'trails.duration.half-day': 'قيمة المدة: نصف يوم.',
  'trails.duration.full-day': 'قيمة المدة: يوم كامل.',
  'trails.mode': 'تسمية خانة وسيلة التنقّل (يليها walking أو driving أو 4x4).',
  'trails.mode.walking': 'قيمة الوسيلة: سيراً على الأقدام.',
  'trails.mode.driving': 'قيمة الوسيلة: بالسيارة.',
  'trails.mode.4x4': 'قيمة الوسيلة: سيارة دفع رباعي.',
  'trails.stopsCount': 'تسمية بجانب عدد المحطات على البطاقة (الرقم منفصل قبلها أو بعدها).',
  'trails.unescoCount': 'تسمية بجانب عدد محطات اليونسكو على البطاقة.',
  'trails.view': 'رابط على بطاقة المسار إلى صفحته، يتبعه سهم.',
  'trails.stopsH': 'H2 قائمة المحطات في صفحة المسار.',
  'trails.stop': 'وسم صغير قبل رقم المحطة («المحطة 1»).',
  'trails.unesco': 'شارة على المحطة الواقعة ضمن مكوّنات موقع اليونسكو.',
  'trails.sources': 'عنوان صغير فوق روابط مصادر المحطة.',
  'trails.landmark': 'رابط من المحطة إلى صفحة المعلم، يتبعه سهم.',
  'trails.mapH': 'H2 خريطة المسار.',
  'trails.mapNote': 'سطر تحت الخريطة.',
  'trails.all': 'رابط في ذيل صفحة المسار إلى الفهرس.',
};
for (const [k, ctx] of Object.entries(UI_CTX)) {
  if (!ui.en[k] || !ui.ar[k]) throw new Error(`مفتاح واجهة غائب: ${k}`);
  add(`ui.${k}`, ui.ar[k], ui.en[k], ctx);
}

// 2) رأس القسم
add('meta.attribution', T.meta.attribution.ar, T.meta.attribution.en, 'سطر الإسناد في رأس الفهرس وذيل كل مسار: المسارات **مقترحة من الموقع لا رسمية** — لا «سرکاری/منظور شدہ/مستند» (C27).');
add('meta.unescoNote', T.meta.unescoNote.ar, T.meta.unescoNote.en, 'ملاحظة اليونسكو مرة واحدة في كل صفحة مسار. اسم الموقع المسجّل وسنة 2018 بصيغتهما المنشورة بالأوردية (ابحث في المعجم: Al-Ahsa Oasis, an Evolving Cultural Landscape).');
add('seoDesc', `{n} مسارات مقترحة بين معالم الأحساء: {titles}.`, `{n} suggested trails across Al-Ahsa’s landmarks: {titles}.`, 'وصف meta لصفحة الفهرس. {n} عدد المسارات و{titles} عناوينها موصولة بـlistSep. احفظ النائبين حرفياً، مرة واحدة لكلٍّ.');
add('listSep', '، ', ', ', 'الفاصل بين عناوين المسارات في seoDesc (فاصلة الأوردو U+060C ثم مسافة).', { allowNoScript: true });

// 3) عناوين المصادر
for (const [k, s] of Object.entries(T.sources)) {
  const ar = typeof s.title === 'string' ? s.title : s.title.ar;
  const en = typeof s.title === 'string' ? s.title : s.title.en;
  add(`sources.${k}`, ar, en, `نص رابط مصدر (${s.tier ?? 'مصدر'}) يفتح ${new URL(s.url).hostname}. اسم الجهة والوثيقة بصيغتهما المعجمية؛ لا يُترجم ما هو رقم قرار أو اسم موقع لاتيني إلا بقدر ما تحتاجه الجملة. الشرطة بعد اسم الجهة تبقى فاصلاً.`);
}

// 4) المسارات ومحطاتها
const places = {};
const attFile = (slugEn) => {
  const dir = path.join(REPO, 'src/content/attractions');
  for (const f of fs.readdirSync(dir)) {
    const s = fs.readFileSync(path.join(dir, f), 'utf8');
    if (new RegExp(`^slug_en: "?${slugEn}"?\\s*$`, 'm').test(s)) return s;
  }
  return null;
};
const fm = (s, k) => s.match(new RegExp(`^${k}: "?(.*?)"?\\s*$`, 'm'))?.[1];
for (const t of [...T.trails].sort((a, b) => a.order - b.order)) {
  const base = `trails.${t.slug}`;
  add(`${base}.title`, t.ar.title, t.en.title, `عنوان المسار (H1 صفحته، وبطاقة الفهرس، وتسمية المحطة في مخطّط الرئيسية). مقترح لا رسمي (C27). المدة ${t.suggestedDuration}، الوسيلة ${t.mode}.`);
  add(`${base}.tagline`, t.ar.tagline, t.en.tagline, 'سطر قصير تحت العنوان على البطاقة وفي رأس الصفحة.');
  add(`${base}.intro`, t.ar.intro, t.en.intro, 'فقرة المقدمة في رأس صفحة المسار.');
  for (const s of t.stops) {
    const slug = attFile(s.landmarkSlugHint) ? s.landmarkSlugHint : aliases[s.landmarkSlugHint];
    const a = slug ? attFile(slug) : null;
    if (a) places[s.key] = { attraction: slug, title_en: fm(a, 'title_en'), title: fm(a, 'title_ur'), summary: fm(a, 'summary_ur') };
    const pub = a && fm(a, 'title_ur') ? ` اسم المعلم المنشور بالأوردية: «${fm(a, 'title_ur')}» (ref.places.${s.key}) — استعمله حرفاً في name ما لم يحمل المصدر وصفاً زائداً على اسم المعلم.` : ' لا صفحة معلم لهذه المحطة: انقحر الاسم من الرسم العربي بقواعد المعجم (P1).';
    add(`${base}.stops.${s.key}.name`, s.ar.name, s.en.name, `اسم المحطة (H3 في صفحة المسار).${pub}${s.unesco ? ' عليها شارة اليونسكو.' : ''}`);
    add(`${base}.stops.${s.key}.text`, s.ar.text, s.en.text, `نص المحطة تحت اسمها. كل واقعة ورقم وتاريخ كما في المصدر بلا إضافة؛ الهجري بصيغة الخط «962 ہجری (1555 عیسوی)».${/Roman/.test(s.en.text) ? ' **«المسرح الروماني» تسمية محلية لمسرح حديث: احفظ نفي الأثر الروماني صراحة (C27).**' : ''}`);
  }
}

const L = 'ur';
const refUi = {};
for (const k of ['nav.trails', 'crumb.home', 'nav.attractions', 'nav.map', 'fact.unesco.l', 'home.hero.eyebrow', 'det.unesco', 'nav.planVisit']) if (ui[L]?.[k]) refUi[k] = ui[L][k];
fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(path.join(DIR, 'pack.json'), JSON.stringify({ batch: path.basename(DIR), lang: L, strings }, null, 2));
fs.writeFileSync(path.join(DIR, 'ref.json'), JSON.stringify({ _readme: 'المنشور الأوردي الملزم: أسماء المعالم وخلاصاتها لمحطاتها، ومفاتيح واجهة قائمة.', places, ui: refUi }, null, 2));
const missingUr = Object.entries(places).filter(([, p]) => !p.title).map(([k]) => k);
console.log(`${Object.keys(strings).length} سلسلة؛ ${Object.keys(places).length} محطة بمعلم${missingUr.length ? `، بلا title_ur: ${missingUr.join(' ')}` : ''}`);
