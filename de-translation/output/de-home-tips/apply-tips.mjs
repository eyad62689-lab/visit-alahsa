// node apply-tips.mjs <REPO> <BATCH_DIR> <file.json> — يكتب نصوص أجزاء فقرات المرافقين (tip.<id>) بلغة الدفعة
// في COMPANION_TIPS (home-chapters.ts): السطر «<lang>: '…',» داخل كتلة text للجزء ذي المعرّف نفسه. قابل للإعادة.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const pack = JSON.parse(fs.readFileSync(path.join(DIR, 'pack.json'), 'utf8'));
const L = pack.lang ?? (path.basename(DIR).startsWith('zh-') ? 'zh' : null);
if (!L) throw new Error('لا لغة في pack.json');
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
// قيمة TS بين علامتين مفردتين: الشرطة العكسية أولاً ثم التنصيص
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const p = path.join(REPO, 'src/data/home-chapters.ts');
const raw = fs.readFileSync(p, 'utf8');
const crlf = raw.includes('\r\n');
let s = raw.replace(/\r\n/g, '\n');
for (const [key, val] of Object.entries(Z)) {
  const id = key.replace(/^tip\./, '');
  const head = `      id: '${id}',\n`;
  const at = s.indexOf(head);
  if (at < 0 || s.indexOf(head, at + 1) >= 0) throw new Error(`معرّف غير فريد أو مفقود: ${id}`);
  const textAt = s.indexOf('      text: {\n', at);
  const end = s.indexOf('\n      },', textAt);
  const block = s.slice(textAt, end);
  const line = new RegExp(`\\n        ${L}: '(?:[^'\\\\]|\\\\.)*',`);
  if (!line.test(block)) throw new Error(`لا سطر ${L} في ${id}`);
  s = s.slice(0, textAt) + block.replace(line, () => `\n        ${L}: ${q(val)},`) + s.slice(end);
}
fs.writeFileSync(p, crlf ? s.replace(/\n/g, '\r\n') : s);
console.log('applied', L, Object.keys(Z).join(' '));
