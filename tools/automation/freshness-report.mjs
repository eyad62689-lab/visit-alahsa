// تقرير التقادم — ما يحتاج مراجعة في بيانات المعالم والفعاليات، JSON على المخرج القياسي.
//
// لا يحكم ولا يُفشل بناء: مرور موعد مراجعة تقادمٌ يُبلَّغ، لا تضارب (انظر C81). يقرأ المصدر وحده:
//   - ترويسات src/content/attractions/*.md (YAML): بنود practical وحقلا openSite وhoursSpec.
//   - EVENT_META من src/data/events.ts (بقارئ C80 نفسه).
//
// ما يُخرجه:
//   attractions.due        بنود موثّقة حلّ موعد مراجعتها: nextReview بلغ اليوم، أو — حين لا nextReview —
//                          مضى على verifiedAt أكثر من maxAgeDays. الأقدم أولاً. مع كل بند مصدره ورابطه
//                          وهل الرابط «عميق» (له مسار غير الجذر) أم صفحة رئيسية لا يُتحقق منها آلياً.
//   attractions.unverified بنود verified: false.
//   attractions.noHours    معالم بلا بند مواعيد وليست openSite.
//   events.endingSoon      نسخ مؤكدة تنتهي خلال eventWindowDays.
//   events.ended           نسخ مؤكدة انقضت وما زال المصدر يحمل تواريخها (العرض يعود لموسمها
//                          التقريبي آلياً؛ المصدر ينتظر تواريخ النسخة التالية أو التنظيف).
//   events.seasonNear      فعاليات غير مؤكدة موسمها جارٍ أو يبدأ خلال seasonLeadDays.
//   events.hijri           فعاليات موسمها هجري (لا يُحسب قربها من شهر ميلادي).
//
// الاستعمال:
//   node tools/automation/freshness-report.mjs [--summary] [--max-age-days=180] [--event-window=30]
//        [--season-lead=90] [--today=YYYY-MM-DD]
// --summary يطبع ملخصاً مقروءاً (Markdown) بدل JSON. الخيارات أرقام وتاريخ وحدها؛ لا مسار من سطر الأوامر.
// المنطق في دوال نقية مصدَّرة (buildReport وما تحتها) يُختبر كسرها في الذاكرة.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import YAML from 'yaml';
import { parseEventsSource, parseISODay } from '../check-events-data.mjs';

export const DEFAULTS = { maxAgeDays: 180, eventWindowDays: 30, seasonLeadDays: 90 };

const DAY_MS = 86_400_000;
const dayNumber = (iso) => Math.round(Date.parse(`${iso}T00:00:00Z`) / DAY_MS);
/** الأيام من a إلى b (كلاهما YYYY-MM-DD). */
export const daysBetween = (a, b) => dayNumber(b) - dayNumber(a);

/** نوع البند من تسميته العربية — النمطان نفساهما اللذان يشترطهما المخطط لـhoursSpec وfee. */
export const itemKind = (label) => {
  const text = String(label ?? '');
  if (text.includes('المواعيد') || text.includes('ساعات')) return 'hours';
  if (text.includes('الرسوم') || text.includes('الدخول')) return 'fee';
  return 'other';
};

/** رابط له مسار غير الجذر أو استعلام؟ الصفحة الرئيسية لا تُثبت معلومة بعينها. */
export const isDeepUrl = (raw) => {
  if (typeof raw !== 'string') return false;
  let url;
  try { url = new URL(raw); } catch { return false; }
  return url.pathname.replaceAll('/', '') !== '' || url.search !== '';
};

/** ترويسة YAML من نص ملف Markdown (CRLF أو LF)، أو undefined إن لم تكن له ترويسة. */
export const frontMatter = (text) => {
  const lf = text.replaceAll('\r\n', '\n');
  if (!lf.startsWith('---\n')) return undefined;
  const end = lf.indexOf('\n---', 3);
  return end === -1 ? undefined : YAML.parse(lf.slice(4, end));
};

/** لماذا حلّت مراجعة البند، أو undefined إن لم تحلّ. */
export function dueReason(item, today, maxAgeDays) {
  if (typeof item.nextReview === 'string' && parseISODay(item.nextReview)) {
    return daysBetween(item.nextReview, today) >= 0 ? 'nextReview' : undefined;
  }
  if (typeof item.verifiedAt !== 'string' || !parseISODay(item.verifiedAt)) return 'noDate';
  return daysBetween(item.verifiedAt, today) > maxAgeDays ? 'age' : undefined;
}

