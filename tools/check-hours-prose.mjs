// C83 — المواعيد المكتوبة نثراً تطابق المواعيد المنظّمة وتتطابق بين اللغات.
//
// الموعد الواحد مكتوب في ملف المعلم عدة مرات: بند «المواعيد» في practical بسبع لغات، وhoursSpec
// (يُصيَّر openingHoursSpecification)، وفقرة الإجابة والوصف والأسئلة الشائعة والمتن. وتغيير الموعد
// في موضع واحد يترك البقية تقول شيئاً آخر، والبناء أخضر. هذا الفحص يقرأ الأوقات والأيام من النص
// نفسه ويقابلها.
//
// يحرس:
//   (أ) بند practical الواحد يذكر الأوقات نفسها في كل لغاته (8 ص = 8 am = 8:00 = 08.00 = صبح 8 بجے).
//   (ب) بند المواعيد يذكر الأيام نفسها في كل لغاته («السبت–الخميس» مدىً يُفكّ إلى أيامه).
//   (ج) حيث يحمل الملف hoursSpec: أوقات بند المواعيد هي أوقات hoursSpec بلا زيادة ولا نقص، وكل يوم
//       تختلف ساعاته عن غالب الأسبوع (أو يُغلق) مسمّى في البند، وكل يوم مسمّى منفرداً تختلف ساعاته
//       فعلاً (بند يخصّ الجمعة بمساءٍ وhoursSpec يفتحها كبقية الأيام = تعارض).
//   (د) كل وقت في نثر الملف (فقرة الإجابة والوصف والملخص وbestTime والأسئلة الشائعة والمتن)، بكل
//       لغة، وارد في بنود practical الموثّقة للملف نفسه: لا موعد في النثر من خارج بطاقة الزيارة.
//   (هـ) حيث يحمل الملف hoursSpec: فقرة الإجابة أو الوصف أو جواب سؤال شائع يسمّي يوماً منفرداً على
//       مقربة من وقت (≤30 محرفاً)، فذلك اليوم تختلف ساعاته في hoursSpec فعلاً («10 م (الجمعة مساءً
//       فقط)» وhoursSpec يفتحها صباحاً = تعارض). القرب لا الحقل كله: «أول موضع أُقيمت فيه الجمعة»
//       في جملة و«يفتح يومياً من 8 ص» في أخرى ليس تخصيصاً. والمتن الطويل خارج هذا البند.
//
// ما لا يحرسه (عمداً): يوم تختلف ساعاته ولا يسمّيه النثر (الجواب المختصر ليس خطأً)، والأوقات المبهمة
// («ظهراً» بلا رقم)، والساعات الروسية بلا دقائق («с 8 до 23 часов» تلتبس بالمدة «1–2 часа»؛ الخط الروسي
// يكتب 8:00). وما خارج ملفات المعالم (المدونة والمسارات والفعاليات).
//
// checkHoursProse دالة نقية بلا قراءة ملفات (القراءة في collectAttractionFiles وحدها): يستدعيها
// check-consistency.mjs، ويستدعيها tools/test-hours-prose.mjs بنسخ معدَّلة في الذاكرة.
// قراءة النص محرفاً محرفاً بلا تعابير نمطية مركّبة.

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

/** ملفات المعالم من المصدر: الترويسة محلَّلةً والمتن العربي. نهايات الأسطر تُوحَّد على LF. */
export function collectAttractionFiles(root) {
  const dir = path.join(root, 'src/content/attractions');
  const files = [];
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.md')).sort((a, b) => a.localeCompare(b))) {
    const text = readFileSync(path.join(dir, name), 'utf8').replaceAll('\r\n', '\n');
    const end = text.startsWith('---\n') ? text.indexOf('\n---', 3) : -1;
    if (end === -1) { files.push({ slug: name.slice(0, -3), data: {}, body: text }); continue; }
    const after = text.indexOf('\n', end + 1);
    files.push({ slug: name.slice(0, -3), data: YAML.parse(text.slice(4, end)) ?? {}, body: after === -1 ? '' : text.slice(after + 1) });
  }
  return files;
}

