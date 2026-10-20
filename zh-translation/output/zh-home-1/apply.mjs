// node apply.mjs <REPO> <BATCH_DIR> <zh-file.json> — يحقن نصوص الرئيسية الصينية في home-copy/home-chapters/oasis-facts
// ويضمّ zh إلى HOME_LANGS. يُعاد تشغيله بأمان: يستبدل كتلة zh إن وُجدت.
import fs from 'node:fs';
import path from 'node:path';

const [REPO, DIR, FILE] = process.argv.slice(2);
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const need = (k) => { if (typeof Z[k] !== 'string') throw new Error(`مفتاح ناقص: ${k}`); return q(Z[k]); };
const rd = (p) => { const s = fs.readFileSync(path.join(REPO, p), 'utf8'); return { s: s.replace(/\r\n/g, '\n'), crlf: s.includes('\r\n') }; };
const wr = (p, { s, crlf }) => fs.writeFileSync(path.join(REPO, p), crlf ? s.replace(/\n/g, '\r\n') : s);
const once = (o, a, b) => { const n = o.s.split(a).length - 1; if (n !== 1) throw new Error(`مرساة ${n}x: ${a.slice(0, 60)}`); o.s = o.s.replace(a, () => b); };

// 1) home-copy.ts
const hc = rd('src/data/home-copy.ts');
const rail = ['ch-gate', 'ch-water', 'ch-qarah', 'ch-map', 'ch-memory', 'ch-plan', 'ch-finale'].map((id) => `['${id}', ${need(`rail.${id}`)}]`).join(', ');
const opts = (qk, vals) => vals.map((v) => `['${v}', ${need(`plan.${qk}.${v}`)}]`).join(', ');
const ZH = `  // الصينية من خط zh-translation-pipeline (دفعة zh-home-1، 2026-10-20)؛ seo منقول من HomeView (misc.seo.*، 2026-08-29)
  zh: {
    seo: {
      title: '哈萨旅游指南——全球最大的绿洲',
      description: '沙特阿拉伯哈萨旅游指南：卡拉山、易卜拉欣宫、凯撒利亚集市、乌盖尔（Al-Uqair）。在这片列入联合国教科文组织世界遗产名录的绿洲，查看地图与行程，了解活动与美食。',
      place: '哈萨',
      country: '沙特阿拉伯',
    },
    arrow: '→',
    paths: { attractions: '/zh/attractions/', map: '/zh/map/', plan: '/zh/plan-your-trip/', myTrip: '/zh/plan/', trails: '/zh/trails/' },
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
hc.s = hc.s.replace(/  \/\/ الصينية من خط zh-translation-pipeline[\s\S]*?\n  },\n(?=};)/, '');
once(hc, '\n};\n\nexport const isHomeLang', `\n${ZH}};\n\nexport const isHomeLang`);
hc.s = hc.s.replace("export const HOME_LANGS = ['ar', 'en'] as const;", "export const HOME_LANGS = ['ar', 'en', 'zh'] as const;");
if (!hc.s.includes("['ar', 'en', 'zh'] as const")) throw new Error('HOME_LANGS');
wr('src/data/home-copy.ts', hc);

// 2) home-chapters.ts: حقل zh بعد كل en في العناوين والتنبيه والفقرات والتواريخ
const ch = rd('src/data/home-chapters.ts');
const setZh = (re, key) => {
  const m = ch.s.match(re);
  if (!m) throw new Error(`لا موضع لـ${key}`);
  const line = m[0];
  const cleaned = line.replace(/, zh: '(?:[^'\\]|\\.)*'/, '');
  const withZh = cleaned.replace(/(en: '(?:[^'\\]|\\.)*')/, `$1, zh: ${need(key)}`);
  ch.s = ch.s.replace(line, () => withZh);
};
for (const k of ['heritage-1', 'heritage-2', 'heritage-3', 'nature-1', 'nature-2', 'nature-3', 'markets-1', 'markets-2', 'markets-3']) {
  setZh(new RegExp(`'${k}': \\{\\n(?:    //[^\\n]*\\n)*    title: \\{[^\\n]*\\},`), `tpl.${k}.title`);
}
setZh(/date: \{ ar: 'القرن الخامس الهجري', en: '[^']*'[^}]*\}/, 'memory.date.jalaniyah');
setZh(/date: \{ ar: 'أكثر من قرنين', en: '[^']*'[^}]*\}/, 'memory.date.qaisariyah');
// كتل متعددة الأسطر: ASFAR_NOTE وCOMPANION_TIPS
const addLine = (anchorRe, key) => {
  const m = ch.s.match(anchorRe);
  if (!m) throw new Error(`لا موضع لـ${key}`);
  let block = m[0].replace(/\n\s*zh: '(?:[^'\\]|\\.)*',/, '');
  block = block.replace(/(\n(\s*)en: '(?:[^'\\]|\\.)*',)/, (_, l, ind) => `${l}\n${ind}zh: ${need(key)},`);
  ch.s = ch.s.replace(m[0], () => block);
};
addLine(/const ASFAR_NOTE[^\n]*\n[\s\S]*?\n\};/, 'tpl.note.asfar');
for (const c of ['family', 'friends', 'solo']) addLine(new RegExp(`  ${c}: \\{\\n[\\s\\S]*?\\n  \\},`), `tip.${c}`);
wr('src/data/home-chapters.ts', ch);

// 3) oasis-facts.ts: صيغة العيون
const of = rd('src/data/oasis-facts.ts');
of.s = of.s.replace(/(\n\s*en: '280\+',)(\n\s*zh: '[^']*',)?/, (_, l) => `${l}\n      zh: ${need('water.springsN')},`);
wr('src/data/oasis-facts.ts', of);
console.log('applied', FILE);
