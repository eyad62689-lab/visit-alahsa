// اختبار كشف الذكاء الاصطناعي — يغطي الطرفين:
//   (أ) مصدر الإحالة من متصفح الزائر  → src/lib/ai-referrers.mjs
//   (ب) تصنيف الزاحف من user-agent     → netlify/edge-functions/lib/bot-kinds.mjs
//
// السلاسل أدناه صيغ حقيقية تنشرها الجهات نفسها، لا أمثلة مخترعة.
// يُشغَّل في prebuild فيفشل البناء عند أي انحراف.

import { aiSource, hostMatches, AI_REFERRER_HOSTS } from '../src/lib/ai-referrers.mjs';
import { classifyBot } from '../netlify/edge-functions/lib/bot-kinds.mjs';

let passed = 0;
const failures = [];
const eq = (label, actual, expected) => {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) passed++;
  else failures.push(`${label}\n      المتوقَّع: ${e}\n      الناتج  : ${a}`);
};

// ── (أ) مصدر الإحالة ──────────────────────────────────────────────────────
const REFERRER_CASES = [
  ['https://chatgpt.com/', '', 'chatgpt'],
  ['https://chat.openai.com/c/abc', '', 'chatgpt'],
  ['https://www.perplexity.ai/search?q=al-ahsa', '', 'perplexity'],
  ['https://copilot.microsoft.com/chats/1', '', 'copilot'],
  ['https://gemini.google.com/app', '', 'gemini'],
  ['https://claude.ai/chat/xyz', '', 'claude'],
  ['https://grok.com/', '', 'grok'],
  // نطاق فرعي مشروع
  ['https://beta.perplexity.ai/', '', 'perplexity'],
  // مسار مطلوب: دردشة DuckDuckGo لا بحثها العادي
  ['https://duckduckgo.com/chat', '', 'duckassist'],
  ['https://duckduckgo.com/?q=alahsa', '', null],
  // انتحال النطاق — الفخّ الذي يُسقط أي مطابقة بـincludes
  ['https://chatgpt.com.attacker.net/', '', null],
  ['https://notchatgpt.com/', '', null],
  ['https://evil.net/?r=chatgpt.com', '', null],
  // مُحيلون عاديون
  ['https://www.google.com/search?q=alahsa', '', null],
  ['https://twitter.com/x', '', null],
  ['', '', null],
  ['ليس رابطاً', '', null],
  // utm_source بلا مُحيل (ChatGPT يُلحقه بروابطه)
  ['', '?utm_source=chatgpt.com', 'chatgpt'],
  ['', '?utm_source=perplexity', 'perplexity'],
  ['', '?utm_source=https://chatgpt.com', 'chatgpt'],
  ['', '?utm_source=newsletter', null],
  ['', '?utm_source=chatgpt.com.attacker.net', null],
  ['', '', null],
  // المُحيل أسبق من utm
  ['https://claude.ai/', '?utm_source=chatgpt.com', 'claude'],
];
for (const [ref, search, expected] of REFERRER_CASES) {
  eq(`aiSource(${JSON.stringify(ref)}, ${JSON.stringify(search)})`, aiSource(ref, search), expected);
}

// حدود مطابقة النطاق
eq('hostMatches www', hostMatches('www.perplexity.ai', 'perplexity.ai'), true);
eq('hostMatches sub', hostMatches('a.b.claude.ai', 'claude.ai'), true);
eq('hostMatches suffix-trap', hostMatches('notclaude.ai', 'claude.ai'), false);
eq('hostMatches prefix-trap', hostMatches('claude.ai.evil.net', 'claude.ai'), false);

// لا اسم مصدر مكرَّر لنطاقين متناقضين، ولا نطاق مكرَّر
const domains = AI_REFERRER_HOSTS.map(([d]) => d);
eq('لا نطاق مكرَّر في القائمة', domains.length, new Set(domains).size);

// ── (ب) تصنيف الزواحف ─────────────────────────────────────────────────────
const UA_CASES = [
  ['Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)', 'openai-search', 'answer'],
  ['Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)', 'chatgpt-user', 'answer'],
  ['Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.2; +https://openai.com/gptbot', 'gptbot', 'training'],
  ['Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)', 'perplexity-bot', 'answer'],
  ['Mozilla/5.0 (compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)', 'perplexity-user', 'answer'],
  ['Mozilla/5.0 (compatible; ClaudeBot/1.0; +claudebot@anthropic.com)', 'claudebot', 'training'],
  ['Mozilla/5.0 (compatible; Claude-User/1.0; +Claude-User@anthropic.com)', 'claude-user', 'answer'],
  ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'googlebot', 'search'],
  ['Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'bingbot', 'search'],
  ['Mozilla/5.0 (compatible; DuckAssistBot/1.0; +https://duckduckgo.com/duckassistbot)', 'duckassist', 'answer'],
  ['Mozilla/5.0 (Device; OS) AppleWebKit (KHTML, like Gecko) Version Safari (Applebot/0.1)', 'applebot', 'search'],
  ['Mozilla/5.0 (compatible; CCBot/2.0; https://commoncrawl.org/faq/)', 'ccbot', 'training'],
  ['Mozilla/5.0 (compatible; Bytespider; spider-feedback@bytedance.com)', 'bytespider', 'training'],
  ['meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)', 'meta-external', 'training'],
  // زائر بشري
  ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36', null, null],
  ['', null, null],
];
for (const [ua, bot, botKind] of UA_CASES) {
  eq(`classifyBot(${ua.slice(0, 42) || '(فارغ)'}…)`, classifyBot(ua), { bot, botKind });
}

// فخّ الترتيب: الأخصّ يجب أن يسبق الأعمّ، وإلا ابتلع Applebot نظيره Extended
eq('Applebot-Extended لا يُصنَّف Applebot',
  classifyBot('Mozilla/5.0 (compatible; Applebot-Extended/0.1)'),
  { bot: 'applebot-extended', botKind: 'training' });
eq('Google-Extended لا يُصنَّف Googlebot',
  classifyBot('Mozilla/5.0 (compatible; Google-Extended)'),
  { bot: 'google-extended', botKind: 'training' });

// ── التقرير ───────────────────────────────────────────────────────────────
console.log(`\n── اختبار كشف الذكاء الاصطناعي ────────────────────────`);
if (failures.length) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error(`──────────────────────────────────────────────────────`);
  console.error(`✗ ${failures.length} إخفاق من ${passed + failures.length} حالة.\n`);
  process.exit(1);
}
console.log(`  ✓ ${passed} حالة نجحت (إحالات + زواحف + أفخاخ انتحال النطاق)`);
console.log(`──────────────────────────────────────────────────────\n`);
