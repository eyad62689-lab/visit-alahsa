RESULT: must-fix=0 should-fix=1 note=9

# Proof pass on the round-2 text — batch b3 (5 attraction pages, 53 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. No existing file was changed.
Text read: `pages[].fields` of `stages/07-judge.round2.json` (file sha256 `2cba21beac5c679c7450826fa55fad39c4bec604c62720fc75bad27820ba1cee`, the hash `blind/blind-input.on-r2.json` records; 53 strings, 5042 code points, 59 distinct). The five changed leaves were also read in their place on the rendered page (`blind/blind-input.on-r2.md`: it carries the 6 new wordings and none of the old).
Judged by the role file as amended by the 66 rulings of the termbase and by this file's own `calibration` (18 entries).
Scripts of this pass (none imports anything from the tools): `b3/s5q-dump.mjs`, `s5q-refs.mjs`, `s5q-scan.mjs`, `s5q-extra.mjs`, `s5q-last.mjs`; outputs `s5q-*.out.txt`, `s5q-*.view.txt`. The letterform scan was tried on a copy broken in memory: 8 planted characters, 8 caught.
Stage checker, run as asked (`node check-s7.mjs b3 r2`; the judge file and its check file have the same hashes before and after):
`RESULT [b3 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 1 note(s) | 5 page(s), 53 strings, 5042 code points | changes=6 over 5 leaf(s) | scores 92/92/91/90/95 batch_score=90 threshold=90 decision=APPROVE | rulings=46 proof_rulings=13 | termbase_final=25 | selftest PASS`
Its one note is `P20 jalaniyah::area`, the line item N30-area-line-without-a-larger-bare-place rules and expects.

Summary. Nothing in the 53 strings breaks a letterform, a name, an agreement, a mark, a figure, a fixed string or a ruled form; the eleven items pass. The 6 changes replay on round 1's text to exactly this text and nothing else differs. None of the 6 edits brings in a statement the page's sources do not carry, and none takes one out; what each moves is named in findings 2 to 7. The two re-worded calibration entries (N42-two-niches-and-arches, N47-the-oasis-on-a-page-that-has-not-named-it) agree with the text, with their guards and with the calibration page. The one should-fix is in the judge's notes, not in the text: two tallies that do not match the lists they count (finding 1).

## Replay

6 changes, 6 applied in order on round 1's text, each `before` found exactly once; 0 unlogged differences; 5 leaves changed (jalaniyah::body, dibs::summary, bubakr-ribat::body twice, bubakr-ribat::practical[1].value, qubba-mosque::body); the other 48 leaves are round 1's byte for byte; 53 leaves, the pack's set in the pack's order.

## The eleven items

