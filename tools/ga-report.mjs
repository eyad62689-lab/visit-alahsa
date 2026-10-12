// تقرير زوار الموقع من Google Analytics 4 — يُسحب من GA4 Data API ويُكتب Markdown عربياً.
//
// لماذا API لا لقطة شاشة: التقرير يُولَّد بالأرقام نفسها التي تعرضها واجهة GA4
// (المصدر الرسمي)، وبصيغة قابلة للحفظ في `docs/` خطَّ أساسٍ يُقارَن به لاحقاً.
// لا رقم يُكتب في التقرير إلا ما ردّه الـAPI — بلا اعتماد لا يُولَّد شيء.
//
// الاعتماد (أحدهما):
//   • GA_SERVICE_ACCOUNT_JSON  — محتوى مفتاح حساب خدمة (JSON) أُعطي صلاحية «عارض»
//                                (Viewer) على خاصية GA4 من «المشرف ← إدارة الوصول».
//   • GA_SERVICE_ACCOUNT_FILE  — مسار ملف المفتاح نفسه بدل محتواه.
//   • GA_ACCESS_TOKEN          — رمز وصول OAuth جاهز بنطاق analytics.readonly
//                                (مثلاً من `gcloud auth print-access-token` بعد
//                                تسجيل دخول بالنطاق). يسبق المفتاح إن وُجد.
// والخاصية: GA_PROPERTY_ID — المعرّف الرقمي للخاصية (المشرف ← إعدادات الخاصية؛ هو
// رقم مثل 123456789 وليس معرّف القياس G-QB084SK5XJ المكتوب في Base.astro).
// كلها متغيرات بيئة — لا مفتاح في الكود ولا في المستودع (قاعدة الأمان في CLAUDE.md).
//
// التشغيل:
//   node tools/ga-report.mjs                      # آخر 28 يوماً حتى الأمس، Markdown على stdout
//   node tools/ga-report.mjs --days 7             # آخر 7 أيام
//   node tools/ga-report.mjs --start 2026-09-01 --end 2026-09-30
//   node tools/ga-report.mjs --out docs/تقرير-الزوار-2026-10-12.md --json docs/ga-raw-2026-10-12.json
//   node tools/ga-report.mjs --fixture raw.json   # إعادة توليد التقرير من JSON محفوظ بلا نداء
// يخرج بـ1 عند غياب الاعتماد أو فشل الـAPI، ويطبع السبب على stderr.
// القاعدة: أرقام لاتينية (0-9) في المخرج كله.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createSign } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly';
// يُتاح تجاوزهما للاختبار المحلي بخادم وهمي فقط — لا يُغيَّران في الاستعمال العادي.
const DATA_API = process.env.GA_DATA_API_BASE || 'https://analyticsdata.googleapis.com/v1beta';
const TOKEN_URL_OVERRIDE = process.env.GA_TOKEN_URL;
const SITE = 'https://visit-alahsa.com';
const LANG_NAMES = { ar: 'العربية', en: 'الإنجليزية', zh: 'الصينية', de: 'الألمانية', ru: 'الروسية' };

// ---------- المعاملات ----------
function parseArgs(argv) {
  const out = { days: 28, start: null, end: null, out: null, json: null, fixture: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--days') out.days = Number(next());
    else if (a === '--start') out.start = next();
    else if (a === '--end') out.end = next();
    else if (a === '--out') out.out = next();
    else if (a === '--json') out.json = next();
    else if (a === '--fixture') out.fixture = next();
    else if (a === '--help' || a === '-h') { out.help = true; }
    else throw new Error(`معامل غير معروف: ${a}`);
  }
  if (!Number.isInteger(out.days) || out.days < 1) throw new Error('--days يجب أن يكون عدداً صحيحاً موجباً');
  return out;
}

const iso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d); x.setUTCDate(x.getUTCDate() + n); return x; };

