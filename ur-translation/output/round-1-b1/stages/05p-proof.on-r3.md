RESULT: must-fix=0 should-fix=0 note=5

# Proof pass on the round-3 text — batch b1 (5 attraction pages, 71 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. Text read: `pages[].fields` of `stages/07-judge.round3.json` (file sha256 `00d3ca100fc4a7be4635fa1a02e545ee858af5645b77f7d427157cab259f10c5`; 71 strings, 6928 code points). It differs from the round-2 text in 8 strings, and the 13 entries of the change log replay on the round-2 text to exactly this text (13 applied, each `before` found once, 0 unlogged differences). `stages/final.json` carries the same 71 strings (compared leaf by leaf), and `blind/blind-input.on-r3.json` names the same file hash, so the page the last reader was given is this text.

Summary: nothing in the 71 strings must be changed, and nothing should be. Every edit of this round is grammatical, keeps its source's facts and strength, and leaves no broken seam, mark or name. The five notes are: what the new dress phrase of the visiting row is against its sources and precedents (1); the sister page's row, which is not this row yet (2); three places where an edit leaves the reader to pick a pronoun's noun (3); one machine-read clause of item N16 that is round 2's and no longer fits the ruling (4); and small things in the wording of entries and of the record (5). None of them is a reason to hold a page.

## Findings

1. [note] jawatha-mosque practical[2].value — the dress phrase of the visiting row: 'modest' is said by what the dress does
   - The Urdu: «زائرین کے لیے کھلی ہے۔ جسم ڈھانپنے والا لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں»
   - What it is (nothing is wrong): against the English row ('Open to visitors, with modest dress and respect for the sanctity of the place') and the Arabic («متاحة، مع اللباس المحتشم واحترام حرمة المكان») the three elements stand in the owner's order, and nothing is said of faith, of sex or of a time. One phrase moved in this round: «ساتر لباس» is «جسم ڈھانپنے والا لباس», 'dress that covers the body'. Entered: the word «جسم» and a describing phrase. Left: the one-word adjective. The sources' adjective judges the dress ('modest', «المحتشم»); the Urdu names the property by which a dress is modest. Of the three approved rows of the pack, the German does the same ('in bedeckender Kleidung'); the Russian and the Chinese keep a judging word ('в скромной одежде', '衣着端庄'). The request shape (a stop, then two honorific requests) is in neither source and in all three precedents ('приходите … и уважайте', 'bitte …', '请注意 …'); it stands since round 1 and was not touched.
   - Agreement and register: «کھلی ہے» feminine, said of the mosque of the page; «ڈھانپنے والا» masculine singular with «لباس»; «پہن کر آئیں» and «خیال رکھیں» honorific; «کے تقدس کا» masculine. Every word is plain; none is a loan. Whether 'come in dress that covers the body' is heard as blunter than the word it replaces is the blind read's to show, not a proof pass's.
   - Marks: 90 code points, one U+06D4 inside and none at the end, no U+061B, last character U+06BA.
   - Rule: the owner-fixed row (build check C29); ruling P28's test (a describing phrase, no word of judgement added); VISITING-ROW, candidate E.
   - Smallest correction: none proposed. The loss of the judging word is counted by the judge under accuracy, and the other wordings are on the owner's list.

2. [note] jawatha-mosque practical[2].value against jabri-mosque (b2) — the two rows are not equal yet
   - The Urdu: b1 «زائرین کے لیے کھلی ہے۔ جسم ڈھانپنے والا لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں» (sha256 of its UTF-8 bytes `2eda9862dbd55b63ca5f8582e1fd445a832e8aaaf532a5dc400329c9b185b870`); b2, round 2, practical[1].value «زائرین کے لیے کھلی ہے۔ ساتر لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں».
   - What it is: inside b1 the row stands once as text and is letter for letter the first quotation of the VISITING-ROW ruling and its candidate E; the notes quote it whole once more, identically (compared by script). The guard of that entry says "The two rows are equal by script". Verified at two moments: when I compared the shared rulings there was no `b2/stages/07-judge.round3.json`; when I finished there was one, an empty frame (no decision, no change, no calibration entry), still with round 2's row. So the guard is not true today and becomes true only when b2's last round copies the row, as the entry's `binds` says it will.
   - Rule: VISITING-ROW ("one string for every mosque page").
   - Smallest correction: none in b1. Before b2 is applied, jabri-mosque practical[1].value is to be compared with the string above by script (the hash is given for that).

