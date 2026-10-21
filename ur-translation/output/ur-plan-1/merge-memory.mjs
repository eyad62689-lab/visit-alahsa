// node merge-memory.mjs <REPO> <BATCH_DIR> <judge.json> [--write] — يدمج دفعة أوردية (المسارات أو الرئيسية) في ذاكرة الخط:
// مداخل المعجم (pending ما لم يُتحقَّق)، والأحكام (ملاحظات المرحلة 4 «[s4] Nxxx (…): …» وأحكام الحاكم)، وتعديلات الأحكام القائمة
// (base_amendments بمطابقة before حرفاً)، وأسئلة المالك في open_items، وأزواج tm، وصف scores.csv.
// بلا --write يطبع ما سيفعله فقط. يُفشل نفسه عند أي تصادم.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE, flag] = process.argv.slice(2);
const WRITE = flag === '--write';
const J = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8'));
const S4 = JSON.parse(fs.readFileSync(path.join(DIR, 'ur-04.json'), 'utf8'));
const batch = J.batch;
const today = '2026-10-21';

const rd = (p) => { const raw = fs.readFileSync(path.join(REPO, p), 'utf8'); return { raw, eol: raw.includes('\r\n') ? '\r\n' : '\n' }; };
const ser = (o, f) => JSON.stringify(o, null, 2).replace(/\n/g, f.eol) + (/\r?\n$/.test(f.raw) ? f.eol : '');
const roundTrip = (f) => { if (ser(JSON.parse(f.raw), f) !== f.raw) throw new Error('ملف لا يعيد تسلسله كما هو'); };

// 1) المعجم
const tbF = rd('ur-translation/glossary/termbase.json'); roundTrip(tbF);
const tb = JSON.parse(tbF.raw);
let added = 0;
for (const t of J.termbase_additions) {
  if (!t.ur || !t.source) throw new Error(`مدخل بلا ur أو source: ${JSON.stringify(t).slice(0, 80)}`);
  if (tb.terms[t.ur]) throw new Error(`مدخل قائم: ${t.ur}`);
  tb.terms[t.ur] = {
    ar: t.ar ?? null, en: t.en, gender: t.gender ?? null, plural: t.plural ?? null, kind: t.kind ?? 'generic',
    gloss: t.gloss ?? null, source: t.source, status: t.status === 'verified' ? 'verified' : 'pending',
    note: `${t.note ? t.note + ' · ' : ''}${batch} (${today})${t.status === 'verified' ? '' : ': pending — لا شاهد متحقَّق في الدفعة'}.`,
  };
  added++;
}
const R = tb._meta.calibration_rulings;
const ids = new Set(R.map((r) => r.id));
const push = (r) => { if (ids.has(r.id)) throw new Error(`حكم قائم: ${r.id}`); ids.add(r.id); R.push(r); };
// أحكام المرحلة 4 (ملاحظات «[s4] Nxxx (عنوان): …»)
for (const n of S4.notes) {
  // العنوان قد يحمل قوسين («(“سار”)»): ينتهي عند أول «): »
  const m = n.match(/^\[s4\] (N\d{3}) \((.*?)\): ([\s\S]*)$/);
  if (m && !ids.has(m[1])) push({ id: m[1], title: m[2], binds: batch, ruling: m[3], ruled_by: `stage 4 (${batch}, ${today})` });
}
for (const r of J.rulings) push({ ...r, ruled_by: r.ruled_by ?? `judge (${batch}, ${today})` });
// أحكام سحبها حاكم لاحق في الدفعة نفسها (حكم مرحلة 4 لم يدخل المعجم بعد، فلا base_amendment له): تُسجَّل موسومة لا تُحذف
for (const w of J.withdrawn ?? []) {
  const r = R.find((x) => x.id === w.id);
  if (!r) throw new Error(`حكم مسحوب غائب: ${w.id}`);
  if (!ids.has(w.by)) throw new Error(`الحكم الساحب غائب: ${w.by}`);
  r.status = 'withdrawn';
  r.title = `WITHDRAWN by ${w.by}: ${r.title}`;
  r.withdrawn_by = w.by;
  r.amended = [...(r.amended ?? []), `${batch} (${today}): withdrawn by ${w.by} — ${w.why}`];
}
// تعديلات الأحكام القائمة: before يطابق حرفاً
for (const a of J.base_amendments ?? []) {
  const r = R.find((x) => x.id === a.id);
  if (!r) throw new Error(`حكم غائب للتعديل: ${a.id}`);
  if (r[a.field] !== a.before) throw new Error(`before لا يطابق ${a.id}.${a.field}`);
  r[a.field] = a.after;
  r.amended = [...(r.amended ?? []), `${batch} (${today}): ${a.why}`];
}
// أسئلة المالك
const oq = J.owner_questions ?? [];
if (oq.length) tb._meta.open_items = [...(tb._meta.open_items ?? []), ...oq.map((q, i) => (typeof q === 'string' ? { id: `${batch}-OQ${i + 1}`, question: q } : { id: q.id ?? `${batch}-OQ${i + 1}`, ...q }))];

// 2) ذاكرة الترجمة
const tmF = rd('ur-translation/memory/tm.json'); roundTrip(tmF);
const tm = JSON.parse(tmF.raw);
const before = tm.pairs.length;
const PAGE = J.tm_pairs[0]?.page;
if (!J.tm_pairs.every((p) => p.page === PAGE)) throw new Error('أزواج tm بصفحات مختلفة');
tm.pairs = tm.pairs.filter((p) => p.page !== PAGE);
for (const p of J.tm_pairs) tm.pairs.push({ ...p, date: today });
// أزواج متقاعدة: تُوسم ولا تُحذف (سجلّ ما نُشر قبلُ)، بمطابقة en وur والصفحة والحقل حرفاً
for (const r of J.tm_retire ?? []) {
  const hit = tm.pairs.filter((p) => p.en === r.en && p.ur === r.ur && p.page === r.page && p.field === r.field);
  if (hit.length !== 1) throw new Error(`زوج للتقاعد غير فريد أو غائب: ${r.field} (${hit.length})`);
  hit[0].status = 'retired';
  hit[0].note = `${hit[0].note ? hit[0].note + ' · ' : ''}${batch} (${today}): ${r.reason}`;
}

// 3) الدرجات
const scF = rd('ur-translation/memory/scores.csv');
const row = J.scores_row;
if (!/^".*",\d{4}-\d{2}-\d{2},\d+,\d+,".*"$/.test(row)) throw new Error('صف scores غير مطابق لشكل الملف');

console.log(`termbase +${added} (pending)، أحكام ${R.length} (+${J.rulings.length} حاكم + المرحلة 4)، تعديلات ${J.base_amendments?.length ?? 0}، أسئلة ${oq.length}؛ tm ${before} → ${tm.pairs.length}`);
if (WRITE) {
  fs.writeFileSync(path.join(REPO, 'ur-translation/glossary/termbase.json'), ser(tb, tbF));
  fs.writeFileSync(path.join(REPO, 'ur-translation/memory/tm.json'), ser(tm, tmF));
  fs.writeFileSync(path.join(REPO, 'ur-translation/memory/scores.csv'), scF.raw + (scF.raw.endsWith(scF.eol) ? '' : scF.eol) + row + scF.eol);
  console.log('written');
}
