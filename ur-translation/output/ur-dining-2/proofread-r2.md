# Proofread after judge round 2: ur-dining-2 (29 cards of /ur/restaurants-cafes/)

**ur-dining-2 round 2: 0 MANDATORY, 3 RECOMMENDED** · **ur-dining-1 judge-r3 record: 0 MANDATORY, 0 RECOMMENDED**

Inputs: prompts/05-proofreader.md, BRIEF.md, pack.json, judge-r1.json (PREV), judge-r2.json, ur-04.json of all three batches (N660–N666, N680–N687, N700–N705), ur-stay-1/judge-r3.json, ur-dining-1/judge-r2.json and judge-r3.json, ur-dining-1/proofread-r2.md, merge-memory.mjs (the three copies are byte-identical), src/content/dining/7st.md and alkoot-hotel.md (HEAD and worktree). I searched termbase.json for P16-test, N159, N172, «ہوٹل», «شاہراہ», the road keys and the Al-Koot keys.

## Part A: ur-dining-2, judge round 2

### Mechanical results

- **Diff judge-r1 → judge-r2 `strings`:** 82 keys in both, in pack order. Exactly 4 strings changed: greasy-fingers.blurb, baking-up.blurb, dot-bakery.blurb and koud.blurb. These are exactly the 4 `judge_edits` keys. Every `before` equals r1 and every `after` equals r2. **There are no silent changes.**
- **Letterforms (item 1):** a regex scan of all 82 strings for `[يكةهىأإۃ]` found **none**. The only characters outside U+0600–06FF, digits and space are newline, “ ”, «:» (dot-bakery, unchanged since r1) and ( ). No «؛», «», straight ", Latin `.`/`,`/letters, em dash, U+00A0, U+0660–0669 or U+06F0–06F9, and no space before ۔/،.
- **Final stops (P26, trap 6):** all 29 blurbs end in «۔». No alt and no area line ends in «۔».
- **Address:** no آپ, no تم.
- **The four changed strings, read against both sources:**
  - greasy-fingers.blurb: «… اور یہ جگہ اس فہرست میں جدید طرز کے جھٹ پٹ کھانے کا انتخاب ہے۔». Subject first, «انتخاب ہے» agrees. The facts are unchanged (metal trays, burgers, fries, the list's modern casual pick). No exclusivity is added. PASS.
  - koud.blurb: «گہرے رنگ کا اگواڑا روشن حروف میں بتاتا ہے کہ یہاں کھانے کی جگہ اور قہوہ خانہ ایک ساتھ ہیں۔». This renders the Arabic «كما تعلن واجهته الداكنة بحروفها المضيئة». «اگواڑا … بتاتا ہے» is masculine and agrees, and «ہیں» is plural for the two kinds. The EN-only 'as it calls itself' and 'Arabic' stay out (SD-C1). «کھانے کی جگہ» follows N705 (2). PASS.
  - baking-up.blurb: «گوگل میپس پر اس جگہ کا اپنا تعارف “سینکی ہوئی اور کرکری چیزیں” ہے، …». «تعارف … ہے» is masculine singular and «اس جگہ کا اپنا» is idiomatic. The self-description, Google Maps (P16 entry), cheerful façade and outdoor seating (from the AR only, SD-C5) are all kept. «بیکری» is not written (N713). The quote uses “ ”. PASS.
  - dot-bakery.blurb: «… اور کاؤنٹر پر کہیں کہیں نیلا رنگ ہے۔». This applies proofread r1 R1, and the degree no longer exceeds «بلمسة زرقاء». «کاؤنٹر» follows N711. PASS.
- **Venue names, districts and roads:** none of these is in a changed string. FRAME's text is unchanged in r1, r2 and r3 (0 keys changed), so the round-1 byte-for-byte checks still hold. I re-checked all 12 `district.*` labels of ur-dining-1/judge-r3.json: each occurs verbatim in this batch's strings.
- **New ruling N713** («بیکری» stays out): it is consistent with P16-test as worded in the termbase. (1) is not shown; (2) is met (r0 #11/#13, r1 #12); (3) rests on reference attestation. It is also consistent with N705 (1), which is quoted correctly. Its binds are confined to three strings, and it has no machine guard. PASS.
- **Amended N710:** the scope sentence now matches N662's binds line and point (2) as written in ur-stay-1/ur-04.json, so proofread r1 M2 is resolved. The R3 cost is added, and the text is unchanged. PASS.
- **Amended N711:** the round-2 sentence matches the new blurb. PASS.
- **`base_amendments`** is [], `withdrawn` is absent, and `owner_questions` is []. No earlier ruling is contradicted.
- **`termbase_notes` («ہوٹل»):** the target exists in the termbase, and its quoted form «روایتی طرز کے ہوٹل میں» is in the alkoot-hotel blurb verbatim. The termbase's P16-test, as amended by ur-stay-1 (N661), lets «ہوٹل» stand in running text, so it is consistent.
- **`termbase_additions`:** there are 29 (28 + 1). The new entry «فندق و مطعم الکوت التراثی» is proofread r1 M1, applied. Its `en`/`ar` match alkoot-hotel.md `name_en`/`name` and the pack ctx, and its key collides with nothing after the STAY and FRAME merges (proved below). The [j2] notes appended to «کاؤنٹر», «سینکی ہوئی چیزوں کی دکان» and «روایتی طرز کا ہوٹل» match the text. See R1.
- **`tm_pairs`:** 82 pairs, one per key in pack order, no duplicates, one page (`restaurants-cafes-cards`). Each `ur` is identical to the final `strings` and each `en` to pack `en`.
- **`verify.mjs`** on judge-r2.json gives ✓ (82 strings, 29 entries, 61 notes).
- **Record counts:** `blind_reader_counts` 18 = 3 accepted + 4 rejected + 4 source defects + 7 out of scope, which matches `blind_reader_rulings`. The 3 accepted items (#9, #10, #12) are three of the four edits; the fourth is proofread R1. The lowest per-string score is 91 (alkoot-hotel.blurb), equal to `batch_score` and the `scores_row`.
- **Worktree wiring (informational):** the `*_ur` fields of the 29 src/content/dining/*.md files hold all 82 strings, byte-identical with judge-r2.json.

### Merge order proven on a scratch copy (addition (b))

The scratch copy is `scratchpad\merge-d2r2`, laid out as REPO: `ur-translation\glossary\termbase.json`, `ur-translation\memory\tm.json` and `scores.csv`, copied from REPO.

1. `node OUT\ur-stay-1\merge-memory.mjs <scratch> OUT\ur-stay-1 judge-r3.json --write` → `termbase +11 (pending)، أحكام 388 (+2 حاكم + المرحلة 4)، تعديلات 1، أسئلة 0؛ tm 1424 → 1458` / `written`, exit 0.
2. `node OUT\ur-dining-1\merge-memory.mjs <scratch> OUT\ur-dining-1 judge-r3.json --write` → `termbase +20 (pending)، أحكام 398 (+2 حاكم + المرحلة 4)، تعديلات 1، أسئلة 1؛ tm 1458 → 1516` / `written`, exit 0. In the result:
   - N685 carries the amended text («(N690: …»).
   - `open_items` gains `ur-dining-1-OQ1`, a new id.
   - Each of the four `termbase_notes` targets received exactly one ur-dining-1 append. «درجہ بندی» also has its ur-stay-1 entry.
3. `node OUT\ur-dining-2\merge-memory.mjs <scratch> BATCH judge-r2.json` (no --write) → `termbase +29 (pending)، أحكام 408 (+4 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1516 → 1598`, exit 0. 408 = 398 + 6 s4 (N700–N705) + 4 judge (N710–N713). The 82 pairs of page `restaurants-cafes-cards` delete no other batch's pairs.

REPO's termbase.json, tm.json and scores.csv have the same md5 before and after (069dfffd…, 192208cb…, 2505d26f…), so **they were not written**.

### Findings

#### R1 · RECOMMENDED: the new entry «فندق و مطعم الکوت التراثی» claims its gender is "exercised" by the alt, but the alt does not exercise it
- The entry's note says: "Used in dining.alkoot-hotel.alt («… کا اندرونی صحن», masculine, exercised)".
- In «فندق و مطعم الکوت التراثی کا اندرونی صحن», «کا» agrees with the possessed noun «صحن», not with the name. The string therefore shows nothing about the name's gender. (Proofread r1 M1 suggested this reasoning, which was my round's error.) «مذکر» is still the right value, by the head «فندق» taken as «ہوٹل» (masculine, termbase).
- Fix (record only): write «Masculine by its head (hotel, «ہوٹل» masculine); not exercised: in the alt «کا» agrees with «صحن»».

#### R2 · RECOMMENDED: the round-2 notes cite FRAME judge-r2, but FRAME's final round is r3
- The [j2] note on proofread r1 says: "the key collides with nothing … in ur-stay-1 judge-r3 / ur-dining-1 judge-r2 additions". The merge-order note says: "ur-dining-1 judge-r2.json merged with --write".
- FRAME r3 (written a minute after this file) is now the version that will merge. Its 20 addition keys are the same as r2's, so the results hold, as the proof above shows with r3.
- Fix: change both references to «ur-dining-1 judge-r3.json» (proved 2026-10-21: +29, rulings 408, tm 1516 → 1598).

#### R3 · RECOMMENDED: blind-reader ruling #6 still gives N691's withdrawn reason for «شاہراہ»
- `blind_reader_rulings` n 6 says: "«روڈ» refused by P16, «شاہراہ» is the key for a highway, and any change is site-wide."
- FRAME r3 reworded N691 (2): «شاہراہ …» is not decided on its merits. It stays open as N172 C / N159 B for the owner, and «شاہراہ فیصل» shows that the generic key does not rule it out. FRAME aligned its own «شاہ عبد العزیز سڑک» note to match. This field is not merged into memory, so the record is not broken.
- Fix: «… «روڈ» refused by P16; «شاہراہ …» left open for the owner site-wide (N691 (2) as reworded in ur-dining-1 judge r3; N172 C); not one batch's change.»

#### Note (no finding): «کہیں کہیں» in the dot-bakery blurb
«کہیں کہیں» ('here and there') slightly suggests scattered spots, where the source has a single touch. The natural alternatives either change the colour («ہلکا نیلا» = light blue) or are calques («نیلے رنگ کا لمس»). I find no better form, so this is not a finding.

## Part B: ur-dining-1 (frame), judge-r3.json audited against judge-r2.json (addition (a))

**0 MANDATORY, 0 RECOMMENDED**

- **No text change, confirmed:** 58 keys in both files, in the same order, with 0 strings changed. `judge_edits` and `judge_edits_r2` are []. `tm_pairs` is identical to r2's (and to r1's, since r1 → r2 changed no string either). The other fields that differ are record fields only: `round` 3, breakdown (one sentence added; the axes and scores are unchanged, 92), termbase_additions (one note), termbase_notes (one append), notes (+6 [j3]), rulings (N691), base_amendments (N685), owner_questions, source_defects (SD-D5), the blind-reader fields moved to `_r2` with an empty current round, and scores_row.
- **N691 rewording (proofread r2 M1 and R2):**
  - (2) now defers instead of deciding, and cites N172 C and N159 B. Both are on record in the termbase as written: N172 «C («شاہراہ الخلیج») on record if the owner's roads later take «شاہراہ»», and N159 «B «شاہراہ …» on record».
  - It answers the «شاہراہ فیصل» attestation correctly: 88 ur.wikipedia pages, cited in the `source` of the «شاہ عبد العزیز سڑک» entry, as N691 says.
  - (2) now agrees with the title ("a site-wide question, never one batch's") and with note 56, so no `base_amendment` on N172 is needed.
  - (3) names the events data and evidence states that ui.ts carries no «… سڑک».
  - `binds` lists all seven roads of ur-dining-2. I checked each against this batch's area lines.
  - The guard is unchanged and confined to the two /ur/ dining pages.
  - The superseded reasoning in `blind_reader_rulings_r2` r1 #6 is marked by a [j3] note, not silently contradicted. PASS.
- **N685 base_amendment:** `before` is unchanged from r2 and **byte-identical** to the N685 text that merge-memory's regex extracts from ur-dining-1/ur-04.json (`===` true). The only change in `after` is the appended «(N690: «شارع 7» takes «نامی قہوہ خانہ» in ix.faqs.2.a, read as an address)», and `why` records it. In the scratch merge, N685 carries the amended text and its `amended` log. PASS.
- **Owner question ur-dining-1-OQ1:** the question is restated as proofread r2 M2 asked. Each fact it cites is in src/content/dining/7st.md, at HEAD and in the worktree:
  - `district: rafah-north`, `area_en` 'North Al-Rifaa — Hofuf', `area` «حي الرفعة الشمالية — الهفوف».
  - body_en 'sits beside Qasr Ibrahim in the old Al-Koot quarter of Hofuf'. body_de, body_ru and body_zh say the same.
  - '7st Al-Bait, the one beside the fort' and '7st Al-Kinnah in the Al-Salam district'.

  Neither option deletes a fact the site states. The id is explicit, and it is new in `open_items` (merged once). SD-D5 is restated to match. The «شارع 7» addition's [s1] note now marks the location as open (ur-dining-1-OQ1). PASS.
- **`termbase_notes` targets:** «درجہ بندی» is an addition of ur-stay-1 r3, which merges first. «شاہ عبد العزیز سڑک», «الخلیج سڑک» and «عین النجم سڑک» are in the termbase. None of them is among FRAME's own additions. The aligned «شاہ عبد العزیز سڑک» append agrees with the reworded N691. In the scratch merge, each target received one append. PASS.
- **Addition keys and ruling ids:** the 20 keys are the same as r2's (only the «شارع 7» note changed). There is no collision with the termbase, with STAY r3, or with ur-dining-2 r2's 29 additions. The ruling ids are N680–N687 and N690–N691, disjoint from STAY's (N660–N666, N670–N671) and from this batch's (N700–N705, N710–N713).
- **scores_row:** it matches the file's pattern (the merge ran). Its counts are accurate: 20 entries, 4 notes, 58 TM pairs, 10 source defects, 0 judge edits.
- **Merge:** proven with --write on the scratch copy in step 2 above, exit 0.
