// تحقق مستقل لصفحات دليل المتاجر الإلكترونية على dist (لا على المصدر) — بكل لغاتها.
//
// لكل لغة لها ملف src/data/stores-directory.<lang>.json (والعربية من المصدر): يقارن HTML
// الناتج بالبيانات: عدد البطاقات وأعدادها بالأقسام، ترتيب الشراع، تطابق كل رابط «زيارة»
// مع url في المصدر العربي، الأسماء والأوصاف والمنصات بلغة الصفحة، نصوص الأزرار من ui.ts،
// غياب الحقول الداخلية وصفوف الملحق والعبارات الممنوعة (داخل <main>)، الفهرسة وhreflang (أُعلنت 2026-10-09)، h1 واحد،
// تسلسل العناوين، وFAQ JSON-LD مطابقة للنص الظاهر. الوسوم تحمل data-astro-cid-* فكل
// مطابقة تسمح بسمات بعد الصنف.
// التشغيل: node tools/verify-stores-page.mjs            (كل اللغات المبنية)
//          node tools/verify-stores-page.mjs <lang>     (لغة واحدة)

import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PATHS = { ar: 'متاجر-الأحساء-الإلكترونية', en: 'en/online-stores', zh: 'zh/online-stores', de: 'de/online-stores', ru: 'ru/online-stores' };