function attractionReport(attractions, today, maxAgeDays) {
  const due = [];
  const unverified = [];
  const noHours = [];
  let items = 0;
  let verified = 0;
  for (const { slug, data } of attractions) {
    const practical = Array.isArray(data?.practical) ? data.practical : [];
    for (const p of practical) {
      items++;
      const kind = itemKind(p.label);
      if (p.verified !== true) { unverified.push({ slug, kind, label: p.label, value: p.value }); continue; }
      verified++;
      const reason = dueReason(p, today, maxAgeDays);
      if (!reason) continue;
      due.push({
        slug, kind, label: p.label, value: p.value, reason,
        verifiedAt: p.verifiedAt ?? null,
        nextReview: p.nextReview ?? null,
        ageDays: typeof p.verifiedAt === 'string' && parseISODay(p.verifiedAt) ? daysBetween(p.verifiedAt, today) : null,
        source: p.source ?? null,
        sourceUrl: p.sourceUrl ?? null,
        deepSource: isDeepUrl(p.sourceUrl),
      });
    }
    if (data?.openSite !== true && !practical.some((p) => itemKind(p.label) === 'hours')) noHours.push({ slug, title: data?.title ?? null });
  }
  due.sort((a, b) => String(a.verifiedAt).localeCompare(String(b.verifiedAt)) || a.slug.localeCompare(b.slug) || a.kind.localeCompare(b.kind));
  unverified.sort((a, b) => a.slug.localeCompare(b.slug) || a.kind.localeCompare(b.kind));
  noHours.sort((a, b) => a.slug.localeCompare(b.slug));
  return { files: attractions.length, items, verified, due, unverified, noHours };
}

/** الأيام حتى أول يوم من الشهر month القادم (0 إن كان الشهر الجاري)، من تاريخ today. */
export function daysToMonth(month, today) {
  const year = Number(today.slice(0, 4));
  const current = Number(today.slice(5, 7));
  if (month === current) return 0;
  const target = `${month > current ? year : year + 1}-${String(month).padStart(2, '0')}-01`;
  return daysBetween(today, target);
}

/** الشهر month داخل نافذة start..end (تلتفّ عبر رأس السنة إن كان end < start)؟ */
export const inWindow = (month, start, end) => (start <= end ? month >= start && month <= end : month >= start || month <= end);

function eventReport(meta, today, eventWindowDays, seasonLeadDays) {
  const endingSoon = [];
  const ended = [];
  const seasonNear = [];
  const hijri = [];
  const month = Number(today.slice(5, 7));
  for (const [id, ev] of Object.entries(meta)) {
    if (ev.status === 'confirmed' && typeof ev.endISO === 'string' && parseISODay(ev.endISO)) {
      const daysLeft = daysBetween(today, ev.endISO);
      const row = { id, startISO: ev.startISO ?? null, endISO: ev.endISO, oneOff: ev.oneOff === true };
      if (daysLeft < 0) ended.push({ ...row, daysSinceEnd: -daysLeft });
      else if (daysLeft <= eventWindowDays) endingSoon.push({ ...row, daysLeft });
      continue;
    }
    const status = ev.status ?? 'expected';
    if (ev.ramadan === true) { hijri.push({ id, status }); continue; }
    if (!Number.isInteger(ev.start) || ev.start < 1 || ev.start > 12) continue;
    const end = Number.isInteger(ev.end) ? ev.end : ev.start;
    const inSeason = inWindow(month, ev.start, end);
    const daysToSeason = inSeason ? 0 : daysToMonth(ev.start, today);
    if (inSeason || daysToSeason <= seasonLeadDays) seasonNear.push({ id, status, startMonth: ev.start, endMonth: end, inSeason, daysToSeason });
  }
  endingSoon.sort((a, b) => a.daysLeft - b.daysLeft || a.id.localeCompare(b.id));
  ended.sort((a, b) => a.daysSinceEnd - b.daysSinceEnd || a.id.localeCompare(b.id));
  seasonNear.sort((a, b) => a.daysToSeason - b.daysToSeason || a.id.localeCompare(b.id));
  hijri.sort((a, b) => a.id.localeCompare(b.id));
  return { total: Object.keys(meta).length, endingSoon, ended, seasonNear, hijri };
}

/**
 * @param {{ attractions: { slug: string, data: any }[], events: Record<string, any>, today: string,
 *           params?: Partial<typeof DEFAULTS> }} input
 */
export function buildReport({ attractions, events, today, params = {} }) {
  const p = { ...DEFAULTS, ...params };
  return {
    generated: today,
    params: p,
    attractions: attractionReport(attractions, today, p.maxAgeDays),
    events: eventReport(events, today, p.eventWindowDays, p.seasonLeadDays),
  };
}

