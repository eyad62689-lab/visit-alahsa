// تحقق مستقل لصفحة دليل المتاجر الإلكترونية على dist (لا على المصدر).
//
// يقارن HTML الناتج بملف البيانات: عدد البطاقات وأعدادها بالأقسام، ترتيب الشراع،
// تطابق كل رابط «زيارة» مع url في JSON، غياب الحقول الداخلية وصفوف الملحق والعبارات
// الممنوعة (داخل <main> — التذييل المشترك يصف الموقع نفسه بأنه «ليست جهة حكومية»)،
// noindex، h1 واحد، وFAQ JSON-LD مطابقة للنص الظاهر.
// الوسوم تحمل سمات data-astro-cid-* فكل مطابقة تسمح بسمات بعد الصنف.
// التشغيل: node tools/verify-stores-page.mjs [dist/متاجر-الأحساء-الإلكترونية/index.html]

import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGE = process.argv[2] || join(ROOT, 'dist', 'متاجر-الأحساء-الإلكترونية', 'index.html');

const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const decode = (s) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const stripTags = (s) => s.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ');

export function verify(html, data) {
  const fails = [];
  const ok = (cond, msg) => { if (!cond) fails.push(msg); };
  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? '';
  const mainText = stripTags(main);
  ok(main.length > 0, 'لا <main> في الصفحة');

  const cards = [...html.matchAll(/<article class="[^"]*store-card[^"]*"[^>]*data-section="([^"]+)"[\s\S]*?<\/article>/g)];
  const stores = [...data.stores].sort((a, b) => a.order - b.order);
  ok(cards.length === stores.length, `عدد البطاقات ${cards.length} ≠ ${stores.length}`);
  const expectedCounts = data.meta.counts;
  for (const sec of ['dates', 'crafts', 'other']) {
    const n = cards.filter((c) => c[1] === sec).length;
    ok(n === expectedCounts[sec], `قسم ${sec}: ${n} ≠ ${expectedCounts[sec]}`);
  }
  // الأعداد في شريط التصفية
  const chipN = {};
  for (const m of html.matchAll(/<button class="chip[^"]*"[^>]*data-section="([^"]+)"[^>]*>[\s\S]*?<span class="chip-n"[^>]*>(\d+)<\/span>/g)) chipN[m[1]] = Number(m[2]);
  ok(chipN.all === stores.length, `عدّاد «الكل» ${chipN.all} ≠ ${stores.length}`);
  for (const sec of ['dates', 'crafts', 'other']) ok(chipN[sec] === expectedCounts[sec], `عدّاد ${sec} في الشريط ${chipN[sec]} ≠ ${expectedCounts[sec]}`);

  // ترتيب الشراع وروابط الزيارة (ترتيب الظهور في HTML = ترتيب order)
  const hrefs = cards.map((c) => decode(/store-cta"[^>]*href="([^"]+)"/.exec(c[0])?.[1] ?? ''));
  const names = cards.map((c) => decode(/<h3 class="store-t"[^>]*>([^<]+)<\/h3>/.exec(c[0])?.[1] ?? '').trim());
  ok(names[0] === 'الشراع للتمور', `أول بطاقة «${names[0]}» لا الشراع للتمور`);
  ok(cards[0]?.[1] === 'dates', 'أول بطاقة ليست في قسم التمور');
  stores.forEach((s, i) => {
    ok(names[i] === s.name, `البطاقة ${i + 1}: الاسم «${names[i]}» ≠ «${s.name}»`);
    ok(hrefs[i] === s.url, `البطاقة ${i + 1} (${s.name}): الرابط ${hrefs[i]} ≠ ${s.url}`);
  });
  const bonIdx = stores.findIndex((s) => s.name === 'محمصة بُن');
  ok(bonIdx >= 0 && hrefs[bonIdx] === 'https://roasterybon.com/ar', 'رابط محمصة بُن ليس roasterybon.com/ar');
  const ctas = [...html.matchAll(/<a class="btn btn--turq store-cta"[^>]*>/g)].map((m) => m[0]);
  ok(ctas.length === stores.length && ctas.every((a) => a.includes('target="_blank"') && a.includes('rel="noopener noreferrer nofollow"')), 'زر زيارة بلا target/rel مكتملين');
  cards.forEach((c, i) => {
    const s = stores[i]; if (!s) return;
    const ig = s.platform.includes('إنستجرام');
    const label = (/store-cta"[^>]*>\s*([^<]+?)\s*<\/a>/.exec(c[0])?.[1] ?? '').trim();
    ok(label === (ig ? 'زيارة الحساب' : 'زيارة المتجر'), `البطاقة ${i + 1}: نص الزر «${label}»`);
    ok(c[0].includes('الطلب مباشرة من الحرفي عبر الحساب') === ig, `البطاقة ${i + 1}: سطر الطلب المباشر ${ig ? 'غائب' : 'حاضر خطأً'}`);
    ok(decode(c[0]).includes(s.description), `البطاقة ${i + 1}: الوصف ليس كاملاً`);
    ok(decode(c[0]).includes(`alt="واجهة متجر ${s.name}"`), `البطاقة ${i + 1}: alt اللقطة`);
    ok(decode(c[0]).includes(`alt="شعار ${s.name}"`), `البطاقة ${i + 1}: alt الشعار`);
    ok(c[0].includes('loading="lazy"') && /<img class="store-logo"[^>]*width="\d+"[^>]*height="\d+"/.test(c[0]), `البطاقة ${i + 1}: lazy/width/height`);
    ok(decode(c[0]).includes(s.platform), `البطاقة ${i + 1}: شارة المنصة`);
  });

  // لا تسريب للحقول الداخلية ولا للملحق ولا للعبارات الممنوعة
  for (const bad of ['evidence_internal', 'docx_row', 'confirmed_by_owner', '"flags"', 'تمور الجبر', 'واحة النخيل', 'تمور ايتان', 'سوافلي', 'الحادي للعود', 'معتمدة رسمياً', 'جهة حكومية', 'بضمان الجودة']) {
    ok(!main.includes(bad), `النص الممنوع «${bad}» موجود`);
  }
  for (const s of data.stores) ok(!html.includes(s.evidence_internal), `تسرّب evidence_internal لـ${s.name}`);
  ok(!/(^|[^\d])84([^\d]|$)/.test(mainText), 'العدد 84 يظهر في النص');

  // SEO
  ok(html.includes('<meta name="robots" content="noindex, nofollow">'), 'noindex غائب');
  ok((html.match(/<h1[\s>]/g) || []).length === 1, 'h1 ليس واحداً');
  ok(new RegExp(`<h1 class="pgh-title"[^>]*>${esc(data.seo.h1)}</h1>`).test(html), 'h1 لا يطابق seo.h1');
  ok(!html.includes('hreflang='), 'hreflang موجود على صفحة noindex');
  const title = /<title>([^<]+)<\/title>/.exec(html)?.[1] ?? '';
  ok(title.startsWith(data.seo.title_tag), `العنوان «${title}»`);
  ok(decode(html).includes(`content="${data.seo.meta_description}"`), 'meta description لا تطابق');
  ok(mainText.includes(`${data.stores.length} متجراً إلكترونياً`), 'السطر التعريفي بلا العدد المحسوب');
  // تسلسل العناوين: h2 للأقسام الثلاثة والأسئلة، ولا h4+ ولا h3 خارج البطاقات
  ok((main.match(/<h2[\s>]/g) || []).length === data.sections.length + 1, 'عدد h2 لا يساوي الأقسام + الأسئلة');
  ok((main.match(/<h3[\s>]/g) || []).length === stores.length, 'عدد h3 لا يساوي البطاقات');
  ok(!/<h[4-6][\s>]/.test(main), 'عنوان من مستوى 4 فأدنى');

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const faq = blocks.find((b) => b['@type'] === 'FAQPage');
  const list = blocks.find((b) => b['@type'] === 'ItemList');
  ok(faq && faq.mainEntity.length === data.faq.length, 'FAQPage ناقصة');
  if (faq) data.faq.forEach((f, i) => {
    ok(faq.mainEntity[i].name === f.q && faq.mainEntity[i].acceptedAnswer.text === f.a, `FAQ ${i + 1} لا يطابق JSON`);
    ok(new RegExp(`<summary[^>]*>${esc(f.q)}</summary>\\s*<p[^>]*>${esc(f.a)}</p>`).test(decode(main)), `FAQ ${i + 1} لا يظهر حرفياً في الصفحة`);
  });
  ok(list && list.itemListElement.length === stores.length && list.itemListElement.every((e, i) => e.position === i + 1 && e.name === stores[i].name && e.url === stores[i].url), 'ItemList لا تطابق الترتيب/الروابط');
  return fails;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const data = JSON.parse(await readFile(join(ROOT, 'src', 'data', 'stores-directory.ar.json'), 'utf8'));
  const html = await readFile(PAGE, 'utf8');
  const fails = verify(html, data);
  if (fails.length) { console.log('فشل التحقق:'); for (const f of fails) console.log('  ✗ ' + f); process.exit(1); }
  console.log(`✓ صفحة المتاجر: ${data.stores.length} بطاقة، الروابط مطابقة، noindex، FAQ وItemList سليمتان.`);
}
