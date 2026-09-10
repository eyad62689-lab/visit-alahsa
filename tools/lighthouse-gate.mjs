// بوابة الأداء — الخطوة 3 من خطة التفاعل العالمي (ع3 في التشخيص).
// (docs/تشخيص-التفاعل-العالمي-وخطة-التحسين-2026-09-08.md § خارطة التنفيذ، الخطوة 3)
//
// تشغّل Lighthouse (محاكاة جوال) على صفحات مختارة من `dist` عبر معاينة محلية وتُخفق
// (exit 1) إن تجاوز LCP العتبة أو هبط أداء أي صفحة دون الحدّ. lighthouse لا يُثبَّت
// في المستودع (سابقة puppeteer-core في measure-header-fit): يُثبَّت في مجلد خارجي.
//
// التشغيل:
//   1) في مجلد خارج المستودع:  npm init -y && npm i lighthouse
//   2) npx astro preview --port 4399     (على dist مبنيّ حديثاً)
//   3) LH_DIR=<ذلك المجلد> CHROME_PATH=<كروم> BASE=http://127.0.0.1:4399 node tools/lighthouse-gate.mjs
//      CPU_MULT=4 يثبّت مضاعف إبطاء المعالج (الافتراضي «auto»: معايرة على المضيف، انظر أدناه).
//
// الطرف الثالث (GA وبلاطات الخرائط) يُحجب كي يبقى القياس محلياً حتمياً؛ الأرقام
// الميدانية الحقيقية تأتي من حدث web_vitals (الخطوة 1)، وهذه البوابة تمنع التراجع.
//
// معايرة المعالج (2026-09-10): مضاعف Lighthouse الافتراضي 4x يفترض مضيفاً بمؤشر
// benchmarkIndex ≈ 1500–2000 (حاسوب مكتبي قوي) فيُنزله إلى جوال متوسط؛ على مضيف أبطأ
// (عدّاء GitHub Actions ≈ 1000) يُبطئ 4x الصفحة مرتين فيبلغ LCP المحاكى 4.3–4.6 ثانية
// للصفحة نفسها التي تقيس 2.6 ثانية محلياً (benchmarkIndex 1808) — التشغيلان 78 و79.
// لذلك يُقاس مؤشر المضيف أولاً بدالة Lighthouse نفسها (computeBenchmarkIndex) ويُشتقّ
// المضاعف بصيغة حاسبة Lighthouse الرسمية (docs/throttling.md → lighthouse-cpu-throttling-calculator):
//   ≥1300: 3 + (bi − 1300)/233 · ≥800: 2 + (bi − 800)/500 · ≥150: 1 + (bi − 150)/650
// فيتساوى الهدف المحاكى (جوال متوسط) على كل مضيف، وتبقى الميزانيات الحتمية كما هي.
import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.BASE ?? 'http://127.0.0.1:4399';
const LH_DIR = (process.env.LH_DIR ?? '.').replace(/\\/g, '/');
// عتبتا المحاكاة خشنتان عمداً (حارسا كارثة لا هدفا جودة): الوسيط لبناءٍ واحد تراوح بين
// 1.6 و3.6 ثانية LCP على الآلة نفسها خلال عشر دقائق (2026-09-08)، لأن Lantern يبني
// المحاكاة على أثر فعلي تتقلّب أزمنة CPU فيه. هدف الجودة (LCP ≤ 2.5 ث) يُقرأ ميدانياً
// من حدث web_vitals (الخطوة 1)، وهذه البوابة تحرس **الأسباب** التي أُصلحت بميزانيات
// حتمية لا تتقلّب: لا CSS حاجب، لا وجه سيريلي خارج /ru/، سقف عدد الخطوط وحجمها،
// لا فيديو قبل LCP، وصورة LCP محمَّلة مسبقاً لا كسولة.
const LCP_MAX = Number(process.env.LCP_MAX ?? 4000);   // مللي ثانية — حارس كارثة (محاكاة)
const PERF_MIN = Number(process.env.PERF_MIN ?? 80);   // درجة الأداء الدنيا (محاكاة)
const FONT_FILES_MAX = Number(process.env.FONT_FILES_MAX ?? 12);
const FONT_KB_MAX = Number(process.env.FONT_KB_MAX ?? 270);   // كان 365 كيلوبايت على الرئيسية العربية قبل الخطوة 3
const OUT = process.env.LH_OUT ?? '';                  // مجلد اختياري لحفظ تقارير JSON
const PAGES = (process.env.PAGES ?? '/,/en/,/ru/,/en/attractions/jabal-al-qarah/').split(',').map((s) => s.trim()).filter(Boolean);
// وسيط N تشغيلات لكل صفحة: المحاكاة تُبنى على أثر فعلي تتقلّب أزمنة CPU فيه بين تشغيل
// وآخر (فرق 1.5 ثانية في LCP للصفحة نفسها على آلة مشغولة)، والوسيط يمتصّ ذلك.
const RUNS = Math.max(1, Number(process.env.RUNS ?? 3));
const CPU_MULT = process.env.CPU_MULT ?? 'auto';       // «auto» = معايرة على benchmarkIndex المضيف، أو رقم يُثبَّت
const median = (xs) => { const a = [...xs].sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };
const round1 = (x) => Math.round(x * 10) / 10;
// صيغة حاسبة Lighthouse الرسمية (انظر الرأس). دون 150 لا يُحاكى جوال أصلاً: 1x مع تحذير.
const multiplierFor = (bi) => bi >= 1300 ? 3 + (bi - 1300) / 233 : bi >= 800 ? 2 + (bi - 800) / 500 : bi >= 150 ? 1 + (bi - 150) / 650 : 1;

