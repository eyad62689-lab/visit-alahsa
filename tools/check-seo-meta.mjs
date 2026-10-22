// حارس رأس الصفحة (C72): العنوان والوصف وH1 لكل صفحة عربية وإنجليزية قابلة للفهرسة.
//
// يقرأ dist فقط. القواعد (الصفحات المفهرسة بالعربية والإنجليزية، ويُستثنى دليل التأشيرات
// لأن C28 يحكمه بحدوده الخاصة):
//   - نواة العنوان (ما قبل آخر « — » أو « – » أي قبل اسم العلامة): تتجاوز 60 → إخفاق، وتقلّ عن 30 → تحذير
//   - الوصف: يتجاوز 160 → إخفاق، ويقلّ عن 110 → تحذير
//   - عنوان فريد ووصف فريد عبر الصفحات (إخفاق)
//   - H1 واحد بالضبط (إخفاق)
// سقّاطة: tools/seo-head-baseline.json يحمل مخالفي يوم تأسيس الحارس {path,titleLen,descLen}.
//   مخالف جديد غير مدرج، أو مدرج ازداد سوءاً، يُخفق. وكل مخالفة أُصلحت يجب أن تُحذف من الملف
//   (يُخفق الحارس ببقائها) — فيتقلّص الملف ولا يتضخّم. يُولَّد الملف بالأمر:
//     node tools/check-seo-meta.mjs dist --write-baseline
// تشغيل مباشر لطباعة الجدول: node tools/check-seo-meta.mjs dist
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { titleLen, descLen, SEO_LIMITS } from '../src/lib/seo-len.mjs';

export const BASELINE_PATH = join(dirname(fileURLToPath(import.meta.url)), 'seo-head-baseline.json');
/** أرضية عدد الصفحات المفحوصة: دونها يكون الحارس فارغاً لا ناجحاً. */
export const MIN_PAGES = 100;

// مسارات دليل التأشيرات (C28 يحكم عنوانها ووصفها بحدود خاصة).
const VISA_PATHS = new Set(['/دليل-التأشيرات/', '/en/visa-guide/']);
// أدلة ليست صفحات عربية/إنجليزية: لغات أخرى وأدلة الأصول (تُستثنى من الجذر فقط، و«en» تُمشى بنفسها)
const SKIP_ROOT = /^(zh|de|ru|ur|brand|dev|pagefind|_astro|img|fonts|video|vendor|data)$/;
const SKIP_EN = /^(img|fonts|video|vendor|data|_astro)$/;

const unesc = (t) => t.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const BRANDS = ['زوروا الأحساء', 'Visit Al-Ahsa'];

/** نواة العنوان: ما قبل آخر فاصل « — » أو « – » حين يكون ما بعده اسم العلامة. عنوان بلا
 *  علامة في آخره (الرئيسية: «العلامة — الشعار») يُقاس كله، فلا يُبتر شعاره من النواة. */
export function titleCore(title) {
  const i = Math.max(title.lastIndexOf(' — '), title.lastIndexOf(' – '));
  return i > 0 && BRANDS.includes(title.slice(i + 3)) ? title.slice(0, i) : title;
}

function walk(dir, scope, out) {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) {
      if (scope === '' && n === 'en') walk(p, 'en', out);
      else if (scope === '' ? !SKIP_ROOT.test(n) : !SKIP_EN.test(n)) walk(p, scope, out);
    } else if (n === 'index.html') out.push(p);
  }
}

/** يقرأ صفحات ar/en القابلة للفهرسة من dist ويعيد صفاً لكل صفحة. */
export function auditSeoMeta(dist) {
  const files = [];
  walk(dist, '', files);
  const rows = [];
  for (const f of files) {
    const html = readFileSync(f, 'utf8');
    const path = '/' + relative(dist, f).replace(/\\/g, '/').replace(/index\.html$/, '');
    if (VISA_PATHS.has(path)) continue;
    if (/<meta name="robots" content="[^"]*noindex/.test(html)) continue;
    const title = unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
    const desc = unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
    const core = titleCore(title);
    rows.push({
      path, lang: path.startsWith('/en/') ? 'en' : 'ar', title, core, titleLen: titleLen(core), desc, descLen: descLen(desc),
      h1: (html.match(/<h1[\s>]/g) || []).length,
    });
  }
  return rows.sort((a, b) => (a.path < b.path ? -1 : 1));
}

/** مخالفو الحدود: صفحة خارج [30..60] عنواناً أو [110..160] وصفاً. */
export const violators = (rows) => rows
  .filter((r) => r.titleLen > SEO_LIMITS.titleMax || r.titleLen < SEO_LIMITS.titleMin || r.descLen > SEO_LIMITS.descMax || r.descLen < SEO_LIMITS.descMin)
  .map((r) => ({ path: r.path, titleLen: r.titleLen, descLen: r.descLen }));

