// node apply.mjs <REPO> <BATCH_DIR> <file.json> <seo.json> — يحقن نصوص الرئيسية بلغة الدفعة (pack.lang) في
// home-copy.ts وhome-chapters.ts وoasis-facts.ts، ويضمّ اللغة إلى HOME_LANGS. قابل للإعادة: يستبدل كتلة اللغة إن وُجدت.
// seo.json: { title, description, place, country, comment } منقولة من HomeView كما مرّت بخطّها.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE, SEO] = process.argv.slice(2);
const L = JSON.parse(fs.readFileSync(path.join(DIR, 'pack.json'), 'utf8')).lang;
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const seo = JSON.parse(fs.readFileSync(SEO, 'utf8'));
const batch = path.basename(DIR);
// قيمة TS بين علامتين مفردتين: الشرطة العكسية أولاً ثم التنصيص
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const need = (k) => { if (typeof Z[k] !== 'string') throw new Error(`مفتاح ناقص: ${k}`); return q(Z[k]); };
const rd = (p) => { const s = fs.readFileSync(path.join(REPO, p), 'utf8'); return { s: s.replace(/\r\n/g, '\n'), crlf: s.includes('\r\n') }; };
const wr = (p, o) => fs.writeFileSync(path.join(REPO, p), o.crlf ? o.s.replace(/\n/g, '\r\n') : o.s);
const count = (s, a) => s.split(a).length - 1;
const once = (o, a, b) => { const n = count(o.s, a); if (n !== 1) throw new Error(`مرساة ${n}x: ${a.slice(0, 60)}`); o.s = o.s.replace(a, () => b); };
const RTL = ['ar', 'ur'].includes(L);

// 1) home-copy.ts
const hc = rd('src/data/home-copy.ts');
const rail = ['ch-gate', 'ch-water', 'ch-qarah', 'ch-map', 'ch-memory', 'ch-plan', 'ch-finale'].map((id) => `['${id}', ${need(`rail.${id}`)}]`).join(', ');
const opts = (k, vals) => vals.map((v) => `['${v}', ${need(`plan.${k}.${v}`)}]`).join(', ');
const BLOCK = `  // ${seo.comment ?? ''} — نصوص الفصول من خط ${L}-translation-pipeline (دفعة ${batch})
  ${L}: {
    seo: {
      title: ${q(seo.title)},
      description: ${q(seo.description)},
      place: ${q(seo.place)},
      country: ${q(seo.country)},
    },
    arrow: '${RTL ? '←' : '→'}',
    sep: ' ',
    paths: { attractions: '/${L}/attractions/', map: '/${L}/map/', plan: '/${L}/plan-your-trip/', myTrip: '/${L}/plan/', trails: '/${L}/trails/' },
    gate: {
      title: ${need('gate.title')},
      lead: ${need('gate.lead')},
      begin: ${need('gate.begin')},
      skip: ${need('gate.skip')},
    },
    rail: {
      label: ${need('rail.label')},
      items: [${rail}],
    },
    water: {
      title: ${need('water.title')},
      lead: ${need('water.lead')},
      springsL: ${need('water.springsL')},
      srcLabel: ${need('water.srcLabel')},
      srcGuinness: ${need('water.srcGuinness')},
      srcMid: ${need('water.srcMid')},
      srcUnesco: ${need('water.srcUnesco')},
      srcEnd: ${need('water.srcEnd')},
      link: ${need('water.link')},
    },
    qarah: {
      title: ${need('qarah.title')},
      drag: ${need('qarah.drag')},
      timeLabel: ${need('qarah.timeLabel')},
      times: [${['dawn', 'morning', 'afternoon', 'sunset'].map((t) => need(`qarah.time.${t}`)).join(', ')}],
      link: ${need('qarah.link')},
    },
    map: {
      title: ${need('map.title')},
      lead: ${need('map.lead')},
      svgLabel: ${need('map.svgLabel')},
      km: ${need('map.km')},
      legend: ${need('map.legend')},
      empty: ${need('map.empty')},
      more: ${need('map.more')},
      link: ${need('map.link')},
    },
    memory: {
      title: ${need('memory.title')},
      lead: ${need('memory.lead')},
      track: ${need('memory.track')},
      link: ${need('memory.link')},
    },
    plan: {
      title: ${need('plan.title')},
      lead: ${need('plan.lead')},
      link: ${need('plan.link')},
      int: { legend: ${need('plan.int.legend')}, opts: [${opts('int', ['heritage', 'nature', 'markets'])}] },
      dur: { legend: ${need('plan.dur.legend')}, opts: [${opts('dur', ['1', '2', '3'])}] },
      com: { legend: ${need('plan.com.legend')}, opts: [${opts('com', ['family', 'friends', 'solo'])}] },
      L: { wait: ${need('plan.wait')}, title: ${need('plan.routeTitle')}, days: [${need('plan.day1')}, ${need('plan.day2')}, ${need('plan.day3')}], trail: ${need('plan.kindTrail')}, place: ${need('plan.kindPlace')}, saved: ${need('plan.kindSaved')} },
    },
    finale: {
      title: ${need('finale.title')},
      lead: ${need('finale.lead')},
      plan: ${need('finale.plan')},
      open: ${need('finale.open')},
      replay: ${need('finale.replay')},
    },
    saved: { count: ${need('saved.count')}, build: ${need('saved.build')} },
  },
`;
// إزالة كتلة سابقة للغة نفسها (إعادة التشغيل)
hc.s = hc.s.replace(new RegExp(`  // [^\\n]*\\n  ${L}: \\{\\n    seo:[\\s\\S]*?\\n  \\},\\n(?=  // |\\};)`), '');
once(hc, '\n};\n\nexport const isHomeLang', `\n${BLOCK}};\n\nexport const isHomeLang`);
const langs = hc.s.match(/export const HOME_LANGS = \[([^\]]*)\] as const;/);
if (!langs) throw new Error('HOME_LANGS');
if (!langs[1].includes(`'${L}'`)) hc.s = hc.s.replace(langs[0], `export const HOME_LANGS = [${langs[1]}, '${L}'] as const;`);
wr('src/data/home-copy.ts', hc);

