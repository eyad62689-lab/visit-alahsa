// خادم محلي يحاكي Netlify للمستشار: يخدم dist/ ساكناً ويوجّه /.netlify/functions/advisor إلى الدالة
// netlify/functions/advisor/advisor.mjs مباشرة (بعدّاد في الذاكرة بدل Blobs) — أصل واحد فلا CORS ولا إعادة بناء.
//
// التشغيل:  ANTHROPIC_API_KEY=… node tools/advisor-dev-server.mjs      (المنفذ ADVISOR_PORT، الافتراضي 8788)
// يلزم dist/ وkb.generated.json (ينتجهما npm run build).
//
// --mock (أو ADVISOR_MOCK=1): بلا مفتاح ولا شبكة — يبثّ جواباً ثابتاً بالبروتوكول نفسه (delta/cards/done)
// لاختبار الواجهة وبطاقاتها وقصّ سطر الروابط؛ ويعيد 503/cap إن بدأ السؤال بـ"cap" و429/rate إن بدأ بـ"rate"
// و503/off إن بدأ بـ"off" — فتُرى مسارات الصمت اللطيف كلها.

import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { readFileSync, existsSync, createReadStream, readdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

process.env.ADVISOR_STORE ??= 'memory';
const PORT = Number(process.env.ADVISOR_PORT) || 8788;
const MOCK = process.env.ADVISOR_MOCK === '1' || process.argv.includes('--mock');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const FN_PATH = '/.netlify/functions/advisor';

const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.geojson': 'application/geo+json', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.webm': 'video/webm', '.webmanifest': 'application/manifest+json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.pbf': 'application/octet-stream', '.wasm': 'application/wasm' };

let handler;
if (MOCK) {
  const { validateRequest, extractLinks, resolveCards } = await import('../netlify/functions/advisor/core.mjs');
  const kb = JSON.parse(readFileSync(join(ROOT, 'netlify', 'functions', 'advisor', 'kb.generated.json'), 'utf8'));
  const CANNED = {
    ar: 'جبل القارة يُفتح يومياً من 8:00 ص إلى 11:00 م، والتذكرة 50 ريالاً للبالغين عبر «أرض الحضارات».\n\nكهوفه تبقى قريبة من 20°م حتى في ذروة الصيف، فهو خيار مناسب لنهار حارّ.\n\n[[links: jabal-al-qarah, page/plan]]',
    en: 'Jabal Al-Qarah is open daily 8:00 am to 11:00 pm; adult tickets are SAR 50 via the Land of Civilisations.\n\nIts caves stay close to 20°C even at the height of summer, so it suits a hot day well.\n\n[[links: jabal-al-qarah, page/plan]]',
  };
  const sse = (e, d) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`;
  const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
  handler = async (req) => {
    const v = validateRequest(await req.json().catch(() => null));
    if (!v.ok) return json(v.status, { error: v.error });
    const q = v.messages[v.messages.length - 1].content;
    if (/^cap/i.test(q)) return json(503, { reason: 'cap' });
    if (/^off/i.test(q)) return json(503, { reason: 'off' });
    if (/^rate/i.test(q)) return json(429, { reason: 'rate' });
    const text = CANNED[v.lang] ?? CANNED.en;
    const enc = new TextEncoder();
    const stream = new ReadableStream({
      async start(c) {
        for (const piece of text.match(/.{1,12}/gsu)) { c.enqueue(enc.encode(sse('delta', { t: piece }))); await new Promise((r) => setTimeout(r, 25)); }
        c.enqueue(enc.encode(sse('cards', { cards: resolveCards(extractLinks(text).ids, kb, v.lang) })));
        c.enqueue(enc.encode(sse('done', { stop: 'end_turn', model: 'mock' })));
        c.close();
      },
    });
    return new Response(stream, { headers: { 'content-type': 'text/event-stream; charset=utf-8', 'cache-control': 'no-store' } });
  };
} else {
  ({ default: handler } = await import('../netlify/functions/advisor/advisor.mjs'));
}

/** جدول ملفات dist (مسار URL مفكوك ← مسار مطلق على القرص) يُبنى مرة عند الإقلاع: الطلب يُستعمل مفتاحَ
 *  بحث فقط، والمسار الذي يُفتح يأتي من الجدول لا من الطلب — فلا تركيب مسار من مدخل ولا حاجة لفحص «..». */
function indexDist(dir, prefix, into) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, ent.name);
    if (ent.isDirectory()) indexDist(abs, prefix + ent.name + '/', into);
    else if (ent.isFile()) {
      into.set(prefix + ent.name, abs);
      if (ent.name === 'index.html') into.set(prefix, abs);
    }
  }
  return into;
}
const FILES = existsSync(DIST) ? indexDist(DIST, '/', new Map()) : new Map();

function serveStatic(req, res) {
  let key;
  try { key = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname); } catch { res.writeHead(400); return res.end(); }
  const file = FILES.get(key);
  if (!file) { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); return res.end('404'); }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
  createReadStream(file).pipe(res);
}

createServer(async (req, res) => {
  if (!req.url.startsWith(FN_PATH)) return serveStatic(req, res);
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const request = new Request(`http://localhost:${PORT}${FN_PATH}`, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? undefined : Buffer.concat(chunks),
  });
  const response = await handler(request, { ip: req.socket.remoteAddress });
  res.writeHead(response.status, Object.fromEntries(response.headers));
  if (response.body) Readable.fromWeb(response.body).pipe(res); else res.end();
}).listen(PORT, 'localhost', () => console.log(`advisor dev → http://localhost:${PORT}/ (dist + ${FN_PATH}; ${MOCK ? 'MOCK' : 'model ' + (process.env.ADVISOR_MODEL || 'default')})`));
