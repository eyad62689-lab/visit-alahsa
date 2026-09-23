#!/usr/bin/env node
// فاحص آلي لمخرج كل مرحلة في دفعات ج9 (de-plan-1/2/3).
// الاستعمال: node <BATCH>/verify-stage.mjs <BATCH> <الملف مثل de-03.json>
// يخرج بـ0 عند ✓ وبـ1 عند أي إخفاق، ويطبع كل إخفاق بمفتاحه.
import fs from 'node:fs';
import path from 'node:path';

const BATCH = process.argv[2];
const FILE = process.argv[3];
if (!BATCH || !FILE) { console.error('usage: node verify-stage.mjs <BATCH_DIR> <de-0N.json>'); process.exit(1); }

const pack = JSON.parse(fs.readFileSync(path.join(BATCH, 'pack.json'), 'utf8'));
const out = JSON.parse(fs.readFileSync(path.join(BATCH, FILE), 'utf8'));
const errs = [];
const warn = [];

const NBSP = ' ';
const EMDASH = '—';
const THIN = ' ';
const NNBSP = ' ';
const ARROW = '↗';

const packKeys = Object.keys(pack.strings);
const gotKeys = Object.keys(out.strings ?? {});

if (out.batch !== pack.batch) errs.push(`batch: «${out.batch}» ≠ «${pack.batch}»`);
if (!Number.isInteger(out.stage)) errs.push('stage ليس عدداً صحيحاً');
if (!Array.isArray(out.notes)) errs.push('notes ليست مصفوفة');
if (!Array.isArray(out.termbase_additions)) errs.push('termbase_additions ليست مصفوفة');

// (1) المفاتيح: العدد والترتيب
if (gotKeys.length !== packKeys.length) errs.push(`عدد المفاتيح ${gotKeys.length} ≠ ${packKeys.length}`);
for (const k of packKeys) if (!(k in (out.strings ?? {}))) errs.push(`مفتاح ناقص: ${k}`);
for (const k of gotKeys) if (!packKeys.includes(k)) errs.push(`مفتاح دخيل: ${k}`);
for (let i = 0; i < Math.min(gotKeys.length, packKeys.length); i++) {
  if (gotKeys[i] !== packKeys[i]) { errs.push(`ترتيب المفاتيح اختلّ عند ${i}: «${gotKeys[i]}» بدل «${packKeys[i]}»`); break; }
}

const DENGLISCH = /(?<![A-Za-zÄÖÜäöüß-])(Events?|Spots?|Locations?|Must-see|Hotspots?|Guide|Maps?|Vibe|Trip)(?![A-Za-zÄÖÜäöüß])/;
let highlightCount = 0;