- item 1, letterforms: PASS. Details under "Code points".
- item 2, name forms: PASS. Details under "Names". No Latin letter, no fused or hyphenated name, no pleonasm, no banned variant.
- item 3, grammar: PASS. Every agreement the 6 edits touch is listed under "Changed strings read in place".
- item 4, address: PASS. No «آپ», «تم» or «تو» in the 53 strings; the only requests are the two honorific subjunctives of the fixed row.
- item 5, headings: PASS. 5 titles, 5 kickers, 14 labels: no mark, no bracket.
- item 6, termbase compliance: PASS. 23 of the 25 keys of `termbase_final` stand byte for byte; the two that do not are recorded in their notes as inflected («الجبیل اور ینبع کے شاہی کمیشن نے», «شیرے»).
- item 7, punctuation: PASS. «۔» 54 (one more than round 1: the second sentence of the dibs summary), «،» 41, colon 1 (dibs body), U+201C / U+201D 2 pairs, round brackets 11 pairs, U+061B 0, U+2013 0; no ASCII stop, comma, question mark, quote, guillemet, hyphen, line break or Markdown. No space before a mark, none missing after one, no double space, no repeated adjacent word (also across a mark). 10 strings end with «۔» (5 summaries, 5 bodies); the 43 others end with no mark (ruling P26), the new card value among them.
- item 8, numbers, dates: PASS. Latin digits only; every figure of the Urdu stands in the English or Arabic of its field and every figure of the English is in the Urdu (0 findings over 53 leaves). The dibs summary keeps «962 ہجری (1555 عیسوی)» in the ruled form. The clock word stands twice, both in qubba-mosque practical[1].value, untouched.
- item 9, loans and banned lists: PASS. Nothing new: the 6 edits bring in no loan; «موجود», «گورنر», «رائل», «جپسم» 0. «نیم کروی» is a Perso-Arabic adjective, not an English loan (finding 7).
- item 10, glossing: PASS. «(یعنی » once, on qubba-mosque, straight after the page's own title; no bracket in a summary; the second name in the dibs summary is a statement, not a gloss.
- item 11, structure: PASS. Keys and order as the pack; `practical` items carry `i`, `label`, `value` only; no card value ends with «۔».

## Code points

U+064A = 0, U+0643 = 0, U+0629 = 0, U+0647 = 0, U+0649 = 0, U+0623 = 0, U+0625 = 0, U+06C3 = 0. Latin letters 0. U+0660–0669 = 0, U+06F0–06F9 = 0, any other non-ASCII digit 0. U+00A0, U+202F, U+2009 = 0. U+061B = 0. U+0650, U+06C2, U+06C0, U+0640, U+0654 = 0; format characters 0. The only combining mark is U+064B, 8 times, each in «تقریباً». U+06BE 50 times, after U+0628 13, U+062A 9, U+0686 3, U+06A9 22, U+067E 1, U+0691 2 («سیڑھیاں», «پڑھانے»); none after U+062F any more (round 1's «آدھے» is gone, as item P22's evidence says).

## Changed strings read in place (every cell checked)

- jalaniyah body, change 0: «… اور اس کی چھت کھجور کے تنوں اور پتوں کی ہے۔ ستونوں کی قطاروں پر نوک دار محرابیں ٹکی ہیں۔ قبلے کی دیوار میں دو محرابیں اس مسجد کو منفرد بناتی ہیں۔ اس میں ایک ہزار سے زیادہ نمازیوں کی گنجائش ہے۔» — both seams a stop and one space; «محرابیں ٹکی ہیں», «محرابیں … بناتی ہیں» feminine plural; no word added or lost; the pronouns in finding 2.
- dibs summary, change 1: «تاریخی مسجد الدبس، محلہ الکوت کی قدیم ترین مساجد میں سے ایک، جو عثمانی دور میں 962 ہجری (1555 عیسوی) میں تعمیر ہوئی۔ اس کا اصل نام مسجد الفاتح ہے۔» — a nominal phrase closed by a stop, then a sentence; «جو … تعمیر ہوئی» feminine singular; «اس کا» points to the head of the phrase; two names, each byte for byte its key, each once; one space after the inner stop; 146 code points.
- bubakr-ribat body, change 2: «… اور یہ رباط نسل در نسل ان طلبہ کو اور مسافروں کو بھی مفت رہائش اور کھانا پینا دیتا آیا ہے۔» — two oblique plurals, each with «کو»; «بھی» after the second; «دیتا آیا ہے» masculine with «رباط».
- bubakr-ribat body, change 3: «عمارت کے مشرقی حصے میں باورچی خانے ہیں اور ایک کنواں ہے۔» — plural noun with «ہیں», singular with «ہے»; no comma needed.
- bubakr-ribat practical[1].value, change 4: «منتظمین سے پیشگی طے کرنے پر» under the label «ثقافتی دورے» — oblique infinitive with «پر»; no final stop; no figure.
- qubba-mosque body, change 5: «اس کے اوپر بیچ میں ایک نیم کروی گنبد ہے، جس کا قطر تقریباً تیرہ میٹر ہے، اور کونوں پر چھوٹے گنبد ہیں۔» — adjective in two words before a masculine noun, «جس کا قطر» as before; «کی شکل کا» now once in the body (the minaret's).
- A ruled form on one page and not another: none found. «الاحساء کے نخلستان» on both pages that have the word for an oasis; the register «الاحساء کی تاریخی مساجد کی سرکاری فہرست» on both pages that name it; «جو سرکاری طور پر درج ہیں» 0; on dibs «عثمانی حاکم محمد فروخ پاشا» and one «والی» (the suffix).

## Guarded claims and statuses against the pack

- The Visiting row: 5 values, one string, equal to the pair of `tm.json` (sha256 of the value `9a36b1d1bbd79a242f025b6d2dbd12b40a5e90f22b6cae4921a3cc0bf91e6dd2`, the same as in round 1); label «زیارت» 5 times.
- No visiting time beyond the two Hours rows of the sources (qubba-mosque practical[1], tahimiyah-s practical[1]); the new card value names none and promises nothing.
- Superlatives, counts and statuses as in round 1, none touched by the 6 edits: jalaniyah «مشہور ترین … میں سے ایک», 'more than a thousand'; dibs «قدیم ترین مساجد میں سے ایک» (inside the re-made summary, the same words), «آج بھی ایک آباد مسجد ہے»; bubakr-ribat «آج بھی آباد ہے» twice, kitchens plural and one well; qubba-mosque 'one of' in the summary and 'the most' in the body, «تقریباً» before thirteen and not before nineteen; tahimiyah-s untouched.
- The one statement that is new in a field: 'its original name is Al-Fatih Mosque' in the dibs summary (finding 3).

## Strings that must equal tm.json (by script)

30 leaves have an approved pair and all 30 equal it: 'Visiting' ×5, its value ×5, 'Fees' ×5, 'Free entry' ×5, 'Hours' ×2, 'Entry' ×1, 'A working mosque, no entry fee' ×1, the kicker (pair keyed by the Arabic) ×5, dibs area ×1. 8 card leaves have no pair (4 area lines, the Cultural-visits label and value, the two Hours values); 'By prior arrangement with those who run it' is in no pair, and the new value equals no `ur` of the memory.

## Names

25 keys of `termbase_final`, the same keys as round 1; 23 in the text byte for byte, 2 inflected as their notes say. Titles: four are keys of this file, jalaniyah's a key of the repository termbase. No retired key is declared and none is in the text. Statuses 10 verified, 15 pending, as the notes say; every note carries a sentence for round 2. Apart from notes, one field of one entry differs from round 1 («شیرہ», `source`: 'in this round' became 'in round 1 of b3's stage 7' — a correction).

## Quotations (by script)

415 Urdu or Arabic quotations in guillemets stand in the calibration, the termbase entries, the notes, the change list, the rulings, the defects and the score reasons: 246 are in the text; 169 are not, and each was read with its lead-in — candidates not taken, forms of earlier stages named as such, sister-batch and round-1 forms, reference and dictionary citations, Arabic, options for the owner. None is given as the text's and missing from it. Checked where they point elsewhere: stage 5's sentence (candidate A of N42-two-niches-and-arches) and stage 5's card value are in `05-proofreader.json`; «الاحساء کے نخلستان کے بیچوں بیچ» opens the body of jabal-al-qarah and its summary has «نخلستان کے قلب میں»; «بیت الملا کے نام سے بھی معروف ہے» is on baiah and on no other applied page; «تقریباً 850 ہجری (1446 عیسوی)» is on jabri-mosque; b4's two area lines, its century of hubaish and «خود یہ گاؤں» are in b4's round-1 text; the reference sentence with «نیم کروی» is in `b3/s45-wiki.out.txt` (article «مسجد خیروا»); both blind reports have «نیم کروی» as the first of the reader's two wordings.

## Findings

1. [should-fix] notes — two tallies do not match the lists they count
   - Where: `notes[1]`: 'The second reader left 1 serious, 16 moderate and 29 minor remarks (five of them per-page verdicts): 6 applied, 20 rejected, 20 source defects, 0 open items.'
   - What is wrong: `06-blind-reader.on-r1.md` has 46 items: 1 serious, 18 moderate, 22 minor and 5 per-page verdicts with no grade (16, 22, 31, 40, 46). `blind_reader_rulings` has 5 applied (13, 17, 27, 29, 35), 22 rejected, 19 source_defect. Item 25 is ruled `source_defect` and carries `change_ref` 4, so change 4 is referenced only by a ruling that is not `applied`; counting it as applied gives 6 / 22 / 18, still not the note's 6 / 20 / 20.
   - Right: '1 serious, 18 moderate, 22 minor and 5 ungraded per-page verdicts: 5 applied, 22 rejected, 19 source defects (one of them, item 25, with one strand applied as change 4)'. No string of the text is affected; the checker does not read the note.

2. [note] jalaniyah body, change 0 — the two sentences change places
   - Sources: one sentence, niches first: 'it is notable for having two mihrabs in its qibla wall and rows of columns carrying pointed arches, with space for well over a thousand worshippers'; «ويتفرد بمحرابين في جدار قبلته وصفوف أعمدة تحمل عقوداً مدببة، ويتسع لما يزيد على ألف مصلٍّ».
   - Entered: nothing. Left: nothing; the two statements are word for word round 1's.
   - Pronouns and demonstratives: the arches' sentence has none and now follows «اس کی چھت … کی ہے», so it is read of the same building. «اس مسجد» in the niches' sentence names its referent. «اس میں … گنجائش ہے» now follows the sentence that ends on the mosque, where in round 1 it followed the arches: it points where it did, and more directly.
   - Order against the source (rulings P23, P24, P25): materials and roof, then the two statements of one source sentence in reverse, then capacity. No claim is said differently. What the turn does: the arches now read as the last item of how the building is made, not as one of the two things the source calls notable (English) or unique (Arabic); the uniqueness was already the niches' alone since stage 4, so the claim is no wider and no narrower than in round 1. The judge counts it under accuracy.
   - The guard of N42-two-niches-and-arches holds by script (the arches' sentence at 471, the niches' at 516, adjacent, two sentences). Unread: whether «دو محرابیں» straight after «نوک دار محرابیں» is still taken for niches is the blind reader's.

3. [note] dibs summary, change 1 — every statement and its field
   - «تاریخی»: summary ('The historic', «التاريخي»). «مسجد الدبس» as the name: title and body, not the summary's source. «محلہ الکوت کی قدیم ترین مساجد میں سے ایک»: summary. «عثمانی دور میں 962 ہجری (1555 عیسوی) میں تعمیر ہوئی»: summary. «اس کا اصل نام مسجد الفاتح ہے»: the Arabic body («واسمه الأصلي مسجد الفاتح»); the English body says 'officially', and the pack names the Arabic as the authority on this fact. So nothing is asserted that the page does not say; two things stand in the field that its own source does not put there (the page's name as head, 'original name'), and the source's lead is turned round. That is what the judge states and charges, and what the Chinese, German and Russian summaries of this page also do (read in `dibs.md`).
   - 'Original' against 'officially': «اصل نام» follows the Arabic; in Urdu it also reads as 'real name', which is no further from either source.
   - Is it still a summary? 146 code points, two sentences. Approved summaries: khuzam 118 with two sentences in the same shape (a phrase closed by a stop, then a sentence), ameeriah 98 with two, baiah 238 with two. Within what the field already holds.
   - The record words the precedent loosely: in the three earlier lines the other name stands straight after the page's name inside one sentence; here it comes last, in a sentence of its own. The claim 'the shape of the Chinese, German and Russian summaries' is true of the head, not of the order.
   - The same sentence in the body: the summary's second sentence recurs as the opening clause of the body's third sentence, word for word (7 words), there closed by «،» and followed by the same year pair — so that one body sentence repeats both facts of the summary, in the reverse order. Not an exact duplicate sentence. The page's name now stands in the title, at the head of the summary and at the head of the body.
   - Left as it was: «عثمانی دور میں 962 ہجری … میں», the doubled postposition the second reader named in his item 17.

