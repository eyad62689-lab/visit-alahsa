// تسجيل الزواحف (طبقة الحماية ٣) — Netlify لا تتيح سجلات الطلبات للدوال،
// فتسجّل هذه الـ Edge Function عيّنة من طلبات الصفحات في Blobs ليحللها
// theft-scan أسبوعياً (زاحف يسحب الموقع كاملاً = معدل مرتفع/UA غير معتاد).
//
// حِرص الأداء: تعمل على مسارات الصفحات فقط (الأصول مستثناة في config أدناه)،
// وتسجّل الطلبات البوتية كلها + عيّنة 5% من البقية، وأي فشل فيها لا يمس الزائر.
// الخصوصية (PDPL): hash SHA-256 مُملَّح للـ IP فقط — لا عنوان خام.

import { getStore } from '@netlify/blobs'

const BOT_RE = /bot|crawl|spider|scrape|fetch|slurp|python|curl|wget|httpx|http[-_ ]?client|go-http|node-fetch|axios|scrapy|headless|phantom|selenium|playwright|puppeteer/i
const SAMPLE_RATE = 0.05

async function hashIp(ip, salt) {
  if (!ip) return null
  const data = new TextEncoder().encode(salt + ip)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32)
}

async function logRequest(request, context, ua, isBot) {
  const now = new Date()
  const store = getStore('crawl-logs')
  const entry = {
    ts: now.toISOString(),
    path: new URL(request.url).pathname.slice(0, 300),
    ua: ua.slice(0, 300),
    isBot,
    ipHash: await hashIp(context.ip, Deno.env.get('IP_HASH_SALT') || ''),
    country: context.geo?.country?.code || null,
  }
  // مفتاح يومي — يسهّل على theft-scan قصر التحليل على أيام الأسبوع الأخير
  const key = `${now.toISOString().slice(0, 10)}/${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`
  await store.setJSON(key, entry)
}

export default async (request, context) => {
  try {
    const ua = request.headers.get('user-agent') || ''
    const isBot = ua === '' || BOT_RE.test(ua)
    if (isBot) {
      // البوت لا يتأثر ببضع ميلي ثانية — ننتظر لضمان عدم ضياع السجل
      await logRequest(request, context, ua, isBot).catch(() => {})
    } else if (Math.random() < SAMPLE_RATE) {
      // زائر بشري: لا نحجب الاستجابة إطلاقاً — إرسال أفضل جهد وفقدُ عيّنةٍ مقبول
      logRequest(request, context, ua, isBot).catch(() => {})
    }
  } catch { /* التسجيل لا يعطّل تقديم الصفحة بأي حال */ }
  return context.next()
}

export const config = {
  path: '/*',
  excludedPath: [
    '/_astro/*', '/img/*', '/fonts/*', '/video/*', '/vendor/*', '/pagefind/*',
    '/.netlify/*', '/*.png', '/*.ico', '/*.svg', '/*.webmanifest', '/*.txt', '/*.xml', '/*.json',
  ],
  onError: 'bypass',
}
