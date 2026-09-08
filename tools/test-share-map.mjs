// فحص قبول الخطوة 6 من خطة التفاعل العالمي: المشاركة بضغطة وروابط الخريطة العميقة.
// (docs/تشخيص-التفاعل-العالمي-وخطة-التحسين-2026-09-08.md § خارطة التنفيذ، الخطوة 6)
//
// يتحقق من: زر المشاركة في القوالب الخمسة (معلم، مقال، منشأة، إقامة، فعالية) وعلى
// الخريطة؛ مسار Web Share (محاكاة navigator.share) ومسار النسخ (محاكاة clipboard)
// وحدث `share` بطريقته؛ ونصوص الزر بلغة الصفحة (zh من plan.copy، وde أيقونة وحدها)؛
// وحالة الخريطة في الرابط تُقرأ (?cat= و?q= و#slug) وتُكتب عند التغيير مع حدث map_deeplink.
// التشغيل كسابقة tools/test-analytics-events.mjs (puppeteer-core خارج المستودع).
import { createRequire } from 'node:module';

const BASE = process.env.BASE ?? 'http://localhost:4399';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DIR = (process.env.PUPPETEER_DIR ?? '.').replace(/\\/g, '/');
let puppeteer;
try { puppeteer = createRequire(`${DIR}/x.js`)('puppeteer-core'); }
catch { console.error('لم أجد puppeteer-core. ثبّته في مجلد خارج المستودع ومرّر مساره في PUPPETEER_DIR.'); process.exit(2); }

const failures = []; let passed = 0;
const ok = (cond, label, extra = '') => {
  if (cond) { passed++; console.log(`  ✓ ${label}${extra ? ' — ' + extra : ''}`); }
  else { failures.push(label); console.log(`  ✗ ${label}${extra ? ' — ' + extra : ''}`); }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const events = (page) => page.evaluate(() => (window.dataLayer || []).map((x) => Array.from(x || [])).filter((x) => x[0] === 'event').map((x) => ({ name: x[1], params: x[2] || {} })));
const find = (list, name, pred = () => true) => list.find((e) => e.name === name && pred(e.params));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
async function fresh({ share, clipboard }) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const cdp = await page.createCDPSession();
  await cdp.send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*', '*cartocdn.com*'] });
  await page.evaluateOnNewDocument((share, clipboard) => {
    if (share) Object.defineProperty(navigator, 'share', { value: async (d) => { window.__shared = d; }, configurable: true });
    else Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
    if (clipboard) Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (t) => { window.__copied = t; } }, configurable: true });
  }, share, clipboard);
  page.goto2 = (p) => page.goto(BASE + p, { waitUntil: 'networkidle0', timeout: 30000 });
  page.done = () => ctx.close();
  return page;
}