let lighthouse, chromeLauncher, puppeteer, pageFunctions;
try {
  const require = createRequire(`${LH_DIR}/x.js`);
  lighthouse = (await import(require.resolve('lighthouse'))).default;
  chromeLauncher = await import(require.resolve('chrome-launcher'));
  puppeteer = (await import(require.resolve('puppeteer-core'))).default;        // تبعية lighthouse نفسها
  pageFunctions = (await import(require.resolve('lighthouse/core/lib/page-functions.js'))).pageFunctions;
} catch (e) {
  console.error('لم أجد lighthouse. ثبّته في مجلد خارج المستودع ومرّر مساره في LH_DIR.', e.message);
  process.exit(2);
}

// نوع الشبكة المُعلَن (NetInfo) يحدّد مسافة التحميل الكسول للصور في كروم (settings.json5 في Blink:
// 4g ‏1250px · 3g ‏2500px · مجهول 3000px). على عدّاء GitHub (كروم أحدث من المحلي) دخلت ثلاث صور بطاقات
// إضافية (≈250KB على عمق 2324–2847px) في مخطط Lantern لـLCP لأن النوع تحت محاكاة Lighthouse لم يكن 4g،
// فتباينت القراءة بين مضيفَين للصفحة نفسها (التشغيل 81: 6 صور قبل LCP مقابل 3 محلياً). الجهاز المحاكى
// (mobileSlow4G، RTT ‏150ms) يُصنَّف 4g في NetInfo (العتبة 270ms)، فيُثبَّت النوع عليه ليتطابق المضيفان.
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--force-effective-connection-type=4G'],
});

