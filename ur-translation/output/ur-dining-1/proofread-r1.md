# Proofread after judge round 1: ur-dining-1 (frame of /ur/restaurants-cafes/ + 12 district names)

**2 MANDATORY, 2 RECOMMENDED**

Inputs read: prompts/05-proofreader.md, BRIEF.md, pack.json, ref.json, ur-05.json (PREV), judge-r1.json, the s4 notes of ur-stay-1 / ur-dining-1 / ur-dining-2 (N660, N680, N685), ur-stay-1/judge-r3.json (STAY final), and merge-memory.mjs.

## Mechanical results

- **Diff ur-05 → judge-r1:** the changed keys are exactly `ix.faqs.1.a`, `ix.faqs.2.a` and `ix.methodP1`. These match the three `judge_edits` keys, and every `before` equals the ur-05 text. There are no silent changes, and the key order matches pack.json (58 keys).
- **Letterforms:** I ran `[يكةهىأإۃ]` over all 58 strings. Result: **none**. I also checked for `؛`, U+00A0, Arabic-Indic/Persian digits, `«»`, straight `"`, a space before `۔`/`،`, and trailing or double spaces. None found.
- **The three changed strings:** each ends in `۔`. None has Latin text. Venue names are unchanged byte for byte against N685 (`دار بسمہ`, `مطعم فندق الکوت التراثی`, `بیذانہ`, `بیت الکوت`, `دار حویجہ`, `مقہی السید`, `ریشو الکوت`, `شارع 7`). The `آپ` form `آپ کو … ملیں گے` is unchanged. Facts check out against en/ar, with nothing added or dropped. The «نامی قہوہ خانہ» in faqs.2.a repeats the class that the list and the source (ar «ومقهى شارع 7») already give, so it adds no fact. Both FAQ answers still stand alone.
- **ix.methodP1:** the new clause «اور ہر جگہ کے مختصر تعارف میں وہی بیان کیا گیا ہے جو اس کی تصویر میں نظر آتا ہے۔» is byte-identical to the clause in STAY's final text (ur-stay-1/judge-r3.json `ix.methodP1`), as the judge claims. Both sources say the blurbs are not reviews or recommendations, and the last sentence still says so.
- **N690:** it is consistent with N660 (3)/(4) and N685. The name stays «شارع 7», and «نامی قہوہ خانہ» stands outside the name, which is the N158 / P3c (2) build that N660 (4) names. Its guard is for the proofreader only and is confined to one string and one name. The `binds` for ur-dining-2 is permissive, limited to the 7st card fields. No base_amendments and no withdrawn rulings this round.
- **tm_pairs:** 58 pairs, one per key, keyed by `field`, with no duplicates or extras. `ur` is identical to the final `strings` and `en` is identical to pack `en`. The page is `restaurants-cafes`, which is distinct from STAY (`stay`) and ur-dining-2 (`restaurants-cafes-cards`), so no merge deletes another batch's pairs.
- **verify.mjs** on judge-r1.json prints `✓` (58 strings, 21 termbase entries, 59 notes).
- **merge-memory dry run** (`node merge-memory.mjs REPO BATCH judge-r1.json`, no --write) passes against the current memory: `termbase +21 (pending)، أحكام 388 (+1 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1424 → 1482`. That run is against the memory **before** ur-stay-1 is merged, so it cannot see item M1.
- Ruling-id ranges do not collide across the three batches: STAY s4 N660–N666 and judge N670–N671, this batch s4 N680–N687 and judge N690, ur-dining-2 s4 N700–N705 and judge N710–N712. ur-dining-2's termbase additions do not collide with this batch's.

## Findings

### M1. MANDATORY: termbase key «درجہ بندی» collides with ur-stay-1's final judge
`termbase_additions` adds `{"en":"rating (Google Maps)","ar":"التقييم","ur":"درجہ بندی","gender":"مؤنث","source":"rekhta.org …"}`. ur-stay-1/judge-r3.json also adds `ur: "درجہ بندی"` ("rating (the Google Maps rating, shown when fetched)"). The merge order is ur-stay-1 → ur-dining-1, so this merge will stop at `مدخل قائم: درجہ بندی`. No other key collides with STAY r3; I checked all 21 against STAY's 11.

**Fix:** remove the entry from `termbase_additions` (leaving 20) and add it to `termbase_notes`:
```json
"termbase_notes": [ { "ur": "درجہ بندی", "append": "The dining frame writes the Google Maps rating with the same word: ix.srcNote.then «درجہ بندی اور اوقات گوگل میپس سے لیے گئے ہیں», ix.faqs.6.then.a / else.* (the loan «ریٹنگ» not written, P16). Feminine (rekhta.org «درجہ بندی», noun, feminine). Same word as STAY's ix.ratingLabel «گوگل میپس پر درجہ بندی». Pending." } ]
```
STAY's entry has no `gender` field, so it merges as `gender: null`. The append should therefore keep this batch's gender evidence (rekhta, feminine), as shown above.

### M2. MANDATORY: N685 enters the memory quoting a list intro that the text no longer uses
N685 is the s4 note in ur-04.json. merge-memory pushes it verbatim into `calibration_rulings`, and it says: "the Urdu class word introduces each list («ایسی دو کھانے پینے کی جگہیں», «یہ قہوہ خانے», «دو قہوہ خانے»)", under "BINDS … byte for byte". Judge edit 1 changed `ix.faqs.1.a` to «کھانے پینے کی ایسی دو جگہیں». The judge recorded this only in a `[j1]` note, and merge-memory does not carry notes. The line's memory would then hold a binding ruling whose quoted phrase contradicts the approved text, and ur-dining-2 or a later batch could copy the old order. merge-memory runs `base_amendments` after it pushes the s4 rulings, so this round can amend the ruling.

**Fix:** add one `base_amendments` item:
`{ "id": "N685", "field": "ruling", "before": "<the N685 ruling text exactly as the merge extracts it from ur-04.json, i.e. everything after «[s4] N685 (The venue names of the dining frame under N660): »>", "after": "<same text with «ایسی دو کھانے پینے کی جگہیں» replaced by «کھانے پینے کی ایسی دو جگہیں»>", "why": "Judge r1 edit to ix.faqs.1.a (word order, blind reader #9); the venue names and the class-word rule are unchanged." }`
Then run the dry run again. The judge's `[j1]` note says the same thing and can stay.

### R1. RECOMMENDED: the note cites STAY r2, not STAY's final round
The `[j1]` note says the shared strings (moreLabel, newWindow, ratingLabel, closedPerm, closedTemp, methodH) are "STAY's approved text (ur-stay-1/judge-r2.json)". STAY's final round is judge-r3.json. I checked all six and they are unchanged from r2 to r3, so nothing in the text is wrong.

**Fix:** cite `ur-stay-1/judge-r3.json` in the note. ix.methodP1's edit `why` likewise refers to STAY's approved words, which r3 confirms.

### R2. RECOMMENDED: «شارع 7» termbase note
The note keeps "[s4] N685: «شارع 7» bare, confirmed" next to the new "[j1] N690 … «شارع 7 نامی قہوہ خانہ»". This is consistent: the name is still bare and only the build around it changed in faqs.2.a. A reader of the termbase alone could still read "bare, confirmed" as forbidding «نامی».

**Fix (optional):** make the [j1] sentence say "the name stays bare (N685); N690 adds «نامی قہوہ خانہ» after it in ix.faqs.2.a only".
