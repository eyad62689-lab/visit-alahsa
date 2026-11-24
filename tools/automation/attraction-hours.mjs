// مقارن مواعيد المعالم — يقابل ما في ملف كل معلم بقائمة مكانه في خرائط قوقل، عبر Places API (New).
//
// لماذا الواجهة لا قراءة الصفحة: صفحة القائمة لا تُقرأ بجلب آلي (هيكل بلا محتوى)، وكشطها مخالف لشروط
// قوقل (انظر tools/fetch-places.mjs). الواجهة تعيد الجدول الأسبوعي (regularOpeningHours.periods) وحالة
// المكان (businessStatus) منظَّمين، فالمقارنة حتمية بلا نموذج.
//
// ما يقارنه لكل معلم له معرّف مكان في src/data/attraction-place-ids.json:
//   - الحالة: بند «مغلق مؤقتاً» في الموقع مقابل حالة القائمة، في الاتجاهين.
//   - معلم له hoursSpec: يوماً بيوم، فترةً بفترة.
//   - معلم له بند مواعيد بأوقات وبلا hoursSpec: مجموعة الأوقات المذكورة مقابل أوقات القائمة، و«يومياً»
//     مقابل يوم تغلقه القائمة. (البند نص حر؛ قارئه قارئ C83 نفسه.)
//   - معلم بنده «24 ساعة»: القائمة مفتوحة اليوم كله.
// ما لا يقارنه: بند بلا وقت يُقرأ («الفترة المسائية بالحجز»)، ومعلم بلا معرّف، والمعالم الدينية التي
// لا بند مواعيد لها (لا يُحدَّد لزيارتها وقت — docs/content-rules.md القسم 3).
//
// لا يغيّر ملفاً ولا يخزّن شيئاً من بيانات قوقل: المخرج ملخص Markdown على المخرج القياسي يسمّي المعلم
// وأيام الاختلاف ونوعه وقيمة الموقع ورابط القائمة — وساعات القائمة نفسها لا تُطبع (الملخص يصير بلاغاً
// علنياً دائماً، وشروط قوقل تجيز تخزين المعرّف وحده)؛ من يعالج البلاغ يقرؤها من القائمة.
// رمز الخروج 1 عند تعارض (أو إخفاق كل النداءات)، و0 في سواه.
//
// المفتاح: متغير البيئة GOOGLE_PLACES_API_KEY. بلا مفتاح يخرج بنجاح ويقول إنه خامل.
//
// الاستعمال:
//   node tools/automation/attraction-hours.mjs            مقارنة المعالم التي لها معرّف
//   node tools/automation/attraction-hours.mjs --resolve  اقتراح معرّفات للمعالم التي بلا معرّف (بحث نصي
//        قرب إحداثيات المعلم)؛ يطبع المقترح ولا يكتبه — يُراجع بالاسم والمسافة ثم يُلتزم بطلب دمج.
// لا مسار ولا رابط من سطر الأوامر. المنطق في دوال نقية مصدَّرة يُختبر كسرها في tools/test-attraction-hours.mjs.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { clockTimes, collectAttractionFiles, dayMentions } from '../check-hours-prose.mjs';
import { minutes } from '../check-attraction-data.mjs';

/** ترتيب أيام الواجهة: 0 = الأحد. */
export const WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const SHOW_ORDER = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
const DAY_AR = { Sa: 'السبت', Su: 'الأحد', Mo: 'الاثنين', Tu: 'الثلاثاء', We: 'الأربعاء', Th: 'الخميس', Fr: 'الجمعة' };
const MIDNIGHT = 1440;
export const MAX_RESOLVE_METERS = 400;
const API = 'https://places.googleapis.com/v1/';
const DETAILS_MASK = 'id,displayName,businessStatus,regularOpeningHours.periods';
const SEARCH_MASK = 'places.id,places.displayName,places.location';

const emptyWeek = () => Object.fromEntries(WEEK.map((d) => [d, []]));
const sortWeek = (week) => { for (const d of WEEK) week[d].sort((a, b) => a[0] - b[0] || a[1] - b[1]); return week; };
const closeNorm = (m) => (m === 1439 ? MIDNIGHT : m);
/** في مجموعات الأوقات: 00:00 و23:59 ومنتصف الليل وقت واحد (اصطلاح C83). */
const setNorm = (m) => (m === 0 || m === 1439 ? MIDNIGHT : m);

