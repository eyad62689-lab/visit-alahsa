// ناشر دفعة حقول معالم مترجَمة معتمدة — عامٌّ لأي لغة وأي دفعة.
//
// الاستعمال:
//   node tools/translation/apply-attraction-batch.mjs <de|zh|ru> <batch-dir> <judge-file> [--dry]
//   مثال: node tools/translation/apply-attraction-batch.mjs de batch-de-2 judge.loop3.json
//
// يقرأ `<lang>-translation/output/<batch>/` ويطلب فيه:
//   <judge-file>                  — `decision: APPROVE` و`batch_score >= 90`
//   fields.final.json             — كائنٌ مفاتيحه أسماء المعالم
//   tm-additions.json             — {"pairs":[…],"remove":[…]}            (اختياري)
//   scores-row.txt                — سطر CSV واحد                          (اختياري)
//   termbase-additions.final.json — {"terms":[…]} أو مصفوفة               (اختياري)
//
// ولا يكتب حرفاً بلا اعتماد. الترتيب: الحقول ← مفاتيح الواجهة ← المعجم ←
// **الحذف من الذاكرة ثم الإضافة** (سابقة الناشر الصيني 2026-09-10: الحذف بعد
// الإضافة يبتلع زوجاً جديداً يحمل المفتاح نفسه) ← سجل الدرجات.
//
// وسابقةٌ أخرى تخصّ `src/i18n/ui.ts`: المرساة تُبنى بـ`EOL` مستنبَطة من الملف
// نفسه لا مفترَضة (`SKILL.md`) — والملف اليوم LF، وقد كان CRLF.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../..');
const [lang, batch, judgeFile] = process.argv.slice(2);
const DRY = process.argv.includes('--dry');
if (!lang || !batch || !judgeFile) throw new Error('الاستعمال: <lang> <batch-dir> <judge-file> [--dry]');
const B = path.join(ROOT, `${lang}-translation/output/${batch}`);
const log = (...a) => console.log(DRY ? '[تجربة]' : '       ', ...a);

const read = (p) => readFileSync(p, 'utf8');
const write = (p, s) => { if (!DRY) writeFileSync(p, s); };
const sfx = `_${lang}`;

// ── 0) لا تطبيق بلا اعتماد ──────────────────────────────────────────────
const judge = JSON.parse(read(path.join(B, judgeFile)));
if (judge.decision !== 'APPROVE' || !(judge.batch_score >= 90)) {
  throw new Error(`لا نشر: القرار ${judge.decision} والدرجة ${judge.batch_score}`);
}
log(`${judge.decision} بدرجة ${judge.batch_score} — الدورة ${judge.loop ?? 1}`);

const yq = (v) => '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';

// ── 1) حقول المعالم ─────────────────────────────────────────────────────
const fields = JSON.parse(read(path.join(B, 'fields.final.json')));
const ORDER = ['title', 'kicker', 'summary', 'body', 'area', 'bestTime'];
const HEADER = `# الحقول الألمانية: معتمدة من خط de-translation-pipeline — ${batch} بدرجة ${judge.batch_score}/100 (${judge.date}، الدورة ${judge.loop ?? 1} من ${judge.max_correction_loops ?? 3})`;

