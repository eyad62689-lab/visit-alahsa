// نصُّ الصفحة كما يقرؤه الزائر — ماسحٌ محرفاً محرفاً لا تعبيرٌ نمطي (سابقة touch-click؛ CodeQL يرفض تجريد HTML بنمط).
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ', '&apos;': "'" };
const RAW = new Set(['script', 'style', 'svg', 'noscript', 'template']);
const BLOCK = new Set(['p', 'div', 'section', 'article', 'li', 'h1', 'h2', 'h3', 'h4', 'tr', 'td', 'th', 'figcaption', 'blockquote', 'details', 'summary', 'dt', 'dd', 'title']);

/** يعيد النصّ المرئي سطوراً (كتلة لكل سطر، خلايا الجدول بـ`| `، الأزرار بين قوسين). */
export const visible = (html) => {
  let out = '';
  let i = 0;
  const n = html.length;
  while (i < n) {
    const c = html[i];
    if (c !== '<') { out += c; i++; continue; }
    if (html.startsWith('<!--', i)) { const e = html.indexOf('-->', i + 4); i = e === -1 ? n : e + 3; continue; }
    let j = i + 1;
    const closing = html[j] === '/';
    if (closing) j++;
    let name = '';
    while (j < n && /[A-Za-z0-9]/.test(html[j])) name += html[j++];
    name = name.toLowerCase();
    let k = j, q = '';
    while (k < n) {
      const d = html[k];
      if (q) { if (d === q) q = ''; } else if (d === '"' || d === "'") q = d; else if (d === '>') break;
      k++;
    }
    const tagEnd = k < n ? k + 1 : n;
    if (!closing && RAW.has(name)) {
      const close = html.toLowerCase().indexOf(`</${name}`, tagEnd);
      if (close === -1) { i = n; continue; }
      const ce = html.indexOf('>', close);
      i = ce === -1 ? n : ce + 1;
      continue;
    }
    if (!closing && name === 'iframe') out += '\n[embedded map]\n';
    if (!closing && name === 'button') out += '\n[button → ';
    if (closing && name === 'button') out += ']\n';
    if (name === 'br' || (closing && BLOCK.has(name)) || (!closing && name === 'td')) out += '\n';
    if (!closing && name === 'td') out += '| ';
    i = tagEnd;
  }
  out = out.replace(/&#?\w+;/g, (m) => ENT[m] ?? (/^&#(\d+);$/.test(m) ? String.fromCodePoint(+m.slice(2, -1)) : m));
  return out.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).filter(Boolean).join('\n');
};

/** النصّ المرئي سطراً واحداً — لفحوص الاحتواء. */
export const flat = (html) => visible(html).replace(/\s+/g, ' ');
