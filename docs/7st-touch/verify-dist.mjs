// تحقق مستقل من dist لدفعة 7st-touch: لكل صفحة متأثرة، النص المعتمد منشور مرةً على الأقل والنص القديم غائب.
//   node docs/7st-touch/verify-dist.mjs <root> [--break]
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

// [page, must contain, must not contain, label]
const checks = [];
const AR7 = 'مطاعم-ومقاهي/مقهى-شارع-7/index.html';
checks.push([AR7, 'يقع في حي الرفعة الشمالية بالهفوف بجوار قصر إبراهيم', 'في الكوت القديم بالهفوف', 'ar 7st location']);
checks.push([AR7, 'ويجاور المقهى حيَّ الكوت', 'وحي الكوت الذي يقوم فيه', 'ar 7st Al-Koot']);
checks.push(['en/restaurants-cafes/7st/index.html', 'sits in the North Al-Rifaa district of Hofuf, beside Qasr Ibrahim', 'in the old Al-Koot quarter of Hofuf', 'en 7st location']);
checks.push(['en/restaurants-cafes/7st/index.html', 'Next door is the Al-Koot quarter', 'The Al-Koot quarter it stands in', 'en 7st Al-Koot']);
checks.push(['index.html', 'اضغط على معلمٍ لتراه', 'المس معلماً لتراه', 'ar map lead']);
checks.push(['en/index.html', 'Open one to see it', 'Tap one to see it', 'en map lead']);
for (const lg of ['de', 'zh', 'ru', 'ur']) {
  for (const p of JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions) {
    const page = p.id.endsWith('-7st-body') ? `${lg}/restaurants-cafes/7st/index.html` : `${lg}/index.html`;
    checks.push([page, p.proposed, p.proposed === p.current ? null : p.current, p.id]);
  }
}

const run = (get) => {
  let bad = 0;
  for (const [page, must, mustNot, label] of checks) {
    const t = get(page);
    const okIn = t.includes(must), okOut = !mustNot || !t.includes(mustNot);
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
    const broken = (pg) => (pg === page ? read(pg).split(must).join(mustNot) : read(pg));
    if (run(broken) > 0) caught++; else console.error(`NOT CAUGHT: ${label}`);
  }
  console.log(`break: ${caught}/${tried} caught`);
  if (caught !== tried) process.exit(1);
}
