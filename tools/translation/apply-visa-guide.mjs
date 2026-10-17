// تطبيق دفعة «دليل التأشيرات» للغةٍ اعتمدها حاكم خطّها (2026-10-17).
//
// التشغيل من جذر المستودع بعد APPROVE:
//   node --experimental-strip-types tools/translation/apply-visa-guide.mjs <zh|de|ru|ur>
//
// يقرأ `<lang>-translation/output/visa-guide/judge.json` (final_strings الـ138 بمفاتيح pack.json)
// ويكتب:
//   1. src/data/visa-guide.<lang>.ts — سجلّ VisaGuideContent مولَّد (لا يُحرَّر يدوياً)، والروابط
//      الداخلية محوَّلة إلى لغة الصفحة حيث صفحتها مبنية وإلا الإنجليزية (لا رابط إلى صفحة غير مبنية).
//   2. src/data/visa-guide.ts — سطر الاستيراد ومدخل السجلّ عند العلامتين @visa-lang-*.
//   3. src/lib/visa-guide.mjs — VISA_GUIDE_ALT وVISA_LANGS وVISA_UPDATED_LINE وVISA_FEES_LINE.
//   4. src/pages/<lang>/visa-guide/index.astro.
//   5. src/i18n/ui.ts — مفتاحا foot.l.visa وplan.visa في كتلة اللغة (بنهايات الأسطر كما في الملف).
//   6. <lang>-translation/memory/tm.json وscores.csv وglossary/termbase.json (إضافات الحاكم).
// يتوقف عند أول نقص: مفتاح غائب، رقم عربي-هندي، عملة، عبارة شك، أو رابط خارجي ليس من الرسمية.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const lang = process.argv[2];
if (!['zh', 'de', 'ru', 'ur'].includes(lang)) { console.error('usage: apply-visa-guide.mjs <zh|de|ru|ur>'); process.exit(2); }
const OUT = path.join(ROOT, `${lang}-translation/output/visa-guide`);
const read = (p) => readFileSync(p, 'utf8');
const readJson = (p) => JSON.parse(read(p));

const pack = readJson(path.join(OUT, 'pack.json'));
const judge = readJson(path.join(OUT, 'judge.json'));
if (judge.decision !== 'APPROVE') { console.error(`judge.json: القرار ${judge.decision} — لا تطبيق بلا APPROVE`); process.exit(1); }
const S = judge.final_strings;
const keys = Object.keys(pack.strings);
const missing = keys.filter((k) => typeof S[k] !== 'string' || !S[k].trim());
if (missing.length) { console.error(`final_strings ناقصة ${missing.length} مفتاحاً: ${missing.slice(0, 5).join(', ')}`); process.exit(1); }
const extra = Object.keys(S).filter((k) => !pack.strings[k]);
if (extra.length) { console.error(`final_strings تحمل مفاتيح ليست في pack.json: ${extra.slice(0, 5).join(', ')}`); process.exit(1); }

