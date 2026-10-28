# tr-attr-3: independent proofread of judge round 2

Files read: BRIEF.md, prompts/05-proofreader.md, stages/07-judge.r1.json, stages/07-judge.r2.json, pack.json (en, arabic_body). Nothing edited.

## 1. Integrity of round 2 against round 1

- Both files hold 22 strings. Exactly three differ: jalaniyah.body, dibs.body, qubba-mosque.body. The other 19 are byte-equal to round 1.
- `changes` has 3 entries. For each, `before` is byte-equal to round 1 and `after` is byte-equal to round 2 (checked by script: true/true on all three).

## 2. Checker

`RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)`

Command run: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a3 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-3 stages/07-judge.r2.json --prev stages/07-judge.r1.json`

Mechanical scan of the three edited strings (by script): no U+00A0, no «» or straight double quotes, no curly apostrophes, no Markdown characters. Apostrophes are all U+0027: Hüfuf'un, El-Ahsa'nın, El-Ahsa'yı, 2017'de, Camii'ne, el-Biat'a, Camii'dir, Kur'an, Kur'an (the last two are unchanged from round 1 and are the standard spelling).

## 3. Verdicts

### jalaniyah.body: OK

Edit: «Kıble duvarındaki iki mihrabıyla … dikkat çeker.» becomes «Cami, kıble duvarındaki iki mihrabıyla … dikkat çeker.»
- Grammar: «Cami,» is a clear subject; «-ıyla … -larıyla» coordination is correct; «mihrabıyla» has the right b/p alternation and harmony. «kıble» is rightly lower-cased in running text.
- Letters: all Turkish letters present, no İ/I error.
- Faithfulness: the English «it is notable for having two mihrabs in its qibla wall and rows of columns carrying pointed arches» has the mosque as subject. Nothing added or dropped. The previous sentence's subject was «caminin çatısı», so the explicit subject removes the real ambiguity the fresh reader hit.
- Names, quotes, Markdown: unchanged; «El-Calaniye Camii», «El-Battaliye Camii», «Uyuniler», «Cübeyl ve Yenbu Kraliyet Komisyonu» as in round 1.
- Style: «Cami,» also opens the sentence two before and the sentence after is not «Cami», so no problematic run. OPTIONAL: none worth making.

### dibs.body: OK

Edit: «Halk arasındaki adı, yanındaki sokağı bir zamanlar dolduran hurma depolarından ve dibs (hurma pekmezi) ticaretinden gelir.» becomes «Halk arasındaki adı, hurma depolarından ve dibs (hurma pekmezi) ticaretinden gelir. Bunlar bir zamanlar caminin yanındaki sokağı doldururdu.»
- «Bunlar» reference: the plural pronoun cannot take the singular «adı», and the two nearest plural-capable antecedents are exactly the date stores and the dibs trade, which are the two things the English relative clause attaches to. It cannot be read as the name, the mosque or the street. Unambiguous.
- Verb: inanimate plural subject takes a singular verb («doldururdu»), correct. «-ırdı» habitual past renders the English «once filled»; «bir zamanlar» is the matching adverb (the habitual plus «bir zamanlar» is a slight redundancy but idiomatic, not an error).
- English fact kept: the English «comes from the date stores and dibs trade that once filled the street beside it» is a single sentence whose relative clause modifies the stores and trade; the split puts the main clause first and the clause second, same order as the English, nothing lost. «caminin yanındaki sokağı» correctly resolves «beside it» (= the mosque) now that the clause is detached.
- Gloss «dibs (hurma pekmezi)» is first and only mention in the body, unchanged. Not in a heading.
- Source note (not a Turkish defect): the Arabic says the dibs «flowed in its street» (يسيل في شارعه) and speaks of the dates market and stores that «neighboured» the mosque. The Turkish, like the English, says «filled the street». This is the English-vs-Arabic divergence for the batch's source_defects; it is not changed or reconciled here, and the round-2 edit neither adds to nor reduces it.
- Everything else byte-equal to round 1.

### qubba-mosque.body: OK

Edit: «Ayrı duran, silindir biçimli bir minare ise …» becomes «Camiden ayrı duran, silindir biçimli bir minare ise …»
- Grammar: ablative «Camiden» with «ayrı», correct; «ise» contrast stays natural after the dome sentence.
- Faithfulness: «free-standing» now has its referent; the Arabic (مئذنة أسطوانية مستقلة) and the English both support it. «Camiden» does not state any new fact beyond what «free-standing» already means. Digits 13 and 19 unchanged.
- Name forms: «Kasr İbrahim», «El-Kut mahallesi», «El-Kubbe Camii» unchanged.
- OPTIONAL: none.

## 4. Counts

OK 3, MANDATORY 0, OPTIONAL 0.

## 5. MANDATORY items

None.
