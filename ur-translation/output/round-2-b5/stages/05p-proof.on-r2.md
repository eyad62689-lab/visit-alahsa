RESULT: must-fix=0 should-fix=2 note=19

# Proof pass on the round-2 text — batch b5 (5 attraction pages, 55 strings)

Role: stage 5 (`ur-translation/prompts/05-proofreader.md`), report only. Nothing was changed by this pass except this report and its own `s5q-` helper files in `b5/` (the stage checker, run as asked, rewrote its own `07-judge.round2.json.check.txt`).
Text read: `pages[].fields` of `stages/07-judge.round2.json` (file sha256 `04207a473f1f9a05cccbfe82c0416491e69d13c1f4f8d0021a0aeb298fc3e1d8`, the hash `blind/blind-input.on-r2.json` records as `stage_sha256` and `stages/final.json` as `judge_sha256`; 55 strings, 4632 code points, 58 distinct). Every leaf stands verbatim in `blind/blind-input.on-r2.md` (kickers are not rendered); the seven changed leaves were read there in their place. `final.json` carries the same 55 strings. A blind report on this text (`stages/06-blind-reader.on-r2.md`) appeared in the folder while this pass ran; it was NOT opened.
Built on `05p-proof.on-r1.md`: what that pass settled and round 2 did not touch (the font and glyph of U+0670, the guards of the build, the 48 leaves round 2 left alone) is not redone here; it was re-counted by script only.
Scripts of this pass, in `b5/`: `s5q-dump.mjs`, `s5q-own.mjs`, `s5q-scan.mjs` (output `s5q-scan.out.txt`), `s5q-quotes.mjs`, `s5q-quotes2.mjs`, `s5q-site.mjs`, `s5q-sis.mjs`, `s5q-misc.mjs`, `s5q-maqsura.mjs`, `s5q-readers.mjs`, with their `s5q-*.txt` outputs. The letterform scan imports nothing from the tools and was tried on copies broken in memory: eight planted faults (U+064A, U+0643, a no-break space, a banned pronoun, a second U+0670, a Latin letter, an Eastern digit, U+061B) were all seen.
Stage checker, run as asked (`node check-s7.mjs b5 r2`):
`RESULT [b5 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 4 note(s) | 5 page(s), 55 strings, 4632 code points | changes=15 over 7 leaf(s) | scores 92/93/93/92/91 batch_score=91 threshold=90 decision=APPROVE | rulings=42 proof_rulings=22 | termbase_final=23 | selftest PASS`
Its four notes are `P20` on shaban::area, kanzan::area, arbaa::area and thulaim::area, the lines item N30 rules and expects.

Summary. The 15 edits replay exactly on round 1's text and nothing else differs. In the 55 strings nothing breaks a letterform, a name, an agreement, a mark, a figure or a fixed string, and no edit brings onto a page a fact its sources do not carry: no must-fix, and no should-fix in the TEXT. Both should-fix items are in the RECORD and move no string: the sentence round 2 added to the guard of N72 ('a bare name cited as a name stands in marks at every mention on its page') is not true of kanzan's summary, which this file's own entry of «کنزان» describes as the bare name cited as a name (finding 1); and N65 says the translation memory 'holds both strings, each with its gender named', which neither `tm.json` nor the pairs `final.json` will write makes true (finding 2). Of the judge's own wordings (findings 3 to 15): each says what both sources say or less, never more; what left the text in this round is one 'famous' (shaban), the plural of 'ideas' (thulaim) and the source's order of two nouns (tuwaither), all three declared by the judge; what came back is 'beside' and 'to develop it as' (thulaim). Three things are left to a reader and not to a proof: the name twice in shaban's closing sentence, «شمال سے» three times at the head of thulaim, and whether «نامی» fences «الطرف».

## The eleven items

