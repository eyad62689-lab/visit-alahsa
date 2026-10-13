// توليد صور Open Graph الافتراضية بلغة الصفحة — الخطوة 4 من خطة التفاعل العالمي.
//
// كانت og-default.png (نصّها عربي) تخدم 96 صفحة منها كل فهارس EN وzh، فتظهر مشاركة
// صفحة إنجليزية ببطاقة عربية. هنا نسخة لكل من en وzh وde وru بالوردمارك اللاتيني
// وسطر «موقع تراث عالمي · اليونسكو 2018» من مفتاح home.hero.eyebrow المعتمد في
// قاموس كل لغة (لا نصّ جديد خارج خطوط الترجمة). العربية تبقى الأصل كما هي.
// الأوردو بسطرها المعتمد من دفعة واجهتها، بالنستعليق ومن اليمين إلى اليسار.
//
// يعمل محلياً لا في البناء: تصيير النصّ يحتاج خطوطاً مثبّتة في النظام (Cormorant
// وLora للاتيني والسيريلي، Noto Sans CJK للصينية) والمخرجات تُودَع في public/.
// التشغيل: node tools/gen-og-images.mjs   (يتطلب sharp — مثبّتة أصلاً)
//          node tools/gen-og-images.mjs ur   لتوليد لغات بعينها دون إعادة كتابة البقية
// النستعليق ليس خطّ نظام، فسطر الأوردو يُصيَّر من ملف الخط مباشرةً (Pango). وبطاقتها تُبنى على
// البطاقة الإنجليزية المودَعة (base): يُستبدل شريط السطر وحده بخلفيته بلا نصّ ثم يُركَّب السطر
// الأوردي — فتبقى الوردمارك والنطاق مطابقَين لسائر البطاقات بكسلاً ببكسل، حتى على جهاز لا يحمل
// خطوطها. حوّل ملف الحزمة (@fontsource/noto-nastaliq-urdu، الوجه العربي 400) إلى TTF خارج
// المستودع (fonttools: TTFont(woff2).flavor = None ثم save)، ثم:
//          OG_UR_FONTFILE=<مسار الـTTF> node tools/gen-og-images.mjs ur
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ui = readFileSync(path.join(ROOT, 'src/i18n/ui.ts'), 'utf8');

/** قيمة مفتاح في كتلة لغة من ui.ts — قراءة نصّية لأن الملف TypeScript */
function uiValue(lang, key) {
  // بحث نصّي لا تعبير نمطي مبني من مدخل (Semgrep detect-non-literal-regexp على طلب الدمج #38)
  const start = ui.indexOf(`\n  ${lang}: {`);
  if (start < 0) throw new Error(`لا كتلة ${lang} في ui.ts`);
  const block = ui.slice(start, ui.indexOf('\n  }', start));
  const needle = `'${key}':`;
  const at = block.indexOf(needle);
  if (at < 0) throw new Error(`المفتاح ${key} غائب من ${lang}`);
  let i = at + needle.length;
  while (block[i] === ' ' || block[i] === '\t') i++;
  if (block[i] !== "'") throw new Error(`قيمة ${key} في ${lang} ليست سلسلة بين علامتي اقتباس مفردتين`);
  let out = '';
  for (let j = i + 1; j < block.length && block[j] !== "'"; j++) {
    if (block[j] === '\\') { out += block[j + 1] === "'" ? "'" : block[j] + block[j + 1]; j++; }
    else out += block[j];
  }
  return out;
}

