// المستشار الذكي — دالة Netlify تبثّ جواب Claude (SSE) للواجهة Advisor.astro.
//
// المعرفة: kb.generated.json — تولّده tools/gen-advisor-kb.mjs في postbuild من dist/data/advisor-kb.json
// (بعد التحقق من أن كل رابط فيه صفحة مبنية). Netlify يحزم الدوال بعد أمر البناء فيجده.
//
// الحدود (تحمي رصيد API الشهري): سقف إنفاق شهري يُقدَّر من usage كل طلب، وعدّاد يومي لكل زائر
// بتجزئة IP مُملَّحة (IP_HASH_SALT — لا IP خام، كما في copy-log)، وحدّ لطول الرسالة وعدد الأدوار.
// عند بلوغ السقف تعيد الدالة 503 بسبب `cap` فتصمت الواجهة بلطف. لا تُحفظ المحادثات إطلاقاً.
//
// متغيرات البيئة (لوحة Netlify): ANTHROPIC_API_KEY (إلزامي)، ADVISOR_MODEL، ADVISOR_EFFORT،
// ADVISOR_MONTHLY_CAP_USD، ADVISOR_DAILY_PER_IP، ADVISOR_DISABLED=1 (إيقاف طارئ)، IP_HASH_SALT.

import Anthropic from '@anthropic-ai/sdk'
import { getStore } from '@netlify/blobs'
import { createHash } from 'node:crypto'
import kb from './kb.generated.json' with { type: 'json' }
import {
  DEFAULT_MODEL, LIMITS, validateRequest, renderKb, buildSystem, pageContext,
  extractLinks, resolveCards, estimateCostUsd, bump, readSpend, addSpend, dayKey, memoryStore,
} from './core.mjs'

const ALLOWED_HOSTS = ['visit-alahsa.com', 'www.visit-alahsa.com']
const KB_TEXT = {} // بطاقة كل لغة تُصاغ مرة عند أول طلب وتبقى في ذاكرة النسخة الدافئة

const envNum = (name, fallback) => (Number.isFinite(+process.env[name]) && process.env[name] !== '' ? +process.env[name] : fallback)

function store() {
  if (process.env.ADVISOR_STORE === 'memory') return memoryStore()
  try { return getStore({ name: 'advisor', consistency: 'strong' }) } catch { return memoryStore() }
}

const sse = (event, data) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
const json = (status, body, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra } })

export default async (req, context) => {
  const cors = corsHeaders(req)
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  const origin = req.headers.get('origin') || ''
  if (origin) {
    let host = ''
    try { host = new URL(origin).hostname } catch { /* أصل مشوّه → يُرفض */ }
    const ok = ALLOWED_HOSTS.includes(host) || host.endsWith('.netlify.app') || host === 'localhost' || host === '127.0.0.1'
    if (!ok) return new Response('Forbidden', { status: 403 })
  }

  if (process.env.ADVISOR_DISABLED === '1') return json(503, { reason: 'off' }, cors)
  if (!process.env.ANTHROPIC_API_KEY) return json(503, { reason: 'off' }, cors)

  let body
  try { body = await req.json() } catch { return json(400, { error: 'bad-json' }, cors) }
  const v = validateRequest(body)
  if (!v.ok) return json(v.status, { error: v.error }, cors)
  const { lang, page, messages } = v

  const st = store()
  const cap = envNum('ADVISOR_MONTHLY_CAP_USD', LIMITS.monthlyCapUsd)
  const spent = await readSpend(st)
  if (spent >= cap) return json(503, { reason: 'cap' }, cors)

  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || ''
  if (ip) {
    const salt = process.env.IP_HASH_SALT || ''
    const ipHash = createHash('sha256').update(salt + ip).digest('hex').slice(0, 24)
    const daily = await bump(st, `ip/${dayKey()}/${ipHash}`, envNum('ADVISOR_DAILY_PER_IP', LIMITS.dailyPerIp))
    if (!daily.allowed) return json(429, { reason: 'rate' }, cors)
  }

  const model = process.env.ADVISOR_MODEL || DEFAULT_MODEL
  const effort = process.env.ADVISOR_EFFORT || 'low'
  KB_TEXT[lang] ??= renderKb(kb, lang)
  const system = buildSystem(lang, KB_TEXT[lang])
  const ctx = pageContext(kb, lang, page)
  const apiMessages = messages.map((m, i) => (i === messages.length - 1 && ctx ? { role: m.role, content: ctx + m.content } : m))

  const client = new Anthropic()
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event, data) => controller.enqueue(encoder.encode(sse(event, data)))
      let full = ''
      try {
        const s = client.messages.stream({
          model,
          max_tokens: LIMITS.maxOutputTokens,
          output_config: { effort },
          system,
          messages: apiMessages,
        })
        for await (const ev of s) {
          if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') {
            full += ev.delta.text
            send('delta', { t: ev.delta.text })
          }
        }
        const final = await s.finalMessage()
        const usd = estimateCostUsd(model, final.usage)
        await addSpend(st, usd)
        const { ids } = extractLinks(full)
        send('cards', { cards: resolveCards(ids, kb, lang) })
        send('done', { stop: final.stop_reason, model: final.model })
      } catch (err) {
        // لا تفاصيل داخلية للمتصفح؛ الفئة تكفي للواجهة ولسجل الدالة
        const kind = err instanceof Anthropic.RateLimitError ? 'rate' : err instanceof Anthropic.APIError ? 'api' : 'network'
        console.error('advisor:', kind, err?.status ?? '', err?.message ?? err)
        send('error', { reason: kind })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
      ...cors,
    },
  })
}

/** CORS للتطوير المحلي فقط (معاينة Astro على منفذ غير منفذ الدالة) — في الإنتاج الأصل نفسه فلا رؤوس */
function corsHeaders(req) {
  const origin = req.headers.get('origin') || ''
  let host = ''
  try { host = new URL(origin).hostname } catch { return {} }
  if (host !== 'localhost' && host !== '127.0.0.1') return {}
  return { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', Vary: 'Origin' }
}
