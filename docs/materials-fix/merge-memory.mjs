// يدمج نتيجة دفعة local-materials في ذاكرة الترجمة والمعجم وسجل الدرجات:
// - tm.json (ru): الزوج المحفوظ لمتن قصر إبراهيم يحمل التمهيد القديم والشندل بلا شرح، فيُحدَّث طرفه الروسي
//   (والطرف الإنجليزي إن حمل الصيغة القديمة). de وzh لا زوج فيهما لهذه الجملة.
// - termbase.json (de/ru): مدخل الشندل يقول «بلا شرح»؛ يُلحق بملاحظته حكم الدفعة وسنده.
// - scores.csv: سطر لكل لغة من 07.json.
//   node docs/materials-fix/merge-memory.mjs <جذر الشجرة>
import { readFileSync, writeFileSync } from 'node:fs';

const R = process.argv[2] || '.';
const HERE = new URL('.', import.meta.url);
const rd = (p) => readFileSync(p, 'utf8');
const swapOnce = (t, from, to, what) => {
  const n = t.split(from).length - 1;
  if (n !== 1) throw new Error(`${what}: «${from}» ورد ${n} والمتوقع 1`);
  return t.replace(from, to);
};

// tm.json (ru)
{
  const p = `${R}/ru-translation/memory/tm.json`;
  let t = rd(p);
  t = swapOnce(t, 'Ее возвели из материалов самого оазиса:', 'Ее возвели в традициях зодчества Залива:', 'ru tm');
  t = swapOnce(t, 'кровля — из пальмовых стволов, дерева шандаль и камня.',
    'кровля — из пальмовых стволов, дерева шандаль (его когда-то привозили в регион Залива) и камня.', 'ru tm');
  for (const old of ['It was built from the oasis’s own materials:', "It was built from the oasis's own materials:"]) {
    if (t.includes(old)) t = swapOnce(t, old, 'It was built in the traditional Gulf manner:', 'ru tm en');
  }
  if (t.includes('chandal wood and stone')) {
    t = swapOnce(t, 'chandal wood and stone', 'chandal wood (timber once imported to the Gulf) and stone', 'ru tm en');
  }
  JSON.parse(t);
  writeFileSync(p, t, 'utf8');
  console.log('✓ ru tm');
}

// termbase.json (de/ru): ملاحظة الشندل
const NOTE = {
  de: ' **Nachtrag local-materials 2026-10-02 (Eyad):** Auf qasr-ibrahim trägt die erste Nennung jetzt die Glosse „Chandal-Holz (Bauholz, das früher in die Golfregion eingeführt wurde)“ — ar «خشبٌ كان يُجلب إلى الخليج», en „timber once imported to the Gulf“; Beleg: catnaps.org und UCL-Dissertation zur Architektur Dohas (zh-Termbase). Herkunft (Ostafrika/Indien) bleibt ungenannt. hubaish.md bleibt vorerst ohne Glosse.',
  ru: ' **Дополнение local-materials 2026-10-02 (Эяд):** на странице qasr-ibrahim первое упоминание теперь с глоссой «дерева шандаль (его когда-то привозили в регион Залива)» — ar «خشبٌ كان يُجلب إلى الخليج», en «timber once imported to the Gulf»; источник: catnaps.org и диссертация UCL об архитектуре Дохи (zh-termbase). Происхождение (Восточная Африка/Индия) не называется. hubaish.md пока без глоссы.',
};
for (const lg of ['de', 'ru']) {
  const p = `${R}/${lg}-translation/glossary/termbase.json`;
  // إدراج موضعي داخل قيمة الملاحظة: إعادة تسلسل الملف كله تغيّر تنسيقه في آلاف الأسطر
  let t = rd(p);
  const j = JSON.parse(t);
  const arr = Array.isArray(j) ? j : (j.terms || j.entries || Object.values(j).find(Array.isArray));
  const hits = arr.filter((e) => /chandal|شندل/i.test(String(e.en)));
  if (hits.length !== 1) throw new Error(`${lg} termbase: مدخل الشندل ${hits.length}`);
  const oldNote = JSON.stringify(String(hits[0].note)).slice(1, -1);
  const newNote = JSON.stringify(String(hits[0].note) + NOTE[lg]).slice(1, -1);
  t = swapOnce(t, oldNote, newNote, `${lg} termbase`);
  JSON.parse(t);
  writeFileSync(p, t, 'utf8');
  console.log(`✓ ${lg} termbase`);
}

// scores.csv
for (const lg of ['de', 'ru', 'zh']) {
  const j = JSON.parse(rd(new URL(`./out/${lg}/07.json`, HERE)));
  const row = j.scores_csv_row ?? j.scores_row;
  if (typeof row !== 'string' || !row.includes('2026-10-02')) throw new Error(`${lg}: سطر الدرجات غائب`);
  const p = `${R}/${lg}-translation/memory/scores.csv`;
  const csv = rd(p);
  const EOL = csv.includes('\r\n') ? '\r\n' : '\n';
  writeFileSync(p, csv.replace(/(\r?\n)?$/, EOL) + row + EOL, 'utf8');
  console.log(`✓ ${lg} scores`);
}
