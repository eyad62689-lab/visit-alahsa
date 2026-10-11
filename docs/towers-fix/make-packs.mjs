// Builds de.json / ru.json: each site = file, line, current paragraph, en source, ar arbiter.
import fs from 'node:fs';
const root = 'C:/Users/truyr/node-store/va-wt/p4/';
const out = 'C:/Users/truyr/AppData/Local/Temp/claude/C--Users-truyr-OneDrive-Documents-Claude-Projects-Visit-Alahsa/db8f8a5c-7b93-4039-bab5-f503c9485f73/scratchpad/towers/';
const read = (f) => fs.readFileSync(root + f, 'utf8').split(/\r?\n/);
const lineOf = (f, needle, nth = 0) => {
  const ls = read(f);
  const hits = ls.map((l, i) => [l, i]).filter(([l]) => l.includes(needle));
  if (!hits[nth]) throw new Error(`${f}: «${needle}» not found`);
  return { line: hits[nth][1] + 1, text: hits[nth][0] };
};
const site = (role, lang, f, needle, enF, enNeedle, arF, arNeedle) => {
  const cur = lineOf(f, needle);
  return { role, file: f, line: cur.line, current: cur.text, en_source: lineOf(enF, enNeedle).text, ar_arbiter: lineOf(arF, arNeedle).text };
};
const A = 'src/content/attractions/qasr-ibrahim.md', U = 'src/i18n/ui.ts', B = (b, l) => `src/content/blog/${b}-${l}.md`;
const AR = 'المسجد والثكنات والأبراج', EN = 'mosque, barracks and towers';
const packs = {
  de: [
    site('attraction summary (meta description + card)', 'de', A, 'summary_de:', A, 'summary_en:', A, 'summary:'),
    site('blog 24-hours, Qasr Ibrahim paragraph', 'de', B('24-hours', 'de'), 'Kaserne und Turm', B('24-hours', 'en'), EN, B('24-hours', 'ar'), AR),
    site('blog 48-hours, Qasr Ibrahim paragraph', 'de', B('48-hours', 'de'), 'Kaserne und Turm', B('48-hours', 'en'), EN, B('48-hours', 'ar'), AR),
    site('blog worth-visiting, souq paragraph', 'de', B('worth-visiting', 'de'), 'Kaserne und Turm', B('worth-visiting', 'en'), EN, B('worth-visiting', 'ar'), AR),
    site('home page route step 1 (ui.ts home.route.s1.d)', 'de', U, 'Kaserne und Turm', U, EN, U, AR),
  ],
  ru: [
    site('attraction summary (meta description + card)', 'ru', A, 'summary_ru:', A, 'summary_en:', A, 'summary:'),
    site('blog 24-hours, Qasr Ibrahim paragraph', 'ru', B('24-hours', 'ru'), 'казармы и башню', B('24-hours', 'en'), EN, B('24-hours', 'ar'), AR),
    site('blog 48-hours, Qasr Ibrahim paragraph', 'ru', B('48-hours', 'ru'), 'казармы и башня', B('48-hours', 'en'), EN, B('48-hours', 'ar'), AR),
    site('blog worth-visiting, souq paragraph', 'ru', B('worth-visiting', 'ru'), 'казармы и башню', B('worth-visiting', 'en'), EN, B('worth-visiting', 'ar'), AR),
    site('home page route step 1 (ui.ts home.route.s1.d)', 'ru', U, 'казармы и башню', U, EN, U, AR),
  ],
};
for (const [l, p] of Object.entries(packs)) fs.writeFileSync(out + l + '.json', JSON.stringify(p, null, 1));
console.log(Object.fromEntries(Object.entries(packs).map(([l, p]) => [l, p.map((s) => s.file + ':' + s.line)])));
