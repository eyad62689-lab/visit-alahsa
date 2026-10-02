// يدمج نتيجة الدفعة في ذاكرة الترجمة وسجل الدرجات للغتين:
// tm.json: الطرف الإنجليزي «garrison and tower» والطرف المفرد يصيران جمعاً حيث وردا.
// scores.csv: سطر لكل لغة. يُخفق إن اختلف عدد الاستبدالات عن المقيس قبل الدمج.
//   node docs/towers-fix/merge-memory.mjs <جذر الشجرة>
import { readFileSync, writeFileSync } from 'node:fs';

const R = process.argv[2] || '.';
const RULES = {
  de: { expect: 5, pairs: [['mosque, garrison and tower', 'mosque, barracks and towers'], ['Moschee, Kaserne und Turm', 'Moschee, Kasernen und Türme']] },
  ru: { expect: 3, pairs: [['mosque, garrison and tower', 'mosque, barracks and towers'], [/казармы и башн[юя](?![а-яё])/gu, 'казармы и башни']] },
};
const ROWS = {
  de: '"towers-plural (de): Qasr Ibrahim triple formula Kaserne und Turm -> Kasernen und Türme at 5 sites (summary_de, 24-hours, 48-hours, worth-visiting, ui home.route.s1.d)",2026-10-02,1,94,"APPROVE (min 94 summary page: Kasernen vs body_de eine Kaserne on the same page, body_de out of scope, raised to Eyad; blind reader: item 50 home card applied by the batch itself; 31 Mauerring, 42, 57 rejected - brief limits change to number)"',
  ru: JSON.parse(readFileSync(new URL('./out/ru/07.json', import.meta.url), 'utf8')).scores_csv_row,
};
for (const [lg, { expect, pairs }] of Object.entries(RULES)) {
  const tmPath = `${R}/${lg}-translation/memory/tm.json`;
  let t = readFileSync(tmPath, 'utf8');
  for (const [from, to] of pairs) {
    const n = typeof from === 'string' ? t.split(from).length - 1 : (t.match(from) || []).length;
    if (n !== expect) throw new Error(`${lg} tm: «${from}» ورد ${n} والمتوقع ${expect}`);
    t = typeof from === 'string' ? t.split(from).join(to) : t.replace(from, to);
  }
  JSON.parse(t);
  writeFileSync(tmPath, t, 'utf8');
  const csvPath = `${R}/${lg}-translation/memory/scores.csv`;
  const csv = readFileSync(csvPath, 'utf8');
  const EOL = csv.includes('\r\n') ? '\r\n' : '\n';
  writeFileSync(csvPath, csv.replace(/(\r?\n)?$/, EOL) + ROWS[lg] + EOL, 'utf8');
  console.log(`✓ ${lg}: tm ${expect}×2 استبدالاً، وسطر في scores.csv`);
}