export const LANGS = ['ar', 'en', 'zh', 'de', 'ru', 'ur', 'tr'];
export const EXPECT = { minRows: 30, minRowLangs: 150, minSpecFiles: 5, minProseFields: 50, minDayFields: 40 };

const SUFFIX = { ar: '', en: '_en', zh: '_zh', de: '_de', ru: '_ru', ur: '_ur', tr: '_tr' };
const WEEK = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];
const MIDNIGHT = 1440;
const DASHES = ['–', '—', '-', '−'];

const isDigit = (c) => c >= '0' && c <= '9';
const isLetter = (c) => c !== undefined && /[\p{L}\p{M}]/u.test(c);
const isSpace = (c) => c === ' ' || c === '\u00a0' || c === '\u202f' || c === '\t' || c === '\n';

/** التشكيل العربي يُحذف قبل القراءة: «ظهراً» و«ظهرًا» و«ظهرا» صيغة واحدة. */
const stripMarks = (t) => { let o = ''; for (const c of t) if (c < '\u064b' || c > '\u0652') o += c; return o; };
const lower = (raw, lang) => {
  const src = lang === 'ar' || lang === 'ur' ? stripMarks(raw) : raw;
  return lang === 'tr' ? src.toLocaleLowerCase('tr') : src.toLowerCase();
};

/** 23:59 إغلاق منتصف الليل في hoursSpec، و0 و24:00 منتصف الليل في النثر: قيمة واحدة. */
const norm = (m) => (m === 0 || m === 1439 ? MIDNIGHT : m);

/** هل تبدأ s عند الموضع i بالكلمة w كاملةً (ما بعدها ليس حرفاً)؟ */
const wordAt = (s, i, w) => s.startsWith(w, i) && !isLetter(s[i + w.length]);
/** هل تنتهي s عند الموضع i (غير شامل) بالكلمة w كاملةً (ما قبلها ليس حرفاً)؟ */
const wordBefore = (s, i, w) => i >= w.length && s.startsWith(w, i - w.length) && !isLetter(s[i - w.length - 1]);
const skipSpaces = (s, i) => { while (i < s.length && isSpace(s[i])) i++; return i; };
const backSpaces = (s, i) => { while (i > 0 && isSpace(s[i - 1])) i--; return i; };

/**
 * هل الرقم ملتصق بكلمة قبله («v2»، «الـ12»)؟ حرف العطف أو الجر العربي المفرد ليس التصاقاً:
 * «و4–11 م» و«ب8 ص» وقتان.
 */
const AR_PROCLITIC = ['و', 'ف', 'ب', 'ل'];
const isGlued = (text, start) => isLetter(text[start - 1]) && !(AR_PROCLITIC.includes(text[start - 1]) && !isLetter(text[start - 2]));

/**
 * التعابير الرقمية في النص: أرقام تتخللها «:» أو «.» أو «,». يُعاد منها ما يصلح ساعةً:
 * رقم من خانة أو خانتين (≤24) وحده، أو متبوعاً بدقيقتين (≤59) بعد «:» (وبعد «.» في التركية).
 * فلا يُقرأ «2.5 مليون» ولا «1,563» ولا «2026» ولا إحداثية.
 */
function numberTokens(text, lang) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    if (!isDigit(text[i])) { i++; continue; }
    const start = i;
    const parts = [];
    const seps = [];
    for (;;) {
      let j = i;
      while (j < text.length && isDigit(text[j])) j++;
      parts.push(text.slice(i, j));
      i = j;
      if ((text[i] === ':' || text[i] === '.' || text[i] === ',') && isDigit(text[i + 1])) { seps.push(text[i]); i++; } else break;
    }
    const h = Number(parts[0]);
    if (isGlued(text, start) || parts[0].length > 2 || h > 24) continue;
    if (parts.length === 1) out.push({ h, m: 0, hasMin: false, start, end: i });
    else if (parts.length === 2 && parts[1].length === 2 && Number(parts[1]) <= 59 && (seps[0] === ':' || (seps[0] === '.' && lang === 'tr'))) {
      out.push({ h, m: Number(parts[1]), hasMin: true, start, end: i });
    }
  }
  return out;
}

