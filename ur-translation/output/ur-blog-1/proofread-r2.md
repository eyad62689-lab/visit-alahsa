# Proofread r2 — ur-blog-1 (judge round 2)

**Totals: 0 MANDATORY, 1 RECOMMENDED.**

Scope: `judge-r1.json` (the text before this round) against `judge-r2.json` (9 `judge_edits` in 5 keys, rulings N795–N797, `termbase_additions`, `termbase_notes`, `tm_pairs`, `notes`). No error that must be fixed before the text ships was found. The three MANDATORY items of proofread r1 (M1 existing keys, M2 gender of «بے لاگ», M3 second Al-Mulla key) are all settled in the record; see below.

## Diff confirmation

- `strings` has the same 43 keys in the same order in both files.
- Exactly 5 keys differ: `24-hours.body`, `48-hours.description`, `48-hours.faq.1.a`, `48-hours.body`, `worth-visiting.body`. These are exactly the keys of the 9 `judge_edits`. There is no silent change.
- I applied the 9 `before`→`after` pairs in order to the `judge-r1.json` strings. Each `before` occurs exactly once at the moment it is applied, and the result equals the judge's `strings` byte for byte. Nothing changed inside a key beyond the 9 edits.
- `notes`: the first 57 are identical to `judge-r1.json`, followed by 9 `[j2]` notes. `judge_edits_r1` and `blind_reader_rulings_r1` equal r1's `judge_edits` and `blind_reader_rulings`.

## Mechanical checks on the 5 changed keys (and a scan of all 43): PASS

