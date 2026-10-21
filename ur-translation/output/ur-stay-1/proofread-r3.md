# Proofread after judge round 3 (final audit): ur-stay-1 (/ur/stay/ + /ur/stay/alkoot-heritage-hotel/)

**0 MANDATORY, 1 RECOMMENDED**

Inputs: judge-r2.json (before), judge-r3.json (after), pack.json, ref.json, the stage-4 notes N660–N666 (ur-stay-1/ur-04.json), blind-reader-r2.md, blind-input.r3.txt. I searched termbase.json for P16-test, «ہوٹل», «سعود بن نایف بن عبد العزیز», the 11 addition keys and the name forms in the changed string.

## Checks that passed

### Text
- **Diff against judge_edits:** exactly one key changed, `stay.alkoot-heritage.body`. That is the only `judge_edits` key, so there is no silent change.
  - The key order and the key count (34) are unchanged and equal to pack.json.
  - The edit's `before` equals judge-r2 byte for byte, and its `after` equals the final string.
- **The change:** «… ایک محل کے اندر ٹھہرتے ہیں، جو … سامنے ہے اور جس کی مرمت …» → «… ایک محل کے اندر ٹھہرتے ہیں۔ یہ ہفوف کے محلہ الکوت میں قصر ابراہیم کے سامنے ہے، اور اس کی مرمت کر کے اسے روایتی مہمان خانہ بنایا گیا ہے۔»
  - **Agreement:** «یہ … ہے» is singular and can refer only to «محل», since «مہمان» takes the plural «ٹھہرتے ہیں». «بنایا گیا ہے» agrees with the masculine «مہمان خانہ».
  - **Facts:** Hofuf, the Al-Koot district, opposite Qasr Ibrahim, about two hundred years old, and the restoration as a heritage inn are all kept. Nothing is added or dropped, and «اندر» (AR «داخل») is kept.
- **Letterforms, scanned over all 34 strings:** `[يكةهىأإۃ]` found none. The same scan found no U+00A0, «؛», «»», straight quotes, U+2013/2014 or Arabic-Indic digits. There are no Latin letters in the body and no space before «۔ ، ؟».
- **The body's shape:**
  - It has exactly one `\n\n` (N666) and no single `\n`.
  - It has 10 sentences, each closed by «۔».
  - The licence sentence is still byte-identical in `ix.faqs.0.a` and the body.
- **Names:** «ہفوف», «محلہ الکوت», «قصر ابراہیم», «روایتی مہمان خانہ» and «الاحساء» are unchanged. No venue name, district form or shared caption moved, so the dining siblings are not affected.
- **Blind reader:** r2 #14 is the accepted item. The reader's «اندر → میں» and the dropping of «روایتی» were rightly not taken (N662). blind-input.r3.txt carries the new body.

### Record (cumulative)
- **rulings:** N670 and N671 are identical to judge-r2, N670's round-2 `amended` line included. No new ruling, so none is owed.
- **withdrawn:** the field is absent in r1–r3. Nothing is owed: no earlier ruling is contradicted, and the N660–N666 stage-4 rulings stand as written.
- **base_amendments:** one entry, P16-test, field `ruling`.
  - Its `before` matches the termbase byte for byte (checked by string equality).
  - The `after` changes only the «ہوٹل» clause, adding «— as the navigation label only; as a kind label and in running text «ہوٹل» stands: N661, ur-stay-1». No other word of the list moves.
  - P16-test's `guard` is untouched, and it never named «ہوٹل», so no automatic guard widens.
  - The amendment is consistent with N661, which confines the refusal to `ui.nav.stay` / `stayShort`.
- **termbase_additions:** all 11 are present and none exists in the termbase.
  - Proofread r2 M1 is fixed: «سلطان بن سلمان» now carries `"status": "verified"` and a [j3] line saying why. The other 10 are unchanged from r2.
- **termbase_notes:** both target keys exist byte for byte («ہوٹل», «سعود بن نایف بن عبد العزیز»).
  - The «ہوٹل» note now names eight keys. A search of the final strings finds «ہوٹل» in exactly those eight: heroSum, kindLabels.hotel, faqs.0.a, faqs.1.a, faqs.2.q, methodP1, dv.noteP and the body.
  - It states the reader evidence as r0 #3, r1 #3 and r2 #4, and no longer doubles the batch prefix (proofread r2 R3).
- **source_defects:** SD-S1–SD-S7 are byte-identical to r2, and SD-S8 is new (Qasr Ibrahim is unexplained and unlinked, r2 #21). That makes 8.
- **_r1 / _r2 fields:** `blind_reader_rulings_r1`, `_counts_r1` and `judge_edits_r1` equal r2's copies. `blind_reader_rulings_r2`, `_counts_r2` and `judge_edits_r2` equal judge-r2's current fields. The current fields hold round 3: 21 rulings, counts 1/12/6/2, 1 edit.
- **notes:** the 69 notes of r2 are kept unchanged as the prefix, and 8 [j3] notes are appended (77).
- **stage_specific.checklist:** the [j3] lines on `aap`, `tone` and `punctuation` match the text. The punctuation counts are «۔» 31, «،» 25 and «:» 4, and the colons are in heroSum, srcNote.then, faqs.2.a and the alt (proofread r2 R2).
- **tm_pairs:** there are 34, one per key and in key order, all with `page: "stay"`. Every `ur` equals the final `strings`, the body's new text included, and every `en` equals pack.json.
- **scores_row:** it matches the merge tool's pattern `"…",YYYY-MM-DD,N,N,"…"` and has no newline. It reads round 3, score 91, and APPROVE. That agrees with `batch_score` and with the lowest per-string score (ix.faqs.1.a 91).
- **verify:** `node verify.mjs BATCH judge-r3.json` → ✓ (34 strings, 11 entries, 77 notes).
- **Merge dry run:** `node merge-memory.mjs REPO BATCH judge-r3.json` without `--write` exits 0 and prints «termbase +11 (pending)، أحكام 388 (+2 حاكم + المرحلة 4)، تعديلات 1، أسئلة 0؛ tm 1424 → 1458». The base_amendment's exact-`before` check passed. I did not run it with `--write`.
  - The «(pending)» in that line is the tool's fixed label. The entry itself is written with `status: verified`, because the tool reads `t.status`.

## RECOMMENDED

1. **The body now says «اس کی مرمت» twice in adjacent sentences (`stay.alkoot-heritage.body`)**
   - The split leaves sentence 2 «… اور اس کی مرمت کر کے اسے روایتی مہمان خانہ بنایا گیا ہے۔» directly followed by sentence 3 «… اور اس کی مرمت عبد العزیز بن محمد العبد القادر نے اپنی ذاتی کوشش سے کرائی۔».
   - The referents are the same building, so the text is correct, but the repetition is now more visible than with the earlier «جس کی مرمت».
   - **Optional fix (form only, no fact moves):** in sentence 2, «… سامنے ہے، اور مرمت کے بعد اسے روایتی مہمان خانہ بنایا گیا ہے۔». This is close to the blind reader's own suggestion (r2 #14) and keeps «روایتی».
   - It is not needed for shipping. If applied, the tm_pair for the body and judge_edits must follow.