- item 1, حروف (letterforms): PASS. Details under "Code points".
- item 2, نقل حرفی (name forms): PASS. The 23 keys of `termbase_final` each stand in the text byte for byte at least once («کنزان کی لڑائی» once whole and once inflected, «کنزان کی مشہور لڑائی», as its note says). Ten keys of the repository that the text uses stand byte for byte («الاحساء» 14, «ہفوف» 8, «جبل القارہ» 7, «نخلستان» 5, «مسجد جواثا» 1, «الکلابیہ» 2, «تفریح گاہ» 2, «شاہ عبد العزیز» 2, «فیس» 10, «پہاڑ» 11). No Latin letter. No pleonasm («پہاڑ» directly after a «جبل» name: 0 in five bodies). Banned and press variants: 0 («جبل قارہ», «القارۃ», the Arabic-letter spelling, «کوہ», «الہفوف», the head name without its hamza).
- item 3, قواعد (grammar): PASS. Every agreement the 15 edits touch is listed under "Changed strings read in place". «ایک» before a noun the source has in the plural: finding 14.
- item 4, خطاب (address): PASS. «آپ» 0, «تم» 0; «تو» once, the particle after a perfective («رائج ہو گیا تو»); one imperative, the honorific «دیکھیں» (shaban).
- item 5, عنوانات (headings): PASS. 25 titles, kickers and labels: no mark, no bracket.
- item 6, termbase compliance: PASS on the text. The record: findings 1, 2, 16.
- item 7, رموز (punctuation): PASS. «۔» 44, «،» 44, colon 2 (both on shaban), U+201C / U+201D 10 pairs (shaban summary 2, shaban body 7, arbaa body 1), round brackets 1 pair (kanzan, the Gregorian year), ASCII comma 1 (inside «100,000»), U+061B 0, U+2013 0, U+2014 0, hyphen 0; no ASCII stop, semicolon, question or exclamation mark, straight quote, guillemet or square bracket. By script on all 55 strings: no space before a mark, none missing after one, no two marks together, no double, leading or trailing space, no line break, no Markdown character, quotes and brackets paired leaf by leaf, none glued to a letter; the only repeated adjacent words are the reduplications «ساتھ ساتھ» (arbaa summary and body) and «الگ الگ» (arbaa body). 10 strings end with «۔» (5 summaries, 5 bodies); the 20 card values and area lines end with no mark (ruling P26).
- item 8, اعداد، تاریخ، کرنسی، ہجری: PASS, with the recorded exception of N66 (finding 17). Leaf by leaf under "Figures".
- item 9, انگریزیت (loans, banned lists): PASS. «فیس» in 10 cells; «ریزورٹ», «پارک», «کیمپنگ», «ہائیکنگ», «فیملی», «ہال», «لوکیشن», «گائیڈ», «ملین» 0; «موجود» 0; «واقع» 0; «انعقاد» 0. No edit brings a loan.
- item 10, گلوس (glossing): PASS. No bracket after any of the seven «جبل» names (the one bracket pair is the year); «پہاڑ» stands alone in each of the five bodies (3, 3, 2, 1, 2) and never directly after a name; the two meanings the source gives stand once each, in a sentence, in marks (N70).
- item 11, ساخت (structure): PASS. 55 leaves, the pack's keys in the pack's order; `practical` items carry `i`, `label`, `value` only. tuwaither's area line leads with the larger bare place (P20); the other four keep the source's order and end in a postposition (N30), arbaa's with the new word.

## Code points

Forbidden class, counted one by one: U+064A = 0, U+0643 = 0, U+0629 = 0, U+0647 = 0, U+0649 = 0, U+0623 = 0, U+0625 = 0, U+06C3 = 0. Latin letters 0. Digits U+0660–0669 and U+06F0–06F9 and any other non-ASCII digit: 0. U+00A0 = 0; no other space than U+0020, no format or control character. U+061B = 0. Also 0: U+0650, U+06C2, U+06C0, U+0640, U+0654, U+0655, U+0651, U+064E, U+064F, U+0652. Outside the Arabic letter block, the space and ASCII digits the 55 strings hold only: U+060C ×44, U+06D4 ×44, U+201C ×10, U+201D ×10, U+003A ×2, U+0028 ×1, U+0029 ×1, U+002C ×1.
Every combining mark, with its place (6 in all, as in round 1):
- U+064B ×5, each in «تقریباً» after U+0627 and before a space: kanzan::body @58, arbaa::body @14 and @341, thulaim::body @65, tuwaither::body @86 (two positions moved with the edits; the words did not).
- U+0670 ×1: arbaa::body @46, after U+06CC, before a space, the last code point of «سلویٰ». Once, at the end of that word, as ruled.
U+06BE 57 times (58 in round 1: one «بھی» left with change 11), always after one of ت ک ب ٹ ڈ گ پ چ ج ڑ (11, 22, 8, 4, 2, 6, 1, 1, 1, 1); none after a letter outside the aspirate set.
The four U+06BE spellings the guard of P22 bans: «جنھیں» 0, «انھیں» 0, «انھوں» 0, «جنھوں» 0. The four ruled spellings: 0 each. Any word beginning جن / ان / تم / کن followed by any heh: 0. The `b5` field of P22 is true.

## Replay

The 15 entries of `changes` (numbered 0 to 14) were replayed in order on round 1's text: each `before` found exactly once in its leaf, no `after` present beforehand, 0 unlogged differences, leaf order unchanged. Seven leaves differ from round 1 — shaban::body (0, 1, 2), kanzan::body (3, 4), arbaa::body (5), arbaa::area (6), thulaim::summary (7), thulaim::body (8 to 13), tuwaither::summary (14) — and 48 are round 1's byte for byte, as note 1 of the file says. The 42 reader rulings are 20 source defect, 10 applied, 12 rejected, numbered 1 to 42; the 22 proof rulings are 10 applied, 12 kept, numbered 1 to 22: as note 6 counts them. Page scores equal the sums of their parts; batch = lowest page.

