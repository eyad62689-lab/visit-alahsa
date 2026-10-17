// يسجّل مخرج دفعة palm-location في ذاكرة الخطوط الأربعة (de · zh · ru · ur): زوج ترجمة لكل لغة (المكان الإنجليزي
// الجديد ← final.json)، وسطر الدرجات من 07.json، وحكم الأوردية الجديد N407 من 07.json في _meta.calibration_rulings
// بعد N406. كل عملية تتحقق مما تجده قبل التغيير، وأي عدم تطابق يُخفق قبل كتابة أي ملف.
//   node docs/palm-location/finish-glossary.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: finish-glossary.mjs <root> [--dry]'); process.exit(2); }
const fails = [];
const writes = new Map();
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU', ur: 'UR' };
const DATE = '2026-10-17';
const rd = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const csvq = (s) => '"' + String(s).replace(/"/g, '""') + '"';

for (const lg of Object.keys(KEY)) {
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions[0];
  const j = JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
  const pk = JSON.parse(rd(`${lg}-translation/output/palm-location/pack.json`)).positions[0];
  if (j.decision !== 'APPROVE' || !(j.score >= 90)) fails.push(`${lg}: 07 is not an approval ≥ 90`);
  if (fin.current !== pk.current) fails.push(`${lg}: final.json current differs from the pack`);
  if (!rd('src/data/events.ts').includes(`place: '${fin.proposed}',`)) fails.push(`${lg}: the final place is not in events.ts (run apply.mjs first)`);
  // TM pair
  const tmRel = `${lg}-translation/memory/tm.json`;
  const raw = rd(tmRel);
  const tm = JSON.parse(raw);
  if (JSON.stringify(tm, null, 2).split('\n').join('\r\n') + '\r\n' !== raw) fails.push(`${tmRel}: not a CRLF JSON.stringify(…, 2) file`);
  if (tm.pairs.some((p) => p.en === pk.en_after)) fails.push(`${tmRel}: a pair for «${pk.en_after}» already exists`);
  const pair = lg === 'de'
    ? { en: pk.en_after, de: fin.proposed, date: DATE, note: 'palm-location' }
    : { en: pk.en_after, [lg]: fin.proposed, page: lg === 'ur' ? 'ui' : 'events/palm-village', field: lg === 'ur' ? 'ev.palm-village.place' : `TEXT_${KEY[lg]}['palm-village'].place`, date: DATE };
  tm.pairs.push(pair);
  writes.set(tmRel, JSON.stringify(tm, null, 2).split('\n').join('\r\n') + '\r\n');
  // scores row
  const scRel = `${lg}-translation/memory/scores.csv`;
  const sc = rd(scRel);
  if (!sc.endsWith('\r\n')) fails.push(`${scRel}: does not end in CRLF`);
  const b = j.breakdown ?? {};
  // axis names differ per line; the five axes in order, numbers or {points}
  const axes = Object.entries(b).filter(([k]) => k !== 'total').slice(0, 5).map(([, v]) => (typeof v === 'object' ? v.points : v)).join('/');
  const edits = (j.judge_edits ?? []).length;
  writes.set(scRel, sc + [csvq(`events (${lg}): palm-location — 1 position (palm-village place: «${pk.current}» → «${fin.proposed}», owner decision ${DATE})`), DATE, 1, j.score,
    csvq(`APPROVE (${axes}; ${edits} judge edit${edits === 1 ? '' : 's'}; blind reader 0 serious; the common minor point — a district is not a venue, the town is not placed in Al-Ahsa — is source-level, for the owner)`)].join(',') + '\r\n');
}

// the Urdu ruling N407, after N406
{
  const rel = 'ur-translation/glossary/termbase.json';
  let s = rd(rel);
  const r = JSON.parse(readFileSync(`${HERE}/out/ur/07.json`, 'utf8')).new_rulings?.find((x) => x.id === 'N407');
  if (!r) fails.push('ur 07.json: no N407');
  const o = JSON.parse(s);
  const rules = o._meta.calibration_rulings;
  if (rules.at(-1).id !== 'N406' || rules.some((x) => x.id === 'N407')) fails.push(`${rel}: the last ruling is ${rules.at(-1).id}, expected N406 (and no N407)`);
  const EOL = '\r\n';
  const anchor = '      }' + EOL + '    ],' + EOL + '    "calibration": {';
  if (s.split(anchor).length !== 2) fails.push(`${rel}: end of calibration_rulings not found once`);
  if (r && !fails.length) {
    const lines = ['      {', `        "id": "N407",`];
    for (const k of ['title', 'binds', 'ruling', 'guard']) lines.push(`        "${k}": ${JSON.stringify(r[k])},`);
    lines.push(`        "ruled_by": "Judge, palm-location (round 4), ${DATE}"`, '      }');
    s = s.replace(anchor, '      },' + EOL + lines.join(EOL) + EOL + '    ],' + EOL + '    "calibration": {');
    const o2 = JSON.parse(s);
    if (o2._meta.calibration_rulings.length !== rules.length + 1 || o2._meta.calibration_rulings.at(-1).id !== 'N407') fails.push(`${rel}: N407 not appended`);
    writes.set(rel, s);
  }
}

if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
for (const [rel, s] of writes) { if (/(?<!\r)\n/.test(s)) { console.error('FAIL a line without CRLF in ' + rel); process.exit(1); } }
if (!DRY) for (const [rel, s] of writes) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${writes.size} files: ${[...writes.keys()].join(', ')}`);
