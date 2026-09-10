// فحص قبول الخطوة 7 من خطة التفاعل العالمي: «بالقرب مني» على الخريطة و«كم يبعد عني» في صفحة المعلم.
// (docs/تشخيص-التفاعل-العالمي-وخطة-التحسين-2026-09-08.md § خارطة التنفيذ، الخطوة 7)
//
// بموقع محاكاة (وسط الهفوف) وإذن ممنوح: الخريطة تضع علامة الزائر وتكتب المسافة على كل
// عنصر وتعيد ترتيب القائمة من الأقرب مع حدث map_locate؛ وصفحة المعلم تعرض المسافة
// بصياغة اللغة. وبإذن مرفوض: رسالة خطأ وحدث ok=false. ورؤوس Permissions-Policy تسمح
// بالموقع للأصل نفسه (dist/_headers وnetlify.toml).
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';

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

// الرؤوس: المصدر والمخرج
for (const [f, re] of [['netlify.toml', /geolocation=\(self\)/], ['dist/_headers', /geolocation=\(self\)/]]) {
  let txt = ''; try { txt = readFileSync(f, 'utf8'); } catch {}
  ok(re.test(txt), `${f}: Permissions-Policy يسمح بالموقع للأصل نفسه`);
}

const HOFUF = { latitude: 25.3833, longitude: 49.5867 };
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
async function fresh(granted) {
  const ctx = await browser.createBrowserContext();
  if (granted) await ctx.overridePermissions(BASE, ['geolocation']);
  const page = await ctx.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const cdp = await page.createCDPSession();
  await cdp.send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*', '*cartocdn.com*'] });
  // الرفض: كروم المقطوع لا يحسم الإذن (يبقى prompt والطلب معلّقاً بلا مهلة)، فنحاكي
  // ردّ الرفض نفسه (PERMISSION_DENIED = 1) الذي يعيده المتصفح الحقيقي عند رفض الزائر
  if (!granted) await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'geolocation', { configurable: true, value: { getCurrentPosition: (_ok, err) => setTimeout(() => err({ code: 1, message: 'User denied Geolocation' }), 50) } });
  });
  if (granted) await page.setGeolocation(HOFUF);
  page.goto2 = (p) => page.goto(BASE + p, { waitUntil: 'networkidle0', timeout: 30000 });
  page.done = () => ctx.close();
  return page;
}

