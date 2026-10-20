// يطبّق مخرجات دفعة palm-village-page على صفحة المعلم src/content/attractions/palm-village.md.
// يُستعمل مرتين: على 05.json لبناء مدخل القارئ الأعمى من dist، ثم على final.json بعد الحاكم.
// متكرّر بأمان: يحذف حقول اللغة القائمة قبل كتابتها. النصوص تُكتب سلاسلَ JSON (صالحة YAML بعلامتين).
//   node docs/palm-village-page/apply.mjs <05|final> <lg…>
import { readFileSync, writeFileSync } from 'node:fs';

// رموز اللغة والمرحلة من قائمة ثابتة لا من سطر الأوامر: القيمة المستعملة في التعابير والمسارات
// عنصرٌ من القائمة نفسها، فلا يصل مدخلٌ خارجي إلى RegExp ولا إلى مسار ملف.
const ALL_LANGS = ['zh', 'de', 'ru', 'ur'];
const pickLang = (arg) => { const v = ALL_LANGS.find((x) => x === arg); if (!v) { console.error(`لغة غير معروفة: ${arg}`); process.exit(1); } return v; };
const STAGE = ['01', '03', '05', 'final'].find((x) => x === process.argv[2]);
const LANGS = process.argv.slice(3).map(pickLang);
if (!STAGE || !LANGS.length) { console.error('usage: apply.mjs <01|03|05|final> <lg…>'); process.exit(1); }
const PAGE = 'src/content/attractions/palm-village.md';
const LABEL = { zh: 'الصينية', de: 'الألمانية', ru: 'الروسية', ur: 'الأوردية' };
const EVBLOCK = { zh: 'TEXT_ZH', de: 'TEXT_DE', ru: 'TEXT_RU', ur: 'TEXT_UR' };

const raw = readFileSync(PAGE, 'utf8');
const crlf = raw.includes('\r\n');
let s = raw.replace(/\r\n/g, '\n');
const ev = readFileSync('src/data/events.ts', 'utf8').replace(/\r\n/g, '\n');
const q = (v) => JSON.stringify(v);