3. [note] sahood body and qasr-ibrahim faq[3].a — three places where an edit leaves the reader to pick a pronoun's noun
   - (a) sahood body: «… یہ قلعہ اس کے واقعات کا گواہ ہے۔ اس کی فصیلوں کے اندر ایک مسجد، ایک کنواں، …». «اس» twice within seven words, across the stop of the rewritten sentence: first the resistance, then the fort. In round 2 the sentence before ended on «… کے خلاف کی۔». The noun «فصیلوں» can only be a fort's and «یہ قلعہ» is the subject just before, so the right noun is at hand.
   - (b) sahood body: «الاحساء کا نخلستان 2018 میں یونیسکو کی عالمی ورثے کی فہرست میں درج ہوا، اور آج یہ قلعہ اس کے بارہ حصوں میں سے ایک ہے۔» «اس کے» has two nouns before it, the oasis (the subject, the one meant) and «فہرست» (the nearest). The possessive agrees with «حصوں» and points to neither. 'One of the twelve parts of the list' is the other reading; the sense is against it, the grammar is not.
   - (c) qasr-ibrahim faq[3].a: «… اور گودام یکجا ہیں۔ یہ ان عمارتوں میں شامل ہے جن کی بنا پر …». With «شہر کی» gone the pronoun and the correlative stand side by side. This is the ordinary Urdu correlative and «جن» answers it at once; it is listed only because round 1's readers stopped at «یہ اس مقام». In the body the same clause follows «، اور» and has no such seam.
   - Rule: none broken; role file item 3 is met in each. The sentences of (a) and (b) are among those the judge's notes name as carrying its own hand.
   - Smallest correction: none proposed. On record should the last reader stop at (b): «… اور آج یہ قلعہ اس نخلستان کے بارہ حصوں میں سے ایک ہے» (the common noun the mosque page already uses).

4. [note] calibration `N16-quotation-marks-on-the-property-name` — the third machine-read clause is round 2's and now bars the key itself in the marked form
   - The clause: "«منصوبہ”» does not occur". The Urdu it does not fire on: «“شہزادہ محمد بن سلمان منصوبے” کے تحت» (jawatha-mosque body and faq[4].a).
   - What is wrong: point (3 a) of the ruling, new in this round, puts the short name of such a programme inside quotation marks, inflected. The termbase key is «شہزادہ محمد بن سلمان منصوبہ». In this batch it stands in the oblique only (twice), so the clause passes the 71 strings; I ran it on the approved calibration page and on b0-ui's strings as well: no hit. But a sentence that needs the direct case (the programme as the subject of «ہے» or of an intransitive verb) writes the key inside the marks, and the string then ends in exactly what the clause bars; the stage checker reads this clause as a banned form and will report `RULING N16` on the first later page that does so (the three sister mosques named on this page have pages to come). The clause was written to bar round 1's long quoted name; the judge's own note on the checker says it "bans only the direct-case form before a closing mark". Point (3 a) says nothing on the direct case. Also on the record: the owner's option for the word 'site' («“الاحساء کا نخلستان” نامی مقام کے بارہ حصوں میں سے ایک», in the notes) is a string the first clause of the same guard bars.
   - Rule: a ruling and its guard agree and stand alone.
   - Effect on the 71 strings: none.
   - Smallest correction: when the ruling is entered in the termbase, drop the third clause, or give point (3 a) one clause on the direct case and keep the guard in step with it.

