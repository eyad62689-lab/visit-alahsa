// اختبار C83 (tools/check-hours-prose.mjs): قراءة الأوقات والأيام باللغات السبع، ثم حلقة كسر على
// نسخة من ملفات المعالم في الذاكرة لا المصدر — كل حقنة يجب أن تُمسك، وكل تعديل بريء يجب أن يمرّ.
//   node tools/test-hours-prose.mjs
import { checkHoursProse, clockTimes, collectAttractionFiles, dayMentions, daysNearTimes } from './check-hours-prose.mjs';

let ok = true;
const report = (good, label, detail = '') => { console.log(`  ${good ? 'ok    ' : 'FAILED'} ${label}${good || !detail ? '' : ' ⇐ ' + detail}`); ok &&= good; };

// ── قراءة الأوقات ──
const TIMES = [
  ['ar', 'السبت–الخميس 8–11:30 ص و4–11 م · الجمعة 4–11 م', [480, 690, 960, 1380]],
  ['ar', 'يومياً 7:30 ص – 12 منتصف الليل (الأحد والاثنين من 7 ص · الجمعة من 2:30 م)', [420, 450, 870, 1440]],
  ['ar', 'يومياً: 8:00 ص - 12:00 ظهراً | 3:00 م - 7:30 م', [480, 720, 900, 1170]],
  ['ar', 'يفتح حتى منتصف الليل', [1440]],
  ['ar', '8 ص–12 ظهراً و3:30 ع–10 م', [480, 720, 930, 1320]],
  ['ar', 'تضم الواحة أكثر من 2.5 مليون نخلة، وارتفاع الجبل 75 م، منذ 11 نوفمبر 2026', []],
  ['ar', 'مفتوح على مدار الساعة (24 ساعة)', []],
  ['ar', 'في مغاراته الـ12 تبقى الحرارة قريبة من 20°م حين يتجاوز الخارج 40°م', []],
  ['en', 'Sat–Thu 8–11:30 am & 4–11 pm · Fri 4–11 pm', [480, 690, 960, 1380]],
  ['en', 'Daily 7:30 am – midnight (Sunday & Monday from 7:00 am · Friday from 2:30 pm)', [420, 450, 870, 1440]],
  ['en', 'Daily 8:00 am – 12:00 noon and 3:00–7:30 pm', [480, 720, 900, 1170]],
  ['en', 'Open 11–1 pm, then again at 16:00', [660, 780, 960]],
  ['en', 'Adults 50 SAR; a visit takes 1–2 hours; open 24 hours', []],
  ['zh', '周六–周四 8:00–11:30、16:00–23:00 · 周五 16:00–23:00', [480, 690, 960, 1380]],
  ['zh', '下午 4 点开放，建议游览 1–2 小时', [960]],
  ['de', 'Sa.–Do. 8–16 Uhr · Fr. geschlossen', [480, 960]],
  ['de', 'So.–Do. 8–17 Uhr · Fr. 16–20 Uhr · Sa. 9–13 und 16–20 Uhr', [480, 540, 780, 960, 1020, 1200]],
  ['de', 'Eintritt 10–15 SAR, geöffnet 8–16 Uhr', [480, 960]],
  ['de', 'Täglich 7:30–24:00 Uhr (sonntags und montags ab 7:00 Uhr)', [420, 450, 1440]],
  ['ru', 'Сб–чт 8:00–11:30 и 16:00–23:00 · пт 16:00–23:00', [480, 690, 960, 1380]],
  ['ru', 'Осмотр занимает 1–2 часа', []],
  ['ur', 'ہفتہ تا جمعرات صبح 8 بجے سے صبح 11:30 بجے تک اور شام 4 بجے سے رات 11 بجے تک', [480, 690, 960, 1380]],
  ['ur', 'روزانہ صبح 8 بجے سے دوپہر 12 بجے تک اور سہ پہر 3 بجے سے شام 7:30 بجے تک', [480, 720, 900, 1170]],
  ['ur', 'روزانہ صبح 8 بجے سے رات 12 بجے تک', [480, 1440]],
  ['ur', '24 گھنٹے کھلا رہتا ہے', []],
  ['tr', "Her gün 07.30–24.00 (Pazar ve Pazartesi 07.00'den · Cuma 14.30'dan)", [420, 450, 870, 1440]],
  ['tr', 'Vahada 2,5 milyondan fazla hurma ağacı, 1.563 hektar', []],
];
console.log('clock times');
for (const [lang, text, want] of TIMES) {
  const got = clockTimes(text, lang);
  report(JSON.stringify(got.times) === JSON.stringify(want) && got.unclear.length === 0, `${lang} «${text.slice(0, 44)}»`, `${JSON.stringify(got)} ≠ ${JSON.stringify(want)}`);
}
report(clockTimes('من 8:00 إلى 11:00', 'ar').unclear.length === 2, 'ar «8:00» بلا ص/م مبهم لا يُحسم');

