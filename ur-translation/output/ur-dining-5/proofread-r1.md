# Proofread of judge round 1, batch `ur-dining-5` — 1 MANDATORY, 2 RECOMMENDED

Input: `judge-r1.json` against `ur-05.json`, `pack.json`, `ref.json`, `blind-input.r1.txt`, the live `termbase.json` / `tm.json` (read at 11:23 on 2026-10-23, after ur-stores-1 and ur-dining-3 were merged into it).

## Tool lines

- `node verify.mjs ur-dining-5 judge-r1.json` → `OK judge-r1.json: 6 strings, 24 termbase additions, 53 notes`
- `node merge-memory.mjs ur-dining-5 judge-r1.json` (dry run, no --write). Earlier in this session, before ur-stores-1 reached the termbase, it printed `termbase +24 (pending), 0 identical skipped, 1 notes appended; rulings 469 (+5 stage 4, +3 judge); amendments 3; owner questions 0; tm 1826 -> 1832`. **Against the termbase as it stands now it FAILS:** `Error: existing entry with another en: ایکس` (merge-memory.mjs:27). See M1.
- With only the M1 fix applied to a scratch copy (outside the batch folder), the same dry run passes: `termbase +22 (pending), 2 identical skipped, 1 notes appended; rulings 492 (+5 stage 4, +3 judge); amendments 3; owner questions 0; tm 2007 -> 2013`.

## MANDATORY

### M1. `termbase_additions`: two keys already exist (ur-stores-1 is merged) with a different `en`, so the merge throws

merge-memory keys the termbase on `ur` and skips an entry only when `en` is identical (case-insensitive); any other `en` on an existing key aborts the merge. Both keys were added by ur-stores-1 (judge r2/r3, now in the termbase):

| key (`ur`) | judge-r1 `en` | termbase `en` |
|---|---|---|
| `ایکس` | `X (the social-media platform)` | `X (the platform formerly Twitter)` |
| `تجارتی نام` | `brand / trade name (the commercial name under which a coffee or restaurant concern trades, also from more than one place)` | `brand (trade name)` |

Neither is a new term, and the judge's own note 49 treats `تجارتی نام` as "amended" in this batch. Fix, in `judge-r1.json`:

1. In `termbase_additions`, set `"en": "X (the platform formerly Twitter)"` for `ایکس` and `"en": "brand (trade name)"` for `تجارتی نام`. The two entries are then skipped as identical, which is what the line wants (one entry per key). Alternatively delete the two entries.
2. To keep the dining-specific evidence, move it into `termbase_notes` (the field already exists for `مطعم شرق`), for example `{"ur": "تجارتی نام", "append": "ur-dining-5 judge r1: the commercial name under which a coffee or restaurant concern trades (ratio-alkoot.body, lava.body; N851); also from more than one place."}` and `{"ur": "ایکس", "append": "ur-dining-5 judge r1: sinyar.body, the account name on X (N785, N826)."}`.
3. Re-run `verify.mjs` and the `merge-memory.mjs` dry run; the expected line is `termbase +22 (pending), 2 identical skipped, 1 notes appended` (or `3 notes appended` if step 2 is done).

No other key collides: the other 22 `ur` keys are absent from the termbase and from the pending additions of ur-dining-3 (judge-r2/r3), ur-dining-4 (judge-r1) and ur-stores-1 (judge-r2/r3); no `en` is shared with a different `ur` key.

## RECOMMENDED

### R1. `termbase_additions`: two-form keys «الکندیہ / العریش» and «سلاف / سلافہ»

`ur` is the lookup key, and a key with " / " never matches a string (the ur-legal-1 proofread ruled the same: one entry per form). The first entry also carries one gender («مؤنث») for two different words, and the second one gender («مذکر») for «سلاف» (masculine) and «سلافہ» (feminine).
Fix: split «الکندیہ / العریش» into «الکندیہ» (مؤنث) and «العریش» (gender not exercised; state that in the note). For the second, do **not** split to «سلاف»: that key already exists (card entry, `en` "Soulaf Coffee") and would throw as in M1. Key the entry «سلافہ» (مؤنث) alone and add the sense of «سلاف» through `termbase_notes` on the existing «سلاف» entry.

