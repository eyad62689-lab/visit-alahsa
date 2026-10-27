// المرحلة الإنجليزية لدفعة gulf-unify-1027 (إياد 2026-10-27: «نعم، حسب السياق»): كل «Gulf» مجرّد في نصوص الإنجليزية
// يصير «Arabian Gulf» بالصياغة التي يستقيم بها السياق. «in the Gulf» بمعنى الإقليم تصير «in the Arabian Gulf region» لا
// «in the Arabian Gulf» (تُقرأ «داخل البحر»، ويحظرها C31 في صفحة الأصفر). اسم مجلس التعاون (GCC) لا يُمسّ.
// لكل استبدال عدد متوقَّع في ملفه، ولا يُكتب شيء إن خالف عددٌ.
//   node docs/gulf-unify-1027/apply-en.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';

const R = process.argv[2];
if (!R) { console.error('usage: apply-en.mjs <root> [--dry]'); process.exit(2); }
const DRY = process.argv.includes('--dry');
const A = 'src/content/attractions/', B = 'src/content/blog/', D = 'src/data/';
// [الملف، من، إلى، العدد المتوقَّع]
const EDITS = [
  [A + 'al-uqair.md', 'the blue of the Gulf', 'the blue of the Arabian Gulf', 1],
  [A + 'al-uqair.md', 'the clear blue of the Gulf', 'the clear blue of the Arabian Gulf', 1],
  // الذكر الثاني في الجملة التالية لـ«Arabian Gulf coast» يصير «sea» (الإجابة محدودة بـ45 كلمة، والسياق يحدّد البحر)
  [A + 'al-uqair.md', 'the clear blue Gulf', 'the clear blue sea', 2],
  [A + 'al-uqair.md', 'the waters of the Gulf', 'the waters of the Arabian Gulf', 1],
  [A + 'asfar.md', 'largest bodies of water in the Gulf region', 'largest bodies of water in the region of the Arabian Gulf', 1],
  [A + 'asfar.md', "among the Gulf region's largest bodies of water", "among the Arabian Gulf region's largest bodies of water", 2],
  [A + 'hubaish.md', '(timber once imported to the Gulf)', '(timber once imported to the Arabian Gulf)', 1],
  [A + 'qasr-ibrahim.md', '(timber once imported to the Gulf)', '(timber once imported to the Arabian Gulf)', 1],
  [A + 'qasr-ibrahim.md', 'in the traditional Gulf manner', 'in the traditional manner of the Arabian Gulf', 1],
  [A + 'qaisariyah.md', 'storied souqs in the Gulf', 'storied souqs in the Arabian Gulf region', 2],
  [A + 'qaisariyah.md', 'among the Gulf’s oldest souqs', 'among the Arabian Gulf’s oldest souqs', 2] // الإجابة محدودة بـ45 كلمة,
  [A + 'salwa-beach.md', 'among the finest on the Gulf', 'among the finest on the Arabian Gulf', 1],
  [A + 'uqair-beach.md', "one of the Gulf's oldest summer destinations", "one of the Arabian Gulf's oldest summer destinations", 1],
  [A + 'uqair-beach.md', 'oldest summer destinations on the Gulf', 'oldest summer destinations on the Arabian Gulf', 2],
  [A + 'uqair-castle.md', 'the Gulf coast of eastern Al-Ahsa', 'the Arabian Gulf coast of eastern Al-Ahsa', 1],
  [A + 'uqair-mosque.md', 'the Gulf coast of eastern Al-Ahsa', 'the Arabian Gulf coast of eastern Al-Ahsa', 1],
  [B + '48-hours-en.md', 'on the Gulf coast of eastern Al-Ahsa', 'on the Arabian Gulf coast of eastern Al-Ahsa', 1],
  [B + '48-hours-en.md', 'the blue of the Gulf', 'the blue of the Arabian Gulf', 1],
  [B + 'hasawi-lomi-en.md', 'Hasawi and Gulf cooking', 'Hasawi and Arabian Gulf cooking', 2],
  [B + 'hasawi-lomi-history-en.md', 'reached the Gulf coast', 'reached the Arabian Gulf coast', 1],
  [B + 'hasawi-lomi-history-en.md', 'a general Gulf name', 'a general name across the Arabian Gulf', 1],
  [B + 'hasawi-lomi-history-en.md', 'its arrival in the Gulf', 'its arrival in the Arabian Gulf region', 1],
  [B + 'worth-visiting-en.md', 'on the Gulf coast', 'on the Arabian Gulf coast', 1],
  [B + 'worth-visiting-en.md', 'the blue of the Gulf', 'the blue of the Arabian Gulf', 1],
  ['src/content/dining/sinyar.md', 'the maritime heritage of the Gulf', 'the maritime heritage of the Arabian Gulf', 1],
  [D + 'events.ts', 'in the Arab Gulf states', 'in the Arabian Gulf states', 1],
  [D + 'events.ts', 'Hasawi and Gulf cooking', 'Hasawi and Arabian Gulf cooking', 1],
  [D + 'home-chapters.ts', "en: 'Three days ending on the Gulf coast'", "en: 'Three days ending on the Arabian Gulf coast'", 1],
  [D + 'stores-directory.en.json', 'Saudi Arabia and the Gulf states', 'Saudi Arabia and the Arabian Gulf states', 4],
  [D + 'stores-directory.en.json', 'ship to the Gulf states?', 'ship to the Arabian Gulf states?', 1],
  [D + 'stores-directory.en.json', 'all the Arab Gulf states', 'all the Arabian Gulf states', 1],
  [D + 'stores-directory.en.json', 'the Gulf economic agreement', 'the Arabian Gulf economic agreement', 1],
  [D + 'stores-directory.en.json', 'Saudi and Gulf cooking', 'Saudi and Arabian Gulf cooking', 1],
  [D + 'trails.json', 'largest bodies of water in the Gulf region', 'largest bodies of water in the region of the Arabian Gulf', 1],
  ['src/i18n/ui.ts', 'a port on the Gulf', 'a port on the Arabian Gulf', 2],
  ['src/i18n/ui.ts', 'the blue of the Gulf.', 'the blue of the Arabian Gulf.', 1],
];
const files = new Map();
let fails = 0, n = 0;
for (const [rel, from, to, want] of EDITS) {
  if (!files.has(rel)) files.set(rel, readFileSync(`${R}/${rel}`, 'utf8'));
  const s = files.get(rel);
  const got = s.split(from).length - 1;
  if (got !== want) { console.error(`FAIL ${rel}: «${from}» ×${got}, expected ×${want}`); fails++; continue; }
  files.set(rel, s.split(from).join(to));
  n += want;
}
if (fails) { console.error(`FAIL ${fails} - nothing written`); process.exit(1); }
if (!DRY) for (const [rel, s] of files) writeFileSync(`${R}/${rel}`, s, 'utf8');
console.log(`${DRY ? 'DRY ' : ''}${n} replacements in ${files.size} files`);
