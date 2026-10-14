RESULT: must-fix=0 should-fix=1 note=6

Proof pass (stage-5 role, report only) on b10 judge round 3 (`stages/07-judge.round3.json`, sha256 a55b632b7d6d3426…). Nothing in the batch, the worktree or the tools was modified. Previous text: `07-judge.round2.json`. Pack: `b10/pack.json`. Rulings in force: the worktree termbase, `b0-ui/stages/07-judge.round3.json`, `b9/stages/07-judge.round1.json` and its addendum. Helper scripts (read-only): `b10/s5p3-dump.mjs`, `s5p3-caldiff.mjs`, `s5p3-scan.mjs`, `s5p3-q.mjs`, `s5p3-verify.mjs`, `s5p3-cal.mjs`, `s5p3-extra.mjs`. Their outputs are in `b10/s5p3-*.txt`.

Checker (re-run, `node check-s7.mjs b10 r3`), verbatim: `RESULT [b10 07-judge round 3]: 0 mandated, 0 extra, 0 ruling finding(s), 2 note(s) | 6 page(s), 47 strings, 3991 code points | changes=2 over 2 leaf(s) | scores 93/94/95/93/93/92 batch_score=92 threshold=90 decision=APPROVE | rulings=48 proof_rulings=9 | termbase_final=19 | selftest PASS`. The 2 NOTEs are P20 on duqat-algharash::area and taraf-zoo::area. Both follow the N30 order, which N153's guard expects.

Replay and identity: r2 and r3 both have 47 leaves. Exactly two differ: sawsan-gardens::summary and sawsan-gardens::body. Each `before` occurs once, and replaying the two changes on r2 gives r3 exactly. Summary and body are still one string (78 code points). The clause from «جہاں» to the stop is byte-identical to `05-proofreader.json` (script assertion), so the judge's "stage 2–5 clause byte for byte" is verified. The blind page `blind-input.on-r3.md` carries `stage_sha256` equal to this file's sha256. All 47 rendered leaves (kickers aside, as none is featured) stand verbatim in it. The new clause appears twice and round 2's «رکھے ہیں» appears 0 times.

## Special check (a): termbase_final keys that already exist in the worktree
Two of the 19 keys exist in the worktree termbase. The other 17 are new. Each existing key was compared field by field (`s5p3-scan.mjs`):
- «حساوی لیموں کا باغ»:
  - Same: ar, en, gender (مذکر), plural, kind, gloss and status (pending).
  - `source`: the worktree text stands verbatim as a prefix, and one STAGE 4 line is appended (+76 chars).
  - `note`: the worktree text stands verbatim as a prefix, and the b10 lines are appended (+1191 chars).
  - Kept: the press «’لومی حساوی‘», the rekhta «لِیمُوں — اسم، مذکر» and «باغ — اسم، مذکر», ur.wikipedia «لیموں کے باغات» 2 pages, the three b0-ui readers, and "Masculine by «باغ» (dictionary page)".
  - Apply loses nothing. Round-2 should-fix 2 is cured.
- «فارم»: every field is identical except `note`. The note keeps the worktree text verbatim as a prefix, with the round-2 and round-3 lines appended (+726 chars). The P16 evidence and the gender basis («بڑے فارم کی», «اپنے زرعی فارم کا») are kept. Apply loses nothing.
- No key, gender or plural changes. No `termbase_keys_retired` appears in b0-ui r3, b9 r1 or b10 r1–r3. All 19 keys stand in the text.

## Special check (b): the judge's `node -e` edit, scanned for damage
I scanned every string and key of the file (`s5p3-scan.mjs`). Results:
- U+FFFD: 0. Latin-1 mojibake of Arabic script (Ø/Ù/Ú/Û + byte): 0. Ã/Â sequences: 0. C1 controls: 0. Raw EF BF BD bytes: 0, and the file has no BOM.
- Zero-width or bidi marks: 0. NBSP: 0. «?» next to Arabic script: 0. A letter tripled: 0.
- Question marks: 10 in r2, 11 in r3. The new one is a legitimate quotation inside N168's evidence ("aviary or occasional show?").
- Backslashes: 0 in r2, 5 in r3. All five are in N161 (item 1).
- Every Urdu form the round-3 records quote matches the text or the worktree byte for byte. Examples: «پرندے … نمائش کے لیے رکھے گئے ہیں» in N168's guard, and «زرعی فارم اور کھجور کے باغات» in N161 and the «فارم» note. The 22 «…» spans that contain Arabic letterforms are all Arabic source quotations (titles, «أجواء», «حديقة لعرض الطيور», …). None of them is an Urdu form.

