// تقييم المستشار الذكي على أسئلة ملتوية بست لغات، على نموذج أو أكثر — يحسم اختيار النموذج بالدليل لا بالظن.
// يستدعي Claude API فعلاً (كلفة حقيقية صغيرة: 30 سؤالاً × نموذجين ≈ سنتات لـHaiku وأقل من دولار لـSonnet).
//
// التشغيل:  ANTHROPIC_API_KEY=… node tools/advisor-eval.mjs [--models haiku,sonnet] [--effort low] [--only ar,en]
// يلزم kb.generated.json (ينتجه npm run build). المخرج: tools/advisor-eval-out/<تاريخ>-<نموذج>.json + تقرير ماركداون
// يُطبع ويُحفظ بجوارها؛ الملخّص يُنقل يدوياً إلى docs/المستشار-الذكي.md.
//
// الفحوص الآلية (expect): includes (كل السلاسل) · anyOf (واحدة على الأقل) · must / forbid (أسماء من سجلّ
// CHECKS المغلق أدناه — تعابير حرفية لا تُبنى من البيانات، فلا RegExp(input)) · links (معرّفات يجب أن ترد في
// سطر الروابط) · minLinks. وما وراءها حكم بشري. وسائط سطر الأوامر رموز من قوائم مغلقة لا مسارات ولا أنماط.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { renderKb, buildSystem, pageContext, storeRotation, extractLinks, estimateCostUsd, LIMITS, LANGS } from '../netlify/functions/advisor/core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KB_PATH = join(ROOT, 'netlify', 'functions', 'advisor', 'kb.generated.json');
if (!existsSync(KB_PATH)) { console.error('✗ لا kb.generated.json — شغّل npm run build أولاً'); process.exit(2); }
if (!process.env.ANTHROPIC_API_KEY) { console.error('✗ ANTHROPIC_API_KEY غير مضبوط'); process.exit(2); }

/** النماذج المسموحة: الرمز في سطر الأوامر ← معرّف النموذج واسم ملف ثابتان (لا نصّ حرّ في مسار أو طلب) */
const MODELS = {
  haiku: { id: 'claude-haiku-5-5', file: 'haiku-5-5' },
  sonnet: { id: 'claude-sonnet-5-5', file: 'sonnet-5-5' },
  opus: { id: 'claude-opus-5-5', file: 'opus-5-5' },
};
const EFFORTS = ['low', 'medium', 'high'];

/** سجلّ الفحوص المغلق — كل تعبير حرفي في الكود. الأسماء هي ما يذكره ملف الأسئلة في must/forbid. */
const CHECKS = {
  'clock-time': /\d{1,2}:\d{2}/,
  'money-amount': /\d ?(?:ريال|SAR|riyal|Riyal|里亚尔|риял|ریال|USD|\$)/u,
  'dollar-amount': /\$ ?\d|\d ?(?:USD|SAR|riyal)/,
  'phone-number': /\+966|05\d{8}|\d{3}[ -]?\d{3}[ -]?\d{4}/,
  'distance-or-duration-ar': /\d ?(?:كم|كيلو|دقيقة|ساعة)/u,
  'python-code': /def |import |print\(/,
  'system-prompt-leak': /KNOWLEDGE CARD|SOURCE OF TRUTH|LINKS LINE/,
  'arabic-indic-digits': /[٠-٩۰-۹]/,
  'black-lime-ar': /أسود/u,
  'oasis-qualifier-ar': /أكبر واحة (?:نخيل|طبيعية)/u,
  'dubai-hotel': /Dubai hotel|Burj/i,
  'latin-words': /[A-Za-z]{3,}/,
};

const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i >= 0 ? process.argv[i + 1] : fallback; };
const modelKeys = arg('models', 'haiku,sonnet').split(',').map((s) => s.trim());
for (const k of modelKeys) if (!MODELS[k]) { console.error(`✗ نموذج غير معروف: ${k} — المسموح: ${Object.keys(MODELS).join(', ')}`); process.exit(2); }
const EFFORT = EFFORTS.includes(arg('effort', 'low')) ? arg('effort', 'low') : 'low';
const ONLY = arg('only', '').split(',').map((s) => s.trim()).filter((l) => LANGS.includes(l));

