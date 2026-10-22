// سجل انجراف الترجمة — المنطق النقي (بلا قراءة ملفات).
//
// العلّة: خطوط الترجمة الأربعة (zh/de/ru/ur) تأخذ الإنجليزية مصدراً وتكتب body_<lang>.
// إن تغيّر body_en بعدها (تعميق المتن، تصحيح) بقي body_<lang> قديماً بلا أي إشارة، وC22 يقيس
// الكتل الإنجليزية وحدها فلا يلتقط الفجوة. القفل (tools/translation/lock.json) يسجّل لكل زوج
// (معلم، لغة) بصمة body_en التي تُرجم منها المتن؛ وهذه الوحدة تقارن البصمة بالحالي.
//
// يستدعيها check-consistency.mjs (C73، تحذير لا إخفاق) وlock.mjs (البناء والتسجيل)،
// ويُختبر كسرها في الذاكرة.
import { createHash } from 'node:crypto';

export const LANGS = ['zh', 'de', 'ru', 'ur'];

// توحيد نهايات الأسطر إلى LF وقصّ الأطراف قبل البصمة: نسخة ويندوز بـautocrlf وCI على لينكس
// يجب أن يخرجا ببصمة واحدة.
export const normalizeBody = (s) => String(s ?? '').replace(/\r\n?/g, '\n').trim();
export const enSha = (bodyEn) => createHash('sha256').update(normalizeBody(bodyEn), 'utf8').digest('hex');

const has = (v) => typeof v === 'string' && v.trim() !== '';

// lock:    { "<slug_en>": { "<lang>": { enSha, at, baseline? } } }
// current: { "<slug_en>": { body_en: string, body_zh?: string, body_de?: string, ... } }
// النتيجة: { pairs, drifted, unregistered, orphaned }
//   pairs        — أزواج مسجَّلة سليمة المقابل (لها body_<lang> وبصمتها تطابق الحالي)
//   drifted      — [{ slug, lang, at, baseline }] البصمة المسجّلة تخالف body_en الحالي
//   unregistered — [{ slug, lang }] body_<lang> قائم بلا مدخل في القفل
//   orphaned     — [{ slug, lang, at }] مدخل في القفل بلا body_<lang> (أو بلا المعلم نفسه)
export function checkDrift(lock, current) {
  const drifted = [], unregistered = [], orphaned = [];
  let pairs = 0;
  const slugs = new Set([...Object.keys(lock ?? {}), ...Object.keys(current ?? {})]);
  for (const slug of [...slugs].sort()) {
    const cur = current?.[slug];
    const entry = lock?.[slug] ?? {};
    const nowSha = cur ? enSha(cur.body_en) : null;
    for (const lang of LANGS) {
      const e = entry[lang];
      const present = cur ? has(cur[`body_${lang}`]) : false;
      if (e && !present) { orphaned.push({ slug, lang, at: e.at }); continue; }
      if (!e && present) { unregistered.push({ slug, lang }); continue; }
      if (!e) continue;
      if (e.enSha !== nowSha) drifted.push({ slug, lang, at: e.at, baseline: e.baseline === true });
      else pairs++;
    }
  }
  return { pairs, drifted, unregistered, orphaned };
}

// رسائل C73: مصفوفة { level: 'warn'|'ok', msg }. لا إخفاق أبداً — الانجراف تحذير موقوف على قرار.
export function driftReport(result, { max = 12 } = {}) {
  const list = (xs, f) => {
    const shown = xs.slice(0, max).map(f).join(' · ');
    return xs.length > max ? `${shown} · …و${xs.length - max} أخرى` : shown;
  };
  const out = [];
  const { drifted, unregistered, orphaned, pairs } = result;
  if (drifted.length) {
    out.push({ level: 'warn', msg: `ترجمات منجرفة عن body_en: ${drifted.length} زوجاً — ${list(drifted, (d) => `${d.slug}/${d.lang} (قفل ${d.at}${d.baseline ? '، أساس مفترَض' : ''})`)} — أعِد ترجمتها بالخط ثم سجّلها: node tools/translation/lock.mjs record <slug_en> <lang>` });
  }
  if (unregistered.length) {
    out.push({ level: 'warn', msg: `body_<lang> غير مسجَّل في القفل: ${unregistered.length} زوجاً — ${list(unregistered, (d) => `${d.slug}/${d.lang}`)} — شغّل bootstrap أو record` });
  }
  if (orphaned.length) {
    out.push({ level: 'warn', msg: `قفل يتيم (مدخل بلا body_<lang> أو بلا معلم): ${orphaned.length} — ${list(orphaned, (d) => `${d.slug}/${d.lang} (${d.at})`)}` });
  }
  if (!out.length) out.push({ level: 'ok', msg: `${pairs} زوجاً مسجّلاً بلا انجراف` });
  return out;
}
