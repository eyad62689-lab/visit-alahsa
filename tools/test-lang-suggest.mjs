// فحص قبول الخطوة 2 من خطة التفاعل العالمي: استقبال الزائر بلغته.
// (docs/تشخيص-التفاعل-العالمي-وخطة-التحسين-2026-09-08.md § خارطة التنفيذ، الخطوة 2)
//
// يحاكي لغات المتصفح (navigator.languages) في سياقات معزولة ويتحقق من:
//   - شريط اقتراح اللغة: يظهر للغة مفضّلة تسبق لغة الصفحة ولها نظير، ولا يظهر عند
//     التطابق أو غياب النظير، ويُحفظ الرفض، ويقيس النقر والرفض.
//   - صفحة 404 تكشف كتلة لغة بادئة المسار.
//   - بيان تطبيق لكل لغة، والصفحة تربط بيانها.
//   - axe-core: صفر مخالفات إتاحة في الصفحات التي يظهر فيها الشريط وفي 404.
// التشغيل كسابقة tools/test-analytics-events.mjs (puppeteer-core خارج المستودع):
//   PUPPETEER_DIR=<مجلد فيه puppeteer-core وaxe-core> CHROME=<كروم> BASE=http://127.0.0.1:4399 node tools/test-lang-suggest.mjs
import { createRequire } from 'node:module';
import { readFileSync, existsSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://localhost:4399';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DIR = (process.env.PUPPETEER_DIR ?? '.').replace(/\\/g, '/');

let puppeteer;
try { puppeteer = createRequire(`${DIR}/x.js`)('puppeteer-core'); }
catch { console.error('لم أجد puppeteer-core. ثبّته في مجلد خارج المستودع ومرّر مساره في PUPPETEER_DIR.'); process.exit(2); }
const AXE = `${DIR}/node_modules/axe-core/axe.min.js`;
const axeSrc = existsSync(AXE) ? readFileSync(AXE, 'utf8') : null;
if (!axeSrc) console.log('· axe-core غير مثبّت في PUPPETEER_DIR — فحص الإتاحة يُتخطّى (npm i axe-core)');

const failures = []; let passed = 0;
const ok = (cond, label, extra = '') => {
  if (cond) { passed++; console.log(`  ✓ ${label}${extra ? ' — ' + extra : ''}`); }
  else { failures.push(label); console.log(`  ✗ ${label}${extra ? ' — ' + extra : ''}`); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const events = (page) => page.evaluate(() => (window.dataLayer || []).map((x) => Array.from(x || [])).filter((x) => x[0] === 'event').map((x) => ({ name: x[1], params: x[2] || {} })));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });

/** صفحة في سياق معزول (تخزين نظيف) بلغات متصفح محاكاة */
async function fresh(langs) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: 390, height: 800, isMobile: true, hasTouch: true });
  await page.evaluateOnNewDocument((ls) => {
    Object.defineProperty(navigator, 'languages', { get: () => ls });
    Object.defineProperty(navigator, 'language', { get: () => ls[0] });
  }, langs);
  await page.setRequestInterception(true);
  page.on('request', (r) => (/googletagmanager\.com|google-analytics\.com/.test(r.url()) ? r.abort() : r.continue()));
  page.goto2 = (p) => page.goto(BASE + p, { waitUntil: 'networkidle0', timeout: 30000 });
  page.bar = async (timeout = 5000) => {
    try {
      await page.waitForSelector('#lang-suggest:not([hidden]) .ls-opt:not([hidden])', { timeout });
      return page.$eval('#lang-suggest:not([hidden]) .ls-opt:not([hidden])', (el) => ({
        to: el.getAttribute('data-for'), lang: el.getAttribute('lang'), dir: el.getAttribute('dir'),
        href: el.querySelector('.ls-cta').getAttribute('href'), cta: el.querySelector('.ls-cta').textContent.trim(),
        text: (el.querySelector('.ls-tx') || {}).textContent || '', close: el.querySelector('.ls-x').getAttribute('aria-label'),
      }));
    } catch { return null; }
  };
  page.noBar = async () => { await sleep(2500); return (await page.$('#lang-suggest:not([hidden])')) === null; };
  page.axe = async (label) => {
    if (!axeSrc) return;
    await page.addScriptTag({ content: axeSrc });
    const r = await page.evaluate(() => axe.run(document, { resultTypes: ['violations'] }));
    ok(r.violations.length === 0, `axe: ${label}`, r.violations.length ? r.violations.map((v) => `${v.id}×${v.nodes.length}`).join(', ') : '0 مخالفات');
  };
  page.done = () => ctx.close();
  return page;
}