try {
  console.log('\n── زر المشاركة: Web Share ثم النسخ ──');
  let p = await fresh({ share: true, clipboard: false });
  await p.goto2('/en/attractions/jabal-al-qarah/');
  const btn = await p.$('button[data-share="attraction"]');
  ok(btn, 'زر المشاركة في صفحة المعلم');
  ok((await p.$eval('button[data-share="attraction"] [data-share-tx]', (e) => e.textContent.trim())) === 'Share', 'نصّ الزر الإنجليزي «Share»');
  await p.click('button[data-share="attraction"]');
  await sleep(300);
  const shared = await p.evaluate(() => window.__shared || null);
  ok(shared && shared.url === BASE + '/en/attractions/jabal-al-qarah/' && shared.title.includes('Jabal'), 'navigator.share استُدعي بالرابط والعنوان', shared && shared.url);
  let ev = await events(p);
  ok(find(ev, 'share', (x) => x.method === 'web_share' && x.content_type === 'attraction' && x.item_id === 'jabal-al-qarah'), 'حدث share (web_share · attraction · jabal-al-qarah)');
  await p.done();

  p = await fresh({ share: false, clipboard: true });
  await p.goto2('/en/blog/48-hours-in-al-ahsa/');
  ok(await p.$('button[data-share="blog"]'), 'زر المشاركة في المقال');
  await p.click('button[data-share="blog"]');
  await sleep(300);
  const copiedUrl = await p.evaluate(() => window.__copied || '');
  ok(copiedUrl === BASE + '/en/blog/48-hours-in-al-ahsa/', 'النسخ إلى الحافظة عند غياب Web Share', copiedUrl);
  ok(await p.$eval('button[data-share="blog"]', (b) => b.classList.contains('is-copied') && b.textContent.includes('Link copied')), 'الزر يعرض «Link copied ✓»');
  ev = await events(p);
  ok(find(ev, 'share', (x) => x.method === 'copy' && x.content_type === 'blog'), 'حدث share (copy · blog)');
  await sleep(2400);
  ok(await p.$eval('button[data-share="blog"]', (b) => !b.classList.contains('is-copied') && b.textContent.trim() === 'Share'), 'الزر يعود إلى «Share» بعد ثانيتين');

  console.log('\n── الوجود في بقية القوالب وبلغات أخرى ──');
  await p.goto2('/en/restaurants-cafes/dar-basma/'); ok(await p.$('button[data-share="dining"]'), 'زر المشاركة في صفحة المنشأة');
  await p.goto2('/en/stay/');
  const stayHref = await p.$eval('a[href^="/en/stay/"][href$="/"]:not([href="/en/stay/"])', (a) => a.getAttribute('href')).catch(() => null);
  if (stayHref) { await p.goto2(stayHref); ok(await p.$('button[data-share="stay"]'), 'زر المشاركة في صفحة الإقامة', stayHref); }
  else console.log('  · لا صفحة إقامة مفردة مبنية — يُتخطّى');
  await p.goto2('/en/events/hasawi-lomi-exhibition/'); ok(await p.$('button[data-share="event"]'), 'زر المشاركة في صفحة الفعالية');
  await p.goto2('/معالم/جبل-القارة/'); ok((await p.$eval('button[data-share="attraction"] [data-share-tx]', (e) => e.textContent.trim())) === 'مشاركة', 'النصّ العربي «مشاركة»');
  await p.goto2('/zh/attractions/jabal-al-qarah/'); ok((await p.$eval('button[data-share="attraction"] [data-share-tx]', (e) => e.textContent.trim())) === '复制分享链接', 'الصينية من مفتاح plan.copy المعتمد');
  await p.goto2('/de/attractions/jabal-al-qarah/');
  const de = await p.$eval('button[data-share="attraction"]', (b) => ({ text: b.textContent.trim(), aria: b.getAttribute('aria-label'), icon: b.classList.contains('share-btn--icon') }));
  ok(de.text === '' && de.aria === 'Share' && de.icon, 'الألمانية أيقونة وحدها بتسمية aria من كلمة واحدة', JSON.stringify(de));
  await p.done();

  console.log('\n── الخريطة: روابط عميقة وحالة في الرابط ──');
  p = await fresh({ share: false, clipboard: true });
  await p.goto2('/en/map/?cat=museum&q=ahsa#ahsa-museum');
  await p.waitForSelector('#map .leaflet-marker-pane', { timeout: 15000 }).catch(() => {});
  await sleep(800);
  ok((await p.$eval('#map-chips .chip.is-active', (c) => c.getAttribute('data-filter'))) === 'museum', 'شريحة museum فعّالة من ?cat=');
  ok((await p.$eval('#map-search', (i) => i.value)) === 'ahsa', 'حقل البحث من ?q=');
  // البحث يطابق الاسم والمنطقة بأي لغة (نصّ q في MapView)، فالحكم بالفئة والعدد لا بنصّ العنوان
  const visible = await p.$$eval('#map-list > li', (lis) => lis.filter((l) => !l.hidden).map((l) => ({ t: l.querySelector('.ms-t').textContent.trim(), k: l.querySelector('.ms-k').textContent.trim() })));
  const kinds = new Set(visible.map((v) => v.k));
  ok(visible.length > 0 && visible.length < 58 && kinds.size === 1, 'القائمة مفلترة بالفئة والبحث', `${visible.length} · ${[...kinds].join(',')}`);
  const popup = await p.$eval('.leaflet-popup-content', (e) => e.textContent).catch(() => '');
  ok(/Al-Ahsa Museum/.test(popup), 'بطاقة الدبوس #ahsa-museum مفتوحة', popup.slice(0, 40));
  ev = await events(p);
  ok(find(ev, 'map_deeplink', (x) => x.cat === 'museum' && x.item_id === 'ahsa-museum'), 'حدث map_deeplink');
  ok(await p.$('button[data-share="map"]'), 'زر مشاركة الخريطة');
  await p.click('#map-chips .chip[data-filter="historic"]');
  await sleep(200);
  ok((await p.evaluate(() => location.search)) === '?cat=historic&q=ahsa', 'الرابط يكتب الفئة الجديدة', await p.evaluate(() => location.search));
  await p.evaluate(() => { const i = document.getElementById('map-search'); i.value = ''; i.dispatchEvent(new Event('input')); });
  await p.type('#map-search', 'qasr');
  await sleep(500);
  ok((await p.evaluate(() => location.search)) === '?cat=historic&q=qasr', 'الرابط يكتب عبارة البحث', await p.evaluate(() => location.search));
  const first = await p.$('#map-list > li:not([hidden]) .ms-item');
  await first.click();
  await sleep(900);
  const hash = await p.evaluate(() => location.hash);
  ok(/^#[a-z0-9-]+$/.test(hash), 'النقر على عنصر القائمة يكتب #slug', hash);
  await p.click('button[data-share="map"]');
  await sleep(300);
  const mapUrl = await p.evaluate(() => window.__copied || '');
  ok(mapUrl.includes('?cat=historic&q=qasr#'), 'مشاركة الخريطة تنسخ الرابط بحالته', mapUrl.replace(BASE, ''));
  await p.done();
} finally {
  await browser.close();
}
console.log(`\n${failures.length ? '✗' : '✓'} ${passed} شرطاً تحقق · ${failures.length} أخفق`);
if (failures.length) { console.log('  أخفق: ' + failures.join(' | ')); process.exit(1); }
