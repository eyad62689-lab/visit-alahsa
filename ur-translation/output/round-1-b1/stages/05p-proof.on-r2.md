RESULT: must-fix=0 should-fix=2 note=7

# Proof pass on the round-2 text — batch b1 (5 attraction pages, 71 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No existing file was changed.
Text read: `pages[].fields` of `stages/07-judge.round2.json` (file sha256 `76bd05f2183bdf661bf89c06cc77f5749ec63b8e9b028b378af33c0d43611e67`; 71 strings, 6914 code points). It differs from the round-1 text in 13 strings, and the 25 entries of the change log replay on the round-1 text to exactly this text (25 applied, 0 not found, 0 unlogged differences).
Judged by the role file as amended by the rulings of rounds 1 and 2 (`calibration`, 33 entries; new or amended in round 2: P3c, N14, N16, N17, N18, N27, N33, the visiting row) and by b0-ui's round 3.
Scans are this pass's own (`s5p-r2-scan.mjs`, `s5p-r2-cross.mjs`, `s5p-r2-verify.mjs`, with the dumps `s5p-r2-dump.mjs` and `s5p-r2-cal2.mjs`, all in the batch folder; they import nothing from the tools). The stage checker was not run: it rewrites an existing file. Its check file beside the judge file was read: 0 mandated, 0 extra, 0 ruling findings, 3 notes (P20, the three area lines with no larger place in the source).