// ── قراءة الأيام ──
const ALL = 'Sa Su Mo Tu We Th Fr';
const DAYS = [
  ['ar', 'السبت–الخميس 8 ص–4 م · الجمعة مغلق', ALL, 'Fr', false],
  ['ar', 'الأحد - الخميس: 8:00 ص - 2:30 م (مغلق الجمعة والسبت)', ALL, 'Sa Fr', false],
  ['ar', 'يومياً 7:30 ص – 12 منتصف الليل (الأحد والاثنين من 7 ص · الجمعة من 2:30 م)', 'Su Mo Fr', 'Su Mo Fr', true],
  ['en', 'Saturday to Thursday 8 am–4 pm; closed on Friday', ALL, 'Fr', false],
  ['en', 'Daily 4:00 pm – midnight (fountain shows after sunset)', '', '', true],
  ['zh', '周六至周四 8:00–16:00，周五闭馆', ALL, 'Fr', false],
  ['de', 'Sa.–Do. 8–16 Uhr · Fr. geschlossen, so früh wie möglich', ALL, 'Fr', false],
  ['ru', 'С субботы по четверг 8:00–16:00, в пятницу — выходной', ALL, 'Fr', false],
  ['ru', 'Ежедневно 7:30–24:00 (по воскресеньям и понедельникам с 7:00 · по пятницам с 14:30)', 'Su Mo Fr', 'Su Mo Fr', true],
  ['ur', 'ہفتہ تا جمعرات صبح 8 بجے سے شام 4 بجے تک · جمعہ کو بند', ALL, 'Fr', false],
  ['tr', "Cumartesi'den Perşembe'ye 08.00–16.00 · Cuma kapalı", ALL, 'Fr', false],
  ['tr', 'Pazar–Perşembe 08.00–14.30 (cuma ve cumartesi kapalı)', ALL, 'Sa Fr', false],
];
console.log('day names');
for (const [lang, text, days, singles, daily] of DAYS) {
  const got = dayMentions(text, lang);
  report(got.days.join(' ') === days && got.singles.join(' ') === singles && got.daily === daily, `${lang} «${text.slice(0, 44)}»`, JSON.stringify(got));
}

// ── اليوم المخصوص بموعد: القرب من وقت لا مجرد الذكر ──
const NEAR = [
  ['ar', 'يفتح من 8 ص إلى 12 ظهراً ومن 3:30 ع إلى 10 م (الجمعة مساءً فقط)، والدخول مجاني.', 'Fr'],
  ['ar', 'بجواره مسجد جواثا، أول موضع أُقيمت فيه الجمعة بعد المسجد النبوي، وموقع جواثا الأثري. وجهة للنزهات العائلية تفتح يومياً من 8 ص إلى 12 منتصف الليل', ''],
  ['en', 'Open Sat–Thu 8–11:30 am and 4–11 pm, Fri 4–11 pm only, free entry.', 'Fr'],
  ['en', 'beside it stands the mosque where Friday prayer was first held after the Prophet\'s Mosque, and the archaeological site. Open daily 8 am to midnight', ''],
  ['de', 'Sa.–Do. 8–16 Uhr · Fr. geschlossen', 'Fr'],
  ['tr', 'Her gün 07.30–24.00 (Pazar ve Pazartesi 07.00\'den · Cuma 14.30\'dan)', 'Su Mo Fr'],
];
console.log('days named next to a time');
for (const [lang, text, want] of NEAR) report(daysNearTimes(text, lang).join(' ') === want, `${lang} «${text.slice(0, 44)}»`, daysNearTimes(text, lang).join(' '));

// ── حلقة الكسر على بيانات المصدر ──
const files = collectAttractionFiles(process.cwd());
const base = checkHoursProse(files);
console.log(`source: ${base.problems.length} problems (${JSON.stringify(base.stats)})`);
for (const p of base.problems.slice(0, 6)) console.log(`    ${p}`);
ok &&= base.problems.length === 0;

