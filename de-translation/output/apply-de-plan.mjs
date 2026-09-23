#!/usr/bin/env node
// ج9 — تطبيق مخرج خط de-translation-pipeline على المستودع.
// الاستعمال: node apply.mjs [stageFile=de-05.json]
// يكتب: src/i18n/ui.ts (25 مفتاح plan.*) · src/components/views/PlanTripView.astro (كتلة de)
//        · de-translation/glossary/termbase.json · de-translation/memory/tm.json
// لا يمسّ scores.csv — ذاك سطر الحاكم بعد المرحلة 7.

import fs from 'node:fs';
import path from 'node:path';

const REPO = 'C:/Users/truyr/node-store/va-wt/de-plan';
const STAGE = process.argv[2] || 'de-05.json';
const TODAY = '2026-09-23';
const OUT = path.join(REPO, 'de-translation/output');

const read = (p) => fs.readFileSync(p, 'utf8');
const readJSON = (p) => JSON.parse(read(p));

const batch = {};
for (const n of [1, 2, 3]) {
  const p = path.join(OUT, `de-plan-${n}`, STAGE);
  if (!fs.existsSync(p)) throw new Error(`مفقود: ${p}`);
  batch[n] = readJSON(p);
  const packKeys = Object.keys(readJSON(path.join(OUT, `de-plan-${n}`, 'pack.json')).strings);
  const got = Object.keys(batch[n].strings);
  if (got.length !== packKeys.length) throw new Error(`de-plan-${n}: ${got.length} مفتاحاً والمطلوب ${packKeys.length}`);
  for (const k of packKeys) if (!(k in batch[n].strings)) throw new Error(`de-plan-${n}: مفتاح ناقص ${k}`);
}

// ── مساعدات الاقتباس ───────────────────────────────────────────────────────
const sq = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const lit = (s) => {
  const v = String(s);
  if (v.includes('${rev}')) {
    // قالب نصّي: النائب ${rev} يُنقل حرفياً، ولا يُهرَّب
    const esc = v.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{(?!rev\})/g, '\\${');
    return '`' + esc + '`';
  }
  return sq(v);
};

const assertClean = (label, v) => {
  const s = String(v);
  if (s.includes('\u2014')) throw new Error(`${label}: U+2014 ممنوعة (C17)`);
  if (s.includes('\u00A0')) throw new Error(`${label}: U+00A0 ممنوعة`);
  if (/Souq/.test(s)) throw new Error(`${label}: «Souq» ممنوعة (C18)`);
  if (s.includes('\n')) throw new Error(`${label}: سطر جديد داخل سلسلة`);
};

// ── 1) src/i18n/ui.ts ──────────────────────────────────────────────────────
{
  const file = path.join(REPO, 'src/i18n/ui.ts');
  const text = read(file);
  const EOL = text.includes('\r\n') ? '\r\n' : '\n';

  const deStart = text.indexOf(`${EOL}  de: {`);
  if (deStart < 0) throw new Error('ui.ts: لم أجد بداية كتلة de');
  const closeTok = `${EOL}  } as Record<string, string>,`;
  const deEnd = text.indexOf(closeTok, deStart);
  if (deEnd < 0) throw new Error('ui.ts: لم أجد نهاية كتلة de');
  const deBlock = text.slice(deStart, deEnd);

  const s = batch[1].strings;
  for (const [k, v] of Object.entries(s)) {
    assertClean(`ui.de ${k}`, v);
    if (deBlock.includes(`'${k}':`)) throw new Error(`ui.ts: المفتاح ${k} موجود سلفاً في كتلة de`);
  }

  const lines = [
    `    // ── دفعة صفحتَي الخطة (ج9) — خط de-translation-pipeline، ${TODAY} ──`,
    `    // 25 مفتاح plan.* لصفحة /de/plan/. المنشوران سابقاً في هذه الكتلة ولا يُكرَّران:`,
    `    // plan.printNote (دفعة 2026-09-03) و plan.copied (دفعة الواجهة العامة A-ui-de).`,
    `    // plan.savedTwo و plan.savedFew لا يُصيَّران بالألمانية أبداً —`,
    `    // Intl.PluralRules('de') يعيد one/other فقط — ويبقيان لئلا يتراجعا للإنجليزية.`,
    ...Object.entries(s).map(([k, v]) => `    ${sq(k)}: ${lit(v)},`),
  ];

  const next = text.slice(0, deEnd) + EOL + lines.join(EOL) + text.slice(deEnd);
  fs.writeFileSync(file, next);
  console.log(`✓ ui.ts: أُضيف ${Object.keys(s).length} مفتاحاً إلى كتلة de (EOL=${EOL === '\r\n' ? 'CRLF' : 'LF'})`);
}

