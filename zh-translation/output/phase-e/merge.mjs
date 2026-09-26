// node merge.mjs <lang> [--dry] — يدمج termbase_additions وtm_pairs وscores_row من judge.json للدفعات الأربع
// في ذاكرة خطّ اللغة. يحفظ تنسيق كل ملف كما هو (سطر ختامي أو لا)، ولا يكتب فوق مدخلٍ رأسُه (en) قائم.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const Z = path.dirname(new URL(import.meta.url).pathname);
const [lang, flag] = process.argv.slice(2);
const dry = flag === '--dry';
const TB = `${REPO}/${lang}-translation/glossary/termbase.json`;
const TM = `${REPO}/${lang}-translation/memory/tm.json`;
const SC = `${REPO}/${lang}-translation/memory/scores.csv`;
const rawTb = fs.readFileSync(TB, 'utf8'), rawTm = fs.readFileSync(TM, 'utf8');
const tb = JSON.parse(rawTb), tm = JSON.parse(rawTm);
let scores = fs.readFileSync(SC, 'utf8');
const t0 = tb.terms.length, m0 = tm.pairs.length;
const norm = (s) => String(s).trim().toLowerCase();
const have = new Set(tb.terms.map((t) => norm(t.en)));
for (const b of ['ui', 'legal-1', 'legal-2', 'legal-3']) {
  const j = JSON.parse(fs.readFileSync(path.join(Z, `${lang}-${b}`, 'judge.json'), 'utf8'));
  if (j.decision !== 'APPROVE' || !(j.batch_score >= 90)) throw new Error(`${j.batch}: ليس APPROVE ≥ 90`);
  let added = 0;
  for (const t of j.termbase_additions ?? []) {
    if (have.has(norm(t.en))) { console.log(`  = ${j.batch}: «${t.en}» قائم — تُخطّي`); continue; }
    have.add(norm(t.en)); added++;
    tb.terms.push({ ...t, added: t.added ?? '2026-09-26', batch: j.batch });
  }
  for (const p of j.tm_pairs ?? []) tm.pairs.push({ en: p.en, [lang]: p[lang], page: p.page, field: p.field, date: '2026-09-26' });
  scores = scores.replace(/\n*$/, '\n') + String(j.scores_row).trim() + '\n';
  console.log(`${j.batch}: ${j.batch_score} · +${added} معجم · +${(j.tm_pairs ?? []).length} ذاكرة`);
}
console.log(`${lang}: termbase ${t0} ⇐ ${tb.terms.length} · tm ${m0} ⇐ ${tm.pairs.length}`);
const nl = (raw) => (raw.endsWith('\n') ? '\n' : '');
if (!dry) {
  fs.writeFileSync(TB, JSON.stringify(tb, null, 2) + nl(rawTb));
  fs.writeFileSync(TM, JSON.stringify(tm, null, 2) + nl(rawTm));
  fs.writeFileSync(SC, scores);
}
