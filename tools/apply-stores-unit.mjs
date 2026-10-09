// تطبيق وحدة ترجمة معتمدة لصفحة دليل المتاجر الإلكترونية على المستودع.
//
// المدخل: ملف JSON بمخطط وحدة الترجمة (lang, seo, lead, sections, ui, stores[{id,url,name,platform,description}], faq)
// كما يخرجه حاكم خط الترجمة بعد الاعتماد (≥ العتبة). لا يُستدعى على مسودة.
// المخرج:
//   src/data/stores-directory.<lang>.json   — seo/sections/stores/faq (بلا url: المصدر العربي هو مرجع الروابط)
//   src/i18n/ui.ts                          — مفاتيح stores.* في كتلة اللغة (تُضاف أو تُحدَّث)
//   src/pages/<lang>/online-stores/index.astro — ملف المسار إن لم يوجد
//
// التشغيل: node tools/apply-stores-unit.mjs <en|zh|de|ru>   (الوحدة في tools/stores-units/<lang>.json)

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// الوسيط رمز لغة من قائمة مغلقة لا مساراً حراً: الوحدة المعتمدة تُودَع في tools/stores-units/<lang>.json
// (لا مسار من سطر الأوامر يصل إلى readFile — Path Traversal)
const LANGS = ['en', 'zh', 'de', 'ru'];
const langArg = process.argv[2];
if (!LANGS.includes(langArg)) { console.error(`الاستعمال: node tools/apply-stores-unit.mjs <${LANGS.join('|')}>`); process.exit(1); }
const lang = LANGS[LANGS.indexOf(langArg)];
const file = join(ROOT, 'tools', 'stores-units', `${lang}.json`);

const unit = JSON.parse(await readFile(file, 'utf8'));
if (unit.lang !== lang) throw new Error(`الوحدة ${file} تحمل lang=${unit.lang}`);
const master = JSON.parse(await readFile(join(ROOT, 'src/data/stores-directory.ar.json'), 'utf8'));

// ── تحقق بنيوي قبل أي كتابة ──
const ids = new Set(master.stores.map((s) => s.id));
const seen = new Set();
for (const s of unit.stores) {
  if (!ids.has(s.id)) throw new Error(`متجر غير معروف: ${s.id}`);
  if (seen.has(s.id)) throw new Error(`متجر مكرّر: ${s.id}`);
  seen.add(s.id);
  const m = master.stores.find((x) => x.id === s.id);
  if (s.url && s.url !== m.url) throw new Error(`رابط ${s.id} تغيّر في الوحدة — الروابط لا تُترجم`);
  for (const k of ['name', 'platform', 'description']) if (!s[k] || !s[k].trim()) throw new Error(`${s.id}: ${k} فارغ`);
}
if (seen.size !== ids.size) throw new Error(`الوحدة ناقصة: ${seen.size}/${ids.size} متجراً`);
if (unit.faq.length !== master.faq.length) throw new Error(`FAQ ${unit.faq.length}/${master.faq.length}`);
if (unit.sections.length !== master.sections.length || unit.sections.some((s, i) => s.id !== master.sections[i].id)) throw new Error('الأقسام لا تطابق المصدر');
const UI_KEYS = ['all', 'filterLabel', 'search', 'searchLabel', 'empty', 'visit', 'visitAccount', 'directOrder', 'platform', 'disclaimer', 'faq', 'shotAlt', 'logoAlt'];
for (const k of UI_KEYS) if (!unit.ui?.[k]) throw new Error(`ui.${k} غائب`);
if (!unit.lead?.includes('{n}')) throw new Error('lead بلا {n}');
if (!unit.ui.shotAlt.includes('{name}') || !unit.ui.logoAlt.includes('{name}')) throw new Error('shotAlt/logoAlt بلا {name}');
const hasArabic = (s) => /[؀-ۿ]/.test(s);
const allText = JSON.stringify({ seo: unit.seo, lead: unit.lead, sections: unit.sections, ui: unit.ui, faq: unit.faq, stores: unit.stores.map((s) => [s.name, s.platform, s.description]) });
if (hasArabic(allText)) throw new Error('نص عربي متبقٍّ في الوحدة');
if (/[٠-٩]/.test(allText)) throw new Error('أرقام عربية-هندية في الوحدة');
for (const bad of ['84 ']) if (allText.includes(bad)) throw new Error(`العدد 84 في الوحدة`);

