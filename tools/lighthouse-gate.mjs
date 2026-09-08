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
//
// الطرف الثالث (GA وبلاطات الخرائط) يُحجب كي يبقى القياس محلياً حتمياً؛ الأرقام
// الميدانية الحقيقية تأتي من حدث web_vitals (الخطوة 1)، وهذه البوابة تمنع التراجع.
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
const median = (xs) => { const a = [...xs].sort((x, y) => x - y); return a[Math.floor(a.length / 2)]; };

let lighthouse, chromeLauncher;
try {
  const require = createRequire(`${LH_DIR}/x.js`);
  lighthouse = (await import(require.resolve('lighthouse'))).default;
  chromeLauncher = await import(require.resolve('chrome-launcher'));
} catch (e) {
  console.error('لم أجد lighthouse. ثبّته في مجلد خارج المستودع ومرّر مساره في LH_DIR.', e.message);
  process.exit(2);
}

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
});
const rows = [];
let failed = false;
try {
  for (const path of PAGES) {
    const samples = [];
    let lhr = null;
    for (let i = 0; i < RUNS; i++) {
    const r = await lighthouse(BASE + path, {
      port: chrome.port, output: 'json', logLevel: 'error',
      onlyCategories: ['performance'],
      formFactor: 'mobile', screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
      throttlingMethod: 'simulate',
      // حجب الطرف الثالث: الحكم على ما نملكه لا على شبكة قوقل وبلاطات الخرائط
      blockedUrlPatterns: ['*googletagmanager.com*', '*google-analytics.com*', '*cartocdn.com*', '*openfreemap.org*', '*amazonaws.com*'],
    });
    lhr = r.lhr;
    const a = lhr.audits;
    if (lhr.runtimeError || !a['largest-contentful-paint']?.numericValue) {
      console.log(`✗ ${path.padEnd(36)} تعذّر القياس — ${lhr.runtimeError?.message ?? 'لا قيمة LCP (هل الصفحة موجودة على المعاينة؟)'}`);
      samples.length = 0; break;
    }
    const reqs = a['network-requests']?.details?.items ?? [];
    const fontReqs = reqs.filter((i) => i.resourceType === 'Font');
    const obsLcp = a['metrics']?.details?.items?.[0]?.observedLargestContentfulPaint ?? Infinity;
    samples.push({
      perf: Math.round((lhr.categories.performance.score ?? 0) * 100),
      // ميزانيات حتمية (1 = سليم)
      blocking: (a['render-blocking-resources']?.details?.items ?? []).length === 0 ? 1 : 0,
      fontKb: Math.round(fontReqs.reduce((t, i) => t + (i.transferSize || 0), 0) / 1024),
      videoBeforeLcp: reqs.some((i) => /\.mp4(\?|$)/.test(i.url) && i.networkRequestTime < obsLcp) ? 0 : 1,
      lcpImageOk: (a['lcp-lazy-loaded']?.score ?? 1) === 1 && (a['prioritize-lcp-image']?.score ?? 1) === 1 ? 1 : 0,
      lcp: Math.round(a['largest-contentful-paint'].numericValue),
      fcp: Math.round(a['first-contentful-paint'].numericValue),
      cls: Number(a['cumulative-layout-shift'].numericValue.toFixed(3)),
      tbt: Math.round(a['total-blocking-time'].numericValue),
      kb: Math.round(a['total-byte-weight'].numericValue / 1024),
      fonts: (a['network-requests']?.details?.items ?? []).filter((i) => i.resourceType === 'Font').length,
      cyrillic: (a['network-requests']?.details?.items ?? []).filter((i) => /cyrillic/.test(i.url)).length,
    });
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
  }
} finally {
  await chrome.kill();
}
console.log(`\nالميزانيات: لا CSS حاجب · لا سيريلي خارج /ru/ · خطوط ≤ ${FONT_FILES_MAX} ملفاً و≤ ${FONT_KB_MAX}KB · لا فيديو قبل LCP · صورة LCP محمَّلة مسبقاً؛ وحارسا المحاكاة: LCP ≤ ${LCP_MAX}ms وأداء ≥ ${PERF_MIN} (وسيط ${RUNS}) · ${rows.filter((r) => r.ok).length}/${rows.length} صفحات اجتازت`);
if (failed) process.exit(1);
