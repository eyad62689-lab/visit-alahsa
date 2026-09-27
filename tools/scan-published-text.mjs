#!/usr/bin/env node
// Scan the built site (dist/) for terms that must not appear in published text.
//
// Report-only: prints findings and always exits 0. It is not wired into the
// build yet.
//
// What is scanned
//   HTML files: visible text, the attributes alt / title / aria-label, the
//   content attribute of <meta>, HTML comments, and JSON-LD blocks
//   (<script type="application/ld+json">). Other <script> bodies (minified JS)
//   and <style> blocks are not scanned: their identifiers are not user-visible.
//   Other files: sitemap.xml, robots.txt, llms.txt and every .json / .txt /
//   .xml / .geojson / .webmanifest file in dist, as plain text.
//   The pagefind/ directory is skipped (generated, compressed search index).
//
// Matching rules
//   - Latin terms: case-sensitive, whole word (no letter/digit/underscore on
//     either side). A straight apostrophe in a term also matches U+2019.
//   - Arabic terms: substring match on the text as published. Diacritics are
//     NOT removed from the scanned text, so a fully vocalised word does not
//     match its bare form (e.g. a vocalised quotation stays exempt). A term that
//     itself carries diacritics also matches its bare spelling. A term whose
//     last word is a single letter requires a non-letter after it.
//   - robots.txt: lines starting with "User-agent:" are skipped (crawler names).
//
// Usage
//   node tools/scan-published-text.mjs [--dist dist] [--json out.json] [--redact]

import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const argVal = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : def;
};
const DIST = path.resolve(argVal('--dist', 'dist'));
const JSON_OUT = argVal('--json', null);
// --redact prints term ids (F01…, S01…) instead of the terms themselves, so the
// table can be shared without repeating the list.
const REDACT = args.includes('--redact');

// Term lists (encoded). Decoded at runtime into two groups.
const ENCODED = {
  forbidden:
    'WyLYpdmK2KfYryIsIkV5YWQiLCLZg9mE2YjYryIsIkNsYXVkZSIsIkFudGhyb3BpYyIsItmG2YXZiNiw2Kwg2YLYsdin2LHYp9iqIiwi2YXYsdin2KzYudipINin2YTZhdmI2YLYuSIsItmI2KvZitmC2Kkg2KfZhNiq2YbZgdmK2LAiLCLYqtmC2LHZitixINin2YTZhdix2KfYrNi52KkiLCLZhdmB2KrZkdi0Iiwi2KfZhNit2LLZhdipIiwi2KfZhNmC2KfYudiv2Kkg2YIiLCLYqNit2LPYqCDYp9mE2YLYsdin2LEiLCLYqNi52K8g2KfZhNmF2LHYp9is2LnYqSIsItiq2YUg2KfZhNiq2K3ZgtmCIiwi2YTZhSDZitmP2KrYrdmC2Y7ZkdmCIiwiVmVyaWZpZWQiLCJyZXZpZXdlciIsImRlY2lzaW9uIiwiaW50ZXJuYWwiLCJUT0RPIiwiRklYTUUiXQ==',
  stale:
    'WyLYqtin2LHZitiuINin2YTYqtit2YLZgiIsItiq2K3ZgtmCINmF2KjYp9i02LEiLCLZhdiz2YjYr9ipINiv2YTZitmEIiwiQXBwcm92ZWQgZHJhZnQiLCLYqtij2YPZitivINmB2LHZitmCIiwiQ29uZmlybWVkIGJ5IHRoZSBWaXNpdCBBbC1BaHNhIHRlYW0iLCLYrNmI2KfYq9mJIiwi2K/ZiNmC2KkiLCJMZW1vbiBGYXJtIiwi2KzZiNis2YQiLCLYp9mE2K/Zgdi52Kkg2KfZhNij2YjZhNmJIiwidmlzYXNuZXdzIiwi2YXYs9is2K8g2KfZhNis2YXYudipINmB2Yog2KfZhNmF2K/ZitmG2KkiLCJKdW11J2FoIE1vc3F1ZSIsItin2YTYqNit2YrYsdin2Kog2KfZhNi32KjZiti52YrYqSIsIm5hdHVyYWwgbGFrZXMiLCIxNCDZg9mFwrIiLCIxNzg5Il0=',
};
const decode = (b64) => JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));

