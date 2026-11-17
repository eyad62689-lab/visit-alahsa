import fs from 'node:fs';
const root = 'C:/Users/truyr/node-store/va-wt/khalifa-loc/tr-translation/';
const batch = JSON.parse(fs.readFileSync(root + 'output/hours-google-2/batch.json', 'utf8'));
const final = JSON.parse(fs.readFileSync(root + 'output/hours-google-2/final.json', 'utf8'));
const tmPath = root + 'memory/tm.json';
const raw = fs.readFileSync(tmPath, 'utf8');
const tm = JSON.parse(raw);
const pages = { 'trail.historic-hofuf.intro': 'src/data/trails.tr.json', 'plan.faq.qaisariyah': 'src/components/views/PlanTripView.astro' };
const enOf = (it) => {
  if (it.id !== 'plan.faq.qaisariyah') return it.source_en;
  const m = it.source_en.match(/a: `([^`]*)`/);
  return m[1];
};
const before = tm.pairs.length;
for (const it of batch.items) {
  if (tm.pairs.some((p) => p.field === it.id && p.note === 'hours-google-2 (tr)')) continue;
  tm.pairs.push({ en: enOf(it), tr: final.items[it.id], page: pages[it.id], field: it.id, date: '2026-11-17', note: 'hours-google-2 (tr)' });
}
const indent = raw.match(/\n( +)"/)?.[1].length ?? 2;
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
fs.writeFileSync(tmPath, JSON.stringify(tm, null, indent).replace(/\n/g, eol) + (raw.endsWith('\n') ? eol : ''));
const csvPath = root + 'memory/scores.csv';
const csv = fs.readFileSync(csvPath, 'utf8');
if (!csv.includes('"hours-google-2 (tr)')) {
  const ceol = csv.includes('\r\n') ? '\r\n' : '\n';
  const row = '"hours-google-2 (tr): follow-up to hours-google-1 source defects, one sentence each (trail no late-afternoon advice; souq FAQ no shops-shut-in-morning implication), 2 strings",2026-11-17,1,92,"APPROVE (28/26/19/9/10); judge changes 0; blind reader 9 observations ruled; 1 source defect (trail morning advice vs FAQ evening-best read as conflicting)"';
  fs.writeFileSync(csvPath, csv + (csv.endsWith('\n') ? '' : ceol) + row + ceol);
}
const back = JSON.parse(fs.readFileSync(tmPath, 'utf8'));
console.log('tm pairs', before, '->', back.pairs.length);
for (const p of back.pairs.slice(-2)) console.log(p.field, p.tr === final.items[p.field], p.en.slice(0, 60));
console.log(fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/).pop().slice(0, 80));
