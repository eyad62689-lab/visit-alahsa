// دالة استقبال سجلات النسخ (طبقة الحماية ١) — تستقبل beacon من CopyGuard.astro
// وتخزّن الحدث في Netlify Blobs (store: copy-logs).
//
// الخصوصية (نظام حماية البيانات الشخصية السعودي PDPL):
// لا يُخزَّن عنوان IP الخام إطلاقاً — hash SHA-256 مُملَّح فقط (IP_HASH_SALT من
// متغيرات بيئة Netlify)، يكفي لتمييز المصدر الواحد دون إمكانية استرجاع العنوان.
//
// يُعلَّم الحدث «مشبوهاً» إذا تجاوز النسخ 400 حرف أو تكرر أكثر من 5 مرات في
// الجلسة (يُحتسب التكرار في الخادم أيضاً — عدّاد المتصفح قابل للتلاعب).

import { getStore } from '@netlify/blobs'
import { createHash } from 'node:crypto'

const SUSPICIOUS_LENGTH = 400
const SUSPICIOUS_REPEATS = 5
// سقف الأحداث المخزّنة لجلسة واحدة: بعده يُحدَّث العدّاد فقط بلا تخزين الحدث
// (بلا سقف كان سكربت واحد يستطيع إغراق المخزن بكتابتين لكل طلب)
const SESSION_EVENT_CAP = 200
const ALLOWED_HOSTS = ['visit-alahsa.com', 'www.visit-alahsa.com']

const clampStr = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '')
const clampNum = (v, max) => (Number.isFinite(+v) ? Math.max(0, Math.min(+v, max)) : 0)

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 })

  // قبول الطلبات من الموقع نفسه فقط (يشمل نطاق العرض التجريبي *.netlify.app)
  const origin = req.headers.get('origin') || ''
  if (origin) {
    let host = ''
    try { host = new URL(origin).hostname } catch { /* أصل مشوّه → يُرفض أدناه */ }
    const ok = ALLOWED_HOSTS.includes(host) || host.endsWith('.netlify.app') || host === 'localhost'
    if (!ok) return new Response('Forbidden', { status: 403 })
  }

  let body
  try { body = await req.json() } catch { return new Response('Bad Request', { status: 400 }) }

  const session = clampStr(body.session, 64) || 'no-session'
  const length = clampNum(body.length, 1_000_000)

  // hash الـ IP — لا يلمس التخزين إن غاب الملح والعنوان معاً
  const ip = context?.ip || req.headers.get('x-nf-client-connection-ip') || ''
  const salt = process.env.IP_HASH_SALT || ''
  const ipHash = ip ? createHash('sha256').update(salt + ip).digest('hex').slice(0, 32) : null

  const store = getStore('copy-logs')

  // عدّاد الجلسة في الخادم (سباق كتابة نادر ومقبول لغرض إحصائي)
  let serverCopies = 1
  try {
    const prev = await store.get(`sessions/${session}`, { type: 'json' })
    serverCopies = ((prev && prev.n) || 0) + 1
    await store.setJSON(`sessions/${session}`, { n: serverCopies, last: new Date().toISOString() })
  } catch { /* تعذّر العدّاد لا يمنع تسجيل الحدث */ }

  const suspicious = length > SUSPICIOUS_LENGTH || serverCopies > SUSPICIOUS_REPEATS
  if (serverCopies > SESSION_EVENT_CAP) return new Response(null, { status: 204 })

  const now = new Date()
  const event = {
    excerpt: clampStr(body.excerpt, 200),
    length,
    path: clampStr(body.path, 300),
    lang: body.lang === 'en' ? 'en' : 'ar',
    ts: clampStr(body.ts, 40) || now.toISOString(),
    session,
    copiesInSession: serverCopies,
    ua: clampStr(body.ua, 300),
    ipHash,
    suspicious,
    receivedAt: now.toISOString(),
  }

  // مفتاح شهري يسهّل التجميع في تقرير theft-scan والتنظيف الدوري.
  // لاحقة عشوائية إلزامية: حدثان في نفس الميلي ثانية يتصادمان بدونها فيضيع أحدهما.
  const key = `${now.toISOString().slice(0, 7)}/${now.getTime()}-${session.slice(0, 8)}-${Math.random().toString(36).slice(2, 8)}`
  await store.setJSON(key, event)

  return new Response(null, { status: 204 })
}
