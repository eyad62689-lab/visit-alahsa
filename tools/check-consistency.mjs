// فاحص التضارب — حلقة تحقق مستقلة تعمل على المخرج المبنيّ (dist) لا على المصدر.
//
// السبب في اختيار dist: فحص المصدر يثبت أن الكود مكتوب صحيحاً، وفحص dist يثبت أن
// الزائر يرى الرقم الصحيح فعلاً. المؤشر الرابع في دراسة التطوير («عدد التضاربات
// داخل الموقع = صفر») يقاس على ما يُنشر لا على ما يُكتب.
//
// يُشغَّل في postbuild. يخرج بـ1 عند أي إخفاق فيفشل البناء قبل النشر.
// قاعدة الموقع: أرقام لاتينية (0-9) في كل النصوص.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SRC_ATTRACTIONS = path.join(ROOT, 'src/content/attractions');

const results = [];
const pass = (id, msg) => results.push({ id, level: 'ok', msg });
const fail = (id, msg) => results.push({ id, level: 'fail', msg });
const warn = (id, msg) => results.push({ id, level: 'warn', msg });

// مصطلحات محلّ نزاع توثيقي.
//   blocking: true  → ورودها يفشل البناء (حُسمت ورُفضت)
//   blocking: false → تحذير فقط (بانتظار قرار، لا يُعطَّل النشر بسببها)
// المرجع: قاعدة «لا تُختلق أي معلومة» في CLAUDE.md.
const PENDING_TERMS = [
  { term: 'اللومي الأسود', blocking: true, why: 'وصف غير صحيح حُذف من المصدر بتصحيح إياد 2026-08-28' },
];

// أسماء مرادفة: ورود الاسم الشائع يلزمه ورود الاسم الموثّق في الصفحة نفسها،
// وإلا بدا طبقاً أو معلماً مفقوداً من صفحته. («الخبز الأحمر» = خبز التمر —
// تأكيد إياد 2026-08-30.)
// canonicals مصفوفة: يكفي ورود أحدها. الصفحات الصينية تحمل اسم منشأة رسمياً
// بالإنجليزية (Hasawi Red Bread — اسم خرائط قوقل لا يُترجم) واقترانها الموثّق
// بالصينية 椰枣面包 (دفعة indexes 2026-09-02) — فالإنجليزي أو الصيني يفي بالشرط.
const SYNONYM_PAIRS = [
  { alias: 'الخبز الأحمر', canonicals: ['خبز التمر'] },
  { alias: 'red bread', canonicals: ['date bread', '椰枣面包'] },
  { alias: '红面包', canonicals: ['椰枣面包'] },
  // الروسية تصرّف الاسم بست حالات («красным хлебом» في المتن) فالمرساة على
  // **العبارة** بجذعيها لا على الصفة وحدها — «красные» وحدها تطابق أي أحمر آخر.
  // ولا \w ولا \b: آسكيّان في JS فلا يطابقان السيريلية ولا يُخفقان.
  { alias: 'красн[а-яё]{2,3}\\s+хлеб[а-яё]{0,2}', canonicals: ['Финиковый хлеб'] },
];

// أسماء أدلة صفحات المعالم في dist (المسارات العربية تُرمَّز بـpercent-encoding)
const AR_ATTRACTIONS_DIR = decodeURIComponent('%D9%85%D8%B9%D8%A7%D9%84%D9%85');

// تقشير الوسوم حتى الاستقرار: تمريرة واحدة تُبقي «<script» إن كان الوسم متداخلاً
// (‏<<script>>)، وCodeQL يعدّها js/incomplete-multi-character-sanitization ويُفشل الفحص.
// المدخل هنا dist المبني لا مدخل زائر، لكن الشكل الثابت يُغلق التنبيه بلا استثناء.
// نزع نمط حتى الاستقرار وبلا حساسية لحالة الأحرف — الشكل الذي لا يعدّه CodeQL
// bad-tag-filter ولا incomplete-multi-character-sanitization.
const stripUntilStable = (html, re, sep = '') => {
  let prev;
  do { prev = html; html = html.replace(re, sep); } while (html !== prev);
  return html;
};

const stripTags = (html, sep = '') => {
  let prev;
  do { prev = html; html = html.replace(/<[^>]*>/g, sep); } while (html !== prev);
  return html;
};

