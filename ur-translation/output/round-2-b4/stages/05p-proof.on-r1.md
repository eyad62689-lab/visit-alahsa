RESULT: must-fix=0 should-fix=5 note=14

# Proof pass on the round-1 text — batch b4 (5 attraction pages, 53 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No existing file was changed by this pass (the stage checker, run as asked, rewrites its own `.check.txt`).
Text read: `pages[].fields` of `stages/07-judge.round1.json` (file sha256 `6ee84f17a4ca7ebedff76d83be7f96e7246834aa4319c0a259511171ab7de515`, the hash `blind/blind-input.on-r1.json` records as `stage_sha256`; 53 strings, 5429 code points, 57 distinct). It differs from `05-proofreader.json` in 7 strings (tahimiyah-e body, hubaish body, umzurainiq body, uqair-mosque summary and body, abubakr-mosque summary and body); the 13 entries of the change log replay on the stage-5 text to exactly this text (13 applied, each `before` found exactly once, no `after` present beforehand, 0 unlogged differences, leaf order unchanged). The other 46 strings are stage 5's byte for byte. The changed strings were also read in their place on the rendered pages (`blind/blind-input.on-r1.md`).
Judged by the role file as amended by the 66 rulings of the termbase and by this file's own `calibration` (28 entries).
Scans are this pass's own (`b4/s5p-dump.mjs`, `s5p-tb.mjs`, `s5p-scan.mjs`, `s5p-extra.mjs`; outputs `s5p-view.*.txt`, `s5p-scan.out.txt`, `s5p-extra.out.txt`, `s5p-tb*.out.txt`, `s5p-approved.out.txt`, `s5p-div.out.txt`; none imports anything from the tools; the letterform scan was tried on a copy broken in memory and caught both planted characters).
Stage checker, run as asked (`node check-s7.mjs b4 r1`):
`RESULT [b4 07-judge round 1]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | 5 page(s), 53 strings, 5429 code points | changes=13 over 7 leaf(s) | scores 92/91/91/90/91 batch_score=90 threshold=90 decision=APPROVE | rulings=51 | termbase_final=19 | selftest PASS`
Its three notes are `P20` on hubaish::area, umzurainiq::area and uqair-mosque::area, the lines item N30 rules and expects.

Summary. Nothing in the 53 strings breaks a letterform, a name, an agreement, a mark, a figure, a fixed string or a machine-read ruling, and none of the 13 edits brings in a fact that the page's sources do not carry. No must-fix. Two should-fix items are in the text, both in the judge's own wordings: the gateway sentence of uqair-mosque opens with a bare «یہ» that grammar cannot tie to the port (finding 1), and the summary of abubakr-mosque says «ورثے کا حصہ» with no owner of the heritage, straight before the sentence about the family (finding 2). Three are in the record that would be written to the repository: ruling P22 names a build guard that does not exist (finding 3), five termbase notes still carry stage 4's numbers, two of which now belong to b3's rulings (finding 4), and the guard of N64 is broken, read to the letter, by the approved uqair-castle page (finding 5). The wordings the brief names are each read against both sources in findings 1, 2 and 6 to 13.

## The eleven items

