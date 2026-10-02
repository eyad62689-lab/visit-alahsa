// يكتب المواضع المعتمدة (out/<lang>/final.json) لـ de/ru/zh.
// صفوف practical تحمل حقول اللغات كلها في سطر واحد، فتُدمج حقلاً حقلاً (label_<lg>/value_<lg>) لا سطراً؛
// أسطر FAQ (q_<lg>/a_<lg>) والمدونات (ملف لكل لغة) تُستبدل كاملة بعد مطابقة current.
//   node docs/mosque-visit-fix/apply.mjs <جذر الشجرة>
import { readFileSync, writeFileSync } from 'node:fs';

const R = process.argv[2] || '.';
const HERE = new URL('.', import.meta.url);
const field = (line, key) => line.match(new RegExp(`(?:^|[{,\\s])${key}: "([^"]*)"`))?.[1];
const setField = (line, key, val) => {
  const re = new RegExp(`((?:^|[{,\\s])${key}: ")[^"]*(")`);
  if (!re.test(line)) throw new Error(`الحقل ${key} غائب`);
  return line.replace(re, (_, a, b) => a + val + b);
};

let n = 0;
for (const lg of ['de', 'ru', 'zh']) {
  const { positions } = JSON.parse(readFileSync(new URL(`./out/${lg}/final.json`, HERE), 'utf8'));
  for (const p of positions) {
    const f = `${R}/${p.file}`;
    const text = readFileSync(f, 'utf8');
    const EOL = text.includes('\r\n') ? '\r\n' : '\n';
    const lines = text.split(EOL);
    const L = lines[p.line - 1];
    if (/^ {2}- \{ label:/.test(p.current)) {
      for (const k of [`label_${lg}`, `value_${lg}`]) {
        if (field(L, k) !== field(p.current, k)) throw new Error(`${lg} ${p.file}:${p.line} ${k} لا يطابق current`);
      }
      let out = L;
      for (const k of [`label_${lg}`, `value_${lg}`]) {
        const v = field(p.proposed, k);
        if (v !== undefined) out = setField(out, k, v);
      }
      lines[p.line - 1] = out;
    } else {
      if (L !== p.current) throw new Error(`${lg} ${p.file}:${p.line} لا يطابق current`);
      lines[p.line - 1] = p.proposed;
    }
    writeFileSync(f, lines.join(EOL), 'utf8');
    n++;
  }
  console.log(`✓ ${lg}: ${positions.length}`);
}
console.log(`كُتب ${n} موضعاً`);
