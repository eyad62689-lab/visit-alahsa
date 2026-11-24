// اختبار مقارن المواعيد (tools/automation/attraction-hours.mjs): الدوال النقية بمعالم مصطنعة، ثم حلقة كسر
// على ملفات المعالم الفعلية بردود مصطنعة — لكل معلم تُبنى قائمة تطابق ملفه فيجب أن يمرّ، ثم تُكسر القائمة
// في الذاكرة فيجب أن يُمسك. الفحوص المسمّاة تعمل على معالم مصطنعة لا على ملفات بعينها، فتعديل موعد معلم
// لا يُسقط الاختبار. لا نداء شبكي: fetch محقون.
//   node tools/test-attraction-hours.mjs
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectAttractionFiles } from './check-hours-prose.mjs';
import {
  MAX_RESOLVE_METERS, WEEK, compareWeeks, evaluate, fetchPlace, isPlaceId, metersBetween, pickCandidate,
  placeWeek, runCompare, runResolve, showDay, showTime, siteFacts, siteWeek,
} from './automation/attraction-hours.mjs';

let ok = true;
const report = (good, label, detail = '') => { console.log(`  ${good ? 'ok    ' : 'FAILED'} ${label}${good || !detail ? '' : ' ⇐ ' + detail}`); ok &&= good; };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const attractions = collectAttractionFiles(root);

// ── أدوات بناء الرد المصطنع ──
const point = (day, m) => ({ day, hour: Math.floor(m / 60), minute: m % 60 });
/** جدول أسبوعي ⇒ periods كما تعيدها الواجهة. */
const toPeriods = (week) => {
  const periods = [];
  WEEK.forEach((d, i) => {
    for (const [o, c] of week[d]) {
      periods.push({ open: point(i, o), close: c >= 1440 ? point((i + 1) % 7, c - 1440) : point(i, c) });
    }
  });
  return periods;
};
const daily = (...intervals) => Object.fromEntries(WEEK.map((d) => [d, intervals.map((x) => [...x])]));
const clone = (week) => Object.fromEntries(WEEK.map((d) => [d, week[d].map((x) => [...x])]));
const pairs = (times) => { const out = []; for (let i = 0; i + 1 < times.length; i += 2) out.push([times[i], times[i + 1]]); return out; };
const OPEN = 'OPERATIONAL';
const ALWAYS = [{ open: { day: 0, hour: 0, minute: 0 } }];

