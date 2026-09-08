// فحص قبول الخطوة 1 من خطة التفاعل العالمي: هل تصل أحداث القياس إلى dataLayer؟
// (docs/تشخيص-التفاعل-العالمي-وخطة-التحسين-2026-09-08.md § خارطة التنفيذ، الخطوة 1)
//
// يعمل على `dist` مبنيّ حديثاً بمتصفح حقيقي، على سابقة tools/measure-header-fit.mjs:
// puppeteer-core لا يُثبَّت في المستودع (لا يثقل بناء نتلايفي) بل في مجلد خارجي.
//
// التشغيل:
//   1) في مجلد خارج المستودع:  npm init -y && npm i puppeteer-core
//   2) npx astro preview --port 4399     (داخل المستودع، على dist مبنيّ حديثاً)
//   3) PUPPETEER_DIR=<ذلك المجلد> CHROME=<مسار كروم> node tools/test-analytics-events.mjs
//
// يخرج بـ1 عند غياب أي حدث متوقَّع. طلبات GA الخارجية تُحجب فتبقى الأحداث في
// dataLayer (طابور gtag) حيث نقرؤها — الفحص لا يحتاج شبكة.
import { createRequire } from 'node:module';

const BASE = process.env.BASE ?? 'http://localhost:4399';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

let puppeteer;
try {
  const dir = process.env.PUPPETEER_DIR;
  const require = createRequire(dir ? `${dir.replace(/\\/g, '/')}/x.js` : import.meta.url);
  puppeteer = require('puppeteer-core');
} catch {
  console.error('لم أجد puppeteer-core. ثبّته في مجلد خارج المستودع ومرّر مساره في PUPPETEER_DIR.');
  process.exit(2);
}

const failures = [];
const seen = [];
const ok = (cond, label, extra = '') => {
  if (cond) { seen.push(label); console.log(`  ✓ ${label}${extra ? ' — ' + extra : ''}`); }
  else { failures.push(label); console.log(`  ✗ ${label}${extra ? ' — ' + extra : ''}`); }
};

/** أحداث dataLayer بصيغة {name, params} — مدخلات gtag كائنات arguments فنحوّلها مصفوفات */
const events = (page) => page.evaluate(() =>
  (window.dataLayer || [])
    .map((x) => Array.from(x || []))
    .filter((x) => x[0] === 'event')
    .map((x) => ({ name: x[1], params: x[2] || {} })));

