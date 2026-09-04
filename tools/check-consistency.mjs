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
];

// أسماء أدلة صفحات المعالم في dist (المسارات العربية تُرمَّز بـpercent-encoding)
const AR_ATTRACTIONS_DIR = decodeURIComponent('%D9%85%D8%B9%D8%A7%D9%84%D9%85');

// تقشير الوسوم حتى الاستقرار: تمريرة واحدة تُبقي «<script» إن كان الوسم متداخلاً
// (‏<<script>>)، وCodeQL يعدّها js/incomplete-multi-character-sanitization ويُفشل الفحص.
// المدخل هنا dist المبني لا مدخل زائر، لكن الشكل الثابت يُغلق التنبيه بلا استثناء.
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
    if (deLies.length) fail('C14', `قيمة موسمية تحت «Beste Tageszeit» — التسمية صارت كاذبة، حوّلها إلى «Beste Besuchszeit» في ui.de: ${deLies.slice(0, 3).join(' · ')}`);
    else pass('C14', 'تسمية «Beste Tageszeit» الألمانية تطابق قيمها (صفر قيمة موسمية)');
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
    ];
    const OK_CLAIM = /أكبر واحة[ٍ]? (?:في العالم|على وجه الأرض)|largest oasis (?:on earth|in the world)|最大的绿洲|größten Oase der Welt/;
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
