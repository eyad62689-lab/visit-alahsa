// فحص الإنتاج اليومي — يجلب صفحات مفتاحية من الموقع المنشور ويتحقق أنها تخدم ما يُتوقع.
//
// يحرس ما لا يراه فحص طلب الدمج (الذي يعمل على معاينة محلية): نشر فشل بصمت، صفحة لغة سقطت،
// أو إعادة بناء يومية توقفت فتقادم ما يُحسب من تاريخ اليوم (الفعاليات، أوقات العمل الحية).
//
// لكل صفحة HTML: 200، وlang المتوقعة على <html>، وog:site_name باسم الموقع بلغتها، وتعليق الملكية
// الذي يحمل تاريخ البناء (generated:YYYY-MM-DD من src/layouts/Base.astro). ولملفات البيانات: 200
// وحدّ أدنى للحجم وعلامة محتوى.
//
// عمر البناء: يُفرض حين يُضبط PROD_MAX_AGE_DAYS (رقم أيام)؛ بلا المتغير يُطبع العمر ولا يُحكم به.
// يُضبط بعد تفعيل إعادة البناء اليومية، لا قبلها: قبلها يتقدّم التاريخ بالنشر عند الدمج وحده.
//
// الاستعمال: node tools/prod-smoke.mjs   (رمز الخروج 1 عند أي إخفاق)
// المنطق في دوال نقية مصدَّرة (checkHtmlPage، checkDataFile، buildAgeDays) يُختبر كسرها في الذاكرة.
import { pathToFileURL } from 'node:url';

export const ORIGIN = 'https://visit-alahsa.com';

const AR_NAME = 'زوروا الأحساء';
const LATIN_NAME = 'Visit Al-Ahsa';

/** صفحات HTML المفحوصة: الرئيسيات السبع وفهرسا الفعاليات (أكثر ما يتأثر بتاريخ البناء). */
export const HTML_PAGES = [
  { path: '/', lang: 'ar', siteName: AR_NAME },
  { path: '/en/', lang: 'en', siteName: LATIN_NAME },
  { path: '/zh/', lang: 'zh', siteName: LATIN_NAME },
  { path: '/de/', lang: 'de', siteName: LATIN_NAME },
  { path: '/ru/', lang: 'ru', siteName: LATIN_NAME },
  { path: '/ur/', lang: 'ur', siteName: LATIN_NAME },
  { path: '/tr/', lang: 'tr', siteName: LATIN_NAME },
  { path: `/${encodeURIComponent('فعاليات')}/`, lang: 'ar', siteName: AR_NAME },
  { path: '/en/events/', lang: 'en', siteName: LATIN_NAME },
];

/** ملفات بيانات: حدّ أدنى للحجم بالبايت وعلامة يجب أن ترد. */
export const DATA_FILES = [
  { path: '/sitemap.xml', minBytes: 100_000, marker: '<urlset' },
  { path: '/llms.txt', minBytes: 5_000, marker: 'visit-alahsa.com' },
  { path: '/robots.txt', minBytes: 50, marker: 'Sitemap:' },
];

/** قيمة سمة من أول وسم يبدأ بـ«<tag» — مسح خطي بلا تعبير نمطي على الوسوم. */
const firstTagAttr = (html, tag, attr) => {
  const lower = html.toLowerCase();
  const start = lower.indexOf('<' + tag);
  if (start === -1) return undefined;
  const end = html.indexOf('>', start);
  if (end === -1) return undefined;
  const open = html.slice(start, end);
  const k = open.toLowerCase().indexOf(attr + '="');
  if (k === -1) return undefined;
  const from = k + attr.length + 2;
  const close = open.indexOf('"', from);
  return close === -1 ? undefined : open.slice(from, close);
};

/** محتوى <meta property="og:site_name"> أو undefined. */
const ogSiteName = (html) => {
  const key = 'property="og:site_name"';
  const at = html.indexOf(key);
  if (at === -1) return undefined;
  const start = html.lastIndexOf('<', at);
  const end = html.indexOf('>', at);
  if (start === -1 || end === -1) return undefined;
  const tag = html.slice(start, end);
  const c = tag.indexOf('content="');
  if (c === -1) return undefined;
  const close = tag.indexOf('"', c + 9);
  return close === -1 ? undefined : tag.slice(c + 9, close);
};

/** تاريخ البناء من تعليق الملكية «generated:YYYY-MM-DD»، أو undefined. */
export const generatedDay = (html) => {
  const key = 'generated:';
  const at = html.indexOf(key);
  if (at === -1) return undefined;
  const day = html.slice(at + key.length, at + key.length + 10);
  const t = Date.parse(`${day}T00:00:00Z`);
  return Number.isNaN(t) || day.length !== 10 ? undefined : day;
};