## Changed strings read in place (every cell checked)

- shaban body, sentence 7, change 0: «کہتے ہیں کہ یہ نام کھجور کے ان درختوں اور اس پانی کی وجہ سے پڑا جو کبھی جبل القارہ کو گھیرے ہوئے تھے۔» — «جو … گھیرے ہوئے تھے» plural with the two nouns together; the key whole, with «کو».
- shaban body, sentence 8, change 1: «جب اس مشہور پہاڑ کے لیے “القارہ” کا نام رائج ہو گیا تو “الشبعان” کا نام اس پڑوسی ٹیلے کا ہو کر رہ گیا۔» — the marks hug the name, one space before the opening mark and after the closing one; two pairs in the sentence, built alike.
- shaban body, sentence 9, change 2: «جبل القارہ کے غاروں اور سیر کی تفصیلات کے لیے جبل القارہ کا صفحہ دیکھیں۔» — «غاروں» oblique plural, «کی تفصیلات» feminine plural, «کا صفحہ» masculine, honorific imperative. The key twice in one sentence of twelve words: finding 5.
- kanzan body, sentences 5 and 6, changes 3 and 4: «… شاہ عبد العزیز کے دور میں، کنزان کے علاقے میں لڑی گئی۔ اس میں شاہ عبد العزیز زخمی ہوئے اور ان کے بھائی شہزادہ سعد مارے گئے۔» — the key twice, in two SENTENCES running (not in two clauses of one); «زخمی ہوئے» and «مارے گئے» both honorific plural; «ان کے بھائی» goes back to the name in the same sentence; no benediction. «بادشاہ» 0, bare «شاہ» 0, «جاں بحق» 0, «شہید» 0 in the batch.
- arbaa body, sentence 5, change 5: «الطرف نامی قصبہ اس کے شمال میں تقریباً چھ کلومیٹر دور ہے۔» — direct case; «اس کے» is «اس پہاڑ» of the sentence before.
- arbaa area, change 6: «ہفوف کے جنوب مشرق میں، الطرف نامی قصبے کے قریب» — oblique «قصبے» before the postposition; no final stop; the source's order (N30). One town, one form in the two fields.
- thulaim summary, change 7: «الاحساء میں شمال سے داخل ہونے والے راستے پر سب سے پہلا مقام، العیون شہر کے ذرا مغرب میں۔» — «والے راستے پر» oblique; «راستے پر سب سے پہلا مقام» is whole without the participle that left; a summary without a finite verb, like the other four.
- thulaim body, sentence 1, change 8: «الاحساء میں شمال سے داخل ہونے والے راستے پر، العیون شہر سے تقریباً ایک کلومیٹر مغرب میں، جبل الثلیم کھڑا ہے۔» — the same nine words as the summary; two locatives, two commas, the title before its verb (N64). Sentence 2, untouched, begins «شمال سے الاحساء کے نخلستان میں آنے والے …»: finding 9.
- thulaim body, sentence 3, change 9: «یہ پہاڑ ایک الگ تھلگ چٹانی ٹیلہ ہے، اور ان رسوبی صحرائی ٹیلوں میں سے ایک ہے جو نخلستان کے کناروں پر بکھرے ہوئے ہیں۔» — «ٹیلہ» masculine, «الگ تھلگ» and «چٹانی» invariable; «بکھرے ہوئے ہیں» with «ٹیلوں» through «جو»; one subject for both predicates.
- thulaim body, sentence 4, change 10: «یہ العیون کے پہلو میں اور نخلستان کی شمالی سڑک کے کنارے ہے، اس لیے …» — two postpositional phrases joined by «اور», one verb; «العیون» bare here as its source, «العیون شہر» in the other three places.
- thulaim body, sentence 5, changes 11, 12, 13: «مقامی لوگوں نے یہ تجاویز دی ہیں کہ اسے الاحساء کے شمالی سیاحتی دروازے کے طور پر تیار کیا جائے، مگر ابھی یہ صرف ایک خیال ہے۔» — «نے … تجاویز دی ہیں» feminine plural with the object; «دروازے» oblique before «کے طور پر»; «تیار کیا جائے» passive subjunctive agreeing with «اسے»-marked object (default masculine singular); «یہ … ایک خیال ہے» singular. «بھی» 3 in the batch, none hanging.
- tuwaither summary, change 14: «چٹانوں اور ٹھنڈے غاروں والا ایک پہاڑ، التویثیر کے شمال میں، مشرقی دیہات کے بیچ۔» — «والا» masculine with «پہاڑ»; both nouns oblique plural before it; the adjective stands before the one noun it belongs to.
- A ruled form on one page and not on another: finding 1 (marks round a bare cited name: shaban yes, kanzan no). Otherwise none: the generic after «گاؤں» and «شہر» names and before «محلہ القوع»; «الاحساء کی بلدیہ» three times; «تفریح گاہ» twice (N69). The source verb 'develop' has three Urdu renderings in the batch and no ruled form (finding 13).

