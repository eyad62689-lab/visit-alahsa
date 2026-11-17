// فحص الروابط الخارجية المنشورة — يزحف صفحات الموقع من sitemap.xml ويجرّب كل رابط خارجي فيها.
//
// tools/check-links.mjs يفحص الروابط الداخلية على dist في كل بناء. الروابط الخارجية (خرائط، مواقع
// رسمية، حجز، حسابات اجتماعية) تتعفّن بمرور الوقت لا بتغيير في المستودع، فلا يراها فحص طلب دمج؛
// هذا السكربت يُشغَّل أسبوعياً على الموقع المنشور.
//
// التصنيف:
//   ok          2xx بعد اتباع التحويلات.
//   broken      404 أو 410، أو اسم نطاق لا يُحَلّ. يُخفق السكربت (exit 1) إن وُجد منها شيء.
//   blocked     401/403/405/429 وما شابه: الخادم يرفض الزوّار الآليين — لا يُحكم على الرابط.
//   unstable    مهلة، خطأ شبكة، أو 5xx بعد إعادة المحاولة — يُبلَّغ ولا يُخفق (قد يكون عارضاً).
//   skipped     ليس http(s)، أو مضيفه عنوان رقمي أو محلي.
//
// لا يُطلب إلا GET بلا جسم مقروء، بمهلة، وبتزامن محدود لكل مضيف. لا تبعيات.
//
// الاستعمال:
//   node tools/automation/check-external-links.mjs [--json] [--save]
// --json يطبع النتيجة كاملة JSON بدل الملخص؛ --save يكتبها أيضاً في external-links-report.json
// بمجلد التشغيل (اسم ثابت). المنطق في دوال نقية مصدَّرة يُختبر كسرها في الذاكرة.
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const ORIGIN = 'https://visit-alahsa.com';
const REPORT_FILE = 'external-links-report.json';
const OWN_HOSTS = new Set(['visit-alahsa.com', 'www.visit-alahsa.com']);

const TIMEOUT_MS = 25_000;
const PAGE_CONCURRENCY = 8;
const LINK_CONCURRENCY = 6;
const PER_HOST_GAP_MS = 400;
const USER_AGENT = 'Mozilla/5.0 (compatible; link-check)';

const ENTITIES = new Map([
  ['&amp;', '&'], ['&#38;', '&'], ['&#x26;', '&'],
  ['&quot;', '"'], ['&#34;', '"'], ['&#x22;', '"'],
  ['&#39;', "'"], ['&#x27;', "'"], ['&apos;', "'"],
  ['&lt;', '<'], ['&gt;', '>'],
]);

/**
 * يفكّ كيانات HTML الشائعة في قيمة سمة — بمرور واحد على النص، فما ينتج عن فكّ كيان
 * لا يُفكّ مرة ثانية («&amp;quot;» تصير «&quot;» لا علامة تنصيص).
 */
function decodeAttr(s) {
  let out = '';
  let i = 0;
  for (;;) {
    const amp = s.indexOf('&', i);
    if (amp === -1) return out + s.slice(i);
    const semi = s.indexOf(';', amp);
    const entity = semi !== -1 && semi - amp <= 6 ? ENTITIES.get(s.slice(amp, semi + 1).toLowerCase()) : undefined;
    out += s.slice(i, amp) + (entity ?? '&');
    i = entity ? semi + 1 : amp + 1;
  }
}

/** قيم <loc> من نص sitemap — مسح خطي. */
export function sitemapLocs(xml) {
  const out = [];
  let from = 0;
  for (;;) {
    const open = xml.indexOf('<loc>', from);
    if (open === -1) break;
    const close = xml.indexOf('</loc>', open);
    if (close === -1) break;
    out.push(decodeAttr(xml.slice(open + 5, close).trim()));
    from = close + 6;
  }
  return out;
}

const isWs = (c) => c === ' ' || c === '\n' || c === '\t' || c === '\r' || c === '\f';

/** يقرأ سمة واحدة تبدأ عند i (ليس فراغاً ولا '>'): اسمها، قيمتها أو null، وموضع ما بعدها (> i دائماً). */
function readAttr(html, i) {
  let j = i;
  while (j < html.length && !isWs(html[j]) && html[j] !== '=' && html[j] !== '>') j++;
  const name = html.slice(i, j).toLowerCase();
  while (isWs(html[j])) j++;
  if (html[j] !== '=') return { name, value: null, next: Math.max(j, i + 1) };
  j++;
  while (isWs(html[j])) j++;
  const quote = html[j];
  if (quote === '"' || quote === "'") {
    const close = html.indexOf(quote, j + 1);
    const end = close === -1 ? html.length : close;
    return { name, value: html.slice(j + 1, end), next: end + 1 };
  }
  let k = j;
  while (k < html.length && !isWs(html[k]) && html[k] !== '>') k++;
  return { name, value: html.slice(j, k), next: k };
}

