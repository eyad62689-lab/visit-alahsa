// قراءة كتل localize(lang, {...}) في قوالب Astro وكتابة كتلة ur فيها — بشجرة TypeScript بلا تقييم شيفرة.
// readLocalize: كائنات ومصفوفات وسلاسل ونصوص قالب بلا تعويض، و`x as T` يُفكّ؛ والقيم غير الحرفية
// (DISTRICT_NAMES.en …) تُسقط في الوضع المتسامح. writeUrBlock: ينسخ نصّ كتلة en ويبدّل كل سلسلة فيها
// بقيمتها الأوردية من خريطة مفاتيح مسطّحة («faqs.1.q»)، ويضعها آخر الكتل؛ قابل للإعادة.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

function parse(REPO, rel) {
  const ts = createRequire(path.resolve(REPO, 'package.json'))('typescript');
  const src = fs.readFileSync(path.resolve(REPO, rel), 'utf8');
  const fmStart = src.indexOf('\n') + 1;
  const fmEnd = src.indexOf('\n---', 4);
  const code = src.slice(fmStart, fmEnd);
  const sf = ts.createSourceFile('view.ts', code, ts.ScriptTarget.Latest, true);
  let lit = null;
  const find = (n) => {
    if (!lit && ts.isCallExpression(n) && n.expression.getText(sf) === 'localize' && n.arguments[1] && ts.isObjectLiteralExpression(n.arguments[1])) lit = n.arguments[1];
    ts.forEachChild(n, find);
  };
  find(sf);
  if (!lit) throw new Error(`لا كائن localize في ${rel}`);
  return { ts, src, fmStart, sf, lit };
}

const unwrap = (ts, n) => (ts.isAsExpression(n) || ts.isParenthesizedExpression(n) || ts.isSatisfiesExpression?.(n) ? unwrap(ts, n.expression) : n);
const keyOf = (ts, sf, p) => (p.name.text ?? p.name.getText(sf));

/** نصّ قالب بتعويض بنائبه المسمّى: `… ${fetchedLabel}` ← «… {fetchedLabel}». */
const tmplText = (ts, sf, n) => n.head.text + n.templateSpans.map((s) => `{${s.expression.getText(sf)}}${s.literal.text}`).join('');

/** deep: تُقرأ أيضاً نصوص القالب بتعويض (بنائب مسمّى) وفرعا الشرط (then/else) — نصوص مرئية لا تكتبها الكتل حرفياً. */
export function readLocalize(REPO, rel, { lenient = false, deep = false } = {}) {
  const { ts, sf, lit } = parse(REPO, rel);
  const val = (n0) => {
    const n = unwrap(ts, n0);
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
    if (deep && ts.isTemplateExpression(n)) return tmplText(ts, sf, n);
    if (deep && ts.isConditionalExpression(n)) {
      const o = {};
      for (const [b, x] of [['then', n.whenTrue], ['else', n.whenFalse]]) { const v = val(x); if (v !== undefined) o[b] = v; }
      return Object.keys(o).length ? o : undefined;
    }
    if (ts.isArrayLiteralExpression(n)) return n.elements.map(val);
    if (ts.isObjectLiteralExpression(n)) {
      const o = {};
      for (const p of n.properties) {
        if (!ts.isPropertyAssignment(p)) { if (lenient) continue; throw new Error(`خاصية غير حرفية: ${p.getText(sf).slice(0, 60)}`); }
        const v = val(p.initializer);
        if (v !== undefined) o[keyOf(ts, sf, p)] = v;
      }
      return o;
    }
    if (lenient) return undefined;
    throw new Error(`قيمة غير حرفية: ${n.getText(sf).slice(0, 60)}`);
  };
  return val(lit);
}

/** مفاتيح مسطّحة لكل سلسلة في كائن («faqs.1.q»، «kindLabels.hotel»). */
export function flatten(o, p = '') {
  return Object.entries(o ?? {}).flatMap(([k, x]) => (typeof x === 'string' ? [[p + k, x]]
    : Array.isArray(x) ? x.flatMap((y, i) => (typeof y === 'string' ? [[`${p}${k}.${i}`, y]] : flatten(y, `${p}${k}.${i}.`)))
      : x && typeof x === 'object' ? flatten(x, `${p}${k}.`) : []));
}

