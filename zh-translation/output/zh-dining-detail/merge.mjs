// node merge.mjs <batch-dir>... [--dry] — يدمج termbase_additions وtm_pairs وscores_row من judge.json
// في ذاكرة الخط الصيني. المعجم: مدخلٌ رأسه (en) قائم لا يُكتب فوقه — يُبلَّغ ويُتخطّى.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const args = process.argv.slice(2);
const dry = args.includes('--dry');
const dirs = args.filter((a) => a !== '--dry');
const TB = `${REPO}/zh-translation/glossary/termbase.json`;
const TM = `${REPO}/zh-translation/memory/tm.json`;
const SC = `${REPO}/zh-translation/memory/scores.csv`;
const tb = JSON.parse(fs.readFileSync(TB, 'utf8'));
const tm = JSON.parse(fs.readFileSync(TM, 'utf8'));
let scores = fs.readFileSync(SC, 'utf8');
const t0 = tb.terms.length, m0 = tm.pairs.length;
const norm = (s) => s.trim().toLowerCase();
const have = new Set(tb.terms.map((t) => norm(t.en)));

for (const dir of dirs) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, 'judge.json'), 'utf8'));
  if (j.decision !== 'APPROVE' || !(j.batch_score >= 90)) throw new Error(`${j.batch}: ليس APPROVE ≥ 90`);
  for (const t of j.termbase_additions ?? []) {
    if (have.has(norm(t.en))) { console.log(`  = ${j.batch}: «${t.en}» قائم في المعجم — تُخطّي`); continue; }
    have.add(norm(t.en));
    tb.terms.push({ ...t, added: '2026-09-25', batch: j.batch });
  }
  for (const p of j.tm_pairs ?? []) tm.pairs.push({ en: p.en, zh: p.zh, page: p.page, field: p.field, date: '2026-09-25' });
  scores = scores.replace(/\n*$/, '\n') + j.scores_row.trim() + '\n';
  console.log(`${j.batch}: ${j.batch_score} · +${(j.termbase_additions ?? []).length} معجم (مقترح) · +${(j.tm_pairs ?? []).length} ذاكرة`);
}
console.log(`termbase ${t0} ⇐ ${tb.terms.length} · tm ${m0} ⇐ ${tm.pairs.length}`);
if (!dry) {
  fs.writeFileSync(TB, JSON.stringify(tb, null, 2));
  fs.writeFileSync(TM, JSON.stringify(tm, null, 2));
  fs.writeFileSync(SC, scores);
}
