// قرار إياد 2026-10-02: لا يُشار إلى وقت زيارة المساجد العاملة لا نفياً ولا تأكيداً.
// ar/en فقط (المصدر)؛ de/ru/zh تمرّ بخطوطها. يُخفق إن لم يجد كل صيغة بعددها المقيس.
//   node docs/mosque-visit-fix/apply-ar-en.mjs <جذر الشجرة>
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const R = process.argv[2] || '.';
const A = `${R}/src/content/attractions`;
const MOSQUES = ['abubakr-mosque', 'bubakr-ribat', 'dibs', 'hubaish', 'jabri-mosque', 'jalaniyah', 'jawatha-mosque',
  'qubba-mosque', 'tahimiyah-e', 'tahimiyah-s', 'umzurainiq', 'uqair-mosque'];

// [من, إلى, العدد المتوقع في كل الملفات]
const SWAPS = [
  // «الزيارة» (12)
  ['value: "متاحة، مع مراعاة أوقات الصلاة واللباس المحتشم واحترام حرمة المكان"', 'value: "متاحة، مع اللباس المحتشم واحترام حرمة المكان"', 12],
  ['value_en: "Open to visitors, with respect for prayer times, modest dress and the sanctity of the place"', 'value_en: "Open to visitors, with modest dress and respect for the sanctity of the place"', 12],
  // «المواعيد والدخول» ← «الدخول» (5)
  ['label: "المواعيد والدخول", value: "مسجد عامل — يُفتح لأوقات الصلوات، بلا رسوم دخول", label_en: "Hours & entry", value_en: "A working mosque — open at prayer times, no entry fee"',
    'label: "الدخول", value: "مسجد عامل، بلا رسوم دخول", label_en: "Entry", value_en: "A working mosque, no entry fee"', 5],
  // رباط أبي بكر: يبقى ما يخص الزيارات الثقافية وحده
  ['label: "المواعيد", value: "أوقات الصلوات / الزيارات الثقافية بالتنسيق المسبق مع القائمين", label_en: "Hours", value_en: "At prayer times; cultural visits by prior arrangement with those who run it"',
    'label: "الزيارات الثقافية", value: "بالتنسيق المسبق مع القائمين", label_en: "Cultural visits", value_en: "By prior arrangement with those who run it"', 1],
];
// صفوف «المواعيد» التي لا تقول إلا أوقات الصلوات: تُحذف كاملة (6)
const DROP = /^ {2}- \{ label: "المواعيد", value: "يومياً خلال أوقات الصلوات الخمس(?:والجمعة| والجمعة)?".*\}\s*$/;

const count = Object.fromEntries(SWAPS.map((s, i) => [i, 0]));
let dropped = 0;
for (const f of readdirSync(A).filter((n) => n.endsWith('.md'))) {
  const p = `${A}/${f}`;
  let t = readFileSync(p, 'utf8');
  const before = t;
  SWAPS.forEach(([from, to], i) => { const n = t.split(from).length - 1; count[i] += n; t = t.split(from).join(to); });
  const EOL = t.includes('\r\n') ? '\r\n' : '\n';
  const lines = t.split(EOL);
  const kept = lines.filter((l) => !DROP.test(l));
  dropped += lines.length - kept.length;
  t = kept.join(EOL);
  if (t !== before) {
    if (!MOSQUES.includes(f.replace(/\.md$/, ''))) throw new Error(`تعديل خارج قائمة المساجد: ${f}`);
    writeFileSync(p, t, 'utf8');
  }
}
SWAPS.forEach(([, , n], i) => { if (count[i] !== n) throw new Error(`الاستبدال ${i}: ${count[i]} والمتوقع ${n}`); });
if (dropped !== 6) throw new Error(`صفوف «المواعيد» المحذوفة ${dropped} والمتوقع 6`);

// المدونات (ar/en): جواثا
const B = `${R}/src/content/blog`;
const BLOG = [
  ['24-hours-ar.md', '، وزيارته متاحة، مع مراعاة أوقات الصلاة واللباس المحتشم واحترام حرمة المكان.', '، وزيارته متاحة، مع اللباس المحتشم واحترام حرمة المكان.'],
  ['24-hours-en.md', 'it is open to visitors, with respect for prayer times, modest dress and the sanctity of the place', 'it is open to visitors, with modest dress and respect for the sanctity of the place'],
  ['48-hours-ar.md', 'راعِ أوقات الصلاة وحرمة المكان، وزيارة المسجد متاحة، مع مراعاة أوقات الصلاة واللباس المحتشم واحترام حرمة المكان.', 'زيارة المسجد متاحة، مع اللباس المحتشم واحترام حرمة المكان.'],
  ['48-hours-en.md', 'Be mindful of prayer times and the sanctity of the place; the mosque is open to visitors, with respect for prayer times, modest dress and the sanctity of the place.', 'The mosque is open to visitors, with modest dress and respect for the sanctity of the place.'],
];
for (const [f, from, to] of BLOG) {
  const p = `${B}/${f}`;
  const t = readFileSync(p, 'utf8');
  if (t.split(from).length !== 2) throw new Error(`${f}: المرساة غير فريدة`);
  writeFileSync(p, t.replace(from, to), 'utf8');
}
console.log('✓ المساجد: 12 زيارة، 5 دخول، 1 رباط، 6 صفوف مواعيد محذوفة؛ المدونات: 4');