const PERIOD_AFTER = ['ar', 'en'];   // «8 ص»، «8 am»
const PERIOD_BEFORE = ['ur', 'zh'];  // «صبح 8 بجے»، «上午 8 点»
const CLOCK_24 = ['zh', 'de', 'ru', 'tr'];
const AFTER = {
  en: [['a.m.', 'am'], ['am', 'am'], ['p.m.', 'pm'], ['pm', 'pm'], ['noon', 'noon'], ['midnight', 'mid']],
  ar: [['منتصف الليل', 'mid'], ['صباحا', 'am'], ['فجرا', 'am'], ['ص', 'am'], ['مساء', 'pm'], ['عصرا', 'pm'], ['ليلا', 'night'], ['ظهرا', 'noon'], ['ظ', 'noon'], ['ع', 'pm'], ['م', 'pm']],
};
const BEFORE = {
  ur: [['سہ پہر', 'pm'], ['دوپہر', 'noon'], ['صبح', 'am'], ['شام', 'pm'], ['رات', 'night']],
  zh: [['上午', 'am'], ['早上', 'am'], ['凌晨', 'am'], ['中午', 'noon'], ['下午', 'pm'], ['傍晚', 'pm'], ['晚上', 'pm']],
};
const RANGE_WORDS = { ar: ['إلى', 'الى', 'حتى'], en: ['to', 'until'], de: ['bis'], ru: [], zh: ['至', '到'], ur: ['سے', 'بجے سے'], tr: [] };
const BARE_MIDNIGHT = { ar: ['منتصف الليل'], en: ['midnight'], zh: ['午夜'], de: ['mitternacht'], ru: ['полночь', 'полуночи'], ur: ['آدھی رات'], tr: ['gece yarısı'] };

function toMinutes(h, m, period) {
  if (period === 'mid') return MIDNIGHT;
  if (period === 'am') return (h % 12) * 60 + m;
  if (period === 'pm') return ((h % 12) + 12) * 60 + m;
  if (period === 'noon') return h === 12 ? 720 + m : ((h % 12) + 12) * 60 + m;
  // «ليلاً/رات»: 12 منتصف الليل، وما بعده حتى الفجر صباحاً، وما قبله مساءً
  if (h === 12) return MIDNIGHT;
  return h <= 5 ? h * 60 + m : ((h % 12) + 12) * 60 + m;
}

/** فترة الرقم من الكلمة الملاصقة له: بعده في العربية والإنجليزية، وقبله في الأوردو والصينية. */
function periodOf(text, t, lang) {
  if (PERIOD_AFTER.includes(lang)) {
    const a = skipSpaces(text, t.end);
    return AFTER[lang].find(([w]) => wordAt(text, a, w))?.[1];
  }
  if (!PERIOD_BEFORE.includes(lang)) return undefined;
  const b = backSpaces(text, t.start);
  // الصينية بلا فواصل كلمات: يكفي أن تسبق الكلمةُ الرقمَ مباشرة
  return BEFORE[lang].find(([w]) => (lang === 'zh' ? b >= w.length && text.startsWith(w, b - w.length) : wordBefore(text, b, w)))?.[1];
}

/** هل الرقم ساعةٌ بعلامة صريحة: دقائق في لغات 24 ساعة، أو «Uhr»/«点»/«بجے» بعده؟ */
function isMarked(text, t, lang) {
  const a = skipSpaces(text, t.end);
  if (lang === 'ur') return wordAt(text, a, 'بجے');
  if (lang === 'zh') return t.hasMin || ['点', '點', '时', '時'].includes(text[a]);
  if (lang === 'de') return t.hasMin || wordAt(text, a, 'uhr');
  return CLOCK_24.includes(lang) && t.hasMin;
}

/** هل ما بين الموضعين واصل مدى («–» أو «إلى» ونحوها) وحده؟ */
function isRangeGap(text, from, to, lang) {
  const gap = text.slice(from, to).trim();
  return DASHES.includes(gap) || RANGE_WORDS[lang].includes(gap);
}

// علامة الساعة الواحدة تختم قائمة: «9–13 und 16–20 Uhr»، «8、16 点»
const MARK_LINK = { de: ['und', ',', 'sowie'], zh: ['、', '和', '及'] };