const copy = () => structuredClone(files);
const file = (fs, slug) => fs.find((f) => f.slug === slug) ?? { data: { practical: [{}], hoursSpec: [{}], faq: [{}] }, body: '' };
const hoursRow = (f) => f.data.practical.find((r) => r.label === 'المواعيد') ?? {};
/** يبدّل في حقل نصاً بنص، ويُسقط الحقنة إن غاب النص (حتى لا تمرّ حقنة فارغة كأنها مُسكت). */
const swap = (obj, key, from, to) => { if (typeof obj[key] !== 'string' || !obj[key].includes(from)) throw new Error(`لا «${from}» في ${key}`); obj[key] = obj[key].replace(from, to); };
const run = (mutate) => { const fs = copy(); mutate(fs); return checkHoursProse(fs).problems; };
const inject = (label, mutate, expect) => {
  let problems;
  try { problems = run(mutate); } catch (e) { report(false, label, `الحقنة لم تُطبَّق: ${e.message}`); return; }
  const hit = problems.some((p) => p.includes(expect));
  report(hit, `caught ${label}`, `${problems.length} problems, none mentions «${expect}»: ${problems.slice(0, 2).join(' · ')}`);
};
const clean = (label, mutate) => {
  let problems;
  try { problems = run(mutate); } catch (e) { report(false, label, `التعديل لم يُطبَّق: ${e.message}`); return; }
  report(problems.length === 0, `clean  ${label}`, problems.slice(0, 2).join(' · '));
};

console.log('break loop');
inject('بند المواعيد بالإنجليزية وحدها تغيّر', (fs) => swap(hoursRow(file(fs, 'jabal-al-qarah')), 'value_en', '11:00 pm', '10:00 pm'), '«المواعيد» en يذكر');
inject('بند المواعيد بالتركية وحدها تغيّر', (fs) => swap(hoursRow(file(fs, 'jabal-al-qarah')), 'value_tr', '23.00', '22.00'), '«المواعيد» tr يذكر');
inject('بند المواعيد بالأوردو وحدها تغيّر', (fs) => swap(hoursRow(file(fs, 'jabal-al-qarah')), 'value_ur', 'رات 11 بجے', 'رات 10 بجے'), '«المواعيد» ur يذكر');
inject('بند المواعيد بالصينية وحدها تغيّر', (fs) => swap(hoursRow(file(fs, 'qaisariyah')), 'value_zh', '8:00–11:30', '9:00–11:30'), '«المواعيد» zh يذكر');
inject('بند المواعيد بالألمانية وحدها تغيّر', (fs) => swap(hoursRow(file(fs, 'qasr-ibrahim')), 'value_de', '8–16 Uhr', '8–17 Uhr'), '«المواعيد» de يذكر');
inject('بند المواعيد بالروسية وحدها تغيّر', (fs) => swap(hoursRow(file(fs, 'women-souq')), 'value_ru', '23:00', '22:00'), '«المواعيد» ru يذكر');
inject('hoursSpec تغيّر والبند على حاله', (fs) => { file(fs, 'jabal-al-qarah').data.hoursSpec[0].closes = '22:00'; }, 'بند المواعيد يذكر 08:00 23:00 وhoursSpec 08:00 22:00');
inject('الموعد حُدِّث في البند وhoursSpec وبقي النثر', (fs) => {
  const f = file(fs, 'jabal-al-qarah');
  f.data.hoursSpec[0].closes = '22:00';
  const row = hoursRow(f);
  swap(row, 'value', '11:00 م', '10:00 م'); swap(row, 'value_en', '11:00 pm', '10:00 pm');
  for (const l of ['zh', 'de', 'ru']) swap(row, `value_${l}`, '23:00', '22:00');
  swap(row, 'value_ur', 'رات 11 بجے', 'رات 10 بجے'); swap(row, 'value_tr', '23.00', '22.00');
}, 'jabal-al-qarah: answer يذكر 23:00');
inject('جواب سؤال شائع بالألمانية يخالف البطاقة', (fs) => swap(file(fs, 'qaisariyah').data.faq[0], 'a_de', '11:30', '12:30'), 'faq[0].a_de يذكر 12:30');
inject('المتن العربي يذكر موعداً ليس في البطاقة', (fs) => { file(fs, 'jabal-al-qarah').body += '\nيفتح الجبل أبوابه حتى 10 م.'; }, 'body يذكر 22:00');
inject('المتن التركي يذكر موعداً ليس في البطاقة', (fs) => { file(fs, 'jabal-al-qarah').data.body_tr += ' Kapanış 21.30.'; }, 'body_tr يذكر 21:30');
inject('hoursSpec يفتح القيصرية صباح الجمعة والبند يخصّها بالمساء', (fs) => { file(fs, 'qaisariyah').data.hoursSpec[0].days += ' Fr'; }, 'يخصّ Fr بالذكر');
inject('جواب يخصّ الجمعة بالذكر وساعاتها كبقية الأيام', (fs) => swap(file(fs, 'jabal-al-qarah').data, 'answer', 'إلى 11:00 م', 'إلى 11:00 م (الجمعة مساءً فقط)'), 'answer يخصّ Fr بالذكر');
inject('جواب سؤال شائع بالروسية يخصّ يوماً ساعاته كغيره', (fs) => { file(fs, 'women-souq').data.faq[0].a_ru += ' По пятницам — только вечером.'; }, 'faq[0].a_ru يخصّ Fr بالذكر');
inject('البند لا يسمّي يوم الإغلاق', (fs) => {
  const row = hoursRow(file(fs, 'qasr-ibrahim'));
  swap(row, 'value', 'السبت–الخميس 8 ص–4 م · الجمعة مغلق', 'يومياً 8 ص–4 م');
}, 'Fr تختلف ساعاته');
inject('يوم تغيّر في لغة واحدة', (fs) => swap(hoursRow(file(fs, 'qaisariyah')), 'value_en', 'Sat–Thu', 'Sun–Thu'), '«المواعيد» en يسمّي');
inject('«يومياً» سقطت من لغة واحدة', (fs) => swap(hoursRow(file(fs, 'women-souq')), 'value_de', 'Täglich ', ''), '«المواعيد» de يسمّي');
// «8:00 – 11:00 م» يرث فيه الأول فترة الثاني (مدى)، فالمبهم هو الطرف الأخير بلا فترة
inject('وقت بلا ص/م في البند العربي', (fs) => swap(hoursRow(file(fs, 'jabal-al-qarah')), 'value', '11:00 م', '11:00'), 'وقت بلا فترة محسومة');
inject('بند المواعيد فقد توثيقه وhoursSpec قائم', (fs) => { hoursRow(file(fs, 'women-souq')).verified = false; }, 'يلزمه بند مواعيد موثّق واحد');
inject('معلم بلا hoursSpec: الأوردو تخالف العربية', (fs) => swap(hoursRow(file(fs, 'national-park')), 'value_ur', 'شام 6 بجے', 'شام 7 بجے'), '«المواعيد» ur يذكر');
inject('معلم بلا hoursSpec: جواب إنجليزي يخالف البطاقة', (fs) => swap(file(fs, 'jawatha-mosque').data, 'answer_en', '8 am', '9 am'), 'answer_en يذكر 09:00');
inject('الحارس الفارغ', (fs) => { fs.length = 3; }, 'الحدّ الأدنى');

