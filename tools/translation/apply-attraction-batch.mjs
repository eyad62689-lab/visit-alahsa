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
const LANG_AR = { de: 'الألمانية', zh: 'الصينية', ru: 'الروسية' }[lang] ?? lang;
const HEADER = `# الحقول ${LANG_AR}: معتمدة من خط ${lang}-translation-pipeline — ${batch} بدرجة ${judge.batch_score}/100 (${judge.date}، الدورة ${judge.loop ?? 1} من ${judge.max_correction_loops ?? 3})`;

// صفحاتُ **المراجعة**: منشورةٌ سلفاً بهذه اللغة، ويُستبدَل فيها حقلٌ مسمّى في
// موضعه. ملفٌ اختياريّ `revise.json` صيغته {"<صفحة>": ["summary_de", …]}، وهو
// **قائمةُ إذنٍ حصرية**: أي حقلٍ في `fields.final.json` خارجها يُرفض، فلا توسّع
// مرحلةٌ مراجعةً بصمت. وحارسُ «لا كتابة فوق منشور» يبقى على ما عداها.
const revP = path.join(B, 'revise.json');
const revise = existsSync(revP) ? JSON.parse(read(revP)) : {};

// استبدالُ قيمةِ مفتاحٍ مقتبَسٍ داخل نطاقٍ من النصّ — مسحٌ نصّي لا تعبيرٌ نمطيّ
// مبنيّ من مدخل (سابقة `numInText`/`uiValue`، وإصلاح Semgrep على الطلب #43).
const replaceQuotedAt = (text, needle, label, value, from = 0, to = text.length) => {
  const at = text.indexOf(needle, from);
  if (at < 0 || at >= to) throw new Error(`لا سطر ${label} في نطاقه`);
  const again = text.indexOf(needle, at + 1);
  if (again >= 0 && again < to) throw new Error(`${label} غير فريد في نطاقه — لا تحرير بالظنّ`);
  const open = at + needle.length;                       // أول حرفٍ داخل الاقتباس
  let j = open;
  while (j < text.length && text[j] !== '"') j += text[j] === '\\' ? 2 : 1;
  if (j >= text.length) throw new Error(`${label}: اقتباسٌ غير مغلق`);
  const old = text.slice(open, j);
  const nw = yq(value).slice(1, -1);                     // المهروب بلا قوسيه
  return { text: text.slice(0, open) + nw + text.slice(j), changed: old !== nw };
};

// حدودُ بند سؤالٍ رقمه `i` — البداياتُ `  - q: ` وخاتمةُ الأخير أولُ مفتاحٍ في
// العمود صفر بعده. (‏`\Z` ليست رمزاً في تعابير JS فلا تُستعمل حدّاً — علّةٌ
// أمسكتها تجربةُ الدفعة 2 الجافّة.)
const faqBounds = (text, i) => {
  const starts = [...text.matchAll(/^ {2}- q: /gm)].map((m) => m.index);
  if (i >= starts.length) throw new Error(`faq[${i}]: الصفحة فيها ${starts.length} سؤالاً فقط`);
  const tailKey = /^[A-Za-z_][\w]*:/gm;
  tailKey.lastIndex = starts[starts.length - 1];
  const end = tailKey.exec(text)?.index ?? text.length;
  return [starts[i], i + 1 < starts.length ? starts[i + 1] : end];
};

// مفتاحُ مراجعةٍ داخل بند سؤال: `faq[2].q_de`. القيمةُ على سطرها بمسافتين
// أربع، فالنطاقُ حدودُ البند وحدها كي لا يُصيب مفتاحاً في بندٍ آخر.
const FAQ_KEY = /^faq\[(\d+)\]\.([A-Za-z_][\w]*)$/;
const reviseKey = (text, key, value) => {
  const m = FAQ_KEY.exec(key);
  if (!m) return replaceQuotedAt(text, `\n${key}: "`, key, value);
  const [lo, hi] = faqBounds(text, Number(m[1]));
  return replaceQuotedAt(text, `\n    ${m[2]}: "`, key, value, lo, hi);
};

