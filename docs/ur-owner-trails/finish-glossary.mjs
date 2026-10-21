// يسجّل مخرج دفعة ur-owner-trails في ذاكرة الخط الأوردي، بعد apply.mjs:
//   - tm.json: زوج كل موضع تغيّر نصه (ur = المنشور السابق) يوسم superseded، ويُضاف زوج بالنص المعتمد.
//   - scores.csv: سطر الدفعة من 07.json.
//   - termbase.json:
//       · أحكام الحاكم الجديدة (N721–N724) في _meta.calibration_rulings بعد آخر حكم؛
//       · حكمان بقرار المالك يسجّلهما المنسّق: N725 (qarah-title يبقى) وN726 (حيّ 7st، نُفّذ في #211)؛
//       · تُرفع من _meta.open_items البنود التي أغلقتها: OQ1–OQ4، وqarah-title، وur-dining-1-OQ1، وmap-touch-verb
//         (أغلقه N720 في #211 ولم يُرفع حينها)؛
//       · ملاحظة مؤرّخة على مداخل «کارگاہ» و«کارخانہ» و«دوغہ الغراش».
// كل عملية تتحقق مما تجده قبل التغيير، وأي عدم تطابق يُخفق قبل كتابة أي ملف.
//   node docs/ur-owner-trails/finish-glossary.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2];
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: finish-glossary.mjs <root> [--dry]'); process.exit(2); }
const DATE = '2026-10-21';
const fails = [], writes = new Map();
const rd = (rel) => readFileSync(path.join(ROOT, rel), 'utf8');
const crlfJson = (o) => JSON.stringify(o, null, 2).split('\n').join('\r\n') + '\r\n';
const csvq = (s) => '"' + String(s).replace(/"/g, '""') + '"';
const load = (rel) => {
  const raw = rd(rel), o = JSON.parse(raw);
  if (crlfJson(o) !== raw) fails.push(`${rel}: not a CRLF JSON.stringify(…, 2) file`);
  return o;
};

const fin = JSON.parse(readFileSync(`${HERE}/out/final.json`, 'utf8')).positions;
const j = JSON.parse(readFileSync(`${HERE}/out/07.json`, 'utf8'));
const pack = JSON.parse(rd('ur-translation/output/ur-owner-trails/pack.json')).positions;
if (j.decision !== 'APPROVE' || !(j.score >= 90)) fails.push('07 is not an approval ≥ 90');

// tm
const TM = 'ur-translation/memory/tm.json';
const tm = load(TM);
let sup = 0, add = 0;
for (const k of pack) {
  const pos = fin.find((x) => x.id === k.id);
  if (!pos || pos.current !== k.current) { fails.push(`${k.id}: final.json does not match the pack`); continue; }
  if (pos.proposed === pos.current) continue;
  const file = rd(k.file);
  if (!file.includes(pos.proposed.replace(/\\/g, '\\\\').replace(/"/g, '\\"'))) fails.push(`${k.id}: the final text is not in ${k.file} (run apply.mjs first)`);
  const old = tm.pairs.filter((p) => p.status !== 'superseded' && p.ur === k.current);
  if (old.length !== 1) fails.push(`${TM}: ${old.length} live pairs carry the published text of ${k.id} (expected 1)`);
  for (const p of old) { p.status = 'superseded'; p.superseded_on = DATE; sup++; }
  if (old[0]) { tm.pairs.push({ en: old[0].en, ur: pos.proposed, page: old[0].page, field: old[0].field, date: DATE, note: 'ur-owner-trails (owner decisions OQ1–OQ3)' }); add++; }
}
writes.set(TM, crlfJson(tm));

// scores
const SC = 'ur-translation/memory/scores.csv';
const sc = rd(SC);
if (!sc.endsWith('\r\n')) fails.push(`${SC}: does not end in CRLF`);
const axes = Object.entries(j.breakdown ?? {}).filter(([x]) => x !== 'total').slice(0, 5).map(([, v]) => (typeof v === 'object' ? v.points : v)).join('/');
const edits = (j.judge_edits ?? []).length;
writes.set(SC, sc + [csvq(`ur-owner-trails: ${pack.length} positions (duqat-algharash summary/body «کارگاہ»; trails Uqair «سنوارا ہے»; Jawatha honorifics) — owner decisions ${DATE} on OQ1–OQ4`), DATE, 1, j.score,
  csvq(`APPROVE (${axes}; ${edits} judge edit${edits === 1 ? '' : 's'}; blind reader 0 serious; TM ${sup} superseded, ${add} added; rulings N721–N726; open items closed: OQ1–OQ4, qarah-title, ur-dining-1-OQ1, map-touch-verb)`)].join(',') + '\r\n');

// termbase
const TB = 'ur-translation/glossary/termbase.json';
const tb = load(TB);
const rules = tb._meta.calibration_rulings;
const NEW = ['N721', 'N722', 'N723', 'N724'];
const fromJudge = NEW.map((id) => (j.new_rulings ?? []).find((r) => r.id === id));
fromJudge.forEach((r, i) => { if (!r || !r.title || !r.ruling) fails.push(`07.json: no complete ${NEW[i]}`); });
if (rules.some((r) => /^N72[1-6]$/.test(r.id))) fails.push(`${TB}: N721–N726 already present`);
if (rules.at(-1)?.id !== 'N720') fails.push(`${TB}: the last ruling is ${rules.at(-1)?.id}, expected N720`);
for (const r of fromJudge.filter(Boolean)) {
  const e = { id: r.id, title: r.title, binds: r.binds, ruling: r.ruling };
  if (r.guard) e.guard = r.guard;
  e.ruled_by = `Judge, ur-owner-trails, ${DATE} (owner's decision of ${DATE})`;
  rules.push(e);
}
rules.push({
  id: 'N725', title: 'Home chapter 3 title (qarah.title): kept as published',
  binds: 'HOME_COPY.ur.qarah.title.',
  ruling: `OWNER DECIDED ${DATE} (DECISIONS «Owner's answers on 2026-10-21»: "Home chapter 3 title: keep the approved text"). «جبل القارہ: دن کا وقت اپنے ہاتھ سے بدلیں» stays byte for byte. The recorded candidate of N621/N631 («… پٹی سرکائیں اور …») is not taken. The open item qarah-title closes.`,
  guard: 'For the proofreader: HOME_COPY.ur.qarah.title is unchanged.',
  ruled_by: `Owner's decision of ${DATE}, recorded by the coordinator (ur-owner-trails)`,
});
rules.push({
  id: 'N726', title: 'The 7st card district (ur-dining-1-OQ1): North Al-Rifaa, beside Qasr Ibrahim, the "7st Al-Bait" branch',
  binds: 'src/content/dining/7st.md (area_ur, and any future body_ur); the dining FAQ line naming 7st.',
  ruling: `OWNER DECIDED ${DATE}: 7st is in North Al-Rifaa, beside Qasr Ibrahim, and is the "7st Al-Bait" branch — neither option as written (A moved the card to Al-Koot; B made it another branch). The source body was corrected in #211 (7st-touch; Al-Koot is the neighbouring quarter); the card's area line «محلہ شمالی الرفعہ، ہفوف» and the FAQ were already right. A future Urdu body follows the corrected source. The open item ur-dining-1-OQ1 closes.`,
  guard: 'For the proofreader: no Urdu 7st text places the café in Al-Koot.',
  ruled_by: `Owner's decision of ${DATE}, recorded by the coordinator (ur-owner-trails)`,
});
const CLOSE = ['OQ1', 'OQ2', 'OQ3', 'OQ4', 'qarah-title', 'ur-dining-1-OQ1', 'map-touch-verb'];
const before = tb._meta.open_items.length;
for (const id of CLOSE) if (!tb._meta.open_items.some((o) => o.id === id)) fails.push(`${TB}: open item ${id} not found`);
tb._meta.open_items = tb._meta.open_items.filter((o) => !CLOSE.includes(o.id));
if (tb._meta.open_items.length !== before - CLOSE.length) fails.push(`${TB}: open items not removed exactly`);
const note = (key, text) => {
  const t = tb.terms[key];
  if (!t) { fails.push(`${TB}: no entry ${key}`); return; }
  t.note = (t.note ? t.note + ' ‖ ' : '') + text;
};
note('کارگاہ', `OWNER ${DATE} (N721, OQ1 A): «کارگاہ» site-wide for the Al-Gharash pottery workshop — trails and the duqat-algharash summary and body (gloss «(یعنی الغراش کی کارگاہ)»). Gender: feminine — Platts p. 800 "kār-gāh … s.f. A place for work; a workshop"; Rekhta tags it masculine but its own Meer citation agrees in the feminine («یہ کارگاہ ساری …») (ur-owner-trails judge, ${DATE}). Status stays pending until a dictionary page is read with an HTTP 200 record.`);
note('کارخانہ', `OWNER ${DATE} (N721): no longer used for the Al-Gharash workshop; N152 A is superseded there.`);
note('دوغہ الغراش', `OWNER ${DATE} (N721): the bracket gloss is now «(یعنی الغراش کی کارگاہ)».`);
writes.set(TB, crlfJson(tb));

if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
if (!DRY) for (const [rel, s] of writes) writeFileSync(path.join(ROOT, rel), s, 'utf8');
console.log(`tm ${sup} superseded, ${add} added; rulings +${fromJudge.length + 2}; open items ${before} → ${tb._meta.open_items.length} (${tb._meta.open_items.map((o) => o.id).join(', ')})`);
console.log(`${DRY ? 'DRY ' : ''}${writes.size} files: ${[...writes.keys()].join(', ')}`);
