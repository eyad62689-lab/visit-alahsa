# tr-attr-12 — independent proof of the judge's round-1 edits (stage 07 r1 against stage 05)

Method: read BRIEF, `07-judge.r1.json` (changes and strings), `05-proofreader.json`, `pack.json` (en/ar/precedent), the Arabic bodies, and searched `termbase.json` and `tm.json`. A script compared all 50 keys.

## Mechanical checks (script, not by eye)
- 50 keys in both files. **43 strings are byte-identical** between 05 and r1; the 7 that differ are exactly the 7 keys in `changes`, and for every change `before` equals the 05 text and `after` equals the r1 text.
- Byte-identical sets after the edits:
  - organiser pair «El-Ahsa Geliştirme Kurumu ve El-Ahsa Belediyesi» ×4 (palm summary, body, practical.1.value, faq.1.a): intact.
  - «Hurma Ağacı Müzesi» ×3 (summary, body, faq.3.a): intact.
  - the four groups «tüccarlar, çiftçiler, zanaatkârlar ve evde üretim yapanlar» ×3 (body, faq.2.a, cta.note): intact.
  - «Kadınlar Halk Çarşısı» in title, body and all five FAQ questions: intact.
  - «Teyit bekleniyor» ×2 (zaki and palm practical.2.value): intact.
- palm-village.body still has 5 paragraphs (`\n\n`); paragraph 3 is untouched, paragraphs 1, 2, 4 and 5 carry the edits.

## 1. women-souq.summary — SOUND
- (a) «tezgâh çarşısı» -> «geleneksel, tezgâhlı bir çarşı» says "traditional stall market" (بسطات); nothing added or dropped; the three facts and the "one of ... living folk-trade scenes" hedge are intact.
- (b) The comma between two coordinated adjectives before «bir çarşı» is correct. «tezgâhlı» takes the back-vowel suffix after «tezgâh» (cf. tezgâhı, dergâhı), so the vowel is right. The nominal fragment after the locative is the same shape as before.
- (c)/(d) No set is touched; no new fact. It is a word-level repair, not a reorder.

## 2. women-souq.body — SOUND
- (a) Two edits. «tezgâhlı» as in 1. «eski Es-Süveyk çarşı bölgesinin» -> «Es-Süveyk'in eski çarşı bölgesinin»: EN "the old Suwaiq market area", and «eski» now modifies the generic «çarşı bölgesi». The same elements are present, and the order of facts is unchanged.
- (b) «Es-Süveyk'in» is a proper name with the apostrophe (P8), and the k stays before a vowel suffix after an apostrophe. The vowel is right: the last vowel is e, so «-in». The termbase addition A12-Suveyk records «Es-Süveyk'in / Es-Süveyk'e». The chain «Es-Süveyk'in eski çarşı bölgesinin kalbindedir» is a regular double possessive and reads in one pass.
- (c) The title «Kadınlar Halk Çarşısı» is untouched.
- (d) This follows A5-r2-historic («eski» before a proper name reads as "former"); here «eski» sits before the generic, so the lesson is respected.

## 3. women-souq.faq.1.a — SOUND
Same «Es-Süveyk'in eski çarşı bölgesinin kalbindedir» as the body, so the pair stays parallel. EN "at the heart of the old Suwaiq market area" is fully carried. The rest of the answer is unchanged.

## 4. zaki-alsalem-farm.body — SOUND
- (a) «vahanın doğusunda» -> «El-Ahsa Vahası'nın doğusunda»: this names the oasis the English calls "the oasis". It is not a new fact, because "the oasis" on this page is Al-Ahsa's (the same page says "other crops of the oasis" and the Hasawi rice). The Arabic has no "east of the oasis" at all; that is already the logged source defect (Turkish follows the English).
- (a) «hasadının çevresinde» -> «hasadıyla ilgili» for "around the Hasawi rice crop": the instrumental «-yla» is the case «ilgili» governs, and the calque is gone. «El-Ahsa pirinci hasadı» was already in 05.
- (b) «El-Ahsa Vahası'nın»: «Vahası» is the proper-name head with the apostrophe, the same form as palm-village.body «El-Ahsa Vahası'ndaki». The later «vahanın başka ürünleri» now has its antecedent.
- (c) All other facts, hedges and the «“Eryaf Zeki”» quotes are unchanged.
- Remark, not a fault: palm-village.summary still has the bare «vahanın hurmalıkları», but the organiser names «El-Ahsa ...» precede it in the same sentence, so its antecedent is present.

