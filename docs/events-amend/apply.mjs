// يكتب مخرج الخطوط الثلاثة (de · zh · ru) لدفعة events-amend في المستودع. يُشغَّل بعد اعتماد الحاكم فقط.
//   node docs/events-amend/apply.mjs <root> <lg…> [--dry]
// يقرأ out/<lg>/final.json ‏{positions:[{id,current,proposed}]} — موضعٌ واحد جديد (current = ''): يُدرج
// السطر «intro: '…',» بعد سطر acts في مدخل 'kafu-nights' من كتلة TEXT_<LG>، ويُخفق قبل أي كتابة إن لم يجد
// المدخل مرةً واحدةً بالضبط أو وجد فيه intro.
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
  const fin = JSON.parse(readFileSync(p, 'utf8'));
  const pos = fin.positions.find((x) => x.id === lg + '-ev-kafu-intro');
  if (!pos || pos.current !== '' || !pos.proposed) { console.error(`FAIL ${lg}: no new intro in final.json`); fails++; continue; }
  if (/[\r\n  ]/.test(pos.proposed)) { console.error(`FAIL ${lg}: line break / NBSP / thin space`); fails++; continue; }
  const head = `const TEXT_${KEY[lg]}: `;
  const a = s.indexOf(head);
  if (a < 0 || s.indexOf(head, a + 1) >= 0) { console.error(`FAIL ${lg}: block ${head} not found once`); fails++; continue; }
  const e = s.indexOf(EOL + '};', a);
  const block = s.slice(a, e);
  const entry = EOL + "  'kafu-nights': {" + EOL;
  const k = block.indexOf(entry);
  if (k < 0 || block.indexOf(entry, k + 1) >= 0) { console.error(`FAIL ${lg}: kafu-nights entry not found once`); fails++; continue; }
  const close = block.indexOf(EOL + '  },', k + entry.length);
  const body = block.slice(k, close);
  if (/\n\s*intro:/.test(body)) { console.error(`FAIL ${lg}: kafu-nights already has an intro`); fails++; continue; }
  const actsAt = body.lastIndexOf(EOL + '    acts: [');
  if (actsAt < 0) { console.error(`FAIL ${lg}: no acts line`); fails++; continue; }
  const lineEnd = body.indexOf(EOL, actsAt + EOL.length);
  const at = a + k + (lineEnd < 0 ? body.length : lineEnd);
  s = s.slice(0, at) + EOL + '    intro: ' + lit(pos.proposed) + ',' + s.slice(at);
  applied++; console.log(`  ok ${pos.id}`);
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (EOL === '\r\n' && /(?<!\r)\n/.test(s)) { console.error('FAIL a line without CRLF'); process.exit(1); }
if (!DRY) writeFileSync(ROOT + '/' + FILE, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${applied} written`);