// ── معالم مصطنعة: صنف لكل حالة ──
const row = (value, label = 'المواعيد', verified = true) => ({ label, value, verified });
const HOFUF = { lat: 25.3789, lng: 49.5868 };
const FIX = {
  split: { title: 'سوق بفترتين', category: 'market', location: HOFUF, practical: [row('السبت–الخميس 8–11:30 ص و4–11 م · الجمعة 4–11 م')],
    hoursSpec: [{ days: 'Mo Tu We Th Sa Su', opens: '08:00', closes: '11:30' }, { days: 'Mo Tu We Th Fr Sa Su', opens: '16:00', closes: '23:00' }] },
  fridayOff: { title: 'قصر يغلق الجمعة', category: 'historic', location: HOFUF, practical: [row('السبت–الخميس 8 ص–4 م · الجمعة مغلق')],
    hoursSpec: [{ days: 'Mo Tu We Th Sa Su', opens: '08:00', closes: '16:00' }] },
  lateNight: { title: 'منتزه حتى منتصف الليل', category: 'parks', location: HOFUF, practical: [row('يومياً 8 ص – 12 منتصف الليل')],
    hoursSpec: [{ days: 'Mo Tu We Th Fr Sa Su', opens: '08:00', closes: '23:59' }] },
  rowOnly: { title: 'متحف ببند بلا جدول', category: 'museum', location: HOFUF, practical: [row('يومياً: 4:00 م - 10:00 م')] },
  weekdays: { title: 'متحف أيام العمل', category: 'museum', location: HOFUF, practical: [row('الأحد - الخميس: 8:00 ص - 2:30 م (مغلق الجمعة والسبت)')] },
  always: { title: 'حديقة مفتوحة', category: 'parks', location: HOFUF, practical: [row('مفتوح على مدار الساعة (24 ساعة)')] },
  mountain: { title: 'جبل مفتوح', category: 'nature', openSite: true, location: HOFUF, practical: [row('مفتوح على مدار الساعة (24 ساعة)', 'المواعيد والدخول')] },
  shut: { title: 'مدرسة مغلقة', category: 'historic', location: HOFUF, practical: [row('مغلق مؤقتاً')] },
  restoring: { title: 'قصر يُرمَّم', category: 'historic', location: HOFUF, practical: [row('مغلق حالياً لأعمال الترميم', 'الوضع الحالي')] },
  mosque: { title: 'مسجد عامل', category: 'religious', location: HOFUF, practical: [row('متاحة، مع اللباس المحتشم', 'الزيارة'), row('8 ص–12 منتصف الليل', 'مواعيد المنتزه المجاور')] },
  mosqueVague: { title: 'مسجد ببند بلا وقت', category: 'religious', location: HOFUF, practical: [row('مفتوح مع أوقات فتح القصر')] },
  bare: { title: 'معلم بلا بند', category: 'market', location: HOFUF, practical: [row('معلم تراثي', 'الوضع الحالي')] },
  evening: { title: 'متحف بالحجز', category: 'museum', location: HOFUF, practical: [row('الفترة المسائية (بالحجز والاتصال المسبق)')] },
  lake: { title: 'بحيرة', category: 'nature', openSite: true, location: HOFUF, practical: [] },
  draft: { title: 'بند غير موثّق', category: 'farm', location: HOFUF, practical: [row('يومياً: 4:00 م - 10:00 م', 'المواعيد', false)] },
};
const facts = (name) => siteFacts(FIX[name]);
const verdictOf = (name, place) => evaluate(facts(name), place).verdict;

// ── placeWeek ──
console.log('place week');
report(placeWeek([]) === undefined && placeWeek(undefined) === undefined, 'بلا فترات ⇒ لا جدول');
{
  const all = placeWeek(ALWAYS);
  report(all.odd.length === 0 && WEEK.every((d) => same(all.week[d], [[0, 1440]])), 'فترة واحدة بلا إغلاق ⇒ مفتوح دائماً');
  const w = placeWeek([
    { open: point(6, 960), close: point(6, 1380) },
    { open: point(6, 480), close: point(6, 690) },
    { open: point(5, 960), close: point(6, 0) },
    { open: point(4, 960), close: { day: 4, hour: 23, minute: 59 } },
    { open: point(3, 1080), close: point(4, 60) },
  ]);
  report(same(w.week.Sa, [[480, 690], [960, 1380]]), 'فترتان في يوم تُرتَّبان');
  report(same(w.week.Fr, [[960, 1440]]), 'الإغلاق 00:00 من اليوم التالي ⇒ منتصف الليل');
  report(same(w.week.Th, [[960, 1440]]), 'الإغلاق 23:59 ⇒ منتصف الليل');
  report(same(w.week.We, [[1080, 1500]]), 'الإغلاق 1:00 من اليوم التالي يبقى على يوم الفتح');
  report(same(w.week.Su, []) && w.odd.length === 0, 'يوم بلا فترة مغلق');
  const odd = placeWeek([{ open: point(1, 600), close: point(4, 600) }, { open: { day: 9, hour: 1 }, close: point(1, 0) }, { open: point(2, 600) }]);
  report(odd.odd.length === 3, 'فترة تمتد أياماً أو بيوم خاطئ أو بلا إغلاق بين فترات ⇒ غير مفهومة', JSON.stringify(odd.odd));
}

