// تطبيق دفعة المعالم الألمانية 1 المعتمدة (APPROVE · 93/100 · الدورة 2 من 3).
//
// الخطوات الستّ من `judge.loop2.json` → `approval.apply_steps`:
//   1) حقول `fields.final.json` في ملفات المعالم الخمسة.
//   2) `det.faq` في كتلة `de:` من `src/i18n/ui.ts` — **بنهايات CRLF** (شرط سلامة C22).
//   3) دمج `termbase-additions.final.json` في معجم الألمانية.
//   4) `tm-additions.json`: **الحذف أولاً ثم الإضافة** (سابقة الناشر الصيني 2026-09-10:
//      الحذف بعد الإضافة يبتلع زوجاً جديداً يحمل المفتاح نفسه).
//   5) إلحاق `scores-row.txt` بسجل الدرجات.
//
// الاستعمال: node de-translation/output/batch-de-1/apply.mjs [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../..');
const B = path.join(ROOT, 'de-translation/output/batch-de-1');
const DRY = process.argv.includes('--dry');
const log = (...a) => console.log(DRY ? '[dry]' : '     ', ...a);

const read = (p) => readFileSync(p, 'utf8');
const write = (p, s) => { if (!DRY) writeFileSync(p, s); };

// ── 0) لا تطبيق بلا اعتماد ──────────────────────────────────────────────
const judge = JSON.parse(read(path.join(B, 'judge.loop2.json')));
if (judge.decision !== 'APPROVE' || judge.batch_score < 90) {
  throw new Error(`لا نشر: القرار ${judge.decision} والدرجة ${judge.batch_score}`);
}
log(`الحكم ${judge.decision} بدرجة ${judge.batch_score} — الدورة ${judge.loop}`);

// قيمة YAML مقتبسة: نستعمل الاقتباس المزدوج دائماً كما في بقية الحقول المترجمة
const yq = (v) => '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';

// ── 1) حقول المعالم ─────────────────────────────────────────────────────
const fields = JSON.parse(read(path.join(B, 'fields.final.json')));
// ترتيب كتلة اللغة يتبع كتلة الصينية في الملف نفسه
const ORDER = ['title', 'kicker', 'summary', 'body', 'area', 'bestTime'];
const HEADER = `# الحقول الألمانية: معتمدة من خط de-translation-pipeline — دفعة المعالم 1 بدرجة ${judge.batch_score}/100 (${judge.date}، الدورة ${judge.loop} من ${judge.max_correction_loops})`;