## 5. palm-village.summary — SOUND
- (a) EN: "A seasonal destination organised by X and Y amid the oasis palm groves: date shops, restaurants, cafés, craft pavilions and a Palm Museum."
  - The Turkish splits the fragment «Mevsimlik bir gezi noktası.» from the organiser sentence. The order destination -> organisers -> groves -> colon list is unchanged. The facility list is a verbless colon list as in the English, so the tense problem of 05 («... var») is gone.
  - «Hurma Köyü'nü» supplies the missing object. It is the page's own title, so no fact is added.
  - The organiser pair is byte-identical (×4), «Hurma Ağacı Müzesi» is byte-identical (×3), and nothing is dropped.
- (b) «Hurma Köyü'nü» takes the accusative after a possessive stem correctly (Köyü + 'nü). The comma after the long two-institution subject matches the batch convention («Çarşı, …», «Köy, …»). Only one place complement stands before the verb. There is no participial chain.
- (b) The colon-list shape is acceptable. A reader could take the nominative list as the object of «düzenliyor», but the named object «Hurma Köyü'nü» makes the list read as the village's contents, as the English colon does.
- Length: 223 characters against the ctx "~160". The English is itself 191; 05 was 213. It is a soft limit and the judge logged it, so this is not a fault.

## 6. palm-village.body — SOUND (five sub-edits)
- (a) E6a «miras» -> «kültürel miras»: EN "heritage". The tm renders a standalone heritage as «kültürel miras» (muhairis, khuzam, ahsa-house-museum, dar-alturath), and the Arabic says الموروث المحلي. Faithful and grammatical.
- (a)/(b) E6b «birkaç duraklı bir gezidir ... uygun olanı» -> «birkaç duraktan oluşan bir gezidir ... uygun durakları seçebilir»: EN "a tour of several stops, so each visitor can pick what suits their interests and their time". The Arabic says يختار منها ("chooses from them", i.e. the stops), so «durakları» is the Arabic's referent; the English "what" has no other candidate in the sentence. The semicolon replaces "so" as before. The single-noun-subject comma follows the batch convention. The old calque «duraklı» and the referent-less «olanı» are repaired.
- (a)/(b) E6c «Projeyi» -> «Hurma Köyü projesini»: names the antecedent for "The project". The title chain «Suudi Arabistan'ın Doğu Bölgesi Emiri Prens Suud bin Nayif bin Abdülaziz» is one apposition and is unchanged. The possessive in «projesini» (proje-si-ni) is right. No fact is added.
- (a) E6d «onaylandı» -> «teyit edildi» for "is confirmed" (the Arabic is مؤكدة). It is passive with the agent unstated, exactly like the English. It does not collide with «Kesin açılış tarihi» next to it. It is the same root as the ruled card value «Teyit bekleniyor», which is unchanged (×2).
- (a)/(d) E6e: «Stant kayıt sayfasının bağlantısı bu sayfadadır» -> «Stant kayıt sayfasına bu sayfadaki bağlantıdan ulaşabilirsiniz». The English "register for a booth ... through the booth registration page linked on this page" is carried as two sentences (split, not reordered). The person is the verb's subject, and the siz form matches the «kontrol edin / ayırın / sorun» imperatives in the same paragraph. The English gives no "you", but this is the reader-as-actor form the brief asks for, so no fact changes.
- (c) The body still has five paragraphs. The four groups, «Hurma Ağacı Müzesi» and the organiser pair are byte-identical with their other occurrences. The hedges "estimate announced at the opening rather than a recorded attendance figure", "These figures belong to the second edition ..." and "Plan two to three hours" are untouched. The sentence "The exact opening date, the length of the season, opening hours and fees have not been announced" is also untouched.

## 7. palm-village.faq.2.a — SOUND
«Bu sayfadaki bağlantıdan stant kayıt sayfasına giderek.» answers the question «Köye stantla nasıl katılabilirim?» with a manner converb. It is a grammatical standalone fragment, it stands on its own as the JSON-LD answer, and it carries EN "Through the booth registration page linked on this page" with the same fact. The second sentence «Kayıt, katılmak isteyen tüccarlar, çiftçiler, zanaatkârlar ve evde üretim yapanlar için açıktır.» is untouched and the four-group wording is byte-identical with the body and cta.note.

## Closing
7 sound, 0 faults
