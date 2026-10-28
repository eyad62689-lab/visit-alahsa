# tr-attr-7: proofread of the judge's edit (07-judge.r1.json)

VERDICT: OK. No MANDATORY item. No OPTIONAL item.

## 1. Byte checks
- 54 strings in stage 05 and in the judge's file.
- The only key whose string differs from stage 05 is `national-park.body`. The other 53 are byte-equal.
- `changes` holds one entry (national-park.body). Its `before` equals stage 05 exactly. Its `after` equals the judge's string exactly.

## 2. Edited sentences
Stage 05 (3, 4):
> Parkın hikâyesi Hicri 1382 (1962) yılında, vahadaki köylere doğru ilerleyen kumları durdurmayı amaçlayan bir projeyle başladı. Proje, Suudi Arabistan'ın Tarım Bakanlığına aitti.

Judge (3, 4):
> Parkın hikâyesi Hicri 1382 (1962) yılında bir projeyle başladı. Proje, Suudi Arabistan'ın Tarım Bakanlığına aitti ve vahadaki köylere doğru ilerleyen kumları durdurmayı amaçlıyordu.

- **Grammar and subjects.** Sentence 3: «Parkın hikâyesi ... başladı». Sentence 4: «Proje» is the single subject of both predicates, «aitti» and «amaçlıyordu». The shared subject takes «ve», and the verb phrases are coordinated correctly. The tenses agree (both past, the second imperfective). Both describe the project's state in the past, which matches the English «began ... as a ... project to hold back». PASS.
- **Case suffixes and vowel harmony.** «Parkın» (genitive after k), «bir projeyle» (instrumental, -yle after a vowel), «Bakanlığına» (-ığı + -na, possessive then dative), «köylere», «kumları» (accusative with -ı). All correct. PASS.
- **Apostrophe.** The only apostrophes are the two U+0027 ones, in «Suudi Arabistan'ın» and «Kare'ye». Both are on proper names, and no U+2019 is mixed in. PASS.
- **Turkish letters.** No ASCII-stripped forms and no dotted/dotless case error («Hicri», «hikâyesi», «ılgın», «Millî» are all correct). Item 1 list: none.
- **Repetition created by the edit.** «projeyle» and «Proje» are adjacent. The first has an indefinite noun and the second is the anaphoric subject, which is the natural pattern and does not read as a repeat. The next «proje» is in «rehabilitasyon projelerini», five sentences later, so no clash. Sentence 5 («Yaklaşık 4.500 hektarlık bir alana ... dikildi») still has an impersonal passive, as in stage 05, and the edit does not touch it.
- **Faithfulness to the English** («a story that began in 1382 AH / 1962 CE as a Ministry of Agriculture project to hold back the sands creeping over the oasis villages»):
  - Year, project, ministry, purpose: the English order is kept.
  - «vahadaki köylere doğru ilerleyen kumları durdurmayı» is the unchanged wording for «hold back the sands creeping over the oasis villages».
  - Nothing added, nothing dropped. «amaçlıyordu» renders the English infinitive of purpose («to hold back»). The Arabic's «لحماية قرى الواحة» is not carried, per the English-source rule.
  - «Suudi Arabistan'ın Tarım Bakanlığına aitti» is unchanged from stage 05 and rests on ruling A6-ministry (country before the ministry). «aitti» renders «a Ministry of Agriculture project» without adding a verb the English lacks.
- **P11 Hijri form.** «Hicri 1382 (1962) yılında» is unchanged and consistent with the open-item form used elsewhere in the batch.
- **Markdown and quotes.** No `*`, `_`, `#`, `[`, `]`, `<`, `>`, straight `"`, «», or U+00A0 anywhere in the body (script check: false). No links.
- **Neighbours.** Sentences 2 («Park, Cebel el-Kare'ye yakındır.») and 5 are byte-identical to stage 05 and flow into and out of the edit. The «Parkın hikâyesi» / «Park, ...» openings are not an issue. A subject «Proje» after «projeyle» is natural, and sentence 5 returns to the passive.

## 3. Checker
`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a7 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-7 stages/07-judge.r1.json --prev stages/05-proofreader.json`

RESULT [OK] 0 findings (full text: 07-judge.r1.json.check.txt)

## Checklist for the edited sentences
1 letters: none | 2 names: PASS (unchanged) | 3 suffixes: PASS | 4 address: n/a | 5 headings: n/a | 6 termbase: PASS | 7 punctuation: PASS | 8 numbers and Hijri: PASS | 9 banned styles: PASS | 10 glossing: n/a | 11 structure: PASS

I edited no JSON and wrote no other file.
