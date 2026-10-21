// node cut-blind.mjs <REPO> <BATCH_DIR> <file.json> — يقصّ نصّ /ur/plan-your-trip/ المبنية لمدخل القارئ الأعمى،
// بترتيب العرض، مع العنوان والوصف. الأجوبة المطويّة تُوسم بما لا يُرى عند فتح الصفحة، وصفوف الجدول تُضمّ
// خلاياها بـ « | ». يُفشل نفسه إن غابت سلسلة من الدفعة عن المقصوص.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const fin = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&#34;': '"' };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27|#34);/g, (e) => ENT[e]);
const strip = (s, re, sep = '') => { let p; do { p = s; s = s.replace(re, sep); } while (s !== p); return s; };
const h = fs.readFileSync(path.resolve(REPO, 'dist/ur/plan-your-trip/index.html'), 'utf8');
const title = decode(h.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
const desc = decode(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
const main = h.match(/<main[\s\S]*?<\/main>/)[0];
let body = strip(strip(main, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi), /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
body = body.replace(/<p class="faq-a"[^>]*>/g, '\n[collapsed — shown when the question above is tapped] ');
// الأزرار تُوسم: زرّ عارٍ قرأه القارئ الأول عنواناً بلا محتوى تحته
body = body.replace(/<a [^>]*class="btn[^"]*"[^>]*>/g, '\n[button → opens another page] ');
body = body.replace(/<\/t[dh]>\s*<t[dh][^>]*>/gi, ' | ');
body = strip(strip(body, /<(h1|h2|h3|h4|p|li|div|section|header|nav|button|a|dt|dd|figcaption|summary|details|tr|caption|table|thead|tbody|ol|ul|aside|article)[^>]*>/gi, '\n'), /<[^>]*>/g);
const lines = decode(body).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
const out = `# صفحہ: ${title}\n[تفصیل] ${desc}\n\n${lines.join('\n')}\n`;
const missing = Object.entries(fin).filter(([, v]) => !out.includes(v)).map(([k]) => k);
if (missing.length) { console.error('✗ سلاسل لم تبلغ المقصوص:', missing.join(' ')); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'blind-input.txt'), out);
console.log(`✓ blind-input.txt: ${out.length} حرفاً، ${lines.length} سطراً، كل السلاسل الـ${Object.keys(fin).length} حاضرة`);