## Figures, leaf by leaf against the pack

- Five `practical[1].value` cells: «24», as the English and the Arabic.
- kanzan summary: «1915», as both sources. kanzan body: «1333 ہجری (1915 عیسوی)», both years of the English; the Arabic's digit 15 is «پندرہ» in words, as the English has it.
- arbaa body: «22» in digits and «چھ» in words, as both sources; «چار» for the four hills.
- thulaim body: «ایک کلومیٹر» for 'about a kilometre'; no digit on the page outside the card.
- tuwaither body: «2024» and «100,000» as the English; «بیس» in words as both sources.
- «تقریباً» stands before each of the five distances whose source says 'some' or 'about', and nowhere else. No figure of the Urdu is absent from its field's sources; no figure of the English is absent from the Urdu. No edit of round 2 touches a figure.

## Fixed strings, by script

- The five "Open 24 hours" cells are one string, «24 گھنٹے کھلا رہتا ہے», and N65 quotes it byte for byte (four times) as its masculine string; no clock word, no part of the day, no final stop. The five titles' entries are masculine.
- The five kickers are one string, «قدرتی مقام», quoted by N67.
- 25 leaves have an approved pair in `tm.json` keyed by their English and all 25 are equal to it ('Hours & entry', 'Open public site — no entry fee', 'Hours', 'Fees', 'Free entry', five times each). `tm.json` holds no pair for 'Open 24 hours' (finding 2) and none for the Arabic kicker.
- «جبل القارہ» whole: 7, all on shaban (summary 1, body 6). The bare «القارہ»: 2 in the batch — shaban, in marks, the name that prevailed; tuwaither, the settlement (N77). No other form of the mountain's name. No «(» after a «جبل» name.
- N47: kanzan summary «الاحساء کے نخلستان کے شمال مشرق میں» (the ruling's form), body «الاحساء کے شمالی نخلستان» (N75's own form, as the file now says); thulaim body, first mention «الاحساء کے نخلستان میں», then the bare noun twice. shaban, arbaa, tuwaither: no word for an oasis. The guard holds on both pages.
- N64: no opening sets the page's title directly before another name. shaban: the title, then «کہتے ہیں»; kanzan: «کا پہاڑی سلسلہ»; arbaa: «کے ٹیلے»; thulaim and tuwaither: the verb; a comma before the title in the four that open with the place.
- No «؛» anywhere.
- The retired key «سلوی» as a whole word: 0 in the 55 strings; `termbase_keys_retired` holds it and `termbase_final` does not.

## Sister rulings and names

The 25 entries carried from b4's round 2 (P22, N30, N36 to N48, N55 to N64) are byte-equal to it, key order kept, apart from the field `b5` and, on N30 (+4), N47 (+3) and N64 (+1) only, b5's strings appended to `strings_affected` after b4's unchanged list: 25 of 25. Each `b5` field now ends in a sentence of round 2; each was read against the text and is true of it (N30's quotes arbaa's line with «نامی»; N47's says which form is N75's; N61's points to N73). The three open items carried as `untouched` differ from b4 only in `evidence` (P4, N7) or in nothing (BRAND); N7's round-2 sentence is true of the text. All five open items of the termbase are covered; 46 entries, round 1's ids in round 1's order.
`termbase_final`: 23 keys, round 1's 23; verified 9, pending 14. No key of b5 is also a key of the repository.

## Quotations in the record

Of 824 Urdu or Arabic quotations in b5's own scope (score reasons, the 18 own entries, the `b5` fields, N7 and P4 evidence, termbase notes, notes, defects, proof and reader rulings, change log), 523 stand in the text. The other 301 were sorted by script: 74 are wordings that stood in round 1's or stage 5's text and no longer stand, and all 74 were read in their sentence — each is named there as round 1's, stage 5's, withdrawn, a reader's quotation, a candidate not taken, or a reference count; none is given as the present text. In particular «جاں بحق ہوئے» (17 places), «الطرف قصبہ» / «الطرف قصبے کے قریب» (9), «داخلے کے شمالی راستے» (4), «خیالات ہی ہیں», «اسی مشہور پہاڑ», «اسے گھیرے», «دروازہ بنایا جائے», «پڑنے والا», the bare «شاہ» and «بادشاہ»: every one labelled as past. Of the remaining 227, 34 are Arabic source phrases and 29 stand near a word of presence and were read: candidates not taken, the feminine string of N65, the ruled form of N66, reference counts, options for the owner. Every candidate marked 'in the text' in N65 to N82 is in the text. Wordings the changes rest on as 'a reader's own' were looked up in the two readers' reports and stand there verbatim (`s5q-readers.mjs`): the first reader's «الاحساء میں شمال سے داخل ہونے والے راستے پر» and «الطرف نامی قصبہ»; the second reader's «جبل القارہ کا صفحہ دیکھیں», «مارے گئے», «الطرف نام کا قصبہ», «مگر ابھی یہ صرف تجویز ہے».

