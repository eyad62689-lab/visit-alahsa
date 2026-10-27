// C77 — أحكام المعايرة التركية الملزمة على كل نص تركي منشور (tr-translation/glossary/termbase.json،
// calibration_rulings). منطق الفحص دالةً نقية على قائمة حقول، كي يُكسر في الذاكرة لا في المصدر
// (tools/test-tr-text.mjs). الحقول من المصدر لا من dist: صفحات /tr/ تحمل هيكلاً إنجليزياً متراجَعاً
// إليه حتى تمرّ دفعة واجهتها (فيه «Al-Ahsa» و«8:00 am» إنجليزيّين صحيحين)، والحقل _tr وحده نصّ تركي.
//
//   P8  علامة فصل اللاحقة U+0027 وحدها: لا U+2019 ولا U+02BC بين حرفين — وحارس إيجابي (لاحقة واحدة على الأقل).
//   P2  الاسم الرأس «El-Ahsa»: لا «Al Ahsa» ولا «Al-Ahsa» (إلا العلامة «Visit Al-Ahsa») ولا «Ahsâ»/«Lahsâ».
//   P5  الخليج «Arap Körfezi»: لا «Basra Körfezi» (ويحرسه C76 على dist كذلك).
//   P10 الأوقات «08.00–23.00»: لا ساعة بنقطتين رأسيتين.
//   i/İ لا «i» متبوعة بنقطة مركّبة U+0307 (أثر toLowerCase بلا محلّ tr على «İ»).
//   حارس إيجابي: حروف تركية (ğ ş ı İ) واردة فعلاً، وعدد الحقول لا ينزل عن الحدّ الأدنى.
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

/** الحدّ الأدنى لحقول _tr المنشورة — يرتفع مع كل دفعة ولا ينزل (حارس فارغ يمرّ بصمت). */
export const MIN_FIELDS = 22;

const RULES = [
  { id: 'P8', re: /\p{L}[’ʼ]\p{L}/u, msg: 'علامة فصل غير U+0027' },
  { id: 'P2', re: /\bAl[ -]Ahsa\b|(?<!El-)\bAhs[âa]\b|\bLahs[âa]\b/u, msg: 'اسم الأحساء بغير «El-Ahsa»' },
  { id: 'P5', re: /Basra\s+[Kk]örfez/u, msg: '«Basra Körfezi» (الحكم «Arap Körfezi»)' },
  { id: 'P10', re: /\b\d{1,2}:\d{2}\b/u, msg: 'ساعة بنقطتين رأسيتين (الحكم «08.00»)' },
  { id: 'iİ', re: /i̇/u, msg: 'i بنقطة مركّبة (U+0307)' },
];

/**
 * @param {{where: string, text: string}[]} fields حقول تركية منشورة
 * @returns {{problems: string[], stats: {fields: number, suffixes: number, turkishLetters: number}}}
 */
export function checkTrText(fields) {
  const problems = [];
  let suffixes = 0, turkishLetters = 0;
  for (const { where, text } of fields) {
    const t = text.replaceAll('Visit Al-Ahsa', '');
    for (const r of RULES) {
      const m = r.re.exec(t);
      if (m) problems.push(`${where}: ${r.id} ${r.msg} — «${t.slice(Math.max(0, m.index - 12), m.index + 16)}»`);
    }
    suffixes += (t.match(/\p{L}'\p{L}/gu) ?? []).length;
    turkishLetters += (t.match(/[ğşıİĞŞ]/gu) ?? []).length;
  }
  if (fields.length < MIN_FIELDS) problems.push(`الحارس صار فارغاً: ${fields.length} حقلاً تركياً — المتوقَّع ≥${MIN_FIELDS}`);
  if (fields.length && !suffixes) problems.push('P8: لا لاحقة واحدة بعلامة U+0027 في النص التركي كله (حارس إيجابي)');
  if (fields.length && !turkishLetters) problems.push('لا حرف تركي واحد (ğ ş ı İ) في النص التركي كله (حارس إيجابي)');
  return { problems, stats: { fields: fields.length, suffixes, turkishLetters } };
}

/** حقول _tr من ملفات المعالم (سطر YAML بقيمة بين علامتي تنصيص مزدوجتين أو خام) وكتلة tr في ui.ts. */
export function collectTrFields(root) {
  const out = [];
  const dir = path.join(root, 'src/content/attractions');
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
    const head = readFileSync(path.join(dir, f), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
    for (const line of head.split(/\r?\n/)) {
      if (line.trimStart().startsWith('#')) continue;
      for (const m of line.matchAll(/\b(\w+_tr):\s*("(?:[^"\\]|\\.)*"|[^,{}\r\n]+)/g)) {
        let v = m[2].trim();
        if (v.startsWith('"')) { try { v = JSON.parse(v); } catch { out.push({ where: `${f}:${m[1]}`, text: '\u0000unparsable' }); continue; } }
        out.push({ where: `${f}:${m[1]}`, text: v });
      }
    }
  }
  const ui = readFileSync(path.join(root, 'src/i18n/ui.ts'), 'utf8');
  const start = ui.indexOf('\n  tr: {');
  if (start >= 0) {
    const block = ui.slice(start, ui.indexOf('\n  } as Record<string, string>', start));
    for (const m of block.matchAll(/^ {4}'([^']+)': '((?:[^'\\]|\\.)*)',/gm)) out.push({ where: `ui.tr:${m[1]}`, text: m[2].replace(/\\'/g, "'") });
  }
  return out;
}