/** فترتا التقرير: الحالية والسابقة بالطول نفسه (للمقارنة). */
export function dateRanges({ days, start, end }) {
  const endD = end ? new Date(`${end}T00:00:00Z`) : addDays(new Date(), -1); // حتى الأمس: بيانات اليوم ناقصة
  const startD = start ? new Date(`${start}T00:00:00Z`) : addDays(endD, -(days - 1));
  if (Number.isNaN(endD) || Number.isNaN(startD)) throw new Error('تاريخ غير صالح — الصيغة YYYY-MM-DD');
  if (startD > endD) throw new Error('--start بعد --end');
  const len = Math.round((endD - startD) / 86400000) + 1;
  const prevEnd = addDays(startD, -1);
  const prevStart = addDays(prevEnd, -(len - 1));
  return {
    current: { startDate: iso(startD), endDate: iso(endD), name: 'current' },
    previous: { startDate: iso(prevStart), endDate: iso(prevEnd), name: 'previous' },
    days: len,
  };
}

// ---------- الاعتماد ----------
const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/** يبني JWT موقَّعاً بـRS256 لمفتاح حساب خدمة (بلا مكتبات). */
export function serviceAccountJwt(key, { now = Math.floor(Date.now() / 1000), scope = SCOPE } = {}) {
  if (!key?.client_email || !key?.private_key) throw new Error('مفتاح حساب الخدمة ناقص: client_email أو private_key');
  const aud = TOKEN_URL_OVERRIDE || key.token_uri || 'https://oauth2.googleapis.com/token';
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(JSON.stringify({ iss: key.client_email, scope, aud, iat: now, exp: now + 3600 }));
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const sig = b64url(signer.sign(key.private_key));
  return { jwt: `${header}.${claims}.${sig}`, tokenUrl: aud };
}

async function loadServiceAccount() {
  const raw = process.env.GA_SERVICE_ACCOUNT_JSON;
  const file = process.env.GA_SERVICE_ACCOUNT_FILE;
  if (!raw && !file) return null;
  let text = raw;
  if (!text) text = await readFile(file, 'utf8');
  try { return JSON.parse(text); } catch { throw new Error('GA_SERVICE_ACCOUNT_JSON ليس JSON صالحاً'); }
}

async function accessToken() {
  if (process.env.GA_ACCESS_TOKEN) return process.env.GA_ACCESS_TOKEN;
  const key = await loadServiceAccount();
  if (!key) return null;
  const { jwt, tokenUrl } = serviceAccountJwt(key);
  const body = new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt });
  const res = await fetch(tokenUrl, { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`تبادل الرمز فشل (${res.status}): ${data.error_description || data.error || 'بلا تفصيل'}`);
  }
  return data.access_token;
}

// ---------- طلبات التقرير ----------
const m = (...names) => names.map((name) => ({ name }));
const d = (...names) => names.map((name) => ({ name }));
const desc = (metric) => [{ metric: { metricName: metric }, desc: true }];

