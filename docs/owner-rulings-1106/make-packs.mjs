// يولّد حزم دفعة owner-rulings-1106 (zh · de · ru · ur · tr): تنبيه زائر الجمعة في مقدمة مسار الهفوف التاريخي، لأنها
// تقترح السير صباحاً والقيصرية لا تفتح الجمعة إلا مساءً. المصدران صُحِّحا في الشجرة أولاً، والحزمة تحمل نصّ اللغة المنشور
// حرفياً (`current`) والمصدرين قبل التصحيح وبعده، وجملة الجمعة المنشورة في جدول اليومين باللغة نفسها (`neighbour`).
//   node docs/owner-rulings-1106/make-packs.mjs <جذر الشجرة> [الأساس، مثل HEAD]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'HEAD';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const show = (rel) => execFileSync('git', ['-C', R, 'show', BASE + ':' + rel], { encoding: 'utf8', maxBuffer: 1 << 26 });
const cur = (rel) => readFileSync(path.join(R, rel), 'utf8');
const DATE = '2026-11-06', SLUG = 'historic-hofuf';
const trail = (src) => {
  const t = JSON.parse(src).trails;
  return Array.isArray(t) ? t.find((x) => x.slug === SLUG) : t[SLUG];
};
const SRC = 'src/data/trails.json';
const S0 = trail(show(SRC)), S1 = trail(cur(SRC));

const RULING = 'OWNER 2026-11-05: every visiting plan that suggests Souq Al-Qaisariya in the morning warns the Friday visitor, in every language: on Fridays the souq opens in the evening only. The Historic Hofuf Trail intro suggests walking it in the morning, and its last stop is the souq, so the source intro now ends with that notice. Add the notice only; every other word of the intro stays byte-identical.';

// فقرة القيصرية في جدول اليومين باللغة نفسها: فيها صيغة الجمعة المنشورة التي يُحاذى بها التنبيه
const neighbour = (lg) => {
  const lines = cur(`src/content/blog/48-hours-${lg}.md`).split(/\r?\n/).filter((l) => l.includes(`/${lg}/attractions/qaisariyah/`));
  if (lines.length !== 1) throw new Error(`${lg}: the 48-hours Qaisariyah paragraph found ${lines.length} times`);
  return lines[0];
};

for (const lg of ['zh', 'de', 'ru', 'ur', 'tr']) {
  const F = `src/data/trails.${lg}.json`;
  const p = {
    id: `${lg}-hofuf-intro`, file: F, kind: 'json', locator: `trails.${SLUG}.intro`,
    role: `Intro paragraph of the Historic Hofuf Trail page (/${lg}/trails/${SLUG}/), shown under the H1. One JSON string, plain text.`,
    ruling: RULING,
    current: trail(cur(F)).intro,
    en_before: S0.en.intro, en_after: S1.en.intro, ar_before: S0.ar.intro, ar_after: S1.ar.intro,
    neighbour: neighbour(lg),
  };
  if (!p.current) throw new Error(p.id + ': no published text');
  if (p.en_before === p.en_after || p.ar_before === p.ar_after) throw new Error(p.id + ': the source did not change');
  const dir = path.join(R, `${lg}-translation/output/owner-rulings-1106`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch: 'owner-rulings-1106', lang: lg, date: DATE, base: BASE, positions: [p] }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: 1 position -> ${lg}-translation/output/owner-rulings-1106/pack.json`);
}
