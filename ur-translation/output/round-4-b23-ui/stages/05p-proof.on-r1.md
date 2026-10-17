RESULT: must-fix=0 should-fix=0 note=11
1. NOTE — the changed sentence (N400, ev.lomi.intro), read in place. Text now: «… زرعی تقریب ہے۔ الاحساء ایوان تجارت یہ نمائش منعقد کرتا ہے۔ اس کا مقصد کھجور کے بعد الاحساء کے نخلستان کی سب سے مشہور فصل کا جشن منانا ہے۔ نمائش میں آپ …».
   - Agreement: «الاحساء ایوان تجارت» is masculine in the repository termbase (pending), so «منعقد کرتا ہے» is right. The verb is imperfective, so there is no «نے» and the verb agrees with the subject, not with the feminine object «یہ نمائش». «اس کا مقصد» (masculine) + infinitive predicate «… جشن منانا ہے» is standard.
   - Seams: S1 to S2: «یہ نمائش» points back to the name in S1. S2 to S3: «اس». S3 to S4: «نمائش میں آپ …» opens cleanly. No repeated word at either seam and no new punctuation beyond the added «۔». No space before «۔».
   - Meaning against EN "organised by the Al-Ahsa Chamber to celebrate the oasis's most famous crop after dates" and AR «تنظّمه غرفة الأحساء احتفاءً بثمرة الواحة الأشهر بعد التمور»:
     - Left: the purpose infinitive «منانے کے لیے».
     - Entered: the noun «مقصد» ("its purpose"), which carries the same relation.
     - Kept word for word: «کھجور کے بعد … سب سے مشہور فصل», with the crop still unnamed, as both sources leave it.
     - Order: organiser and act first, then purpose, as in both sources. No fact entered or left.
   - Two things the fresh reader will test:
     - «اس» can be read as the Chamber (the subject of S2) as well as the exhibition. Either reading stays within the source, because the purpose belongs to the organising. The on-05 reader's own suggestion used this same «اس کا مقصد» after the same kind of sentence (item 37).
     - S3 still has the genitive chain before «منانا ہے», but its subject is two words and stands first. b22 on-05 item 44 also said the crop is never named. The new wording leaves it unnamed, by the sources.
   - Smallest fallback if the reader stumbles on «اس»: «اس نمائش کا مقصد …». No change asked.
2. NOTE — N400's record against the text it rules (record only, optional):
   - (a) "binds: ev.lomi.intro (second sentence)": the ruled form is now sentences 2 and 3.
   - (b) "a 17-word purpose phrase": «کھجور … منانے کے لیے» is 16 words, or 18 counted from «یہ نمائش».
   - (c) "every word of the phrase is kept": true of the content words. «منانے کے لیے» became «منانا», with the purpose moved into «مقصد».
   - Its other claims hold. The withdrawn sentence was unchanged from b22 stage 1 to b23 stage 5: S2 is the same in b22 01–05, r1, r2 and b23 01, 04 (by script). The three b22 reader items quoted are verbatim: on-05 44 "subject is far from the verb", on-r1 49 "lost the subject", on-r2 47 "lost the thread".
3. NOTE — the other 167 strings.
   - Against stage 5: same 168 ids, same order, one difference only (ev.lomi.intro, by script, b23-ui/s5p-dump.txt).
   - Against the precedent (b22 round 3), two differences only: ev.kafu-nights.intro (new) and ev.lomi.intro (N400). Every other string is byte-identical (s5p-cmp.txt).
   - Same English gives the same Urdu across 168 ids, except "Festivals & Events" (events.title / evd.crumb), which N368 rules.
4. NOTE — the new Kafu intro, read once more in place under the h1 «“کفو” کی راتیں»: «“کفو” عربی کے ایک فعل سے نکلا ہے جس کا مطلب ہے “صلہ پانا”، یعنی انعام اور تعریف حاصل کرنا۔ ان راتوں کی نمایاں سرگرمیوں میں “غبقہ” بھی شامل ہے۔ یہ خلیجی عرب ممالک میں رمضان المبارک کی راتوں کا ایک مقبول کھانا اور سماجی رسم ہے۔».
   - Clause by clause against EN: the verb origin, the gloss in marks, the gloss of the gloss after «یعنی», "among the highlights" («… میں … بھی شامل ہے»), the Ghabqa in marks, "popular meal and social custom", "nights of the holy month of Ramadan" («رمضان المبارک کی راتوں»), "Arab Gulf states" (N393 A).
   - Nothing added. "held" is left implicit in the genitive. «بھی» is carried by "among".
   - «نکلا ہے» is masculine (the word). «یہ … ہے» does not exercise the gender of «غبقہ», as N392 says. «ان راتوں» points back to the h1 name.
   - Marks are balanced: 9 U+201C and 9 U+201D in the batch, none with an inner space. The kafu strings are unchanged in r1.
