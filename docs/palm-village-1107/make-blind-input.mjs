// Cuts, from built dist pages, the visible text blocks of the Palm Village attraction and event pages that
// carry this batch's values, per language. Run directly; verify-dist imports only blocks().
// Usage: node docs/palm-village-1107/make-blind-input.mjs <stage> [distRoot]  -> out/<lg>/06-blind-input.on-<stage>.txt
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const BLOCK = new Set(['p', 'li', 'h1', 'h2', 'h3', 'h4', 'dd', 'dt', 'summary', 'td', 'th', 'figcaption', 'blockquote', 'div', 'section', 'details', 'ul', 'ol', 'a', 'span']);

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
  const ENT = { amp: '&', quot: '"', '#39': "'", lt: '<', gt: '>', nbsp: ' ' };
  return out.map((b) => b.replace(/&(amp|quot|#39|lt|gt|nbsp);/g, (_, k) => ENT[k]));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [stage, distRoot = 'dist'] = process.argv.slice(2);
  const unq = (s) => s.replace(/\\"/g, '"').replace(/\\'/g, "'");
  for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) {
    const out = JSON.parse(readFileSync(`docs/palm-village-1107/out/${lg}/${stage}.json`, 'utf8'));
    const pages = [`${lg}/attractions/palm-village`, `${lg}/events/palm-village`]
      .map((p) => blocks(readFileSync(`${distRoot}/${p}/index.html`, 'utf8')));
    const seen = new Set(); const lines = []; const missing = [];
    for (const it of out.items) {
      const key = unq(it.value).slice(0, 24);
      const hits = pages.flatMap((b) => b.filter((x) => x.includes(key) && x.length < 2500));
      if (!hits.length) { missing.push(it.id); continue; }
      const x = hits.reduce((a, b) => (b.length < a.length ? b : a)); // the passage itself, not a wrapper
      if (!seen.has(x)) { seen.add(x); lines.push(x); }
    }
    writeFileSync(`docs/palm-village-1107/out/${lg}/06-blind-input.on-${stage}.txt`, lines.map((x, k) => `[${k + 1}] ${x}`).join('\n\n') + '\n', 'utf8');
    console.log(`${lg}: ${lines.length} passages${missing.length ? `; not on pages: ${missing.join(' ')}` : ''}`);
  }
}