/** الأيام الكاملة بين تاريخ البناء واليوم (كلاهما YYYY-MM-DD). */
export const buildAgeDays = (generated, today) =>
  Math.round((Date.parse(`${today}T00:00:00Z`) - Date.parse(`${generated}T00:00:00Z`)) / 86_400_000);

/**
 * @param {{path: string, lang: string, siteName: string}} page
 * @param {{status: number, body: string}} res
 * @param {{today: string, maxAgeDays?: number}} opts
 * @returns {{problems: string[], generated?: string}}
 */
export function checkHtmlPage(page, res, { today, maxAgeDays }) {
  const problems = [];
  if (res.status !== 200) return { problems: [`${page.path}: الحالة ${res.status}`] };
  const lang = firstTagAttr(res.body, 'html', 'lang');
  if (!lang || !(lang === page.lang || lang.startsWith(page.lang + '-'))) problems.push(`${page.path}: lang «${lang ?? 'غائبة'}» والمتوقع ${page.lang}`);
  const name = ogSiteName(res.body);
  if (name !== page.siteName) problems.push(`${page.path}: og:site_name «${name ?? 'غائب'}» والمتوقع «${page.siteName}»`);
  const generated = generatedDay(res.body);
  if (!generated) problems.push(`${page.path}: تعليق تاريخ البناء غائب`);
  else if (maxAgeDays !== undefined) {
    const age = buildAgeDays(generated, today);
    if (age > maxAgeDays) problems.push(`${page.path}: البناء بتاريخ ${generated} عمره ${age} يوماً والحدّ ${maxAgeDays}`);
  }
  return { problems, generated };
}

/**
 * @param {{path: string, minBytes: number, marker: string}} file
 * @param {{status: number, body: string}} res
 * @returns {string[]}
 */
export function checkDataFile(file, res) {
  if (res.status !== 200) return [`${file.path}: الحالة ${res.status}`];
  const problems = [];
  const bytes = Buffer.byteLength(res.body, 'utf8');
  if (bytes < file.minBytes) problems.push(`${file.path}: ${bytes} بايت والحدّ الأدنى ${file.minBytes}`);
  if (!res.body.includes(file.marker)) problems.push(`${file.path}: العلامة «${file.marker}» غائبة`);
  return problems;
}

/** تاريخ اليوم بتوقيت الرياض (UTC+3). */
export const riyadhDay = (now = new Date()) => new Date(now.getTime() + 3 * 3600 * 1000).toISOString().slice(0, 10);

/** PROD_MAX_AGE_DAYS: عدد صحيح غير سالب، أو undefined إن غاب أو لم يصلح. */
export const parseMaxAge = (raw) => {
  if (raw === undefined || raw.trim() === '') return undefined;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 ? n : undefined;
};

async function get(pathname) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(ORIGIN + pathname, { signal: controller.signal, redirect: 'manual', headers: { 'user-agent': 'prod-smoke' } });
    return { status: res.status, body: await res.text() };
  } catch (e) {
    return { status: 0, body: '', error: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const today = riyadhDay();
  const maxAgeDays = parseMaxAge(process.env.PROD_MAX_AGE_DAYS);
  const problems = [];
  const days = new Set();
  for (const page of HTML_PAGES) {
    const res = await get(page.path);
    if (res.error) { problems.push(`${page.path}: تعذّر الجلب — ${res.error}`); continue; }
    const r = checkHtmlPage(page, res, { today, maxAgeDays });
    problems.push(...r.problems);
    if (r.generated) days.add(r.generated);
  }
  for (const file of DATA_FILES) {
    const res = await get(file.path);
    if (res.error) { problems.push(`${file.path}: تعذّر الجلب — ${res.error}`); continue; }
    problems.push(...checkDataFile(file, res));
  }
  const built = [...days].sort((a, b) => a.localeCompare(b));
  const age = built.length ? buildAgeDays(built[0], today) : undefined;
  console.log(`prod-smoke: ${HTML_PAGES.length} صفحة و${DATA_FILES.length} ملفات من ${ORIGIN} — تاريخ البناء ${built.join('، ') || 'غير مقروء'}${age === undefined ? '' : ` (العمر ${age} يوماً، ${maxAgeDays === undefined ? 'بلا حدّ مفروض' : `الحدّ ${maxAgeDays}`})`}`);
  if (problems.length) {
    console.error(`✗ ${problems.length} إخفاق:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log('✓ الإنتاج يخدم الصفحات المفتاحية كما يُتوقع.');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((e) => { console.error('✗ فحص الإنتاج انهار:', e); process.exit(1); });
}