/** الطلبات المسمّاة — كل اسم يصير مفتاحاً في الخام والتقرير. */
export function buildRequests(ranges) {
  const cur = [{ startDate: ranges.current.startDate, endDate: ranges.current.endDate }];
  const both = [
    { startDate: ranges.current.startDate, endDate: ranges.current.endDate, name: 'current' },
    { startDate: ranges.previous.startDate, endDate: ranges.previous.endDate, name: 'previous' },
  ];
  return {
    totals: { dateRanges: both, metrics: m('activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'engagedSessions', 'averageSessionDuration', 'engagementRate') },
    daily: { dateRanges: cur, dimensions: d('date'), metrics: m('activeUsers', 'sessions', 'screenPageViews'), orderBys: [{ dimension: { dimensionName: 'date' } }], limit: 400 },
    countries: { dateRanges: cur, dimensions: d('country'), metrics: m('activeUsers', 'sessions'), orderBys: desc('activeUsers'), limit: 15 },
    pages: { dateRanges: cur, dimensions: d('pagePath', 'pageTitle'), metrics: m('screenPageViews', 'activeUsers'), orderBys: desc('screenPageViews'), limit: 1000 },
    channels: { dateRanges: cur, dimensions: d('sessionDefaultChannelGroup'), metrics: m('sessions', 'activeUsers'), orderBys: desc('sessions'), limit: 15 },
    sources: { dateRanges: cur, dimensions: d('sessionSource', 'sessionMedium'), metrics: m('sessions', 'activeUsers'), orderBys: desc('sessions'), limit: 15 },
    devices: { dateRanges: cur, dimensions: d('deviceCategory'), metrics: m('activeUsers', 'sessions'), orderBys: desc('activeUsers'), limit: 5 },
    browserLang: { dateRanges: cur, dimensions: d('language'), metrics: m('activeUsers'), orderBys: desc('activeUsers'), limit: 12 },
    events: { dateRanges: cur, dimensions: d('eventName'), metrics: m('eventCount', 'activeUsers'), orderBys: desc('eventCount'), limit: 60 },
    // بُعد مخصص سُجِّل في GA4 بتاريخ 2026-09-03 (docs/خطة-العمل-والتنفيذ.md 1.6). إن رُفض يُتخطّى.
    aiSources: {
      dateRanges: cur, dimensions: d('customEvent:ai_source'), metrics: m('eventCount'), orderBys: desc('eventCount'), limit: 20,
      dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'ai_referral' } } },
      optional: true,
    },
  };
}

async function runReport(token, propertyId, req) {
  const { optional, ...body } = req;
  const res = await fetch(`${DATA_API}/properties/${propertyId}:runReport`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error?.message || `HTTP ${res.status}`;
    if (optional) return { skipped: msg, rows: [] };
    throw new Error(`GA4 Data API: ${msg}`);
  }
  return data;
}

/** يحوّل ردّ runReport إلى صفوف كائنات {dim: value, metric: number}. */
export function rows(report) {
  if (!report?.rows) return [];
  const dims = (report.dimensionHeaders || []).map((h) => h.name);
  const mets = (report.metricHeaders || []).map((h) => h.name);
  return report.rows.map((r) => {
    const o = {};
    dims.forEach((n, i) => { o[n] = r.dimensionValues?.[i]?.value ?? ''; });
    mets.forEach((n, i) => { o[n] = Number(r.metricValues?.[i]?.value ?? 0); });
    return o;
  });
}

// ---------- التحليل ----------
const siteLang = (p) => { const x = /^\/(en|zh|de|ru)(\/|$)/.exec(p); return x ? x[1] : 'ar'; };

export function analyze(raw) {
  const totalRows = rows(raw.totals);
  // مع فترتين يُلحق الـAPI بُعد dateRange تلقائياً (current/previous بالأسماء المعطاة).
  const pick = (name) => totalRows.find((r) => r.dateRange === name) || {};
  const totals = { current: pick('current'), previous: pick('previous') };
  if (totalRows.length === 1 && !totalRows[0].dateRange) totals.current = totalRows[0];

  const pages = rows(raw.pages);
  const byLang = {};
  for (const r of pages) {
    const l = siteLang(r.pagePath);
    byLang[l] = byLang[l] || { lang: l, screenPageViews: 0, activeUsers: 0 };
    byLang[l].screenPageViews += r.screenPageViews;
    // activeUsers لا تُجمَع عبر الصفحات بلا تكرار؛ تُعرض مشاهدات الصفحات وحدها للغات.
  }
  const langs = Object.values(byLang).sort((a, b) => b.screenPageViews - a.screenPageViews);

  return {
    totals,
    daily: rows(raw.daily),
    countries: rows(raw.countries),
    pages: pages.slice(0, 15),
    langs,
    channels: rows(raw.channels),
    sources: rows(raw.sources),
    devices: rows(raw.devices),
    browserLang: rows(raw.browserLang),
    events: rows(raw.events),
    aiSources: rows(raw.aiSources),
    aiSourcesSkipped: raw.aiSources?.skipped || null,
  };
}

