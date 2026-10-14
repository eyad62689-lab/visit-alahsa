RESULT: must-fix=0 should-fix=1 note=8

Proof pass (stage-5 role, report only) on `b7/stages/07-judge.round2.json`: text (62 leaves, 6 pages), 6 changes over 4 leaves, 26 calibration entries (21 amended, 5 new: P3a, P3c-labels, N119, N120, N121), 34 termbase_final entries (all amended in their notes, one status). Nothing was modified. Checker run for reference: `RESULT [b7 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | 6 page(s), 62 strings, 6283 code points | changes=6 over 4 leaf(s) | scores 90/92/91/91/91/91 batch_score=90 threshold=90 decision=APPROVE | rulings=55 proof_rulings=11 | termbase_final=34 | selftest PASS`.

## Items

1. **should-fix** — calibration `N101`, ruling text (the repair of my round-1 finding 2). The list of the six titles now stands as the text has them, byte for byte (checked by script: all six are titles and termbase_final keys), and the guard's added clause is right. But the parenthesis after the list is garbled: «… «الکوت کی تفریح گاہ» (the last three words of kanzan-park's, mushaqar's and najm-park's titles as items N103, N112 and N117 word them)». "The last three words" of those titles means nothing here. Read as "the last three titles", it is also wrong: the last three titles in the list are mushaqar, kanzan-park and koot-park, and najm-park is not among them. So the entry still does not stand alone on the point the round meant to cure. SMALLEST CORRECTION, record only: «(kanzan-park's, mushaqar's and najm-park's titles as items N103, N112 and N117 word them)». No string moves.

2. **note** — koot-park · `body`, change 5, «یوں یہ باغ خود بخود محلے کے ورثے کے مقامات کے درمیان دم لینے کی جگہ بن جاتا ہے۔». In place it is sound: masculine with «باغ», verb present, no doubled word. «خود بخود» has no reading of nature, so it removes what both readers stumbled on, and it matches the Chinese line's 自然而然. WHAT ENTERED / LEFT: the source's 'natural' is an adjective of the pause, "a fitting, obvious place to stop" (AR «استراحة طبيعية»). «خود بخود» is an adverb of the becoming: "of itself, automatically". That pulls slightly against the sentence's own «یوں», "thus, because of the styling just described". A reader may hear "automatically", which is a little mechanical, but it misleads on nothing. If the next reader stumbles on it, a wording without the adverb sense would be «… دم لینے کی ایک موزوں جگہ بن جاتا ہے» ('a fitting place'). This is offered, not required.

3. **note** — mushaqar · `body`, change 2, «ایک روایتی بازار». It is right for EN 'a folk souq' / AR «سوقاً شعبياً» (the German line also wrote 'traditional market'). Count reproduced: 13 pages, HTTP 200, and 1 for the replaced wording. Two things for the record. (a) The same body later speaks of the ancient «سوق المشقر نامی بازار … جو زمانہ جاہلیت میں عربوں کے بازاروں میں سے ایک تھا». "Traditional" can invite the reader to take the park's bazaar as that fair revived, which neither source says. «عوامی» did not invite this. It is slight, and the blind read will show it. (b) 'Folk souq / folk market' recurs in the English of four pages not yet translated: `women-souq`, whose title is "Women's Folk Souq" and whose own body also says "a traditional stall market"; `qaisariyah` "folk markets"; `hamidiyah-souq` "a folk market"; `khalifa-museum` "a folk souq". If «روایتی بازار» is the line's rendering of 'folk souq', it should be recorded (a termbase note or a tm pair). Otherwise `women-souq` will need two English words, 'folk' and 'traditional', on one Urdu word.

4. **note** — kanzan-park · `body`, change 4, «تعمیر کے بقیہ مراحل بدستور جاری ہیں، …». It is applied as my round-1 finding 4 proposed: 'still' of both sources is back, «ابھی» stands once (in N99's predicate, which is byte-identical), the N109 guard holds, and the count is 31 (HTTP 200, reproduced). For the record, because the word is mine: «بدستور» belongs to the press register, and the second reader already called this sentence "office language" (cited in N109). The adverb may add to that impression. The fresh blind read on r2 is the test. No correction is proposed.

5. **note** — mushaqar · `body`, change 1, «اس جگہ کا نام زمانہ جاہلیت کے مشہور قلعہ المشقر کے نام پر ہے۔ قدیم عربی تحریروں میں اس قلعے کو “قلعہ ہجر” کہا گیا ہے۔». The grammar is right: oblique «قلعے» before «کو», and «کہا گیا ہے» in the default masculine. The pronoun is resolved to the fort, as both sources mean. The next sentence's «اس کا ذکر» now also reads as the fort. The cost, which the judge logged: «قلعہ» stands three times in two sentences, and the generic sits two words before a quoted name that begins with it. This is not a pleonasm by the letter of checklist item 2 (the generic is the antecedent of a naming verb; it does not follow the name). Item N7, the homograph, is not cured, as N7 says.

6. **note** — rulings that still restate the old letter "no bracket in a title", outside the two guards amended. (a) Termbase ruling `N70`, ruling A: "Ruling P3a governs a «جبل» name: no bracket, in title or body." Its binds ("every later «جبل» page whose source glosses the name") do not reach kanzan-park, whose bracket is a second name, not a gloss, and its guard defers to "the machine-read guards of rulings P3a and P3c as they are", which is now the amended P3a. So nothing binds the title wrongly. But read alone, the sentence contradicts the amended P3a. (b) `b0-ui` round 3 `P3c-labels`: "no bracket in a label or heading". b0-ui keeps to its own rulings, and b7's entry is the attraction batches'. One clause in N103's notes naming both would close the record.

7. **note** — calibration `N119`, internal consistency. Its "if yes" also changes the body: "where the body's first sentence names the park by its title, with the agreeing verb there following the gender the dictionary gives the loan" (today «… الاحساء کی قومی تفریح گاہ پھیلی ہوئی ہے», feminine; the loan «پارک» would take the masculine). Its `binds` and `strings_affected` name only `national-park::title` and the key. They should also name `national-park::body`, so that the owner's answer carries its whole reach. N119's guard is machine-read: the clause "«…» is not an admitted loan" is among those `lib/rulings.mjs` reads. Its counts stand in `b7/s7-web.wiki.out.txt` with HTTP 200: 1306 / 701 / 1. N120 and N121 agree with the text and with their guards. The text has A of each: «زراعت کی وزارت کے ایک منصوبے سے»; the title «الکوت کی تفریح گاہ» with «24 گھنٹے کھلی رہتی ہے». N65's two strings are quoted byte for byte. asfar's «ماحولیات، پانی اور زراعت کی وزارت» stands in the worktree, so the "not retired" reasoning holds.

8. **note** — `termbase_final` «اسٹیشن», note. The round-1 segment was re-quoted in place. It now reads "the text since round 1 in the oblique plural, «تین اسٹیشنوں اور 1,500 میٹر لمبے راستے والی کیبل کار»", but round 1's text had «1,500 میٹر لمبے راستے اور تین اسٹیشنوں والی کیبل کار». My round-1 finding asked for the quotation to change, and "since round 1" is now untrue history. The round-2 segment says it right ("Since round 2 …"). The «کیبل کار» note re-quotes in the present tense ("In the text: …"), which is harmless. Record only.

9. **note** — for the coordinator, at apply. The amended P3a and P3c-labels in this file use the judge-file shape (`question`, `ruling_or_recommendation`, `evidence`, `status`, `strings_affected`). The termbase entries have `title`, `ruling`, `binds`, `guard`, `ruled_by`. `apply.mjs` merges `ap-meta.json` rulings by id (it replaces in place), so the amended guards reach the termbase only if `ap-meta.json` carries P3a and P3c-labels in the termbase shape. The amendment of both is the GUARD (plus a trailing segment of `ruling`, `binds` and `ruled_by`). By script, each R2 `question` equals its TB `title`, and the head before « ‖ » of `ruling_or_recommendation` and of `binds` equals the TB field. Otherwise the next batch's proofreader reads the unamended guard and finds kanzan-park's title against it.

## The amended guards P3a and P3c-labels (asked specifically)

- **P3a.** By script, `question` = TB `title`, ruling head = TB `ruling`, binds head = TB `binds`, `ruled_by` extends TB's. The guard differs from TB only in its final clause: «والعنوان لا يحمل قوساً أبداً.» becomes the exception (Arabic), followed by an English rendering. The Arabic and the English say the same five things. Both source titles close with a bracket. The Urdu title closes with ONE pair. Only that name is inside the pair. The whole title is a termbase key, byte for byte. No gloss and no Urdu generic in a bracket in a title, and no bracket directly after a jabal name. The ruling's subject (a gloss of a generic that is an Urdu word) is untouched, as its evidence says.
- **P3c-labels.** Same checks. The guard inserts only ", save the one case of item N103 of b7 — …", and its tail is unchanged.
- **Against N103 and the probe.** N103's guard words the same conditions. The probe in `tools/lib/textcheck.mjs` (lines 204–209) tests exactly them: slot = title, both source titles closing in a bracket, `^[^()]+ \([^()]+\)$`, the whole string a key. The guards' prose is not machine-read; the probe is hard-coded, and the guards say so. One difference that does not matter: round 1's N103 guard said the bracket holds the name "as its termbase key"; round 2 says only "that name". «الشعبہ» is a key, so nothing turns on it.
- **The title as its key, byte for byte.** «جبل کنزان کی تفریح گاہ (الشعبہ)»: code points `62c 628 644 20 6a9 646 632 627 646 20 6a9 6cc 20 62a 641 631 6cc 62d 20 6af 627 6c1 20 28 627 644 634 639 628 6c1 29`. It is a `termbase_final` key: true. Every quotation of it in P3a (twice), N103 (twice) and N101 is equal to the title. The other quoted forms in N103 are the candidates and fallbacks («جبل کنزان / الشعبہ کی تفریح گاہ», «الشعبہ / جبل کنزان کی تفریح گاہ», …), named as such. The key's note is corrected on its gender ("not exercised"), as my round-1 finding 9 asked.

## The previous proof's items: repaired as proposed, nothing else moved

- 1 (must-fix): applied verbatim, change 3. The new clause «ان میں تین اسٹیشنوں اور 1,500 میٹر لمبے راستے والی کیبل کار بھی شامل ہے اور دو جھیلیں بھی۔» is word for word my proposal. N106 (ruling and guard) and the notes of «کیبل کار» and «اسٹیشن» quote it (item 8 for one stale tense).
- 2: N101 cured, except item 1.
- 3: «کیبل کار» is `pending`, and N106 says why.
- 4: applied, change 4.
- 8: N118 names four pages.
- 9: both notes corrected.
- 5, 6, 7, 10, 11: ruled as the findings allowed (7 applied as change 5).
- Only the 4 leaves of the 6 changes differ from round 1 (script diff of all 62 leaves). The replay passes (checker: changes=6 over 4 leaves, 0 extra).

## The eleven-item checklist (whole text; changed leaves read in place)

- 1 letterforms: **none**. Zero U+064A, U+0643, U+0629, U+0647, U+0649, U+0623, U+0625, U+06C3, and also zero U+06D5, U+06C0, U+06C2, tatweel, presentation forms, ZWNJ/ZWJ, NBSP and odd spaces. Checked over the 62 leaves, the 6 `before`/`after` strings and the 34 `termbase_final` keys, by `b7/s5p2-scan.mjs`. U+06BE only after aspirates. The only combining mark is U+064B twice, in «تقریباً» (unchanged from round 1). Character set identical to round 1's. PASS.
- 2 name forms: every name is byte-identical to its key; inflected forms «جواثا کے جنگل» and «قلعے» are recorded or generic. No Latin letter, no pleonasm (item 5), no banned variant, no retired key (the checker reads 11). PASS.
- 3 grammar: «آغاز … کیا گیا» masc.; «اس قلعے کو … کہا گیا ہے»; «تین اسٹیشنوں اور … لمبے راستے والی کیبل کار … شامل ہے» (oblique forced before «والی»); «مراحل بدستور جاری ہیں» plural; «یہ باغ … بن جاتا ہے» masc. PASS.
- 4 address: no «تم», «تو», «تمہارا», «تیرا» or «آپ» in the batch. PASS.
- 5 headings: no final stop; one bracket in a title (kanzan-park), now under the exception of N103 / P3a / P3c-labels. PASS.
- 6 termbase compliance: PASS (statuses: «کیبل کار» and «اسٹیشن» both pending).
- 7 punctuation: the four changed leaves keep «۔» at every sentence end and «،» only between Urdu words. No space before a mark, no double space, no Latin comma outside a figure, quotation marks balanced. PASS.
- 8 numbers: «1,500» and «بیس لاکھ» unchanged in value; no figure entered or left (checker 0 NUMBER). PASS.
- 9 loans and register: no new loan. «موجود» does not occur, and there is no verbal-noun/passive chain («کا آغاز … کیا گیا» is the source's 'launched', not a chain of the banned kind; the checker flags 0). PASS, with item 4 on register.
- 10 glossing: unchanged. «سوق المشقر نامی بازار» and the market generic «بازار» in «روایتی بازار» (a common noun, not a name). PASS.
- 11 structure: 62 leaves in pack order, no source key. PASS.

## Meaning of the six edits against EN and AR

- 0, national-park: «اسی تفریح گاہ کی حدود میں جواثا کے جنگل کا آغاز نمک برداشت کرنے والی مقامی اقسام کے بیس لاکھ درختوں سے کیا گیا۔» EN 'was launched with two million trees of salt-tolerant native species', AR «دُشّنت … بمليوني شجرة». «سے» is the postposition of means, in the ordinary frame «X کا آغاز Y سے کیا گیا». Nothing entered or left: still launched, still two million in words, still salt-tolerant native species, nothing said of planting or date. The name now comes before the long description. The judge admits his exact-string count (1 page) is not the frame, and the frame is ordinary journalistic Urdu. Sound.
- 1, mushaqar: pronoun → noun (item 5). EN apposition and AR relative both tie the second name to the fortress. Correct.
- 2, mushaqar: «عوامی» → «روایتی» (item 3).
- 3, kanzan-park: order only (my proposal).
- 4, kanzan-park: «بدستور» = 'still' of both sources (item 4).
- 5, koot-park: «قدرتی طور پر» → «خود بخود» (item 2).

## Guarded claims and statuses, field by field against the pack

The changed leaves carry no guarded claim (C30 is on jawatha-park, unchanged). Kanzan-park's statuses are intact in the changed body: «بنا رہی ہے» (being built); «2022 کے اواخر میں … جزوی طور پر کھول دیا گیا»; «جن حصوں کا اعلان ہو چکا ہے» (announced, no finite 'exists' for the cable car or the lakes); «بدستور جاری ہیں»; «کی تصدیق ابھی باقی ہے» (N99's predicate, unchanged). Nothing is softened or added. All other cards and statuses are byte-identical to round 1, which I checked field by field against the pack in my round-1 pass.

## Shared sentences (script, `b7/s5p2-shared.mjs`, against b6 `final.json`, the worktree's `_ur` lines and tm.json: 662 sentences)

No changed sentence was shared before or is shared now. Every shared string of round 1 is still identical: the kicker ×6; «اوقات», «فیس», «داخلہ مفت»; jawatha-park `faq[3].a` = jawatha-mosque; koot-park's «سوق القیصریہ نامی بازار» sentence and `area` = baiah. None of «روایتی بازار», «خود بخود», «بدستور» or «قدرتی طور پر» occurs on an approved page or in b6, so the new words contradict no approved choice.

## Verified

- ur.wikipedia counts reproduced by me from HTTP 200 answers (`b7/s5p2-wiki.mjs`): «روایتی بازار» 13, «عوامی بازار» 1, «خود بخود» 458, «بدستور جاری» 31, «اس قلعے کو» 61, «درختوں سے» 116. All equal to the judge's.

## Not verified

- No build was run (C30, C61, C62, C12/C13, C65 not executed on dist).
- The blind readers' reports were not read, to keep this pass independent. The reader quotations inside the calibration evidence (N119, N120, N121, N7 and others) are taken as the judge quotes them.
- Scores, `blind_reader_rulings`, `source_defects` and `notes` were not proofed beyond the stale-quotation search.
- Dictionary pages were not re-fetched.

## Cells checked

- Changed leaves, each read whole in place with the sentences before and after: national-park `body` (change 0), mushaqar `body` (changes 1, 2), kanzan-park `body` (changes 3, 4), koot-park `body` (change 5).
- All 62 leaves were scanned by script and diffed against round 1 (only these 4 differ).
- Calibration: the 21 amended entries field by field (`b7/s5p2-fdiff.mjs`), and the 5 new entries read whole.
- termbase_final: the 34 entries field by field.
- Stale quotations of the replaced wordings were searched across calibration, termbase_final, notes, proof_rulings, blind_reader_rulings and source_defects (`b7/s5p2-stale.mjs`). Only historical candidates or segments quote them, except item 8.

Helpers (all in `b7\`, prefix `s5p2-`): `s5p2-dump.mjs`, `s5p2-pack.mjs`, `s5p2-fdiff.mjs`, `s5p2-guards.mjs`, `s5p2-stale.mjs`, `s5p2-shared.mjs`, `s5p2-scan.mjs`, `s5p2-n101.mjs`, `s5p2-brk.mjs`, `s5p2-newitems.mjs`, `s5p2-wiki.mjs`. Outputs are in `b7\s5p2-out\`.
