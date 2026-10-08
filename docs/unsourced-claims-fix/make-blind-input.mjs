// يقصّ قسم «فصول الواحة» من dist لكل لغة ويكتبه نصاً خاماً لمدخل القارئ الأعمى
// وللتحقق من أن الدعوى المحذوفة غائبة عن المنشور. يُشغَّل من جذر المستودع بعد البناء.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const PAGES = { ar: 'dist/index.html', en: 'dist/en/index.html', zh: 'dist/zh/index.html' };
const GONE = { ar: 'أول من يقطف', en: 'picks first', zh: '率先开摘' };

// ماسح محرفاً محرفاً — لا تعبير نمطي لتجريد الوسوم
function text(html) {
  let out = '', inTag = false;
  for (const ch of html) {
    if (ch === '<') { inTag = true; out += '\n'; continue; }
    if (ch === '>') { inTag = false; continue; }
    if (!inTag) out += ch;
  }
  return out.split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
}

mkdirSync('docs/unsourced-claims-fix/out', { recursive: true });
let bad = 0;
for (const [lang, file] of Object.entries(PAGES)) {
  const html = readFileSync(file, 'utf8');
  const a = html.indexOf('id="season-now"');
  if (a < 0) { console.error(`${lang}: القسم غير موجود`); bad++; continue; }
  const b = html.indexOf('</section>', a);
  const sec = text(html.slice(html.lastIndexOf('<section', a), b));
  writeFileSync(`docs/unsourced-claims-fix/out/season-${lang}.txt`, sec + '\n');
  const whole = html.includes(GONE[lang]);
  console.log(`${lang}: ${sec.split('\n').length} سطراً · الدعوى ${whole ? 'باقية ✗' : 'غائبة ✓'}`);
  if (whole) bad++;
}
process.exit(bad ? 1 : 0);
