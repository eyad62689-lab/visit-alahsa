RESULT: must-fix=0 should-fix=4 note=8

# Proof pass on the round-2 text — batch b2 (5 attraction pages, 45 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No stage file, tool or worktree file was changed; this pass wrote its own helpers and dumps (`b2/s5p2-*`) and this report, and the round checker, run as asked, wrote its check file again.
Text read: `pages[].fields` of `stages/07-judge.round2.json` (file sha256 `c7b5701c1d662364d52615bbd599359af09872cbe8b48945a18bad2b32119cd0`, the hash `blind/blind-input.on-r2.json` records; 45 strings, 5802 code points, 61 distinct). It differs from the round-1 text in 9 strings, and the 20 entries of the change log replay on the round-1 text to exactly this text (20 applied, 0 not found, 0 ambiguous, 0 unlogged differences).
Summary: nothing in the 45 strings breaks a letterform, a name, an agreement, a mark, a figure or a ruled form, and every guarded statement stands at its source's strength. One thing in the text should be settled before it is applied, the judge's own new term (finding 1). The other three should-fix items are in calibration entries that the tools now read for both attraction batches (findings 2, 3, 4). The notes are readings the new wordings admit (5 to 9) and the state of the record (10 to 12).

## Findings

1. [should-fix] uqair-castle body — «دار الامارہ», the judge's own term for 'the emirate building'
   - The Urdu: «آج جو عمارتیں دکھائی دیتی ہیں ان میں قلعہ، سرائے، دار الامارہ، چنگی خانہ اور مسجد شامل ہیں۔»
   - Verified on the text: the two words are byte-identical with the new key (one occurrence); the last letter is U+06C1 and the alif is bare, as rulings P17 and P11 ask of a form built on Arabic; no quotation marks and no gloss; five nouns in the list and a plural verb.
   - What is wrong, in three parts. (a) Its own fence. The change log and the entry say the word "states no use, date or occupant that the sources do not state". The dictionary senses the same entry quotes are «پایۂ تخت، فرماں روا کا صدر مقام» and «حاکم یا فرماں روا کی قیام گاہ، قصرِ شاہی»: a ruler's seat, his residence, a royal palace. The sources say 'the emirate building' / «مبنى الإمارة», which names whose building it is and not what it served as; round 1 refused 'office' on exactly that ground ("states a use the source does not"). Of the three earlier lines two keep the literal noun (Russian «здание эмирата», German "das Gebäude des Emirats") and one writes a seat (Chinese «埃米尔府»). On this page the site rule binds that the removed palace of Al-Uqair is not named or brought back, and one sense of the headword is a royal palace: an inferred risk, not a breach — the list is the source's five structures and the word is a common noun. (b) The authority of the spelling. The entry is of kind generic, a common noun, and takes its spelling from the reference site (8 and 15 pages) against the one dictionary page read, which heads the word «دار الامارت». The termbase gives the lexicon, the spelling and the gender of a word to the dictionary and uses the reference site for transliterations, place names and counts ("not for style"). The entry says so itself (pending on three counts) while its `gender` field says «مذکر» flat. (c) It is not the source's word. The Arabic field has «مبنى الإمارة»; the Urdu brings in another Arabic compound, which the style rule on arabisms and item 9 of the role file ask a reader to have met in Urdu. No reader had seen it when this was written.
   - Rule: RUNBOOK, "What binds every stage", 5 (nothing the source does not carry); role file items 6 and 9; termbase `sources_priority` and `style_rules.arabisms`; the fence as round 1 of this file applied it.
   - Minimal correction: none that I can certify for the text. The only wording that states nothing is the pair of round 1, at which two readers stopped. In the entry and in the page's accuracy line: say what the word states (the seat of a governor) and count it, as 'importance' for 'role' is counted; settle the spelling by the stated authority, or write the reason for leaving it. Whether the word stays is the blind read's to show.
   - Effect on the 45 strings: one word in one string.

2. [should-fix] calibration `N33-semicolon-in-running-text` — the guard this file repeats fails the calibration page, which is approved and live (finding 1 of b1's proof pass on its round 2: it holds here, and this file's entry is the one the tools now read)
   - The Urdu: in the worktree, `value_ur` of the fee row of `src/content/attractions/jabal-al-qarah.md`, the same string in `ur-translation/memory/tm.json` (pairs[9]): «بڑوں کے لیے 50 سعودی ریال؛ ٹکٹ “ارض الحضارات” (تہذیبوں کی سرزمین) نامی ثقافتی گاؤں سے ملتے ہیں». Read in this pass by script (`s5p2-calibrow.mjs`): one U+061B in the Urdu fields of that file, one in `tm.json`, none in a quoted Urdu value of any other attraction file.
   - What is wrong: this file's entry says "the mark is not written on an attraction page" and carries b1's guard word for word: "Stage checker and build check on the /ur/ attraction pages: «؛» does not occur". The one attraction page that is approved, built and in the translation memory carries the mark in a card value. `lib/rulings.mjs` takes a ruled entry, id by id, from the judge file written last; this file was written at 19:10 and b1's round 2 at 18:23, so it is this file's N33 that both batches' checks read. Neither wording says what happens to the approved row.
   - Rule: a ruling and its guard agree with the approved text they are checked against (RUNBOOK, "What binds every stage", 3).
   - Minimal correction: as b1's proof pass gave it: one sentence in `binds` and one in the guard — the build check exempts the calibration page until its row is changed by an owner override, or the entry names the change it asks for («… ریال۔ ٹکٹ …») and who makes it. The same sentence in both files.
   - Effect on the 45 strings: none; no U+061B is left in the batch.

3. [should-fix] calibration `N24-measure-two-dimensions` — two wordings in the round under one id, and this file's is the one read last
   - The Urdu: khuzam body «اس کی مستطیل فصیل ایک طرف تقریباً 70 میٹر اور دوسری طرف تقریباً 80 میٹر لمبی ہے»; baiah body «اس کا رقبہ 705 مربع میٹر ہے۔»; b1's sahood body «تقریباً 10,000 مربع میٹر پر پھیلا ایک بہت بڑا قلعہ».
   - b1 round 2 words it: "D in principle: «ضرب» is not written for a measure. Two dimensions the source does not label are said in words that name neither length nor breadth («… ایک طرف سے تقریباً 70 میٹر اور دوسری طرف سے 80 میٹر ہے»), the unit after each figure; a square keeps its words («… لمبا اور اتنا ہی چوڑا»); an area is «N مربع میٹر پر پھیلا»." Its candidate D reads "words that name neither".
   - This file words it: "D, as written in round 1 and kept: … What the ruling asks, said exactly: neither figure is called the length against the other as the breadth, no direction and no front or back is given, the unit follows each figure. … FOR AN AREA what is ruled is the unit after the figure, «N مربع میٹر»; the frame is the page's own source's … This departs from the letter of b1's clause and is recorded for that batch's last round." Its candidate D reads "words that call neither figure the length against the other as the breadth".
   - What is wrong: three differences of substance under one id. (i) The test: khuzam's «لمبی», said of both figures, fails 'name neither length nor breadth' and passes 'neither called the length against the other'. (ii) The model sentence: b1's has «طرف سے» and one 'roughly', the text has «طرف» and two. (iii) The form of an area. The entry states its departure openly; that does not make one ruling of two. Because an entry is taken from the file written last, this file's wording now holds for b1's pages as well, and b1's round 3 will put its own back for this batch unless it adopts this one.
   - The text itself, read again: the grammar is right («فصیل … لمبی ہے», feminine, one verb for both halves); no direction, no front or back, no word of breadth; the unit after each figure and after the area's figure.
   - Rule: one ruling per id for batches that share their rulings.
   - Minimal correction: none in the text. One wording, in both files. If b1's letter is held, the form this file keeps on record, one word less: «… دوسری طرف تقریباً 80 میٹر ہے».
   - Effect on the 45 strings: none, unless b1's letter is held (then one word).

