// يطبّق عمليات المعجم والذاكرة وسطر الدرجات من out/<lg>/07.json لدفعة kafu-definition (de · zh · ru)، على سابقة
// docs/events-amend/finish-glossary.mjs: كل عملية تتحقق من القيمة القديمة قبل التغيير، وأي عدم تطابق يُخفق قبل
// كتابة أي ملف. عمليات الذاكرة هنا استبدال (REPLACE): زوج المدخل القديم (events-amend) يُستبدل بزوج المدخل الجديد،
// ويُشترط أن يطابق الزوجُ القديم الإنجليزيةَ القديمة ونصَّ اللغة المنشور، والجديدُ final.json.
//   node docs/kafu-definition/finish-glossary.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: finish-glossary.mjs <root> [--dry]'); process.exit(2); }
const fails = [];
const say = [];
const out = new Map();
const eolOf = (s) => (s.includes('\r\n') ? '\r\n' : '\n');
const loadJson = (rel) => {
  const raw = readFileSync(path.join(ROOT, rel), 'utf8');
  const EOL = eolOf(raw);
  const data = JSON.parse(raw);
  const ser = (d) => JSON.stringify(d, null, 2).split('\n').join(EOL) + (raw.endsWith(EOL) ? EOL : '');
  if (ser(data) !== raw) fails.push(rel + ': not a plain JSON.stringify(…, 2) file — round trip differs');
  return { rel, data, ser };
};
const findOne = (arr, pred, label) => {
  const hits = arr.map((x, i) => (pred(x) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) { fails.push(label + ': ' + hits.length + ' matching entries'); return -1; }
  return hits[0];
};

for (const lg of ['de', 'zh', 'ru']) {
  const J = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  if (J.decision !== 'APPROVE') { fails.push(lg + ': 07 is not APPROVE'); continue; }
  const pk = JSON.parse(readFileSync(path.join(ROOT, `${lg}-translation/output/kafu-definition/pack.json`), 'utf8')).positions[0];
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions[0].proposed;
  const tb = loadJson(`${lg}-translation/glossary/termbase.json`);
  const tm = loadJson(`${lg}-translation/memory/tm.json`);
  const T = tb.data.terms, P = tm.data.pairs;
  for (const op of J.termbase_ops ?? []) {
    if (op.op === 'annotate') {
      const i = findOne(T, (t) => t.en === op.entry_en, lg + ' annotate ' + op.entry_en);
      if (i >= 0) { if (T[i][op.field].includes('kafu-definition')) fails.push(lg + ' annotate: already annotated'); else { T[i][op.field] = T[i][op.field] + ' ' + op.append; say.push(lg + ' termbase: note + ' + op.entry_en); } }
    } else if (op.op === 'update' && op.match) {
      const i = findOne(T, (t) => Object.entries(op.match).every(([k, v]) => t[k] === v), lg + ' update ' + JSON.stringify(op.match));
      if (i >= 0) for (const [f, v] of Object.entries(op.fields)) { if (T[i][f] !== v.old) fails.push(lg + ' update ' + f + ': old value differs'); else { T[i][f] = v.new; say.push(lg + ' termbase: ' + f + ' of ' + op.match.en); } }
    } else fails.push(lg + ': unknown termbase op ' + op.op);
  }
  for (const op of J.tm_ops ?? []) {
    if (op.op !== 'replace') { fails.push(lg + ' tm: unknown op ' + op.op); continue; }
    const neu = op.new ?? op.pair;
    const oldEn = op.old?.en ?? op.match?.old_en;
    if (oldEn !== pk.en_before) { fails.push(lg + ' tm: old en is not the pack en_before'); continue; }
    if (neu.en !== pk.en_after) { fails.push(lg + ' tm: new en is not the pack en_after'); continue; }
    if (neu[lg] !== fin) { fails.push(lg + ' tm: new ' + lg + ' is not final.json'); continue; }
    const i = findOne(P, (p) => p.en === oldEn && p[lg] === pk.current, lg + ' tm: the published pair');
    if (i < 0) continue;
    if (P.some((p) => p.en === neu.en)) { fails.push(lg + ' tm: a pair of the new English exists'); continue; }
    P[i] = neu; say.push(lg + ' tm: pair replaced (index ' + i + ')');
  }
  out.set(tb.rel, tb.ser(tb.data)); out.set(tm.rel, tm.ser(tm.data));
  const csvRel = `${lg}-translation/memory/scores.csv`;
  const csv = readFileSync(path.join(ROOT, csvRel), 'utf8');
  const EOL = eolOf(csv);
  if (!J.scores_csv_row || csv.includes(J.scores_csv_row)) fails.push(lg + ': scores row missing or present');
  else { out.set(csvRel, csv + (csv.endsWith(EOL) ? '' : EOL) + J.scores_csv_row + EOL); say.push(lg + ' scores.csv: + 1 row'); }
}
if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
for (const s of say) console.log('  ' + s);
if (!DRY) for (const [rel, s] of out) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log((DRY ? 'DRY ' : '') + out.size + ' file(s)');