/**
 * الجدول الأسبوعي من hoursSpec، أو undefined إن غاب أو تعذّرت قراءته.
 * @returns {Record<string, number[][]> | undefined}
 */
export function siteWeek(spec) {
  if (!Array.isArray(spec) || spec.length === 0) return undefined;
  const week = emptyWeek();
  for (const row of spec) {
    const o = minutes(row?.opens);
    const c = minutes(row?.closes);
    if (o === undefined || c === undefined || typeof row?.days !== 'string') return undefined;
    for (const d of row.days.split(' ')) {
      if (!Object.hasOwn(week, d)) return undefined;
      // إغلاق لا يتجاوز الفتح = بعد منتصف الليل، على تمثيل placeWeek نفسه
      week[d].push([o, c <= o ? MIDNIGHT + c : closeNorm(c)]);
    }
  }
  return sortWeek(week);
}

const isDayIndex = (d) => Number.isInteger(d) && d >= 0 && d <= 6;
const pointMinutes = (p) => (Number.isInteger(p?.hour) ? p.hour : 0) * 60 + (Number.isInteger(p?.minute) ? p.minute : 0);

/**
 * الجدول الأسبوعي من periods كما تعيدها الواجهة. الفترة التي تعبر منتصف الليل تبقى على يوم فتحها
 * بإغلاق يتجاوز 1440. odd: فترات لم تُفهم (تمنع الحكم بالتطابق).
 * @returns {{ week: Record<string, number[][]>, odd: string[] } | undefined}
 */
export function placeWeek(periods) {
  if (!Array.isArray(periods) || periods.length === 0) return undefined;
  const week = emptyWeek();
  // مفتوح دائماً: فترة واحدة تفتح بلا إغلاق
  if (periods.length === 1 && periods[0]?.open && !periods[0].close) {
    for (const d of WEEK) week[d].push([0, MIDNIGHT]);
    return { week, odd: [] };
  }
  const odd = [];
  for (const p of periods) {
    const od = p?.open?.day;
    const cd = p?.close?.day;
    if (!isDayIndex(od) || !isDayIndex(cd)) { odd.push(JSON.stringify(p)); continue; }
    const o = pointMinutes(p.open);
    const c = pointMinutes(p.close);
    const span = (cd - od + 7) % 7;
    if (span === 0 && c > o) week[WEEK[od]].push([o, closeNorm(c)]);
    else if (span === 1 && c <= o) week[WEEK[od]].push([o, MIDNIGHT + c]); // 00:00 من اليوم التالي = 1440
    else odd.push(JSON.stringify(p));
  }
  return { week: sortWeek(week), odd };
}

const two = (n) => String(n).padStart(2, '0');
/** دقائق ⇒ «8:00»، ومنتصف الليل «24:00»، وما بعده «1:00 من اليوم التالي». */
export function showTime(m) {
  if (m === MIDNIGHT) return '24:00';
  const next = m > MIDNIGHT;
  const v = next ? m - MIDNIGHT : m;
  return `${Math.floor(v / 60)}:${two(v % 60)}${next ? ' من اليوم التالي' : ''}`;
}
export const showDay = (intervals) => (intervals.length ? intervals.map(([o, c]) => `${showTime(o)}–${showTime(c)}`).join('، ') : 'مغلق');
const sameDay = (a, b) => a.length === b.length && a.every((x, i) => x[0] === b[i][0] && x[1] === b[i][1]);

const KIND_AR = { shut: 'القائمة تغلق هذا اليوم', open: 'القائمة تفتح هذا اليوم', hours: 'ساعات القائمة تختلف' };
const dayKind = (siteDay, placeDay) => {
  if (placeDay.length === 0) return 'shut';
  return siteDay.length === 0 ? 'open' : 'hours';
};