const find = (list, name, pred = () => true) => list.find((e) => e.name === name && pred(e.params));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** ينتظر حتى يظهر حدث بالاسم (مع شرط اختياري) أو تنقضي المهلة */
async function waitEvent(page, name, pred, timeout = 6000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    const hit = find(await events(page), name, pred);
    if (hit) return hit;
    await sleep(150);
  }
  return null;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--autoplay-policy=no-user-gesture-required', '--lang=en-US'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on('request', (r) => (/googletagmanager\.com|google-analytics\.com/.test(r.url()) ? r.abort() : r.continue()));
  const goto = (p) => page.goto(BASE + p, { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('\n── صفحة المعلم: المشاهدة، الحفظ، خرائط قوقل، البحث، مبدّل اللغة ──');
  await goto('/en/attractions/jabal-al-qarah/');
  let ev = await events(page);
  ok(find(ev, 'page_view', (p) => p.ai_source === '(none)' && typeof p.page_path === 'string'), 'page_view (المضمّن في Base) مع ai_source');
  ok(await page.evaluate(() => typeof window.VATrack === 'function'), 'window.VATrack معرَّف');

  // السمة العامة data-track: عنصر مؤقت لاختبار الآلية نفسها
  await page.evaluate(() => {
    const b = document.createElement('button'); b.dataset.track = 'test_event'; b.dataset.trackMethod = 'x'; b.dataset.trackContentType = 'y';
    document.body.append(b); b.click(); b.remove();
  });
  ev = await events(page);
  const g = find(ev, 'test_event');
  ok(g && g.params.method === 'x' && g.params.content_type === 'y' && g.params.lang === 'en', 'data-track العامة مع data-track-* → معاملات');

  await page.click('button.ah-fav');
  ev = await events(page);
  ok(find(ev, 'plan_add', (p) => p.item_id === 'جبل-القارة'), 'plan_add عند الحفظ', 'item_id = جبل-القارة');
  await page.click('button.ah-fav');
  ev = await events(page);
  ok(find(ev, 'plan_remove', (p) => p.item_id === 'جبل-القارة'), 'plan_remove عند الإلغاء');

  // خرائط قوقل: الرابط يفتح تبويباً جديداً — نمنع الفتح ونبقي النقر
  await page.evaluate(() => document.querySelectorAll('a.map-link').forEach((a) => a.addEventListener('click', (e) => e.preventDefault())));
  await page.click('a.map-link');
  ev = await events(page);
  ok(find(ev, 'maps_open', (p) => p.item_id === '/en/attractions/jabal-al-qarah/'), 'maps_open عند الخروج إلى خرائط قوقل');

  await page.click('#search-open');
  ev = await events(page);
  ok(find(ev, 'search_open'), 'search_open عند فتح البحث');
  await page.type('#sm-input', 'qarah');
  // Pagefind يُحمَّل كسولاً ويجلب أجزاء الفهرس عند أول بحث؛ المهلة تسع تحميل الفهرس على آلة بطيئة
  let waitErr = '';
  const gotResult = await page.waitForSelector('a.sm-item', { timeout: 20000 }).then(() => true).catch((e) => { waitErr = String(e).slice(0, 160); return false; });
  const diag = gotResult ? '' : await page.evaluate(() => `dialog.open=${document.getElementById('site-search')?.open} · value=${document.getElementById('sm-input')?.value} · results=${(document.getElementById('sm-results')?.textContent || '').slice(0, 80)}`).catch((e) => String(e).slice(0, 120));
  ok(gotResult, 'نتائج Pagefind ظهرت لعبارة «qarah»', gotResult ? '' : `${waitErr} · ${diag}`);
  if (gotResult) {
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}), page.click('a.sm-item')]);
    const sr = await waitEvent(page, 'search_result', (p) => p.search_term === 'qarah');
    ok(sr, 'search_result عند النقر على نتيجة', sr ? `item_id = ${sr.params.item_id}` : '');
  }

  await goto('/en/attractions/jabal-al-qarah/');
  await page.click('details[data-lang-menu] > summary');
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}), page.click('a.lang-item[lang="ar"]')]);
  const ls = await waitEvent(page, 'lang_switch', (p) => p.from === 'en' && p.to === 'ar');
  ok(ls, 'lang_switch عند تبديل اللغة', 'from = en · to = ar');

  console.log('\n── الفلاتر: الخريطة والمطاعم وفهرس المعالم ──');
  await goto('/en/map/');
  const chip = (await page.$$('.chip[data-filter]'))[1];
  await chip.click();
  ev = await events(page);
  const cv = await page.evaluate((el) => el.getAttribute('data-filter'), chip);
  ok(find(ev, 'filter_use', (p) => p.ui === 'map' && p.value === cv), 'filter_use على شرائح الخريطة', `value = ${cv}`);

  await goto('/en/restaurants-cafes/');
  await page.click('.chip[data-kind="cafe"]');
  // زر «مفتوح الآن» لا يُبنى إلا بوجود أوقات عمل حيّة (مفتاح Places في الإنتاج)
  const hasOpenNow = Boolean(await page.$('#dn-open'));
  if (hasOpenNow) await page.click('#dn-open');
  const districts = await page.$$eval('#dn-district option', (os) => os.map((o) => o.value));
  await page.select('#dn-district', districts[1] ?? 'all');
  ev = await events(page);
  ok(find(ev, 'filter_use', (p) => p.ui === 'dining' && p.value === 'cafe'), 'filter_use على شرائح المطاعم (النوع)');
  if (hasOpenNow) ok(find(ev, 'filter_use', (p) => p.ui === 'dining' && p.value === 'open_now'), 'filter_use على «مفتوح الآن»');
  else console.log('  · «مفتوح الآن» غير مبنيّ في هذا البناء (لا أوقات حيّة) — يُتخطّى');
  ok(find(ev, 'filter_use', (p) => p.ui === 'dining' && p.value === (districts[1] ?? 'all')), 'filter_use على قائمة الحيّ', `value = ${districts[1]}`);

  await goto('/en/attractions/');
  const sums = await page.$$('details.cat-sec > summary');
  await sums[1].click();
  ev = await events(page);
  ok(find(ev, 'filter_use', (p) => p.ui === 'attractions' && p.open === true), 'filter_use عند فتح قسم في فهرس المعالم');

  console.log('\n── الرئيسية: الفيديو ومؤشرات الويب الحيوية ──');
  await goto('/en/');
  let vp = await waitEvent(page, 'video_play', () => true, 8000);
  if (!vp) {
    // التشغيل التلقائي قد يمتنع في بيئة بلا تسريع؛ نختبر السلك نفسه بحدث playing صناعي
    await page.evaluate(() => document.querySelector('video.hero-vid')?.dispatchEvent(new Event('playing')));
    vp = await waitEvent(page, 'video_play', () => true, 2000);
    ok(vp, 'video_play (حدث playing صناعي — التشغيل التلقائي لم يقع في المتصفح المقطوع)');
  } else ok(vp, 'video_play عند تشغيل فيديو الهيرو تلقائياً', `video = ${vp.params.video}`);

  await page.mouse.click(640, 450); // تفاعل لتوليد INP
  await sleep(300);
  // إخفاء الصفحة يدفع web-vitals إلى الإرسال النهائي — نحاكي visibilityState
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  for (const m of ['LCP', 'CLS', 'TTFB']) {
    const w = await waitEvent(page, 'web_vitals', (p) => p.metric_name === m, 4000);
    ok(w, `web_vitals ${m}`, w ? `${w.params.metric_value} (${w.params.metric_rating})` : '');
  }
  const inp = await waitEvent(page, 'web_vitals', (p) => p.metric_name === 'INP', 2000);
  console.log(`  · web_vitals INP: ${inp ? inp.params.metric_value + ' ms' : 'لم يُبلَّغ (لا تفاعل مؤهَّل في المتصفح المقطوع — مقبول)'}`);
} finally {
  await browser.close();
}

console.log(`\n${failures.length ? '✗' : '✓'} ${seen.length} حدثاً/شرطاً تحقق · ${failures.length} أخفق`);
if (failures.length) { console.log('  أخفق: ' + failures.join(' | ')); process.exit(1); }