try {
  console.log('\n── الشريط: لغة مفضّلة تسبق لغة الصفحة ولها نظير ──');
  let p = await fresh(['de-DE', 'de', 'en']);
  await p.goto2('/');
  let bar = await p.bar();
  ok(bar && bar.to === 'de' && bar.href === '/de/' && bar.lang === 'de' && bar.cta === 'Deutsch' && bar.text === '', 'ألماني على الجذر → اقتراح /de/ باسم اللغة الأصلي وحده', JSON.stringify(bar));
  await p.axe('الجذر مع الشريط (de)');
  // ClientRouter ينقل داخل المستند (History API) فلا نعتمد على waitForNavigation؛ نراقب المسار
  await p.click('#lang-suggest .ls-opt:not([hidden]) .ls-cta');
  let path = '/';
  for (let i = 0; i < 24 && path === '/'; i++) { await sleep(250); path = await p.evaluate(() => location.pathname); }
  ok(path === '/de/', 'النقر يقود إلى /de/', path);
  await sleep(500);
  let ev = await events(p);
  ok(ev.some((e) => e.name === 'lang_suggest_click' && e.params.to === 'de'), 'حدث lang_suggest_click (to = de)');
  ok(await p.noBar(), 'لا شريط على /de/ بعد الانتقال');
  await p.goto2('/');
  ok(await p.noBar(), 'لا شريط على الجذر بعد الاستجابة للاقتراح (localStorage)');
  await p.done();

  p = await fresh(['en-US', 'en']);
  await p.goto2('/');
  bar = await p.bar();
  ok(bar && bar.to === 'en' && bar.href === '/en/' && bar.text === 'This page is available in English' && bar.cta === 'Read in English' && bar.close === 'Dismiss', 'إنجليزي على الجذر → جملة ودعوة إنجليزيتان', JSON.stringify(bar));
  await p.axe('الجذر مع الشريط (en)');
  await p.done();

  console.log('\n── لا شريط عند التطابق أو غياب النظير ──');
  p = await fresh(['ar-SA', 'ar']); await p.goto2('/'); ok(await p.noBar(), 'عربي على الجذر → لا شريط'); await p.done();
  p = await fresh(['en', 'ar']); await p.goto2('/en/'); ok(await p.noBar(), 'إنجليزي ثم عربي على /en/ → لا شريط (لغة الصفحة أولاً)'); await p.done();
  p = await fresh(['ar', 'en']); await p.goto2('/en/attractions/jabal-al-qarah/'); bar = await p.bar();
  ok(bar && bar.to === 'ar' && bar.href === '/معالم/جبل-القارة/' && bar.dir === 'rtl', 'عربي أولاً على صفحة إنجليزية → اقتراح النظير العربي بالاتجاه الصحيح', bar && bar.href); await p.done();
  p = await fresh(['zh-CN', 'zh']); await p.goto2('/en/map/'); bar = await p.bar();
  ok(bar && bar.to === 'zh' && bar.href === '/zh/map/' && bar.cta === '中文（简体）', 'صيني على /en/map/ → اقتراح /zh/map/', bar && bar.href);
  await p.axe('/en/map/ مع الشريط (zh)'); await p.done();
  p = await fresh(['ru-RU', 'ru']); await p.goto2('/en/map/'); ok(await p.noBar(), 'روسي على /en/map/ → لا شريط (لا نظير روسي فلا رابط إلى 404)'); await p.done();
  p = await fresh(['fr-FR', 'fr', 'de']); await p.goto2('/'); bar = await p.bar();
  ok(bar && bar.to === 'de', 'فرنسي ثم ألماني على الجذر → تُتخطّى اللغة غير المدعومة إلى التالية', bar && bar.to); await p.done();

  console.log('\n── الرفض يُحفظ ويُقاس ──');
  p = await fresh(['en']); await p.goto2('/معالم/'); bar = await p.bar();
  ok(bar && bar.href === '/en/attractions/', 'شريط على فهرس المعالم العربي → /en/attractions/');
  await p.click('#lang-suggest .ls-opt:not([hidden]) .ls-x');
  ok((await p.$('#lang-suggest:not([hidden])')) === null, 'الرفض يخفي الشريط');
  ev = await events(p);
  ok(ev.some((e) => e.name === 'lang_suggest_dismiss' && e.params.to === 'en'), 'حدث lang_suggest_dismiss (to = en)');
  ok((await p.evaluate(() => { try { return localStorage.getItem('va-lang-suggest'); } catch (e) { return null; } })) === 'off', 'localStorage va-lang-suggest = off');
  await p.goto2('/'); ok(await p.noBar(), 'لا شريط بعد الرفض في زيارة تالية'); await p.done();

  console.log('\n── صفحة 404 بلغة بادئة المسار ──');
  p = await fresh(['en']);
  for (const [path, want, label] of [['/de/does-not-exist/', 'de', 'Startseite'], ['/zh/nope/', 'zh', '首页'], ['/ru/nope/', 'ru', 'Главная'], ['/en/nope/', 'en', 'Home'], ['/لا-وجود/', 'ar', 'الرئيسية']]) {
    const res = await p.goto2(path);
    const vis = await p.$$eval('.nf-block', (bs) => bs.filter((b) => !b.hidden).map((b) => ({ lang: b.getAttribute('data-lang'), home: b.querySelector('a.btn--gold').textContent.trim(), href: b.querySelector('a.btn--gold').getAttribute('href') })));
    ok(res.status() === 404 && vis.length === 1 && vis[0].lang === want && vis[0].home === label && vis[0].href === (want === 'ar' ? '/' : `/${want}/`), `404 على ${path} → كتلة ${want}`, `${res.status()} · ${JSON.stringify(vis)}`);
    if (want === 'de') { ok(await p.noBar(), 'لا شريط اقتراح على 404'); await p.axe('404 (de)'); }
  }
  await p.done();

  console.log('\n── بيان التطبيق لكل لغة ──');
  p = await fresh(['en']);
  for (const [path, lang, start] of [['/en/site.webmanifest', 'en', '/en/'], ['/zh/site.webmanifest', 'zh-CN', '/zh/'], ['/de/site.webmanifest', 'de', '/de/'], ['/ru/site.webmanifest', 'ru', '/ru/'], ['/site.webmanifest', 'ar', '/']]) {
    const res = await p.goto2(path);
    let m = null; try { m = JSON.parse(await res.text()); } catch {}
    ok(res.ok() && m && m.lang === lang && m.start_url === start && Array.isArray(m.icons) && m.icons.length === 3, `${path} → lang ${lang} · start_url ${start}`, m ? m.name : String(res.status()));
  }
  for (const [path, href] of [['/en/', '/en/site.webmanifest'], ['/zh/attractions/', '/zh/site.webmanifest'], ['/', '/site.webmanifest']]) {
    await p.goto2(path);
    const got = await p.$eval('link[rel="manifest"]', (l) => l.getAttribute('href'));
    ok(got === href, `${path} يربط ${href}`, got);
  }
  await p.done();
} finally {
  await browser.close();
}

console.log(`\n${failures.length ? '✗' : '✓'} ${passed} شرطاً تحقق · ${failures.length} أخفق`);
if (failures.length) { console.log('  أخفق: ' + failures.join(' | ')); process.exit(1); }
