// node cut-blind.mjs <REPO> <BATCH_DIR> <zh-file> — يقصّ نص /zh/ المبني لمدخل القارئ الأعمى، ويُفشل نفسه
// إن لم تبلغ كلُّ سلسلة من الدفعة النصَّ المقصوص (المسار والفقرات يبنيها السكربت من حمولة JSON فتُركَّب هنا).
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const fin = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
let h = fs.readFileSync(path.join(REPO, 'dist/zh/index.html'), 'utf8');
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&#34;': '"' };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27|#34);/g, (e) => ENT[e]);
const strip = (s, re, sep = '') => { let p; do { p = s; s = s.replace(re, sep); } while (s !== p); return s; };

const payload = JSON.parse(decode(h.match(/<script type="application\/json" data-plan-data>([\s\S]*?)<\/script>/)[1]));
const main = h.match(/<main[\s\S]*?<\/main>/)[0] + (h.match(/<nav class="rail"[\s\S]*?<\/nav>/)?.[0] ?? '') + (h.match(/<div class="sbar"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? '');
const attrs = [...main.matchAll(/(?:aria-label|data-tx-open|data-tx-plan|data-labels)="([^"]+)"/g)].map((m) => decode(m[1]).replace(/\|/g, ' · '));
let body = strip(strip(main, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi), /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
body = strip(strip(body, /<(h1|h2|h3|p|li|div|section|header|nav|span|button|legend|label|article|text)[^>]*>/gi, '\n'), /<[^>]*>/g);
const lines = decode(body).split('\n').map((l) => l.trim()).filter(Boolean);

let out = '# 页面正文（按页面顺序）\n\n' + lines.join('\n') + '\n\n# 屏幕阅读器标签与按钮的其他状态\n\n' + [...new Set(attrs)].join('\n') + '\n\n# 第 6 章：回答三个问题后显示的路线（全部 9 种组合）\n';
const L = payload.L;
for (const [k, t] of Object.entries(payload.templates)) {
  out += `\n## ${k}\n${t.title}\n`;
  t.days.forEach((stops, i) => { out += `${L.days[i]}\n` + stops.map((s) => `  [${s.kind === 'trail' ? L.trail : L.place}] ${s.name}`).join('\n') + '\n'; });
  if (t.note) out += `${t.note}\n`;
}
out += `\n# 路线下方按同行者显示的段落\n` + Object.entries(payload.tips).map(([k, v]) => `[${k}] ${v}`).join('\n') + `\n\n# 已收藏景点加入路线时的标签\n[${L.saved}] …\n`;

const missing = Object.entries(fin).filter(([, v]) => !out.includes(v)).map(([k]) => k);
// سطر المصادر قطعٌ متجاورة في سطر واحد
if (missing.length) { console.error('✗ سلاسل لم تبلغ المقصوص:', missing.join(' ')); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'blind-input.txt'), out);
console.log(`✓ blind-input.txt: ${out.length} حرفاً، كل السلاسل الـ${Object.keys(fin).length} حاضرة`);
