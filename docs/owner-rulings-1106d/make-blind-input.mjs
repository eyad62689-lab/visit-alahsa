// Cuts, from built dist pages, the visible text blocks that carry each applied edit, per language.
// Usage: node docs/owner-rulings-1106d/make-blind-input.mjs <stage> [distRoot]  -> out/<lg>/06-blind-input.on-<stage>.txt
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const [stage, distRoot = 'dist'] = process.argv.slice(2);
const BLOCK = new Set(['p', 'li', 'h1', 'h2', 'h3', 'h4', 'dd', 'dt', 'summary', 'td', 'th', 'figcaption', 'blockquote', 'div', 'section', 'details', 'ul', 'ol']);

// Character scanner: visible text split into blocks at block-level tags; script/style dropped.
export function blocks(html) {
  const out = []; let buf = ''; let i = 0;
  const flush = () => { const t = buf.replace(/\s+/g, ' ').trim(); if (t) out.push(t); buf = ''; };
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
    if (BLOCK.has(name) || name === 'br') flush();
    i = end + 1;
  }
  flush();
  return out.map((b) => b.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' '));
}

const htmlFiles = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? htmlFiles(p) : n === 'index.html' ? [p] : [];
});

for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) {
  const out = JSON.parse(readFileSync(`docs/owner-rulings-1106d/out/${lg}/${stage}.json`, 'utf8'));
  const extra = JSON.parse(readFileSync('docs/owner-rulings-1106d/attraction-cave-edits.json', 'utf8')).filter((e) => e.id.startsWith(`${lg}-`));
  const probes = [...out.items, { id: 'attr-cave', edits: stage === 'final' ? extra : [] }]
    .flatMap((it) => it.edits.map((e) => ({ id: it.id, probe: e.replace.replace(/\*\*|\*|\\"/g, '').replace(/^[\s'"-]+|[\s'"]+$/g, '') })));
  const pages = htmlFiles(join(distRoot, lg)).map((f) => ({ f, b: blocks(readFileSync(f, 'utf8')) }));
  const seen = new Set(); const lines = []; const missing = [];
  for (const { id, probe } of probes) {
    const key = probe.slice(0, 24);
    const hits = pages.flatMap(({ f, b }) => b.filter((x) => x.includes(key) && x.length < 2500).map((x) => ({ f, x })));
    if (!hits.length) { missing.push(`${id}: ${key}`); continue; }
    // the shortest block per page is the passage itself, not a wrapper
    const byPage = new Map();
    for (const h of hits) if (!byPage.has(h.f) || h.x.length < byPage.get(h.f).length) byPage.set(h.f, h.x);
    for (const x of byPage.values()) if (!seen.has(x)) { seen.add(x); lines.push(x); }
  }
  writeFileSync(`docs/owner-rulings-1106d/out/${lg}/06-blind-input.on-${stage}.txt`, lines.map((x, k) => `[${k + 1}] ${x}`).join('\n\n') + '\n', 'utf8');
  console.log(`${lg}: ${lines.length} passages${missing.length ? `; MISSING ${missing.join(' | ')}` : ''}`);
}
