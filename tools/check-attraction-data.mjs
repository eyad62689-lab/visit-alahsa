// C81 — ثوابت البيانات المنظّمة في ترويسات المعالم: hoursSpec وتواريخ التحقق.
//
// المخطط (src/content.config.ts) يفرض شكل الحقول وحده: أيام من Mo..Su وأوقات HH:MM وتاريخ
// YYYY-MM-DD. ولا يمسك فترة تُغلق قبل أن تفتح، ولا فترتين متداخلتين في يوم واحد، ولا تاريخ تحقق
// في المستقبل، ولا مواعيد منظّمة تخالف حكماً محسوماً. وhoursSpec يُصيَّر openingHoursSpecification
// في JSON-LD، فالخطأ فيه يصل محركات البحث ولا يراه قارئ الصفحة.
//
// يحرس:
//   (أ) كل فترة: اليوم غير مكرر في السطر، والوقتان ساعة صحيحة، والفتح قبل الإغلاق.
//   (ب) لا فترتان متداخلتان في اليوم الواحد.
//   (ج) verifiedAt/nextReview تاريخان حقيقيان، وverifiedAt لا يتجاوز اليوم (توقيت الرياض)،
//       وnextReview لا يسبق verifiedAt البند نفسه.
//   (د) الأحكام المحسومة في RULINGS.
//
// تجاوُز nextReview اليومَ ليس إخفاقاً هنا عمداً: هو تقادم يُبلَّغ في تقرير المراجعة، والبناء اليومي
// المجدول يجب ألا يسقط بمرور الأيام وحده.
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بترويسات المصدر، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.

export const EXPECT = { minSpecFiles: 5, minIntervals: 8, minDates: 100 };

/** أحكام محسومة على المواعيد المنظّمة. notBefore: اليوم لا يفتح قبل هذا الوقت. */
export const RULINGS = [
  { slug: 'qaisariyah', day: 'Fr', notBefore: '12:00', why: 'القيصرية تفتح الجمعة مساءً وحده (حكم المالك 2026-11-05)' },
];

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const isDigit = (c) => c >= '0' && c <= '9';

/** "HH:MM" ⇒ دقائق من منتصف الليل، أو undefined لوقت غير صحيح (25:00، 08:75). */
export const minutes = (t) => {
  if (typeof t !== 'string' || t.length !== 5 || t[2] !== ':') return undefined;
  if (![0, 1, 3, 4].every((i) => isDigit(t[i]))) return undefined;
  const h = Number(t.slice(0, 2)), m = Number(t.slice(3, 5));
  return h <= 23 && m <= 59 ? h * 60 + m : undefined;
};

/** YYYY-MM-DD تاريخاً حقيقياً؟ */
export const isRealDay = (s) => {
  if (typeof s !== 'string' || s.length !== 10 || s[4] !== '-' || s[7] !== '-') return false;
  const y = Number(s.slice(0, 4)), m = Number(s.slice(5, 7)), d = Number(s.slice(8, 10));
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return false;
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
};

/** القيمة المقتبسة بعد «key:» في السطر ابتداءً من from، أو undefined. قراءة خطية بلا تعبير نمطي. */
const quotedAfter = (line, key, from = 0) => {
  const k = line.indexOf(key + ':', from);
  if (k === -1) return undefined;
  const open = line.indexOf('"', k + key.length + 1);
  if (open === -1) return undefined;
  const close = line.indexOf('"', open + 1);
  if (close === -1) return undefined;
  // ما بين «key:» وعلامة الاقتباس مسافات فقط، وإلا فالقيمة لمفتاح آخر
  if (line.slice(k + key.length + 1, open).trim() !== '') return undefined;
  return { value: line.slice(open + 1, close), end: close + 1, at: k };
};

/**
 * يقرأ من ترويسة ملف معلم (LF) فترات hoursSpec وتواريخ التحقق.
 * @param {string} head
 * @returns {{ intervals: {days: string[], opens: string, closes: string, raw: string}[], unreadSpecLines: string[],
 *             dates: {verifiedAt?: string, nextReview?: string, line: number}[] }}
 */
export function parseAttractionData(head) {
  const lines = head.split('\n');
  const intervals = [];
  const unreadSpecLines = [];
  const dates = [];
  let inSpec = false;
  lines.forEach((line, i) => {
    if (line.startsWith('hoursSpec:')) { inSpec = true; return; }
    if (inSpec) {
      if (line.startsWith('  - ')) {
        const days = quotedAfter(line, 'days');
        const opens = quotedAfter(line, 'opens');
        const closes = quotedAfter(line, 'closes');
        if (days && opens && closes) intervals.push({ days: days.value.split(' '), opens: opens.value, closes: closes.value, raw: line.trim() });
        else unreadSpecLines.push(line.trim());
      } else if (line.trim() !== '' && !line.startsWith(' ')) inSpec = false;
    }
    // تواريخ التحقق: قد يحمل السطر الواحد (بند practical) المفتاحين معاً
    for (let from = 0; ;) {
      const v = quotedAfter(line, 'verifiedAt', from);
      if (!v) break;
      const n = quotedAfter(line, 'nextReview', v.end);
      const nextV = quotedAfter(line, 'verifiedAt', v.end);
      // nextReview يتبع verifiedAt نفسه إن جاء قبل verifiedAt التالي في السطر
      const own = n && (!nextV || n.at < nextV.at) ? n.value : undefined;
      dates.push({ verifiedAt: v.value, nextReview: own, line: i + 1 });
      from = v.end;
    }
  });
  return { intervals, unreadSpecLines, dates };
}

