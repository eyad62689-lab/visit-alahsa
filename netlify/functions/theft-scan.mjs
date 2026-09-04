// المسح الأسبوعي لرصد السرقة الخارجية (طبقة الحماية ٣) — دالة مجدولة.
//
// ماذا تفعل كل أسبوع:
// 1) تبحث عن العبارات البصمية (src/data/content-fingerprints.json — تُضمَّن
//    وقت البناء) عبر Serper API مستثنيةً النطاق الأصلي، بمجموعة دوّارة كي
//    تغطي كل الصفحات على مدى دورات متتابعة دون استنزاف حصة البحث.
// 2) تحلّل سجلات الزحف (Blobs: crawl-logs التي تكتبها bot-log الطرفية)
//    وترصد المعدلات المرتفعة والـ user-agent غير المعتاد.
// 3) تلخّص أحداث النسخ المشبوهة (Blobs: copy-logs) للشهر الجاري.
// 4) تكتب تقرير Markdown في Blobs (store: theft-reports) — يُسحب محلياً إلى
//    مجلد reports/ عبر scripts/pull-reports.mjs — وترسل بريد تنبيه عبر
//    Resend عند اكتشاف تطابق خارجي.
//
// المفاتيح كلها من متغيرات بيئة Netlify: SERPER_API_KEY، RESEND_API_KEY،
// ALERT_EMAIL_TO، ALERT_EMAIL_FROM. غياب أي مفتاح = تخطٍّ سِلمي مذكور بالتقرير.

import { getStore } from '@netlify/blobs'
import fingerprintData from '../../src/data/content-fingerprints.json' with { type: 'json' }

const OWN_HOSTS = ['visit-alahsa.com', 'www.visit-alahsa.com']
const PHRASES_PER_RUN = 15
const CRAWL_SCAN_DAYS = 7
const CRAWL_ENTRY_CAP = 4000
// عتبات زاحف مشبوه خلال أسبوع: بوت غير معروف كثيف، أو مصدر واحد يجتاح الصفحات
const KNOWN_BOTS_RE = /googlebot|bingbot|duckduckbot|yandex|baiduspider|applebot(?!-extended)|petalbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|pinterest|slackbot/i
const SUSPECT_BOT_HITS = 100
const SUSPECT_IP_HITS = 300