## Findings

1. [should-fix] calibration `N72`, guard (record only; no string need move) — the sentence round 2 added is not true of kanzan::summary
   - The guard now ends: 'Also for the proofreader: a bare name cited as a name stands in marks at every mention on its page; a name written with its generic stands bare.' Reported as that guard asks.
   - On shaban it holds, by script. «الشبعان»: 6 mentions — in marks 4 (summary «“الشبعان” جبل القارہ کا نام تھا»; body «“الشبعان” خود …», «“الشبعان” کے معنی …», «“الشبعان” کا نام اس پڑوسی ٹیلے …»), with its generic and bare 2 (the title; «جس پہاڑ کو جبل الشبعان کہتے ہیں»). «القارہ»: on shaban 8 — in marks 1 («“القارہ” کا نام»), inside the key «جبل القارہ» 7; on tuwaither 1, bare, the settlement in use (N77), which neither half of the rule speaks of. «ابا الکباری»: 2, both in marks. The counts N72 states (four and one) are right, and 'at every mention' is true of shaban since change 1.
   - On kanzan it does not hold. The summary has «جس کا ذکر تاریخ کی کتابوں میں کنزان کے نام سے ملتا ہے»: the name without its generic, spoken of as a name, with no marks — the same build as shaban's «“القارہ” کا نام» and «“الشبعان” کا نام». This file's own entry of «کنزان» describes it so: 'The name without its generic: in the summary («کنزان کے نام سے»)'. Unchanged since stage 5; neither source quotes the name there; neither reader remarked on it; kanzan's score reasons say 'no quotation mark'.
   - Elsewhere: the approved «بیت الملا کے نام سے بھی معروف ہے» (baiah) and b3's «مسجد البطالیہ کے نام سے», «رباط البوبکر کے نام سے» carry a generic and are covered by the ruling's 'a second name that carries an Urdu generic stays bare'. So kanzan's summary is the one string of the round the added sentence fails.
   - What is wrong: the ruling's own text speaks of 'the page's other cited names' (shaban); the guard states it of every page. As worded it makes a finding of a string no stage has faulted, and it would enter the termbase so.
   - Right, the smaller way: the guard's sentence limited to what was ruled — on a page that sets a bare name in marks as a cited name, every citing mention of that name on that page stands in marks; a name cited once with «… کے نام سے» on a page that marks it nowhere is not ruled here. The other way is one pair of marks in kanzan::summary («“کنزان” کے نام سے»), an edit no reader has asked for.

2. [should-fix] calibration `N65` (record and tools; no string moves) — 'The translation memory holds both strings, each with its gender named'
   - By script: `tm.json` has no pair for 'Open 24 hours' today. `stages/final.json` will write five pairs for it, all «24 گھنٹے کھلا رہتا ہے», with the keys `en, ur, page, field, date` and no `note` (of its 55 pairs only the five kickers carry one, 'translated from the Arabic'); `apply.mjs` writes `tm_pairs` as they are and has no code that adds a note. The feminine string «24 گھنٹے کھلی رہتی ہے» stands in no file but this ruling.
   - So after the apply the memory holds one string, five times, with no gender named, and the RUNBOOK's rule (reuse an approved pair verbatim when its English recurs) points a later stage 1 at the masculine one on koot-park, musa-park, stadium-park and salwa-beach (the four files whose source has the value, by script). The ruling's round-2 sentence ('each of the two pairs names its gender in `note`') describes pairs nobody writes. (`tm.json` does have a `note` key on 21 older pairs, and an `ar` key the sentence does not list.)
   - Right: either the sentence worded as work owed ('the coordinator adds the feminine pair and a gender note to both at the apply'), or the coordinator does so by hand and the sentence stays. Until one of the two, the binding text for the later pages is the ruling, not the memory.

3. [note] shaban, body, change 0 — «جو کبھی جبل القارہ کو گھیرے ہوئے تھے»: what the sources say was encircled
   - English: "'Al-Shaban' was a name of Al-Qarah Mountain itself: … Yaqut … recorded it as 'a mountain in Bahrain …', and it is said the name — 'the sated one' — came from the palms and waters that once encircled it." The 'it' is the mountain that bore the name, Al-Qarah Mountain. Arabic: «فكان «الشبعان» اسماً لجبل القارة نفسه؛ ذكره ياقوت … وقيل سُمي بذلك لأن النخيل والمياه أحاطت به من كل جانب حتى شبع» — the one that 'was so named' and was surrounded is the same mountain. Both sources: Jabal Al-Qarah. The judge is right, and the pack's reviewed divergence says the same.
   - What entered: the key, for a pronoun. What left: nothing of the English. The Arabic's 'on every side until it was sated' was not in the Urdu before and is not now; the English's 'once' stays («کبھی»). No fact moves.

