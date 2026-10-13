// C66 — وجه النستعليق لا يُطلب قبل رسم صورة الهيرو في صفحات /ur/.
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بمحتوى صفحات dist، ويستدعيها اختبار
// الكسر بنسخ معدَّلة في الذاكرة.
//
// الآلية (Base.astro + tokens.css): صفحة /ur/ التي تحمّل صورة الهيرو مسبقاً تحمل سكربتاً في
// الرأس يضع الصنف nq-wait على الجذر وقت التحليل الأول ويرفعه حين يصل مدخل LCP لتلك الصورة،
// والقاعدة :root:lang(ur).nq-wait تُبقي سلسلتَي الخط على خط النظام ما دام الصنف. إن سقط طرفٌ
// منها عاد الوجه (118 كيلوبايت) يُطلب مع الصورة ويدخل مخطط محاكاة LCP، أو تأخّر 2.5 ثانية بلا سبب.
// يحرس:
//   (أ) كل صفحة /ur/ فيها تحميل مسبق لصورة تحمل السكربت في رأسها، والعكس: لا سكربت بلا تحميل مسبق.
//   (ب) الصورة التي ينتظرها السكربت هي المحمَّلة مسبقاً نفسها (وإلا لا يطابق مدخل LCP أبداً).
//   (ج) قاعدة الانتظار حاضرة في أنماط الصفحة، تعرّف السلسلتين، ولا تسمّي وجه النستعليق ولا خطاً
//       عربياً مستضافاً (وإلا نُزّل بديلاً مؤقتاً عن الوجه).
//   (د) القاعدة الأصلية ما زالت تسمّي الوجه في السلسلتين (وإلا لا يظهر بعد رفع الصنف).
//   (هـ) لا صفحة خارج /ur/ تحمل السكربت.
//   (و) السكربت يحمّل الوجه (document.fonts.load) قبل رفع الصنف، وبمهلة ترفعه إن لم يصل: رفعٌ مباشر
//       يصيّر النص بخط العربية الاحتياطي ريثما يصل الوجه، فيتحرّك التخطيط مرتين.

export const WAIT_CLASS = 'nq-wait';
export const FAMILY = 'Noto Nastaliq Urdu';
// خطوط عربية الرسم المستضافة (fonts.css واستيرادات fontsource في Base.astro)
const HOSTED_ARABIC = ['Cairo', 'Amiri', 'IBM Plex Sans Arabic'];
const LCP_TYPE = 'largest-contentful-paint';

// نصوص السكربتات المضمَّنة في مقطع HTML — مسحاً بالمواضع لا بنمط يطابق الوسوم
function inlineScripts(html) {
  const out = [];
  const lower = html.toLowerCase();
  let at = 0;
  for (;;) {
    const open = lower.indexOf('<script', at);
    if (open < 0) break;
    const tagEnd = lower.indexOf('>', open);
    if (tagEnd < 0) break;
    const close = lower.indexOf('</script', tagEnd);
    if (close < 0) break;
    if (!/\ssrc\s*=/.test(html.slice(open, tagEnd))) out.push(html.slice(tagEnd + 1, close));
    at = close + 9;
  }
  return out;
}

// وسوم <link> في مقطع HTML بسماتها
function linkTags(html) {
  const out = [];
  const lower = html.toLowerCase();
  let at = 0;
  for (;;) {
    const open = lower.indexOf('<link', at);
    if (open < 0) break;
    const end = lower.indexOf('>', open);
    if (end < 0) break;
    const tag = html.slice(open, end + 1);
    const attrs = {};
    for (const m of tag.matchAll(/\s([a-z-]+)="([^"]*)"/gi)) attrs[m[1].toLowerCase()] = m[2];
    out.push(attrs);
    at = end + 1;
  }
  return out;
}

// جسم أول قاعدة CSS بهذا المحدِّد حرفياً (الأنماط مضمَّنة ومصغَّرة: «المحدِّد{…}»)
function ruleBody(html, selector) {
  let at = 0;
  for (;;) {
    const i = html.indexOf(selector, at);
    if (i < 0) return null;
    const after = html.slice(i + selector.length).match(/^\s*\{([^}]*)\}/);
    if (after) return after[1];
    at = i + selector.length;
  }
}

const isDeferralScript = (text) => text.includes(WAIT_CLASS) && text.includes(LCP_TYPE);

/**
 * @param {{rel: string, html: string}[]} pages كل صفحات dist (المسار نسبةً إلى dist بشرطات مائلة)
 * @returns {{problems: string[], stats: {urPages: number, deferred: number, otherPages: number}}}
 */