5. NOTE — every machine guard, read the way tools/lib/rulings.mjs guardClauses reads it (s5p-guards.txt). roundRulings for b23-ui r1 takes 13 clauses from b22/b23, all now sourced from this file:
   - N351: «کفو کی راتیں», «کفو کا تفاعلی باورچی خانہ»
   - N353: «جامعہ شاہ فیصل»
   - N355: «چوغوں کا تفاعلی بازار»
   - N365: «اپنے موسم کو مکمل سفر بنائیں»
   - N377: three pavilion forms
   - N378: one form
   - N379: two forms
   - N381: «سب کے سامنے کھانا پکانا»
   - N400: the whole withdrawn 21-word clause
   Each clause, compared with b22 round 3, is identical. Each is 0 in the text, 0 in tm.json and 0 in src/. All are exact withdrawn multi-word forms, and none binds an ordinary phrase. «بچوں کا حصہ» stays proofreader-only (N377, round-3 fix).
   - N393's guard yields NO machine clause. B «خلیج کے عرب ممالک» stays proofreader-only, as the brief requires. N391 and N392 yield none.
   - N351's amended guard adds proofreader text only. The intro writes «“کفو”» in marks, as that text says.
   - Retired keys «کفو کی راتیں» and «جامعہ شاہ فیصل»: 0 in the text, not in termbase_final. The quote mark breaks the substring inside «“کفو” کی راتیں».
6. NOTE — the re-issued calibration, checked by script against the precedent (s5p-cmp.mjs).
   - The precedent's calibration, termbase_final, strings and source_defects are byte-identical to b22-ui/stages/07-judge.round3.json.
   - All 25 carried ids are present (BRAND, N351–N369, N376–N381), with no entry missing. N370–N375 are absent from b22 round 3 as well.
   - Every carried entry is the round-3 text plus an appended b23 line in ruling_or_recommendation and ruled_by. Two exceptions:
     - N351.guard is amended inside its last sentence ("…, and the intro writes the word in the same marks."). ruled_by says "re-issued and amended".
     - BRAND.evidence is rewritten: b22-ui → b23-ui, plus "the new intro does not name the site". BRAND is untouched, so no ruling moved.
   - The 22 entries whose line says "the text it binds is byte-identical to b22 round 3": none of them names either changed string in binds, strings_affected or its ruling text, so the claim holds for each.
   - The three entries that do name a changed string carry their own b23 line, and each is accurate:
     - N351: the intro.
     - N362 and N367: "N400 … does not touch the quoted name or the alias question". The name is still in marks in the intro, and no alias was imported.
7. NOTE — the record fixes asked by b22's last proof (05p-proof.on-r2.md) are carried, because b23 carries round 3 verbatim:
   - Item 1: «بچوں کا حصہ» is out of N377's machine clause.
   - Item 2: N353 and the «شاہ فیصل یونیورسٹی» source give the full counts (Saud 112:13, Abdulaziz 54:39), state the class boundary («جامعہ ام القری» 88), and say the loan is the majority form, not the only one. The owner line now reads "majority form of its class", with no "unattested".
   - Item 3: the bisht entry carries the round-3 line withdrawing "in marks in running text".
   - Item 4: N379 records «نشاندہی» 567 / «نشان دہی» 2047.
   - Item 6: N353 SCOPE says the loan is admitted inside names of this class only.
   - Item 7: N351 says it meets P3c-labels through its key and is an exception to N137 for this key only.
   - Item 8: N362 says the bisht name has no running text here.
