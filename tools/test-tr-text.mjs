// حلقة كسر C77 (tools/check-tr-text.mjs): تُكسر نسخة الحقول التركية في الذاكرة لا المصدر، وكل حقنة يجب أن تُمسك.
//   node tools/test-tr-text.mjs
import { checkTrText, collectTrFields } from './check-tr-text.mjs';

const fields = collectTrFields(process.cwd());
const base = checkTrText(fields);
console.log(`clean: ${base.problems.length} problems (${base.stats.fields} fields, ${base.stats.suffixes} suffixes)`);
let ok = base.problems.length === 0;
const inject = (label, mutate) => {
  const copy = mutate(fields.map((f) => ({ ...f })));
  const caught = checkTrText(copy).problems.length > 0;
  console.log(`  ${caught ? 'caught' : 'MISSED'} ${label}`);
  ok &&= caught;
};
const first = (re) => (fs) => fs.findIndex((f) => re.test(f.text));
const swap = (re, from, to) => (fs) => { const i = first(re)(fs); if (i >= 0) fs[i].text = fs[i].text.replace(from, to); else fs.push({ where: 'missing', text: '\u0000' }); return fs; };
inject("P8 U+2019 suffix", swap(/\p{L}'\p{L}/u, /(\p{L})'(\p{L})/u, '$1’$2'));
inject('P2 Al-Ahsa', swap(/El-Ahsa/, 'El-Ahsa', 'Al-Ahsa'));
inject('P2 Al Ahsa', swap(/El-Ahsa/, 'El-Ahsa', 'Al Ahsa'));
inject('P5 Basra Körfezi', (fs) => { fs[0].text += ' Basra Körfezi'; return fs; });
inject('P10 08:00', swap(/08\.00/, '08.00', '08:00'));
inject('iİ combining dot', (fs) => { fs[0].text += ' i̇stanbul'; return fs; });
inject('positive: no suffix apostrophe left', (fs) => fs.map((f) => ({ ...f, text: f.text.replace(/(\p{L})'(\p{L})/gu, '$1 $2') })));
inject('positive: Turkish letters stripped', (fs) => fs.map((f) => ({ ...f, text: f.text.replace(/[ğşıİĞŞ]/gu, 'x') })));
inject('empty guard', (fs) => fs.slice(0, 3));
// العلامة اللاتينية مستثناة لا تُمسك
const brand = checkTrText(fields.map((f, i) => (i === 0 ? { ...f, text: `${f.text} Visit Al-Ahsa` } : f))).problems.length === 0;
console.log(`  brand «Visit Al-Ahsa» passes clean: ${brand ? 'yes' : 'NO'}`);
ok &&= brand;
console.log(ok ? 'BREAK-TEST OK' : 'BREAK-TEST FAILED');
process.exit(ok ? 0 : 1);
