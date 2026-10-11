// يكتب المواضع المعتمدة (out/<lang>/final.json) في المصدر، سطراً بسطر، محافظاً على نهايات الأسطر.
// يُخفق إن لم يطابق `current` سطره المذكور حرفياً، أو ورد في ملفه أكثر من مرة.
//   node docs/towers-fix/apply.mjs <جذر الشجرة>
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
let n = 0;
for (const lg of ['de', 'ru']) {
  const { positions } = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8'));
  for (const p of positions) {
    const f = `${R}/${p.file}`;
    const text = readFileSync(f, 'utf8');
    const EOL = text.includes('\r\n') ? '\r\n' : '\n';
    const lines = text.split(EOL);
    if (lines[p.line - 1] !== p.current) throw new Error(`${lg} ${p.file}:${p.line} لا يطابق current`);
    if (lines.filter((l) => l === p.current).length !== 1) throw new Error(`${lg} ${p.file}: current ليس فريداً`);
    lines[p.line - 1] = p.proposed;
    writeFileSync(f, lines.join(EOL), 'utf8');
    console.log(`✓ ${lg} ${p.file}:${p.line} (${EOL === '\r\n' ? 'CRLF' : 'LF'})`);
    n++;
  }
}
console.log(`كُتب ${n} موضعاً`);
