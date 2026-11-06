// يولّد حزم دفعة owner-rulings-1106b (de · ru · ur · tr): مكان مهرجان الأحساء المبدعة مكانٌ واحد — الفريج التراثي داخل
// قلعة الأمانة (جواب إياد 2026-11-05 على سؤال tr-events-1). الصيغة بالفاصلة «الفريج التراثي، قلعة الأمانة» كانت تُقرأ مكانين؛
// صُحّح المصدران أولاً، والصينية تؤدّي المعنى أصلاً بالقوس فلا حزمة لها (تُحمل في الحزم سابقةً).
//   node docs/owner-rulings-1106b/make-packs.mjs <جذر الشجرة> [الأساس، مثل HEAD]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]), BASE = process.argv[3] ?? 'HEAD';
if (!R) { console.error('usage: make-packs.mjs <root> [base]'); process.exit(2); }
const F = 'src/data/events.ts';
const show = execFileSync('git', ['-C', R, 'show', BASE + ':' + F], { encoding: 'utf8', maxBuffer: 1 << 26 });
const cur = readFileSync(path.join(R, F), 'utf8');
// قيمة place في السطر الذي يحمل علامة اللغة (اسم الفريج بكتابتها) — مرةً واحدة بالضبط
const place = (src, mark) => {
  const hits = [...src.matchAll(/place: '((?:[^'\\]|\\.)*)'/g)].map((m) => m[1]).filter((v) => v.includes(mark));
  if (hits.length !== 1) throw new Error(`place with «${mark}»: found ${hits.length}, expected 1`);
  return hits[0];
};
const MARK = { ar: 'الفريج التراثي', en: 'Heritage Freej', zh: '弗里季', de: 'Traditioneller Freej', ru: 'Фридж', ur: 'فریج', tr: 'Füreyc' };
const RULING = 'OWNER 2026-11-05 (tr-events-1 question 4): the Creative Al-Ahsa Festival has ONE venue, the Heritage Freej INSIDE the Municipality Fort (قلعة الأمانة). The published comma form «Heritage Freej, the Municipality Fort» reads as two places. The source now says «الفريج التراثي داخل قلعة الأمانة» / "Heritage Freej inside the Municipality Fort". Render that relation (the Freej is within the fort) with the names exactly as your published value writes them; change only what the relation needs.';
for (const lg of ['de', 'ru', 'ur', 'tr']) {
  const p = {
    id: `${lg}-creative-place`, file: F, kind: 'ts', field: 'place',
    role: `Venue line of the Creative Al-Ahsa Festival: the event card on /${lg}/events/ and the venue fact on its own page /${lg}/events/creative-alahsa-festival/. One TS single-quoted string, a name phrase, no final full stop.`,
    ruling: RULING,
    current: place(cur, MARK[lg]),
    en_before: place(show, MARK.en), en_after: place(cur, MARK.en), ar_before: place(show, MARK.ar), ar_after: place(cur, MARK.ar),
    zh_precedent: place(cur, MARK.zh),
  };
  if (p.en_before === p.en_after || p.ar_before === p.ar_after) throw new Error(p.id + ': the source did not change');
  const dir = path.join(R, `${lg}-translation/output/owner-rulings-1106b`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch: 'owner-rulings-1106b', lang: lg, date: '2026-11-06', base: BASE, positions: [p] }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${p.current}`);
}