const q = (v) => `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

/** يكتب كتلة ur: نصّ كتلة en مع تبديل كل سلسلة بـmap[المفتاح المسطّح] (إلزامي لكل سلسلة)،
 *  وrewrite(text) لتعديل ما ليس سلسلة (DISTRICT_NAMES.en → .ur). يعيد عدد السلاسل المبدّلة. */
export function writeUrBlock(REPO, rel, map, { rewrite = (t) => t } = {}) {
  const { ts, src, fmStart, sf, lit } = parse(REPO, rel);
  const props = lit.properties.filter((p) => ts.isPropertyAssignment(p));
  const enP = props.find((p) => keyOf(ts, sf, p) === 'en');
  if (!enP) throw new Error(`${rel}: لا كتلة en حرفية`);
  const enNode = enP.initializer;
  const reps = [];
  const walk = (n0, p) => {
    const n = unwrap(ts, n0);
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      if (!(p in map)) throw new Error(`${rel}: لا قيمة أوردية لـ${p}`);
      reps.push([n.getStart(sf), n.getEnd(), q(map[p])]);
      return;
    }
    if (ts.isTemplateExpression(n)) {
      if (!(p in map)) throw new Error(`${rel}: لا قيمة أوردية لـ${p}`);
      const names = n.templateSpans.map((s) => s.expression.getText(sf));
      let v = map[p].replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      for (const nm of names) {
        if (v.split(`{${nm}}`).length !== 2) throw new Error(`${rel}: ${p} يجب أن يحمل النائب {${nm}} مرة واحدة`);
        v = v.replace(`{${nm}}`, () => `\${${nm}}`);
      }
      reps.push([n.getStart(sf), n.getEnd(), `\`${v}\``]);
      return;
    }
    if (ts.isConditionalExpression(n)) { walk(n.whenTrue, `${p}.then`); walk(n.whenFalse, `${p}.else`); return; }
    if (ts.isArrayLiteralExpression(n)) return n.elements.forEach((e, i) => walk(e, `${p}${p ? '.' : ''}${i}`));
    if (ts.isObjectLiteralExpression(n)) return n.properties.forEach((x) => { if (ts.isPropertyAssignment(x)) walk(x.initializer, `${p}${p ? '.' : ''}${keyOf(ts, sf, x)}`); });
  };
  walk(enNode, '');
  const s0 = enNode.getStart(sf);
  let block = sf.text.slice(s0, enNode.getEnd());
  for (const [a, b, r] of reps.sort((x, y) => y[0] - x[0])) block = block.slice(0, a - s0) + r + block.slice(b - s0);
  block = rewrite(block);
  // موضع الإدراج: مكان كتلة ur السابقة (إعادة التشغيل)، أو بعد آخر خاصية في الكائن
  const urP = props.find((p) => keyOf(ts, sf, p) === 'ur');
  const indent = sf.text.slice(sf.text.lastIndexOf('\n', enP.getStart(sf)) + 1, enP.getStart(sf));
  let code = sf.text;
  if (urP) {
    code = code.slice(0, urP.getStart(sf)) + `ur: ${block}` + code.slice(urP.getEnd());
  } else {
    const last = lit.properties[lit.properties.length - 1];
    let end = last.getEnd();
    const comma = code.slice(end).match(/^\s*,/);
    if (comma) end += comma[0].length;
    else { code = code.slice(0, end) + ',' + code.slice(end); end += 1; }
    code = code.slice(0, end) + `\n${indent}ur: ${block},` + code.slice(end);
  }
  const crlf = src.includes('\r\n');
  const out = src.slice(0, fmStart) + code + src.slice(fmStart + sf.text.length);
  fs.writeFileSync(path.resolve(REPO, rel), crlf ? out.replace(/\r?\n/g, '\r\n') : out);
  return reps.length;
}