// ── siteWeek و siteFacts ──
console.log('site week · site facts');
{
  const q = siteWeek(FIX.split.hoursSpec);
  report(same(q.Fr, [[960, 1380]]) && same(q.Sa, [[480, 690], [960, 1380]]), 'الجمعة مساءً وحده، وبقية الأيام فترتان');
  report(same(siteWeek(FIX.fridayOff.hoursSpec).Fr, []), 'يوم غائب عن hoursSpec مغلق');
  report(same(siteWeek(FIX.lateNight.hoursSpec).Mo, [[480, 1440]]), '23:59 في hoursSpec ⇒ منتصف الليل');
  report(same(siteWeek([{ days: 'Fr', opens: '16:00', closes: '01:00' }]).Fr, [[960, 1500]]), 'إغلاق قبل الفتح ⇒ بعد منتصف الليل');
  report(siteWeek([]) === undefined && siteWeek(undefined) === undefined, 'بلا hoursSpec ⇒ لا جدول');
  report(siteWeek([{ days: 'Xx', opens: '08:00', closes: '10:00' }]) === undefined, 'يوم مجهول ⇒ لا جدول');
  report(siteWeek([{ days: 'Mo', opens: '8:00', closes: '10:00' }]) === undefined, 'وقت بصيغة خاطئة ⇒ لا جدول');

  report(same(facts('rowOnly').times, [960, 1320]) && facts('rowOnly').daily === true, 'بند «يومياً: 4:00 م - 10:00 م» ⇒ وقتان ويومي');
  report(same(facts('weekdays').times, [480, 870]) && facts('weekdays').daily === false && facts('weekdays').closed === false, '«مغلق الجمعة والسبت» ليس إغلاقاً مؤقتاً ولا «يومياً»');
  report(facts('shut').closed && facts('restoring').closed, 'الإغلاق يُقرأ من بند المواعيد ومن بند الحالة');
  report(facts('mosque').rows === 0 && facts('mosque').times === undefined, 'مواعيد المنتزه المجاور ليست مواعيد المعلم');
  report(facts('draft').rows === 0 && facts('draft').times === undefined, 'بند غير موثّق لا يُقرأ');
  report(facts('always').allDay && facts('mountain').allDay && facts('mountain').openSite, '«24 ساعة» تُقرأ من «المواعيد» ومن «المواعيد والدخول»');
  report(facts('evening').rows === 1 && facts('evening').times === undefined, 'بند بلا وقت ⇒ بلا أوقات');
}

// ── العرض والمقارنة ──
console.log('compare');
report(showTime(480) === '8:00' && showTime(1440) === '24:00' && showTime(1500) === '1:00 من اليوم التالي', 'عرض الوقت');
report(showDay([]) === 'مغلق' && showDay([[480, 690], [960, 1380]]) === '8:00–11:30، 16:00–23:00', 'عرض اليوم');
{
  const a = daily([480, 1380]);
  report(compareWeeks(a, clone(a)).length === 0, 'جدولان متطابقان ⇒ لا اختلاف');
  const b = clone(a); b.Fr = []; b.Sa = [[540, 1380]]; b.Su = [[540, 1380]];
  const diff = compareWeeks(a, b);
  report(diff.length === 2 && same(diff[0], { days: ['Sa', 'Su'], site: '8:00–23:00', kind: 'hours' }) && same(diff[1], { days: ['Fr'], site: '8:00–23:00', kind: 'shut' }), 'الاختلاف يُجمع بالنوع وقيمة الموقع', JSON.stringify(diff));
  const c = clone(a); c.Fr = [];
  report(same(compareWeeks(c, a), [{ days: ['Fr'], site: 'مغلق', kind: 'open' }]), 'الموقع يغلق يوماً تفتحه القائمة');
}

