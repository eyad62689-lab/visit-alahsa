// يبني pack.json لكل دفعة من دفعات zh-dind الأربع من ملفات المستودع مباشرة.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const OUT = path.dirname(new URL(import.meta.url).pathname);

function readEntry(coll, id) {
  const raw = fs.readFileSync(`${REPO}/src/content/${coll}/${id}.md`, 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^([a-z_]+):\s*(".*")\s*$/);
    if (mm) fm[mm[1]] = JSON.parse(mm[2]);
    const mk = line.match(/^(kind|district):\s*([a-z-]+)\s*$/);
    if (mk) fm[mk[1]] = mk[2];
  }
  return { fm, bodyAr: m[2].trim() };
}

const DISTRICT_ZH = {
  alkoot: '库特区', downtown: '胡富夫历史城区', 'rafah-north': '里法阿北区',
  khalidiyah: '哈利迪亚区', rawdah: '拉乌达区', mazrou: '马兹鲁阿区', uwaimriyah: '欧韦米里亚区',
  olaya: '奥拉雅区', khaleej: '海湾路', mubarraz: '穆巴拉兹', khudud: '胡杜德区', qarah: '卡拉',
};

const KIND_EN = { restaurant: 'Restaurant', cafe: 'Café', bakery: 'Bakery', 'heritage-inn': 'Heritage inn', hotel: 'Hotel' };

function bodyString(coll, id) {
  const { fm, bodyAr } = readEntry(coll, id);
  const paras = fm.body_en.split(/\n{2,}/).length;
  const page = coll === 'stay' ? `/zh/stay/${fm.slug_en}/` : `/zh/restaurants-cafes/${fm.slug_en}/`;
  const view = coll === 'stay' ? 'StayDetailView.astro' : 'DiningDetailView.astro';
  return {
    en: fm.body_en,
    ar: bodyAr,
    ctx: `${page} (single ${coll === 'stay' ? 'place-to-stay' : 'venue'} page, ${view}): the full body text of the page for the ${KIND_EN[fm.kind]} «${fm.name_en}» (ar «${fm.name}»). `
      + `RENDERED AS PLAIN TEXT, paragraph by paragraph — no Markdown, no links, no emphasis (the template puts each paragraph in its own <p>). `
      + `Keep the paragraph split of the English source exactly: ${paras} paragraph(s), separated by one blank line (\\n\\n). `
      + `The page H1 above the body is the venue's Latin name «${fm.name_en}» (as it names itself — CLAUDE.md). Inside the body the name follows the zh termbase exactly (batch-indexes pattern: Arabic-word names = Chinese transliteration + Latin gloss at FIRST mention in the body, e.g. 达尔巴斯玛（Dar Basma）, then the Chinese form alone; Latin brand names stay Latin, e.g. Ratio Al-Koot). If the venue is missing from the termbase, propose an entry in termbase_additions following that pattern (with source) — never translate the meaning of a name. `
      + `Its published Chinese card on the index page (zh batch 14, judged) says: area «${fm.area_zh ?? '(none)'}» · blurb «${fm.blurb_zh}» · image alt «${fm.alt_zh}». The card blurb is printed directly above this body on the same page, so the body must not contradict it and must not repeat it verbatim. `
      + (fm.district ? `District key «${fm.district}» — published Chinese district name «${DISTRICT_ZH[fm.district]}» (DISTRICT_NAMES.zh), use it verbatim wherever the body names this district. ` : '')
      + `The Arabic column is the authority on every fact; the English is the source and sets the scope — an extra Arabic sentence is NOT added, but where English and Arabic contradict each other on a fact, follow the Arabic and report it as a source defect.`,
    _meta: { coll, id, slug_en: fm.slug_en, name_en: fm.name_en, name_ar: fm.name, kind: fm.kind, district: fm.district ?? null, paras, card_zh: { area: fm.area_zh ?? null, blurb: fm.blurb_zh, alt: fm.alt_zh } },
  };
}

