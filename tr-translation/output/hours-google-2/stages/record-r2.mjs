import fs from 'node:fs';
const root = 'C:/Users/truyr/node-store/va-wt/khalifa-loc/tr-translation/';
const batch = JSON.parse(fs.readFileSync(root + 'output/hours-google-2/batch.json', 'utf8'));
const final = JSON.parse(fs.readFileSync(root + 'output/hours-google-2/final.json', 'utf8'));
const id = 'trail.historic-hofuf.intro';
const item = batch.items.find((x) => x.id === id);
const tmPath = root + 'memory/tm.json';
const raw = fs.readFileSync(tmPath, 'utf8');
const tm = JSON.parse(raw);
const NOTE = 'hours-google-2 r2 (tr)';
if (!tm.pairs.some((p) => p.field === id && p.note === NOTE)) {
  const old = tm.pairs.find((p) => p.field === id && p.note === 'hours-google-2 (tr)');
  if (!old) throw new Error('r1 pair not found');
  old.superseded_by = NOTE;
  tm.pairs.push({ en: item.source_en_r2, tr: final.items[id], page: 'src/data/trails.tr.json', field: id, date: '2026-11-17', note: NOTE, supersedes: 'hours-google-2 (tr)' });
}
const indent = raw.match(/\n( +)"/)?.[1].length ?? 2;
const eol = raw.includes('\r\n') ? '\r\n' : '\n';
fs.writeFileSync(tmPath, JSON.stringify(tm, null, indent).replace(/\n/g, eol) + (raw.endsWith('\n') ? eol : ''));
const csvPath = root + 'memory/scores.csv';
const csv = fs.readFileSync(csvPath, 'utf8');
if (!csv.includes('"hours-google-2 r2 (tr)')) {
  const ceol = csv.includes('\r\n') ? '\r\n' : '\n';
  const row = '"hours-google-2 r2 (tr): trail.historic-hofuf.intro timing sentence on the changed source (morning; Qasr Ibrahim closes in the afternoon; souq closes at midday and reopens in the evening), 1 string, supersedes the r1 trail pair",2026-11-17,2,92,"APPROVE (28/26/19/9/10); judge changes 0; fresh blind reader 7 observations ruled; r1 source defect resolved by the source change; batch score 92"';
  fs.writeFileSync(csvPath, csv + (csv.endsWith('\n') ? '' : ceol) + row + ceol);
}
const back = JSON.parse(fs.readFileSync(tmPath, 'utf8'));
const mine = back.pairs.filter((p) => p.field === id && p.note.startsWith('hours-google-2'));
for (const p of mine) console.log(p.note, p.superseded_by ?? '-', p.tr === final.items[id]);
console.log(fs.readFileSync(csvPath, 'utf8').trim().split(/\r?\n/).pop().slice(0, 60));
