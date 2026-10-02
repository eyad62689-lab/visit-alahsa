// جواثا (قرار إياد 2026-10-02): يُحذف وقت المسجد ويبقى وقت المنتزه المحيط.
// - hoursSpec (المسجد 24 ساعة في JSON-LD) يُحذف.
// - bestTime بلغاته الخمس يُحذف (حذف حقول لا ترجمة).
// - صف «المواعيد» يصير «مواعيد المنتزه المحيط» (ar/en هنا؛ de/ru/zh بخطوطها).
// - سؤال «ما مواعيد زيارة مسجد جواثا؟» يصير سؤالاً عن مواعيد المنتزه (ar/en هنا؛ ru/zh بخطوطهما).
//   node docs/mosque-visit-fix/apply-jawatha-ar-en.mjs <جذر الشجرة>
import { readFileSync, writeFileSync } from 'node:fs';

const p = `${process.argv[2] || '.'}/src/content/attractions/jawatha-mosque.md`;
let t = readFileSync(p, 'utf8');
const EOL = t.includes('\r\n') ? '\r\n' : '\n';
const once = (from, to) => {
  const n = t.split(from).length - 1;
  if (n !== 1) throw new Error(`«${from.slice(0, 60)}» ورد ${n}`);
  t = t.replace(from, to);
};

once(`hoursSpec:${EOL}  - { days: "Mo Tu We Th Fr Sa Su", opens: "00:00", closes: "23:59" }${EOL}`, '');
let lines = t.split(EOL);
const before = lines.length;
lines = lines.filter((l) => !/^bestTime(?:_en|_zh|_de|_ru)?:/.test(l));
if (before - lines.length !== 5) throw new Error(`حقول bestTime المحذوفة ${before - lines.length} والمتوقع 5`);
t = lines.join(EOL);

once('label: "المواعيد", value: "المسجد طوال اليوم · المنتزه المحيط 8 ص–12 منتصف الليل", label_en: "Hours", value_en: "Mosque: all day · surrounding park: 8 am – 12 midnight"',
  'label: "مواعيد المنتزه المحيط", value: "8 ص–12 منتصف الليل", label_en: "Surrounding park hours", value_en: "8 am – 12 midnight"');
once('q: "ما مواعيد زيارة مسجد جواثا؟"', 'q: "ما مواعيد المنتزه المحيط بمسجد جواثا؟"');
once('a: "المسجد مفتوح طوال اليوم، والمنتزه المحيط من 8 ص إلى 12 منتصف الليل، مع احترام أوقات الصلاة وحرمة المكان."',
  'a: "يُفتح المنتزه المحيط بالمسجد من 8 ص إلى 12 منتصف الليل."');
once('q_en: "What are the visiting hours of Jawatha Mosque?"', 'q_en: "What are the opening hours of the park around Jawatha Mosque?"');
once('a_en: "The mosque is open all day, and the surrounding park from 8 am to 12 midnight; please respect prayer times and the sanctity of the place."',
  'a_en: "The park around the mosque is open from 8 am to 12 midnight."');

writeFileSync(p, t, 'utf8');
console.log('✓ جواثا: hoursSpec وbestTime×5 محذوفة؛ صف المنتزه والسؤال ar/en');