const TEMPLATE_DV = {
  'dv.kindRestaurant': { en: 'Restaurant', ar: 'مطعم', ctx: '/zh/restaurants-cafes/<slug>/ (single venue page, DiningDetailView.astro): the small type label printed above the venue name (an "eyebrow"), for venues of kind "restaurant". One word, stands alone. The published Chinese index /zh/restaurants-cafes/ calls this group «餐厅» (kindRestaurants filter) — keep it consistent. The published sibling on the stay template uses «传统客栈» / «酒店» for the same slot.' },
  'dv.kindCafe': { en: 'Café', ar: 'مقهى', ctx: '/zh/restaurants-cafes/<slug>/: the same eyebrow label for venues of kind "cafe". The published Chinese index calls this group «咖啡馆» — keep consistent.' },
  'dv.kindBakery': { en: 'Bakery', ar: 'مخبز', ctx: '/zh/restaurants-cafes/<slug>/: the same eyebrow label for venues of kind "bakery". The published Chinese index calls this group «烘焙坊» — keep consistent. (No bakery has a single page yet; the label still ships.)' },
  'dv.backLabel': { en: 'All restaurants & cafés', ar: 'كل المطاعم والمقاهي', ctx: '/zh/restaurants-cafes/<slug>/: the back link in the breadcrumb strip at the very top of the page, and again at the foot of the page. It points to the index page whose published Chinese H1 is «餐厅与咖啡馆» (indexName, LOCKED, not in this batch). Must be built on the same pattern as sd.backLabel (the stay page sibling in this same batch).' },
  'dv.areaH': { en: 'Location', ar: 'الموقع', ctx: '/zh/restaurants-cafes/<slug>/ AND /zh/stay/<slug>/ (the stay template reuses this exact string for its own areaH): heading of the small box giving where the venue is (one line, e.g. the published card area «库特区——易卜拉欣宫对面»). Two to four characters.' },
  'dv.noteP': { en: 'The name and location come straight from Google Maps; the rating and opening hours are fetched from it on each site update and can change. No prices or dish recommendations are listed.', ar: 'الاسم والموقع من خرائط قوقل مباشرة، والتقييم وأوقات العمل تُجلب منها عند كل تحديث للموقع وقد تتغير. لا تُعرض أسعار ولا توصيات بأصناف بعينها.', ctx: '/zh/restaurants-cafes/<slug>/: body of the «关于本页» box at the foot of the page (noteH is LOCKED to the published «关于本页»). Three claims, all load-bearing: (1) name and location come straight from Google Maps; (2) rating and opening hours are fetched from it on every site update and can change; (3) no prices and no dish recommendations are listed. «Google Maps» is «谷歌地图» everywhere on the published Chinese site. The published Chinese index methodP1 says «名称与位置均直接取自谷歌地图，简介仅依据照片所见撰写，不含评价，也不推荐特定菜品。» — reuse its wording for the shared claims (one site, one wording).' },
  'dv.sightsH': { en: 'Sights nearby in {district}', ar: 'معالم قريبة في {district}', ctx: '/zh/restaurants-cafes/<slug>/: H2 of the «sights nearby» list at the foot of the page (links to attraction pages in the same district). {district} is REPLACED AT BUILD TIME by one of the published Chinese district names verbatim: 库特区 · 胡富夫历史城区 · 里法阿北区 · 哈利迪亚区 · 拉乌达区 · 马兹鲁阿区 · 欧韦米里亚区 · 奥拉雅区 · 海湾路 · 穆巴拉兹 · 胡杜德区 · 卡拉. The wording must read naturally with ALL of them (note 海湾路 is a road and 穆巴拉兹 a city). Keep {district} literally, exactly once. «Sights» = the site-wide term for attractions (check termbase for 景点/名胜 ruling — entry on 站点/景点 policy POL-1).' },
};