async function serperSearch(phrase, lang, apiKey) {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: `"${phrase}" -site:visit-alahsa.com`,
      gl: 'sa',
      // لغة الواجهة تتبع لغة العبارة: العبارات الصينية تُبحث بواجهة zh-cn
      hl: lang === 'ar' ? 'ar' : lang === 'zh' ? 'zh-cn' : 'en',
      num: 10,
    }),
  })
  if (!res.ok) throw new Error(`Serper ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  return (data.organic || [])
    .filter((r) => { try { return !OWN_HOSTS.includes(new URL(r.link).hostname) } catch { return false } })
    .map((r) => ({ title: r.title, link: r.link, snippet: (r.snippet || '').slice(0, 200) }))
}

async function listEntries(store, prefix, cap) {
  const out = []
  const { blobs } = await store.list({ prefix })
  for (const b of blobs.slice(0, cap)) {
    try {
      const v = await store.get(b.key, { type: 'json' })
      if (v) out.push(v)
    } catch { /* سجل تالف واحد لا يوقف التحليل */ }
  }
  return out
}

function analyzeCrawlers(entries) {
  const byUa = new Map()
  const byIp = new Map()
  for (const e of entries) {
    const uaKey = (e.ua || '(بدون user-agent)').slice(0, 120)
    byUa.set(uaKey, (byUa.get(uaKey) || 0) + 1)
    if (e.ipHash) byIp.set(e.ipHash, (byIp.get(e.ipHash) || 0) + 1)
  }
  const suspects = []
  for (const [ua, n] of byUa) {
    const known = KNOWN_BOTS_RE.test(ua)
    if (!known && n >= SUSPECT_BOT_HITS && (BOTISH_RE.test(ua) || ua === '(بدون user-agent)'))
      suspects.push({ kind: 'ua', who: ua, hits: n })
  }
  for (const [ip, n] of byIp) if (n >= SUSPECT_IP_HITS) suspects.push({ kind: 'ip', who: `ip-hash:${ip}`, hits: n })
  const topUa = [...byUa.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10)
  return { suspects: suspects.sort((a, b) => b.hits - a.hits), topUa, total: entries.length }
}
const BOTISH_RE = /bot|crawl|spider|scrape|fetch|python|curl|wget|http|go-|axios|scrapy|headless/i

function buildReport({ now, matches, searched, searchNote, crawl, copySummary, emailNote }) {
  const d = now.toISOString().slice(0, 10)
  const L = []
  L.push(`# تقرير حماية المحتوى الأسبوعي — ${d}`)
  L.push('', `موقع «زوروا الأحساء» — يُولَّد آلياً كل أسبوع من دالة theft-scan.`, '')
  L.push('## ١) البحث عن المحتوى المسروق خارجياً', '')
  if (searchNote) L.push(`> ${searchNote}`, '')
  L.push(`عبارات بصمية فُحصت هذه الدورة: **${searched}** من أصل ${fingerprintData.count}.`, '')
  if (matches.length === 0) {
    L.push('**النتيجة: لا تطابق خارجي — لم يُرصد نشر لمحتوى الموقع في نطاقات أخرى.** ✅', '')
  } else {
    L.push(`**⚠️ رُصد ${matches.length} تطابقاً خارجياً — راجع docs/content-protection.md لخطوات التصعيد:**`, '')
    L.push('| الصفحة الأصلية | الموقع الناشر | العنوان لديهم |', '| --- | --- | --- |')
    for (const m of matches) L.push(`| [${m.source.title}](${m.source.url}) | ${m.result.link} | ${m.result.title} |`)
    L.push('')
  }
  L.push('## ٢) تحليل الزواحف (آخر ٧ أيام)', '')
  L.push(`سجلات محلَّلة: ${crawl.total} طلباً (البوتات كلها + عيّنة 5% من الزوار).`, '')
  if (crawl.suspects.length === 0) L.push('لا زواحف مشبوهة فوق العتبات المحددة. ✅', '')
  else {
    L.push('**⚠️ زواحف مشبوهة (معدل مرتفع أو UA غير معتاد):**', '')
    L.push('| المصدر | عدد الطلبات |', '| --- | --- |')
    for (const s of crawl.suspects.slice(0, 15)) L.push(`| \`${s.who.replace(/\|/g, '\\|')}\` | ${s.hits} |`)
    L.push('')
  }
  L.push('أعلى الزواحف نشاطاً:', '')
  L.push('| user-agent | الطلبات |', '| --- | --- |')
  for (const [ua, n] of crawl.topUa) L.push(`| \`${ua.replace(/\|/g, '\\|')}\` | ${n} |`)
  L.push('', '## ٣) أحداث النسخ داخل الموقع (الشهر الجاري)', '')
  L.push(`إجمالي أحداث النسخ: ${copySummary.total} — منها **${copySummary.suspicious} مشبوهاً** (نسخ >400 حرف أو >5 مرات في الجلسة).`, '')
  if (copySummary.topPaths.length) {
    L.push('أكثر الصفحات نسخاً:', '')
    for (const [p, n] of copySummary.topPaths) L.push(`- \`${p}\` — ${n} مرة`)
    L.push('')
  }
  if (emailNote) L.push('---', '', `> ${emailNote}`, '')
  return L.join('\n')
}

