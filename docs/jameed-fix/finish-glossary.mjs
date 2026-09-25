// ثلاثةُ بنودٍ بتَّها المنسّق بعد تقرير التطبيق. كلُّ بندٍ محروسٌ بقيمته الحالية،
// والكتابةُ بالوصفة البايتيّة المقيسة: JSON.stringify(…, null, 2) ⇐ CRLF ⇐ سطرٌ ختاميٌّ لde وحدها.
import { readFileSync, writeFileSync } from 'node:fs';

const R = process.argv[2] || '.';
let fail = 0;
const no = (m) => { fail++; console.error('  ✗ ' + m); };
const ok = (m) => console.log('  ✓ ' + m);

const load = (p) => {
  const raw = readFileSync(`${R}/${p}`, 'utf8');
  const obj = JSON.parse(raw);
  const round = JSON.stringify(obj, null, 2).replace(/\n/g, '\r\n') + (raw.endsWith('\n') ? '\r\n' : '');
  if (round !== raw) { no(`${p}: الجولةُ الكاملة لا تطابق الملف — لا كتابة`); return null; }
  return { raw, obj, p };
};
const save = ({ raw, obj, p }) => {
  const out = JSON.stringify(obj, null, 2).replace(/\n/g, '\r\n') + (raw.endsWith('\n') ? '\r\n' : '');
  writeFileSync(`${R}/${p}`, out, 'utf8');
  if (/[   ]/.test(out)) { no(`${p}: محرفُ مسافةٍ غير مرئي بعد الكتابة`); return; }
  ok(`${p} كُتب (${out.length} بايتاً)`);
};

/* ───── ١ — de tm pairs[956].en: انحرافُ محرفٍ سابقٌ للدفعة، والذاكرةُ مرجعُ «أعِد الجملةَ حرفياً» ───── */
console.log('\n[١] de tm pairs[956].en — الفاصلةُ العلوية المنحنية ⇐ المستقيمة كما في المنشور');
{
  const f = load('de-translation/memory/tm.json');
  if (f) {
    const pair = f.obj.pairs?.[956];
    // الفاصلتان تُبنَيان بأرقامهما — لا محرفَ تنصيصٍ حرفياً في المصدر
    const CURLY = String.fromCharCode(0x2019);
    const STRAIGHT = String.fromCharCode(0x27);
    const TAIL = ` second crop after dates: its summer season, the jameed sun-drying tradition, and a guide to the annual Lomi Exhibition.`;
    const EXPECT_OLD = `Meet the Hasawi lime (lomi), Al-Ahsa${CURLY}s${TAIL}`;
    const NEW = `Meet the Hasawi lime (lomi), Al-Ahsa${STRAIGHT}s${TAIL}`;
    if (!pair) no('لا pairs[956]');
    else if (pair.en !== EXPECT_OLD) no(`pairs[956].en لا يطابق المتوقَّع:\n      ${JSON.stringify(pair.en)}`);
    else {
      // والمنشورُ نفسُه يُقاس لا يُفترض
      const pub = readFileSync(`${R}/src/content/blog/hasawi-lomi-en.md`, 'utf8').split(/\r?\n/)[2];
      if (!pub.includes(`Al-Ahsa${STRAIGHT}s second crop`)) no('المنشورُ الإنجليزي لا يحمل الفاصلة المستقيمة — الحكمُ ينقلب');
      else {
        ok('المنشورُ يحمل U+0027 والذاكرةُ تحمل U+2019 — الانحرافُ مقيس');
        pair.en = NEW;
        pair.date = '2026-09-25';
        save(f);
      }
    }
  }
}

/* ───── ٢ — ru: تغليفُ batch_rulings["jameed-fix"] كجيرانه الأربعةَ عشرَ ───── */
console.log('\n[٢] ru batch_rulings["jameed-fix"] — يُغلَّف {date, scope, rulings} كجيرانه');
{
  const f = load('ru-translation/glossary/termbase.json');
  if (f) {
    const br = f.obj._meta?.batch_rulings;
    const cur = br?.['jameed-fix'];
    if (!cur) no('لا batch_rulings["jameed-fix"]');
    else if (Object.prototype.hasOwnProperty.call(cur, 'rulings')) no('مُغلَّفٌ سلفاً — لا كتابة');
    else {
      const wrapped = Object.values(br).filter((v) => !Array.isArray(v) && v && v.date && v.rulings).length;
      if (wrapped !== 14) no(`الجيرانُ المُغلَّفون ${wrapped} لا 14 — الحجّةُ تسقط`);
      else {
        br['jameed-fix'] = {
          date: '2026-09-25',
          scope: 'الخطُّ الروسيّ كلُّه ما لم يُنَصّ على غير ذلك في الحكم نفسه. صدرت في دفعة jameed-fix بتاريخ 2026-09-25 (قرار إياد: «الجميد» = عصير اللومي المشمّس المعتّق)، في المرحلتين 4 و5 وأقرّها الحاكم (95/100).',
          rulings: cur,
        };
        ok('غُلِّف بـ{date, scope, rulings} والأحكامُ الخمسةُ محفوظةٌ كما هي');
        save(f);
      }
    }
  }
}