// ── الأحكام على المعالم المصطنعة ──
console.log('verdicts — fixtures');
{
  const some = toPeriods(daily([480, 960]));
  report(verdictOf('split', { status: OPEN, periods: toPeriods(siteWeek(FIX.split.hoursSpec)) }) === 'match', 'جدول يطابق القائمة ⇒ تطابق');
  const friAm = siteWeek(FIX.split.hoursSpec); friAm.Fr = [[480, 690], [960, 1380]];
  const friRes = evaluate(facts('split'), { status: OPEN, periods: toPeriods(friAm) });
  report(friRes.verdict === 'conflict' && friRes.notes.length === 1 && friRes.notes[0].startsWith('الجمعة — الموقع: 16:00–23:00'), 'القائمة تفتح الجمعة صباحاً ⇒ تعارض يسمّي الجمعة وحدها', friRes.notes.join(' / '));
  const friOpen = siteWeek(FIX.fridayOff.hoursSpec); friOpen.Fr = [[960, 1200]];
  report(evaluate(facts('fridayOff'), { status: OPEN, periods: toPeriods(friOpen) }).notes[0]?.includes('القائمة تفتح هذا اليوم'), 'الموقع يغلق الجمعة والقائمة تفتحها ⇒ تعارض مسمّى');
  report(verdictOf('lateNight', { status: OPEN, periods: toPeriods(daily([480, 1440])) }) === 'match', 'منتصف الليل: 23:59 في الموقع = 00:00 التالي في القائمة');
  report(verdictOf('lateNight', { status: OPEN, periods: toPeriods(daily([480, 1500])) }) === 'conflict', 'القائمة تمتد إلى 1:00 ⇒ تعارض');
  report(verdictOf('rowOnly', { status: OPEN, periods: toPeriods(daily([960, 1320])) }) === 'match', 'بند بلا جدول: أوقاته أوقات القائمة ⇒ تطابق');
  report(verdictOf('rowOnly', { status: OPEN, periods: toPeriods(daily([960, 1350])) }) === 'conflict', 'بند بلا جدول: إغلاق مختلف ⇒ تعارض');
  const noFri = daily([960, 1320]); noFri.Fr = [];
  report(verdictOf('rowOnly', { status: OPEN, periods: toPeriods(noFri) }) === 'conflict', 'بند «يومياً» والقائمة تغلق الجمعة ⇒ تعارض');
  const wk = daily([480, 870]); wk.Fr = []; wk.Sa = [];
  report(verdictOf('weekdays', { status: OPEN, periods: toPeriods(wk) }) === 'match', 'بند بأيام محددة: يكفي تطابق الأوقات');
  report(verdictOf('always', { status: OPEN, periods: ALWAYS }) === 'match', '24 ساعة في الطرفين ⇒ تطابق');
  report(verdictOf('always', { status: OPEN, periods: some }) === 'conflict', '24 ساعة والقائمة بساعات محدودة ⇒ تعارض');
  report(verdictOf('always', { status: OPEN, periods: [] }) === 'uncomparable', 'حديقة 24 ساعة وقائمة بلا ساعات ⇒ لا يُقارن');
  report(verdictOf('mountain', { status: OPEN, periods: [] }) === 'skipped', 'موقع مفتوح وقائمة بلا ساعات ⇒ مستثنى');
  report(verdictOf('shut', { status: 'CLOSED_TEMPORARILY', periods: [] }) === 'match', 'مغلق في الطرفين ⇒ تطابق');
  report(verdictOf('shut', { status: OPEN, periods: some }) === 'conflict', 'الموقع مغلق والقائمة عاملة ⇒ تعارض');
  report(verdictOf('restoring', { status: OPEN, periods: [] }) === 'conflict', 'بند الحالة «مغلق حالياً» والقائمة عاملة ⇒ تعارض');
  report(verdictOf('shut', { status: null, periods: [] }) === 'uncomparable', 'الموقع مغلق والقائمة بلا حالة ⇒ لا يُقارن');
  report(verdictOf('split', { status: 'CLOSED_TEMPORARILY', periods: [] }) === 'conflict', 'القائمة مغلقة مؤقتاً والموقع يعرض مواعيد ⇒ تعارض');
  report(verdictOf('lake', { status: 'CLOSED_PERMANENTLY', periods: [] }) === 'conflict', 'إغلاق نهائي في القائمة ⇒ تعارض ولو كان الموقع مفتوحاً');
  report(verdictOf('mosque', { status: OPEN, periods: some }) === 'skipped', 'مسجد بلا بند مواعيد ⇒ مستثنى ولو حملت قائمته ساعات');
  report(verdictOf('mosqueVague', { status: OPEN, periods: some }) === 'skipped', 'معلم ديني ببند بلا وقت ⇒ مستثنى');
  report(verdictOf('bare', { status: OPEN, periods: some }) === 'info', 'معلم بلا بند وللقائمة ساعات ⇒ للعلم');
  report(verdictOf('bare', { status: OPEN, periods: [] }) === 'skipped', 'معلم بلا بند وقائمة بلا ساعات ⇒ مستثنى');
  report(verdictOf('draft', { status: OPEN, periods: some }) === 'info', 'بند غير موثّق يُعامل كغائب ⇒ للعلم');
  report(verdictOf('evening', { status: OPEN, periods: some }) === 'uncomparable', 'بند «الفترة المسائية» بلا وقت ⇒ لا يُقارن');
  report(verdictOf('lake', { status: OPEN, periods: some }) === 'skipped', 'موقع مفتوح بلا بند ⇒ مستثنى');
  report(verdictOf('split', { status: OPEN, periods: [{ open: point(1, 600), close: point(4, 600) }] }) === 'uncomparable', 'فترة غير مفهومة ⇒ لا يُحكم بتطابق ولا تعارض');
}