// البعد عن النطاق [lo..hi]: صفر داخله. «أسوأ» = أبعد مما كان.
const gap = (v, lo, hi) => (v < lo ? lo - v : v > hi ? v - hi : 0);

/** يحكم على الصفوف مقابل الأساس. يعيد { problems, stats } — لا طباعة ولا خروج. */
export function checkSeoMeta(rows, baseline) {
  const L = SEO_LIMITS;
  const problems = [];
  const base = new Map(baseline.map((b) => [b.path, b]));
  const cur = violators(rows);
  const curPaths = new Set(cur.map((c) => c.path));
  if (rows.length < MIN_PAGES) problems.push(`الحارس فارغ: ${rows.length} صفحة مفحوصة — المتوقع ≥${MIN_PAGES}`);

  let tolerated = 0;
  for (const c of cur) {
    const b = base.get(c.path);
    if (!b) { problems.push(`${c.path}: مخالفة جديدة غير مدرجة في الأساس (عنوان ${c.titleLen}، وصف ${c.descLen})`); continue; }
    if (gap(c.titleLen, L.titleMin, L.titleMax) > gap(b.titleLen, L.titleMin, L.titleMax)) problems.push(`${c.path}: العنوان ازداد سوءاً (${b.titleLen} ← ${c.titleLen})`);
    else if (gap(c.descLen, L.descMin, L.descMax) > gap(b.descLen, L.descMin, L.descMax)) problems.push(`${c.path}: الوصف ازداد سوءاً (${b.descLen} ← ${c.descLen})`);
    else tolerated++;
  }
  // سقّاطة التقلّص: مدرج في الأساس وقد أُصلح (أو اختفت صفحته) → يُحذف من الملف
  const fixed = baseline.filter((b) => !curPaths.has(b.path));
  if (fixed.length) problems.push(`${fixed.length} مخالفة أُصلحت وما زالت في seo-head-baseline.json — أعد توليده (node tools/check-seo-meta.mjs dist --write-baseline): ${fixed.slice(0, 3).map((b) => b.path).join('، ')}`);

  const dupGroups = (key) => {
    const seen = new Map();
    for (const r of rows) {
      if (!r[key]) continue;
      if (!seen.has(r[key])) seen.set(r[key], []);
      seen.get(r[key]).push(r.path);
    }
    return [...seen.values()].filter((v) => v.length > 1);
  };
  for (const g of dupGroups('title')) problems.push(`عنوان مكرّر في ${g.length} صفحة: ${g.slice(0, 3).join('، ')}`);
  for (const g of dupGroups('desc')) problems.push(`وصف مكرّر في ${g.length} صفحة: ${g.slice(0, 3).join('، ')}`);
  for (const r of rows) {
    if (r.h1 !== 1) problems.push(`${r.path}: ${r.h1} عنصر H1 — المطلوب واحد`);
    if (!r.title) problems.push(`${r.path}: بلا عنوان`);
    if (!r.desc) problems.push(`${r.path}: بلا وصف`);
  }

  return {
    problems,
    stats: {
      pages: rows.length, tolerated,
      titleShort: rows.filter((r) => r.titleLen < L.titleMin).length, titleLong: rows.filter((r) => r.titleLen > L.titleMax).length,
      descShort: rows.filter((r) => r.descLen < L.descMin).length, descLong: rows.filter((r) => r.descLen > L.descMax).length,
    },
  };
}

export function loadBaseline() {
  return existsSync(BASELINE_PATH) ? JSON.parse(readFileSync(BASELINE_PATH, 'utf8')) : [];
}

// ── تشغيل مباشر ──
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const distDir = process.argv[2];
  if (!distDir) { console.error('usage: node tools/check-seo-meta.mjs <dist> [--write-baseline]'); process.exit(2); }
  const rows = auditSeoMeta(distDir);
  if (process.argv.includes('--write-baseline')) {
    const v = violators(rows);
    writeFileSync(BASELINE_PATH, '[\n' + v.map((x) => JSON.stringify(x)).join(',\n') + '\n]\n');
    console.log(`baseline: ${v.length} violators of ${rows.length} pages written to ${BASELINE_PATH}`);
  } else {
    const { problems, stats } = checkSeoMeta(rows, loadBaseline());
    console.log(JSON.stringify(stats));
    console.log('path\ttitleLen\tdescLen\th1\ttitle');
    for (const r of rows) console.log(`${r.path}\t${r.titleLen}\t${r.descLen}\t${r.h1}\t${r.core}`);
    console.log(problems.length ? `\nproblems (${problems.length}):\n` + problems.join('\n') : '\nno problems');
  }
}