4. [note] bubakr-ribat body, change 2 — «ان طلبہ کو اور مسافروں کو بھی»
   - Sources: 'to students of the Islamic sciences arriving from within Al-Ahsa and far beyond, as well as to travellers'; «لطلبة العلوم الشرعية … ولعابري السبيل».
   - Entered: «بھی», which is the English 'as well as'. Left: nothing. The demonstrative now governs the students only; both groups still receive the lodging, the food and the drink. «طلبہ» stands twice in the sentence, as in round 1.

5. [note] bubakr-ribat body, change 3 — «باورچی خانے ہیں اور ایک کنواں ہے۔»
   - Sources: 'a well and kitchens'; «بئر ماء ومطابخ». Kitchens plural, one well: as both. Entered: a second verb. Left: nothing. The order of the two nouns is round 1's (the reverse of both sources).

6. [note] bubakr-ribat practical[1].value, change 4 — «منتظمین سے پیشگی طے کرنے پر»
   - Sources: 'By prior arrangement with those who run it'; «بالتنسيق المسبق مع القائمين».
   - Entered and left: nothing; the three content words are round 1's, and only the verb form moves (conjunctive participle to infinitive with «پر»). A condition, no time, no promise that a visit is granted. Card form as ruling P26 asks; not a string of the memory.
   - Two things for the blind read. The phrase is still an adverbial with no main clause, as the source's is; whether 'and then what?' is answered is his to show. «طے کرنا» stands with no object, and «پیشگی» is also a noun (money paid in advance) — beside a Fees row a reader could, for a moment, take it so; both were so in round 1's value and drew no remark.