// 2) home-chapters.ts: حقل اللغة بعد آخر حقل في كل نصّ متعدد اللغات
const ch = rd('src/data/home-chapters.ts');
const setInline = (re, key) => {
  const m = ch.s.match(re);
  if (!m) throw new Error(`لا موضع لـ${key}`);
  const cleaned = m[0].replace(new RegExp(`, ${L}: '(?:[^'\\\\]|\\\\.)*'`), '');
  ch.s = ch.s.replace(m[0], () => cleaned.replace(/ \}(,?)$/, `, ${L}: ${need(key)} }$1`));
};
for (const k of ['heritage-1', 'heritage-2', 'heritage-3', 'nature-1', 'nature-2', 'nature-3', 'markets-1', 'markets-2', 'markets-3']) {
  setInline(new RegExp(`(?<='${k}': \\{\\n(?:    //[^\\n]*\\n)*)    title: \\{[^\\n]*\\},`), `tpl.${k}.title`);
}
setInline(/date: \{ ar: 'القرن الخامس الهجري'[^}]*\}/, 'memory.date.jalaniyah');
setInline(/date: \{ ar: 'أكثر من قرنين'[^}]*\}/, 'memory.date.qaisariyah');
const setBlock = (re, key) => {
  const m = ch.s.match(re);
  if (!m) throw new Error(`لا موضع لـ${key}`);
  let b = m[0].replace(new RegExp(`\\n\\s*${L}: '(?:[^'\\\\]|\\\\.)*',`), '');
  b = b.replace(/(\n(\s*)[a-z]{2}: '(?:[^'\\]|\\.)*',)(?![\s\S]*\n\s*[a-z]{2}: ')/, (_, l, ind) => `${l}\n${ind}${L}: ${need(key)},`);
  ch.s = ch.s.replace(m[0], () => b);
};
setBlock(/const ASFAR_NOTE[^\n]*\n[\s\S]*?\n\};/, 'tpl.note.asfar');
const tipsAt = ch.s.indexOf('export const COMPANION_TIPS');
const coastAt = ch.s.indexOf('export const COAST_TIPS');
if (tipsAt < 0 || coastAt < 0) throw new Error('COMPANION_TIPS/COAST_TIPS');
for (const c of ['family', 'friends', 'solo']) {
  const head = ch.s.slice(0, tipsAt), tail = ch.s.slice(tipsAt);
  const m = tail.match(new RegExp(`  ${c}: \\{\\n[\\s\\S]*?\\n  \\},`));
  const save = ch.s; ch.s = tail; setBlock(new RegExp(m[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `tip.${c}`); ch.s = head + ch.s;
  if (ch.s === save && !Z[`tip.${c}`]) throw new Error(c);
}
{
  const at = ch.s.indexOf('export const COAST_TIPS');
  const head = ch.s.slice(0, at), tail = ch.s.slice(at);
  const m = tail.match(/  family: \{\n[\s\S]*?\n  \},/);
  ch.s = tail; setBlock(new RegExp(m[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), 'tip.familyCoast'); ch.s = head + ch.s;
}
wr('src/data/home-chapters.ts', ch);

// 3) oasis-facts.ts: صيغة العيون
const of = rd('src/data/oasis-facts.ts');
const sp = of.s.match(/  springs: \{[\s\S]*?\n    \} satisfies/);
if (!sp) throw new Error('springs');
let blk = sp[0].replace(new RegExp(`\\n      ${L}: '[^']*',`), '');
blk = blk.replace(/\n    \} satisfies$/, `\n      ${L}: ${need('water.springsN')},\n    } satisfies`);
of.s = of.s.replace(sp[0], () => blk);
wr('src/data/oasis-facts.ts', of);
console.log('applied', L, FILE);
