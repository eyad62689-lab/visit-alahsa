# Proofread after judge round 2: ur-dining-1 (frame of /ur/restaurants-cafes/ + 12 district names)

**2 MANDATORY, 2 RECOMMENDED**

Inputs read: prompts/05-proofreader.md, BRIEF.md, pack.json, judge-r1.json (PREV), judge-r2.json, ur-04.json (s4 notes N680–N687), ur-stay-1/judge-r3.json (additions, notes, rulings), ur-dining-2/judge-r1.json (additions and area strings), blind-reader.r0.md and blind-reader-r1.md (#6), merge-memory.mjs, and the termbase entries and rulings these cite (N159, N172, P16, «شاہراہ», the three road keys). I also checked the committed 7st card (src/content/dining/7st.md at HEAD) and the published pages that carry «… سڑک».

## Mechanical results

- **Diff judge-r1 → judge-r2 `strings`:** 58 keys in both, in the same order. **No key changed**, and `judge_edits` is `[]`. No silent change. The round-1 letterform, punctuation, digit and U+00A0 scan therefore still holds for every string.
- **tm_pairs:** 58 pairs, one per key, `ur` identical to the final `strings`, `en` identical to pack `en`, page `restaurants-cafes` only. They are identical to round 1's pairs.
- **verify.mjs** on judge-r2.json prints `✓` (58 strings, 20 termbase entries, 67 notes). Notes 0–58 are round 1's, unchanged; [j2] notes 59–66 are new.
- **base_amendment N685:** `before` is **byte-identical** to the N685 ruling text that the regex `/^\[s4\] (N\d{3}) \((.*?)\): ([\s\S]*)$/` extracts from ur-04.json (1503 = 1503 characters, `===` true). The only difference between `before` and `after` is «ایسی دو کھانے پینے کی» → «کھانے پینے کی ایسی دو», and the new phrase matches `ix.faqs.1.a` («اس فہرست میں کھانے پینے کی ایسی دو جگہیں ہیں»). merge-memory pushes the s4 rulings before it applies `base_amendments`, so the amendment finds its target in the same run. PASS. (See R1.)
- **termbase_notes targets:** «درجہ بندی» is in ur-stay-1/judge-r3.json `termbase_additions` (merged first), and «شاہ عبد العزیز سڑک», «الخلیج سڑک», «عین النجم سڑک» are in the termbase. None of the four targets is in this batch's own additions. PASS.
- **Addition keys:** none of the 20 `termbase_additions` is in the termbase, in ur-stay-1 r3's 11 additions, or in ur-dining-2 r1's 28 additions. There are no internal duplicates. «درجہ بندی» was moved to `termbase_notes` (round 1 M1 applied). PASS.
- **Ruling ids:** this batch adds s4 N680–N687 and judge N690, N691. ur-stay-1 r3 adds N670, N671 and amends P16-test. No collision. N690 is byte-identical to round 1's.
- **Merge order proven on a scratch copy** (scratchpad\merge-d1r2, laid out as REPO, with copies of termbase.json, tm.json and scores.csv):
  - `node ur-stay-1/merge-memory.mjs <scratch> ur-stay-1 judge-r3.json --write` → `termbase +11 (pending)، أحكام 388 (+2 حاكم + المرحلة 4)، تعديلات 1، أسئلة 0؛ tm 1424 → 1458` / `written`, exit 0.
  - `node ur-dining-1/merge-memory.mjs <scratch> ur-dining-1 judge-r2.json` (no --write) → `termbase +20 (pending)، أحكام 398 (+2 حاكم + المرحلة 4)، تعديلات 1، أسئلة 1؛ tm 1458 → 1516`, exit 0. The ruling count rises 388 → 398 (8 s4 + 2 judge).
  - REPO's termbase.json, tm.json and scores.csv have the same md5 before and after: **not written**.
- **N690:** unchanged from round 1. Its guard is for the proofreader only and covers one string and one name. PASS.
- **N691 guard:** it is for the proofreader, not machine-read, and covers only the two /ur/ dining pages: a named road is its key byte for byte, and «روڈ» does not occur. Every road on both pages has a key: «شاہ فہد سڑک» (this batch), «شاہ عبد العزیز سڑک», «الخلیج سڑک», «عین النجم سڑک» (termbase), and «شاہ عبد اللہ سڑک», «شہزادہ نواف سڑک», «قطر سڑک» (ur-dining-2). «روڈ» occurs in neither batch's strings. The `binds` that extends to "every later /ur/ page" only confirms what N172 («every later road named after a place or a thing») and N683 («every later /ur/ mention of the road») already bind. **The guard is confined to what the ruling decides.** The ruling text has a problem (M1).

## Findings

### M1. MANDATORY: N691 (2) closes «شاہراہ …» on substance, which contradicts its own title, N172's option C and the [j1] note it answers
N691's title says «شاہراہ …» "is a site-wide question, never one batch's", and (3) says any change must be made site-wide. But (2) rules on the substance: «شاہراہ …» "is not written for these roads: the line's key «شاہراہ» is 'highway' (طريق سريع), and a town street of old Hofuf … is not one; writing it would change what the source says the road is." That is a decision against the form, not a deferral. Three things on record conflict with it:
- **N172** (standing) keeps the form open: "C («شاہراہ الخلیج») on record if the owner's roads later take «شاہراہ»". N691 contradicts it silently, with no `base_amendments` entry for N172.
- **[j1] note 56**, the note N691 answers, gave the evidence for the form: "the line may weigh «شاہراہ» (attested «شاہراہ فیصل»)". **N159's own source** cites «شاہراہ فیصل» (88 ur.wikipedia pages). Shahrah-e-Faisal is a city avenue in Karachi, so «شاہراہ» is attested for a named urban road. N691 (2) relies on the generic key («شاہراہ» = highway, a pending entry sourced from one ur.wikipedia article) and does not answer this attestation.
- (2) binds every road N691 lists, «الخلیج سڑک» and «عین النجم سڑک» included, but its premise (a town street of old Hofuf) is shown only for King Fahd Road and King Abdulaziz Road.

As recorded, a later site-wide decision to take «شاہراہ …» (N172 C, the owner's call) would collide with a binding ruling that says the form misstates the source.

**Fix (choose one):**
- **(a)** Rewrite (2) to defer rather than decide: «(2) «شاہراہ …» is not written by one batch either: it stays on record as N172 C, for the owner's roads site-wide. The question for that decision: the line's key «شاہراہ» is entered as 'highway' (طريق سريع), while «شاہراہ فیصل» (N159's source) shows the word naming a city avenue; whether a town street of old Hofuf takes it is part of the site-wide question.» This text agrees with the title, N172 and note 56.
- **(b)** Keep (2) as a decision, and record it: add a `base_amendments` item on N172 (`field: "ruling"`, `before` = N172's ruling byte for byte from the termbase) that marks option C as closed by N691. Also answer the «شاہراہ فیصل» attestation in (2), and correct the title, which would then no longer be true.

Then rerun the scratch-order proof.

### M2. MANDATORY: owner question ur-dining-1-OQ1 leaves out the card's own published text, and option B would contradict it
The question frames the conflict as the FAQ ("beside Qasr Ibrahim") against the card's area line ('North Al-Rifaa — Hofuf'), and offers "B: it is not — drop 'beside Qasr Ibrahim' from the FAQ". But the committed 7st card (src/content/dining/7st.md, HEAD) carries a published body in four languages that says where the café is:
- body_en: "sits beside Qasr Ibrahim in the old Al-Koot quarter of Hofuf … 7st Al-Bait, the one beside the fort, and 7st Al-Kinnah in the Al-Salam district on the Golden Belt"
- body_de, body_ru and body_zh say the same.

The site therefore already states that this 7st is beside the fort, in **Al-Koot**. The real divergence is between the card's `district: rafah-north` / area line and its own body. That divergence also affects `ix.faqs.2.a`'s grouping ("historic downtown and Al-Raf‘ah North"), `ix.faqs.5.a`, and the district filter. The owner should be asked the right question, with the evidence on file, and should not be offered an option that would delete a fact the site states in four languages.

**Fix:** rewrite `owner_questions[0]` (and the [j2] text of SD-D5 to match). For example:
- **question:** «Which district does the 7st card stand in? Its area line and district are 'North Al-Rifaa — Hofuf' (`district: rafah-north`), but its published body (en/de/ru/zh) says it 'sits beside Qasr Ibrahim in the old Al-Koot quarter' and names a second branch, 7st Al-Kinnah, in Al-Salam. The FAQ (ix.faqs.2.a) says 'beside Qasr Ibrahim'. Two readers of two read the FAQ against the area line as a contradiction.»
- **options:** «A: the card is the Al-Koot branch beside Qasr Ibrahim — correct its district and area line (en/ar), the FAQ unchanged» / «B: the card is meant to be another branch in North Al-Rifaa — the body and the FAQ's 'beside Qasr Ibrahim' are then to be revised by the owner».

Also add "(location: ur-dining-1-OQ1)" after «Café beside Qasr Ibrahim» in the «شارع 7» addition's [s1] note, so the termbase does not state as settled what the question leaves open.

### R1. RECOMMENDED: the N685 amendment could point to N690 in the same sentence it rewrites
The amended N685 still ends that sentence with "so no name needs «نامی» here", while `ix.faqs.2.a` carries «شارع 7 نامی قہوہ خانہ» (N690). N690 merges in the same run and explains the build, and "needs" is not "may not take", so the record is not broken. But a reader of N685 alone sees the clause contradicted by the approved text.

**Fix:** in `after`, write «… so no name needs «نامی» here (N690: «شارع 7» takes «نامی قہوہ خانہ» in ix.faqs.2.a, read as an address).». Leave `before` unchanged and rerun the proof.

### R2. RECOMMENDED: N691's lists are incomplete
- (3) names "hamidiyah-souq, women-souq, zaki-alsalem-farm, the ui strings, this page and its cards". src/i18n/ui.ts carries no «… سڑک». The named road outside those pages is in the events data, src/data/events.ts («شارع السلام (عین النجم سڑک)», from b22-ui). **Fix:** replace "the ui strings" with "the events data (events.ts, b22-ui)".
- `binds` lists ur-dining-2's roads as «شاہ عبد اللہ سڑک», «شہزادہ نواف سڑک», «الخلیج سڑک», «عین النجم سڑک». ur-dining-2's area lines also carry «شاہ فہد سڑک» (dar-huwaija), «شاہ عبد العزیز سڑک» (ratio-alkoot) and «قطر سڑک» (karak-raslan). **Fix:** add them, or write "every named road in ur-dining-2's area lines and blurbs".