clean('رسم تغيّر (رقم ليس وقتاً)', (fs) => { for (const f of fs) for (const r of f.data.practical ?? []) if (r.label === 'الرسوم') r.value += ' 60 ريالاً'; });
clean('نثر فيه أرقام ليست أوقاتاً', (fs) => { for (const f of fs) { f.body += '\nتضم الواحة أكثر من 2.5 مليون نخلة على 1563 هكتاراً، وتبعد 12 كم.'; f.data.body_en = `${f.data.body_en ?? ''} Some 2.5 million palms; 12 km away; 24 hours.`; } });
clean('المتن يسمّي يوماً في سياق ليس موعداً', (fs) => { file(fs, 'jabal-al-qarah').body += '\nيزدحم الجبل يوم الجمعة بعد الصلاة.'; });
clean('جواب يسمّي الجمعة بعيداً عن الوقت', (fs) => { file(fs, 'jabal-al-qarah').data.answer = 'أول موضع أُقيمت فيه الجمعة بعد المسجد النبوي، وموقع أثري قديم في الواحة. ' + file(fs, 'jabal-al-qarah').data.answer; });
clean('معلم مفتوح 24 ساعة يحمل hoursSpec ليوم كامل', (fs) => {
  const hours = (f) => (f.data.practical ?? []).filter((r) => /مواعيد|ساعات/.test(r.label ?? ''));
  const f = fs.find((x) => !x.data.hoursSpec?.length && hours(x).length === 1 && hours(x)[0].label === 'المواعيد' && hours(x)[0].value.includes('24 ساعة'));
  if (!f) throw new Error('لا معلم ببند «24 ساعة» وحيد');
  hours(f)[0].verified = true;
  f.data.hoursSpec = [{ days: 'Mo Tu We Th Fr Sa Su', opens: '00:00', closes: '23:59' }];
});
clean('النثر يذكر وقتاً من البطاقة', (fs) => { file(fs, 'jabal-al-qarah').body += '\nيغلق الجبل 11 م.'; });

console.log(ok ? 'HOURS-PROSE TEST OK' : 'HOURS-PROSE TEST FAILED');
process.exit(ok ? 0 : 1);
