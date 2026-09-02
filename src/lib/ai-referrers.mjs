// مصادر إحالات محركات الإجابة — المؤشر الرئيسي في دراسة التطوير:
// «عدد استشهادات محركات الذكاء الاصطناعي شهرياً».
//
// تُستهلك من موضعين: سكربت GA4 المضمَّن في Base.astro (تُحقن عبر define:vars،
// فالقائمة هنا مصدر وحيد لا يتفرّق)، واختبار tools/test-ai-detection.mjs.
//
// لماذا .mjs لا .ts: الاختبار يستوردها في Node ضمن prebuild على Netlify، وتعرية
// الأنواع في Node ميزة تعتمد على الإصدار الدقيق — والبناء لا يُعلَّق على ذلك.
//
// المطابقة على النطاق كاملاً أو كنطاق فرعي منه — لا `includes` مطلقاً، وإلا
// طابق نطاقاً مخادعاً مثل `chatgpt.com.attacker.net`.

/** @type {ReadonlyArray<readonly [string, string]>} [النطاق, اسم المصدر في التقارير] */
export const AI_REFERRER_HOSTS = [
  ['chatgpt.com', 'chatgpt'],
  ['chat.openai.com', 'chatgpt'],
  ['openai.com', 'chatgpt'],
  ['perplexity.ai', 'perplexity'],
  ['copilot.microsoft.com', 'copilot'],
  ['gemini.google.com', 'gemini'],
  ['claude.ai', 'claude'],
  ['you.com', 'you'],
  ['poe.com', 'poe'],
  ['grok.com', 'grok'],
  ['x.ai', 'grok'],
  ['duckduckgo.com/chat', 'duckassist'],
  ['mistral.ai', 'mistral'],
  ['chat.deepseek.com', 'deepseek'],
  ['doubao.com', 'doubao'],
  ['kimi.moonshot.cn', 'kimi'],
];

/**
 * مطابقة نطاق: تساوٍ تام أو نطاق فرعي (`a.b.com` يطابق `b.com`).
 * @param {string} hostname @param {string} domain @returns {boolean}
 */
export function hostMatches(hostname, domain) {
  const h = hostname.toLowerCase().replace(/^www\./, '');
  const d = domain.toLowerCase();
  return h === d || h.endsWith('.' + d);
}

/**
 * اسم محرك الإجابة الذي جاء منه الزائر، أو null.
 * يُفحص المُحيل ثم `utm_source` — فChatGPT يُلحق `utm_source=chatgpt.com`
 * بالروابط، وقد يصل الزائر بلا مُحيل حين يفتح الرابط في تبويب جديد.
 * @param {string} referrer @param {string} search @returns {string | null}
 */
export function aiSource(referrer, search) {
  if (referrer) {
    try {
      const { hostname, pathname } = new URL(referrer);
      for (const [domain, name] of AI_REFERRER_HOSTS) {
        const [dHost, dPath] = domain.split('/');
        if (!hostMatches(hostname, dHost)) continue;
        if (dPath && !pathname.toLowerCase().startsWith('/' + dPath)) continue;
        return name;
      }
    } catch { /* مُحيل غير صالح — يُتابَع إلى utm */ }
  }
  if (search) {
    const utm = new URLSearchParams(search).get('utm_source');
    if (utm) {
      const u = utm.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
      for (const [domain, name] of AI_REFERRER_HOSTS) {
        const dHost = domain.split('/')[0];
        if (u === dHost || u.endsWith('.' + dHost) || u === name) return name;
      }
    }
  }
  return null;
}