// ── حلقة الكسر على الملفات الفعلية ──
console.log('break loop — real attraction files');
const tally = { week: 0, times: 0, allDay: 0, closed: 0 };
for (const { slug, data } of attractions) {
  const site = siteFacts(data);
  if (site.closed) {
    tally.closed += 1;
    report(evaluate(site, { status: 'CLOSED_TEMPORARILY', periods: [] }).verdict === 'match', `${slug}: مغلق في الطرفين ⇒ تطابق`);
    report(evaluate(site, { status: OPEN, periods: toPeriods(daily([480, 960])) }).verdict === 'conflict', `${slug}: القائمة عاملة ⇒ تعارض`);
    continue;
  }
  report(evaluate(site, { status: 'CLOSED_TEMPORARILY', periods: [] }).verdict === 'conflict', `${slug}: القائمة مغلقة مؤقتاً ⇒ تعارض`);
  if (site.week) {
    tally.week += 1;
    const res = evaluate(site, { status: OPEN, periods: toPeriods(site.week) });
    report(res.verdict === 'match', `${slug}: قائمة تطابق hoursSpec ⇒ تطابق`, res.notes.join(' / '));
    const shifted = clone(site.week);
    const day = WEEK.find((d) => shifted[d].length > 0);
    shifted[day][0][0] += 30;
    report(evaluate(site, { status: OPEN, periods: toPeriods(shifted) }).verdict === 'conflict', `${slug}: فتح يتأخر 30 دقيقة في يوم ⇒ تعارض`);
    const shut = clone(site.week); shut[day] = [];
    const shutRes = evaluate(site, { status: OPEN, periods: toPeriods(shut) });
    report(shutRes.verdict === 'conflict' && shutRes.notes.some((n) => n.includes('القائمة تغلق هذا اليوم')), `${slug}: القائمة تغلق يوماً ⇒ تعارض مسمّى`);
    continue;
  }
  if (site.times) {
    tally.times += 1;
    const week = daily(...pairs(site.times));
    const res = evaluate(site, { status: OPEN, periods: toPeriods(week) });
    report(res.verdict === 'match', `${slug}: قائمة بأوقات البند ⇒ تطابق`, res.notes.join(' / '));
    const moved = clone(week); for (const d of WEEK) moved[d][0][0] += 30;
    report(evaluate(site, { status: OPEN, periods: toPeriods(moved) }).verdict === 'conflict', `${slug}: وقت فتح مختلف ⇒ تعارض`);
    const friday = clone(week); friday.Fr = [];
    const want = site.daily ? 'conflict' : 'match';
    report(evaluate(site, { status: OPEN, periods: toPeriods(friday) }).verdict === want, `${slug}: القائمة تغلق الجمعة ⇒ ${site.daily ? 'تعارض مع «يومياً»' : 'يمرّ (البند لا يقول يومياً)'}`);
    continue;
  }
  if (site.allDay) {
    tally.allDay += 1;
    report(evaluate(site, { status: OPEN, periods: ALWAYS }).verdict === 'match', `${slug}: 24 ساعة في الطرفين ⇒ تطابق`);
    report(evaluate(site, { status: OPEN, periods: toPeriods(daily([480, 1320])) }).verdict === 'conflict', `${slug}: القائمة بساعات محدودة ⇒ تعارض`);
  }
}
report(attractions.length > 0 && tally.week + tally.times > 0, 'الحلقة قرأت ملفات المعالم وقارنت مواعيد فعلية', `${attractions.length} ${JSON.stringify(tally)}`);
console.log(`  (المعالم ${attractions.length}: جدول ${tally.week}، بند بأوقات ${tally.times}، 24 ساعة ${tally.allDay}، مغلق ${tally.closed})`);

