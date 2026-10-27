// يولّد مدخل القارئ الأعمى لدفعة gulf-unify-1027 — مقصوصاً من dist بعد apply (سابقة flagged-fixes --applied):
// لكل موضع تُبحث صفحاتُ لغته المبنية عن نصّه المقترح في النصّ المرئي، وتُقصّ أعمقُ صفحة تحمله مع السطور المحيطة.
//   node docs/gulf-unify-1027/make-blind-input.mjs <dist-root> <stage: 05|final> <lg…>
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { visible } from './visible.mjs';

const R = process.argv[2] || '.';
const STAGE = process.argv[3] || '05';
const LANGS = process.argv.slice(4);
const HERE = dirname(fileURLToPath(import.meta.url));
if (!LANGS.length) { console.error('usage: make-blind-input.mjs <root> <05|final> zh de ru ur'); process.exit(2); }

const pages = (dir, acc = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) pages(p, acc); else if (f === 'index.html') acc.push(p);
  }
  return acc;
};

let fail = 0;
for (const lg of LANGS) {
  const stage = JSON.parse(readFileSync(`${HERE}/out/${lg}/${STAGE}.json`, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${HERE}/../../${lg}-translation/output/gulf-unify-1027/pack.json`, 'utf8')).positions;
  const cache = new Map();
  const textOf = (p) => { if (!cache.has(p)) cache.set(p, visible(readFileSync(p, 'utf8'))); return cache.get(p); };
  const all = pages(`${R}/dist/${lg}`);
  let body = '', seen = new Set();
  for (const k of pack) {
    const p = stage.find((x) => x.id === k.id);
    if (!p || p.current !== k.current) { console.error(`FAIL ${k.id}: stage ${STAGE} does not match the pack`); fail++; continue; }
    if (p.proposed === p.current) continue; // المستثنى لم يتغيّر
    // روابط الماركداون وتهريب التنصيص لا تظهر في النصّ المرئي
    const needle = p.proposed.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\\"/g, '"').replace(/\*\*/g, '')
      // مقطع أخذ السطر كله: مفتاح YAML/JSON غير المنصَّص وتنصيص القيمة وفاصلتها
      .replace(/^\s*"?[\w.]+"?:\s*/, '').replace(/^"(.*)",?$/, '$1');
    const lineAt = (f) => textOf(f).split('\n').findIndex((l) => l.includes(needle));
    // عنوان الصفحة ووصفها يُقصّان من صفحتهما (حيث يردان في أول السطور)، وما عداهما من أعمق صفحة تحمله
    const own = /^(title|description)/.test(k.field ?? '');
    const hits = all.filter((f) => textOf(f).includes(needle)).sort((a, b) => own ? lineAt(a) - lineAt(b) : b.split(/[\\/]/).length - a.split(/[\\/]/).length);
    if (!hits.length) { console.error(`FAIL ${k.id}: proposed text not found in any built /${lg}/ page`); fail++; continue; }
    const page = hits[0], rel = relative(`${R}/dist`, page).replace(/\\/g, '/').replace(/index\.html$/, '');
    const L = textOf(page).split('\n');
    const at = L.findIndex((l) => l.includes(needle));
    const block = L.slice(Math.max(0, at - 3), at + 4).join('\n');
    const key = `${rel}#${at}`;
    if (seen.has(key)) continue;
    seen.add(key);
    body += `\n=================== /${rel} — the lines around one text ===================\n\n${block}\n`;
    console.log(`  ok ${k.id} in /${rel}`);
  }
  writeFileSync(`${HERE}/out/${lg}/06-blind-input.on-${STAGE}.txt`, body, 'utf8');
  console.log(`  -> out/${lg}/06-blind-input.on-${STAGE}.txt (${body.length} chars)`);
}
if (fail) { console.error(`FAIL ${fail}`); process.exit(1); }
console.log('OK');
