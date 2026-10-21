// يسجّل مخرج دفعة touch-click في ذاكرة الخطوط الأربعة (de · zh · ru · ur)، بعد apply.mjs:
//   - tm: لكل موضع (تغيّر نصه أو بقي)، الزوج الحيّ الذي يحمل الإنجليزية السابقة ونص اللغة المنشور يوسم superseded،
//     ويُضاف زوج بالإنجليزية الجديدة («click or tap») والنص المعتمد — فالموضع الباقي يتغيّر مصدره الإنجليزي وحده.
//     موضعٌ لا زوج حيّاً له يُضاف زوجه الجديد ويُذكر في المخرج.
//   - scores.csv: سطر لكل لغة من 07.json.
//   - الأوردية: حكم N727 من 07.json إن وُجد، بعد آخر حكم.
// كل عملية تتحقق مما تجده قبل التغيير، وأي عدم تطابق يُخفق قبل كتابة أي ملف.
//   node docs/touch-click/finish-glossary.mjs <root> [--dry]
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
const load = (rel) => {
  const raw = rd(rel), o = JSON.parse(raw);
  if (crlfJson(o) !== raw) fails.push(`${rel}: not a CRLF JSON.stringify(…, 2) file`);
  return o;
};

for (const lg of ['de', 'zh', 'ru', 'ur']) {
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions;
  const j = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  const pack = JSON.parse(rd(`${lg}-translation/output/touch-click/pack.json`)).positions;
  if (j.decision !== 'APPROVE' || !(j.score >= 90)) fails.push(`${lg}: 07 is not an approval ≥ 90`);
  const TM = `${lg}-translation/memory/tm.json`;
  const tm = load(TM);
  let sup = 0, add = 0;
  const orphan = [];
  for (const k of pack) {
    const pos = fin.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current) { fails.push(`${k.id}: final.json does not match the pack`); continue; }
    const old = tm.pairs.filter((p) => p.status !== 'superseded' && p[lg] === k.current && p.en === k.en_before);
    if (old.length > 1) fails.push(`${TM}: ${old.length} live pairs for ${k.id}`);
    for (const p of old) { p.status = 'superseded'; p.superseded_on = DATE; sup++; }
    if (!old.length) orphan.push(k.id);
    const pair = { en: k.en_after, [lg]: pos.proposed, page: old[0]?.page ?? k.role.match(/\/[a-z]{2}\/[a-z-]+\//)?.[0] ?? 'ui', field: old[0]?.field ?? k.field, date: DATE,
      note: pos.proposed === pos.current ? 'touch-click (English source now "click or tap"; this verb already fits both, kept)' : 'touch-click (owner: a verb for touch and click)' };
    tm.pairs.push(pair); add++;
  }
  writes.set(TM, crlfJson(tm));
  const SC = `${lg}-translation/memory/scores.csv`;
  const sc = rd(SC);
  if (!sc.endsWith('\r\n')) fails.push(`${SC}: does not end in CRLF`);
  const axes = Object.entries(j.breakdown ?? {}).filter(([x]) => x !== 'total').slice(0, 5).map(([, v]) => (typeof v === 'object' ? v.points : v)).join('/');
  const edits = (j.judge_edits ?? []).length;
  const changed = fin.filter((p) => p.proposed !== p.current).map((p) => p.id.slice(lg.length + 1));
  writes.set(SC, sc + [csvq(`touch-click (${lg}): ${pack.length} positions — owner decision 2026-10-21: the remaining "tap" strings fit touch and click`), DATE, 1, j.score,
    csvq(`APPROVE (${axes}; ${edits} judge edit${edits === 1 ? '' : 's'}; changed: ${changed.join(', ') || 'none'}; blind reader 0 serious; TM ${sup} superseded, ${add} added)`)].join(',') + '\r\n');
  say.push(`${lg}: tm ${sup} superseded, ${add} added${orphan.length ? ' (no live pair before: ' + orphan.join(', ') + ')' : ''}`);
}

// the Urdu ruling N727, if the judge gave one
{
  const r = (JSON.parse(readFileSync(`${HERE}/out/ur/07.json`, 'utf8')).new_rulings ?? []).find((x) => x.id === 'N727');
  if (r) {
    const TB = 'ur-translation/glossary/termbase.json';
    const tb = load(TB);
    const rules = tb._meta.calibration_rulings;
    if (rules.some((x) => x.id === 'N727')) fails.push(`${TB}: N727 already present`);
    const e = { id: 'N727', title: r.title, binds: r.binds, ruling: r.ruling };
    if (r.guard) e.guard = r.guard;
    e.ruled_by = `Judge, touch-click, ${DATE}`;
    rules.push(e);
    writes.set(TB, crlfJson(tb));
    say.push('ur: ruling N727');
  }
}

if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
if (!DRY) for (const [rel, s] of writes) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log(say.join('\n'));
console.log(`${DRY ? 'DRY ' : ''}${writes.size} files: ${[...writes.keys()].join(', ')}`);
