// يسجّل مخرج دفعة flagged-fixes في ذاكرة الخطوط الثلاثة (de · zh · ru)، بعد apply.mjs:
//   - tm: لكل موضع تغيّر نصه، الزوج الحيّ الذي يحمل النص المنشور يوسم superseded ويُضاف زوج بالنص المعتمد (والإنجليزية
//     الجديدة لمتن 7st). المفتاح الجديد: إن وُجد له زوج حيّ بالنص نفسه (de «Visa-Leitfaden» 2026-10-17) لا يُكرَّر.
//   - scores.csv: سطر لكل لغة من 07.json.
// كل عملية تتحقق مما تجده قبل التغيير، وأي عدم تطابق يُخفق قبل كتابة أي ملف.
//   node docs/flagged-fixes/finish-glossary.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: finish-glossary.mjs <root> [--dry]'); process.exit(2); }
const DATE = '2026-10-22';
const fails = [], writes = new Map(), say = [];
const rd = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const crlfJson = (o) => JSON.stringify(o, null, 2).split('\n').join('\r\n') + '\r\n';
const csvq = (s) => '"' + String(s).replace(/"/g, '""') + '"';

for (const lg of ['de', 'zh', 'ru']) {
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions;
  const j = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  const pack = JSON.parse(rd(`${lg}-translation/output/flagged-fixes/pack.json`)).positions;
  if (j.decision !== 'APPROVE' || !(j.score >= 90)) fails.push(`${lg}: 07 is not an approval ≥ 90`);
  const TM = `${lg}-translation/memory/tm.json`;
  const raw = rd(TM), tm = JSON.parse(raw);
  if (crlfJson(tm) !== raw) fails.push(`${TM}: not a CRLF JSON.stringify(…, 2) file`);
  let sup = 0, add = 0, had = 0;
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current) { fails.push(`${k.id}: final.json does not match the pack`); continue; }
    if (pos.proposed === pos.current) continue;
    const isBody = k.id.endsWith('-7st-body');
    const en = isBody ? k.en_after : k.en;
    if (!k.current) {
      const live = tm.pairs.filter((p) => p.status !== 'superseded' && p[lg] === pos.proposed && p.en === en);
      if (live.length) { had++; continue; }
    } else {
      const old = tm.pairs.filter((p) => p.status !== 'superseded' && p[lg] === k.current);
      for (const p of old) { p.status = 'superseded'; p.superseded_on = DATE; sup++; }
    }
    tm.pairs.push({ en, [lg]: pos.proposed, page: isBody ? '7st' : 'ui', field: isBody ? 'body' : k.id.slice(lg.length + 1), date: DATE, note: 'flagged-fixes (blind-reader language errors; owner 2026-10-21)' });
    add++;
  }
  writes.set(TM, crlfJson(tm));
  const SC = `${lg}-translation/memory/scores.csv`;
  const sc = rd(SC);
  if (!sc.endsWith('\r\n')) fails.push(`${SC}: does not end in CRLF`);
  const axes = Object.entries(j.breakdown ?? {}).filter(([x]) => x !== 'total').slice(0, 5).map(([, v]) => (typeof v === 'object' ? v.points : v)).join('/');
  const edits = (j.judge_edits ?? []).length;
  writes.set(SC, sc + [csvq(`flagged-fixes (${lg}): ${pack.map((p) => p.id.slice(lg.length + 1)).join(', ')} — blind-reader language errors in published text`), DATE, 1, j.score,
    csvq(`APPROVE (${axes}; ${edits} judge edit${edits === 1 ? '' : 's'}; TM ${sup} superseded, ${add} added${had ? ', ' + had + ' already in TM' : ''})`)].join(',') + '\r\n');
  say.push(`${lg}: tm ${sup} superseded, ${add} added${had ? ', ' + had + ' already present' : ''}`);
}
// de termbase: the Golden Belt is an area (owner 2026-10-22); the de judge rules «das Golden-Belt-Gebiet»
{
  const TB = 'de-translation/glossary/termbase.json';
  const raw = rd(TB), tb = JSON.parse(raw);
  if (crlfJson(tb) !== raw) fails.push(`${TB}: not a CRLF JSON.stringify(…, 2) file`);
  const gb = tb.terms.filter((t) => /^the Golden Belt \(/.test(t.en));
  const sal = tb.terms.filter((t) => /^Al-Salam district \(/.test(t.en));
  if (gb.length !== 1 || sal.length !== 1) fails.push(`${TB}: expected one Golden Belt and one Al-Salam district entry (got ${gb.length}, ${sal.length})`);
  else {
    const note = `OWNER ${DATE} (flagged-fixes): the Golden Belt is an AREA — source «في حي السلام بمنطقة الحزام الذهبي» / "of the Golden Belt area". de judge (93): «das Golden-Belt-Gebiet», genitive «des Golden-Belt-Gebiets»; the earlier rule «Gebiet bleibt aus» is superseded; «Ringstraße» stays barred (no source says road). Status derived.`;
    gb[0].en = 'the Golden Belt (الحزام الذهبي — an area in Al-Ahsa; owner 2026-10-22)';
    gb[0].de = 'das Golden-Belt-Gebiet';
    gb[0].status = 'derived';
    gb[0].note = (gb[0].note ? gb[0].note + ' ‖ ' : '') + note;
    sal[0].en = sal[0].en.replace('on the Golden Belt', 'of the Golden Belt area');
    sal[0].note = (sal[0].note ? sal[0].note + ' ‖ ' : '') + `${DATE}: the area is «des Golden-Belt-Gebiets» (owner: the Golden Belt is an area).`;
    writes.set(TB, crlfJson(tb));
    say.push('de termbase: Golden Belt → das Golden-Belt-Gebiet; Al-Salam district gloss updated');
  }
}

if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
if (!DRY) for (const [rel, s] of writes) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log(say.join('\n'));
console.log(`${DRY ? 'DRY ' : ''}${writes.size} files: ${[...writes.keys()].join(', ')}`);
