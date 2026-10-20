// node build-pack.mjs <REPO> <BATCH_DIR> <lang> — حزمة دفعة الرئيسية «الواحة تتكشّف» لأي لغة (pack.json + ref.json)
// المصدر من home-copy.ts/home-chapters.ts (ar/en)، والمنشور الملزم بلغة الهدف من المجموعات وtrails.<lang>.json وui.ts.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR, LANG] = process.argv.slice(2);
if (!REPO || !DIR || !LANG) throw new Error('الاستعمال: build-pack.mjs <REPO> <BATCH_DIR> <lang>');
const imp = (p) => import(pathToFileURL(path.join(REPO, p)).href);
const { HOME_COPY } = await imp('src/data/home-copy.ts');
const { TEMPLATES, COMPANION_TIPS, COAST_TIPS, MEMORY_CARDS, MAP_SLUGS } = await imp('src/data/home-chapters.ts');
const ofs = fs.readFileSync(path.join(REPO, 'src/data/oasis-facts.ts'), 'utf8').match(/springs: \{[\s\S]*?ar: '([^']*)',\s*en: '([^']*)'/);

const A = HOME_COPY.ar, E = HOME_COPY.en;
const strings = {};
const add = (k, ar, en, ctx, extra = {}) => { strings[k] = { en, ar, ctx, ...extra }; };
const PUB = 'نظيره المنشور بلغتك في ref.ui';

add('gate.title', A.gate.title, E.gate.title, 'H1 الصفحة فوق فيديو البطل. «أكبر واحة في العالم» بلا نخيل ولا «طبيعية» (C15). ' + PUB + ' (fact.palms.l و home.hero.lead تحملان الصيغة المنشورة لـ«أكبر واحة في العالم»).');
add('gate.lead', A.gate.lead, E.gate.lead, 'فقرة تحت H1: تبدأ بالموضع (المنطقة الشرقية من السعودية — ابحث عن Eastern Province في معجمك) ثم ثلاث صور الفصول، وتختم بدعوة إلى التمرير.');
add('gate.begin', A.gate.begin, E.gate.begin, 'زرّ ذهبي ينزل إلى الفصل 2.');
add('gate.skip', A.gate.skip, E.gate.skip, 'زرّ ثانوي يقفز إلى الفصل 6 (أداة التخطيط).');
add('rail.label', A.rail.label, E.rail.label, 'aria-label لشريط التنقل بين الفصول (قارئ الشاشة).');
A.rail.items.forEach(([id, ar], i) => add(`rail.${id}`, ar, E.rail.items[i][1], `اسم الفصل ${i + 1}: يظهر في شريط النقاط الجانبي، وهو **أيضاً العنوان الصغير فوق الفصل** بصيغة «0${i + 1} · <الاسم>». قصير. يتّسق مع عنوان الفصل حيث يتطابق المصدران.`));
add('water.title', A.water.title, E.water.title, 'H2 الفصل 2.');
add('water.lead', A.water.lead, E.water.lead, 'فقرة تحت H2 الفصل 2.');
add('water.springsN', ofs[1], ofs[2], 'الرقم الكبير في بطاقة العيون (أكثر من 280، من غينيس). بجواره بطاقة النخيل بصيغتها المنشورة بلغتك (ref.palmsPlus)، فاتّبع بنيتها. سكربت العدّ يحرّك أول رقم في النص ويُبقي ما حوله. تحته التسمية water.springsL.');
add('water.springsL', A.water.springsL, E.water.springsL, 'تسمية تحت الرقم. تسميات البطاقات المجاورة منشورة بلغتك (ref.ui: fact.palms.l و fact.unesco.l و fact.sites.l) — وازِ بنيتها.');
add('water.srcLabel', A.water.srcLabel, E.water.srcLabel, 'بداية سطر المصادر الصغير. السطر يُركَّب: srcLabel + [رابط srcGuinness] + srcMid + [رابط srcUnesco] + srcEnd. احفظ المسافات والفواصل الطرفية بما يلائم لغتك.');
add('water.srcGuinness', A.water.srcGuinness, E.water.srcGuinness, 'نص رابط إلى سجل غينيس «Largest oasis». سطر المصادر المنشور في صفحة الثمار بلغتك: ref.fruitsStatsSrc.');
add('water.srcMid', A.water.srcMid, E.water.srcMid, 'بين الرابطين. اسم الوزارة بصيغته في ref.fruitsStatsSrc.');
add('water.srcUnesco', A.water.srcUnesco, E.water.srcUnesco, 'نص رابط إلى قائمة التراث العالمي (الموقع 1563).');
add('water.srcEnd', A.water.srcEnd, E.water.srcEnd, 'ختام السطر بعد رابط اليونسكو.', { allowNoScript: true });
add('water.link', A.water.link, E.water.link, 'رابط إلى فهرس المعالم مصفّى بالطبيعة، يتبعه سهم →. اسم فئة الطبيعة منشور بلغتك في ui.ts (cat.nature أو ما يقابله).');
add('qarah.title', A.qarah.title, E.qarah.title, 'H2 الفصل 3: اسم الجبل ثم دعوة إلى تحريك شريط الوقت فوق صورته.');
add('qarah.drag', A.qarah.drag, E.qarah.drag, 'جملة تُلحق بعد خلاصة جبل القارة المنشورة بلغتك (ref.places.jabal-al-qarah.summary) في الفقرة نفسها.');
add('qarah.timeLabel', A.qarah.timeLabel, E.qarah.timeLabel, 'تسمية مخفية لشريط التمرير (قارئ الشاشة).');
['dawn', 'morning', 'afternoon', 'sunset'].forEach((t, i) => add(`qarah.time.${t}`, A.qarah.times[i], E.qarah.times[i], `علامة الشريط ${i + 1} من أربع (الفجر ← الغروب) تحت الشريط وعلى الصورة. كلمة قصيرة متوازية مع أخواتها. العربية الفيصل: «الضحى» ضحى، و«الأصيل» آخر النهار والشمس بعدُ فوق الأفق (لا المساء ولا الغسق — العلامة الرابعة هي الغروب). أوقات الرئيسية القديمة بلغتك في ref.ui (home.route.time.*).`));
add('qarah.link', A.qarah.link, E.qarah.link, 'رابط إلى صفحة المعلم، يتبعه سهم.');
add('map.title', A.map.title, E.map.title, 'H2 الفصل 4 (خريطة تفاعلية بستة معالم).');
add('map.lead', A.map.lead, E.map.lead, 'فقرة تحت H2. «احفظه» = زرّ fav.add المنشور في كل لوحة، و«رحلتك» = nav.myTrip المنشورة (ref.ui).');
add('map.svgLabel', A.map.svgLabel, E.map.svgLabel, 'aria-label لرسم الخريطة SVG. «تحريرية» = رسم مبسّط لا خريطة ملاحة.');
add('map.km', A.map.km, E.map.km, 'نص مقياس الرسم على الخريطة (10 كم).');
add('map.legend', A.map.legend, E.map.legend, 'aria-label لمجموعة أزرار المعالم تحت الخريطة.');
add('map.empty', A.map.empty, E.map.empty, 'نص يظهر قبل اختيار معلم.');
add('map.more', A.map.more, E.map.more, 'رابط في لوحة المعلم إلى صفحته، يتبعه سهم. يلي مباشرة زرّ fav.add.');
add('map.link', A.map.link, E.map.link, 'رابط إلى صفحة الخريطة الكاملة (nav.map المنشورة).');
add('memory.title', A.memory.title, E.memory.title, 'H2 الفصل 5: بطاقات الجعلانية والقيصرية وقصر إبراهيم ومسجد جواثا والعقير. عنوان تحريري معتمد بنبرته الأدبية.');
add('memory.lead', A.memory.lead, E.memory.lead, 'فقرة تحت H2. «من أوائل الإسلام» = some of Islam’s earliest (لا «أقدم» مطلقاً).');
add('memory.track', A.memory.track, E.memory.track, 'aria-label لشريط البطاقات الأفقي.');
add('memory.link', A.memory.link, E.memory.link, 'رابط إلى فهرس المعالم مصفّى بالتراث، يتبعه سهم.');
const DATE_NUMS = { jalaniyah: ['5'], qaisariyah: ['200'] };
for (const c of MEMORY_CARDS) if (c.date) add(`memory.date.${c.slug}`, c.date.ar, c.date.en, `شارة تاريخ قصيرة على بطاقة ${c.slug}. انقل صيغة الواقعة من متن المعلم المنشور بلغتك (body_${LANG} في src/content/attractions/${c.slug}.md). الأرقام لاتينية.`, { allowNums: DATE_NUMS[c.slug] });
add('plan.title', A.plan.title, E.plan.title, 'H2 الفصل 6. يتّسق مع rail.ch-plan.');
add('plan.lead', A.plan.lead, E.plan.lead, 'فقرة تحت H2. «ما حفظته» = ما حُفظ بزرّ fav.add.');
add('plan.link', A.plan.link, E.plan.link, 'رابط إلى صفحة التخطيط (nav.planVisit المنشورة)، يتبعه سهم.');
for (const q of ['int', 'dur', 'com']) {
  add(`plan.${q}.legend`, A.plan[q].legend, E.plan[q].legend, 'سؤال (legend لمجموعة أزرار اختيار).');
  A.plan[q].opts.forEach(([v, ar], i) => add(`plan.${q}.${v}`, ar, E.plan[q].opts[i][1], 'خيار زرّ قصير جداً، متوازٍ مع أخويه.'));
}
add('plan.wait', A.plan.L.wait, E.plan.L.wait, 'نص في لوحة المسار قبل الإجابة.');
add('plan.routeTitle', A.plan.L.title, E.plan.L.title, 'عنوان لوحة المسار قبل الإجابة (بعدها يحلّ محله عنوان القالب).');
A.plan.L.days.forEach((d, i) => add(`plan.day${i + 1}`, d, E.plan.L.days[i], 'عنوان اليوم في المسار. صيغة الرئيسية القديمة بلغتك في ref.ui (home.route.d1.k). الأرقام لاتينية.', { allowNums: [String(i + 1)] }));
add('plan.kindTrail', A.plan.L.trail, E.plan.L.trail, 'وسم صغير قبل اسم محطة هي مسار منشور (nav.trails بصيغة المفرد).');
add('plan.kindPlace', A.plan.L.place, E.plan.L.place, 'وسم صغير قبل اسم محطة هي معلم.');
add('plan.kindSaved', A.plan.L.saved, E.plan.L.saved, 'وسم صغير قبل محطة أضافها الزائر من محفوظاته (nav.myTrip).');
for (const [k, t] of Object.entries(TEMPLATES)) {
  const [int, d] = k.split('-');
  add(`tpl.${k}.title`, t.title.ar, t.title.en, `عنوان قالب «${int}» لـ${d} يوم. يحيل إلى محطات القالب المنشورة (ref.templates_stops). العناوين التسعة سلسلة متوازية: «يوم…» / «يومان: …، ثم …» / «ثلاثة أيام تنتهي …». الوصف العام يبقى وصفاً عامّاً لا يُستبدل باسم.${k === 'heritage-3' ? ' «أول ميناء بحري شرق المملكة» صيغة الدارة المعتمدة لميناء العقير (C34) — لا «أول موانئ المنطقة»؛ انقل صيغتها من summary/body بلغتك لـal-uqair (ref.places.al-uqair) أو trails.' + LANG + '.json.' : ''}${k === 'markets-2' ? ' «الفخار عند جبل القارة» = ورشة الفخار في مسار القارة وجواثا المنشور (دوغة الغراش).' : ''}`);
}
const note = TEMPLATES['nature-2'].note;
add('tpl.note.asfar', note.ar, note.en, 'تنبيه تحت قالبي الطبيعة 2 و3، منقول من مقدمة مسار الأصفر المنشور — خذ صيغة الجملة من ref.asfar_trail_intro.');
for (const [k, v] of Object.entries(COMPANION_TIPS)) add(`tip.${k}`, v.ar, v.en, `فقرة المرافقين (${k}) تحت المسار في القوالب التسعة كلها. كل اسم فيها بصيغته المنشورة بلغتك (ref.places / ref.trails) حرفاً.${k === 'family' ? ' منتزه **واحد** من اثنين («أو»)، ولا «قريباً من محطاتك».' : ''}`);
for (const [k, v] of Object.entries(COAST_TIPS)) add(`tip.${k}Coast`, v.ar, v.en, `تتمة تُلحق مباشرة بعد tip.${k} في القالبين اللذين فيهما يوم ساحل وحدهما (التراث 3، الطبيعة 3). الفعل يوازي فعل tip.${k}. «شاطئ العقير» منشور: ref.places.uqair-beach.`);
add('finale.title', A.finale.title, E.finale.title, 'H2 الفصل 7 فوق صورة الأصفر.');
add('finale.lead', A.finale.lead, E.finale.lead, 'فقرة تحت H2. «رمال الأصفر» = منطقة بحيرة الأصفر بين الكثبان.');
add('finale.plan', A.finale.plan, E.finale.plan, 'الزر الرئيسي إلى صفحة التخطيط (nav.planVisit).');
add('finale.open', A.finale.open, E.finale.open, 'يحلّ محل finale.plan حين للزائر محفوظات، ويقود إلى nav.myTrip؛ السكربت يُلحق بعده « (n)».');
add('finale.replay', A.finale.replay, E.finale.replay, 'زرّ ثانوي يعود إلى أعلى الصفحة (الفصل 1).');
add('saved.count', A.saved.count, E.saved.count, 'شريط سفلي بعد أول حفظ: يليه العدد مباشرة («…: 3»). nav.myTrip.');
add('saved.build', A.saved.build, E.saved.build, 'زرّ في الشريط السفلي يقود إلى الفصل 6 ليُبنى المسار من المحفوظات.');

// ── المنشور الملزم ──
const attDir = path.join(REPO, 'src/content/attractions');
const fm = (slugEn) => {
  for (const f of fs.readdirSync(attDir)) {
    const head = fs.readFileSync(path.join(attDir, f), 'utf8').split(/^---\s*$/m)[1] ?? '';
    const get = (k) => (head.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1] ?? '').replace(/^['"]|['"]$/g, '');
    if (get('slug_en') === slugEn) return { file: `src/content/attractions/${f}`, title_en: get('title_en'), title: get(`title_${LANG}`), summary: get(`summary_${LANG}`) };
  }
  return null;
};
const tl = JSON.parse(fs.readFileSync(path.join(REPO, `src/data/trails.${LANG}.json`), 'utf8')).trails;
const te = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/trails.json'), 'utf8')).trails;
const places = new Set([...MAP_SLUGS, ...MEMORY_CARDS.map((c) => c.slug), 'jabal-al-qarah', 'jawatha-park', 'king-abdullah-park', 'arbaa', 'ahsa-museum', 'uqair-beach']);
const trails = new Set(['al-uqair-coast', 'al-asfar-and-national-park', 'historic-hofuf']);
const templates_stops = {};
for (const [k, t] of Object.entries(TEMPLATES)) templates_stops[k] = t.days.map((d) => d.stops.map((s) => ('trail' in s ? (trails.add(s.trail), `trail:${s.trail}`) : (places.add(s.place), `place:${s.place}`))));
const ui = fs.readFileSync(path.join(REPO, 'src/i18n/ui.ts'), 'utf8');
const bi = ui.indexOf(`  ${LANG}: {`);
const blk = ui.slice(bi, ui.indexOf('} as Record', bi));
const uiKeys = /^'(home\.(hero|route\.d1\.k|route\.time|plan)[^']*|fact\.[^']*|fav\.[^']*|nav\.(attractions|trails|map|plan|myTrip|planVisit)|plan\.title|cat\.[^']*)'/;
const uiPub = {};
for (const l of blk.split(/\r?\n/).map((x) => x.trim())) { const m = l.match(/^'([^']+)':\s*'((?:[^'\\]|\\.)*)'/); if (m && uiKeys.test(`'${m[1]}'`)) uiPub[m[1]] = m[2].replace(/\\'/g, "'"); }
const oasis = fs.readFileSync(path.join(REPO, 'src/data/oasis-facts.ts'), 'utf8');
const ref = {
  _readme: `المنشور الملزم بلغة الهدف (${LANG}): أسماء المعالم والمسارات حرفاً؛ الخلاصات تُعرض في الصفحة نفسها بجوار نصوص الدفعة.`,
  places: Object.fromEntries([...places].map((p) => [p, fm(p)])),
  trails: Object.fromEntries([...trails].map((t) => [t, { en: te.find((x) => x.slug === t)?.en.title, title: tl[t]?.title }])),
  templates_stops,
  asfar_trail_intro: tl['al-asfar-and-national-park']?.intro,
  asfar_trail_intro_en: te.find((t) => t.slug === 'al-asfar-and-national-park')?.en.intro,
  palmsPlus: oasis.match(new RegExp(`plus: \\{[\\s\\S]*?${LANG}: '([^']*)'`))?.[1],
  fruitsStatsSrc: oasis.match(new RegExp(`fruitsStatsSrc: \\{[\\s\\S]*?${LANG}: '([^']*)'`))?.[1],
  ui: uiPub,
};
const missing = Object.entries(ref.places).filter(([, v]) => !v || !v.title).map(([k]) => k);
fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(path.join(DIR, 'pack.json'), JSON.stringify({ batch: path.basename(DIR), lang: LANG, strings }, null, 2));
fs.writeFileSync(path.join(DIR, 'ref.json'), JSON.stringify(ref, null, 2));
console.log(`${Object.keys(strings).length} سلسلة؛ ${places.size} معلماً، ${trails.size} مسارات؛ ui ${Object.keys(uiPub).length} مفتاحاً؛ بلا ترجمة: ${missing.join(',') || 'لا شيء'}`);