async function sendAlertEmail({ matches, reportKey }) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ALERT_EMAIL_TO
  if (!apiKey || !to) return 'تنبيه البريد متخطّى: RESEND_API_KEY أو ALERT_EMAIL_TO غير مضبوطين في متغيرات بيئة Netlify.'
  const from = process.env.ALERT_EMAIL_FROM || 'onboarding@resend.dev'
  const rows = matches.map((m) => `<li><a href="${m.result.link}">${m.result.link}</a> — نسخ من: ${m.source.title}</li>`).join('')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from, to: [to],
      subject: `⚠️ زوروا الأحساء: رُصد ${matches.length} موقعاً نشر محتواك`,
      html: `<div dir="rtl"><p>رصد المسح الأسبوعي مواقع خارجية تنشر محتوى «زوروا الأحساء»:</p><ul>${rows}</ul><p>التقرير الكامل: <code>${reportKey}</code> (اسحبه بـ <code>npm run pull:reports</code>) — وخطوات التصعيد في <code>docs/content-protection.md</code>.</p></div>`,
    }),
  })
  if (!res.ok) return `فشل إرسال البريد (${res.status}): ${(await res.text()).slice(0, 200)}`
  return `أُرسل تنبيه بريدي إلى ${to}.`
}

export default async () => {
  const now = new Date()
  const state = getStore('protection-state')

  // 1) البحث الخارجي بمجموعة دوّارة من العبارات
  const matches = []
  let searched = 0
  let searchNote = null
  const apiKey = process.env.SERPER_API_KEY
  if (!apiKey) {
    searchNote = 'البحث الخارجي متخطّى: SERPER_API_KEY غير مضبوط في متغيرات بيئة Netlify.'
  } else {
    let cursor = 0
    try { cursor = (await state.get('scan-cursor', { type: 'json' }))?.cursor || 0 } catch { /* أول تشغيل */ }
    const all = fingerprintData.fingerprints
    for (let i = 0; i < Math.min(PHRASES_PER_RUN, all.length); i++) {
      const fp = all[(cursor + i) % all.length]
      try {
        const results = await serperSearch(fp.phrase, fp.lang, apiKey)
        searched++
        for (const r of results) matches.push({ source: fp, result: r })
      } catch (e) {
        searchNote = `توقف البحث مبكراً بعد ${searched} عبارة: ${e.message}`
        break
      }
    }
    await state.setJSON('scan-cursor', { cursor: (cursor + searched) % all.length, updated: now.toISOString() })
  }

  // 2) تحليل سجلات الزحف لآخر أسبوع
  const crawlStore = getStore('crawl-logs')
  const crawlEntries = []
  for (let d = 0; d < CRAWL_SCAN_DAYS; d++) {
    const day = new Date(now.getTime() - d * 86400e3).toISOString().slice(0, 10)
    crawlEntries.push(...(await listEntries(crawlStore, `${day}/`, Math.ceil(CRAWL_ENTRY_CAP / CRAWL_SCAN_DAYS))))
  }
  const crawl = analyzeCrawlers(crawlEntries)

  // 3) ملخص أحداث النسخ للشهر الجاري
  const copyStore = getStore('copy-logs')
  const copyEvents = await listEntries(copyStore, `${now.toISOString().slice(0, 7)}/`, 1000)
  const pathCounts = new Map()
  for (const e of copyEvents) pathCounts.set(e.path, (pathCounts.get(e.path) || 0) + 1)
  const copySummary = {
    total: copyEvents.length,
    suspicious: copyEvents.filter((e) => e.suspicious).length,
    topPaths: [...pathCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5),
  }

  // 4) التقرير + التنبيه
  const reportKey = `${now.toISOString().slice(0, 10)}.md`
  let emailNote = null
  if (matches.length > 0) emailNote = await sendAlertEmail({ matches, reportKey })
  const report = buildReport({ now, matches, searched, searchNote, crawl, copySummary, emailNote })
  await getStore('theft-reports').set(reportKey, report)

  console.log(`theft-scan: عبارات=${searched} تطابقات=${matches.length} زحف=${crawl.total} تقرير=${reportKey}`)
  return new Response('ok')
}

// الجدولة الأسبوعية: كل اثنين 3 فجراً UTC (٦ صباحاً بتوقيت السعودية)
export const config = { schedule: '0 3 * * 1' }
