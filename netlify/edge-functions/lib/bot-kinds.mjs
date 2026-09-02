// تصنيف الزواحف — وحدة بلا تبعيات كي تُختبر في Node، بينما bot-log.mjs
// نفسها تستورد @netlify/blobs المتاحة في زمن تشغيل Netlify وحده.
// Netlify يعامل الملفات العليا في edge-functions/ دوالَّ حدّية، وما في
// المجلدات الفرعية ملفاتِ مساعدةٍ تُستورَد — وهذا موضعها الصحيح.

// تصنيف زواحف محركات الإجابة — أساس «لوحة الاستشهادات» في دراسة التطوير.
// الترتيب مقصود: الأخصّ أولاً (Applebot-Extended قبل Applebot، وChatGPT-User
// قبل أي نمط عام)، وأول تطابق يفوز.
//   answer   = وكيل إجابة يستدعيه مستخدم فعلي أو يفهرس للإجابات — أهمّها
//   search   = زاحف بحث تقليدي تتغذّى منه المحركات (Bingbot بوابة Copilot)
//   training = زاحف جمع بيانات تدريب، وكلّه محجوب في robots.txt — فتسجيله
//              يكشف من يتجاهل الحجب، وهي معلومة لا تُرى بغير هذا السجل
const BOT_KINDS = [
  [/OAI-SearchBot/i, 'openai-search', 'answer'],
  [/ChatGPT-User/i, 'chatgpt-user', 'answer'],
  [/PerplexityBot/i, 'perplexity-bot', 'answer'],
  [/Perplexity-User/i, 'perplexity-user', 'answer'],
  [/Claude-SearchBot/i, 'claude-search', 'answer'],
  [/Claude-User/i, 'claude-user', 'answer'],
  [/DuckAssistBot/i, 'duckassist', 'answer'],
  [/Google-Extended/i, 'google-extended', 'training'],
  [/Applebot-Extended/i, 'applebot-extended', 'training'],
  [/GPTBot/i, 'gptbot', 'training'],
  [/ClaudeBot/i, 'claudebot', 'training'],
  [/anthropic-ai/i, 'anthropic-ai', 'training'],
  [/CCBot/i, 'ccbot', 'training'],
  [/meta-externalagent/i, 'meta-external', 'training'],
  [/FacebookBot/i, 'facebookbot', 'training'],
  [/Bytespider/i, 'bytespider', 'training'],
  [/ImagesiftBot/i, 'imagesift', 'training'],
  [/Diffbot/i, 'diffbot', 'training'],
  [/omgili/i, 'omgili', 'training'],
  [/Googlebot/i, 'googlebot', 'search'],
  [/bingbot|BingPreview/i, 'bingbot', 'search'],
  [/Applebot/i, 'applebot', 'search'],
  [/YandexBot/i, 'yandexbot', 'search'],
  [/Amazonbot/i, 'amazonbot', 'search'],
  [/DuckDuckBot/i, 'duckduckbot', 'search'],
  [/SeznamBot/i, 'seznambot', 'search'],
]

/** يعيد { bot, botKind } — وbot=null لما لا يُعرف اسمه. */
export function classifyBot(ua) {
  for (const [re, name, kind] of BOT_KINDS) {
    if (re.test(ua)) return { bot: name, botKind: kind }
  }
  return { bot: null, botKind: null }
}