for (const k of packKeys) {
  const v = out.strings?.[k];
  if (typeof v !== 'string') { if (k in (out.strings ?? {})) errs.push(`${k}: ليست سلسلة`); continue; }
  const src = pack.strings[k];

  // (2) محارف ممنوعة
  if (v.includes(NBSP)) errs.push(`${k}: U+00A0 (مسافة غير فاصلة) — تُفشل الفاحص بصمت`);
  if (v.includes(EMDASH)) errs.push(`${k}: U+2014 (شرطة طويلة) — الألمانية U+2013`);
  if (v.includes(THIN) || v.includes(NNBSP)) errs.push(`${k}: مسافة رفيعة (U+2009/U+202F)`);
  if (/[؀-ۿ]/.test(v)) errs.push(`${k}: محرف عربي في نص ألماني`);
  if (/[一-鿿]/.test(v)) errs.push(`${k}: محرف صيني في نص ألماني`);
  if (/[Ѐ-ӿ]/.test(v)) errs.push(`${k}: محرف سيريلي في نص ألماني`);

  // (3) تهجئة وقرارات مثبَّتة
  if (/(?<![A-Za-z])Souq/.test(v)) errs.push(`${k}: «Souq» — القرار الألماني «Souk» (C18 يُفشل البناء)`);
  if (/gr[oö]ß(?:te|ten|ter|tem|tes)?\s*Palmenoase/i.test(v) || /Palmenoase/.test(v)) errs.push(`${k}: «Palmenoase» — C15 يُفشل البناء؛ الصيغة «die größte Oase der Welt»`);
  if (/(?<![A-Za-zÄÖÜäöüß])Zitrone/i.test(v)) errs.push(`${k}: «Zitrone» — اللومي «die Limette» (قرار المالك)`);
  const dg = v.match(DENGLISCH);
  if (dg && !/Google Maps/.test(v)) errs.push(`${k}: Denglisch «${dg[1]}»`);
  if (/(?<![A-Za-zÄÖÜäöüß])Highlights?(?![A-Za-zÄÖÜäöüß])/.test(v)) highlightCount++;
  if (/(?<![A-Za-zÄÖÜäöüß])(?:du|dein|deine|deinen|deiner|dich|dir)(?![A-Za-zÄÖÜäöüß])/.test(v)) warn.push(`${k}: احتمال «du» — الموقع كله Sie`);

  // (4) ماركداون ممنوع (الحقول تُصيَّر نصاً خاماً)
  if (/\[[^\]]*\]\([^)]*\)/.test(v)) errs.push(`${k}: رابط ماركداون في حقل نصّ خام`);
  if (/\*\*[^*]+\*\*/.test(v)) errs.push(`${k}: تشديد ماركداون في حقل نصّ خام`);

  // (5) النائب ${rev} — يُنقل حرفياً بمحارفه الستة
  const revSrc = (src.en.match(/\$\{rev\}/g) ?? []).length;
  const revGot = (v.match(/\$\{rev\}/g) ?? []).length;
  if (revSrc !== revGot) errs.push(`${k}: النائب \${rev} ورد ${revGot} مرة والمصدر ${revSrc}`);

  // (6) السهم ↗ بمسافة عادية واحدة قبله
  const arrSrc = (src.en.match(/↗/g) ?? []).length;
  const arrGot = (v.match(/↗/g) ?? []).length;
  if (arrSrc !== arrGot) errs.push(`${k}: «${ARROW}» ورد ${arrGot} والمصدر ${arrSrc}`);
  if (arrGot && !/[^\s ] ↗/.test(v)) errs.push(`${k}: «${ARROW}» بلا مسافة عادية واحدة قبله`);

  // (7) سياج الأرقام. الوقت يُعامَل خاصةً: الألمانية تحوّل 12 ساعة إلى 24 (10 pm ⇐ 22:00)
  //     والدقائق «00» أثرُ الساعة الرقمية — فالساعة تُقبل إن وردت أو إن وردت ناقصةً 12،
  //     والدقيقة إن وردت أو كانت 00. وما عدا الأوقات يُطابَق حرفياً بمصدر مفتاحه.
  const srcAll = src.en + ' ' + (src.ar ?? '');
  const srcNums = new Set([...srcAll.matchAll(/\d+/g)].map((m) => m[0]));
  const srcMinutes = new Set(['00', ...[...srcAll.matchAll(/\d{1,2}:(\d{2})/g)].map((m) => m[1])]);
  const hourOk = (h) => srcNums.has(h) || srcNums.has(String(Number(h))) || srcNums.has(String(Number(h) - 12));
  let rest = v;
  for (const m of v.matchAll(/(\d{1,2}):(\d{2})/g)) {
    if (!hourOk(m[1])) errs.push(`${k}: الساعة «${m[1]}» ليست في مصدر مفتاحه (ولا هي ساعةٌ فيه + 12)`);
    if (!srcMinutes.has(m[2])) errs.push(`${k}: الدقيقة «${m[2]}» ليست في مصدر مفتاحه`);
    rest = rest.split(m[0]).join(' ');
  }
  for (const m of rest.matchAll(/\d+/g)) {
    if (!srcNums.has(m[0])) errs.push(`${k}: الرقم «${m[0]}» ليس في مصدر مفتاحه`);
  }
}

if (highlightCount > 1) errs.push(`«Highlight» ${highlightCount} مرات — المسموح مرة واحدة على الأكثر في الصفحة`);

// (8) مخرجات خاصة بالمرحلة
if (out.stage === 4) {
  const ss = out.stage_specific ?? {};
  if (!Array.isArray(ss.changed)) errs.push('المرحلة 4: stage_specific.changed ناقصة');
  if (!Array.isArray(ss.fence_removed)) errs.push('المرحلة 4: stage_specific.fence_removed ناقصة');
  for (const t of out.termbase_additions ?? []) {
    if (!t.source) errs.push(`المرحلة 4: مدخل معجم بلا source — «${t.en ?? '?'}»`);
    if (t.status !== 'pending' && !t.artikel) errs.push(`المرحلة 4: مدخل معجم بلا artikel وليس pending — «${t.en ?? '?'}»`);
  }
}
if (out.stage === 5) {
  const cl = out.stage_specific?.checklist;
  if (!cl || typeof cl !== 'object') errs.push('المرحلة 5: stage_specific.checklist ناقصة');
  else {
    const bad = Object.entries(cl).filter(([, r]) => (typeof r === 'string' ? r : r?.result) === 'fail');
    if (bad.length) errs.push(`المرحلة 5: بنود checklist مخفقة: ${bad.map((e) => e[0]).join(', ')}`);
  }
}

for (const w of warn) console.log('⚠ ' + w);
if (errs.length) { console.error('✗ ' + errs.length + ' إخفاق:'); for (const e of errs) console.error('  - ' + e); process.exit(1); }
console.log(`✓ ${FILE}: ${gotKeys.length} مفتاحاً، الترتيب سليم، لا محارف ممنوعة، سياج الأرقام نظيف.`);
