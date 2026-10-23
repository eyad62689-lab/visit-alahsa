// يسجّل مخرج دفعة owner-rulings-1023 في ذاكرة الخطوط الأربعة (zh · de · ru · ur)، بعد apply.mjs final:
//   - tm.json: لكل موضع تغيّر نصه، الزوج الحيّ الذي يحمل النص المنشور يوسم superseded ويُضاف زوج بالنص المعتمد
//     (مع الإنجليزية الجديدة). المفتاح الجديد يُضاف زوجاً إن لم يوجد زوج حيّ بالنص نفسه.
//   - scores.csv: سطر لكل لغة من 07.json.
//   - termbase.json: من 07.json الأوردي `new_rulings` (أحكام جديدة بمعرّفات أعلى من آخر معرّف قائم) و`amendments`
//     ([{id, append}] تُلحق بقائمة `amended` للحكم القائم) و`termbase_notes` ([{key, append}] على مدخل معجمي)؛
//     ومن 07.json لـzh/de/ru `termbase_notes` ([{en, append}] على المدخل الذي حقله en يطابق حرفياً).
// كل عملية تتحقق مما تجده قبل التغيير، وأي عدم تطابق يُخفق قبل كتابة أي ملف.
//   node docs/owner-rulings-1023/finish-glossary.mjs <root> <lg…> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: finish-glossary.mjs <root> zh de ru ur [--dry]'); process.exit(2); }
const DATE = '2026-10-23';
const fails = [], writes = new Map(), say = [];
const rd = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const crlfJson = (o) => JSON.stringify(o, null, 2).split('\n').join('\r\n') + '\r\n';
const csvq = (s) => '"' + String(s).replace(/"/g, '""') + '"';
const load = (rel) => {
  const raw = rd(rel), o = JSON.parse(raw);
  if (crlfJson(o) !== raw) fails.push(`${rel}: not a CRLF JSON.stringify(…, 2) file`);
  return o;
};
const NOTE = 'owner-rulings-1023 (owner answers of 2026-10-23 on the round-5 open items)';

for (const lg of LANGS) {
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions;
  const j = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  const pack = JSON.parse(rd(`${lg}-translation/output/owner-rulings-1023/pack.json`)).positions;
  if (j.decision !== 'APPROVE' || !(j.score >= 90)) fails.push(`${lg}: 07 is not an approval ≥ 90`);
  // tm
  const TM = `${lg}-translation/memory/tm.json`;
  const tm = load(TM);
  let sup = 0, add = 0, had = 0;
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current) { fails.push(`${k.id}: final.json does not match the pack`); continue; }
    if (pos.proposed === pos.current) continue;
    const en = k.kind === 'ui-new' ? k.en : k.en_after;
    if (!k.current) {
      if (tm.pairs.some((p) => p.status !== 'superseded' && p[lg] === pos.proposed && p.en === en)) { had++; continue; }
    } else {
      // نصّ قصير مثل «داخلہ مفت» يحمله زوج حيّ لكل بطاقة؛ لا يوسم إلا زوج هذا الموضع: الوحيد، أو ما تسمّي صفحتُه ملفَ الموضع
      const slug = k.file.replace(/^.*\//, '').replace(/\.(md|ts|json)$/, '').replace(/-ur$/, '');
      let old = tm.pairs.filter((p) => p.status !== 'superseded' && p[lg] === k.current);
      if (old.length > 1) old = old.filter((p) => String(p.page ?? '').includes(slug) || String(p.file ?? '').includes(slug));
      for (const p of old) { p.status = 'superseded'; p.superseded_on = DATE; sup++; }
    }
    const field = k.kind === 'ui-new' ? k.key : k.field ?? k.locator ?? k.id.slice(lg.length + 1);
    tm.pairs.push({ en, [lg]: pos.proposed, page: k.file.replace(/^src\//, ''), field, date: DATE, note: NOTE });
    add++;
  }
  writes.set(TM, crlfJson(tm));
  // scores
  const SC = `${lg}-translation/memory/scores.csv`;
  const sc = rd(SC);
  if (!sc.endsWith('\r\n')) fails.push(`${SC}: does not end in CRLF`);
  const axes = Object.entries(j.breakdown ?? {}).filter(([x]) => x !== 'total').slice(0, 5).map(([, v]) => (typeof v === 'object' ? v.points : v)).join('/');
  const edits = (j.judge_edits ?? []).length;
  writes.set(SC, sc + [csvq(`owner-rulings-1023 (${lg}): ${pack.map((p) => p.id.slice(lg.length + 1)).join(', ')} — owner answers of ${DATE}`), DATE, 1, j.score,
    csvq(`APPROVE (${axes}; ${edits} judge edit${edits === 1 ? '' : 's'}; TM ${sup} superseded, ${add} added${had ? ', ' + had + ' already in TM' : ''})`)].join(',') + '\r\n');
  say.push(`${lg}: tm ${sup} superseded, ${add} added${had ? ', ' + had + ' already present' : ''}`);
  // termbase
  const TB = `${lg}-translation/glossary/termbase.json`;
  const tb = load(TB);
  let touched = 0;
  if (lg === 'ur') {
    const rules = tb._meta.calibration_rulings;
    const num = (id) => +(String(id).match(/^N(\d+)$/)?.[1] ?? -1);
    const max = Math.max(...rules.map((r) => num(r.id)));
    for (const r of j.new_rulings ?? []) {
      if (!r.id || !r.title || !r.ruling) { fails.push(`${lg} 07: incomplete new ruling ${r.id}`); continue; }
      if (num(r.id) <= max || rules.some((x) => x.id === r.id)) { fails.push(`${lg} 07: ruling id ${r.id} is not above the last id N${max}`); continue; }
      const e = { id: r.id, title: r.title, binds: r.binds ?? '', ruling: r.ruling };
      if (r.guard) e.guard = r.guard;
      e.ruled_by = `Judge, owner-rulings-1023, ${DATE} (owner's decision of ${DATE})`;
      rules.push(e); touched++;
    }
    for (const a of j.amendments ?? []) {
      const r = rules.find((x) => x.id === a.id);
      if (!r || !a.append) { fails.push(`${lg} 07: amendment to unknown ruling ${a.id}`); continue; }
      r.amended = [...(r.amended ?? []), `owner-rulings-1023 (${DATE}): ${a.append}`]; touched++;
    }
    for (const n of j.termbase_notes ?? []) {
      const t = tb.terms[n.key];
      if (!t || !n.append) { fails.push(`${lg} 07: termbase note on unknown key ${n.key}`); continue; }
      t.note = (t.note ? t.note + ' ‖ ' : '') + `${DATE}: ${n.append}`; touched++;
    }
  } else {
    for (const n of j.termbase_notes ?? []) {
      const hits = tb.terms.filter((t) => t.en === n.en);
      if (hits.length !== 1 || !n.append) { fails.push(`${lg} 07: termbase note matches ${hits.length} entries for en «${n.en}»`); continue; }
      hits[0].note = (hits[0].note ? hits[0].note + ' ‖ ' : '') + `${DATE}: ${n.append}`; touched++;
    }
  }
  if (touched) { writes.set(TB, crlfJson(tb)); say.push(`${lg}: termbase ${touched} change${touched === 1 ? '' : 's'}`); }
}

if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
if (!DRY) for (const [rel, s] of writes) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log(say.join('\n'));
console.log(`${DRY ? 'DRY ' : ''}${writes.size} files: ${[...writes.keys()].join(', ')}`);