/** قيم سمة href في وسم <a> يبدأ ما بعد اسمه عند i؛ يعيد القيم وموضع نهاية الوسم. */
function anchorTagHrefs(html, i) {
  const hrefs = [];
  while (i < html.length && html[i] !== '>') {
    if (isWs(html[i])) { i++; continue; }
    const attr = readAttr(html, i);
    if (attr.name === 'href' && attr.value !== null) hrefs.push(decodeAttr(attr.value));
    i = attr.next;
  }
  return { hrefs, next: i };
}

/** موضع ما بعد أول «</script» من from، أو -1. */
function scriptEnd(html, from) {
  let i = from;
  for (;;) {
    const close = html.indexOf('</', i);
    if (close === -1) return -1;
    if (html.slice(close + 2, close + 8).toLowerCase() === 'script') return close + 8;
    i = close + 2;
  }
}

/**
 * قيم href من وسوم <a> في HTML — مسح خطي محرفاً محرفاً، بلا تعبير نمطي على الوسوم.
 * يقرأ السمات واحدة واحدة فلا تخدعه '>' داخل قيمة ولا data-href، ويتخطى محتوى <script>.
 * لا يُحوَّل النص كله إلى حروف صغيرة: التحويل يغيّر طول بعض المحارف (İ التركية) فتنزاح المواضع.
 */
export function anchorHrefs(html) {
  const out = [];
  let i = 0;
  for (;;) {
    const open = html.indexOf('<', i);
    if (open === -1) break;
    i = open + 1;
    if (html.slice(open + 1, open + 7).toLowerCase() === 'script') {
      const close = scriptEnd(html, open + 7);
      if (close === -1) break;
      i = close;
      continue;
    }
    const c = html[open + 1];
    if ((c !== 'a' && c !== 'A') || !isWs(html[open + 2])) continue;
    const tag = anchorTagHrefs(html, open + 3);
    out.push(...tag.hrefs);
    i = tag.next;
  }
  return out;
}

const isDigit = (c) => c >= '0' && c <= '9';

/** مضيف لا يُطلب: محلي، أو عنوان رقمي (IPv4 أرقام ونقاط، IPv6 فيه نقطتان رأسيتان)، أو بلا نقطة. */
export function hostIsOffLimits(hostname) {
  const h = hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal')) return true;
  if (h.includes(':') || h.startsWith('[')) return true;
  if (!h.includes('.')) return true;
  return [...h].every((c) => isDigit(c) || c === '.');
}

/**
 * رابط خارجي قابل للفحص من قيمة href وعنوان صفحتها، أو سبب تركه.
 * @returns {{ url: string } | { skip: string } | undefined} undefined = رابط داخلي أو ليس رابط تصفّح
 */
export function externalTarget(href, pageUrl) {
  const raw = href.trim();
  if (!raw || raw.startsWith('#')) return undefined;
  let url;
  try { url = new URL(raw, pageUrl); } catch { return { skip: 'رابط غير صالح' }; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
  if (OWN_HOSTS.has(url.hostname.toLowerCase())) return undefined;
  if (hostIsOffLimits(url.hostname)) return { skip: 'مضيف محلي أو رقمي' };
  url.hash = '';
  return { url: url.href };
}

/** تصنيف نتيجة طلب: حالة HTTP أو رمز خطأ شبكة. */
export function classify({ status, errorCode }) {
  if (errorCode === 'ENOTFOUND') return 'broken';
  if (errorCode) return 'unstable';
  if (status >= 200 && status < 300) return 'ok';
  if (status === 404 || status === 410) return 'broken';
  if (status >= 500 && status < 600) return 'unstable';
  return 'blocked';
}

/**
 * يجمع الروابط الخارجية من صفحات (عنوان + HTML): لكل رابط الصفحات التي تحمله (أول ثلاث).
 * @param {{ url: string, html: string }[]} pages
 */
export function collectTargets(pages) {
  const targets = new Map();
  const skipped = [];
  for (const page of pages) {
    for (const href of anchorHrefs(page.html)) {
      const t = externalTarget(href, page.url);
      if (!t) continue;
      if ('skip' in t) { skipped.push({ href, page: page.url, why: t.skip }); continue; }
      const entry = targets.get(t.url) ?? { url: t.url, pages: [], count: 0 };
      entry.count++;
      if (entry.pages.length < 3 && !entry.pages.includes(page.url)) entry.pages.push(page.url);
      targets.set(t.url, entry);
    }
  }
  return { targets: [...targets.values()].sort((a, b) => a.url.localeCompare(b.url)), skipped };
}

/** ملخص Markdown للنتيجة. */
export function summarize(result) {
  const by = (c) => result.links.filter((l) => l.class === c);
  const readable = (u) => { try { return decodeURI(u); } catch { return u; } };
  const row = (l) => `- ${l.url} — ${l.status || l.errorCode} — في ${l.count} موضعاً، منها ${readable(l.pages[0])}`;
  const lines = [
    `## الروابط الخارجية — ${result.pages} صفحة، ${result.links.length} رابطاً فريداً`,
    '',
    `- سليم: ${by('ok').length} · معطوب: ${by('broken').length} · يرفض الزوّار الآليين: ${by('blocked').length} · غير مستقر: ${by('unstable').length} · متروك: ${result.skipped.length}`,
  ];
  if (result.pageErrors.length) lines.push('', '### صفحات تعذّر جلبها', ...result.pageErrors.map((p) => `- ${readable(p.url)} — ${p.status || p.errorCode}`));
  if (by('broken').length) lines.push('', '### معطوبة', ...by('broken').map(row));
  if (by('unstable').length) lines.push('', '### غير مستقرة', ...by('unstable').map(row));
  return lines.join('\n') + '\n';
}

// ── الشبكة ──────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(url, { body = false } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: 'follow', headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*;q=0.8' } });
    const text = body ? await res.text() : '';
    if (!body) await res.body?.cancel().catch(() => {});
    return { status: res.status, text };
  } catch (e) {
    const code = e?.cause?.code ?? (e?.name === 'AbortError' ? 'TIMEOUT' : 'FETCH_FAILED');
    return { status: 0, text: '', errorCode: String(code) };
  } finally {
    clearTimeout(timer);
  }
}

