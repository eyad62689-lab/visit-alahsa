RESULT: must-fix=0 should-fix=5 note=6

# Proof pass on the round-1 text — batch b2 (5 attraction pages, 45 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No existing file was changed.
Text read: `pages[].fields` of `stages/07-judge.round1.json` (file sha256 `af4bc435a089e419c5f045fcd403b1b174b13090cd47f791fdd23a83fd17d4bf`, the hash `blind/blind-input.on-r1.json` records; 45 strings, 5762 code points, 62 distinct). It differs from `05-proofreader.json` in 10 strings, and the 30 entries of the change log replay on the stage-5 text to exactly this text (30 applied, 0 not found, 0 ambiguous, 0 unlogged differences). Each of the 40 rendered strings stands on its page in `blind/on-r1/`, where each changed string was read in its place.
Judged by the role file as amended by three sets of rulings: b0-ui round 3 (locked), b1 round 1 (`calibration`, 32 entries) and this file's own `calibration` (30 entries).
Scans are this pass's own (`s5p-scan.mjs`, `s5p-tbnotes.mjs`, `s5p-b1r2.mjs`, the dump helpers `s5p-dump*.mjs`, `s5p-selfcheck.mjs`: 19 of 19 probes caught on copies of the text broken in memory, and `s5p-verify-report.mjs`: each of the 324 forms quoted in this report was looked up in the text it is quoted from; all in the batch folder, none imports anything from the tools). The stage checker was not run, because it rewrites its check file; its last result was read: 0 mandated, 0 extra, 0 ruling findings, 3 notes (the three area lines of item N30).

