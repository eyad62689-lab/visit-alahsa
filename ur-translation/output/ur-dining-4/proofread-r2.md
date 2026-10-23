# Proofread r2 — batch ur-dining-4 (judge-r2.json): 1 MANDATORY, 7 RECOMMENDED

Reader: independent stage-5 proofreader. Inputs read: RUNBOOK-r5.md, PROOFREAD-BRIEF-r2.md, judge-r2.json (against judge-r1.json and ur-05.json), pack.json, ref.json, termbase.json (484 live rulings, highest N829; keys N840-N844 absent), tm.json, blind-input.r2.txt, ur-dining-5 judge-r2.json/ur-04.json (for N851/N853/N855-N857 collisions).

## Tool lines (verbatim)
- `node verify.mjs ur-dining-4 judge-r2.json` -> `OK judge-r2.json: 6 strings, 15 termbase additions, 43 notes`
- `node merge-memory.mjs ur-dining-4 judge-r2.json` (dry run, no --write) -> `termbase +14 (pending), 1 identical skipped, 0 notes appended; rulings 491 (+2 stage 4, +5 judge); amendments 0; owner questions 0; tm 2007 -> 2013`

## What was verified and found clean
1. Diff. Changed `strings` keys r1->r2 = exactly `baking-up.body`, `dar-huwaija.body`, `dot-bakery.body`, `greasy-fingers.body`, `karak-raslan.body` = the five round-2 `judge_edits`; `dar-basma.body` unchanged in r2 (edit entry is the r1 one). The first six `judge_edits` are byte-identical to judge-r1's; each r1 edit has before == ur-05 string and after == r1 string; each r2 edit has before == r1 string and after == r2 string (11 entries, no silent change). `notes` = r1 notes + 7 new `[j2]` notes (note 34 got an appended `[j2] Closed:` sentence only); N840-N842 byte-identical to r1.
2. Text, all six final bodies: no ي ك ة ه ى أ إ ۃ, no «»؛, no U+00A0 or invisible marks, no straight punctuation, Latin digits only, no Latin letters, “ ” balanced (the new «کڑک رسلان» is in “ ” per N821), one paragraph each ending «۔», no double spaces. All six strings occur verbatim in blind-input.r2.txt. Published names byte-identical to ref.terms/termbase (الحوی, خنینہ, سنیار, لاوا, رسلان, «مخبز و مقہی ڈاٹ», «انسٹاگرام», «اکاؤنٹ», «تجارتی نام»; «برج فخر» is a new addition, not published). N826 form «اپنی پہچان بناتا ہے» matches the termbase text; N851 (dining-5) «تجارتی نام» used as there.
3. Facts. dar-huwaija etymology: sense of «حاجہ», diminutive «حویجہ», use for "a particular material object" — all three in the English and Arabic, none added («کوئی» dropped; zh/de/ru precedents attach the use to huwaija as here). Colon sentences: greasy-fingers (Al Hawy, Khunaina) and karak-raslan (Sinyar, Lava with «کھانے کی جگہیں» = Arabic «مطعم» ×2) match both sources. baking-up merged location sentence keeps "commercial unit / modern building / not standalone / Fakhr Tower". dot-bakery «بتاتا ہے» = English "lists", Arabic «معلنة». greasy-fingers N844 sentence adds no fact.
4. Record. Ids N840-N844 unused in the termbase, in ur-dining-5 (N850-N857 only) and in ur-stores-1; `termbase_additions`: 15 entries all with en/ur/source/gender; the only key already live is «انسٹاگرام» (en «Instagram», identical — skipped by the merge). `tm_pairs`: 6, ur identical to final strings, en identical to pack. `scores_row`: well-formed, round 2, 91 = lowest page (axes 28+26+19+8+10 = 91; per-page 92/93/91/92/91/92). `blind_reader_counts` match the 42 rulings (9/18/5/10; serious 2, medium 21, minor 19).

## MANDATORY

### M1. N840 `binds` over-reaches and collides with N826 and with ur-dining-5 sinyar.body
Key: rulings[N840].binds. Quote: «… the bodies of ur-dining-5 whose Arabic says «من أبرز ما تُعرّف به نفسها / يعرّف نفسه بـ» (or the English ‘puts forward first’) without ‘before anything else’.»
Problem: the slash makes the bare «يعرّف نفسه بـ» a trigger for the new «خاص طور پر» opener. That is exactly the Arabic of ur-dining-5 sinyar.body («ويعرّف نفسه بالمأكولات البحرية», English "presents itself as"), which the dining-5 judge settled under N826 as plain «سمندری غذا کو اپنی پہچان بناتی ہے» (no «خاص طور پر»), and N826 says "Only this formula" for that wording. As written, N840 would make a landed ruling bind a body that its own ruling text (which decides only «ومن أبرز ما تُعرّف به»: ‘among the most prominent’) never intended. The English ‘puts forward first’ clause also re-opens N826's own "before anything else" trigger. A binds clause that reaches other batches must be confined to what is decided.
Fix: replace the `binds` value with:
`ur-dining-4 baking-up.body, and any later dining body whose Arabic says «ومن أبرز ما تُعرّف به نفسها» (‘among the most prominent of what it presents itself with’). The plain «يعرّف نفسه بـ» / ‘presents itself as’ stays under N826 unchanged (ur-dining-5 sinyar.body is not touched), and the ur-dining-3 bodies, where N826 stands as the dining-3 judge amended it, are not touched.`
No change to the text of any string is needed.

