// أدوات مشتركة لألعاب الاكتشاف: عدد صحيح عشوائي بلا انحياز، ومسار داخلي آمن لقيم الحمولة.

/** عدد صحيح في [0، n) من مولّد التشفير: قناع بتّي ثم رفض ما يتجاوز n، فلا انحياز. */
export function randInt(n) {
  if (!(Number.isInteger(n) && n > 1)) return 0;
  let mask = 1;
  while (mask < n) mask = mask * 2;
  mask = mask - 1;
  const buf = new Uint32Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    const x = buf[0] & mask;
    if (x < n) return x;
  }
}

/** مسار داخلي من الموقع نفسه بمقاطع مرمّزة، وإلا نص فارغ — يمنع أي مخطط (javascript: وأمثاله) أو نطاق آخر. */
export function sitePath(p) {
  const s = typeof p === 'string' ? p : '';
  if (!s.startsWith('/') || s.startsWith('//')) return '';
  const parts = s.split('/').filter(Boolean).map((seg) => encodeURIComponent(seg));
  const tail = s.endsWith('/') && parts.length ? '/' : '';
  return '/' + parts.join('/') + tail;
}
