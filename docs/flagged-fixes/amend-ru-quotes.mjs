// تعديل لاحق لحاكم الروسية (ملحق 07): «в районе „Золотой пояс“» ← «в районе «Золотой пояс»» (قاعدة التنصيص: «ёлочки»
// في المستوى الأعلى). يُشغَّل بعد apply.mjs وfinish-glossary.mjs: يستبدل النص في body_ru وفي زوج tm المضاف، ويتحقق أن
// body_ru صار يساوي final.json حرفياً. يُخفق قبل أي كتابة إن لم يجد النص القديم مرةً واحدةً.
//   node docs/flagged-fixes/amend-ru-quotes.mjs <root> [--dry]
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2] && path.resolve(process.argv[2]);
const DRY = process.argv.includes('--dry');
if (!ROOT) { console.error('usage: amend-ru-quotes.mjs <root> [--dry]'); process.exit(2); }
const yaml = createRequire(path.join(ROOT, 'package.json'))('js-yaml');
const FROM = 'в районе „Золотой пояс“', TO = 'в районе «Золотой пояс»';
const MD = path.join(ROOT, 'src/content/dining/7st.md'), TM = path.join(ROOT, 'ru-translation/memory/tm.json');
const md = readFileSync(MD, 'utf8'), tmRaw = readFileSync(TM, 'utf8');
const fin = JSON.parse(readFileSync(`${HERE}/out/ru/final.json`, 'utf8')).positions.find((p) => p.id === 'ru-7st-body');
const count = (s, n) => s.split(n).length - 1;
const fails = [];
if (count(md, FROM) !== 1) fails.push(`7st.md: «${FROM}» found ${count(md, FROM)} times`);
if (count(tmRaw, FROM) !== 1) fails.push(`tm.json: «${FROM}» found ${count(tmRaw, FROM)} times`);
if (!fin.proposed.includes(TO) || fin.proposed.includes(FROM)) fails.push('final.json does not carry the amended form');
const md2 = md.replace(FROM, () => TO), tm2 = tmRaw.replace(FROM, () => TO);
const body = yaml.load(md2.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]).body_ru;
if (body !== fin.proposed) fails.push('body_ru after the amendment differs from final.json');
JSON.parse(tm2);
if (fails.length) { for (const f of fails) console.error('FAIL ' + f); console.error('nothing written'); process.exit(1); }
if (!DRY) { writeFileSync(MD, md2, 'utf8'); writeFileSync(TM, tm2, 'utf8'); }
console.log(`${DRY ? 'DRY ' : ''}amended 7st.md body_ru and the ru tm pair; body_ru equals final.json`);
