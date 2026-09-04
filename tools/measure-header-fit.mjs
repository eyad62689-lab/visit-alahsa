// قياس اتّساع شريط الترويسة في اللغات الأربع — على `dist` لا على المصدر.
//
// لماذا أداة قائمة بذاتها ولا تُدمج في check-consistency: هذا الفحص يحتاج متصفحاً
// حقيقياً (عرض المحرف يقرّره الخط لا الكود)، وpuppeteer لا يُثبَّت في المستودع كي
// لا تنكسر نقطة توصيل node_modules الموثّقة في CLAUDE.md ولا يثقل بناء نتلايفي.
// فهو فحص يدوي يُشغَّل عند **أي تغيير في تسمية تنقّل أو في عتبات الترويسة**.
//
// التشغيل:
//   1) في مجلد خارج المستودع:  npm init -y && npm i puppeteer-core
//   2) npx astro preview --port 4399     (داخل المستودع، على dist مبنيّ حديثاً)
//   3) PUPPETEER_DIR=<ذلك المجلد> node tools/measure-header-fit.mjs
//      وللقياس وحده بلا حكم:   MODE=fit  node tools/measure-header-fit.mjs
//
// يخرج بـ1 عند أي إخفاق، فيصلح شرطاً قبل الدفع.
//
// خلفية (2026-09-04): كانت العتبة 1199px مقيسةً على ثمانية روابط قبل إضافة
// التاسع، فصارت تكذب: العربية كانت تلزمها 1249px والإنجليزية 1331 والألمانية
// 1625 — أي أن ثلاث لغات من أربع كانت تتراكب على أدوات الشريط في الإنتاج.
import { createRequire } from 'node:module';

const BASE = process.env.BASE ?? 'http://localhost:4399';
const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const MARGIN = Number(process.env.MARGIN ?? 24); // هامش أمان يمتصّ فروق تصيير الخط بين المنصّات
const MODE = process.env.MODE ?? 'verify';
const PAGES = { ar: '/', en: '/en/', zh: '/zh/', de: '/de/' };

// العروض المفحوصة: حدود العتبتين تماماً (‏1227/1228 و1338/1339) وعروض نوافذ
// الشاشات الشائعة بعد شريط التمرير (‏1265 لشاشة 1280 · 1351 لـ1366 · 1425 لـ1440).
const WIDTHS = [375, 768, 1024, 1199, 1227, 1228, 1265, 1280, 1338, 1339, 1351, 1366, 1425, 1440, 1920];

let puppeteer;
try {
  const dir = process.env.PUPPETEER_DIR;
  const require = createRequire(dir ? `${dir.replace(/\\/g, '/')}/x.js` : import.meta.url);
  puppeteer = require('puppeteer-core');
} catch {
  console.error('لم أجد puppeteer-core. ثبّته في مجلد خارج المستودع ومرّر مساره في PUPPETEER_DIR.');
  process.exit(2);
}

// ─────────── القياس الجوهري: كم يلزم الشريط من عرض، بلا ضغط الفليكس ───────────
// يُقاس عند سقف حاوية واسع عمداً: عند السقف الحقيقي ينضغط `hd-actions` فتصغر
// قياساته ويبدو الشريط متّسعاً وهو ليس كذلك.
const intrinsic = () => {
  const hd = document.querySelector('.hd-in');
  const nav = hd.querySelector('nav.nav');
  const W = (e) => e.getBoundingClientRect().width;
  const links = [...nav.querySelectorAll('a')].filter((a) => W(a) > 0); // المخفيّ لا يأخذ فجوة
  const navGap = parseFloat(getComputedStyle(nav).columnGap) || 0;
  const hdGap = parseFloat(getComputedStyle(hd).columnGap) || 0;
  const navIntrinsic = links.reduce((s, a) => s + W(a), 0) + (links.length - 1) * navGap;
  return {
    need: Math.ceil(W(hd.querySelector('.brand')) + navIntrinsic + W(hd.querySelector('.hd-actions')) + hdGap * 2),
    nav: Math.round(navIntrinsic), links: links.length,
  };
};

