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

// ── C59–C65: حرّاس أحكام الجولة 1 ─────────────────────────────────────────────────────────
// أحكام حاكمي دفعة الواجهة ودفعتَي المعالم الأوليين (2026-10-12) التي يسمّي كلٌّ منها فحص بناء؛
// نصّ كل حكم في المعجم (_meta.calibration_rulings) بمعرّفه، وسلاسله هنا منسوخة منه ويُعاد التحقق
// عند كل تشغيل أنها ما زالت واردة فيه حرفياً.
export const GULF = 'خلیج';
// P5 بقرار إياد 2026-10-27: الاسم الموصوف وحده، والفارسي والصفة المجرّدة محظوران. والمستثنى بعد الكلمة: اسم مجلس
// التعاون الرسمي. وعلم الشارع «الخلیج سڑک» لا يُعدّ كلمةً مستقلة (الأداة ملتصقة به).
export const GULF_ARABIAN = 'خلیج عرب';
export const GULF_PERSIAN = 'خلیج فارس';
export const GULF_ADJ = 'خلیجی';
export const GULF_ORG = 'خلیج تعاون کونسل';
export const GULF_QUALIFIED = [GULF_PERSIAN, GULF_ARABIAN];
export const LIME_LOAN = 'لائم';
export const SCALE_LOANS = ['ملین', 'بلین'];
export const SCALE_WORD = 'لاکھ';
// كلمات المقياس الثلاث كما يعرّفها الحكم P10: الكلمة، وأُسّها العشري، وعبارة الحكم التي تسبقها حرفياً
export const SCALE_WORDS = [[SCALE_WORD, 5, 'million = 10'], ['کروڑ', 7, 'ten million = 1'], ['ارب', 9, 'a thousand million = 1']];
// الحكم N66: الرقم المجرّد من أول كلمات المقياس فصاعداً يُكتب بها — جملته في المعجم شرط سريان الفحص
export const SCALE_BARE_RULE = 'A figure of one lakh or more is written in the Urdu scale';
// المدينتان ووصفهما اللازم بعدهما
export const HOLY_CITIES = [['مدینہ', 'منورہ'], ['مکہ', 'مکرمہ']];
export const PALACE_GENERIC = 'قصر';
export const PALACE_FORBIDDEN = ['صاہود محل', 'خزام محل', 'محیرس محل', 'ابراہیم محل'];
export const SEMICOLON = '؛';
export const EN_DASH = '–';
export const ROUND1_TOKENS = [GULF, ...GULF_QUALIFIED, LIME_LOAN, ...SCALE_LOANS, ...SCALE_WORDS.map(([w]) => w), ...HOLY_CITIES.flat(), PALACE_GENERIC, ...PALACE_FORBIDDEN];

const ATTRACTION_PAGE = /^ur\/attractions\/[^/]+\/index\.html$/;
// سنتا الميلاد والوفاة بين قوسين: الموضع الوحيد الذي تُكتب فيه الشرطة U+2013 (الحكم N13)
const LIFESPAN = /\(\d{4}–\d{4}\)/g;

// كلٌّ من الدوال الآتية يفحص كتلة نصّ واحدة لحكم واحد، ويضيف مشكلاته إلى نتيجة الحكم r.

// P5 — الخليج العربي (قرار إياد 2026-10-27). يعيد true إن ورد الاسم الموصوف في الكتلة.
function gulfIn(b, rel, r) {
  const p = b.indexOf(GULF_PERSIAN);
  if (p !== -1) r.problems.push(`${rel}: «${GULF_PERSIAN}» ⇐ «${snip(b, p, GULF_PERSIAN.length)}»`);
  for (let i = wordAt(b, GULF); i !== -1; i = wordAt(b, GULF, i + 1)) {
    if (b.startsWith(GULF_ARABIAN, i) || b.startsWith(GULF_ORG, i) || b.startsWith(GULF_PERSIAN, i)) continue;
    r.problems.push(`${rel}: «${GULF}» بلا «عرب» ⇐ «${snip(b, i, GULF.length)}»`);
  }
  const a = wordAt(b, GULF_ADJ);
  if (a !== -1) r.problems.push(`${rel}: الصفة «${GULF_ADJ}» بلا الاسم ⇐ «${snip(b, a, GULF_ADJ.length)}»`);
  return b.includes(GULF_ARABIAN);
}

