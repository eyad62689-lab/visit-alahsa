RESULT: must-fix=0 should-fix=3 note=10

# Proof pass on the round-1 text — batch b3 (5 attraction pages, 53 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No existing file was changed.
Text read: `pages[].fields` of `stages/07-judge.round1.json` (file sha256 `9cfb7426b23dc0b505b06535d09396bae9484c0ae00b2b7d16f634f58c14bad3`, the hash `blind/blind-input.on-r1.json` records; 53 strings, 5038 code points, 59 distinct). It differs from `05-proofreader.json` in 5 strings (jalaniyah body, dibs summary, dibs body, bubakr-ribat body, qubba-mosque body), and the 13 entries of the change log replay on the stage-5 text to exactly this text (13 applied, each `before` found once, 0 unlogged differences). The other 48 strings are stage 5's byte for byte. The five changed strings were also read in their place on the rendered page (`blind/blind-input.on-r1.md`).
Judged by the role file as amended by the 66 rulings of the termbase and by this file's own `calibration` (18 entries).
Scans are this pass's own (`b3/s5p-dump.mjs`, `s5p-scan.mjs`, `s5p-cross.mjs`, `s5p-extra.mjs`, `s5p-areas.mjs`, `s5p-tb.mjs`; outputs `s5p-*.out.txt`, `s5p-*.view.txt`; none imports anything from the tools; the letterform scan was tried on a copy broken in memory and caught each planted character).
Stage checker, run as asked (`node check-s7.mjs b3 r1`; its check file has the same hash before and after):
`RESULT [b3 07-judge round 1]: 0 mandated, 0 extra, 0 ruling finding(s), 1 note(s) | 5 page(s), 53 strings, 5038 code points | changes=13 over 5 leaf(s) | scores 92/92/91/91/94 batch_score=91 threshold=90 decision=APPROVE | rulings=50 | termbase_final=25 | selftest PASS`
Its one note is `P20 jalaniyah::area`, the line item N30 rules and expects.

Summary. Nothing in the 53 strings breaks a letterform, a name, an agreement, a mark, a figure, a fixed string or a ruled form: all eleven items pass on the text, and none of the 13 edits brings in a fact that the page's sources do not carry or takes one out. The three should-fix items are all in the record that would be written to the repository, not in the text: the numbers N46, N47 and N48 are used by this file and by b4's stage 4 for six different items (finding 1); item N47's evidence and guard are worded so that the approved calibration page breaks them (finding 2); two termbase notes quote Urdu that is not in the text, one of them because of this round's own edit (finding 3). The eight wordings the brief names are each read against both sources in findings 4 to 10: every one holds; what each costs is stated there.

## The eleven items

