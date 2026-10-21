// node cut-blind.mjs <REPO> <OUT_DIR> <page.html>... -- <BATCH_DIR:file.json>... — يقصّ نصّ صفحات /ur/ المبنية لمدخل القارئ
// الأعمى بترتيب العرض: العنوان والوصف، والأزرار موسومة، والأجوبة المطويّة، ونصوص قارئ الشاشة والرسائل المخفية حتى فعل
// (sr-only، hidden، data-empty/prefix/suffix، aria-label) في سطور موسومة. وما لا تصيّره الصفحة محلياً (نسخ الإنتاج ذات
// {fetchedLabel}) يُلحق في قسم موسوم من نصّ الدفعة نفسه. يُفشل نفسه إن غابت سلسلة من الدفعات عن المقصوص.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const [REPO, OUT] = args;
const sep = args.indexOf('--');
const pages = args.slice(2, sep);
const batches = args.slice(sep + 1).map((x) => { const i = x.lastIndexOf(':'); return [x.slice(0, i), x.slice(i + 1)]; });
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&#34;': '"' };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27|#34);/g, (e) => ENT[e]);
const strip = (s, re, rep = '') => { let p; do { p = s; s = s.replace(re, rep); } while (s !== p); return s; };
const cut = (rel) => {
  const h = fs.readFileSync(path.resolve(REPO, 'dist', rel), 'utf8');
  const title = decode(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  let body = h.match(/<main[\s\S]*?<\/main>/)[0];
  body = strip(strip(body, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi), /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
  const attrs = [];
  body = body.replace(/\s(aria-label|placeholder|data-empty|data-prefix|data-suffix|alt)="([^"]*)"/g, (m, a, v) => { if (v.trim()) attrs.push(`[${a}] ${decode(v)}`); return ' '; });
  body = body.replace(/<p class="faq-a"[^>]*>|<dd>/g, '\n[collapsed — shown when the question above is tapped] ');
  body = body.replace(/<a [^>]*class="btn[^"]*"[^>]*>/g, '\n[button → opens another page] ');
  body = body.replace(/<(span|p|div)[^>]*class="[^"]*sr-only[^"]*"[^>]*>/g, '\n[screen reader only] ');
  body = body.replace(/<(p|div|span)[^>]*\shidden[\s>][^>]*>?/g, '\n[hidden until a filter matches nothing] ');
  body = body.replace(/<\/t[dh]>\s*<t[dh][^>]*>/gi, ' | ');
  body = strip(strip(body, /<(h1|h2|h3|h4|p|li|div|section|header|nav|button|a|span|dt|dd|figcaption|summary|details|tr|caption|table|thead|tbody|ol|ul|aside|article|label|option|select|fieldset|legend)[^>]*>/gi, '\n'), /<[^>]*>/g);
  const lines = decode(body).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter((l) => l && !/^\[[^\]]+\]$/.test(l));
  return `# صفحہ: ${title}\n[تفصیل] ${desc}\n\n${lines.join('\n')}\n${attrs.length ? `\n[text the page gives screen readers and image descriptions, not shown on screen]\n${[...new Set(attrs)].join('\n')}\n` : ''}`;
};
let out = pages.map(cut).join('\n\n');
const fin = Object.assign({}, ...batches.map(([d, f]) => JSON.parse(fs.readFileSync(path.join(d, f), 'utf8')).strings));
// نسخ الإنتاج: تُعرض حين تُجلب بيانات خرائط Google (غائبة محلياً)
// (التاريخ، والتقييم وتسميته، وشارات الإغلاق والفتح وأوقات العمل) — تُلحق من نصّ الدفعة بوسم صريح
const LIVE = /(^|\.)(srcNote\.then|faqs\.6\.then\.[qa]|ratingLabel|closedPerm|closedTemp|openNow|closedNow|hoursLabel|hoursNote)$/;
const parts = (v) => v.split(/\{[^}]+\}|\n+/).map((x) => x.trim()).filter(Boolean);
const shown = (v) => parts(v).every((p) => out.includes(p));
const prod = Object.entries(fin).filter(([k, v]) => LIVE.test(k) && !shown(v));
const swap = prod.filter(([k]) => /faqs\.6\.then\.[qa]$/.test(k));
const rest = prod.filter(([k]) => !/faqs\.6\.then\.[qa]$/.test(k));
if (rest.length) out += `\n\n# [Shown on the live site only, when the site has fetched Google Maps data (a rating with its label, closure and open/closed badges, opening hours, the last-update date); «{fetchedLabel}» is a date the site writes in]\n${rest.map(([, v]) => v).join('\n')}\n`;
if (swap.length) out += `\n\n# [On the live site, the LAST question and answer of the FAQ above are REPLACED by the pair below — the two pairs never appear together: the one above is shown only while the site has no Google Maps data, this one only when it has]\n${swap.map(([, v]) => v).join('\n')}\n`;
const missing = Object.entries(fin).filter(([, v]) => !shown(v)).map(([k]) => k);
if (missing.length) { console.error('✗ سلاسل لم تبلغ المقصوص:', missing.join(' ')); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'blind-input.txt'), out);
console.log(`✓ blind-input.txt: ${out.length} حرفاً، ${pages.length} صفحة، كل السلاسل الـ${Object.keys(fin).length} حاضرة`);
