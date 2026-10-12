// فحوص النص الأوردي في صفحات /ur/ المبنية — دوالّ نقية بلا قراءة ملفات: يستدعيها
// check-consistency.mjs بصفحات dist وبالمعجم، ويستدعيها اختبار الكسر بنسخ معدَّلة في الذاكرة.
//
// C45 — حروف العربية في نصّ أوردي. مصدر نقحرة الأوردو رسمٌ عربي، والحرف العربي المنسوخ
//   (ي ك ة ه ى أ إ، والتاء U+06C3) يبدو سليماً بخط النسخ ويتكسّر بالنستعليق ويُفشل البحث، ولا
//   يراه من يقارن بالمصدر العربي. يُفشل البناء إن ورد أحدها في نصّ أي صفحة /ur/، وإيجاباً
//   يشترط ورود ی (U+06CC) وک (U+06A9) فعلاً كي لا يصير فارغاً بغياب النص لا بصحّته.
// C46–C52 — حرّاس أحكام المعايرة التي يسمّي كلٌّ منها حارس بناء في
//   ur-translation/glossary/termbase.json ← _meta.calibration_rulings (المعرّف في كل نتيجة).
//
// النطاق: نصّ الصفحة بلغتها — نصوص العناصر وقيم السمات النصية (alt/title/aria-label/content)
// بعد إسقاط <script> و<style> وكل عنصر موسوم بلغة أخرى (lang غير ur). ما كان عربياً بالتصميم
// داخل صفحة أوردية (سطر العلامة، «العربية» في مبدّل اللغة، خيار العربية في شريط الاقتراح)
// يحمل lang="ar" فيخرج بوسمه الصريح لا باستثناء في الفاحص؛ وعدد ما أُسقط يُطبع مع النتيجة.
//
// السلاسل الأوردية أدناه منسوخة من المعجم آلياً، ويُعاد التحقق عند كل تشغيل أن كلاً منها ما
// زال وارداً فيه حرفياً (tokenProblems) — فلا تنحرف القائمة عن مصدرها بصمت.
import { cutBlocks, textAttributes } from './check-visit-card.mjs';

export const FORBIDDEN_LETTERS = [0x064A, 0x0643, 0x0629, 0x0647, 0x0649, 0x0623, 0x0625, 0x06C3];
export const REQUIRED_LETTERS = [0x06CC, 0x06A9];

// علامتا الإضافة الفارسية: الكسرة U+0650 والهمزة فوق الهاء U+06C2
export const IZAFAT_MARKS = [0x0650, 0x06C2];

// أعلام الأماكن: الصيغة المعتمدة (مفتاح المعجم) والصيغ الصحفية المحظورة في المتن
export const PLACE_NAMES = ['جبل القارہ', 'ہفوف'];
export const PLACE_FORBIDDEN = ['جبل قارہ', 'الہفوف', 'القارۃ'];
// رأس الاسم: الصيغة بلا همزتها الختامية بادئةٌ للمعتمدة، فتُطابَق كلمةً كاملة
export const HEAD_NAME = 'الاحساء';
export const HEAD_NAME_BARE = HEAD_NAME.slice(0, -1);
export const RIYAL = 'ریال';
export const SAUDI_RIYAL = 'سعودی ریال';
export const CURRENCY_CODE = 'SAR';
export const CAVES_RETIRED = 'غاریں';
export const CLOCK_WORD = 'بجے';
export const DAY_PARTS = ['صبح', 'دوپہر', 'سہ پہر', 'شام', 'رات'];
// الدخيل المسحوب: الأول يُطابَق كلمةً كاملة (ثلاثة أحرف ترد داخل كلمات أخرى) والبقية أينما وردت
export const LOAN_WHOLE_WORD = ['ہال'];
export const LOAN_ANYWHERE = ['ہیریٹیج', 'فیملی', 'فوٹوگرافی'];

const TOKENS = [...PLACE_NAMES, ...PLACE_FORBIDDEN, HEAD_NAME, RIYAL, SAUDI_RIYAL, CAVES_RETIRED, CLOCK_WORD, ...DAY_PARTS, ...LOAN_WHOLE_WORD, ...LOAN_ANYWHERE];

const hex = (cp) => 'U+' + cp.toString(16).toUpperCase().padStart(4, '0');
const ARABIC_SCRIPT = /[\u0600-\u06FF]/;
const LETTER = /[\p{L}\p{M}]/u;
const DASHES = ['-', '\u2013', '\u2014'];

