// توليد صور Open Graph الافتراضية بلغة الصفحة — الخطوة 4 من خطة التفاعل العالمي.
//
// كانت og-default.png (نصّها عربي) تخدم 96 صفحة منها كل فهارس EN وzh، فتظهر مشاركة
// صفحة إنجليزية ببطاقة عربية. هنا نسخة لكل من en وzh وde وru بالوردمارك اللاتيني
// وسطر «موقع تراث عالمي · اليونسكو 2018» من مفتاح home.hero.eyebrow المعتمد في
// قاموس كل لغة (لا نصّ جديد خارج خطوط الترجمة).
// شعار البلبل (tools/assets/bulbul-emblem.png، مصدر أيقونات الموقع) في رأس كل بطاقة بدل موتيف السعف.
// والبطاقة العربية og-default.png تُولَّد هنا أيضاً: «زوروا الأحساء» بـCairo وسطرها بـIBM Plex Sans Arabic،
// كلاهما من ملف خط (woff2 من @fontsource → TTF خارج المستودع كما في الأوردو، الوجه العربي)، ثم:
//          OG_AR_HEAD_FONTFILE=<cairo-arabic-700 TTF> OG_AR_BODY_FONTFILE=<ibm-plex-sans-arabic-arabic-500 TTF> node tools/gen-og-images.mjs ar
// الأوردو بسطرها المعتمد من دفعة واجهتها، بالنستعليق ومن اليمين إلى اليسار.
//
// يعمل محلياً لا في البناء: تصيير النصّ يحتاج خطوطاً يراها fontconfig (Cormorant Garamond 600
// للوردمارك والنطاق، وLora للسطر اللاتيني والسيريلي، Noto Sans CJK أو Microsoft YaHei للصينية)، والمخرجات
// تُودَع في public/. خطوط النظام في ويندوز لا تحملها، وبدونها يسقط النصّ إلى خط بديل بلا تحذير:
// حوّل woff2 من @fontsource إلى TTF خارج المستودع (cormorant-garamond-latin-600؛ وlora latin وlatin-ext
// وcyrillic وcyrillic-ext مدمجة بـfontTools.merge) وضعها في مجلد — الملف المدمج وحده، فملفات
// الأجزاء تحمل اسم العائلة نفسه فيختار fontconfig أحدها ويسقط السيريلي إلى خط آخر — ثم وجّه fontconfig إليه بملف fonts.conf
// فيه <dir>مجلد الخطوط</dir> و<dir>C:/Windows/Fonts</dir> و<cachedir>…</cachedir>:
//          FONTCONFIG_FILE=<fonts.conf> node tools/gen-og-images.mjs
// (ملف Cormorant من @fontsource عائلته «Cormorant Garamond Light» في جدول الأسماء، فهي في قائمة font-family.)
// التشغيل: node tools/gen-og-images.mjs   (يتطلب sharp — مثبّتة أصلاً)
//          node tools/gen-og-images.mjs ur   لتوليد لغات بعينها دون إعادة كتابة البقية
// النستعليق ليس خطّ نظام، فسطر الأوردو يُصيَّر من ملف الخط مباشرةً (Pango). وبطاقتها تُبنى على
// البطاقة الإنجليزية المودَعة (base): يُستبدل شريط السطر وحده بخلفيته بلا نصّ ثم يُركَّب السطر
// الأوردي — فتبقى الوردمارك والنطاق مطابقَين لسائر البطاقات بكسلاً ببكسل، حتى على جهاز لا يحمل
// خطوطها. حوّل ملف الحزمة (@fontsource/noto-nastaliq-urdu، الوجه العربي 400) إلى TTF خارج
// المستودع (fonttools: TTFont(woff2).flavor = None ثم save)، ثم:
//          OG_UR_FONTFILE=<مسار الـTTF> node tools/gen-og-images.mjs ur
// والتركية كذلك من ملف خط: ادمج lora-latin-400-normal وlora-latin-ext-400-normal (woff2 → TTF ثم fontTools.merge)، ثم:
//          OG_TR_FONTFILE=<مسار الـTTF المدمج> node tools/gen-og-images.mjs tr
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
// سطر العربية بالصياغة المعتمدة «أكبر واحة في العالم» (بلا «نخيل» — C15)
const AR_TAGLINE = 'أكبر واحة في العالم، وموقع تراث عالمي';
const LANGS = {
  ar: { arabic: true },
  en: { font: "'Lora', serif" },
  de: { font: "'Lora', serif" },
  ru: { font: "'Lora', serif" },
  zh: { font: "'Noto Sans CJK SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif" },
  // السطر من ملف الخط (fontfileEnv) لا من خطوط النظام؛ الحجم بالبكسل عند dpi 72
  ur: { font: 'Noto Nastaliq Urdu', size: 36, fontfileEnv: 'OG_UR_FONTFILE', base: 'en' },
  // التركية: سطرها من ملف خط Lora (latin + latin-ext مدمجان من @fontsource/lora بـfonttools) لا من خطوط النظام
  tr: { font: 'Lora', size: 40, fontfileEnv: 'OG_TR_FONTFILE', base: 'en' },
};
const only = process.argv.slice(2);
const unknown = only.filter((l) => !(l in LANGS));
if (unknown.length) throw new Error(`لغة غير معرَّفة: ${unknown.join(', ')}`);
// الشعار في رأس البطاقة
const EMBLEM_SIZE = 150, EMBLEM_TOP = 52;
// خلفية الشعار التركوازية (#0C504E) تُجعل شفافة كي يقف المربع الذهبي والذيل الخارج منه على تدرّج البطاقة
// بلا مربع داكن حوله؛ والانتقال ليّن بين مسافتَي لون 14 و44 فلا تظهر حافة مسنّنة
const KEY = [12, 80, 78];
const keyed = await sharp(path.join(ROOT, 'tools/assets/bulbul-emblem.png'))
  .resize(EMBLEM_SIZE, EMBLEM_SIZE, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer();
const rgba = Buffer.alloc(EMBLEM_SIZE * EMBLEM_SIZE * 4);
for (let i = 0, j = 0; i < keyed.length; i += 3, j += 4) {
  const d = Math.hypot(keyed[i] - KEY[0], keyed[i + 1] - KEY[1], keyed[i + 2] - KEY[2]);
  rgba[j] = keyed[i]; rgba[j + 1] = keyed[i + 1]; rgba[j + 2] = keyed[i + 2];
  rgba[j + 3] = Math.round(255 * Math.min(1, Math.max(0, (d - 14) / 30)));
}
const emblem = await sharp(rgba, { raw: { width: EMBLEM_SIZE, height: EMBLEM_SIZE, channels: 4 } }).png().toBuffer();
const EMBLEM_LAYER = { input: emblem, left: (W - EMBLEM_SIZE) / 2, top: EMBLEM_TOP };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** سطرا البطاقة العربية من ملفَي الخط: الوردمارك فوق الخط اللاتيني، والسطر تحت الخط الذهبي */
async function arabicLines() {
  const font = (env) => { const p = process.env[env]; if (!p) throw new Error(`${env} غير معيَّن — انظر رأس الملف`); return p; };
  const render = async (text, family, size, fontfile, color) => {
    const r = await sharp({ text: { text: `<span foreground="${color}">${esc(text)}</span>`, font: `${family} ${size}`, fontfile, rgba: true, dpi: 72 } })
      .trim({ threshold: 0 }).png().toBuffer({ resolveWithObject: true });
    if (r.info.width > W - 120) throw new Error(`«${text}» أعرض من البطاقة`);
    return r;
  };
  const head = await render('زوروا الأحساء', 'Cairo Bold', 84, font('OG_AR_HEAD_FONTFILE'), '#F3EFE5');
  const body = await render(AR_TAGLINE, 'IBM Plex Sans Arabic Medium', 36, font('OG_AR_BODY_FONTFILE'), '#F3EFE5');
  // أسفل الوردمارك فوق «VISIT AL-AHSA» (خطّها الأعلى ~370)، والسطر يتوسّط ما بين الخط الذهبي (421) والنطاق
  return [
    { input: head.data, left: Math.round((W - head.info.width) / 2), top: Math.round(344 - head.info.height) },
    { input: body.data, left: Math.round((W - body.info.width) / 2), top: Math.round(482 - body.info.height / 2) },
  ];
}

for (const [lang, cfg] of Object.entries(LANGS).filter(([l]) => !only.length || only.includes(l))) {
  const tagline = cfg.arabic ? AR_TAGLINE : uiValue(lang, 'home.hero.eyebrow');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0E5A4E"/><stop offset="1" stop-color="#083F37"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${cfg.arabic ? '' : `<text x="${W / 2}" y="318" text-anchor="middle" font-family="'Cormorant Garamond', 'Cormorant Garamond Light', serif" font-weight="600" font-size="96" letter-spacing="14" fill="#F3EFE5">VISIT AL-AHSA</text>`}
  ${cfg.arabic ? `<text x="${W / 2 + 4}" y="392" text-anchor="middle" font-family="'Cormorant Garamond', 'Cormorant Garamond Light', serif" font-weight="600" font-size="30" letter-spacing="9" fill="#C99A4A">VISIT AL-AHSA</text>` : ''}
  <rect x="${W / 2 - 54}" y="${cfg.arabic ? 418 : 350}" width="108" height="3" fill="#C99A4A"/>
  ${cfg.fontfileEnv || cfg.arabic ? '' : `<text x="${W / 2}" y="426" text-anchor="middle" font-family="${cfg.font}" font-size="40" fill="#C99A4A">${esc(tagline)}</text>`}
  <text x="${W / 2}" y="580" text-anchor="middle" font-family="'Cormorant Garamond', 'Cormorant Garamond Light', serif" font-size="30" letter-spacing="6" fill="#F3EFE5" fill-opacity=".72">visit-alahsa.com</text>
</svg>`;
  const out = path.join(ROOT, 'public', lang === 'ar' ? 'og-default.png' : `og-default-${lang}.png`);
  let card = sharp(Buffer.from(svg));
  if (cfg.arabic) card = sharp(await card.composite([EMBLEM_LAYER, ...(await arabicLines())]).png().toBuffer());
  else if (!cfg.fontfileEnv) card = sharp(await card.composite([EMBLEM_LAYER]).png().toBuffer());
  if (cfg.fontfileEnv) {
    const fontfile = process.env[cfg.fontfileEnv];
    if (!fontfile) throw new Error(`${cfg.fontfileEnv} غير معيَّن: مسار ملف خط ${cfg.font} (TTF) — انظر رأس الملف`);
    // سطر اللغة من ملف الخط: اتجاهه من أول حرف قوي فيه (يمين لليسار)، ويتوسّط موضع السطر في سائر البطاقات
    const line = await sharp({ text: { text: `<span foreground="#C99A4A">${esc(tagline)}</span>`, font: `${cfg.font} ${cfg.size}`, fontfile, rgba: true, dpi: 72 } }).png().toBuffer({ resolveWithObject: true });
    // الشريط بين الخط الذهبي (ينتهي عند 339) وسطر النطاق: خلفيته بلا نصّ من هذا التصيير نفسه
    const BAND = { top: 362, height: 110 };
    const lineTop = Math.round(412 - line.info.height / 2);
    if (lineTop < BAND.top || lineTop + line.info.height > BAND.top + BAND.height || line.info.width > W - 120) throw new Error(`سطر ${lang} (${line.info.width}×${line.info.height}) لا يسعه شريط السطر`);
    const bare = await card.extract({ left: 0, top: BAND.top, width: W, height: BAND.height }).png().toBuffer();
    card = sharp(path.join(ROOT, 'public', `og-default-${cfg.base}.png`)).composite([
      { input: bare, left: 0, top: BAND.top },
      { input: line.data, left: Math.round((W - line.info.width) / 2), top: lineTop },
    ]);
  }
  const buf = await card.png({ compressionLevel: 9, palette: true }).toBuffer();
  writeFileSync(out, buf);
  console.log(`✓ ${path.basename(out)} — ${Math.round(buf.length / 1024)} كيلوبايت · «${tagline}»`);
}
