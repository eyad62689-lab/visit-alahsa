// C74 — كل <img> مصدره /img/ يحمل width وheight عدديين موجبين.
//
// دالة نقية بلا قراءة ملفات: يستدعيها check-consistency.mjs بمحتوى صفحات dist، ويستدعيها
// اختبار الكسر بنسخ معدَّلة في الذاكرة.
//
// السبب: بلا السمتين لا يعرف المتصفح نسبة الصورة قبل وصولها، فيعتمد الاستقرار على أن كل
// حاوية في CSS تحجز مساحتها بنفسها. مكوّنا Photo وHeroPoster يخرجان أبعاد الأصل من
// src/data/image-widths.json (يولّده tools/gen-image-widths.mjs)؛ صورة خارج البيان تخرج
// بلا أبعاد فيُخفق هذا الفحص بدل أن يمرّ تراجعٌ صامت. الحجم المعروض يبقى بالـCSS، والسمتان
// تعطيان النسبة فقط.
//
// المسح بالمواضع لا بتعبير نمطي على الوسوم: ما بين وسوم script وstyle يُحذف أولاً (نصوص قوالب
// جافاسكربت قد تحمل «<img src=»)، ثم تُقرأ سمات كل وسم img محرفاً محرفاً مع احترام علامات التنصيص.

export const MIN_IMAGES = 300;
const IMG_PREFIX = '/img/';

function stripBlocks(html, tag) {
  const lower = html.toLowerCase();
  const open = `<${tag}`;
  const close = `</${tag}`;
  let out = '';
  let at = 0;
  for (;;) {
    const start = lower.indexOf(open, at);
    if (start < 0) break;
    const next = lower[start + open.length];
    if (next !== '>' && next !== ' ' && next !== '\n' && next !== '\t' && next !== '/') {
      out += html.slice(at, start + open.length);
      at = start + open.length;
      continue;
    }
    const end = lower.indexOf(close, start);
    out += html.slice(at, start);
    if (end < 0) { at = html.length; break; }
    const gt = lower.indexOf('>', end);
    at = gt < 0 ? html.length : gt + 1;
  }
  return out + html.slice(at);
}

// سمات وسم واحد (النص بين «<img» و«>») كخريطة اسم ← قيمة
function parseAttrs(body) {
  const attrs = new Map();
  let i = 0;
  const n = body.length;
  const isSpace = (c) => c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === '\f';
  while (i < n) {
    while (i < n && (isSpace(body[i]) || body[i] === '/')) i++;
    let name = '';
    while (i < n && !isSpace(body[i]) && body[i] !== '=' && body[i] !== '/') name += body[i++];
    while (i < n && isSpace(body[i])) i++;
    let value = '';
    if (body[i] === '=') {
      i++;
      while (i < n && isSpace(body[i])) i++;
      const q = body[i];
      if (q === '"' || q === "'") {
        i++;
        while (i < n && body[i] !== q) value += body[i++];
        i++;
      } else {
        while (i < n && !isSpace(body[i])) value += body[i++];
      }
    }
    if (name) attrs.set(name.toLowerCase(), value);
  }
  return attrs;
}

// وسوم img في المقطع: كل عنصر { attrs } — النهاية «>» الأولى خارج علامات التنصيص
export function imgTags(html) {
  const clean = stripBlocks(stripBlocks(html, 'script'), 'style');
  const lower = clean.toLowerCase();
  const out = [];
  let at = 0;
  for (;;) {
    const start = lower.indexOf('<img', at);
    if (start < 0) break;
    const after = clean[start + 4];
    if (after !== ' ' && after !== '\n' && after !== '\t' && after !== '/' && after !== '>') { at = start + 4; continue; }
    let i = start + 4;
    let quote = '';
    for (; i < clean.length; i++) {
      const c = clean[i];
      if (quote) { if (c === quote) quote = ''; }
      else if (c === '"' || c === "'") quote = c;
      else if (c === '>') break;
    }
    out.push(parseAttrs(clean.slice(start + 4, i)));
    at = i + 1;
  }
  return out;
}

const positiveInt = (v) => /^[0-9]+$/.test(v ?? '') && Number(v) > 0;

/** pages: [{ rel, html }] — تُرجع { problems, stats } */
export function checkImageDims(pages) {
  const problems = [];
  let checked = 0;
  let pagesWithImages = 0;
  for (const { rel, html } of pages) {
    let any = false;
    for (const attrs of imgTags(html)) {
      const src = attrs.get('src') ?? '';
      if (!src.startsWith(IMG_PREFIX)) continue;
      any = true;
      checked++;
      if (!positiveInt(attrs.get('width')) || !positiveInt(attrs.get('height'))) {
        problems.push(`${rel}: ${src} بلا width/height عدديين (width="${attrs.get('width') ?? ''}" height="${attrs.get('height') ?? ''}")`);
      }
    }
    if (any) pagesWithImages++;
  }
  if (checked < MIN_IMAGES) problems.push(`فُحصت ${checked} صورة فقط — الأرضية ${MIN_IMAGES} (الفاحص لا يرى الصور)`);
  return { problems, stats: { checked, pages: pagesWithImages } };
}