// P6 — اسم الثمرة لا الدخيل
function limeIn(b, rel, r) {
  const i = wordAt(b, LIME_LOAN);
  if (i !== -1) r.problems.push(`${rel}: دخيل «${LIME_LOAN}» ⇐ «${snip(b, i, LIME_LOAN.length)}»`);
}

// P9 — المدينتان بوصفهما عند كل ذكر
function citiesIn(b, rel, r) {
  for (const [city, epithet] of HOLY_CITIES) {
    for (let i = wordAt(b, city); i !== -1; i = wordAt(b, city, i + 1)) {
      r.stats.mentions++;
      const rest = b.slice(i + city.length);
      const bare = !rest.startsWith(' ' + epithet) || LETTER.test(rest[epithet.length + 1] ?? ' ');
      if (bare) r.problems.push(`${rel}: «${city}» بلا «${epithet}» بعدها ⇐ «${snip(b, i, city.length)}»`);
    }
  }
}

// رقمٌ مكتوب: أرقام لاتينية بفاصلة آلاف وكسر عشري اختياريين
const FIGURE = '\\d+(?:,\\d{3})*(?:\\.\\d+)?';
const BARE_FIGURE = new RegExp(FIGURE, 'g');
// قيمة الرقم مضروباً في 10^exp مفتاحاً قانونياً بلا حساب عائم: «25» بأُس 5 و«2.5» بأُس 6
// و«2,500,000» بأُس 0 كلها «25e5»
const valueKey = (figure, exp = 0) => {
  const [int, frac = ''] = figure.split(',').join('').split('.');
  let digits = (int + frac).replace(/^0+(?=\d)/, '');
  let e = exp - frac.length;
  while (digits.length > 1 && digits.endsWith('0')) { digits = digits.slice(0, -1); e++; }
  return `${digits}e${e}`;
};
const SCALE_EXP = new Map(SCALE_WORDS.map(([w, exp]) => [w, exp]));
const SCALE_FROM = Math.min(...SCALE_EXP.values());
// رقمٌ بعده إحدى كلمات المقياس كلمةً كاملة
const SCALED_UR = new RegExp(`(${FIGURE}) ?(${SCALE_WORDS.map(([w]) => w).join('|')})(?![\\p{L}\\p{M}])`, 'gu');
// نظيره في الصفحة الإنجليزية: million / billion بعد الرقم، أو M ملتصقةً به، أو K للألف (صفحة الثمار:
// «400K» = «4 لاکھ»)
const SCALED_EN = [
  [new RegExp(`(${FIGURE})\\s?million\\b`, 'gi'), 6],
  [new RegExp(`(${FIGURE})\\s?billion\\b`, 'gi'), 9],
  [new RegExp(`(${FIGURE})M(?![A-Za-z])`, 'g'), 6],
  [new RegExp(`(${FIGURE})K(?![A-Za-z])`, 'g'), 3],
];

/**
 * قيم أرقام صفحة مبنية (الإنجليزية المقابلة لصفحة /ur/): كل رقم مجرّد، وكل رقم بمقياسه.
 * @param {string} html
 * @returns {Set<string>} مفاتيح valueKey
 */
export function figureValues(html) {
  const bare = cutBlocks(cutBlocks(html, 'script').out, 'style').out;
  const text = decode([tagsToBreaks(bare), ...textAttributes(bare)].join('\n'));
  const out = new Set();
  for (const [re, exp] of SCALED_EN) for (const m of text.matchAll(re)) out.add(valueKey(m[1], exp));
  for (const m of text.matchAll(BARE_FIGURE)) out.add(valueKey(m[0]));
  return out;
}

// P10 — المقياس الأوردي لا الدخيلان. يعيد true إن وردت كلمة المقياس في الكتلة.
// source: قيم أرقام الصفحة الإنجليزية المقابلة، أو null حيث لا مقابل (فلا مقارنة).
function scaleIn(b, rel, r, source) {
  for (const w of SCALE_LOANS) {
    const i = wordAt(b, w);
    if (i !== -1) r.problems.push(`${rel}: مقياس دخيل «${w}» ⇐ «${snip(b, i, w.length)}»`);
  }
  // الرقم بكلمة مقياسه يُقابَل بالقيمة: «1» بكلمة 10^5 = «100,000» في الإنجليزية
  const rest = b.replace(SCALED_UR, (whole, figure, word, i) => {
    if (source) {
      r.stats.compared++;
      if (!source.has(valueKey(figure, SCALE_EXP.get(word)))) r.problems.push(`${rel}: «${whole}» لا يساويه رقم في الصفحة الإنجليزية المقابلة ⇐ «${snip(b, i, whole.length)}»`);
    }
    return ' '.repeat(whole.length);
  });
  // N66: الرقم المجرّد من أول المقياس فصاعداً يُكتب بكلمته (سلسلة تبدأ بصفر ليست عدداً بهذا القدر)
  for (const m of rest.matchAll(BARE_FIGURE)) {
    const int = m[0].split('.')[0].split(',').join('');
    if (int.length > SCALE_FROM && !int.startsWith('0')) r.problems.push(`${rel}: رقم مجرّد «${m[0]}» بلا كلمة مقياس (من «1 ${SCALE_WORD}» فصاعداً) ⇐ «${snip(rest, m.index, m[0].length)}»`);
  }
  return wordAt(b, SCALE_WORD) !== -1;
}

