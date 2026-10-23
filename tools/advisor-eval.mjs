// تقييم المستشار الذكي على أسئلة ملتوية بست لغات، على نموذج أو أكثر — يحسم اختيار النموذج بالدليل لا بالظن.
// يستدعي Claude API فعلاً (كلفة حقيقية صغيرة: 30 سؤالاً × نموذجين ≈ سنتات لـHaiku وأقل من دولار لـSonnet).
//
// التشغيل:  ANTHROPIC_API_KEY=… node tools/advisor-eval.mjs [--models claude-haiku-5-5,claude-sonnet-5-5] [--effort low] [--only ar,en]
// يلزم kb.generated.json (ينتجه npm run build). المخرج: tools/advisor-eval-out/<تاريخ>-<نموذج>.json + تقرير ماركداون
// يُطبع ويُحفظ بجوارها؛ الملخّص يُنقل يدوياً إلى docs/المستشار-الذكي.md.
//
// الفحوص الآلية (expect): includes (كل السلاسل) · anyOf (واحدة على الأقل) · pattern (يجب أن يطابق) ·
// notPattern (يجب ألا يطابق) · links (معرّفات يجب أن ترد في سطر الروابط) · minLinks. وما وراءها حكم بشري.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { renderKb, buildSystem, pageContext, extractLinks, estimateCostUsd, LIMITS } from '../netlify/functions/advisor/core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KB_PATH = join(ROOT, 'netlify', 'functions', 'advisor', 'kb.generated.json');
if (!existsSync(KB_PATH)) { console.error('✗ لا kb.generated.json — شغّل npm run build أولاً'); process.exit(2); }
if (!process.env.ANTHROPIC_API_KEY) { console.error('✗ ANTHROPIC_API_KEY غير مضبوط'); process.exit(2); }

const arg = (name, fallback) => { const i = process.argv.indexOf(`--${name}`); return i >= 0 ? process.argv[i + 1] : fallback; };
const MODELS = arg('models', 'claude-haiku-5-5,claude-sonnet-5-5').split(',');
const EFFORT = arg('effort', 'low');
const ONLY = arg('only', '').split(',').filter(Boolean);

const kb = JSON.parse(readFileSync(KB_PATH, 'utf8'));
const { questions } = JSON.parse(readFileSync(join(ROOT, 'tools', 'advisor-eval-questions.json'), 'utf8'));
const set = ONLY.length ? questions.filter((q) => ONLY.includes(q.lang)) : questions;
const client = new Anthropic();
const OUT = join(ROOT, 'tools', 'advisor-eval-out');
mkdirSync(OUT, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);

function check(expect = {}, text, ids) {
  const fails = [];
  for (const s of expect.includes ?? []) if (!text.includes(s)) fails.push(`missing "${s}"`);
  if (expect.anyOf && !expect.anyOf.some((s) => text.includes(s))) fails.push(`none of [${expect.anyOf.join(' | ')}]`);
  if (expect.pattern && !new RegExp(expect.pattern, 'u').test(text)) fails.push(`pattern ${expect.pattern} absent`);
  if (expect.notPattern) { const m = text.match(new RegExp(expect.notPattern, 'u')); if (m) fails.push(`forbidden "${m[0]}"`); }
  for (const id of expect.links ?? []) if (!ids.includes(id)) fails.push(`link ${id} absent (got ${ids.join(',') || '—'})`);
  if (expect.minLinks && ids.length < expect.minLinks) fails.push(`links ${ids.length} < ${expect.minLinks}`);
  if (!/\[\[\s*links?\s*:/i.test(text) && !ids.length) fails.push('no [[links]] line');
  return fails;
}

const report = [`# تقييم المستشار الذكي — ${stamp}`, '', `الجهد: ${EFFORT} · الأسئلة: ${set.length} · الفحوص آلية جزئياً؛ عمود «الجواب» يُراجع بشرياً.`, ''];
for (const model of MODELS) {
  console.log(`\n== ${model} ==`);
  const rows = []; let cost = 0; let pass = 0; let ms = 0;
  const kbText = {};
  for (const q of set) {
    kbText[q.lang] ??= renderKb(kb, q.lang);
    const system = buildSystem(q.lang, kbText[q.lang]);
    const ctx = pageContext(kb, q.lang, q.page || '');
    const t0 = Date.now();
    let text = ''; let usage = {}; let stop = ''; let error = '';
    try {
      const res = await client.messages.create({ model, max_tokens: LIMITS.maxOutputTokens, output_config: { effort: EFFORT }, system, messages: [{ role: 'user', content: ctx + q.q }] });
      text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
      usage = res.usage; stop = res.stop_reason;
    } catch (e) { error = e?.message || String(e); }
    const dt = Date.now() - t0; ms += dt;
    const { clean, ids } = extractLinks(text);
    const fails = error ? [`error: ${error}`] : check(q.expect, text, ids);
    const usd = estimateCostUsd(model, usage); cost += usd;
    if (!fails.length) pass++;
    console.log(`  ${fails.length ? '✗' : '✓'} ${q.id} (${dt} ms, $${usd.toFixed(4)}${usage.cache_read_input_tokens ? ', cache hit' : ''})${fails.length ? ' — ' + fails.join('; ') : ''}`);
    rows.push({ id: q.id, lang: q.lang, q: q.q, answer: clean, ids, fails, ms: dt, usd, usage, stop });
  }
  writeFileSync(join(OUT, `${stamp}-${model}.json`), JSON.stringify({ model, effort: EFFORT, rows }, null, 2));
  report.push(`## ${model}`, '', `نجاح آلي: ${pass}/${set.length} · الكلفة الكلية: $${cost.toFixed(4)} · متوسط الزمن: ${Math.round(ms / set.length)} ms`, '',
    '| السؤال | الفحص | الروابط | الجواب |', '|---|---|---|---|',
    ...rows.map((r) => `| ${r.id} | ${r.fails.length ? '✗ ' + r.fails.join('; ') : '✓'} | ${r.ids.join(', ')} | ${r.answer.replace(/\|/g, '\\|').replace(/\n+/g, ' ').slice(0, 400)} |`), '');
}
const md = report.join('\n');
writeFileSync(join(OUT, `${stamp}-report.md`), md);
console.log(`\n→ ${join(OUT, `${stamp}-report.md`)}`);