// ---------- التصيير ----------
const n = (v) => Number(v || 0).toLocaleString('en-US', { maximumFractionDigits: 0 });
const pct = (v) => `${(Number(v || 0) * 100).toFixed(1)}%`;
const dur = (s) => { const t = Math.round(Number(s || 0)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
const delta = (cur, prev) => {
  if (prev === undefined || prev === null || Number.isNaN(prev)) return '—';
  if (!prev) return cur ? 'جديد' : '—';
  const p = ((cur - prev) / prev) * 100;
  return `${p >= 0 ? '+' : ''}${p.toFixed(1)}%`;
};
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const table = (headers, body) => [
  `| ${headers.join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...body.map((r) => `| ${r.map(esc).join(' | ')} |`),
].join('\n');
const dateOf = (yyyymmdd) => `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;

export function render(a, ranges, { generatedAt = new Date() } = {}) {
  const c = a.totals.current, p = a.totals.previous;
  const out = [];
  out.push(`# تقرير زوار visit-alahsa.com — ${ranges.current.startDate} إلى ${ranges.current.endDate}`);
  out.push('');
  out.push(`المصدر: Google Analytics 4 (GA4 Data API)، الفترة ${ranges.days} يوماً، والمقارنة بالفترة السابقة ${ranges.previous.startDate} إلى ${ranges.previous.endDate}. وُلِّد في ${generatedAt.toISOString().slice(0, 16).replace('T', ' ')} UTC بأداة \`tools/ga-report.mjs\`.`);
  out.push('');
  out.push('## 1. الملخّص');
  out.push('');
  out.push(table(['المؤشر', 'الفترة الحالية', 'الفترة السابقة', 'التغيّر'], [
    ['الزوار النشطون', n(c.activeUsers), n(p.activeUsers), delta(c.activeUsers, p.activeUsers)],
    ['زوار جدد', n(c.newUsers), n(p.newUsers), delta(c.newUsers, p.newUsers)],
    ['الجلسات', n(c.sessions), n(p.sessions), delta(c.sessions, p.sessions)],
    ['مشاهدات الصفحات', n(c.screenPageViews), n(p.screenPageViews), delta(c.screenPageViews, p.screenPageViews)],
    ['جلسات متفاعلة', n(c.engagedSessions), n(p.engagedSessions), delta(c.engagedSessions, p.engagedSessions)],
    ['معدّل التفاعل', pct(c.engagementRate), pct(p.engagementRate), delta(c.engagementRate, p.engagementRate)],
    ['متوسط مدة الجلسة (د:ث)', dur(c.averageSessionDuration), dur(p.averageSessionDuration), delta(c.averageSessionDuration, p.averageSessionDuration)],
  ]));
  out.push('');

  out.push('## 2. الزوار يوماً بيوم');
  out.push('');
  out.push(table(['اليوم', 'زوار نشطون', 'جلسات', 'مشاهدات'], a.daily.map((r) => [dateOf(r.date), n(r.activeUsers), n(r.sessions), n(r.screenPageViews)])));
  out.push('');

  out.push('## 3. لغة الصفحات المزارة (من بادئة المسار)');
  out.push('');
  const totalViews = a.langs.reduce((s, r) => s + r.screenPageViews, 0) || 1;
  out.push(table(['لغة الموقع', 'مشاهدات الصفحات', 'النسبة'], a.langs.map((r) => [LANG_NAMES[r.lang] || r.lang, n(r.screenPageViews), pct(r.screenPageViews / totalViews)])));
  out.push('');

  out.push('## 4. الدول');
  out.push('');
  out.push(table(['الدولة', 'زوار نشطون', 'جلسات'], a.countries.map((r) => [r.country, n(r.activeUsers), n(r.sessions)])));
  out.push('');

  out.push('## 5. أكثر الصفحات زيارة');
  out.push('');
  out.push(table(['المسار', 'العنوان', 'مشاهدات', 'زوار'], a.pages.map((r) => [`[${decodeURI(r.pagePath)}](${SITE}${r.pagePath})`, r.pageTitle, n(r.screenPageViews), n(r.activeUsers)])));
  out.push('');

  out.push('## 6. قنوات الوصول');
  out.push('');
  out.push(table(['القناة', 'جلسات', 'زوار'], a.channels.map((r) => [r.sessionDefaultChannelGroup, n(r.sessions), n(r.activeUsers)])));
  out.push('');
  out.push(table(['المصدر / الوسيط', 'جلسات', 'زوار'], a.sources.map((r) => [`${r.sessionSource} / ${r.sessionMedium}`, n(r.sessions), n(r.activeUsers)])));
  out.push('');

  out.push('## 7. إحالات محركات الإجابة (حدث `ai_referral`)');
  out.push('');
  if (a.aiSourcesSkipped) out.push(`لم يُسترجع التفصيل بالمصدر: ${a.aiSourcesSkipped}. يظهر عدد الحدث الإجمالي في جدول الأحداث.`);
  else if (!a.aiSources.length) out.push('لا إحالات من محركات الإجابة في هذه الفترة.');
  else out.push(table(['المصدر', 'إحالات'], a.aiSources.map((r) => [r['customEvent:ai_source'], n(r.eventCount)])));
  out.push('');

  out.push('## 8. الأجهزة ولغة المتصفح');
  out.push('');
  out.push(table(['الجهاز', 'زوار نشطون', 'جلسات'], a.devices.map((r) => [r.deviceCategory, n(r.activeUsers), n(r.sessions)])));
  out.push('');
  out.push(table(['لغة المتصفح', 'زوار نشطون'], a.browserLang.map((r) => [r.language, n(r.activeUsers)])));
  out.push('');

  out.push('## 9. الأحداث المقيسة');
  out.push('');
  out.push(table(['الحدث', 'عدد المرات', 'زوار'], a.events.map((r) => [`\`${r.eventName}\``, n(r.eventCount), n(r.activeUsers)])));
  out.push('');
  return out.join('\n');
}

// ---------- التنفيذ ----------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('node tools/ga-report.mjs [--days N | --start YYYY-MM-DD --end YYYY-MM-DD] [--out file.md] [--json raw.json] [--fixture raw.json]');
    return;
  }
  let raw, ranges;
  if (args.fixture) {
    const fx = JSON.parse(await readFile(args.fixture, 'utf8'));
    raw = fx.reports; ranges = fx.ranges;
  } else {
    ranges = dateRanges(args);
    const propertyId = process.env.GA_PROPERTY_ID;
    if (!propertyId || !/^\d+$/.test(propertyId)) {
      throw new Error('GA_PROPERTY_ID غير مضبوط (المعرّف الرقمي للخاصية من GA4: المشرف ← إعدادات الخاصية).');
    }
    const token = await accessToken();
    if (!token) {
      throw new Error('لا اعتماد: اضبط GA_SERVICE_ACCOUNT_JSON (أو GA_SERVICE_ACCOUNT_FILE) أو GA_ACCESS_TOKEN. التفصيل في رأس هذا الملف.');
    }
    raw = {};
    for (const [name, req] of Object.entries(buildRequests(ranges))) {
      raw[name] = await runReport(token, propertyId, req);
    }
  }
  if (args.json) {
    await mkdir(path.dirname(args.json), { recursive: true });
    await writeFile(args.json, JSON.stringify({ ranges, reports: raw }, null, 2));
    console.error(`الخام: ${args.json}`);
  }
  const md = render(analyze(raw), ranges);
  if (args.out) {
    await mkdir(path.dirname(args.out), { recursive: true });
    await writeFile(args.out, md + '\n');
    console.error(`التقرير: ${args.out}`);
  } else {
    process.stdout.write(md + '\n');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => { console.error(`ga-report: ${e.message}`); process.exit(1); });
}
