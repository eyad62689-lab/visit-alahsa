# 05d — independent proofread of the judge's five owner-ruling strings (tr-attr-10-owner)

Scope: the five `changes` of `07-judge.json` against the refreshed English in `pack.json` and `BRIEF.md`. No stage file edited.
Checked per string: letters (ç ğ ı İ ö ş ü), TDK spelling, suffix harmony, apostrophes (U+0027 only; scanned: only U+0027, no U+2019, no U+00A0, no stray non-Turkish glyphs), sense against the English (nothing added, nothing lost).

## qaisariyah.body (last sentence only) — SOUND
Text: «Ziyaret saatleri ve ücretler aşağıdaki ziyaret bilgileri kartında yer alır; çarşının en iyi saatleri sabah ve akşamdır.»
- EN: "... and its best hours are in the morning and the evening." Maps one to one: «en iyi saatleri» = best hours, «sabah ve akşam» = morning and the evening (the "and" is kept; bestTime/FAQ 4 keep "ya da", as in the English, so the divergence is faithful). «akşamdır» (-dır after a voiced stem ending in m) correct.
- The earlier part of the body and the heading are byte-identical to before; the first clause is unchanged tm material.
- The two apostrophes in the string (Hüfuf'taki, El-Ahsa'da) are on proper names, U+0027.

## qaisariyah.practical.0.value — SOUND
Text: «08.00–12.00 ve 15.30–22.00 (Cuma sabah ve ikindi sonrası)»
- EN: "(Friday: morning and after the afternoon prayer)". Nothing added: no clock for Friday, and 15.30–22.00 stays the daily range. Nothing lost: the Friday exception is kept.
- «ikindi» is the native word for the ʿAsr prayer and its time; «ikindi sonrası» = after ikindi. «Cuma» capitalised per A10-days. En dash U+2013 with no spaces, Latin digits, `.` as the time separator per P10. No apostrophe needed.
- First-read test («Cuma sabah ve ikindi sonrası» = "Friday: morning and after the ʿAsr prayer"?): yes for a Turkish reader. In a compact card row the elliptical «Cuma sabah …» is a normal schedule shorthand, and «sabah» and «ikindi sonrası» are both time-of-day expressions in parallel, so the reader takes two Friday periods. Residual risk is small: «sabah ve ikindi» could be glimpsed first as one unit modified by «sonrası» ("after morning and ikindi"), which is nonsense, so the reader re-parses at once.
- Would «Cuma sabahları ve ikindiden sonra» be plainer? Marginally: «ikindiden sonra» is the textbook TDK form and removes even the momentary mis-parse; «sabahları» makes the habit explicit. It is not required. Both are correct Turkish and both carry the same facts; the judge's form is shorter for a card and matches «sonrası» usage («öğle sonrası», «akşam sonrası»). No defect. If the owner or the editor wants the plainest reading, the smallest fix is the substitution above in this string (and the same in faq.0.a); it would not change any fact.

## qaisariyah.faq.0.a — SOUND (one stylistic note, not a defect)
Text: «08.00'den 12.00'ye ve 15.30'dan 22.00'ye kadar açıktır; Cuma günleri sabah ve ikindi sonrası açıktır.»
- EN: "8 am to 12 noon and 3:30 to 10 pm; on Fridays, the morning and after the afternoon prayer." Same facts, no clock added for Friday.
- Suffixes on numerals follow the spoken form: sekiz → -den, on iki → -ye, on beş otuz → -dan, yirmi iki → -ye; the first clause is unchanged from the approved final. U+0027 before the suffix on numerals, as in the approved pages (the proper-name-only rule concerns names; numeral apostrophes are TDK-correct and already in `final.json`).
- «açıktır» twice in one sentence reads a little repetitive. The judge's reason (two parts of the day when it is open, so «açıktır» rather than «açılır») is sound, and the repetition is mild and helps the sentence stand alone (FAQ answers must). Optional trim, not needed: «Cuma günleri sabah ve ikindi sonrası.» would be a fragment and is not recommended in a FAQ answer.
- «Cuma günleri» as in the approved string (A10-days).

## ardh-alhadarat.practical.1.value — SOUND
Text: «Yetişkinler için 50 Suudi riyali (SAR), çocuklar için 10 SAR — tek bilet Medeniyetler Diyarı'nı ve Cebel el-Kare'yi kapsar»
- EN: "SAR 50 for adults and SAR 10 for children — one ticket covers the Land of Civilisations and Jabal Al-Qarah". Two prices, the single-ticket clause intact.
- «çocuklar için 10 SAR» after «Yetişkinler için 50 Suudi riyali (SAR)» reads cleanly: the parenthesis defines «SAR» once and the second figure uses it bare, per A10-SAR. A reader takes it as "10 Saudi riyals for children" without a second gloss; «50 Suudi riyali (SAR), çocuklar için 10 SAR» parallels the English «SAR 50 … SAR 10». No age is attached to «çocuklar» (the English gives none). The comma instead of «ve» is natural Turkish for a paired price list.
- Suffixes: «Diyarı'nı» (possessive -ı + accusative -nı, back vowel) and «Cebel el-Kare'yi» (front vowel, buffer y) correct; both unchanged from the approved row. The em dash is the row's existing separator, not a heading, so the heading rule does not apply.

## ardh-alhadarat.faq.1.a — SOUND
Text: «Yetişkinler için 50 SAR, çocuklar için 10 SAR; biletler Cebel el-Kare'deki mağara deneyimini de kapsar.»
- EN: "SAR 50 for adults and SAR 10 for children, and tickets include the Al-Qarah Mountain caves experience." Same facts; the caves clause is unchanged from the approved text («Cebel el-Kare'deki», locative -de + relative -ki, front vowel: correct).
- Bare «SAR» is acceptable in the FAQ: the gloss belongs to the first mention on the card (A10-SAR); this FAQ answer was already «50 SAR» in the approved final. The `de` in «deneyimini de kapsar» is the "also" particle, written apart, correct.
- The FAQ question is «ne kadar?» and the answer lists both prices, so it stands alone.

## Summary
All five SOUND. No defects, no suggested required fix. Optional polish only (judge's call): «Cuma sabahları ve ikindiden sonra» for the card and the FAQ would be marginally plainer than «Cuma sabah ve ikindi sonrası»; the current form is understood at first read and is acceptable.

## verify.mjs
Command: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a10 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-10-owner C:/Users/truyr/node-store/va-wt/tr-a10/tr-translation/output/tr-attr-10-owner/stages/07-judge.json`

`RESULT [OK] 0 findings (full text: 07-judge.json.check.txt)`