Summary: nothing in the 71 strings must be changed before the blind read. Two things should be: one calibration entry whose guard fails a page that is already approved and live (finding 1), and one wording of this round, the judge's own, that brings an unnamed city into the claim about the World Heritage listing (finding 2). Of the seven notes, five are on the text (3 to 7: readings that the new sentences admit and nobody has yet read, a guarded plural that is no longer marked, and what the loss of 'site' is) and two are on the wording of entries (8, 9). The eleven items of the first proof pass were each answered as the judge file says; the account is under "The eleven items of the first pass".

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 6914 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key, or in the oblique that ruling N16 now permits: «الاحساء» 17, «ہفوف» 6 leaves, «قصر ابراہیم» 6, «العقیر» 8, «مسجد جواثا» 8, «قصر صاہود» 2, «مدرسہ امیریہ» 2, «المبرز» 3, «الکلابیہ» 2, «النعاثل» 2, «ام الخبیصی» 1, «سوق القیصریہ» 1, «بنو عبد القیس» 2 (both after «قبیلہ»), «مسجد نبوی» 2, «مدینہ منورہ» 3, «علی پاشا» 1, the three sister mosques 2 each, «ورثہ کمیشن» 1, «جزیرہ نما عرب» 1, «بیت الثقافہ» 1, «سعودی عرب» 1, «یونیسکو» 4 leaves. Inflected: «الاحساء کے نخلستان» 5 (the key in the direct case 0), «شہزادہ محمد بن سلمان منصوبے» 2 (the key in the direct case 0). No retired key: «صاہود محل» 0, «ادارہ ورثہ» 0 (the word «ادارہ» 0), and «مدینہ» only as the first word of «مدینہ منورہ». No two names side by side in any string. No Latin letter.
- item 3, قواعد (grammar): FINDING (findings 3 and 4, notes: readings the syntax admits; no error of agreement or government). Every agreement the edits touch was read and is right; they are listed under "Agreement after the edits".
- item 4, خطاب (address): PASS. «آپ» 4 times, each with an honorific form («اگر آپ … گھومیں اور دیکھیں …، تو … پڑھ لیں گے», «دیکھ سکیں», «چل سکتے ہیں … بیٹھ سکتے ہیں», «آپ کو … جوڑ دیتا ہے»); requests in the honorific subjunctive («کھڑے ہوں», «پہن کر آئیں», «خیال رکھیں»). «تو» twice, both the particle. No «تم» (the letters once, inside «ختم»).
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers, 9 labels without a final mark or a bracket; 13 questions end with «؟»; no bracket in a summary.
- item 6, termbase compliance: FINDING (finding 9 b, a note on two entry notes). The 71 strings comply: keys, genders, plurals; the admitted loans «اسکول» (4, no «سکول» as a whole word) and «کمیشن» (1, inside the name of the body) spelled as their entries.
- item 7, رموز (punctuation): PASS, by rulings N33 and N16. «۔» 60, «،» 57, «؟» 13, colon 8, middle dot 4 (each between two spaces), one pair of quotation marks (ameeriah, the name of ruling P3b), 6 pairs of round brackets, one ASCII comma (inside «10,000»). No U+061B (six gone), no U+2013, no ASCII stop, no straight quote, no «», no space before a mark, no mark left beside another, no sentence that opens with a connective after a new stop, no doubled word, no double, leading or trailing space, no U+00A0. 23 strings end with «۔», 13 with «؟», 35 with neither. See finding 7 for one of the six new stops.
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; every figure of the Urdu stands in the English of its field and every figure of the English is in the Urdu (12 fields). No cell of hours, price, year or century was touched in this round; each was read again under "Rulings checked cell by cell".
- item 9, انگریزیت (loans, banned lists): PASS, by rulings N15 and N18. Loans in Urdu letters: «فیس», «اسکول», «کمیشن» (entries that cite P16), the unit «میٹر», the names «یونیسکو» and «پاشا». None of the banned lists; no «موجود ہے / ہیں»; «ترقیاتی» is a native adjective.
- item 10, گلوس (glossing): PASS, by ruling P3c as amended. «(یعنی » twice in the batch, once on each of two pages, each straight after the page's own title at its first mention in the body: «قصر ابراہیم (یعنی ابراہیم کا محل)» and «مدرسہ امیریہ (یعنی امیریہ اسکول)», the second in the form the ruling gives for a noun and its adjective, with nothing else in the bracket. «“بیت الثقافہ” (ثقافت کا گھر) نامی مقام» as P3b and P15 build it. Three «نامی»: «شندل نامی لکڑی», «سوق القیصریہ نامی بازار», «نامی مقام». No «(عربی میں». «قصر صاہود» bare, «قلعہ» in its summary and in the first sentence of its body, not beside the name.
- item 11, ساخت (structure): PASS. 71 leaves, each with its English in the pack (20, 16, 21, 5, 9 by page); `practical` items carry label and value only; no card value ends with «۔» (the visiting row has one inside and none at its end); no Markdown, link or line break.

## Findings

1. [should-fix] calibration `N33-semicolon-in-running-text` — the ruling and its guard fail the calibration page, which is approved and live
   - The Urdu: `value_ur` of the fee row of `src/content/attractions/jabal-al-qarah.md` in the worktree, an approved pair of `tm.json` (jabal-al-qarah, practical[1].value): «بڑوں کے لیے 50 سعودی ریال؛ ٹکٹ “ارض الحضارات” (تہذیبوں کی سرزمین) نامی ثقافتی گاؤں سے ملتے ہیں».
   - What is wrong: the ruling says "The mark is not written on an attraction page" and "A card value that holds two statements has a stop inside"; the guard says "Stage checker and build check on the /ur/ attraction pages: «؛» does not occur". The `binds` field names b1's six places, b2's pages and "every later attraction page". The one attraction page that is already approved, built and in the translation memory carries the mark in a card value. A build check written from the guard fails that page; and the ruling, as worded for "an attraction page", contradicts an approved pair that the runbook says is reused verbatim.
   - Rule: a ruling and its guard are to agree with the approved text they will be checked against; RUNBOOK, "What binds every stage", 3.
   - Effect on the 71 strings: none; no U+061B is left in b1.
   - Minimal correction: one sentence in `binds` and one in the guard saying what happens to that row: either the build check exempts the calibration page until its row is changed by an owner override (it is approved text, not a leaf of this batch), or the entry names the change it asks for («… ریال۔ ٹکٹ …») and who makes it.

2. [should-fix] qasr-ibrahim faq[3].a and body — «شہر کی ان عمارتوں»: a city enters the World Heritage claim and is not named
   - The Urdu: faq[3].a «یہ شہر کی ان عمارتوں میں شامل ہے جن کی بنا پر 2018 میں الاحساء کے نخلستان کو یونیسکو کی عالمی ورثے کی فہرست میں جگہ ملی۔»; body «… اور شہر کی ان عمارتوں میں شامل ہے جن کی بنا پر 2018 میں الاحساء کے نخلستان کو یونیسکو کی عالمی ورثے کی فہرست میں جگہ ملی۔»
   - What is wrong: (i) The sources say 'part of the urban fabric that placed the oasis on UNESCO's World Heritage list' / «وجزءٌ من نسيجٍ عمرانيٍّ جعل الواحة» on the list. The change log records the loss of the image of a fabric and says «شہر کی … عمارتوں» is written "so that 'urban' is kept". It keeps more than 'urban': it says 'the buildings of the city', one city, where the source names none and the listed property is the oasis. (ii) The answer is emitted on its own; neither it nor its question names a city. Round 1 repaired «اس نخلستان» in this same answer for that reason ("points at an oasis the page has not mentioned"). In the body the nearest names are «الاحساء», in the same sentence, and «ہفوف», six sentences up; no page says which of them is a city. (iii) Asked whether this is a loss of figure or of fact: the figure is lost (a weave of which the fort is a part is now a set of buildings to which it belongs), and with it a fact is narrowed, not falsified: what earned the listing is said to be buildings of a city. (iv) The second reader's own remedy had «ان مقامات میں شامل ہے جن کی بنا پر», without a city. (v) Point (3) of ruling N16 says that what is said of the property is not hung on a predicate about the attraction and that the inscription takes its own sentence; this sentence, rewritten in this round, hangs it on one. Here the clause names the oasis as what was listed, so the fault that point repaired on sahood cannot arise; the ruling's words do not say so.
   - Rule: accuracy against the source (invent nothing; role file 04); the batch's own consistency (round 1, change 4); ruling P25 ("a reader's remedy that changes the way a claim of the site is put goes to the owner"): the literal wording is not among the options the notes list for the owner.
   - Minimal correction: take the city out and add nothing: «یہ ان عمارتوں میں شامل ہے جن کی بنا پر 2018 میں …» in the answer, «… اور ان عمارتوں میں شامل ہے جن کی بنا پر …» in the body (this gives up 'urban' and strands nothing; the opening «یہ شہر» of finding 4 c goes with it). One line for the owner with round 1's literal wording, as rulings P24 and P25 did on the calibration page. One clause in N16 (3) on its scope.

3. [note] jawatha-mosque body and faq[2].a — the tribe's sentence: reported, as the source has it; one second parse
   - The Urdu: body «یہ نماز پڑھنے والے قبیلہ بنو عبد القیس کے لوگ بتائے جاتے ہیں، جو اس سرزمین پر آباد تھے۔»; faq[2].a «یہ نماز پڑھنے والے قبیلہ بنو عبد القیس کے لوگ بتائے جاتے ہیں۔»
   - What it is: on its intended reading the sentence says 'those who offered this prayer are said to be the people of the tribe Banu Abd al-Qais': the tribe is reported («بتائے جاتے ہیں»), not stated. The string admits one other first pass: «پڑھنے والے» is also the oblique singular that agrees with «قبیلہ» before «کے», so «یہ نماز پڑھنے والے قبیلہ بنو عبد القیس» can be taken as one phrase, 'the tribe … that offered this prayer', in which the act is given and not reported. That parse leaves «بتائے جاتے ہیں» without the second noun it needs, so it does not survive to the stop; a reader who takes it will go back. Entered since round 1 and logged: «قبیلہ» (rider to N27), «کے لوگ», a second reporting verb, «پڑھنے» for the repeated «ادا کرنا».
   - Rule: none broken. The claim keeps its source's strength in each field; see "Guarded claims".
   - Minimal correction: none proposed. For the blind read by name. On record if the reader takes the second parse: the reporting verb first, which admits one parse only: «بتایا جاتا ہے کہ یہ نماز قبیلہ بنو عبد القیس کے لوگوں نے پڑھی، جو اس سرزمین پر آباد تھے۔»

4. [note] three sentence openings made by this round's new stops, each a pronoun that can attach to the wrong word
   - (a) jawatha-mosque body: «… بتائے جاتے ہیں، جو اس سرزمین پر آباد تھے۔ اس کی سادہ سی مٹی کی عمارت کا جو حصہ باقی ہے، …». «اس کی» used to follow a sentence whose subject was the mosque. It now follows a sentence about the people who prayed, whose last noun is «اس سرزمین»; the mosque is two sentences back.
   - (b) jawatha-mosque body and faq[4].a: «… منصوبے کے تحت ہوئی۔ یہ تاریخی مساجد کے لیے ایک ترقیاتی منصوبہ ہے، …». «یہ» is the project; standing directly before a plural noun it reads first as 'these historic mosques'. Strictly the oblique would need «ان», which is what tells the reader to go back.
   - (c) qasr-ibrahim faq[3].a: «… یکجا ہیں۔ یہ شہر کی ان عمارتوں میں شامل ہے …». «یہ» is the fort; before «شہر» it reads first as 'this city'. Both readings end in the same statement.
   - Rule: none broken; role file item 3 is met in each. Round 1's readers stopped at seams of this kind («یہ اس مقام», «اس کی زیارت»), which is why they are listed.
   - Minimal correction: none proposed. If the next reader stops: (a) «اس مسجد کی سادہ سی …»; (b) «یہ منصوبہ تاریخی مساجد کے لیے ایک ترقیاتی منصوبہ ہے» or the clause joined with a comma; (c) goes with finding 2.

5. [note] qasr-ibrahim summary — the plural of 'towers', which build check C39 guards, is no longer marked
   - The Urdu: «مٹی کی دیواروں اور کھجور کے تنوں کی چھتوں والا قلعہ، جس کے اندر مسجد، سپاہیوں کی رہائش گاہیں اور برج یکجا ہیں۔»
   - What it is: the owner's ruling is 'mosque, barracks and towers' in the plural, never 'tower'. Round 1 kept the old verb because the oblique forms («رہائش گاہوں اور برجوں کو») were where the plurals showed. The change log of this round says the plural now shows "in «رہائش گاہیں» and in the plural verb". The first holds. The second does not: a subject of three joined nouns takes a plural verb whatever the number of each, and «برج» is one form for one tower and for several. The summary no longer says 'tower'; it no longer says 'towers' either. In the body and in faq[3].a the possessive shows the plural («نگرانی کے برج»). b0-ui's approved `home.route.s1.d` has the same three nouns in the same form.
   - Rule: the pack's site rule for this page (owner ruling, build check C39).
   - Minimal correction: none proposed; every wording that marks the number brings in a word the summary's source does not have. For whoever derives the Urdu pattern of C39 from this text: it can test «رہائش گاہیں» and nothing of «برج».

6. [note] sahood summary and body — 'site' is not rendered: a term of the listing is lost, not a figure
   - The Urdu: summary «… جو یونیسکو کی فہرست میں شامل الاحساء کے نخلستان کا ایک حصہ ہے۔»; body «… اور آج یہ الاحساء کے نخلستان کے بارہ حصوں میں سے ایک ہے۔ یہ نخلستان 2018 میں یونیسکو کی عالمی ورثے کی فہرست میں درج ہوا۔»
   - What it is: the sources say 'a component of the UNESCO-listed Al-Ahsa Oasis site' and 'one of the twelve components of the Al-Ahsa Oasis site' / «موقع واحة الأحساء». In the summary nothing of fact goes with the word: the participle «یونیسکو کی فہرست میں شامل» keeps the listing in the same phrase. In the body the number twelve is a fact about the listed property; the sentence that carries it now says it of the oasis as a place ('one of the twelve parts of the oasis of Al-Ahsa'), and the listing follows one sentence later. So the loss is of a term and, in the body, of what the count belongs to; no figure of speech is involved, and nothing false is said. The judge counts it under accuracy.
   - Rule: accuracy against the source; ruling N16 (2) rules the form.
   - Minimal correction: none proposed. The first reader had said that an oasis called a place and a fort called its part 'took a moment'; whether the count reads strangely without the word is the blind read's to show.

7. [note] ameeriah summary — of the six stops that replaced U+061B, one leaves a first part with no verb of its own
   - The Urdu: «الاحساء کا پہلا باقاعدہ سرکاری اسکول، جو 1937 میں شروع ہوا۔ اس کی تاریخی عمارت آج ثقافت کا گھر ہے۔»
   - What it is: the first part is a noun phrase with a relative clause, closed by a stop; the second is a full sentence. All five summaries are noun phrases closed by a stop, and the English is built the same way ('…, opened in 1937; its historic building now serves …'), so this is the form of the field and not a slip. It is the only one of the six seams where the part before the new stop cannot stand as a sentence. The other five: «دیواریں بھوسا ملی مٹی کی ہیں۔», «… اور پتھر کی ہیں۔» with «مینار کے اوپر تک … سیڑھیاں جاتی ہیں۔» (the connective before the minaret went with the mark), «… یکجا ہیں۔», «زائرین کے لیے کھلی ہے۔» and «مسجد کی زیارت مفت ہے۔»: each part has its verb. On qasr-ibrahim the colon after «تعمیر کیا گیا» now introduces the first of three sentences, not a list of three clauses; ruling N33 keeps a colon before a clause that explains.
   - Rule: none broken (N33: "ends the first with a full stop and begins a sentence").
   - Minimal correction: none proposed.

8. [note] calibration `N14` against b2's `N31` — the opening of twin fort pages is ruled two ways in one round
   - The Urdu: sahood body «المبرز کے قلب میں قصر صاہود کھڑا ہے: تقریباً 10,000 مربع میٹر پر پھیلا ایک بہت بڑا قلعہ۔»
   - What it is: b2's item N31 (round 1 of that batch) says "«کھڑا ہے» is not written for a location" and "An apposition that says what the building is does not hang verbless after a colon"; its `binds` leaves sahood to b1's judge. This file's N14 answers that N31 "is not extended to sahood", and its rider quotes the sentence above as the model for the order of the opening. So the repository would hold a ruling whose words bar the form and a page that has it, under a second ruling that keeps it. Within b1 a building's place is «واقع ہے» on ameeriah and «کھڑا ہے» on sahood, for 'stands' and 'rises' in the two sources. Both readers of b1 passed sahood's sentence and the second wrote this very wording; b2's reader faulted the twin twice.
   - Rule: one form for one thing across the round's batches; an entry says its own scope.
   - Minimal correction: none in the text. Whichever ruling yields, its own words should carry the limit: N31's "is not written" has none.

9. [note] wording of entries and of the record
   - (a) `N16`: the ruling opens "B, amended in round 2: no quotation marks". The entry's candidates are A (the marks), B ("no marks, the name inflected") and C ("neither the word 'site' nor the marks"). Point (2) of the ruling rules what C says, and the text has C: no «مقام» on sahood.
   - (b) `termbase_final`, two claims that a gender is exercised by a string that shows none: «شہزادہ محمد بن سلمان منصوبہ», "exercised: «یہ … ایک ترقیاتی منصوبہ ہے»" (the adjective and «ہے» take no gender; the noun there is the common noun); «مدرسہ امیریہ», "exercised: «مدرسہ امیریہ … واقع ہے»" (no gender; the second string quoted, «جس ٹیلے پر یہ بنا ہے», does show it).
   - (c) `P3c`, point (1) says the gloss "is owed in three cases"; point (4) gives the same form to an attraction's own name that is an Arabic phrase with a meaning («بیت البیعہ»), a ground none of the three names.
   - (d) The sixth entry of `notes` reports the checker's result as "0 mandated, 2 extra" (two NAME-GONE). The check file beside the judge file reads "0 mandated, 0 extra, 0 ruling finding(s), 3 note(s)".
   - Rule: internal consistency of what is written to the repository.
   - Minimal correction: (a) "B and C" or "C"; (b) "not exercised" for the first, and the first string dropped for the second; (c) "three cases, and the names of point (4)"; (d) none in the text.

## The visiting row

One string, 78 code points, one U+06D4 inside and none at the end, no U+061B, last character U+06BA; equal byte for byte to candidate D of the ruling; sha256 of its UTF-8 bytes `71575a63055ed1baf1178bdb8a2b82fbbabaa6cef0cf66bf5f26a181a22ffaa1`:

«زائرین کے لیے کھلی ہے۔ ساتر لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں»

The three elements of the owner-fixed row in its order; nothing on faith, nothing on a time (build check C29). «تقدس» is masculine and the possessives agree. b2's files still carry round 1's row on jabri-mosque; the copy is not made yet.

## Code points

- Forbidden letterforms [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none.
- Non-Latin digits, U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, U+06D5, U+061B, U+2013, Latin letters: none.
- 62 distinct code points. None is new since round 1; one is gone, U+061B.
- Read and right: U+064B once («تقریباً», sahood body); U+0621 17 times, all in «الاحساء»; U+0624 twice, both «گاؤں»; U+002C once, inside «10,000».
- U+06BE 75 times, each after a ruled aspirate; after U+0691 in six words («سیڑھیاں», «پڑھ», «پڑھنے», «بڑھ», «پڑھائی», «پڑھتے»), as the P22 entry counts.
- U+06C1 directly after an aspirable consonant, 28 words, each read, all plain he.
- Words the edits brought in, each read: اگر، ان، جن، وہاں، پڑھنے، قبیلہ، بتائے، جاتے، مل، بیٹھنے، ترقیاتی، تقدس، کمیشن، بچے. Gone: گاہوں، کرتا، شہری، تانے، بانے، دلائی، جسے، اجتماع، ترقی، حرمت، ادارہ، فرزند. No pronoun of the class of open item P22.

## The eleven items of the first pass

- item 1 (N16): answered at the root. The marks are withdrawn; the old clause of the guard is gone and the new guard bans three forms, none of which is left: «“الاحساء کا نخلستان”» 0, «اس مقام “» 0, «منصوبہ”» 0. Every place a translated name of a property, a programme or a body stands: the oasis, five times, always in the oblique («… نخلستان کو» twice on qasr-ibrahim, «… نخلستان میں» on jawatha-mosque, «… نخلستان کا ایک حصہ» and «… نخلستان کے بارہ حصوں» on sahood), and as the common noun «یہ نخلستان», «اس نخلستان»; the project, twice, in the oblique («شہزادہ محمد بن سلمان منصوبے کے تحت»), then the common noun; the body, once («ورثہ کمیشن نے»). No direct-case form in the batch. The one pair of marks left is on the Arabic phrase kept as a name («“بیت الثقافہ”», ruling P3b). The ruling now says that a field whose whole value is the name carries it bare.
- item 2 (P10): answered. b0-ui's clauses stand word for word under "its candidate B", and the sentence on a figure below one lakh under "this entry's candidate A"; the clauses the tools parse are unchanged and the guard is the one of round 1.
- item 3 (termbase notes): answered. The ten shared entries equal b0-ui's round-3 entries in every field (`ar`, `en`, `gender`, `plural`, `kind`, `gloss`, `source`, `status`), and nine of the ten notes are b0-ui's note with lines added, the closing sentences of round 3 on «قصر ابراہیم» and «سوق القیصریہ» among them. The tenth, «خلیج», differs from b0-ui's by one clause removed, "and exercises the gender". The clause was untrue: in all seven texts of b1 (stages 1 to 5, rounds 1 and 2) the word stands only before a postposition or as «خلیجی», and nothing agrees with it. The notes of «بنو عبد القیس», «قلعہ» and «تفریح گاہ» are rewritten on the text as it stands.
- item 4 (N7 guard): answered; the parsed clause is word for word and the scope follows it.
- item 5 («جمعہ کو», «ہفتے کو»): answered in the ruling, which now says which name is written unchanged and which inflects; the text is kept.
- item 6 (N13 guard): answered.
- item 7 (P3c): answered. The ruling names what it amends; the school's name is glossed; "the summary and the opening of the body" replaces "the first body sentence". See finding 9 c for one loose end.
- item 8 (N18, N17, N8, N10): answered. N18 is ruled without its own reversal inside; N17 adopts b2's N29, which itself says that «آنے والے» on al-uqair is neither word and is not touched; N8 names both proposals of P13 (5); N10 says whose the table is.
- item 9 (the project's name): answered; see the edits 13 and 17 below and finding 4 b.
- item 10 (three shifts of meaning): the source's meaning is back in each. (a) «الاحساء کے لیے باہر کی دنیا کا دروازہ العقیر تھا»: the door is Al-Ahsa's way to the outside world, the same words in another order; nothing else moved, and «اس قدیم بندرگاہ» in the next sentence now follows the name directly. (b) «آپ وہاں چل سکتے ہیں جہاں کبھی قافلے گزرتے تھے»: no road is said. (c) «جو اس سرزمین پر آباد تھے»: the past tense of 'settled' is back; the repair moved the tribe into a sentence of its own (finding 3) and opened the seam of finding 4 a.
- item 11 (the record): answered for round 1; the same kind of line stands again in round 2's notes (finding 9 d).

## The 25 edits against the English and the Arabic

What entered and what left; "nothing" means form only.
- edit 1 (qasr-ibrahim summary): left, the fort as the one that 'gathers' (a state now, logged); the marked plural of the towers (finding 5).
- edits 2, 4 (two stops in the materials sentence): nothing; the connective before the minaret went with the mark.
- edit 3 («شندل نامی لکڑی (جو کبھی خلیجی خطے میں درآمد کی جاتی تھی)»): entered, «نامی» and the generic outside the bracket, and 'region' ('imported to the Gulf' is 'into the Gulf region', as the approved German and Russian texts of this sentence have it); left, nothing. The explanation is still in place and still the owner's (C40). «خلیجی خطے» now stands in two sentences running, where the source has 'Gulf' twice.
- edit 5 («اگر آپ … تو …»): the invitation is a condition; logged; nothing else.
- edits 6, 7 (the World Heritage clause): left, the image of a fabric and the fabric as the one that 'placed'; entered, a city: finding 2.
- edit 8 (the port's door): order only; see item 10 a.
- edit 9 («جزیرہ نما عرب»): entered, the name of the peninsula, where both sources say 'the peninsula' (logged). The same sentence writes the Gulf without the qualifier both sources give it (ruling P5).
- edit 10 (the caravans): left, round 1's road.
- edits 11, 16 (the tribe): finding 3.
- edit 12 («نماز اور مل بیٹھنے کی وہ صدیاں»): 'gathering' / «الاجتماع» is said with a verb of people sitting together; nothing of fact.
- edits 13, 17 (the project): the name in two parts: the short name, inflected, then a sentence that says what it is, with the source's 'for'. Entered: «ایک» and a statement of its own ('this is a development project for historic mosques'); left: the long official name as one name. «اسی منصوبے کے تحت» is «اسی کے تحت».
- edit 14 (the row): «تقدس» for «حرمت», a stop for the mark; nothing of fact.
- edit 15: a stop; nothing.
- edits 18, 22 ('site'): finding 6.
- edit 19 (sahood's opening): order only. The body now opens with the same four words as the summary above it («المبرز کے قلب میں»), as the two sources do in other positions.
- edit 20 (the resistance): the chain of possessives is opened with a relative clause; the same words; «اس قلعے نے اس مزاحمت کے …» has two pointing words, the second answered by «جو».
- edit 21 («ورثہ کمیشن»): the loan form of stages 1 to 5; nothing of fact.
- edit 23: a stop; finding 7.
- edit 24 (ameeriah's opening): entered, the gloss (the English title said in Urdu); left, the verb 'is' of round 1, so that 'first formal government school' stands in an apposition with no tense, as in the source. The claim is as flat as before and the noun is not widened.
- edit 25 («بچے»): 'the region's sons' / «أبناء المنطقة» is 'the children of this area'. Left: the gendered word of the English. The judge's reason (the unmarked plural is as open as the Arabic's) holds for the Arabic; against the English the word is wider.

## Rulings checked cell by cell

- Hours: qasr-ibrahim practical[0].value and faq[0].a, jawatha-mosque practical[0].value and faq[1].a, ameeriah practical[0].value: unchanged since round 1 and right by N7, N8, N9, N10 and P13 (eight, eight, two, two and four clock times, each with a figure and a part of the day; «تا» for the range, «اور» for two days and for two ranges, the middle dot between day groups, «جمعہ کو» and «ہفتے کو» as N7 now words them). al-uqair: no hours in the source, none written.
- Prices: «10 سے 15 سعودی ریال» in the card and in the answer; «داخلہ مفت» twice; «داخلے کی کوئی فیس نہیں» twice. Right by N13 and P7.
- Years and the century: «2018 میں» three times, «1937 میں», «1356 ہجری (1937 عیسوی)», «1360 ہجری (1941 عیسوی)», «بارہویں صدی ہجری کے اواخر میں». Right by N11 and N12; nothing computed.
- Figures: «10,000» as the English groups it; 'seven', 'six', 'twelve' in words.
- Brackets, six pairs: the two glosses of item 10; the chandal clause; the two Gregorian years; «(ثقافت کا گھر)».
- The opening of each body: no page's name stands against another name (rider to N14): the place first on qasr-ibrahim and sahood, a bracket and a comma on ameeriah, common words on the other two.
- «قبیلہ بنو عبد القیس» at the first mention in each of the two fields that name the tribe (rider to N27).
- Medina three of three with «منورہ»; «عبد» followed by a space; «خلیج» bare six times on al-uqair and the adjective twice on qasr-ibrahim; «زیارت» and «زائرین» on the mosque page only; «سیر» three times, never of a mosque.

## Agreement after the edits

- «جس کے اندر مسجد، سپاہیوں کی رہائش گاہیں اور برج یکجا ہیں»: «جس کے» with «قلعہ».
- «شندل نامی لکڑی (جو … درآمد کی جاتی تھی)»: feminine with «لکڑی»; «چھتیں … کی ہیں».
- «اگر آپ … گھومیں اور دیکھیں …، تو … پڑھ لیں گے»; «تہیں … جمتی چلی گئیں».
- «ان عمارتوں میں شامل ہے جن کی بنا پر … نخلستان کو … جگہ ملی»: the verb with «جگہ».
- «دروازہ العقیر تھا»; «خبریں اور تجارت جزیرہ نما عرب کے قلب تک پہنچتی تھیں».
- «یہ نماز پڑھنے والے … کے لوگ بتائے جاتے ہیں، جو … آباد تھے»: masculine plural throughout.
- «نماز اور مل بیٹھنے کی وہ صدیاں … جو … گزریں».
- «مرمت … منصوبے کے تحت ہوئی»; «یہ … ایک ترقیاتی منصوبہ ہے، اور اسی کے تحت … کی بھی مرمت ہوئی».
- «اس مقام کے تقدس کا خیال رکھیں».
- «قصر صاہود کھڑا ہے»; «اس مزاحمت کے واقعات دیکھے جو الاحساء نے … کے خلاف کی» (the last verb with «مزاحمت»); «ورثہ کمیشن نے اس کی مرمت کی»; «آج یہ … بارہ حصوں میں سے ایک ہے».
- «مدرسہ امیریہ (…)، …، … واقع ہے»; «اسکول، جو 1937 میں شروع ہوا»; «بچے … پڑھتے رہے».

## Guarded claims

- The Friday claim, field by field against the pack. Summary, flat, as its English and Arabic: «اسلام کی قدیم ترین مساجد میں سے ایک، اور مدینہ منورہ کے بعد پہلی جگہ جہاں جمعہ کی نماز ادا کی گئی۔», unchanged in this round; no hedge and no tribe, as its source has neither. Body and faq[2].a, hedged, as theirs ('is said to be' / «ويُذكر أنّه»): «یہ اسلام کی قدیم ترین مساجد میں سے ایک ہے، اور کہا جاتا ہے کہ مدینہ منورہ کی مسجد نبوی کے بعد یہ پہلی جگہ ہے جہاں جمعہ کی نماز ادا کی گئی۔» This sentence is the identical string in the two fields (compared by script), and from «کہا جاتا ہے کہ» to «ادا کی گئی» it equals round 1's. The clause the build guard needs, with «مسجد نبوی», is intact in both. The tribe follows in a sentence of its own under a reporting verb; the answer's sentence is the body's less its last clause. The tribe is presented as reported, not as fact, on the only reading that completes the sentence (finding 3). The source puts the tribe under the same 'is said' as the claim; the Urdu gives it a hedge of its own, which is no stronger and no weaker. No 'second', no Friday-mosque name, no sign of honour or benediction; 'one of the oldest' three times.
- The seaport: «سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ», unchanged.
- The school: «الاحساء کا پہلا باقاعدہ سرکاری اسکول» in the summary and, in apposition, in the body; flat; no verb of its own.
- sahood: five leaves; no word of opening or closing, hours, fee or visitor; «مرمت» once, in the past.
- qasr-ibrahim: the materials («بھوسا ملی مٹی», palm trunks, chandal, stone) and the explanation of chandal in place; the plurals of the summary: finding 5.

## Calibration entries read (33)

Every open item of the termbase has its entry. Every form a ruling gives as this batch's text stands in the text as quoted; every b1 leaf named in a `strings_affected` exists. The machine-read clauses are worded as the tools read them (N7, P9, P3c, N13, N14, and the three banned forms of N16 and the one of N33). The counts the entries state hold: six places for the bare Gulf word and two for its adjective, the oasis in the oblique in five places on three pages, «اسکول» once in the summary and three times in the body, six aspirate words after U+0691, six U+061B gone. N18: the key «ادارہ ورثہ» is listed as retired and is in no string and not in `termbase_final`; «ورثہ کمیشن», retired in round 1, is an entry again. `termbase_final`: 35 entries, 23 verified and 12 pending, as the notes say; one gloss field («بیت الثقافہ»); four notes cite P16. Findings: 1 (N33), 2 (N16 point 3), 8 (N14 and b2's N31), 9 a (N16), 9 c (P3c).

## Not verified

- I am a model of this line; the grammar and the readings are mine, and the blind read is the test of each, above all of findings 3 and 4.
- The stage checker was not run; I read its check file. No build was made: build checks C29, C30, C34, C36, C39 and C40 were read in the pack and in their tools, not run; C29, C39 and C40 will need their Urdu patterns derived again from this text.
- No blind page of this text exists yet; I read the strings in the order of the round-1 blind pages.
- b2's text was not proofed. b2's round-2 judge file is a frame without rulings; jabri-mosque still has round 1's row, so the byte-for-byte copy cannot be confirmed.
- No dictionary or reference page was fetched in this pass. The genders of «تقدس», «بندرگاہ» and «خندق», the counts for «قبیلہ بنو», «ترقیاتی منصوبہ» and «جزیرہ نما عرب», and b2's count for «قلعہ واقع ہے» are taken from the entries as written.
- That the calibration page is live with the value quoted in finding 1 was read in the worktree file and in `tm.json`, not on a build.