8. NOTE — the new entries N391, N392, N393 and N400, read entry by entry. Each one's candidates, evidence, ruling, binds, guard and strings_affected agree.
   - N391: the quoted rulings check out against the repository termbase:
     - P17: «ولا تُضاف حركات ولا گلوس لاتيني للنطق».
     - N82: "no zabar, zer, pesh or jazm is written on any name".
     - N72: "No gloss and no vowel sign".
     - N83: "ruling P17 adds no vowel sign".
     - N122: "no vowel sign, P8/P17".
     - «شندل»: "a vowel mark, which ruling P17 bars".
     The claim that the machine would pass U+064E (only the izafat marks are barred) is stated as a reason the bar rests on the rulings, which is correct.
   - N392: its quotes of acts.3 and the intro match the text.
   - N393: its record matches the text and the reader's item 34.
   - The only non-Urdu letterforms in the new record text are Arabic quotations (P17, and the AR source in N400), plus U+0650 in N400 candidate C «ایوانِ». That candidate is the reader's own refused wording, quoted, and is not in the text.
   - The stage-4 open items were N391–N393 plus BRAND untouched. All are calibrated, and there is no N394–N399 to cover.
9. NOTE — termbase_final.
   - The same 30 keys as b22 round 3. No key, gender or status changed.
   - Notes are appended on «غبقہ», «“کفو” کی راتیں» and «حساوی لیموں کی نمائش», and each agrees with N392, N391 and N400.
   - Every key stands byte-identical in the strings, except «ڈراما», which stands as its recorded plural «ڈرامے».
   - Small point (record only, optional): the «غبقہ» note's STAGE 1 line still quotes the stage-1 one-sentence intro with «خلیج کے عرب ممالک» (N393 B). The STAGE 4 line says the intro now writes «خلیجی عرب ممالک», but no line quotes the current two-sentence form. N392's evidence does quote it.
10. NOTE — scores and rulings.
    - All eleven page sums match their breakdowns: list 91, bisht 94, qaisariyah 95, kafu 91, dates 91, palm 91, lomi 93, uqair 95, wafrah 92, horse 91, creative 92. The top-level breakdown is Kafu's.
    - Batch = lowest = 91, against a threshold of 90: APPROVE.
    - Against b22 round 3, only Kafu (27/25 → 28/26) and lomi (nativeness 25 → 26) moved, as the notes say.
    - blind_reader_rulings 1–52 are each ruled once, matching the reader's 52 items. Item 37's change_ref is 0, which points at the one change.
    - Cosmetic: "Fit -1 on the list, the four no-precise-location pages, Wafrah and palm village" counts palm village twice. The four mapNone pages are dates, palm, horse and creative; with the list, Kafu and Wafrah that makes the seven pages at fit 9.
11. NOTE — the eleven-item checklist on the r1 text (168 strings, 6504 code points; own scripts b23-ui/s5p-dump, s5p-cmp, s5p-guards, s5p-binds, s5p-stale, s5p-scan, s5p-r3, s5p-tb, s5p-rul).
    - (1) Letterforms: a regex over every string for [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3 U+0650 U+06C2 U+00A0 U+06F0–06F9 U+0660–0669] finds none. Code points in the strings:
      - Urdu letters plus U+064B (the tanwin of «تقریباً»/«اندازاً»).
      - ، ؟ ۔ “ ” ↗ : ( ).
      - ASCII digits, and {n} twice.
      Keys and plurals in termbase_final: none.
    - (2) Names: byte for byte. No Latin name, no pleonasm.
    - (3) Grammar: the changed sentence is correct (item 1).
    - (4) Address: unchanged. The changed string has no pronoun.
    - (5) Headings: untouched.
    - (6) Termbase: 100%.
    - (7) Punctuation: no space before «۔ ،», no double space, no Latin stop or comma after an Urdu word. The only repeated words are the reduplications «اپنے اپنے» (×3) and «ٹھیک ٹھیک».
    - (8) Digits: untouched.
    - (9) No loan entered. «مقصد» and «منعقد کرنا» are native. The sentence is active, with no verbal-noun + passive chain.
    - (10) No gloss added.
    - (11) 168 ids. {n} once each where the English has it. ↗ kept.
    - Checker re-run by this pass. The check file was rewritten byte-identical (sha256 7615a801…), and the judge file was not touched: RESULT [b23-ui 07-judge round 1]: 0 mandated, 0 extra, 0 ruling finding(s), 0 note(s) | 1 unit (interface), 168 strings, 6504 code points | changes=1 over 1 leaf(s) | scores 91 batch_score=91 threshold=90 decision=APPROVE | rulings=52 | termbase_final=30 | selftest PASS.
