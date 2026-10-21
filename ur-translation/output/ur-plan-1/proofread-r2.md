# Proofread after judge round 2 — ur-plan-1 (/ur/plan-your-trip/)

**0 MANDATORY, 1 RECOMMENDED**

Inputs: `judge-r1.json` (before) against `judge-r2.json` (judge text, `judge_edits`, `rulings`, `withdrawn`, `base_amendments` = [], `termbase_additions`, `notes`, `tm_pairs`); `pack.json`, `ref.json`, `proofread-r1.md`, `merge-memory.mjs`, the termbase (searched: N222, «فارم», N645/N650 absence) and tm (searched: «واقفیت»).

## Mechanical checks (all PASS)

- **Diff against `judge_edits`:** 63 keys in both files, same order, and in `pack.json` order. The changed keys are exactly the 4 `judge_edits` keys: tips.1.d, faq.0.a, faq.9.a, faq.12.a. No silent change. Each edit's `before` equals the judge-r1 text byte for byte, and each `after` equals the final `strings`.
- **Letterforms** `[يكةهىأإۃ]` over all 63 final strings: none.
- **Digits** U+0660–0669 / U+06F0–06F9: none. **U+00A0:** none. **«» ؛ and straight "**: none. **Latin `.` or `,` after an Urdu word:** none. **Space before ۔ or ،:** none. **U+2013 / U+2014:** none. **Latin SAR:** none. **تم / تمہارا / تیرا:** none.
- **N650 still holds:** the four practical.N.v values end in U+06D4, and no other key changed its ending.
- **`tm_pairs`:** 63 pairs, one per key (`field`), page `plan-your-trip`. Every `ur` equals the final `strings` and every `en` equals `pack.json`.
- **`verify.mjs BATCH judge-r2.json`:** `✓` (63 strings, 10 entries, 76 notes).
- **`termbase_additions`:** identical to round 1, byte for byte. No entry collides with an existing key: the dry run adds +10.
- **`rulings`:** N650 only, identical to round 1. There is no new ruling and no base_amendment, so there is no `before` to match.

## The four edits

- **faq.0.a:** «یہاں قدرتی عجائبات ہیں، جیسے جبل القارہ کے غار، جھیل الاصفر اور میٹھے پانی کے چشمے۔ ہفوف میں تعمیراتی ورثہ بھی ہے، جیسے قصر ابراہیم، سوق القیصریہ اور مسجد جواثا۔» The split is clean.
  - The published names are byte-identical to ref.places: جبل القارہ، جھیل الاصفر، قصر ابراہیم، سوق القیصریہ، مسجد جواثا، ہفوف.
  - 2020 and 2018 stand, and nothing is added or dropped.
  - «ورثہ … ہے» agrees (masculine singular).
  - The answer still opens with «الاحساء», so it stands alone.
  - PASS.
- **tips.1.d:** «… اور سیاحتی مقامات کی سیر اور یہاں کی تاریخ سے واقفیت کے لیے سردیوں میں۔» Both objects of the source are back: EN 'the landmarks and history', AR «لزيارة المعالم والغوص في التاريخ».
  - «سیاحتی مقامات» is the site's word (ui.nav.attractions), and it adds no 'famous'.
  - «واقفیت» has published precedent in tm («ورثے سے واقفیت»).
  - The verb is elided («سردیوں میں [آئیں]»), which mirrors the first clause.
  - This closes proofread r1 R1. PASS.
- **faq.9.a:** «… بھر میں ٹھہرنے کے لیے جدید ہوٹل اور سیاحتی تفریح گاہیں ہیں۔ ان کے علاوہ روایتی مہمان خانے، اور چھٹیاں گزارنے کے لیے کرائے کے مکان اور فارم بھی ہیں، جہاں آپ … رہ سکتے ہیں۔» The offer is now named in the same sentence as the resort, as N222's guard requires, and N222 is left unamended. This closes proofread r1 M2.
  - The comma after «مہمان خانے» stops «کرائے کے» from reaching back to the inns, so it governs «مکان اور فارم» only. That matches AR «… وشاليهات ومزارع للإيجار».
  - «فارم» is a termbase key.
  - Facts: hotels, resorts, Hofuf/Al-Mubarraz, inns, chalets, farms, budget, location, comparing, reviews and booking sites all stand.
  - The neutrality bracket is verbatim. «آپ … رہ سکتے ہیں» is honorific.
  - The round-1 `[j1]` note is kept in the record and marked «(WITHDRAWN in round 2 …)», not silently removed.
  - PASS.
- **faq.12.a:** «… ہفوف میں کھانے پینے کی کئی پرانی طرز کی جگہوں پر ملتے ہیں …» This is word order only, and the words and facts are unchanged. The compound «کھانے پینے کی جگہ» stays whole. PASS.

## `withdrawn` (N645 by N650): proofread r1 M1, closed

- `withdrawn` = `[{id: "N645", by: "N650", why: …}]`. N645 exists only as the stage-4 note in `ur-04.json`: «[s4] N645 (practical.N.v take no final «۔»): …». Neither N645 nor N650 is in the termbase today (371 rulings), so the ids do not collide.
- **Dry run:** `node BATCH/merge-memory.mjs REPO BATCH judge-r2.json` (no `--write`) exits 0 and prints «termbase +10 (pending)، أحكام 379 (+1 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1361 → 1424». That is 371 + 7 stage-4 rulings (N640–N646) + N650 = 379, and 1361 + 63 = 1424. Neither guard in the `withdrawn` loop fired: N645 was found after the stage-4 push, and N650 was found after the judge push. `git status` on `ur-translation/glossary` and `ur-translation/memory` is clean, so nothing was written.
- **Result, checked with a read-only in-memory replica of the merge's ruling steps:** N645 → `status: "withdrawn"`, `withdrawn_by: "N650"`, with an `amended` line «ur-plan-1 (2026-10-21): withdrawn by N650 — …». N650 stays live. N645 is the only withdrawn ruling.
- **Consistency:** N650's `title` and `ruling` say it supersedes and withdraws N645. The `withdrawn.why` says this happened in round 1 on blind reader r0 #21/#22 and the approved en/zh/de/ru values. That matches N650's evidence.
- **The guard:** N650's guard is proofreader-only and confined to the four keys. P26 is not touched. PASS.

## Findings

### R1 — RECOMMENDED — termbase record: `status: "withdrawn"` is a new field on rulings

No existing ruling carries `status`: after the merge, N645 will be the first and only one. A later stage that greps the termbase for «N645» will find the title «practical.N.v take no final «۔»» and the ruling text «P26 extends to the four dt/dd value cells …». Neither line says it is dead. Only the separate `status` / `withdrawn_by` / `amended` fields say so.

**Fix (optional, in `merge-memory.mjs`'s withdrawn loop, before the real merge):** also prefix the title, e.g. `r.title = \`WITHDRAWN by ${w.by}: ${r.title}\``. A reader then sees the withdrawal on the line a search returns. The record is complete without it, so this is not a shipping blocker.
