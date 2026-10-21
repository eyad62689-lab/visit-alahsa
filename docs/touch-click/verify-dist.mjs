// تحقق مستقل من dist لدفعة touch-click: كل نص معتمد منشور في صفحته، والقديم غائب حيث تغيّر، والإنجليزية الجديدة
// منشورة والقديمة غائبة في صفحاتها الأربع.
//   node docs/touch-click/verify-dist.mjs <root> [--break]
// --break: يكسر نسخةً في الذاكرة من كل صفحة (يعيد النص القديم مكان الجديد) ويشترط أن يُمسك الفاحص كل كسر — لا يمسّ dist.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const R = process.argv[2];
const BREAK = process.argv.includes('--break');
if (!R) { console.error('usage: verify-dist.mjs <root> [--break]'); process.exit(2); }
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const decode = (s) => s.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
const read = (rel) => decode(readFileSync(path.join(R, 'dist', rel), 'utf8'));
const PAGE = { 'map.lead.a': 'map', 'tmap.lead': 'terrain-map', 'plan.empty.d': 'plan', 'dining-heroSum': 'restaurants-cafes' };
// a {n} slot renders as a number: check the longest literal part around it
const probe = (s) => s.split(/\{\w+\}/).sort((a, b) => b.length - a.length)[0];

const checks = []; // [page, must, mustNot|null, label]
const en = JSON.parse(readFileSync(path.join(R, 'de-translation/output/touch-click/pack.json'), 'utf8')).positions;
for (const k of en) {
  const key = k.id.slice(3);
  checks.push([`en/${PAGE[key]}/index.html`, probe(k.en_after), probe(k.en_before), `en ${key}`]);
}
for (const lg of ['de', 'zh', 'ru', 'ur']) {
  for (const p of JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions) {
    const key = p.id.slice(lg.length + 1);
    checks.push([`${lg}/${PAGE[key]}/index.html`, probe(p.proposed), p.proposed === p.current ? null : probe(p.current), p.id]);
  }
}

const run = (get) => {
  let bad = 0;
  for (const [page, must, mustNot, label] of checks) {
    const t = get(page), okIn = t.includes(must), okOut = !mustNot || !t.includes(mustNot);
    if (!okIn || !okOut) bad++;
    if (!BREAK) console.log(`${okIn && okOut ? 'ok  ' : 'FAIL'} ${label}${okIn ? '' : ' (new text missing)'}${okOut ? '' : ' (old text present)'}`);
  }
  return bad;
};
const bad = run(read);
if (bad) { console.error(`FAIL ${bad}`); process.exit(1); }
console.log(`ALL PASS ${checks.length}/${checks.length}`);
if (BREAK) {
  let caught = 0, tried = 0;
  for (const [page, must, mustNot, label] of checks) {
    if (!mustNot) continue;
    tried++;
    if (run((pg) => (pg === page ? read(pg).split(must).join(mustNot) : read(pg))) > 0) caught++; else console.error(`NOT CAUGHT: ${label}`);
  }
  console.log(`break: ${caught}/${tried} caught`);
  if (caught !== tried) process.exit(1);
}
