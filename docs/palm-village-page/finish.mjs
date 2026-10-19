// يختم دفعة palm-village-page للغة بعد اعتماد الحاكم: عمليات المعجم (add)، وأزواج الذاكرة لكل موضع،
// وسطر الدرجة في scores.csv. عمليات op: "note" أحكامُ دفعة لا مداخل معجم فلا تُكتب.
// متكرّر بأمان: لا يضيف مدخلاً أو زوجاً موجوداً، ولا سطر درجة مكرّراً.
//   node docs/palm-village-page/finish.mjs <lg…>
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';

for (const lg of process.argv.slice(2)) {
  const fin = JSON.parse(readFileSync(`docs/palm-village-page/out/${lg}/final.json`, 'utf8'));
  const pack = JSON.parse(readFileSync(`${lg}-translation/output/palm-village-page/pack.json`, 'utf8'));
  const j7 = JSON.parse(readFileSync(`docs/palm-village-page/out/${lg}/07.json`, 'utf8'));
  if (fin.score < 90) throw new Error(`${lg}: ${fin.score} دون العتبة`);

  // ١. المعجم
  const tbPath = `${lg}-translation/glossary/termbase.json`;
  const tbRaw = readFileSync(tbPath, 'utf8');
  const tb = JSON.parse(tbRaw);
  let added = 0;
  for (const op of fin.termbase_ops ?? []) {
    if (op.op !== 'add') continue;
    const e = op.entry;
    if (lg === 'ur') {
      const { ur, ...rest } = e;
      if (tb.terms[ur]) continue;
      tb.terms[ur] = rest; added++;
    } else {
      if (tb.terms.some((t) => t.en === e.en && t[lg] === e[lg])) continue;
      tb.terms.push(e); added++;
    }
  }
  writeFileSync(tbPath, JSON.stringify(tb, null, 2) + (tbRaw.endsWith('\n') ? '\n' : ''));

  // ٢. الذاكرة — زوج لكل موضع (المصدر الإنجليزي ← المعتمد)
  const tmPath = `${lg}-translation/memory/tm.json`;
  const tmRaw = readFileSync(tmPath, 'utf8');
  const tm = JSON.parse(tmRaw);
  const src = Object.fromEntries(pack.positions.map((p) => [p.id, p.en]));
  let pairs = 0;
  for (const p of fin.positions) {
    if (!src[p.id]) throw new Error(`${lg}: لا مصدر للموضع ${p.id}`);
    if (tm.pairs.some((x) => x.en === src[p.id] && x[lg] === p.proposed)) continue;
    tm.pairs.push({ en: src[p.id], [lg]: p.proposed, page: 'attractions/palm-village', field: p.id, date: fin.approved_at, note: 'palm-village-page' });
    pairs++;
  }
  writeFileSync(tmPath, JSON.stringify(tm, null, 2) + (tmRaw.endsWith('\n') ? '\n' : ''));

  // ٣. سطر الدرجة
  const scPath = `${lg}-translation/memory/scores.csv`;
  const sc = readFileSync(scPath, 'utf8');
  const tag = `palm-village-page (${lg})`;
  if (!sc.includes(tag)) {
    const b = j7.breakdown ? Object.values(j7.breakdown).join('/') : '';
    const blind = (j7.blind_rulings ?? []).length;
    const row = `"${tag}: /${lg}/attractions/palm-village/ — 27 positions (full attraction page)",${fin.approved_at},1,${fin.score},"APPROVE (${b}; ${(j7.edits ?? []).length} judge edits; blind reader ${blind} observations ruled; ${added} termbase adds)"`;
    appendFileSync(scPath, (sc.endsWith('\n') ? '' : '\n') + row + '\n');
  }
  console.log(`${lg}: ${added} مدخلاً، ${pairs} زوجاً، درجة ${fin.score}`);
}
