// readLocalize(REPO, rel) — يقرأ الكائن الحرفي الممرَّر إلى localize(lang, {...}) في قالب Astro
// بشجرة TypeScript (بلا تقييم شيفرة): كائنات ومصفوفات وسلاسل ونصوص قالب بلا تعويض فقط.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

export function readLocalize(REPO, rel, { lenient = false } = {}) {
  const ts = createRequire(path.resolve(REPO, 'package.json'))('typescript');
  const src = fs.readFileSync(path.resolve(REPO, rel), 'utf8');
  const fmEnd = src.indexOf('\n---', 4);
  const sf = ts.createSourceFile('view.ts', src.slice(src.indexOf('\n') + 1, fmEnd), ts.ScriptTarget.Latest, true);
  let lit = null;
  const find = (n) => {
    if (!lit && ts.isCallExpression(n) && n.expression.getText(sf) === 'localize' && n.arguments[1] && ts.isObjectLiteralExpression(n.arguments[1])) lit = n.arguments[1];
    ts.forEachChild(n, find);
  };
  find(sf);
  if (!lit) throw new Error(`لا كائن localize في ${rel}`);
  const val = (n) => {
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
    if (ts.isArrayLiteralExpression(n)) return n.elements.map(val);
    if (ts.isObjectLiteralExpression(n)) {
      const o = {};
      for (const p of n.properties) {
        if (!ts.isPropertyAssignment(p)) { if (lenient) continue; throw new Error(`خاصية غير حرفية: ${p.getText(sf).slice(0, 60)}`); }
        o[p.name.text ?? p.name.getText(sf)] = val(p.initializer);
      }
      return o;
    }
    if (lenient) return undefined;
    throw new Error(`قيمة غير حرفية: ${n.getText(sf).slice(0, 60)}`);
  };
  return val(lit);
}
