// node apply.mjs <REPO> <BATCH_DIR> <file.json> [<stay-final.json>] — يكتب نصوص دفعة أوردية لصفحات الإقامة والمطاعم:
//  ur-stay-1     → كتلتا ur في StayView وStayDetailView، وحقول area_ur/blurb_ur/alt_ur/body_ur في src/content/stay.
//  ur-dining-1   → كتلة ur في DiningView (السلاسل المشتركة مع الإقامة من نصّها المعتمد <stay-final.json>)،
//                  وDISTRICT_NAMES.ur في src/data/districts.ts، واسم الحيّ الأوردي في عنوان «معالم قريبة» بصفحة المنشأة.
//  ur-dining-2   → حقول area_ur/blurb_ur/alt_ur في src/content/dining.
// قابل للإعادة؛ ويتحقق بعد الكتابة بقراءة الشجرة أن كل سلسلة وصلت حرفاً.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [REPO, DIR, FILE, STAY_FINAL] = process.argv.slice(2);
const TOOLS = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const { readLocalize, flatten, writeUrBlock } = await import(pathToFileURL(path.join(TOOLS, 'localize-literal.mjs')).href);
const pack = JSON.parse(fs.readFileSync(path.join(DIR, 'pack.json'), 'utf8'));
if (pack.lang !== 'ur') throw new Error('دفعة غير أوردية');
const Z = JSON.parse(fs.readFileSync(path.join(DIR, FILE), 'utf8')).strings;
for (const k of Object.keys(pack.strings)) if (typeof Z[k] !== 'string' || !Z[k].trim()) throw new Error(`مفتاح ناقص: ${k}`);
const P = (r) => path.resolve(REPO, r);
const sub = (prefix) => Object.fromEntries(Object.entries(Z).filter(([k]) => k.startsWith(prefix)).map(([k, v]) => [k.slice(prefix.length), v]));

/** حقول *_ur في واجهة ملف محتوى: تُستبدل إن وُجدت، وإلا تُضاف بعد نظيرها *_de (أو آخر الواجهة). */
function setFields(rel, fields) {
  const raw = fs.readFileSync(P(rel), 'utf8');
  const crlf = raw.includes('\r\n');
  const s = raw.replace(/\r\n/g, '\n');
  const end = s.indexOf('\n---', 4);
  let head = s.slice(0, end);
  for (const [f, v] of Object.entries(fields)) {
    const line = `${f}: ${JSON.stringify(v)}`;
    const re = new RegExp(`^${f}: .*$`, 'm');
    if (re.test(head)) { head = head.replace(re, () => line); continue; }
    const twin = new RegExp(`^${f.replace(/_ur$/, '_de')}: .*$`, 'm');
    const m = head.match(twin);
    if (m) head = head.slice(0, m.index + m[0].length) + '\n' + line + head.slice(m.index + m[0].length);
    else head += '\n' + line;
  }
  const out = head + s.slice(end);
  fs.writeFileSync(P(rel), crlf ? out.replace(/\n/g, '\r\n') : out);
}
const cardFields = (coll) => {
  const by = {};
  for (const [k, v] of Object.entries(Z)) {
    const m = k.match(new RegExp(`^${coll}\\.([^.]+)\\.(area|blurb|alt|body)$`));
    if (m) (by[m[1]] ??= {})[`${m[2]}_ur`] = v;
  }
  for (const [file, fields] of Object.entries(by)) setFields(`src/content/${coll}/${file}.md`, fields);
  return Object.keys(by).length;
};
const check = (rel, map) => {
  const back = Object.fromEntries(flatten(readLocalize(REPO, rel, { lenient: true, deep: true }).ur));
  const bad = Object.entries(map).filter(([k, v]) => back[k] !== v).map(([k]) => k);
  if (bad.length) throw new Error(`${rel}: لم تصل حرفاً: ${bad.join(' ')}`);
};