const ARABIC_LETTER = '\\u0621-\\u064A\\u066E-\\u06D3\\u06FA-\\u06FC';
const DIACRITICS = /[ً-ٰٟ]/g;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function termPattern(term) {
  const isArabic = /[؀-ۿ]/.test(term);
  if (!isArabic) {
    const body = escapeRe(term).replace(/'/g, "['’]");
    return new RegExp(`(?<![A-Za-z0-9_])${body}(?![A-Za-z0-9_])`, 'g');
  }
  const variants = new Set([term, term.replace(DIACRITICS, '')]);
  const words = term.replace(DIACRITICS, '').split(/\s+/);
  const tail = words[words.length - 1].length <= 1 ? `(?![${ARABIC_LETTER}])` : '';
  const alt = [...variants].map(escapeRe).join('|');
  return new RegExp(`(?:${alt})${tail}`, 'g');
}

const GROUPS = Object.fromEntries(
  Object.entries(ENCODED).map(([g, b64]) => [g, decode(b64).map((t, i) => ({ id: g[0].toUpperCase() + String(i + 1).padStart(2, '0'), term: t, re: termPattern(t) }))]),
);

// ── extraction ──────────────────────────────────────────────────────────────
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (m, e) => {
    if (e[0] === '#') {
      const cp = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(cp) ? String.fromCodePoint(cp) : m;
    }
    return ENTITIES[e] ?? m;
  });
}

const isAsciiLetter = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

// Index of the "<" of the closing tag </name ...> at or after `from`
// (tag name compared case-insensitively), or -1.
function findClose(html, from, name) {
  for (let k = html.indexOf('<', from); k !== -1; k = html.indexOf('<', k + 1)) {
    if (html[k + 1] !== '/') continue;
    const cand = html.slice(k + 2, k + 2 + name.length).toLowerCase();
    const after = html[k + 2 + name.length];
    if (cand === name && (after === undefined || after === '>' || /\s/.test(after))) return k;
  }
  return -1;
}

// End index (position of ">") of the tag starting at `start`, honouring quotes.
function tagEnd(html, start) {
  let quote = null;
  for (let j = start + 1; j < html.length; j++) {
    const c = html[j];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") quote = c;
    else if (c === '>') return j;
  }
  return html.length;
}

// Context-aware single pass over the document: comments, raw-text elements
// (script/style) and tags are consumed by position, never by pattern
// replacement, so the remaining text is exactly what a browser renders as text.
function extractHtml(html) {
  const chunks = [];
  let text = '';
  let i = 0;
  while (i < html.length) {
    if (html.startsWith('<!--', i)) {
      const end = html.indexOf('-->', i + 4);
      const stop = end === -1 ? html.length : end;
      chunks.push(['comment', html.slice(i + 4, stop)]);
      i = end === -1 ? html.length : end + 3;
      text += ' ';
      continue;
    }
    const next = html[i + 1];
    if (html[i] === '<' && next !== undefined && (isAsciiLetter(next) || next === '/' || next === '!')) {
      const end = tagEnd(html, i);
      const src = html.slice(i + 1, end);
      i = end + 1;
      text += ' ';
      if (src[0] === '/' || src[0] === '!') continue;
      let n = 0;
      while (n < src.length && !/[\s/>]/.test(src[n])) n++;
      const tag = src.slice(0, n).toLowerCase();
      const attrs = src.slice(n);
      if (tag === 'script' || tag === 'style') {
        const close = findClose(html, i, tag);
        const bodyEnd = close === -1 ? html.length : close;
        if (tag === 'script' && /type\s*=\s*["']?application\/ld\+json/i.test(attrs)) {
          chunks.push(['jsonld', html.slice(i, bodyEnd)]);
        }
        i = close === -1 ? html.length : tagEnd(html, close) + 1;
        continue;
      }
      for (const a of attrs.matchAll(/\s(alt|title|aria-label|content)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
        const name = a[1].toLowerCase();
        if (name === 'content' && tag !== 'meta') continue;
        chunks.push([`attr:${name}`, decodeEntities(a[2] ?? a[3] ?? '')]);
      }
      continue;
    }
    text += html[i];
    i++;
  }
  chunks.push(['text', decodeEntities(text).replace(/\s+/g, ' ')]);
  return chunks;
}

function extractPlain(rel, body) {
  if (path.basename(rel).toLowerCase() === 'robots.txt') {
    body = body
      .split(/\r?\n/)
      .filter((l) => !/^\s*User-agent\s*:/i.test(l))
      .join('\n');
  }
  return [['file', body]];
}

// ── walk ────────────────────────────────────────────────────────────────────
const PLAIN_EXT = new Set(['.json', '.txt', '.xml', '.geojson', '.webmanifest']);
async function* walk(dir) {
  for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (path.relative(DIST, p) === 'pagefind') continue;
      yield* walk(p);
    } else yield p;
  }
}

