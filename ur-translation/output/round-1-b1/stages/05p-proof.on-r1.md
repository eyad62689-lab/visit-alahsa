RESULT: must-fix=0 should-fix=3 note=8

# Proof pass on the round-1 text — batch b1 (5 attraction pages, 71 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No existing file was changed.
Text read: `pages[].fields` of `stages/07-judge.round1.json` (file sha256 `3cf08dc459f0407cadb77a070f52d2822b83a58a3497e11ccd9678b731e8cef8`, the hash `blind/blind-input.on-r1.json` records; 71 strings, 6777 code points). It differs from `05-proofreader.json` in 16 strings, and the 31 entries of the change log replay on the stage-5 text to exactly this text (31 applied, 0 not found, 0 unlogged differences).
Judged by the role file as amended by this round's rulings (`calibration`: P3c, P5, P9, P10, N7 to N18, the visiting row, N27) and by b0-ui's last round (`b0-ui/stages/07-judge.round3.json`).
Scans are this pass's own (`s5p-scan.mjs`, `s5p-cross.mjs`, `s5p-verify.mjs`, `s5p-he.mjs`, `s5p-wiki.mjs` in the batch folder; they import nothing from the tools). The stage checker was not run: it rewrites an existing file. Its last result, written after the tools learned the retired keys, was read: 0 mandated, 0 extra, 0 ruling findings, 3 notes (P20, the three area lines that have no larger place in the source).

