# 05d round 2 - proofreading of the three judge round-2 edits (tr-attr-10)

Checked against `pack.json` `en` (and `ar` where relevant). Letters, TDK spelling, no U+00A0 (scanned the whole r2 file: none), apostrophes and name forms in the three strings are clean. No stage file was edited.

## qaisariyah.body - SOUND

Touched sentence: «Bu geçitler baharat ve parfüm kokar, bakırla parıldar.»
English: "passages fragrant with spices and perfume and gleaming with copper".

- Subject: «Bu geçitler» governs both verbs, so the earlier subject switch (bakır as subject of parıldar) is gone. The locus stays on the passages.
- «baharat ve parfüm kokar»: «X kokmak» takes the bare noun, which is correct. «bakırla parıldar»: instrumental with «parıldamak» (TDK: to shine, to gleam) is well formed and means "gleams with copper". Nothing added or lost against the English; Arabic has the same three smells and copper.
- Neighbours: the preceding «Sıkı sıkıya dizilmiş dükkânlar sizi geçitlerden geçirir.» and the following «El-Ahsa'da geleneksel alışverişin kalbi burada atar.» carry the English figures ("lead you through", "here beats the heart") as the source has them; the edit created no new stumble with either.
- Everything else in the body is identical to the round-1 text (diff is the single word «bakır» to «bakırla»).

Fix: none.

## craftsmen-souq.summary - SOUND

Text: «Tarihî Hüfuf'un kalbinde bir çarşı; zanaatkârları, dükkânlarını ve bir el sanatları akademisini bir araya getirir. Çarşı, El-Ahsa Belediyesinin gözetimindedir.»
English: "A souq in the heart of historic Hofuf gathering artisans, their shops and a handicrafts academy, overseen by Al-Ahsa Municipality."

- Possessive reading of «zanaatkârları»: gone. As the object of «getirir» the accusative is forced, and a possessive-plus-accusative object would have to be «zanaatkârlarını». So «zanaatkârları» parses only as plural accusative ("the craftsmen"). «dükkânlarını» is the possessive-plus-accusative form ("their shops"), which is exactly the English "their shops" (the shops of those artisans). The pair reads as English does.
- Second sentence: subject «Çarşı» is named, predicate «gözetimindedir» ("is under the oversight of") renders "overseen"; «Belediyesinin» takes no apostrophe (institution, as ruled A5-names-6). Municipality named once, nothing added or dropped; the order of the English facts is kept.
- Residual (accepted, not a defect): the first sentence is a nominal lead («bir çarşı;» then a verb whose subject is the same çarşı), the same lead shape as najim-museum.summary and the other cards in the batch; it reads cleanly now that the verb chain ends at «getirir.».
- Length: 159 characters (limit "≤ ~160"). Within the limit.

Fix: none.

## duqat-algharash.summary - SOUND (one soft length overrun, one comma note; neither blocks)

Text: «Cebel el-Kare'nin yanında geleneksel bir çömlek atölyesi; El-Garaş ailesinde kuşaktan kuşağa aktarılan atölye, Suudi Arabistan'ın çömlekçilikteki en bilinen merkezlerinden biridir.»
English: "A heritage pottery house by Al-Qarah Mountain, handed down through the Al-Gharash family - one of the Kingdom's best-known homes of the craft." Arabic: «بيت فخار تراثي ... توارثته أسرة الغراش، من أشهر مواقع الحرفة».

- Participle and what is handed down: «aktarılan» sits directly before «atölye», so what is handed down is the workshop (as the English: the pottery house is what was handed down), one verb, one subject («atölye ... biridir»). No tense on the participle, so the aorist-versus-perfective question of round 1 does not arise. «atölye» is the bare definite noun resuming «bir çömlek atölyesi» of the first clause, which is clear.
- Comma after «atölye»: it separates a headed relative phrase (a noun with its modifier) from its predicate, not a headless participle subject. The brief's trap («Müzeyi farklı kılan, …») is the headless form, so this is not the same stumble. A reader can also take the comma as an appositive and reach the same meaning. Strictly TDK would write it without a comma, but the long subject makes it tolerable and it did not trip the checker. Smallest optional fix, only if the owner wants zero commas: delete the comma after «atölye».
- Case of «ailesinde»: locative is right and idiomatic for "within the family" in «ailede kuşaktan kuşağa aktarılmak» (the same sense as «aile içinde»). «ailesince» would mean "by the family" (an agent) and would flip the passive into something closer to the Arabic «توارثته أسرة»; it is not needed, and the body (sentence 3) already uses «El-Garaş ailesinde kuşaktan kuşağa aktarılmıştır», so the two strings agree. Keep.
- «aktarılan» for a workshop: «aktarmak» is slightly more at home with a craft than a premises (a stricter word would be «devredilen»), but the body says «Bu zanaat ... aktarılmıştır», so the summary and body stay in one lexicon; understandable and faithful to "handed down". Not a defect.
- Facts: «Suudi Arabistan'ın» for "the Kingdom's" (A9 precedent), «en bilinen merkezlerinden biri» keeps the hedge "one of ... best-known", «çömlekçilikteki» = "of the craft". Nothing added or dropped. Name forms: «Cebel el-Kare'nin», «El-Garaş ailesinde» byte-correct, apostrophes right.
- Length: 180 characters against the card limit "≤ ~160". A soft overrun of about 20 characters (the English is 143, Turkish is longer in this construction; the round-1 text was already about the same length, so the edit did not cause it). It is a tilde limit and the card text renders in full; report to the owner only. If a trim is wanted, the smallest cut that loses nothing is «Suudi Arabistan'ın en bilinen çömlekçilik merkezlerinden biri» instead of «... çömlekçilikteki en bilinen merkezlerinden biri» (saves 3 characters only), or dropping «geleneksel» (the English's "heritage"), which would lose a word of the source; neither is recommended.

Fix: none required.

## Checker

Command: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a10 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-10 .../stages/07-judge.r2.json --prev .../stages/07-judge.r1.json`

`RESULT [OK] 0 findings (full text: 07-judge.r2.json.check.txt)`
