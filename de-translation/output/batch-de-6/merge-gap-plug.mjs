// دمجُ سدِّ الثغرة المعجمية في termbase.json قبل الترجمة (أمرُ المالك 2026-09-12).
// يفشل عند أي تكرار، ويطبع جردةً قابلةً لإعادة القياس.
import fs from 'node:fs';

const TB = 'de-translation/glossary/termbase.json';
const GAP = 'de-translation/output/batch-de-6/termbase-gap-plug.json';

const raw = fs.readFileSync(TB, 'utf8');
const EOL = raw.includes('\r\n') ? '\r\n' : '\n';
const tb = JSON.parse(raw);
const gap = JSON.parse(fs.readFileSync(GAP, 'utf8'));

const before = tb.terms.length;
const existingEn = new Set(tb.terms.map((t) => t.en));
const dupes = gap.terms.filter((t) => existingEn.has(t.en));
if (dupes.length) {
  console.error('DUPLICATE en keys, nothing written:', dupes.map((d) => d.en));
  process.exit(1);
}

for (const t of gap.terms) {
  for (const k of ['en', 'de', 'artikel', 'source', 'note']) {
    if (!t[k] || !String(t[k]).trim()) {
      console.error(`entry "${t.en}" missing required field "${k}" — nothing written`);
      process.exit(1);
    }
  }
  tb.terms.push(t);
}

const out = JSON.stringify(tb, null, 2).split('\n').join(EOL) + EOL;
fs.writeFileSync(TB, out);
console.log(`terms ${before} -> ${tb.terms.length} (+${gap.terms.length})`);
for (const t of gap.terms) console.log('  +', t.artikel.split(' ')[0].padEnd(4), t.de.padEnd(26), '<=', t.en);