- item 1, حروف (letterforms): PASS. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name is byte-identical to a key of this file's `termbase_final` or of the repository termbase; counts under "Names". No Latin letter, no fused or hyphenated name, no pleonasm («جبل القارہ» twice on tahimiyah-e, never with «پہاڑ» beside it), none of the banned variants (each searched: 0).
- item 3, قواعد (grammar): PASS. Every agreement the 13 edits touch is listed under "Changed strings read in place".
- item 4, خطاب (address): PASS. No «آپ», «تم», «تو», «تمہارا», «تیرا» in the 53 strings; the only requests are the two honorific subjunctives of the fixed row («آئیں», «رکھیں», 4 times each).
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers, 14 labels: no mark, no bracket.
- item 6, termbase compliance: PASS on the text. Five notes of `termbase_final` carry numbers that no longer mean what they say (finding 4); one second name has no key of its own (finding 14).
- item 7, رموز (punctuation): PASS. «۔» 60, «،» 55, colon 1 (tahimiyah-e body, before a list that explains), U+201C / U+201D 4 pairs («“چالیس مساجد کا گاؤں”» and the Project's short name 3 times), round brackets 3 pairs, U+061B 0, U+2013 0, no ASCII stop, comma, semicolon, question or exclamation mark, no straight quote, no guillemet. No space before a mark, none missing after one, no two marks together, no double, leading or trailing space, no line break, no Markdown, no repeated adjacent word. 10 strings end with «۔» (5 summaries, 5 bodies); 43 end with no mark (ruling P26).
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; in the 4 fields that carry figures (tahimiyah-e body 2017; hubaish body 318, 2020; umzurainiq body 214, 94; abubakr-mosque body 1441, 2020, 125) every figure of the Urdu stands in the English and the Arabic and every figure of the English is in the Urdu. One century pair with «تقریباً» inside the bracket (hubaish, item N36), one bare Hijri century (hubaish summary, as its source), one exact year pair («1441 ہجری (2020 عیسوی)»), two bare Gregorian years (ruling N12). No clock time, no price.
- item 9, انگریزیت (loans, banned lists): PASS. Loans in Urdu letters: «فیس» 8 (its entry cites P16), «کمیشن» 1 (inside the name of a body, ruling N18), the units «میٹر» and «کلومیٹر». None of the owner's banned list; no «رائل», «گورنر», «جپسم», «پروگرام»; no «موجود»; no verbal-noun passive chain.
- item 10, گلوس (glossing): PASS. No «(یعنی » and no «(عربی میں» in the batch; no title of b4 falls under cases (a) to (d) of ruling P3c. The three brackets are the approximate century, the owner's chandal clause and a Gregorian year.
- item 11, ساخت (structure): PASS. 53 leaves, the pack's keys in the pack's order; `practical` items carry `i`, `label`, `value` only; two area lines open with the larger bare place («الاحساء،», «ہفوف،») and three keep their source's order and end in a postposition (item N30); no card value ends with «۔».

## Code points

Forbidden class, counted one by one: U+064A = 0, U+0643 = 0, U+0629 = 0, U+0647 = 0, U+0649 = 0, U+0623 = 0, U+0625 = 0, U+06C3 = 0. Latin letters 0. Digits U+0660–0669 = 0, U+06F0–06F9 = 0, any other non-ASCII digit 0. U+00A0 = 0 (U+202F, U+2009 = 0). U+061B = 0. Also 0: U+0650, U+06C2, U+06C0, U+0640, U+0654, every format character (U+200B–200F, 202A–202E, 2066–2069, FEFF). The only combining mark is U+064B, 11 times, each in «تقریباً». U+06BE 55 times, always after one of ب ت چ ک ڈ پ ج ڑ گ (10, 17, 5, 15, 1, 2, 1, 1, 3); the one after U+0691 is «بڑھ» (umzurainiq, ruling P22a).
The five spellings the new guard of P22 bans («جنھیں», «انھیں», «انھوں», «جنھوں», «تمھیں»): 0, 0, 0, 0, 0. The ruled spellings: «جنہیں» 1 (uqair-mosque summary; code points U+062C U+0646 U+06C1 U+06CC U+06BA), the other four 0. The five forms quoted in the guard and the five quoted in the ruling are, code point for code point, the ones scanned.

## Changed strings read in place (every cell checked)

- tahimiyah-e body, edit 1: «پرانے وقتوں میں اسے مسجد ابو النعوش کہتے تھے، اور قریبی قبرستان میں تدفین سے پہلے نماز جنازہ یہیں ادا کی جاتی تھی۔» — comma and one space at the new seam; «ادا کی جاتی تھی» feminine with «نماز جنازہ»; the name byte for byte its key.
- tahimiyah-e body, edit 2: «2017 میں یہ الاحساء کی تاریخی مساجد کی سرکاری فہرست میں شامل ہوئی۔» — feminine singular (the mosque); the year bare.
- tahimiyah-e body, edit 3: «یہ جبل القارہ کے قریب ہے، اس لیے علاقے میں آنے والوں کے لیے یہاں رکنا آسان ہے۔» — «یہ» is the subject of the sentence before it (the mosque, «شامل ہوئی»); the key whole.
- hubaish body, edit 4: «یہ الاحساء کی قدیم ترین تاریخی مساجد میں سے ایک ہے، اور تیرہویں صدی ہجری (تقریباً انیسویں صدی عیسوی) میں تعمیر ہوئی۔» — feminine; the bracket untouched; one space between «)» and «میں».
- umzurainiq body, edit 5: «یہ روایتی انداز میں مٹی، گچ اور کھجور کے تنوں سے بنی ہے۔» — feminine.
- uqair-mosque summary, edit 6: «العقیر کی بندرگاہ کے احاطے میں واقع تاریخی مسجد۔ یہ مسجد بندرگاہ کے ان حصوں میں سے ایک ہے جنہیں شاہ عبد العزیز کے دور میں ترقی دی گئی۔» — oblique plural «ان حصوں», «جنہیں … ترقی دی گئی» with the verb on «ترقی» (feminine); «جنہیں» with U+06C1.
- uqair-mosque body, edit 7: «العقیر کی بندرگاہ کی تاریخی مسجد خلیج کے ساحل پر، الاحساء کے مشرق میں، اس تاریخی بندرگاہ کے احاطے میں واقع ہے۔» — one subject, three places, one verb; «العقیر» byte for byte.
- uqair-mosque body, edit 8: «پرانے زمانے میں یہ سمندر کی طرف نجد کا دروازہ تھی، اور ملاح، تاجر اور مسافر اسی مسجد میں نماز ادا کرتے تھے۔» — «تھی» feminine with the subject, not with «دروازہ»; the list keeps its commas; see finding 1.
- uqair-mosque body, edit 9: «اس مسجد کا شمار بندرگاہ کے ان حصوں میں ہوتا ہے جن کی تعمیر و ترقی شاہ عبد العزیز کے دور میں ہوئی۔» — «ہوتا ہے» with «شمار», «ہوئی» with «تعمیر و ترقی».
- uqair-mosque body, edit 10: «… اس پوری داستان کا ایک حصہ ہے جو پرانی بندرگاہ اپنے ہاں آنے والوں کو سناتی ہے۔» — the reflexive goes back to the subject of its clause («پرانی بندرگاہ»); «سناتی ہے» feminine.
- abubakr-mosque summary, edits 11 and 12: «محلہ الکوت کے قلب میں تقریباً تین صدیاں پرانی ایک مسجد، جو ورثے کا حصہ ہے۔ یہ الملا خاندان سے وابستہ رہی ہے، جو ایک علمی گھرانہ ہے۔» — two sentences, stop and one space at the new seam; «وابستہ رہی ہے» feminine (the mosque); «گھرانہ ہے» singular.
- abubakr-mosque body, edit 13: «… اور اس کے امام نسل در نسل الملا خاندان سے ہوتے رہے، جو ایک علمی گھرانہ ہے۔» — «ہوتے رہے» plural with «امام»; the relative clause singular, so it can only go with the family.
- Seams and repeats, by script on all 53 strings: no repeated adjacent word, no mark out of place, no space fault.
- A ruled form on one page and not on another: «سے بنی ہے» now on the three pages that say what the mosque is built of (hubaish, umzurainiq, abubakr-mosque) and «بنائی گئی» nowhere; «تعمیرات» nowhere; «حصوں» for the facilities in summary and body of uqair-mosque; «آنے والوں» with its place in both sentences of item N60; the register «الاحساء کی تاریخی مساجد کی سرکاری فہرست» as in b3; «جو سرکاری طور پر درج ہیں» 0; «زائرین» in five card cells only; «نخلستان», «حاکم», «والی», «پہاڑ», «محل», «قصر» 0 in the batch.

## Guarded claims and statuses, field by field against the pack

- uqair-mosque, the seaport claim (build check C34): «یہ بندرگاہ سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ ہے۔» — untouched by the round; the words from «یہ بندرگاہ» to «ہے» stand letter for letter in the approved body of uqair-castle, and the claim «سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ» in the approved summary of al-uqair. 'First', never 'oldest': «قدیم ترین», «سب سے پرانی», «سب سے قدیم», «اولین», «واحد» occur in no field of the page. Not in the summary (its source does not carry it).
- hubaish, the chandal clause (build check C41): «شندل نامی لکڑی (جو کبھی خلیجی خطے میں درآمد کی جاتی تھی)» — once, equal by script to the clause in the approved body of qasr-ibrahim; «صندل» 0.
- uqair-mosque, the status row: label «مقام کی حالت», value «بندرگاہ کے احاطے میں مرمت کا کام جاری ہے، اور ممکن ہے کہ اس کے کچھ حصے بند ہوں». Both are byte for byte what ruling N55 quotes (the label twice, the value twice in the ruling, both in candidate A); no final stop (ruling P26); the value is the approved last sentence of uqair-castle with «بندرگاہ کے احاطے میں» for «اس مقام پر» and without its stop (checked by script). The fixed visiting string is absent from the page, the card promises no open visit, and «مرمت کا کام جاری» stands in neither summary nor body.
- The Visiting row on the four pages that carry it (tahimiyah-e, hubaish, umzurainiq, abubakr-mosque): 4 values, one string, equal to the approved pair of `tm.json` and to the value in the applied jabri-mosque file (sha256 `9a36b1d1bbd79a242f025b6d2dbd12b40a5e90f22b6cae4921a3cc0bf91e6dd2`), one stop inside and none at the end; label «زیارت» 4 times.
- No visiting time on any page beyond the one Hours row the source carries (tahimiyah-e practical[1], «دن بھر زائرین کے لیے کھلی رہتی ہے»): «بجے», «صبح», «دوپہر», «رات», «گھنٹے» 0; nothing is tied to prayer times; no body or summary names an hour.
- Superlatives: 'one of the oldest' three times, each under «میں سے ایک» (hubaish, umzurainiq of the quarters, abubakr-mosque); none of the 13 edits touches a superlative, a count, a status or a card cell. No palace is named on uqair-mosque; the King is named as the source names him.

## Strings that must equal tm.json (by script)

27 leaves have an approved pair keyed by their English and all 27 are equal to it: 'Visiting' ×4, the Visiting value ×4, 'Fees' ×5, 'Free entry' ×5, 'Entry' ×3, 'A working mosque, no entry fee' ×3, 'Hours' ×1, the area lines of uqair-mosque and abubakr-mosque. The 5 kickers are one string and equal the pair keyed by the Arabic «موقع ديني». The remaining leaves have no pair; of them the tahimiyah area line, the Hours value and the kicker are equal to b3's.

## Shared with b3 (by script, against `b3/stages/07-judge.round2.json`)

Equal: the 2017 sentence (tahimiyah-e against jalaniyah, from the figure to the stop; also equal in b3's round 1); the byname clause as ruling N40 quotes it; the Hours value and label of the two tahimiyah pages; their area line; the title pattern (b4's title is b3's with one adjective changed); «الجبیل اور ینبع کے شاہی کمیشن نے» (once in each batch); the approximate bracket in ruling N36's form; «گچ» and «بجری», with «کنکر» and «جپسم» 0 in both; abubakr-mosque's area against dibs's; the kickers; the visiting row. The 14 sister rulings (N30, N36 to N48) are byte-equal to b3's round 2 apart from the one added field `b4`, key order kept (14 of 14). The 6 shared termbase entries are byte-equal to b3's round-2 entries. b3's round 2 keeps P22 as `stays_open` and names b4 as the batch to raise it; b4 rules it: no conflict.

## Names

All 19 keys of `termbase_final` were looked up: 16 stand in the text byte for byte; three do not, by design, and their notes say so — «مشرقی صوبہ» (in the text «مشرقی صوبے کی مساجد»), «الجبیل اور ینبع کا شاہی کمیشن» (oblique), «تاریخی مساجد کی مرمت کا منصوبہ» (oblique). The 19 keys are stage 4's 19, none missing and none new. Keys of the repository termbase in the text: «الاحساء» 10, «ہفوف» 7, «العقیر» 5, «خلیج» 3, «الکوت» 3, «جبل القارہ» 2, «مسجد الحبیش» 2, «مسجد شیخ محمد بن ابی بکر الملا» 2, «الملا خاندان» 2, «شاہ عبد العزیز» 2, «نجد», «سعودی عرب», «شندل», and generics. The five titles are keys (three of this file, two of the repository). «عبد» is followed by a space 4 of 4 times. One name has no key of its own: finding 14.

## Findings

1. [should-fix] uqair-mosque body, edit 8 — the subject of «یہ … دروازہ تھی» is not fixed by the sentence
   - The Urdu: «یہ بندرگاہ سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ ہے۔ پرانے زمانے میں یہ سمندر کی طرف نجد کا دروازہ تھی، اور ملاح، تاجر اور مسافر اسی مسجد میں نماز ادا کرتے تھے۔»
   - Sources: 'where sailors, merchants and travellers once prayed at Najd's old gateway to the sea'; «الذي كان يصلي فيه البحارة والتجار وعابرو بوابة نجد البحرية القديمة». In both the gateway is the port, never the mosque.
   - What is wrong: the clause was copied from uqair-castle, where it is the second half of the port's own sentence («یہ بندرگاہ … ہے، اور پرانے زمانے میں یہ … دروازہ تھی»). Here it opens a new sentence with a bare «یہ». «بندرگاہ» and «مسجد» are both feminine, so «تھی» does not choose between them; the page's subject is the mosque and the sentence ends on «اسی مسجد میں». The nearer reading is the port (the subject of the sentence before; and the mosque is brought back by its noun in the second clause), so the sentence does not state that the mosque was Najd's gateway — but nothing in it rules that reading out, on the page that stands at the threshold. The reader's own remedy, which the change log says was taken in structure, had the noun: «یہ بندرگاہ کبھی … دروازہ تھی».
   - Right, either: the noun after the demonstrative («پرانے زمانے میں یہ بندرگاہ سمندر کی طرف نجد کا دروازہ تھی، اور …»), or the approved sentence of uqair-castle whole, with the praying in a sentence of its own («یہ بندرگاہ سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ ہے، اور پرانے زمانے میں یہ سمندر کی طرف نجد کا دروازہ تھی۔ ملاح، تاجر اور مسافر اسی مسجد میں نماز ادا کرتے تھے۔»). The second keeps every word of the approved clause and of the seaport claim.
   - Meaning of the edit, for the record: what left is the link of place between the praying and the gateway (English) and that the travellers are those who passed through it (Arabic); 'old' and 'once' are said by «پرانے زمانے میں» and the past tense; «کبھی» is gone. No fact entered: that the port was Najd's gateway to the sea is the source's. The judge counts this under accuracy; confirmed.

2. [should-fix] abubakr-mosque summary, edits 11 and 12 — «جو ورثے کا حصہ ہے» with no owner of the heritage, straight before the family
   - The Urdu: «… تقریباً تین صدیاں پرانی ایک مسجد، جو ورثے کا حصہ ہے۔ یہ الملا خاندان سے وابستہ رہی ہے، جو ایک علمی گھرانہ ہے۔»
   - Sources: 'A heritage mosque of some three centuries …, tied to the scholarly Al-Mulla family'; «مسجد تراثي … ارتبط بأسرة آل أبي بكر الملا العلمية».
   - What is wrong: the clause replaced was faulted because its first words are how one speaks of an inheritance (observation 46). The new one says 'part of the heritage' and does not say whose; «حصہ» is also the word for a share of an estate, and the next sentence is about a family. The reading the edit was made to remove is not excluded, and the reader's other question (a register, or simply age) is no nearer an answer. The body has the heritage with its owner («الاحساء کے ورثے کی»), the frame approved on qasr-ibrahim. Nothing entered and nothing left in meaning; the fault is of form.
   - Right: for the judge with the blind report on this text. If the reader takes it for the family's inheritance or stops on it, the heritage needs its owner, which on this page only the body's source gives («جو الاحساء کے ورثے کا حصہ ہے» — a word from another field, as 'of the port' is in the summary of uqair-mosque; to be counted the same way); if he passes it, it stands.

3. [should-fix] calibration `P22` — the evidence and the guard name a build check that does not exist
   - The text of the entry: evidence, 'the repository's letterform guard accepts U+06BE after eleven consonants, and the two this class needs are not among them'; guard, 'Build: tools/check-ur-text.mjs as it stands (U+06BE only after the listed consonants)'; ruling, 'the guard's set of consonants before U+06BE is not widened'; note 5, 'Nothing changes … in the build guard'.
   - What is wrong: `tools/check-ur-text.mjs` in the worktree (395 lines, read in this pass) has no test of U+06BE at all: its `FORBIDDEN_LETTERS` are the eight Arabic letterforms, and nothing in the `tools` folder of the repository mentions the aspirate mark. The set of eleven consonants is line 48 of the round's stage checker, `R/tools/lib/textcheck.mjs` (`ASPIRABLE`), which stage 4 cited under the repository file's name; the judge took the sentence over. So a banned spelling such as «جنھیں» in an applied file passes the build today; only the stage checker of the round would stop it.
   - Is the guard true of the whole applied site today? Yes: by script, the five banned spellings and the five ruled ones occur 0 times in every `*_ur` value of the 58 files of `src/content/attractions` (11 carry Urdu), 0 times in `src/i18n/ui.ts` (whole file), 0 times in any file under `src`, 0 in `tm.json`, 0 in b3's round-2 text; b4 has the one «جنہیں». Of 563 U+06BE in those values none follows a letter outside the eleven (three such hits are in termbase notes: a recorded variant and two vowelled dictionary citations).
   - Does it conflict with P22a or the repository guard? No. P22a speaks of the stage checker's set and of U+0691; the repository guard is silent on the letter.
   - Right: the entry names the stage checker as the holder of the consonant set and of the banned forms, says that the build does not test the letter, and leaves it to the coordinator whether the five banned forms become a build guard. No string of the text moves.
   - Evidence, as gathered (read from the judge's own output files): the press counts in the entry are the script's (12, 15, 18, 3, 2 with U+06C1; 44 with U+06BE on one outlet; two outlets no text; 94 in all). Two things the entry does not say: several of the 'pages it links to' were style sheets, images or share links, not articles (the output lists them); and the same dictionary script fetched a search page of the reference dictionary for the U+06BE spelling of «انھیں», which answered HTTP 200 and carried that spelling 29 times against 1 — a page that echoes its own query, so weak evidence, but gathered and not reported. The entry page it does report (20 against 0) is as stated.

4. [should-fix] `termbase_final` — five notes still carry stage 4's numbers; two of them are now b3's rulings
   - «العقیر کی بندرگاہ کی مسجد»: 'The form is raised as N47 (two possessives)'. «شیخ ابو بکر»: 'raised as N48'. «جنوبی الرفعہ»: 'raised as N52', 'The form is raised as N54'. «مشرقی صوبہ»: 'Raised as N53'.
   - What is wrong: these notes go to the repository termbase, where N47 and N48 are b3's oasis and governor rulings and N52 to N54 name nothing. Note 3 of the file says old numbers 'in stages 4 and 5 of b4' are to be read through its table, but these stand in this file. Each note does give the new number further on (N56, N57, N61 and N63, N62), so nothing is lost, but one note then cites one item under two numbers.
   - Right: in the five notes the stage-4 number is followed by its new one, or replaced by it (N47 as N56, N48 as N57, N52 as N61, N53 as N62, N54 as N63). Everywhere else in the file the three numbers N46, N47, N48 mean b3's items and b4's own are N55 to N63 with `renumbered_from` (checked by script on every citation).

5. [should-fix] calibration `N64` — its guard, read to the letter, is broken by the approved uqair-castle page
   - The guard: 'in the opening sentence of a body the page's title is never followed directly by another proper name'; the ruling makes it a rule 'on any attraction page'.
   - The applied page: uqair-castle opens «قلعہ العقیر خلیج کے ساحل پر، …» — the title, then «خلیج», which is a toponym key of the termbase. The other ten applied openings and the ten of b3 and b4 hold (checked by script and read).
   - Right: one sentence in the entry saying that «خلیج», a common noun used as the name, is not a name in the ruling's sense, or that the pages of round 1 are neither changed nor failed by it (as N47 now says of the calibration page). uqair-mosque's new opening has the same build («… تاریخی مسجد خلیج کے ساحل پر، …») with a description in the title's place, so it passes either way.

6. [note] uqair-mosque summary and body, edits 6 and 9 — 'facilities' as «حصوں»
   - Sources: summary 'among the facilities developed under King Abdulaziz', «من المرافق التي طوّرها الملك عبدالعزيز»; body 'among the port facilities built and developed in the reign of King Abdulaziz', «من مرافق الميناء التي أُنشئت وطُوّرت في عهد الملك عبدالعزيز».
   - 'Developed' is in the summary alone and 'built and developed' in the body alone, each where its field has it («ترقی دی گئی»; «تعمیر و ترقی … ہوئی»). 'In the reign of' is «کے دور میں» in both; the summary's English says 'under' and its Arabic makes the King the agent — the Urdu follows the English, as stage 5 did; logged in the pack.
   - What left: the noun 'facilities' (a facility serves a purpose; a part does not say so). What entered: in the summary, 'of the port' — the body's 'port facilities', and the summary's own 'within the port complex'; no fact. The judge states both; confirmed.
   - One thing the change brings that the record does not name: «حصے» is also the card's word for what may be closed («اس کے کچھ حصے بند ہوں»). The page now says in summary and body that the mosque is one of the port's «حصوں» and in the card that some «حصے» may be closed, where the English keeps 'facilities' and 'parts' apart. Nothing false; it sharpens the question the owner is already asked (source defect 1). In the body the word now stands twice in two senses («ان حصوں میں», «داستان کا ایک حصہ»), where the reader had faulted one root twice.
   - In place: «یہ مسجد بندرگاہ کے ان حصوں …» sets two nouns side by side with no comma (the same page writes «العقیر، الاحساء کی تجارتی شہ رگ» with one). For the blind read.

7. [note] uqair-mosque body, edit 7 — the opening reordered
   - Every element of the source stands: the Gulf coast (bare, ruling P5), east of Al-Ahsa, within the complex, the port by its name, 'historic' of the port («اس تاریخی بندرگاہ») and 'historic' of the mosque. Nothing entered. The mosque is described and not given the title («تاریخی» stands inside), as the source does.
   - Cost: «بندرگاہ» now 4 times in the first two sentences and 7 in the body (6 at stage 5), 2 in the summary (1 at stage 5); the subject carries the two possessives of the title plus an adjective.

8. [note] uqair-mosque body, edit 10 — «اپنے ہاں آنے والوں کو»
   - 'Its visitors', «لزائريه». The reflexive gives back the source's 'its', which stage 5 had dropped; «اپنے ہاں» is said of a person's place and here of a port that 'tells' a story — the source's own figure. Nothing entered or left. Quoted exactly in item N60.

9. [note] abubakr-mosque summary and body, edits 12 and 13 — «جو ایک علمی گھرانہ ہے», twice
   - The same clause closes the summary and, five sentences below it on the page, a sentence of the body. 'Scholarly' is kept; it is now a statement of its own in the present tense where the source has an attribute.
   - The change log says 'the source says scholarly of the family in both fields': the English does; the Arabic has «العلمية» in the summary only (the pack lists 'scholarly' as English-only in the body). An evaluative word may follow the English (ruling P19); the sentence of the log is not exact.
   - «خاندان … گھرانہ»: two words for one family in one sentence, the set phrase after the key. For the blind read.

10. [note] tahimiyah-e body, edit 1 — the name and the funeral prayers
   - 'In earlier times as Abu Al-Nu'ush Mosque, where funeral prayers were held before burial in the nearby cemetery'; the Arabic alone has «لأن». The Urdu joins the two with «اور» and asserts no cause; the Arabic's reason is not imported and is not denied. «یہیں» for 'where'.
   - In place: «یہیں» now stands twice in neighbouring sentences with two referents (in this village; in this mosque).

11. [note] tahimiyah-e body, edit 3 — «یہ جبل القارہ کے قریب ہے»
   - The referent of «یہ» is the mosque (subject of the sentence before it). The source names the mountain at this mention, so nothing entered.
   - What left: «پہاڑ», the page's only Urdu word for a mountain. The second half of observation 18 ('a reader who does not know that «جبل» means «پہاڑ» will not connect the two at all') is not answered by the edit and is not ruled on in the reader's entry; ruling P3a holds that «جبل» is an Urdu word and owes the stand-alone generic only to a page whose title carries it. The English says 'Mountain' at both mentions.

12. [note] hubaish and umzurainiq, edits 4 and 5
   - «میں تعمیر ہوئی»: 'dating to', «يعود إنشاؤه إلى». The Arabic's statement (its building goes back to that century); a shade firmer than the English. Counted by the judge; confirmed. The frame is b3's (2 times there).
   - «بنی ہے»: 'Built … from', «بُني … من». A state for an act; no fact moves.

13. [note] tahimiyah-e body, edit 2 — the list sentence
   - Equal to b3's by script. As b3's proof pass found on jalaniyah: the year, the list, the mosques being historic and the officiality stand; 'officially' passes from the registering to the list.

14. [note] hubaish — one second name without a key
   - «مسجد شیخ عبد العزیز العلجی» (hubaish body) is recorded inside the note of the person's entry; the three other second names of the batch each have an entry («التہیمیہ کی پہلی مسجد», «مسجد ابو النعوش», «مشرقی مسجد»). The person's key stands inside it byte for byte.

15. [note] the record numbers the edits from 0
   - 'change 0', 'changes 5 and 8', 'change 3', 'changes 11 and 12', 'b4's change 1', 'b4's change 3' and the `change_ref` values are indices into `changes` counted from 0; the notes speak of '13 edits'. Consistent throughout (checked: every reference points at the edit it describes); a reader who counts from 1 lands one edit off.

16. [note] pointers to b3's round 1
   - The change log says the list sentence was 'copied by script from b3's round-1 text', note 7 sends this pass to compare the fourteen copied entries 'against b3's round 1', and note 13 says they come from round 2. They equal round 2 (14 of 14); against round 1 only 1 of b3's 18 entries is equal. The sentence itself is the same in both rounds.

17. [note] calibration `N55` — the retired body sentence handed to the coordinator
   - The entry gives the whole Urdu sentence with its stop for `RETIRED_IN`. The five other languages of that table hold only the first clause ('The site is undergoing restoration work'); the matching Urdu clause is «اس مقام پر مرمت کا کام جاری ہے». The whole sentence would not catch that clause written alone. The coordinator's to choose.

18. [note] abubakr-mosque body — the relative clause after a plural
   - «… امام … الملا خاندان سے ہوتے رہے، جو ایک علمی گھرانہ ہے۔»: the clause follows the verb; its singular keeps it with the family. Grammatical; for the blind read.

19. [note] quotations in the record
   - Of 243 Urdu quotations in `calibration` (b4's own entries and the `b4` fields), the termbase notes, the notes, the change log, the defects, the reader rulings and the score reasons, 145 are in b4's text; of the rest, each is a candidate not taken, a banned or search form, a b3 or applied-page form named as such, or a stage-5 form named as withdrawn. Every candidate marked '(in the text)' in b4's own entries is in the text (N62's in the oblique, as it says). None is given as the text's and missing from it.

## The calibration, entry by entry

P4, BRAND, N7: untouched, each with its reason. P22: ruled A; text, ruling and the stage-checker half of the guard agree; the build half: finding 3. N30, N36, N40, N41, N43, N44, N46: copied from b3's round 2, each `b4` field true of the text (the three area lines; the bracket; the clause; the value; the title; the oblique name; the sentence). N37, N38, N39, N45, N47, N48: not met in b4, as their `b4` fields say (no ribat, no «بیت» name, no «(یعنی », no quarter inside a district, no «نخلستان», no governor). N42: no niche named beside the arches. N55: label and value as quoted; finding 17. N56: title as quoted; the body's description as quoted. N57: «شیخ ابو بکر» alone in the citation form, «بن ابی بکر» inside the title. N58: both frames in the text; finding 2. N59: «نحو» twice, each beside another subject. N60: both phrases as quoted; «زائرین» in five card cells only. N61: hubaish summary bare, umzurainiq summary with its generic, as their sources. N62: «مشرقی صوبے کی مساجد». N63: «جنوبی الرفعہ» 3 times, with «محلہ» in body and area. N64: the two commas stand; finding 5. All five open items of the termbase are covered (P4, P22, BRAND, N7, N30). No id of this file clashes with an id of the termbase's 66 rulings.

## Not verified

- No reader has read any of the 13 edits; this pass is a proof, not a blind read. Findings 1 and 2 rest on grammar and on the earlier reader's own words, not on a new reading.
- The reference-site counts in P22 and N58 (6654 against 104; 29983 against 2273; 39 against 2) and the judge's ten phrase counts were not re-run. No dictionary page was read in this pass for «گھرانہ», «حصہ» or «ورثہ»; that «حصہ» is said of a share of an estate is this pass's reading.
- That the stage checker reads the guard of P22 was taken from the judge's own break test (`s7-verify.out.txt`), not re-run: the tools take no path to a broken copy.
- The Urdu patterns of build checks C29, C34 and C41 do not exist yet (the tables have no `ur`); the text was compared with the approved pages and with what N55 quotes, not with a guard.
- b3's round 2 is itself unproofed; the comparison shows equality with it, not that it is right.
- The source defects the judge lists were not re-examined: they are the owner's.
