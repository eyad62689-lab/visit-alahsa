// يولّد حزمة الأوردية لدفعة ur-owner-trails: أجوبة إياد (2026-10-21) على أسئلة ur-trails-1 المفتوحة في المعجم:
//   OQ1 «کارگاہ» في الموقع كله ← تعديل summary_ur وbody_ur لمعلم دوغة الغراش (التذكير «کارخانہ» يصير تأنيثاً)
//   OQ2 «سنوارا ہے» ← محطة شاطئ العقير في مسار ساحل العقير
//   OQ3 الألقاب كما في العربية ← محطة مسجد جواثا («رضي الله عنهما» و«ﷺ»)
//   OQ4 «ارتقا پذیر ثقافتی منظر» يبقى ← لا موضع؛ يُغلق في المعجم وحده
// لكل موضع: current = المنشور حرفياً، ومعه المصدر العربي والإنجليزي الحالي.
//   node docs/ur-owner-trails/make-pack.mjs <جذر الشجرة>
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]);
if (!R) { console.error('usage: make-pack.mjs <root>'); process.exit(2); }
const require = createRequire(path.join(R, 'package.json'));
const yaml = require('js-yaml');
const rd = (rel) => readFileSync(path.join(R, rel), 'utf8');

const MD = 'src/content/attractions/duqat-algharash.md';
const m = rd(MD).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
if (!m) throw new Error(MD + ': no frontmatter');
const fm = yaml.load(m[1]), arBody = m[2].trim();

const UR = JSON.parse(rd('src/data/trails.ur.json'));
const SRC = JSON.parse(rd('src/data/trails.json'));
const srcStop = (trail, stop) => {
  const t = SRC.trails.find((x) => x.slug === trail);
  const s = t?.stops.find((x) => x.key === stop);
  if (!s) throw new Error(`trails.json: no ${trail}/${stop}`);
  return s;
};
const urStop = (trail, stop) => {
  const s = UR.trails?.[trail]?.stops?.[stop];
  if (!s?.text) throw new Error(`trails.ur.json: no ${trail}/${stop}`);
  return s;
};

const tb = JSON.parse(rd('ur-translation/glossary/termbase.json'));
const oq = (id) => {
  const x = (tb._meta.open_items ?? []).find((o) => o.id === id);
  if (!x) throw new Error('termbase: no open item ' + id);
  return x;
};

const positions = [];
{
  if (!fm.summary_ur?.includes('کارخانہ') || !fm.body_ur?.includes('کارخانہ')) throw new Error(MD + ': «کارخانہ» not in summary_ur and body_ur');
  const ruling = 'إياد 2026-10-21، OQ1 الخيار A: «کارگاہ» في الموقع كله. ' + oq('OQ1').options[0];
  positions.push({ id: 'ur-duqat-summary', file: MD, field: 'summary_ur', ruling,
    role: 'ملخّص معلم دوغة الغراش: يظهر في بطاقته بفهرس الأسواق والمنتزهات والمزارع وعلى الخريطة، وفي وصف الصفحة. المأمورية: «کارخانہ» ← «کارگاہ» وما يتبعه من مطابقة التأنيث وحده.',
    current: fm.summary_ur, en: fm.summary_en ?? null, ar: fm.summary ?? null });
  positions.push({ id: 'ur-duqat-body', file: MD, field: 'body_ur', ruling,
    role: 'متن صفحة المعلم /ur/attractions/duqat-algharash/. المأمورية: كل «کارخانہ» ← «کارگاہ» (ومنه شرح «دوغہ الغراش (یعنی الغراش کا کارخانہ)» ← «(یعنی الغراش کی کارگاہ)») وما يتبعه من مطابقة التأنيث (الصفات والأفعال والضمائر العائدة) وحده؛ كل ما عداه حرفياً.',
    current: fm.body_ur, en: fm.body_en ?? null, ar: arBody });
}
{
  const s = srcStop('al-uqair-coast', 'al-uqair-beach'), u = urStop('al-uqair-coast', 'al-uqair-beach');
  if (!u.text.includes('ترقی دی ہے')) throw new Error('uqair stop: «ترقی دی ہے» not found');
  positions.push({ id: 'ur-trail-uqair-beach', file: 'src/data/trails.ur.json', field: 'trails.al-uqair-coast.stops.al-uqair-beach.text',
    ruling: 'إياد 2026-10-21، OQ2 الخيار B: ' + oq('OQ2').options[1],
    role: 'نص محطة شاطئ العقير في صفحة المسار /ur/trails/al-uqair-coast/. المأمورية: «ترقی دی ہے» ← «سنوارا ہے» وحده؛ جملة النفي «رومی دور کے آثار میں سے نہیں» حرفياً (حارس C27).',
    current: u.text, en: s.en?.text ?? null, ar: s.ar?.text ?? null });
}
{
  const s = srcStop('qarah-and-jawatha', 'jawatha-mosque'), u = urStop('qarah-and-jawatha', 'jawatha-mosque');
  positions.push({ id: 'ur-trail-jawatha', file: 'src/data/trails.ur.json', field: 'trails.qarah-and-jawatha.stops.jawatha-mosque.text',
    ruling: 'إياد 2026-10-21، OQ3 الخيار B (يتبع العربية): ' + oq('OQ3').options[1] + ' — العربية: «روى البخاري عن ابن عباس رضي الله عنهما» و«في مسجد رسول الله ﷺ». المحرفان ؓ (U+0613) وﷺ (U+FDFA) في مجموعة خط النستعليق المشذّبة (تحقّق بـfontTools 2026-10-21).',
    role: 'نص محطة مسجد جواثا في صفحة المسار /ur/trails/qarah-and-jawatha/. المأمورية: إضافة الألقاب حيث تحملها العربية (الصحابي، والنبي ﷺ) وحدها؛ لا تُغيَّر الرواية ولا الجمل الأخرى.',
    current: u.text, en: s.en?.text ?? null, ar: s.ar?.text ?? null });
}
for (const p of positions) if (!p.ar || !p.en) throw new Error(p.id + ': source ar/en missing — check the field names');

const pack = { lang: 'ur', batch: 'ur-owner-trails', date: '2026-10-21',
  closes: ['OQ1', 'OQ2', 'OQ3', 'OQ4'],
  oq4: 'إياد 2026-10-21، OQ4 الخيار A: «… ایک ارتقا پذیر ثقافتی منظر» يبقى (منشور أصلاً في trails.ur.json، لا موضع).',
  positions };
const out = path.join(R, 'ur-translation', 'output', 'ur-owner-trails');
mkdirSync(out, { recursive: true });
writeFileSync(path.join(out, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', 'utf8');
console.log(positions.map((p) => p.id + ': ' + p.current.length + ' chars').join('\n'));