try {
  console.log('\n── الخريطة: إذن ممنوح ──');
  let p = await fresh(true);
  await p.goto2('/en/map/');
  await p.waitForSelector('#map .leaflet-marker-pane', { timeout: 15000 }).catch(() => {});
  ok(await p.$('#map-locate'), 'زر «موقعي» موجود بتسمية aria', await p.$eval('#map-locate', (b) => b.getAttribute('aria-label')));
  const before = await p.$$eval('#map-list > li .ms-t', (ts) => ts.slice(0, 3).map((t) => t.textContent.trim()));
  await p.click('#map-locate');
  await p.waitForSelector('#map .va-me', { timeout: 8000 }).catch(() => {});
  await sleep(400);
  ok(await p.$('#map .va-me'), 'علامة الزائر على الخريطة');
  const after = await p.$$eval('#map-list > li', (lis) => lis.slice(0, 5).map((l) => ({ t: l.querySelector('.ms-t').textContent.trim(), d: (l.querySelector('[data-dist]') || {}).textContent || '', hidden: l.hidden })));
  ok(after.every((x) => /km/.test(x.d)), 'المسافة مكتوبة على العناصر', after.map((x) => `${x.t}${x.d}`).join(' | '));
  const dists = after.map((x) => (x.d.match(/(\d+) km/) ? Number(x.d.match(/(\d+) km/)[1]) : 0));
  ok(dists.every((d, i) => i === 0 || d >= dists[i - 1]), 'القائمة مرتّبة من الأقرب', dists.join(' ≤ '));
  ok(JSON.stringify(before) !== JSON.stringify(after.slice(0, 3).map((x) => x.t)), 'الترتيب تغيّر عن الأبجدي');
  ok((await p.$eval('#map-locate', (b) => b.getAttribute('aria-pressed'))) === 'true', 'الزر في حالة مفعّلة');
  let ev = await events(p);
  ok(find(ev, 'map_locate', (x) => x.ok === true), 'حدث map_locate (ok)');
  ok((await p.evaluate(() => { try { return Object.keys(localStorage).some((k) => /geo|lat|lng|loc/i.test(k)); } catch (e) { return false; } })) === false, 'لا تخزين للموقع في localStorage');
  await p.done();

  console.log('\n── الخريطة: إذن مرفوض ──');
  p = await fresh(false);
  await p.goto2('/en/map/');
  await p.waitForSelector('#map .leaflet-marker-pane', { timeout: 15000 }).catch(() => {});
  await p.click('#map-locate');
  await p.waitForSelector('#map-locate-msg:not([hidden])', { timeout: 12000 }).catch(() => {});
  const msg = await p.$eval('#map-locate-msg', (m) => (m.hidden ? '' : m.textContent.trim())).catch(() => '');
  ok(/location permission/.test(msg), 'رسالة الخطأ الإنجليزية عند الرفض', msg);
  ev = await events(p);
  ok(find(ev, 'map_locate', (x) => x.ok === false), 'حدث map_locate (ok=false)');
  ok((await p.$('#map .va-me')) === null, 'لا علامة زائر عند الرفض');
  await p.done();

  console.log('\n── صفحة المعلم: «كم يبعد عني» ──');
  p = await fresh(true);
  await p.goto2('/en/attractions/jabal-al-qarah/');
  ok((await p.$eval('[data-dist-btn]', (b) => b.textContent.trim())) === 'How far from me?', 'الزر الإنجليزي «How far from me?»');
  await p.click('[data-dist-btn]');
  await p.waitForFunction(() => document.querySelector('[data-dist-out]')?.textContent.trim().length > 0, { timeout: 8000 }).catch(() => {});
  const out = await p.$eval('[data-dist-out]', (o) => o.textContent.trim());
  ok(/^~\d+ km$|^under 1 km$/.test(out), 'المسافة بصياغة الإنجليزية', out);
  ev = await events(p);
  ok(find(ev, 'distance_check', (x) => x.ok === true), 'حدث distance_check');
  await p.goto2('/معالم/جبل-القارة/');
  ok((await p.$eval('[data-dist-btn]', (b) => b.textContent.trim())) === 'كم يبعد عني؟', 'الزر العربي');
  await p.click('[data-dist-btn]');
  await p.waitForFunction(() => document.querySelector('[data-dist-out]')?.textContent.trim().length > 0, { timeout: 8000 }).catch(() => {});
  const outAr = await p.$eval('[data-dist-out]', (o) => o.textContent.trim());
  ok(/^نحو \d+ كم$|^أقل من كيلومتر$/.test(outAr), 'المسافة بصياغة العربية', outAr);
  await p.goto2('/ru/attractions/jabal-al-qarah/');
  const ru = await p.$eval('[data-dist-btn]', (b) => ({ text: b.textContent.trim(), aria: b.getAttribute('aria-label') }));
  ok(ru.text === '' && ru.aria === 'Distance', 'الروسية أيقونة وحدها بتسمية من كلمة واحدة', JSON.stringify(ru));
  await p.click('[data-dist-btn]');
  await p.waitForFunction(() => document.querySelector('[data-dist-out]')?.textContent.trim().length > 0, { timeout: 8000 }).catch(() => {});
  const outRu = await p.$eval('[data-dist-out]', (o) => o.textContent.trim());
  ok(/^около \d+ км$|^менее 1 км$/.test(outRu), 'النتيجة بصياغة الروسية المعتمدة', outRu);
  await p.done();
} finally {
  await browser.close();
}
console.log(`\n${failures.length ? '✗' : '✓'} ${passed} شرطاً تحقق · ${failures.length} أخفق`);
if (failures.length) { console.log('  أخفق: ' + failures.join(' | ')); process.exit(1); }