// N13 — الشرطة U+2013 بين سنتَي عمرٍ داخل قوسين وحدها
function dashIn(b, rel, r) {
  const free = b.replace(LIFESPAN, () => { r.stats.lifespans++; return ' '; });
  const i = free.indexOf(EN_DASH);
  if (i !== -1) r.problems.push(`${rel}: شرطة U+2013 خارج سنتَي عمر بين قوسين ⇐ «${snip(free, i)}»`);
}

// N14 — صيغ «… محل» لا تُكتب لعناوين القصور
function palaceIn(b, rel, r) {
  for (const f of PALACE_FORBIDDEN) {
    const i = b.indexOf(f);
    if (i !== -1) r.problems.push(`${rel}: صيغة عنوان مسحوبة «${f}» ⇐ «${snip(b, i, f.length)}»`);
  }
}

// N14 — عنوانٌ عربيه يبدأ بـ«قصر » يبدأ أورديُّه بها (من المصدر)
function palaceTitles(titles, r) {
  for (const t of titles) {
    if (!t.ur || !t.ar?.startsWith(PALACE_GENERIC + ' ')) continue;
    r.stats.titles++;
    if (!t.ur.startsWith(PALACE_GENERIC + ' ')) r.problems.push(`${t.file}: عنوان أوردي لا يبدأ بـ«${PALACE_GENERIC} » ⇐ «${t.ur}»`);
  }
}

// N33 — لا «؛» في صفحة معلم
function semicolonIn(b, rel, r) {
  const i = b.indexOf(SEMICOLON);
  if (i !== -1) r.problems.push(`${rel}: «${SEMICOLON}» في صفحة معلم ⇐ «${snip(b, i)}»`);
}

