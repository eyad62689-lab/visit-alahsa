import fs from 'node:fs';
const src = JSON.parse(fs.readFileSync('de.json','utf8'));
const OLD = 'Moschee, Kaserne und Turm', NEW = 'Moschee, Kasernen und Türme';
const sites = src.map(s => {
  const n = s.current.split(OLD).length - 1;
  if (n !== 1) throw new Error('anchor count '+n+' in '+s.file);
  const proposed = s.current.replace(OLD, NEW);
  return { file: s.file, line: s.line, current: s.current, proposed,
    decision_note: 'Einzige Änderung: „Kaserne und Turm“ → „Kasernen und Türme“ (ar الثكنات والأبراج, en barracks and towers). Die Aufzählung ist artikellos; Verb „vereint“ hat „die Festung/Sie/Diese Palastfestung“ als Subjekt und bleibt Singular. Rest bytegleich.' };
});
const out = { lang:'de', stage:'01', sites,
  kaserne_ruling: 'Kasernen (Plural). Grund: Der Schiedstext ar sagt «الثكنات» (Plural) in allen fünf Stellen und das Quell-Arabisch der Seite selbst «ثكنات عسكرية» (summary, faq, body); en „barracks“ ist numerusneutral, also entscheidet ar (Regel: Arabisch gewinnt). Der Plural „Kasernen“ steht im Duden; parallel zu „Türme“ liest sich die Dreierreihe Moschee, Kasernen und Türme einheitlich. Seitenkonsistenz mit body_de („eine Kaserne“) wird hier nicht als Bindung gewertet, weil body_de selbst von ar abweicht (s. observations).',
  observations: [
    'body_de von qasr-ibrahim.md (Zeile 17) sagt „eine Kaserne, Wachtürme“, das arabische Original (Zeile 98, faq Zeile 88) sagt «ثكناتٌ / ثكنات عسكرية» im Plural. Nach dieser Korrektur widersprechen sich summary_de („Kasernen“) und body_de („eine Kaserne“) auf derselben Seite. Nicht angefasst (Brief verbietet es) – Vorlage an Eyad: body_de „eine Kaserne“ → „Kasernen“ (minimal: „eine Moschee mit anmutiger Kuppel, Kasernen, Wachtürme, …“).',
    '„Türme“ statt „Wachtürme“ gewählt: die Kurzformel ist nach Brief dreigliedrig und knapp; ar/en der Kurzformel sagen nur «الأبراج»/„towers“ ohne „Wach-“. Kein Begriffswechsel, nur Numerus.',
    'Keine Kaserne-/Turm-Einträge in termbase.json (Gattungswörter, keine Eigennamen); Qasr Ibrahim (der) und „die Palastfestung“ unverändert übernommen.',
    'Nur U+0020 eingesetzt; ü als präkomponiertes U+00FC; kein U+2014 eingeführt (C17). summary_de bleibt eigenständig als meta description (+2 Zeichen je Stelle).',
    'Keine weiteren Vorkommen von „Kaserne“ in src/**/*.md|ts außer den fünf Stellen und body_de.'
  ] };
fs.writeFileSync('out/de/01.json', JSON.stringify(out, null, 1) + '\n', 'utf8');
for (const s of sites) console.log(s.line, s.proposed.slice(0,40), '...', s.proposed.length - s.current.length);