## Eleven-item checklist (r3 text, all 47 leaves, scanned with my own script; the 2 changed leaves read in place)
- 1 Letterforms: PASS. The scan for `[يكةهىأإۃ]` over all 47 leaves finds none. There are also no U+0660–0669 or U+06F0–06F9 digits, no NBSP, no zero-width mark and no Latin letter. Code points of the restored word: «گئے» = U+06AF U+0626 U+06D2. The rest of the clause is as in r2: «رکھے» has ھ U+06BE as an aspirate after ک, and «ہیں» is U+06C1 U+06CC U+06BA. The stop is U+06D4.
- 2 Name forms: PASS. All six titles are termbase keys byte for byte. No retired key appears, and the edit touches no name.
- 3 Grammar: PASS. «پرندے … رکھے گئے ہیں»: direct masculine plural subject, masculine plural passive perfect. The agent is unexpressed, which is normal for the passive. «ماحول میں» is oblique masculine.
- 4 Address: PASS. There is no «تم/تمہارا/تیرا» and no «تو».
- 5 Headings: PASS. No title, kicker or label ends in «۔», and no title carries a bracket.
- 6 Termbase compliance: PASS (100 %).
- 7 Punctuation: PASS. No ASCII punctuation follows an Urdu letter, and no space stands before «۔ ، ؟». There is no «؛», no guillemet and no straight quote. The summary, body and FAQ answers close with a stop, and no card value does.
- 8 Numbers and clock: PASS. Nothing changed. The sawsan card reads «روزانہ سہ پہر 3:30 بجے سے رات 10:30 بجے تک» = 'Daily 3:30–10:30 pm'.
- 9 Loans: PASS. The edit brings no loan. «فضا», «منزل», «موجود», «روڈ», «ورکشاپ», «ریسٹورنٹ», «پارک», «ملین» and «بلین» all occur 0 times.
- 10 Gloss: PASS. Unchanged from r2.
- 11 Structure: PASS. The checker's shape holds and no source key is present.
- Doubled-word probe: «طرح طرح» (taraf-zoo body) and «ساتھ ساتھ» (taraf-zoo body, hamidiyah-souq body and faq[2].a) are idiomatic reduplications, not doubled words.

## The changed string read in place
- sawsan-gardens::summary = body: «الاحساء کے نخلستان کے ماحول میں ایک باغ، جہاں پرندے نمائش کے لیے رکھے گئے ہیں۔»
  - The seam «ایک باغ، جہاں …» is unchanged.
  - The clause agrees in gender and number.
  - No word repeats in the sentence.
  - N47's «الاحساء کے نخلستان» and N166's «ماحول» are kept.
- Cells checked:
  - The title «السوسن کے پرندوں کے باغات»: oblique «پرندوں» there, direct «پرندے» here; both correct.
  - The eyebrow «زرعی فارم اور کھجور کے باغات».
  - The card.
  - The kicker «زرعی فارم اور کھجور کے درخت»: not rendered.
- Ruled forms across pages: N168 binds sawsan only, and «رکھے/گئے» occur nowhere else in the batch. On approved pages the stative «رکھے ہیں» (dar-alturath, ahsa-house-museum, najim-museum) and «رکھی ہیں» stand. The passive «رکھے گئے ہیں» stands on none of them. That is a different frame, not a conflict: N168 now rules D for this page only.
- Shared sentences with the sister batch b9: 0 (script). Phrases shared with approved souq pages: «روایتی بازار», «سوق القیصریہ نامی بازار» and «مطعم شرق نامی» are unchanged since r2.

## Meaning of the edit (against EN and AR)
- EN: 'A garden for displaying birds amid the atmosphere of the Al-Ahsa oasis'. AR: «حديقة لعرض الطيور وسط أجواء واحة الأحساء».
- What entered: «گئے», the passive auxiliary. The clause now reads 'where birds have been placed/kept for display', which carries the source's purpose («لعرض»). No event is implied.
- What left: round 2's agentless stative «رکھے ہیں», which the third reader found odd.
- 'Kept' explicates what displaying entails. No fact is added: no species, no cages, no times.
- Faithful. It is the wording the first reader read (with «فضا», since replaced) and the verb the third reader asked for. The whole sentence in exactly this combination is unread, as the judge says. The fresh reader is its test.

## Guarded claims (field by field against the pack)
- sawsan-gardens: the pack has summary = body ('A garden for displaying birds …') and one card row, 'Daily 3:30–10:30 pm' (verified). It has no area, bestTime, fee or FAQ. The Urdu supplies none of these.
- The other 45 leaves are byte-identical to r2. The r1 and r2 proofs checked them against the pack. No status moved.

