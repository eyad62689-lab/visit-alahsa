// يثبّت نتيجة دفعة gulf-unify-1027 في معاجم zh/de/ru/ur: الصيغة الجديدة في مداخل الخليج، وملاحظات الحاكم، وتعديل
// P5 الأوردي، وسجلّ الدفعة في _meta. يُشغَّل مرةً واحدة بعد apply final.
//   node docs/gulf-unify-1027/finish-glossary.mjs <root>
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const R = process.argv[2];
if (!R) { console.error('usage: finish-glossary.mjs <root>'); process.exit(2); }
const RULING = 'O-GULF (إياد 2026-10-27، دفعة gulf-unify-1027): الخليج «الخليج العربي» في كل لغة، وينقض القرار المؤسِّس «الخليج بلا وصف». المستثنى: علم الشارع «طريق الخليج» والاسم الرسمي لمجلس التعاون. الحارس C76 (zh/de/ru/tr) وC59 (ur).';
const judge = (lg) => JSON.parse(readFileSync(`${HERE}/out/${lg}/07.json`, 'utf8'));
const append = (o, field, text) => { o[field] = o[field] ? `${o[field]} | ${text}` : text; };
const io = (lg, fn) => {
  const p = `${R}/${lg}-translation/glossary/termbase.json`;
  const tb = JSON.parse(readFileSync(p, 'utf8'));
  const j = judge(lg);
  const unplaced = fn(tb, j) ?? [];
  tb._meta.batch_rulings ??= {};
  tb._meta.batch_rulings['gulf-unify-1027'] = { ruling: RULING, score: j.score, decision: j.decision, rulings: j.rulings, unplaced_notes: unplaced };
  writeFileSync(p, JSON.stringify(tb, null, 2) + '\n', 'utf8');
  console.log(`${lg}: score ${j.score} ${j.decision}; ${unplaced.length} notes kept in _meta only`);
};
// المدخل بمطابقة حقل en حرفياً، ويُتحقق من قيمته القديمة قبل الاستبدال
const term = (tb, en, field, from) => {
  const t = tb.terms.find((x) => x.en === en);
  if (!t) throw new Error(`no term «${en}»`);
  if (from !== undefined && t[field] !== from) throw new Error(`«${en}».${field} is «${t[field]}», expected «${from}»`);
  return t;
};
const setForm = (tb, en, field, from, to) => { const t = term(tb, en, field, from); t[field] = to; append(t, 'note', `${RULING} الصيغة السابقة: «${from}».`); };

io('zh', (tb, j) => {
  setForm(tb, 'the Gulf', 'zh', '海湾', '阿拉伯湾');
  setForm(tb, 'Gulf states / Arab Gulf states', 'zh', '海湾国家 / 海湾阿拉伯国家', '阿拉伯湾国家');
  setForm(tb, 'Gulf economic agreement', 'zh', '海湾经济协议', '阿拉伯湾经济协议');
  setForm(tb, 'chandal wood (imported timber poles)', 'zh', '尚达尔木杆（chandal，海湾传统建筑常用的进口木料）', '尚达尔木杆（chandal，阿拉伯湾传统建筑常用的进口木料）');
  setForm(tb, 'one of the largest bodies of water in the Gulf region (Al-Asfar Lake size claim)', 'zh', '海湾地区最大的水域之一', '阿拉伯湾地区最大的水域之一');
  const geo = term(tb, 'geographic names in this article', 'zh');
  if (!geo.zh.endsWith('· 海湾沿岸')) throw new Error('zh geo list');
  geo.zh = geo.zh.replace(/· 海湾沿岸$/, '· 阿拉伯湾沿岸');
  // ملاحظات الحاكم: المفتاح «… (terms.N)» يحمل رقم المدخل
  const out = [];
  for (const n of j.termbase_notes ?? []) {
    const m = /terms\.(\d+)/.exec(n.key);
    if (m && tb.terms[+m[1]]) append(tb.terms[+m[1]], 'note', n.append); else out.push(n);
  }
  return out;
});
io('de', (tb, j) => {
  setForm(tb, 'the Gulf / Arabian Gulf', 'de', tb.terms.find((x) => x.en === 'the Gulf / Arabian Gulf').de,
    'der Arabische Golf · die Küste des Arabischen Golfs · die Region am Arabischen Golf · die Länder am Arabischen Golf');
  const out = [];
  for (const n of j.termbase_notes ?? []) {
    const t = tb.terms.find((x) => x.en === n.key);
    if (t) append(t, 'note', n.append); else out.push(n);
  }
  // ما لا مدخل له يُلحق بمدخل الخليج نفسه
  const gulf = term(tb, 'the Gulf / Arabian Gulf', 'de');
  for (const n of out) append(gulf, 'note', `${n.key}: ${n.append}`);
  return out;
});
io('ru', (tb, j) => {
  setForm(tb, 'the Gulf', 'ru', 'Залив / регион Залива', 'Арабский залив / регион Арабского залива');
  const gcc = tb.terms.find((x) => x.ru === 'страны Залива');
  if (!gcc) throw new Error('ru GCC term');
  append(gcc, 'note', `${RULING} الصيغة السابقة: «страны Залива».`);
  gcc.ru = 'страны Арабского залива';
  const out = [];
  for (const n of j.termbase_notes ?? []) {
    const m = /terms\.(\d+)/.exec(n.key);
    if (m && tb.terms[+m[1]]) append(tb.terms[+m[1]], 'note', n.append); else out.push(n);
  }
  return out;
});
io('ur', (tb, j) => {
  const old = tb.terms['خلیج'];
  if (!old) throw new Error('ur خلیج term');
  append(old, 'note', `${RULING} المدخل المجرّد لا يُكتب إلا داخل «خلیج عرب» و«خلیج تعاون کونسل».`);
  tb.terms['خلیج عرب'] = {
    ar: 'الخليج العربي', en: 'the Arabian Gulf', gender: old.gender, plural: null, kind: 'toponym', gloss: null,
    source: 'ur.wikipedia «خلیج عرب» (pageid 13864، قُرئ عبر MediaWiki API في 2026-10-27، مرحلة 05 لدفعة gulf-unify-1027)؛ والمعجم السابق يسجّل urdunews.com/node/734286 «خلیج عرب کے ساحلوں پر».',
    status: 'verified', note: RULING,
  };
  const rulings = tb._meta.calibration_rulings;
  const byId = (id) => rulings.find((r) => r.id === id);
  for (const a of j.amendments ?? []) { const r = byId(a.id); if (!r) throw new Error('ur ruling ' + a.id); append(r, 'ruling', a.append); }
  const out = [];
  for (const n of j.termbase_notes ?? []) {
    const t = tb.terms[n.key];
    const r = byId(n.key.split(' ')[0]);
    if (t) append(t, 'note', n.append); else if (r) append(r, 'ruling', n.append); else out.push(n);
  }
  return out;
});