- **Letterforms.** The regex `[يكةهىأإۃ]` finds nothing in any of the 43 strings. No U+00A0, no ZWNJ/ZWJ, no U+06F0–06F9 or U+0660–0669, no `؛`, no `«»`, no straight `"`, no U+2013/2014.
- **Punctuation.** `“ ”` are balanced in every string. No double space and no space before `۔` or `،`. No heading ends in a stop. Every non-heading line of the three bodies closes with `۔` or `؟`. `48-hours.description` and `48-hours.faq.1.a` close with `۔`.
- **Length.** `48-hours.description` is 155 code points (the judge's figure), inside the 110–160 window.
- **Markdown (the three bodies), before and after:**

| body | H2 | H3 | `- ` items | bold pairs | links | newlines |
|---|---|---|---|---|---|---|
| 24-hours | 5 / 5 | 0 / 0 | 6 / 6 | 4 / 4 | 12 / 12 | 28 / 28 |
| 48-hours | 3 / 3 | 7 / 7 | 3 / 3 | 6 / 6 | 14 / 14 | 40 / 40 |
| worth-visiting | 4 / 4 | 0 / 0 | 5 / 5 | 13 / 13 | 13 / 13 | 30 / 30 |

  The counts are the same in r1, r2 and the English source. The list of link texts and targets is identical, in order, in r1 and r2 for all three bodies (the lemon-farm link only moved inside its sentence). The only bold text that differs is the intended «الاحساء پہلی بار جا رہے ہیں؟».
- **Published names and siblings.** The lemon-farm link text «حساوی لیموں کا باغ» and its target `/ur/attractions/lemon-farm/` are unchanged. «مدرسہ امیریہ» and its target are unchanged. «کھانے پینے کی جگہیں» and «الاحساء کے پکوان» (N792 form: class word outside the marks, link inside) are unchanged. «میرے محفوظ کردہ مقامات» and «سفر کا منصوبہ بنائیں» are unchanged.
- **Facts, edit by edit, against `en` and `ar`:**
  - `48-hours.description`: only «اس کے» dropped. EN "its water" is carried by the body. Nothing added.
  - Comma before «اور آپ کو» (`24-hours.body`, `48-hours.faq.1.a`): now equal to the 48-hours form. `48-hours.faq.1.a` still stands alone.
  - Lime sentence: condition, link, "late afternoon" and "when the heat eases" are all kept (EN and AR: the late afternoon is for the farm). The season and the Hasawi-lime wording are unchanged. «اس باغ میں» names the farm by its own noun. The EN and AR say "where" the visitors pick the lime. N794 holds (no «لومی»), and the fee/permission silence is untouched.
  - Amiriah school «ہے» → «تھا»: only the tense changes. The year (1937), the name and «ثقافت کا گھر» are kept, and the "now" is carried by «اب». The AR is a noun phrase («أول مدرسة … ومبناها … اليوم»), so the past against «اب» is a legitimate reading.
  - `worth-visiting.body`, «احوال» → «تفصیل»: «تفصیل» is feminine and «ملے گی» agrees. The EN "cover the table" gains no content. The list after the colon is unchanged.
  - «آ رہے» → «جا رہے» (two bodies): the question and the answer «وہاں پہنچنے» now stand on the traveller's side. EN and AR have no direction. No TM entry or `ref.json` sibling contains the pair (searched «پہلی بار», «آ رہے ہیں؟», «جا رہے ہیں؟»).
- **Agreement and address in the edits.** «رکھیں» is honorific. «دیکھنے کے لیے … رکھیں» is correct. «سیاح … توڑتے ہیں» is m. pl. The other edits keep the earlier agreement.
- **N797.** «حساوی لیموں کا باغ» is not followed by a postposition anywhere in the 43 strings (regex over the name, with and without the link tail). Not followed by any postposition after the move.
- **N795.** Every first mention of «سوق القیصریہ» in a unit still carries «نامی بازار»: `24-hours.description`, `24-hours.faq.0.a`, `24-hours.body`, `48-hours.body`, `worth-visiting.body`. Headings, `faq.1.q` and `faq.1.a` («سوق القیصریہ کی دکانیں») are bare under points (3) and (4).
- **N796.** «چاشت» occurs six times: `24-hours.description`, `24-hours.faq.0.a`, `24-hours.body` ×2 (the H2 and «چاشت کی روشنی»), `48-hours.body` ×2 (the two H3s). The ruling now says "six places" and names `24-hours.title` as having none, which matches.

## Record checks

- **Rulings.** The new ids are N795, N796 and N797, in the judge range (pack `ids.judge` = 795). All are absent from the termbase (highest existing id N755) and from N790–N794. The round-2 `rulings` array has the same three ids. N797 is byte-identical to r1. N795 differs only in `evidence` (the second reader's #2 and the candidate forms A/B, "neither settled"). N796 differs in `binds` and `ruling` (the count of six, and `24-hours.title` removed), which is proofread r1 recommended 2. No ruling has a `guard` field, so no automatic guard is added. `base_amendments` is `[]` and `withdrawn` is `[]`: no stage-4 ruling is overruled, and N796 builds on N602 and does not contradict it. `owner_questions` is `[]`.
- **`termbase_additions`: 6 entries** (العلا, تاریخ اشاعت, آخری ترمیم, مختصر قیام والا سیاح, حرف آخر, بے لاگ). Each has `en`, `ar`, `ur`, `gender`, `source`. Searched against the 543 termbase keys (exact key, substring, same `ar`): none exists. The only partial hit is «سیاح» inside «مختصر قیام والا سیاح», a derived phrase with its own meaning, not a duplicate. The composite key is now two entries (both feminine). «العلا» has `kind: toponym`.
- **«بے لاگ» gender.** It is now «مذکر/مؤنث (invariable adjective, agrees with the noun it qualifies)», in the form of the existing «شریک حیات» entry. M2 settled.
- **`termbase_notes`** (new field, 4 notes on «سفری منصوبہ», «چاشت», «پڑاؤ», «شیخ عبد الرحمن بن عمر بن محمد الملا»). All four keys exist in the termbase byte for byte. M1 and M3 settled: the three existing keys and the second Al-Mulla key are no longer in `termbase_additions`. The «چاشت» note counts six places, and the Al-Mulla note states N665's unmet "attested" condition and the licence.
- **Dry run.** `node output/ur-plan-1/merge-memory.mjs REPO output/ur-blog-1 judge-r2.json` (no `--write`) prints `termbase +6 (pending)، أحكام 446 (+3 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1665 → 1708`. The `ur-dining-2` variant, which also reads `termbase_notes`, prints the same line. `verify.mjs ur-blog-1 judge-r2.json` prints `OK … 43 strings, 6 termbase additions, 66 notes`.
- **Web claims in the additions.** I re-fetched three of them and each answers HTTP 200: rekhtadictionary.com `meaning-of-padaav`, `meaning-of-be-laag`, `meaning-of-harf-e-aakhir`. I also re-fetched ur.wikipedia `العلا`: HTTP 200. I did not read the page contents.
- **`tm_pairs`:** 43, one per string, no duplicate, no extra, page `blog`. Each `ur` equals the final `strings` (the five changed keys included) and each `en` equals the pack `en`.
- **Scores.** Per-page 92/91/91/90 equals `scores.per_page`. The minimum per-string score is 90, which equals the batch score. The axes sum to 90 (28+25+19+8+10). The reader tally 5+33+9+3 = 50. The five accepted reader items (#21, #27, #30, #31, #44) each name an edit that is in `judge_edits`. `blind-input.r2.txt` carries the new text («جا رہے ہیں؟» ×2, «تفصیل رہنما», «اس باغ میں موسم») and no «آ رہے ہیں؟».

## MANDATORY

None.

## RECOMMENDED

### R1. `termbase_notes` is read only by the `ur-dining` merge tools, not by `ur-plan-1/merge-memory.mjs`

- **Where:** `judge-r2.json` → `termbase_notes` (4 notes).
- **Finding:** `output/ur-plan-1/merge-memory.mjs` ignores the field: its dry run reports `termbase +6` and does not mention the notes, so with that tool the four notes (including the Al-Mulla short form and the N665 licence) would be lost without an error. `output/ur-dining-2/merge-memory.mjs` (lines 34–38) applies them and fails if a key is missing; its dry run on this batch passes.
- **Fix:** when this batch is merged, use the `ur-dining-2` (or `ur-dining-1`) variant of `merge-memory.mjs`, or copy its `termbase_notes` loop into the tool used. The record itself needs no change.