### R2. `sinyar.body`: «ان دو جہازوں کو بھی یہی کہا جاتا ہے جو ساتھ چلنے پر اتفاق کر لیں»

The sources say "also for two ships that agree to sail in company": any two ships. After the previous sentence ("بندرگاہ میں ایک ساتھ لنگر انداز بہت سے جہازوں کے لیے"), «ان دو جہازوں» can be read as two of those moored ships. The «ان … جو» correlative is grammatical, so this is not an error.
Fix (optional, same facts): «ایسے دو جہازوں کو بھی یہی کہا جاتا ہے جو ساتھ چلنے پر اتفاق کر لیں، تاکہ ہر ایک کو دوسرے کی سلامتی کا اطمینان رہے۔»

## Checked, no finding

- **Diff.** The changed keys are exactly the six `judge_edits` keys (koud, lava, ratio-alkoot, sharq-alqaisariah, sinyar, soulaf). For every edit, `before` equals `ur-05.json` and `after` equals `judge-r1.json` `strings` byte for byte. Key order is unchanged and no other string differs.
- **Text.** No ي ك ة ه ى أ إ ۃ, no U+00A0, no «؛», no U+2013, no straight quotes, no «», no newline (one paragraph each). Latin digits only (2018, 2024, 2024); the only combining mark is the existing «تقریباً» in ratio-alkoot, unchanged from ur-05. ھ occurs only after aspirate letters. “ ” are balanced and enclose only cited strings (N821). No Latin string inside any sentence. The six published names are byte-identical: «کوڈ», «لاوا», «ریشو الکوت», «مطعم شرق», «سنیار», «سلاف». «تجارتی نام» (N851) and the amended N826 form «سمندری غذا کو اپنی پہچان بناتی ہے» are in place, and the N827 «مقولہ» too.
- **Facts.** Nothing added or dropped in the six edited bodies against `en` and `ar`. The Arabic-only paragraph of soulaf stays out, as ruled and logged. «یہ شاخ» (ratio-alkoot) and «یہ جگہ» (sharq) resolve their referents. Agreement holds (فعل جمع with «جن میں … شامل ہیں»; «قہوہ خانہ … لکھتا ہے»; «کھانے کی جگہ … بناتی ہے»).
- **Rulings.** N855, N856 and N857 are in the batch range (judge from N855), absent from the live termbase (highest numeric id there is N829) and from the other batches' ranges (dining-3 N825–829, now merged; dining-4 N840–842, pending). Every Urdu form they quote is a substring of the final strings. Each guard is "for the proofreader, not machine-read" and confined to its own decision. They are consistent with N820 (a), N826/N827 and N828 as merged from ur-dining-3. `withdrawn` is empty and nothing earlier is contradicted.
- **`base_amendments`.** The N851/N852/N853 rulings enter the termbase in this same merge: merge-memory pushes every `[s4] Nxxx (title): …` note of `ur-04.json` first, then applies the amendments, and throws unless `before` equals the stored text byte for byte. The dry run passed all three (`amendments 3`), so the three `before` values match the stage-4 notes. Each `after` is the same text with only the quoted example updated, and the new examples equal the final strings (lava, koud/lava, sharq).
- **`tm_pairs`.** Six pairs, field = pack key, `page` = `restaurants-cafes-detail`, `ur` identical to the final string, `en` identical to `pack.json`. The dry run reports `tm 2007 -> 2013`.
- **`scores_row` and scores.** It passes the merge regex. The per-page scores (91/91/91/90/91/92), batch score 90 (the lowest page) and the reader counts (55 = 13 + 18 + 16 + 8; 0 serious + 22 medium + 33 minor) are consistent with each other.
- **Other `termbase_additions`.** All 24 entries have `en`, `ur`, `source` and `gender`; no forbidden letters in any key.
- **Style note.** In koud, «جو کھانے کی جگہ ہے اور … فہرست میں شامل ہے» names the list by its published name as N828 requires, using «میں شامل ہے» instead of N828's «فہرست کی …». N853 as amended records this, so it is consistent.
