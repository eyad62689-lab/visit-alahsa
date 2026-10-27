// تعديلات المراجع الإنجليزي المستقل على المرحلة الإنجليزية (gulf-unify-1027)، والحارسان المثبّتان على الشرح.
import fs from 'node:fs';
const R = process.argv[2];
const files = new Map();
let fails = 0;
const rep = (rel, from, to, want) => {
  if (!files.has(rel)) files.set(rel, fs.readFileSync(`${R}/${rel}`, 'utf8'));
  const s = files.get(rel);
  const got = s.split(from).length - 1;
  if (got !== want) { console.error(`FAIL ${rel}: «${from}» ×${got}, expected ×${want}`); fails++; return; }
  files.set(rel, s.split(from).join(to));
};
const A = 'src/content/attractions/';
// 1. الذكر الثاني في جملة تحمل «Arabian Gulf coast»
rep(A + 'uqair-beach.md', 'oldest summer destinations on the Arabian Gulf', 'oldest summer destinations on this coast', 2);
// 2–3. البحر لا يُستورد إليه: الإقليم، وشرح الشندل واحد في الصفحتين
rep(A + 'qasr-ibrahim.md', 'in the traditional manner of the Arabian Gulf:', 'in the traditional manner of the Arabian Gulf region:', 1);
rep(A + 'qasr-ibrahim.md', '(timber once imported to the Arabian Gulf)', '(timber once imported to the Arabian Gulf region)', 1);
rep(A + 'hubaish.md', '(timber once imported to the Arabian Gulf)', '(timber once imported to the Arabian Gulf region)', 1);
// 4. «across the Arabian Gulf» تُقرأ عبر الماء
rep('src/content/blog/hasawi-lomi-history-en.md', 'a general name across the Arabian Gulf,', 'a general name across the Arabian Gulf region,', 1);
// 5. الذكر الثاني في الجملة نفسها
rep('src/content/blog/48-hours-en.md', 'where desert sands meet the blue of the Arabian Gulf.', 'where desert sands meet the blue of the sea.', 1);
// 6. الاتفاقية تعود إلى الدول المذكورة قبلها
rep('src/data/stores-directory.en.json', 'benefit from the Arabian Gulf economic agreement', "benefit from the states' economic agreement", 1);
// الحارسان: الشرح وتمهيد القصر بالصيغة الجديدة
rep('tools/check-hubaish-chandal.mjs', 'once\\s+imported\\s+to\\s+the\\s+Arabian\\s+Gulf\\)/i', 'once\\s+imported\\s+to\\s+the\\s+Arabian\\s+Gulf\\s+region\\)/i', 1);
rep('tools/check-ibrahim-materials-intro.mjs', 'traditional\\s+manner\\s+of\\s+the\\s+Arabian\\s+Gulf[', 'traditional\\s+manner\\s+of\\s+the\\s+Arabian\\s+Gulf\\s+region[', 1);
rep('tools/check-ibrahim-materials-intro.mjs', 'once\\s+imported\\s+to\\s+the\\s+Arabian\\s+Gulf\\)/i', 'once\\s+imported\\s+to\\s+the\\s+Arabian\\s+Gulf\\s+region\\)/i', 1);
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
for (const [rel, s] of files) fs.writeFileSync(`${R}/${rel}`, s, 'utf8');
console.log(`ok ${files.size} files`);