const W = 1200, H = 630;
const LANGS = {
  en: { font: "'Lora', serif" },
  de: { font: "'Lora', serif" },
  ru: { font: "'Lora', serif" },
  zh: { font: "'Noto Sans CJK SC', 'Noto Sans SC', sans-serif" },
  // السطر من ملف الخط (fontfileEnv) لا من خطوط النظام؛ الحجم بالبكسل عند dpi 72
  ur: { font: 'Noto Nastaliq Urdu', size: 36, fontfileEnv: 'OG_UR_FONTFILE', base: 'en' },
};
const only = process.argv.slice(2);
const unknown = only.filter((l) => !(l in LANGS));
if (unknown.length) throw new Error(`لغة غير معرَّفة: ${unknown.join(', ')}`);
// موتيف السعف كما في PalmMotif.astro (نفس المسارات) — باهت في الزاوية كما في الأصل العربي
const PALM = `
  <g transform="translate(40 60) scale(4.6)" fill="none" stroke="#F3EFE5" stroke-opacity=".28" stroke-linecap="round">
    <path d="M60 112 C60 84 60 56 60 14" stroke-width="3"/>
    <g stroke-width="2.4">
      <path d="M60 26 C46 22 38 26 30 36"/><path d="M60 26 C74 22 82 26 90 36"/>
      <path d="M60 42 C44 38 34 43 25 55"/><path d="M60 42 C76 38 86 43 95 55"/>
      <path d="M60 58 C43 55 31 61 22 74"/><path d="M60 58 C77 55 89 61 98 74"/>
      <path d="M60 74 C44 72 34 78 27 90"/><path d="M60 74 C76 72 86 78 93 90"/>
    </g>
  </g>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

for (const [lang, cfg] of Object.entries(LANGS).filter(([l]) => !only.length || only.includes(l))) {
  const tagline = uiValue(lang, 'home.hero.eyebrow');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0E5A4E"/><stop offset="1" stop-color="#083F37"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${PALM}
  <text x="${W / 2}" y="292" text-anchor="middle" font-family="'Cormorant Garamond', 'Marcellus', serif" font-weight="600" font-size="96" letter-spacing="14" fill="#F3EFE5">VISIT AL-AHSA</text>
  <rect x="${W / 2 - 54}" y="336" width="108" height="3" fill="#C99A4A"/>
  ${cfg.fontfileEnv ? '' : `<text x="${W / 2}" y="412" text-anchor="middle" font-family="${cfg.font}" font-size="40" fill="#C99A4A">${esc(tagline)}</text>`}
  <text x="${W / 2}" y="560" text-anchor="middle" font-family="'Cormorant Garamond', serif" font-size="30" letter-spacing="6" fill="#F3EFE5" fill-opacity=".72">visit-alahsa.com</text>
</svg>`;
  const out = path.join(ROOT, 'public', `og-default-${lang}.png`);
  let card = sharp(Buffer.from(svg));
  if (cfg.fontfileEnv) {
    const fontfile = process.env[cfg.fontfileEnv];
    if (!fontfile) throw new Error(`${cfg.fontfileEnv} غير معيَّن: مسار ملف خط ${cfg.font} (TTF) — انظر رأس الملف`);
    // سطر اللغة من ملف الخط: اتجاهه من أول حرف قوي فيه (يمين لليسار)، ويتوسّط موضع السطر في سائر البطاقات
    const line = await sharp({ text: { text: `<span foreground="#C99A4A">${esc(tagline)}</span>`, font: `${cfg.font} ${cfg.size}`, fontfile, rgba: true, dpi: 72 } }).png().toBuffer({ resolveWithObject: true });
    // الشريط بين الخط الذهبي (ينتهي عند 339) وسطر النطاق: خلفيته بلا نصّ من هذا التصيير نفسه
    const BAND = { top: 350, height: 110 };
    const lineTop = Math.round(398 - line.info.height / 2);
    if (lineTop < BAND.top || lineTop + line.info.height > BAND.top + BAND.height || line.info.width > W - 120) throw new Error(`سطر ${lang} (${line.info.width}×${line.info.height}) لا يسعه شريط السطر`);
    const bare = await card.extract({ left: 0, top: BAND.top, width: W, height: BAND.height }).png().toBuffer();
    card = sharp(path.join(ROOT, 'public', `og-default-${cfg.base}.png`)).composite([
      { input: bare, left: 0, top: BAND.top },
      { input: line.data, left: Math.round((W - line.info.width) / 2), top: lineTop },
    ]);
  }
  const buf = await card.png({ compressionLevel: 9, palette: true }).toBuffer();
  writeFileSync(out, buf);
  console.log(`✓ og-default-${lang}.png — ${Math.round(buf.length / 1024)} كيلوبايت · «${tagline}»`);
}
