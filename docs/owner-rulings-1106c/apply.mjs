// يكتب مخرج دفعة owner-rulings-1106c في src/i18n/ui.ts: المقترح (05) أو النهائي (final).
//   node docs/owner-rulings-1106c/apply.mjs <root> <stage: 05|final> <lg…> [--dry]
// tmap.lead: تُستبدل القيمة التي في الشجرة (المنشور، أو مقترح سابق) بالمقترح؛ tmap.howto: يُدرج بعد tmap.lead أو تُستبدل قيمته.
// علامة التنصيص هي علامة السطر نفسه، ولا يجوز أن يحملها المقترح.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { uiLine } from './lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const [ROOT, STAGE] = process.argv.slice(2);
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(4).filter((x) => x !== '--dry');
if (!ROOT || !STAGE || !LANGS.length) { console.error('usage: node apply.mjs <root> <05|final> zh de ru ur tr [--dry]'); process.exit(2); }
const UR_BAD = /[يكةهىأإۃ]/;
const UR_KASRA = /[ِۂ]/;
const F = 'src/i18n/ui.ts';
let s = readFileSync(`${ROOT}/${F}`, 'utf8');
const EOL = s.includes('\r\n') ? '\r\n' : '\n';
let fails = 0, applied = 0, kept = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/${STAGE}.json`;
  if (!existsSync(p)) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const stage = JSON.parse(readFileSync(p, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/owner-rulings-1106c/pack.json`, 'utf8')).positions;
  if (stage.length !== pack.length) { console.error(`FAIL ${lg}: ${stage.length} positions, the pack ${pack.length}`); fails++; continue; }
  for (const k of pack) {
    const pos = stage.find((x) => x.id === k.id);
    if (!pos || pos.current !== k.current || typeof pos.proposed !== 'string' || !pos.proposed) { console.error(`FAIL ${k.id}: ${STAGE}.json does not match the pack`); fails++; continue; }
    if (/[\r\n   \\]/.test(pos.proposed)) { console.error(`FAIL ${k.id}: line break / NBSP / backslash`); fails++; continue; }
    if (lg === 'ur' && (UR_BAD.test(pos.proposed) || UR_KASRA.test(pos.proposed))) { console.error(`FAIL ${k.id}: Arabic letterform or kasra in Urdu`); fails++; continue; }
    if (k.kind === 'ui' && pos.proposed !== k.target) { console.error(`FAIL ${k.id}: the lead must be its published head, byte-identical`); fails++; continue; }
    const hit = uiLine(s, lg, k.key, k.kind === 'ui-new');
    if (hit && hit.value === pos.proposed) { kept++; console.log(`  kept ${k.id}`); continue; }
    const q = hit ? hit.q : uiLine(s, lg, k.anchor).q;
    if (pos.proposed.includes(q)) { console.error(`FAIL ${k.id}: the proposal contains the quote mark ${q}`); fails++; continue; }
    const next = `    '${k.key}': ${q}${pos.proposed}${q},`;
    if (hit) {
      const block = s.slice(hit.span[0], hit.span[1]);
      s = s.slice(0, hit.span[0]) + block.replace(hit.line, () => next) + s.slice(hit.span[1]);
    } else {
      const a = uiLine(s, lg, k.anchor);
      const block = s.slice(a.span[0], a.span[1]);
      s = s.slice(0, a.span[0]) + block.replace(a.line, () => a.line + EOL + next) + s.slice(a.span[1]);
    }
    applied++; console.log(`  ok ${k.id}`);
  }
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (!DRY) writeFileSync(`${ROOT}/${F}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} applied, ${kept} kept`);
