# 05d proof of judge round 3 — tr-attr-11 (sawsan-gardens summary = body)

Scope: the only change after round 2 is «atmosferinde» -> «havasında» in `sawsan-gardens.summary` and `sawsan-gardens.body` (ruling `A11-sawsan-word`).

Checked text: «El-Ahsa vahasının havasında kuşların sergilendiği bir bahçe.»
Source (en): "A garden for displaying birds amid the atmosphere of the Al-Ahsa oasis." (ar: حديقة لعرض الطيور وسط أجواء واحة الأحساء.)

## Verdict: SOUND

### 1. Grammar and suffixes — SOUND
- «El-Ahsa vahası»: the termbase name plus a common noun with the compound suffix -sı (vaha ends in a vowel, back vowel a, so -sı). It is the same frame as «Ankara şehri» and the Hasawi rule in A9 (El-Ahsa + noun).
- «vahasının»: the genitive of a possessed noun takes -nın (after -sı, back unrounded vowel). Correct.
- «havası» -> «havasında»: the possessive -sı plus the locative -ndA, harmonising with the back vowel a, gives -nda. Correct. The locative is written together, not as the particle «de/da».
- «kuşların sergilendiği»: sergile- + passive -n + the -DIK participle with 3rd-person possessive gives sergilendiği. The subject is plural «kuşlar» in the genitive, so the genitive plus -(s)I agreement is correct. The participle clause modifies «bahçe». Correct.
- «bir bahçe»: the indefinite noun phrase follows its relative clause. Correct.
- No apostrophe is needed (no suffix on a proper noun here). No ASCII-stripped letters. No «», no U+00A0, a closing full stop. The checker also found nothing.

### 2. TDK sense of «hava» — SOUND
The sense I rely on is sozluk.gov.tr/gts?ara=hava, fetched 2026-10-30, sense 12:
«İçinde yaşanılan ve etkisinde kalınan ortam; atmosfer» (example: «bir tören havası vardı»).
Senses 2 and 3 are the weather senses («Meteoroloji ile ilgili olayların bütünü»; «Canlılar üzerindeki etkisine göre hava yuvarının durumu»). Sense 12 glosses «hava» with «atmosfer» itself, so «havasında» is the dictionary-backed equivalent of "amid the atmosphere".

### 3. Could a reader take «havasında» as weather? — SOUND, low residual risk
«hava» is polysemous. The phrase is «vahasının havasında», with a place (the oasis) as possessor, and the sentence contains no cue for weather (no season, temperature, sky or time). The weather senses normally take «havası» of a time or season, or a bare «havada/havalarda». A garden "for displaying birds" in "the oasis's air/weather" would be an odd claim, so the ambience reading wins. Three independent blind readers already used «hava» in the ambience sense (on-05, on-r1, on-r2). I would not change the text. The word is not safer than the previous one in the abstract. The judge's evidence that it is the natural idiom is what justifies it.

### 4. Sense, nothing added, nothing lost — SOUND
- "amid the atmosphere of the Al-Ahsa oasis" -> «El-Ahsa vahasının havasında»: the same content. The locative covers "amid"; «hava» covers "atmosphere" (TDK sense 12). Nothing added.
- "A garden for displaying birds" -> «kuşların sergilendiği bir bahçe». The purposive "for displaying" is rendered as a relative clause, "a garden where birds are displayed". This is the same fact, the purpose being carried by what the garden does. The judge kept it from earlier rounds and no sense is lost or invented (no «eşsiz», no «büyüleyici»). The word order is not changed and no complement is stacked before the verb (a single complement).
- The ar «أجواء» (atmospheres/ambience) agrees with the en. The ar «وسط» agrees with "amid".

### 5. body byte-identical to summary — SOUND
`strings["sawsan-gardens.summary"] === strings["sawsan-gardens.body"]` is true in `07-judge.r3.json` (both 134 hex chars, identical). Both `changes` entries carry the same before/after.

### Defects
None. No fix proposed.

## Checker
`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a11 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-11 .../stages/07-judge.r3.json --prev .../stages/07-judge.r2.json`

RESULT [OK] 0 findings (full text: 07-judge.r3.json.check.txt)