// ── فحوص السلامة على النصوص قبل أي كتابة ──
const { VISA_OFFICIAL_LINKS, VISA_FORBIDDEN_PHRASES, visaLimits } = await import(path.join(ROOT, 'src/lib/visa-guide.mjs'));
const VISA_LIMITS = visaLimits(lang);
const official = new Set(Object.values(VISA_OFFICIAL_LINKS));
const problems = [];
for (const [k, v] of Object.entries(S)) {
  if (/[٠-٩۰-۹]/.test(v)) problems.push(`${k}: رقم غير لاتيني`);
  if (/ريال|دولار|\bSAR\b|\bUSD\b|[$€£¥]|риал|доллар|Riyal|Dollar|里亚尔|美元|ریال|ڈالر/i.test(v)) problems.push(`${k}: عملة أو رسم`);
  for (const ph of VISA_FORBIDDEN_PHRASES) if (v.toLowerCase().includes(ph.toLowerCase())) problems.push(`${k}: عبارة شك «${ph}»`);
  if (/ /.test(v)) problems.push(`${k}: U+00A0`);
  for (const m of v.matchAll(/\]\((https?:\/\/[^)]+)\)/g)) if (!official.has(m[1])) problems.push(`${k}: رابط خارجي ليس من الرسمية ${m[1]}`);
  const enLinks = [...pack.strings[k].en.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
  const tgLinks = [...v.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]);
  if (enLinks.join('|') !== tgLinks.join('|')) problems.push(`${k}: روابط النص لا تطابق المصدر (${enLinks.length} ≠ ${tgLinks.length} أو href مختلف)`);
}
const tl = [...S['seo.title']].length, dl = [...S['seo.description']].length;
if (tl > VISA_LIMITS.titleMax) problems.push(`seo.title ${tl} حرفاً > ${VISA_LIMITS.titleMax}`);
if (dl < VISA_LIMITS.descMin || dl > VISA_LIMITS.descMax) problems.push(`seo.description ${dl} حرفاً خارج ${VISA_LIMITS.descMin}–${VISA_LIMITS.descMax}`);
if (lang === 'ur') for (const [k, v] of Object.entries(S)) if (/[يكة]/.test(v)) problems.push(`${k}: حرف عربي (ي/ك/ة) في نص أوردي`);
if (problems.length) { console.error('إخفاق الفحص قبل التطبيق:\n - ' + problems.join('\n - ')); process.exit(1); }