/** المدى يرث من طرفه الآخر: «8–11:30 ص» و«4–11 م» و«8–16 Uhr» و«صبح 8 بجے سے 11:30 بجے». */
function inheritAcrossRanges(text, tokens, periods, marked, lang) {
  for (let k = tokens.length - 2; k >= 0; k--) {
    if (marked[k + 1] && MARK_LINK[lang]?.includes(text.slice(tokens[k].end, tokens[k + 1].start).trim())) marked[k] = true;
    if (!isRangeGap(text, tokens[k].end, tokens[k + 1].start, lang)) continue;
    if (PERIOD_AFTER.includes(lang) && periods[k] === undefined && periods[k + 1] !== undefined) {
      const end = toMinutes(tokens[k + 1].h, tokens[k + 1].m, periods[k + 1]);
      const same = toMinutes(tokens[k].h, tokens[k].m, periods[k + 1]);
      // «11–1 م»: الطرف الأول صباحاً إن جاء بفترة الثاني بعده
      periods[k] = same >= end && periods[k + 1] === 'pm' ? 'am' : periods[k + 1];
    }
    if (CLOCK_24.includes(lang) && marked[k + 1]) marked[k] = true;
  }
  if (!PERIOD_BEFORE.includes(lang)) return;
  for (let k = 1; k < tokens.length; k++) {
    if (periods[k] === undefined && periods[k - 1] !== undefined && isRangeGap(text, tokens[k - 1].end, tokens[k].start, lang)) periods[k] = periods[k - 1];
  }
}

/** قيمة الرقم الواحد: دقائق، أو 'unclear' لما يشبه وقتاً بلا فترة محسومة، أو undefined لما ليس وقتاً. */
function valueOf(t, period, marked, lang) {
  if (period !== undefined) return t.h > 12 && period !== 'mid' ? 'unclear' : norm(toMinutes(t.h, t.m, period));
  if (marked && CLOCK_24.includes(lang)) return norm(t.h * 60 + t.m);
  // 24 ساعة صريحة في لغة 12 ساعة («16:00»)
  if (t.hasMin && (t.h >= 13 || t.h === 0)) return norm(t.h * 60 + t.m);
  return t.hasMin || marked ? 'unclear' : undefined;
}

/** الأوقات في نص مطبَّع (lower) بمواضعها: spans مواضع ما حُسم وقتاً. */
function readClock(text, lang) {
  const tokens = numberTokens(text, lang);
  const periods = tokens.map((t) => periodOf(text, t, lang));
  const marked = tokens.map((t) => isMarked(text, t, lang));
  inheritAcrossRanges(text, tokens, periods, marked, lang);

  const times = new Set();
  const unclear = [];
  const spans = [];
  tokens.forEach((t, k) => {
    const v = valueOf(t, periods[k], marked[k], lang);
    if (v === 'unclear') unclear.push(text.slice(t.start, t.end));
    else if (v !== undefined) { times.add(v); spans.push({ start: t.start, end: t.end }); }
  });
  // «حتى منتصف الليل» بلا رقم
  for (const w of BARE_MIDNIGHT[lang]) {
    for (let at = text.indexOf(w); at !== -1; at = text.indexOf(w, at + w.length)) {
      if (!isLetter(text[at - 1]) && !isLetter(text[at + w.length])) { times.add(MIDNIGHT); spans.push({ start: at, end: at + w.length }); }
    }
  }
  return { times: [...times].sort((a, b) => a - b), unclear, spans };
}

/**
 * الأوقات المذكورة في نص بلغة معيّنة، دقائقَ من منتصف الليل (منتصف الليل = 1440).
 * unclear: ما يشبه وقتاً ولم تُحسم فترته (مثل «8:00» بلا ص/م في العربية).
 * @returns {{ times: number[], unclear: string[] }}
 */
export function clockTimes(raw, lang) {
  if (typeof raw !== 'string' || raw === '') return { times: [], unclear: [] };
  const { times, unclear } = readClock(lower(raw, lang), lang);
  return { times, unclear };
}