/**
 * الأيام التي يختلف فيها الجدولان، مجموعةً بقيمة الموقع ونوع الاختلاف (shut/open/hours).
 * قيمة القائمة لا تخرج من هنا: يكفي البلاغَ اليومُ والنوع.
 * @returns {{ days: string[], site: string, kind: 'shut' | 'open' | 'hours' }[]}
 */
export function compareWeeks(site, place) {
  const groups = new Map();
  for (const d of SHOW_ORDER) {
    if (sameDay(site[d], place[d])) continue;
    const kind = dayKind(site[d], place[d]);
    const key = `${showDay(site[d])}|${kind}`;
    if (!groups.has(key)) groups.set(key, { days: [], site: showDay(site[d]), kind });
    groups.get(key).days.push(d);
  }
  return [...groups.values()];
}

const isAllDay = (week) => WEEK.every((d) => week[d].length === 1 && week[d][0][0] === 0 && week[d][0][1] === MIDNIGHT);
const closedDays = (week) => SHOW_ORDER.filter((d) => week[d].length === 0);
/** أوقات الفتح والإغلاق في الجدول مجموعةً؛ الإغلاق بعد منتصف الليل يُردّ إلى ساعته (1:00) كما يكتبه البند. */
const weekTimes = (week) => {
  const set = new Set();
  for (const d of WEEK) for (const [o, c] of week[d]) { set.add(setNorm(o)); set.add(setNorm(c > MIDNIGHT ? c - MIDNIGHT : c)); }
  return [...set].sort((a, b) => a - b);
};
const namesOf = (days) => days.map((d) => DAY_AR[d]).join('، ');
const isHoursLabel = (label) => { const t = String(label ?? ''); return t.includes('المواعيد') || t.includes('ساعات'); };

/**
 * ما يقوله ملف المعلم عن مواعيده، من بنوده الموثّقة وحدها.
 * @returns {{ rows: number, closed: boolean, week: Record<string, number[][]> | undefined, allDay: boolean,
 *             times: number[] | undefined, daily: boolean, openSite: boolean, religious: boolean, text: string }}
 */
export function siteFacts(data) {
  const verified = (Array.isArray(data?.practical) ? data.practical : []).filter((r) => r?.verified === true);
  const rows = verified.filter((r) => isHoursLabel(r.label));
  const values = rows.map((r) => String(r.value ?? ''));
  // الإغلاق يُكتب في بند المواعيد («مغلق مؤقتاً») أو في بند حالة («الوضع الحالي: مغلق حالياً…») — أيّ بند موثّق
  const closed = verified.some((r) => { const v = String(r.value ?? ''); return v.includes('مغلق مؤقت') || v.includes('مغلق حالي'); });
  let times;
  let daily = false;
  for (const v of values) {
    const read = clockTimes(v, 'ar');
    if (times || read.unclear.length || read.times.length < 2) continue;
    times = read.times.map(setNorm).filter((t, i, all) => all.indexOf(t) === i).sort((a, b) => a - b);
    daily = dayMentions(v, 'ar').daily;
  }
  return {
    rows: rows.length,
    closed,
    week: siteWeek(data?.hoursSpec),
    allDay: values.some((v) => v.includes('24 ساعة')),
    times,
    daily,
    openSite: data?.openSite === true,
    religious: data?.category === 'religious',
    text: values.join(' | '),
  };
}

const result = (verdict, notes = []) => ({ verdict, notes });

/** حكم الحالة: يُرجع نتيجة حين تحسم حالة الإغلاق الأمر، وإلا undefined فتُقارن الساعات. */
function statusVerdict(site, status) {
  const placeClosed = status === 'CLOSED_TEMPORARILY' || status === 'CLOSED_PERMANENTLY';
  if (site.closed) {
    if (placeClosed) return result('match');
    if (status === 'OPERATIONAL') return result('conflict', ['الموقع يذكر إغلاقاً والقائمة تعرض المكان عاملاً']);
    return result('uncomparable', ['الموقع يذكر إغلاقاً والقائمة بلا حالة']);
  }
  if (!placeClosed) return undefined;
  return result('conflict', [`القائمة تعرض المكان ${status === 'CLOSED_PERMANENTLY' ? 'مغلقاً نهائياً' : 'مغلقاً مؤقتاً'} والموقع لا يذكر إغلاقاً`]);
}

