// تحقق مستقل من dist لدفعة ur-owner-trails: النص المعتمد منشور والقديم غائب في كل صفحة يظهر فيها، ولا «کارخانہ»
// باقٍ في أي صفحة أوردية (OQ1 في الموقع كله).
//   node docs/ur-owner-trails/verify-dist.mjs <root> [--break]
// --break: يكسر نسخةً في الذاكرة من كل صفحة (يعيد النص القديم مكان الجديد) ويشترط أن يُمسك الفاحص كل كسر — لا يمسّ dist.
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const R = process.argv[2];
const BREAK = process.argv.includes('--break');
if (!R) { console.error('usage: verify-dist.mjs <root> [--break]'); process.exit(2); }
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const decode = (s) => s.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
const DIST = path.join(R, 'dist');
const read = (rel) => decode(readFileSync(path.join(DIST, rel), 'utf8'));
const fin = JSON.parse(readFileSync(`${HERE}/out/final.json`, 'utf8')).positions;
const P = Object.fromEntries(fin.map((p) => [p.id, p]));

const checks = [
  ['ur/attractions/duqat-algharash/index.html', 'ur-duqat-body'],
  ['ur/attractions/duqat-algharash/index.html', 'ur-duqat-summary'],
  ['ur/souqs-parks-farms/index.html', 'ur-duqat-summary'],
  ['ur/trails/al-uqair-coast/index.html', 'ur-trail-uqair-beach'],
  ['ur/trails/qarah-and-jawatha/index.html', 'ur-trail-jawatha'],
].map(([page, id]) => [page, P[id].proposed, P[id].current, id]);

// every built Urdu page: no «کارخانہ» left
const urPages = [];
const walk = (d) => { for (const e of readdirSync(path.join(DIST, d), { withFileTypes: true })) { const r = d + '/' + e.name; if (e.isDirectory()) walk(r); else if (e.name.endsWith('.html')) urPages.push(r); } };
walk('ur');

const run = (get) => {
  let bad = 0;
  for (const [page, must, mustNot, label] of checks) {
    const t = get(page), okIn = t.includes(must), okOut = !t.includes(mustNot);
    if (!okIn || !okOut) bad++;
    if (!BREAK) console.log(`${okIn && okOut ? 'ok  ' : 'FAIL'} ${label} on /${page}${okIn ? '' : ' (new text missing)'}${okOut ? '' : ' (old text present)'}`);
  }
  const left = urPages.filter((p) => get(p).includes('کارخانہ'));
  if (left.length) bad++;
  if (!BREAK) console.log(`${left.length ? 'FAIL' : 'ok  '} no «کارخانہ» in ${urPages.length} Urdu pages${left.length ? ': ' + left.join(', ') : ''}`);
  return bad;
};

const bad = run(read);
if (bad) { console.error(`FAIL ${bad}`); process.exit(1); }
console.log(`ALL PASS ${checks.length + 1}/${checks.length + 1}`);
if (BREAK) {
  let caught = 0;
  for (const [page, must, mustNot, label] of checks) {
    const broken = (pg) => (pg === page ? read(pg).split(must).join(mustNot) : read(pg));
    if (run(broken) > 0) caught++; else console.error(`NOT CAUGHT: ${label} on ${page}`);
  }
  // a stray «کارخانہ» on an unrelated page must also be caught
  const stray = urPages.find((p) => p.includes('/map/')) ?? urPages[0];
  if (run((pg) => (pg === stray ? read(pg) + 'کارخانہ' : read(pg))) > 0) caught++; else console.error('NOT CAUGHT: stray «کارخانہ»');
  console.log(`break: ${caught}/${checks.length + 1} caught`);
  if (caught !== checks.length + 1) process.exit(1);
}
