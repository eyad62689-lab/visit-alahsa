# 05d: proof of judge round 3 (tr-attr-1)

Scope: the one string edited in `07-judge.r3.json` (`changes`): `jawatha-mosque.body`. Read against pack `en`, `arabic_body`, and the other 63 strings.

## Verdict: OK (no MANDATORY items; one OPTIONAL note)

## Mechanical checks (all PASS)

- `changes` has exactly one entry (`jawatha-mosque.body`). Its `before` is byte-equal to the r2 string, and its `after` is byte-equal to the r3 string.
- `strings`: 64 keys in the same order in r2 and r3. Only `jawatha-mosque.body` differs. The other 63 strings are byte-identical to r2.
- `tm_pairs` (an array of `{en, tr, page, field}`): 64 pairs, 64 unique `page.field` keys, and every key exists in `strings`. All 64 `tr` are byte-equal to r3 `strings`. Zero mismatches, zero strings without a pair.
- r2 vs r3 `tm_pairs`: only index 36 (`jawatha-mosque.body`) differs, and its `tr` is the new string. Its `en` is unchanged.
- Other top-level fields (batch, stage, decision, return_to_stage, scores, batch_score, rulings, termbase_additions) are identical to r2. Decision APPROVE, round 3.
- New string: 963 characters, no double space, no leading or trailing space. Apostrophes are only U+0027 on proper names, and quotes are only `“…”`. Latin digits.
- I did not re-run `verify.mjs`, because it rewrites the existing `.check.txt` and you asked me to touch no other file. I created no `.check.txt`.

## Edit: `jawatha-mosque.body`: OK

After:
"Kemerlerinin ve duvarlarının önünde durduğunuzda, yüzyıllar boyunca süren namazları ve toplanmaları gözünüzde canlandırırsınız. Burası, halkı İslam'ı ilk kabul edenler arasında olan bir vahadır."

- **Turkish.** Both sentences are correct.
  - Sentence one is now "when you stand before its arches and walls, you picture the prayers and gatherings that went on for centuries". Subject, object and verb sit together with nothing between them. The comma before `canlandırırsınız` is gone, as it should be.
  - `namazları` and `toplanmaları` are plural plus accusative, both correct.
  - Sentence two uses the standard copular form `X, [relative clause] bir vahadır`.
  - Within the relative clause, `halkı … olan` is correct, and `İslam'ı ilk kabul edenler arasında` is idiomatic.
  - The register (`siz`) matches the rest of the body.
- **Faithful to the English and the Arabic.**
  - Dropped: nothing. Arches, walls, centuries, prayer, gathering, oasis, people, "among the first to embrace Islam" are all present.
  - Added: only the deictic subject `Burası` and the copula `-dır` that the split needs. The oasis relative clause is unchanged.
  - Fact: the Arabic "في واحةٍ كانت من أوائل من دخل أهلها الإسلام" gives the same content. The first-to-embrace claim attaches to the oasis's people, as before. No dates, names or numbers are touched.
- **Consistent with the rest of the body.**
  - The other sentences are identical to r2.
  - `Burası` appears nowhere else in the 64 strings, so there is no clash.
  - The paragraph already uses `vaha` for the oasis (`qasr-ibrahim` has `vahanın`), so the wording is consistent.
  - `halkı` ties the sentence to the oasis, so `Burası` cannot be read as "the mosque is an oasis".

## OPTIONAL (no change needed)

- `Burası` points back to the place just pictured, which is the mosque's setting. It is slightly less explicit than the English "in an oasis", but that is the least-addition way to split, and I would leave it. Adding `El-Ahsa` or `vaha` as the subject would add a word the source does not have at that point.
- Tense: the English and Arabic say "were / كانت" (past), while `olan … vahadır` is timeless present. It is acceptable for a standing historical claim, and the r2 `olan` was the same.
