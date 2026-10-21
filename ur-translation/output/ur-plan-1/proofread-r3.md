# Proofread after judge round 3 (final audit) — ur-plan-1 (/ur/plan-your-trip/)

**0 MANDATORY, 0 RECOMMENDED**

Inputs: `judge-r2.json` (before) against `judge-r3.json` (judge text, `judge_edits`, `rulings`, `withdrawn`, `base_amendments` = [], `termbase_additions`, `notes`, `tm_pairs`, `source_defects`, `scores_row`); `pack.json`, `ref.json`, `proofread-r2.md`, `merge-memory.mjs`. The termbase and tm were not read whole; the dry-run merge exercised them.

## Text

- **Diff against `judge_edits`:** 63 keys in both files, same order (pack order). Exactly one key changed — `faq.12.a` — and `judge_edits` lists exactly that key. No silent change. Its `before` equals the judge-r2 text byte for byte; its `after` equals the final `strings`.
- **faq.12.a** — «ہفوف میں کھانے پینے کی کئی پرانی طرز کی جگہوں پر الاحساء کا ناشتہ اور روایتی پکوان ملتے ہیں، جیسے الاحساء کا پلاؤ (جو لال چاولوں سے پکتا ہے)، بلالیط، ہریس اور کھجور کی روٹی (جسے “لال روٹی” بھی کہتے ہیں)۔ …»
  - Word order only: the same words as round 2, the place phrase moved to the head. «جیسے» now follows «پکوان ملتے ہیں» directly, so the bracketed list attaches to the dishes as in EN 'folk dishes (…)' / AR «الأكلات الشعبية (…)». Cures blind reader r2 #35.
  - Agreement: «ناشتہ (m) اور پکوان (m pl) … ملتے ہیں» — masculine plural, correct.
  - Facts against both sources: breakfast, folk dishes, red rice (N321 «الاحساء کا پلاؤ» + «لال چاولوں»), balaleet, harees, date bread with its other name in the same sentence (C5b), heritage places in Hofuf, farms with a breakfast in nature, up-to-date local reviews, the neutrality bracket verbatim. Nothing added or dropped.
  - Names: «ہفوف», «بلالیط», «ہریس», «کھجور کی روٹی», «الاحساء کا …» (N115/N281) unchanged and byte-identical to round 2.
  - Stands alone as a JSON-LD answer: «الاحساء» stays in the first sentence; no markdown.
  - PASS.
- **Whole-text scans (63 final strings):** `[يكةهىأإۃ]` none; U+0660–0669 / U+06F0–06F9 none; U+00A0 none; «» ؛ and straight `"` none; U+2013 / U+2014 none; Latin `.`/`,` after an Urdu letter none; space before ۔ or ، none; Latin `SAR` none; تم / تمہارا / تیرا none.
- **N650:** practical.0.v–3.v still end in U+06D4.

## Record (cumulative)

- **`rulings`:** N650 only, byte-identical to round 2 (title, binds, ruling, evidence, proofreader-only guard confined to the four keys). No new ruling; no `base_amendments`, so no `before` to match.
- **`withdrawn`:** `[{id: N645, by: N650, why}]`, byte-identical to round 2. `merge-memory.mjs`'s withdrawn loop now also prefixes the title «WITHDRAWN by N650: » (proofread r2 R1), recorded as accepted in `proofread_r2_rulings`.
- **`termbase_additions`:** 10 entries, byte-identical to round 2.
- **`source_defects`:** SD-P1–SD-P13 byte-identical to round 2; SD-P14 new ('fastest' train beside the flight, getThere.2.d / faq.5.a), recorded for the owner, the Urdu keeps the source.
- **`_r1` / `_r2` fields:** `blind_reader_rulings_r1`, `blind_reader_counts_r1`, `judge_edits_r1` carried byte-identical from round 2; `blind_reader_rulings_r2`, `blind_reader_counts_r2`, `judge_edits_r2` equal round 2's own `blind_reader_rulings`, `blind_reader_counts`, `judge_edits`. `proofread_r1_rulings` carried unchanged; `proofread_r2_rulings` added.
- **Round 3 reader record:** `blind_reader_rulings` 36 items, n = 1…36 with none skipped; counts 1 + 10 + 7 + 18 = 36 match `blind_reader_counts`.
- **`notes`:** 85; all 76 round-2 notes kept verbatim, 9 new `[j3]` notes.
- **`tm_pairs`:** 63, one per key, page `plan-your-trip`; every `ur` equals the final `strings`, every `en` equals `pack.json`.
- **Scores:** `batch_score` 92 = the lowest of 63 per-string scores; decision APPROVE, round 3, stage 7, `return_to_stage` null; no owner question.
- **`scores_row`:** matches the brief's shape exactly — `"plan-your-trip (ur): /ur/plan-your-trip/ — 63 strings (ur-plan-1)",2026-10-21,3,92,"APPROVE (…)"` — and the merge's own regex.

## Tools

- `node verify.mjs BATCH judge-r3.json` → `✓ judge-r3.json: 63 سلسلة، 10 مدخل معجم، 85 ملاحظة`.
- `node BATCH/merge-memory.mjs REPO BATCH judge-r3.json` (dry run, no `--write`) → exit 0: «termbase +10 (pending)، أحكام 379 (+1 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1361 → 1424». 371 + 7 stage-4 (N640–N646) + N650 = 379; 1361 + 63 = 1424. Neither `withdrawn` guard fired. `git status` on `ur-translation/glossary` and `ur-translation/memory` is clean afterwards — nothing written.

## Findings

None. The text and the record are ready for the merge.

Observation (not a finding): the faq.12.a word-order edit has not been blind-read; the `[j3]` note says so. It changes no word, so this audit does not require another round.
