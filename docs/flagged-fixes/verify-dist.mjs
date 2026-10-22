// تحقق مستقل من dist لدفعة flagged-fixes: كل نص معتمد منشور في صفحته والقديم غائب (والمفتاح الجديد لم يعد يُعرض
// بالإنجليزية)، والمصدر العربي والإنجليزي الجديد لعبارة «الحزام الذهبي» منشور.
//   node docs/flagged-fixes/verify-dist.mjs <root> [--break]
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
const PAGE = { '7st-body': 'restaurants-cafes/7st/', 'map.lead.a': 'map/', 'tmap.lead': 'terrain-map/', 'foot.l.visa': '', 'plan.visa': 'plan-your-trip/', 'search.escHint': '' };
const probe = (s) => s.split(/\{\w+\}/).sort((a, b) => b.length - a.length)[0];

const checks = [
  ['مطاعم-ومقاهي/مقهى-شارع-7/index.html', 'في حي السلام بمنطقة الحزام الذهبي', 'في حي السلام بالحزام الذهبي', 'ar 7st Golden Belt'],
  ['en/restaurants-cafes/7st/index.html', 'in the Al-Salam district of the Golden Belt area', 'district on the Golden Belt', 'en 7st Golden Belt'],
];
for (const lg of ['de', 'zh', 'ru']) {
  const pack = JSON.parse(readFileSync(path.join(R, `${lg}-translation/output/flagged-fixes/pack.json`), 'utf8')).positions;
  for (const p of JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions) {
    const key = p.id.slice(lg.length + 1), k = pack.find((x) => x.id === p.id);
    // a new key used to render the English text: that must be gone from the element; the page may still carry it elsewhere,
    // so the "old" probe for a new key is the English label inside the element that shows it
    let old = p.proposed === p.current ? null : p.current ? probe(p.current) : `>${k.en}<`;
    let must = probe(p.proposed);
    // when the fix only adds to the front (the Esc dash), the old text is inside the new one: anchor both on the
    // tag end before them, so "> закрыть" (old) and "> — закрыть" (new) differ
    if (old && p.current && p.proposed.includes(p.current)) { old = `> ${p.current}`; must = `> ${p.proposed}`; }
    checks.push([`${lg}/${PAGE[key]}index.html`, must, old, p.id]);
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