const DAY_WORDS = {
  ar: { السبت: 'Sa', الأحد: 'Su', الاحد: 'Su', الاثنين: 'Mo', الإثنين: 'Mo', الثلاثاء: 'Tu', الأربعاء: 'We', الاربعاء: 'We', الخميس: 'Th', الجمعة: 'Fr' },
  en: {
    sat: 'Sa', saturday: 'Sa', saturdays: 'Sa', sun: 'Su', sunday: 'Su', sundays: 'Su', mon: 'Mo', monday: 'Mo', mondays: 'Mo',
    tue: 'Tu', tues: 'Tu', tuesday: 'Tu', tuesdays: 'Tu', wed: 'We', wednesday: 'We', wednesdays: 'We',
    thu: 'Th', thur: 'Th', thurs: 'Th', thursday: 'Th', thursdays: 'Th', fri: 'Fr', friday: 'Fr', fridays: 'Fr',
  },
  zh: {},
  de: {
    samstag: 'Sa', samstags: 'Sa', sonnabend: 'Sa', sonntag: 'Su', sonntags: 'Su', montag: 'Mo', montags: 'Mo', dienstag: 'Tu', dienstags: 'Tu',
    mittwoch: 'We', mittwochs: 'We', donnerstag: 'Th', donnerstags: 'Th', freitag: 'Fr', freitags: 'Fr',
  },
  ru: { сб: 'Sa', вс: 'Su', пн: 'Mo', вт: 'Tu', ср: 'We', чт: 'Th', пт: 'Fr', среда: 'We', среду: 'We', среды: 'We', среде: 'We', средам: 'We' },
  ur: { ہفتہ: 'Sa', ہفتے: 'Sa', اتوار: 'Su', پیر: 'Mo', منگل: 'Tu', بدھ: 'We', جمعرات: 'Th', جمعہ: 'Fr', جمعے: 'Fr' },
  tr: { cumartesi: 'Sa', pazar: 'Su', pazartesi: 'Mo', salı: 'Tu', çarşamba: 'We', perşembe: 'Th', cuma: 'Fr' },
};
// اختصارات ألمانية لا تُقرأ يوماً إلا متبوعةً بنقطة («So.» لا «so»)
const DE_ABBR = { sa: 'Sa', so: 'Su', mo: 'Mo', di: 'Tu', mi: 'We', do: 'Th', fr: 'Fr' };
const RU_STEMS = [['суббот', 'Sa'], ['воскресень', 'Su'], ['понедельник', 'Mo'], ['вторник', 'Tu'], ['четверг', 'Th'], ['пятниц', 'Fr']];
const ZH_DAYS = { 一: 'Mo', 二: 'Tu', 三: 'We', 四: 'Th', 五: 'Fr', 六: 'Sa', 日: 'Su', 天: 'Su' };
const ZH_PREFIX = ['星期', '礼拜', '周'];
const AR_PREFIX = ['و', 'ف', 'ب', 'ك'];
const DAY_RANGE = { ar: ['إلى', 'الى', 'حتى'], en: ['to', 'through'], de: ['bis'], ru: ['по', 'до'], zh: ['至', '到'], ur: ['تا', 'سے'], tr: ["'den", "'dan", "'ten", "'tan"] };
const DAILY = {
  ar: ['يوميا', 'كل يوم', 'طوال الأسبوع'], en: ['daily', 'every day'], zh: ['每日', '每天'], de: ['täglich'],
  ru: ['ежедневно', 'каждый день'], ur: ['روزانہ', 'ہر روز'], tr: ['her gün'],
};

function dayOfWord(word, lang, nextChar) {
  const table = DAY_WORDS[lang];
  if (Object.hasOwn(table, word)) return table[word];
  if (lang === 'ar') {
    if (AR_PREFIX.includes(word[0]) && Object.hasOwn(table, word.slice(1))) return table[word.slice(1)];
    if (word.startsWith('لل') && Object.hasOwn(table, 'ال' + word.slice(2))) return table['ال' + word.slice(2)];
  }
  if (lang === 'de' && nextChar === '.' && Object.hasOwn(DE_ABBR, word)) return DE_ABBR[word];
  if (lang === 'ru') return RU_STEMS.find(([s]) => word.startsWith(s))?.[1];
  return undefined;
}