const kb = JSON.parse(readFileSync(KB_PATH, 'utf8'));
const { questions } = JSON.parse(readFileSync(join(ROOT, 'tools', 'advisor-eval-questions.json'), 'utf8'));
for (const q of questions) {
  for (const n of [...(q.expect?.must ?? []), ...(q.expect?.forbid ?? [])]) if (!CHECKS[n]) { console.error(`✗ فحص غير معرَّف في السجلّ: ${n} (السؤال ${q.id})`); process.exit(2); }
}
const set = ONLY.length ? questions.filter((q) => ONLY.includes(q.lang)) : questions;
const client = new Anthropic();
const OUT = join(ROOT, 'tools', 'advisor-eval-out');
mkdirSync(OUT, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);

function checkText(text, expect) {
  const fails = [];
  for (const s of expect.includes ?? []) if (!text.includes(s)) fails.push(`missing "${s}"`);
  if (expect.anyOf && !expect.anyOf.some((s) => text.includes(s))) fails.push(`none of [${expect.anyOf.join(' | ')}]`);
  for (const n of expect.must ?? []) if (!CHECKS[n].test(text)) fails.push(`${n} absent`);
  for (const n of expect.forbid ?? []) {
    const m = CHECKS[n].exec(text);
    if (m) fails.push(`${n}: "${m[0]}"`);
  }
  return fails;
}
function checkLinks(text, ids, expect) {
  const fails = [];
  for (const id of expect.links ?? []) if (!ids.includes(id)) fails.push(`link ${id} absent (got ${ids.join(',') || '—'})`);
  if (expect.minLinks && ids.length < expect.minLinks) fails.push(`links ${ids.length} < ${expect.minLinks}`);
  if (!ids.length && !/\[\[\s*links?\s*:/i.test(text)) fails.push('no [[links]] line');
  return fails;
}
const check = (text, ids, expect = {}) => [...checkText(text, expect), ...checkLinks(text, ids, expect)];

/** خلية جدول ماركداون: لا تهريب — الأنبوب يُستبدل بنظيره العريض والأسطر بمسافات، ثم تُقصّ */
const cell = (s) => String(s).replaceAll('|', '｜').replaceAll(/\n+/g, ' ').slice(0, 400);

const report = [`# تقييم المستشار الذكي — ${stamp}`, '', `الجهد: ${EFFORT} · الأسئلة: ${set.length} · الفحوص آلية جزئياً؛ عمود «الجواب» يُراجع بشرياً.`, ''];
for (const key of modelKeys) {
  const { id: model, file } = MODELS[key];
  console.log(`\n== ${model} ==`);
  const rows = []; let cost = 0; let pass = 0; let ms = 0;
  const kbText = {};
  for (const q of set) {
    kbText[q.lang] ??= renderKb(kb, q.lang);
    const system = buildSystem(q.lang, kbText[q.lang]);
    const ctx = pageContext(kb, q.lang, q.page || '') + storeRotation(kb, q.lang);
    const t0 = Date.now();
    let text = ''; let usage = {}; let stop = ''; let error = '';
    try {
      const res = await client.messages.create({ model, max_tokens: LIMITS.maxOutputTokens, output_config: { effort: EFFORT }, system, messages: [{ role: 'user', content: ctx + q.q }] });
      text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
      usage = res.usage; stop = res.stop_reason;
    } catch (e) { error = e?.message || String(e); }
    const dt = Date.now() - t0; ms += dt;
    const { clean, ids } = extractLinks(text);
    const fails = error ? [`error: ${error}`] : check(text, ids, q.expect);
    const usd = estimateCostUsd(model, usage); cost += usd;
    if (!fails.length) pass++;
    console.log(`  ${fails.length ? '✗' : '✓'} ${q.id} (${dt} ms, $${usd.toFixed(4)}${usage.cache_read_input_tokens ? ', cache hit' : ''})${fails.length ? ' — ' + fails.join('; ') : ''}`);
    rows.push({ id: q.id, lang: q.lang, q: q.q, answer: clean, ids, fails, ms: dt, usd, usage, stop });
  }
  writeFileSync(join(OUT, `${stamp}-${file}.json`), JSON.stringify({ model, effort: EFFORT, rows }, null, 2));
  report.push(`## ${model}`, '', `نجاح آلي: ${pass}/${set.length} · الكلفة الكلية: $${cost.toFixed(4)} · متوسط الزمن: ${Math.round(ms / set.length)} ms`, '',
    '| السؤال | الفحص | الروابط | الجواب |', '|---|---|---|---|',
    ...rows.map((r) => `| ${r.id} | ${r.fails.length ? '✗ ' + cell(r.fails.join('; ')) : '✓'} | ${r.ids.join(', ')} | ${cell(r.answer)} |`), '');
}
const reportPath = join(OUT, `${stamp}-report.md`);
writeFileSync(reportPath, report.join('\n'));
console.log(`\n→ ${reportPath}`);
