// يطبّق عمليات المعجم والذاكرة وسطر الدرجات من out/<lg>/07.json لدفعة food-amend (de · zh · ru).
// كل لغة كتب حاكمها عملياته بصيغة خطّه، فلكل صيغة محوّل، وكل عملية تتحقق من القيمة القديمة قبل
// الاستبدال: أي عدم تطابق يُخفق قبل كتابة أي ملف. الملفات تُكتب بـJSON.stringify(…, null, 2) ونهايات
// أسطرها الأصلية (CRLF)، ويُفحص أن الجولة بلا تعديل تعيد الملف بايتاً ببايت قبل الكتابة.
//   node docs/food-amend/finish-glossary.mjs <root> [--dry]
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
  const J = JSON.parse(readFileSync(path.join(HERE, 'out', lg, '07.json'), 'utf8'));
  const pack = JSON.parse(readFileSync(path.join(ROOT, lg + '-translation/output/food-amend/pack.json'), 'utf8'));
  if (J.decision !== 'APPROVE') { fails.push(lg + ': decision is ' + J.decision); continue; }
  const tb = loadJson(lg + '-translation/glossary/termbase.json');
  const tm = loadJson(lg + '-translation/memory/tm.json');
  const terms = tb.data.terms;
  // ── termbase ──
  for (const op of J.termbase_ops ?? []) {
    if (lg === 'zh') {
      const i = findOne(terms, (t) => Object.entries(op.match).every(([k, v]) => t[k] === v), lg + ' termbase match');
      if (i < 0) continue;
      for (const [f, { old, new: nw }] of Object.entries(op.fields)) {
        if (terms[i][f] !== old) { fails.push(lg + ' termbase ' + f + ': old value differs'); continue; }
        terms[i][f] = nw;
      }
    } else if (lg === 'de') {
      const i = findOne(terms, (t) => Object.entries(op.entry_match).every(([k, v]) => t[k] === v), lg + ' termbase match');
      if (i < 0) continue;
      if ((terms[i][op.field] ?? null) !== op.old) { fails.push(lg + ' termbase ' + op.field + ': old value differs'); continue; }
      terms[i][op.field] = op.new;
    } else {
      const m = op.entry_match;
      const i = findOne(terms, (t) => t[m.field] === m.equals, lg + ' termbase match');
      if (i < 0) continue;
      for (const c of op.changes) {
        if (c.op === 'append') {
          if (!String(terms[i][c.field] ?? '').endsWith(c.old_suffix_check)) { fails.push(lg + ' termbase ' + c.field + ': suffix check failed'); continue; }
          terms[i][c.field] += c.append;
        } else {
          if (terms[i][c.field] !== c.old) { fails.push(lg + ' termbase ' + c.field + ': old value differs'); continue; }
          terms[i][c.field] = c.new;
        }
      }
    }
    say.push(lg + ': termbase op applied');
  }
  // ── translation memory ──
  const P = tm.data.pairs;
  let rep = 0, add = 0;
  for (const op of J.tm_ops ?? []) {
    if (op.op === 'keep') continue;
    if (lg === 'zh') {
      if (op.op === 'add') { P.push(op.value); add++; continue; }
      const i = Number(/pairs\[(\d+)\]/.exec(op.target)[1]);
      for (const [f, v] of Object.entries(op.fields)) {
        if (v.op === 'append') { P[i][f] = (P[i][f] ?? '') + v.text; continue; }
        if (P[i][f] !== v.old) { fails.push(lg + ' tm ' + i + '.' + f + ': old value differs'); continue; }
        P[i][f] = v.new;
      }
      rep++;
    } else if (lg === 'de') {
      const i = op.pair_index;
      if (P[i]?.en !== op.en_old || P[i]?.de !== op.de_old) { fails.push(lg + ' tm ' + i + ': old pair differs'); continue; }
      Object.assign(P[i], { en: op.en_new, de: op.de_new, date: op.date, note: op.note });
      rep++;
    } else {
      const i = Number(/pairs\[(\d+)\]/.exec(op.pair)[1]);
      // the old pair must be the published text of a position of the pack (current / en_before)
      const pos = pack.positions.find((p) => p.current === P[i]?.ru);
      if (!pos || P[i].en !== pos.en_before) { fails.push(lg + ' tm ' + i + ': old pair is not a pack position'); continue; }
      Object.assign(P[i], { page: op.page, field: op.field, en: op.en, ru: op.ru, date: op.date, ...(op.note ? { note: op.note } : {}) });
      rep++;
    }
  }
  say.push(lg + ': tm ' + rep + ' replaced, ' + add + ' added');
  out.set(tb.rel, tb.ser(tb.data));
  out.set(tm.rel, tm.ser(tm.data));
  // ── scores ──
  const rel = lg + '-translation/memory/scores.csv';
  const raw = readFileSync(path.join(ROOT, rel), 'utf8');
  const EOL = eolOf(raw);
  const row = String(J.scores_csv_row).trim();
  if (/[\r\n]/.test(row)) fails.push(lg + ': score row has a line break');
  if (raw.includes(row)) say.push(lg + ': score row already present');
  else out.set(rel, raw + (raw.endsWith(EOL) ? '' : EOL) + row + EOL);
}
if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
for (const [rel, s] of out) if (!DRY) writeFileSync(path.join(ROOT, rel), s, 'utf8');
for (const l of say) console.log(l);
console.log((DRY ? 'DRY ' : '') + out.size + ' file(s)');