// حرّاس إيجابيون: الفحص ليس فارغاً. compares: الصفحات الإنجليزية المقابلة مُرِّرت للمقارنة بالقيمة.
function round1Emptiness(out, compares) {
  if (out.gulf.stats.carriers === 0) out.gulf.problems.push(`«${GULF_ARABIAN}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
  if (out.cities.stats.mentions === 0) out.cities.problems.push('لا ذكر لأيٍّ من المدينتين في صفحات /ur/ — الحارس صار فارغاً');
  if (out.scale.stats.carriers === 0) out.scale.problems.push(`«${SCALE_WORD}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
  if (compares && out.scale.stats.compared === 0) out.scale.problems.push('لا رقم بكلمة مقياس قوبل بصفحته الإنجليزية — الحارس صار فارغاً');
  if (out.palace.stats.titles === 0) out.palace.problems.push('لا عنوان قصر أوردياً في المصدر — الحارس صار فارغاً');
  if (out.semicolon.stats.pages === 0) out.semicolon.problems.push('لا صفحة معلم أوردية في المخرج — الحارس صار فارغاً');
}

/**
 * C59–C65. @param {{ rel: string, html: string }[]} pages صفحات /ur/ المبنية
 * @param {object} termbase المعجم محلَّلاً
 * @param {{ titles?: { file: string, ar?: string, ur?: string }[], counterparts?: Map<string, string> }} [opts]
 *   titles: عنوانا كل معلم في المصدر (العربي والأوردي) لقاعدة عنوان القصور
 *   counterparts: لكل صفحة /ur/ (بمفتاح rel) نصّ HTML لصفحتها الإنجليزية المقابلة، لمقارنة
 *   الأرقام المكتوبة بكلمة مقياس بالقيمة؛ بغيابها لا مقارنة
 * @returns {{ id: string, problems: string[], stats: Record<string, number> }[]}
 */
export function checkUrRound1Rulings(pages, termbase, { titles = [], counterparts = null } = {}) {
  const tbText = JSON.stringify(termbase);
  const drift = ROUND1_TOKENS.filter((t) => !tbText.includes(t)).map((t) => `سلسلة حارس غائبة عن المعجم: «${t}»`);
  // كل كلمة مقياس بعبارة الحكم التي تعرّف قدرها، وجملة حكم الرقم المجرّد، واردتان في المعجم حرفياً
  const scaleDrift = SCALE_WORDS.filter(([w, , clause]) => !tbText.includes(`${clause} «${w}»`)).map(([w, , clause]) => `عبارة الحكم «${clause} «${w}»» غائبة عن المعجم`);
  if (!tbText.includes(SCALE_BARE_RULE)) scaleDrift.push(`جملة الحكم «${SCALE_BARE_RULE}» غائبة عن المعجم`);
  const out = {
    gulf: { id: 'P5', problems: [...drift], stats: { carriers: 0 } },
    lime: { id: 'P6', problems: [], stats: {} },
    cities: { id: 'P9', problems: [], stats: { mentions: 0 } },
    scale: { id: 'P10', problems: scaleDrift, stats: { carriers: 0, compared: 0 } },
    dash: { id: 'N13', problems: [], stats: { lifespans: 0 } },
    palace: { id: 'N14', problems: [], stats: { titles: 0 } },
    semicolon: { id: 'N33', problems: [], stats: { pages: 0 } },
  };
  let urduBlocks = 0;

  for (const { rel, html } of pages) {
    const blocks = urTextBlocks(html).blocks.filter((b) => ARABIC_SCRIPT.test(b));
    urduBlocks += blocks.length;
    const isAttraction = ATTRACTION_PAGE.test(rel);
    if (isAttraction) out.semicolon.stats.pages++;
    let hasGulf = false;
    let hasScale = false;
    const source = counterparts?.has(rel) ? figureValues(counterparts.get(rel)) : null;
    for (const b of blocks) {
      hasGulf = gulfIn(b, rel, out.gulf) || hasGulf;
      limeIn(b, rel, out.lime);
      citiesIn(b, rel, out.cities);
      hasScale = scaleIn(b, rel, out.scale, source) || hasScale;
      dashIn(b, rel, out.dash);
      palaceIn(b, rel, out.palace);
      if (isAttraction) semicolonIn(b, rel, out.semicolon);
    }
    if (hasGulf) out.gulf.stats.carriers++;
    if (hasScale) out.scale.stats.carriers++;
  }
  palaceTitles(titles, out.palace);

  const empty = !pages.length || urduBlocks === 0;
  for (const r of Object.values(out)) {
    if (empty) r.problems.push('لا نصّ أوردياً في صفحات /ur/ — الحارس صار فارغاً');
    r.stats.blocks = urduBlocks;
  }
  if (!empty) round1Emptiness(out, Boolean(counterparts));
  return Object.values(out);
}

// ── C67–C70: حرّاس أحكام الجولة 2 ─────────────────────────────────────────────────────────
// أحكام حاكمي دفعات المعالم الثلاث التالية (2026-10-13) المصوغة في المعجم حظراً حرفياً أو قاعدة
// موضع؛ نصّ كل حكم في المعجم (_meta.calibration_rulings) بمعرّفه، وسلاسله هنا منسوخة منه آلياً
// ويُعاد التحقق عند كل تشغيل أنها ما زالت واردة فيه حرفياً.
// الضمائر الأربعة برسمها المعتمد (الهاء U+06C1) ورسمها المحظور (U+06BE) كما يسردهما الحكم P22.
// الضمير الخامس في عنوان الحكم أُخرج منه فلا يُفحص.
export const PRONOUNS = ['جنہیں', 'انہیں', 'انہوں', 'جنہوں'];
export const PRONOUNS_BANNED = ['جنھیں', 'انھیں', 'انھوں', 'جنھوں'];
// سجلّ المساجد التاريخية: اسمه المعتمد، وصياغة جملة الصلة المسحوبة (الحكم N46)
export const REGISTER_NAME = 'الاحساء کی تاریخی مساجد کی سرکاری فہرست';
export const REGISTER_WITHDRAWN = 'جو سرکاری طور پر درج ہیں';
// اسم ثانٍ يضعه المصدر بين علامتَي تنصيص ولا يحمل اسماً عاماً أوردياً (الحكم N72)
export const SECOND_NAME = 'ابا الکباری';
export const QUOTE_OPEN = '“';
export const QUOTE_CLOSE = '”';
// اسم منقحر ينتهي رسمه العربي بألف مقصورة: U+06CC ثم الألف الخنجرية U+0670، والمفتاح بلاها مسحوب (الحكم N82)
export const MAQSURA_NAME = 'سلویٰ';
export const MAQSURA_NAME_RETIRED = 'سلوی';
export const ROUND2_TOKENS = [...PRONOUNS, ...PRONOUNS_BANNED, REGISTER_NAME, REGISTER_WITHDRAWN, SECOND_NAME, MAQSURA_NAME, MAQSURA_NAME_RETIRED];

const HEH_GOAL = 'ہ';
const HEH_DOACHASHMEE = 'ھ';
const SUPERSCRIPT_ALEF = 'ٰ';

// P22 — الضمائر الأربعة لا تُكتب بـU+06BE، أينما ورد الرسم (ومعه ما بُني عليها)
function pronounsIn(b, rel, r) {
  for (const f of PRONOUNS_BANNED) {
    const i = b.indexOf(f);
    if (i !== -1) r.problems.push(`${rel}: ضمير برسم U+06BE «${f}» ⇐ «${snip(b, i, f.length)}»`);
  }
  if (PRONOUNS.some((p) => b.includes(p))) r.stats.written++;
}

// N46 — صياغة جملة الصلة المسحوبة. يعيد true إن ورد اسم السجلّ المعتمد في الكتلة.
function registerIn(b, rel, r) {
  const i = b.indexOf(REGISTER_WITHDRAWN);
  if (i !== -1) r.problems.push(`${rel}: صياغة مسحوبة «${REGISTER_WITHDRAWN}» ⇐ «${snip(b, i, REGISTER_WITHDRAWN.length)}»`);
  return b.includes(REGISTER_NAME);
}

// N72 — الاسم الثاني بين U+201C وU+201D عند كل ذكر
function secondNameIn(b, rel, r) {
  for (let i = b.indexOf(SECOND_NAME); i !== -1; i = b.indexOf(SECOND_NAME, i + 1)) {
    r.stats.mentions++;
    const marked = b[i - 1] === QUOTE_OPEN && b[i + SECOND_NAME.length] === QUOTE_CLOSE;
    if (!marked) r.problems.push(`${rel}: «${SECOND_NAME}» بلا علامتَي التنصيص ⇐ «${snip(b, i, SECOND_NAME.length)}»`);
  }
}

// N82 — المفتاح بلا الألف الخنجرية كلمةً كاملة. يعيد true إن ورد الاسم بعلامته في الكتلة.
function maqsuraIn(b, rel, r) {
  const i = wordAt(b, MAQSURA_NAME_RETIRED);
  if (i !== -1) r.problems.push(`${rel}: اسم بلا الألف الخنجرية «${MAQSURA_NAME_RETIRED}» ⇐ «${snip(b, i, MAQSURA_NAME_RETIRED.length)}»`);
  return wordAt(b, MAQSURA_NAME) !== -1;
}

// السلاسل واردة في المعجم، والمحظور مشتقّ من المعتمد حرفاً بحرف — وإلا انحرفت القائمة عن مصدرها
function round2Drift(termbase) {
  const tbText = JSON.stringify(termbase);
  const drift = ROUND2_TOKENS.filter((t) => !tbText.includes(t)).map((t) => `سلسلة حارس غائبة عن المعجم: «${t}»`);
  PRONOUNS.forEach((p, i) => {
    if (!p.includes(HEH_GOAL) || p.split(HEH_GOAL).join(HEH_DOACHASHMEE) !== PRONOUNS_BANNED[i]) drift.push(`الرسم المحظور «${PRONOUNS_BANNED[i]}» ليس «${p}» بـU+06BE`);
  });
  if (PRONOUNS.length !== PRONOUNS_BANNED.length) drift.push('قائمتا الضمائر مختلفتا الطول');
  if (MAQSURA_NAME !== MAQSURA_NAME_RETIRED + SUPERSCRIPT_ALEF) drift.push(`«${MAQSURA_NAME}» ليس «${MAQSURA_NAME_RETIRED}» متبوعاً بـU+0670`);
  return drift;
}

// حرّاس إيجابيون: الفحص ليس فارغاً
function round2Emptiness(out) {
  if (out.register.stats.carriers === 0) out.register.problems.push(`«${REGISTER_NAME}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
  if (out.secondName.stats.mentions === 0) out.secondName.problems.push(`«${SECOND_NAME}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
  if (out.maqsura.stats.carriers === 0) out.maqsura.problems.push(`«${MAQSURA_NAME}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
}

/**
 * C67–C70. @param {{ rel: string, html: string }[]} pages صفحات /ur/ المبنية
 * @param {object} termbase المعجم محلَّلاً
 * @returns {{ id: string, problems: string[], stats: Record<string, number> }[]}
 */
export function checkUrRound2Rulings(pages, termbase) {
  const out = {
    pronouns: { id: 'P22', problems: round2Drift(termbase), stats: { written: 0 } },
    register: { id: 'N46', problems: [], stats: { carriers: 0 } },
    secondName: { id: 'N72', problems: [], stats: { mentions: 0 } },
    maqsura: { id: 'N82', problems: [], stats: { carriers: 0 } },
  };
  let urduBlocks = 0;

  for (const { rel, html } of pages) {
    const blocks = urTextBlocks(html).blocks.filter((b) => ARABIC_SCRIPT.test(b));
    urduBlocks += blocks.length;
    let hasRegister = false;
    let hasMaqsura = false;
    for (const b of blocks) {
      pronounsIn(b, rel, out.pronouns);
      hasRegister = registerIn(b, rel, out.register) || hasRegister;
      secondNameIn(b, rel, out.secondName);
      hasMaqsura = maqsuraIn(b, rel, out.maqsura) || hasMaqsura;
    }
    if (hasRegister) out.register.stats.carriers++;
    if (hasMaqsura) out.maqsura.stats.carriers++;
  }

  const empty = !pages.length || urduBlocks === 0;
  for (const r of Object.values(out)) {
    if (empty) r.problems.push('لا نصّ أوردياً في صفحات /ur/ — الحارس صار فارغاً');
    r.stats.blocks = urduBlocks;
  }
  if (!empty) round2Emptiness(out);
  return Object.values(out);
}

// اسم «ليالي كفو» بفتحة على الكاف تفرقه عن «کُفُو» (الكفاءة في الزواج)؛ الرسم بلا فتحة مسحوب (حكم المالك N406)
export const KAFU_NAME = 'کَفو';
export const KAFU_NAME_RETIRED = 'کفو';
const FATHA = '\u064E';

/**
 * C71. @param {{ rel: string, html: string }[]} pages صفحات /ur/ المبنية
 * @param {object} termbase المعجم محلَّلاً
 * @returns {{ id: string, problems: string[], stats: Record<string, number> }[]}
 */
export function checkUrOwnerRulings(pages, termbase) {
  const tbText = JSON.stringify(termbase);
  const kafu = { id: 'N406', problems: [], stats: { mentions: 0, carriers: 0 } };
  for (const t of [KAFU_NAME, KAFU_NAME_RETIRED]) if (!tbText.includes(t)) kafu.problems.push(`سلسلة حارس غائبة عن المعجم: «${t}»`);
  if (KAFU_NAME !== KAFU_NAME_RETIRED[0] + FATHA + KAFU_NAME_RETIRED.slice(1)) kafu.problems.push(`«${KAFU_NAME}» ليس «${KAFU_NAME_RETIRED}» بفتحة U+064E على أوله`);
  let urduBlocks = 0;

  for (const { rel, html } of pages) {
    const blocks = urTextBlocks(html).blocks.filter((b) => ARABIC_SCRIPT.test(b));
    urduBlocks += blocks.length;
    let has = false;
    for (const b of blocks) {
      const i = wordAt(b, KAFU_NAME_RETIRED);
      if (i !== -1) kafu.problems.push(`${rel}: «${KAFU_NAME_RETIRED}» بلا فتحة ⇐ «${snip(b, i, KAFU_NAME_RETIRED.length)}»`);
      for (let j = wordAt(b, KAFU_NAME); j !== -1; j = wordAt(b, KAFU_NAME, j + 1)) { kafu.stats.mentions++; has = true; }
    }
    if (has) kafu.stats.carriers++;
  }

  if (!pages.length || urduBlocks === 0) kafu.problems.push('لا نصّ أوردياً في صفحات /ur/ — الحارس صار فارغاً');
  else if (kafu.stats.mentions === 0) kafu.problems.push(`«${KAFU_NAME}» لا ترد في أي صفحة /ur/ — الحارس صار فارغاً`);
  kafu.stats.blocks = urduBlocks;
  return [kafu];
}