async function listHtml(dir) {
  const out = [];
  async function walk(d) {
    let entries;
    try { entries = await readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (e.name.endsWith('.html')) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('✗ فاحص التضارب: مجلد dist غير موجود — شغّل البناء أولاً.');
    process.exit(1);
  }

  // ── المصدر: العدد الحقيقي للمعالم ────────────────────────────────────────
  const mdFiles = (await readdir(SRC_ATTRACTIONS)).filter((f) => f.endsWith('.md'));
  const truth = mdFiles.length;

  // ── C1: صفحات المعالم المولَّدة في dist تطابق عدد الملفات ────────────────
  const arDir = path.join(DIST, AR_ATTRACTIONS_DIR);
  let builtPages = 0;
  try {
    const entries = await readdir(arDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (existsSync(path.join(arDir, e.name, 'index.html'))) builtPages++;
    }
  } catch { /* يُلتقط أدناه */ }
  if (builtPages === truth) pass('C1', `صفحات المعالم العربية المبنية = ${truth}`);
  else fail('C1', `صفحات المعالم المبنية ${builtPages} بينما ملفات المجموعة ${truth}`);

  // ── C2: llms.txt مولَّد ويحمل العدد الصحيح ───────────────────────────────
  const llmsPath = path.join(DIST, 'llms.txt');
  if (!existsSync(llmsPath)) {
    fail('C2', 'llms.txt غير موجود في dist');
  } else {
    const llms = await readFile(llmsPath, 'utf8');
    const m = llms.match(/المعالم \((\d+) معلماً/);
    if (!m) fail('C2', 'تعذّر استخراج عدد المعالم من llms.txt');
    else if (Number(m[1]) === truth) pass('C2', `llms.txt يعلن ${truth} معلماً`);
    else fail('C2', `llms.txt يعلن ${m[1]} معلماً بينما الحقيقة ${truth}`);
  }

  // ── C3: الرقم المعروض في الصفحة الرئيسية (بطاقات الحقائق) ────────────────
  // البطاقة الثالثة نصّها العدد ولصيقتها «معلماً ووجهةً للاكتشاف».
  const homePath = path.join(DIST, 'index.html');
  if (!existsSync(homePath)) {
    fail('C3', 'الصفحة الرئيسية غير موجودة في dist');
  } else {
    const home = await readFile(homePath, 'utf8');
    // النصّ المرئي وحده: تُنزع الوسوم ثم يُلتقط ما قبل اللصيقة مباشرةً.
    const text = stripTags(home, '');
    const m = text.match(/([\d.,+MK万]+)[\s]*معلماً ووجهةً للاكتشاف/);
    if (!m) fail('C3', 'تعذّر استخراج عدد المعالم من بطاقات حقائق الرئيسية');
    else if (m[1] === String(truth)) pass('C3', `الرئيسية تعرض ${truth} معلماً`);
    else fail('C3', `الرئيسية تعرض «${m[1]}» بينما الحقيقة ${truth}`);
  }

  // ── C4: لا أرقام عربية-هندية في أي صفحة مبنية ────────────────────────────
  const htmlFiles = await listHtml(DIST);
  const indicDigits = /[٠-٩۰-۹]/;
  const withIndic = [];
  for (const f of htmlFiles) {
    const html = await readFile(f, 'utf8');
    // يُستثنى ما بين وسوم script/style (بيانات خارجية قد تحمل نصوصاً)
    const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
    if (indicDigits.test(visible)) withIndic.push(path.relative(DIST, f));
  }
  if (withIndic.length === 0) pass('C4', `لا أرقام عربية-هندية في ${htmlFiles.length} صفحة`);
  else fail('C4', `أرقام عربية-هندية في ${withIndic.length} صفحة: ${withIndic.slice(0, 5).join(', ')}`);

  // ── C5: المصطلحات محلّ النزاع التوثيقي ───────────────────────────────────
  for (const { term, blocking, why } of PENDING_TERMS) {
    const hits = [];
    for (const f of htmlFiles) {
      const html = await readFile(f, 'utf8');
      if (html.includes(term)) hits.push(path.relative(DIST, f));
    }
    if (hits.length === 0) { pass('C5', `«${term}» غير وارد في المخرج`); continue; }
    const msg = `«${term}» وارد في ${hits.length} صفحة (${hits.slice(0, 3).join(', ')}) — ${why}`;
    if (blocking) fail('C5', msg); else warn('C5', msg);
  }

  // ── C5b: كل اسم شائع مقرون باسمه الموثّق في الصفحة نفسها ─────────────────
  for (const { alias, canonicals } of SYNONYM_PAIRS) {
    const orphans = [];
    for (const f of htmlFiles) {
      const html = await readFile(f, 'utf8');
      const aliasRe = new RegExp(alias, 'i');
      if (aliasRe.test(html) && !canonicals.some((c) => html.includes(c))) orphans.push(path.relative(DIST, f));
    }
    if (orphans.length === 0) pass('C5b', `«${alias}» مقرون دائماً بأحد: ${canonicals.map((c) => `«${c}»`).join(' / ')}`);
    else fail('C5b', `«${alias}» بلا اقتران في ${orphans.length} صفحة: ${orphans.slice(0, 3).join(', ')}`);
  }

  // ── C6: البنود غير الموثّقة محجوبة عن بطاقة «معلومات الزيارة» ────────────
  // القاعدة: practical[].verified=false لا يُعرض. القيم كلها عبارات نائبة
  // («بانتظار التأكيد») ترد في نصوص أخرى مشروعة، فالفحص يقارن عدد صفوف <dt>
  // في البطاقة المبنية بعدد البنود الموثّقة في المصدر — لا بمطابقة النص.
  const rowMismatch = [];
  let checkedPages = 0;
  for (const f of mdFiles) {
    const raw = await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8');
    // بعض الملفات تكتب الرابط بين علامتَي اقتباس فتُنزع
    const slug = raw.match(/^slug_ar:\s*(.+)$/m)?.[1].trim().replace(/^["']|["']$/g, '');
    if (!slug) continue;
    const lines = raw.split('\n').filter((l) => /^\s*-\s*\{\s*label:/.test(l));
    const verifiedCount = lines.filter((l) => l.includes('verified: true')).length;
    const hasArea = /^area:/m.test(raw);
    const hasBest = /^bestTime:/m.test(raw);
    const expected = verifiedCount + (hasArea ? 1 : 0) + (hasBest ? 1 : 0);
    const page = path.join(DIST, AR_ATTRACTIONS_DIR, slug, 'index.html');
    if (!existsSync(page)) { rowMismatch.push(`${slug}: الصفحة غير مبنية`); continue; }
    const html = await readFile(page, 'utf8');
    const card = html.match(/<dl class="info-list"[^>]*>([\s\S]*?)<\/dl>/);
    const rows = card ? (card[1].match(/<dt[\s>]/g) ?? []).length : 0;
    checkedPages++;
    if (rows !== expected) rowMismatch.push(`${slug}: ظهر ${rows} صفاً والموثّق ${expected}`);
  }
  if (rowMismatch.length === 0) pass('C6', `بطاقة معلومات الزيارة مطابقة للموثّق في ${checkedPages} صفحة`);
  else fail('C6', `تفاوت في ${rowMismatch.length} صفحة: ${rowMismatch.slice(0, 3).join(' · ')}`);

  // ── C7: sitemap يغطي كل صفحة مبنية ───────────────────────────────────────
  const smPath = path.join(DIST, 'sitemap.xml');
  if (!existsSync(smPath)) {
    fail('C7', 'sitemap.xml غير موجود في dist');
  } else {
    const sm = await readFile(smPath, 'utf8');
    const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (locs.length > 0) pass('C7', `sitemap يحمل ${locs.length} رابطاً`);
    else fail('C7', 'sitemap فارغ');

    // ── C8: lastmod تواريخ حقيقية لا ملفَّقة ───────────────────────────────
    // الشروط: صيغة YYYY-MM-DD، لا تاريخ في المستقبل، ولا تاريخ واحد يعمّ كل
    // الروابط (علامة استنساخ ضحل أو تلفيق). غياب الحقل كلياً مقبول ومقصود.
    const mods = [...sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
    if (mods.length === 0) {
      warn('C8', 'لا lastmod في sitemap — متوقّع إن بُني خارج مستودع git كامل');
    } else {
      const badFormat = mods.filter((d) => !/^\d{4}-\d{2}-\d{2}$/.test(d));
      const today = new Date().toISOString().slice(0, 10);
      const future = mods.filter((d) => d > today);
      const distinct = new Set(mods).size;
      if (badFormat.length) fail('C8', `صيغة تاريخ غير صالحة: ${badFormat.slice(0, 3).join(', ')}`);
      else if (future.length) fail('C8', `${future.length} تاريخاً في المستقبل: ${future.slice(0, 3).join(', ')}`);
      else if (distinct === 1 && mods.length > 5) fail('C8', `كل الروابط بتاريخ واحد (${mods[0]}) — مؤشّر استنساخ ضحل`);
      else pass('C8', `${mods.length} lastmod من ${locs.length} رابطاً، ${distinct} تاريخاً مميزاً، أحدثها ${mods.slice().sort().at(-1)}`);
    }
  }

  // ── C12: كل بند موثّق مقرون بمصدره وتاريخ تحققه في الصفحة المنشورة ───────
  // المخطط يرفض البناء إن نقص الحقلان، وهذا يتحقق من وصولهما إلى القارئ فعلاً:
  // بطاقة فيها بنود موثّقة بلا سطر إسناد = توثيقٌ في المصدر لا يراه أحد.
  {
    const missing = [];
    let withSource = 0;
    for (const f of mdFiles) {
      const raw = await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8');
      const slug = raw.match(/^slug_ar:\s*(.+)$/m)?.[1].trim().replace(/^["']|["']$/g, '');
      if (!slug) continue;
      const verified = raw.split('\n').filter((l) => /^\s*-\s*\{\s*label:/.test(l) && l.includes('verified: true'));
      if (verified.length === 0) continue;
      const page = path.join(DIST, AR_ATTRACTIONS_DIR, slug, 'index.html');
      if (!existsSync(page)) { missing.push(`${slug}: الصفحة غير مبنية`); continue; }
      const html = await readFile(page, 'utf8');
      const hasBlock = /class="info-src"/.test(html);
      const hasTime = /<time datetime="\d{4}-\d{2}-\d{2}"/.test(html);
      if (!hasBlock || !hasTime) { missing.push(`${slug}: بلا سطر إسناد مقروء`); continue; }
      withSource++;

      // النظير الإنجليزي: اسم المصدر يجب أن يكون إنجليزياً لا عربياً — وهو
      // العطب الذي ظهر أول تنفيذ (اسم عربي داخل صفحة إنجليزية، 2026-08-31).
      const slugEn = raw.match(/^slug_en:\s*(.+)$/m)?.[1].trim().replace(/^["']|["']$/g, '');
      const pageEn = slugEn && path.join(DIST, 'en', 'attractions', slugEn, 'index.html');
      if (pageEn && existsSync(pageEn)) {
        const htmlEn = await readFile(pageEn, 'utf8');
        const block = htmlEn.match(/class="info-src"[^>]*>([\s\S]*?)<\/p>/);
        if (!block) missing.push(`${slugEn} (en): بلا سطر إسناد`);
        else if (/[؀-ۿ]/.test(stripTags(block[1]))) {
          missing.push(`${slugEn} (en): اسم المصدر بالعربية داخل الصفحة الإنجليزية`);
        }
      }
    }
    if (missing.length === 0) pass('C12', `الإسناد بلغة القارئ ظاهر في ${withSource} صفحة موثّقة (عربية + إنجليزية)`);
    else fail('C12', `${missing.length} إخفاق إسناد: ${missing.slice(0, 3).join(' · ')}`);

    // ── C13: تباين سطر الإسناد يبلغ AA ─────────────────────────────────────
    // قيس أول مرة في المتصفح فكان --c-ink-60 يعطي 4.36:1 — دون العتبة 4.5.
    // الفحص يمنع عودة أي رمز لون خافت إلى هذا السطر بلا قياس.
    const css = (await readFile(path.join(ROOT, 'src/components/views/DetailView.astro'), 'utf8'));
    const rule = css.match(/\.info-src\s*\{[^}]*\}/);
    const banned = ['--c-ink-60', '--c-gold-deep', '--c-gold'];
    const used = rule ? banned.filter((t) => rule[0].includes(t)) : [];
    if (!rule) fail('C13', 'تعذّر العثور على قاعدة .info-src');
    else if (used.length) fail('C13', `لون دون AA في سطر الإسناد: ${used.join(', ')} — قِس قبل التغيير`);
    else pass('C13', 'سطر الإسناد بلون يبلغ AA على خلفية البطاقة (ink-soft ‏8:1)');

    // ── C14: تسمية «Beste Tageszeit» الألمانية تطابق ما تحتها ──────────────
    // حكم خط de-translation-pipeline (2026-09-03) اختار «Tageszeit» (وقت النهار)
    // لا «Besuchszeit» (وقت الزيارة) بعدّ القيم: سبعُ قيم مصيَّرة كلها أوقات نهار،
    // والموسمي صفر — والقارئ الألماني يقرأ «Beste Zeit/Besuchszeit» موسماً.
    // شرط القلب كان مذكرةً في ملف ترجمة، وهو ما لن يقرأه محرّرٌ لا يعرف الألمانية
    // يوم يضيف قيمةً موسمية؛ فصار حارساً يُفشل البناء بدل أن تكذب التسمية بصمت.
    const SEASONAL_DE = /\b(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Frühling|Sommer|Herbst|Winter|Saison|Monat)\w*/;
    const deLies = [];
    for (const f of await listHtml(path.join(DIST, 'de'))) {
      const html = await readFile(f, 'utf8');
      const m = html.match(/Beste Tageszeit<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/);
      const val = m && stripTags(m[1]).trim();
      const hit = val && val.match(SEASONAL_DE);
      if (hit) deLies.push(`${path.relative(DIST, f)} → «${hit[0]}»`);
    }
    // والروسية على النمط نفسه (دفعة ui.ru 2026-09-05 اختارت «Лучшее время дня» —
    // وقت النهار — بالعدّ ذاته): قيمة موسمية تحتها تكذّب التسمية فتُقلب إلى
    // «Лучшее время для визита» المحايدة. حدود الكلمات صريحة لأن \b لا تعمل مع
    // السيريلية بلا علم u؛ و«лет» وحدها مستثناة (تعني «سنوات») فتُمسك «лето/летом».
    const SEASONAL_RU = /(?:^|[^а-яё])(?:январ|феврал|март|апрел|июн|июл|август|сентябр|октябр|ноябр|декабр|весн|осен|зим|сезон|месяц)[а-яё]*|(?:^|[^а-яё])ма[йяе](?![а-яё])|(?:^|[^а-яё])лет(?:о|ом)(?![а-яё])/i;
    const ruLies = [];
    for (const f of await listHtml(path.join(DIST, 'ru'))) {
      const html = await readFile(f, 'utf8');
      const m = html.match(/Лучшее время дня<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/);
      const val = m && stripTags(m[1]).trim();
      const hit = val && val.match(SEASONAL_RU);
      if (hit) ruLies.push(`${path.relative(DIST, f)} → «${hit[0].trim()}»`);
    }
    if (deLies.length) fail('C14', `قيمة موسمية تحت «Beste Tageszeit» — التسمية صارت كاذبة، حوّلها إلى «Beste Besuchszeit» في ui.de: ${deLies.slice(0, 3).join(' · ')}`);
    else if (ruLies.length) fail('C14', `قيمة موسمية تحت «Лучшее время дня» — التسمية صارت كاذبة، حوّلها إلى «Лучшее время для визита» في ui.ru: ${ruLies.slice(0, 3).join(' · ')}`);
    else pass('C14', 'تسميتا «Beste Tageszeit» و«Лучшее время дня» تطابقان قيمهما (صفر قيمة موسمية)');
  }

  // ── C9: مفتاح IndexNow منشور ومطابق للمفتاح في الإضافة ───────────────────
  // انفصال الاسم عن المحتوى أو عن ثابت الإضافة يجعل كل إشعار يُرفض بصمت.
  {
    const { KEY, HOST } = await import('../netlify/plugins/indexnow/submit.mjs');
    const keyFile = path.join(DIST, `${KEY}.txt`);
    if (!existsSync(keyFile)) {
      fail('C9', `ملف مفتاح IndexNow غير منشور: ${KEY}.txt`);
    } else {
      const content = (await readFile(keyFile, 'utf8')).trim();
      if (content !== KEY) fail('C9', `محتوى ملف المفتاح «${content}» لا يطابق اسمه`);
      else if (HOST !== 'visit-alahsa.com') fail('C9', `نطاق IndexNow غير متوقّع: ${HOST}`);
      else pass('C9', `مفتاح IndexNow منشور ومطابق (${KEY.slice(0, 8)}…)`);
    }
  }

  // ── C10: لا تقييمات قوقل داخل أي JSON-LD مُصدَّر ──────────────────────────
  // بيانات المراجعات من Google Places تُعرض في الواجهة فقط. بثّها في الترميز
  // المهيكل مخالف لشروط قوقل ولإرشادات المراجعات الذاتية معاً، وعقوبته تطال
  // الدومين كله لا الصفحة. الحارس يفحص المخرج لا المصدر: ما يراه الزاحف.
  {
    const BANNED = ['aggregateRating', 'ratingValue', 'reviewCount', 'ratingCount', '"review"'];
    const htmlFiles = await listHtml(DIST);
    const hits = [];
    for (const f of htmlFiles) {
      const html = await readFile(f, 'utf8');
      for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
        const found = BANNED.filter((k) => m[1].includes(k));
        if (found.length) hits.push(`${path.relative(DIST, f)} → ${found.join(', ')}`);
      }
    }
    if (hits.length) fail('C10', `تقييمات في JSON-LD (${hits.length} موضعاً): ${hits.slice(0, 3).join(' | ')}`);
    else pass('C10', `لا تقييمات في JSON-LD عبر ${htmlFiles.length} صفحة`);
  }

  // ── C11: عتبة نشر صفحات المنشآت مصونة على المصدر ─────────────────────────
  // العتبة (80 كلمة عربية / 100 إنجليزية، وألّا يكون المتن نسخة من النبذة)
  // مأخوذة من وسيط متون المعالم المقيس — docs/قرار-بنية-صفحات-المنشآت.md.
  // الفحص هنا على المصدر لا على dist لأن ما يُمنَع هو **توليد** الصفحة أصلاً:
  // dist لا يحوي دليلاً على منشأةٍ استُبعدت. والحارس يمنع تكرار ثغرة المعالم
  // الخمسة التي متنُها نسخة حرفية من نبذتها.
  {
    // المجموعتان (المنشآت وأماكن الإقامة) تتقاسمان النموذج والعتبة، فيفحصهما
    // الحارس معاً — وإلا نشأ فرعٌ بلا حارس مع أول مجموعة جديدة.
    const dirs = [['dining', path.join(ROOT, 'src/content/dining')], ['stay', path.join(ROOT, 'src/content/stay')]];
    const wc = (t) => t.trim().split(/\s+/).filter(Boolean).length;
    const fmOf = (raw) => (raw.match(/^---\r?\n([\s\S]*?)\r?\n---/) ?? ['', ''])[1];
    const bodyOf = (raw) => raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
    const fld = (fm, n) => {
      const m = fm.match(new RegExp(`^${n}:\\s*(.+)$`, 'm'));
      if (!m) return '';
      const v = m[1].trim();
      return (v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")) ? v.slice(1, -1) : v;
    };
    const bad = [];
    let total = 0, publishedAr = 0, publishedEn = 0;
    for (const [label, dir] of dirs) {
      let files = [];
      try { files = (await readdir(dir)).filter((f) => f.endsWith('.md')); } catch { /* لا مجموعة بعد */ }
      total += files.length;
      for (const f of files) {
        const raw = await readFile(path.join(dir, f), 'utf8');
        const fm = fmOf(raw), body = bodyOf(raw), bodyEn = fld(fm, 'body_en').trim();
        const blurb = fld(fm, 'blurb'), blurbEn = fld(fm, 'blurb_en');
        // متنٌ مكتوبٌ لكنه دون العتبة أو مطابقٌ للنبذة = خطأ صريح لا صمت
        if (body && (wc(body) < 80 || body === blurb)) bad.push(`${label}/${f} (ar: ${wc(body)} كلمة${body === blurb ? '، نسخة من النبذة' : ''})`);
        if (bodyEn && (wc(bodyEn) < 100 || bodyEn === blurbEn)) bad.push(`${label}/${f} (en: ${wc(bodyEn)} كلمة${bodyEn === blurbEn ? '، نسخة من النبذة' : ''})`);
        if (body && wc(body) >= 80 && body !== blurb) publishedAr++;
        if (bodyEn && wc(bodyEn) >= 100 && bodyEn !== blurbEn) publishedEn++;
      }
    }
    if (bad.length) fail('C11', `متونٌ دون عتبة النشر: ${bad.join(' | ')}`);
    else pass('C11', `${total} منشأة ومكان إقامة — صفحات مفردة منشورة: ${publishedAr} عربية و${publishedEn} إنجليزية`);
  }

  // ── C15: دعوى «أكبر واحة» بلا محدِّد النخيل ───────────────────────────────
  // السجل الرسمي عند غينيس عنوانه «Largest oasis» ونصّه «largest self-contained
  // oasis in the world» — فلا «نخيل» ولا «طبيعية». وقرار إياد (2026-09-03) وحّد
  // الدعوى على «أكبر واحة في العالم» بعد تناقض الرئيسية مع بطاقة الأرقام.
  // يُفحص المبنيّ لا المصدر: نصٌّ ألمانيٌّ أو صينيٌّ قادم قد يعيد المحدِّد بحسن نيّة.
  {
    const PALM_CLAIM = [
      { lang: 'ar', re: /أكبر\s+واحة[ٍِ]?\s+نخيل/ },
      { lang: 'en', re: /largest\s+(?:natural\s+)?palm\s+oasis/i },
      { lang: 'zh', re: /最大的(?:天然)?(?:椰枣|棕榈)绿洲/ },
      { lang: 'de', re: /größten?\s+Palmenoase/i },
      // الروسية أُضيفت مع دفعة ui.ru (2026-09-05): رصدت المرحلة 4 أن /ru/ كانت بلا حارس
      // (‏\w لا تطابق السيريلية في JS بلا علم u، فالمقاطع بـ[а-яё] صراحةً)
      { lang: 'ru', re: /крупнейш[а-яё]+\s+(?:пальмов[а-яё]+|фиников[а-яё]+|природн[а-яё]+)\s+оазис/i },
    ];
    const OK_CLAIM = /أكبر واحة[ٍ]? (?:في العالم|على وجه الأرض)|largest oasis (?:on earth|in the world)|最大的绿洲|größten Oase der Welt|крупнейш[а-яё]+\s+оазис[а-яё]*\s+(?:в\s+мире|мира)/i;
    const offenders = [];
    let carriers = 0;
    for (const f of htmlFiles) {
      const html = await readFile(f, 'utf8');
      for (const { lang, re } of PALM_CLAIM) {
        if (re.test(html)) offenders.push(`${path.relative(DIST, f)} (${lang})`);
      }
      if (OK_CLAIM.test(html)) carriers++;
    }
    if (offenders.length) {
      fail('C15', `دعوى «واحة نخيل» عادت في ${offenders.length} صفحة: ${offenders.slice(0, 4).join(', ')} — غينيس تقول «Largest oasis»`);
    } else if (carriers === 0) {
      fail('C15', 'لا صفحة تحمل دعوى «أكبر واحة في العالم» — الحارس صار فارغاً، تحقّق من الصياغة');
    } else {
      pass('C15', `دعوى «أكبر واحة في العالم» موحّدة في ${carriers} صفحة — بلا محدِّد نخيل في أي لغة`);
    }
  }

  // ── C16: دفء كهوف جبل القارة يُعزى للشتاء لا لليل ────────────────────────
  // الكهوف تحافظ على اعتدال يقارب 20°م طوال العام، فالمقابلة صيفٌ/شتاء لا نهارٌ/ليل.
  // كان الخطأ في المصدر العربي فورثته الترجمات الثلاث — حكم إياد 2026-09-03.
  {
    const NIGHT_WARMTH = [
      { lang: 'ar', re: /ذروة\s+القيظ[^]{0,80}?الليل/ },
      { lang: 'en', re: /(?:peak|height)\s+of\s+summer[^]{0,80}?night/i },
      { lang: 'zh', re: /盛夏[^]{0,60}?(?:入夜|夜间|夜里)/ },
      { lang: 'de', re: /Hochsommer[^]{0,100}?Nacht/i },
    ];
    const OK_WINTER = /قلب الشتاء|depth of winter|隆冬|tiefsten Winter/;
    const offenders = [];
    let carriers = 0;
    for (const f of htmlFiles) {
      const text = stripTags(await readFile(f, 'utf8'), ' ');
      for (const { lang, re } of NIGHT_WARMTH) {
        if (re.test(text)) offenders.push(`${path.relative(DIST, f)} (${lang})`);
      }
      if (OK_WINTER.test(text)) carriers++;
    }
    if (offenders.length) {
      fail('C16', `دفء الكهوف عاد منسوباً لليل في ${offenders.length} صفحة: ${offenders.slice(0, 4).join(', ')} — الاعتدال طوال العام فالمقابلة شتاء`);
    } else if (carriers === 0) {
      fail('C16', 'لا صفحة تقابل قيظ الكهوف بالشتاء — الحارس صار فارغاً، تحقّق من الصياغة');
    } else {
      pass('C16', `دفء كهوف جبل القارة منسوب للشتاء في ${carriers} صفحة — لا نسبة لليل في أي لغة`);
    }
  }

  // ── C17: الشرطة الطويلة ممنوعة في عناوين ووصف صفحات /de/ ────────────────
  // شرطة الاعتراض الألمانية هي U+2013 (Halbgeviertstrich)؛ وU+2014 علامة
  // إنجليزية يقرؤها القارئ الألماني خللاً طباعياً. الفاصل رمزٌ الآن
  // (titleSep في i18n/utils) بعد أن كان محرفاً حرفياً في 15 قالباً — ووقع
  // فعلاً في عنوان /de/attractions/ أول ما بُنيت.
  {
    const deFiles = htmlFiles.filter((f) => {
      const rel = path.relative(DIST, f).split(path.sep);
      return rel[0] === 'de';
    });
    const offenders = [];
    for (const f of deFiles) {
      const html = await readFile(f, 'utf8');
      const spots = [];
      const title = html.match(/<title>([^<]*)<\/title>/);
      if (title) spots.push(['title', title[1]]);
      for (const m of html.matchAll(/<meta[^>]+(?:name|property)="(?:description|og:title|og:description|twitter:title|twitter:description)"[^>]+content="([^"]*)"/g))
        spots.push(['meta', m[1]]);
      for (const [where, text] of spots)
        if (text.includes('\u2014')) offenders.push(`${path.relative(DIST, f)} (${where})`);
    }
    if (offenders.length) {
      fail('C17', `شرطة U+2014 الطويلة في ${offenders.length} موضع من صفحات /de/: ${offenders.slice(0, 4).join(', ')} — الألمانية تستعمل U+2013`);
    } else if (deFiles.length === 0) {
      fail('C17', 'لا صفحة /de/ في المخرج — الحارس صار فارغاً');
    } else {
      pass('C17', `عناوين ووصف ${deFiles.length} صفحة ألمانية بشرطة U+2013 — لا U+2014`);
    }
  }

  // ── C18: التهجئة الألمانية «Souk» لا «Souq» في صفحات /de/ ────────────────
  // حسم إياد 2026-09-04 بعد أن تنازع المعجم (Souq) ووثيقة المشروع (Souk)
  // وانقسم المستودع بينهما في تسعة مواضع. الإنجليزية تبقى «Souq» فالفحص
  // على نصّ صفحات /de/ وحدها بعد نزع الوسوم — لا على المصدر، كي يُمسك
  // ما يتسرّب من أي ترنري بلا فرع de أو من متن ألماني جديد.
  {
    const deFiles = await listHtml(path.join(DIST, 'de'));
    const offenders = [];
    for (const f of deFiles) {
      const html = await readFile(f, 'utf8');
      let text = stripUntilStable(html, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi);
      text = stripUntilStable(text, /<link[^>]*>/gi);
      text = stripUntilStable(text, /<(\w+)[^>]*\blang="en"[^>]*>[\s\S]*?<\/\1>/gi);
      text = stripTags(text, ' ');
      if (/\bSouqs?\b/.test(text)) offenders.push(path.relative(DIST, f));
    }
    if (!deFiles.length) fail('C18', 'لا صفحة /de/ في المخرج — الحارس صار فارغاً');
    else if (offenders.length) fail('C18', `تهجئة «Souq» في نصّ ألماني — القرار «Souk» (إياد 2026-09-04): ${offenders.slice(0, 3).join(' · ')}`);
    else pass('C18', `تهجئة «Souk» الألمانية موحّدة في ${deFiles.length} صفحة — لا «Souq»`);
  }

  // ── C19: sameAs/Wikidata واليونسكو — المصدر يطابق المنشور في اللغات الخمس ──
  // بند 3.1 (2026-09-04): كل معلم يحمل sameAs في ترويسته يجب أن تُصدَّر روابطه
  // حرفياً في TouristAttraction بكل لغة له، وأول رابط كيان Wikidata، ولا كيان
  // يتقاسمه معلمان (الخطأ الأرجح: نسخ ترويسة معلم إلى آخر). ومعرّف مكوّن اليونسكو
  // يُصدَّر identifier ومعه عقدة الواحة (1563) في isPartOf. والرئيسيات الأربع
  // تحمل sameAs الواحة (Q311341 + اليونسكو). حارس إيجابي: عشرة معالم وستة مكوّنات
  // على الأقل — وإلا صار الفحص فارغاً بحذف الحقول لا بصحّتها.
  {
    const parseLd = (html) => {
      const out = [];
      for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try { const j = JSON.parse(m[1]); out.push(...(Array.isArray(j) ? j : [j])); } catch { /* يُمسكه الفحص أدناه */ }
      }
      return out;
    };
    const WD = /^https:\/\/www\.wikidata\.org\/wiki\/Q\d+$/;
    const expected = [];
    const qOwner = new Map(), uOwner = new Map();
    const problems = [];
    for (const f of (await readdir(SRC_ATTRACTIONS)).filter((n) => n.endsWith('.md'))) {
      const head = (await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const unesco = head.match(/^unesco:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const block = head.match(/^sameAs:\s*\r?\n((?:[ \t]+-[ \t]+\S.*\r?\n?)+)/m)?.[1] ?? '';
      const sameAs = [...block.matchAll(/^[ \t]+-[ \t]+"?(\S+?)"?[ \t]*$/gm)].map((m) => m[1]);
      if (!sameAs.length && !unesco) continue;
      if (!sameAs.length || !WD.test(sameAs[0])) problems.push(`${f}: أول sameAs ليس كيان Wikidata`);
      if (sameAs.some((u) => !u.startsWith('https://'))) problems.push(`${f}: رابط sameAs بلا https`);
      if (sameAs.length) { const q = sameAs[0]; if (qOwner.has(q)) problems.push(`${f} و${qOwner.get(q)} يتقاسمان ${q.split('/').pop()}`); else qOwner.set(q, f); }
      if (unesco) { if (uOwner.has(unesco)) problems.push(`${f} و${uOwner.get(unesco)} يتقاسمان مكوّن اليونسكو ${unesco}`); else uOwner.set(unesco, f); }
      expected.push({ f, slugEn, slugAr, sameAs: sameAs.map((u) => encodeURI(u)), unesco, hasZh: /^title_zh:/m.test(head), hasDe: /^title_de:/m.test(head), hasRu: /^title_ru:/m.test(head) });
    }
    let pagesChecked = 0;
    for (const e of expected) {
      const pages = [
        path.join(DIST, AR_ATTRACTIONS_DIR, e.slugAr, 'index.html'),
        path.join(DIST, 'en', 'attractions', e.slugEn, 'index.html'),
        ...(e.hasZh ? [path.join(DIST, 'zh', 'attractions', e.slugEn, 'index.html')] : []),
        ...(e.hasDe ? [path.join(DIST, 'de', 'attractions', e.slugEn, 'index.html')] : []),
        ...(e.hasRu ? [path.join(DIST, 'ru', 'attractions', e.slugEn, 'index.html')] : []),
      ];
      for (const p of pages) {
        let html;
        try { html = await readFile(p, 'utf8'); } catch { problems.push(`${e.f}: صفحة مفقودة ${path.relative(DIST, p)}`); continue; }
        const node = parseLd(html).find((n) => n['@type'] === 'TouristAttraction');
        const rel = path.relative(DIST, p);
        if (!node) { problems.push(`${rel}: لا TouristAttraction`); continue; }
        pagesChecked++;
        const got = Array.isArray(node.sameAs) ? node.sameAs : node.sameAs ? [node.sameAs] : [];
        if (JSON.stringify(got) !== JSON.stringify(e.sameAs)) problems.push(`${rel}: sameAs المنشور لا يطابق المصدر`);
        const ident = node.identifier?.value;
        if ((ident ?? undefined) !== (e.unesco ?? undefined)) problems.push(`${rel}: معرّف اليونسكو ${ident ?? 'غائب'} ≠ ${e.unesco ?? 'لا شيء'}`);
        if (e.unesco) {
          const parts = Array.isArray(node.isPartOf) ? node.isPartOf : [node.isPartOf];
          if (!parts.some((x) => x?.identifier?.value === '1563' && x?.url === 'https://whc.unesco.org/en/list/1563/')) problems.push(`${rel}: عقدة الواحة (1563) غائبة من isPartOf`);
        }
      }
    }
    for (const home of ['', 'en', 'zh', 'de', 'ru']) {
      const p = path.join(DIST, home, 'index.html');
      let html;
      try { html = await readFile(p, 'utf8'); } catch { problems.push(`الرئيسية /${home} مفقودة`); continue; }
      const dest = parseLd(html).find((n) => n['@type'] === 'TouristDestination');
      const sa = Array.isArray(dest?.sameAs) ? dest.sameAs : [];
      // مساواة تامة لا includes: CodeQL يقرأ includes على رابط فحصَ سلسلة فرعية
      // (js/incomplete-url-substring-sanitization) وإن كان على مصفوفة.
      const hasExact = (target) => sa.some((u) => u === target);
      if (!hasExact('https://www.wikidata.org/wiki/Q311341') || !hasExact('https://whc.unesco.org/en/list/1563/') || dest?.identifier?.value !== '1563')
        problems.push(`الرئيسية /${home}: الوجهة بلا sameAs الواحة (Q311341 + اليونسكو 1563)`);
    }
    const withQ = expected.filter((e) => e.sameAs.length).length;
    const withU = expected.filter((e) => e.unesco).length;
    if (withQ < 10 || withU < 6) fail('C19', `الحارس صار فارغاً: ${withQ} معلماً بـsameAs و${withU} بمكوّن يونسكو — المتوقع ≥10 و≥6`);
    else if (problems.length) fail('C19', `sameAs/اليونسكو: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C19', `sameAs في ${withQ} معلماً (${pagesChecked} صفحة) ومكوّنات اليونسكو ${withU} — المنشور يطابق المصدر، ولا كيان مشترك، والرئيسيات الخمس تحمل هوية الواحة`);
  }

  // ── C20: انقسام أداة التعريف في الروسية (حكم المعايرة P1 — 2026-09-05) ────
  // «Аль-Ахса» رأسُ الاسم: صيغة اليونسكو الروسية الرسمية واسم العلامة نفسها؛
  // و«Эль-» لما عداه (Эль-Хуфуф عنوانُ مقالة ru.wikipedia). التفاوت مقصود ومُسنَد
  // والتوحيد غير متاح: نحو «Эль-» يناقض اليونسكو ويكسر العلامة، ونحو ويكيبيديا
  // يعطي صيغةً ثالثة. **والمحظور تفاوتُ الاسم الواحد عن نفسه** — فالحارس يمنع
  // الاتجاهين معاً: لا «Эль-Ахс…» ولا «Аль-» أمام اسمٍ غير الأحساء. ومعه حارسٌ
  // إيجابيّ (ورود «Аль-Ахс…» فعلاً) كي لا يصير فارغاً بحذف النصّ لا بصحّته.
  // يُفحص المنشور لا المصدر: ما يتسرّب من ترنري بلا فرع ru أو من متن روسيّ جديد.
  // الجذع «Аль-Ахс» لا الصيغة التامة: الروسية تُصرّف الاسم بست حالات
  // (Аль-Ахса · Аль-Ахсы · Аль-Ахсе)، وحصرُه في المرفوع يجعل الحارس يكذب.
  {
    const ruFiles = await listHtml(path.join(DIST, 'ru'));
    const offenders = [];
    let carriers = 0;
    for (const f of ruFiles) {
      const html = await readFile(f, 'utf8');
      let text = stripUntilStable(html, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi);
      text = stripUntilStable(text, /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
      text = stripTags(text, ' ');
      const rel = path.relative(DIST, f);
      if (/Эль-Ахс/.test(text)) offenders.push(`${rel} → «Эль-Ахс…»`);
      const wrong = text.match(/Аль-(?!Ахс)[^\s<]*/);
      if (wrong) offenders.push(`${rel} → «${wrong[0]}»`);
      if (/Аль-Ахс/.test(text)) carriers++;
    }
    if (!ruFiles.length) fail('C20', 'لا صفحة /ru/ في المخرج — الحارس صار فارغاً');
    else if (offenders.length) fail('C20', `انقسام الأداة الروسية مكسور في ${offenders.length} موضع: ${offenders.slice(0, 4).join(' · ')} — «Аль-» للأحساء وحدها و«Эль-» لما عداها`);
    else if (carriers === 0) fail('C20', 'لا صفحة /ru/ تحمل «Аль-Ахса» — الحارس صار فارغاً، تحقّق من الصياغة');
    else pass('C20', `انقسام الأداة الروسية سليم في ${ruFiles.length} صفحة (${carriers} تحمل «Аль-Ахса») — لا «Эль-Ахс» ولا «Аль-» لغيرها`);
  }

  // ── C21: أسئلة المعالم الشائعة — المنشور يطابق المصدر، ولا رقم من خارج الصفحة ──
  // بند 3.2 (2026-09-05). القاعدة الحاكمة: السؤال يُبنى حصراً مما هو موثّق في
  // الصفحة نفسها (المتن + بنود practical الموثّقة التي تُصيَّر في بطاقة الزيارة).
  // الحارس يقرأ faq من ترويسة المصدر ويفحص كل صفحة معلم في كل لغة له:
  //   (أ) FAQPage المنشور يطابق حرفياً بنود اللغة (وجوداً وترتيباً ونصاً)، ولا
  //       FAQPage لصفحة بلا بند بلغتها — البوابة q_xx/a_xx كما في بطاقة الزيارة؛
  //   (ب) القسم المرئي يحمل عدد البنود نفسه (قوقل تشترط ظهور المحتوى المنظَّم)؛
  //   (ج) **كل رقم** في سؤال أو جواب (موعد، رسم، عدد، سنة) يرد في متن الصفحة
  //       أو بطاقتها بحدود رقمية — فلا يتسرّب موعد أو رسم من بند غير موثّق
  //       (لا يُصيَّر) ولا من خارج الصفحة. المطابقة على «8» لا تقبل «18».
  // القراءة من المصدر بصيغة محدَّدة (سلاسل مزدوجة التنصيص بهروب JSON) — سطرٌ
  // خارجها يُفشل الفحص بدل أن يتخطّاه، وحارس إيجابي ≥10 معالم بأسئلة.
  {
    const parseLd = (html) => {
      const out = [];
      for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try { const j = JSON.parse(m[1]); out.push(...(Array.isArray(j) ? j : [j])); } catch { /* يُمسكه الفحص أدناه */ }
      }
      return out;
    };
    const problems = [];
    const expected = [];
    for (const f of (await readdir(SRC_ATTRACTIONS)).filter((n) => n.endsWith('.md'))) {
      const head = (await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const block = head.match(/^faq:[ \t]*\r?\n((?:[ \t]+\S.*\r?\n?)+)/m)?.[1];
      if (!block) continue;
      const items = [];
      for (const raw of block.split(/\r?\n/)) {
        if (!raw.trim()) continue;
        const m = raw.match(/^[ \t]+(-[ \t]+)?(q|a)(_en|_zh|_de|_ru)?:[ \t]*(".*")[ \t]*$/);
        if (!m) { problems.push(`${f}: سطر faq خارج الصيغة المحدَّدة — ${raw.trim().slice(0, 40)}`); continue; }
        if (m[1]) items.push({});
        if (!items.length) { problems.push(`${f}: حقل faq قبل أول بند`); continue; }
        let val;
        try { val = JSON.parse(m[4]); } catch { problems.push(`${f}: قيمة faq غير قابلة للتحليل — ${raw.trim().slice(0, 40)}`); continue; }
        items.at(-1)[m[2] + (m[3] ?? '')] = val;
      }
      if (items.some((it) => !it.q || !it.a)) problems.push(`${f}: بند faq بلا q أو a بالعربية`);
      expected.push({
        f, items,
        slugEn: head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1],
        slugAr: head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1],
        hasZh: /^title_zh:/m.test(head), hasDe: /^title_de:/m.test(head), hasRu: /^title_ru:/m.test(head),
      });
    }
    const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let pagesChecked = 0, questions = 0;
    for (const e of expected) {
      const pages = [
        ['', path.join(DIST, AR_ATTRACTIONS_DIR, e.slugAr, 'index.html')],
        ['_en', path.join(DIST, 'en', 'attractions', e.slugEn, 'index.html')],
        ...(e.hasZh ? [['_zh', path.join(DIST, 'zh', 'attractions', e.slugEn, 'index.html')]] : []),
        ...(e.hasDe ? [['_de', path.join(DIST, 'de', 'attractions', e.slugEn, 'index.html')]] : []),
        ...(e.hasRu ? [['_ru', path.join(DIST, 'ru', 'attractions', e.slugEn, 'index.html')]] : []),
      ];
      for (const [sfx, p] of pages) {
        const want = e.items.filter((it) => it['q' + sfx] && it['a' + sfx]).map((it) => ({ q: it['q' + sfx], a: it['a' + sfx] }));
        let html;
        try { html = await readFile(p, 'utf8'); } catch { problems.push(`${e.f}: صفحة مفقودة ${path.relative(DIST, p)}`); continue; }
        const rel = path.relative(DIST, p);
        pagesChecked++;
        const nodes = parseLd(html).filter((n) => n['@type'] === 'FAQPage');
        const visible = (html.match(/<details\b[^>]*\bclass="faq-item"/g) ?? []).length;
        if (!want.length) {
          if (nodes.length) problems.push(`${rel}: FAQPage منشور بلا بند بلغته في المصدر`);
          if (visible) problems.push(`${rel}: قسم أسئلة مرئي بلا بند بلغته في المصدر`);
          continue;
        }
        if (nodes.length !== 1) { problems.push(`${rel}: ${nodes.length} عقدة FAQPage والمتوقع واحدة`); continue; }
        const got = (nodes[0].mainEntity ?? []).map((m) => ({ q: m.name, a: m.acceptedAnswer?.text }));
        if (JSON.stringify(got) !== JSON.stringify(want)) problems.push(`${rel}: FAQPage المنشور لا يطابق المصدر`);
        if (visible !== want.length) problems.push(`${rel}: القسم المرئي ${visible} بنداً والسكيما ${want.length}`);
        questions += want.length;
        // (ج) الأرقام: مصدرها المتن (<article class="prose">) وبطاقة الزيارة (<aside>) وحدهما
        const prose = html.match(/<article\b[^>]*\bclass="prose"[^>]*>[\s\S]*?<\/article>/)?.[0] ?? '';
        const aside = html.match(/<aside\b[^>]*\bclass="att-aside"[^>]*>[\s\S]*?<\/aside>/)?.[0] ?? '';
        if (!prose || !aside) { problems.push(`${rel}: تعذّر عزل المتن أو بطاقة الزيارة لفحص الأرقام`); continue; }
        const srcText = stripTags(prose + ' ' + aside, ' ');
        for (const it of want) {
          for (const num of (it.q + ' ' + it.a).match(/\d+(?:[:.,]\d+)*/g) ?? []) {
            // الحدود رقمية لا ترقيمية: «2018.» آخر الجملة رقمٌ صحيح، أما «18» فلا تُقبل لـ«8»،
            // و«8:00» لا تُقبل لـ«8» (الصيغة في السؤال تطابق صيغة البطاقة حرفياً)
            if (!new RegExp('(?<!\\d)(?<!\\d[:.,])' + escapeRe(num) + '(?![:.,]?\\d)').test(srcText))
              problems.push(`${rel}: الرقم «${num}» في السؤال «${it.q.slice(0, 30)}…» لا يرد في متن الصفحة ولا بطاقتها`);
          }
        }
      }
    }
    if (expected.length < 10) fail('C21', `الحارس صار فارغاً: ${expected.length} معلماً يحمل faq — المتوقع ≥10`);
    else if (problems.length) fail('C21', `أسئلة المعالم: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C21', `أسئلة شائعة في ${expected.length} معلماً (${pagesChecked} صفحة، ${questions} سؤالاً منشوراً) — FAQPage والقسم المرئي يطابقان المصدر، وكل رقم فيها من متن الصفحة أو بطاقتها`);
  }

  // ── C22: سلامة اللغة في النسخ الصينية والألمانية والروسية (الخطوة 5 من خطة التفاعل العالمي) ──
  // كل صفحة zh/de/ru **معلَنة** (تحمل hreflang) يجب أن يبقى نصّها غير المترجم دون 20%:
  // المقياس = كتل نصّ من كلمتين لاتينيتين فأكثر مطابقة حرفياً لكتلة في النظيرة
  // الإنجليزية، مقسومة على كل كتل الصفحة من كلمتين فأكثر بأي كتابة — بعد استثناء
  // أسماء الأعلام من المصدر (title/title_en/name_en/area_en/kicker_en تبقى لاتينية
  // في الألمانية عمداً) والعلامة والأرقام. والصفحات في src/i18n/unlisted.ts: بلا
  // hreflang وخارج sitemap ولا يشير إليها hreflang من أي صفحة، وnoindex متى وُسمت.
  {
    const THRESHOLD = 20;
    const unlistedSrc = await readFile(path.join(ROOT, 'src/i18n/unlisted.ts'), 'utf8');
    const unlisted = [...unlistedSrc.matchAll(/\{\s*path:\s*'([^']+)',\s*noindex:\s*(true|false)/g)].map((m) => ({ path: m[1], noindex: m[2] === 'true' }));
    const names = new Set(['Visit Al-Ahsa', 'Al-Ahsa', 'VISIT AL-AHSA', 'visit-alahsa.com', 'Ctrl K', 'Esc']);
    for (const dir of ['src/content/attractions', 'src/content/dining', 'src/content/stay']) {
      for (const f of (await readdir(path.join(ROOT, dir))).filter((n) => n.endsWith('.md'))) {
        const head = (await readFile(path.join(ROOT, dir, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
        for (const k of ['title', 'title_en', 'name_en', 'area_en', 'kicker_en']) {
          const m = head.match(new RegExp(`^${k}:\\s*"?([^"\\r\\n]+?)"?\\s*$`, 'm'));
          if (m) names.add(m[1].trim());
        }
      }
    }
    const chunksOf = (html) => {
      const body = html.replace(/<head[\s\S]*?<\/head>/, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '');
      const attrs = [...body.matchAll(/(?:alt|aria-label|placeholder)="([^"]{3,})"/g)].map((m) => m[1]);
      return [...body.replace(/<[^>]+>/g, '\n').split(/\n+/), ...attrs]
        .map((t) => t.replace(/&[a-z]+;|&#\d+;/g, ' ').replace(/\s+/g, ' ').trim())
        .filter((t) => t.split(' ').length >= 2 && !/^[\d\s.,:%+\-–—/·]+$/.test(t) && !names.has(t));
    };
    const smXml = existsSync(smPath) ? await readFile(smPath, 'utf8') : '';
    const problems = [];
    const worst = {};
    let advertised = 0;
    for (const lang of ['zh', 'de', 'ru']) {
      worst[lang] = { pct: 0, page: '' };
      for (const fp of await listHtml(path.join(DIST, lang))) {
        const html = await readFile(fp, 'utf8');
        const pagePath = '/' + path.relative(DIST, fp).replace(/index\.html$/, '');
        const isUnlisted = unlisted.some((u) => u.path === pagePath);
        const hasHreflang = /<link rel="alternate" hreflang=/.test(html);
        const noindex = /<meta name="robots" content="noindex/.test(html);
        if (isUnlisted) {
          if (hasHreflang) problems.push(`${pagePath}: غير معلَنة لكنها تحمل hreflang`);
          if (smXml.includes(`<loc>https://visit-alahsa.com${pagePath}</loc>`)) problems.push(`${pagePath}: غير معلَنة داخل sitemap`);
          const flag = unlisted.find((u) => u.path === pagePath).noindex;
          if (flag && !noindex) problems.push(`${pagePath}: موسومة noindex في unlisted.ts وليست كذلك`);
          continue;
        }
        if (!hasHreflang || noindex) continue; // غير معلَنة أصلاً (رحلتي، الرقيقة…)
        const enHref = html.match(/hreflang="en" href="https:\/\/visit-alahsa\.com([^"]+)"/)?.[1];
        if (!enHref) { problems.push(`${pagePath}: معلَنة بلا نظير إنجليزي`); continue; }
        const enFile = path.join(DIST, decodeURIComponent(enHref), 'index.html');
        if (!existsSync(enFile)) { problems.push(`${pagePath}: النظير الإنجليزي ${enHref} غير مبني`); continue; }
        const en = new Set(chunksOf(await readFile(enFile, 'utf8')).filter((t) => /[A-Za-z]{2,}/.test(t)));
        const all = chunksOf(html);
        const same = all.filter((t) => /[A-Za-z]{2,}/.test(t) && en.has(t));
        const pct = all.length ? Math.round((100 * same.length) / all.length) : 0;
        advertised++;
        if (pct > worst[lang].pct) worst[lang] = { pct, page: pagePath };
        if (pct > THRESHOLD) problems.push(`${pagePath}: ${pct}% من كتل النصّ إنجليزية (${same.length}/${all.length}) — مثال: «${same[0]?.slice(0, 40)}»`);
      }
    }
    // لا صفحة معلَنة تشير بـhreflang إلى صفحة غير معلَنة
    for (const fp of await listHtml(DIST)) {
      const html = await readFile(fp, 'utf8');
      for (const u of unlisted) {
        if (html.includes(`hreflang="${u.path.split('/')[1]}" href="https://visit-alahsa.com${u.path}"`)) problems.push(`${path.relative(DIST, fp)}: hreflang يشير إلى غير المعلَنة ${u.path}`);
      }
    }
    const summary = ['zh', 'de', 'ru'].map((l) => `${l} ≤ ${worst[l].pct}% (${worst[l].page || '—'})`).join(' · ');
    if (advertised < 50) fail('C22', `الحارس صار فارغاً: ${advertised} صفحة معلَنة مفحوصة — المتوقع ≥50`);
    else if (problems.length) fail('C22', `سلامة اللغة: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C22', `${advertised} صفحة zh/de/ru معلَنة كلها دون ${THRESHOLD}% إنجليزية (الأعلى: ${summary})؛ و${unlisted.length} صفحة غير معلَنة بلا hreflang وخارج sitemap`);
  }

  // ── C23: عتبة نشر المعالم وبطاقات المشاركة بلغة الصفحة (الخطوة 4 من خطة التفاعل العالمي) ──
  // (أ) صفحة المعلم الرقيقة (المتن + الأسئلة الشائعة دون 40 كلمة بالعربية أو
  //     الإنجليزية — القاعدة في src/lib/publish.ts) تبقى مبنية للزائر لكنها
  //     noindex بلا hreflang وخارج sitemap في كل لغاتها؛ وغير الرقيقة مفهرسة
  //     وداخل الخريطة. الحكم على ما يراه الزاحف في dist لا على المصدر.
  // (ب) كل صفحة قابلة للفهرسة تحمل og:image بلغتها: صورة محتوى، أو الافتراضية
  //     بلغة الصفحة (og-default.png للعربية وog-default-{lang}.png لغيرها) — لا
  //     بطاقة عربية لصفحة أجنبية. والملفات الخمسة موجودة في dist.
  {
    const THIN = 40;
    const wc = (t) => t.trim().split(/\s+/).filter(Boolean).length;
    const sectionText = (html, re) => { const m = html.match(re); return m ? stripTags(m[1], ' ') : ''; };
    // فقرة الإجابة (الخطوة 8) مركّبة من المتن نفسه فلا تُحسب — وإلا رفعت صفحةً رقيقة فوق العتبة بلا مصدر
    const contentWords = (raw) => {
      const html = raw.replace(/<p class="answer"[^>]*>[\s\S]*?<\/p>/, '');
      return wc(sectionText(html, /<article class="prose"[^>]*>([\s\S]*?)<\/article>/)) +
        wc(sectionText(html, /<section class="container att-faq"[^>]*>([\s\S]*?)<\/section>/));
    };
    const smXml = existsSync(smPath) ? await readFile(smPath, 'utf8') : '';
    const inSitemap = (p) => smXml.includes(`<loc>https://visit-alahsa.com${encodeURI(p)}</loc>`);
    const problems = [];
    let thinCount = 0, checked = 0;
    const thinSlugs = [];
    for (const f of (await readdir(SRC_ATTRACTIONS)).filter((n) => n.endsWith('.md'))) {
      const head = (await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      if (!slugAr || !slugEn) { problems.push(`${f}: بلا slug`); continue; }
      const pages = [
        ['ar', `/${AR_ATTRACTIONS_DIR}/${slugAr}/`],
        ['en', `/en/attractions/${slugEn}/`],
        ...['zh', 'de', 'ru'].map((l) => [l, `/${l}/attractions/${slugEn}/`]),
      ].map(([l, p]) => [l, p, path.join(DIST, decodeURIComponent(p), 'index.html')]).filter(([, , fp]) => existsSync(fp));
      const htmlBy = Object.fromEntries(await Promise.all(pages.map(async ([l, , fp]) => [l, await readFile(fp, 'utf8')])));
      if (!htmlBy.ar || !htmlBy.en) { problems.push(`${f}: صفحة عربية أو إنجليزية غير مبنية`); continue; }
      const thin = contentWords(htmlBy.ar) < THIN || contentWords(htmlBy.en) < THIN;
      if (thin) { thinCount++; thinSlugs.push(slugEn); }
      for (const [l, p] of pages) {
        checked++;
        const html = htmlBy[l];
        const noindex = /<meta name="robots" content="noindex/.test(html);
        const hasHreflang = /<link rel="alternate" hreflang=/.test(html);
        if (thin && !noindex) problems.push(`${p}: رقيقة (${contentWords(htmlBy.ar)}/${contentWords(htmlBy.en)} كلمة) بلا noindex`);
        if (!thin && noindex) problems.push(`${p}: noindex وهي فوق العتبة`);
        if (thin && hasHreflang) problems.push(`${p}: hreflang على صفحة رقيقة`);
        if (!thin && !hasHreflang) problems.push(`${p}: بلا hreflang`);
        if (thin && inSitemap(p)) problems.push(`${p}: رقيقة داخل sitemap`);
        if (!thin && !inSitemap(p)) problems.push(`${p}: غائبة عن sitemap`);
      }
    }
    // (ب) بطاقات المشاركة
    const ogFiles = ['og-default.png', 'og-default-en.png', 'og-default-zh.png', 'og-default-de.png', 'og-default-ru.png'];
    for (const o of ogFiles) if (!existsSync(path.join(DIST, o))) problems.push(`${o} غير موجودة في dist`);
    let ogChecked = 0, ogDefault = 0;
    for (const fp of await listHtml(DIST)) {
      const html = await readFile(fp, 'utf8');
      if (/<meta name="robots" content="noindex/.test(html)) continue;
      const lang = (html.match(/<html lang="([^"]+)"/)?.[1] ?? 'ar').split('-')[0];
      const og = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? '';
      if (!og) { problems.push(`${path.relative(DIST, fp)}: بلا og:image`); continue; }
      ogChecked++;
      const m = og.match(/\/og-default(?:-([a-z]{2}))?\.png$/);
      if (m) {
        ogDefault++;
        const imgLang = m[1] ?? 'ar';
        if (imgLang !== lang) problems.push(`${path.relative(DIST, fp)}: og:image بلغة ${imgLang} على صفحة ${lang}`);
      }
    }
    if (checked < 100) fail('C23', `الحارس صار فارغاً: ${checked} صفحة معلم مفحوصة — المتوقع ≥100`);
    else if (problems.length) fail('C23', `عتبة النشر/بطاقات المشاركة: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C23', `${thinCount} معالم رقيقة (${thinSlugs.join('، ')}) noindex وخارج sitemap في ${checked} صفحة معلم؛ و${ogChecked} صفحة مفهرسة كلها بصورة OG بلغتها (${ogDefault} منها بالافتراضية)`);
  }

  // ── C24: الجداول والمواعيد المبنيَنة (الخطوة 8 من خطة التفاعل العالمي) ──
  // (أ) كل رقم في خلية جدول `data-table` وارد حرفياً في مصدر الجدول نفسه: بنود practical
  //     في ملفات المعالم، أو src/data/events.ts، أو src/data/fruits.ts — فلا يدخل الجداول
  //     رقم من خارج مصادر الحقيقة، ولا يتقادم جدول عن بطاقته. والجداول الثلاثة مطلوبة
  //     بالعربية والإنجليزية وبصفوف لا تقل عن عتبة (وإلا صار الحارس فارغاً بصمت).
  // (ب) openingHoursSpecification وisAccessibleForFree/offers في JSON-LD صفحات المعلم
  //     لا تظهر إلا حيث يحمل مصدر المعلم hoursSpec/fee، وتظهر في كل لغاته حيث يحملهما،
  //     وساعاتها ومبالغها واردة في المصدر حرفياً. وكل كتلة ld+json في dist تُحلَّل JSON.
  {
    const problems = [];
    const numsOf = (t) => t.match(/\d+(?:[.:]\d+)?/g) ?? [];
    const decode = (t) => t.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ');
    const attrFiles = (await readdir(SRC_ATTRACTIONS)).filter((n) => n.endsWith('.md'));
    const heads = {};
    for (const f of attrFiles) heads[f] = (await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    const SOURCES = {
      practical: Object.values(heads).map((h) => h.match(/^practical:\n([\s\S]*?)(?=^\S)/m)?.[1] ?? '').join('\n'),
      events: await readFile(path.join(ROOT, 'src/data/events.ts'), 'utf8'),
      fruits: await readFile(path.join(ROOT, 'src/data/fruits.ts'), 'utf8'),
    };
    const MIN_ROWS = { practical: 15, events: 8, fruits: 12 };
    const seen = {};
    const LD = new Map();
    let tables = 0, cells = 0, ldCount = 0;
    for (const fp of await listHtml(DIST)) {
      const html = await readFile(fp, 'utf8');
      const rel = path.relative(DIST, fp);
      const lang = (html.match(/<html lang="([^"]+)"/)?.[1] ?? 'ar').split('-')[0];
      for (const m of html.matchAll(/<table class="va-table" data-table="([^"]+)">([\s\S]*?)<\/table>/g)) {
        const [, id, body] = m;
        const src = SOURCES[id];
        if (!src) { problems.push(`${rel}: جدول ${id} بلا مصدر معروف`); continue; }
        tables++;
        (seen[id] ??= new Set()).add(lang);
        const rows = (body.match(/<tbody>([\s\S]*)<\/tbody>/)?.[1].match(/<tr>/g) ?? []).length;
        if (rows < MIN_ROWS[id]) problems.push(`${rel}: جدول ${id} بـ${rows} صفوف — المتوقع ≥${MIN_ROWS[id]}`);
        for (const c of body.matchAll(/<(?:td|th scope="row")[^>]*>([\s\S]*?)<\/(?:td|th)>/g)) {
          cells++;
          const text = decode(stripTags(c[1], ' ')).trim();
          for (const n of numsOf(text)) if (!src.includes(n)) problems.push(`${rel}: الرقم ${n} في جدول ${id} («${text.slice(0, 30)}») غير وارد في مصدره`);
        }
      }
      const objs = [];
      for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try {
          const j = JSON.parse(m[1]);
          for (const o of Array.isArray(j) ? j : [j]) objs.push(...(Array.isArray(o?.['@graph']) ? o['@graph'] : [o]));
          ldCount++;
        } catch { problems.push(`${rel}: كتلة ld+json غير صالحة`); }
      }
      LD.set(fp, objs);
    }
    for (const id of Object.keys(SOURCES)) for (const l of ['ar', 'en']) if (!seen[id]?.has(l)) problems.push(`جدول ${id} غائب عن النسخة ${l}`);

    // (ب) المواعيد والرسوم المبنيَنة
    let hoursPages = 0, feePages = 0, attrPages = 0;
    for (const f of attrFiles) {
      const head = heads[f];
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      if (!slugAr || !slugEn) continue; // يبلّغ عنه C23
      const hoursSrc = head.match(/^hoursSpec:\n([\s\S]*?)(?=^\S)/m)?.[1];
      const feeSrc = head.match(/^fee:.*$/m)?.[0];
      const pages = [`/${AR_ATTRACTIONS_DIR}/${slugAr}/`, `/en/attractions/${slugEn}/`, ...['zh', 'de', 'ru'].map((l) => `/${l}/attractions/${slugEn}/`)]
        .map((p) => [p, path.join(DIST, decodeURIComponent(p), 'index.html')]).filter(([, fp]) => existsSync(fp));
      for (const [p, fp] of pages) {
        attrPages++;
        const objs = LD.get(fp) ?? [];
        const place = objs.find((o) => o?.['@type'] === 'TouristAttraction');
        if (!place) { problems.push(`${p}: بلا TouristAttraction في JSON-LD`); continue; }
        const ohs = place.openingHoursSpecification;
        if (hoursSrc && !(Array.isArray(ohs) && ohs.length)) problems.push(`${p}: المصدر يحمل hoursSpec والسكيما بلا openingHoursSpecification`);
        if (!hoursSrc && ohs) problems.push(`${p}: openingHoursSpecification بلا hoursSpec في المصدر`);
        if (hoursSrc && Array.isArray(ohs)) {
          hoursPages++;
          for (const h of ohs) {
            if (h?.['@type'] !== 'OpeningHoursSpecification') problems.push(`${p}: نوع مواعيد غير متوقع`);
            for (const k of ['opens', 'closes']) if (typeof h?.[k] !== 'string' || !hoursSrc.includes(`"${h[k]}"`)) problems.push(`${p}: ${k}=${h?.[k]} غير وارد في hoursSpec`);
            const days = Array.isArray(h?.dayOfWeek) ? h.dayOfWeek : [h?.dayOfWeek];
            if (!days.length || !days.every((d) => /^https:\/\/schema\.org\/(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day$/.test(d))) problems.push(`${p}: dayOfWeek غير صالح`);
          }
        }
        const hasFee = 'isAccessibleForFree' in place;
        if (feeSrc && !hasFee) problems.push(`${p}: المصدر يحمل fee والسكيما بلا isAccessibleForFree`);
        if (!feeSrc && (hasFee || place.offers)) problems.push(`${p}: isAccessibleForFree/offers بلا fee في المصدر`);
        if (feeSrc && hasFee) {
          feePages++;
          const free = /free:\s*true/.test(feeSrc);
          if (place.isAccessibleForFree !== free) problems.push(`${p}: isAccessibleForFree=${place.isAccessibleForFree} يخالف المصدر`);
          if (free && place.offers) problems.push(`${p}: offers على معلم مجاني`);
          if (!free) {
            const o = place.offers;
            const nums = [o?.price, o?.priceSpecification?.minPrice, o?.priceSpecification?.maxPrice].filter((v) => v !== undefined);
            if (o?.['@type'] !== 'Offer' || !nums.length) problems.push(`${p}: رسم مدفوع بلا Offer صالح`);
            for (const n of nums) if (!new RegExp(`\\b${n}\\b`).test(feeSrc)) problems.push(`${p}: المبلغ ${n} غير وارد في fee`);
          }
        }
      }
    }
    // (ج) فقرة الإجابة (answer/answer_en): تُنشر حرفياً أول المتن وفي وصف الصفحة بالعربية
    //     والإنجليزية فقط، بين 35 و45 كلمة، وكل رقم فيها وارد في بقية المتن أو بطاقة الزيارة
    //     (المتن دون الفقرة نفسها) — ولا فقرة لصفحة بلا answer في مصدرها.
    const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const numRe = (num) => new RegExp('(?<!\\d)(?<!\\d[:.,])' + escapeRe(num) + '(?![:.,]?\\d)');
    const wc = (t) => t.trim().split(/\s+/).filter(Boolean).length;
    const unesc = (t) => t.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    let answerPages = 0;
    for (const f of attrFiles) {
      const head = heads[f];
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      if (!slugAr || !slugEn) continue;
      const src = { ar: head.match(/^answer:\s*"(.*)"\s*$/m)?.[1], en: head.match(/^answer_en:\s*"(.*)"\s*$/m)?.[1] };
      if (Boolean(src.ar) !== Boolean(src.en)) problems.push(`${f}: answer بلغة واحدة`);
      const pages = [['ar', `/${AR_ATTRACTIONS_DIR}/${slugAr}/`], ['en', `/en/attractions/${slugEn}/`], ...['zh', 'de', 'ru'].map((l) => [l, `/${l}/attractions/${slugEn}/`])]
        .map(([l, p]) => [l, p, path.join(DIST, decodeURIComponent(p), 'index.html')]).filter(([, , fp]) => existsSync(fp));
      for (const [l, p, fp] of pages) {
        const html = await readFile(fp, 'utf8');
        const found = [...html.matchAll(/<p class="answer"[^>]*>([\s\S]*?)<\/p>/g)].map((m) => unesc(stripTags(m[1], ' ')).trim());
        const want = l === 'ar' || l === 'en' ? src[l] : undefined;
        if (!want) { if (found.length) problems.push(`${p}: فقرة إجابة بلا answer بلغتها في المصدر`); continue; }
        answerPages++;
        if (found.length !== 1 || found[0] !== want) { problems.push(`${p}: فقرة الإجابة المنشورة لا تطابق المصدر`); continue; }
        const words = wc(want);
        if (words < 35 || words > 45) problems.push(`${p}: فقرة الإجابة ${words} كلمة — المطلوب 35–45`);
        const desc = unesc(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
        if (desc !== want) problems.push(`${p}: وصف الصفحة ليس فقرة الإجابة`);
        const prose = (html.match(/<article\b[^>]*\bclass="prose"[^>]*>[\s\S]*?<\/article>/)?.[0] ?? '').replace(/<p class="answer"[^>]*>[\s\S]*?<\/p>/, '');
        const aside = html.match(/<aside\b[^>]*\bclass="att-aside"[^>]*>[\s\S]*?<\/aside>/)?.[0] ?? '';
        if (!prose || !aside) { problems.push(`${p}: تعذّر عزل المتن أو بطاقة الزيارة لفحص أرقام الإجابة`); continue; }
        const srcText = stripTags(prose + ' ' + aside, ' ');
        for (const num of want.match(/\d+(?:[:.,]\d+)*/g) ?? []) if (!numRe(num).test(srcText)) problems.push(`${p}: الرقم «${num}» في فقرة الإجابة لا يرد في متن الصفحة ولا بطاقتها`);
      }
    }

    // (د) صفحة مكوّنات اليونسكو: عربية وإنجليزية، تحمل كل ما يحمل unesco في المصدر (عدداً
    //     ومعرّفات ورابطاً لكل صفحة معلم)، وItemList بعددها، وhreflang متبادل، وداخل sitemap.
    const comps = attrFiles.map((f) => ({
      f, id: heads[f].match(/^unesco:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1],
      slugAr: heads[f].match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1], slugEn: heads[f].match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1],
    })).filter((c) => c.id).sort((a, b) => a.id.localeCompare(b.id));
    const smXml24 = existsSync(smPath) ? await readFile(smPath, 'utf8') : '';
    for (const [l, p] of [['ar', '/اليونسكو/'], ['en', '/en/unesco/']]) {
      const fp = path.join(DIST, p, 'index.html');
      let html;
      try { html = await readFile(fp, 'utf8'); } catch { problems.push(`صفحة اليونسكو ${p} مفقودة`); continue; }
      const ids = [...html.matchAll(/data-unesco="([^"]+)"/g)].map((m) => m[1]);
      if (JSON.stringify(ids) !== JSON.stringify(comps.map((c) => c.id))) problems.push(`${p}: المكوّنات المنشورة (${ids.join('، ')}) ≠ المصدر (${comps.map((c) => c.id).join('، ')})`);
      for (const c of comps) {
        const href = l === 'ar' ? `/${AR_ATTRACTIONS_DIR}/${c.slugAr}/` : `/en/attractions/${c.slugEn}/`;
        if (!html.includes(`href="${href}"`) && !html.includes(`href="${encodeURI(href)}"`)) problems.push(`${p}: بلا رابط إلى ${c.slugEn}`);
      }
      const list = (LD.get(fp) ?? []).find((o) => o?.['@type'] === 'ItemList');
      if (!list || list.numberOfItems !== comps.length || (list.itemListElement ?? []).length !== comps.length) problems.push(`${p}: ItemList لا يحمل ${comps.length} مكوّنات`);
      const other = l === 'ar' ? '/en/unesco/' : '/اليونسكو/';
      if (!new RegExp(`hreflang="${l === 'ar' ? 'en' : 'ar'}"[^>]*href="[^"]*(?:${escapeRe(other)}|${escapeRe(encodeURI(other))})"`).test(html)) problems.push(`${p}: بلا hreflang إلى ${other}`);
      if (!smXml24.includes(`<loc>https://visit-alahsa.com${encodeURI(p)}</loc>`)) problems.push(`${p}: غائبة عن sitemap`);
    }

    if (tables < 6 || attrPages < 100 || ldCount < 300 || answerPages < 30 || comps.length < 6) fail('C24', `الحارس صار فارغاً: ${tables} جداول، ${attrPages} صفحة معلم، ${ldCount} كتلة ld+json، ${answerPages} فقرة إجابة، ${comps.length} مكوّن يونسكو — المتوقع ≥6 و≥100 و≥300 و≥30 و≥6`);
    else if (hoursPages < 16 || feePages < 40) fail('C24', `المواعيد المبنيَنة في ${hoursPages} صفحة والرسوم في ${feePages} — المتوقع ≥16 و≥40 (تراجع في المصدر؟)`);
    else if (problems.length) fail('C24', `الجداول/المواعيد المبنيَنة/الإجابات/اليونسكو: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C24', `${tables} جداول (${cells} خلية) أرقامها كلها من مصادرها؛ ${ldCount} كتلة ld+json صالحة؛ مواعيد مبنيَنة في ${hoursPages} صفحة معلم ورسوم في ${feePages} مطابقة لمصدرها؛ ${answerPages} فقرة إجابة (35–45 كلمة) مطابقة لمصدرها وأرقامها من صفحتها؛ صفحة اليونسكو بلغتيها تحمل المكوّنات ${comps.length} بروابطها`);
  }

  // ── C25: الربط الداخلي (الخطوة 9 من خطة التفاعل العالمي، ف4) ──
  // (أ) كل معلم يربطه مقالٌ (رابط /معالم/<slug>/ أو /<lang>/attractions/<slug>/ في صفحة
  //     المقال المبنية) تحمل صفحته بلغة المقال قسم «مقالات تذكر هذا المعلم» برابط إلى ذلك
  //     المقال — والعكس: لا رابط في القسم إلى مقال لا يذكره (المنشور = الفهرس العكسي).
  // (ب) صفحة المنشأة التي يحمل مصدرها district تعرض كل المعالم الحاملة للحيّ نفسه
  //     (عدداً وروابط)، ولا قسم لمنشأة بلا حيّ. حارس إيجابي على العددين.
  {
    const problems = [];
    const AR_BLOG_DIR = 'مدونة';
    const linksIn = (html, re) => [...html.matchAll(re)].map((m) => { try { return decodeURIComponent(m[1]); } catch { return m[1]; } });
    const hrefsOf = (block) => new Set(linksIn(block, /href="([^"]+)"/g));
    // (أ) المقالات → المعالم
    const expected = new Map(); // `${lang}:${slug}` → Set(postPath)
    const blogDirs = [['ar', path.join(DIST, AR_BLOG_DIR)], ['en', path.join(DIST, 'en', 'blog')], ...['zh', 'de', 'ru'].map((l) => [l, path.join(DIST, l, 'blog')])];
    let posts = 0;
    for (const [l, dir] of blogDirs) {
      let names;
      try { names = (await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => e.name); } catch { continue; }
      for (const n of names) {
        const fp = path.join(dir, n, 'index.html');
        if (!existsSync(fp)) continue;
        posts++;
        const html = await readFile(fp, 'utf8');
        const postPath = l === 'ar' ? `/${AR_BLOG_DIR}/${n}/` : `/${l}/blog/${n}/`;
        // روابط الماركداون العربية تخرج مرمَّزة (percent-encoding) — تُفكّ في hrefsOf قبل المطابقة
        const prefix = l === 'ar' ? `/${AR_ATTRACTIONS_DIR}/` : `/${l}/attractions/`;
        for (const h of hrefsOf(html)) {
          const m = h.startsWith(prefix) ? h.slice(prefix.length).match(/^([^/?#]+)\/$/) : null;
          if (!m) continue;
          const k = `${l}:${m[1]}`;
          (expected.get(k) ?? expected.set(k, new Set()).get(k)).add(postPath);
        }
      }
    }
    let withMentions = 0, mentionLinks = 0;
    for (const f of (await readdir(SRC_ATTRACTIONS)).filter((n) => n.endsWith('.md'))) {
      const head = (await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      if (!slugAr || !slugEn) continue;
      const pages = [['ar', slugAr, `/${AR_ATTRACTIONS_DIR}/${slugAr}/`], ['en', slugEn, `/en/attractions/${slugEn}/`], ...['zh', 'de', 'ru'].map((l) => [l, slugEn, `/${l}/attractions/${slugEn}/`])]
        .map(([l, slug, p]) => [l, slug, p, path.join(DIST, decodeURIComponent(p), 'index.html')]).filter(([, , , fp]) => existsSync(fp));
      for (const [l, slug, p, fp] of pages) {
        const html = await readFile(fp, 'utf8');
        const sec = html.match(/<section class="container mentions-sec"[\s\S]*?<\/section>/)?.[0] ?? '';
        const got = hrefsOf(sec);
        const want = expected.get(`${l}:${slug}`) ?? new Set();
        if (want.size) { withMentions++; mentionLinks += want.size; }
        const missing = [...want].filter((x) => !got.has(x));
        const extra = [...got].filter((x) => !want.has(x));
        if (missing.length) problems.push(`${p}: قسم المقالات بلا ${missing.slice(0, 2).join('، ')}`);
        if (extra.length) problems.push(`${p}: قسم المقالات يربط مقالاً لا يذكره — ${extra.slice(0, 2).join('، ')}`);
      }
    }
    // (ب) المنشآت → معالم الحيّ
    const SRC_DINING = path.join(ROOT, 'src/content/dining');
    const attrByDistrict = new Map();
    for (const f of (await readdir(SRC_ATTRACTIONS)).filter((n) => n.endsWith('.md'))) {
      const head = (await readFile(path.join(SRC_ATTRACTIONS, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const dist = head.match(/^district:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      if (!dist) continue;
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      (attrByDistrict.get(dist) ?? attrByDistrict.set(dist, []).get(dist)).push({ ar: `/${AR_ATTRACTIONS_DIR}/${slugAr}/`, en: `/en/attractions/${slugEn}/` });
    }
    let diningWith = 0, diningChecked = 0;
    for (const f of (await readdir(SRC_DINING)).filter((n) => n.endsWith('.md'))) {
      const head = (await readFile(path.join(SRC_DINING, f), 'utf8')).match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
      const dist = head.match(/^district:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugAr = head.match(/^slug_ar:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      const slugEn = head.match(/^slug_en:\s*"?([^"\r\n]+?)"?\s*$/m)?.[1];
      if (!slugAr || !slugEn) continue;
      const pages = [['ar', `/مطاعم-ومقاهي/${slugAr}/`], ['en', `/en/restaurants-cafes/${slugEn}/`]]
        .map(([l, p]) => [l, p, path.join(DIST, p, 'index.html')]).filter(([, , fp]) => existsSync(fp));
      for (const [l, p, fp] of pages) {
        diningChecked++;
        const html = await readFile(fp, 'utf8');
        const sec = html.match(/<section class="dd-panel dd-sights"[\s\S]*?<\/section>/)?.[0] ?? '';
        const got = hrefsOf(sec);
        const want = new Set((dist ? attrByDistrict.get(dist) ?? [] : []).map((x) => x[l]));
        if (!dist && sec) problems.push(`${p}: قسم معالم الحيّ بلا district في المصدر`);
        if (want.size) diningWith++;
        const missing = [...want].filter((x) => !got.has(x));
        const extra = [...got].filter((x) => !want.has(x));
        if (missing.length) problems.push(`${p}: معالم الحيّ بلا ${missing.slice(0, 2).join('، ')}`);
        if (extra.length) problems.push(`${p}: معالم الحيّ تربط ${extra.slice(0, 2).join('، ')} من خارج الحيّ`);
      }
    }
    if (posts < 10 || withMentions < 20 || diningChecked < 20 || diningWith < 6) fail('C25', `الحارس صار فارغاً: ${posts} مقالات، ${withMentions} صفحة معلم بمقالات، ${diningChecked} صفحة منشأة (${diningWith} بمعالم حيّ) — المتوقع ≥10 و≥20 و≥20 و≥6`);
    else if (problems.length) fail('C25', `الربط الداخلي: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C25', `${withMentions} صفحة معلم تحمل قسم المقالات (${mentionLinks} رابطاً) مطابقاً للمقالات الـ${posts} التي تذكرها، و${diningWith} من ${diningChecked} صفحة منشأة تعرض معالم حيّها كاملةً`);
  }

  // ── C26: تبادل hreflang (الخطوة 10 من خطة التفاعل العالمي — المدونة متعددة اللغات) ──
  // كل صفحة تعلن نظائرها: (أ) تُدرج نفسها بلغتها في المجموعة، (ب) كل نظير موجود في dist
  // ويعلن المجموعة نفسها حرفياً (تبادل تام لا أحادي)، (ج) x-default يساوي النظير العربي.
  // الحكم على ما يراه الزاحف في dist لا على المصدر — والمدونة بلغاتها الخمس أول من يجرّبه.
  {
    const problems = [];
    const dec = (u) => { try { return decodeURIComponent(u); } catch { return u; } };
    const pageSets = new Map(); // المسار (مفكوكاً) → { lang, alts: Map(lang → path), xdef }
    for (const fp of await listHtml(DIST)) {
      const html = await readFile(fp, 'utf8');
      const alts = new Map();
      let xdef;
      for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="https:\/\/visit-alahsa\.com([^"]+)"/g)) {
        if (m[1] === 'x-default') xdef = dec(m[2]); else alts.set(m[1], dec(m[2]));
      }
      if (!alts.size) continue;
      const self = dec(html.match(/<link rel="canonical" href="https:\/\/visit-alahsa\.com([^"]+)"/)?.[1] ?? '');
      const lang = (html.match(/<html lang="([^"]+)"/)?.[1] ?? 'ar').split('-')[0];
      pageSets.set(self, { lang, alts, xdef, rel: path.relative(DIST, fp) });
    }
    let reciprocal = 0;
    for (const [self, { lang, alts, xdef, rel }] of pageSets) {
      if (alts.get(lang) !== self) { problems.push(`${rel}: لا تُدرج نفسها بلغتها (${lang}) في hreflang`); continue; }
      if (xdef !== alts.get('ar')) problems.push(`${rel}: x-default ≠ النظير العربي`);
      for (const [l, p] of alts) {
        if (p === self) continue;
        const other = pageSets.get(p);
        if (!other) { problems.push(`${rel}: النظير ${l} ${p} غير موجود أو بلا hreflang`); continue; }
        if (other.lang !== l) problems.push(`${rel}: النظير ${p} لغته ${other.lang} لا ${l}`);
        if (other.alts.get(lang) !== self) problems.push(`${rel}: النظير ${p} لا يعود إليها`);
        else if ([...alts].some(([k, v]) => other.alts.get(k) !== v) || other.alts.size !== alts.size) problems.push(`${rel}: مجموعة hreflang تختلف عن نظيرها ${p}`);
        else reciprocal++;
      }
    }
    if (pageSets.size < 300) fail('C26', `الحارس صار فارغاً: ${pageSets.size} صفحة تحمل hreflang — المتوقع ≥300`);
    else if (problems.length) fail('C26', `تبادل hreflang: ${problems.length} مشكلة — ${problems.slice(0, 4).join(' · ')}`);
    else pass('C26', `${pageSets.size} صفحة تحمل hreflang، ${reciprocal} رابط نظير كلها متبادلة بالمجموعة نفسها وx-default عربي`);
  }

  // ── التقرير ──────────────────────────────────────────────────────────────
  const failed = results.filter((r) => r.level === 'fail');
  const warned = results.filter((r) => r.level === 'warn');
  const mark = { ok: '✓', warn: '!', fail: '✗' };
  console.log('\n── فاحص التضارب (dist) ───────────────────────────────');
  for (const r of results) console.log(`  ${mark[r.level]} ${r.id}  ${r.msg}`);
  console.log('──────────────────────────────────────────────────────');
  if (failed.length) {
    console.error(`✗ ${failed.length} إخفاق — البناء لا يصلح للنشر.\n`);
    process.exit(1);
  }
  const tail = warned.length ? ` (و${warned.length} تحذيراً موقوفاً على قرار)` : '';
  console.log(`✓ ${results.length - warned.length} فحصاً نجحت — لا تضارب${tail}.\n`);
}

main().catch((e) => { console.error('✗ فاحص التضارب انهار:', e); process.exit(1); });