// ── المعرّف والمسافة والمرشّح ──
console.log('place id · distance · candidate');
const ID_A = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
const ID_B = 'ChIJrTLr-GyuEmsRBfy61i59si0';
report(isPlaceId(ID_A) && isPlaceId(ID_B), 'معرّف صالح');
for (const bad of ['', 'short', `${ID_A}/${ID_B}`, `${ID_A}:searchText`, `${ID_A}&x=1`, `${ID_A}/..`, `${ID_A}?key=x`, `${ID_A} `, `../${ID_A}`, `${ID_A}#`, `${ID_A}%2F`, 12345678901, null]) {
  report(!isPlaceId(bad), `معرّف مرفوض: ${JSON.stringify(bad)}`);
}
{
  const m = metersBetween(HOFUF, { lat: HOFUF.lat + 0.001, lng: HOFUF.lng });
  report(m >= 108 && m <= 114, 'جزء من ألف درجة عرضاً ≈ 111 م', String(m));
  report(metersBetween(HOFUF, HOFUF) === 0, 'النقطة ونفسها ⇒ 0');
  const near = { id: ID_A, displayName: { text: 'قريب' }, location: { latitude: HOFUF.lat + 0.0002, longitude: HOFUF.lng } };
  const far = { id: ID_B, displayName: { text: 'بعيد' }, location: { latitude: HOFUF.lat + 0.04, longitude: HOFUF.lng } };
  const pick = pickCandidate([far, near], HOFUF);
  report(pick.id === ID_A && pick.accepted === true && pick.meters < MAX_RESOLVE_METERS, 'يُختار الأقرب لا الأول');
  const onlyFar = pickCandidate([far], HOFUF);
  report(onlyFar.id === ID_B && onlyFar.accepted === false, 'مرشّح بعيد يُعرض ولا يُعتمد');
  report(pickCandidate([{ ...near, id: 'x/../y' }, { id: ID_B }], HOFUF) === undefined, 'نتيجة بمعرّف فاسد أو بلا إحداثيات تُهمل');
  report(pickCandidate([], HOFUF) === undefined && pickCandidate(undefined, HOFUF) === undefined, 'بلا نتائج ⇒ لا مرشّح');
}

// ── ملف المعرّفات الملتزم ──
console.log('committed place ids');
{
  const ids = JSON.parse(readFileSync(path.join(root, 'src', 'data', 'attraction-place-ids.json'), 'utf8'));
  const slugs = new Set(attractions.map((a) => a.slug));
  const entries = Object.entries(ids);
  report(ids !== null && typeof ids === 'object' && !Array.isArray(ids), 'الملف كائن slug ⇒ معرّف');
  report(entries.every(([, id]) => isPlaceId(id)), 'كل معرّف صالح الشكل', entries.filter(([, id]) => !isPlaceId(id)).map(([s]) => s).join(', '));
  report(entries.every(([slug]) => slugs.has(slug)), 'كل مفتاح يقابله ملف معلم', entries.filter(([s]) => !slugs.has(s)).map(([s]) => s).join(', '));
  report(new Set(entries.map(([, id]) => id)).size === entries.length, 'لا معرّف مكرر بين معلمين');
}