for (const lg of LANGS) {
  const out = JSON.parse(readFileSync(`docs/palm-village-page/out/${lg}/${STAGE}.json`, 'utf8'));
  const P = Object.fromEntries(out.positions.map((p) => [p.id, p.proposed]));
  const need = (id) => { if (typeof P[id] !== 'string' || !P[id].trim()) throw new Error(`${lg}: موضع ناقص ${id}`); return P[id].trim(); };
  // المكان: نصّ الفعالية المعتمد حرفياً (لا يُترجم في الدفعة)
  const b = ev.indexOf(`const ${EVBLOCK[lg]}`);
  const blk = ev.slice(ev.indexOf("'palm-village': {", b), ev.indexOf('\n  },', ev.indexOf("'palm-village': {", b)));
  const area = blk.match(/place: '([^']+)'/)?.[1];
  if (!area) throw new Error(`${lg}: لا مكان معتمد في ${EVBLOCK[lg]}`);

  // ١. الحقول العليا — تُحذف ثم تُكتب كتلةً واحدة بعد سطر summary_en
  const top = ['title', 'kicker', 'summary', 'body', 'area', 'galleryTitle'];
  s = s.replace(new RegExp(`^# الحقول ${LABEL[lg]}: دفعة palm-village-page[^\\n]*\\n`, 'm'), '');
  for (const f of top) s = s.replace(new RegExp(`^${f}_${lg}: [^\\n]*\\n`, 'm'), '');
  const body = [1, 2, 3, 4, 5].map((i) => need(`body.${i}`)).join('\n\n');
  const lines = [
    `# الحقول ${LABEL[lg]}: دفعة palm-village-page (${STAGE === 'final' ? `معتمدة ${out.score}/100، ${out.approved_at}` : 'مسودة المرحلة 05 لمدخل القارئ الأعمى'})`,
    `title_${lg}: ${q(need('title'))}`,
    `kicker_${lg}: ${q(need('kicker'))}`,
    `summary_${lg}: ${q(need('summary'))}`,
    `body_${lg}: ${q(body)}`,
    `area_${lg}: ${q(area)}`,
    `galleryTitle_${lg}: ${q(need('galleryTitle'))}`,
  ];
  const anchor = s.match(/^summary_en: [^\n]*\n/m);
  if (!anchor) throw new Error('لا سطر summary_en');
  // ترتيب ثابت للّغات: تُكتب الكتلة بعد آخر كتلة لغة سابقة لها في الترتيب
  const order = ['zh', 'de', 'ru', 'ur'];
  let at = anchor.index + anchor[0].length;
  for (const prev of order.slice(0, order.indexOf(lg))) {
    const m = s.match(new RegExp(`^galleryTitle_${prev}: [^\\n]*\\n`, 'm'));
    if (m) at = m.index + m[0].length;
  }
  s = s.slice(0, at) + lines.join('\n') + '\n' + s.slice(at);

  // ٢. زر التسجيل
  s = s.replace(new RegExp(`^  label_${lg}: [^\\n]*\\n^  note_${lg}: [^\\n]*\\n`, 'm'), '');
  const ctaAt = s.match(/^  note_en: [^\n]*\n/m);
  if (!ctaAt) throw new Error('لا note_en في cta');
  let cAt = ctaAt.index + ctaAt[0].length;
  for (const prev of order.slice(0, order.indexOf(lg))) {
    const m = s.match(new RegExp(`^  note_${prev}: [^\\n]*\\n`, 'm'));
    if (m) cAt = m.index + m[0].length;
  }
  s = s.slice(0, cAt) + `  label_${lg}: ${q(need('cta.label'))}\n  note_${lg}: ${q(need('cta.note'))}\n` + s.slice(cAt);

  // ٣. بنود البطاقة (خرائط مضمّنة) — يُلحق الزوج بعد value_en ثم بعد أزواج اللغات السابقة
  const rows = [...s.matchAll(/^  - \{ label: [^\n]*\}$/gm)];
  let rowIdx = 0;
  s = s.replace(/^  - \{ label: [^\n]*\}$/gm, (row) => {
    const i = rowIdx++;
    row = row.replace(new RegExp(`, label_${lg}: "(?:[^"\\\\]|\\\\.)*", value_${lg}: "(?:[^"\\\\]|\\\\.)*"`), '');
    let m = row.match(/value_en: "(?:[^"\\]|\\.)*"/);
    let pos = m.index + m[0].length;
    for (const prev of order.slice(0, order.indexOf(lg))) {
      const pm = row.match(new RegExp(`value_${prev}: "(?:[^"\\\\]|\\\\.)*"`));
      if (pm) pos = pm.index + pm[0].length;
    }
    return row.slice(0, pos) + `, label_${lg}: ${q(need(`practical.${i}.label`))}, value_${lg}: ${q(need(`practical.${i}.value`))}` + row.slice(pos);
  });
  if (rowIdx !== rows.length || rows.length !== 3) throw new Error(`عدد بنود البطاقة ${rows.length}`);

  // ٤. الأسئلة — بعد a_en (ثم بعد أزواج اللغات السابقة) لكل بند
  s = s.replace(new RegExp(`^    q_${lg}: [^\\n]*\\n^    a_${lg}: [^\\n]*\\n`, 'gm'), '');
  let fi = 0;
  s = s.replace(/^(    a_en: [^\n]*\n)((?:    [qa]_(?:zh|de|ru|ur): [^\n]*\n)*)/gm, (m, en, rest) => {
    const i = fi++;
    const pairs = rest.match(/    q_(zh|de|ru|ur): [^\n]*\n    a_\1: [^\n]*\n/g) ?? [];
    const mine = `    q_${lg}: ${q(need(`faq.${i}.q`))}\n    a_${lg}: ${q(need(`faq.${i}.a`))}\n`;
    const all = [...pairs, mine].sort((x, y) => order.indexOf(x.slice(6, 8)) - order.indexOf(y.slice(6, 8)));
    return en + all.join('');
  });
  if (fi !== 5) throw new Error(`عدد الأسئلة ${fi}`);
  console.log(`${lg}: ${out.positions.length} موضعاً من ${STAGE}.json`);
}
if (crlf) s = s.replace(/\n/g, '\r\n');
writeFileSync(PAGE, s);
