// يكتب مخرج الخطوط الأربعة (zh · de · ru · ur) لدفعة palm-village-amend في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node docs/palm-village-amend/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,current,proposed}]}: لكل موضع (season/time/span) يستبدل قيمة الحقل
// في مدخل 'palm-village' من كتلة TEXT_<LG>، ويُخفق قبل أي كتابة إن لم يجد القيمة الحالية مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: node apply.mjs <root> zh de ru ur [--dry]'); process.exit(2); }
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU', ur: 'UR' };
const FILE = 'src/data/events.ts';
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const lit = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
let s = readFileSync(ROOT + '/' + FILE, 'utf8');
const EOL = s.includes('\r\n') ? '\r\n' : '\n';
let fails = 0, applied = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p) || !KEY[lg]) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const fin = JSON.parse(readFileSync(p, 'utf8'));
  const head = `const TEXT_${KEY[lg]}: `;
  const a = s.indexOf(head);
  if (a < 0 || s.indexOf(head, a + 1) >= 0) { console.error(`FAIL ${lg}: block ${head} not found once`); fails++; continue; }
  const entry = EOL + "  'palm-village': {" + EOL;
  const k = s.indexOf(entry, a);
  const close = s.indexOf(EOL + '  },', k);
  if (k < 0 || close < 0) { console.error(`FAIL ${lg}: palm-village entry not found`); fails++; continue; }
  let body = s.slice(k, close);
  for (const field of ['season', 'time', 'span']) {
    const pos = fin.positions.find((x) => x.id === `${lg}-ev-palm-${field}`);
    if (!pos || !pos.proposed) { console.error(`FAIL ${lg}: no ${field} in final.json`); fails++; continue; }
    if (/[\r\n   ]/.test(pos.proposed)) { console.error(`FAIL ${lg}: ${field} line break / NBSP / thin space`); fails++; continue; }
    const old = `${field}: ${lit(pos.current)}`;
    if (body.split(old).length !== 2) { console.error(`FAIL ${lg}: ${field} current not found once`); fails++; continue; }
    body = body.replace(old, `${field}: ${lit(pos.proposed)}`);
    applied++; console.log(`  ok ${pos.id}`);
  }
  s = s.slice(0, k) + body + s.slice(close);
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (!DRY) writeFileSync(ROOT + '/' + FILE, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written`);
