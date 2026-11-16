// إعادة بناء يومية مجدولة للإنتاج — دالة مجدولة.
//
// لماذا: جزء من الموقع يُحسب وقت البناء من تاريخ اليوم، فيتقادم إن لم يُبنَ:
//   - الفعاليات (src/data/events.ts): النسخة المؤكدة تعود إلى موسمها التقريبي بعد endISO،
//     والفعالية المؤقتة تخرج من القائمة وصفحتها وsitemap. متصفّح الزائر يخفي البطاقة قبل
//     البناء التالي، لكن سكيما Event وsitemap وllms.txt وبطاقة معرفة المستشار تبقى على
//     حالها حتى يُبنى الموقع.
//   - أوقات العمل والتقييمات الحية للمطاعم والإقامة (tools/fetch-places.mjs): تُجلب في بناء
//     الإنتاج وحده.
//   - رخص المرشدين (src/lib/guides.ts) وسنة الحقوق.
//
// ماذا تفعل: تستدعي خطّاف بناء Netlify (Build hook) مرة في اليوم. الخطّاف يبني الفرع
// المنشور كما هو — لا التزام ولا تغيير في المستودع.
//
// الرابط من متغير البيئة REBUILD_HOOK_URL في لوحة Netlify (لا يُكتب في الكود: من يعرفه يستطيع
// إطلاق بناء). غيابه = تخطٍّ سِلمي مذكور في السجل، كسائر الدوال هنا.

const HOOK_HOST = 'api.netlify.com'
const HOOK_PATH_PREFIX = '/build_hooks/'

/**
 * يتحقق من أن القيمة رابط خطّاف بناء Netlify ويعيده مع عنوان الإطلاق، أو يعيد سبب الرفض.
 * الدالة لا تستدعي إلا هذا المضيف وهذا المسار مهما كانت قيمة المتغير.
 * @param {string | undefined} raw
 * @returns {{ url: URL } | { skip: string }}
 */
export function resolveHook(raw) {
  if (!raw) return { skip: 'REBUILD_HOOK_URL غير مضبوط في متغيرات بيئة Netlify' }
  let url
  try { url = new URL(raw) } catch { return { skip: 'REBUILD_HOOK_URL ليس رابطاً صالحاً' } }
  if (url.protocol !== 'https:' || url.hostname !== HOOK_HOST || !url.pathname.startsWith(HOOK_PATH_PREFIX) || url.pathname.length === HOOK_PATH_PREFIX.length) {
    return { skip: 'REBUILD_HOOK_URL ليس رابط خطّاف بناء Netlify' }
  }
  const hook = new URL(`https://${HOOK_HOST}${url.pathname}`)
  hook.searchParams.set('trigger_title', 'scheduled daily rebuild')
  return { url: hook }
}

export default async () => {
  const hook = resolveHook(process.env.REBUILD_HOOK_URL)
  if ('skip' in hook) {
    console.log(`scheduled-rebuild: تخطٍّ — ${hook.skip}`)
    return new Response('skipped')
  }
  try {
    const res = await fetch(hook.url, { method: 'POST' })
    console.log(`scheduled-rebuild: الخطّاف أجاب ${res.status}`)
    return new Response(res.ok ? 'ok' : 'failed', { status: res.ok ? 200 : 502 })
  } catch (e) {
    console.log(`scheduled-rebuild: تعذّر استدعاء الخطّاف — ${e instanceof Error ? e.message : String(e)}`)
    return new Response('failed', { status: 502 })
  }
}

// يومياً 01:00 UTC (4 فجراً بتوقيت السعودية): بعد منتصف ليل الرياض، فيُبنى اليوم الجديد بتاريخه.
export const config = { schedule: '0 1 * * *' }