- item 1, حروف (letterforms): PASS. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name is byte-identical to a key of this file's `termbase_final` or of the repository termbase; counts under "Names". No Latin letter, no fused or hyphenated name, no pleonasm («جبل القارہ کے قریب», no «پہاڑ» beside it), none of the banned variants.
- item 3, قواعد (grammar): PASS. Every agreement the 13 edits touch is listed under "Changed strings read in place".
- item 4, خطاب (address): PASS. No «آپ», no «تم», no «تو» in any form in the 53 strings; the only requests are the two honorific subjunctives of the fixed row («آئیں», «رکھیں», 5 times each, in the 5 fixed rows).
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers, 14 labels: no mark, no bracket.
- item 6, termbase compliance: PASS on the text. Two notes of `termbase_final` quote forms the text does not have (finding 3).
- item 7, رموز (punctuation): PASS. «۔» 53, «،» 41, colon 1 (dibs body, before a clause that explains), U+201C / U+201D 2 pairs («“دبس”», «“چالیس مساجد کا گاؤں”»), round brackets 11 pairs, U+061B 0, U+2013 0, no ASCII stop, comma, semicolon, question or exclamation mark, no straight quote, no guillemet. No space before a mark, none missing after one, no two marks together, no double, leading or trailing space, no line break, no Markdown. 10 strings end with «۔» (5 summaries, 5 bodies); 43 end with no mark (ruling P26).
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; in the 7 fields that carry figures every figure of the Urdu stands in the English or the Arabic and every figure of the English is in the Urdu. 9 Hijri years: 6 with an exact bracket, 2 with «تقریباً» inside the bracket (item N36), 1 bare (bubakr-ribat summary, as its source); 2 centuries, each with its calendar word; one bare Gregorian year («2017 میں», ruling N12); 2 clock times, both in the Hours cell of qubba-mosque («صبح 8 بجے سے رات 8 بجے تک», rulings P13 and N10), untouched. No price.
- item 9, انگریزیت (loans, banned lists): PASS. Loans in Urdu letters: «فیس» 6 (its entry cites P16), «کمیشن» 1 (inside the name of a body, ruling N18), the units «میٹر» and «کلومیٹر», the title «پاشا». None of the owner's banned list; no «گورنر», «رائل», «جپسم»; no «موجود»; no verbal-noun passive chain.
- item 10, گلوس (glossing): PASS. One «(یعنی » in the batch, on qubba-mosque, straight after the page's own name at its first body mention (item N39); none on bubakr-ribat (N37); «قصر ابراہیم», «مسجد الجبری» and «بیت البیعہ» bare in passing (P3c point 2, N38); «“دبس” یعنی …» is a cited word in its marks with the source's own explanation. No «(عربی میں».
- item 11, ساخت (structure): PASS. 53 leaves, the pack's keys in the pack's order; `practical` items carry `i`, `label`, `value` only; four area lines open with the larger bare place («ہفوف،» three times, «الاحساء،» once) and the fifth keeps its source's order and ends in a postposition (item N30); no card value ends with «۔».

## Code points

Forbidden class, counted one by one: U+064A = 0, U+0643 = 0, U+0629 = 0, U+0647 = 0, U+0649 = 0, U+0623 = 0, U+0625 = 0, U+06C3 = 0. Latin letters 0. Digits U+0660–0669 = 0, U+06F0–06F9 = 0, any other non-ASCII digit 0. U+00A0 = 0 (U+202F, U+2009 = 0). U+061B = 0. Also 0: U+0650, U+06C2, U+06C0, U+0640, U+0654, every format character (U+200B–200F, 202A–202E, 2066–2069, FEFF). The only combining mark is U+064B, 8 times, each in «تقریباً». U+06BE 50 times, always after one of ب پ ت چ ک ڑ د (12, 1, 9, 3, 22, 2, 1); the two after U+0691 are «سیڑھیاں» and, new in this round, «پڑھانے»; the one after U+062F is the new «آدھے» (ruling P22a; true aspirates).

## Changed strings read in place (every cell checked)

- jalaniyah body, edit 1: «… دو محرابیں اس مسجد کو منفرد بناتی ہیں۔ ستونوں کی قطاروں پر نوک دار محرابیں ٹکی ہیں۔ اس میں …» — two sentences, stop and one space at the new seam; «محرابیں ٹکی ہیں» feminine plural; no word added or lost.
- jalaniyah body, edit 2: «… یہ کام 1430 ہجری (2009 عیسوی) میں مکمل ہوا۔ 2017 میں یہ الاحساء کی تاریخی مساجد کی سرکاری فہرست میں شامل ہوئی۔» — «شامل ہوئی» feminine singular (the mosque); the year bare.
- dibs summary, edit 3: «مسجد الدبس کے نام سے معروف تاریخی مسجد الفاتح، محلہ الکوت کی قدیم ترین مساجد میں سے ایک، جو … تعمیر ہوئی۔» — a nominal summary as before, «جو … تعمیر ہوئی» feminine; on the page it stands under the crumb and the heading «مسجد الدبس» and above the body's «مسجد الدبس پرانے ہفوف …».
- dibs body, edit 4: «اسے 962 ہجری (1555 عیسوی) میں عثمانی حاکم محمد فروخ پاشا نے تعمیر کیا» — ergative, verb in the default masculine with «اسے»; the only «والی» left on the page is «ساتھ والی سڑک» (the guard of N48 holds: 1).
- bubakr-ribat body, edits 5 and 6: «الاحساء اور دور دراز کے علاقوں سے دینی علوم کے طلبہ یہاں آتے رہے ہیں، اور یہ رباط نسل در نسل ان طلبہ اور مسافروں کو مفت رہائش اور کھانا پینا دیتا آیا ہے۔» — oblique plurals, «دیتا آیا ہے» masculine with «رباط»; «طلبہ» now twice in the sentence.
- bubakr-ribat body, edit 7: «… ایک کھلے صحن کے گرد بنے ہیں، اور اس صحن میں برآمدے ہیں۔ عمارت کے مشرقی حصے میں باورچی خانے اور ایک کنواں ہے۔» — «برآمدے ہیں» masculine plural; «… اور ایک کنواں ہے», the verb with the nearest noun, singular.
- bubakr-ribat body, edit 8: «… اس بات کا گواہ ہے کہ الاحساء کے نخلستان میں علم کی جڑیں کتنی گہری ہیں۔»
- qubba-mosque body, edit 9: «تقریباً پانچ سال کی تعمیر کے بعد یہ 979 ہجری (1571 عیسوی) میں مکمل ہوئی۔» — feminine.
- qubba-mosque body, edit 10: «… جس میں دینی علوم کا مدرسہ اور قرآن پڑھانے کی جگہ بھی شامل تھی۔» — the verb with the nearest noun, feminine.
- qubba-mosque body, edit 11: «اس کے اوپر بیچ میں آدھے گولے کی شکل کا ایک گنبد ہے» — oblique masculine, «کی شکل», «کا … گنبد».
- qubba-mosque body, edit 12: «… جس پر خط ثلث میں اس کی تعمیر کی تاریخ درج ہے۔» — feminine.
- qubba-mosque body, edit 13: «یہ الاحساء کے نخلستان کی تاریخ کے ایک پورے دور کی گواہ ہے۔»
- Seams and repeats, by script on all 53 strings: no repeated adjacent word, no mark out of place, no space fault.
- A ruled form on one page and not on another: the register is «الاحساء کی تاریخی مساجد کی سرکاری فہرست» on both pages that name it (jalaniyah, tahimiyah-s); «الاحساء کے نخلستان» at both mentions of the oasis (bubakr-ribat, qubba-mosque), and the other three pages do not name it; «کے اندر سے», «نصف کر…», «قائم ہوئی», «قیام», «جو سرکاری طور پر درج ہیں» occur nowhere; «قائم ہوا» / «قائم کیا» remain only of the endowment on bubakr-ribat, which is an institution; the word for an arcade is «برآمدے» here and in b4.

## Guarded claims and statuses, field by field against the pack

- The Visiting row: 5 values, one string, equal to the approved pair of `tm.json` (sha256 of the value `9a36b1d1bbd79a242f025b6d2dbd12b40a5e90f22b6cae4921a3cc0bf91e6dd2`), one stop inside and none at the end; label «زیارت» 5 times.
- No visiting time on any page beyond the two Hours rows the sources carry (qubba-mosque practical[1], tahimiyah-s practical[1]); no body or summary names an hour; nothing is tied to prayer times.
- jalaniyah: 'one of … most celebrated' as «مشہور ترین … میں سے ایک»; the uniqueness of the two niches as the Arabic has it (ruling P19); 'more than a thousand'; the approximate century; nothing on whether prayers are held. dibs: 'one of the … oldest'; the Arabic's 'original name'; «آج بھی ایک آباد مسجد» (ruling N26); the Entry and Fees cells are the approved pairs. bubakr-ribat: the summary's year bare; «آج بھی آباد ہے»; the Cultural-visits row as at stage 5. qubba-mosque: 'one of' in the summary and 'the most' in the body, each at its own strength; 'about thirteen' with «تقریباً», 'nineteen' without; the Hours cell untouched. tahimiyah-s: untouched in all 11 strings. None of the 13 edits touches a superlative, a count, a status or a card cell.
- Recorded by the judge and seen again, not a finding of this pass: the owner's fixed row has a feminine predicate on bubakr-ribat, whose noun is masculine.

## Strings that must equal tm.json (by script)

24 card cells have an approved pair and all 24 are equal to it: 'Visiting' ×5, the Visiting value ×5, 'Fees' ×5, 'Free entry' ×5, 'Hours' ×2, 'Entry' ×1, 'A working mosque, no entry fee' ×1. The 5 kickers are one string and equal the pair keyed by the Arabic «موقع ديني». dibs area ('Al-Koot district — Hofuf') equals its pair. The four cells with no pair (bubakr-ribat practical[1] label and value, the two Hours values) are equal to stage 5.

## Names

All 25 keys of `termbase_final` were looked up: 23 stand in the text byte for byte; two do not, by design, and their notes say so — «الجبیل اور ینبع کا شاہی کمیشن» (in the text in the oblique, «… کے شاہی کمیشن نے») and «شیرہ» (oblique «شیرے»). 14 keys of the repository termbase stand in the text («الاحساء» 9, «ہفوف» 8, «الکوت» 8, «قصر ابراہیم» 5, «مسجد الجعلانیہ» 2, «الملا خاندان» 2, «جبل القارہ», «بیت البیعہ», «مسجد الجبری» and generics). The five titles are keys (four of this file, jalaniyah's of the repository). No name of the text is without a key: every toponym, person and body of the five pages was matched by hand against the two lists. «عبد» is followed by a space 2 of 2 times.

## Findings

1. [should-fix] calibration — the numbers N46, N47 and N48 name six different items in the round
   - Where: this file's `calibration`: `N46-listed-among-registered-historic-mosques`, `N47-the-oasis-on-a-page-that-has-not-named-it`, `N48-governor-word`. b4's `04-benchmarker.json` (`open_items`): `N46-site-status-row`, `N47-title-with-two-possessives`, `N48-house-sentence-person-or-family` (and N49 to N54 after them).
   - What is wrong: the two files were written within minutes of each other and each took the next free numbers. The full ids differ, so the tools do not confuse them; but this file refers to the items by number alone throughout («item N46», «see N46», «item N47», «item N48» in the change log, in `binds`, in the notes and in the termbase notes of «حاکم» and «محمد فروخ پاشا»), a checker finding carries the id, and the termbase would receive two rulings under each number.
   - Right: one batch renumbers before either is written to the termbase. b4's stage 4 runs to N54, so this file's three new items would become N55, N56, N57 (with every bare reference in this file), or b4's judge renumbers b4's; the coordinator's to choose. No string of the text is affected.

2. [should-fix] calibration `N47` — its evidence and its guard are broken by the approved calibration page
   - The Urdu: the ruling's form «الاحساء کے نخلستان» (bubakr-ribat, qubba-mosque); the applied page jabal-al-qarah, `summary_ur`: «نخلستان کے قلب میں وقت کے تراشے ہوئے غار، …».
   - What is wrong: the evidence says "Round 1's pages always wrote the oasis with its name or after it", the ruling binds "every later page", and the guard reads "the first mention of the oasis on a page carries its name". The summary renders first on a page, and the calibration page's summary opens with the bare noun; «نخلستان کے قلب میں» is also the example ruling P8 itself gives. For the four pages of b1 and b2 that name the oasis the statement is true (jawatha-mosque, khuzam, qasr-ibrahim, sahood: checked by script); for the calibration page it is not, and a guard written from this wording would fail an approved page.
   - Right: the evidence says "the attraction pages of round 1 (b1, b2)"; the ruling and the guard bind pages translated from round 2 on and say in one sentence that the calibration page is not changed and not failed by it (as ruling N33 does for its fee row). No string of b3 moves.

3. [should-fix] `termbase_final` — two notes quote Urdu that is not in the text
   - «مسجد القبہ», note: "Feminine by «مسجد», exercised: «قائم ہوئی», «حصہ تھی», «کھلی رہتی ہے»". Edit 9 of this round took «قائم ہوئی» out; the text has «مکمل ہوئی». The STAGE 7 sentence added to the note does not correct it.
   - «رباط», note: "exercised in the text («یہ رباط … فراہم کرتا رہا ہے», «بنا ہے»)". The text has «یہ رباط … دیتا آیا ہے» (stage 5's wording already).
   - Right: «مکمل ہوئی» in the first, «دیتا آیا ہے» in the second. The other 102 forms quoted in the 25 notes are either in the text or are named as search variants, sister-batch forms or dictionary citations. The text is not affected.

4. [note] qubba-mosque body, edits 9 and 12 — «مکمل ہوئی» and «اس کی تعمیر کی تاریخ»
   - Sources: 'It was founded in 979 AH / 1571 CE, after some five years of construction'; «تأسس عام 979هـ/1571م بعد بناء استغرق نحو خمس سنوات»; the plaque 'records the founding date', «تاريخ الإنشاء».
   - What left: the act of founding (both sources' verb). What entered: that the building was finished in that year. Both sources put the date after a construction of about five years, so the order of events and the year are theirs; no fact is new. The Arabic's word for what the plaque records is the construction, so «تعمیر کی تاریخ» is the Arabic's and loses only the English 'founding'. The judge counts the shift and keeps the literal wording for the owner: confirmed as described.
   - Three small things in the new wording. (i) The reason given for edit 12, "one word for the event in both sentences", is not what the text has: the event is «مکمل ہوئی» in one sentence and «تعمیر» in the other, and in the first sentence «تعمیر» is the five years of building, so 'the date of its construction' leaves open which end of the five years is meant. (ii) «اس کی تعمیر کی تاریخ» has the two possessives in a row that observation 42 faulted in «قرآن کی تعلیم کی جگہ» on the same page. (iii) «تاریخ» stands in two neighbouring sentences in two senses (date, then history); it did at stage 5 too. None is an error; all three are for the next blind read.

5. [note] dibs summary, edit 3 — the page's name set before the source's opening
   - The Urdu: «مسجد الدبس کے نام سے معروف تاریخی مسجد الفاتح، …».
   - Is anything asserted that neither source says? No. That the Al-Fatih mosque is known as Al-Dibs is what the title and the body of the same page say (English body: 'Al-Dibs Mosque — officially Al-Fatih Mosque', 'its popular name'; Arabic: «اسمه الشائع»). «معروف» without «بھی» matches 'popular name'. The head of the phrase is still the source's «تاریخی مسجد الفاتح», and everything after the comma is stage 5's.
   - What does enter: a statement from another field. The summary's own source does not make it, so the first condition of ruling P23 ("no fact … enters the sentence") is met only if the page, not the sentence, is the measure; the judge says so and names the edit for this pass and the blind read. In the same batch the other choice was made on bubakr-ribat's summary, where the body's Gregorian year is not carried in although the same three earlier lines carry it (ruling N12 is specific there). The two decisions are consistent only because N12 speaks to the one and no ruling speaks to the other: worth one sentence in the file.
   - The record says "five words" three times (edit 3, the note of «مسجد الفاتح», the notes); the words set in front are six: «مسجد الدبس کے نام سے معروف».

6. [note] bubakr-ribat body and qubba-mosque body, edits 8 and 13 — «الاحساء کے نخلستان»
   - Sources: 'a witness to the depth of learning in the oasis', «شاهداً على عمق التعليم في الواحة»; 'a witness to an entire era of the oasis's history', «حقبة كاملة من تاريخ الواحة».
   - Does the source mean the Al-Ahsa oasis there? Yes, in both: each page has placed itself in Hofuf and named Al-Ahsa before that sentence, and the definite article points to the one oasis the site is about. The name adds no fact. The form is ruling N16's point 1 (no marks, inflected), byte for byte the oblique of the key.
   - Cost on qubba-mosque: the sentence now carries four possessives in a row, «الاحساء کے نخلستان کی تاریخ کے ایک پورے دور کی گواہ» (three at stage 5), in the leaf where a chain of two was removed on a reader's remark. Grammatical; for the next blind read.

7. [note] jalaniyah body, edit 2 — «سرکاری فہرست»
   - Sources: 'in 2017 it was listed among Al-Ahsa's officially registered historic mosques'; «أُدرج عام 2017م ضمن قائمة المساجد التاريخية المسجلة رسمياً في الأحساء».
   - Does 'officially registered historic mosques' survive? In substance yes: the year, a list (the Arabic's own «قائمة»), the mosques being historic and the officiality all stand. What moved: 'officially' passes from the registering of the mosques to the list, and 'registered' is no longer a word of its own; to be in the official list is to be officially registered, and tahimiyah-s's own source calls the same thing 'the official register of historic mosques'. Nothing entered.
   - In place: «یہ کام … مکمل ہوا۔ 2017 میں یہ … شامل ہوئی۔» has «یہ» twice with two referents (the work, then the mosque); only the feminine verb tells them apart. It was so at stage 5.

8. [note] bubakr-ribat body, edits 5, 6 and 7 — students, travellers, courtyard, kitchens and well
   - Edit 5, «الاحساء اور دور دراز کے علاقوں سے»: 'from within Al-Ahsa and far beyond', «من داخل الأحساء وخارجها». 'Within' leaves as a word; «علاقوں» enters as the noun Urdu needs. Both origins stand.
   - Edit 6, «ان طلبہ اور مسافروں کو»: both groups still receive lodging, food and drink. «ان» can be read over both nouns, which would make the travellers part of those who "came"; no fact changes.
   - Edit 7 against 'around an open courtyard lined with arcades, with an eastern wing holding a well and kitchens' and «تحيط بساحة مكشوفة تتوسطها أروقة، وفي جناحه الشرقي بئر ماء ومطابخ»: «اس صحن میں برآمدے ہیں» says the arcades are in the courtyard and gives them neither the edge (English) nor the middle (Arabic), as the judge states; «عمارت» replaces a pronoun and adds nothing; 'wing' is «حصہ», as at stage 5; the two nouns are turned and their numbers kept (kitchens plural, one well). «باورچی خانے اور ایک کنواں ہے» is right by agreement with the nearest noun; a reader may expect «ہیں» after a plural subject — the judge has already named it for the blind read.

9. [note] dibs body, edit 4 — «عثمانی حاکم»
   - Sources: 'the Ottoman governor Muhammad Farrukh Pasha', «الوالي العثماني محمد فروخ باشا».
   - «حاکم» covers a governor and is wider: with no province named, «عثمانی حاکم» can also be heard as 'the Ottoman ruler'. «پاشا» after the name keeps a sultan out. The source's own word is the Urdu historical term and was misread by its letters, the loan is barred by the owner's rule, and no third common word names the office more narrowly without adding a fact (a province the source does not give). The judge states this cost; confirmed. No applied page of round 1 names a governor, so the ruling contradicts no live text (checked by script).

10. [note] qubba-mosque body, edits 10 and 11 — «قرآن پڑھانے کی جگہ», «آدھے گولے کی شکل کا»
   - «قرآن پڑھانے کی جگہ»: 'a place for teaching the Quran', «مكاناً لتعليم القرآن». Exact; still a place and not a school; nothing entered or left.
   - «آدھے گولے کی شکل کا ایک گنبد»: 'a central hemispherical dome', «قبة مركزية نصف كروية». The same shape; «گولا» is a ball (Platts, entry read in this pass through the dictionary's query page: s.m., 'a ball; a cannon-ball'), which the judge had not looked up. Two sentences on, the minaret is «گول ستون کی شکل کا»: «گولے … گول» and «کی شکل کا» twice within three sentences. For the blind read.

11. [note] jalaniyah body, edit 1 — the niches and the arches
   - Nothing entered or left; the split is clean. One thing the split makes plainer and did not cause: the Arabic's claim of uniqueness covers both the two niches and the rows of columns («يتفرد بمحرابين … وصفوف أعمدة»); the Urdu, since stage 4, gives it to the niches alone. A claim made narrower, not wider; on record.

12. [note] the sister batch — differences, as information (b4 adopts later)
   - Compared by script with `b4/stages/05-proofreader.json`, which appeared at 08:51 while this pass ran (and with stages 03 and 04).
   - Different, to be adopted by b4: the 2017 sentence of tahimiyah-e is still «2017 میں یہ الاحساء کی ان تاریخی مساجد کی فہرست میں شامل ہوئی جو سرکاری طور پر درج ہیں۔»; item N46 binds it to «2017 میں یہ الاحساء کی تاریخی مساجد کی سرکاری فہرست میں شامل ہوئی۔». The guard of N46 («جو سرکاری طور پر درج ہیں» does not occur) is worded as the tools read a banned form, so b4's judge-round check will report it until the sentence changes.
   - Equal: the byname clause (N40; b4 has it after «خود»), with «چالیس مساجد» unmarked in b4's summary as N40 says; the Hours value of the two tahimiyah pages (N41); the title pattern (N43); «الجبیل اور ینبع کے شاہی کمیشن نے» (N44); the approximate bracket of hubaish (N36); the area lines of hubaish and umzurainiq, and uqair-mosque's, each ending in a postposition (N30); 4 visiting rows, 5 kickers, 5 'free entry' cells and 3 'working mosque' cells byte for byte; «گچ», «بجری» (b4's «کنکر» is gone since its stage 4), «برآمدے», «گول ستون کی شکل کا».
   - As N42, N47, N48 and P22 say of b4: its two pages with arches name no niche; it has no «نخلستان», no governor; «جنہیں» once (uqair-mosque summary). b3 contradicts none of its own rulings.

13. [note] calibration `N38` — "«بیت الملا» already stands bare on two approved pages"
   - Found on one of the 11 applied attraction pages (baiah body, «بیت الملا کے نام سے بھی معروف ہے»). The ruling does not depend on the count.

## The calibration, entry by entry

P4, BRAND, N7: untouched, each with its reason; N7 rightly keeps the two homographs of this round out of the open item. P22: stays open; its two aspirates after U+0691 are in the text. N30: ruled A; its count of ten lines holds (six of round 1 and b4's three checked by script, all ending in a postposition), ruling and guard agree, the checker's note is the expected one. N36: the three forms quoted are in the text, jabri-mosque's and hubaish's are where it says. N37, N38, N39, N45: ruling, guard and text agree (N38: finding 13). N40: the shared clause is quoted exactly as the text has it and is equal in b4. N41: one string in both batches. N42: both sentences quoted are in the text. N43, N44: as the text and b4 have them. N46: ruling, the two sentences and the guard agree with the text; its number: finding 1. N47: finding 2. N48: ruling, guard and text agree; its number: finding 1. All five open items of the termbase are covered. Of 145 forms quoted in the 18 entries, 88 are in the text, 6 are stage-5 forms named as such, and 51 are candidates not taken, sister-batch or round-1 forms, dictionary words or Arabic; none is given as the text's and missing from it.

## Not verified

- No reader has read any of the 13 edits; this pass is a proof, not a blind read.
- Dictionary pages: «حاکم» was not re-read; the Urdu Lughat was not tried. Read in this pass through the query page of Platts's dictionary, by way of a summarising fetch and not the page itself: «گولا» (s.m., a ball) and «رباط» (s.m., an inn, a hospice), which agrees with the gender of the entry. The gender of «شیرہ» and «گچ» was not re-read.
- Whether the tools' reader in fact takes the guard of N46 was inferred from the pattern at the head of `lib/rulings.mjs`, not from a run on b4.
- b4's 05 file was compared as it stood at 08:51; it may still move.
- The source defects the judge lists (the hours of qubba-mosque against qasr-ibrahim, and the rest) were not re-examined: they are the owner's.
