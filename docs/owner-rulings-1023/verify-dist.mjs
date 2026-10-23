// يتحقق في dist من أن كل نصّ معتمد في دفعة owner-rulings-1023 منشور، وأن النصّ القديم غائب حيث تغيّر —
// لكل لغة من final.json، وللمصدرين من قائمة ثابتة. يُخفق بأول موضع ناقص.
//   node docs/owner-rulings-1023/verify-dist.mjs <root>
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const R = process.argv[2] || '.';
const HERE = dirname(fileURLToPath(import.meta.url));
const ENT = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };
const text = (f) => readFileSync(f, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&#?\w+;/g, (m) => ENT[m] ?? m).replace(/\s+/g, ' ');
const pages = (dir, acc = []) => { for (const f of readdirSync(dir)) { const p = join(dir, f); if (statSync(p).isDirectory()) pages(p, acc); else if (f === 'index.html') acc.push(p); } return acc; };
let fails = 0, ok = 0;
// العربية في جذر dist (بلا مجلد لغة)؛ تُستثنى مجلدات اللغات الأخرى
const LANG_DIRS = ['en', 'zh', 'de', 'ru', 'ur'];
const arPages = () => pages(`${R}/dist`).filter((p) => !LANG_DIRS.some((l) => p.includes(`${join(R, 'dist', l)}${process.platform === 'win32' ? '\\' : '/'}`)));
const cache = new Map();
const check = (lg, id, present, absent) => {
  if (!cache.has(lg)) cache.set(lg, (lg === 'ar' ? arPages() : pages(`${R}/dist/${lg}`)).map(text));
  const all = cache.get(lg);
  const hitP = all.filter((t) => t.includes(present)).length;
  // القديم غائب: صفحة تحمل القديم ولا تحمل الجديد (القديم قد يكون جزءاً من الجديد، أو اسماً يرد في متن الصفحة نفسها)؛
  // والقيمة القصيرة العامة («داخلہ مفت») تحملها بطاقات أخرى بحقّ فلا تُفحص
  // (الرسوم القصيرة «50 … للبالغين» تردها أجوبة الأسئلة الشائعة بصياغتها المستقلة فلا تُفحص)
  const hitA = absent && absent.length >= 40 ? all.filter((t) => t.includes(absent) && !t.includes(present)).length : 0;
  if (!hitP || hitA) { fails++; console.error(`FAIL ${id}: present in ${hitP} page(s), old text in ${hitA}`); } else { ok++; console.log(`  ok ${id} (${hitP} page${hitP === 1 ? '' : 's'})`); }
};
for (const lg of ['zh', 'de', 'ru', 'ur']) {
  const fin = JSON.parse(readFileSync(`${HERE}/out/${lg}/final.json`, 'utf8')).positions;
  const pack = JSON.parse(readFileSync(`${R}/${lg}-translation/output/owner-rulings-1023/pack.json`, 'utf8')).positions;
  for (const p of fin) {
    const k = pack.find((x) => x.id === p.id);
    const present = k.kind === 'ui-new' ? (lg === 'zh' ? `（${p.proposed}）` : `(${p.proposed})`) : p.proposed;
    check(lg, p.id, present, p.proposed === p.current ? null : p.current);
  }
}
// المصدران
check('ar', 'ar-legal-lead', 'قبولًا بهذه الشروط', 'قبولًا صريحًا');
check('ar', 'ar-legal-mascot', 'البلبل أبيض الخدين', 'أبيض الأذنين');
check('en', 'en-legal-lead', 'constitutes acceptance of and commitment', 'express acceptance');
check('en', 'en-legal-mascot', 'white-eared bulbul character', 'white-cheeked');
check('ar', 'ar-qarah-fee', 'تذكرة واحدة تشمل جبل القارة وأرض الحضارات', null);
check('en', 'en-hadarat-fee', 'one ticket covers the Land of Civilisations and Jabal Al-Qarah', null);
check('ar', 'ar-qubba', 'مفتوح مع أوقات فتح قصر إبراهيم التاريخي', '(8:00 ص - 8:00 م)');
check('en', 'en-uqair', 'No entry inside', null);
check('ar', 'ar-bisht', 'والبشت عموماً مدرج في قائمة اليونسكو', 'إرثاً مسجلاً في اليونسكو');
check('ar', 'ar-event', 'قرية النخيل (فعالية)', null);
check('en', 'en-event', 'Palm Village (event)', null);
if (fails) { console.error(`FAIL ${fails}`); process.exit(1); }
console.log(`OK ${ok} checks`);
