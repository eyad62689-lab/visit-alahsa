// يقصّ مدخل القارئ الأعمى لدفعة «دليل التأشيرات»: نصّ اللغة الهدف وحده من ملف المرحلة 5، بلا مصدر ولا مفاتيح.
//   node tools/translation/cut-visa-blind.mjs <lang>
import { readFileSync, writeFileSync } from 'node:fs';
const lang = process.argv[2];
const dir = `${lang}-translation/output/visa-guide`;
const s = JSON.parse(readFileSync(`${dir}/${lang}-05.json`, 'utf8')).strings;
const pack = JSON.parse(readFileSync(`${dir}/pack.json`, 'utf8')).strings;
const strip = (t) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
const lines = [];
const sec = (keys) => keys.filter((k) => s[k] !== undefined).map((k) => strip(s[k]));
const keys = Object.keys(pack);
lines.push(sec(['h1']).join(''), '', ...sec(['lead', 'feesLine', 'verifyLine', 'updatedLine']), '');
lines.push(...sec(['intro.h', 'intro.parts']), '');
lines.push(...sec(['table.h', 'table.caption']), keys.filter((k) => k.startsWith('table.head.')).map((k) => s[k]).join(' | '));
for (let i = 0; i < 8; i++) lines.push(keys.filter((k) => k.startsWith(`table.rows.${i}.`)).map((k) => s[k]).join(' | '));
lines.push('');
for (const id of ['tourist', 'gcc', 'umrah', 'stopover', 'family', 'business', 'package', 'uk']) {
  lines.push(s[`routes.${id}.h`], [s[`routes.${id}.who.label`], s[`routes.${id}.who.text`]].filter(Boolean).join(' '));
  if (s[`routes.${id}.validity.text`]) lines.push(`${s[`routes.${id}.validity.label`]} ${s[`routes.${id}.validity.text`]}`);
  lines.push(`[${s[`routes.${id}.cta.label`]}]`, '');
}
lines.push(...sec(['arrive.h', 'arrive.air', 'arrive.land', 'arrive.more']), '', s['next.h']);
for (let i = 0; i < 5; i++) lines.push(`• ${s[`next.items.${i}.label`]} ${strip(s[`next.items.${i}.parts`])}`);
lines.push('', s['faq.h']);
for (let i = 0; i < 7; i++) lines.push(s[`faq.items.${i}.q`], s[`faq.items.${i}.a`], '');
lines.push(s['links.h'], keys.filter((k) => k.startsWith('links.head.')).map((k) => s[k]).join(' | '));
for (let i = 0; i < 9; i++) lines.push(`${s[`links.rows.${i}.route`]} | … | ${s[`links.rows.${i}.org`]}`);
lines.push('', `[${s['ui.foot.l.visa']}] [${s['ui.plan.visa']}]`, '', `<title>${s['seo.title']}</title>`, `<meta description>${s['seo.description']}`);
writeFileSync(`${dir}/blind-input.txt`, lines.join('\n') + '\n');
console.log(`${dir}/blind-input.txt`, lines.length, 'lines');