const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// فكّ الكيانات في مرور واحد (لا سلسلة replace: تفكّ &amp;lt; مرتين — js/double-escaping)
const ENT = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' };
const decode = (s) => s.replace(/&(?:amp|quot|#39|lt|gt);/g, (m) => ENT[m]);
// نصّ المقطع بماسح محرفاً محرفاً لا بتعبير نمطي على الوسوم: يحترم الاقتباس داخل السمات،
// ويتخطّى script/style بمحتواهما إلى وسم إغلاقهما بالاسم (js/incomplete-multi-character-sanitization)
const tagEnd = (h, from) => {
  let q = '';
  let i = from;
  while (i < h.length) {
    const c = h[i];
    if (q) { if (c === q) q = ''; } else if (c === '"' || c === "'") q = c; else if (c === '>') return i;
    i++;
  }
  return h.length;
};
const SKIP_TAGS = [['<script', '</script>'], ['<style', '</style>']];
const stripTags = (h) => {
  const lower = h.toLowerCase();
  let out = '';
  let i = 0;
  while (i < h.length) {
    if (h[i] !== '<') { out += h[i]; i++; continue; }
    const skip = SKIP_TAGS.find(([open]) => lower.startsWith(open, i));
    out += ' ';
    if (skip) {
      const close = lower.indexOf(skip[1], i);
      i = close < 0 ? h.length : close + skip[1].length;
    } else {
      i = tagEnd(h, i + 1) + 1;
    }
  }
  return out;
};
const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

/** مفاتيح stores.* من كتلة لغة في ui.ts */
function uiStrings(uiSrc, lang) {
  // بحث نصّي لا تعبير نمطي مبني من المدخل (js/regex-injection)؛ اللغة من قائمة PATHS المغلقة
  if (!Object.hasOwn(PATHS, lang)) throw new Error(`لغة غير معروفة: ${lang}`);
  const start = uiSrc.indexOf(`\n  ${lang}: {`) + 1;
  if (start < 1) throw new Error(`لا كتلة ${lang} في ui.ts`);
  // نهاية الكتلة = بداية كتلة اللغة التالية أو خاتمة الكائن (كتل zh/de/ru تُغلق بـ"} as Record<...>,")
  const next = /\r?\n(?:  [a-z]{2}: \{|\} as const)/g;
  next.lastIndex = start + 4;
  const end = next.exec(uiSrc)?.index ?? uiSrc.length;
  const block = uiSrc.slice(start, end);
  const out = {};
  for (const m of block.matchAll(/^\s*'stores\.(\w+)':\s*'((?:[^'\\]|\\.)*)',/gm)) out[m[1]] = m[2].replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  return out;
}

/** توقّعات صفحة بلغة: المصدر العربي + وحدة اللغة + نصوص الواجهة */
export function expectations(master, unit, ui, lang) {
  const sorted = [...master.stores].sort((a, b) => a.order - b.order);
  const byId = unit ? new Map(unit.stores.map((s) => [s.id, s])) : null;
  const stores = sorted.map((s) => {
    const tr = byId?.get(s.id);
    return { id: s.id, order: s.order, section: s.section, url: s.url, instagram: /^https?:\/\/(www\.)?instagram\.com\//i.test(s.url),
      name: tr?.name ?? s.name, platform: tr?.platform ?? s.platform, description: tr?.description ?? s.description, evidence_internal: s.evidence_internal };
  });
  return {
    lang, stores, counts: master.meta.counts,
    seo: unit?.seo ?? master.seo, sections: unit?.sections ?? master.sections, faq: unit?.faq ?? master.faq,
    ui,
    forbidden: ['evidence_internal', 'docx_row', 'confirmed_by_owner', '"flags"', 'تمور الجبر', 'واحة النخيل', 'تمور ايتان', 'سوافلي', 'الحادي للعود',
      'معتمدة رسمياً', 'جهة حكومية', 'بضمان الجودة', 'officially accredited', 'government body', 'quality guaranteed'],
    sheraaFirst: stores[0].name,
  };
}

export function verify(html, X) {
  const fails = [];
  const ok = (cond, msg) => { if (!cond) fails.push(msg); };
  // قصّ <main> بالفهرسة لا بتعبير نمطي كسول عبر الصفحة كلها (تراجع فائق)
  const mainStart = html.indexOf('<main');
  const mainEnd = mainStart < 0 ? -1 : html.indexOf('</main>', mainStart);
  const main = mainStart < 0 || mainEnd < 0 ? '' : html.slice(mainStart, mainEnd + '</main>'.length);
  const mainText = stripTags(main);
  const dMain = decode(main);
  ok(main.length > 0, 'لا <main> في الصفحة');
  ok(html.includes(`<html lang="${X.lang === 'zh' ? 'zh-CN' : X.lang}" dir="${X.lang === 'ar' ? 'rtl' : 'ltr'}"`), 'lang/dir على <html>');

  const cards = [...html.matchAll(/<article class="[^"]*store-card[^"]*"[^>]*data-section="([^"]+)"[\s\S]*?<\/article>/g)];
  const stores = X.stores;
  ok(cards.length === stores.length, `عدد البطاقات ${cards.length} ≠ ${stores.length}`);
  for (const sec of ['dates', 'crafts', 'other']) {
    const n = cards.filter((c) => c[1] === sec).length;
    ok(n === X.counts[sec], `قسم ${sec}: ${n} ≠ ${X.counts[sec]}`);
  }
  const chipN = {};
  for (const m of html.matchAll(/<button class="chip[^"]*"[^>]*data-section="([^"]+)"[^>]*>[\s\S]*?<span class="chip-n"[^>]*>(\d+)<\/span>/g)) chipN[m[1]] = Number(m[2]);
  ok(chipN.all === stores.length, `عدّاد «الكل» ${chipN.all} ≠ ${stores.length}`);
  for (const sec of ['dates', 'crafts', 'other']) ok(chipN[sec] === X.counts[sec], `عدّاد ${sec} في الشريط ${chipN[sec]} ≠ ${X.counts[sec]}`);
  // عناوين الأقسام بلغة الصفحة
  for (const sec of X.sections) ok(new RegExp(`<h2 class="stores-sec-t"[^>]*id="h-${esc(sec.id)}"[^>]*>\\s*${esc(sec.title)}\\s*<span`).test(dMain), `عنوان قسم ${sec.id} «${sec.title}»`);

  const hrefs = cards.map((c) => decode(/store-cta"[^>]*href="([^"]+)"/.exec(c[0])?.[1] ?? ''));
  const names = cards.map((c) => decode(/<h3 class="store-t"[^>]*>([^<]+)<\/h3>/.exec(c[0])?.[1] ?? '').trim());
  ok(names[0] === X.sheraaFirst && stores[0].id === 'alsheraa', `أول بطاقة «${names[0]}» ليست الشراع للتمور`);
  ok(cards[0]?.[1] === 'dates', 'أول بطاقة ليست في قسم التمور');
  stores.forEach((s, i) => {
    ok(names[i] === s.name, `البطاقة ${i + 1}: الاسم «${names[i]}» ≠ «${s.name}»`);
    ok(hrefs[i] === s.url, `البطاقة ${i + 1} (${s.name}): الرابط ${hrefs[i]} ≠ ${s.url}`);
  });
  const bonIdx = stores.findIndex((s) => s.id === 'store-28');
  ok(bonIdx >= 0 && hrefs[bonIdx] === 'https://roasterybon.com/ar', 'رابط محمصة بُن ليس roasterybon.com/ar');
  const ctas = [...html.matchAll(/<a class="btn btn--turq store-cta"[^>]*>/g)].map((m) => m[0]);
  ok(ctas.length === stores.length && ctas.every((a) => a.includes('target="_blank"') && a.includes('rel="noopener noreferrer nofollow"')), 'زر زيارة بلا target/rel مكتملين');
  cards.forEach((c, i) => {
    const s = stores[i]; if (!s) return;
    const card = decode(c[0]);
    const ctaAt = card.indexOf('store-cta"');
    const ctaOpen = ctaAt < 0 ? -1 : card.indexOf('>', ctaAt);
    const ctaClose = ctaOpen < 0 ? -1 : card.indexOf('</a>', ctaOpen);
    const label = ctaOpen < 0 || ctaClose < 0 ? '' : card.slice(ctaOpen + 1, ctaClose).trim();
    ok(label === (s.instagram ? X.ui.visitAccount : X.ui.visit), `البطاقة ${i + 1}: نص الزر «${label}»`);
    ok(card.includes(X.ui.directOrder) === s.instagram, `البطاقة ${i + 1}: سطر الطلب المباشر ${s.instagram ? 'غائب' : 'حاضر خطأً'}`);
    ok(card.includes(s.description), `البطاقة ${i + 1}: الوصف ليس كاملاً`);
    ok(card.includes(`alt="${fill(X.ui.shotAlt, { name: s.name })}"`), `البطاقة ${i + 1}: alt اللقطة`);
    ok(card.includes(`alt="${fill(X.ui.logoAlt, { name: s.name })}"`), `البطاقة ${i + 1}: alt الشعار`);
    ok(card.includes('loading="lazy"') && /<img class="store-logo"[^>]*width="\d+"[^>]*height="\d+"/.test(card), `البطاقة ${i + 1}: lazy/width/height`);
    ok(card.includes(s.platform), `البطاقة ${i + 1}: شارة المنصة`);
  });

  for (const bad of X.forbidden) ok(!main.includes(bad), `النص الممنوع «${bad}» موجود`);
  for (const s of stores) ok(!html.includes(s.evidence_internal), `تسرّب evidence_internal لـ${s.id}`);
  ok(!/(^|[^\d])84([^\d]|$)/.test(mainText), 'العدد 84 يظهر في النص');
  ok(!/[٠-٩]/.test(mainText), 'أرقام عربية-هندية في النص');

  // معلَنة منذ 2026-10-09: لا noindex، وhreflang إلى كل لغة مبنية (ونفسها) — التبادل يحرسه C26
  ok(!/<meta name="robots" content="noindex/.test(html), 'noindex ما زال على الصفحة');
  ok((html.match(/<h1[\s>]/g) || []).length === 1, 'h1 ليس واحداً');
  ok(new RegExp(`<h1 class="pgh-title"[^>]*>${esc(X.seo.h1)}</h1>`).test(decode(html)), 'h1 لا يطابق seo.h1');
  // <link rel="alternate" hreflang> فقط — روابط مبدّل اللغة في الترويسة تحمل hreflang كسمة وهذا مقبول
  for (const l of X.langs ?? []) ok(new RegExp(`<link rel="alternate" hreflang="${l}" href="[^"]*/${esc(encodeURI(PATHS[l]))}/"`).test(html), `hreflang=${l} غائب`);
  const title = decode(/<title>([^<]+)<\/title>/.exec(html)?.[1] ?? '');
  ok(title.startsWith(X.seo.title_tag), `العنوان «${title}»`);
  ok(decode(html).includes(`content="${X.seo.meta_description}"`), 'meta description لا تطابق');
  ok(mainText.includes(fill(X.ui.lead, { n: stores.length }).slice(0, 40)), 'السطر التعريفي بلا العدد المحسوب');
  ok((main.match(/<h2[\s>]/g) || []).length === X.sections.length + 1, 'عدد h2 لا يساوي الأقسام + الأسئلة');
  ok((main.match(/<h3[\s>]/g) || []).length === stores.length, 'عدد h3 لا يساوي البطاقات');
  ok(!/<h[4-6][\s>]/.test(main), 'عنوان من مستوى 4 فأدنى');
  ok(dMain.includes(X.ui.disclaimer), 'فقرة التنويه غائبة');

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const faq = blocks.find((b) => b['@type'] === 'FAQPage');
  const list = blocks.find((b) => b['@type'] === 'ItemList');
  ok(faq && faq.mainEntity.length === X.faq.length, 'FAQPage ناقصة');
  if (faq) X.faq.forEach((f, i) => {
    ok(faq.mainEntity[i]?.name === f.q && faq.mainEntity[i]?.acceptedAnswer?.text === f.a, `FAQ ${i + 1} لا يطابق JSON`);
    ok(new RegExp(`<summary[^>]*>${esc(f.q)}</summary>\\s*<p[^>]*>${esc(f.a)}</p>`).test(dMain), `FAQ ${i + 1} لا يظهر حرفياً في الصفحة`);
  });
  ok(list && list.itemListElement.length === stores.length && list.itemListElement.every((e, i) => e.position === i + 1 && e.name === stores[i].name && e.url === stores[i].url), 'ItemList لا تطابق الترتيب/الروابط');
  return fails;
}

export async function loadExpectations(lang) {
  const master = JSON.parse(await readFile(join(ROOT, 'src/data/stores-directory.ar.json'), 'utf8'));
  const unit = lang === 'ar' ? null : JSON.parse(await readFile(join(ROOT, `src/data/stores-directory.${lang}.json`), 'utf8'));
  const ui = uiStrings(await readFile(join(ROOT, 'src/i18n/ui.ts'), 'utf8'), lang);
  return expectations(master, unit, ui, lang);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  const only = process.argv[2];
  const built = ['ar', ...(await readdir(join(ROOT, 'src/data'))).map((f) => /^stores-directory\.([a-z]{2})\.json$/.exec(f)?.[1]).filter((l) => l && l !== 'ar')];
  const langs = only ? [only] : built;
  let failed = 0;
  for (const lang of langs) {
    if (!Object.hasOwn(PATHS, lang)) { console.log(`✗ لغة غير معروفة: ${lang}`); failed++; continue; }
    const page = join(ROOT, 'dist', PATHS[lang], 'index.html');
    // قراءة مباشرة بلا access() قبلها (js/file-system-race): الغياب يُلتقط من الخطأ نفسه
    let html;
    try { html = await readFile(page, 'utf8'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; console.log(`✗ ${lang}: الصفحة غير مبنية (${PATHS[lang]})`); failed++; continue; }
    const X = { ...(await loadExpectations(lang)), langs: built };
    const fails = verify(html, X);
    if (fails.length) { failed++; console.log(`✗ ${lang}: ${fails.length} خلل`); for (const f of fails) console.log('    ' + f); }
    else console.log(`✓ ${lang}: ${X.stores.length} بطاقة، الروابط مطابقة، مفهرسة بـhreflang، FAQ وItemList سليمتان.`);
  }
  process.exit(failed ? 1 : 0);
}