function snippet(s, idx, len) {
  const a = Math.max(0, idx - 40);
  const b = Math.min(s.length, idx + len + 40);
  return s.slice(a, b).replace(/\s+/g, ' ').trim();
}

async function main() {
  try {
    await fs.access(DIST);
  } catch {
    console.log(`scan-published-text: ${DIST} not found — build first. Nothing scanned.`);
    return;
  }
  const findings = {}; // group -> term -> { files:Set, hits, channels:Set, sample }
  for (const g of Object.keys(GROUPS)) findings[g] = Object.fromEntries(GROUPS[g].map((t) => [t.term, null]));
  const idOf = Object.fromEntries(Object.values(GROUPS).flat().map((t) => [t.term, t.id]));
  const label = (term) => (REDACT ? idOf[term] : term);
  let scanned = 0;

  for await (const f of walk(DIST)) {
    const ext = path.extname(f).toLowerCase();
    const rel = path.relative(DIST, f).split(path.sep).join('/');
    let chunks;
    if (ext === '.html') chunks = extractHtml(await fs.readFile(f, 'utf8'));
    else if (PLAIN_EXT.has(ext)) chunks = extractPlain(rel, await fs.readFile(f, 'utf8'));
    else continue;
    scanned++;
    for (const [g, terms] of Object.entries(GROUPS)) {
      for (const { term, re } of terms) {
        for (const [channel, s] of chunks) {
          re.lastIndex = 0;
          let m;
          while ((m = re.exec(s))) {
            const rec = (findings[g][term] ??= { files: new Set(), hits: 0, channels: new Set(), sample: null });
            rec.files.add(rel);
            rec.hits++;
            rec.channels.add(channel);
            rec.sample ??= { file: rel, channel, context: snippet(s, m.index, m[0].length) };
          }
        }
      }
    }
  }

  const TITLES = { forbidden: 'Forbidden terms', stale: 'Stale wording' };
  const out = { dist: DIST, scannedFiles: scanned, groups: {} };
  console.log(`scan-published-text: ${scanned} files scanned in ${DIST}\n`);
  for (const [g, recs] of Object.entries(findings)) {
    const rows = Object.entries(recs);
    const hitRows = rows.filter(([, r]) => r);
    out.groups[g] = rows.map(([term, r]) => ({
      id: idOf[term],
      term: REDACT ? undefined : term,
      files: r ? r.files.size : 0,
      hits: r ? r.hits : 0,
      channels: r ? [...r.channels].sort() : [],
      sample: r ? (REDACT ? { file: r.sample.file, channel: r.sample.channel } : r.sample) : null,
    }));
    console.log(`## ${TITLES[g] ?? g} — ${hitRows.length}/${rows.length} terms found\n`);
    console.log('| term | files | hits | channels | sample page |');
    console.log('|---|---:|---:|---|---|');
    for (const [term, r] of rows) {
      if (!r) console.log(`| ${label(term)} | 0 | 0 | | |`);
      else console.log(`| ${label(term)} | ${r.files.size} | ${r.hits} | ${[...r.channels].sort().join(', ')} | ${r.sample.file} |`);
    }
    console.log('');
  }
  if (JSON_OUT) {
    await fs.writeFile(JSON_OUT, JSON.stringify(out, null, 2));
    console.log(`JSON written to ${JSON_OUT}`);
  }
}

main().catch((e) => {
  console.error('scan-published-text: error', e);
}).finally(() => {
  process.exitCode = 0;
});