for (const [name, page] of Object.entries(fields)) {
  const fp = path.join(ROOT, 'src/content/attractions', `${name}.md`);
  let t = read(fp);
  if (t.includes(`title${sfx}:`)) throw new Error(`${name}: فيه title${sfx} سلفاً — لا كتابة فوق منشور`);

  const lines = [HEADER];
  for (const k of ORDER) {
    const v = page[k + sfx];
    if (v != null && String(v).trim() !== '') lines.push(`${k}${sfx}: ${yq(v)}`);
  }
  const anchor = /^# الحقول الروسية:.*$/m.exec(t) ?? /^slug_ar:/m.exec(t);
  if (!anchor) throw new Error(`${name}: لا مرساة لإدراج الكتلة`);
  t = t.slice(0, anchor.index) + lines.join('\n') + '\n' + t.slice(anchor.index);
  log(`${name}: ${lines.length - 1} حقلاً قياسياً`);

  // بنود بطاقة الزيارة — إدراجٌ داخل السطر نفسه. مسحٌ نصّي لا تعبيرٌ نمطيّ
  // مبنيّ من مدخل (سابقة `numInText`/`uiValue`، وإصلاح Semgrep على الطلب #43).
  const prac = page.practical ?? [];
  if (prac.length) {
    const rows = [...t.matchAll(/^ {2}- \{ label: .*$/gm)];
    if (rows.length !== prac.length) throw new Error(`${name}: بنود practical ${rows.length} والمعتمد ${prac.length}`);
    for (let i = rows.length - 1; i >= 0; i--) {         // من الآخر كي لا تنزاح المواضع
      const line = rows[i][0];
      const it = prac[i];
      if (line.includes(`label${sfx}:`)) throw new Error(`${name}: البند ${i} فيه label${sfx} سلفاً`);
      let out = line;
      const after = (key, add) => {
        const at = out.indexOf(`${key}: "`);
        if (at < 0) return false;
        let j = at + key.length + 3;                      // أول حرفٍ داخل الاقتباس
        while (j < out.length && out[j] !== '"') j += out[j] === '\\' ? 2 : 1;
        if (j >= out.length) return false;
        j += 1;
        if (out.slice(j, j + 2) !== ', ') return false;
        j += 2;
        out = out.slice(0, j) + add + out.slice(j);
        return true;
      };
      const pair = `label${sfx}: ${yq(it[`label${sfx}`])}, value${sfx}: ${yq(it[`value${sfx}`])}, `;
      if (!after('value_zh', pair) && !after('value_en', pair)) throw new Error(`${name}: البند ${i} بلا مرساة`);
      if (it[`source${sfx}`]) {
        const src = `source${sfx}: ${yq(it[`source${sfx}`])}, `;
        if (!after('source_zh', src) && !after('source_en', src)) throw new Error(`${name}: البند ${i} بلا مرساة مصدر`);
      }
      t = t.replace(line, out);
    }
    log(`${name}: ${prac.length} بند بطاقة`);
  }

  // الأسئلة الشائعة — سطران بعد آخر مرساةٍ داخل كل بند
  const faq = page.faq ?? [];
  if (faq.length) {
    // حدود البنود: بداية كل `  - q:`، وخاتمة الأخير أولُ مفتاحٍ في العمود صفر بعده.
    // (‏`\Z` ليست رمزاً في تعابير JS — تُطابق حرف Z نفسه، فلا تُستعمل حدّاً.)
    const starts = [...t.matchAll(/^ {2}- q: /gm)].map((m) => m.index);
    if (starts.length !== faq.length) throw new Error(`${name}: أسئلة ${starts.length} والمعتمد ${faq.length}`);
    if (new RegExp(`^ {4}q${sfx}:`, 'm').test(t)) throw new Error(`${name}: فيه q${sfx} سلفاً`);
    const tailKey = /^[A-Za-z_][\w]*:/gm;
    tailKey.lastIndex = starts[starts.length - 1];
    const endOfFaq = tailKey.exec(t)?.index ?? t.length;
    const bounds = starts.map((s, i) => [s, i + 1 < starts.length ? starts[i + 1] : endOfFaq]);
    for (let i = bounds.length - 1; i >= 0; i--) {
      const [s, e] = bounds[i];
      const block = t.slice(s, e);
      const marks = [...block.matchAll(/^ {4}a_(?:zh|en): .*$/gm)];
      if (!marks.length) throw new Error(`${name}: السؤال ${i} بلا مرساة a_zh/a_en`);
      const last = marks[marks.length - 1];
      const at = s + last.index + last[0].length;
      t = t.slice(0, at) + `\n    q${sfx}: ${yq(faq[i][`q${sfx}`])}\n    a${sfx}: ${yq(faq[i][`a${sfx}`])}` + t.slice(at);
    }
    log(`${name}: ${faq.length} سؤالاً`);
  }
  write(fp, t);
}

// ── 2) مفاتيح الواجهة (إن وُجدت في الحكم) ───────────────────────────────
{
  const adds = judge.ui_additions?.['src/i18n/ui.ts']?.[lang] ?? {};
  const keys = Object.keys(adds);
  if (keys.length) {
    const p = path.join(ROOT, 'src/i18n/ui.ts');
    const t = read(p);
    const EOL = t.includes('\r\n') ? '\r\n' : '\n';       // مستنبَطة لا مفترَضة
    const start = t.indexOf(`  ${lang}: {`);
    if (start < 0) throw new Error(`ui.ts: لا كتلة ${lang}`);
    const end = t.indexOf(`${EOL}  }`, start);
    let blk = t.slice(start, end);
    let n = 0;
    for (const [key, val] of Object.entries(adds)) {
      if (blk.includes(`'${key}':`)) { log(`ui.ts: ${key} موجود سلفاً — يُتخطّى`); continue; }
      const i = blk.indexOf("    'det.visitInfo': ");
      if (i < 0) throw new Error(`ui.ts: لا مرساة det.visitInfo في كتلة ${lang}`);
      const j = blk.indexOf(EOL, i) + EOL.length;
      blk = blk.slice(0, j) + `    '${key}': '${String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}',${EOL}` + blk.slice(j);
      n++; log(`ui.ts: أُدرج ${key}`);
    }
    if (n) write(p, t.slice(0, start) + blk + t.slice(end));
    log(`ui.ts: نهايات ${EOL === '\r\n' ? 'CRLF' : 'LF'} · ${n} مفتاحاً`);
  } else log('ui.ts: لا مفاتيح في هذا الحكم');
}

// ── 3) المعجم ───────────────────────────────────────────────────────────
{
  const ap = path.join(B, 'termbase-additions.final.json');
  if (existsSync(ap)) {
    const p = path.join(ROOT, `${lang}-translation/glossary/termbase.json`);
    const tb = JSON.parse(read(p));
    const add = JSON.parse(read(ap));
    const entries = add.terms ?? add.additions ?? add;
    const have = new Map(tb.terms.map((x) => [x.en, x]));
    let n = 0, merged = 0;
    for (const e of entries) {
      if (!e?.en || !e?.[lang]) continue;
      if (lang === 'de' && e.artikel === undefined) throw new Error(`معجم: مدخل بلا جنس — ${e.en}`);
      if (!e.source) throw new Error(`معجم: مدخل بلا مصدر — ${e.en}`);
      const cur = have.get(e.en);
      if (cur) {
        if (cur[lang] !== e[lang]) { Object.assign(cur, e); merged++; log(`معجم: دُمج ${e.en}`); }
        continue;
      }
      const row = { ...e };
      if (!row.added) row.added = judge.date;
      tb.terms.push(row); have.set(e.en, row); n++;
    }
    write(p, JSON.stringify(tb, null, 2) + '\n');
    log(`المعجم: +${n} · ${merged} مدموجاً · المجموع ${tb.terms.length}`);
  }
}

// ── 4) ذاكرة الترجمة — الحذف أولاً ثم الإضافة ───────────────────────────
{
  const tp = path.join(B, 'tm-additions.json');
  if (existsSync(tp)) {
    const p = path.join(ROOT, `${lang}-translation/memory/tm.json`);
    const tm = JSON.parse(read(p));
    const spec = JSON.parse(read(tp));
    let removed = 0;
    for (const r of spec.remove ?? []) {
      const before = tm.pairs.length;
      tm.pairs = tm.pairs.filter((q) => !(
        (r.page && r.field && q.page === r.page && q.field === r.field && (!r[lang] || q[lang] === r[lang])) ||
        (r[lang] && !r.page && q[lang] === r[lang])
      ));
      removed += before - tm.pairs.length;
    }
    const have = new Set(tm.pairs.map((q) => `${q.en} ${q[lang]}`));
    let n = 0;
    for (const a of spec.pairs ?? []) {
      if (!a.en || !a[lang] || have.has(`${a.en} ${a[lang]}`)) continue;
      tm.pairs.push({ en: a.en, [lang]: a[lang], page: a.page ?? 'attractions', field: a.field ?? 'body', date: a.date ?? judge.date });
      have.add(`${a.en} ${a[lang]}`); n++;
    }
    write(p, JSON.stringify(tm, null, 2) + '\n');
    log(`الذاكرة: -${removed} +${n} · المجموع ${tm.pairs.length}`);
  }
}

// ── 5) سجل الدرجات ──────────────────────────────────────────────────────
{
  const rp = path.join(B, 'scores-row.txt');
  if (existsSync(rp)) {
    const p = path.join(ROOT, `${lang}-translation/memory/scores.csv`);
    const row = read(rp).trim();
    const s = read(p);
    if (row && !s.includes(row.slice(0, 60))) {
      write(p, s + (s.endsWith('\n') ? '' : '\n') + row + '\n');
      log('سجل الدرجات: أُلحق السطر');
    } else log('سجل الدرجات: السطر موجود سلفاً');
  }
}

log('تمّ' + (DRY ? ' (تجربة جافّة — لم يُكتب شيء)' : ''));
