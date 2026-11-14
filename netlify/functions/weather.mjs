// طقس الهفوف الآن — يغذّي شارة الطقس في رأس الرئيسية ومؤثّر الفصل الأول.
//
// المصدر: Open-Meteo (رخصة CC BY 4.0؛ الإسناد ظاهر في لوحة الشارة). نقطة القياس إحداثيات
// سوق القيصرية من ملف معلمه (src/content/attractions/qaisariyah.md) — قلب الهفوف.
// المتصفح لا يتصل بأي جهة خارجية: يطلب /api/weather من الموقع نفسه، والردّ مخزّن على
// شبكة نتلايفي 30 دقيقة، فلا يصل Open-Meteo إلا نحو 48 طلباً في اليوم مهما كثر الزوّار.
//
// الحالة تُحسم هنا لا في المتصفح، كي تبقى قواعدها في مكان واحد:
//   rain  — رموز WMO للرذاذ والمطر والزخّات والعواصف (51–67، 71–77، 80–86، 95–99)
//   fog   — 45 و48
//   dust  — مدى الرؤية دون 5 كم مع غبار ≥ 100 ميكروغرام/م³ (ولا مطر ولا ضباب)؛ تركيز الغبار وحده
//           لا يكفي: نموذج CAMS يقرأ فوق 200 في أيام صافية بمدى رؤية 20 كم (مقيس 2026-11-14)
//   night — ليل بسماء صافية أو غائمة جزئياً (0–2)
//   hot   — نهار بحرارة ≥ 42° وسماء صافية أو غائمة جزئياً
//   cloud — 2 (غائم جزئياً) و3 (غائم)؛ والليل الغائم كلياً غائمٌ لا ليلٌ صافٍ
//   clear — ما سوى ذلك
// إن تعذّر الجلب يعود 204 بلا جسم، فتبقى الشارة مخفية ويبقى البطل كما هو.

const LAT = 25.37558
const LNG = 49.589
const FORECAST = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day,visibility&timezone=Asia%2FRiyadh`
const AIR = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LNG}&current=dust`

const inRange = (c, ranges) => ranges.some(([a, b]) => c >= a && c <= b)

export function classify({ code, isDay, temp, visibility, dust }) {
  if (inRange(code, [[51, 67], [71, 77], [80, 86], [95, 99]])) return 'rain'
  if (code === 45 || code === 48) return 'fog'
  if (Number.isFinite(visibility) && visibility < 5000 && Number.isFinite(dust) && dust >= 100) return 'dust'
  if (code <= 2 && !isDay) return 'night'
  if (code <= 2 && temp >= 42) return 'hot'
  if (code === 2 || code === 3) return 'cloud'
  return 'clear'
}

async function getJson(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(4000) })
  if (!r.ok) throw new Error(`upstream ${r.status}`)
  return r.json()
}

export default async (req) => {
  if (req.method !== 'GET') return new Response('Method Not Allowed', { status: 405 })
  try {
    const [fc, aq] = await Promise.allSettled([getJson(FORECAST), getJson(AIR)])
    if (fc.status !== 'fulfilled') throw fc.reason
    const c = fc.value.current ?? {}
    const dust = aq.status === 'fulfilled' ? Number(aq.value.current?.dust) : NaN
    const num = (v) => (Number.isFinite(Number(v)) ? Math.round(Number(v)) : null)
    const code = Number(c.weather_code)
    const temp = Number(c.temperature_2m)
    if (!Number.isFinite(code) || !Number.isFinite(temp)) throw new Error('incomplete')
    const body = {
      state: classify({ code, isDay: c.is_day === 1, temp, visibility: Number(c.visibility), dust }),
      code,
      temp: Math.round(temp),
      feels: num(c.apparent_temperature),
      humidity: num(c.relative_humidity_2m),
      wind: num(c.wind_speed_10m),
      time: typeof c.time === 'string' ? c.time : null,
    }
    return new Response(JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=600',
        'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=1800, stale-while-revalidate=600',
      },
    })
  } catch {
    // 204 لا 503: الطلب الفاشل يُطبع خطأً أحمر في وحدة تحكّم المتصفح فيُسقط بند «لا أخطاء في الكونسول»
    // في لايتهاوس، وغياب الطقس ليس خطأً في الصفحة. الردّ الفارغ مخزّن دقيقتين كي لا يُلحّ على المصدر.
    return new Response(null, {
      status: 204,
      headers: { 'Cache-Control': 'no-store', 'Netlify-CDN-Cache-Control': 'public, s-maxage=120' },
    })
  }
}

export const config = { path: '/api/weather' }
