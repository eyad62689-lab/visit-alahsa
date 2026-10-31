# Judge addendum, round 3: tr-trails-1

Inputs: `06-blind-reader.on-r2.md` (44 items, third fresh reader on the r2 build) and `05d-proof-of-judge-r2.md` (14 edits: 8 sound, 0 faults, 6 notes).

Medium observations on edited spots are ruled here without edits, as the role file requires. **A minimal round 3 was made** because three items are faults of meaning, not taste: `07-judge.r3.json`, 4 keys changed vs r2, checker `RESULT [OK] 0 findings`.

## Round 3: keys changed, and why each crossed from medium to fault
| Key | r2 | r3 | Why it is a fault |
|---|---|---|---|
| `trails.qarah-and-jawatha.stops.jawatha-mosque.text` | «… sonra cuma namazının ilk kılındığı yer, …» | «… sonra cuma namazının kılındığı ilk yer, …» | Three readers stumbled on three successive forms (r1 p3#6, r2 p3#6, r3 p3#5). With «ilk» before the verb, «sonra» and «ilk» clash. The tm order «cuma namazının kılındığı ilk yer» (jawatha-mosque pair) is the memory's form and the one this reader asked for. The meaning is unchanged. |
| `ui.trails.stopsCount` | «Durak» | «Durak sayısı» | The label is a `<dt>` with the number in the following `<dd>` (TrailsIndexView.astro:70, TrailView.astro:105). Singular «Durak» followed by «4» reads "stop number 4" (r3 p1#3), so the count is misread. The pack ctx said the number renders before the label, which does not match the layout. |
| `ui.trails.unescoCount` | «UNESCO listesindeki durak» | «UNESCO listesindeki durak sayısı» | Same `dt`/`dd` structure, so it changes together with stopsCount. This also settles the proof note about «2 UNESCO …»: the number does not precede the label. |
| `trails.oasis-and-springs.stops.oasis-farms.text` | «Toplanan hurmalar arasında en bilinen çeşitlerden biri Halas'tır.» | «En bilinen hurma çeşitlerinden biri Halas'tır.» | Narrowing of meaning (proof note). The English "Khalas being among the best-known varieties" is about date varieties in general, not the fruit picked at these farms. The clause stays its own sentence. |

New rulings: T13-r3 (amends T13-r2), T17-r3 (amends T15-r2), T18-r3; they are recorded in `07-judge.r3.json`. Scores are unchanged (92 / 91 / 91 / 90 / 91 / 91), the batch score is 90, and the decision is APPROVE.

## Blind reader 3: all 44 items

### Page 1: /tr/trails/
1. «Rotalar Önerilen rotalar» (breadcrumb). **cut_artifact**: the eyebrow and the H1 are separate elements; the cut ran them together.
2. Attribution repeats the intro. **frame**: printed in the index head and every trail foot by design (C27).
3. «Durak / 4» read as "stop 4". **applied** (round 3, T17-r3).
4. «Dört çekerli araç» vs «Arabayla»/«Yürüyerek». **rejected**: the English values are mixed in the same way ("On foot", "By car", "4x4 vehicle"), and «dört çekerli araç» is the termbase form (A6-words).
5. «devletin»: which state? **rejected**, carrying the r2 verdict: the English says "the state" and names none, so naming one would add to the source. Sent to the owner.
6. «bileşen», «on iki» vs «12 alan». **rejected** (T10): «bileşen» and «on iki» are det.unesco and the tm. The source label renders its own English "12 inscribed sites".

### Page 2: historic-hofuf
1. Long list; «hâlâ bütün canlılığıyla». **rejected** (r1): this is the hedge the brief requires, and it mirrors the English list.
2. «ilk devlet okulu» (intro) vs «ilk devlet ilkokulu» (stop). **source_defect**: the English says "first government school" in the intro and "first government primary school" in the stop.
3. Century form without «Miladi». **rejected** (T8-r2): the tm form stays. This is the fourth reader to ask for «Miladi» or digits, and it is logged for the calibration page; P11 stays open.
4. El-Kubbe Camii "out of nowhere". **rejected** (r1): this English does not say the mosque is inside the fort.
5. 1913 sentence hanging; «yeniden». **source_defect** (r1).
6. «Jehat» spelled the English way. **rejected** (T2-r2): it is the outlet's own Latin brand (jehat.net), kept as a brand like Saudipedia. «Cihat» read as jihad to two readers and the proofreader; an unplaceable brand is the lesser fault. The brand spelling goes to the owner (owner question in r2).
7. Muharram 1360 without a Gregorian year; 1943 without a Hijri year. **source_defect** (r1).
8. Statesmen unnamed. **source_defect** (r1).
9. «Kurucu», «Faysal» only in the headline. **rejected** (r1): the label is the document's own title.
10. «yaklaşık 422». **rejected** (r1): the English says "some 422".
11. Map note on a page where every stop has a page. **frame** (r1).

### Page 3: qarah-and-jawatha
1. «Kare» = square. **rejected**: Kare (collision) is CLOSED, and A5-Cebel-gloss applies.
2. Is the project fully open now? **source_defect**: the English says only "partly opened in 2016".
3. «Duğa» unexplained. **source_defect** (r1): the binding title, which the English never explains. Sent to the owner.
4. «eve götürebilirler»: buy or given? **rejected** (r2): the English says "can take home".
5. Friday sentence: «ilk» and «sonra» clash. **applied** (round 3, T13-r3).
6. Religious-scholarly register. **rejected** (r1): the English cites Ibn Abbas in Sahih Al-Bukhari.
7. Intro "one of the earliest mosques" vs stop "second mosque". **source_defect**: both claims are the English's.

### Page 4: oasis-and-springs
1. No farm named. **source_defect** (r1).
2. «sıram» season not given. **source_defect** (r1). Sent to the owner.
3. «El-Ahsa pirinci» vs «kırmızı pirinç». **rejected** (r1/r2): the English has "Hasawi rice" and "red Hasawi rice".
4. «projesinden»: definite, never introduced. **rejected** (r2): the English says "the modern irrigation and drainage project".
5. «El-Hara» = stud farm. **rejected** (T16-r2): A1-collisions; the following «pınarlarının» is the mitigation.
6. The «ayn» gloss comes after Ümm Seba and El-Hara. **rejected**, as a medium observation on an edited spot: the gloss stands before the first Ayn name, and the English drops "Ain" from those two names. Ruled without an edit.
7. Ayn el-Cevheriye gets no fact. **source_defect** (r1).
8. Check flow where? **source_defect** (r1). Sent to the owner.

### Page 5: al-asfar-and-national-park
1. "largest bodies of water" in the Gulf region. **source_defect** (r1): this is exactly the English (and the tm wording), with no inland qualifier.
2. «326 milyon m²» vs km². **rejected**: the English figure stays; units are metric as given, with no conversion (style rule birimler; the NUMBER check).
3. Was the reserve created? **source_defect** (r1): "announced" is the English's word.
4. «sürme karası» sounds translated. **rejected**, as a medium observation on an edited spot: the reader understood it ("the meaning gets through"), it parallels «kömür karası» (proof note), and it renders the saying as given. Ruled without an edit.
5. 4x4 for both stops or only the lake? **source_defect**: the mode is per trail in the data and per lake in the intro. Sent to the owner.

### Page 6: al-uqair-coast
1. «devletin»: which state (also the browser description). **rejected**, as p1#5. Sent to the owner.
2. «ilk»: oldest or first reached? **rejected** (r2): the English says "the first seaport", and «ilk» is the tm pair.
3. «ekonomik kapısıydı» repeats the intro. **rejected** (r1): the English repeats "gateway".
4. «emirlik binası». **rejected** (r1): tm pairs uqair-castle and uqair-mosque.
5. «Kurucu» as a title reads as a translated epithet. **rejected**, as a medium observation on an edited spot: it renders "The founding King" and fixed the r2 referent misread. Ruled without an edit.
6. Why before sunset? **source_defect** (r1).
7. UNESCO note on a page with zero badges. **frame** (r1).

**Counts:** 2 applied, 23 rejected, 15 source_defect, 3 frame, 1 cut_artifact (44 in total).

## Proof notes (05d-proof-of-judge-r2.md)
1. Comma after «2016'da kısmen açılan proje». **rejected**: correct Turkish, no reader stumbled there, and it is style only.
2. «ilk kılındığı yer» vs tm «kılındığı ilk yer». **applied** (round 3).
3. «Toplanan hurmalar arasında» narrows the English. **applied** (round 3).
4. «sürme karası». **rejected**: noted as sound by the proofreader; no change.
5. «2 UNESCO listesindeki durak» after a number. **resolved** by T17-r3: the label precedes its value and now reads «UNESCO listesindeki durak sayısı».
6. Bare «Kurucu» in `sources.alwatan-amiriya`. **rejected**: it mirrors the English headline "visited by the Founder" and is the document's title.

## Owner questions (from reader 3)
- Which state does the Ukayr tagline mean ("Where sea trade met the history of the state")? The English names none.
- Is a 4x4 needed for both stops of the Al-Asfar trail, or only for the lake?
- Where can visitors check spring flow before visiting?
- What is "Dougha" (Duğa)? Should the page explain the word?
- When is the siram (date harvest) season?

## Reader 4 (on r3)
Input: `06-blind-reader.on-r3.md`, 55 items from a fourth fresh reader who read the r3 build. Proof `05d-proof-of-judge-r3.md`: 4 sound, 0 faults, 1 note.

Ruled without edits: no string changes, no round 4. Items on a round-3 edited spot are marked **[edited spot]**.

### Page 1: /tr/trails/
1. Breadcrumb glued to the H1. **cut_artifact**.
2. «başvurulan kaynaklar» reads as an editor's note. **rejected**: T9-r2. Reader 1 misread the bare «durağın kaynakları» as water sources, and taste does not outweigh that misread.
3. Attribution line repeats the heading. **frame** (C27).
4. «Kare» read as square. **rejected**: Kare (collision) CLOSED; A5-Cebel-gloss.
5. UNESCO note on a listing page with no badges. **frame** [edited spot: «UNESCO listesindeki durak sayısı» itself "works"]. The note prints by design.
6. «bileşen», order of the note. **rejected**: T10 (det.unesco, tm).
7. «devletin»: which state? **rejected** (r2/r3): the English names none. Sent to the owner.
8. «Dört çekerli araç» vs the adverb values. **rejected** (r3): the English values are mixed the same way; termbase form.

### Page 2: historic-hofuf
1. Breadcrumb glued. **cut_artifact**.
2. Long list; «biat». **rejected** (r1): mirrors the English list; tm baiah.
3. Century form without «Miladi». **rejected** (T8-r2). This is the fifth reader to ask; logged for calibration, and P11 stays open.
4. «Dinî üslup»; mosque not placed. **rejected** (r1): «üslup» renders the English "styles"; this English does not say the mosque is inside.
5. «devasa». **rejected**: renders the English "massive".
6. 1913 sentence hanging; «yeniden». **source_defect** (r1).
7. «Jehat» spelling. **rejected** (T2-r2): Latin brand. The owner question is open.
8. No apostrophe on institution names. **rejected**: TDK and tm practice («Miras Kurumunun», «Vakfına»). Building names take the apostrophe.
9. Semicolon joins a practical and a ceremonial claim. **rejected**: the English sentence joins them the same way ("Restored and open to visitors, it bears witness …").
10. «ilk devlet okulu» vs «ilk devlet ilkokulu». **source_defect** (r3): both are the English's.
11. Three calendar styles. **source_defect** (r1).
12. Statesmen unnamed. **source_defect** (r1).
13. «Kurucu», «Faysal» in the headline. **rejected** (r1): the document's own title.
14. «yaklaşık 422». **rejected** (r1): the English says "some 422".
15. «Yeniden … tekrar». **rejected** (r1): the English has both "rebuilt" and "reopened".
16. «gezilecek yer sayfası olan duraklar». **rejected**: renders the English "stops linked to a landmark page"; it uses the site's category word (sibling of «Tüm gezilecek yerler»).
17. Attribution repeated at the foot. **frame** (C27).

### Page 3: qarah-and-jawatha
1. Breadcrumb glued. **cut_artifact**.
2. «Kare» read as square. **rejected**: Kare CLOSED.
3. Is it fully open now? «kültür turizmi projesi». **source_defect** (r3): the English says "a cultural tourism project partly opened in 2016".
4. «Duğa» unexplained. **source_defect** (r1). Sent to the owner.
5. «Abdülkays» read as a person's name. **rejected**: termbase; A1-collisions; the generic «kabilesi» beside it resolves it (the reader says so).
6. Religious-scholarly register. **rejected** (r1).
7. What does a visitor see today? **source_defect** (r2).

### Page 4: oasis-and-springs
1. Breadcrumb glued. **cut_artifact**.
2. No farm named. **source_defect** (r1).
3. Unnamed farms; «ziyaretçi … konuklar». **rejected**: mirrors the English "farms that welcome visitors, guests learn"; the farms are unnamed in the English.
4. «sıram» read as "my turn"; season missing. **source_defect**: the English gives no season. The collision is accepted (A1-collisions), and the apposition «yıllık hurma hasadı» glosses it. Sent to the owner.
5. «Halas» read as halas (deliverance). **rejected** [edited spot]: an A1-collisions case; «hurma çeşitlerinden biri» beside the name is the mitigation, and the reader resolved it at a second look.
6. «kırmızı pirinç»; rice sentence tacked on. **rejected** (r1/r2): the English has "Hasawi rice" and "red Hasawi rice", and its order.
7. «projesinden» is definite. **rejected** (r2): the English says "the … project".
8. «El-Hara» = stud farm. **rejected** (T16-r2).
9. «ayn» note after two non-Ayn names. **rejected** (r3).
10. Ayn el-Cevheriye gets nothing. **source_defect** (r1).
11. Which springs dried; check where. **source_defect** (r1). Sent to the owner.

### Page 5: al-asfar-and-national-park
1. Breadcrumb glued. **cut_artifact**.
2. «ağırlıkla» read as "by weight". **rejected** for this batch (no edits in the addendum): the meaning is right for "mainly". Logged for the next proof pass, with «ağırlıklı olarak» as the candidate.
3. News-wire register; m² not km²; was the reserve made? **source_defect**: the English figure and "announced" are the source's. No unit conversion (style rule birimler).
4. «sürme» read as "don't drive"; cryptic saying. **rejected** (r3): A1-collisions (sürme = kohl, the TDK noun). «karası» gives the intended colour, as the reader confirms.
5. Distance to the lake; full-day estimate. **source_defect** (r1). The 4x4 question is with the owner.

### Page 6: al-uqair-coast
1. Breadcrumb glued. **cut_artifact**.
2. «devletin»: which state? **rejected** (r2/r3). Sent to the owner.
3. Why before sunset; no distance. **source_defect** (r1).
4. «ilk» ambiguous. **rejected** (r2): the English says "first"; tm pair.
5. Can the buildings be entered? «emirlik binası». **source_defect** for access (not in the English). «emirlik binası» is tm (r1).
6. «Kurucu» added; same as the headline's «Kurucu»? **rejected** (r3): renders "The founding King"; the headline's «Kurucu» is the same epithet, so the reader's link is right.
7. UNESCO note on a route with no badges. **frame**.

**Counts (reader 4):** 0 applied, 30 rejected, 15 source_defect, 4 frame, 6 cut_artifact (55 in total). Two items fall on round-3 edited spots: p1#5 (frame) and p4#5 (rejected).

Proof note r3 (unescoCount: the stops lie within component parts rather than being list entries; the BRIEF.md ctx is stale on the label order): **rejected** for this batch. «UNESCO listesindeki durak sayısı» is a fair label for "UNESCO stops", and the meta.unescoNote explains the components. The stale BRIEF line is recorded for the coordinator; no string changes.

Final text: 07-judge.r3.json
