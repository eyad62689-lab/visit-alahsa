# 05d proofread of judge round 3 - tr-attr-10

String: `duqat-algharash.summary` (only edit of r3; `changes` has one entry).

Edited text (185 characters):
> Cebel el-Kare'nin yanında geleneksel bir çömlek atölyesi; El-Garaş ailesinde kuşaktan kuşağa aktarılmıştır. Atölye, Suudi Arabistan'ın çömlekçilikteki en bilinen merkezlerinden biridir.

English: "A heritage pottery house by Al-Qarah Mountain, handed down through the Al-Gharash family — one of the Kingdom's best-known homes of the craft."

## Verdict: SOUND (no defect; one length note already carried to the owner by the judge)

| Check | Result |
|---|---|
| Grammar, suffixes | SOUND. «Kare'nin», «ailesinde», «kuşaktan kuşağa», «Arabistan'ın», «merkezlerinden biridir», «çömlekçilikteki» are all correct and follow harmony. |
| Apostrophes | SOUND. U+0027 only, and only on proper names (Kare'nin, Arabistan'ın). None on «El-Garaş ailesinde» (no suffix glued to the name). No non-ASCII punctuation glyph in the string. |
| TDK spelling | SOUND. No ASCII-stripped letters. |
| Names | SOUND. «Cebel el-Kare» and «El-Garaş ailesi» byte-identical to the batch rulings; «Suudi Arabistan'ın» for "the Kingdom" matches the A9 precedent. |
| Who does each verb | SOUND, with one small residual. «aktarılmıştır» is a subjectless passive after the semicolon. The first clause is a verbless noun phrase, so the only candidate subject is «çömlek atölyesi». The next sentence says «Atölye», which confirms it. The English also attaches "handed down" to the pottery house. The body uses the same verb with «Bu zanaat» (the craft) as subject. A reader could take the craft rather than the building, but both readings give the same fact, and no wrong meaning results. Not a defect. |
| Sense | SOUND. Nothing added and nothing lost. "heritage" is «geleneksel» (the choice made in earlier rounds), "by" is «yanında», the family and the generation chain are kept, and the hedge "one of ... best-known" is kept as «en bilinen ... biri». |
| Card lead | SOUND. It reads at once: noun phrase, finite clause, then a full sentence with an explicit subject. The "split, don't reorder" lesson is applied and English order is kept. |
| Length | NOTE only. 185 characters against the ≤~160 target in `ctx`. The judge already logged this for the owner, and the proofread of r2 flagged it. The cut that loses nothing is not available, because dropping «kuşaktan kuşağa» would lose the Arabic «توارثته». Not a defect. |

Smallest fix, only if the owner wants the length down: none needed. If forced, drop «geleneksel» (the word "heritage" would then be carried only by «kuşaktan kuşağa aktarılmıştır»). That would remove a word the English has, so it is not recommended.

## Checker

`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a10 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-10 .../stages/07-judge.r3.json --prev .../stages/07-judge.r2.json`

RESULT [OK] 0 findings (full text: 07-judge.r3.json.check.txt)
