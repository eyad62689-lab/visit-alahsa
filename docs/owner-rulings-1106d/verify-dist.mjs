// Checks built pages: every applied replacement is visible in its language's dist, and no replaced old text survives.
// Usage: node docs/owner-rulings-1106d/verify-dist.mjs [distRoot] [--break]
//   --break corrupts one visible probe per language in memory (never on disk) and expects every language to fail.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const BREAK = args.includes('--break');
const distRoot = args.find((a) => !a.startsWith('--')) ?? 'dist';
const BLOCK = /^(p|li|h[1-6]|dd|dt|summary|td|th|figcaption|blockquote|div|section|details|ul|ol|br)$/;

function visible(html) {
  let buf = ''; let i = 0;
  while (i < html.length) {
    if (html[i] !== '<') { buf += html[i++]; continue; }
    const end = html.indexOf('>', i);
    if (end < 0) break;
    const tag = html.slice(i + 1, end);
    const name = tag.replace(/^\//, '').split(/[\s/]/)[0].toLowerCase();
    if ((name === 'script' || name === 'style') && !tag.startsWith('/')) {
      const close = html.indexOf(`</${name}`, end);
      i = close < 0 ? html.length : html.indexOf('>', close) + 1;
      continue;
    }
    if (BLOCK.test(name)) buf += '\n';
    i = end + 1;
  }
  return buf.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/[ \t]+/g, ' ');
}
const htmlFiles = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? (n.length === 2 && dir === distRoot ? [] : htmlFiles(p)) : n === 'index.html' ? [p] : [];
});
const clean = (s) => s.replace(/\*\*|\*|\\"/g, '').replace(/^[\s'"-]+|[\s'"]+$/g, '');

const sets = {};
const src = JSON.parse(readFileSync('docs/owner-rulings-1106d/source-edits.json', 'utf8'));
for (const e of src) {
  const lg = e.file.includes('-ar.') || e.file.endsWith('ar.json') || e.id.endsWith('-ar') ? 'ar' : 'en';
  (sets[lg] ??= []).push({ id: e.id, now: clean(e.replace), old: clean(e.find) });
}
for (const e of JSON.parse(readFileSync('docs/owner-rulings-1106d/attraction-cave-edits.json', 'utf8'))) {
  (sets[e.id.slice(0, 2)] ??= []).push({ id: e.id, now: clean(e.replace), old: clean(e.find) });
}
for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) {
  const fin = JSON.parse(readFileSync(`docs/owner-rulings-1106d/out/${lg}/final.json`, 'utf8'));
  for (const it of fin.items) for (const e of it.edits) (sets[lg] ??= []).push({ id: `${lg}-${it.id}`, now: clean(e.replace), old: clean(e.find) });
}

let failedLangs = 0;
for (const [lg, list] of Object.entries(sets)) {
  const dir = lg === 'ar' ? distRoot : join(distRoot, lg);
  let text = htmlFiles(dir).map((f) => visible(readFileSync(f, 'utf8'))).join('\n');
  if (BREAK) text = text.split(list[0].now.slice(0, 20)).join('#BROKEN#');
  const bad = [];
  for (const { id, now, old } of list) {
    const probe = now.slice(0, 20);
    if (!text.includes(probe)) bad.push(`${id}: new text not visible «${probe}»`);
    // old text only counts if it is not contained in the new text (pure insertions keep the old words)
    if (!now.includes(old) && old.length >= 8 && text.includes(old)) bad.push(`${id}: old text still visible «${old}»`);
  }
  if (bad.length) failedLangs++;
  console.log(`${bad.length ? 'FAIL' : 'OK  '} ${lg} (${list.length} checks)${bad.length ? '\n  ' + bad.join('\n  ') : ''}`);
}
const n = Object.keys(sets).length;
if (BREAK) { console.log(`break test: ${failedLangs}/${n} caught`); process.exit(failedLangs === n ? 0 : 1); }
console.log(failedLangs ? `${failedLangs}/${n} languages failed` : `OK ${n}/${n}`);
process.exit(failedLangs ? 1 : 0);
