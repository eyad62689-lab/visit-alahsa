// node apply.mjs <lang> <file-in-each-batch> [--dry]
// يطبّق نصوص المرحلة هـ للغة واحدة من دفعاتها الأربع (ui · legal-1 · legal-2 · legal-3):
//  ui.ts (tmap.*) · كتل localize في ReportView/ReportThanksView/UnescoView/LegalView · SEO_DESC · LEGAL_SECTIONS_<LANG>.
// كل مرسى يُطابَق مرة واحدة بالضبط وإلا يتوقف بلا كتابة.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const Z = path.dirname(new URL(import.meta.url).pathname);
const [lang, file, flag] = process.argv.slice(2);
const dry = flag === '--dry';
const LANG_UP = lang.toUpperCase();
const S = {};
for (const b of ['ui', 'legal-1', 'legal-2', 'legal-3']) {
  const f = path.join(Z, `${lang}-${b}`, file === 'final' ? 'judge.json' : file.replace('{lang}', lang));
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  Object.assign(S, j.strings ?? j.final_strings);
}
const q = (s) => JSON.stringify(s);
const tpl = (s) => '`' + s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  .replace('{count}', '${comps.length}').replace('{names}', '${names.join(namesSep)}') + '`';
const writes = new Map();
const read = (p) => writes.get(p) ?? fs.readFileSync(p, 'utf8');
const once = (p, t, a) => { const n = t.split(a).length - 1; if (n !== 1) throw new Error(`${path.relative(REPO, p)}: المرسى يطابق ${n}: ${a.slice(0, 50)}`); };
const tag = `خط ${lang}-translation-pipeline (المرحلة هـ، 2026-09-26)`;

// 1) ui.ts — tmap.* في آخر كتلة اللغة
{
  const p = `${REPO}/src/i18n/ui.ts`;
  let t = read(p);
  const start = t.indexOf(`\n  ${lang}: {`);
  const end = t.indexOf('\n  } as Record<string, string>,', start);
  if (start < 0 || end < 0) throw new Error('ui.ts: كتلة اللغة');
  if (t.slice(start, end).includes("'tmap.title'")) throw new Error('ui.ts: tmap موجود سلفاً');
  const keys = Object.keys(S).filter((k) => k.startsWith('tmap.'));
  const ins = `\n    // ── الخريطة التضاريسية (${tag}) ──\n` + keys.map((k) => `    '${k}': ${q(S[k])},`).join('\n');
  t = t.slice(0, end) + ins + t.slice(end);
  writes.set(p, t);
}