7. [note] qubba-mosque body, change 5 — «ایک نیم کروی گنبد ہے»
   - Sources: 'a central hemispherical dome about thirteen metres across'; «قبة مركزية نصف كروية». The same shape in the sources' own adjective; 'central' is still «بیچ میں», 'crowned by' still «اس کے اوپر». Entered and left: nothing.
   - Register: a book word, the one both readers wrote first, each on his own (checked in both reports), and the reference site's of a dome. Beside the summary's plain «گنبد والی مسجد» it is the only technical word of the sentence.
   - Not ruled in the file: the second half of the second reader's item 35, that «اوپر بیچ میں» 'is also a little bare'; the ruling speaks only of the adjective and of 'large'.
   - No dictionary entry was read for the adjective, by the judge or by this pass.

8. [note] calibration N47-the-oasis-on-a-page-that-has-not-named-it — consistent; two wordings
   - Against the text: bubakr-ribat and qubba-mosque each have the word for an oasis in one field, the body, and each has «الاحساء کے نخلستان» there; the three other pages do not have the word. Against the applied pages, by script: jabal-al-qarah (first field with the word: the summary, bare; named at the opening of the body), khuzam, sahood, jawatha-mosque and qasr-ibrahim all pass the guard as now worded; the six other applied pages do not have the word. Evidence, ruling and guard agree with each other.
   - `binds` says 'bubakr-ribat::body, qubba-mosque::body, both unchanged in this round': both leaves were changed in this round (changes 2, 3 and 5); what is unchanged is the sentence of the oasis in each.
   - The guard tests for the literal «الاحساء کے نخلستان» or «الاحساء کا نخلستان»; the ruling says 'names it'. A later page that says of Al-Ahsa that it is an oasis in other words (as the last sentence of the calibration body does) and has no such phrase would meet the reader's complaint and fail the guard. No page does so today.

