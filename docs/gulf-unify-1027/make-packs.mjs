// يولّد حزم دفعة gulf-unify-1027 (zh · de · ru · ur): قرار المالك (2026-10-27) أن يُسمّى الخليج «الخليج العربي» في كل
// لغة. الموضع = المقطع (الجملة) الذي يحمل كلمة الخليج في سطر من ملف تحت src، منسوخاً من الملف حرفياً (`current`) مع
// موقعه (الملف والسطر والحقل)، ليُستبدل مرةً واحدةً بالضبط عند التطبيق.
//   node docs/gulf-unify-1027/make-packs.mjs <جذر الشجرة>
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';

const R = process.argv[2] && path.resolve(process.argv[2]);
if (!R) { console.error('usage: make-packs.mjs <root>'); process.exit(2); }
const DATE = '2026-10-27';
const HIT = { zh: /湾/, de: /Golf/, ru: /[Зз]алив(?!ает)/, ur: /خلیج/ };
// حدّ المقطع: نهاية جملة في اللغة، أو حدّ قيمة (تنصيص) في السطر
const END = { zh: /[。！？；]/, de: /[.!?;]/, ru: /[.!?;]/, ur: /[۔؟!]/ };
// ملفات اللغة: حقول `_<lg>` في محتوى المعالم والمطاعم والفعاليات والواجهة، وملفات اللغة نفسها
const SKIP = new Set(['src/data/content-fingerprints.json']); // يُولَّد من البناء (scripts/fingerprint.mjs)

const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(path.join(R, 'src')).filter((f) => /\.(md|ts|json)$/.test(f)).map((f) => path.relative(R, f).split(path.sep).join('/')).filter((f) => !SKIP.has(f));

// مفتاح الحقل الذي يقع فيه الموضع: `key:` في YAML، أو `"key":`/`'key':` في JSON/TS، الأقرب قبل الموضع في السطر
const fieldAt = (line, i) => {
  const keys = [...line.slice(0, i).matchAll(/(?:^|[\s{,])["']?([\w.\-]+)["']?\s*:\s*["'`]/g)];
  return keys.length ? keys[keys.length - 1][1] : null;
};

for (const lg of Object.keys(HIT)) {
  const positions = [];
  for (const rel of files) {
    const lines = readFileSync(path.join(R, rel), 'utf8').split('\n');
    lines.forEach((raw, n) => {
      const line = raw.replace(/\r$/, '');
      if (!HIT[lg].test(line)) return;
      // نطاق الموضع: من آخر حدّ قبل أول ورود إلى أول حدّ بعد آخر ورود في المقطع نفسه؛ المقاطع المتجاورة تُدمج
      const re = new RegExp(HIT[lg].source, 'g');
      const spans = [];
      for (const m of line.matchAll(re)) {
        let a = m.index, b = m.index;
        // تنصيص غير مهرَّب يحدّ القيمة
        const quote = (k) => /["'`]/.test(line[k]) && line[k - 1] !== '\\';
        while (a > 0 && !END[lg].test(line[a - 1]) && !quote(a - 1)) a--;
        while (b < line.length && !END[lg].test(line[b]) && !quote(b)) b++;
        if (b < line.length && END[lg].test(line[b])) b++;
        while (a < m.index && /\s/.test(line[a])) a++;
        const last = spans[spans.length - 1];
        if (last && a <= last[1]) last[1] = Math.max(last[1], b); else spans.push([a, b]);
      }
      const whole = lines.join('\n');
      for (const [a, b] of spans) {
        let cur = line.slice(a, b);
        // يجب أن يكون المقطع فريداً في الملف؛ وإلا يُوسَّع إلى السطر كله
        if (whole.split(cur).length !== 2) cur = line;
        if (whole.split(cur).length !== 2) throw new Error(`${rel}:${n + 1}: segment not unique even as a whole line`);
        positions.push({ id: `${lg}-${positions.length + 1}`, file: rel, line: n + 1, field: fieldAt(line, a), current: cur });
      }
    });
  }
  const dir = path.join(R, `${lg}-translation/output/gulf-unify-1027`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'pack.json'), JSON.stringify({ batch: 'gulf-unify-1027', lang: lg, date: DATE, positions }, null, 2) + '\n', 'utf8');
  console.log(`${lg}: ${positions.length} positions in ${new Set(positions.map((p) => p.file)).size} files`);
}