4. [should-fix] calibration `P3c` — the short form this file gives of b1's ruling does not stand alone, and read alone it bars a bracket that stands on b1's page
   - The Urdu: baiah body «بیت البیعہ (یعنی بیعت کا گھر)»; b1's qasr-ibrahim body «قصر ابراہیم (یعنی ابراہیم کا محل)».
   - b1 round 2 words it in five points. In (1): "It is owed in three cases: (a) the name's generic is not an Urdu word («سوق», «عین»); (b) the generic is an Urdu word that says something else to the Urdu reader …; (c) the source itself glosses the name («قصر ابراہیم»)." At the end of (3): "«قصر ابراہیم» is glossed on its own page only, by case (c)." (4): "An attraction's own name that is an Arabic phrase with a meaning takes the form of point (1) («بیت البیعہ (یعنی بیعت کا گھر)», b2)". (5): "No bracket carries a language label".
   - This file words it in four points. (1): "… «بیت البیعہ (یعنی بیعت کا گھر)», because the source itself glosses the name." (3): "A «قصر X» name takes no gloss: «قصر» says in Urdu what 'Palace' says in the source's own name, and the page says «قلعہ» in its own words." (4): "No bracket carries a language label."
   - What is wrong: (i) the guard, copied word for word from b1, speaks of "the generic of case (a) or (b)"; this file's ruling defines no case. (ii) Point (3) has lost its last sentence: as it stands no «قصر X» name is glossed, and «قصر ابراہیم (یعنی ابراہیم کا محل)» stands in b1's round-2 text. The machine-read clause tests where the bracket stands and not which generic it follows, so no check fails; what is in question is the wording that goes to the termbase. (iii) Two grounds for one bracket: b1 puts baiah's under its point (4), this file under what b1 calls case (c). Both are true of the page (its English body has 'the House of Allegiance'); the two files should say the same. (iv) "Point (4)" means two different things in the two files. b1's proof pass, finding 9 c, is the same loose end seen from the other side.
   - Rule: an entry stands alone; one wording per id.
   - Minimal correction: b1's five points taken over whole, with this batch's applications after them.
   - Effect on the 45 strings: none. On the text the ruling holds: one «(یعنی » in the batch, straight after the page's own name at its first mention in the body; «سوق القیصریہ نامی بازار» first in its list of two; «قصر ابراہیم» bare, twice; no «(عربی میں ».

5. [note] uqair-castle body — «ہوتی رہی تھی», the judge's own tense
   - The Urdu: «یہاں سے ملنے والے آثار قدیمہ گواہی دیتے ہیں کہ اس جگہ تجارت نہایت قدیم زمانے سے ہوتی رہی تھی۔»
   - Read: the agreement is right (feminine, with «تجارت»). A pluperfect under a present main verb needs a moment in the past to lean on. The sentence before it has one («پرانے زمانے میں یہ سمندر کی طرف نجد کا دروازہ تھی»); read after that sentence the clause says the trade had gone on from very old times up to those days. It no longer reaches today, which was round 1's fault.
   - Against the sources ('trade stretching back to remote antiquity', «نشاط تجاري يمتد إلى عصور موغلة في القدم»): they say how far back the trade reaches, not that it ended. The Urdu now says it is over. The page says as much three sentences on, so nothing false enters; it is a shade the sources' sentence does not have, the opposite of round 1's.
   - Inferred, not verified: that a reader takes the anchor from the neighbouring sentence. The reference sentence the change log quotes has its own («ماضی میں …»); this one has none of its own.
   - Minimal correction: none proposed. For the blind read by name. On record in the file: «ہوتی رہی ہے», «ہوتی آئی تھی».

6. [note] jabri-mosque body — «قوس نما چھتیں», the judge's own word; and the round's word for an arch
   - The Urdu: «ایک دوسرے کو کاٹتی قوس نما چھتیں، کئی برآمدے اور مختلف وضع کے گنبد اس کی پہچان ہیں، اور اس کا مینار گول ستون کی شکل کا ہے۔»
   - Read: the agreements are right («کاٹتی … چھتیں … ہیں», feminine plural; «مینار … کا ہے», masculine). Against the sources ('intersecting vaults', «تقاطع أقبيته»): the vault is said by its shape, roofs in the form of an arc, and both facts stand, vaulted and crossing. Nothing entered. The noun 'vault' is described and not named, as it was with round 1's word.
   - Across the round: the reason the change log gives for leaving «محراب دار» — "on a mosque page «محراب» is first of all the prayer niche" — is said of b1's pages by its own readers (the reader of its stage 5 and the reader of its round 2, each on the strings of jawatha-mosque and of qasr-ibrahim: found by a search of those two reports, which I did not read whole), and b1's text keeps the word: jawatha-mosque body «اس کی محرابوں اور دیواروں کے سامنے کھڑے ہوں» for 'arches', on a mosque page; ameeriah body «دروازہ محراب دار ہے» for 'an arched entrance'; qasr-ibrahim body «گنبد محراب پر کیسے سایہ کیے ہوئے ہے» for the niche itself. So in the round «محراب» is an arch on two pages and the niche on a third, and this batch now says the vault with another word. Counted by script: «محراب» 0 times in this batch, 3 in b1; «قوس» 1 and 0.
   - Rule: none broken; one word for one thing across the round.
   - Minimal correction: none here. For the judge of the next round, with the shared rulings.

7. [note] seams of this round's edits — a pronoun that can attach two ways, and words that now stand twice
   - (a) baiah body, the judge's own sentence: «بعد میں یہ عبد اللطیف بن عبد الرحمن الملا (1853–1921) کا گھر رہا۔ وہ الملا خاندان کے بزرگ، فقیہ اور قاضی تھے۔» «وہ» is 'he', with the honorific plural the page uses for the king. Standing directly before a name it can be taken first as the demonstrative, 'that Al-Mulla family', which leaves the sentence without a subject until «تھے». The fault it replaced was of the same kind (the relative taken for the house).
   - (b) baiah body: «… علامت بن گیا، اور تاریخی اور سیاسی اہمیت کے لحاظ سے یہ الاحساء کے نمایاں ترین مقامات میں سے ایک ہے۔» — «اور» twice in three words at the join. The wording is the second reader's, word for word (his observation 22, compared by script).
   - (c) muhairis body: since edit 3 three verbs of building stand in three sentences running, «بنا» twice: «… کے لیے بنا تھا۔ اسے … تعمیر کروایا، … یہ کچی اینٹوں اور پتھر سے بنا ہے».
   - (d) muhairis summary: «المبرز کے سرے پر پہلی سعودی ریاست کے دور کا ایک چھوٹا سا قلعہ» — as in round 1 nothing parts the place from the name of the state. And 'edge' is «سرے پر» here and «کنارے» twice on khuzam («ہفوف کے مغربی کنارے پر», «محلہ المزروعیہ کے کنارے»): deliberate and stated in the change log; one English word, two Urdu words on sister pages.
   - (e) uqair-castle body: «العقیر کی بندرگاہ کی اہمیت گھٹ گئی، اور اس کی عمارتیں ایک پورے دور کی گواہ بن کر رہ گئیں۔» — «اس کی» now follows a feminine noun that is not its owner; the buildings are the port's.
   - (f) jabri-mosque summary: «محلہ الکوت میں بنو جبر کی ریاست کے دور کی ایک مسجد» — with the new noun the opening can be parsed for a moment as 'the state of the Banu Jabr in the quarter'; the sense rules it out.
   - Clean at the seams: no mark left behind by a split, no doubled word, no sentence that opens with a connective after a new stop, and each part made by the five stops that replaced U+061B has its verb (the sixth new stop is the one of (a)): «اس کا نام “زمام” سے نکلا ہے، یعنی وہ مہار جس سے اونٹوں کو لے کر چلتے ہیں۔» / «یہ نام اس علاقے پر قلعے کی گرفت کی علامت ہے۔»; «… جھروکے کھلتے ہیں۔» / «یہیں مہمانوں کے بیٹھنے کی جگہیں ہیں، …»; «… قصر ابراہیم کے قریب واقع ہے۔» / «الکوت پرانے ہفوف کا قدیم ترین محلہ ہے۔»; «صدیوں کے دوران اس کی بار بار مرمت ہوئی۔» / «آخری مرمت … ہوئی، اور اس میں اصل تعمیراتی مواد برتا گیا۔»; «زائرین کے لیے کھلی ہے۔» / «ساتر لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں».
   - Rule: none broken.
   - Minimal correction: none proposed; (a) is for the blind read by name, as the judge asks.

8. [note] jabri-mosque summary — «ریاست» comes from the Arabic summary and from the English body, not from the English summary
   - The Urdu: «محلہ الکوت میں بنو جبر کی ریاست کے دور کی ایک مسجد، جسے پندرہویں صدی عیسوی سے نمازیوں نے آباد رکھا ہے۔»
   - The sources: English summary 'A Jabrid-era mosque'; Arabic summary «جامع من عهد دولة الجبور»; English body 'in the era of the Jabrid state'. The pack lists the pair as a reviewed divergence. The approved Russian and German summaries follow the English («Мечеть эпохи Джабридов», "aus der Zeit der Jabriden").
   - What it is: a noun enters the field that the field's own English lacks. It is no new fact (the same page's English body states it) and it changes form, not content, which is the test of ruling P23; the letter of the RUNBOOK ("Arabic-only content is not imported") is touched and its purpose is not. The change log gives the reason. The divergence itself is not among the source's defects of this round, where DECISIONS asks for a divergence to be logged.
   - The century is untouched: «پندرہویں صدی عیسوی سے», the English's, with its calendar word and nothing computed.
   - Minimal correction: none in the text; one line among the source's defects.