/** بند بأوقات وبلا hoursSpec: مجموعة الأوقات، و«يومياً» مقابل أيام تغلقها القائمة. */
function timesVerdict(site, week) {
  const notes = [];
  const listed = weekTimes(week);
  if (listed.length !== site.times.length || listed.some((t, i) => t !== site.times[i])) {
    notes.push(`أوقات البند (${site.times.map(showTime).join('، ')}) لا تطابق أوقات القائمة — البند: «${site.text}»`);
  }
  const shut = closedDays(week);
  if (site.daily && shut.length) notes.push(`البند يقول «يومياً» والقائمة تغلق: ${namesOf(shut)}`);
  return result(notes.length ? 'conflict' : 'match', notes);
}

/** حكم الساعات حين للقائمة جدول مفهوم. */
function hoursVerdict(site, week) {
  if (site.week) {
    const notes = compareWeeks(site.week, week).map((g) => `${namesOf(g.days)} — الموقع: ${g.site}؛ ${KIND_AR[g.kind]}`);
    return result(notes.length ? 'conflict' : 'match', notes);
  }
  if (site.times) return timesVerdict(site, week);
  if (site.allDay) return isAllDay(week) ? result('match') : result('conflict', ['البند يقول «24 ساعة» والقائمة بساعات محدودة']);
  if (site.openSite || site.religious) return result('skipped');
  if (site.rows > 0) return result('uncomparable', [`بند المواعيد بلا وقت يُقرأ: «${site.text}»`]);
  return result('info');
}

/**
 * يحكم على معلم واحد. place: ما أعادته الواجهة ({ status, periods }).
 * verdict: conflict تعارض · match تطابق · info للقائمة ساعات ولا بند في الموقع · uncomparable لا يُقارن · skipped مستثنى.
 * @returns {{ verdict: 'conflict' | 'match' | 'info' | 'uncomparable' | 'skipped', notes: string[] }}
 */
export function evaluate(site, place) {
  const byStatus = statusVerdict(site, place?.status ?? null);
  if (byStatus) return byStatus;
  const pw = placeWeek(place?.periods);
  if (!pw) {
    // الموقع المفتوح (جبل، بحيرة، شاطئ) قد لا تحمل قائمته ساعات أصلاً — ليس ذلك نقصاً يُبلَّغ
    const claims = Boolean(site.week || site.times || site.allDay) && !site.openSite;
    return claims ? result('uncomparable', ['القائمة بلا ساعات']) : result('skipped');
  }
  if (pw.odd.length) return result('uncomparable', [`في القائمة فترات لم تُفهم (${pw.odd.length})`]);
  return hoursVerdict(site, pw.week);
}

const isIdChar = (ch) => (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || ch === '_' || ch === '-';
/** معرّف مكان: أحرف لاتينية وأرقام وشرطتان وحدها — يدخل مسار الطلب فلا يُقبل غيرها. */
export const isPlaceId = (s) => typeof s === 'string' && s.length >= 10 && s.length <= 300 && [...s].every(isIdChar);

/** المسافة بين نقطتين بالأمتار (هافرساين). */
export function metersBetween(a, b) {
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * 6371000 * Math.asin(Math.sqrt(h)));
}

/**
 * أقرب نتيجة بحث إلى إحداثيات المعلم. accepted حين تقع ضمن maxMeters؛ وإلا تُعرض مرشّحاً بعيداً لا يُعتمد.
 * @returns {{ id: string, name: string | null, meters: number, accepted: boolean } | undefined}
 */
export function pickCandidate(results, location, maxMeters = MAX_RESOLVE_METERS) {
  const near = [];
  for (const r of Array.isArray(results) ? results : []) {
    const lat = r?.location?.latitude;
    const lng = r?.location?.longitude;
    if (!isPlaceId(r?.id) || typeof lat !== 'number' || typeof lng !== 'number') continue;
    near.push({ id: r.id, name: r.displayName?.text ?? null, meters: metersBetween(location, { lat, lng }) });
  }
  near.sort((a, b) => a.meters - b.meters || a.id.localeCompare(b.id));
  return near.length ? { ...near[0], accepted: near[0].meters <= maxMeters } : undefined;
}

