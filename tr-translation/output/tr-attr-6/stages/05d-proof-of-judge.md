# tr-attr-6 — proofread of the judge's round 1 (stage 05d)

Checker (run as instructed, with `--prev stages/05-proofreader.json`):
`RESULT [OK] 0 findings (full text: 07-judge.r1.json.check.txt)`

## 1. Integrity of the changes
- 59 strings in both stage 05 and the judge file. Exactly three differ: `asfar.body`, `uqair-beach.body`, `salwa-beach.body`. The other 56 are byte-equal to stage 05.
- All three `changes[].before` equal stage 05; all three `after` equal the judge's string.
- Dependent strings: `uqair-beach.faq.2.a` ("Plaj, ailelere ve fotoğraf meraklılarına uygundur; ziyaretçilere ayrılmış gölgeliklere ve tesislere bitişiktir.") still equals the body's last sentence word for word. `uqair-beach.faq.3.a` ("… tarihî Ukayr Limanı'nın yanında.") agrees with the new body ("Plajın yanında tarihî Ukayr Limanı bulunur"). `asfar.faq.2.a` (UNESCO) is untouched and the body's first sentence is unchanged, so they stay consistent. No FAQ answer repeats the edited asfar or salwa sentences. The title, area and summary rows are unchanged.
- The three strings contain no U+00A0, no U+2019, no «» or straight quotes, no Markdown, and no line breaks. The only apostrophes sit on names and numerals (U+0027).

## 2. Per string

### asfar.body — OK (one OPTIONAL note)
- E1: "… su kütlesidir; sakinlik ve açık bir ufuk arayan herkes için bir gezi noktası hâline gelmiştir." The subject «Göl» carries across the semicolon. Only one «ve» is left in the sentence. Nothing is added, dropped or reordered, and the English "that has become a destination for anyone seeking quiet and a wide horizon" is kept.
- E2: "Suudi Arabistan'ın Çevre, Su ve Tarım Bakanlığı 2019'da …". The grammar is correct: the genitive on the country, the ministry as a possessive compound, and a U+0027 on the name only. «Suudi Arabistan'ın» is in the termbase (suffix a). The English "the Ministry of Environment, Water and Agriculture" does not name the country, but the Arabic ministry and the zh precedent make the Saudi referent certain, so no fact is invented. The word «Suudi» is justified by the same logic as A4-Dogu-Bolgesi. The ministry has no termbase entry (the batch records it as a proposal), so there is no byte rule to break. The Turkish name itself is unchanged from stage 05. A6-ministry is coherent with A2-Ajans, which stays without «Suudi» because "Ajansı" already marks a Saudi body.
- OPTIONAL: the newly added genitive makes the sentence open with a long chain "Suudi Arabistan'ın Çevre, Su ve Tarım Bakanlığı". It reads correctly, so I would not change it.
- Neighbours (sentences 3–5 and the closing pair) are unchanged and fine.

### uqair-beach.body — OK (one OPTIONAL note)
- E3: "Plajın yanında tarihî Ukayr Limanı bulunur; liman eskiden El-Ahsa'nın denize açılan kapısıydı."
  - Who does what: the port is "beside the beach" (the beach is in the locative phrase), and the second clause says what the port was. This repairs the bare «Yanında» of stage 05.
  - Faithful to "beside it the historic Al-Uqair port that was Al-Ahsa's gateway to the sea". Facts and order are the same, and «eskiden» renders "was" as in the approved Ukayr Kalesi pair (tm.json: "eskiden Necid'in denize açılan kapısıydı").
  - Name: «Ukayr Limanı» is identical to the termbase; «tarihî» (not «eski») stands before the building's name, as the batch rulings require.
  - Suffixes: El-Ahsa'nın is correct. «bulunur» appears only once in this paragraph.
- OPTIONAL: three of the five sentences now start with «Plaj»/«Plajın» (S2 "Plajın suları", S4 "Plajın yanında", S5 "Plaj,"). S3 "Burası" separates two of them. The edit added one of these. It is readable; the alternative "Yanında, plajla birlikte …" would reintroduce the bare «Yanında» problem, so leave as is.
- The last sentence («bitişiktir») is unchanged; A6-adjoins applies.

### salwa-beach.body — OK (one OPTIONAL note)
- E4: S1 "El-Ahsa'nın en uç güneydoğusundaki Selva kasabasında Selva Plajı bulunur." has one locative and a subject. S2 "Plaj, Suudi Arabistan'ın Katar'a karadan açılan kapısının yanındadır; Arap Körfezi boyunca uzanır ve Hüfuf'a yaklaşık 150 kilometre uzaklıktadır."
  - The subject of every verb in S2 is «Plaj» (yanındadır, uzanır, uzaklıktadır). The order of facts is the English order: town, gateway, Gulf, distance. The gateway is still placed by the beach, as the English says. The recorded source_defect covers the Arabic attaching it to the town.
  - Suffixes: «kapısının» (possessive plus genitive) is correct. Katar'a, Hüfuf'a (u-stem, back vowel «a»), Suudi Arabistan'ın and Arap Körfezi are as in the termbase.
  - Lesson 1 is met (no three place phrases before the verb) and lesson 3 is met (the people or the place are named, not «göl … yüzebilir»-style).
  - «Selva» appears twice in S1 ("Selva kasabasında Selva Plajı"). This was already the case in stage 05 and follows the English "Salwa … Salwa Beach", so it is not an error created by the edit.
- OPTIONAL: «Plaj» now starts S2, and «Plajın» starts S4 and S5, with S6 «Plaj,» (a repetition that pre-existed for S4–S6). Not worth a change.
- S3 onward is byte-equal to stage 05.

## Verdict counts
- OK: 3 (asfar.body, uqair-beach.body, salwa-beach.body)
- MANDATORY: 0
- OPTIONAL: 3 (one soft note per string, none recommended for change)

No MANDATORY items; no fix required.