// ─────────── الحكم: عند كل عرض إمّا مطويّ سليم وإمّا مبسوط سليم ───────────
const probe = () => {
  const hd = document.querySelector('.hd-in');
  const R = (e) => e.getBoundingClientRect();
  const vis = (e) => e && e.offsetParent !== null && R(e).width > 0;
  const nav = hd.querySelector('nav.nav');
  const links = [...nav.querySelectorAll('a')].filter(vis);
  const planEl = nav.querySelector('.nav-plan');
  const planShown = !!planEl && getComputedStyle(planEl).display !== 'none';
  const gold = vis(hd.querySelector('.btn-gold'));
  if (vis(hd.querySelector('.burger'))) return { mode: 'مطويّ', planShown, gold };
  const rtl = document.documentElement.dir === 'rtl';
  const navEdge = rtl ? Math.min(...links.map((e) => R(e).left)) : Math.max(...links.map((e) => R(e).right));
  const actEdge = rtl ? R(hd.querySelector('.hd-actions')).right : R(hd.querySelector('.hd-actions')).left;
  return {
    mode: 'مبسوط', planShown, gold,
    overlap: Math.round(rtl ? actEdge - navEdge : navEdge - actEdge),
    rows: new Set(links.map((e) => Math.round(R(e).top))).size,
    h: Math.round(R(hd).height),
  };
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
const langs = Object.keys(PAGES);
let fails = 0;

if (MODE === 'fit') {
  await page.setViewport({ width: 1920, height: 900 });
  console.log(`أدنى عرض نافذة يتّسع عنده الشريط (هامش ${MARGIN}px):\n`);
  for (const [lang, path] of Object.entries(PAGES)) {
    await page.goto(BASE + path, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '.hd-in{inline-size:min(100% - var(--s-3),2000px)!important}' });
    const r = await page.evaluate(intrinsic);
    console.log(` ${lang}: ${r.links} روابط · تنقّل ${r.nav}px · يلزم ${r.need}px · أدنى نافذة ${r.need + MARGIN + 16}px`);
  }
} else {
  const out = {};
  for (const [lang, path] of Object.entries(PAGES)) {
    out[lang] = {};
    for (const w of WIDTHS) {
      await page.setViewport({ width: w, height: 900 });
      await page.goto(BASE + path, { waitUntil: 'networkidle2' });
      await page.evaluate(() => document.fonts.ready);
      out[lang][w] = await page.evaluate(probe);
    }
  }
  const cell = (r) => {
    // المطويّ: الزرّ الذهبي مخفيّ ورابط الخطة ظاهر داخل القائمة (وإلا ضاعت الوجهة).
    // المبسوط: لا تراكب · سطر واحد · ارتفاع 68px (‏69 يعني انضغاطاً والتفافاً)
    //          · الزرّ الذهبي ظاهر · رابط الخطة مخفيّ (وإلا تكرّرت الوجهة).
    const ok = r.mode === 'مطويّ'
      ? (r.planShown && !r.gold)
      : (r.overlap <= 0 && r.rows === 1 && r.h === 68 && r.gold && !r.planShown);
    if (!ok) fails++;
    const label = r.mode === 'مطويّ' ? 'برغر' : `شريط ${String(r.overlap).padStart(4)}`;
    return `${ok ? ' ' : '✗'}${label}`.padEnd(13);
  };
  console.log('عرض    ' + langs.map((l) => l.padEnd(13)).join(''));
  for (const w of WIDTHS) console.log(String(w).padEnd(7) + langs.map((l) => cell(out[l][w])).join(''));
  console.log(fails ? `\n✗ ${fails} خانة فاشلة` : '\n✓ كل الخانات سليمة');
}

await browser.close();
process.exit(fails ? 1 : 0);