5. [note] wording of entries and of the record
   - (a) The eighth entry of `notes` says rounds 1 and 2 "listed nine items that only b2's text exercises" and names eight (N19, N20, N21, N22, N23, N25, N26, N28). The ninth of round 2's list is N24, which this file still carries and now binds to sahood. Eight are dropped; one stays.
   - (b) The seventh entry of `notes` says of fourteen entries "Evidence only, no ruling, binds or guard moved". Compared field by field with round 2: ruling and guard are identical in all fourteen; `binds` moved in eleven (P3c-labels, P5, P9, P10, N7, N8, N10, N11, N13, N15, N18), each by a 'LEFT TO b2' sentence, and in N8, N15 and N18 by a reworded opening. Nothing of substance; the sentence is not exact.
   - (c) `P3c`, the guard's part for the proofreader: "a page whose title falls under case (a), (b) or (d) of point (1) carries the bracket once in its body". Case (c), the source's own gloss, is not named, and it is the only ground of the bracket on qasr-ibrahim (point 3 says so). The machine-read clause admits the bracket; the proofreader's sentence does not say it is owed.
   - (d) `N14`: the common noun stands "in the first or the second sentence, before any other fact about the building". On sahood the first sentence gives the place and the second gives the area before the noun («یہ تقریباً 10,000 مربع میٹر پر پھیلا ایک بہت بڑا قلعہ ہے۔»). The clause holds read sentence by sentence, which is how N31 quotes these two sentences as the model.
   - (e) `N17` says visitors on a page that is not a place of worship "are «سیاح»". al-uqair body says «آنے والے کو یاد دلاتے ہیں» for 'reminding the visitor'. The sentence that leaves such a phrase alone is in b2's item N29, which this file adopts and does not carry; here only "b1 has neither word off its mosque page" points to it.
   - (f) `termbase_final`, entry «قلعہ», field `source`: the dictionary quotation carries U+0643 twice («كے», «كوٹلہ»). It stands in a source field, is not rendered and is unchanged since round 2; whether the dictionary page prints it so was not looked up.
   - Rule: internal consistency of what is written to the repository.
   - Smallest correction: (a) "eight"; (b) "no ruling or guard moved"; (c) add case (c); (d) and (e) one clause each; (f) none unless a letterform guard is ever run on the termbase.

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 6928 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name letter for letter its key, or in an inflected form its entry note or a ruling quotes. Counts under "Names".
- item 3, قواعد (grammar): PASS. Every agreement the 13 edits touch was read in its whole field and is right; listed under "Agreement after the edits". Finding 3 names readings the syntax admits, not errors.
- item 4, خطاب (address): PASS. «آپ» 4 times, each with an honorific form («گھومیں اور دیکھیں … پڑھ لیں گے», «دیکھ سکیں», «چل پھر سکتے ہیں … بیٹھ سکتے ہیں», «آپ کو … جوڑ دیتا ہے»); requests in the honorific subjunctive («کھڑے ہوں», «پہن کر آئیں», «خیال رکھیں»). «تو» twice, both the particle after a condition. No «تم», «تمہارا», «تیرا».
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers, 9 labels with no final mark, bracket or quotation mark; 13 questions end with «؟».
- item 6, termbase compliance: PASS. Keys, genders and plurals as their entries; the admitted loans «اسکول» (4; «سکول» as a whole word 0) and «کمیشن» (1, inside the name of the body) spelled as their entries; no retired key.
- item 7, رموز (punctuation): PASS, by rulings N33, N16 and N13. «۔» 61, «،» 58, «؟» 13, colon 7 (one fewer than round 2: sahood's is a stop), middle dot 4 (each between two spaces), 3 pairs of quotation marks (U+201C before U+201D each time), 6 pairs of round brackets, one ASCII comma (inside «10,000»). No U+061B, no U+2013, no ASCII stop or question mark, no straight quote, no «», no space before a mark or after an opening mark, no mark beside a mark, no doubled word, no double, leading or trailing space, no U+00A0, no line break. 23 strings end with «۔», 13 with «؟», 35 with neither; no card value ends with «۔».
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; in the 12 fields that carry figures every figure of the Urdu stands in the English of its field and every figure of the English is in the Urdu (the Arabic's Hijri year of the ameeriah summary is not imported: the English has none). 24 clock times, each a part of the day, a figure and «بجے», each part by the table of P13 (4); no hour above 12; no «:00». No cell of hours, price, year or century was touched in this round.
- item 9, انگریزیت (loans, banned lists): PASS. Loans in Urdu letters: «فیس», «اسکول», «کمیشن» (entries that cite P16), the unit «میٹر», the names «یونیسکو» and «پاشا». None of the banned lists (anglicisms, arabisms, Hindi-leaning) occurs; no «موجود ہے / ہیں»; no verbal-noun chain. The words this round brings in are native: «جسامت», «باوقار», «جسم», «ڈھانپنے», «اجتماع», «چل پھر».
- item 10, گلوس (glossing): PASS, by ruling P3c. «(یعنی » twice in the batch, once on each of two pages, each straight after the page's own title at its first mention in the body: «قصر ابراہیم (یعنی ابراہیم کا محل)», «مدرسہ امیریہ (یعنی امیریہ اسکول)». «“بیت الثقافہ” (ثقافت کا گھر) نامی مقام» as P3b and P15 build it, once. Three «نامی»: «شندل نامی لکڑی», «سوق القیصریہ نامی بازار», «نامی مقام». No «(عربی میں». «قصر صاہود» bare; «قلعہ» in its summary and in the second sentence of its body, not beside the name. The project's name is in marks without a gloss: its entry's gloss field is empty, so the P15 template is not owed (item N16, point 3 a).
- item 11, ساخت (structure): PASS. 71 leaves, the leaves of the pack in pack order on each page (20, 16, 21, 5, 9); `practical` items carry `i`, `label`, `value` only and `faq` items `i`, `q`, `a`; no key with 'source'; no Markdown mark, link or line break. The two area lines with a larger place open with it and «،» (P20); the three others are open item N30.

## The visiting row

One string, 90 code points; sha256 of its UTF-8 bytes `2eda9862dbd55b63ca5f8582e1fd445a832e8aaaf532a5dc400329c9b185b870`:

«زائرین کے لیے کھلی ہے۔ جسم ڈھانپنے والا لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں»

It stands in one leaf of b1 (jawatha-mosque practical[2].value), under the label «زیارت», and nowhere else in the batch; no other leaf speaks of dress, and «ساتر» is gone from all 71. It equals candidate E and the ruling's quotation letter for letter. Against the sources and the three precedents: finding 1. Against the sister page: finding 2. Read in place on the built blind page: the row is followed by the template's notice, which says «اس مقام کی انتظامیہ», so «اس مقام» stands in two lines running, both times of the mosque.

## Code points

- Forbidden letterforms: none. Two methods of my own, neither importing from the tools: a code-point scan with an allow-list (`s5p3-scan.mjs`) and the role file's regex over the whole judge file (`s5p3-selfcheck.mjs`). In `pages[].fields` the regex has 0 hits. Outside the text it has hits in four keys, each read: `changes` and `blind_reader_rulings` (Arabic source quotations inside «»), `calibration` (Arabic quotations; of the forms a tool reads, «مليون» in the P10 guard and «قلعة» in the N14 ruling, both Arabic by design), `termbase_final` (29 `ar` fields, one Arabic word quoted in a note, and two `source` fields: an Arabic spelling quoted as such, and the dictionary quotation of finding 5 f). No key, gloss or plural of `termbase_final` carries one.
- The scan bites: 37 of 37 probes caught on copies of three leaves broken in memory (each of the eight letterforms, an Arabic kaf hidden inside «کے», both digit blocks, NBSP, ZWNJ, RLM, a Latin letter, tatweel, U+061B, U+2013, a hyphen, an ASCII stop, comma and question mark, a straight quote, a guillemet, U+06BE after a non-aspirate, U+06C2, U+06D5, a kasra, a medial U+06D2 and U+06BA, a presentation form, a space before a stop, a double space, a doubled word, a mark beside a mark, a trailing space, a line break), and the unbroken leaves carry none of them. With the regex: all 71 leaves broken once per forbidden code point, 568 of 568 caught.
- Non-Latin digits, U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, U+06D5, U+061B, U+2013, Latin letters, presentation forms: none.
- 62 distinct code points; none is new and none is gone since round 2.
- Read and right: U+064B once («تقریباً», sahood body); U+0621 17 times, all in «الاحساء»; U+0624 twice, both «گاؤں»; U+002C once, inside «10,000».
- U+06BE 72 times, each after a ruled aspirate; after U+0691 in five words («سیڑھیاں», «پڑھ», «بڑھ», «پڑھائی», «پڑھتے»), as the P22 entry now counts.
- U+06C1 directly after an aspirable consonant, 29 words, each read, all plain he: بلکہ، کشادہ، کہ، تہیں، جگہ، تاکہ، ہفتہ، دوپہر، پہلی، جہاں، پہلے، پہنچتی، نگہبانی، چہل، پہل، کہاں، بہترین، مرتبہ، کہا، سادہ، زیادہ، شہزادہ، منصوبہ، گہری، پہن، بہت، پہلا، باقاعدہ، کہتے.
- Words the edits brought in, each read: پھر، بتایا، لوگوں، اپنی، جسامت، زیادہ، باوقار، اجتماع، جسم، ڈھانپنے. Gone: پڑھنے، بتائے، جاتے، وقار، حجم، مل، بیٹھنے، ساتر، قلعے، دیکھے. All 458 distinct word forms of the batch were read in a list. No pronoun of the class of open item P22.

## Names

Letter for letter, counted by script: «الاحساء» 17, «ہفوف» 6 leaves, «قصر ابراہیم» 6, «العقیر» 8, «مسجد جواثا» 8, «قصر صاہود» 2, «مدرسہ امیریہ» 2, «المبرز» 3, «الکلابیہ» 2, «النعاثل» 2, «ام الخبیصی» 1, «سوق القیصریہ» 1, «بنو عبد القیس» 2 (both after «قبیلہ»), «مسجد نبوی» 2, «مدینہ منورہ» 3 (the bare city 0), «علی پاشا» 1, the three sister mosques 2 each, «ورثہ کمیشن» 1, «جزیرہ نما عرب» 1, «بیت الثقافہ» 1, «سعودی عرب» 1, «یونیسکو» 4 leaves, «سعودی ریال» 2.
Inflected, each form quoted in its entry note or in a ruling: «الاحساء کے نخلستان» 4 (qasr-ibrahim body and faq[3].a, jawatha-mosque body, sahood summary) and the key itself once in the direct case (sahood body, the subject of the inscription); «شہزادہ محمد بن سلمان منصوبے» 2, inside the marks (the key in the direct case 0); «عالمی ورثے» 3.
Retired or banned, all 0: «صاہود محل», «ادارہ ورثہ» (the word «ادارہ» 0), b2's «محیرس محل» and «خزام محل», «ابراہیم محل», «الہفوف», «خلیج عرب», «خلیج فارس», the hamza-less head name. «عبد» is followed by a space both times. No two names stand side by side; no Latin letter anywhere.

## The 13 edits against the English and the Arabic

What entered and what left; "nothing" means form only.
- edits 1 and 2 (qasr-ibrahim body, faq[3].a; «ان عمارتوں میں شامل ہے جن کی بنا پر …»): left, the city round 2 had brought in; entered, nothing. Against 'part of the urban fabric that placed the oasis on UNESCO's World Heritage list in 2018' / «جزءٌ من نسيجٍ عمرانيٍّ جعل الواحة على قائمة التراث العالمي»: the fabric and the English's 'urban' stay given up for 'those buildings'; what was listed is the oasis, in 2018; the fort is among what earned the listing and is not itself said to be inscribed. The two fields carry the clause as one identical string.
- edit 3 (al-uqair body; «آپ وہاں چل پھر سکتے ہیں جہاں سے کبھی قافلے گزرتے تھے»): entered, «پھر» (the compound verb for walking about) and «سے»; left, nothing. Against 'you walk in the trace of caravans' / «تمشي فيه على أثر القوافل»: no road is named; the modal and «کبھی» are round 2's. The sentence still ends on the sand that touches the sea, unchanged.
- edits 4 and 9 (jawatha-mosque body, faq[2].a; the tribe): the reporting verb stands first and the tribe is the agent with «نے», as the sources' 'by' / «على يد». Left: «پڑھنے والے» and the passive of round 2. The strength is the same: reported, not stated. Still entered since rounds 1 and 2, logged there: «قبیلہ», «کے لوگوں», a second reporting verb, «یہ نماز». 'Who settled this land' is past, and only in the body, as in the sources.
- edit 5 (jawatha-mosque body; «مٹی کی اس سادہ سی عمارت کا جو حصہ باقی ہے، وہ اپنی جسامت سے زیادہ باوقار ہے۔»): 'carries a dignity beyond its size' / «يحمل وقاراً يفوق حجمه» is 'is more dignified than its size'. Left: the noun for dignity, «حجم», two of three «اس». Entered: «اپنی», and a demonstrative where the sources have 'its' ('this simple mud building'). No word of degree. The figure is the sources'.
- edit 6 (jawatha-mosque body; «نماز اور اجتماع کی وہ صدیاں»): back to the source's word («الاجتماع», 'gathering'); nothing entered.
- edits 7 and 10 (jawatha-mosque body, faq[4].a): two marks round the short name; nothing of meaning.
- edit 8 (the row): finding 1.
- edit 11 (sahood body, the opening): a stop, «یہ» and «ہے»; the colon is gone. One source sentence is three; nothing of fact.
- edit 12 (sahood body; «الاحساء نے علی پاشا کی لشکر کشی کے خلاف جو مزاحمت کی، یہ قلعہ اس کے واقعات کا گواہ ہے۔»): 'it witnessed episodes of Al-Ahsa's resistance to Ali Pasha's campaign' / «شهد وقائع من مقاومة الأحساء لحملة علي باشا». The resistance comes first, the fort is its witness. Entered: the present tense ('is witness'), as the judge logs. 'Episodes of' («وقائع من», some) is «اس کے واقعات», which no longer marks 'some'; round 2's «اس مزاحمت کے واقعات دیکھے» did not mark it either. Nothing is said of who Ali Pasha was.
- edit 13 (sahood body, the listing): the restoration has its own sentence («ورثہ کمیشن نے اس کی مرمت کی۔»); the inscription is said first, of the oasis by name, and the fort is then one of its twelve parts. 2018 belongs to the oasis; 'one of the twelve' is the source's number; 'today' is kept; 'site' is still not rendered (item N16, point 1). The source's link between the restoration and 'today' ('Restored by …, it is today …') is two statements side by side.

## Guarded claims and statuses, field by field against the pack

- The Friday claim. Summary, flat and 'after Medina', as its English and Arabic: «اسلام کی قدیم ترین مساجد میں سے ایک، اور مدینہ منورہ کے بعد پہلی جگہ جہاں جمعہ کی نماز ادا کی گئی۔»; unchanged since round 1; no hedge, no tribe, no Prophet's Mosque, as its source has none. Body and faq[2].a, hedged and 'after the Prophet's Mosque in Medina', as theirs ('is said to be' / «ويُذكر أنّه»): «یہ اسلام کی قدیم ترین مساجد میں سے ایک ہے، اور کہا جاتا ہے کہ مدینہ منورہ کی مسجد نبوی کے بعد یہ پہلی جگہ ہے جہاں جمعہ کی نماز ادا کی گئی۔» This sentence is the identical string in the two fields and, from «کہا جاتا ہے کہ» to its stop, equals round 2's (compared by script). The tribe follows in a sentence of its own under «بتایا جاتا ہے کہ»; the answer's sentence is the body's less its last clause. One hedge each in body and answer for the claim, one each for the tribe, none in the summary. No 'second', no Friday-mosque name, no sign of honour or benediction; 'one of the oldest' three times. The Urdu levels nothing between the fields and adds nothing.
- The mosque: no visiting time and no status beyond the row's 'open to visitors', which is its source's; the only hours and prices are the park's («ساتھ والی تفریح گاہ», 8 am to 12 midnight, 10 to 15 riyals), as in the pack; «مسجد: مفت».
- World Heritage. qasr-ibrahim body and faq[3].a: above, edits 1 and 2. sahood summary: «جو یونیسکو کی فہرست میں شامل الاحساء کے نخلستان کا ایک حصہ ہے» ('a component of the UNESCO-listed Al-Ahsa Oasis site'; no 'World Heritage' where the source has none). sahood body: above, edit 13. jawatha-mosque, al-uqair, ameeriah: no clause in the sources, none in the Urdu.
- sahood: five leaves (title, kicker, summary, body, area), as the pack has them since the owner's amendment. No word of opening or closing, hours, fee or visitor in any of them (searched by script: «بند», «کھلا», «کھلی», «اوقات», «فیس», «داخلہ», «مفت», «بجے» all 0); «مرمت» once, in the past.
- Fees: «داخلہ مفت» twice (qasr-ibrahim, ameeriah); «نہیں، داخلہ مفت ہے۔»; «کھلا عوامی مقام، داخلے کی کوئی فیس نہیں» and its answer; «10 سے 15 سعودی ریال» in the card and in the answer.
- Hours: qasr-ibrahim practical[0].value and faq[0].a (eight clock times each), jawatha-mosque practical[0].value and faq[1].a (two each), ameeriah practical[0].value (four): each time and each day against the English and the Arabic, right; al-uqair has none in the source and none in the Urdu.
- Dates and figures: «2018 میں» three times; «1937 میں»; «1356 ہجری (1937 عیسوی)», «1360 ہجری (1941 عیسوی)»; «بارہویں صدی ہجری کے اواخر میں», nothing computed; «تقریباً 10,000 مربع میٹر»; seven towers, six metres, twelve parts, one to two hours in words as the sources have them.
- The seaport («سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ»), the school («الاحساء کا پہلا باقاعدہ سرکاری اسکول»), the materials and the plurals of qasr-ibrahim: unchanged in this round and as the first two proof passes left them.

## Cells read

Each changed string was read whole, in its field and in render order on the built blind pages of jawatha-mosque and sahood (`blind/on-r3/`): qasr-ibrahim body, qasr-ibrahim faq[3].a, al-uqair body, jawatha-mosque body, jawatha-mosque practical[2].value, jawatha-mosque faq[2].a, jawatha-mosque faq[4].a, sahood body. With them their neighbours and twins: jawatha-mosque summary, practical[2].label, faq[0].q, faq[0].a, faq[2].q, faq[4].q; sahood title, summary, area; qasr-ibrahim summary and faq[3].q; al-uqair bestTime, faq[2].a, faq[3].a. The other 49 strings were read once each beside their English, Arabic and precedents.

Agreement after the edits:
- «ان عمارتوں میں شامل ہے جن کی بنا پر … نخلستان کو … جگہ ملی»: the verb with «جگہ».
- «آپ وہاں چل پھر سکتے ہیں جہاں سے کبھی قافلے گزرتے تھے، اور اس ریت پر بیٹھ سکتے ہیں جو سمندر کو چھوتی ہے».
- «بتایا جاتا ہے کہ یہ نماز … کے لوگوں نے ادا کی، جو … آباد تھے»: the verb feminine with «نماز» after «نے»; the relative clause, set after the verb, masculine plural with «لوگوں». Its plural verb is what tells the reader that «جو» is not the prayer.
- «مٹی کی اس سادہ سی عمارت کا جو حصہ باقی ہے، وہ اپنی جسامت سے زیادہ باوقار ہے»: «سی» with «عمارت», «کا» with «حصہ», «اپنی» with «جسامت». The comparison of an adjective with a noun is the build of «اپنی عمر سے زیادہ سمجھدار»; it is the third reader's sentence less his «کہیں» (verified in his report).
- «اس کی محرابوں اور دیواروں کے سامنے کھڑے ہوں تو نماز اور اجتماع کی وہ صدیاں … آ جاتی ہیں جو … گزریں»; «اس کی» now follows a sentence whose subject is the surviving part of the building, which is its noun.
- «اس مسجد کی مرمت “شہزادہ محمد بن سلمان منصوبے” کے تحت ہوئی»: the verb with «مرمت»; the inflected word inside the marks, the postposition outside, in both fields; «یہ … ایک ترقیاتی منصوبہ ہے، اور اسی کے تحت … کی بھی مرمت ہوئی» is the identical string in body and answer.
- «جسم ڈھانپنے والا لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں».
- «المبرز کے قلب میں قصر صاہود کھڑا ہے۔ یہ تقریباً 10,000 مربع میٹر پر پھیلا ایک بہت بڑا قلعہ ہے۔»: masculine throughout; each sentence has its verb; «نگرانی کے سات برج اس کی … فصیلوں کی حفاظت کرتے ہیں» follows with «اس» as the fort.
- «الاحساء نے علی پاشا کی لشکر کشی کے خلاف جو مزاحمت کی، یہ قلعہ اس کے واقعات کا گواہ ہے»: feminine «کی» with «مزاحمت»; «جو … اس» correlative.
- «ورثہ کمیشن نے اس کی مرمت کی۔ الاحساء کا نخلستان … درج ہوا، اور آج یہ قلعہ اس کے بارہ حصوں میں سے ایک ہے»: «درج ہوا» with «نخلستان».
No sentence is left without its verb (the opening of faq[4].a is an elliptical answer, as in round 2); no word is doubled; no mark is stranded.

A ruled form on one page and not on another: none found. The listing clause is one string in the two fields of qasr-ibrahim; the tribe's sentence and the project's sentence are each one wording in body and answer; 'restored' is «مرمت» in all six places (four on jawatha-mosque, one each on sahood and ameeriah); 'in the heart of' is «کے قلب میں» in the bodies and the sahood summary, 'Central' «کے وسط میں» in the two area lines; 'watchtowers' is «نگرانی کے برج» on both forts; the order 'inscription, then count' (N16, point 2) has one place in b1 and stands there; no fort page has a colon after its opening (N31).

## Calibration entries read (28)

Read entry by entry: ruling, guard, `binds`, `strings_affected` and, where there is one, the list of retired keys. Every open item of the termbase (P3c, P4, P5, P6, P9, P10, P22, P27) has its entry. 23 ruled, 3 untouched, 2 left open. Every form a ruling or guard gives as this batch's text stands in the text as quoted (every «…» span of every ruling, guard and `binds` was located by script: in b1's text, in b2's round 2, in b0-ui, on the calibration page, or it is a pattern or a barred form); every b1 leaf named in a `strings_affected` exists.

Guards run by my own script on three texts (22 clauses, each proved to fire on a broken sample): the 71 strings pass all; the approved calibration page and b0-ui's 161 strings pass all but N33's mark, which stands once in each (jabal-al-qarah practical[1].value; b0-ui home.name.body). N33 as now worded fails neither: its stage clause reads the leaves of an attraction batch of round 1 or later, its build clause is to be added only after the pipeline changes the fee row or else exempts that leaf by name, and the interface string is outside it by its own words. The should-fix of the last proof pass is answered. tm.json carries the mark once, as the entry says.

The entries this round re-scoped or added:
- N16: letters named (B and C for the property, D for the programme); points 1 to 5 agree with the text (property unmarked and inflected, direct case as the subject on sahood; inscription before count; the programme's short name in marks; the body unmarked; three places for marks). One clause of the guard: finding 4.
- VISITING-ROW: candidate E equals the text; the guard on the sister row: finding 2.
- N33: above.
- N24: one wording, b2's; sahood's area phrase is unchanged since stage 1 (checked in all eight stage files).
- N27: the rider's scope (a tribe, not a ruling house); «قبیلہ بنو عبد القیس» at the first mention of each of the two fields.
- P3c: four cases; qasr-ibrahim (c), ameeriah (b), sahood (point 3). One sentence of the guard: finding 5 c.
- N14: the rider quotes sahood's first sentence as it stands; the retired key is in no string and not in `termbase_final`. One clause: finding 5 d.
- N31: quotes sahood's first two sentences letter for letter; the guard holds on both fort pages of b1.
- N30: left open; b1's three lines quoted as they stand.
- N34: the three places quoted as they stand (plural on the mosque page, «محراب دار» on ameeriah, singular beside the dome on qasr-ibrahim).
- N12: the guard's remark on 'four-digit'; ameeriah's two pairs pass it.
- N17: finding 5 e.
The counts the entries state hold: six places for the bare Gulf word and two for its adjective; five aspirate words after U+0691; «اسکول» once in the summary and three times in the body; six stops where the mark stood; three «مدینہ منورہ». The scores add up (91, 93, 90, 91, 92; the batch is its lowest page); 49 blind-reader rulings (11 applied, 13 rejected, 25 source defects) and 9 proof rulings (5 applied, 4 kept), numbered without a gap; every one of the 13 changes is referred to by a ruling; 20 source defects.

`termbase_final`: 35 entries, the keys of round 2; 23 verified, 12 pending; 21 notes changed and no other field; one gloss field («بیت الثقافہ»); four notes cite P16. The ten entries shared with b0-ui equal its round-3 entries in every field but the note. The strings the notes quote from the text stand in the text. The two notes the last proof pass faulted no longer claim a gender their strings do not show.

## The sister batches

b0-ui round 3 (locked): no ruling of it is crossed by this text. The Gulf is bare; «عالمی ورثے کی فہرست» is its N2 form; «الاحساء کا نخلستان» is its `data.oasisName`; the three nouns of the qasr-ibrahim summary are those of its `home.route.s1.d`; the al-uqair summary's last clause is that of its `home.route.s6.d`; U+06BE after U+0691 is its P22a.
b2 round 2 (the latest finished round when the comparison was made; no round-3 file existed then; at the end a round-3 frame with no decision, which I ignored): where the two files differ on a shared id, this file's entry names the difference under 'LEFT TO b2' (the row, the order of N16, the marks of point 3 a, N24's wording, N33's scope, N31). In b2's text as it stands, three things wait for its last round and are its judge's: jabri-mosque's row (finding 2), khuzam's listing sentence in round 2's order, and its N16 and N33 in round 2's words. The shared strings that are equal today: the seaport clause, «خلیج کے ساحل پر، الاحساء کے مشرق میں», the summary frame of the listing, «داخلہ مفت», the hours cell of ameeriah and baiah.

## The checker

Run from `R\tools`: `node check-s7.mjs b1 r3`, twice. First with b2's round 2 as the sister file, then with b2's empty round-3 frame in place. The same line both times:

`RESULT [b1 07-judge round 3]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | 5 page(s), 71 strings, 6928 code points | changes=13 over 8 leaf(s) | scores 91/93/90/91/92 batch_score=90 threshold=90 decision=APPROVE | rulings=49 proof_rulings=9 | termbase_final=35 | selftest PASS`

Its self-test: 71 of 71 probes caught, 22 of 22 must-not-fire probes clean. The three notes are the area lines of al-uqair, jawatha-mosque and ameeriah (item N30, open). The checker rewrites `07-judge.round3.json.check.txt`; its bytes were the same before and after (sha256 `33d15315…cfc80bbbd`). I do not believe the checker is wrong on anything it tests. What it does not test and I read: the marks round the project's name and the order of inscription and count on sahood (both right), and the clause of finding 4, which it reads as a banned form.

My own scripts and dumps are in the batch folder with the prefix `s5p3-`; they import nothing from the tools and write only their own output files. No other existing file was changed, nothing was written to the worktree, and nothing was committed.

## Verified and inferred

Verified by script or by reading the file named: the replay; the code points; the marks; the figures against the pack; the names; the identity of the twin sentences; the row's bytes; the guards on three texts; the spans of the rulings; final.json and the blind input against this text; the checker's line; that the tribe's sentence and the caravans' clause are the third reader's wordings to the letter, that the project's name is his wording with curly marks for his straight ones, that the Ali Pasha sentence is his shape with «اس کے واقعات کا» for his «اس کا», and that the dignity sentence is his less one word (his report `06-blind-reader.on-r2.md`, those five passages only).
Inferred, mine: every judgement of grammar, of what a reader will attach a pronoun to, and of register. I am a model of this line.

## Not verified

- No human reader of the language has seen this text.
- No dictionary or reference page was fetched: the genders of «جسامت», «تقدس», «مزاحمت», «لباس», «بندرگاہ» and «خندق», and the dictionary lines quoted in the change log, are taken as the entries and the log give them.
- No build was made: build checks C29, C30, C34, C36, C39 and C40 were read in the pack, not run; C29 and C30 need their Urdu patterns derived from this text.
- The fresh blind report on this text (`06-blind-reader.on-r3.md`, which appeared while I worked) was not opened: this pass is independent of it.
- b2's text was not proofed and its readers' reports were not read; what the entries quote from them is taken as written.
- That five readers met the calibration page's fee row without a remark on its mark (item N33's evidence) was not re-established.
- The reference counts cited in the entries were not re-run.
