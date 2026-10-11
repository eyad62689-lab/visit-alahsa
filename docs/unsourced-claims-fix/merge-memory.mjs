// يدمج نتيجة الدفعة في ذاكرة الخط الصيني: زوج tm.json، سطر scores.csv، وملاحظة المعجم.
// إدراج نصّي يحفظ تنسيق الملفات ونهايات أسطرها. يُشغَّل مرة واحدة من جذر المستودع.
import { readFileSync, writeFileSync } from 'node:fs';

const ZH = '正值鲜软椰枣与早熟椰枣的时节';
const EN = 'Rutab and early-harvest season';

// tm.json
{
  const f = 'zh-translation/memory/tm.json';
  const s = readFileSync(f, 'utf8');
  if (s.includes(ZH)) throw new Error('tm: الزوج موجود');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  const tail = `${nl}    }${nl}  ]${nl}}`;
  const at = s.lastIndexOf(tail);
  if (at < 0) throw new Error('tm: الذيل غير متوقَّع');
  const pair = [
    '    },', '    {',
    `      "en": ${JSON.stringify(EN)},`,
    `      "zh": ${JSON.stringify(ZH)},`,
    '      "page": "season-now",', '      "field": "seasons.summer.items[0]",', '      "date": "2026-10-07"',
    '    }', '  ]', '}',
  ].join(nl);
  writeFileSync(f, s.slice(0, at) + nl + pair + s.slice(at + tail.length));
  JSON.parse(readFileSync(f, 'utf8'));
}

// scores.csv
{
  const f = 'zh-translation/memory/scores.csv';
  const s = readFileSync(f, 'utf8');
  const nl = s.includes('\r\n') ? '\r\n' : '\n';
  const row = `"season-now (zh): summer bullet ${ZH} (unsourced first-harvest clause dropped in ar/en/zh)",2026-10-07,2,92,"APPROVE (judge 88 at loop 1 with -4 termbase for legacy 鲜软椰枣; owner ratified 鲜软椰枣 as a permitted UI form on the season cards 2026-10-07 -> 92; 早熟品种 variant tried at loop 2 and withdrawn (blind 66 vs 72); blind: no high-severity issue; coordination of rutab and early varieties is source-inherent)"`;
  writeFileSync(f, s + (s.endsWith(nl) ? '' : nl) + row + nl);
}

// termbase.json — ملاحظة مدخل الرطب
{
  const f = 'zh-translation/glossary/termbase.json';
  const s = readFileSync(f, 'utf8');
  const anchor = 'بعد أول ذكر أو بجوار 椰枣 يجوز 软熟鲜枣';
  if (s.split(anchor).length !== 2) throw new Error('termbase: المرساة ليست واحدة');
  const add = '. صيغة واجهة مُقرَّة (2026-10-07): 鲜软椰枣 في بطاقات «فصول الواحة» (SeasonNow) حصراً، لاتّساق سطرَي الربيع والصيف المنشورين';
  writeFileSync(f, s.replace(anchor, anchor + add));
  JSON.parse(readFileSync(f, 'utf8'));
}
console.log('ok');
