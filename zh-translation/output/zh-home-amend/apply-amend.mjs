// node apply-amend.mjs <REPO> <BATCH_DIR> <file.json> — يطبّق دفعة zh-home-amend (قابل للإعادة)
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const edit = (rel, fn) => {
  const p = path.join(REPO, rel);
  const raw = fs.readFileSync(p, 'utf8');
  const crlf = raw.includes('\r\n');
  const out = fn(raw.replace(/\r\n/g, '\n'));
  fs.writeFileSync(p, crlf ? out.replace(/\n/g, '\r\n') : out);
};
const one = (s, re, rep, what) => {
  const m = s.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'));
  if (!m || m.length !== 1) throw new Error(`${what}: ${m ? m.length : 0} مطابقة`);
  return s.replace(re, rep);
};

// جملة البطل الصينية: السطر الأول lead: بعد «zh: {» … داخل gate
edit('src/data/home-copy.ts', (s) => one(s, /(  zh: \{[\s\S]*?gate: \{\n      title: '[^']*',\n      lead: )'[^']*'/, (_, a) => a + q(Z['gate.lead']), 'gate.lead'));
edit('src/data/home-chapters.ts', (s) => {
  s = one(s, /(  family: \{\n    ar: 'أضف إلى يومك[^\n]*\n    en: [^\n]*\n    zh: )'[^']*'/, (_, a) => a + q(Z['tip.family']), 'tip.family');
  s = one(s, /(  family: \{\n    ar: 'وفي يوم الساحل[^\n]*\n    en: [^\n]*\n    zh: )'[^']*'/, (_, a) => a + q(Z['tip.familyCoast']), 'tip.familyCoast');
  return s;
});
for (const [key, file] of [['att.qaisariyah.summary', 'qaisariyah'], ['att.najm-park.summary', 'najm-park']]) {
  edit(`src/content/attractions/${file}.md`, (s) => one(s, /^summary_zh: .*$/m, () => `summary_zh: "${Z[key].replace(/"/g, '\\"')}"`, key));
}
console.log('applied', FILE);
