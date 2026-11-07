// Builds <lg>-translation/output/palm-village-1107/pack.json: each item is one field of the Palm Village
// attraction or event text, with the published value in that language (current), the English value
// before and after the source edit, the Arabic value, and — for the new "after" fields — the language's
// own wording of the same field for the Lomi exhibition as precedent.
// Usage: node docs/palm-village-1107/make-packs.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const MD = 'src/content/attractions/palm-village.md';
const EV = 'src/data/events.ts';
const cur = (f) => readFileSync(f, 'utf8');
const base = (f) => execFileSync('git', ['show', `origin/main:${f}`], { encoding: 'utf8', maxBuffer: 1 << 26 });

// Quoted scalar starting at s[i] (just after the opening quote q), escapes kept as written
const scanQuoted = (s, i, q) => {
  let j = i;
  while (j < s.length && s[j] !== q) j += s[j] === '\\' ? 2 : 1;
  return j < s.length ? s.slice(i, j) : undefined;
};
// value of `k: <q>…<q>` where k is a whole key (not the tail of a longer one)
const field = (s, k, q) => {
  const needle = `${k}: ${q}`;
  for (let i = s.indexOf(needle); i >= 0; i = s.indexOf(needle, i + 1)) {
    if (i === 0 || !/\w/.test(s[i - 1])) return scanQuoted(s, i + needle.length, q);
  }
};
// YAML double-quoted scalar of key k at line start (with optional indent and list dash)
const yaml = (t, k) => {
  const l = t.split(/\r?\n/).find((x) => x.trimStart().replace(/^- /, '').startsWith(`${k}: "`));
  return l === undefined ? undefined : field(l, k, '"');
};
const row = (t, label) => t.split(/\r?\n/).find((l) => l.includes(`label: "${label}"`));
const inRow = (r, k) => field(r, k, '"');
const firstFaq = (t) => t.slice(t.indexOf('\nfaq:'), t.indexOf('\n  - q: "من ينظّم'));
const para = (body, n) => body.split('\\n\\n')[n];

// event text block for a language: the 'palm-village' entry whose related href carries the language
const evBlock = (t, key, hrefLang) => {
  const open = `'${key}': {`;
  for (let i = t.indexOf(open); i >= 0; i = t.indexOf(open, i + 1)) {
    const end = t.indexOf('\n  },', i);
    const b = t.slice(i, end + 5);
    if (b.includes('slug:') && (hrefLang ? b.includes(`/${hrefLang}/`) : true)) return b;
  }
};
const evField = (b, k) => field(b, k, "'");
const afterField = (b, k) => { const a = b.slice(b.indexOf('after: {')); return evField(a, k); };
const evAr = (t) => [...t.matchAll(/'palm-village': \{[\s\S]*?\n {2}\},/g)].map((m) => m[0]).find((b) => b.includes("slug: 'قرية-النخيل'"));
const lomiBlock = (t, lg) => [...t.matchAll(/ {2}lomi: \{[\s\S]*?\n {2}\},/g)].map((m) => m[0]).find((b) => b.includes(`/${lg}/`) || (lg === 'en' && b.includes('Hasawi Lomi Exhibition')));

const mdNow = cur(MD), mdOld = base(MD), evNow = cur(EV), evOld = base(EV);
const enEvNow = evBlock(evNow, 'palm-village', 'en'), enEvOld = evBlock(evOld, 'palm-village', 'en');
const arEv = evAr(evNow);

for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) {
  const b = evBlock(evNow, 'palm-village', lg);
  const lomi = lomiBlock(evNow, lg);
  const items = [];
  const add = (id, file, current, en_before, en_after, ar, extra = {}) => {
    if (current !== undefined && !cur(file).includes(current)) throw new Error(`${lg} ${id}: current not in ${file}`);
    items.push({ id, file, current, en_before, en_after, ar, ...extra });
  };
  add('event-time', EV, evField(b, 'time'), evField(enEvOld, 'time'), evField(enEvNow, 'time'), evField(arEv, 'time'));
  add('event-span', EV, evField(b, 'span'), evField(enEvOld, 'span'), evField(enEvNow, 'span'), evField(arEv, 'span'));
  add('event-after-time', EV, undefined, undefined, afterField(enEvNow, 'time'), afterField(arEv, 'time'),
    { precedent_lomi: { en: afterField(lomiBlock(evNow, 'en'), 'time'), [lg]: afterField(lomi, 'time') } });
  add('event-after-span', EV, undefined, undefined, afterField(enEvNow, 'span'), afterField(arEv, 'span'),
    { precedent_lomi: { en: afterField(lomiBlock(evNow, 'en'), 'span'), [lg]: afterField(lomi, 'span') } });

  const body = yaml(mdNow, `body_${lg}`);
  const enBodyOld = yaml(mdOld, 'body_en'), enBodyNow = yaml(mdNow, 'body_en');
  const arBody = mdNow.split(/\r?\n---\r?\n/)[1] ?? '';
  const arSec = (h) => arBody.slice(arBody.indexOf(h), arBody.indexOf('\n## ', arBody.indexOf(h) + 3));
  add('body-next-edition', MD, para(body, 3), para(enBodyOld, 3), para(enBodyNow, 3), arSec('## النسخة الجديدة'));
  add('body-tickets', MD, para(body, 4), para(enBodyOld, 4), para(enBodyNow, 4), arSec('## التذاكر'));

  const dNow = row(mdNow, 'المواعيد'), dOld = row(mdOld, 'المواعيد');
  const fNow = row(mdNow, 'الرسوم'), fOld = row(mdOld, 'الرسوم');
  add('card-dates', MD, inRow(dNow, `value_${lg}`), inRow(dOld, 'value_en'), inRow(dNow, 'value_en'), inRow(dNow, 'value'));
  add('card-fees', MD, inRow(fNow, `value_${lg}`), inRow(fOld, 'value_en'), inRow(fNow, 'value_en'), inRow(fNow, 'value'));

  const qNow = firstFaq(mdNow), qOld = firstFaq(mdOld);
  add('faq-q', MD, yaml(qNow, `q_${lg}`), yaml(qOld, 'q_en'), yaml(qNow, 'q_en'), yaml(qNow, 'q'));
  add('faq-a', MD, yaml(qNow, `a_${lg}`), yaml(qOld, 'a_en'), yaml(qNow, 'a_en'), yaml(qNow, 'a'));
  add('cta-label', MD, yaml(mdNow, `label_${lg}`), yaml(mdOld, 'label_en'), yaml(mdNow, 'label_en'), yaml(mdNow, 'label'));
  add('cta-note', MD, yaml(mdNow, `note_${lg}`), yaml(mdOld, 'note_en'), yaml(mdNow, 'note_en'), yaml(mdNow, 'note'));

  for (const it of items) for (const k of ['en_after', 'ar']) if (!it[k]) throw new Error(`${lg} ${it.id}: empty ${k}`);
  const dir = `${lg}-translation/output/palm-village-1107`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/pack.json`, JSON.stringify({ lang: lg, batch: 'palm-village-1107', items }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${items.length} items`);
}