// ── 2) src/components/views/PlanTripView.astro ────────────────────────────
{
  const file = path.join(REPO, 'src/components/views/PlanTripView.astro');
  const text = read(file);
  const EOL = text.includes('\r\n') ? '\r\n' : '\n';

  if (/^  de: \{/m.test(text)) throw new Error('PlanTripView: كتلة de موجودة سلفاً');
  const anchor = `${EOL}  ru: {`;
  const at = text.indexOf(anchor);
  if (at < 0) throw new Error('PlanTripView: لم أجد مرساة كتلة ru');

  const s2 = batch[2].strings;
  const s3 = batch[3].strings;
  for (const [k, v] of Object.entries({ ...s2, ...s3 })) assertClean(`PlanTripView ${k}`, v);

  const g = (o, k) => {
    if (!(k in o)) throw new Error(`مفتاح مفقود: ${k}`);
    return o[k];
  };
  const ICONS = ['air', 'road', 'rail'];
  const L = [];
  L.push('  de: {');
  L.push('    // الكتلة الألمانية — خط de-translation-pipeline (ج9: de-plan-2 المتن · de-plan-3 الأسئلة)');
  L.push(`    eyebrow: ${lit(g(s2, 'eyebrow'))},`);
  L.push(`    title: ${lit(g(s2, 'title'))},`);
  L.push(`    lead: ${lit(g(s2, 'lead'))},`);
  L.push(`    getThereH: ${lit(g(s2, 'getThereH'))},`);
  L.push('    getThere: [');
  ICONS.forEach((icon, i) => {
    L.push(`      { icon: '${icon}', h: ${lit(g(s2, `getThere.${i}.h`))}, d: ${lit(g(s2, `getThere.${i}.d`))} },`);
  });
  L.push('    ],');
  L.push(`    practicalH: ${lit(g(s2, 'practicalH'))},`);
  L.push('    practical: [');
  for (let i = 0; i < 4; i++) {
    L.push(`      { k: ${lit(g(s2, `practical.${i}.k`))}, v: ${lit(g(s2, `practical.${i}.v`))} },`);
  }
  L.push('    ],');
  L.push(`    tipsH: ${lit(g(s2, 'tipsH'))},`);
  L.push(`    tipsLead: ${lit(g(s2, 'tipsLead'))},`);
  L.push('    tips: [');
  for (let i = 0; i < 4; i++) {
    L.push(`      { h: ${lit(g(s2, `tips.${i}.h`))}, d: ${lit(g(s2, `tips.${i}.d`))} },`);
  }
  L.push('    ],');
  L.push(`    faqH: ${lit(g(s2, 'faqH'))},`);
  L.push('    faq: [');
  for (let i = 0; i < 13; i++) {
    L.push(`      { q: ${lit(g(s3, `faq.${i}.q`))}, a: ${lit(g(s3, `faq.${i}.a`))} },`);
  }
  L.push('    ],');
  L.push(`    ctaH: ${lit(g(s2, 'ctaH'))},`);
  L.push(`    ctaD: ${lit(g(s2, 'ctaD'))},`);
  L.push(`    ctaBrowse: ${lit(g(s2, 'ctaBrowse'))},`);
  L.push(`    ctaTrip: ${lit(g(s2, 'ctaTrip'))},`);
  L.push(`    seoTitle: ${lit(g(s2, 'seoTitle'))},`);
  L.push(`    seoDesc: ${lit(g(s2, 'seoDesc'))},`);
  L.push('  },');

  const next = text.slice(0, at) + EOL + L.join(EOL) + text.slice(at);
  fs.writeFileSync(file, next);
  console.log(`✓ PlanTripView.astro: كتلة de بـ${Object.keys(s2).length + Object.keys(s3).length} سلسلة`);
}

// ── 3) termbase ────────────────────────────────────────────────────────────
{
  const file = path.join(REPO, 'de-translation/glossary/termbase.json');
  const tb = readJSON(file);
  const before = tb.terms.length;
  const key = (t) => `${(t.en || '').trim().toLowerCase()}|${(t.de || '').trim().toLowerCase()}`;
  const seen = new Set(tb.terms.map(key));
  let added = 0;
  for (const n of [1, 2, 3]) {
    for (const t of batch[n].termbase_additions || []) {
      if (!t || !t.de) continue;
      if (seen.has(key(t))) continue;
      if (!t.source) throw new Error(`مدخل معجم بلا مصدر: ${t.de}`);
      if (t.status !== 'pending' && !t.artikel) throw new Error(`مدخل معجم بلا جنس: ${t.de}`);
      seen.add(key(t));
      tb.terms.push({ ...t, added: TODAY, batch: `de-plan-${n}` });
      added++;
    }
  }
  fs.writeFileSync(file, JSON.stringify(tb, null, 2) + '\n');
  console.log(`✓ termbase: ${before} ← ${tb.terms.length} (+${added})`);
}

// ── 4) ذاكرة الترجمة ───────────────────────────────────────────────────────
{
  const file = path.join(REPO, 'de-translation/memory/tm.json');
  const tm = readJSON(file);
  const before = tm.pairs.length;
  const seen = new Set(tm.pairs.map((p) => `${p.en}|${p.de}`));
  const page = { 1: 'plan', 2: 'plan-your-trip', 3: 'plan-your-trip' };
  for (const n of [1, 2, 3]) {
    const pack = readJSON(path.join(OUT, `de-plan-${n}`, 'pack.json')).strings;
    for (const [k, de] of Object.entries(batch[n].strings)) {
      const en = pack[k]?.en;
      if (!en) continue;
      const id = `${en}|${de}`;
      if (seen.has(id)) continue;
      seen.add(id);
      tm.pairs.push({ en, de, page: page[n], field: k, date: TODAY });
    }
  }
  fs.writeFileSync(file, JSON.stringify(tm, null, 2) + '\n');
  console.log(`✓ tm.json: ${before} ← ${tm.pairs.length} زوجاً`);
}

console.log('تم.');