export function checkNastaliqDeferral(pages) {
  const problems = [];
  const stats = { urPages: 0, deferred: 0, otherPages: 0 };
  for (const { rel, html } of pages) {
    const headEnd = html.toLowerCase().indexOf('</head>');
    const head = headEnd < 0 ? html : html.slice(0, headEnd);
    const scripts = inlineScripts(head).filter(isDeferralScript);
    if (!rel.startsWith('ur/')) {
      stats.otherPages++;
      if (scripts.length) problems.push(`${rel}: سكربت إرجاء وجه النستعليق في صفحة خارج /ur/`);
      continue;
    }
    stats.urPages++;
    const preloads = linkTags(head).filter((a) => a.rel === 'preload' && a.as === 'image');
    if (!preloads.length) {
      if (scripts.length) problems.push(`${rel}: سكربت الإرجاء حاضر بلا تحميل مسبق لصورة — ينتظر مدخل LCP لا يأتي`);
      continue;
    }
    if (scripts.length !== 1) { problems.push(`${rel}: ${scripts.length} سكربت إرجاء في الرأس والمطلوب واحد`); continue; }
    stats.deferred++;
    const script = scripts[0];
    const hero = script.match(/\bHERO\s*=\s*"([^"]+)"/)?.[1];
    if (!hero) problems.push(`${rel}: سكربت الإرجاء لا يحمل مسار صورة الهيرو (HERO)`);
    else if (!preloads.some((a) => a.href === `${hero}.webp`)) problems.push(`${rel}: السكربت ينتظر «${hero}» والمحمَّل مسبقاً ${preloads.map((a) => `«${a.href}»`).join('، ')}`);
    if (!script.includes(`classList.add('${WAIT_CLASS}')`) || !script.includes(`classList.remove('${WAIT_CLASS}')`)) problems.push(`${rel}: السكربت لا يضع الصنف ${WAIT_CLASS} ويرفعه`);
    if (!/setTimeout\(\s*release\s*,\s*\d+\s*\)/.test(script)) problems.push(`${rel}: السكربت بلا مهلة ترفع الصنف إن لم يصل مدخل LCP`);
    const load = script.match(/document\.fonts\.load\(\s*"[^"]*'([^']+)'"[^)]*\)\.then\(\s*(\w+)\s*,\s*(\w+)\s*\)/);
    if (load?.[1] !== FAMILY) problems.push(`${rel}: السكربت لا يحمّل وجه «${FAMILY}» قبل رفع الصنف`);
    else {
      const drop = load[2];
      if (load[3] !== drop) problems.push(`${rel}: إخفاق تحميل الوجه لا يرفع الصنف`);
      if (!new RegExp(String.raw`function\s+${drop}\s*\(\)\s*\{[^}]*classList\.remove\('${WAIT_CLASS}'\)`).test(script)) problems.push(`${rel}: ما يُستدعى بعد تحميل الوجه لا يرفع الصنف ${WAIT_CLASS}`);
      if (!new RegExp(String.raw`setTimeout\(\s*${drop}\s*,\s*\d+\s*\)`).test(script)) problems.push(`${rel}: تحميل الوجه بلا مهلة ترفع الصنف إن لم يصل`);
      if (script.split(`classList.remove('${WAIT_CLASS}')`).length !== 2) problems.push(`${rel}: الصنف يُرفع من أكثر من موضع — رفعٌ لا يسبقه تحميل الوجه`);
    }

    const wait = ruleBody(html, `:root:lang(ur).${WAIT_CLASS}`);
    if (wait === null) problems.push(`${rel}: قاعدة :root:lang(ur).${WAIT_CLASS} غائبة عن أنماط الصفحة`);
    else {
      for (const v of ['--font-heading', '--font-body']) if (!wait.includes(`${v}:`)) problems.push(`${rel}: قاعدة الانتظار لا تعرّف ${v}`);
      for (const f of [FAMILY, ...HOSTED_ARABIC]) if (wait.includes(f)) problems.push(`${rel}: قاعدة الانتظار تسمّي «${f}»`);
    }
    const base = ruleBody(html, ':root:lang(ur)');
    if (base === null) problems.push(`${rel}: قاعدة :root:lang(ur) غائبة عن أنماط الصفحة`);
    else if (base.split(FAMILY).length - 1 < 2) problems.push(`${rel}: قاعدة :root:lang(ur) لا تسمّي «${FAMILY}» في السلسلتين`);
  }
  if (stats.urPages && !stats.deferred) problems.push('لا صفحة /ur/ تحمل سكربت الإرجاء');
  return { problems, stats };
}
