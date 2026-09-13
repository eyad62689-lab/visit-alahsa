#!/usr/bin/env node
// يبني نصَّ القارئ الأعمى: الألمانيةُ وحدها، مصفوفةً كصفحةِ وجهةٍ سياحية.
// لا إنجليزية، لا عربية، لا أسماء حقول، لا ذكر لترجمةٍ ولا لدفعة.
// الاستعمال: node build-blind-input.mjs <fields.stageN.json> <out.md>

import fs from 'node:fs';

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) { console.error('usage: build-blind-input.mjs <in.json> <out.md>'); process.exit(2); }

const { fields } = JSON.parse(fs.readFileSync(inPath, 'utf8'));

// ترتيبٌ ثابتٌ لا يكشف شيئاً عن ترتيب المصدر.
const ORDER = ['delfoon-lake', 'hubail-lake', 'kanzan', 'kanzan-park', 'thulaim'];

const out = [];
out.push('# Al-Ahsa – Sehenswürdigkeiten');
out.push('');

for (const slug of ORDER) {
  const p = fields[slug];
  if (!p) continue;
  out.push('---');
  out.push('');
  out.push('## ' + p.title_de);
  out.push('');
  out.push('**' + p.kicker_de + '** · ' + p.area_de);
  out.push('');
  out.push('*' + p.summary_de + '*');
  out.push('');
  out.push(p.body_de);
  out.push('');
  if (p.practical && p.practical.length) {
    out.push('### Gut zu wissen');
    out.push('');
    for (const it of p.practical) {
      out.push('- **' + it.label_de + ':** ' + it.value_de);
      out.push('  <small>' + it.source_de + '</small>');
    }
    out.push('');
  }
  if (p.faq && p.faq.length) {
    out.push('### Häufige Fragen');
    out.push('');
    for (const q of p.faq) {
      out.push('**' + q.q_de + '**');
      out.push('');
      out.push(q.a_de);
      out.push('');
    }
  }
}

fs.writeFileSync(outPath, out.join('\n'), 'utf8');

// حارسٌ: لا يتسرَّب حرفٌ عربيٌّ ولا صينيٌّ ولا سيريليٌّ إلى نصِّ القارئ.
const txt = fs.readFileSync(outPath, 'utf8');
const leak = txt.match(/[؀-ۿ一-鿿Ѐ-ӿ]/g);
if (leak) { console.error('LEAK: non-Latin characters in blind input: ' + [...new Set(leak)].join(' ')); process.exit(1); }
console.log('wrote ' + outPath + '  (' + txt.split(/\s+/).length + ' words, no script leak)');
