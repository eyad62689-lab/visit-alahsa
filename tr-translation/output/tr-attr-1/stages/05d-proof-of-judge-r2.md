# 05d: proof of judge round 2 (tr-attr-1)

Scope: the three strings edited in `07-judge.r2.json` (`changes`): `jawatha-mosque.body`, `jawatha-mosque.faq.4.a`, `ameeriah.body`. Read against pack `en` and `arabic_body`, the termbase additions, rulings A1-*/A2-*, and the other 61 strings.

## Mechanical checks (all PASS)

- `strings` for the three keys equal the `after` of their `changes` entries; the `before` equals the r1 string.
- Only these three keys differ between `07-judge.r1.json` and `07-judge.r2.json`; the other 61 strings are byte-identical to r1.
- **tm_pairs: 64 pairs, 64 unique page.field keys, all 64 `tr` byte-equal to `strings`; all `en` equal the pack.** Zero mismatches.
- Checker `verify.mjs tr-attr-1 07-judge.r2.json`: RESULT [OK], 0 findings. (It rewrites the existing `07-judge.r2.json.check.txt`, a 1-byte file already present; I created no new `.check.txt`.)
- Letters (`ç ğ ı İ ö ş ü`): none stripped, no i/İ case errors in the three strings (İslam'ın, İslam'ı, Hüfuf'un, Çarşısı'nın, Şeyh, El-Hubeyş, Tarihî).
- Apostrophe: only U+0027, no U+2019, no U+00A0, no double space, no leading or trailing space. Apostrophes appear only on proper names (İslam'ın, Medine'deki, Nebevî'den, El-Ahsa'daki, El-Ahsa'nın, Hüfuf'un, Çarşısı'nın). No `vaha'da`.
- Quotes `“…”` only; no `«»`, no straight `"`. No `sen/senin`. Latin digits.

## Edit 1: `jawatha-mosque.body`: OK

Two changes, both correct.

(a) Reordered clause: "Kemerlerinin ve duvarlarının önünde durduğunuzda, yüzyıllar boyunca süren namazları ve toplanmaları, halkı İslam'ı ilk kabul edenler arasında olan bir vahada gözünüzde canlandırırsınız."
- The English order is "you summon centuries of prayer and gathering in an oasis whose people…", and this follows it. Nothing added or dropped.
- The two accusatives (`namazları`, `toplanmaları`) are plural plus accusative, so they are correct. The comma before `halkı` stops it reading as an object of `toplanmaları`. The locative `vahada` now sits next to the verb.
- The Arabic ("فتستحضر قروناً من الصلاة والاجتماع في واحةٍ كانت من أوائل من دخل أهلها الإسلام") has the same order.

(b) "El-Ahsa'daki El-Calaniye Camii, Şeyh Muhammed bin Ebu Bekir el-Mulla Camii ve El-Hubeyş Camii ile birlikte restore edildi."
- All three names are byte-identical to the r2 `termbase_additions` `tr` fields (El-Calaniye Camii, Şeyh Muhammed bin Ebu Bekir el-Mulla Camii, El-Hubeyş Camii).
- `Camii ile` is written apart, as is normal. `El-Ahsa'daki` is a proper-name suffix with the apostrophe.
- This is faithful to the English and the Arabic ("مساجد الجعلانية…والحبيش"). Making each name carry its own generic adds no fact, so ruling A2-mosque-list is applied correctly.
- The project name "Prens Muhammed bin Selman Tarihî Camileri Geliştirme Projesi" is untouched.

P9, P10, P11 and the other rulings are not touched or contradicted.

## Edit 2: `jawatha-mosque.faq.4.a`: OK

"Evet. “Prens Muhammed bin Selman Tarihî Camileri Geliştirme Projesi” kapsamında, El-Ahsa'daki El-Calaniye Camii, Şeyh Muhammed bin Ebu Bekir el-Mulla Camii ve El-Hubeyş Camii ile birlikte restore edildi."
- The clause from `“Prens` to `restore edildi.` is **byte-identical** to the body clause (verified programmatically). The three mosque names take one form in body and FAQ.
- The elliptical subject mirrors the English ("Yes, under … together with …"), and the question (`Cüvasa Camii restore edildi mi?`) supplies it. Nothing added or dropped. The closing full stop follows the sentence rules.

## Edit 3: `ameeriah.body`: OK

"El-Emiriye Okulu, En-Naasil mahallesindeki Ümm el-Hubeysi yükseltisinde bulunur; eski Hüfuf'un doğusunda, El-Kaysariye Çarşısı'nın yakınındadır."
- The order of facts is the English one: rise, district, east of old Hofuf, near the Qaisariyah Souq. The only addition is the copula that the split requires (`yakınındadır`), which the judge's note discloses. It changes no fact.
- Suffix harmony is correct:
  - `Hüfuf'un`: last vowel u, so `-un` (not `-ün`).
  - `Çarşısı'nın`: termbase vowel ı.
  - `mahallesindeki`, `yükseltisinde`, `doğusunda`, `yakınındadır`.
- Apostrophes appear only on proper names.
- Names are byte-identical to the termbase additions (El-Emiriye Okulu, En-Naasil, Ümm el-Hubeysi, El-Kaysariye Çarşısı) and consistent with `ameeriah.area` ("En-Naasil mahallesi — eski Hüfuf'un doğusu") and the title.
- The semicolon follows ruling A2-locative-chains. The rest of the paragraph (Hicri 1356 (1937) / 1360 (1941), Beyt es-Sekafe (Kültür Evi)) is unchanged and matches the Arabic.

OPTIONAL (no action needed): the two parallel locatives are joined by a comma only (`doğusunda, … yakınındadır`). `doğusunda ve … yakınındadır` would mirror the English "and". The comma form is correct Turkish and reads fine.

## Consistency with the other 61 strings

- No other string uses El-Calaniye, Mulla, or El-Hubeyş (the `camileri…` hit in `jawatha-mosque.summary` is just "en eski camilerinden").
- Cüvasa Camii and Cüvasa Parkı forms across the page are unchanged and match the termbase additions.
- The ameeriah title and area names agree with the body.

## Verdict

- `jawatha-mosque.body`: OK
- `jawatha-mosque.faq.4.a`: OK
- `ameeriah.body`: OK (one optional note)
- tm_pairs: 64/64 byte-equal to `strings`.
- MANDATORY fixes: none.