for (const [name, page] of Object.entries(fields)) {
  const fp = path.join(ROOT, 'src/content/attractions', `${name}.md`);
  let t = read(fp);
  if (t.includes('title_de:')) throw new Error(`${name}: فيه title_de سلفاً — لا كتابة فوق منشور`);

  // (أ) الكتلة القياسية: تُدرج قبل تعليق الكتلة الروسية، وإلا قبل `slug_ar:`
  const lines = [HEADER];
  for (const k of ORDER) {
    const v = page[`${k}_de`];
    if (v != null && String(v).trim() !== '') lines.push(`${k}_de: ${yq(v)}`);
  }
  const anchor = /^# الحقول الروسية:.*$/m.exec(t) ?? /^slug_ar:/m.exec(t);
  if (!anchor) throw new Error(`${name}: لا مرساة لإدراج الكتلة الألمانية`);
  t = t.slice(0, anchor.index) + lines.join('\n') + '\n' + t.slice(anchor.index);
  log(`${name}: ${lines.length - 1} حقلاً قياسياً`);

  // (ب) بنود بطاقة الزيارة — إدراج داخل السطر نفسه بعد النظير الصيني
  const prac = page.practical ?? [];
  if (prac.length) {
    const rows = [...t.matchAll(/^ {2}- \{ label: .*$/gm)];
    if (rows.length !== prac.length) throw new Error(`${name}: بنود practical ${rows.length} والمعتمد ${prac.length}`);
    for (let i = rows.length - 1; i >= 0; i--) {          // من الآخر كي لا تنزاح المواضع
      const line = rows[i][0];
      const it = prac[i];
      if (/label_de:/.test(line)) throw new Error(`${name}: البند ${i} فيه label_de سلفاً`);
      let out = line;
      const after = (key, add) => {
        const m = new RegExp(`(${key}: (?:[^"]|"(?:[^"\\\\]|\\\\.)*")*?"(?:[^"\\\\]|\\\\.)*", )`).exec(out);
        if (!m) return false;
        out = out.slice(0, m.index + m[1].length) + add + out.slice(m.index + m[1].length);
        return true;
      };
      // نُدرج بعد آخر زوج صيني إن وُجد، وإلا بعد الإنجليزي
      const pair = `label_de: ${yq(it.label_de)}, value_de: ${yq(it.value_de)}, `;
      if (!after('value_zh', pair) && !after('value_en', pair)) throw new Error(`${name}: البند ${i} بلا مرساة value_zh/value_en`);
      if (it.source_de) {
        const src = `source_de: ${yq(it.source_de)}, `;
        if (!after('source_zh', src) && !after('source_en', src)) throw new Error(`${name}: البند ${i} بلا مرساة source`);
      }
      t = t.replace(line, out);
    }
    log(`${name}: ${prac.length} بند بطاقة`);
  }

  // (ج) الأسئلة الشائعة — سطران بعد `a_zh` (وإلا بعد `a_en`) داخل كل بند
  const faq = page.faq ?? [];
  if (faq.length) {
    const marks = [...t.matchAll(/^ {4}a_(?:zh|en): .*$/gm)];
    const anchors = [];
    for (const m of marks) {                                // آخر مرساة داخل كل بند
      const prev = anchors[anchors.length - 1];
      if (prev && m[0].startsWith('    a_zh') ) anchors[anchors.length - 1] = m;
      else if (!prev || t.slice(prev.index, m.index).includes('\n  - q:')) anchors.push(m);
      else anchors[anchors.length - 1] = m;
    }
    if (anchors.length !== faq.length) throw new Error(`${name}: أسئلة ${anchors.length} والمعتمد ${faq.length}`);
    if (/^ {4}q_de:/m.test(t)) throw new Error(`${name}: فيه q_de سلفاً`);
    for (let i = anchors.length - 1; i >= 0; i--) {
      const at = anchors[i].index + anchors[i][0].length;
      t = t.slice(0, at) + `\n    q_de: ${yq(faq[i].q_de)}\n    a_de: ${yq(faq[i].a_de)}` + t.slice(at);
    }
    log(`${name}: ${faq.length} سؤالاً`);
  }
  write(fp, t);
}

// ── 2) مفتاح الواجهة — كتلة `de:` بنهايات CRLF ──────────────────────────
{
  const p = path.join(ROOT, 'src/i18n/ui.ts');
  const t = read(p);
  const EOL = t.includes('\r\n') ? '\r\n' : '\n';
  const adds = judge.ui_additions?.['src/i18n/ui.ts']?.de ?? {};
  const start = t.indexOf('  de: {');
  if (start < 0) throw new Error('ui.ts: لا كتلة de');
  const end = t.indexOf(`${EOL}  }`, start);
  let blk = t.slice(start, end);
  let n = 0;
  for (const [key, val] of Object.entries(adds)) {
    if (blk.includes(`'${key}':`)) { log(`ui.ts: ${key} موجود سلفاً — تُخطّى`); continue; }
    // تُدرج بعد `det.visitInfo` (المفتاح المجاور في كل الكتل)
    const i = blk.indexOf("    'det.visitInfo': ");
    if (i < 0) throw new Error('ui.ts: لا مرساة det.visitInfo في كتلة de');
    const j = blk.indexOf(EOL, i) + EOL.length;
    blk = blk.slice(0, j) + `    '${key}': '${val.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',${EOL}` + blk.slice(j);
    n++; log(`ui.ts: أُدرج ${key} = ${val}`);
  }
  if (n) write(p, t.slice(0, start) + blk + t.slice(end));
  log(`ui.ts: نهايات ${EOL === '\r\n' ? 'CRLF' : 'LF'} · ${n} مفتاحاً`);
}

// ── 3) المعجم ───────────────────────────────────────────────────────────
{
  const p = path.join(ROOT, 'de-translation/glossary/termbase.json');
  const tb = JSON.parse(read(p));
  const add = JSON.parse(read(path.join(B, 'termbase-additions.final.json')));
  const entries = add.terms ?? add.additions ?? add;
  const have = new Set(tb.terms.map((x) => x.en));
  let n = 0, merged = 0;
  for (const e of entries) {
    if (!e?.en || !e?.de) continue;
    if (!e.artikel && !/artikellos/.test(String(e.artikel))) {
      if (e.artikel === undefined) throw new Error(`معجم: مدخل بلا جنس — ${e.en}`);
    }
    if (!e.source) throw new Error(`معجم: مدخل بلا مصدر — ${e.en}`);
    if (have.has(e.en)) {
      const t0 = tb.terms.find((x) => x.en === e.en);
      if (t0.de !== e.de) { t0.de = e.de; t0.artikel = e.artikel; t0.note = e.note ?? t0.note; t0.source = e.source; merged++; log(`معجم: دُمج ${e.en}`); }
      continue;
    }
    tb.terms.push({ ...e, added: e.added ?? judge.date });
    have.add(e.en); n++;
  }
  write(p, JSON.stringify(tb, null, 2) + '\n');
  log(`المعجم: +${n} مدخلاً · ${merged} مدموجاً · المجموع ${tb.terms.length}`);
}

// ── 4) ذاكرة الترجمة — الحذف أولاً ثم الإضافة ───────────────────────────
{
  const p = path.join(ROOT, 'de-translation/memory/tm.json');
  const tm = JSON.parse(read(p));
  const spec = JSON.parse(read(path.join(B, 'tm-additions.json')));
  let removed = 0;
  for (const r of spec.remove ?? []) {
    const before = tm.pairs.length;
    tm.pairs = tm.pairs.filter((q) => !(
      (r.page && r.field && q.page === r.page && q.field === r.field && (!r.de || q.de === r.de)) ||
      (r.de && !r.page && q.de === r.de)
    ));
    removed += before - tm.pairs.length;
  }
  const have = new Set(tm.pairs.map((q) => `${q.en} ${q.de}`));
  let n = 0;
  for (const a of spec.pairs ?? []) {
    if (!a.en || !a.de || have.has(`${a.en} ${a.de}`)) continue;
    tm.pairs.push({ en: a.en, de: a.de, page: a.page ?? 'attractions', field: a.field ?? 'body', date: a.date ?? judge.date });
    have.add(`${a.en} ${a.de}`); n++;
  }
  write(p, JSON.stringify(tm, null, 2) + '\n');
  log(`الذاكرة: -${removed} +${n} · المجموع ${tm.pairs.length}`);
}

// ── 5) سجل الدرجات ──────────────────────────────────────────────────────
{
  const p = path.join(ROOT, 'de-translation/memory/scores.csv');
  const row = read(path.join(B, 'scores-row.txt')).trim();
  const s = read(p);
  if (row && !s.includes(row.slice(0, 60))) {
    write(p, s + (s.endsWith('\n') ? '' : '\n') + row + '\n');
    log('سجل الدرجات: أُلحق السطر');
  } else log('سجل الدرجات: السطر موجود سلفاً');
}

log('تمّ' + (DRY ? ' (تجربة جافّة — لم يُكتب شيء)' : ''));
