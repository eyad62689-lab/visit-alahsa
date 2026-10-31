# tr-home-1: independent proof of the round-3 judge edits (07-judge.r3.json vs 07-judge.r2.json)

Proofreader independent of the batch. Sources read: BRIEF.md, pack.json (en/ar/ctx/keepSpace/allowNums), ref.json (places), 07-judge.r3.json (changes, H…-r3 rulings, strings), 07-judge.r2.json; termbase.json and tm.json searched (A6-ministry, «Çevre, Su ve Tarım Bakanlığı», «Gün batımı», «Suudi Arabistan'ın … Bakanlığı» in published tm bodies). No repository or stage file changed.

## Per key

- **gate.title**: NOTE. «El-Ahsa: Dünyanın en büyük vahasını bölüm bölüm keşfedin». (a) No fact added or lost: the oasis claim is still there, and «bölüm bölüm» carries "chapter by chapter" (it matches rail.label «Sayfanın bölümleri»). The note is about voice. EN/AR describe the oasis revealing itself ("unfolding", تتكشّف لك), while the Turkish tells the reader to act (keşfedin). That shift is acceptable and fixes the three readers' stumble, but the H1 now reads as a call to action. (b) Fixed phrase «dünyanın en büyük vaha-» intact (accusative -sını is a regular case suffix; no «hurma», no «doğal»). C15 has no Turkish regex in check-consistency.mjs, so nothing here can trip it. Capital «D» after the colon is right because a full sentence follows. Sentence case, no final stop. (c) Small repetition: the same verb «keşfedin» appears in water.link «Doğada gezilecek yerleri keşfedin» (chapter 2), and ui.fact.sites.l has «keşfedilecek yer». They sit on different screens and are not a fault, so no change is proposed. (d) «El-Ahsa» byte-identical.
- **gate.lead**: SOUND. «nesillerdir süregelen çarşılar» is a faithful rendering of "souqs passed down through generations" / أسواقٌ تعاقبت عليها الأجيال (continuity across generations, no age claim, no «asırlık»). It is the natural collocation (TDK süregelmek). It is byte-identical to the phrase in memory.lead. All three apostrophes are U+0027 (Arabistan'ın, Bölgesi'nde, El-Ahsa'da). Nothing else in the string changed.
- **memory.lead**: SOUND. It is identical to gate.lead on the generations phrase. The hedge «ilk camilerinden bazıları» ("some of Islam's earliest") is kept. «İslam» has the dotted capital İ. Final stop is right for a paragraph.
- **water.springsL**: SOUND. «280'den fazla artezyen kaynağı vahayı sular» reads correctly in Turkish. After a numeral plus «fazla» the noun is singular. «artezyen kaynağı» is the regular indefinite compound (like «artezyen kuyusu»). The verb «sular» agrees with the singular subject. "Artesian" is kept. Lowercase label, no stop, parallel with the other fact labels. The sources line keeps «pınarlar» in a different context, which is no conflict.
- **water.srcMid**: SOUND. «Suudi Arabistan'ın Çevre, Su ve Tarım Bakanlığı istatistikleri» follows A6-ministry (termbase note: written «Suudi Arabistan'ın Çevre, Su ve Tarım Bakanlığı» in running text). It is the same form the published tm bodies use, with no apostrophe on the institution name (TDK). The country is a disambiguator, not a new fact: the ministry is the Saudi one, and neither EN nor AR names the country. The genitive reads naturally as "Saudi Arabia's ministry's statistics" («… Bakanlığı istatistikleri», like «Sağlık Bakanlığı verileri»). Leading and trailing spaces are kept (keepSpace). The apostrophe is U+0027.
- **qarah.time.morning**: NOTE. «Sabah» = the English "Morning" and the ru precedent «Утро». What is lost: the Arabic arbiter's الضحى means mid-morning (the sun well up, about two hours after sunrise), and «Sabah» covers the whole morning from sunrise. Next to «Şafak» it still reads as the later step, so the sequence holds. The loss is declared in H4-r3 and it outranks the ctx's "Arabic is the arbiter" line for this slider. It is a register trade-off, not a fault. Sentence case, no stop.
- **qarah.time.afternoon**: SOUND (with the H4-r3 loss noted). «Öğleden sonra» = "Afternoon". What is lost: الأصيل means late afternoon with the sun low but still up, and «Öğleden sonra» starts at noon. Can it read as evening? No: in Turkish «öğleden sonra» is the span between noon and «akşam» and is never used for evening or dusk. The ctx guard (not evening, not dusk; tick 4 is sunset) holds, and «Gün batımı» follows it. Lowercase «sonra» is correct sentence case. The row «Şafak · Sabah · Öğleden sonra · Gün batımı» is in one plain register. It matches qarah.drag «şafaktan gün batımına» and the tm form «Gün batımı».
- **tip.soloMuseum**: SOUND. «El-Ahsa Müzesi daha derinlemesine bilgi edinmek isteyenlere bölgenin tarihini ve eski eserlerini sunar.» "for those who want to go deeper" / لمن يريد التعمّق becomes the adverb «derinlemesine», which has no spatial reading after the caves chapter. «bilgi edinmek» supplies the object and adds no fact. It reads alone and after tip.soloWalk («… yürüyerek gezersiniz. El-Ahsa Müzesi daha derinlemesine …»). «El-Ahsa Müzesi» is byte-identical to ref.places.ahsa-museum. Final stop is right (sentence in a paragraph).

## Script checks (07-judge.r3.json vs 07-judge.r2.json)

- All 8 `changes[].before` equal the r2 strings, and all 8 `after` equal the final r3 strings.
- Both files hold 97 strings. No key outside the 8 listed differs from r2.
- No straight double quote, no U+2019, and no double space in any of the 97 strings. Every apostrophe in the 8 edited strings is U+0027. No ASCII capital «I» stands in for «İ».
- Edge spaces: srcLabel «Kaynaklar: » (trailing), srcMid has leading and trailing spaces, srcEnd « (2018).» (leading). srcGuinness and srcUnesco have no edge spaces, as the assembly needs.
- Assembled sources line:
  `Kaynaklar: Guinness Dünya Rekorları, “En büyük vaha” (hurma ağaçları ve pınarlar); Suudi Arabistan'ın Çevre, Su ve Tarım Bakanlığı istatistikleri (hurma ağaçları); UNESCO Dünya Mirası Listesi (2018).`
  It reads correctly, has single spaces at every join, and ends with one final stop.

## Consistency

- gate.lead and memory.lead use the identical generations phrase (H7-r3).
- The H1 matches H13-r3 exactly. Pairs rail.ch-water = water.title and rail.ch-memory = memory.title are untouched by r3.
- The tick row matches H4-r3, and qarah.drag («şafaktan gün batımına») still names the two end ticks with the same words.
- water.springsN «280'den fazla» stays in one shape with water.palmsN «2,5 milyondan fazla» (H2-r3).
- The ministry form matches A6-ministry and H17-r3, and the termbase entry «Çevre, Su ve Tarım Bakanlığı» is byte-identical inside it.
- Published names in the 8 strings (El-Ahsa, Suudi Arabistan, Doğu Bölgesi, El-Ahsa Müzesi, Çevre, Su ve Tarım Bakanlığı) are all byte-identical to the termbase or ref.

Totals: SOUND 6 · FAULT 0 · NOTE 2.
