// يسجّل مخرج دفعة 7st-touch في ذاكرة الخطوط الأربعة (de · zh · ru · ur)، بعد apply.mjs:
//   - tm: لكل موضع تغيّر نصه، يوسم الزوج القديم superseded (زوج المقدمة بنصه الإنجليزي السابق، وأزواج جمل متن 7st التي
//     تحمل جملة إنجليزية سقطت من المصدر)، ويُضاف زوج جديد بالنص الإنجليزي الجديد والنص المعتمد. الموضع الباقي بقرار لا يُمسّ.
//   - scores.csv: سطر لكل لغة من 07.json.
//   - الأوردية: الحكم الجديد N720 من 07.json في _meta.calibration_rulings بعد آخر حكم.
// كل عملية تتحقق مما تجده قبل التغيير، وأي عدم تطابق يُخفق قبل كتابة أي ملف.
//   node docs/7st-touch/finish-glossary.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: finish-glossary.mjs <root> [--dry]'); process.exit(2); }
const DATE = '2026-10-21';
const fails = [], writes = new Map(), say = [];
const rd = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const crlfJson = (o) => JSON.stringify(o, null, 2).split('\n').join('\r\n') + '\r\n';
const csvq = (s) => '"' + String(s).replace(/"/g, '""') + '"';
// English sentences: split after . ; : followed by a space (the 7st body is plain prose)
const sentences = (s) => s.split(/(?<=[.;:])\s+/).map((x) => x.trim()).filter(Boolean);

for (const lg of ['de', 'zh', 'ru', 'ur']) {
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions;
  const j = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  const pack = JSON.parse(rd(`${lg}-translation/output/7st-touch/pack.json`)).positions;
  if (j.decision !== 'APPROVE' || !(j.score >= 90)) fails.push(`${lg}: 07 is not an approval ≥ 90`);
  const tmRel = `${lg}-translation/memory/tm.json`;
  const raw = rd(tmRel);
  const tm = JSON.parse(raw);
  if (crlfJson(tm) !== raw) fails.push(`${tmRel}: not a CRLF JSON.stringify(…, 2) file`);
  let sup = 0, add = 0;
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current) { fails.push(`${k.id}: final.json does not match the pack`); continue; }
    if (pos.proposed === pos.current) continue;
    const isBody = k.id.endsWith('-7st-body');
    const file = rd(k.file);
    if (!file.includes(pos.proposed.replace(/\\/g, '\\\\').replace(/"/g, '\\"')) && !file.includes(pos.proposed)) fails.push(`${k.id}: the final text is not in ${k.file} (run apply.mjs first)`);
    const gone = isBody ? sentences(k.en_before).filter((s) => !k.en_after.includes(s)) : [k.en_before];
    const old = tm.pairs.filter((p) => p.status !== 'superseded' && p[lg] !== undefined &&
      (isBody ? p.page === '7st' && gone.some((s) => p.en.includes(s)) : p.en === k.en_before && p.field === 'map.lead'));
    if (!isBody && old.length !== 1) fails.push(`${tmRel}: ${old.length} live map.lead pairs for the old English (expected 1)`);
    for (const p of old) { p.status = 'superseded'; p.superseded_on = DATE; sup++; }
    tm.pairs.push(isBody
      ? { en: k.en_after, [lg]: pos.proposed, page: '7st', field: 'body', date: DATE, note: '7st-touch (owner: North Al-Rifaa, beside Qasr Ibrahim)' }
      : { en: k.en_after, [lg]: pos.proposed, page: old[0]?.page ?? 'home', field: 'map.lead', date: DATE, note: '7st-touch (owner: a verb for touch and click)' });
    add++;
  }
  writes.set(tmRel, crlfJson(tm));
  const scRel = `${lg}-translation/memory/scores.csv`;
  const sc = rd(scRel);
  if (!sc.endsWith('\r\n')) fails.push(`${scRel}: does not end in CRLF`);
  const b = j.breakdown ?? {};
  const axes = Object.entries(b).filter(([x]) => x !== 'total').slice(0, 5).map(([, v]) => (typeof v === 'object' ? v.points : v)).join('/');
  const edits = (j.judge_edits ?? []).length;
  const kept = fin.filter((p) => p.proposed === p.current).map((p) => p.id);
  writes.set(scRel, sc + [csvq(`7st-touch (${lg}): ${pack.length} position(s) — owner decisions ${DATE}: 7st district North Al-Rifaa beside Qasr Ibrahim; map-lead verb for touch and click`), DATE, 1, j.score,
    csvq(`APPROVE (${axes}; ${edits} judge edit${edits === 1 ? '' : 's'}${kept.length ? '; kept by decision: ' + kept.join(', ') : ''}; TM ${sup} superseded, ${add} added; out-of-scope reader points listed for the owner)`)].join(',') + '\r\n');
  say.push(`${lg}: tm ${sup} superseded, ${add} added`);
}

// the Urdu ruling N720, after the last ruling
{
  const rel = 'ur-translation/glossary/termbase.json';
  let s = rd(rel);
  const r = JSON.parse(readFileSync(`${HERE}/out/ur/07.json`, 'utf8')).new_rulings?.find((x) => x.id === 'N720');
  const rules = JSON.parse(s)._meta.calibration_rulings;
  if (!r) fails.push('ur 07.json: no N720');
  if (rules.some((x) => x.id === 'N720')) fails.push(`${rel}: N720 already present`);
  const anchor = '      }\r\n    ],\r\n    "calibration": {';
  if (s.split(anchor).length !== 2) fails.push(`${rel}: end of calibration_rulings not found once`);
  if (r && !fails.length) {
    const lines = ['      {', '        "id": "N720",'];
    for (const k of ['title', 'binds', 'ruling', 'guard']) lines.push(`        "${k}": ${JSON.stringify(r[k])},`);
    lines.push(`        "ruled_by": ${JSON.stringify('Judge, 7st-touch, ' + DATE)}`, '      }');
    s = s.replace(anchor, () => '      },\r\n' + lines.join('\r\n') + '\r\n    ],\r\n    "calibration": {');
    const after = JSON.parse(s)._meta.calibration_rulings;
    if (after.length !== rules.length + 1 || after.at(-1).id !== 'N720') fails.push(`${rel}: N720 not appended`);
    writes.set(rel, s);
  }
}

if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
for (const [rel, s] of writes) if (/(?<!\r)\n/.test(s)) { console.error('FAIL a line without CRLF in ' + rel); process.exit(1); }
if (!DRY) for (const [rel, s] of writes) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log(say.join('\n'));
console.log(`${DRY ? 'DRY ' : ''}${writes.size} files: ${[...writes.keys()].join(', ')}`);