const TEMPLATE_SD = {
  'sd.backLabel': { en: 'All places to stay', ar: 'كل أماكن الإقامة', ctx: '/zh/stay/<slug>/ (single place-to-stay page, StayDetailView.astro): the back link at the top of the page, pointing to the index whose published Chinese H1 is «住宿» (indexName, LOCKED). Build it on the same pattern as dv.backLabel in this same batch.' },
  'sd.noteP': { en: 'The name and location come straight from Google Maps; the rating is fetched from it on each site update and can change. No prices or star ratings are listed, and this page is descriptive rather than a recommendation.', ar: 'الاسم والموقع من خرائط قوقل مباشرة، والتقييم يُجلب منها عند كل تحديث للموقع وقد يتغير. لا تُعرض أسعار ولا تصنيفات نجوم، وهذه الصفحة وصفية لا ترشيحية.', ctx: '/zh/stay/<slug>/: body of the «关于本页» box (noteH LOCKED). Differs from dv.noteP: rating only (no opening hours), no prices or STAR RATINGS, plus the "descriptive, not a recommendation" clause. The published Chinese stay index methodP1 says «名称与位置均直接取自谷歌地图，简介仅依据照片所见撰写。本页不展示价格、星级或推荐。» and its FAQ says «卡片仅作介绍» / «本列表仅作介绍，不构成推荐» — reuse that wording. dv.noteP and sd.noteP must share their common clauses word for word.' },
};

const EV = {
  'ev.shop': { en: 'Shop the exhibition products', ar: 'تسوّق منتجات المعرض', ctx: '/zh/events/ (EventsView card) and /zh/events/hasawi-lomi-exhibition/ (EventDetailView call-to-action row): the label of a button that opens the online shop of the Hasawi Lomi Exhibition (哈萨青柠展, organised by 哈萨商会) — an external shop page run for the exhibitors. It sits next to the published sibling button «预订门票» (ticketK) and must match its form: a short imperative verb phrase, no punctuation. The shop keeps selling after the exhibition dates end.' },
  'ev.shopNote': { en: 'Lomi products, foods and care items from the establishments taking part in the exhibition.', ar: 'منتجات اللومي ومأكولات ومستحضرات عناية من المؤسسات المشاركة في المعرض.', ctx: '/zh/events/ (EventsView card, the Hasawi Lomi Exhibition card only): one short line printed under the shop button, saying what the shop sells. Three categories, exactly: lomi products · foods · personal-care items — from the establishments (businesses) taking part in the exhibition. «Lomi» follows the termbase (青柠, with the jameed-fix ruling that 青柠干 is banned); the published event name is 哈萨青柠展. A full sentence ending with 。 is fine. No claim beyond the source (no "local", "handmade", "family" unless the source says it).' },
};

const BATCHES = {
  'zh-dind-1': { part: 'Template strings of the single venue page (7) and the single stay page (2) + bodies of four restaurants and the heritage hotel (stay)', strings: { ...TEMPLATE_DV, ...TEMPLATE_SD }, bodies: [['dining', 'dar-basma'], ['dining', 'alkoot-hotel'], ['dining', 'alhawi'], ['dining', 'sinyar'], ['stay', 'alkoot-heritage']] },
  'zh-dind-2': { part: 'Bodies of five venues + the two exhibition-shop strings (ev.shop / ev.shopNote)', strings: { ...EV }, bodies: [['dining', 'lava'], ['dining', 'ammo'], ['dining', 'sharq-alqaisariah'], ['dining', 'koud'], ['dining', 'baithana']] },
  'zh-dind-3': { part: 'Bodies of five venues', strings: {}, bodies: [['dining', '7st'], ['dining', 'bait-alkoot'], ['dining', 'dar-huwaija'], ['dining', 'alsayed'], ['dining', 'ratio-alkoot']] },
  'zh-dind-4': { part: 'Bodies of five venues', strings: {}, bodies: [['dining', 'soulaf'], ['dining', 'baking-up'], ['dining', 'dot-bakery'], ['dining', 'karak-raslan'], ['dining', 'greasy-fingers']] },
};

for (const [batch, spec] of Object.entries(BATCHES)) {
  const strings = { ...spec.strings };
  for (const [coll, id] of spec.bodies) strings[`${id}.body`] = bodyString(coll, id);
  const dir = path.join(OUT, batch);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch, lang: 'zh', part: spec.part, strings }, null, 2) + '\n');
  const words = spec.bodies.reduce((n, [c, i]) => n + strings[`${i}.body`].en.split(/\s+/).length, 0);
  console.log(batch, Object.keys(strings).length, 'strings ·', words, 'EN body words');
}