Summary: nothing is wrong in the 71 strings that must be changed before the blind read. The three should-fix items are in what the judge file would write to the repository (two calibration entries and five termbase notes), not in the text. Of the eight notes, four are on the wording of calibration entries (4, 6, 7, 8), three are on the text (5, 9, 10: forms that are right by the rulings and have been read by nobody, and shifts of meaning the change log does not name), and one is on the judge file's own record (11).

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 6777 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key: «الاحساء» 17, «ہفوف» 6 leaves, «قصر ابراہیم» 6, «العقیر» 8, «مسجد جواثا» 8, «قصر صاہود» 2, «مدرسہ امیریہ» 2, «المبرز» 3, «الکلابیہ» 2, «النعاثل» 2, «ام الخبیصی» 1, «سوق القیصریہ» 1, «بنو عبد القیس» 2, «مسجد نبوی» 2, «مدینہ منورہ» 3, «علی پاشا» 1, «مسجد الجعلانیہ» 2, «مسجد شیخ محمد بن ابی بکر الملا» 2, «مسجد الحبیش» 2, «شہزادہ محمد بن سلمان منصوبہ» 2, «ادارہ ورثہ» 1, «الاحساء کا نخلستان» 2, «بیت الثقافہ» 1, «سعودی عرب» 1, «یونیسکو» 4 leaves. No retired key: «صاہود محل» 0, «ورثہ کمیشن» 0, «کمیشن» 0, and «مدینہ» only as the first word of «مدینہ منورہ» (3 of 3). No «الاحسا» without its hamza, no «الہفوف», no joined «عبدال…», no Latin letter. «سوق القیصریہ نامی بازار» is the form ruling P3c (2) gives; see finding 7 for what the role file still says of it.
- item 3, قواعد (grammar): FINDING (finding 5, a note; on a sentence this round did not edit). The agreements the edits touch were each read and are right; they are listed under "Agreement after the edits".
- item 4, خطاب (address): PASS. «آپ» 4 times, each with an honorific form («پڑھ لیں گے», «دیکھ سکیں», «چل سکتے ہیں … بیٹھ سکتے ہیں», «آپ کو … جوڑ دیتا ہے»); every request in the honorific subjunctive, the two new ones included («پہن کر آئیں», «خیال رکھیں»; with «گھومیں», «دیکھیں», «کھڑے ہوں»). «تو» twice, both the particle after a subjunctive. No «تم», «تمہارا», «تیرا» (the letters «تم» occur once, inside «ختم»).
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers and 9 labels end without a mark and carry no bracket; the 13 questions end with «؟» and carry no bracket. The renamed title is «قصر صاہود», two words, no gloss.
- item 6, termbase compliance: FINDING (finding 3, should-fix). The 71 strings comply: keys, genders, plurals, the admitted loan «اسکول» spelled as its entry (3 times; no «سکول» as a whole word). The finding is in the notes of five entries of `termbase_final`.
- item 7, رموز (punctuation): PASS. «۔» 53, «،» 54, «؟» 13, «؛» 6, colon 8, middle dot 4 (each between two spaces), quotation marks U+201C / U+201D 5 pairs, round brackets 5 pairs, one ASCII comma (inside «10,000»). No U+2013 anywhere (the one of stage 5 is gone), no ASCII stop, no straight quote, no «», no space before a mark, no mark left beside another by a merged or split sentence, no doubled word, no double, leading or trailing space, no U+00A0. 23 strings end with «۔» (5 summaries, 5 bodies, 13 answers), 13 with «؟», 35 with neither (titles, kickers, labels, card values: ruling P26).
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; every figure of the Urdu stands in the English of its field and every figure of the English is in the Urdu (12 fields with figures). Clock times, weekdays, prices, years and the century are listed cell by cell under "Rulings checked cell by cell".
- item 9, انگریزیت (loans, banned lists): PASS, by rulings N15 and N18. Loans in Urdu letters: «فیس» and «اسکول» (entries that cite P16), the unit «میٹر», the names «یونیسکو» and «پاشا». «کمیشن» is gone. None of the banned lists; no «موجود ہے / ہیں»; no verbal-noun passive chain (the one passive of the kind, «درآمد کی جاتی تھی», is the owner-ruled explanation of chandal).
- item 10, گلوس (glossing): PASS, by ruling P3c. Five brackets in the batch: «قصر ابراہیم (یعنی ابراہیم کا محل)» once, straight after the page's own name at its first body mention; «شندل (وہ لکڑی جو کبھی خلیج میں درآمد کی جاتی تھی)»; «1356 ہجری (1937 عیسوی)», «1360 ہجری (1941 عیسوی)»; «“بیت الثقافہ” (ثقافت کا گھر) نامی مقام» (P3b and P15: marks, the entry's gloss verbatim, «نامی» and the generic; first and only mention). No «(عربی میں». «قصر صاہود» bare, with «قلعہ» in the summary and in the first body sentence, not beside the name. The passing «سوق القیصریہ» is followed by «نامی بازار»; the passing mosque names stand bare.
- item 11, ساخت (structure): PASS. 71 leaves, each with its English in the pack (20, 16, 21, 5, 9 by page); `practical` items carry label and value only, no source key; the two area lines that have a larger place open with «الاحساء،»; no card value ends with «۔»; no Markdown, link or line break in a body.

## Findings

1. [should-fix] calibration `N16-quotation-marks-on-the-property-name` — the guard against point (4) of its own ruling, and against b0-ui's approved `data.oasisName`
   - The Urdu: the key «الاحساء کا نخلستان». In this batch: sahood summary «… یونیسکو کی فہرست میں شامل مقام “الاحساء کا نخلستان” کا ایک حصہ ہے۔», sahood body «آج یہ “الاحساء کا نخلستان” کے بارہ حصوں میں سے ایک ہے۔». In b0-ui's final text: `data.oasisName` = «الاحساء کا نخلستان», the whole value, bare.
   - What is wrong: the guard says "the key «الاحساء کا نخلستان» in the direct case stands between U+201C and U+201D". The tools read that clause word for word (`lib/rulings.mjs`, kind quoted-key) and `lib/roundcheck.mjs` applies it to every whole-word occurrence of the key in every leaf of an attraction batch. Point (4) of the same ruling says the oasis as a place "stays unmarked and inflects". A place has a direct case too: on the page that has the oasis for its subject («الاحساء کا نخلستان … ہے») point (4) asks for no marks and the guard reports their absence. And point (1), "when it is named AS the property … in quotation marks in the direct case", makes no room for a value that is the name alone: the approved JSON-LD name of the property is the key in the direct case without marks, and the entry's own note in `termbase_final` sets the two uses side by side.
   - Rule: a ruling and its guard are to agree; the entry binds b2 (khuzam summary and body) and is to be written to the repository.
   - Effect on the 71 strings: none. Two direct-case occurrences, both the property named as such, both inside the marks with the postposition after the closing mark; three oblique occurrences («الاحساء کے نخلستان»), unmarked.
   - Minimal correction: leave the parsed clause as it is worded and add its scope to the ruling and the guard: the marks are owed in a sentence that names the property as the property (after «مقام», or as the whole the attraction is a part of); a field whose whole value is the name carries none; the place in the direct case is unmarked, and the checker cannot tell the two apart, so that case is the proofreader's until the tool is taught it.

2. [should-fix] calibration `P10` — the ruling opens with "B." and the entry's own candidates make B the form that was not chosen
   - The Urdu: sahood body «تقریباً 10,000 مربع میٹر پر پھیلا ایک بہت بڑا قلعہ».
   - What is wrong: the entry lists its candidates as A «10,000 مربع میٹر» ("in the text"), B «10 ہزار مربع میٹر», C in words. Its ruling is b0-ui's text repeated, which begins "B. Counts in /ur/ text are written in the Urdu scale …" (there B was the lakh scale against the million), and ends with this round's sentence, "a figure below one lakh is written in digits, grouped as the English source groups it («10,000», «1,600»)", which is A of this entry. Read against its own candidates the entry rules B and then describes A; the text has A.
   - Rule: internal consistency of an entry that b2 adopts (its jabri-mosque body carries a figure) and that goes to the repository.
   - Minimal correction: keep b0-ui's clauses word for word, since the tools parse them ("million = 10 …", "ten million = 1 …", "a thousand million = 1 …", "… and … are not written"), and take the clash out of the letter: either say whose letter it is ("As b0-ui ruled, its candidate B: …") or name this entry's answer by its own letter in the added sentence ("For a figure below one lakh: A.").

3. [should-fix] `termbase_final` — the notes of «قصر ابراہیم», «سوق القیصریہ», «بنو عبد القیس», «خلیج», «قلعہ» (and one count in «تفریح گاہ»)
   - What is wrong:
     (a) «قصر ابراہیم» and «سوق القیصریہ» continue from b0-ui's round-2 note, not from the note its last round returned. b0-ui's final note for «قصر ابراہیم» ends "… The second blind reader of b0-ui did not stop at the name. Nor did the third." and for «سوق القیصریہ» "… recorded with open item P3c for the judge who rules the gloss form in running text. The third reader did not stop at the name." Neither closing sentence is in this file's entries, whose "b1 round 1" lines follow the round-2 text directly. The judge's note says the ten shared entries are "as that batch's last round returned them"; that holds for the other eight, which equal b0-ui's final in every field and only extend its note. If these two are written over b0-ui's, a reader's evidence is lost.
     (b) «بنو عبد القیس»: "Plural agreement, exercised: «بنو عبد القیس … آباد تھے»." and, four sentences on, "so its plural agreement is no longer exercised". The second is right: after edit 10 the body has «اس سرزمین پر آباد بنو عبد القیس نے ادا کیا», and the quoted form stands nowhere.
     (c) «خلیج»: "Batch b1 proposes the same key and exercises the gender." and, at the end, "Never the subject of a verb in b1 either, so the gender is still not exercised." The second is right: eight places, each before a postposition or as an adjective.
     (d) «قلعہ»: "exercised: … «اس قلعے نے دیکھے»". After edit 23 the words stand apart («اس قلعے نے … واقعات دیکھے»), and the verb there agrees with «واقعات». The same note says the common noun stands "in the summary and the first body sentence" of the page of every «قصر X»; on qasr-ibrahim it stands in the second (finding 7, c).
     (e) «تفریح گاہ»: "in its four leaves, «ساتھ والی تفریح گاہ» (the card label and both answers)". The four are the label, faq[0].a, faq[1].q and faq[1].a; the bracket names three.
   - Rule: the batch's own consistency; the termbase binds every later stage (RUNBOOK, "What binds every stage", 2), and these notes are what the apply step writes into it.
   - Minimal correction: (a) put the two sentences of b0-ui's last round back before the "b1 round 1" lines; (b) delete the sentence "Plural agreement, exercised: …"; (c) delete "and exercises the gender"; (d) quote «ایک بہت بڑا قلعہ» and «پرانا قلعہ» only, and say "in the summary and the opening of the body"; (e) "(the card label, one question and both answers)".
   - Effect on the text: none.

4. [note] calibration `N7-weekday-range` — the guard as worded fails a cell the ruling calls right
   - The Urdu: ameeriah practical[0].value «اتوار تا جمعرات صبح 8 بجے سے رات 8 بجے تک · جمعہ اور ہفتہ شام 4 بجے سے رات 8 بجے تک».
   - What it is: the guard reads "between two weekday names that are followed by a clock time, the connector is « تا »". The ruling in the same entry says "two days are joined by «اور»", and «جمعہ اور ہفتہ شام 4 بجے» is two weekday names followed by a clock time. The tool reads the clause for ranges of days in the English only ("X–Y", "X to Y"), so the checker passes this cell; a build check written from the words would not.
   - Rule: a ruling and its guard are to agree.
   - Minimal correction: keep the parsed clause word for word and add after it "(a range of days; two days joined by «اور» are not a range)".

5. [note] qasr-ibrahim faq[0].a — «جمعہ کو» beside «ہفتے کو»; ruling N7 quotes the pair as its model
   - The Urdu: «اتوار تا جمعرات صبح 8 بجے سے شام 5 بجے تک، جمعہ کو شام 4 بجے سے رات 8 بجے تک، اور ہفتے کو صبح 9 بجے سے دوپہر 1 بجے تک اور شام 4 بجے سے رات 8 بجے تک۔»
   - What it is: two day names with the same ending before the same postposition, one left in its direct form and one put in the oblique. The sentence is unchanged since stage 5 and the blind reader passed it without a remark; it is raised now because N7 writes both forms into the ruling ("takes «کو» in a sentence («جمعہ کو», «ہفتے کو»)") for both batches. Reference pages counted today: «جمعہ کو» 183 against «جمعے کو» 14; «ہفتہ کو» 75 against «ہفتے کو» 16; «جمعہ کی نماز» 147 against «جمعے کی نماز» 9 (the text has the first, three times). So the text follows the majority for one name and the minority for the other.
   - Rule: role file item 3 (the form before a postposition) and the batch's consistency. Neither form is an error by itself.
   - Minimal correction: none owed in the text. In the ruling, one line saying which it is: one treatment for both names («جمعہ کو», «ہفتہ کو», or «جمعے کو», «ہفتے کو»), or that «جمعہ» is written unchanged, as in «جمعہ کی نماز», while «ہفتہ» inflects.

6. [note] calibration `N13-price-range` — the guard is narrower than the ruling
   - The Urdu: none in this batch (no U+2013 is left); b2 keeps «(1853–1921)».
   - What it is: the ruling admits the dash "between the two years of a lifespan inside round brackets"; the guard, and the tool that reads it, admit it "between two four-digit figures inside round brackets". A lifespan with a year of three digits is ruled right and would be reported.
   - Rule: a ruling and its guard are to agree.
   - Minimal correction: none now; a line in the entry that "four-digit" is the checker's approximation of "a year".

7. [note] calibration `P3c` — three places where the words of the ruling part from the text or from the role file
   - (a) Point (2) gives «سوق القیصریہ نامی بازار» (ameeriah body: «اور سوق القیصریہ نامی بازار یہاں سے قریب ہے۔»). Role file 05, item 2, forbids by name a «سوق» name followed by «بازار» "as well", and item 10 still says the form for an opaque generic is open; b0-ui's P3c-labels guard has "no Urdu generic next to a name that already carries its Arabic generic". N13 says which style rule and which item of the role file it amends; P3c says of none (items 2 and 10, `gloss_regel`, `naming_policy.generic_nouns`). A proofreader who applies the role file literally reports the ruled form.
   - (b) Point (1) owes the gloss "where the name's generic is not an Urdu word in the sense meant". N15 finds that «مدرسہ» is not, to the reader, the word for a school of general education. By those words «مدرسہ امیریہ» is owed a «(یعنی …)» on its own page; the text has none and says «اسکول» in the summary and in the first body sentence, which is the reasoning point (3) gives for «قصر» only. Points (2) and (3) do not class «مدرسہ».
   - (c) Point (3) says of a «قصر X» name that "the page says «قلعہ» in its own words, in the summary and the first body sentence". On qasr-ibrahim the first body sentence is «ہفوف کے قلب میں قصر ابراہیم (یعنی ابراہیم کا محل) صدیوں کی تبدیلیوں کا گواہ بنا کھڑا ہے۔» and the word comes in the second. N14 says it of the three other pages only, which is what the text bears out.
   - Rule: internal consistency of an entry that goes to the repository; role file 05, items 2 and 10.
   - Minimal correction: one sentence each: (a) "items 2 and 10 of role file 05 are amended to this"; (b) «مدرسہ X» named beside «قصر X» in point (3); (c) "in the summary and the opening of the body".

8. [note] calibration — four entries with the status ruled that carry an open or a misattributed part
   - (a) `N18`: "B for now … If he stumbles on it … the loan enters in the next round as «ورثہ کمیشن»". The ruling names the condition of its own reversal; the entry «ادارہ ورثہ» is pending. The Urdu in the text: sahood body «ادارہ ورثہ نے اس کی مرمت کی».
   - (b) `N17`: ruled for mosques; "what visitors to a fort or a museum are called is b2's to rule". This batch writes «آنے والے کو» for 'the visitor' (al-uqair body) and has «زائرین» on the mosque page only; no «سیاح» in the 71 strings.
   - (c) `N8` declines one of the two untested proposals of ruling P13 (5), the «تا» between clock times. The other, the part of the day written once when both ends of a range share it, is not named, while N10's "each end of a range with its own part" and P13's build guard (a part of the day before every «بجے») exclude it. No range in this batch has both ends in one part.
   - (d) `N10`: "a one-line option for the owner, who made that ruling". In the termbase, P13's `ruled_by` gives the owner the 12-hour form with the part of the day, and gives the detail of the form and the table of point (4) to the calibration judge.
   - Rule: an item is ruled or open, and an entry says who ruled what.
   - Minimal correction: wording only: "provisional" in N18 where the repository records it; one clause in N8 on the second proposal; "the calibration's table" in N10.

9. [note] jawatha-mosque body and faq[4].a — the quoted name of the project
   - The Urdu: «اس مسجد کی مرمت “تاریخی مساجد کی ترقی کا شہزادہ محمد بن سلمان منصوبہ” کے تحت ہوئی۔» and «جی ہاں، “تاریخی مساجد کی ترقی کا شہزادہ محمد بن سلمان منصوبہ” کے تحت۔»
   - What it is: (i) inside the name, 'for the Development' / «لتطوير» was «کے لیے» at stage 5 and is «کا» now. The change log records the marks and that "the name's own word 'Development' stays"; it does not record this. The wording is the blind reader's own (observation 30). (ii) «کا» agrees with «منصوبہ», five words on, and stands directly before «شہزادہ», which is masculine singular too: on a first pass «ترقی کا شہزادہ» can attach. Nobody has read the name in place.
   - Rule: none broken (the marks, the direct case and the postposition after the closing mark are ruling N16; the key stands byte for byte inside). Against the source: a preposition.
   - Minimal correction: none proposed. If the next reader stops there, «کے لیے» inside the marks gives back the source's word and takes the attachment away: «“تاریخی مساجد کی ترقی کے لیے شہزادہ محمد بن سلمان منصوبہ” کے تحت».

10. [note] al-uqair body and jawatha-mosque body — three shifts of meaning that the change log does not name
   - (a) al-uqair body «پکی سڑکیں بننے سے پہلے العقیر باہر کی دنیا کے لیے الاحساء کا دروازہ تھا۔» Logged: «باہر کی». Not logged: «کی طرف» became «کے لیے», so that 'Al-Ahsa's gateway to the world' / «بوّابة الأحساء إلى العالم» reads first as the outside world's way into Al-Ahsa. The next sentence is about what came in, so nothing untrue is said.
   - (b) al-uqair body «آپ اسی راستے پر چل سکتے ہیں جس سے کبھی قافلے گزرتے تھے، اور اس ریت پر بیٹھ سکتے ہیں جو سمندر کو چھوتی ہے۔» Logged: the modal and «کبھی». Not logged: 'in the trace of caravans' / «على أثر القوافل» is now a road, and a particular one («اسی راستے»). The same paragraph has «اسی کے راستے» three sentences earlier, of the port.
   - (c) jawatha-mosque body «جسے اس سرزمین پر آباد بنو عبد القیس نے ادا کیا۔» 'who settled this land' / «الذين سكنوا هذه الأرض» was «جو اس سرزمین پر آباد تھے»; as an attribute «آباد» has no tense and takes its time from «ادا کیا».
   - Rule: accuracy against the source (role files 04 and 07); none of the three brings in a fact.
   - Minimal correction: none proposed. For the judge's accuracy count and for the blind read.

11. [note] the judge file's `notes` and the sahood breakdown — statements about the checker that no longer hold
   - What it is: the fifth entry of `notes` lists three checker findings "left as they are" (two NAME-GONE and one TERMBASE on sahood::title) and says mk-final refuses while they stand; the sahood compliance line takes points because "the stage checker still reports it under the retired key". The check file beside the judge file, written after the tools' rulings module was changed, reads "0 mandated, 0 extra, 0 ruling finding(s), 3 note(s)", and its self-test carries probes for a key retired by a ruling. Besides: the same note counts «مدینہ» among the three keys retired and says they are "listed again in the calibration entries N14 and N18"; P9 lists none, and must not, because the checker matches a retired key as a whole word and «مدینہ» is the first word of its successor.
   - Rule: none of the role file; the record a later round reads.
   - Minimal correction: none in the text. For round 2, which scores from nothing; and one line in P9 saying why the provisional key is not listed.

## Code points

- Forbidden letterforms [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none.
- Non-Latin digits (U+0660–0669, U+06F0–06F9), U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, U+06D5, Latin letters: none.
- 63 distinct code points. None is new since stage 5; one is gone, U+2013.
- Read and right: U+064B once, in «تقریباً» (sahood body), the ordinary spelling and the one of the approved interface strings («تقریباً {n} کلومیٹر», «اندازاً»); U+0621 17 times, all in «الاحساء»; U+0624 twice, both «گاؤں»; U+002C once, between two digits of «10,000».
- U+06BE 71 times, every time after a ruled aspirate (کھ پھ بھ تھ ٹھ چھ گھ and ڑھ in «سیڑھیاں», «پڑھ», «بڑھ», «پڑھائی», «پڑھتے», as ruling P22a has it). New words with it: «ٹھہر», «بیٹھ», «رکھیں».
- U+06C1 directly after an aspirable consonant, 28 words, each read, all plain he (بلکہ کشادہ کہ تہیں جگہ تاکہ ہفتہ دوپہر پہلی جہاں پہلے پہنچتی نگہبانی چہل پہل کہاں بہترین مرتبہ کہا سادہ شہزادہ منصوبہ گہری پہن بہت پہلا باقاعدہ کہتے).
- Words the edits brought in, each read: باہر، ٹھہر، سوچنے، چل، قافلے، گزرتے، بیٹھ، منورہ، جسے، منصوبہ، پہن، آئیں، خیال، رکھیں، ادارہ، اسکول، کہتے. No pronoun of the class of open item P22.

## The 31 edits against the English and the Arabic

What entered and what left, edit by edit; "nothing" means form only.
- edit 1 (qasr-ibrahim body, «عیش و عشرت کا محل»): nothing.
- edit 2 («جس کی ایک ہی فصیل کے اندر وہ کچھ اکٹھا ہے جو کم ہی یکجا ہوتا ہے»): left, the fort as the one that 'brought together' and the past tense (an act is now a state; the judge logged it). 'What rarely meets' stands word for word. The frame equals faq[3].a and b0-ui's `home.route.s1.d`.
- edits 3 and 4 (body and faq[3].a, «الاحساء کے نخلستان کو»): entered, the name of the oasis, where both sources say 'the oasis' (logged). The name now stands twice in the body's last sentence («الاحساء کے ورثے … الاحساء کے نخلستان»), in two different phrases.
- edit 5 (al-uqair body): entered «باہر کی»; the direction: finding 10 (a).
- edit 6 («ٹھہر کر سوچنے کا موقع»): entered, 'to stop'; 'contemplation' / «التأمّل» is otherwise said.
- edit 7: entered, the modal twice, «کبھی» with a past, and a road; left, 'trace' and the plain present: finding 10 (b).
- edits 8, 9 and 18 («مدینہ منورہ»): entered, the epithet of the city's Urdu name (ruling P9); no sign, no benediction follows it. The summary still has no mosque and no hedge, as its source.
- edits 10 and 19 (the tribe clause): left, «اور یہ کہ» and, in the body, the marked past of 'settled' (finding 10 c). Nothing entered. See "Guarded claims".
- edit 11 («جو الاحساء کے نخلستان میں گزریں۔ اس نخلستان کے لوگ»): entered, the name of the oasis, where the sources say 'an oasis' (logged); «اس نخلستان کے لوگ» is nearer to 'whose people' than «یہاں کے لوگ» was. The strength is the source's: «سب سے پہلے اسلام قبول کرنے والوں میں سے تھے», 'among the earliest'.
- edits 12 and 20 (the project's name): entered, the marks; 'for' became the possessive: finding 9.
- edit 13 («مسجد جواثا کی زیارت»): the name for a pronoun; nothing.
- edits 14 and 17 («ساتھ والی»): nothing; one word now for 'adjacent' and 'beside' («المجاور»), in the label, one question and two answers.
- edits 15 and 17 («10 سے 15 سعودی ریال»): nothing; both figures, the full currency name after the second.
- edit 16 (the visiting row): entered, two requests where the source has 'with'; left, the noun 'respect' («احترام»), now «خیال رکھیں» (logged). Three elements in the source's order with its nouns («زائرین», «ساتر لباس», «اس مقام کی حرمت»); nothing on faith, nothing on a time. Equal byte for byte to candidate B of the ruling.
- edits 21 and 22 (the title and the name in the body): «محل» is now «قصر»; the bracket that left gave a form the English body does not give. Seam: the name and «المبرز» now stand side by side («قصر صاہود المبرز کے قلب میں کھڑا ہے»); the title and the summary have shown each alone before the reader meets the two together. No finding.
- edit 23: the reader's order; the same words less the relative frame; nothing entered or left. «کے خلاف» attaches to «مزاحمت».
- edit 24 («ادارہ ورثہ»): 'Commission' is now the Arabic's «هيئة» said with a native word (ruling N18).
- edit 25: left, «مقام» for 'site' in the body ('the Al-Ahsa Oasis site'; the summary keeps it; logged); the inscription has its own sentence and 2018 belongs to the oasis, as in the source. Nothing entered.
- edits 26, 28 and 30 («اسکول»): nothing; 'first formal government school' is «پہلا باقاعدہ سرکاری اسکول» in summary and body, the noun not widened.
- edit 27 («جو 1937 میں شروع ہوا»): the one verb taken from the Arabic («انطلقت») where the English summary says 'opened'. Checked against ruling P23: no fact, figure or claim enters or leaves; the defect is logged with the literal form («جو 1937 میں کھلا») on record; the blind read is still owed. The body now agrees with it: «پڑھائی … شروع ہوئی», and the building «کھلی» in 1941.
- edit 29 (the location sentences): the four places are all there and each relation holds: east of old Hofuf, in the district («یہ پرانے ہفوف کے مشرق میں، محلہ النعاثل میں واقع ہے»); on the rise, which is named («جس ٹیلے پر یہ بنا ہے اسے ام الخبیصی کہتے ہیں»); near the souq, with no distance («یہاں سے قریب ہے»). Entered: «بنا ہے» for 'stands' and «کہتے ہیں» (logged). Left: the souq's bracket; «نامی بازار» in its place.
- edit 31 (the middle dot): nothing.

## Rulings checked cell by cell

- Hours, qasr-ibrahim practical[0].value: «اتوار تا جمعرات صبح 8 بجے سے شام 5 بجے تک · جمعہ شام 4 بجے سے رات 8 بجے تک · ہفتہ صبح 9 بجے سے دوپہر 1 بجے تک اور شام 4 بجے سے رات 8 بجے تک». N7 («تا», a single day bare in a cell), N8 (two ranges joined by «اور», groups by the middle dot), N10 (8 pm «رات»), P13 (8 and 9 am «صبح», 1 pm «دوپہر», 4 and 5 pm «شام»; no dash, no «:00»). Right.
- Hours, qasr-ibrahim faq[0].a: the same eight times; «تا» for the range, «جمعہ کو», «ہفتے کو», groups by «،» and a last «اور». Right by N7 and N8 (finding 5 is on the two day forms).
- Hours, jawatha-mosque practical[0].value and faq[1].a: «صبح 8 بجے سے رات 12 بجے تک». N9. Right.
- Hours, ameeriah practical[0].value: «اتوار تا جمعرات صبح 8 بجے سے رات 8 بجے تک · جمعہ اور ہفتہ شام 4 بجے سے رات 8 بجے تک». N7 («تا» for the range, two days joined by «اور»), N8 (the middle dot; no U+061B), N10. Right.
- Hours, al-uqair practical[0].value: «کھلا عوامی مقام، داخلے کی کوئی فیس نہیں»: no hours in the source, none written.
- Duration, qasr-ibrahim practical[2].value and faq[2].a: «ایک سے دو گھنٹے»: a range with «سے» (N13). Right.
- Prices: jawatha-mosque practical[1].value «مسجد: مفت · تفریح گاہ میں داخلہ: 10 سے 15 سعودی ریال» and faq[0].a «… داخلے کی فیس 10 سے 15 سعودی ریال ہے۔» (N13, P7; no code). «داخلہ مفت» on qasr-ibrahim and ameeriah, the same English, the same Urdu; «نہیں، داخلہ مفت ہے۔»; al-uqair «داخلے کی کوئی فیس نہیں» in the card and the answer. Right.
- Years and the century: «2018 میں» three times (qasr-ibrahim body and faq[3].a, sahood body) and «1937 میں» (ameeriah summary), each a year its English gives in one calendar, bare (N12); «1356 ہجری (1937 عیسوی)», «1360 ہجری (1941 عیسوی)» (ameeriah body); «بارہویں صدی ہجری کے اواخر میں» (sahood body; N11, no Gregorian century supplied). The Arabic-only Hijri year of the ameeriah summary is not imported. Right.
- Figures: «10,000» grouped as the English (P10, this round's line); 'seven', 'six-metre', 'twelve' in words as both sources.
- Brackets (5) and quotation marks (5 pairs): listed under item 10; the marks are sahood summary and body («“الاحساء کا نخلستان”» followed by « کا» and « کے»), jawatha-mosque body and faq[4].a (the project, followed by « کے تحت»), ameeriah body («“بیت الثقافہ”»). No «اس مقام “». Right by N16 and P3b.
- Medina: three of three with «منورہ»; Makkah is not named. «عبد» followed by a space, two of two. «خلیج» bare, eight places, never with a qualifier. «زیارت» four times and «زائرین» once, all on the mosque page; «سیر» three times, never of a mosque.
- The same thing by one word across the five pages: fort «قلعہ», the wall of a fort «فصیل», watchtowers «نگرانی کے برج», stores «گودام», stables «اصطبل», restored «مرمت», heart «قلب», central «کے وسط میں», the list «یونیسکو کی عالمی ورثے کی فہرست», component «حصہ», landmark and site «مقام», courtyard «صحن». 'Barracks' and 'soldiers' quarters' are two source words and two Urdu wordings.

## Agreement after the edits

- «قصر صاہود» masculine, as «صاہود محل» was (the title's gender did not change with its word): «قصر صاہود … کھڑا ہے», «یہ … تعمیر ہوا», «آج یہ … ایک ہے». «قصر ابراہیم» masculine on its page: «گواہ بنا کھڑا ہے», «کب سے کب تک کھلا رہتا ہے».
- «اس قلعے نے … واقعات دیکھے»: ergative, the verb with «واقعات». «ادارہ ورثہ نے اس کی مرمت کی»: the verb with «مرمت».
- «یہ نخلستان … درج ہوا» masculine; «“الاحساء کا نخلستان” کے بارہ حصوں میں سے ایک ہے».
- «اسکول» masculine: «پہلا باقاعدہ سرکاری اسکول، جو 1937 میں شروع ہوا», «… اسکول ہے»; «اسکول میں پڑھائی … شروع ہوئی» with «پڑھائی»; «مستقل عمارت … کھلی».
- «مدرسہ امیریہ» masculine: «جس ٹیلے پر یہ بنا ہے اسے ام الخبیصی کہتے ہیں»; «سوق القیصریہ نامی بازار یہاں سے قریب ہے».
- «جسے … بنو عبد القیس نے ادا کیا»: the object with «کو», the verb in its default form. «مسجد … کھلی ہے» feminine; «ساتھ والی تفریح گاہ» feminine, «فیس … ہے».
- «وہ کچھ اکٹھا ہے جو کم ہی یکجا ہوتا ہے» singular; «جس کی … فصیل» feminine.
- «وہ صدیاں … جو الاحساء کے نخلستان میں گزریں» feminine plural; «اس نخلستان کے لوگ … تھے».
- «آپ … چل سکتے ہیں … بیٹھ سکتے ہیں»; «جس سے کبھی قافلے گزرتے تھے».

## Guarded claims

- The Friday claim. Summary, flat, as its source: «اسلام کی قدیم ترین مساجد میں سے ایک، اور مدینہ منورہ کے بعد پہلی جگہ جہاں جمعہ کی نماز ادا کی گئی۔» Body and faq[2].a, hedged, as theirs: «… اور کہا جاتا ہے کہ مدینہ منورہ کی مسجد نبوی کے بعد یہ پہلی جگہ ہے جہاں جمعہ کی نماز ادا کی گئی، جسے [اس سرزمین پر آباد] بنو عبد القیس نے ادا کیا۔» The clause from «مدینہ منورہ کی مسجد نبوی» to «ادا کی گئی» is the same string in both and equals stage 5's but for «منورہ». The tribe stands inside the hedge in both: it is in a relative clause that hangs on «جمعہ کی نماز» inside the «کہ» clause, before the sentence's stop, and cannot be read as a sentence of the site's own. Nothing was strengthened or weakened: 'one of the oldest' is «قدیم ترین مساجد میں سے ایک» three times; no 'second', no Friday-mosque name; «مسجد نبوی», which build check C30 will need, stands in both hedged fields. Whether a reader takes a relative clause after a comma as part of what 'is said' is the blind read's to show.
- The seaport: «سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ» (unchanged): 'first' tied to the east coast, never 'oldest', the removed palace not named.
- The school: «الاحساء کا پہلا باقاعدہ سرکاری اسکول» in summary and body, flat as the source, the noun not widened.
- sahood: five leaves (title, kicker, summary, body, area). No word of opening or closing, no hours, fee or visitor anywhere; «مرمت» once, in the past («ادارہ ورثہ نے اس کی مرمت کی»), as the owner confirmed; the interior in the past tense.
- qasr-ibrahim: the plurals of the summary and the materials sentence are untouched by this round.

## Calibration entries read (32)

Every open item of the termbase has its entry (P3c, P4, P5, P6, P9, P10, P22, P27). Every form a ruling gives as this batch's text stands in the text as quoted (the forms that do not are b2's, options on record, or forms a guard bans); every b1 leaf named in a `strings_affected` exists. Counts in the evidence that the text can confirm are right: «خلیج» in eight places, «شام 4 بجے سے رات 8 بجے تک» five times, «اسکول» in the summary once and the body twice, five aspirate words after U+0691, no pronoun of P22's class. P10's ruling begins with b0-ui's text and its guard equals b0-ui's. Findings: 1 (N16), 2 (P10), 4 (N7), 5 (N7), 6 (N13), 7 (P3c), 8 (N18, N17, N8, N10).

## Not verified

- I am a model of this line, not a reader of the language by birth; the grammar and the readings are mine, and the blind read is the test of each.
- The stage checker was not run (it rewrites its check file); I read its last result. No build was made: build checks C29, C30, C34, C36, C39 and C40 were read in the pack and in two of their tools, not run, and C30 has no Urdu pattern yet.
- The text hash the tools compute was taken from `blind/blind-input.on-r1.json`, not recomputed; the file hash was.
- b2's text was not proofed. That jabri-mosque's visiting row equals this one byte for byte cannot be confirmed until b2's judge writes it (b2's stage-5 file has the old row).
- No dictionary page was read again; the genders of «بندرگاہ» and «خندق» are taken from their pending entries. The six reference counts of finding 5 are ur.wikipedia exact-phrase page counts fetched today (`s5p-wiki.out.json`): occurrence, never style.
- The evidence quoted in the calibration entries (press pages, dictionary pages, browser resources, b2's reader) was read as written, not fetched again.
