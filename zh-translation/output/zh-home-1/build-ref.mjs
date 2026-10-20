// node build-ref.mjs <REPO> <BATCH_DIR> — ملحق المنشور الصيني الملزم لدفعة الرئيسية (ref.json)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR] = process.argv.slice(2);
const { TEMPLATES, MAP_SLUGS, MEMORY_CARDS } = await import(pathToFileURL(path.join(REPO, 'src/data/home-chapters.ts')).href);
const attDir = path.join(REPO, 'src/content/attractions');
const fm = (slugEn) => {
  for (const f of fs.readdirSync(attDir)) {
    const s = fs.readFileSync(path.join(attDir, f), 'utf8');
    const head = s.split(/^---\s*$/m)[1] ?? '';
    const get = (k) => (head.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1] ?? '').replace(/^['"]|['"]$/g, '');
    if (get('slug_en') === slugEn) return { file: `src/content/attractions/${f}`, title: get('title'), title_en: get('title_en'), title_zh: get('title_zh'), summary_en: get('summary_en'), summary_zh: get('summary_zh') };
  }
  return null;
};
const zhTrails = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/trails.zh.json'), 'utf8')).trails;
const enTrails = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/trails.json'), 'utf8')).trails;
const trail = (slug) => ({ en: enTrails.find((t) => t.slug === slug)?.en.title, zh: zhTrails[slug]?.title });

const places = new Set([...MAP_SLUGS, ...MEMORY_CARDS.map((c) => c.slug), 'jabal-al-qarah']);
const trails = new Set();
const templates = {};
for (const [k, t] of Object.entries(TEMPLATES)) {
  templates[k] = t.days.map((d) => d.stops.map((s) => ('trail' in s ? (trails.add(s.trail), `trail:${s.trail}`) : (places.add(s.place), `place:${s.place}`))));
}
// أسماء فقرات المرافقين (مراجعها في تعليق COMPANION_TIPS)
const tipPlaces = ['jawatha-park', 'king-abdullah-park', 'jawatha-mosque', 'al-uqair', 'arbaa', 'ahsa-museum'];
const tipTrails = ['al-uqair-coast', 'al-asfar-and-national-park', 'historic-hofuf'];
tipPlaces.forEach((p) => places.add(p));
tipTrails.forEach((t) => trails.add(t));

const ref = {
  _readme: 'المنشور الصيني الملزم: أسماء المعالم والمسارات تُكتب بصيغتها هنا حرفاً. الخلاصات (summary_zh) تُعرض في الصفحة نفسها بجوار نصوص الدفعة.',
  places: Object.fromEntries([...places].map((p) => [p, fm(p)])),
  trails: Object.fromEntries([...trails].map((t) => [t, trail(t)])),
  templates_stops: templates,
  asfar_trail_intro_zh: zhTrails['al-asfar-and-national-park']?.intro,
  asfar_trail_intro_en: enTrails.find((t) => t.slug === 'al-asfar-and-national-park')?.en.intro,
  seo_zh_published: {
    title: '哈萨旅游指南——全球最大的绿洲',
    'home.hero.lead': '哈萨——全球最大的绿洲。数千年来，水在沙下静静流淌，滋养着 250 多万棵椰枣树，生生不息。',
  },
};
const missing = Object.entries(ref.places).filter(([, v]) => !v || !v.title_zh).map(([k]) => k);
fs.writeFileSync(path.join(DIR, 'ref.json'), JSON.stringify(ref, null, 2));
console.log('places', places.size, 'trails', trails.size, 'missing zh:', missing.join(',') || 'none');
