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
  extractLinks, resolveCards, storeRotation, estimateCostUsd, bump, readSpend, addSpend, dayKey, memoryStore,
  originAllowed, ipBucket,
} from './core.mjs'

const KB_TEXT = {} // بطاقة كل لغة تُصاغ مرة عند أول طلب وتبقى في ذاكرة النسخة الدافئة

const envNum = (name, fallback) => (Number.isFinite(+process.env[name]) && process.env[name] !== '' ? +process.env[name] : fallback)

function store() {
  if (process.env.ADVISOR_STORE === 'memory') return memoryStore()
  try { return getStore({ name: 'advisor', consistency: 'strong' }) } catch { return memoryStore() }
}

const sse = (event, data) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
const json = (status, body, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra } })

/** فئة الخطأ للواجهة وسجل الدالة — لا تفاصيل داخلية للمتصفح */
function errorKind(err) {
  if (err instanceof Anthropic.RateLimitError) return 'rate'
  if (err instanceof Anthropic.APIError) return 'api'
  return 'network'
}

/** تقدير محافظ للاستهلاك حين لم يكتمل البث (إلغاء أو خطأ): المخرجات من النصّ المبثوث فعلاً
 *  (≈ محرفان لكل رمز) والمدخلات من حجم البرومبت إن لم يصل message_start — لا تقليل أبداً */
function settleUsage(usage, completed, full, system, messages) {
  if (completed) return usage
  const out = { ...usage, output_tokens: Math.max(+usage.output_tokens || 0, Math.ceil(full.length / 2)) }
  if (!Number.isFinite(+out.input_tokens) && !Number.isFinite(+out.cache_read_input_tokens)) {
    const chars = system.reduce((n, b) => n + b.text.length, 0) + messages.reduce((n, m) => n + m.content.length, 0)
    out.input_tokens = Math.ceil(chars / 2)
  }
  return out
}

/** يبثّ جواب النموذج إلى المتصفح ويجمع الاستهلاك من أحداث البث نفسها */
async function relay(apiStream, send, state) {
  for await (const ev of apiStream) {
    if (ev.type === 'message_start') state.usage = { ...state.usage, ...ev.message.usage }
    else if (ev.type === 'message_delta') state.usage = { ...state.usage, ...ev.usage }
    else if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') {
      state.full += ev.delta.text
      send('delta', { t: ev.delta.text })
    }
  }
  const final = await apiStream.finalMessage()
  state.usage = final.usage
  state.completed = true
  return final
}

export default async function advisor(req, context) {
  const cors = corsHeaders(req)
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  // Origin إلزامي لطلب POST من متصفح (يرسله دائماً)، ويُقبل من نطاقات الموقع وحدها — لا كل *.netlify.app
  if (!originAllowed(req.headers.get('origin'))) return new Response('Forbidden', { status: 403 })

  if (process.env.ADVISOR_DISABLED === '1') return json(503, { reason: 'off' }, cors)
  if (!process.env.ANTHROPIC_API_KEY) return json(503, { reason: 'off' }, cors)

  let body
  try { body = await req.json() } catch { return json(400, { error: 'bad-json' }, cors) }
  const v = validateRequest(body)
  if (!v.ok) return json(v.status, { error: v.error }, cors)
  const { lang, page, messages } = v

  const st = store()
  const cap = envNum('ADVISOR_MONTHLY_CAP_USD', LIMITS.monthlyCapUsd)
  // الإغلاق عند تعذّر المخزن (null): لا سقف مقروء = لا خدمة، فالرصيد محدود
  const spent = await readSpend(st)
  if (spent === null || spent >= cap) return json(503, { reason: 'cap' }, cors)

  // بلا عنوان لا حدّ يومي ممكن → يُرفض (fail closed). IPv6 يُجمَّع على /64 قبل التجزئة.
  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || ''
  if (!ip) return json(400, { error: 'no-ip' }, cors)
  const salt = process.env.IP_HASH_SALT || ''
  const ipHash = createHash('sha256').update(salt + ipBucket(ip)).digest('hex').slice(0, 24)
  const daily = await bump(st, `ip/${dayKey()}/${ipHash}`, envNum('ADVISOR_DAILY_PER_IP', LIMITS.dailyPerIp))
  if (daily.error) return json(503, { reason: 'cap' }, cors)
  if (!daily.allowed) return json(429, { reason: 'rate' }, cors)

  const model = process.env.ADVISOR_MODEL || DEFAULT_MODEL
  const effort = process.env.ADVISOR_EFFORT || 'low'
  KB_TEXT[lang] ??= renderKb(kb, lang)
  const system = buildSystem(lang, KB_TEXT[lang])
  const ctx = pageContext(kb, lang, page) + storeRotation(kb, lang)
  const apiMessages = messages.map((m, i) => (i === messages.length - 1 && ctx ? { role: m.role, content: ctx + m.content } : m))

  const client = new Anthropic()
  const encoder = new TextEncoder()
  // الاستهلاك يُجمع من أحداث البث ويُسجَّل في finally مهما انتهى الطلب — خطأ أو إلغاء من المتصفح —
  // فلا رمز مدفوع يفلت من السقف الشهري.
  const state = { usage: {}, full: '', completed: false }
  let apiStream = null
  let closed = false
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event, data) => { if (!closed) controller.enqueue(encoder.encode(sse(event, data))) }
      try {
        apiStream = client.messages.stream({ model, max_tokens: LIMITS.maxOutputTokens, output_config: { effort }, system, messages: apiMessages })
        const final = await relay(apiStream, send, state)
        send('cards', { cards: resolveCards(extractLinks(state.full).ids, kb, lang) })
        send('done', { stop: final.stop_reason, model: final.model })
      } catch (err) {
        if (!closed) {
          const kind = errorKind(err)
          console.error('advisor:', kind, err?.status ?? '', err?.message ?? err)
          send('error', { reason: kind })
        }
      } finally {
        const usd = estimateCostUsd(model, settleUsage(state.usage, state.completed, state.full, system, apiMessages))
        if (usd > 0) await addSpend(st, usd)
        if (!closed) { closed = true; controller.close() }
      }
    },
    cancel() {
      // المتصفح أغلق الاتصال: أوقف طلب النموذج (لا مخرجات مدفوعة بلا قارئ)؛ finally أعلاه يسجّل ما استُهلك
      closed = true
      try { apiStream?.controller?.abort() } catch { /* أُنهي سلفاً */ }
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