/** ملخص Markdown للتقرير. */
export function summarize(report) {
  const a = report.attractions;
  const e = report.events;
  const deep = a.due.filter((d) => d.deepSource).length;
  const lines = [
    `## تقرير التقادم — ${report.generated}`,
    '',
    `- المعالم: ${a.files} ملفاً، ${a.items} بنداً عملياً (${a.verified} موثّقاً).`,
    `- حلّت مراجعته: ${a.due.length} بنداً (${deep} منها برابط مصدر عميق) — الحدّ ${report.params.maxAgeDays} يوماً أو nextReview.`,
    `- غير موثّق: ${a.unverified.length} بنداً. بلا مواعيد وليست موقعاً مفتوحاً: ${a.noHours.length} معلماً.`,
    `- الفعاليات: ${e.total}؛ تنتهي خلال ${report.params.eventWindowDays} يوماً: ${e.endingSoon.length}؛ انقضت وتواريخها في المصدر: ${e.ended.length}؛ موسمها جارٍ أو قريب: ${e.seasonNear.length}؛ هجرية الموسم: ${e.hijri.length}.`,
  ];
  if (e.endingSoon.length) lines.push('', '### نسخ تنتهي قريباً', ...e.endingSoon.map((x) => `- ${x.id}: ${x.endISO} (بعد ${x.daysLeft} يوماً)${x.oneOff ? ' — منفردة' : ''}`));
  if (e.ended.length) lines.push('', '### نسخ انقضت', ...e.ended.map((x) => `- ${x.id}: ${x.endISO} (منذ ${x.daysSinceEnd} يوماً)${x.oneOff ? ' — منفردة' : ''}`));
  if (e.seasonNear.length) lines.push('', '### مواسم جارية أو قريبة بلا تأكيد', ...e.seasonNear.map((x) => `- ${x.id}: ${x.inSeason ? 'جارٍ' : `بعد ${x.daysToSeason} يوماً`} (الأشهر ${x.startMonth}–${x.endMonth}، ${x.status})`));
  if (a.due.length) lines.push('', '### أقدم البنود التي حلّت مراجعتها', ...a.due.slice(0, 15).map((x) => `- ${x.slug} · ${x.label}: ${x.verifiedAt ?? 'بلا تاريخ'}${x.deepSource ? ' · رابط عميق' : ''}`));
  if (a.noHours.length) lines.push('', '### معالم بلا مواعيد', ...a.noHours.map((x) => `- ${x.slug}`));
  return lines.join('\n') + '\n';
}

/** خيارات سطر الأوامر: أعداد صحيحة غير سالبة وتاريخ حقيقي؛ غير ذلك خطأ. */
export function parseArgs(argv) {
  const out = { summary: false, params: {}, today: undefined };
  const numeric = { '--max-age-days': 'maxAgeDays', '--event-window': 'eventWindowDays', '--season-lead': 'seasonLeadDays' };
  for (const arg of argv) {
    if (arg === '--summary') { out.summary = true; continue; }
    const eq = arg.indexOf('=');
    const key = eq === -1 ? arg : arg.slice(0, eq);
    const value = eq === -1 ? '' : arg.slice(eq + 1);
    if (key === '--today') {
      if (!parseISODay(value)) throw new Error(`--today ليس تاريخاً حقيقياً: ${value}`);
      out.today = value;
    } else if (numeric[key]) {
      const n = Number(value);
      if (value === '' || !Number.isInteger(n) || n < 0) throw new Error(`${key} يلزمه عدد صحيح غير سالب`);
      out.params[numeric[key]] = n;
    } else throw new Error(`خيار غير معروف: ${key}`);
  }
  return out;
}

const riyadhDay = (now = new Date()) => new Date(now.getTime() + 3 * 3600 * 1000).toISOString().slice(0, 10);

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const dir = path.join(root, 'src', 'content', 'attractions');
  const names = (await readdir(dir)).filter((n) => n.endsWith('.md')).sort((a, b) => a.localeCompare(b));
  const attractions = [];
  for (const name of names) {
    const data = frontMatter(await readFile(path.join(dir, name), 'utf8'));
    if (!data) throw new Error(`${name}: بلا ترويسة مقروءة`);
    attractions.push({ slug: name.slice(0, -3), data });
  }
  const { meta } = parseEventsSource(await readFile(path.join(root, 'src', 'data', 'events.ts'), 'utf8'));
  const report = buildReport({ attractions, events: meta, today: args.today ?? riyadhDay(), params: args.params });
  process.stdout.write(args.summary ? summarize(report) : JSON.stringify(report, null, 2) + '\n');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((e) => { console.error(`✗ تقرير التقادم: ${e instanceof Error ? e.message : String(e)}`); process.exit(1); });
}
