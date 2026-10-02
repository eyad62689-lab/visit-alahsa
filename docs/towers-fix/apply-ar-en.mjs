// Pluralise the Qasr Ibrahim "mosque, garrison and tower" formula in ar/en (5 sites each).
import fs from 'node:fs';
const root = 'C:/Users/truyr/node-store/va-wt/p4/src/';
const ar = ['content/attractions/qasr-ibrahim.md', 'content/blog/24-hours-ar.md', 'content/blog/48-hours-ar.md', 'content/blog/worth-visiting-ar.md', 'i18n/ui.ts'];
const en = ['content/attractions/qasr-ibrahim.md', 'content/blog/24-hours-en.md', 'content/blog/48-hours-en.md', 'content/blog/worth-visiting-en.md', 'i18n/ui.ts'];
const rules = [
  { files: ar, from: 'المسجد والثكنة والبرج', to: 'المسجد والثكنات والأبراج' },
  { files: en, from: 'mosque, garrison and tower', to: 'mosque, barracks and towers' },
];
let total = 0;
for (const { files, from, to } of rules) {
  for (const f of files) {
    const p = root + f;
    const t = fs.readFileSync(p, 'utf8');
    const n = t.split(from).length - 1;
    if (n !== 1) throw new Error(`${f}: expected 1 of «${from}», found ${n}`);
    fs.writeFileSync(p, t.replace(from, to));
    total++;
  }
}
console.log('replaced', total);