// ── 1) ملف البيانات ──
const out = {
  lang,
  seo: unit.seo,
  sections: unit.sections.map((s) => ({ id: s.id, title: s.title })),
  stores: unit.stores.map((s) => ({ id: s.id, name: s.name, platform: s.platform, description: s.description })),
  faq: unit.faq.map((f) => ({ q: f.q, a: f.a })),
};
await writeFile(join(ROOT, `src/data/stores-directory.${lang}.json`), JSON.stringify(out, null, 2) + '\n', 'utf8');

// ── 2) ui.ts: كتلة اللغة — تُحدَّث المفاتيح الموجودة وتُضاف الغائبة بعد آخر مفتاح stores.* أو بعد list.searchLabel ──
const uiPath = join(ROOT, 'src/i18n/ui.ts');
let ui = await readFile(uiPath, 'utf8');
const EOL = ui.includes('\r\n') ? '\r\n' : '\n';
const blockStart = ui.indexOf(`${EOL}  ${lang}: {${EOL}`);
if (blockStart < 0) throw new Error(`كتلة ${lang} غير موجودة في ui.ts`);
// نهاية الكتلة = بداية كتلة اللغة التالية أو خاتمة الكائن — كتل zh/de/ru تُغلق بـ"} as Record<...>," لا "},"
const nextBlock = /\r?\n(?:  [a-z]{2}: \{|\} as const)/g;
nextBlock.lastIndex = blockStart + 4;
const nb = nextBlock.exec(ui);
if (!nb) throw new Error(`لا نهاية لكتلة ${lang}`);
const blockEnd = nb.index;
let block = ui.slice(blockStart, blockEnd);
const esc = (v) => v.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const entries = { ...Object.fromEntries(UI_KEYS.map((k) => [k, unit.ui[k]])), lead: unit.lead };
for (const [k, v] of Object.entries(entries)) {
  const key = `stores.${k}`;
  // [ \t]* لا \s*: في JS يطابق ^ متعدد الأسطر بعد \r أيضاً، فكان \s* يبتلع \n ويلصق السطور (CRLF)
  const re = new RegExp(`^([ \\t]*)'${key.replace('.', '\\.')}':\\s*'(?:[^'\\\\]|\\\\.)*',[^\\r\\n]*$`, 'm');
  const line = `    '${key}': '${esc(v)}',`;
  if (re.test(block)) block = block.replace(re, line);
  else {
    // بعد آخر stores.* إن وُجد، وإلا بعد list.searchLabel
    const lastStores = [...block.matchAll(/^[ \t]*'stores\.[^']+':[^\r\n]*$/gm)].pop();
    const anchor = lastStores ? lastStores : block.match(/^[ \t]*'list\.searchLabel':[^\r\n]*$/m);
    if (!anchor) throw new Error(`لا مرساة في كتلة ${lang}`);
    const at = anchor.index + anchor[0].length;
    block = block.slice(0, at) + EOL + line + block.slice(at);
  }
}
ui = ui.slice(0, blockStart) + block + ui.slice(blockEnd);
await writeFile(uiPath, ui, 'utf8');

// ── 3) ملف المسار ──
const routeDir = join(ROOT, `src/pages/${lang}/online-stores`);
const routeFile = join(routeDir, 'index.astro');
// إنشاء بعلم wx (يفشل إن وُجد) بدل access() ثم كتابة — لا نافذة سباق (js/file-system-race)
await mkdir(routeDir, { recursive: true });
try {
  await writeFile(routeFile, `---${EOL}import StoresDirectoryView from '../../../components/views/StoresDirectoryView.astro';${EOL}---${EOL}<StoresDirectoryView lang="${lang}" />${EOL}`, { encoding: 'utf8', flag: 'wx' });
} catch (e) { if (e.code !== 'EEXIST') throw e; }
console.log(`✓ ${lang}: data + ${Object.keys(entries).length} مفتاح ui + ${routeFile.replace(ROOT, '')}`);