4. [note] shaban, body, change 1 — the fourth «“الشبعان”» in marks
   - One pair of marks; nothing else moves. Every bare mention of a name cited as a name on the page is now in marks (the table is in finding 1). The sources quote 'Al-Qarah' and not 'Al-Shaban' in that sentence, so the Urdu now marks one name more than they do there: form (ruling N16, point 5), declared.

5. [note] shaban, body, change 2 — «… کے لیے جبل القارہ کا صفحہ دیکھیں»: 'famous' once, the name twice
   - Sources: 'For the caves and visiting details of the famous mountain, see the Al-Qarah Mountain page'; «ولمعرفة قصة كهوف الجبل الشهير وتفاصيل زيارته، انظر صفحة جبل القارة». What left: 'famous' of this sentence («مشہور» stands once on the page now, in the sentence before: «اس مشہور پہاڑ کے لیے»; the sources have it twice). What entered: nothing; the page is named by its title, as the source names it.
   - The seam: «جبل القارہ» twice in one sentence of twelve words, six times in a body of nine sentences, and in three sentences running (7 by name, 8 by description, 9 twice). Grammatical and unambiguous; heavy. The judge names it himself (note 8, note 9) and it rests on both readers' words; it is for the reader of this text.

6. [note] kanzan, body, change 3 — «اس میں شاہ عبد العزیز زخمی ہوئے»
   - Read whole: the key stands in two sentences running, once as a time ('in the reign of') and once as the man wounded; not twice in two clauses of one sentence. Who was wounded is now said where it is said. Sources: 'the King', «الملك» — a noun for the man named in the sentence before; the Urdu has his name for the noun. Nothing entered. The common noun 'king' is said nowhere on the page as a noun (it left in round 1); the title inside the key carries it. The first should-fix of the earlier proof is answered by its second remedy.

7. [note] kanzan, body, change 4 — «شہزادہ سعد مارے گئے» against 'fell' and «استشهد»
   - English 'fell': died in the battle. Urdu: 'was killed', in the honorific plural — the same fact, plainer in register. Arabic: 'was martyred' — the same fact with a judgement on the death that the Urdu, like the English, the German ('fiel') and the Chinese line, does not carry. Under ruling P19 the evaluative word may follow the English; nothing of the Arabic is imported and nothing is added. Ruling P28 (a source noun said through its components) is not what this word rests on and N78 does not cite it; no component is added here.
   - N78 as changed: A in the text, D withdrawn; the new ruling is quoted alike wherever it is cited (the entry, change 4, the entry of «شہزادہ سعد», source defect 3, notes 2, 5, 7 and 11, reader ruling 22, proof ruling 8), and the owner's option is one string in the two places that give it («ان کے بھائی شہزادہ سعد شہید ہوئے»). Change 4 names two earlier lines as following the English and the ruling three; all three do (read in the pack: none has a word for martyrdom).
   - Its cost is on record: to the first reader this word was blunt.

8. [note] arbaa, body and area, changes 5 and 6 — «الطرف نامی قصبہ» / «الطرف نامی قصبے کے قریب»
   - Does either source present the town as unknown? No: 'The town of Al-Taraf', «بلدة الطرف», definite in both. «نامی» gives the Urdu a light 'a town called …'. On this line that shade is the approved one for places the sources also treat as known: «سوق القیصریہ نامی بازار» (ameeriah, baiah), «الرویضہ نامی حصے» (b3, body and area line), «“ارض الحضارات” نامی ثقافتی گاؤں», «“بیت الثقافہ” (ثقافت کا گھر) نامی مقام», «شندل نامی لکڑی» (twice) — eight places by script, the number N73 gives. No fact enters; the word says only that what stands before it is a name.
   - Body and area line are equal in form, direct and oblique. N73 as re-worded is true of the text: the generic after the name, «نامی» between them at both mentions, «قصبہ» nowhere else on the site (0 in the applied pages, b3 and b4).
   - N73's two points against N61 and N77: consistent. Point 1 (order) binds every town; point 2 («نامی») binds this homograph and any later one raised as such; where both sources of a field are bare the case is raised (N61's `b5` field says the same; N77 is such a case, ruled bare, and «القارہ» is no homograph of a common Urdu word). One sentence is tighter in the guard than in the ruling: the guard says «نامی» stands 'at every mention' of Al-Taraf, the ruling that a mention bare in both sources is first raised; they agree only through the ruling's last clause.
   - Whether the reader now takes «الطرف» for a name at first sight is not a proof's to say.

