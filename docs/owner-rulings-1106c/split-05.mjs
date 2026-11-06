// يحوّل مقترح 05 الأول (المقدمة كاملة بجملتها الأخيرة المصحَّحة) إلى موضعَي الحزمة الجديدين: المقدمة برأسها المنشور، والجملة
// الأخيرة المترجمة قيمةً لـtmap.howto. يحفظ الأصل في 05-combined.json. لا كتابة يدوية لأي نص.
//   node docs/owner-rulings-1106c/split-05.mjs <root> <lg…>
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const [ROOT, ...LANGS] = process.argv.slice(2);
let fail = 0;
for (const lg of LANGS) {
  const comb = `${HERE}/out/${lg}/05-combined.json`;
  let old;
  try { old = JSON.parse(readFileSync(comb, 'utf8')); } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    old = JSON.parse(readFileSync(`${HERE}/out/${lg}/05.json`, 'utf8'));
    writeFileSync(comb, JSON.stringify(old, null, 2) + '\n', { encoding: 'utf8', flag: 'wx' });
  }
  const proposed = old.positions[0].proposed;
  const [lead, howto] = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/owner-rulings-1106c/pack.json`, 'utf8')).positions;
  if (!proposed.startsWith(lead.target)) { console.error(`FAIL ${lg}: the 05 proposal does not start with the published head`); fail++; continue; }
  const tail = proposed.slice(lead.target.length).trim();
  if (!tail) { console.error(`FAIL ${lg}: no new sentence`); fail++; continue; }
  const out = { batch: 'owner-rulings-1106c', lang: lg, stage: 5, date: old.date, positions: [
    { id: lead.id, current: lead.current, proposed: lead.target, note: 'the published head, byte-identical (the instruction leaves the lead)' },
    { id: howto.id, current: '', proposed: tail, note: old.positions[0].note ?? '' },
  ] };
  writeFileSync(`${HERE}/out/${lg}/05.json`, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`  ${lg}: howto = ${tail}`);
}
if (fail) process.exit(1);
