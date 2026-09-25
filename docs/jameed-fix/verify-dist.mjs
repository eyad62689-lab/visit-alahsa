// تحقّق على المنشور (dist) من البنود الثلاثة، ومعه اختبار كسرٍ متعمَّد على نسخةٍ في الذاكرة.
// لا يمسّ dist ولا المصدر. يُخفق بـexit 1.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const R = process.argv[2] || '.';
const D = R + '/dist';
let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log('  ✓ ' + m); };
const no = (m) => { fail++; console.error('  ✗ ' + m); };
const read = (p) => (existsSync(D + '/' + p) ? readFileSync(D + '/' + p, 'utf8') : null);
const walk = (d, out = []) => {
  if (!existsSync(d)) return out;
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, out) : /index\.html$/.test(p) && out.push(p);
  }
  return out;
};
const all = walk(D);
const slug = (base, lg) => {
  const m = readFileSync(`${R}/src/content/blog/${base}-${lg}.md`, 'utf8').match(/^slug:\s*"([^"]+)"/m);
  if (!m) throw new Error('لا slug في ' + base + '-' + lg);
  return lg === 'ar' ? `مدونة/${m[1]}/index.html` : `${lg}/blog/${m[1]}/index.html`;
};

/* ============ المقاييس المحضة (تُستدعى على نصّ يُمرَّر) ============ */
const NOTE = [/المواعيد والرسوم قابلة للتغيير/, /Times and fees can change/, /开放时间与费用可能变动/,
  /Öffnungszeiten und Eintritt können sich ändern/, /Часы работы и стоимость входа могут меняться/];

// روابط صفحة سوق الحميدية — لا الصور ولا og:image
// روابط dist العربية مرمَّزة بالنسب المئوية — تُفكَّك قبل المطابقة، وإلا كان الحارس فارغاً
const dec = (h) => { try { return decodeURIComponent(h); } catch { return h; } };
const souqLinks = (s) => [...s.matchAll(/href="([^"]+)"/g)]
  .map((m) => dec(m[1]))
  .filter((h) => !/\/img\//.test(h))
  .filter((h) => /hamidiyah-souq|سوق-الحميدية/.test(h));

// جيران القائمة بلغة الصفحة
const NEIGHBOURS = {
  ar: ['سوق-القيصرية', 'سوق-الحرفيين', 'دوقة-الغراش'],
  en: ['qaisariyah', 'craftsmen-souq', 'duqat-algharash'],
};
const neighboursKept = (s, lg) => {
  const hrefs = [...s.matchAll(/href="([^"]+)"/g)].map((m) => dec(m[1])).join(' ');
  return NEIGHBOURS[lg === 'ar' ? 'ar' : 'en'].filter((k) => hrefs.includes(k)).length;
};

const WRONG = {
  ar: /«الجميد»\s*أو\s*اللومي المشمّس|هو اللومي المشمّس/,
  en: /,\s*or sun-dried lime[)\s—]|It is the sun-dried lime|the Sun-Dried Lime</,
};
const RIGHT = { ar: /عصير اللومي المشمّس/, en: /lime juice sun-dried|sun-dried lime juice/i };

/* ============ الفحص ============ */
console.log('\n[٣] تحفّظ «المواعيد والرسوم» — يغيب عن المقالات ويبقى في الخطة');
const blogPages = all.filter((p) => /[\\/](مدونة|blog)[\\/][^\\/]+[\\/]index\.html$/.test(p));
const planPages = all.filter((p) => /[\\/](رحلتي|plan)[\\/]index\.html$/.test(p));
blogPages.length >= 40 ? ok(`صفحات مقالات مفحوصة: ${blogPages.length}`) : no(`صفحات مقالات = ${blogPages.length}`);
const blogHit = blogPages.filter((p) => NOTE.some((r) => r.test(readFileSync(p, 'utf8'))));
blogHit.length === 0 ? ok('صفر مقالٍ يحمل التحفّظ') : no(`${blogHit.length} مقالاً يحمله`);
const planHit = planPages.filter((p) => NOTE.some((r) => r.test(readFileSync(p, 'utf8'))));
planPages.length === 5 && planHit.length === 5
  ? ok('التحفّظ باقٍ في صفحات الخطة الخمس (موضعه الصحيح)')
  : no(`خطة = ${planPages.length}، حاملة = ${planHit.length}`);