// ── تحويل الروابط الداخلية إلى لغة الصفحة ──
const BUILT = { zh: ['attractions', 'events', 'stay', 'plan-your-trip', 'plan', 'map'], de: ['attractions', 'events', 'stay', 'plan-your-trip', 'plan', 'map'], ru: ['attractions', 'events', 'stay', 'plan-your-trip', 'plan', 'map'], ur: ['attractions', 'map'] }[lang];
const mapHref = (href) => {
  if (/^https?:\/\//.test(href)) return href;
  const m = href.match(/^\/en\/([^/#]+)\/(#.*)?$/);
  if (!m) throw new Error(`رابط داخلي غير متوقع: ${href}`);
  return BUILT.includes(m[1]) ? `/${lang}/${m[1]}/${m[2] ?? ''}` : href;
};
const parseRich = (s) => {
  const parts = [];
  let i = 0;
  for (const m of s.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    if (m.index > i) parts.push(s.slice(i, m.index));
    parts.push({ t: m[1], href: mapHref(m[2]) });
    i = m.index + m[0].length;
  }
  if (i < s.length) parts.push(s.slice(i));
  return parts;
};

// ── بناء السجلّ من بنية pack.json (لا استيراد لـvisa-guide.ts: Node لا يحلّ استيراداً بلا امتداد) ──
const ROUTE_IDS = ['tourist', 'gcc', 'umrah', 'stopover', 'family', 'business', 'package', 'uk'];
const LINK_ROWS = ['tourist', 'gcc', 'umrah', 'stopover', 'family', 'business', 'package', 'uk', 'causeway'];
const idx = (prefix) => [...new Set(keys.filter((k) => k.startsWith(prefix)).map((k) => Number(k.slice(prefix.length).split('.')[0])))].sort((a, b) => a - b);
const C = {
  seo: { title: S['seo.title'], description: S['seo.description'] },
  h1: S.h1, lead: S.lead, feesLine: S.feesLine, verifyLine: S.verifyLine, updatedLine: S.updatedLine,
  intro: { h: S['intro.h'], parts: parseRich(S['intro.parts']) },
  table: {
    h: S['table.h'], caption: S['table.caption'],
    head: idx('table.head.').map((i) => S[`table.head.${i}`]),
    rows: idx('table.rows.').map((i) => idx(`table.rows.${i}.`).map((j) => S[`table.rows.${i}.${j}`])),
  },
  routes: ROUTE_IDS.map((id) => ({
    id, h: S[`routes.${id}.h`],
    who: S[`routes.${id}.who.label`] ? { label: S[`routes.${id}.who.label`], text: S[`routes.${id}.who.text`] } : { text: S[`routes.${id}.who.text`] },
    ...(S[`routes.${id}.validity.text`] ? { validity: { label: S[`routes.${id}.validity.label`], text: S[`routes.${id}.validity.text`] } } : {}),
    cta: { label: S[`routes.${id}.cta.label`], href: VISA_OFFICIAL_LINKS[id] },
  })),
  arrive: { h: S['arrive.h'], air: parseRich(S['arrive.air']), land: parseRich(S['arrive.land']), more: parseRich(S['arrive.more']) },
  next: { h: S['next.h'], items: idx('next.items.').map((i) => ({ label: S[`next.items.${i}.label`], parts: parseRich(S[`next.items.${i}.parts`]) })) },
  faq: { h: S['faq.h'], items: idx('faq.items.').map((i) => ({ q: S[`faq.items.${i}.q`], a: S[`faq.items.${i}.a`] })) },
  links: { h: S['links.h'], head: idx('links.head.').map((i) => S[`links.head.${i}`]), rows: LINK_ROWS.map((id, i) => ({ route: S[`links.rows.${i}.route`], href: VISA_OFFICIAL_LINKS[id], org: S[`links.rows.${i}.org`] })) },
};
if (C.table.rows.length !== 8 || C.faq.items.length !== 7 || C.next.items.length !== 5 || C.links.rows.length !== 9) throw new Error('بنية pack.json غير متوقعة');
// الروابط الرسمية داخل النصوص الغنية يجب أن تبقى هي نفسها
for (const p of [...C.arrive.land]) if (typeof p !== 'string' && /^https?:/.test(p.href) && !official.has(p.href)) throw new Error('رابط رسمي محرَّف');

const UP = lang.toUpperCase();
const today = new Date().toISOString().slice(0, 10);
const tsOut = `// مولَّد بـtools/translation/apply-visa-guide.mjs من ${lang}-translation/output/visa-guide/judge.json (${today}، الدرجة ${judge.score}) — لا يُحرَّر يدوياً؛\n// أي تعديل يمرّ بخط ${lang}-translation-pipeline ثم يُعاد التطبيق.\nimport type { VisaGuideContent } from './visa-guide';\n\nexport const VISA_${UP}: VisaGuideContent = ${JSON.stringify(C, null, 2)};\n`;
const dataPath = path.join(ROOT, `src/data/visa-guide.${lang}.ts`);
writeFileSync(dataPath, tsOut);

// ── التسجيل في visa-guide.ts ──
const regPath = path.join(ROOT, 'src/data/visa-guide.ts');
let reg = read(regPath);
if (!reg.includes(`visa-guide.${lang}'`)) {
  reg = reg.replace('// @visa-lang-imports', `import { VISA_${UP} } from './visa-guide.${lang}';\n// @visa-lang-imports`);
  reg = reg.replace('  // @visa-lang-registry', `  ${lang}: VISA_${UP},\n  // @visa-lang-registry`);
  writeFileSync(regPath, reg);
}

// ── الثوابت ──
const mjsPath = path.join(ROOT, 'src/lib/visa-guide.mjs');
let mjs = read(mjsPath);
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
if (!mjs.includes(`${lang}: '/${lang}/visa-guide/'`)) {
  mjs = mjs.replace(/export const VISA_GUIDE_ALT = \{([^}]*)\};/, (_m, body) => `export const VISA_GUIDE_ALT = {${body.trimEnd()}, ${lang}: '/${lang}/visa-guide/' };`);
  mjs = mjs.replace(/export const VISA_LANGS = \[([^\]]*)\];/, (_m, body) => `export const VISA_LANGS = [${body.trimEnd()}, '${lang}'];`);
  mjs = mjs.replace(/export const VISA_UPDATED_LINE = \{([^}]*)\};/, (_m, body) => `export const VISA_UPDATED_LINE = {${body.trimEnd()}, ${lang}: ${q(S.updatedLine)} };`);
  mjs = mjs.replace(/export const VISA_FEES_LINE = \{([^}]*)\};/, (_m, body) => `export const VISA_FEES_LINE = {${body.trimEnd()}, ${lang}: ${q(S.feesLine)} };`);
  writeFileSync(mjsPath, mjs);
}