// معايرة المضيف: وسيط ثلاث قياسات لدالة Lighthouse نفسها في صفحة فارغة على المتصفح ذاته.
async function hostBenchmarkIndex() {
  const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` });
  try {
    const page = await browser.newPage();
    const xs = [];
    for (let i = 0; i < 3; i++) xs.push(await page.evaluate(pageFunctions.computeBenchmarkIndex));
    // نوع الشبكة كما يراه كروم: يحدّد مسافة التحميل الكسول للصور (1250px على 4g وأكبر على ما دونه/المجهول)
    const readEct = () => page.evaluate(() => { const c = navigator.connection || {}; return `${c.effectiveType ?? '?'} (rtt ${c.rtt ?? '?'} · downlink ${c.downlink ?? '?'})`; });
    const ect0 = await readEct();
    // ما يراه NetInfo تحت محاكاة Lighthouse نفسها (وضع simulate يلغي الخنق عبر CDP بهذه القيم بالضبط)
    const cdp = await page.createCDPSession();
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
    await new Promise((r) => setTimeout(r, 200));
    const ect1 = await readEct();
    await cdp.detach();
    const ua = await page.evaluate(() => (navigator.userAgent.match(/Chrome\/[\d.]+/) || ['Chrome/?'])[0]);
    const ect = `${ect0} → تحت محاكاة Lighthouse ${ect1} · ${ua}`;
    await page.close();
    return { bi: median(xs), spread: `${Math.min(...xs)}–${Math.max(...xs)}`, ect };
  } finally {
    await browser.disconnect();
  }
}

const rows = [];
let failed = false;
try {
  let mult;
  if (CPU_MULT === 'auto') {
    const { bi, spread, ect } = await hostBenchmarkIndex();
    mult = round1(multiplierFor(bi));
    console.log(`معايرة المضيف: benchmarkIndex ${bi} (وسيط 3: ${spread}) → مضاعف إبطاء المعالج ${mult}x (افتراضي Lighthouse 4x يفترض مؤشراً ≈ 1533)${bi < 150 ? ' — تحذير: المضيف أبطأ من أن يحاكي جوالاً؛ حارسا المحاكاة غير موثوقين هنا' : ''} · شبكة كروم: ${ect}`);
  } else {
    mult = Number(CPU_MULT);
    if (!(mult > 0)) { console.error(`CPU_MULT غير صالح: ${CPU_MULT}`); process.exit(2); }
    console.log(`مضاعف إبطاء المعالج مثبَّت: ${mult}x (CPU_MULT)`);
  }

  for (const path of PAGES) {
    const samples = [];
    const warnings = new Set();
    let lhr = null, lastPre = [];
    for (let i = 0; i < RUNS; i++) {
    const r = await lighthouse(BASE + path, {
      port: chrome.port, output: 'json', logLevel: 'error',
      onlyCategories: ['performance'],
      formFactor: 'mobile', screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
      throttlingMethod: 'simulate',
      throttling: { cpuSlowdownMultiplier: mult },   // يُدمج مع بقية إعدادات mobileSlow4G الافتراضية
      // حجب الطرف الثالث: الحكم على ما نملكه لا على شبكة قوقل وبلاطات الخرائط
      blockedUrlPatterns: ['*googletagmanager.com*', '*google-analytics.com*', '*cartocdn.com*', '*openfreemap.org*', '*amazonaws.com*'],
    });
    lhr = r.lhr;
    const a = lhr.audits;
    if (lhr.runtimeError || !a['largest-contentful-paint']?.numericValue) {
      console.log(`✗ ${path.padEnd(36)} تعذّر القياس — ${lhr.runtimeError?.message ?? 'لا قيمة LCP (هل الصفحة موجودة على المعاينة؟)'}`);
      samples.length = 0; break;
    }
    for (const w of lhr.runWarnings ?? []) warnings.add(typeof w === 'string' ? w : JSON.stringify(w));
    const reqs = a['network-requests']?.details?.items ?? [];
    const fontReqs = reqs.filter((i) => i.resourceType === 'Font');
    const m = a['metrics']?.details?.items?.[0] ?? {};
    const obsLcp = m.observedLargestContentfulPaint ?? Infinity;
    const video = reqs.filter((i) => /\.mp4(\?|$)/.test(i.url)).sort((x, y) => x.networkRequestTime - y.networkRequestTime)[0];
    // ما بدأ قبل LCP المرصود يدخل في مخطط Lantern التشاؤمي لـLCP: الصور الكسولة التي يقرّر كروم
    // جلبها مبكراً (مسافة التحميل الكسول تتبع نوع الشبكة المُعلَن) تزاحم صورة LCP في المحاكاة.
    const lcpSrc = (a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet ?? '').match(/\bsrc="([^"]+)"/)?.[1];
    const preLcp = reqs.filter((i) => i.networkRequestTime < obsLcp);
    const preImgs = preLcp.filter((i) => i.resourceType === 'Image' && i.url !== lcpSrc);
    const kb = (xs) => Math.round(xs.reduce((t, i) => t + (i.transferSize || 0), 0) / 1024);
    samples.push({
      perf: Math.round((lhr.categories.performance.score ?? 0) * 100),
      // ميزانيات حتمية (1 = سليم)
      blocking: (a['render-blocking-resources']?.details?.items ?? []).length === 0 ? 1 : 0,
      fontKb: Math.round(fontReqs.reduce((t, i) => t + (i.transferSize || 0), 0) / 1024),
      videoBeforeLcp: video && video.networkRequestTime < obsLcp ? 0 : 1,
      lcpImageOk: (a['lcp-lazy-loaded']?.score ?? 1) === 1 && (a['prioritize-lcp-image']?.score ?? 1) === 1 ? 1 : 0,
      lcp: Math.round(a['largest-contentful-paint'].numericValue),
      fcp: Math.round(a['first-contentful-paint'].numericValue),
      cls: Number(a['cumulative-layout-shift'].numericValue.toFixed(3)),
      tbt: Math.round(a['total-blocking-time'].numericValue),
      kb: Math.round(a['total-byte-weight'].numericValue / 1024),
      fonts: fontReqs.length,
      cyrillic: reqs.filter((i) => /cyrillic/.test(i.url)).length,
      // تشخيص (لا يُحكم به): الأثر الفعلي غير المحاكى، وتوقيت الفيديو، ومؤشر المضيف كما قاسه Lighthouse
      obsFcp: Math.round(m.observedFirstContentfulPaint ?? 0),
      obsLcp: Math.round(obsLcp === Infinity ? 0 : obsLcp),
      obsLoad: Math.round(m.observedLoad ?? 0),
      traceEnd: Math.round(m.observedTraceEnd ?? 0),
      videoAt: video ? Math.round(video.networkRequestTime) : -1,
      videoKb: video ? Math.round((video.transferSize || 0) / 1024) : 0,
      bi: lhr.environment?.benchmarkIndex ?? 0,
      preN: preLcp.length, preKb: kb(preLcp), preImgN: preImgs.length, preImgKb: kb(preImgs),
    });
    lastPre = [...preLcp].sort((x, y) => (y.transferSize || 0) - (x.transferSize || 0)).slice(0, 8)
      .map((i) => `${Math.round((i.transferSize || 0) / 1024)}KB ${i.resourceType ?? '?'} @${Math.round(i.networkRequestTime)}ms ${i.url.replace(BASE, '')}`);
    }
    if (!samples.length) { failed = true; rows.push({ path, ok: false }); continue; }
    const row = { path, runs: samples.length };
    for (const k of Object.keys(samples[0])) row[k] = median(samples.map((s) => s[k]));
    row.lcpSpread = `${Math.min(...samples.map((s) => s.lcp))}–${Math.max(...samples.map((s) => s.lcp))}`;
    // خارج /ru/ لا يجوز تنزيل وجه سيريلي واحد (unicode-range في fonts.css)
    row.cyrOk = path.startsWith('/ru/') || row.cyrillic === 0;
    row.budget = {
      'CSS حاجب': row.blocking === 1,
      'سيريلي': row.cyrOk,
      [`خطوط ≤ ${FONT_FILES_MAX}`]: row.fonts <= FONT_FILES_MAX,
      [`خطوط ≤ ${FONT_KB_MAX}KB`]: row.fontKb <= FONT_KB_MAX,
      'فيديو قبل LCP': row.videoBeforeLcp === 1,
      'صورة LCP محمَّلة مسبقاً': row.lcpImageOk === 1,
    };
    row.budgetFail = Object.entries(row.budget).filter(([, v]) => !v).map(([k]) => k);
    row.ok = row.lcp <= LCP_MAX && row.perf >= PERF_MIN && row.budgetFail.length === 0;
    if (!row.ok) failed = true;
    rows.push(row);
    if (OUT) { mkdirSync(OUT, { recursive: true }); writeFileSync(`${OUT}/${path.replace(/[^a-z0-9]+/gi, '_') || 'root'}.json`, JSON.stringify(lhr)); }
    console.log(`${row.ok ? '✓' : '✗'} ${path.padEnd(36)} أداء ${String(row.perf).padStart(3)} · LCP ${String(row.lcp).padStart(4)}ms (وسيط ${row.runs}: ${row.lcpSpread}) · FCP ${row.fcp}ms · CLS ${row.cls} · ${row.kb}KB · خطوط ${row.fonts}/${row.fontKb}KB (سيريلي ${row.cyrillic})${row.budgetFail.length ? ' · ميزانية مخالَفة: ' + row.budgetFail.join('، ') : ''}`);
    // سطر التشخيص: عنصر LCP ومراحله من آخر تشغيل، والأثر الفعلي (غير المحاكى) وسيطاً
    const lcpEl = lhr.audits['largest-contentful-paint-element']?.details?.items ?? [];
    const snippet = (lcpEl[0]?.items?.[0]?.node?.snippet ?? '—').replace(/\s+/g, ' ').slice(0, 110);
    const phases = (lcpEl[1]?.items ?? []).map((p) => `${p.phase} ${Math.round(p.timing)}`).join(' · ');
    console.log(`    LCP: ${snippet}${phases ? `\n    مراحل LCP (آخر تشغيل): ${phases}` : ''}\n    الأثر الفعلي (وسيط): FCP ${row.obsFcp}ms · LCP ${row.obsLcp}ms · load ${row.obsLoad}ms · نهاية الأثر ${row.traceEnd}ms · TBT محاكى ${row.tbt}ms · فيديو ${row.videoAt < 0 ? 'لم يبدأ داخل الأثر' : `بدأ عند ${row.videoAt}ms (${row.videoKb}KB)`} · benchmarkIndex ${row.bi}\n    طلبات بدأت قبل LCP المرصود (تدخل في محاكاة LCP): ${row.preN} (${row.preKb}KB) منها صور غير LCP ${row.preImgN} (${row.preImgKb}KB)${warnings.size ? `\n    تحذيرات Lighthouse: ${[...warnings].join(' | ')}` : ''}`);
    if (!row.ok && lastPre.length) console.log(`    أكبر ما بدأ قبل LCP (آخر تشغيل):\n      ${lastPre.join('\n      ')}`);
  }
} finally {
  await chrome.kill();
}
console.log(`\nالميزانيات: لا CSS حاجب · لا سيريلي خارج /ru/ · خطوط ≤ ${FONT_FILES_MAX} ملفاً و≤ ${FONT_KB_MAX}KB · لا فيديو قبل LCP · صورة LCP محمَّلة مسبقاً؛ وحارسا المحاكاة: LCP ≤ ${LCP_MAX}ms وأداء ≥ ${PERF_MIN} (وسيط ${RUNS}) · ${rows.filter((r) => r.ok).length}/${rows.length} صفحات اجتازت`);
if (failed) process.exit(1);
