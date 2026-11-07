// Writes out/<lg>/<stage>.json values ({ items: [{ id, value }] }) into the Palm Village attraction file and
// the language's Palm Village event entry. Every replacement is anchored on its field key and must match once.
// Usage: node docs/palm-village-1107/apply.mjs <stage> [lg ...]   e.g. apply.mjs 05  |  apply.mjs final tr
import { readFileSync, writeFileSync } from 'node:fs';

const MD = 'src/content/attractions/palm-village.md';
const EV = 'src/data/events.ts';
const [stage, ...only] = process.argv.slice(2);
const langs = only.length ? only : ['zh', 'de', 'ru', 'ur', 'tr'];
const text = { [MD]: readFileSync(MD, 'utf8'), [EV]: readFileSync(EV, 'utf8') };
const yq = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const sq = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
let bad = 0;
const once = (hay, needle, what) => {
  const k = hay.split(needle).length - 1;
  if (k !== 1) { console.error(`${what}: anchor occurs ${k} times`); bad++; return false; }
  return true;
};

for (const lg of langs) {
  const pack = JSON.parse(readFileSync(`${lg}-translation/output/palm-village-1107/pack.json`, 'utf8'));
  const out = JSON.parse(readFileSync(`docs/palm-village-1107/out/${lg}/${stage}.json`, 'utf8'));
  const val = (id) => {
    const v = out.items.find((x) => x.id === id)?.value;
    if (typeof v !== 'string' || !v.trim() || /[\r\n]/.test(v)) { console.error(`${lg} ${id}: missing or multi-line value`); bad++; return undefined; }
    return v;
  };
  const curOf = (id) => pack.items.find((x) => x.id === id).current;

  // event entry: the 'palm-village' block whose related link carries /<lg>/
  const ev = text[EV];
  const block = [...ev.matchAll(/'palm-village': \{[\s\S]*?\n {2}\},/g)].map((m) => m[0]).find((b) => b.includes(`/${lg}/attractions/palm-village/`));
  if (!block || block.includes('after: {')) { console.error(`${lg}: event block missing or already has after`); bad++; continue; }
  let nb = block;
  for (const [id, key] of [['event-time', 'time'], ['event-span', 'span']]) {
    const a = `${key}: '${curOf(id)}'`, v = val(id);
    if (v !== undefined && once(nb, a, `${lg} ${id}`)) nb = nb.replace(a, () => `${key}: '${sq(v)}'`);
  }
  const t = val('event-after-time'), s = val('event-after-span');
  const eol = ev.includes('\r\n') ? '\r\n' : '\n';
  const spanLine = nb.split(eol).find((l) => /\bspan: '/.test(l));
  if (t !== undefined && s !== undefined && spanLine) {
    const indent = spanLine.match(/^\s*/)[0];
    nb = nb.replace(spanLine, () => `${spanLine}${eol}${indent}after: { time: '${sq(t)}', span: '${sq(s)}' },`);
  }
  text[EV] = ev.replace(block, () => nb);

  // attraction file: body paragraphs verbatim; other fields anchored on key: "current"
  let md = text[MD];
  for (const id of ['body-next-edition', 'body-tickets']) {
    const c = curOf(id), v = val(id);
    if (v !== undefined && once(md, c, `${lg} ${id}`)) md = md.replace(c, () => yq(v));
  }
  for (const [id, key] of [['card-dates', `value_${lg}`], ['card-fees', `value_${lg}`], ['faq-q', `q_${lg}`],
    ['faq-a', `a_${lg}`], ['cta-label', `label_${lg}`], ['cta-note', `note_${lg}`]]) {
    const a = `${key}: "${curOf(id)}"`, v = val(id);
    if (v !== undefined && once(md, a, `${lg} ${id}`)) md = md.replace(a, () => `${key}: "${yq(v)}"`);
  }
  text[MD] = md;
}
if (bad) { console.error(`${bad} problem(s), nothing written`); process.exit(1); }
for (const [f, t] of Object.entries(text)) writeFileSync(f, t, 'utf8');
console.log(`applied ${stage}: ${langs.join(' ')}`);
