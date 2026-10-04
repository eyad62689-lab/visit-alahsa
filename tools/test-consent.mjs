// فحص شريط موافقة التحليلات (2026-10-04، قرار إياد: منع كامل حتى القبول).
//
// يعمل على `dist` مبنيّ حديثاً بخادم ثابت مدمج ومتصفح حقيقي (puppeteer-core خارج المستودع،
// على سابقة tools/test-analytics-events.mjs). طلبات GA تُعترض وتُسجَّل ثم تُجهض — الفحص لا يحتاج شبكة.
//
//   PUPPETEER_DIR=<مجلد فيه puppeteer-core> [CHROME=<مسار كروم>] node tools/test-consent.mjs
//   BREAK=1 …  — يحذف سطر البوابة من HTML الصفحات في الذاكرة (لا المصدر ولا dist)، فيجب أن يفشل الفحص.
//
// يخرج بـ1 عند أي إخفاق.
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BREAK = process.env.BREAK === '1';
const GATE = "if (read() !== 'granted') return;";

let puppeteer;
try {
  const dir = process.env.PUPPETEER_DIR;
  puppeteer = createRequire(dir ? `${dir.replace(/\\/g, '/')}/x.js` : import.meta.url)('puppeteer-core');
} catch {
  console.error('لم أجد puppeteer-core. ثبّته في مجلد خارج المستودع ومرّر مساره في PUPPETEER_DIR.');
  process.exit(2);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
let gateSeen = 0;
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = join(DIST, p);
    if ((await stat(f).catch(() => null))?.isDirectory()) f = join(f, 'index.html');
    let body = await readFile(f);
    if (extname(f) === '.html') {
      let html = body.toString('utf8');
      if (html.includes(GATE)) gateSeen++;
      if (BREAK) html = html.split(GATE).join('');
      body = Buffer.from(html);
    }
    res.writeHead(200, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end('404'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const failures = [];
const ok = (cond, label) => { console.log(`  ${cond ? '✓' : '✗'} ${label}`); if (!cond) failures.push(label); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-gpu', '--lang=en-US'] });
async function fresh() {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const ga = [];
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    if (/googletagmanager\.com|google-analytics\.com/.test(r.url())) { ga.push(r.url()); r.abort(); } else r.continue();
  });
  return { ctx, page, ga };
}
const visible = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return !!e && !e.hidden && e.getBoundingClientRect().height > 0; }, sel);
const settle = () => sleep(4500); // تحميل GA مؤجَّل إلى load + خمول (مهلة 4 ث)

try {
  console.log('\n── قبل القرار: لا طلب إلى قوقل، والشريط ظاهر ──');
  let { ctx, page, ga } = await fresh();
  await page.goto(BASE + '/en/', { waitUntil: 'load' });
  await settle();
  ok(await visible(page, '#consent-bar'), 'الشريط ظاهر لزائر جديد (/en/)');
  ok(ga.length === 0, `لا طلب GA قبل القرار (${ga.length})`);
  ok(await page.evaluate(() => (window.dataLayer || []).some((x) => x[0] === 'event' && x[1] === 'page_view')), 'page_view مصفوف محلياً في dataLayer');

  console.log('\n── رفض ──');
  await page.click('#consent-bar [data-consent="denied"]');
  await sleep(300);
  ok(!(await visible(page, '#consent-bar')), 'الشريط يختفي بعد «رفض»');
  ok(await page.evaluate(() => localStorage.getItem('va-analytics-consent')) === 'denied', 'الرفض محفوظ');
  await page.goto(BASE + '/en/attractions/jabal-al-qarah/', { waitUntil: 'load' });
  await settle();
  ok(!(await visible(page, '#consent-bar')), 'لا شريط في الصفحة التالية بعد الرفض');
  ok(ga.length === 0, `لا طلب GA بعد الرفض (${ga.length})`);
  await page.click('[data-consent-open]');
  await sleep(300);
  ok(await visible(page, '#consent-bar'), 'رابط التذييل يعيد فتح الشريط');
  await ctx.close();

  console.log('\n── قبول ──');
  ({ ctx, page, ga } = await fresh());
  await page.goto(BASE + '/de/', { waitUntil: 'load' });
  await sleep(1500);
  ok(ga.length === 0, 'لا طلب GA قبل النقر (/de/)');
  await page.click('#consent-bar [data-consent="granted"]');
  await sleep(800);
  ok(ga.some((u) => u.includes('gtag/js')), 'القبول يحقن gtag.js فوراً');
  ok(!(await visible(page, '#consent-bar')), 'الشريط يختفي بعد «قبول»');
  ga.length = 0;
  await page.goto(BASE + '/de/map/', { waitUntil: 'load' });
  await settle();
  ok(ga.some((u) => u.includes('gtag/js')), 'gtag.js يُحمَّل تلقائياً في زيارة لاحقة بعد القبول');
  ok(!(await visible(page, '#consent-bar')), 'لا شريط بعد القبول');
  await ctx.close();

  console.log('\n── الصفحة العربية: اقتراح اللغة ينتظر القرار ──');
  ({ ctx, page, ga } = await fresh());
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await sleep(2500);
  ok(await visible(page, '#consent-bar'), 'الشريط ظاهر على الرئيسية العربية');
  ok(!(await visible(page, '#lang-suggest')), 'اقتراح اللغة مخفي ما دام القرار معلّقاً');
  await page.click('#consent-bar [data-consent="denied"]');
  await sleep(2500);
  ok(await visible(page, '#lang-suggest'), 'اقتراح اللغة يظهر بعد القرار (متصفح en-US)');
  ok(ga.length === 0, 'لا طلب GA على العربية بعد الرفض');
  await page.goto(BASE + '/' + encodeURIComponent('دليل-التأشيرات') + '/', { waitUntil: 'load' });
  ok(await page.$('#consent-bar') !== null, 'الشريط مضمَّن في دليل التأشيرات');
  await ctx.close();

  ok(gateSeen > 0, `سطر البوابة موجود في HTML المخدوم (${gateSeen} صفحة)`);
} finally {
  await browser.close();
  server.close();
}
console.log(failures.length ? `\n✗ ${failures.length} إخفاق${BREAK ? ' (متوقَّع في وضع الكسر)' : ''}` : '\n✓ كل الفحوص نجحت');
process.exit(failures.length ? 1 : 0);
