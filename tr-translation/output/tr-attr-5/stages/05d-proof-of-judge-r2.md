# 05d: independent proofread of judge round 2 (tr-attr-5)

Files read: BRIEF.md, prompts/05-proofreader.md, stages/07-judge.r1.json, stages/07-judge.r2.json, pack.json. No JSON was edited.

## Checker

`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a5 node .../verify.mjs tr-attr-5 stages/07-judge.r2.json --prev stages/07-judge.r1.json`

`RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)`

## 1. Change integrity

Compared in code, not by eye.
- All 4 `changes[].before` equal r1.strings exactly, and all 4 `after` equal r2.strings exactly.
- Differing keys between r1 and r2: exactly kanzan.body, thulaim.summary, thulaim.body, tuwaither.body. The other 46 strings are byte-equal to round 1.
- Letters/punctuation scan of the four strings: no U+00A0, no U+2019/U+2018, no «» or straight ", no Markdown characters, no dashes, no dotless/dotted-I capitalisation errors, no ASCII-stripped Turkish words. Item 1 list: none.

## 2. Verdicts

### kanzan.body: OK
Edit: «eski Cüvasa Camii'nin» became «tarihî Cüvasa Camii'nin».
- Grammar is unchanged: «Dağın batı yanı, … çevresine bitişir» (subject, dative with bitişmek, verb).
- «tarihî» is correctly spelled with the circumflex.
- It removes the «former mosque» reading of «eski» before a proper name. The English says 'ancient' and the Arabic says «الأثري»; «tarihî» covers both (old, heritage) and invents no fact.
- The comma after «yanı,» is correct and stays: it stops «tarihî» attaching to «batı yanı».
- «Camii'nin»: apostrophe is U+0027, the suffix is correct, and the name is byte-equal to the published title «Cüvasa Camii».
- Neighbours are untouched and still say what the English says: «Hicri 1333 (1915) yılında», «Kral yaralandı, kardeşi Prens Saad ise hayatını kaybetti».
- No new repetition.

### thulaim.summary: OK
Edit: «ilk yer» became «ilk önemli yer».
- The English is 'The first of Al-Ahsa's landmarks'; the Arabic is «أول معالم».
- «önemli yer» is the tm's own idiom for 'landmark' and does not reintroduce «simge».
- «önemli» adds weight, not a fact and not a superlative, so the invent-nothing rule is not touched.
- The semicolon structure and «El-Uyun şehrinin hemen batısında» are unchanged.
- Length is well under 160 characters.

### thulaim.body: OK
Two edits.
1. «ilk yerdir» became «ilk önemli yerdir». Same ruling as the summary, so the summary and body agree. Grammar is fine: the subject «Dağ» takes the predicate «… ilk önemli yerdir».
2. «dağın El-Ahsa'nın kuzeydeki turizm kapısı olarak geliştirilmesini» became «dağı El-Ahsa'nın kuzeydeki turizm kapısı olarak geliştirmeyi».
   - Case and valency are correct: gündeme getirmek takes an accusative object (geliştirmeyi), and dağı is the object of geliştirmek.
   - Subject: «Halktan gelen öneriler … gündeme getirdi». The developer stays unnamed, as in the English 'proposals have been floated to develop it'. This is not the «cami … namaz kılabilir» error: the proposals bring the idea up, and nothing absurd does the verb.
   - Only one genitive is left, so the earlier double-genitive misreading is gone.
   - The hedge «bu fikirler hâlâ öneri aşamasındadır» is intact, matching 'ideas that remain at the proposal stage'.
   - The simple past «getirdi» for the English perfect 'have been floated' is acceptable Turkish.
   - The words «öneriler / fikirler / öneri aşamasındadır» recur, but this was present in round 1 and is not created by the edit.

### tuwaither.body: OK, with one OPTIONAL
Four one-word changes.
1. Sentence 2: «Cebel Ebu Huseys» became «Dağ».
   - The echo with the end of sentence 1 is removed. «Dağ» is unambiguous because the mountain is the subject of «yükselir» immediately before.
   - The 20 km and the village belt still attach to the mountain, as in the English.
2. «sınırlıdır» became «bitişiktir».
   - Grammar is correct: «Dağın batı yanı Et-Tuveysir ve El-Kare hurmalıklarına bitişiktir». Bitişik takes the dative, and «hurmalıklarına» is the right plural-possessive plus dative.
   - It is faithful to 'bordered on the west by the palm groves' and drops the «limited by» reading.
   - Both groves are named; the termbase forms Et-Tuveysir and El-Kare are byte-equal and used article-first.
3. «süzülür» became «eser».
   - «mağaralardan yıl boyunca serin esintiler eser» is idiomatic Turkish.
   - 'Flow' is carried by «eser» (breezes blow from the caves).
   - «yıl boyunca» (year-round) is kept, and nothing is moved to winter or night, so site rule C16 is untouched. The Arabic «على مدار العام» agrees.
   - Not an error: «esinti» plus «esmek» is a slight tautology, but «bir esinti eser» is a stock phrase.
4. Neighbours:
   - «bu da El-Ahsa'nın tortul tepelerinin ortak özelliğidir» is unchanged from round 1 (the antecedent is the cool breezes, a pre-existing reader remark that the judge deliberately left).
   - The sentence about 2024, «dağı … geliştirmek ve işletmek için yatırım sözleşmesi imzaladı», is unchanged and correct.
   - «100.000 metrekarelik» is the P-style Latin digits.
   - Hüfuf and the apostrophes are U+0027 on names and numerals only.

   OPTIONAL (not an error): sentences 2 to 5 now open «Dağ, / Dağın / Dağ, / Dağ,», four in a row, as the judge noted. If a reader stumbles on it, the least invasive fix is sentence 3 as «Batı yanı Et-Tuveysir ve El-Kare hurmalıklarına bitişiktir» (the possessive «yanı» already points to the mountain) and sentence 5 as «Rüzgârın oyduğu kaya oluşumları ve hafif tırmanışa elverişli yamaçlarıyla da tanınır» (subject carried over from sentence 4). Leave as is if the fresh reader does not remark on it.

## Verdict counts
- OK: 4 (kanzan.body, thulaim.summary, thulaim.body, tuwaither.body)
- MANDATORY: 0
- OPTIONAL: 1 (the repeated «Dağ» openers in tuwaither.body)

## Not verified
TDK headwords (tarihî, bitişik, esmek) were not checked against sozluk.gov.tr; the spellings are standard. A fresh blind reader on r2 is still needed before shipping, as the judge's notes say.
