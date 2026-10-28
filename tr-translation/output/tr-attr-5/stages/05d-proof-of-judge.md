# tr-attr-5: independent proofread of the judge's round-1 edits (stage 05d)

## Scope
Compared `stages/05-proofreader.json` with `stages/07-judge.r1.json`. Eight strings differ: shaban.body, kanzan.summary, kanzan.body, arbaa.body, thulaim.summary, thulaim.body, tuwaither.summary, tuwaither.body. That makes 8 `changes[]` entries and 11 edits (thulaim.body has 3, tuwaither.body has 2). For each I read the English and Arabic in `pack.json`, the judge's `why` and `rulings`, and the termbase entries for the names. I read each touched sentence together with the one before and the one after. No JSON was edited.

## Whole-file scans
- Every `changes[].before` equals the stage-05 string, and every `after` equals the judge's string, for all 8 keys. The other 42 strings are byte-equal to stage 05 (50 strings in both files).
- No U+00A0, no «» quotes, no U+2019, no `**` or `](` Markdown anywhere in the judge's strings.
- Title and area rows are unchanged and use the termbase forms: Cebel eş-Şaban, Cebel Kanzan, Cebel el-Erba, Cebel es-Suleym, Cebel Ebu Huseys, Et-Tuveysir, El-Kilabiye, El-Uyun, El-Ahsa.
- Name forms in the edited sentences match the termbase and the judge's rulings: Cüvasa Camii'nin, El-Kare, Et-Tuveysir, El-Ahsa Belediyesi (no apostrophe, institution), Kanzan Muharebesi'ne (apostrophe, matching the proposal's `suffix_vowel` «Kanzan Muharebesi'nin · …'ne»).
- No sen-form.
- Checker: `RESULT [OK] 0 findings (full text: 07-judge.r1.json.check.txt)`

## Verdict counts
OK 4 · OPTIONAL 4 · MANDATORY 0

## Per string

### shaban.body - OK
Splitting at the dash gives «Eş-Şaban “doymuş olan” demektir. Bu adın, … geldiği söylenir.». «Bu ad» is the name Eş-Şaban, so the subject and its verb are close together and clear. Both facts and their order match the English: the gloss, then the hearsay about palms and waters. Nothing is added or dropped. Letters and quotes are correct.

### kanzan.summary - OK
«1915 Kanzan Muharebesi'ne sahne olmuştur.» uses the correct case: «-e sahne olmak» takes the dative, and the apostrophe agrees with the termbase proposal. The subject is still the massif and «ve» joins two predicates correctly. It says the same as «site of the 1915 Battle of Kanzan». The tense change from «bilinir» to «olmuştur» is natural.

### kanzan.body - OPTIONAL
The edited sentence is «Dağın batı yanı, eski Cüvasa Camii'nin çevresine bitişir.» It is grammatical, and the subject is now explicit. It matches the English, where the western side of the hills adjoins the mosque's surroundings. The sentence after it is unchanged and still reads correctly.
- OPTIONAL: drop the comma after the subject. Write «Dağın batı yanı eski Cüvasa Camii'nin çevresine bitişir.» A comma between a short possessive subject and its predicate is not needed.
- Minor: the previous sentence starts «Dağ,» and this one «Dağın». That is acceptable.

### arbaa.body - OK
«Dağ, El-Ahsa'nın güneyinde kamp, çöl gezisi ve yürüyüş için en bilinen yerlerden biridir.» The subject «Dağ» is explicit after a sentence whose subject was Et-Taraf. The place phrase now separates the subject from the three activities, so the list of nouns can no longer be misread as a list of subjects. It still says the same as «one of southern Al-Ahsa's best-known spots for camping, desert trips and hiking». Nothing was added or dropped. The «-nda» attachment is slightly looser than the old «-ndeki», but the meaning is the same.

### thulaim.summary - OPTIONAL
«El-Ahsa'nın kuzey kapısındaki ilk yer» is grammatical and fixes the misreading of «simge» as «symbol». «yer» is the tm's word for landmark. The tm also renders landmark with «önemli yer» (e.g. «en önemli yerlerinden biri»).
- Observation: «ilk yer» says less than «first of Al-Ahsa's landmarks». That was already true of «ilk simge». It is not a new error.
- OPTIONAL: «ilk önemli yer», if the owner wants a trace of «landmark». The tm supports it. «yer» alone is also acceptable, so I do not require it.

### thulaim.body - OPTIONAL
Three edits.
1. «ilk yerdir» for «first landmark». Grammatical, and the same note applies as in the summary. «yer» now appears twice in 4 sentences («ilk yerdir» in S2, «kolayca gidilebilecek bir yer yapar» in S4). The repetition is mild and not adjacent.
2. «vahanın kenarlarına serpilmiş». This restores «fringes» (the Arabic is أطراف الواحة). It is correct and faithful, and «-a serpilmiş» takes the dative correctly.
3. «Halktan gelen öneriler, dağın El-Ahsa'nın kuzeydeki turizm kapısı olarak geliştirilmesini gündeme getirdi; bu fikirler hâlâ öneri aşamasındadır.» The grammar is sound: «gündeme getirmek» takes the object «geliştirilmesini», and the proposals are the subject, who put the idea forward. It matches the English («proposals have been floated») and the hedge is kept. The wording is slightly heavy because two genitives meet («dağın El-Ahsa'nın …»), and «öneriler … öneri aşamasındadır» was already there.
- OPTIONAL a: «Halktan gelen öneriler, dağı El-Ahsa'nın kuzeydeki turizm kapısı olarak geliştirmeyi gündeme getirdi; …». This avoids the genitive pair.
- OPTIONAL b: to remove the second «yer», write «çöl gezileri ve yürüyüş için kolayca ulaşılabilecek bir nokta». I do not require it.

### tuwaither.summary - OK
«doğu köylerinin arasında» is a correct possessive group, and it is the same group name as the body and the area row («El-Ahsa'nın doğu köyleri»). It matches the English «amid the eastern villages». Nothing was added.

### tuwaither.body - OPTIONAL
The two edits are correct.
1. S1 ends «Cebel Ebu Huseys yükselir.» and S2 is «Cebel Ebu Huseys, Hüfuf'un yaklaşık yirmi kilometre doğusunda, El-Ahsa'nın doğu köyleri kuşağının ortasındadır.» Now the mountain, not the quarter, carries the 20 km and the village belt, as the English and Arabic have it. Subject, verb and locatives agree.
2. «Dağın batı yanı Et-Tuveysir ve El-Kare hurmalıklarıyla sınırlıdır.» The geographic idiom «X ile sınırlıdır» is correct, and the noun reading of «sınırlar» is gone. «Dağ, rüzgârın oyduğu kaya oluşumları ve hafif tırmanışa elverişli yamaçlarıyla da tanınır.» The explicit subject is needed because the previous sentence ended with the subject «bu». It is faithful to the second «famed for» clause, and «casual climbing» is kept. «yamaçlarıyla» is the correct instrumental on a coordinated pair.
- Echo created by the edit: «Cebel Ebu Huseys» occurs at the end of S1 and at the start of S2 with only «yükselir.» between them. It is not wrong, but it reads heavily.
- OPTIONAL: S2 as «Dağ, Hüfuf'un yaklaşık yirmi kilometre doğusunda, …». The previous subject was the mountain, so «Dağ» is unambiguous. A run of «Dağ,/Dağın» sentences follows (S2–S5), which is the calibration's pattern.
- No fact, season or night/winter claim is added. C16 is respected («yıl boyunca serin esintiler» unchanged).