// ── الصفحة ──
const pageDir = path.join(ROOT, `src/pages/${lang}/visa-guide`);
mkdirSync(pageDir, { recursive: true });
writeFileSync(path.join(pageDir, 'index.astro'), `---\nimport VisaGuideView from '../../../components/views/VisaGuideView.astro';\n---\n<VisaGuideView lang="${lang}" />\n`);

// ── مفتاحا الواجهة في كتلة اللغة ──
const uiPath = path.join(ROOT, 'src/i18n/ui.ts');
let ui = read(uiPath);
const EOL = ui.includes('\r\n') ? '\r\n' : '\n';
const blockStart = ui.indexOf(`${EOL}  ${lang}: {`);
if (blockStart === -1) throw new Error(`كتلة ${lang} غائبة في ui.ts`);
const anchorRe = new RegExp(`(^[ \\t]*)'foot\\.l\\.getThere': '[^']*',`, 'm');
const after = ui.slice(blockStart);
const am = after.match(anchorRe);
if (!am) throw new Error(`مرساة foot.l.getThere غائبة في كتلة ${lang}`);
if (!after.slice(0, after.indexOf(`${EOL}  },`)).includes("'foot.l.visa'")) {
  const insert = `${am[0]}${EOL}${am[1]}'foot.l.visa': ${q(S['ui.foot.l.visa'])},${EOL}${am[1]}'plan.visa': ${q(S['ui.plan.visa'])},`;
  ui = ui.slice(0, blockStart) + after.replace(anchorRe, insert);
  writeFileSync(uiPath, ui);
}

// ── الذاكرة والمعجم والسجلّ ──
const tmPath = path.join(ROOT, `${lang}-translation/memory/tm.json`);
const tm = readJson(tmPath);
const existing = new Set(tm.pairs.filter((p) => p.page === 'visa-guide').map((p) => p.field));
for (const k of keys) if (!existing.has(k)) tm.pairs.push({ en: pack.strings[k].en, [lang]: S[k], page: 'visa-guide', field: k, date: today });
writeFileSync(tmPath, JSON.stringify(tm, null, 2) + '\n');

const tbPath = path.join(ROOT, `${lang}-translation/glossary/termbase.json`);
const tb = readJson(tbPath);
const adds = judge.termbase_additions ?? [];
let added = 0;
if (Array.isArray(tb.terms)) {
  for (const a of adds) if (a && a.en && !tb.terms.some((t) => t.en === a.en)) { tb.terms.push(a); added++; }
} else {
  for (const a of adds) { const k = a.key ?? a.ur; if (k && !tb.terms[k]) { const { key, ...rest } = a; tb.terms[k] = rest; added++; } }
}
if (added) writeFileSync(tbPath, JSON.stringify(tb, null, 2) + '\n');

const scoresPath = path.join(ROOT, `${lang}-translation/memory/scores.csv`);
const csv = (s) => `"${String(s).replace(/"/g, '""')}"`;
const row = [csv(`visa-guide (${lang}): /${lang}/visa-guide/ full page (138 strings) + ui foot.l.visa/plan.visa`), today, judge.loop ?? 1, judge.score, csv(`${judge.decision} (${(judge.notes ?? []).join('; ').slice(0, 600)})`)].join(',');
writeFileSync(scoresPath, read(scoresPath).replace(/\s*$/, '\n') + row + '\n');

console.log(`✓ ${lang}: ${dataPath} · ${keys.length} سلسلة · ${added} إضافة معجم · الدرجة ${judge.score} · العنوان ${tl} والوصف ${dl} حرفاً`);