9. [note] thulaim, summary and body, changes 7 and 8 — «الاحساء میں شمال سے داخل ہونے والے راستے پر» against 'at Al-Ahsa's northern gateway' / «عند مدخلها الشمالي»
   - The sources have a point (an entrance, 'at'); the Urdu has a way ('on the road that comes into Al-Ahsa from the north'), as stage 5 and round 1 had. Nothing entered with the edit: the road is the page's own («طريق الواحة الشمالي», two sentences on). «پر» reads 'on the road' in both fields — «راستے پر سب سے پہلا مقام», «راستے پر … کھڑا ہے» — as before.
   - The summary without «پڑنے والا»: whole, and nearer the source, which has no such word. 'Of Al-Ahsa's landmarks': «الاحساء» is in the phrase now as the place entered, not as the owner of the landmarks; 'landmark' is «مقام», as before.
   - The seam the edit makes: «شمال سے» now stands three times in the summary and the first two sentences («شمال سے داخل ہونے والے» twice, then «شمال سے الاحساء کے نخلستان میں آنے والے»), and sentences 1 and 2 of the body are built on the same participle frame. The threefold statement is the source's; the echo of the words is this round's. For the reader.

10. [note] thulaim, body, change 9 — «ایک الگ تھلگ چٹانی ٹیلہ ہے» against 'a solitary rocky formation' / «تكوين صخري منفرد»
   - The source's noun is 'formation'; the Urdu says 'hill' and keeps the adjective 'rocky', which round 1's «چٹان» had folded into the noun. The sentence now says of one thing: this mountain is a solitary rocky hill and one of the sedimentary desert hills — three nouns, as the source has three. «ٹیلہ … ٹیلوں» in one sentence is the sense, not a slip. The first reader offered the plural «چٹانی ٹیلے»; the singular here is the judge's inflection of it.

11. [note] thulaim, body, change 10 — «یہ العیون کے پہلو میں اور …»
   - 'Beside Al-Oyoun' is said as 'beside' again; the loss the earlier proof named is made good. «نخلستان کے کناروں پر» still ends the sentence before and «سڑک کے کنارے» stands in this one (one word, two senses, two sentences running): untouched by this round.

12. [note] thulaim, body, change 11 — «یہ تجاویز دی ہیں»
   - The particle that left rendered no word of either source once the Urdu had made two sentences of the source's one. Nothing left with it.

13. [note] thulaim, body, change 12 — «اسے الاحساء کے شمالی سیاحتی دروازے کے طور پر تیار کیا جائے» against 'to develop it as a northern tourist gateway for Al-Ahsa' / «لتطويره بوابةً سياحية شمالية للأحساء»
   - The verb of both sources is back, in the source's build ('as'). «تیار کرنا» is 'to make ready': nearer 'prepare' than 'develop', and it promises no works. 'A … gateway for Al-Ahsa' is said with the possessive; nothing is strengthened — it is still what people proposed. «دروازے کے طور پر» cannot be read as a gate to be built, which round 1's wording could.
   - In the batch the same source verb has three renderings and no ruled form: «تفریح گاہ بنا رہی ہے» (kanzan, 'is developing'), «تفریح گاہ بنا کر چلایا جائے» (tuwaither, 'to develop and operate … as'), «… کے طور پر تیار کیا جائے» (here). The judge weighed the third for tuwaither and kept the second (reader ruling 37); recorded, not a fault.

14. [note] thulaim, body, change 13 — «مگر ابھی یہ صرف ایک خیال ہے» against 'ideas that remain at the proposal stage' / «ما تزال في إطار الأفكار»
   - Number: the sources have proposals (plural) that are still ideas (plural); the Urdu has «تجاویز» (plural) and then «یہ … ایک خیال» (singular) — 'but so far this is only an idea', said of the one thing all the proposals propose. No fact changes; nothing is strengthened. Declared by the judge and counted under accuracy.
   - Two things a reader may or may not hear: «صرف ایک خیال» can also be taken as 'only one idea', set against the plural three words earlier; and item 3 of the role file asks for no «ایک» where the source means no number — here it is the idiom ('merely an idea'), not a count. The wording that keeps the sources' number in the same frame is «مگر ابھی یہ صرف خیالات ہیں». Left to the reader of this text; the second reader's own offer was a singular too.

15. [note] tuwaither, summary, change 14 — «چٹانوں اور ٹھنڈے غاروں والا ایک پہاڑ»
   - Scope: «ٹھنڈے» now stands directly before «غاروں» and after «اور»; it can no longer be read with «چٹانوں». No word entered or left; the source's order ('cool grottoes and rock formations') is reversed. The summary now opens on 'a mountain with rocks', the thinner of its two nouns ('formations' said as 'rocks' since round 1); declared and charged by the judge.

16. [note] small points of the record, none of which moves a string
   - The entry of «العیون»: 'since stage 7 (round 1) «یہ العیون کے پہلو میں اور … کے کنارے ہے» (round 2: the source's 'beside' restored; round 1 had «العیون کے قریب»)' — the sentence quoted is round 2's and is dated to round 1 before the bracket corrects it.
   - thulaim's nativeness reason and source defect 6 cite «شمالی سیاحتی دروازہ» / «دروازہ» in the direct case; the text has the oblique «دروازے». Citations of the word, not of the string.
   - Note 13 counts «چٹانی ٹیلہ» among 'a reader's own' wordings; the reader wrote the plural (finding 10).
   - Checked and right: 48 leaves equal to round 1 and 46 of them to stage 5; nine pairs of marks on shaban (summary 2, body 7) and one on arbaa; «جبل القارہ» seven times on shaban, six in the body; «شاہ عبد العزیز» twice; seven changes on thulaim; N67's six pages; the four later pages N65 names carry the value and no other untranslated file does.