/** مواضع أسماء الأيام في النص. الصينية بلا فواصل كلمات فتُقرأ بالبادئة («周六»، «星期五»). */
function dayTokens(text, lang) {
  const found = [];
  let i = 0;
  while (i < text.length) {
    if (lang === 'zh') {
      const p = ZH_PREFIX.find((x) => text.startsWith(x, i));
      const day = p ? ZH_DAYS[text[i + p.length]] : undefined;
      if (day) { found.push({ day, start: i, end: i + p.length + 1 }); i += p.length + 1; } else i++;
      continue;
    }
    if (!isLetter(text[i])) { i++; continue; }
    let j = i;
    while (j < text.length && isLetter(text[j])) j++;
    const day = dayOfWord(text.slice(i, j), lang, text[j]);
    if (day) found.push({ day, start: i, end: lang === 'de' && text[j] === '.' ? j + 1 : j });
    i = j;
  }
  return found;
}

/**
 * الأيام المسمّاة في نص: days كل ما سُمّي (المدى مفكوكاً)، singles ما سُمّي منفرداً خارج مدى،
 * daily هل قيل «يومياً».
 * @returns {{ days: string[], singles: string[], daily: boolean }}
 */
export function dayMentions(raw, lang) {
  if (typeof raw !== 'string' || raw === '') return { days: [], singles: [], daily: false };
  const { days, singles, daily } = readDays(lower(raw, lang), lang);
  return { days, singles: [...new Set(singles.map((s) => s.day))].sort(byWeek), daily };
}

/**
 * الأيام المسمّاة منفردةً على مقربة من وقت (≤ reach محرفاً): «والجمعة 4–11 م فقط» تخصّ الجمعة بموعد،
 * و«أول موضع أُقيمت فيه الجمعة … يفتح يومياً من 8 ص» لا تخصّها.
 * @returns {string[]}
 */
export function daysNearTimes(raw, lang, reach = NEAR) {
  if (typeof raw !== 'string' || raw === '') return [];
  const text = lower(raw, lang);
  const { spans } = readClock(text, lang);
  const near = readDays(text, lang).singles.filter((s) => spans.some((t) => Math.max(s.start, t.start) - Math.min(s.end, t.end) <= reach));
  return [...new Set(near.map((s) => s.day))].sort(byWeek);
}

const NEAR = 30;
const byWeek = (a, b) => WEEK.indexOf(a) - WEEK.indexOf(b);

/** الأيام في نص مطبَّع (lower): singles بمواضعها. */
function readDays(text, lang) {
  const found = dayTokens(text, lang);
  const days = new Set();
  const singles = [];
  for (let k = 0; k < found.length; k++) {
    const next = found[k + 1];
    const gap = next ? text.slice(found[k].end, next.start).trim() : undefined;
    // «السبت–الخميس» و«Saturday to Thursday» و«С субботы по четверг» و«周六至周四» و«Cumartesi'den Perşembe'ye»
    if (next && (DASHES.includes(gap) || DAY_RANGE[lang].includes(gap))) {
      for (let w = WEEK.indexOf(found[k].day); ; w = (w + 1) % 7) { days.add(WEEK[w]); if (WEEK[w] === next.day) break; }
      k++;
    } else { days.add(found[k].day); singles.push(found[k]); }
  }
  return { days: [...days].sort(byWeek), singles, daily: DAILY[lang].some((w) => text.includes(w)) };
}