9. [note] khuzam summary and body — 'site' is not rendered (finding 6 of b1's proof pass: it holds here, on the same words)
   - The Urdu: «… جو یونیسکو کی فہرست میں شامل الاحساء کے نخلستان کا ایک حصہ ہے۔»; «آج یہ الاحساء کے نخلستان کے بارہ حصوں میں سے ایک ہے۔ یہ نخلستان 2018 میں یونیسکو کی فہرست میں درج ہوا۔»
   - Compared by script with sahood's two frames in b1's round-2 file: equal from «جو یونیسکو» in the summary and from «آج یہ» in the body; the inscription sentence differs by the three words «عالمی ورثے کی» and nothing else, which is right, since this page's sources say 'inscribed by UNESCO' and name no list.
   - What it is: in the summary the participle keeps the listing in the phrase. In the body the number twelve is a fact about the listed property and is now said of the oasis as a place; the listing follows one sentence later. A term is lost and nothing false is said; the judge counts it under accuracy. On this page the badge line of the interface stands above the body, «یونیسکو کے عالمی ورثے کا حصہ», so the list is named before either sentence is read.
   - Also in the summary: «یونیسکو کی فہرست میں شامل» can attach to «الاحساء» or to «نخلستان»; both readings say the same.
   - Rule: accuracy against the source; item N16 rules the form.
   - Minimal correction: none proposed.

10. [note] calibration — the other ids this file shares with b1's round 2 and words differently, and what the tools do with two wordings
   - Counted by script (`s5p2-calcmp.mjs`, `s5p2-quotes.mjs`): 29 ids shared, 23 ruled in both. The ruling text is equal in one of the 23 (P10). The guard is equal in 17; in three more b1's guard is the opening of this file's (N14, N16, N24); in three it differs otherwise (the visiting row: a bracket added; N21: b1 "As N11.", here that guard written out; N28: b1 "None.", here a clause for the proofreader).
   - Most of the 22 differences are short forms that open "As b1 ruled". They leave out clauses this batch does not exercise: N7 (the oblique of a day name; a range of days without hours), N8 (several ranges in one day; «تا» not written between clock times), N12 (the full date and the decade, which this file has under N19 and N20), N14 ("before any other fact about the building"), N16 (a field whose whole value is the name; a programme's long name), N33 (the comma where the second part cannot stand alone; that item 7 of the role file is to be read with it), the visiting row (that it sorts no visitor by faith and names no time: build check C29), P5 (the adjective).
   - Differences of substance, each with both wordings. N25: b1 "the status follows the Arabic's construction, with the same content"; here "said as seeing, not as a visit: that one word less is counted under accuracy" — this file's is the corrected one and b1's still says the opposite. N28: b1 rules the name only and has no guard; here "the name is followed by the sources' own noun before a word of time … and «بنو جبر کے دور» is not written", with a guard. N27: b1's rider "a tribe named «بنو X» takes the Urdu generic before it"; here "THE RIDER on tribes does not reach «بنو جبر», ruled narrowly" — a reading only this file has. N16: b1's guard for the proofreader "the marks are for an Arabic phrase kept as a name (ruling P3b)"; here added "the cited word «“زمام”» keeps its marks" — by b1's letter the one pair of marks in this batch is not covered. N33: b1 "The colon stays where a clause or a list explains what stands before it"; here also "after the subject of a card cell (muhairis)". N29, N30 and N31 are in this file only.
   - Why it matters: an entry is taken from the judge file written last, by file time. Today that is this file for the 23 ids. When b1's round 3 is written its entries replace this file's for every id it rules, and this file's additions (the clause of N28, the cited word under N16, the area clause of N24, "Of this batch" under N14) are no longer what the tools or the termbase merge read unless b1's judge carries them; and the other way round when this batch's round 3 follows. The machine-read clauses are safe as long as each file repeats them, and this file does: b1's guard text is contained in this file's for 20 of the 23 ids, and the other three are the ones named above. b1's round-2 check file was written again at 19:21, after this file, and still reads 0 mandated, 0 extra, 0 ruling findings, 3 notes. I did not count again the "21 clauses" and "22 clauses" of note 14.
   - Rule: an entry stands alone; one wording per id.
   - Minimal correction: none in the text. One list for the two judges of round 3.

11. [note] calibration — entries of this file whose parts do not agree, or that lean on something the file does not carry
   - (a) N16: the ruling opens "B, as b1's round 2 has it". The candidates are A (the marks), B ("no marks, the name inflected") and C ("neither the word 'site' nor the marks"). The ruling then rules what C says ("neither a demonstrative nor «مقام» is set before the property's name") and the text has C. Finding 9 a of b1's proof pass holds here.
   - (b) N28: the evidence says "Ruled A in b1 round 1"; the entry of this file has no candidates. The ruling binds the noun "before a word of time"; the guard says "on the page the dynasty's name is followed by the possessive and the word for a state", without the condition. On this text both hold: two places, both «بنو جبر کی ریاست کے دور».
   - (c) The visiting row: "its candidate D" is in b1's list; this file's entry has none. The row itself is quoted in the ruling, so the entry can be applied without the list.
   - (d) N12, and N19 "As N12": the guard, b1's, reads "a four-digit figure before « ہجری»". This batch has a Hijri year of three digits, «تقریباً 850 ہجری (1446 عیسوی)» (jabri-mosque body), which the clause does not read (`lib/roundcheck.mjs`, `yearPairs`: four digits). The pair is right: this pass's scan reads three or four digits, and the figure check finds 850 and 1446 in both texts. N13's guard says of its own four-digit limit that it is the checker's approximation; N12's does not.
   - (e) P3c, `strings_affected`: two leaves. By the convention the file states (every leaf that carries the form the entry rules) the titles and bodies of the two «قصر» pages, which point (3) binds, would be listed too.
   - Rule: an entry agrees with itself and stands alone.
   - Minimal correction: wording only. (a) "C", or "B and C"; (b) the candidates, and one of the two scopes; (d) "a figure of three or four digits", or the sentence N13 has.

12. [note] the record — statements the file or the text does not bear out
   - (a) Changes cited by a name. The rulings on observations 15 and 50 and on proof findings 1 and 7 cite "changes k-unesco-summary and k-unesco-body", "m-comma and k-comma", "k-stop, b-stop, j-stop1, j-stop2" and "j-row". A change in this file has page, field, before, after and why, and no name; the names are of the judge's working file. Four changes (indexes 6, 7, 10 and 18) are referred to by no `change_ref` and can be found only by guessing which name is theirs.
   - (b) `termbase_final`, two claims that a gender is exercised by a string that shows none — the kind the first pass listed as its finding 10 a; three entries were corrected, these two are left. «الملا خاندان»: "Masculine, exercised by the possessive: «الملا خاندان کا تاریخی گھر»" — the possessive agrees with «گھر»; nothing in the text agrees with «خاندان». «عجائب گھر»: "Masculine, exercised: «اب یہ ایک عجائب گھر ہے»" — no word of the string takes a gender.
   - (c) «دار الامارہ»: the `gender` field carries a value and the note lists the gender among the three counts the entry is pending on.
   - Rule: the termbase binds every later stage, and these notes are what the apply step writes into it.
   - Minimal correction: (a) the index of the change beside its name; (b) "not exercised" in both; (c) one clause saying the field carries the dictionary's label provisionally.
   - Effect on the text: none.

## What was done, task by task

- The eleven items of the role file: each read on this text; results under "The eleven items".
- Letterform scan: this pass's own script, `b2/s5p2-scan.mjs`, which imports nothing from `R\tools`. It tests every code point against the forbidden class and against an allow-list, the slot of every mark, the final mark by kind of leaf, clock times, year pairs, centuries, figures against both sources, banned and retired forms, and the proofreader's guards of this file (N14, N16, N28, N29, N31, P3c). Result on the text: 0 findings. Proof that it bites: 65 of 65 probes caught on copies of the text broken in memory (the eight forbidden letterforms each put into a common word or a name, two kinds of foreign digit, three invisible characters, Latin letters, U+061B back in a body and in the row, an aspirate mark after a wrong letter and at the end of the new term, U+0650, U+06C2, ASCII marks, spacing and doubled marks at the new seams, a final stop on a card value and on a title, a bracket in a title, a doubled word, the retired keys and forms, a bridge word and 'again' on khuzam, 'only' on uqair-castle, a joined name, clock and year forms, a figure changed and a figure dropped, and each guard). The first run caught 62 of 64: one probe had an anchor that is not in the text, and the en-dash test passed a second dash in a leaf that has a right one; both were this script's faults, were mended, and the run repeated.
- Every changed string read in place, whole field: the 9 changed leaves, on the blind page of this round (`blind/blind-input.on-r2.md`, on which all 40 rendered leaves stand verbatim; the 5 kickers are not rendered). Cells under "Cells read".
- Guarded claims and statuses, field by field against the pack: under "Guarded claims".
- The meaning of every edit against the English and the Arabic: under "The 20 edits".
- Sentences shared with the sister batch, by script, byte for byte: under "Shared with the sister batch".
- Names against their keys, retired keys: under "Names".
- The `calibration` list entry by entry, and against b1's round 2 id by id (`s5p2-calcmp.mjs`): findings 2, 3, 4, 10, 11 and "Calibration entries read".
- The round checker: run; its line is under "The round checker".
- Every form this report quotes between guillemets was looked up by script in the file it is quoted from (`s5p2-verify.mjs`).

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 5802 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key in this file's list, in b1's (round 2), in b0-ui's (round 3) or in the repository termbase; counts under "Names". The five titles are keys of this file. No retired key, no «محل» as a word (the letters stand nine times inside «محلہ»), no «الہفوف», no head name without its hamza, no joined «عبدال…», no Latin letter. «سوق القیصریہ نامی بازار» is the form ruling P3c (2) gives; item 2 of the role file still forbids it by name.
- item 3, قواعد (grammar): PASS. Every agreement, case and ergative the edits touch was read and is right; listed under "Agreement after the edits". Findings 5 and 7 are readings the syntax admits, not errors.
- item 4, خطاب (address): PASS. No honorific pronoun and no pronoun of address in the 45 strings; the two requests of the visiting row are honorific subjunctives («پہن کر آئیں», «خیال رکھیں»). The particle three times, each after a clause («میلے لگتے ہیں تو», «الاحساء پہنچے تو», «قائم ہوئی تو»).
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers and 10 labels end without a mark and carry no bracket.
- item 6, termbase compliance: FINDING (findings 1 and 12 b, c: in entries; the 45 strings comply with every key, gender and plural that is exercised).
- item 7, رموز (punctuation): PASS, by items N33 and N16. «۔» 61, «،» 53, colon 3 (two in the text, one inside «11:30»), middle dot 1 (between two spaces), one pair of U+201C / U+201D («“زمام”»), round brackets 10 pairs, U+2013 once, one ASCII comma (inside «1,600»). No U+061B (five gone), no «؟», no ASCII stop, no straight quote, no guillemet, no space before a mark, no mark without its space after it, no mark beside another, no double, leading or trailing space, no U+00A0, no line break. 10 strings end with «۔» (5 summaries, 5 bodies); 35 end with no mark (ruling P26). The visiting row has one stop inside and none at its end.
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; in every field that carries figures each figure of the Urdu stands in the English or the Arabic and each figure of the English is in the Urdu. Clock times, weekdays, years, centuries, the decade and the range cell by cell under "Rulings checked cell by cell". No price in the batch.
- item 9, انگریزیت، تعریب (loans, banned lists): FINDING for one word (finding 1 c: an Arabic compound that is not the source's). Otherwise PASS: loans in Urdu letters are «فیس» (its entry cites P16), the unit «میٹر», the month «مئی» and the name «یونیسکو»; none of the banned lists; no «موجود ہے / ہیں» (the letters once, inside the label «موجودہ حالت»); no verbal-noun passive chain.
- item 10, گلوس (glossing): PASS, by ruling P3c. One named gloss in the batch, «بیت البیعہ (یعنی بیعت کا گھر)», once, straight after the page's own name at its first mention in the body; none in a title, kicker, summary or label. «قصر محیرس» and «قصر خزام» bare, with «قلعہ» in the summary and in the second sentence of the body and never beside the name. «قصر ابراہیم» bare, twice. No entry of this file has a gloss field, so ruling P3b binds nothing here; «“زمام”» is a cited word in its marks with the source's own explanation after it. The other 9 brackets are the 7 year pairs, the full date and the lifespan.
- item 11, ساخت (structure): PASS. 45 leaves, the leaves of the pack in pack order (9, 7, 9, 9, 11 by page); `practical` items carry `i`, label and value only; no source key; the two area lines that have a larger bare place open with it («الاحساء،», «ہفوف،»), the other three keep the source's order (item N30, open: the checker's three notes); no card value ends with «۔»; no Markdown, link or line break.

## Code points

- Forbidden letterforms: none. Foreign digits (U+0660–0669, U+06F0–06F9), U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, U+06D5, U+0624, U+061B, U+061F, Latin letters, straight quotes, guillemets, hyphen, em dash: none.
- 61 distinct code points. None is new since round 1; one is gone, U+061B.
- Read and right: U+064B five times, all in «تقریباً»; U+0621 17 times, all in «الاحساء»; U+0626 in 21 words and U+0622 in 7, each an Urdu word; U+002C once, between two digits; U+2013 once, between the two years of «(1853–1921)».
- U+06BE 63 times in 37 words, every time after an aspirable consonant, never after U+0691 and never after another letter; each word read.
- U+06C1 directly after an aspirable consonant: 20 words, each read, all plain he (پہلی پہرے پہلے چہل راستہ زیادہ موجودہ وجہ رقبہ پہنچے کہانی جگہیں ہفتہ نگہبانی کہ جگہ معاہدہ دہائی پہچان پہن).
- Words ending in U+06C1: 35, each read; among them the new «الامارہ».
- Words the edits brought in, each read (postpositions and auxiliaries apart): سرے، بنا، وہ، اہمیت، لحاظ، رہی، دار، الامارہ، گھٹ، ریاست، قوس، گول، ستون، شکل، تقدس. Gone: کنارے (once), مقام (once), جو (once), آئی، امارت، عمارت، کردار، کم، محراب، دار (as the suffix), بیلن، حرمت. No pronoun of the class of open item P22.

## Cells read (45)

Changed in this round and read whole, in place, with every edit:
- muhairis summary (edit 1); muhairis body (edits 2, 3, 4)
- khuzam summary (edit 5); khuzam body (edits 6, 7, 8)
- baiah body (edits 9, 10, 11)
- uqair-castle body (edits 12, 13, 14)
- jabri-mosque summary (edit 15); jabri-mosque body (edits 16, 17, 18, 19); jabri-mosque practical[1].value (edit 20)

Unchanged since round 1, read again and clean:
- muhairis: title, kicker, area, practical[0].label, practical[0].value, practical[1].label, practical[1].value
- khuzam: title, kicker, area, practical[0].label, practical[0].value
- baiah: title, kicker, summary, area, practical[0].label, practical[0].value, practical[1].label, practical[1].value
- uqair-castle: title, kicker, summary, area, practical[0].label, practical[0].value, practical[1].label, practical[1].value
- jabri-mosque: title, kicker, area, practical[0].label, practical[0].value, practical[1].label, practical[2].label, practical[2].value

## The 20 edits against the English and the Arabic

What entered and what left; "nothing" means form only.
- edit 1 (muhairis summary, «سرے پر»): 'on the edge of' / «على أطراف» is said as the end of a place. Entered and left: nothing of fact. See finding 7 d.
- edit 2 (the comma after «قصر محیرس»): nothing. The names are parted.
- edit 3 («یہ ایک چھوٹا سا قلعہ ہے جو نگرانی اور پہرے کے لیے بنا تھا۔»): 'a small watch-and-guard fort' is 'a small fort that was built for watching and guarding', the summary's clause. Entered: a verb of building in the past, which the English has in the same sentence. Left: nothing. See finding 7 c.
- edit 4 («دو منزلہ ایک گول برج ہے»): order only.
- edits 5 and 8 (khuzam, the listed property): left, the quotation marks and «مقام» for 'site'; the name inflects. Finding 9.
- edit 6 (two commas in khuzam's opening): nothing.
- edits 7, 11, 16, 19 (a stop for U+061B): nothing. Finding 7, the last line.
- edit 9 (baiah, «تاریخی اور سیاسی اہمیت کے لحاظ سے»): entered, 'in point of importance', which the Arabic has («ومن أهم معالمها») and the English says with 'foremost'; left, the two adjectives on the landmarks. The claim is as flat and as strong: the superlative still under 'one of', Al-Ahsa still named. Logged by the judge under accuracy.
- edit 10 («۔ وہ الملا خاندان کے بزرگ، فقیہ اور قاضی تھے۔»): a relative clause is a sentence; the same three things of the same man. Finding 7 a.
- edit 12 («ہوتی رہی تھی»): finding 5.
- edit 13 («دار الامارہ»): finding 1.
- edit 14 («کی اہمیت گھٹ گئی»): 'role' / «دور» is 'importance', and 'faded' / «تراجع» is 'lessened'. Entered: importance; left: role. Logged. The approved Russian and German bodies say the same here ('lost its significance').
- edit 15 (jabri-mosque summary, «کی ریاست»): finding 8.
- edit 17 («قوس نما»): finding 6.
- edit 18 («گول ستون کی شکل کا»): 'cylindrical' / «أسطوانية» is 'of the shape of a round pillar'. Entered: the image of a pillar; left: nothing.
- edit 20 (the visiting row): a stop for the mark and «تقدس» for «حرمت»; 'sanctity' is said; the three elements in the source's order; nothing on faith, nothing on a time.

## Guarded claims

- khuzam, the status row: «فی الحال بند ہے، مرمت اور ورثے کی ترقی کے کاموں کی وجہ سے» under «موجودہ حالت». Equal to stage 5 and to round 1 byte for byte (by script). The status first, the adverb and the indicative of the source ('Currently closed for restoration and heritage development', «مغلق حالياً لأعمال الترميم والتطوير التراثي»), its reason after it; nothing softened and nothing dropped.
- khuzam, the 2017 sentence: «2017 میں اس کی مرمت ہوئی اور اسے سیاحوں کے لیے کھول دیا گیا۔» Equal to round 1; flat, its own sentence. The sentence before it is on the tribal affairs and the one after it opens with «آج», as the source does ('it is today one of …'). No bridge anywhere in the page's seven strings: none of «لیکن», «مگر», «البتہ», «تاہم», «دوبارہ», «پھر», «اب» as a word (by script). The summary says nothing of a closure, as its source.
- uqair-castle, the status: «باہر سے دیکھا جا سکتا ہے» under «اوقات». No word for 'only', no 'open', no hours supplied. The last body sentence is untouched: work in progress as a fact, closure as a possibility of some parts («ممکن ہے کہ اس کے کچھ حصے بند ہوں»).
- uqair-castle, the port: «یہ بندرگاہ سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ ہے» — 'first' tied to the east coast, in the words of the sister page's summary (equal by script); no 'oldest'; five structures; the removed palace is not named (see finding 1 a for the one word that comes near the rule).
- uqair-castle, the trade: in the past and saying nothing of today (finding 5).
- jabri-mosque, visiting: the row is the source's three elements and names no time. No clock word, no part of the day and no hours label as a word anywhere in the page's eleven strings (by script). «آباد» three times at one strength. No hours row is written where the source has none. Two rows on the fee, as the source: «آباد مسجد، داخلے کی کوئی فیس نہیں» and «داخلہ مفت».
- jabri-mosque, the claims: «پندرہویں صدی عیسوی سے», nothing computed and no Hijri century supplied; 'around' before 850 and before 1,600; both superlatives under 'one of' («قدیم ترین اور مشہور ترین مساجد میں سے ایک»); 'the oldest quarter' as the sources have it.
- baiah: «1203 ہجری (1788 عیسوی)» in the summary and in the body, 1789 nowhere; 'the first house King Abdulaziz entered' («سب سے پہلے اسی گھر میں داخل ہوئے»); 'one of' holds the superlative after edit 9; 'now a museum' flat; the hours of the source in the cell.
- muhairis: the hours are named as the garden's and the walkway's before the hours; nothing is said of entering the fort, as the source; 'by order of' is the causative with 'later Imam' («تعمیر کروایا، جو بعد میں امام بنے»).
- Fees: «داخلہ مفت» in four cells, each 'Free entry' in its source. Hours: two cells, each figure the source's. Dates and figures: under the next heading.

## Rulings checked cell by cell

- Hours, muhairis practical[0].value: «باغ اور چہل قدمی کا راستہ: روزانہ شام 4 بجے سے رات 11:30 بجے تک». P13 and N23 (the colon inside the figure, no zero, the half hour with the part of its hour), N10 (4 pm «شام», 11:30 at night «رات»). Right.
- Hours, baiah practical[0].value: «اتوار تا جمعرات صبح 8 بجے سے رات 8 بجے تک · جمعہ اور ہفتہ شام 4 بجے سے رات 8 بجے تک». N7, N8, N10. Right, and equal to ameeriah's cell.
- The 6 clock times: each «بجے» preceded by a figure and a part of the day; no hour of 13 or more, no «:00», no dash between two times.
- Year pairs, 7, all «N ہجری (N عیسوی)»: muhairis body 1208 / 1794; khuzam body 1220 / 1805; baiah summary and body 1203 / 1788; uqair-castle body 1341 / 1922; jabri-mosque body 850 / 1446 (after «تقریباً») and 1437 / 2016.
- The full date, baiah body: «28 جمادی الاول 1331 ہجری (4 مئی 1913 عیسوی) کو». Right by N19.
- Years the source gives in one calendar, bare: «1913 میں» (baiah summary), «2017 میں» and «2018 میں» (khuzam body).
- The range «2005 سے 2007 تک» (baiah body); the en dash only in «(1853–1921)».
- Centuries: «پندرہویں صدی عیسوی سے» (jabri-mosque summary), «بیسویں صدی عیسوی کے وسط میں» (uqair-castle body). The decade: «1990 کی دہائی کے اواخر میں».
- Figures: «1,600» grouped as the English (P10); «705 مربع میٹر»; «70 میٹر» and «80 میٹر» with the unit after each; 'twenty metres', 'six', 'twelve', 'two-storey', 'third' in words, as the English has them.
- Names with «عبد»: two words, 7 of 7. «خلیج» bare, twice. Family names with their article: «الملا» 5 times, «الجبری» 3 times.
- Visitors: «سیاحوں» on khuzam; «زائرین» only in the visiting row; the label «زیارت» on the mosque page only; «سیر» nowhere.
- Location: «واقع ہے» on four pages (the three fort pages and the mosque), «… میں ہے» on baiah; no colon after an opening. The two colons outside a clock time are the two item N33 keeps.
- Openings: a comma after the page's name on the two «قصر» pages and after no other title; on the other three the name is followed by a bracket or by an Urdu common noun.
- «بنو جبر»: twice, both «بنو جبر کی ریاست کے دور».

## Agreement after the edits

- muhairis: «یہ ایک چھوٹا سا قلعہ ہے جو … بنا تھا» masculine; «دو منزلہ ایک گول برج ہے» masculine.
- khuzam: «الاحساء کے نخلستان کا ایک حصہ ہے» (the possessive with «حصہ»); «الاحساء کے نخلستان کے بارہ حصوں میں سے ایک ہے»; «یہ نخلستان … درج ہوا» masculine; «یہ نام … علامت ہے».
- baiah: «وہ … بزرگ، فقیہ اور قاضی تھے» honorific plural; «یہ … مقامات میں سے ایک ہے»; «جھروکے کھلتے ہیں»; «جگہیں ہیں»; «چیزیں … رکھی ہیں».
- uqair-castle: «تجارت … ہوتی رہی تھی» feminine; «اہمیت گھٹ گئی» feminine; «قلعہ، سرائے، دار الامارہ، چنگی خانہ اور مسجد شامل ہیں» plural; «عمارتیں … رہ گئیں».
- jabri-mosque: «بنو جبر کی ریاست کے دور کی ایک مسجد» (each possessive with the noun after it); «کاٹتی قوس نما چھتیں … پہچان ہیں»; «مینار گول ستون کی شکل کا ہے» masculine; «مرمت ہوئی»; «اس مقام کے تقدس کا خیال رکھیں» (masculine, as b1's entry has the noun).
- Ergatives of the changed leaves, each with its verb on the object: «جسے … نمازیوں نے آباد رکھا ہے», «سعود بن عبد العزیز نے تعمیر کروایا», «یہ قلعہ … نے تعمیر کیا», «… ادارے نے … مرمت کی», «سیف بن زامل الجبری نے … تعمیر کیا اور … وقف کیے».

## Shared with the sister batch

Compared by script with the text of `b1/stages/07-judge.round2.json`.
- The visiting row, jabri-mosque practical[1].value against jawatha-mosque practical[2].value: EQUAL, byte for byte; 78 code points; sha256 of the UTF-8 bytes `71575a63055ed1baf1178bdb8a2b82fbbabaa6cef0cf66bf5f26a181a22ffaa1` for both, the value b1's proof pass records. The label «زیارت»: EQUAL.
- The hours cell, baiah against ameeriah: EQUAL.
- The listed property: the summary frame from «جو یونیسکو», khuzam against sahood: EQUAL. The body sentence from «آج یہ»: EQUAL. The inscription sentence: DIFFERENT by «عالمی ورثے کی» only (finding 9).
- The port line «سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ», uqair-castle body against al-uqair summary: EQUAL. The place of the port «خلیج کے ساحل پر، الاحساء کے مشرق میں», uqair-castle body against al-uqair faq[1].a: EQUAL.
- «داخلہ مفت», four cells against qasr-ibrahim's: EQUAL. The labels «اوقات» (three) and «فیس» (four) against ameeriah's: EQUAL. The kicker «تاریخی مقام» (four) against sahood's: EQUAL.
- Every run of four words or more that the two batches share was listed by script (25 runs); beyond the ones above: «سوق القیصریہ نامی بازار» (baiah, ameeriah), «داخلے کی کوئی فیس نہیں» (jabri-mosque, al-uqair), «کے نمایاں ترین مقامات میں سے ایک» (baiah, qasr-ibrahim), «ترین مساجد میں سے ایک» (jabri-mosque, jawatha-mosque), «ہفوف کے وسط میں» (baiah area, qasr-ibrahim area), «کی حفاظت کرتے ہیں» (khuzam, sahood). The same words in both.
- Not equal, and recorded by both judges: the opening of a fort page («… واقع ہے۔» here on three pages, «… کھڑا ہے: …» on sahood); the remedy under the rider to N14 (a comma here, the place first on sahood); the frame of an area (finding 3); 'at the heart of' («ہفوف کے وسط میں» in baiah's body, «… کے قلب میں» on two pages of b1). And the word for an arch (finding 6), which neither file records.
- Against b0-ui's round 3: the labels «اوقات» and «فیس» are the words of its notice («اوقات اور فیس میں تبدیلی ہو سکتی ہے، …»); «سیاحوں» is the word of its card heading; «عجائب گھر», «تفریح گاہ» and «باغ» are the nouns of its category labels.

## Names

Whole-string counts in the 45 strings, by script.
- This file's 31 keys: «قصر محیرس» 2, «قصر خزام» 2, «بیت البیعہ» 2, «بیت الملا» 1, «الملا خاندان» 2, «شیخ عبد الرحمن بن عمر بن محمد الملا» 1, «عبد اللطیف بن عبد الرحمن الملا» 1, «شاہ عبد العزیز» 2, «سعود بن عبد العزیز» 2, «پہلی سعودی ریاست» 4, «المزروعیہ» 2, «الکوت» 7, «قلعہ العقیر» 2, «معاہدہ العقیر» 1, «نجد» 1, «دمام» 1, «مسجد الجبری» 2, «سیف بن زامل الجبری» 1, «بنو جبر» 2, «جمادی الاول» 1, «سعودی قومی دن» 1, «سرائے» 1, «چنگی خانہ» 1, «بیٹھک» 1, «عجائب گھر» 2 (once inside the Agency's name), «چوکی» 1, «زمام» 1, «دار الامارہ» 1. Three keys do not stand byte for byte because the text has them in the oblique, as their entries say: the Agency («… عجائب گھروں کے سعودی ادارے نے»), the programme («… دیکھ بھال کے منصوبے کے تحت») and «سیاح» («سیاحوں»).
- b1's and b0-ui's keys: «قصر ابراہیم» 2, «سوق القیصریہ» 1, «العقیر» 7, «خلیج» 2, «بندرگاہ» 8, «المبرز» 3, «قلعہ» 9, «تفریح گاہ» 1, «سعودی عرب» 1, «یونیسکو» 2. «الاحساء کا نخلستان» 0 in the direct case, inflected twice («الاحساء کے نخلستان»), the form item N16 quotes.
- The repository's keys: «الاحساء» 17, «ہفوف» 7, «نخلستان» 3, «فیس» 5.
- Retired keys: «محیرس محل» 0, «خزام محل» 0, «صاہود محل» 0, «ادارہ ورثہ» 0.
- Every word of the text that begins with the Arabic article lies inside a key (14 forms), but for «الحال» in «فی الحال».
- This file shares no key with b1, b0-ui or the repository, so no entry of theirs is overwritten by it. 31 entries: 19 verified, 12 pending, as note 10 says; one is new («دار الامارہ»); 22 notes changed since round 1 and no other field of an older entry.

## Calibration entries read (32)

Every open item of the repository termbase has its entry (P3c, P4, P5, P6, P9, P10, P22, P27). 25 ruled, 5 untouched, 2 open. Of the 124 forms the rulings, binds and guards quote, 81 stand in this round's text and 12 in b1's or b0-ui's; the rest are banned forms, retired keys, patterns and options on record, each read (`s5p2-quotes.mjs`). All 131 forms the score reasons quote stand in this round's text. Every leaf named in a `strings_affected` exists, and each of the 9 changed leaves is named by at least one entry.
- With a finding: N33 (2), N24 (3), P3c (4 and 11 e), N16 (10, 11 a), N28 (10, 11 b), the visiting row (11 c), N12 (11 d), N14, N25, N27 (10).
- Read and consistent, and the text as they say: P4 (all ten card rows are verified in the pack; no pending phrase), P5, P6, P9, P10 (word for word b1's), P22 (no pronoun of the class; no U+06BE after U+0691), P27, N17, N18, N19, N20, N21, N22, N23, N26, N7, N8, N10, N13, N29, N30 (open, with both forms; the three area lines unchanged), N31.
- N31 against sahood (finding 8 of b1's proof pass): this file's entry now carries its own limit ("kept for this batch's three pages … It is not extended to sahood"), so the two files no longer contradict each other in words; the difference between the pages stands and both judges record it.
- Counts the text bears out: seven «عبد» in four leaves; seven year pairs on five pages; six area lines of the open pattern in the two batches; five U+061B gone; one pair of quotation marks; «بندرگاہ» eight times on uqair-castle; sixteen stops and one colon in baiah's body; 15 applied, 14 rejected, 28 source defects and 1 open item among the 58 rulings; 3 applied and 8 kept among the 11 proof rulings.

## The points of b1's proof pass on its round 2, one by one

- Its finding 1 (N33 against the calibration page): holds on this file's entry; no effect on this text. Finding 2 above.
- Its finding 2 (qasr-ibrahim, a city in the World Heritage clause; the scope of N16 point 3): does not arise here. This batch has no such clause, and khuzam's inscription has a sentence of its own.
- Its finding 3 (the tribe's sentence): b1's text only. No tribe is named here, and this file reads the rider to N27 as not reaching «بنو جبر» (finding 10).
- Its finding 4 (a pronoun at a new stop): the same kind stands here in two places (finding 7 a and e).
- Its finding 5 (the plural of 'towers'): b1's text only. Here the plural shows in the numeral and the verb («چھ برج اس کی حفاظت کرتے ہیں»).
- Its finding 6 ('site'): holds here on the same words. Finding 9.
- Its finding 7 (a part left without a verb by a new stop): checked on this batch's five stops; each part has its verb (finding 7, last line).
- Its finding 8 (N14 against N31): answered in this file's wording; the difference stands (see above).
- Its finding 9 a (N16, the letter of the candidate): holds here (finding 11 a). 9 b (a gender said to be exercised): the same kind here, in two other entries (finding 12 b). 9 c (P3c, three cases and point 4): finding 4. 9 d (the checker's line in the notes): does not hold here; note 14 reports what the check file says.

## The round checker

Run from `R\tools` as asked: `node check-s7.mjs b2 r2`, exit 0. It rewrote its check file beside the judge file and nothing else; the judge file's hash is unchanged.

`RESULT [b2 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | 5 page(s), 45 strings, 5802 code points | changes=20 over 9 leaf(s) | scores 90/89/92/89/89 batch_score=89 threshold=90 decision=RETURN | rulings=58 proof_rulings=11 | termbase_final=31 | selftest PASS`

Its three notes are the area lines of khuzam, baiah and uqair-castle (item N30). Its self-test line: 70 of 70 probes caught, 22 of 22 must-not-fire probes clean. I do not believe the checker is wrong on this text; its count of strings, code points, changes and changed leaves is this pass's own. Two limits, reported and not worked around: the year-pair clause reads Hijri years of four digits only (finding 11 d), and an entry is chosen by the time a file was written, so which wording holds for a shared id depends on the order in which the two last rounds are saved (finding 10).

## The fresh blind read: a cross-check

`stages/06-blind-reader.on-r2.md` was written at 19:33, while this pass ran. It was opened after the twelve findings above and their grades were fixed; nothing was added, dropped or regraded because of it.
- Bears on finding 1: his item 38, minor. In a list of homely words «دار الامارہ» "alone is left in Arabic. I know it from history books; my children would not." He read it as a known learned term and did not take it for a palace.
- Against what finding 5 inferred: his item 37, moderate. "The tense is wrong for the sentence: «…سے ہوتی رہی تھی» needs a point in the past up to which it went on, and none is given." He did not take the anchor from the sentence before. His remedy is round 1's wording, which the first proof pass and the second reader refused. This pass graded it a note.
- Bears on finding 6: his item 47, moderate. He could not picture the roofs, calls «قوس نما» "a geometry-book word" and expects «محراب دار» for a building — the word the second reader was misled by.
- Agrees with finding 7 d: his items 1 and 58. «سرے پر» made him picture the end of a road ("a town has a «کنارہ», not a «سرا»"), and he lists «سرے پر» and «کنارے پر» as two words for one idea. No remark from him on 7 a, b, c, e or f; his item 29 is on the register of the sentence of 7 b.
- Agrees with finding 9: his item 18, moderate (the twelve parts "reads as geography and does not make sense as geography"), and his item 13, moderate, on the summary: he first took «جو یونیسکو کی فہرست میں شامل» as said of the fort and had to go back — a third way to attach the participle, which finding 9 did not list.
- Seen by this pass and let pass, faulted by him: «دو منزلہ ایک گول برج ہے» (his item 3, minor: "the order trips"; his remedy is round 1's order, which the second reader misread); «یہیں الاحساء کے لوگوں نے ان کے ہاتھ پر بیعت کی اور سعودی ریاست میں شامل ہو گئے۔» (his item 26, minor: the subject with the ergative mark cannot carry the second verb — a sentence unchanged since stage 5, which this pass read as the common joined construction with its subject understood); «یہ ان قلعوں کے سلسلے کی ایک کڑی تھا» (his item 15, minor; the verb is right, with the fort).
- On the guarded statements: his item 17 (serious) asks for the bridge on khuzam, with «مگر» in his remedy. The owner's decision of 2026-10-12 rules it out; the two statements stand as they are.
- On rulings both batches share: «نامی بازار» reads to him as "some bazaar or other called…" (item 24; the first proof pass on this batch records much the same from b1's reader of its round 1); «زیارت», «زائرین», «اس مقام کے تقدس» and «ساتر لباس» on the mosque card (items 50 and 51); the names with «عبد» written apart (item 59); the order of the area line (item 58); «قصر» above «قلعہ» (item 54); the half hour as a figure (item 8).

## Not verified

- I am a model of this line, not a reader of the language by birth; the grammar and the readings are mine. Where a finding says "inferred" it is a reading and not a measurement; the cross-check shows one such inference refuted by the reader (finding 5).
- No dictionary page and no reference page was fetched in this pass. The senses, headwords, genders and page counts quoted in finding 1 and elsewhere are taken from the entries and the change log as written. The genders the agreements rest on are those of the entries («بندرگاہ» feminine is a pending entry) and, for «اہمیت», «تجارت», «ستون», «مینار», «برج» and «خاندان», my own.
- No build was made and no build check was run (C29, C34 and the rest were read in the pack only). The Urdu pattern of the visiting row's build check has to be derived again from this row.
- The Russian, German and Chinese wordings quoted are read from the pack's `precedent`, not from the repository's files.
- b1's two blind-reader reports were searched for one word (finding 6) and not read whole; b1's text was read for the comparisons and not proofed.
- That the calibration page carries the row quoted in finding 2 was read in the worktree file and in `tm.json`, not on a build.
- The judge's counts of guard clauses (note 14) were not counted again; the checker's own line gives 4 retired keys and 25 clauses read.
