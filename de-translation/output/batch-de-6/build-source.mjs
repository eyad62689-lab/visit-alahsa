// يبني source.json للدفعة 6 من ملفات المحتوى مباشرةً — لا نسخ يدوي.
import fs from 'node:fs';

const PAGES = ['uqair-beach', 'arbaa', 'salwa-beach', 'shaban', 'tuwaither'];
const SCALARS = [
  'title', 'title_en', 'kicker', 'summary', 'summary_en', 'body_en',
  'area', 'area_en', 'bestTime', 'bestTime_en', 'answer', 'answer_en',
  'category', 'slug_en', 'order', 'featured',
];

const out = {};
for (const p of PAGES) {
  const txt = fs.readFileSync(`src/content/attractions/${p}.md`, 'utf8');
  const i = txt.indexOf('\n---', 3);
  const fm = txt.slice(4, i);
  const bodyMd = txt.slice(i + 4).trim();

  const rec = {};
  for (const k of SCALARS) {
    const m = fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'));
    if (!m) continue;
    let v = m[1].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    rec[k] = v;
  }
  rec._arabic_body_md = bodyMd;

  // بنود practical كما هي سطراً سطراً (مع ما فيها من حقول de قائمة)
  const pm = fm.match(/^practical:\n((?:  - \{[\s\S]*?\}\n)+)/m);
  rec.practical = pm ? pm[1].trimEnd().split('\n').filter((l) => l.startsWith('  - {')) : [];

  // الأسئلة الشائعة: q/a بلغاتها.
  // ملاحظة: لا تُستعمل `$` مع الراية m في نهاية الكتلة — فهي تطابق نهايةَ أولِ
  // سطرٍ فتُرجع كتلةً فارغة (أمسكه القياس: uqair-beach 0 سؤالاً وفيها أربعة).
  const fqStart = fm.indexOf('\nfaq:\n');
  rec.faq = [];
  if (fqStart !== -1) {
    const rest = fm.slice(fqStart + 6);
    const end = rest.search(/\n[A-Za-z_][A-Za-z0-9_]*:/);
    const block = end === -1 ? rest : rest.slice(0, end);
    for (const blk of block.split(/\n(?=  - q: )/)) {
      // بادئة «- » تسبق مفتاح q في أول سطرٍ من البند، فلا يكفي ^\s*
      const g = (k) => {
        const m = blk.match(new RegExp(`^\\s*(?:- )?${k}:\\s*(.*)$`, 'm'));
        if (!m) return undefined;
        let v = m[1].trim();
        if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
        return v;
      };
      if (g('q')) rec.faq.push({ q: g('q'), a: g('a'), q_en: g('q_en'), a_en: g('a_en') });
    }
  }
  out[p] = rec;
}

fs.writeFileSync('de-translation/output/batch-de-6/source.json', JSON.stringify(out, null, 1) + '\n');

// جردة الحقول المطلوبة مقابل القائمة سلفاً
let reqAll = 0, newAll = 0;
for (const p of PAGES) {
  const r = out[p];
  const txt = fs.readFileSync(`src/content/attractions/${p}.md`, 'utf8');
  const base = ['title', 'kicker', 'summary', 'body', 'area', 'bestTime']
    .filter((b) => r[b] !== undefined || r[`${b}_en`] !== undefined);
  const have = base.filter((b) => new RegExp(`^${b}_de:`, 'm').test(txt)).length;
  const pDe = (txt.match(/label_de:/g) || []).length;
  const fDe = (txt.match(/q_de:/g) || []).length;
  const req = base.length + r.practical.length * 3 + r.faq.length * 2;
  const nw = req - have - pDe * 3 - fDe * 2;
  reqAll += req; newAll += nw;
  console.log(
    p.padEnd(13),
    'required=' + String(req).padStart(2),
    'already=' + String(req - nw).padStart(2),
    'NEW=' + String(nw).padStart(2),
    '| base:[' + base.join(',') + ']',
    'practical=' + r.practical.length,
    'faq=' + r.faq.length,
  );
}
console.log('---');
console.log('required total =', reqAll, '| already present =', reqAll - newAll, '| NEW to write =', newAll);
