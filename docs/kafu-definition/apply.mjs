// يكتب مخرج الخطوط الثلاثة (de · zh · ru) لدفعة kafu-definition في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node docs/kafu-definition/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,current,proposed}]}: يُبحث في كتلة TEXT_<LG> عن السطر «intro: '<current>',»
// بالحرفية المهرَّبة ويُستبدل بالمقترح، ويُخفق قبل أي كتابة إن لم يوجد مرةً واحدةً بالضبط.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
const LANGS = process.argv.slice(3).filter((x) => x !== '--dry');
if (!ROOT || !LANGS.length) { console.error('usage: node apply.mjs <root> de zh ru [--dry]'); process.exit(2); }
const KEY = { de: 'DE', zh: 'ZH', ru: 'RU' };
const FILE = 'src/data/events.ts';
// the backslash first, then the quote (CodeQL js/incomplete-sanitization)
const lit = (s) => "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
let s = readFileSync(ROOT + '/' + FILE, 'utf8');
const EOL = s.includes('\r\n') ? '\r\n' : '\n';
let fails = 0, applied = 0;
for (const lg of LANGS) {
  const p = `${HERE}/out/${lg}/final.json`;
  if (!existsSync(p) || !KEY[lg]) { console.error(`FAIL ${lg}: no ${p}`); fails++; continue; }
  const pos = JSON.parse(readFileSync(p, 'utf8')).positions.find((x) => x.id === lg + '-ev-kafu-intro');
  const pk = JSON.parse(readFileSync(`${ROOT}/${lg}-translation/output/kafu-definition/pack.json`, 'utf8')).positions[0];
  if (!pos || pos.current !== pk.current || !pos.proposed) { console.error(`FAIL ${lg}: final.json does not match the pack`); fails++; continue; }
  if (/[\r\n  ]/.test(pos.proposed)) { console.error(`FAIL ${lg}: line break / NBSP / thin space`); fails++; continue; }
  const head = `const TEXT_${KEY[lg]}: `;
  const a = s.indexOf(head);
  if (a < 0 || s.indexOf(head, a + 1) >= 0) { console.error(`FAIL ${lg}: block ${head} not found once`); fails++; continue; }
  const e = s.indexOf(EOL + '};', a);
  const from = '    intro: ' + lit(pos.current) + ',';
  const block = s.slice(a, e);
  if (block.split(from).length - 1 !== 1) { console.error(`FAIL ${lg}: the current intro line is not in TEXT_${KEY[lg]} exactly once`); fails++; continue; }
  s = s.slice(0, a) + block.replace(from, () => '    intro: ' + lit(pos.proposed) + ',') + s.slice(e);
  applied++; console.log(`  ok ${pos.id}`);
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (EOL === '\r\n' && /(?<!\r)\n/.test(s)) { console.error('FAIL a line without CRLF'); process.exit(1); }
if (!DRY) writeFileSync(ROOT + '/' + FILE, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written`);
