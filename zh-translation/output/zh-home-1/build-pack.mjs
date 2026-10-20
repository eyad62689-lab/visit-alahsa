// node build-pack.mjs <REPO> <BATCH_DIR> — يبني pack.json لدفعة الرئيسية الصينية من home-copy.ts وhome-chapters.ts
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR] = process.argv.slice(2);
const imp = (p) => import(pathToFileURL(path.join(REPO, p)).href);
const { HOME_COPY } = await imp('src/data/home-copy.ts');
const { TEMPLATES, COMPANION_TIPS, MEMORY_CARDS } = await imp('src/data/home-chapters.ts');
// oasis-facts يستورد وحدات بلا امتداد؛ صيغتا العيون تُقرآن نصاً
const ofs = fs.readFileSync(path.join(REPO, 'src/data/oasis-facts.ts'), 'utf8').match(/springs: \{[\s\S]*?ar: '([^']*)',\s*en: '([^']*)'/);
const OASIS_FACTS = { springs: { plus: { ar: ofs[1], en: ofs[2] } } };

const A = HOME_COPY.ar, E = HOME_COPY.en;
const strings = {};
const add = (k, ar, en, ctx) => { strings[k] = { en, ar, ctx }; };

// الفصل 1
add('gate.title', A.gate.title, E.gate.title, 'H1 الصفحة فوق فيديو البطل. «أكبر واحة في العالم» بلا نخيل ولا طبيعية (C15). الرئيسية الصينية المنشورة تقول «全球最大的绿洲».');
add('gate.lead', A.gate.lead, E.gate.lead, 'فقرة تحت H1. تختم بدعوة إلى التمرير (الصفحة سبعة فصول يقودها التمرير).');
add('gate.begin', A.gate.begin, E.gate.begin, 'زرّ ذهبي ينزل إلى الفصل 2.');
add('gate.skip', A.gate.skip, E.gate.skip, 'زرّ ثانوي يقفز إلى الفصل 6 (أداة التخطيط).');
// الشريط
add('rail.label', A.rail.label, E.rail.label, 'aria-label لشريط التنقل بين الفصول (قارئ الشاشة).');
A.rail.items.forEach(([id, ar], i) => add(`rail.${id}`, ar, E.rail.items[i][1], `اسم الفصل ${i + 1} في شريط النقاط الجانبي (يظهر على الحاسوب بجوار النقطة، وهو aria-label للرابط). قصير. يجب أن يتّسق مع عنوان الفصل نفسه حيث يتطابق المصدران.`));
// الفصل 2
add('water.title', A.water.title, E.water.title, 'H2 الفصل 2.');
add('water.lead', A.water.lead, E.water.lead, 'فقرة تحت H2 الفصل 2.');
add('water.springsN', OASIS_FACTS.springs.plus.ar, OASIS_FACTS.springs.plus.en, 'الرقم الكبير في بطاقة العيون (أكثر من 280، من غينيس). نظيره المنشور في بطاقة النخيل بجواره: «250 多万» (en «2.5M+»). سكربت العدّ يحرّك أول رقم في النص ويُبقي ما حوله. يتبعه سطر التسمية water.springsL تحته.');
add('water.springsL', A.water.springsL, E.water.springsL, 'تسمية تحت الرقم water.springsN. نظائرها المنشورة في البطاقات المجاورة (ملزمة الصيغة): «棵椰枣树，全球最大的绿洲» · «年列入联合国教科文组织世界遗产名录» · «处景点，等您逐一探索» — أي تبدأ بالمصنِّف ليُقرأ الرقم والتسمية جملة واحدة.');
add('water.srcLabel', A.water.srcLabel, E.water.srcLabel, 'بداية سطر المصادر الصغير. السطر يُركَّب: srcLabel + [رابط srcGuinness] + srcMid + [رابط srcUnesco] + srcEnd. احفظ المسافات/الفواصل الطرفية بما يلائم الصينية.');
add('water.srcGuinness', A.water.srcGuinness, E.water.srcGuinness, 'نص رابط إلى سجل غينيس «Largest oasis». المنشور الصيني في صفحة الثمار: «依据吉尼斯世界纪录认证（2020 年 10 月）…».');
add('water.srcMid', A.water.srcMid, E.water.srcMid, 'بين الرابطين. المنشور الصيني لاسم الوزارة: «沙特环境水务与农业部».');
add('water.srcUnesco', A.water.srcUnesco, E.water.srcUnesco, 'نص رابط إلى قائمة التراث العالمي (الموقع 1563).');
add('water.srcEnd', A.water.srcEnd, E.water.srcEnd, 'ختام السطر بعد رابط اليونسكو.');
add('water.link', A.water.link, E.water.link, 'رابط إلى فهرس المعالم مصفّى بالطبيعة، يتبعه سهم →.');
// الفصل 3
add('qarah.title', A.qarah.title, E.qarah.title, 'H2 الفصل 3: اسم الجبل ثم دعوة إلى تحريك شريط الوقت فوق صورته.');
add('qarah.drag', A.qarah.drag, E.qarah.drag, 'جملة تُلحق بعد خلاصة جبل القارة المنشورة (summary_zh — في ctx الملحق) في الفقرة نفسها.');
add('qarah.timeLabel', A.qarah.timeLabel, E.qarah.timeLabel, 'تسمية مخفية لشريط التمرير (قارئ الشاشة).');
['dawn', 'morning', 'afternoon', 'sunset'].forEach((t, i) => add(`qarah.time.${t}`, A.qarah.times[i], E.qarah.times[i], `علامة الشريط رقم ${i + 1} من أربع (الفجر ← الغروب) تُطبع تحت الشريط وعلى الصورة. كلمة واحدة قصيرة متوازية مع أخواتها. الإنجليزية «Morning» تنقل «الضحى» و«Afternoon» تنقل «الأصيل». المنشور في الرئيسية القديمة: 上午 · 下午晚些时候 · 傍晚 · 日落.`));
add('qarah.link', A.qarah.link, E.qarah.link, 'رابط إلى صفحة المعلم، يتبعه سهم.');
// الفصل 4
add('map.title', A.map.title, E.map.title, 'H2 الفصل 4 (خريطة تفاعلية بستة معالم).');
add('map.lead', A.map.lead, E.map.lead, 'فقرة تحت H2. «احفظه» = زرّ «收藏景点» المنشور في كل لوحة، و«رحلتك» = «我的收藏» المنشورة.');
add('map.svgLabel', A.map.svgLabel, E.map.svgLabel, 'aria-label لرسم الخريطة SVG. «تحريرية» = رسم مبسّط لا خريطة ملاحة.');
add('map.km', A.map.km, E.map.km, 'نص مقياس الرسم على الخريطة (10 كم).');
add('map.legend', A.map.legend, E.map.legend, 'aria-label لمجموعة أزرار المعالم تحت الخريطة.');
add('map.empty', A.map.empty, E.map.empty, 'نص يظهر قبل اختيار معلم.');
add('map.more', A.map.more, E.map.more, 'رابط في لوحة المعلم إلى صفحته، يتبعه سهم.');
add('map.link', A.map.link, E.map.link, 'رابط إلى صفحة الخريطة الكاملة /zh/map/ (اسمها في القائمة المنشورة «地图»).');
// الفصل 5
add('memory.title', A.memory.title, E.memory.title, 'H2 الفصل 5: بطاقات الجعلانية والقيصرية وقصر إبراهيم ومسجد جواثا والعقير.');
add('memory.lead', A.memory.lead, E.memory.lead, 'فقرة تحت H2. «من أوائل الإسلام» = some of Islam’s earliest (لا «أقدم» مطلقاً).');
add('memory.track', A.memory.track, E.memory.track, 'aria-label لشريط البطاقات الأفقي.');
add('memory.link', A.memory.link, E.memory.link, 'رابط إلى فهرس المعالم مصفّى بالتراث، يتبعه سهم.');
for (const c of MEMORY_CARDS) if (c.date) add(`memory.date.${c.slug}`, c.date.ar, c.date.en, `شارة التاريخ على بطاقة ${c.slug} — بصيغتها من متن صفحة المعلم المنشور (اقرأ body_zh في src/content/attractions/${c.slug}.md وانقل صيغته الصينية لهذه الواقعة).`);
// الفصل 6
add('plan.title', A.plan.title, E.plan.title, 'H2 الفصل 6.');
add('plan.lead', A.plan.lead, E.plan.lead, 'فقرة تحت H2. «ما حفظته» = ما حفظه الزائر بزرّ «收藏景点».');
add('plan.link', A.plan.link, E.plan.link, 'رابط إلى /zh/plan-your-trip/ (اسمها المنشور «行程规划»)، يتبعه سهم.');
for (const q of ['int', 'dur', 'com']) {
  add(`plan.${q}.legend`, A.plan[q].legend, E.plan[q].legend, 'سؤال (legend لمجموعة أزرار اختيار).');
  A.plan[q].opts.forEach(([v, ar], i) => add(`plan.${q}.${v}`, ar, E.plan[q].opts[i][1], 'خيار زرّ قصير جداً، متوازٍ مع أخويه.'));
}
add('plan.wait', A.plan.L.wait, E.plan.L.wait, 'نص في لوحة المسار قبل الإجابة.');
add('plan.routeTitle', A.plan.L.title, E.plan.L.title, 'عنوان لوحة المسار قبل الإجابة (بعدها يحلّ محله عنوان القالب).');
A.plan.L.days.forEach((d, i) => add(`plan.day${i + 1}`, d, E.plan.L.days[i], 'عنوان اليوم في المسار. المنشور في الرئيسية القديمة «第 1 天».'));
add('plan.kindTrail', A.plan.L.trail, E.plan.L.trail, 'وسم صغير قبل اسم محطة هي مسار منشور (اسم القسم المنشور «路线»).');
add('plan.kindPlace', A.plan.L.place, E.plan.L.place, 'وسم صغير قبل اسم محطة هي معلم (اسم القسم المنشور «景点»).');
add('plan.kindSaved', A.plan.L.saved, E.plan.L.saved, 'وسم صغير قبل محطة أضافها الزائر من محفوظاته («我的收藏»).');
for (const [k, t] of Object.entries(TEMPLATES)) {
  const [int, d] = k.split('-');
  add(`tpl.${k}.title`, t.title.ar, t.title.en, `عنوان قالب المسار «${int}» لـ${d} يوم. يحيل كل ما فيه إلى محطات القالب المنشورة (انظر ref.templates في الملحق). العناوين التسعة سلسلة متوازية: «يوم…» / «يومان: …، ثم …» / «ثلاثة أيام تنتهي …».${k === 'heritage-3' ? ' «أول ميناء بحري شرق المملكة» صيغة الدارة المعتمدة لميناء العقير (C34) — لا «أول موانئ المنطقة»؛ ابحث عن صيغتها الصينية المنشورة في body_zh لـal-uqair وtrails.zh.json.' : ''}`);
}
const note = TEMPLATES['nature-2'].note;
add('tpl.note.asfar', note.ar, note.en, 'تنبيه تحت قالبي الطبيعة 2 و3، منقول من مقدمة مسار الأصفر المنشور — انقل صيغته من intro مسار al-asfar-and-national-park في trails.zh.json.');
for (const [k, v] of Object.entries(COMPANION_TIPS)) add(`tip.${k}`, v.ar, v.en, `فقرة المرافقين (${k}) تحت المسار. كل اسم فيها بصيغته الصينية المنشورة (ref.tipNames في الملحق) حرفاً.`);
// الختام
add('finale.title', A.finale.title, E.finale.title, 'H2 الفصل 7 فوق صورة الأصفر.');
add('finale.lead', A.finale.lead, E.finale.lead, 'فقرة تحت H2.');
add('finale.plan', A.finale.plan, E.finale.plan, 'الزر الرئيسي إلى /zh/plan-your-trip/ (المنشور «行程规划»).');
add('finale.open', A.finale.open, E.finale.open, 'يحلّ محل finale.plan حين للزائر محفوظات، ويقود إلى «我的收藏» /zh/plan/؛ السكربت يُلحق بعده « (n)».');
add('finale.replay', A.finale.replay, E.finale.replay, 'زرّ ثانوي يعود إلى أعلى الصفحة (الفصل 1).');
add('saved.count', A.saved.count, E.saved.count, 'شريط سفلي بعد أول حفظ: يليه العدد مباشرة («…: 3»). المنشور «我的收藏».');
add('saved.build', A.saved.build, E.saved.build, 'زرّ في الشريط السفلي يقود إلى الفصل 6 ليُبنى المسار من المحفوظات.');

fs.mkdirSync(DIR, { recursive: true });
fs.writeFileSync(path.join(DIR, 'pack.json'), JSON.stringify({ batch: path.basename(DIR), strings }, null, 2));
console.log(Object.keys(strings).length, 'strings');