/* ───── ٣ — zh: لا batch_ruling للدفعة، والقاعدةُ عابرةٌ للغات فتُكتب حيث تُقرأ ───── */
console.log('\n[٣] zh batch_rulings["jameed-fix"] — يُضاف (كان غائباً، والحكمُ يعيشُ في ملاحظات المدخلين وحدها)');
{
  const f = load('zh-translation/glossary/termbase.json');
  if (f) {
    const br = f.obj._meta?.batch_rulings;
    if (!br) no('لا _meta.batch_rulings في المعجم الصيني');
    else if (br['jameed-fix']) no('موجودٌ سلفاً — لا كتابة');
    else {
      br['jameed-fix'] = {
        date: '2026-09-25',
        scope: 'الخطُّ الصينيّ كلُّه ما لم يُنَصّ على غير ذلك في الحكم نفسه. صدرت في دفعة jameed-fix بتاريخ 2026-09-25 (قرار إياد: «الجميد» = عصير اللومي المشمّس المعتّق)، في المرحلة 4 وأقرّها الحاكم (95/100). كُتبت بيد المنسّق لأن عملياتَ الدفعة الصينية مسّت المدخلين 99 و479 ولم تقترح حكماً في `batch_rulings` — وما يُكتب في `note` يُقرأ حين يُفتَح المدخل، لا حين يُفتح المعجم.',
        rulings: [
          {
            id: 'ZH-JF-1',
            rule: 'الواقعةُ تُكتب حيث يحملها **مصدرُ الموضع بعد تصحيحه**، وتُترك حيث لا يحمله — **لا بما نشرته الصينيةُ سابقاً**، فالمنشورُ السابق يترجم مصدراً سابقاً. وفي دفعةِ تصحيحٍ يكون المنشورُ محلَّ التصحيح لا مقياسَه. والاختبارُ الإجرائي اللازم قبل أي حكمٍ كهذا: `git diff <commit>^ <commit>` على سطر المصدر نفسه.',
            sources: [
              'المرحلة 4 الصينية في دفعة jameed-fix: قابلت `a9cd199^` بـ`a9cd199` فتبيّن أن العصيرَ والتعتيقَ وظرفَ الأوعية **دخلت المصدرَ في ذلك الالتزام نفسِه** — فالصينيةُ المنشورةُ لم تُسقط ظرفَ الأوعية، لم يكن في مصدرها ما تُسقطه.',
              'بلغ الحكمَ نفسَه حاكما de وru مستقلَّين (‏07.json في اللغتين)، فهو قاعدةٌ عابرةٌ للغات لا اختيارٌ صينيّ.',
            ],
            scope: 'كلُّ دفعةِ تصحيحٍ تمسّ نصّاً منشوراً سلفاً.',
          },
          {
            id: 'ZH-JF-2',
            rule: 'لا يُدخَل **ظرفُ تعاقبٍ** بين تشميس العصير وتعتيقه (‏لا `后` ولا `然后` ولا ما يُفيد أن أحدَهما بعد الآخر) — **فذلك واقعةٌ مضافة**. المصدرُ يصف بمشتقَّين متجاورين أو بواوٍ لا ترتّب («المشمّس المعتّق» · «sun-dried and aged»)، وظرفُ المكان «في أوعية زجاجية» متعلّقٌ بالتعتيق **توزيعاً لا تعاقباً**: يصحّ معه أن يجفّ في وعاءٍ مفتوحٍ ثم يُغلق، وأن يجفّ خارجاً ثم يُعبَّأ، والمصدرُ ساكتٌ عن الفارق. والغموضُ يُرفع علّةَ مصدرٍ ولا تُصلحه لغةٌ واحدةٌ عن الأخريات.',
            sources: [
              'القرّاءُ العميانُ الثلاثةُ رفعوه مستقلّين (zh 41 · de 9 · ru 10)؛ والصينيُّ قال إن الفاصلةَ الصينية «لا تقول الترتيب، وهذا جوهر الطريقة».',
              'الحاكمُ الألمانيُّ أدخل `anschließend` ثم سلّم بعد بحثٍ في تسعة أسطرٍ بأنماط تعاقبٍ في ثلاث لغات: **صفرُ إصابة**. فقُلب الحكم J6 الألمانيّ إلى المنع، ونظيرُه JF-5 الروسي.',
            ],
            scope: 'كلُّ نصٍّ صينيٍّ يذكر الجميد.',
          },
          {
            id: 'ZH-JF-3',
            rule: '«贾米德» (الجميد) = **عصيرُ اللومي المشمّس المعتّق**، لا الثمرةُ المشمّسة. و`青柠干` **لا تُستعمل مقابلاً له** بحال (وهي بعد هذه الدفعة صفرٌ في `src` كلِّه). و`晒制` تبقى في وصف المقال وحده (موضعٌ لم يُمسّ مصدرُه) — فإسنادُ المدخل 479 صُحِّح تبعاً لذلك.',
            sources: [
              'قرار إياد 2026-09-25.',
              'الجارُ المنشور `hasawi-lomi-history-zh.md:86` بمصدره [أخبار 24](https://www.akhbaar24.com/article/detail/615953): «青柠汁经日晒、封入玻璃罐中陈放».',
              'عدٌّ بعد الدفعة على `src` كلِّه: `晒制` = 1 · `青柠干` = 0.',
            ],
            scope: 'كلُّ نصٍّ صينيٍّ يذكر الجميد.',
          },
        ],
      };
      ok('أُضيف بثلاثة أحكام ZH-JF-1…3 بشكل الجار zh-fix-women-souq');
      save(f);
    }
  }
}

console.log(`\n${fail ? '✗ ' + fail + ' إخفاقاً' : '✓ البنود الثلاثة'}`);
process.exit(fail ? 1 : 0);
