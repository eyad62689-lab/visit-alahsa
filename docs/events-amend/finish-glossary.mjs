// يطبّق عمليات المعجم والذاكرة وسطر الدرجات من out/<lg>/07.json لدفعة events-amend (de · zh · ru)، على سابقة
// docs/food-amend/finish-glossary.mjs: كل حاكم كتب عملياته بصيغة خطّه، فلكل صيغة محوّل، وكل عملية تتحقق من
// القيمة القديمة قبل التغيير — أي عدم تطابق يُخفق قبل كتابة أي ملف. الملفات تُكتب بـJSON.stringify(…, null, 2)
// ونهايات أسطرها الأصلية، ويُفحص أن الجولة بلا تعديل تعيد الملف بايتاً ببايت قبل الكتابة.
//   node docs/events-amend/finish-glossary.mjs <root> [--dry]
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
const finalOf = (lg) => JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions[0].proposed;
const EN = JSON.parse(readFileSync(path.join(ROOT, 'de-translation/output/events-amend/pack.json'), 'utf8')).positions[0].en_after;

for (const lg of ['de', 'zh', 'ru']) {
  const J = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  if (J.decision !== 'APPROVE') { fails.push(lg + ': 07 is not APPROVE'); continue; }
  const fin = finalOf(lg);
  const tb = loadJson(`${lg}-translation/glossary/termbase.json`);
  const tm = loadJson(`${lg}-translation/memory/tm.json`);
  const T = tb.data.terms, P = tm.data.pairs;
  for (const op of J.termbase_ops ?? []) {
    if (lg === 'de' && op.op === 'add') {
      if (T.some((t) => t.en === op.entry.en || t.de === op.entry.de)) { fails.push('de add: entry exists: ' + op.entry.de); continue; }
      T.push(op.entry); say.push('de termbase: + ' + op.entry.de);
    } else if (lg === 'de' && op.op === 'annotate') {
      const i = findOne(T, (t) => t.en === op.entry_en, 'de annotate ' + op.entry_en);
      if (i >= 0) { if (T[i][op.field].includes('events-amend')) fails.push('de annotate: already annotated'); else { T[i][op.field] = T[i][op.field] + ' ' + op.append; say.push('de termbase: note + ' + op.entry_en); } }
    } else if (lg === 'zh' && op.op === 'update') {
      const i = findOne(T, (t) => t.en === op.match.en && t.zh === op.match.zh, 'zh update ' + op.match.en);
      if (i >= 0) for (const [f, v] of Object.entries(op.fields)) { if (T[i][f] !== v.old) fails.push('zh update ' + f + ': old value differs'); else { T[i][f] = v.new; say.push('zh termbase: ' + f + ' of ' + op.match.en); } }
    } else if (lg === 'ru' && op.op === 'update') {
      const i = findOne(T, (t) => t[op.entry_match.field] === op.entry_match.equals, 'ru update ' + op.entry_match.equals);
      if (i >= 0 && i !== op.entry_match.index_at_judging) fails.push('ru update: index moved since judging');
      if (i >= 0) for (const c of op.changes) { if (c.op !== 'append') fails.push('ru: unknown change op'); else if (T[i][c.field].includes('events-amend')) fails.push('ru: already annotated'); else { T[i][c.field] = T[i][c.field] + c.append; say.push('ru termbase: ' + c.field + ' of ' + op.entry_match.equals); } }
    } else fails.push(lg + ': unknown termbase op ' + op.op);
  }
  for (const op of J.tm_ops ?? []) {
    const pair = op.pair ?? Object.fromEntries(Object.entries(op).filter(([k]) => !['op', 'file', 'why'].includes(k)));
    if (pair.en !== EN) { fails.push(lg + ' tm: en is not the pack en_after'); continue; }
    if (pair[lg] !== fin) { fails.push(lg + ' tm: ' + lg + ' is not final.json'); continue; }
    if (P.some((p) => p.en === pair.en)) { fails.push(lg + ' tm: a pair of this English exists'); continue; }
    P.push(pair); say.push(lg + ' tm: + 1 pair');
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