if (pack.batch === 'ur-stay-1') {
  const ix = { ...sub('ix.'), 'faqs.1.linkHref': '/ur/attractions/uqair-beach/' };
  const dv = { ...sub('dv.'), 'kindLabel.then': Z['ix.kindLabels.heritage-inn'], 'kindLabel.else': Z['ix.kindLabels.hotel'], newWindow: Z['ix.newWindow'], ratingLabel: Z['ix.ratingLabel'], closedPerm: Z['ix.closedPerm'], closedTemp: Z['ix.closedTemp'] };
  writeUrBlock(REPO, 'src/components/views/StayView.astro', ix); check('src/components/views/StayView.astro', ix);
  writeUrBlock(REPO, 'src/components/views/StayDetailView.astro', dv); check('src/components/views/StayDetailView.astro', dv);
  console.log(`applied ur-stay-1: StayView ${Object.keys(ix).length} · StayDetailView ${Object.keys(dv).length} · ${cardFields('stay')} بطاقة`);
} else if (pack.batch === 'ur-dining-1') {
  if (!STAY_FINAL) throw new Error('يلزم نصّ دفعة الإقامة المعتمد (السلاسل المشتركة)');
  const S = JSON.parse(fs.readFileSync(STAY_FINAL, 'utf8')).strings;
  const shared = { moreLabel: 'ix.moreLabel', newWindow: 'ix.newWindow', ratingLabel: 'ix.ratingLabel', closedPerm: 'ix.closedPerm', closedTemp: 'ix.closedTemp', methodH: 'ix.methodH' };
  const ix = { ...sub('ix.'), 'faqs.0.linkHref': '/ur/food/', 'faqs.3.linkHref': '/ur/food/' };
  for (const [k, sk] of Object.entries(shared)) { if (typeof S[sk] !== 'string') throw new Error(`سلسلة الإقامة ${sk} غائبة`); ix[k] = S[sk]; }
  writeUrBlock(REPO, 'src/components/views/DiningView.astro', ix, { rewrite: (t) => t.replace('DISTRICT_NAMES.en', 'DISTRICT_NAMES.ur') });
  check('src/components/views/DiningView.astro', ix);
  // DISTRICT_NAMES.ur
  const dPath = P('src/data/districts.ts');
  const draw = fs.readFileSync(dPath, 'utf8');
  const dcrlf = draw.includes('\r\n');
  let d = draw.replace(/\r\n/g, '\n');
  d = d.replace("Record<'ar' | 'en' | 'zh' | 'de' | 'ru', Record<District, string>>", "Record<'ar' | 'en' | 'zh' | 'de' | 'ru' | 'ur', Record<District, string>>");
  const dist = sub('district.');
  const q = (v) => `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  const key = (k) => (/^[a-z]+$/.test(k) ? k : `'${k}'`);
  const urBlock = `  ur: {\n    ${Object.entries(dist).map(([k, v]) => `${key(k)}: ${q(v)}`).join(', ')},\n  },\n`;
  const namesStart = d.indexOf('export const DISTRICT_NAMES');
  const namesEnd = d.indexOf('\n};', namesStart);
  let names = d.slice(namesStart, namesEnd + 1);
  names = names.replace(/ {2}ur: \{\n[^\n]*\n {2}\},\n$/, '');
  if (!names.endsWith('},\n')) throw new Error('districts.ts: إغلاق كتلة ru');
  d = d.slice(0, namesStart) + names + urBlock + d.slice(namesEnd + 1);
  fs.writeFileSync(dPath, dcrlf ? d.replace(/\n/g, '\r\n') : d);
  const { DISTRICT_NAMES } = await import(`${pathToFileURL(dPath).href}?t=${Date.now()}`);
  const badD = Object.keys(dist).filter((k) => DISTRICT_NAMES.ur?.[k] !== dist[k]);
  if (badD.length || Object.keys(DISTRICT_NAMES.ur).length !== Object.keys(DISTRICT_NAMES.en).length) throw new Error(`DISTRICT_NAMES.ur: ${badD.join(' ')}`);
  // عنوان «معالم قريبة في {district}» بصفحة المنشأة يقرأ الاسم الأوردي
  const ddv = 'src/components/views/DiningDetailView.astro';
  const draw2 = fs.readFileSync(P(ddv), 'utf8');
  const from = "DISTRICT_NAMES[ar ? 'ar' : zh ? 'zh' : de ? 'de' : ru ? 'ru' : 'en']";
  if (draw2.includes(from)) fs.writeFileSync(P(ddv), draw2.replace(from, "DISTRICT_NAMES[ar ? 'ar' : zh ? 'zh' : de ? 'de' : ru ? 'ru' : ur ? 'ur' : 'en']"));
  console.log(`applied ur-dining-1: DiningView ${Object.keys(ix).length} (منها ${Object.keys(shared).length} من الإقامة) · DISTRICT_NAMES.ur ${Object.keys(dist).length}`);
} else if (pack.batch === 'ur-dining-2') {
  console.log(`applied ur-dining-2: ${cardFields('dining')} بطاقة`);
} else throw new Error(`دفعة غير معروفة: ${pack.batch}`);