// ── التشغيل الكامل بنداء مصطنع ──
console.log('full run — injected fetch');
const KEY = 'test-key-not-real';
const reply = (data, status = 200) => ({ ok: status >= 200 && status < 300, status, json: async () => data });
const tail = (url) => String(url).split('/places/')[1]?.split('?')[0];
{
  const subset = ['split', 'lateNight', 'shut', 'bare', 'mosque'].map((slug) => ({ slug, data: FIX[slug] }));
  const ids = { split: 'ChIJ_fixture_split_01', lateNight: 'ChIJ_fixture_late_002', shut: 'ChIJ_fixture_shut_003', 'gone-slug': 'ChIJ_fixture_gone_004' };
  const matching = {
    [ids.split]: { displayName: { text: 'سوق بفترتين' }, businessStatus: OPEN, regularOpeningHours: { periods: toPeriods(siteWeek(FIX.split.hoursSpec)) } },
    [ids.lateNight]: { businessStatus: OPEN, regularOpeningHours: { periods: toPeriods(siteWeek(FIX.lateNight.hoursSpec)) } },
    [ids.shut]: { businessStatus: 'CLOSED_TEMPORARILY' },
  };
  const calls = [];
  const fetchFrom = (table) => async (url, init) => { calls.push({ url: String(url), init }); const hit = table[tail(url)]; return hit ? reply(hit) : reply({}, 404); };
  const base = { attractions: subset, ids, key: KEY, today: '2026-11-24' };

  const clean = await runCompare({ ...base, fetchImpl: fetchFrom(matching) });
  report(clean.exitCode === 0, 'كل القوائم تطابق ⇒ خروج 0', clean.markdown);
  report(calls.length === 3 && calls.every((c) => c.init.headers['X-Goog-Api-Key'] === KEY && c.init.headers['X-Goog-FieldMask'].includes('regularOpeningHours.periods')), 'نداء واحد لكل معلم له معرّف، بالمفتاح والقناع في الترويسة');
  report(calls.every((c) => !c.url.includes(KEY)), 'المفتاح لا يدخل الرابط');
  report(clean.markdown.includes('gone-slug') && clean.markdown.includes('بلا معرّف مكان (2)'), 'يذكر معرّفاً بلا ملف والمعالم التي بلا معرّف');
  report(!clean.markdown.includes(KEY), 'المفتاح لا يظهر في الملخص');

  // قائمة تخالف: الجمعة بوقتين مميّزين (13:37–21:13)، والمغلق عامل
  const wrongWeek = siteWeek(FIX.split.hoursSpec); wrongWeek.Fr = [[817, 1273]];
  const broken = {
    ...matching,
    [ids.split]: { businessStatus: OPEN, regularOpeningHours: { periods: toPeriods(wrongWeek) } },
    [ids.shut]: { businessStatus: OPEN },
  };
  const bad = await runCompare({ ...base, fetchImpl: fetchFrom(broken) });
  report(bad.exitCode === 1, 'تعارض ⇒ خروج 1');
  report(bad.markdown.includes('**split**') && bad.markdown.includes('الجمعة — الموقع: 16:00–23:00') && bad.markdown.includes('**shut**'), 'الملخص يسمّي المعلمين ويوم الاختلاف وقيمة الموقع', bad.markdown);
  report(!bad.markdown.includes('13:37') && !bad.markdown.includes('21:13'), 'ساعات القائمة لا تُطبع في الملخص');
  report(bad.markdown.includes(`place_id:${ids.split}`), 'الملخص يحمل رابط القائمة');
  report(!bad.markdown.includes('**lateNight**'), 'المطابق لا يُذكر في التعارضات');

  // إخفاق جزئي ثم كلي
  const partial = { ...matching }; delete partial[ids.lateNight];
  const some = await runCompare({ ...base, fetchImpl: fetchFrom(partial) });
  report(some.exitCode === 0 && some.markdown.includes('تعذّر جلبها') && some.markdown.includes('HTTP 404'), 'إخفاق نداء واحد يُذكر ولا يُسقط التشغيل');
  const none = await runCompare({ ...base, fetchImpl: fetchFrom({}) });
  report(none.exitCode === 1 && none.markdown.includes('أخفقت كل النداءات'), 'إخفاق كل النداءات ⇒ خروج 1');
  const thrown = await runCompare({ ...base, fetchImpl: async () => { throw new Error('network down'); } });
  report(thrown.exitCode === 1 && thrown.markdown.includes('network down'), 'استثناء الشبكة يُلتقط لكل معلم');
  const empty = await runCompare({ ...base, ids: {}, fetchImpl: async () => { throw new Error('must not be called'); } });
  report(empty.exitCode === 0 && empty.markdown.includes('لها معرّف مكان: 0'), 'بلا معرّفات ⇒ لا نداء وخروج 0');

  let touched = false;
  const refused = await fetchPlace('bad/../id', { key: KEY, fetchImpl: async () => { touched = true; return reply({}); } }).then(() => false, () => true);
  report(refused && !touched, 'معرّف فاسد يُرفض قبل أي نداء');
}