/**
 * يحذف كل عنصر يحمل سمة lang يقبلها match(code) حتى أول وسم إغلاق باسمه، بمسح خطي: وسم
 * الفتح بلا «<» داخله، والإغلاق بـindexOf — لا تعبير نمطي على جسم العنصر. عنصرٌ بداخله عنصر
 * بالاسم نفسه يُقطع عند أول إغلاق، فيبقى ما بعده في النص المفحوص (الخطأ نحو التشدّد).
 * @param {string} html
 * @param {(code: string) => boolean} match يُعطى قيمة lang بأحرف صغيرة
 * @returns {{ html: string, removed: number }}
 */
export function stripLangElements(html, match) {
  const open = /<(\w+)((?:[\s/][^<>]*)?)>/g;
  let out = html;
  let removed = 0;
  for (;;) {
    open.lastIndex = 0;
    let hit = false;
    let m;
    while ((m = open.exec(out))) {
      const code = /\blang="([^"]*)"/i.exec(m[2])?.[1];
      if (code === undefined || !match(code.toLowerCase())) continue;
      const closeTag = '</' + m[1].toLowerCase() + '>';
      const close = out.toLowerCase().indexOf(closeTag, m.index + m[0].length);
      if (close < 0) continue;
      out = out.slice(0, m.index) + out.slice(close + closeTag.length);
      removed++;
      hit = true;
      break;
    }
    if (!hit) return { html: out, removed };
  }
}