// 2) كتل localize
function addBlock(view, body) {
  const p = `${REPO}/src/components/views/${view}`;
  let t = read(p);
  const c = t.indexOf('const C = localize(lang, {');
  const e = t.indexOf('\n});', c);
  if (c < 0 || e < 0) throw new Error(`${view}: localize`);
  if (t.slice(c, e).includes(`\n  ${lang}: {`)) throw new Error(`${view}: كتلة ${lang} موجودة سلفاً`);
  t = t.slice(0, e) + `\n  // ${tag}\n  ${lang}: {\n${body}\n  },` + t.slice(e);
  writes.set(p, t);
}
const pick = (prefix, keys, fmt = q) => keys.map((k) => `    ${k}: ${fmt(S[`${prefix}.${k}`])},`).join('\n');
addBlock('ReportView.astro', pick('report', ['eyebrow', 'title', 'lead', 'pageL', 'pagePh', 'msgL', 'msgPh', 'emailL', 'emailPh', 'submit', 'note']));
addBlock('ReportThanksView.astro', pick('thanks', ['title', 'd', 'back']));
addBlock('UnescoView.astro', [
  pick('unesco', ['title']), `    lead: ${tpl(S['unesco.lead'])},`,
  pick('unesco', ['comp', 'officialH', 'official', 'officialLink', 'seoTitle']), `    seoDesc: ${tpl(S['unesco.seoDesc'])},`,
].join('\n'));
const arr = (prefix) => Object.keys(S).filter((k) => k.startsWith(prefix + '.')).sort((a, b) => +a.split('.').pop() - +b.split('.').pop()).map((k) => S[k]);
addBlock('LegalView.astro', [
  `    title: ${q(S['legal.title'])},`, `    updated: ${q(S['legal.updated'])},`, `    introH: ${q(S['legal.introH'])},`,
  `    intro: [\n${arr('legal.intro').map((x) => `      ${q(x)},`).join('\n')}\n    ],`,
  `    sections: LEGAL_SECTIONS_${LANG_UP},`,
  `    closingH: ${q(S['legal.closingH'])},`,
  `    closing: [\n${arr('legal.closing').map((x) => `      ${q(x)},`).join('\n')}\n    ],`,
  `    contactPre: ${q(S['legal.contactPre'])},`, `    copyright: ${q(S['legal.copyright'])},`,
].join('\n'));
{
  const p = `${REPO}/src/components/views/LegalView.astro`;
  let t = read(p);
  const imp = "import { LEGAL_SECTIONS_AR, LEGAL_SECTIONS_EN";
  once(p, t, imp);
  t = t.replace(imp, `${imp}, LEGAL_SECTIONS_${LANG_UP}`);
  const a = '\n};\nconst seoDesc = SEO_DESC[lang]';
  once(p, t, a);
  t = t.replace(a, `\n  ${lang}: ${q(S['legal.seoDesc'])},${a}`);
  writes.set(p, t);
}

// 3) LEGAL_SECTIONS_<LANG> — بنية الإنجليزية نفسها
{
  const p = `${REPO}/src/data/legal.ts`;
  let t = read(p);
  if (t.includes(`LEGAL_SECTIONS_${LANG_UP}`)) throw new Error('legal.ts: الكتلة موجودة سلفاً');
  const secs = [];
  for (let i = 0; i < 6; i++) {
    const P = `legal.s${i}`;
    const subs = [];
    for (let j = 0; S[`${P}.sub${j}.h`] !== undefined; j++) {
      const u = { h: S[`${P}.sub${j}.h`] };
      for (const kind of ['before', 'list', 'after']) {
        const items = [];
        for (let k = 0; S[`${P}.sub${j}.${kind}.${k}`] !== undefined; k++) items.push(S[`${P}.sub${j}.${kind}.${k}`]);
        if (items.length) u[kind] = items;
      }
      subs.push(u);
    }
    secs.push({ n: S[`${P}.n`], h: S[`${P}.h`], ...(S[`${P}.lead`] !== undefined ? { lead: S[`${P}.lead`] } : {}), subs });
  }
  const body = secs.map((s) => {
    const subs = s.subs.map((u) => {
      const parts = [`h: ${q(u.h)}`];
      for (const kind of ['before', 'list', 'after']) if (u[kind]) parts.push(`${kind}: [\n${u[kind].map((x) => `          ${q(x)},`).join('\n')}\n        ]`);
      return `      { ${parts.join(',\n        ')} },`;
    }).join('\n');
    return `  {\n    n: ${q(s.n)}, h: ${q(s.h)},\n${s.lead !== undefined ? `    lead: ${q(s.lead)},\n` : ''}    subs: [\n${subs}\n    ],\n  },`;
  }).join('\n');
  t = t.replace(/\n*$/, '\n') + `\n// ${tag} — بنية LEGAL_SECTIONS_EN نفسها، والعربية الأصل المعتمد.\nexport const LEGAL_SECTIONS_${LANG_UP}: LegalSection[] = [\n${body}\n];\n`;
  writes.set(p, t);
}

for (const [p, t] of writes) { console.log((dry ? '[dry] ' : '') + 'write', path.relative(REPO, p)); if (!dry) fs.writeFileSync(p, t); }