## RECOMMENDED

### R1. N843 silently departs from the stored example forms of N828 and N820
Key: rulings[N843]. N828 (live) says "a number word may count them («دو اور جگہیں، خنینہ اور گریسی فنگرز»)" and N820 (live) prints the same comma form; N843 replaces the comma form by the colon form for ur-dining-4/5 while saying it "does not reopen N828". Add one sentence to N843's `ruling`: "The example strings in N828 and N820 (names between commas) are superseded in form by this ruling for ur-dining-4 and ur-dining-5; the ur-dining-3 bodies already judged keep them." Also say in N843 why greasy-fingers stays bare although N828's last sentence keeps a source-given class word (the Arabic gives «فطور الحوي» / «مطعم خنينة»): "bare, because the two classes differ and the English gives none" is already there; add "an exception to N828's last sentence, decided here".

### R2. Stale, redundant «انسٹاگرام» addition
Key: termbase_additions[«انسٹاگرام»]. Quote: "Not in tm.json or termbase.json as a headword (grep on «انسٹ» and 'Instagram' returns nothing there)." That is now false (ur-stores-1 landed it, `status: pending`, en «Instagram»); the merge skips the entry. Fix: delete the entry from `termbase_additions` (the verify count becomes 14) or replace its `source` with "Already in the termbase (ur-stores-1); used in dot-bakery.body".

### R3. Composite termbase key
Key: termbase_additions[«حاجہ / حویجہ»]. The termbase has no key containing " / " (0 of 696), and the two words are separate entries in every other case. Fix: split into «حاجہ» (en "haja, a thing one needs", ar «حاجة») and «حویجہ» (en "huwaija, diminutive of haja", ar «حويجة»), each with gender and the existing source; or key the single entry on «حویجہ» and name «حاجہ» in `note`.

### R4. Repair count disagrees inside the record
Key: breakdown.method vs notes[j2]. breakdown: "after the nine form repairs below"; notes: "10 repairs (9 replacements) in 5 keys"; the five round-2 `why` texts count 3+1+1+2+3 = 10. Fix: breakdown -> "after the ten form repairs (nine replacements) below".

### R5. Cross-batch dependence on unmerged dining-5 rulings is not recorded
Keys: notes (j2), rulings[N843]/[N842]. The text relies on N851 («تجارتی نام», reader #13 rejected under it) and N853 (colon form, cited as precedent in N843) of ur-dining-5 stage 4 (amended in dining-5 j1/j2); neither is in the termbase. The r1 note 34 recorded the same kind of dependence for dining-3 and was closed. Fix: append to note 34 (or a new `[j2]` note): "Cross-batch dependence: N851 and N853 are stage-4 rulings of ur-dining-5 (amended there) and are not yet in termbase.json; cited by id as that batch wrote them. N842 repeats the «مقولہ» decision of N827 (2), which is live."

### R6. karak-raslan: plural class word vs the dining-5 sibling form
Key: karak-raslan.body, last sentence «… دو اور جگہیں بھی ہیں: کھانے کی جگہیں سنیار اور لاوا۔». The same pair of venues is written in ur-dining-5 lava.body as «… دو اور جگہیں بھی ہیں: کھانے کی جگہ سنیار اور رسلان۔» (singular class word). The plural is grammatical and sourced («مطعم» ×2) and N843 records it, so this is not an error; if the owner reads both pages the repeated «جگہیں … کھانے کی جگہیں» is also slightly heavy. Fix if desired: «… دو اور کھانے کی جگہیں بھی ہیں: سنیار اور لاوا۔» (device «اسی فہرست کی» kept) — only with N843 updated to match; otherwise leave.

### R7. greasy-fingers: «یہاں» next to a Latin H1
Key: greasy-fingers.body, «مگر وہ صورت یہاں نہیں لکھی گئی۔». The page's H1 directly above the body (blind-input.r2.txt) is the Latin "Greasy Fingers", so «یہاں» can be read as the page. N844 deliberately bars "see the title above". Fix, if the judge wants it unambiguous and N844 is edited to match: «مگر وہ صورت اس عبارت میں نہیں لکھی گئی۔». Optional.