// الوسوم إلى فواصل أسطر حتى الاستقرار (تمريرة واحدة تُبقي «<script» إن تداخل الوسم)
const tagsToBreaks = (html) => {
  let prev;
  do { prev = html; html = html.replace(/<[^<>]*>/g, '\n'); } while (html !== prev);
  return html;
};
// تمريرة واحدة: فكّ «&amp;» قبل غيره يفكّ «&amp;lt;» مرتين
const ENT = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' };
const decode = (s) => s.replace(/&(?:amp|quot|#39|lt|gt|nbsp);/g, (e) => ENT[e]);

/**
 * كتل النص المنشور بلغة الصفحة: كتلة لكل مقطع نصّ بين وسمين، وكتلة لكل قيمة سمة نصية.
 * @returns {{ blocks: string[], foreign: number }} foreign = عدد العناصر المُسقطة بوسم لغة أخرى
 */
export function urTextBlocks(html) {
  const bare = cutBlocks(cutBlocks(html, 'script').out, 'style').out;
  const own = stripLangElements(bare, (code) => code.split('-')[0] !== 'ur');
  const blocks = [...tagsToBreaks(own.html).split('\n'), ...textAttributes(own.html)]
    .map((t) => decode(t).replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return { blocks, foreign: own.removed };
}

const snip = (text, i, len = 1) => text.slice(Math.max(0, i - 18), i + len + 18);
// ورود word كلمةً كاملة (لا حرف ولا علامة قبلها ولا بعدها) بدءاً من from؛ -1 إن لم ترد
const wordAt = (text, word, from = 0) => {
  for (let i = text.indexOf(word, from); i !== -1; i = text.indexOf(word, i + 1)) {
    const before = text[i - 1] ?? ' ', after = text[i + word.length] ?? ' ';
    if (!LETTER.test(before) && !LETTER.test(after)) return i;
  }
  return -1;
};

/**
 * C45. @param {{ rel: string, html: string }[]} pages صفحات /ur/ المبنية
 */
export function checkUrLetterforms(pages) {
  const problems = [];
  const need = REQUIRED_LETTERS.map((cp) => String.fromCodePoint(cp));
  let carriers = 0, foreign = 0, blocksSeen = 0;
  for (const { rel, html } of pages) {
    const { blocks, foreign: f } = urTextBlocks(html);
    foreign += f;
    blocksSeen += blocks.length;
    const hits = new Map();
    for (const b of blocks) {
      for (const cp of FORBIDDEN_LETTERS) {
        const i = b.indexOf(String.fromCodePoint(cp));
        if (i !== -1 && !hits.has(cp)) hits.set(cp, snip(b, i));
      }
    }
    for (const [cp, ctx] of hits) problems.push(`${rel}: ${hex(cp)} في نصّ أوردي ⇐ «${ctx}»`);
    if (need.every((ch) => blocks.some((b) => b.includes(ch)))) carriers++;
  }
  if (!pages.length) problems.push('لا صفحة /ur/ في المخرج — الحارس صار فارغاً');
  else if (carriers === 0) problems.push(`لا صفحة /ur/ تحمل ${REQUIRED_LETTERS.map(hex).join(' و')} معاً — الحارس صار فارغاً أو النص ليس أوردياً`);
  return { problems, stats: { pages: pages.length, carriers, foreign, blocks: blocksSeen } };
}

// كل سلسلة من سلاسل الحرّاس واردة في المعجم حرفياً — وإلا انحرفت القائمة عن مصدرها
export function tokenProblems(termbase) {
  const text = JSON.stringify(termbase);
  return TOKENS.filter((t) => !text.includes(t)).map((t) => `سلسلة حارس غائبة عن المعجم: «${t}»`);
}

// رقم الساعة الملاصق لكلمة الساعة: «8» أو «8:30» قبلها مباشرةً بمسافة واحدة
const CLOCK_NUMBER = /(\d{1,2})(?::(\d{2}))? $/;

/**
 * C46–C52. @param {{ rel: string, html: string }[]} pages صفحات /ur/ المبنية
 * @param {object} termbase المعجم محلَّلاً (terms و_meta.calibration_rulings)
 * @returns {{ id: string, ruling: string, problems: string[], stats: Record<string, number> }[]}
 */
export function checkUrRulings(pages, termbase) {
  const drift = tokenProblems(termbase);
  // مركّبات مسجّلة في المعجم تحمل علامة إضافة — استثناء الحكم نفسه، ولا مدخل كهذا اليوم
  const izafatMarks = IZAFAT_MARKS.map((cp) => String.fromCodePoint(cp));
  const registered = Object.keys(termbase.terms ?? {}).filter((k) => izafatMarks.some((ch) => k.includes(ch)));

  const out = {
    names: { id: 'P1', problems: [...drift], stats: { carriers: 0 } },
    head: { id: 'P2', problems: [], stats: { carriers: 0 } },
    currency: { id: 'P7', problems: [], stats: { amounts: 0 } },
    izafat: { id: 'P8', problems: [], stats: { registered: registered.length } },
    caves: { id: 'P12', problems: [], stats: {} },
    clock: { id: 'P13', problems: [], stats: { times: 0 } },
    loans: { id: 'P16', problems: [], stats: {} },
  };
  const nameSeen = new Map(PLACE_NAMES.map((n) => [n, 0]));
  let urduBlocks = 0;

  for (const { rel, html } of pages) {
    const blocks = urTextBlocks(html).blocks.filter((b) => ARABIC_SCRIPT.test(b));
    urduBlocks += blocks.length;
    let pageHasHead = false;
    const pageNames = new Set();
    for (const b of blocks) {
      // P1 — صيغ محظورة لأعلام المعجم
      for (const f of PLACE_FORBIDDEN) { const i = b.indexOf(f); if (i !== -1) out.names.problems.push(`${rel}: صيغة محظورة «${f}» ⇐ «${snip(b, i, f.length)}»`); }
      for (const n of PLACE_NAMES) if (b.includes(n)) pageNames.add(n);

      // P2 — رأس الاسم بلا همزته الختامية
      const bare = wordAt(b, HEAD_NAME_BARE);
      if (bare !== -1) out.head.problems.push(`${rel}: رأس الاسم بلا همزته الختامية ⇐ «${snip(b, bare, HEAD_NAME_BARE.length)}»`);
      if (b.includes(HEAD_NAME)) pageHasHead = true;

      // P7 — لا رمز عملة لاتينياً، وأول مبلغ في الحقل يحمل اسم العملة كاملاً
      for (let i = b.indexOf(CURRENCY_CODE); i !== -1; i = b.indexOf(CURRENCY_CODE, i + 1)) {
        if (!/[A-Za-z]/.test(b[i - 1] ?? ' ') && !/[A-Za-z]/.test(b[i + CURRENCY_CODE.length] ?? ' ')) {
          out.currency.problems.push(`${rel}: الرمز ${CURRENCY_CODE} في نصّ أوردي ⇐ «${snip(b, i, 3)}»`);
          break;
        }
      }
      const saudi = SAUDI_RIYAL.slice(0, SAUDI_RIYAL.length - RIYAL.length).trimEnd();
      for (let i = b.indexOf(RIYAL); i !== -1; i = b.indexOf(RIYAL, i + 1)) {
        const before = b.slice(0, i).trimEnd();
        if (before.endsWith(saudi) && /\d$/.test(before.slice(0, -saudi.length).trimEnd())) { out.currency.stats.amounts++; break; }
        if (/\d$/.test(before)) { out.currency.problems.push(`${rel}: أول مبلغ في الحقل بلا «${SAUDI_RIYAL}» ⇐ «${snip(b, i, RIYAL.length)}»`); break; }
      }

      // P8 — لا علامة إضافة فارسية خارج مركّب مسجّل
      let free = b;
      for (const k of registered) free = free.split(k).join(' ');
      for (const cp of IZAFAT_MARKS) { const i = free.indexOf(String.fromCodePoint(cp)); if (i !== -1) out.izafat.problems.push(`${rel}: علامة إضافة ${hex(cp)} ⇐ «${snip(free, i)}»`); }

      // P12 — جمع «غار» المؤنث لا يُكتب
      { const i = b.indexOf(CAVES_RETIRED); if (i !== -1) out.caves.problems.push(`${rel}: «${CAVES_RETIRED}» ⇐ «${snip(b, i, CAVES_RETIRED.length)}»`); }

      // P13 — ساعة 12 مع جزء اليوم
      { const m = /\d:00(?!\d)/.exec(b); if (m) out.clock.problems.push(`${rel}: ساعة تامة بـ«:00» ⇐ «${snip(b, m.index, 4)}»`); }
      { const m = /(?<![\d:.])(?:1[3-9]|2[0-4]):[0-5]\d(?!\d)/.exec(b); if (m) out.clock.problems.push(`${rel}: ساعة 13 فأكثر ⇐ «${snip(b, m.index, m[0].length)}»`); }
      for (let i = b.indexOf(CLOCK_WORD); i !== -1; i = b.indexOf(CLOCK_WORD, i + 1)) {
        if (LETTER.test(b[i - 1] ?? ' ') || LETTER.test(b[i + CLOCK_WORD.length] ?? ' ')) continue; // جزء من كلمة أخرى
        out.clock.stats.times++;
        const before = b.slice(0, i);
        const num = CLOCK_NUMBER.exec(before);
        if (!num) { out.clock.problems.push(`${rel}: «${CLOCK_WORD}» بلا رقم قبلها ⇐ «${snip(b, i, CLOCK_WORD.length)}»`); continue; }
        if (Number(num[1]) >= 13 || Number(num[1]) === 0) out.clock.problems.push(`${rel}: ساعة خارج نظام 12 ⇐ «${snip(b, i, CLOCK_WORD.length)}»`);
        if (!DAY_PARTS.some((d) => wordAt(before, d) !== -1)) out.clock.problems.push(`${rel}: «${CLOCK_WORD}» بلا جزء يوم قبلها ⇐ «${snip(b, i, CLOCK_WORD.length)}»`);
        // لا شرطة بين وقتين: شرطة تلي كلمة الساعة ويليها وقت آخر («8 … – 10 …»)، أو شرطة
        // تفصل رقم هذه الساعة عن رقم قبله («8–10 …»). شرطةٌ بعد وقتٍ لا يليها وقت ليست مدى.
        const after = b.slice(i + CLOCK_WORD.length).trimStart();
        const lead = before.slice(0, num.index).trimEnd();
        const dashAfter = DASHES.includes(after[0]) && after.includes(CLOCK_WORD);
        const dashBefore = DASHES.includes(lead.at(-1)) && /\d$/.test(lead.slice(0, -1).trimEnd());
        if (dashAfter || dashBefore) out.clock.problems.push(`${rel}: شرطة بين وقتَي ساعة ⇐ «${snip(b, i, CLOCK_WORD.length)}»`);
      }

      // P16 — الدخيل المسحوب
      for (const w of LOAN_WHOLE_WORD) { const i = wordAt(b, w); if (i !== -1) out.loans.problems.push(`${rel}: دخيل مسحوب «${w}» ⇐ «${snip(b, i, w.length)}»`); }
      for (const w of LOAN_ANYWHERE) { const i = b.indexOf(w); if (i !== -1) out.loans.problems.push(`${rel}: دخيل مسحوب «${w}» ⇐ «${snip(b, i, w.length)}»`); }
    }
    if (pageHasHead) out.head.stats.carriers++;
    for (const n of pageNames) nameSeen.set(n, nameSeen.get(n) + 1);
    if (pageNames.size) out.names.stats.carriers++;
  }

  // حرّاس إيجابيون: الصيغ المعتمدة واردة فعلاً، والنص المفحوص ليس فارغاً
  if (!pages.length || urduBlocks === 0) {
    for (const r of Object.values(out)) r.problems.push('لا نصّ أوردياً في صفحات /ur/ — الحارس صار فارغاً');
  } else {
    for (const [n, c] of nameSeen) if (c === 0) out.names.problems.push(`الصيغة المعتمدة «${n}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
    if (out.head.stats.carriers === 0) out.head.problems.push(`«${HEAD_NAME}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
  }
  for (const r of Object.values(out)) r.stats.blocks = urduBlocks;
  return Object.values(out);
}