Summary. Nothing in the 45 strings breaks a letterform, a name, an agreement, a mark, a figure or a ruled form: every one of the eleven items passes on the text. Two things in the text should be changed and both come from this round's own edits: on two pages the fort's name now runs straight into a town's name (finding 1), and the trade sentence of uqair-castle now says the trade goes on today (finding 2). Three more should-fix items are in calibration entries that would be written to the repository as they stand (findings 3, 4, 5). The guarded statements are all at their source's strength: khuzam's status row is stage 5's byte for byte and nothing bridges it to the 2017 sentence; uqair-castle's row has no "only"; jabri-mosque names no visiting time and computes no century; the pair 1203 with 1788 stands in both fields of baiah; the port's "first" is tied to the east coast in the very words of the sister page.
The sister batch: a round-2 file for b1 appeared at 17:46 while this pass ran. At 18:14 it was still the empty frame (no decision, no scores, no calibration entry, no change; its text is round 1's), so no ruling has moved in it. Its judge's working drafts do move three forms this batch applied (the quotation marks on the property's name, the visiting row, the Arabic semicolon): finding 7.

## The eleven items

- item 1, حروف (letterforms): PASS. Forbidden class [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none, in 5762 code points. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. Every name byte-identical to its key in this file's `termbase_final`, in b1's (round 1), in b0-ui's (round 3) or in the repository termbase; counts under "Names". The five titles are keys of this file's list. No retired key («محیرس محل» 0, «خزام محل» 0, «صاہود محل» 0, «ورثہ کمیشن» 0); «محل» stands only inside «محلہ» (9 times) and never as a word; no «الہفوف», no «الاحسا» without its hamza, no joined «عبدال…» («عبد» is followed by a space 7 of 7 times), no name without its article, no Latin letter. «سوق القیصریہ نامی بازار» is the form ruling P3c (2) gives; item 2 of the role file still forbids it by name (b1's proof pass, its finding 7 a).
- item 3, قواعد (grammar): PASS. Every agreement, case and ergative the edits touch was read and is right; they are listed under "Agreement after the edits". Finding 1 is word order at a seam and finding 2 is a tense that says more than the source; neither is an error of agreement.
- item 4, خطاب (address): PASS. No «آپ» and no pronoun of address in the 45 strings; the two requests of the visiting row are honorific subjunctives («پہن کر آئیں», «خیال رکھیں»). «تو» three times, each the particle after a clause («میلے لگتے ہیں تو», «الاحساء پہنچے تو», «قائم ہوئی تو»).
- item 5, عنوانات (headings): PASS. 5 titles, 5 kickers and 10 labels end without a mark and carry no bracket; the two renamed titles are «قصر محیرس» and «قصر خزام», two words each, no gloss.
- item 6, termbase compliance: FINDING (finding 10, a note; in the notes of three entries, not in the text). The 45 strings comply: keys, genders, plurals; the one new common noun, «سیاح», stands in its oblique plural.
- item 7, رموز (punctuation): PASS. «۔» 55, «،» 51, «؛» 5, colon 3 (two in the text, one inside «11:30»), middle dot 1 (between two spaces), U+201C / U+201D 3 pairs, round brackets 10 pairs, U+2013 once, one ASCII comma (inside «1,600»). No ASCII stop, no straight quote, no «», no «؟». No space before a mark, no mark left beside another by a split or merged sentence, no mark without its space after it, no double, leading or trailing space, no U+00A0, no line break. 10 strings end with «۔» (5 summaries, 5 bodies); 35 end with no mark (titles, kickers, labels, card values: ruling P26). Item 7 of the role file still writes U+2013 for numeric ranges; the text follows the ruling that amended it (b1's N13).
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS. Latin digits only; in the 8 fields that carry figures every figure of the Urdu stands in the English or the Arabic and every figure of the English is in the Urdu. Clock times, weekdays, years, centuries, the decade and the range are listed cell by cell below. No price in the batch.
- item 9, انگریزیت (loans, banned lists): PASS. Loans in Urdu letters: «فیس» (its entry cites P16), the unit «میٹر», the month «مئی», the name «یونیسکو». None of the banned lists; no «موجود ہے / ہیں» (the one «موجود» is inside the label «موجودہ حالت»); no verbal-noun passive chain.
- item 10, گلوس (glossing): PASS, by ruling P3c. One «(یعنی …)» in the batch: «بیت البیعہ (یعنی بیعت کا گھر)», once, straight after the page's own name at its first body mention. No «(عربی میں». «قصر محیرس» and «قصر خزام» bare, with «قلعہ» in the summary and in the second body sentence, never beside the name. «قصر ابراہیم» bare, twice. The passing «سوق القیصریہ» is followed by «نامی بازار». No entry of this batch has a gloss field, so P3b binds nothing here; «“زمام”» is a cited word in marks with the source's own explanation after it. The other 9 brackets are 7 year pairs, the full date and the lifespan.
- item 11, ساخت (structure): PASS. 45 leaves, each with its English or Arabic in the pack (9, 7, 9, 9, 11 by page), in pack order; `practical` items carry `i`, label and value only, no source key; the two area lines that have a larger bare place open with it («الاحساء،», «ہفوف،»), the other three keep the source's order (item N30, open); no card value ends with «۔»; no Markdown, link or line break in a body.

## Findings

1. [should-fix] muhairis body and khuzam body — the fort's name runs into the town's name
   - The Urdu: «قصر محیرس المبرز کے شمال میں واقع ہے۔» and «قصر خزام ہفوف کے مغرب میں محلہ المزروعیہ کے کنارے واقع ہے۔»
   - What is wrong: edits 2 and 7 took out the bracket that stood between the two names («محیرس محل (عربی میں قصر محیرس) المبرز …»). The name now ends in an opaque Arabic word and the next word is another Arabic name, with nothing between. The sister batch has the twin sentence, «قصر صاہود المبرز کے قلب میں کھڑا ہے», and its second blind reader wrote of it: "Three unfamiliar words in a row with nothing between them: I first read «قصر صاہود المبرز» as one long name and then found «کھڑا ہے» with no subject left for it" (`b1/stages/06-blind-reader.on-r1.md`, observation 39, moderate; the same of «مدرسہ امیریہ الاحساء», observation 49). On muhairis the second name is the very one of that sentence. This batch's first reader never met the bare seam: the sentence he wrote for muhairis (his observation 10) still had the bracket between the names, so "the reader's own first sentence" of edit 3 is his with the separator gone.
   - Rule: Urdu readability at a seam opened by this round's own edit (the round's reason for this pass); the batch's consistency with the twin sentence.
   - Minimal correction, every word kept: the place first, as that reader wrote for the twin — «المبرز کے شمال میں قصر محیرس واقع ہے۔» and «ہفوف کے مغرب میں محلہ المزروعیہ کے کنارے قصر خزام واقع ہے۔». Unread. The other three openings do not have the seam: «قلعہ العقیر خلیج کے ساحل پر …» and «مسجد الجبری محلہ الکوت میں …» are followed by an Urdu common noun and stood so at stage 5; «بیت البیعہ (یعنی بیعت کا گھر) ہفوف …» has its bracket.

2. [should-fix] uqair-castle body — «ہوتی آئی ہے» brings the trade up to today
   - The Urdu: «یہاں سے ملنے والے آثار قدیمہ گواہی دیتے ہیں کہ اس جگہ تجارت نہایت قدیم زمانے سے ہوتی آئی ہے۔»
   - What is wrong: «ہوتی آئی ہے» is the perfect of an action that continues: trade has gone on here from remote times until now. The sources say how far back it reaches, not that it goes on: 'trade stretching back to remote antiquity', «نشاط تجاري يمتد إلى عصور موغلة في القدم». Three sentences on, the same page says that the port's role lessened when Dammam's port was founded and that its buildings were left as witnesses of an era; and the sentence before this one already has the port in the present («… پہلی سمندری بندرگاہ ہے», the owner-ruled wording; on the sister page the same line led b1's second reader to take Al-Uqair for a working port: his observation 20). The wording is this batch's first reader's own (his observation 47), written without sight of a source; the judge logged the shift under accuracy and kept it.
   - Rule: accuracy against both sources (RUNBOOK, items 4 and 5: nothing the source does not carry); the page's own coherence.
   - Minimal correction: one word, the reader's construction kept — «… اس جگہ تجارت نہایت قدیم زمانے سے ہوتی آئی تھی۔». Unread.

3. [should-fix] calibration `N16-quotation-marks-on-the-property-name`, the rider — its test does not fit its own second example
   - The Urdu: baiah body «آثار قدیمہ اور عجائب گھروں کے سعودی ادارے نے 2005 سے 2007 تک اس کی مرمت کی۔»; jabri-mosque body «… تاریخی مساجد کی دیکھ بھال کے منصوبے کے تحت ہوئی».
   - What is wrong: the rider leaves unmarked "a programme or a body that the English source DESCRIBES rather than names (lower case, no title)" and gives both sentences as cases. The programme fits ('the historic mosques care programme'). The body does not: the English writes 'the Saudi Agency for Antiquities and Museums' in title case, the pack lists it among the names of the page, and this file's own entry gives it as a name (`en`, kind institution); the same entry's note then says it is unmarked because "the source describes" it. The file's `notes` give the reason that does fit ("a body that acts"). The text is right by the round's practice: b1's «ادارہ ورثہ نے», a body the English names, is unmarked, and b1's N16 (1) marks a property and a programme, never a body. The rider as worded would have the next named body set in marks.
   - Rule: a ruling and its example are to agree; the entry goes to the repository.
   - Minimal correction: in the rider and in the note of «آثار قدیمہ اور عجائب گھروں کا سعودی ادارہ»: "a programme the English only describes (lower case), and a body that acts in the sentence whatever its case in the English (as b1's «ادارہ ورثہ نے»), are not set in quotation marks". If b1's round 2 withdraws the marks from programme names, as its judge's draft does (finding 7), the rider has nothing left to except.
   - Effect on the 45 strings: none.

4. [should-fix] calibration `P10` — the ruling opens with "B." and the entry's own candidates make B the form that is not in the text
   - The Urdu: jabri-mosque body «اس میں تقریباً 1,600 نمازیوں کی گنجائش ہے۔»
   - What is wrong: the entry lists A «1,600» ("in the text") and B «1600» ("as the Arabic writes it"). Its ruling is b0-ui's text repeated, which begins "B. Counts in /ur/ text are written in the Urdu scale …" (there B was the lakh scale), and ends with b1's sentence "a figure below one lakh is written in digits, grouped as the English source groups it («10,000», «1,600»)", which is A of this entry. Read against its own candidates the entry rules B and describes A. It is the clash b1's proof pass reported in b1's entry (its finding 2), carried over with the text.
   - Rule: internal consistency of an entry that goes to the repository.
   - Minimal correction: keep b0-ui's clauses word for word, since the tools parse them, and name the letters: "As b0-ui ruled (its candidate B): …" and "For a figure below one lakh: A."
   - Effect on the 45 strings: none.

5. [should-fix] calibration `N24-measure-two-dimensions` and baiah body — the form of an area, ruled one way in b1 and restated another way here
   - The Urdu: baiah body «اس کا رقبہ 705 مربع میٹر ہے۔»; b1's sahood body «تقریباً 10,000 مربع میٹر پر پھیلا ایک بہت بڑا قلعہ».
   - What is wrong: b1's N24, which binds this batch, reads "an area is «N مربع میٹر پر پھیلا»". The stage-5 text of baiah had exactly that («705 مربع میٹر پر پھیلا یہ گھر»); edit 16 took it out for the reader's two sentences, and this file's N24 gives the clause as "an area is «N مربع میٹر» (baiah: «اس کا رقبہ 705 مربع میٹر ہے»)" without saying that it departs. So a ruled form stands on one page of the round and not on the other, and the two files give two clauses for one thing.
   - What the sources say: sahood's English is 'spreading over some 10,000 square metres' and baiah's is 'a 705-square-metre residence' (Arabic «على مساحة 705 أمتار مربعة»). «پر پھیلا» is sahood's own verb; baiah's sentence says what its sources say, and it is the reader's own.
   - Rule: a ruled form applied on one page and not on another; a restatement that contradicts the shared ruling it restates.
   - Minimal correction: none in the text. One sentence in N24: what is ruled for an area is the unit after the figure («N مربع میٹر»), and the frame follows the page's own source; recorded for b1, whose clause needs the same sentence.

6. [note] khuzam body — the measure: what the sentence says and what it does not
   - The Urdu: «اس کی مستطیل فصیل ایک طرف تقریباً 70 میٹر اور دوسری طرف تقریباً 80 میٹر لمبی ہے»
   - Read against the sources ('roughly 70 by 80 metres', «نحو 70×80 متراً»): neither source says which figure belongs to which side, and the Urdu does not either: no direction, no front or back, no «لمبائی» against «چوڑائی». The grammar is right («فصیل … لمبی ہے», feminine, one verb for both halves).
   - Three things it carries that the sources do not: (a) the word of length, «لمبی», said of both figures. No breadth is named, so neither figure is made the length against the other and the fence holds; but the letter of the shared ruling is "words that name neither length nor breadth", and b1's model sentence has no such word. (b) 'Roughly' twice, as the judge states. (c) «ایک طرف … دوسری طرف» is also how Urdu says 'on one side … on the opposite side', and the reference sentence the entry quotes for the frame is of that kind («… اس کے بالمقابل دوسری دیوار 128 میٹر لمبی ہے»: two facing walls of unequal length). «مستطیل» in the same clause closes that reading, since the facing sides of a rectangle are equal.
   - Rule: none broken; the letter of N24 against its purpose is the judge's to weigh.
   - Minimal correction: none owed. If the letter is held, one word less: «… ایک طرف تقریباً 70 میٹر اور دوسری طرف تقریباً 80 میٹر ہے».

7. [note] forms shared with b1 that its second blind reader faulted and that its judge's draft for round 2 moves
   - State of the files: `b1/stages/07-judge.round2.json` was written at 17:46 and at 18:14 is the empty frame: no decision, no score, 0 calibration entries, 0 changes, 0 termbase entries, and its text equal to round 1's in all 71 leaves. Nothing has moved in it. What follows is read from that judge's working files (`b1/s7-r2-changes.json`, `b1/s7-r2-after.txt`, `b1/s7-r2-rulings.json`, last written 18:06 and 18:07): drafts, not a stage file, and they may still change.
   - (a) The property's name in quotation marks (b1's N16; here khuzam summary and body). The Urdu: «… یونیسکو کی فہرست میں شامل مقام “الاحساء کا نخلستان” کا ایک حصہ ہے۔» and «آج یہ “الاحساء کا نخلستان” کے بارہ حصوں میں سے ایک ہے۔», equal to sahood's two frames. b1's second reader: "because the name is frozen inside quotation marks, I get «کا نخلستان کا» and «کا نخلستان کے», which the ear rejects; I read both twice" (observation 40, moderate). This batch's first reader wrote the marked form himself in his remedy (his observation 21). The draft withdraws the marks and «مقام», writes «… شامل الاحساء کے نخلستان کا ایک حصہ ہے» and «آج یہ الاحساء کے نخلستان کے بارہ حصوں …», and says its new guard "bans the marked form and is machine-read". If round 2 is written so, khuzam's two sentences move with sahood's, and the stage checker, which reads b1's guards for this batch, reports them until they do.
   - (b) The visiting row (jabri-mosque practical[1].value, equal to jawatha-mosque's today). b1's second reader: "for a mosque we usually speak of its «احترام» or «تقدس»" (observation 36, minor), and the mark of (c). The draft: «زائرین کے لیے کھلی ہے۔ ساتر لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں». Two differences from this batch's row: «؛» becomes «۔», «کی حرمت» becomes «کے تقدس».
   - (c) U+061B. Five in this batch: khuzam body («… لے کر چلتے ہیں؛ یہ نام …»), baiah body («… کھلتے ہیں؛ یہیں …»), jabri-mosque body twice («… واقع ہے؛ الکوت …», «… مرمت ہوئی؛ آخری مرمت …»), the visiting row. b1's second reader: "hardly used in ordinary Urdu writing; each time I paused to work out whether a new sentence had begun" (observation 10, minor). This batch's first reader wrote the mark himself in two of his remedies (observations 21 and 52). The draft replaces each of b1's with a full stop under a new item it calls N33.
   - (d) «سوق القیصریہ نامی بازار» (baiah body, as on ameeriah). b1's second reader: it "has the ring of 'a certain market by the name of …', as if the place were obscure" (observation 47, minor). The draft keeps the form.
   - Not moved by the draft: the titles in «قصر X» (N14), the hours cell with its « · » (N8), «پرانے ہفوف», the port line, «داخلہ مفت». Adopted from this file by the draft: 'in the summary and the opening of the body' for the place of «قلعہ» (finding 9 a).
   - Rule: none broken by the text under the rulings in force. These are the dependencies the judge file itself names (N16, the visiting row).
   - Minimal correction: none now; the strings of (a), (b) and (c) are the ones to watch when b1's round 2 is written.

8. [note] forms this round moved here that b1 still has the other way
   - (a) 'At the heart of': baiah body «ہفوف کے وسط میں» (edit 13: one Arabic word, one Urdu word). b1 has «ہفوف کے قلب میں» on qasr-ibrahim (its Arabic body says «في قلب الهفوف») and «المبرز کے قلب میں» in the summary and the body of sahood (its Arabic says «تتوسط» and «يتوسط»), beside «… کے وسط میں» in both area lines. By this round's reasoning sahood's two would follow; b1's second reader noticed the switch on both pages (observation 12, minor).
   - (b) The opening of a fort page: here «… واقع ہے۔ یہ … قلعہ ہے۔» on three pages (item N31). sahood has «… کھڑا ہے: … ایک بہت بڑا قلعہ۔», and its judge's draft keeps the verb and the colon.
   - (c) «پرانے ہفوف» now stands for 'historic Hofuf' here (edit 26) and for 'old Hofuf' on ameeriah: two English phrases, one Urdu.
   - Rule: the round's consistency; nothing is owed in this batch.
   - Minimal correction: none here. For b1's judge.

9. [note] calibration — four entries in which a part disagrees with the text, with another line of the file or with the ruling it adopts
   - (a) `N14`: the part headed "NARROW RULING" widens the letter of b1's N14 and P3c (3) ("in its summary and in its first body sentence") to "the first OR the second sentence of the body". On khuzam and muhairis «قلعہ» stands in the second sentence, so by b1's letter as written the two bodies are out, and by this file's they are in. The file says so and records it for b1; b1's draft adopts it ('the opening of the body'). Until that is written the two files disagree.
   - (b) `N29`: the ruling says the people who come to a page that is not a mosque "are «سیاح»" and leaves b1's «آنے والے کو» untouched as "neither word"; the guard says the word for visitors on such a page "is the interface's". By the guard al-uqair's sentence is a finding, by the ruling it is not. In this batch: «سیاحوں» once (khuzam body), «زائرین» once (the visiting row), no other word for a visitor.
   - (c) `N12`: the evidence says "seven pairs on four pages". The seven pairs stand on five pages (muhairis 1, khuzam 1, baiah 2, uqair-castle 1, jabri-mosque 2), as the entry's own `binds` lists them.
   - (d) `N25`: "the Arabic's construction … with the same content". The uqair-castle accuracy line of the same file takes points because "the card says 'can be seen' where the sources say a visit". The row has no 'only' and no 'open'; what it lacks is the visit.
   - Also: `strings_affected` follows two conventions in one list (P5, N21 and N23 name leaves this round did not change; N7, N10, N12, N17, N27 and N28 leave the list empty for unchanged leaves).
   - Rule: an entry agrees with itself and with the text it describes.
   - Minimal correction: wording only: (b) "«زائرین» does not stand off a mosque page; where a noun for visitors is written there, it is «سیاح»"; (c) "five pages"; (d) "said as seeing, not as a visit".

10. [note] `termbase_final` and one breakdown line — statements the text does not bear out
   - (a) «قصر محیرس», «قصر خزام», «قلعہ العقیر»: each note says "masculine, exercised" and quotes «… واقع ہے» first. «واقع» does not inflect and «ہے» shows no gender; since edits 3, 8 and 21 replaced «کھڑا ہے», the first body sentence of the three fort pages no longer exercises the gender of the name. What does: «یہ … بنا ہے» and «کام دیتا تھا» (muhairis), «ایک کڑی تھا» (khuzam), «نگہبانی کرتا ایک تاریخی قلعہ» and the row «دیکھا جا سکتا ہے» (uqair-castle). In «قصر خزام» the quoted «یہ قلعہ … تعمیر کیا» agrees with «قلعہ». The entry «قلعہ العقیر» still quotes «قلعہ العقیر … کھڑا ہے» as a form of the text.
   - (b) baiah, nativeness: "the body is one block of twenty sentences". It has 14 stops (13 at stage 5), one «؛» and one colon.
   - Rule: the termbase binds every later stage, and these notes are what the apply step writes into it.
   - Minimal correction: (a) quote the forms that inflect and drop «… واقع ہے» and «… کھڑا ہے» from the three lists; (b) "fourteen".
   - Effect on the text: none.

11. [note] the seams of the split and reworded sentences — words that now stand twice
   - Marks: no mark was left behind by a split or a merge (item 7). What is left at the seams is repetition; none of it breaks a rule, and it is listed because this pass was asked for it.
   - (a) baiah body: «… کھلتے ہیں؛ یہیں مہمانوں کے بیٹھنے کی جگہیں ہیں، اور یہیں لباس اور ذاتی استعمال کی چیزیں نمائش کے لیے رکھی ہیں۔» — «یہیں» twice in one sentence (edit 19), four times in the body and once in the summary.
   - (b) khuzam body: «تقریباً» twice in one clause (edit 9; stated by the judge).
   - (c) uqair-castle body: «پرانے زمانے میں» closes one sentence and «نہایت قدیم زمانے سے» stands in the next; the singular is new with edit 22 (stage 5 had «زمانوں»).
   - (d) jabri-mosque body: «الکوت پرانے ہفوف کا قدیم ترین محلہ ہے» — 'old' and 'oldest' in one phrase (edit 26), with «قدیم ترین» again in the next sentence; and sentences 4 and 5 both open with «یہ» since «یوں» went (edit 27).
   - (e) baiah body: «سوق القیصریہ نامی بازار اور قصر ابراہیم ہیں» — the plural verb is right and two places are said. With the generic now next to «اور قصر», the words «بازار اور قصر» can be heard as a pair of common nouns until «ابراہیم» closes the name; the other order has the fault the rider names. For the blind read, as the judge asks.
   - Rule: none.
   - Minimal correction: none proposed.

## Code points

- Forbidden letterforms [U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625 U+06C3]: none.
- Non-Latin digits (U+0660–0669, U+06F0–06F9), U+00A0, tatweel, zero-width and bidi controls, U+0650, U+06C0, U+06C2, U+06D5, U+0624, Latin letters, straight quotes, guillemets, hyphen, em dash: none.
- 62 distinct code points: the space; ( ) , : and the digits 0 to 9; U+00B7; U+060C, U+061B; U+0621, U+0622, U+0626, 25 plain letters from U+0627 to U+0648, U+064B; U+0679, U+067E, U+0686, U+0691, U+06A9, U+06AF, U+06BA, U+06BE, U+06C1, U+06CC, U+06D2, U+06D4; U+2013, U+201C, U+201D. One is new since stage 5, U+00B7 (the hours cell of baiah); none is gone.
- Read and right: U+064B five times, all in «تقریباً»; U+0621 17 times, all in «الاحساء»; U+0626 28 and U+0622 15, each in an Urdu word; U+002C once, between two digits of «1,600»; U+2013 once, between the two years of «(1853–1921)».
- U+06BE 60 times, every time after an aspirable consonant (ت 16, ک 16, گ 11, چ 6, ب 5, ٹ 3, ج 3), never after U+0691 and never after another letter; 40 words, each read.
- U+06C1 directly after an aspirable consonant: 20 words, each read, all plain he (پہلی پہرے پہلے چہل راستہ زیادہ موجودہ وجہ رقبہ پہنچے کہانی جگہیں ہفتہ نگہبانی کہ جگہ معاہدہ دہائی پہچان پہن).
- Words the edits brought in, each read: میلے لگتے دوسری لمبی شکل سیاحوں نامی رقبہ آئی کم دیکھا جا سکتا درس و برتا پہن آئیں خیال رکھیں. No pronoun of the class of open item P22.

## The 30 edits against the English and the Arabic

What entered and what left, edit by edit; "nothing" means form only.
- edits 1, 2, 6, 7 (the two titles and the name in the two bodies): «محل» is now «قصر»; the bracket that left gave a second form of the name. The seam it opens: finding 1.
- edits 3, 8, 21 («واقع ہے»): left, 'stands' («يقف», «يقوم», «تقوم»), now 'is situated' (logged). Edit 3 also gives the apposition a sentence and with it a present tense the apposition did not have: «یہ نگرانی اور پہرے کا ایک چھوٹا سا قلعہ ہے۔». Nothing entered.
- edit 4 («ایک دو منزلہ گول برج ہے»): left, 'crowned by' / «يعلوه» (logged); no height is said now. Entered, «ایک». The two words «ایک دو» are also the idiom for 'one or two'; let pass here because the wording is the first reader's own (his observation 13). See the cross-check at the end.
- edit 5 («میلے لگتے ہیں»): left, 'seasons' / «مواسم», the one noun the two sources share ('festival' is the English's alone; logged). «میلے» carries 'festival'; no festival is named and no date given.
- edit 9 (the measure): finding 6.
- edit 10 («مخروطی شکل کے ہیں»): nothing.
- edit 11 («سیاحوں»): 'visitors' / «للزوار» is now the narrower 'tourists' (logged; item N29). The sentence is otherwise stage 5's: flat, its own sentence, nothing before the next.
- edit 12 (the two sentences on the listing): left, «مقام» for 'site' in the body and the relative clause; the inscription has its own sentence with «یہ نخلستان» as subject, and 2018 stays with the property. No 'World Heritage' is added, as this page's sources have none. Logged.
- edit 13 («وسط»): 'heart' is now the Arabic's 'middle' (logged).
- edit 14 («بھی»): entered, 'also', in neither source. Checked against ruling P23: form only (the page itself has both names), logged as a source defect with the literal wording on record, the blind read owed.
- edit 15 (the order of the two names): the order of both sources is reversed (logged); the souq's bracket left, «نامی بازار» in its place; 'steps away' and both places stand.
- edit 16 (the area in its own sentence): the same facts (705, the pair 1203 with 1788, the judge and his name). Entered, a present tense for the area. Left, the tie between the area and the building of the house ('a 705-square-metre residence built …', «بناها … على مساحة»), and b1's frame for an area (finding 5). «بعد میں» in the next sentence now follows a sentence in the present.
- edit 17 («2005 سے 2007 تک»): nothing.
- edit 18 («جس کی طرف … کھلتے ہیں»): 'overlooked by' / «تطل عليها» is 'open towards'; nothing entered.
- edit 19 (the second «یہیں»): nothing; both sources put the seats and the displays on the ground floor.
- edit 20 (the middle dot): nothing.
- edit 22 (the trade sentence): finding 2.
- edit 23 («اسی بندرگاہ پر»): left, 'grounds' / «أرض» (logged); the emphasis is carried by «اسی».
- edit 24 («کردار کم ہو گیا»): left, the image of fading; nothing entered. 'Lessened' is nearer to the Arabic's «تراجع» than 'faded' is. The commoner Urdu collocation takes another noun («اہمیت»); the noun kept is the sources'.
- edit 25 (the status row): left, 'open' / 'available' and the visit; entered, 'can be seen'. No 'only'. See "Guarded claims".
- edit 26 («پرانے ہفوف»): 'historic' is 'old' (logged).
- edit 27 («درس و تدریس اور علم»): left, «یوں» (the Arabic's «فـ»; the English has 'serving as'); entered, «درس» inside a set compound for 'teaching'; 'scholarship' stays as «علم»; the Arabic's fatwa role is still not imported.
- edit 28 (the materials clause): 'with original materials' / «بالمواد الأصلية» is now a clause of its own with a passive, «اور اس میں اصل تعمیراتی مواد برتا گیا»; no «ہی»; the same content, and as open as the sources on whether the very materials are meant. («تعمیراتی» is older than this round.)
- edit 29 («ایک آباد مسجد»): left, 'living' (logged).
- edit 30 (the visiting row): 'with … and respect' is now two requests; left, the noun 'respect'; the three elements in the source's order; nothing on faith, nothing on a time.

## Rulings checked cell by cell

- Hours, muhairis practical[0].value: «باغ اور چہل قدمی کا راستہ: روزانہ شام 4 بجے سے رات 11:30 بجے تک». P13 and N23 (the colon inside the figure, no zero, the half hour with the part of its hour), N10 (4 pm «شام», 11 at night «رات»); the colon after the subject of the cell is the one N31 keeps. Right.
- Hours, baiah practical[0].value: «اتوار تا جمعرات صبح 8 بجے سے رات 8 بجے تک · جمعہ اور ہفتہ شام 4 بجے سے رات 8 بجے تک». N7 («تا» for the range, two days joined by «اور»), N8 (the middle dot between two spaces, no U+061B), N10 (8 pm «رات»). Right, and equal to ameeriah's. (The wording of N7's guard, which a cell with «جمعہ اور ہفتہ» would fail if read to the letter, is b1's proof finding 4.)
- uqair-castle practical[0].value «باہر سے دیکھا جا سکتا ہے» under the label «اوقات»: a status and no hours, as the source; none supplied. khuzam practical[0].value: a status; jabri-mosque: no hours row, none written.
- The 6 clock times: each «بجے» preceded by a figure and a part of the day; no hour of 13 or more, no «:00», no dash between two times.
- Year pairs, 7, all «N ہجری (N عیسوی)»: muhairis body 1208 / 1794; khuzam body 1220 / 1805; baiah summary and body 1203 / 1788; uqair-castle body 1341 / 1922; jabri-mosque body 850 / 1446 (after «تقریباً») and 1437 / 2016. Right by N12.
- The full date, baiah body: «28 جمادی الاول 1331 ہجری (4 مئی 1913 عیسوی) کو». Right by N19: the same order as the pairs, day, month and year on both sides, «کو» after the bracket.
- Years the source gives in one calendar, bare: «1913 میں» (baiah summary), «2017 میں» and «2018 میں» (khuzam body). Right by N12.
- The range: «2005 سے 2007 تک» (baiah body); the en dash only in «(1853–1921)». Right by N13 and N22.
- Centuries: «پندرہویں صدی عیسوی سے» (jabri-mosque summary), «بیسویں صدی عیسوی کے وسط میں» (uqair-castle body). The calendar word both times (N11, N21). The decade: «1990 کی دہائی کے اواخر میں» (N20).
- Figures: «1,600» grouped as the English (P10); «705 مربع میٹر»; «70 میٹر», «80 میٹر» with the unit after each; 'twenty metres', 'six', 'twelve', 'two-storey', 'twentieth' and 'fifteenth' in words as the English has them.
- Brackets, 10 pairs: the 7 pairs of years, the full date, «(یعنی بیعت کا گھر)», «(1853–1921)». Quotation marks, 3 pairs, all on khuzam: «“الاحساء کا نخلستان”» in the summary (followed by « کا») and in the body (followed by « کے»), in the direct case with the postposition after the closing mark and no demonstrative before it (N16); «“زمام”». The programme and the Agency unmarked and inflected (the rider; finding 3).
- Names with «عبد»: two words, 7 of 7 (muhairis body 1, khuzam body 1, baiah summary 1, baiah body 4). «خلیج» bare, twice (uqair-castle body and area). Family names with their article: «الملا» 5 times, «الجبری» 3 times.
- Visitors: «سیاحوں» on khuzam; «زائرین» only in the visiting row; label «زیارت» on the mosque page only; «سیر» nowhere.
- Location: «واقع ہے» on four pages (muhairis, khuzam, uqair-castle, jabri-mosque), «… میں ہے» on baiah; «کھڑا» nowhere; no apposition after a colon. The two colons outside a clock time are the two N31 keeps.
- Status phrases: khuzam «فی الحال بند ہے، …»; uqair-castle «باہر سے دیکھا جا سکتا ہے»; jabri-mosque «آباد» three times (summary, body, card) and «زائرین کے لیے کھلی ہے»; baiah «اب یہ ایک عجائب گھر ہے»; muhairis none, as its source.
- The same thing by one word across the five pages: fort «قلعہ», tower «برج», the wall of an enclosure «فصیل», courtyard «صحن», restored «مرمت», quarter «محلہ», museum «عجائب گھر», Qasr Ibrahim «قصر ابراہیم», free entry «داخلہ مفت», the labels «اوقات» and «فیس», the kicker «تاریخی مقام» on four pages. 'Park' and 'garden' on muhairis are two source nouns and two Urdu words.

## Agreement after the edits

- The renamed names. «قصر محیرس» and «قصر خزام» are masculine, as «محیرس محل» and «خزام محل» were: the gender of the title did not change with its word. Each stands on its own page only (title once, body once) and on no other page. What agrees with them: muhairis «اسے … تعمیر کروایا», «یہ … بنا ہے», «اس کا نقشہ … لمبا … چوڑا», «یہ … کام دیتا تھا»; khuzam «یہ قلعہ … تعمیر کیا», «یہ … ایک کڑی تھا», «یہ قلعہ … مرکز بنا», «اسے … کھول دیا گیا». All right.
- muhairis: «یہ … ایک چھوٹا سا قلعہ ہے»; «ایک دو منزلہ گول برج ہے»; «میلے لگتے ہیں» masculine plural; «تقریبات ہوتی ہیں» feminine plural.
- khuzam: «فصیل … لمبی ہے» feminine; «چھ برج … کرتے ہیں، جن میں سے زیادہ تر مخروطی شکل کے ہیں» masculine plural («کے» with «برج»); «سیاحوں کے لیے»; «یہ نخلستان … درج ہوا» masculine; «“الاحساء کا نخلستان” کے بارہ حصوں میں سے ایک ہے».
- baiah: «سوق القیصریہ نامی بازار اور قصر ابراہیم ہیں» plural for two places; «یہ گھر … نے تعمیر کیا»; «اس کا رقبہ … ہے»; «… ادارے نے 2005 سے 2007 تک اس کی مرمت کی»; «جس کی طرف … جھروکے کھلتے ہیں»; «جگہیں ہیں»; «چیزیں … رکھی ہیں».
- uqair-castle: «تجارت … ہوتی آئی ہے» feminine; «دستخط ہوئے»; «بندرگاہ قائم ہوئی» feminine, as its entry; «کردار کم ہو گیا» masculine; «عمارتیں … رہ گئیں»; the row «دیکھا جا سکتا ہے» masculine, said of the castle.
- jabri-mosque: «مرکز بھی رہی» with the mosque, feminine; «بنی ہے»; «مواد برتا گیا» masculine; «ایک آباد مسجد ہے»; «کھلی ہے» feminine; «مقام کی حرمت کا خیال».

## Guarded claims

- khuzam, the status row: «فی الحال بند ہے، مرمت اور ورثے کی ترقی کے کاموں کی وجہ سے» under «موجودہ حالت» — equal to stage 5 byte for byte (by script), the status first, the adverb and the indicative as the source, the source's reason after it. The 2017 sentence: «2017 میں اس کی مرمت ہوئی اور اسے سیاحوں کے لیے کھول دیا گیا۔», flat, its own sentence; one word differs from stage 5 («سیاحوں»). No bridge anywhere on the page: none of «لیکن», «مگر», «البتہ», «تاہم», «دوبارہ», «پھر», «اب» in its seven strings; «آج» opens the next sentence as it does in the source ('it is today one of …'). The summary says nothing of a closure, as its source.
- uqair-castle, the status: «باہر سے دیکھا جا سکتا ہے». No «صرف» and no 'open'. Against the source ('Open for exterior visits', «متاح للزيارة الخارجية»): nothing more; one thing less, the visit, said as seeing (finding 9 d). The body's last sentence is untouched: work in progress as a fact, closure as a possibility of some parts.
- uqair-castle, the port: «یہ بندرگاہ سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ ہے» — 'first' tied to the east coast by the possessive, in the same words as the sister page's summary (equal by script); no 'oldest'; five structures listed and the removed palace not named.
- jabri-mosque: no clock time, no day and no word of when to come in its eleven strings; «زائرین کے لیے کھلی ہے» is the source's and no more. The century: «پندرہویں صدی عیسوی سے», the English's century with the calendar word, nothing computed and no Hijri century supplied. 'Around' stands before 850 and before 1,600. Both superlatives under 'one of' («قدیم ترین اور مشہور ترین مساجد میں سے ایک»).
- baiah: «1203 ہجری (1788 عیسوی)» in the summary and in the body; 1789 nowhere. 'The first house King Abdulaziz entered': «سب سے پہلے اسی گھر میں داخل ہوئے». 'One of' holds the superlative.
- muhairis: the hours are named as the garden's and the walkway's; nothing is said of entering the fort, as the source.

## Shared with the sister batch

Compared by script with the text of `b1/stages/07-judge.round1.json`; the round-2 file carries the same text in every leaf, so each line holds for it too.
- The visiting row, jabri-mosque practical[1].value against jawatha-mosque practical[2].value: EQUAL, byte for byte. The label «زیارت»: EQUAL.
- The hours cell, baiah practical[0].value against ameeriah practical[0].value: EQUAL, byte for byte.
- The World Heritage frame of the summary, from «جو یونیسکو», khuzam against sahood: EQUAL.
- The World Heritage frame of the body, first sentence, from «آج یہ», khuzam against sahood: EQUAL.
- The World Heritage frame of the body, second sentence: DIFFERENT by the three words «عالمی ورثے کی » and nothing else (khuzam «یہ نخلستان 2018 میں یونیسکو کی فہرست میں درج ہوا۔»); right, because khuzam's sources say 'inscribed by UNESCO' and sahood's 'UNESCO's World Heritage List'.
- The port line, «سعودی عرب کے مشرقی ساحل کی پہلی سمندری بندرگاہ», uqair-castle body against al-uqair summary: EQUAL.
- The place of the port, «خلیج کے ساحل پر، الاحساء کے مشرق میں», uqair-castle body against al-uqair faq[1].a: EQUAL.
- «داخلہ مفت», four cells here against qasr-ibrahim's and ameeriah's: EQUAL. The labels «اوقات» and «فیس»: EQUAL. The kicker «تاریخی مقام»: EQUAL.
- «سوق القیصریہ نامی بازار» (baiah body, ameeriah body), «پرانے ہفوف» (jabri-mosque body, ameeriah body and area), «داخلے کی کوئی فیس نہیں» (jabri-mosque practical[0].value, al-uqair practical[0].value), «حفاظت کرتے ہیں» for 'guarded by … towers' (khuzam, sahood): the same words in both.
- Not equal, and listed under findings 5 and 8: an area («اس کا رقبہ 705 مربع میٹر ہے» here, «10,000 مربع میٹر پر پھیلا» on sahood); 'at the heart of' («… کے وسط میں» here, «… کے قلب میں» on two pages of b1); the opening of a fort page («… واقع ہے۔ یہ … قلعہ ہے۔» here, «… کھڑا ہے: … قلعہ۔» on sahood).

## Names

Whole-word counts in the 45 strings.
- This file's keys: «قصر محیرس» 2, «قصر خزام» 2, «بیت البیعہ» 2, «بیت الملا» 1, «الملا خاندان» 2, «شیخ عبد الرحمن بن عمر بن محمد الملا» 1, «عبد اللطیف بن عبد الرحمن الملا» 1, «شاہ عبد العزیز» 2, «سعود بن عبد العزیز» 2, «پہلی سعودی ریاست» 4, «المزروعیہ» 2, «الکوت» 7 (six after «محلہ», one bare in the sentence that has just named it), «قلعہ العقیر» 2, «معاہدہ العقیر» 1, «نجد» 1, «دمام» 1, «مسجد الجبری» 2, «سیف بن زامل الجبری» 1, «بنو جبر» 2, «جمادی الاول» 1, «سعودی قومی دن» 1, «سرائے» 1, «چنگی خانہ» 1, «بیٹھک» 1, «عجائب گھر» 1, «چوکی» 1, «زمام» 1. Three keys do not occur byte for byte because the text has them in the oblique, as their entries say: the Agency («… عجائب گھروں کے سعودی ادارے نے»), the programme («… دیکھ بھال کے منصوبے کے تحت») and «سیاح» («سیاحوں»).
- b1's and b0-ui's keys: «قصر ابراہیم» 2, «سوق القیصریہ» 1, «العقیر» 7, «الاحساء کا نخلستان» 2 (both inside the marks), «خلیج» 2, «بندرگاہ» 8, «المبرز» 3, «قلعہ» 9, «تفریح گاہ» 1, «سعودی عرب» 1, «یونیسکو» 2.
- The repository's keys: «الاحساء» 17, «ہفوف» 7, «نخلستان» 3, «فیس» 5.
- This file shares no key with b1 or b0-ui, so no entry of theirs is overwritten by it.

## Calibration entries read (30)

Every open item of the repository termbase has its entry (P3c, P4, P5, P6, P9, P10, P22, P27). Every form a ruling gives as this batch's text stands in the text as quoted; the forms that do not are options on record, retired keys, forms a guard bans, or b1's. Every leaf named in a `strings_affected` exists, and each of the 10 changed leaves is named by at least one entry. Counts the text can confirm are right: seven «عبد» in four leaves, 7 year pairs, six area lines of the open pattern in the two batches, «خلیج» in two places, ten card rows, «بندرگاہ» eight times on uqair-castle, three pairs of quotation marks on khuzam, one «(یعنی » in the batch, «زائرین» off no mosque page in either batch. No entry is both ruled and open: N29 is ruled and N30 stays open with both forms; N14, N8, N16, the visiting row and P3c's «نامی بازار» are ruled and say that they depend on b1.
Findings: 3 (N16, the rider), 4 (P10), 5 (N24, the area clause), 6 (N24, the sentence), 9 (N14, N29, N12, N25).

## The fresh blind read: a cross-check

`stages/06-blind-reader.on-r1.md` was written at 17:53, while this pass ran. It was opened after the eleven findings above and their grades were fixed; nothing was added, dropped or regraded because of it.
- Agrees with finding 1: his items 2 and 16, both moderate («قصر محیرس المبرز» and «قصر خزام ہفوف» read as one name). His remedy is a comma after the name; either remedy parts the names.
- Agrees with finding 2: his item 32, minor («ہوتی آئی ہے» "says trade is still going on here today, which the rest of the paragraph denies"). His tense is «ہوتی رہی ہے».
- Agrees with finding 7: his items 15 (the «کا» inside the marks running into «کے»), 42 («ساتر لباس», «اس مقام کی حرمت») and 50 (the «؛»).
- Agrees with finding 11 (d): his item 43.
- Seen by this pass and let pass, faulted by him: «ایک دو منزلہ» read as 'one-or-two-storey' (his item 4, moderate; the wording is the first reader's own); «کردار کم ہو گیا» (his item 35, minor).
- Passed by this pass as grammatical, faulted by him for its make: «یہ نگرانی اور پہرے کا ایک چھوٹا سا قلعہ ہے۔» (his item 5, minor), the judge's own sentence.
- Bears on finding 3: his item 25, who cannot tell whether the Agency is a name or a description.
- No remark from him on: the measure as a sentence (his item 56 is on words against figures), the order of the two names on baiah, the area sentence, «درس و تدریس اور علم», «مواد برتا گیا», «سیاحوں کے لیے کھول دیا گیا».

## Not verified

- I am a model of this line, not a reader of the language by birth; the grammar and the readings are mine. The corrections offered in findings 1 and 2 have been read by nobody.
- The stage checker was not run (it rewrites its check file); I read its last result. No build was made and no build check was run (C29, C32, C34 were read in the pack only).
- The text hash the tools compute was taken from `blind/blind-input.on-r1.json`, not recomputed; the file hash was recomputed and is the one recorded there.
- b1's round 2 is not written: its stage file is an empty frame, and what finding 7 says of it is read from its judge's working drafts as they stood at 18:07. They may change before the file is written, and nothing here was checked against a finished round 2.
- No dictionary page and no reference page was read in this pass. The genders the agreements rest on are those of the entries («بندرگاہ» feminine is a pending entry) and, for «رقبہ», «کردار», «مواد», «تجارت», «فصیل» and «میلہ», my own. The page counts and dictionary quotations in the calibration evidence were read as written, not fetched again.
- The reference sentence quoted for the measure's frame (finding 6 c) was read in the entry, not on its page.