/**
 * @param {{slug: string, head: string}[]} files ترويسات ملفات المعالم
 * @param {{today: string}} opts today بصيغة YYYY-MM-DD (توقيت الرياض)
 * @returns {{ problems: string[], stats: { files: number, specFiles: number, intervals: number, dates: number, rulings: number } }}
 */
export function checkAttractionData(files, { today }) {
  const problems = [];
  const stats = { files: 0, specFiles: 0, intervals: 0, dates: 0, rulings: 0 };
  const seenRulings = new Set();
  for (const { slug, head } of files) {
    stats.files++;
    const { intervals, unreadSpecLines, dates } = parseAttractionData(head);
    for (const l of unreadSpecLines) problems.push(`${slug}: سطر hoursSpec غير مقروء ⇐ ${l}`);

    if (intervals.length) stats.specFiles++;
    const perDay = new Map();
    for (const iv of intervals) {
      stats.intervals++;
      const o = minutes(iv.opens), c = minutes(iv.closes);
      if (o === undefined) problems.push(`${slug}: opens «${iv.opens}» ليس وقتاً صحيحاً`);
      if (c === undefined) problems.push(`${slug}: closes «${iv.closes}» ليس وقتاً صحيحاً`);
      if (o !== undefined && c !== undefined && o >= c) problems.push(`${slug}: الفتح ${iv.opens} لا يسبق الإغلاق ${iv.closes}`);
      const seen = new Set();
      for (const d of iv.days) {
        if (!DAYS.includes(d)) { problems.push(`${slug}: يوم غير معروف «${d}»`); continue; }
        if (seen.has(d)) problems.push(`${slug}: اليوم ${d} مكرر في فترة واحدة`);
        seen.add(d);
        if (o !== undefined && c !== undefined) {
          const list = perDay.get(d) ?? [];
          list.push({ o, c, raw: `${iv.opens}–${iv.closes}` });
          perDay.set(d, list);
        }
      }
    }
    for (const [d, list] of perDay) {
      const sorted = [...list].sort((a, b) => a.o - b.o);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].o < sorted[i - 1].c) problems.push(`${slug}: فترتان متداخلتان يوم ${d} (${sorted[i - 1].raw} و${sorted[i].raw})`);
      }
    }

    for (const r of RULINGS) {
      if (r.slug !== slug) continue;
      seenRulings.add(r.slug + r.day);
      const limit = minutes(r.notBefore);
      const early = (perDay.get(r.day) ?? []).filter((x) => x.o < limit);
      if (early.length) problems.push(`${slug}: يفتح ${r.day} عند ${early.map((x) => x.raw).join(' و')} — ${r.why}`);
      if (!intervals.length) problems.push(`${slug}: بلا hoursSpec والحكم «${r.why}» يحرسه`);
    }

    for (const dt of dates) {
      stats.dates++;
      if (!isRealDay(dt.verifiedAt)) problems.push(`${slug}:${dt.line}: verifiedAt «${dt.verifiedAt}» ليس تاريخاً حقيقياً`);
      else if (dt.verifiedAt > today) problems.push(`${slug}:${dt.line}: verifiedAt ${dt.verifiedAt} بعد اليوم ${today}`);
      if (dt.nextReview !== undefined) {
        if (!isRealDay(dt.nextReview)) problems.push(`${slug}:${dt.line}: nextReview «${dt.nextReview}» ليس تاريخاً حقيقياً`);
        else if (isRealDay(dt.verifiedAt) && dt.nextReview < dt.verifiedAt) problems.push(`${slug}:${dt.line}: nextReview ${dt.nextReview} يسبق verifiedAt ${dt.verifiedAt}`);
      }
    }
  }
  stats.rulings = seenRulings.size;
  if (stats.rulings < RULINGS.length) problems.push(`الأحكام المفحوصة ${stats.rulings} من ${RULINGS.length} — ملف معلم محروس غائب`);
  if (stats.specFiles < EXPECT.minSpecFiles) problems.push(`ملفات hoursSpec المفحوصة ${stats.specFiles} — الحدّ الأدنى ${EXPECT.minSpecFiles}`);
  if (stats.intervals < EXPECT.minIntervals) problems.push(`فترات hoursSpec المفحوصة ${stats.intervals} — الحدّ الأدنى ${EXPECT.minIntervals}`);
  if (stats.dates < EXPECT.minDates) problems.push(`تواريخ التحقق المفحوصة ${stats.dates} — الحدّ الأدنى ${EXPECT.minDates}`);
  return { problems, stats };
}