17. [note] calibration `N66` — the exception, wherever the item is cited
   - True of the text: «100,000 مربع میٹر» stands once, in tuwaither::body, and is the one figure of one lakh or more in bare digits in the batch; reported with the item's id, as its guard asks. The ruling's form is A («1 لاکھ مربع میٹر»); the entry says the text differs from it by the coordinator's decision and why.
   - Every citation of N66 outside its own entry was read (16 citations in 11 places: tuwaither's compliance and fit reasons, notes 0, 3, 4, 5, 7 and 8, source defect 13, proof ruling 3, reader ruling 37): each either states the exception or only names the item in a list; none reads as if N66 ruled the digits. Source defect 13 now says so in so many words. No reader ruling is classed `open_item`.

18. [note] calibration `N82` — the narrowed guard, the text, the applied site, the month
   - The text: U+0670 once, after a final U+06CC, in «سلویٰ». By script over the Arabic of the five pages, «سلوى» is the only name ending in alif maqsura (the other such words are «على», «إلى», «حتى», «أخرى», «قرى» / «القرى», all translated); «ابا الکباری» and «یاقوت الحموی» end in ya in the Arabic and are rightly bare. The guard is true of the text.
   - The applied site (11 pages, 92 `_ur` lines, by script): combining marks are U+064B only (6); U+0670: 0; the one name whose Arabic has alif maqsura is «جمادى» in baiah's date, written «جمادی الاول»; no Urdu dictionary word of the kind the ruling excepts stands anywhere. The guard is true of the site, and no applied string is failed by it.
   - «جمادی الاول»: said the same way in the evidence, the ruling ('a settled Urdu form … NOT changed'), the binds ('Not the month'), note 3 and proof ruling 4. The guard itself does not name the month; it excludes it through 'a transliterated name built from its Arabic spelling', which the ruling defines. Consistent; a reader of the guard alone would want the three words 'not the month'.
   - Ruling P17 and open item N7: the ground is now the letter's identity, and N7's round-2 sentence says the same ('the mark it carries is the letter's, not a vowel sign').

19. [note] calibration, the other amended entries, read entry by entry
   - N65: confirmed on two readers; the cells are the masculine string; the choice rule is as the earlier proof found it testable. Its sentence on the memory is finding 2.
   - N72: finding 1. N73: finding 8. N78: finding 7.
   - N75: now says that N47's form is the summary's and that the body's is its own; true of kanzan. N77: bare, once, as both sources. N79, N81: round-2 sentences true of the text. N67: 'six pages', right.
   - N64, N68, N69, N70, N71, N74, N76, N80: evidence of the second reader added; rulings, binds and guards unchanged and true of the text.

20. [note] the three wordings the judge names as his own Urdu (note 13 of the file)
   - «… کے طور پر تیار کیا جائے»: finding 13 — correct, a little formal, 'make ready' for 'develop'.
   - «مگر ابھی یہ صرف ایک خیال ہے»: finding 14 — correct; the plural is said as a singular.
   - thulaim's summary without «پڑنے والا»: finding 9 — whole, nearer the source.
   - None says more than its sources; none has been read by a reader this pass has seen.

21. [note] what this pass ran and wrote
   - `check-s7.mjs b5 r2` rewrote `07-judge.round2.json.check.txt`; the judge file's hash is the same before and after. Written: this report and the `s5q-` files in `b5/`. The worktree, the termbase, `tm.json`, the round files of b3, b4 and b5 and `final.json` were read only. No web page was fetched and no build was run.

## Not verified

- No reading replaces a reader: findings 5, 8, 9 and 14 say what the text does and what earlier readers wrote, not how a new reader takes the fifteen edits. The blind report on this text was not opened.
- Register judgements («مارے گئے», «تیار کیا جائے», «ایک خیال», «نامی» as 'a town called') are this pass's own Urdu; no dictionary or press page was fetched, and none of the reference counts the entries cite was run again — what was checked is that the entries agree with each other, with the text and with the files of the round.
- That `apply.mjs` writes the five pairs of `final.json` as they are, without a note, was read in its code and in `final.json`, not tried on a copy.
- The glyph of U+0670 was not looked at again (the earlier proof saw it drawn from the shipped subset file, not on a built page or a phone).
- The build checks of the repository were not run; C46 was compared with the text by this pass's own counts.
- b4's round 2 was compared, not proofed. The source defects are the owner's and were not re-examined beyond the sentences round 2 added.