console.log('\n[٢] سوق الحميدية في «أين تشتري»');
const souvSrc = {};
for (const lg of ['ar', 'en', 'de', 'zh', 'ru']) {
  const p = slug('souvenirs', lg);
  const s = read(p);
  if (!s) { no(`${lg}: ${p} غير موجودة`); continue; }
  souvSrc[lg] = s;
  const links = souqLinks(s);
  links.length === 0 ? ok(`${lg}: صفر رابطٍ لصفحة سوق الحميدية`) : no(`${lg}: ${links.length} رابطاً: ${links.join(' ')}`);
  const kept = neighboursKept(s, lg);
  kept === 3 ? ok(`${lg}: الأسواق الثلاثة الباقية موجودة`) : no(`${lg}: الباقي = ${kept}/3 — حُذف أكثر من اللازم`);
}

console.log('\n[١] تعريف الجميد (ar/en في هذه الدفعة)');
const lomiSrc = {};
for (const [label, lg, p] of [
  ['ar · مقال اللومي', 'ar', slug('hasawi-lomi', 'ar')],
  ['en · مقال اللومي', 'en', slug('hasawi-lomi', 'en')],
  ['ar · ثمار الواحة', 'ar', 'ثمار/index.html'],
  ['en · ثمار الواحة', 'en', 'en/fruits/index.html'],
  ['ar · معرض اللومي', 'ar', 'فعاليات/معرض-اللومي-الحساوي/index.html'],
]) {
  const s = read(p);
  if (!s) { no(`${label}: ${p} غير موجودة`); continue; }
  if (label.includes('مقال اللومي')) lomiSrc[lg] = s;
  WRONG[lg].test(s) ? no(`${label}: التعريف الخاطئ (الثمرة) ما يزال منشوراً`) : ok(`${label}: الخاطئ غائب`);
  RIGHT[lg].test(s) ? ok(`${label}: الصحيح (العصير) منشور`) : no(`${label}: الصحيح غير منشور — حارسٌ فارغ`);
}
for (const lg of ['ar', 'en']) {
  const s = lomiSrc[lg]; if (!s) continue;
  const ld = [...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
  if (!/FAQPage/.test(ld)) { no(`${lg}: لا FAQPage`); continue; }
  WRONG[lg].test(ld) ? no(`${lg}: FAQPage يحمل التعريف الخاطئ (يظهر في قوقل)`) : ok(`${lg}: FAQPage نظيف`);
  RIGHT[lg].test(ld) ? ok(`${lg}: FAQPage يحمل الصحيح`) : no(`${lg}: FAQPage بلا التعريف الصحيح`);
}

console.log('\n[حارس سلبي] مقال تاريخ اللومي لم يُمسّ في اللغات الخمس');
for (const lg of ['ar', 'en', 'de', 'zh', 'ru']) {
  const s = read(slug('hasawi-lomi-history', lg));
  if (!s) { no(`${lg}: صفحة التاريخ غير موجودة`); continue; }
  const j = { ar: /عصير اللومي المشمّس والمعتّق في أوعية زجاجية/, en: /lomi juice sun-dried and aged in glass jars/,
    de: /Lomi-Saft trocknet in der Sonne/, zh: /青柠汁经日晒/, ru: /лаймовом соке, высушенном на солнце/ }[lg];
  j.test(s) ? ok(`${lg}: التعريف المُسنَد باقٍ`) : no(`${lg}: التعريف المُسنَد فُقد`);
}

/* ============ اختبار كسرٍ متعمَّد — على نسخٍ في الذاكرة ============ */
console.log('\n[كسر متعمَّد] كل مقياس يجب أن يُخفق على نصٍّ مكسور');
let bpass = 0, bfail = 0;
const must = (cond, m) => { cond ? (bpass++, console.log('  ✓ أمسكه: ' + m)) : (bfail++, console.error('  ✗ فوّته: ' + m)); };

// ٣: أعِد التحفّظ إلى مقال
must(NOTE.some((r) => r.test(lomiSrc.ar + '<p>المواعيد والرسوم قابلة للتغيير — تأكد.</p>')), 'تحفّظ عربي معاد');
must(NOTE.some((r) => r.test('<p>Times and fees can change — confirm.</p>')), 'تحفّظ إنجليزي معاد');
// ٣ عكسياً: إزالته من الخطة يجب أن تُرصد
must(!NOTE.some((r) => r.test(read('رحلتي/index.html').replace(/المواعيد والرسوم قابلة للتغيير/g, 'X'))), 'غيابه عن الخطة');

// ٢: أعِد رابط سوق الحميدية بلغاته — والصورة وحدها لا تُعدّ
for (const [lg, href] of [['ar', '/معالم/سوق-الحميدية/'], ['en', '/en/attractions/hamidiyah-souq/'],
  ['de', '/de/attractions/hamidiyah-souq/'], ['zh', '/zh/attractions/hamidiyah-souq/'], ['ru', '/ru/attractions/hamidiyah-souq/']]) {
  must(souqLinks(souvSrc[lg] + `<a href="${href}">x</a>`).length === 1, `رابط ${lg} معاد`);
}
must(souqLinks('<link rel="preload" as="image" href="/img/hamidiyah-souq.webp">').length === 0, 'صورة الغلاف لا تُعدّ رابطاً');
// ٢ عكسياً: حذفُ جارٍ يجب أن يُرصد
// الكسر على الصورة المرمّزة لا المفكوكة — فهي ما يحمله dist فعلاً
must(neighboursKept(souvSrc.ar.split(encodeURIComponent('سوق-القيصرية')).join('X'), 'ar') === 2, 'حذف جارٍ عربي (مرمّز)');
must(neighboursKept(souvSrc.en.replace(/craftsmen-souq/g, 'X'), 'en') === 2, 'حذف جارٍ إنجليزي');

// ١: أعِد التعريف الخاطئ بصيغه الأربع
must(WRONG.ar.test('هو اللومي المشمّس: عادة أحسائية'), 'ar جواب FAQ الخاطئ');
must(WRONG.ar.test('يُعرف بـ«الجميد» أو اللومي المشمّس —'), 'ar متن خاطئ');
must(WRONG.en.test('It is the sun-dried lime: a cherished'), 'en جواب FAQ الخاطئ');
must(WRONG.en.test('**"jameed"**, or sun-dried lime — laying'), 'en متن خاطئ');
must(WRONG.en.test('<h2 id="x">Jameed, the Sun-Dried Lime</h2>'), 'en عنوان H2 خاطئ');
// ١ عكسياً: إزالة التعريف الصحيح يجب أن تُرصد (لا حارس فارغ)
must(!RIGHT.ar.test(lomiSrc.ar.replace(/عصير اللومي المشمّس/g, 'X')), 'ar غياب الصحيح');
must(!RIGHT.en.test(lomiSrc.en.replace(/lime juice sun-dried/gi, 'X').replace(/sun-dried lime juice/gi, 'X')), 'en غياب الصحيح');
// ١ ضبطٌ سالب: الصيغة الصحيحة لا تُقرأ خطأً
must(!WRONG.ar.test('«الجميد»: عصير اللومي المشمّس المعتّق في أوعية زجاجية'), 'الصيغة العربية الصحيحة لا تُوسم خطأً');
must(!WRONG.en.test('**"jameed"**: lime juice sun-dried and aged in glass jars — laying'), 'الصيغة الإنجليزية الصحيحة لا تُوسم خطأً');

console.log(`  ← أمسك ${bpass} · فوّت ${bfail}`);
if (bfail) fail += bfail;

console.log(`\n${fail ? '✗' : '✓'} نجح ${pass} · أخفق ${fail}`);
process.exit(fail ? 1 : 0);