/** يشغّل worker على العناصر بتزامن محدود ويحفظ الترتيب. */
async function pool(items, limit, worker) {
  const out = new Array(items.length);
  let next = 0;
  const run = async () => { for (;;) { const i = next++; if (i >= items.length) return; out[i] = await worker(items[i], i); } };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return out;
}

const RETRY = new Set(['unstable', 'broken']);

/** يجلب صفحة من الموقع بجسمها، مع إعادة واحدة إن لم تكن 200. */
async function fetchPage(url) {
  let res = await request(url, { body: true });
  if (res.status !== 200) { await sleep(3000); res = await request(url, { body: true }); }
  return { url, ...res };
}

/** فحص رابط واحد مع إعادة محاولة واحدة، وفاصل بين طلبات المضيف نفسه. */
function makeLinkChecker() {
  const hostQueue = new Map();
  return async (target) => {
    const host = new URL(target.url).hostname;
    const prev = hostQueue.get(host) ?? Promise.resolve();
    let release;
    hostQueue.set(host, new Promise((r) => { release = r; }));
    await prev;
    try {
      let res = await request(target.url);
      // إعادة واحدة لغير المستقر وللمعطوب معاً: 404 عارضة من شبكة توزيع لا تفتح بلاغاً.
      if (RETRY.has(classify(res))) { await sleep(3000); res = await request(target.url); }
      return { ...target, status: res.status, errorCode: res.errorCode ?? null, class: classify(res) };
    } finally {
      setTimeout(release, PER_HOST_GAP_MS);
    }
  };
}

async function main() {
  const args = process.argv.slice(2);
  const unknown = args.filter((a) => a !== '--json' && a !== '--save');
  if (unknown.length) throw new Error(`وسيط غير معروف: ${unknown[0]}`);
  const json = args.includes('--json');
  const sitemap = await fetchPage(`${ORIGIN}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`sitemap.xml: ${sitemap.status || sitemap.errorCode}`);
  const pageUrls = sitemapLocs(sitemap.text).filter((u) => u.startsWith(`${ORIGIN}/`));
  if (pageUrls.length < 100) throw new Error(`sitemap.xml يحمل ${pageUrls.length} صفحة فقط — أقل من الحدّ الأدنى 100`);

  const fetched = await pool(pageUrls, PAGE_CONCURRENCY, fetchPage);
  const pages = fetched.filter((p) => p.status === 200).map((p) => ({ url: p.url, html: p.text }));
  const pageErrors = fetched.filter((p) => p.status !== 200).map((p) => ({ url: p.url, status: p.status, errorCode: p.errorCode ?? null }));

  const { targets, skipped } = collectTargets(pages);
  const links = await pool(targets, LINK_CONCURRENCY, makeLinkChecker());
  const result = { origin: ORIGIN, pages: pages.length, pageErrors, links, skipped };

  if (args.includes('--save')) writeFileSync(REPORT_FILE, JSON.stringify(result, null, 2) + '\n');
  process.stdout.write(json ? JSON.stringify(result, null, 2) + '\n' : summarize(result));
  const broken = links.filter((l) => l.class === 'broken').length;
  if (broken || pageErrors.length) {
    console.error(`✗ ${broken} رابطاً خارجياً معطوباً و${pageErrors.length} صفحة تعذّر جلبها.`);
    process.exit(1);
  }
  console.error('✓ لا رابط خارجي معطوب.');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((e) => { console.error(`✗ فحص الروابط الخارجية: ${e instanceof Error ? e.message : String(e)}`); process.exit(1); });
}
