# tr-attr-4: independent proofread of the judge's round-2 edits (stage 05d, r2)

## Scope

Input: `stages/07-judge.r2.json` against `stages/07-judge.r1.json`, read with `BRIEF.md`, the role file `prompts/05-proofreader.md` and `pack.json` (English `en`; the Arabic body sits in `ref.json` arabic_bodies). Three strings were edited: tahimiyah-e.body, uqair-mosque.body, abubakr-mosque.body. Each whole edited body was re-read once. No JSON was edited.

## Integrity

- Strings that differ between r1 and r2: exactly `tahimiyah-e.body`, `uqair-mosque.body`, `abubakr-mosque.body`. The other 23 strings are byte-equal to round 1; key order is identical (26 keys in both).
- `changes[]` has 3 entries (the same 3 keys). For each one `before` equals the round-1 string and `after` equals the round-2 string, byte for byte.
- Edit size: uqair 104 words to 104 (one comma added), abubakr 106 to 106 (one word «cami» to «camide»), tahimiyah-e 119 to 120 (one word «camide» inserted).
- Whole-file scans of the three edited strings: U+00A0 none; straight `"` none; «» none; Markdown characters (`*`, `[`) none; the only non-ASCII non-letters are the “” quotes (tahimiyah-e, abubakr), which is the required form; ASCII-stripped Turkish words none; the new words «camide» and the comma carry no apostrophe (apostrophes remain only on names and numerals, as in round 1).
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a4 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-4 stages/07-judge.r2.json --prev stages/07-judge.r1.json`
  `RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)`

## Verdict counts

OK 3 · MANDATORY 0 · OPTIONAL 0.

## Per string

### tahimiyah-e.body - OK
Edited sentence: «Dış duvarla çevrilidir, çatısı hurma ağacı gövdelerinden yapılmıştır ve camide yaklaşık elli kişi namaz kılabilir.»
- Grammar: three coordinated clauses. The first has the implicit subject «Cami» from the previous sentence; the second has its own subject «çatısı»; the third has the subject «elli kişi» and the new locative «camide» (-de after the front-vowel stem cami, with no apostrophe because it is a common noun). The place is now explicit, so the clause no longer reads as a bare subject switch. The pronoun-free structure is natural Turkish.
- Faithful to the English «holding about fifty worshippers»; nothing added or dropped (the number stays «elli» in words, which the brief allows).
- Repetition: «camide» follows «Cami, iç avlunun çevresinde…» in the previous sentence and «Caminin tarihi», «cami» earlier in the paragraph; this is ordinary mosque-page repetition, not a stutter. No action.
- Neighbouring sentences: «Eski Ez-Züheyri deresinin kıyısında inşa edilmiştir» is a passive with the understood subject «cami», which the preceding sentence now makes available through «camide»; the semicolon clause «Cebel el-Kare'nin yamaçları hemen yakındadır» has its own subject. Both parse, as in round 1.
- Round-1 items in the same body (the funeral-prayer sentence, «Ez-Züheyri») are unchanged.

### uqair-mosque.body - OK
Edited sentence: «Eski liman, ziyaretçilerine bütün hikâyesini anlatır; cami bu hikâyenin bir parçasıdır.»
- Grammar: subject «Eski liman» (nominative, set off by the comma), indirect object «ziyaretçilerine» (third-person possessive + dative, the possessor being «liman»), direct object «bütün hikâyesini» (accusative with possessive), verb «anlatır». Vowel harmony correct throughout; «hikâye» is spelled with the TDK circumflex. The comma removes the compound reading «eski liman ziyaretçileri» that left «anlatır» without a subject in round 1. A comma after the subject is permitted where it prevents a misreading.
- Faithful to «part of the full story the old port tells its visitors»: «cami bu hikâyenin bir parçasıdır» renders «part of … story». Nothing added or dropped.
- Repetition: «hikâye» twice in one sentence is the English's own «story … story» echo. «liman» appears again here after the earlier «liman» sentences; that is the English's «old port». Fine.
- Whole body re-read: the preceding sentence «Bugün cami, tarihî liman alanının içindedir.» has the subject «cami», and the new clause switches to «Eski liman» with the subject now stated, so the switch is visible. All other sentences are identical to round 1.

### abubakr-mosque.body - OK
Edited sentence: «Geleneksel karakteri korundu; camide yaklaşık 125 kişi namaz kılabilir.»
- Grammar: «camide» is the locative (front-vowel -de, no apostrophe on a common noun), «yaklaşık 125 kişi» is the subject of «namaz kılabilir» (Latin digits, as the brief requires). This removes the round-1 reading in which a nominative «cami» stood next to the numeral and appeared to pray. «Geleneksel karakteri korundu» keeps its implicit subject (the mosque) from the preceding sentence «Cami, “Prens Muhammed bin Selman …” kapsamında … rehabilite edildi».
- Faithful to «preserving its traditional character while accommodating around 125 worshippers»; the number «125» matches the English; no new fact.
- Neighbouring sentence: «bu aşama Hicri 1441 (2020) yılında tamamlandı» is unchanged and the semicolon before «Geleneksel» still separates two independent statements. Quotes around the project title are “”. The name «Prens Muhammed bin Selman Tarihî Camileri Geliştirme Projesi» is byte-identical to the termbase form. Repetition of «cami» in the last two sentences («Cami» … «camide») is minor and acceptable.

## MANDATORY items
None.

## OPTIONAL items
None.