for (const [name, page] of Object.entries(fields)) {
  const fp = path.join(ROOT, 'src/content/attractions', `${name}.md`);
  let t = read(fp);

  const allow = revise[name];
  if (allow) {
    if (!t.includes(`title${sfx}:`)) throw new Error(`${name}: مراجعةٌ لصفحةٍ غير منشورة بـ${lang}`);
    if (page.practical || page.faq) throw new Error(`${name}: المراجعة لا تمسّ practical/faq`);
    const given = Object.keys(page).filter((k) => k.endsWith(sfx));
    const extra = given.filter((k) => !allow.includes(k));
    if (extra.length) throw new Error(`${name}: حقولٌ خارج إذن المراجعة — ${extra.join(' · ')}`);
    const missing = allow.filter((k) => !given.includes(k));
    if (missing.length) throw new Error(`${name}: إذنُ مراجعةٍ بلا قيمة — ${missing.join(' · ')}`);
    let n = 0;
    for (const k of allow) {
      const r = reviseKey(t, k, page[k]);
      t = r.text;
      if (r.changed) n++;
      log(`${name}: ${k} ${r.changed ? 'استُبدل' : '**بلا تغيير**'}`);
    }
    // الإسنادُ لا يُطمَس: سطرُ مراجعةٍ بعد ترويسة اعتماد اللغة نفسها.
    const hdr = `\n# الحقول ${LANG_AR}: `;
    const h = t.indexOf(hdr);
    if (h < 0) throw new Error(`${name}: لا ترويسةَ اعتمادٍ ${LANG_AR} لتقييد المراجعة`);
    const eol = t.indexOf('\n', h + 1);
    const note = `\n# ومراجعةُ ${allow.join(' · ')}: ${batch} بدرجة ${judge.batch_score}/100 (${judge.date}، الدورة ${judge.loop ?? 1} من ${judge.max_correction_loops ?? 3})`;
    t = t.slice(0, eol) + note + t.slice(eol);
    log(`${name}: مراجعةٌ — ${n} من ${allow.length} حقلاً تغيّر فعلاً`);
    write(fp, t);
    continue;
  }

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
    // مفاتيحُ مدخلٍ قائمٍ يجوز تحديثها من دفعةٍ لاحقة. مقيسةٌ على المعجم نفسه:
    // مفاتيحه en · <lang> · artikel · source · note · added · stage · origin.
    const MERGEABLE = [lang, 'artikel', 'source', 'note', 'stage', 'origin'];
    let n = 0, merged = 0;
    for (const e of entries) {
      if (!e?.en || !e?.[lang]) continue;
      if (lang === 'de' && e.artikel === undefined) throw new Error(`معجم: مدخل بلا جنس — ${e.en}`);
      if (!e.source) throw new Error(`معجم: مدخل بلا مصدر — ${e.en}`);
      const cur = have.get(e.en);
      if (cur) {
        if (cur[lang] !== e[lang]) {
          // دمجٌ بقائمةِ إذن، لا `Object.assign` (‏Semgrep على الطلب #43:
          // `insecure-object-assign`). والعلّةُ هنا عمليّة قبل أن تكون أمنيّة:
          // النسخُ الأعمى يطمس `added` — تاريخَ أول اعتمادٍ للمدخل — وينقل أي
          // مفتاحٍ كتبته مرحلةٌ سهواً إلى معجمٍ معتمد. و`en` مفتاحُ المطابقة
          // فلا يُبدَّل، و`added` تاريخٌ لا يُعاد كتابته.
          const changed = [];
          for (const k of MERGEABLE) {
            if (!Object.hasOwn(e, k) || e[k] === cur[k]) continue;
            cur[k] = e[k];                                // `k` من قائمةٍ حرفية
            changed.push(k);
          }
          const skipped = Object.keys(e).filter((k) => !MERGEABLE.includes(k) && k !== 'en');
          merged++;
          log(`معجم: دُمج ${e.en} — ${changed.join(' · ') || 'لا مفتاح تغيّر'}`
            + (skipped.length ? ` (أُهمل: ${skipped.join(' · ')})` : ''));
        }
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
    const have = new Set(tm.pairs.map((q) => `${q.en}\0${q[lang]}`));
    let n = 0;
    for (const a of spec.pairs ?? []) {
      if (!a.en || !a[lang] || have.has(`${a.en}\0${a[lang]}`)) continue;
      tm.pairs.push({ en: a.en, [lang]: a[lang], page: a.page ?? 'attractions', field: a.field ?? 'body', date: a.date ?? judge.date });
      have.add(`${a.en}\0${a[lang]}`); n++;
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