9. [note] calibration N42-two-niches-and-arches and the sister batch — consistent; three statements overtaken
   - N42: candidate E is the text, B is round 1's text, A is stage 5's (all three by script); ruling, guard and text agree; ruling N34's mark for the arch (the plural) is kept.
   - b4's `07-judge.round1.json` (written after this file) was compared by script: its entries for all 17 shared ids other than P22 have the same ruling, guard and status as here, N42 and N47 in the new wording; P22 differs as it should (b4 meets the pronoun). Shared strings equal: 4 visiting rows, 5 kickers, 5 'free entry' cells, 3 'working mosque' cells, the Hours value and the area line of the two tahimiyah pages, the byname clause, the Commission's oblique form, the title pattern, and now the sentence of 2017. b3 contradicts none of its own rulings.
   - Overtaken since this file was written, not wrong when written: 'b4's text still has the withdrawn wording' (N46-listed-among-registered-historic-mosques `binds`, `proof_rulings` 12, `notes`) — b4's text now has the ruled sentence and not the withdrawn one; b4's items are N55 to N64, ten, where the notes say nine renumbered to N55 to N63 (the tenth is new).

10. [note] ids cited by number alone in `termbase_final`
   - The three colliding ids are cited in full everywhere (0 bare citations by script). Six other items of this file are still cited by number alone in notes carried from earlier stages: N30 once («البطالیہ»), N37 three times («رباط», «رباط آل ابی بکر الملا»), N39 twice, N43 twice, N44 twice, N45 twice. The numbers are unique across b3 and b4, so nothing is confused; they would enter the termbase in the short form while the round-2 sentences of the same notes use the full one.

## Not verified

- No reader has read any of the 6 changes; this pass is a proof, not a blind read.
- Dictionary pages: rekhtadictionary.com answered HTTP 503 for the two pages tried (the adjective of the dome, «پیشگی»); nothing was read for either. The gender and sense notes of the 25 entries were not re-read.
- The precedent summaries of dibs were read in the page file (Chinese, German, Russian fields); the earlier lines' judge notes were not.
- Whether the tools' reader takes each guard clause of this file was not tested beyond the checker's own run (0 ruling findings, guards read from five files).
- The score arithmetic was checked (each page's axes sum to its score; batch = lowest page); the scores themselves are the judge's.
- The source defects the judge lists were not re-examined: they are the owner's.