## Round-2 proof items, as round 3's `proof_rulings` say
- 1: done. N155 now carries the proof's sentence exactly.
- 2: done. See check (a). The citation in the appended line is garbled (note 3).
- 3: done. The «فارم» round-3 line supersedes the base clause.
- 4: done. N168's evidence cites dar-alturath, and the guard no longer calls the birds the subject.
- 5: done. N166 and N167 now say "since round 1".
- 6: done in substance. N161 drafts the N5 line, but with corrupted characters (item 1).
- 7: done. N156 R3 says the fallback was B, and the N157 and «الطرف کا چڑیا گھر» lines say the stage-4 'B … the fallback' is superseded.
- 8: done. The «اسٹرابیری» round-3 line withdraws the base clause. N155's own `stage4_recommendation` still carries it (note 4).
- 9: recorded. The arithmetic holds:
  - 29+26+19+9+10=93
  - 29+26+19+10+10=94
  - 30+27+18+10+10=95
  - 29+25+19+10+10=93
  - 29+25+19+10+10=93
  - 29+25+19+9+10=92
  - Batch score 92 (the lowest page); APPROVE.

## Calibration, entry by entry
- Every id has a status: P4 and BRAND untouched; N151–N161 and N166–N168 ruled.
- Each R3 line agrees with its guard and its readers. I spot-checked the cited items against `06-blind-reader.on-r2.md`: 8, 11 (minor, factory), 14, 16, 26 (minor), 27, 32, 35 and 45 (minor) are cited correctly.
- N168: the candidates, evidence, ruling (D) and guard («… رکھے گئے ہیں») agree with each other and with the text.
- N161: ruling C, scope and the drafted line agree with the «فارم» note, apart from the corrupted characters in item 1.

## Items
1. Should-fix, special check (b): N161's drafted line has character damage from the `node -e` edit.
   - Where: `calibration` N161 `ruling_or_recommendation`, in the "LINE DRAFTED FOR N5" span.
   - What: five stray U+005C backslashes, `source\'s \'palms\' by this ruling\'s own … the group\'s word`.
   - Cause: `s7r3-build.mjs` line 183 writes `\\'` inside a double-quoted JS string, which leaves a literal backslash before each apostrophe. Round 2 had no backslash anywhere in the file.
   - Why it matters: this line is drafted to be copied verbatim into N5 through the coordinator's ap-meta. Copied as it stands, it puts five backslashes into the termbase `_meta`.
   - Nothing else in the file is damaged: U+FFFD, mojibake, stray «?», zero-width and doubled letters are all 0.
   - Cure (record only, no string moves): replace each `\'` with `'` (five places) in N161. Do it from a script file, not `node -e`.
2. Note, special check (a), PASS: «حساوی لیموں کا باغ» and «فارم» keep every worktree field.
   - Where they differ, the worktree value stands verbatim as a prefix of `source`/`note`.
   - Apply's whole-entry replacement therefore loses no evidence and no gender basis.
3. Note, «حساوی لیموں کا باغ» note, round-3 line: "(proof on round 2, finding 1 of should-fix 2)" is garbled. The source was proof-on-r2 item 2 (should-fix). Write "(proof on round 2, item 2, should-fix)". Record only.
4. Note, N155 `stage4_recommendation` still ends "pending until a blind reader has read it".
   - The «اسٹرابیری» term note's round-3 line withdraws that reading of P16-test (2). N155's own round-3 line does not.
   - Read alone, N155 keeps the old condition. The field is historical, so it is enough to add "(that clause withdrawn in round 3; see the term note)" to N155's round-3 line. Record only.
5. Note, N168's evidence and ruling say D was "understood" by the first reader ("the only form one reader understood as meant").
   - On-05 item 28 says only that «پرندے نمائش کے لیے رکھے گئے ہیں» is "stiff" and that nothing says which birds. He made no meaning complaint, but he never paraphrased the clause.
   - "Read with no complaint on meaning" would be exact. The ruling does not depend on the difference.
6. Note, the N5 apply line covers the farm label only.
   - The worktree N5 also says "The lime farm keeps «باغ» in its name until the round that writes its page settles the name (entry pending)". N154 A has now settled this.
   - The coordinator's ap-meta should append that settlement to N5 as well. Otherwise N5 keeps a clause that points to a round that has already happened. Record only.
7. Note, the «فارم» `source` (worktree verbatim, unchanged) quotes the Urdu Lughat headword with an Urdu-Indic digit «۱.».
   - It is a dictionary quotation in a record, not text, and it is already in the worktree. Nothing to do.
   - Recorded so that a later full-file digit scan does not flag it as new.