const fmt = (m) => (m === MIDNIGHT ? '24:00' : `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
const fmtSet = (list) => (list.length ? list.map(fmt).join(' ') : '∅');
const fmtDays = (d) => `${d.days.join(' ') || '∅'}${d.daily ? ' +يومياً' : ''}`;
const sameList = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/** hoursSpec ⇒ أوقاته المطبَّعة، والأيام التي تخالف ساعاتُها غالبَ الأسبوع (ومنها المغلق). */
function specFacts(spec) {
  const times = new Set();
  const perDay = Object.fromEntries(WEEK.map((d) => [d, []]));
  for (const iv of spec) {
    const [oh, om] = String(iv.opens).split(':').map(Number);
    const [ch, cm] = String(iv.closes).split(':').map(Number);
    const o = norm(oh * 60 + om), c = norm(ch * 60 + cm);
    // 00:00–23:59 يوم كامل: بنده يقول «24 ساعة» بلا وقت يُذكر
    if (!(o === MIDNIGHT && c === MIDNIGHT)) { times.add(o); times.add(c); }
    for (const d of String(iv.days).split(' ')) if (perDay[d]) perDay[d].push(`${o}-${c}`);
  }
  const sig = Object.fromEntries(WEEK.map((d) => [d, perDay[d].sort((a, b) => a.localeCompare(b)).join(',')]));
  const count = {};
  for (const d of WEEK) count[sig[d]] = (count[sig[d]] ?? 0) + 1;
  const major = Object.keys(count).sort((a, b) => count[b] - count[a] || a.localeCompare(b))[0];
  return { times: [...times].sort((a, b) => a - b), odd: WEEK.filter((d) => sig[d] !== major) };
}

const isHoursLabel = (label) => typeof label === 'string' && (label.includes('مواعيد') || label.includes('ساعات'));
/** البند الذي يشترطه المخطط لـhoursSpec: موثّق وعنوانه «المواعيد» أو «ساعات». */
const isSpecRow = (row) => row?.verified === true && typeof row.label === 'string' && (row.label.includes('المواعيد') || row.label.includes('ساعات'));
const PROSE_FIELDS = ['answer', 'description', 'summary', 'bestTime'];
/** الحقول القصيرة التي تُقابَل أيامُها بـhoursSpec (هـ): ما يجيب عن «متى يفتح» في جملة أو جملتين. */
const isDayField = (name) => name.startsWith('answer') || name.startsWith('description') || name.includes('.a');

/** (أ) و(ب): بنود practical بلغاتها. يعيد أوقات البنود الموثّقة وبنود المواعيد المقابَلة لـhoursSpec. */
function checkRows(slug, rows, problems, stats) {
  const published = new Set();
  const specRows = [];
  for (const row of rows) {
    const hoursRow = isHoursLabel(row?.label);
    const read = LANGS.filter((l) => typeof row?.['value' + SUFFIX[l]] === 'string')
      .map((l) => ({ lang: l, value: row['value' + SUFFIX[l]], ...clockTimes(row['value' + SUFFIX[l]], l) }));
    const base = read.find((r) => r.lang === 'ar');
    if (!base || (!hoursRow && read.every((r) => !r.times.length && !r.unclear.length))) continue;
    stats.rows++;
    stats.rowLangs += read.length;
    if (hoursRow) stats.hoursRows++;
    const baseDays = hoursRow ? dayMentions(base.value, 'ar') : undefined;
    for (const r of read) {
      for (const u of r.unclear) problems.push(`${slug}: «${row.label}» ${r.lang}: وقت بلا فترة محسومة «${u}»`);
      if (r.lang === 'ar') continue;
      if (!sameList(r.times, base.times)) problems.push(`${slug}: «${row.label}» ${r.lang} يذكر ${fmtSet(r.times)} والعربية ${fmtSet(base.times)}`);
      if (!baseDays) continue;
      const d = dayMentions(r.value, r.lang);
      if (!sameList(d.days, baseDays.days) || d.daily !== baseDays.daily) problems.push(`${slug}: «${row.label}» ${r.lang} يسمّي ${fmtDays(d)} والعربية ${fmtDays(baseDays)}`);
    }
    if (row.verified === true) for (const t of base.times) published.add(t);
    if (isSpecRow(row)) specRows.push({ times: base.times, days: baseDays });
  }
  return { published, specRows };
}

/** (ج): بند المواعيد مقابل hoursSpec. */
function checkSpec(slug, facts, specRows, problems) {
  if (specRows.length !== 1) { problems.push(`${slug}: hoursSpec يلزمه بند مواعيد موثّق واحد — الموجود ${specRows.length}`); return; }
  const [row] = specRows;
  if (!sameList(row.times, facts.times)) problems.push(`${slug}: بند المواعيد يذكر ${fmtSet(row.times)} وhoursSpec ${fmtSet(facts.times)}`);
  for (const d of facts.odd) if (!row.days.days.includes(d)) problems.push(`${slug}: ${d} تختلف ساعاته في hoursSpec عن غالب الأسبوع وبند المواعيد لا يسمّيه`);
  for (const d of row.days.singles) if (!facts.odd.includes(d)) problems.push(`${slug}: بند المواعيد يخصّ ${d} بالذكر وساعاته في hoursSpec كغالب الأسبوع`);
}

/** (د) و(هـ): أوقات النثر من بنود الزيارة الموثّقة وحدها، واليوم المخصوص بالذكر تختلف ساعاته فعلاً. */
function checkProse(slug, data, body, published, facts, problems, stats) {
  const prose = [];
  for (const lang of LANGS) {
    const suf = SUFFIX[lang];
    for (const f of PROSE_FIELDS) prose.push([f + suf, lang, data?.[f + suf]]);
    prose.push(['body' + suf, lang, lang === 'ar' ? body : data?.['body' + suf]]);
    (Array.isArray(data?.faq) ? data.faq : []).forEach((qa, i) => {
      prose.push([`faq[${i}].q${suf}`, lang, qa?.['q' + suf]]);
      prose.push([`faq[${i}].a${suf}`, lang, qa?.['a' + suf]]);
    });
  }
  const allowed = [...published].sort((a, b) => a - b);
  for (const [name, lang, text] of prose) {
    const got = clockTimes(text, lang);
    if (!got.times.length && !got.unclear.length) continue;
    stats.proseFields++;
    for (const u of got.unclear) problems.push(`${slug}: ${name}: وقت بلا فترة محسومة «${u}»`);
    const extra = got.times.filter((t) => !published.has(t));
    if (extra.length) problems.push(`${slug}: ${name} يذكر ${fmtSet(extra)} وليس في بنود الزيارة الموثّقة (${fmtSet(allowed)})`);
    if (!facts || !isDayField(name)) continue;
    stats.dayFields++;
    for (const d of daysNearTimes(text, lang)) if (!facts.odd.includes(d)) problems.push(`${slug}: ${name} يخصّ ${d} بالذكر وساعاته في hoursSpec كغالب الأسبوع`);
  }
}

/**
 * @param {{slug: string, data: Record<string, any>, body?: string}[]} files ترويسات ملفات المعالم محلَّلةً، ومتنها العربي
 * @returns {{ problems: string[], stats: { files: number, rows: number, rowLangs: number, hoursRows: number, specFiles: number, proseFields: number, dayFields: number } }}
 */
export function checkHoursProse(files) {
  const problems = [];
  const stats = { files: 0, rows: 0, rowLangs: 0, hoursRows: 0, specFiles: 0, proseFields: 0, dayFields: 0 };
  for (const { slug, data, body } of files) {
    stats.files++;
    const rows = Array.isArray(data?.practical) ? data.practical : [];
    const spec = Array.isArray(data?.hoursSpec) ? data.hoursSpec : [];
    const { published, specRows } = checkRows(slug, rows, problems, stats);
    const facts = spec.length ? specFacts(spec) : undefined;
    if (facts) { stats.specFiles++; checkSpec(slug, facts, specRows, problems); }
    checkProse(slug, data, body, published, facts, problems, stats);
  }
  if (stats.rows < EXPECT.minRows) problems.push(`البنود المقروءة ${stats.rows} — الحدّ الأدنى ${EXPECT.minRows}`);
  if (stats.rowLangs < EXPECT.minRowLangs) problems.push(`نسخ البنود المقروءة ${stats.rowLangs} — الحدّ الأدنى ${EXPECT.minRowLangs}`);
  if (stats.specFiles < EXPECT.minSpecFiles) problems.push(`ملفات hoursSpec المقابَلة ${stats.specFiles} — الحدّ الأدنى ${EXPECT.minSpecFiles}`);
  if (stats.proseFields < EXPECT.minProseFields) problems.push(`حقول النثر ذات الأوقات ${stats.proseFields} — الحدّ الأدنى ${EXPECT.minProseFields}`);
  if (stats.dayFields < EXPECT.minDayFields) problems.push(`حقول النثر المقابَلة أيامُها ${stats.dayFields} — الحدّ الأدنى ${EXPECT.minDayFields}`);
  return { problems, stats };
}
