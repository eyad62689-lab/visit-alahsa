// يقيس نطاق تصحيح تعريف «الجميد» في المستودع كلِّه.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const REPO = 'C:/Users/truyr/node-store/va-wt/de-plan';
const ROOTS = ['src'];
const RE = /jameed|Jameed|جميد|джамид|Джамид|贾米德|Dschamid/i;

const files = [];
const walk = (d) => {
  for (const n of readdirSync(d)) {
    const p = join(d, n);
    if (statSync(p).isDirectory()) { if (n !== 'node_modules') walk(p); }
    else if (/\.(md|ts|astro|json)$/.test(n)) files.push(p);
  }
};
for (const r of ROOTS) walk(join(REPO, r));

let total = 0;
const byFile = [];
for (const f of files) {
  const txt = readFileSync(f, 'utf8');
  if (!RE.test(txt)) continue;
  const lines = txt.split(/\r?\n/);
  const hits = [];
  lines.forEach((l, i) => { if (RE.test(l)) hits.push({ n: i + 1, l }); });
  if (hits.length) { byFile.push({ f: relative(REPO, f).replace(/\\/g, '/'), hits }); total += hits.length; }
}

console.log('ملفات فيها ذكرٌ للجميد:', byFile.length, '| مواضع:', total, '\n');

// الكلمات الدالّة على التعريف الخاطئ (الثمرة) مقابل الصحيح (العصير)
const FRUIT = /sonnengetrocknete Limette|sun-dried lime\b|اللومي المشمّس|اللومي المشمس|晒制|сушёный лайм|сушеный лайм|высушенный на солнце лайм/i;
const JUICE = /Lomi-Saft|lime juice|lomi juice|عصير اللومي|果汁|сок/i;

for (const { f, hits } of byFile) {
  console.log('=== ' + f);
  for (const h of hits) {
    const fruit = FRUIT.test(h.l), juice = JUICE.test(h.l);
    const tag = fruit && !juice ? '  [الثمرة ← يحتاج تصحيحاً]' : juice ? '  [العصير ← صحيح]' : '  [ذكرٌ بلا تعريف]';
    console.log('  ' + String(h.n).padStart(4) + tag);
    console.log('        ' + h.l.trim().slice(0, 230));
  }
  console.log();
}