async function call(url, init, fetchImpl) {
  const res = await fetchImpl(url, { ...init, signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** تفاصيل مكان: الاسم والحالة والجدول الأسبوعي. */
export async function fetchPlace(id, { key, fetchImpl = fetch }) {
  if (!isPlaceId(id)) throw new Error('معرّف مكان غير صالح');
  const data = await call(`${API}places/${id}?languageCode=ar`, { headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': DETAILS_MASK } }, fetchImpl);
  return { name: data?.displayName?.text ?? null, status: data?.businessStatus ?? null, periods: data?.regularOpeningHours?.periods ?? [] };
}

/** بحث نصي باسم المعلم قرب إحداثياته. */
export async function searchPlaces(title, location, { key, fetchImpl = fetch }) {
  const body = {
    textQuery: `${title} الأحساء`,
    languageCode: 'ar',
    regionCode: 'SA',
    pageSize: 5,
    locationBias: { circle: { center: { latitude: location.lat, longitude: location.lng }, radius: 2000 } },
  };
  const data = await call(`${API}places:searchText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': SEARCH_MASK },
    body: JSON.stringify(body),
  }, fetchImpl);
  return Array.isArray(data?.places) ? data.places : [];
}

const listingUrl = (id) => `https://www.google.com/maps/place/?q=place_id:${id}`;
const hasLocation = (data) => typeof data?.location?.lat === 'number' && typeof data?.location?.lng === 'number';

/**
 * وضع المقارنة. يعيد الملخص ورمز الخروج؛ لا يطبع ولا يكتب.
 * @param {{ attractions: { slug: string, data: any }[], ids: Record<string, string>, key: string, today: string,
 *           fetchImpl?: typeof fetch }} input
 */
export async function runCompare({ attractions, ids, key, today, fetchImpl = fetch }) {
  const rows = [];
  const unknownIds = Object.keys(ids).filter((slug) => !attractions.some((a) => a.slug === slug)).sort((a, b) => a.localeCompare(b));
  for (const { slug, data } of attractions) {
    const id = ids[slug];
    const title = String(data?.title ?? slug);
    if (!id) { rows.push({ slug, title, verdict: 'noId', notes: [] }); continue; }
    let place;
    try { place = await fetchPlace(id, { key, fetchImpl }); } catch (e) {
      rows.push({ slug, title, id, verdict: 'error', notes: [e instanceof Error ? e.message : String(e)] });
      continue;
    }
    rows.push({ slug, title, id, ...evaluate(siteFacts(data), place) });
  }
  const count = (v) => rows.filter((r) => r.verdict === v).length;
  const withId = rows.length - count('noId');
  const lines = [
    `## مواعيد المعالم مقابل قائمة خرائط قوقل — ${today}`,
    '',
    `- المعالم: ${rows.length}؛ لها معرّف مكان: ${withId}.`,
    `- مطابق: ${count('match')}؛ تعارض: ${count('conflict')}؛ لا يُقارن: ${count('uncomparable')}؛ مستثنى: ${count('skipped')}؛ تعذّر جلبه: ${count('error')}.`,
  ];
  const section = (title, verdict, withNotes) => {
    const list = rows.filter((r) => r.verdict === verdict);
    if (!list.length) return;
    lines.push('', `### ${title}`);
    for (const r of list) {
      if (!withNotes) { lines.push(`- ${r.slug} (${r.title})`); continue; }
      lines.push(`- **${r.slug}** (${r.title}) — [القائمة](${listingUrl(r.id)})`);
      for (const n of r.notes) lines.push(`  - ${n}`);
    }
  };
  section('تعارضات', 'conflict', true);
  section('تعذّر جلبها', 'error', true);
  section('لا تُقارن', 'uncomparable', true);
  section('للقائمة ساعات ولا بند مواعيد في الموقع', 'info', false);
  if (unknownIds.length) lines.push('', '### معرّفات لا يقابلها ملف معلم', ...unknownIds.map((s) => `- ${s}`));
  const noId = rows.filter((r) => r.verdict === 'noId');
  if (noId.length) lines.push('', `### بلا معرّف مكان (${noId.length})`, noId.map((r) => r.slug).join(' · '));
  const allFailed = withId > 0 && count('error') === withId;
  if (allFailed) lines.push('', '> أخفقت كل النداءات — راجع المفتاح وحصّته.');
  return { markdown: lines.join('\n') + '\n', exitCode: count('conflict') > 0 || allFailed ? 1 : 0, rows };
}

/**
 * وضع اقتراح المعرّفات للمعالم التي بلا معرّف. يعيد الملخص والمقترح المقبول؛ لا يكتب ملفاً.
 * @param {{ attractions: { slug: string, data: any }[], ids: Record<string, string>, key: string,
 *           fetchImpl?: typeof fetch }} input
 */
export async function runResolve({ attractions, ids, key, fetchImpl = fetch }) {
  const proposed = {};
  const table = [];
  for (const { slug, data } of attractions) {
    if (ids[slug]) continue;
    const title = String(data?.title ?? slug);
    if (!hasLocation(data)) { table.push(`- ${slug} (${title}): بلا إحداثيات في الملف`); continue; }
    let pick;
    try { pick = pickCandidate(await searchPlaces(title, data.location, { key, fetchImpl }), data.location); } catch (e) {
      table.push(`- ${slug} (${title}): تعذّر البحث — ${e instanceof Error ? e.message : String(e)}`);
      continue;
    }
    if (!pick) { table.push(`- ${slug} (${title}): لا نتيجة`); continue; }
    if (pick.accepted) proposed[slug] = pick.id;
    table.push(`- ${slug} (${title}): ${pick.accepted ? 'مقترح' : 'مرشّح بعيد لا يُعتمد'} — «${pick.name ?? '?'}» على ${pick.meters} م — [القائمة](${listingUrl(pick.id)})`);
  }
  const merged = Object.fromEntries(Object.entries({ ...ids, ...proposed }).sort(([a], [b]) => a.localeCompare(b)));
  const lines = [
    '## معرّفات أماكن المعالم — مقترح',
    '',
    `- بلا معرّف: ${table.length}؛ مقترح ضمن ${MAX_RESOLVE_METERS} م: ${Object.keys(proposed).length}.`,
    '- يُراجع كل سطر بالاسم والمسافة قبل الالتزام؛ المرشّح البعيد لا يدخل الملف إلا بمراجعة يدوية.',
    '',
    ...table,
    '',
    '### محتوى `src/data/attraction-place-ids.json` بعد إضافة المقترح',
    '',
    '```json',
    JSON.stringify(merged, null, 2),
    '```',
  ];
  return { markdown: lines.join('\n') + '\n', exitCode: 0, proposed };
}

const riyadhDay = (now = new Date()) => new Date(now.getTime() + 3 * 3600 * 1000).toISOString().slice(0, 10);

async function main() {
  const args = process.argv.slice(2);
  const resolve = args.length === 1 && args[0] === '--resolve';
  if (args.length > (resolve ? 1 : 0)) throw new Error(`خيار غير معروف: ${args.find((a) => a !== '--resolve') ?? args[1]}`);
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    process.stdout.write('## مواعيد المعالم مقابل قائمة خرائط قوقل\n\nخامل: لا مفتاح GOOGLE_PLACES_API_KEY في هذه البيئة، فلم يُجرَ أي نداء.\n');
    return 0;
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const attractions = collectAttractionFiles(root);
  const ids = JSON.parse(await readFile(path.join(root, 'src', 'data', 'attraction-place-ids.json'), 'utf8'));
  for (const [slug, id] of Object.entries(ids)) if (!isPlaceId(id)) throw new Error(`معرّف غير صالح للمعلم ${slug}`);
  const out = resolve ? await runResolve({ attractions, ids, key }) : await runCompare({ attractions, ids, key, today: riyadhDay() });
  process.stdout.write(out.markdown);
  return out.exitCode;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().then((code) => { process.exitCode = code; }).catch((e) => {
    console.error(`✗ مقارن المواعيد: ${e instanceof Error ? e.message : String(e)}`);
    process.exitCode = 2;
  });
}
