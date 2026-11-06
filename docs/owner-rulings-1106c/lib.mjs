// أدوات مشتركة لدفعة owner-rulings-1106c: قراءة مفتاح من كتلة لغة في src/i18n/ui.ts واستبداله فيها.
// الكتلة تبدأ بـ`\n  <lg>: {` وتنتهي عند بداية الكتلة التالية (كتل zh/de/ru تُغلق بـ`} as Record` لا بـ`},`).
export const uiBlock = (s, lg) => {
  const a = s.indexOf(`\n  ${lg}: {`);
  if (a < 0) return null;
  const m = /\n {2}[a-z]{2}: \{/g;
  m.lastIndex = a + 1;
  const nx = m.exec(s);
  return [a, nx ? nx.index : s.length];
};
// سطر المفتاح في الكتلة: {span, q, value, line}؛ يرمي إن لم يوجد مرةً واحدةً بالضبط (إلا مع optional: يعيد null)
export const uiLine = (s, lg, key, optional = false) => {
  const span = uiBlock(s, lg);
  if (!span) throw new Error(`no ${lg} block`);
  const block = s.slice(span[0], span[1]);
  const hits = [...block.matchAll(new RegExp(`\\n {4}'${key.replace(/\./g, '\\.')}': (['"])((?:(?!\\1)[^\\\\]|\\\\.)*)\\1,`, 'g'))];
  if (optional && !hits.length) return null;
  if (hits.length !== 1) throw new Error(`${lg} ${key}: found ${hits.length}, expected 1`);
  const [line, q, raw] = hits[0];
  if (/\\/.test(raw)) throw new Error(`${lg} ${key}: escapes in the value are not handled`);
  return { span, q, value: raw, line: line.slice(1) };
};
// الجملة الأخيرة من فقرة: الرأس حتى آخر علامة وقف قبلها (تشملها)، والذيل بعدها بلا مسافة بادئة
export const lastSentence = (text) => {
  const body = text.slice(0, -1);
  const i = Math.max(body.lastIndexOf('. '), body.lastIndexOf('。'), body.lastIndexOf('۔ '));
  if (i < 0) throw new Error('no sentence boundary');
  const end = body[i] === '。' ? i + 1 : i + 1;
  return { head: text.slice(0, end), tail: text.slice(end).trim() };
};