console.log('resolve — injected fetch');
{
  const subset = ['split', 'lateNight', 'bare'].map((slug) => ({ slug, data: FIX[slug] }));
  const at = (dLat) => ({ latitude: HOFUF.lat + dLat, longitude: HOFUF.lng });
  const bodies = [];
  const fetchImpl = async (url, init) => {
    const body = JSON.parse(init.body);
    bodies.push({ url: String(url), body, method: init.method });
    if (body.textQuery.startsWith(FIX.split.title)) {
      return reply({ places: [
        { id: ID_B, displayName: { text: 'مكان آخر' }, location: at(0.01) },
        { id: ID_A, displayName: { text: 'سوق بفترتين' }, location: at(0.0005) },
      ] });
    }
    return reply({ places: [{ id: ID_B, displayName: { text: 'بعيد' }, location: at(0.02) }] });
  };
  const out = await runResolve({ attractions: subset, ids: { lateNight: 'ChIJ_fixture_late_002' }, key: KEY, fetchImpl });
  report(bodies.length === 2 && bodies.every((b) => b.method === 'POST' && b.url.endsWith('places:searchText')), 'بحث واحد لكل معلم بلا معرّف، ولا بحث لمن له معرّف');
  report(bodies.every((b) => b.body.locationBias.circle.center.latitude === HOFUF.lat && b.body.regionCode === 'SA'), 'البحث مقيّد بإحداثيات المعلم');
  report(same(out.proposed, { split: ID_A }), 'يُقترح القريب وحده', JSON.stringify(out.proposed));
  report(out.markdown.includes('مرشّح بعيد لا يُعتمد') && out.exitCode === 0, 'البعيد يُعرض مرشّحاً ولا يدخل المقترح');
  const json = JSON.parse(out.markdown.split('```json\n')[1].split('\n```')[0]);
  report(same(Object.keys(json), ['lateNight', 'split']) && json.lateNight === 'ChIJ_fixture_late_002', 'المحتوى المقترح للملف مرتّب ويحفظ القائم');
  report(!out.markdown.includes(KEY), 'المفتاح لا يظهر في ملخص الاقتراح');
  const noLoc = await runResolve({ attractions: [{ slug: 'nowhere', data: { title: 'بلا إحداثيات' } }], ids: {}, key: KEY, fetchImpl: async () => { throw new Error('must not be called'); } });
  report(noLoc.markdown.includes('بلا إحداثيات في الملف') && same(noLoc.proposed, {}), 'معلم بلا إحداثيات لا يُبحث عنه');
}

// ── سطر الأوامر ──
console.log('command line');
{
  const tool = path.join(root, 'tools', 'automation', 'attraction-hours.mjs');
  const env = { ...process.env }; delete env.GOOGLE_PLACES_API_KEY;
  const idle = spawnSync(process.execPath, [tool], { env, encoding: 'utf8' });
  report(idle.status === 0 && idle.stdout.includes('خامل'), 'بلا مفتاح ⇒ خامل وخروج 0', `${idle.status} ${idle.stderr}`);
  const blank = spawnSync(process.execPath, [tool, '--resolve'], { env: { ...env, GOOGLE_PLACES_API_KEY: '' }, encoding: 'utf8' });
  report(blank.status === 0 && blank.stdout.includes('خامل'), 'مفتاح فارغ ⇒ خامل وخروج 0', `${blank.status} ${blank.stderr}`);
  const unknown = spawnSync(process.execPath, [tool, '--nope'], { env, encoding: 'utf8' });
  report(unknown.status === 2 && unknown.stderr.includes('خيار غير معروف'), 'خيار مجهول ⇒ خروج 2', `${unknown.status} ${unknown.stderr}`);
}

console.log(ok ? '\nATTRACTION-HOURS TEST OK' : '\nATTRACTION-HOURS TEST FAILED');
process.exitCode = ok ? 0 : 1;
