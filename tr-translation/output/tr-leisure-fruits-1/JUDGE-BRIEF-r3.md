# Judge brief — batch `tr-leisure-fruits-1`, round 3 (closing round)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-lf\tr-translation\output\tr-leisure-fruits-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-lf` (read only)

Round 2 (`stages\07-judge.r2.json`: 91, APPROVE, 17 edits, F14-r2 … F29-r2) was followed by an independent proof (`stages\05d-proof-of-judge-r2.md`: 14 SOUND · 0 FAULT · 3 NOTE) and a third blind reader on the pages rebuilt from r2 (`stages\06-blind-reader.on-r2.md`: 33 + 68 = 101 items; input `06-blind-reader-input.on-r2.filtered.txt`). The two earlier briefs bind. Your input text is `07-judge.r2.json`. Three readers have now read the pages: a form three readers flagged in three different ways is the source's shape unless a plain Turkish form exists that none would flag; an item two readers flagged on one batch string is ruled now with an edit or a keep-with-evidence.

## Threshold items
1. **«(“Bin Züheyri”)»** (three readers: «a thousand»; the quotes of F17-r2 did not help): the English «Hasawi Lime (Bin Zuhairi)» — a local name; Turkish writes «bin» inside Arabic names («Muhammed bin Selman»), so the collision is inherent (A1). Rule: keep with evidence, or «(yerel adıyla “Bin Züheyri”)» — a gloss the English's bracket implies (a second name), no fact beyond it. Binding for the lime-farm page.
2. **«tabanı»** for the fruit's base (r2 #20, r3 #19 — «a foot»): the English «with a golden-yellow base»; rule «alt ucu»/«dip kısmı» or another plain word.
3. **The Palms and Dates Center** name «El-Ahsa'daki Hurma Ağacı ve Hurma Merkezi» (three readers: clumsy): unattested; the Guinness listing «Date and Palm Centre in Al-Ahsa». Rule a cleaner descriptive form («El-Ahsa Hurma Merkezi»? drops «palm» — the English name has both; «El-Ahsa Hurma ve Hurma Ağacı Merkezi»?) with `unattested`, or keep; the record's object stays a source defect.
4. **«mübarek»** (three readers: pious): the English says «a blessed fruit mentioned in the Qur'an» — source shape; three readers. Rule: keep (faithful) and record as an owner question (the English register), or «Kur'an-ı Kerim'de anılan bir meyvedir» if you judge «blessed» redundant with «mentioned in the Qur'an» — say which and why; one treatment for the fig and the kanar sentence.
5. **The cemid gloss** (three readers cannot parse «güneşte kurutulup bekletilmiş misket limonu suyu»): the English «“jameed”: lime juice sun-dried and aged». Rule a split that names the product first («Bu ürüne “cemid” denir: güneşte kurutulup bekletilmiş misket limonu suyu.»), P7 untouched.
6. **The Lomi exhibition sentence** (three readers: bureaucratic «iş birliği içinde», institutions): the English names both institutions; rule the lightest Turkish («Sergiyi El-Ahsa Ticaret Odası ile El-Ahsa Geliştirme Kurumu birlikte düzenler.»); no date exists in the source (record).
7. **«Bu yüzden … ; böylece …»** (proof NOTE 1 + r3 #19): rule the lighter form.
8. **«birkaçı gibi, bunun da … neredeyse yok oldu; … çok az rastlanır»** (r3 #54 + proof NOTE 3: «which others?», said twice): the English «Like several of Al-Ahsa's traditional fruits, its production fell so far that it nearly vanished from the oasis's gardens; today it is rare» — rule a plainer rendering keeping the hedge and both facts («…neredeyse yok oldu; bugün nadirdir»).
9. **«öyle ki olgunlaşınca çatlar»** (three readers: causal): the English «so sweet it splits when ripe» IS causal — source shape; record.
10. **«yapışkanlıkta örnek gösterilir»** (r3 #48 — the third form after «dillere destan», «örnek gösterilir» for «proverbially sticky»): rule a plain form («yapışkanlığıyla ünlüdür») or source shape; record.
11. **«Ancak … göre üretim hızla düşmüş, çeşit de …»** (r2 #58, r3 #50): split into two sentences; «Ancak» kept only if the preceding sentence gives the contrast.
12. **«Bu sayede …»** (r2 #47, r3 #42) and **«ikinci sırada gelen ürünüdür»** (r3 #36): rule plain forms («Bu seçim ona …»; «ikinci ürünüdür» as the English «second crop»).
- Single-reader items on batch strings: rule applied/rejected; published/frame/source as before (the production figures, the three-quarters contradiction, figs beside pomegranate, the Guinness object, the thin cards, health claims as the English has them, «suyla dolup taşar» = «bursting with juice»). Owner questions merged, not duplicated.

## Output
`BATCH\stages\07-judge.r3.json` in the round shape (`"round": 3`, `changes` vs r2, `blind_reader_rulings` for the 101 items with `"reader": "on-r2"`, `proof_rulings` for the 3 NOTEs, `rulings` F<n>-r3 / `rulings_carried`, the three `scores`, `tm_pairs` for every string, carried `termbase_additions`/`source_defects`/`owner_questions` merged, `scores_row` «tr-leisure-fruits-1,2026-10-31,3,<score>,<decision>»). If you make no edit, write the file anyway with `changes: []`. Turkish only through the Write tool or a node script reading 07-judge.r2.json; then the checker with `--prev …/07-judge.r2.json` until `RESULT [OK]`. No repository file edited.

## Report back
Plain ASCII: the RESULT line; the three scores and the decision; the number of keys changed; the twelve decisions in one line each; what you could not verify.
