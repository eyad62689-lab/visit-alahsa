// node cut-blind.mjs <REPO> <BATCH_DIR> <file.json> — يقصّ نص الرئيسية المبنية بلغة الدفعة (pack.lang) لمدخل القارئ الأعمى،
// ويركّب المسارات التسعة وفقراتها من حمولة JSON (يبنيها السكربت في المتصفح). يُفشل نفسه إن غابت سلسلة من الدفعة.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const L = JSON.parse(fs.readFileSync(path.join(DIR, 'pack.json'), 'utf8')).lang;
const fin = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const H = {
  de: { body: 'Seitentext (in Reihenfolge)', aria: 'Bildschirmleser-Beschriftungen und weitere Schaltflächenzustände', routes: 'Kapitel 6: Routen nach Beantwortung der drei Fragen (alle 9 Kombinationen)', tips: 'Absätze unter der Route je nach Reisebegleitung', coast: 'nur bei Routen mit Küstentag angehängt', saved: 'Kennzeichnung gemerkter Orte in der Route' },
  ru: { body: 'Текст страницы (по порядку)', aria: 'Подписи для экранного диктора и другие состояния кнопок', routes: 'Глава 6: маршруты после ответа на три вопроса (все 9 сочетаний)', tips: 'Абзацы под маршрутом в зависимости от спутников', coast: 'добавляется только к маршрутам с днём на побережье', saved: 'Метка сохранённых мест в маршруте' },
  ur: { body: 'صفحے کا متن (ترتیب سے)', aria: 'اسکرین ریڈر کے لیبل اور بٹنوں کی دیگر حالتیں', routes: 'باب 6: تین سوالوں کے جواب کے بعد راستے (تمام 9 صورتیں)', tips: 'ہم سفر کے لحاظ سے راستے کے نیچے پیراگراف', coast: 'صرف ساحل والے دن کے راستوں میں شامل', saved: 'راستے میں محفوظ کی گئی جگہوں کا نشان' },
  zh: { body: '页面正文（按页面顺序）', aria: '屏幕阅读器标签与按钮的其他状态', routes: '第 6 章：回答三个问题后显示的路线（全部 9 种组合）', tips: '路线下方按同行者显示的段落', coast: '仅在含海岸日的路线中追加', saved: '已收藏景点加入路线时的标签' },
}[L];
if (!H) throw new Error(`لا عناوين للغة ${L}`);
const h = fs.readFileSync(path.join(REPO, `dist/${L}/index.html`), 'utf8');
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'", '&#34;': '"' };
const decode = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27|#34);/g, (e) => ENT[e]);
const strip = (s, re, sep = '') => { let p; do { p = s; s = s.replace(re, sep); } while (s !== p); return s; };
const payload = JSON.parse(decode(h.match(/<script type="application\/json" data-plan-data>([\s\S]*?)<\/script>/)[1]));
const main = h.match(/<main[\s\S]*?<\/main>/)[0] + (h.match(/<nav class="rail"[\s\S]*?<\/nav>/)?.[0] ?? '') + (h.match(/<div class="sbar"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? '');
// بلا إزالة تكرار: تسمية واحدة في موضعين (اسم الفصل في الشريط وفي زرّ) تظهر في الموضعين (درس zh-home-1 #37)
const attrs = [...main.matchAll(/(aria-label|data-tx-open|data-tx-plan|data-labels)="([^"]+)"/g)].map((m) => `[${m[1]}] ${decode(m[2]).replace(/\|/g, ' · ')}`);
let body = strip(strip(main, /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/gi), /<style\b[^>]*>[\s\S]*?<\/style\b[^>]*>/gi);
body = strip(strip(body, /<(h1|h2|h3|p|li|div|section|header|nav|span|button|legend|label|article|text)[^>]*>/gi, '\n'), /<[^>]*>/g);
const lines = decode(body).split('\n').map((l) => l.trim()).filter(Boolean);
const P = payload.L;
let out = `# ${H.body}\n\n${lines.join('\n')}\n\n# ${H.aria}\n\n${attrs.join('\n')}\n\n# ${H.routes}\n`;
for (const t of Object.values(payload.templates)) {
  out += `\n## ${t.title}\n`;
  t.days.forEach((stops, i) => { out += `${P.days[i]}\n` + stops.map((s) => `  [${s.kind === 'trail' ? P.trail : P.place}] ${s.name}`).join('\n') + '\n'; });
  if (t.note) out += `${t.note}\n`;
}
out += `\n# ${H.tips}\n` + Object.entries(payload.tips).map(([k, v]) => `[${k}] ${v}`).join('\n') + '\n';
for (const [k, v] of Object.entries(payload.coastTips ?? {})) out += `[${k} — ${H.coast}] ${payload.tips[k]}${payload.sep}${v}\n`;
out += `\n# ${H.saved}\n[${P.saved}] …\n`;
const missing = Object.entries(fin).filter(([, v]) => !out.includes(v)).map(([k]) => k);
if (missing.length) { console.error('✗ سلاسل لم تبلغ المقصوص:', missing.join(' ')); process.exit(1); }
fs.writeFileSync(path.join(DIR, 'blind-input.txt'), out);
console.log(`✓ blind-input.txt: ${out.length} حرفاً، كل السلاسل الـ${Object.keys(fin).length} حاضرة`);
