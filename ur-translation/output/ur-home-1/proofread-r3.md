# Proofread r3 — ur-home-1 (judge round 3 edits only)

Scope: (a) the strings that differ between judge-r2.json and judge-r3.json; (b) base_amendments N336; (c) rulings N630–N633, the amendments to N612 / N622 / N624, and tm_retire. Nothing else was re-checked.

**Result: 0 MANDATORY, 3 RECOMMENDED.** verify.mjs on judge-r3.json: `✓ 88 سلسلة، 3 مدخل معجم، 56 ملاحظة`.

---

## (a) Changed strings

A script diff of `strings` between judge-r2.json and judge-r3.json found exactly two changed keys, gate.skip and tip.friends. No key was added or removed.

### gate.skip — PASS
- r2: «سیدھے سفر کی منصوبہ بندی پر جائیں»
- r3: «سفر کی منصوبہ بندی پر سیدھے جائیں»
- Source: en "Skip to planning", ar «انتقل إلى التخطيط».
- This is exactly the form proofread r2 M1 asked for.
  - «سیدھے» now stands right before the verb. It can only be adverbial («سیدھے جائیں»), so the adjective reading «سیدھا سفر» is gone.
  - The object «سفر کی» (from N622) is kept. The button keeps the -یں pattern of the other buttons.
  - Nothing is promised about a page, and no fact is added.
- Letterforms: the regex `[يكةهىأإۃ]` finds nothing. There is no U+00A0, no Eastern digits, and no final «۔» on the button. Every ک / ی / ہ / ے / ں / ھ is correct (ھ appears only in the aspirate of «سیدھے»).
- آپ form: «جائیں» is the honorific.

### tip.friends — PASS
- r2: «… جبل الاربع ہے، جہاں خیمہ زنی اور تفریحی سفر کیے جا سکتے ہیں۔»
- r3: «صحرا کی سیر کے شوقینوں کے لیے ہفوف کے جنوب مشرق میں جبل الاربع ہے، جو خیمہ زنی اور گھومنے پھرنے کی جگہ ہے۔»
- Source: en "…is a camping and excursion destination", ar «وجهة تخييم ورحلات».
  - «جو … کی جگہ ہے» renders «وجهة». «خیمہ زنی» renders «تخييم». «گھومنے پھرنے» renders «رحلات».
  - Nothing is added: no adjective, nothing that turns it into a superlative, and no «پسندیدہ» (that word is in the published summary but not in this source).
- Published names, checked against ref.json and termbase.json:
  - «جبل الاربع» matches ref.places.arbaa.title and the termbase key.
  - «ہفوف» matches the termbase key, with no article (P1/P2).
  - There is no pleonasm: «جبل الاربع» is not followed by «پہاڑ».
- Supporting wording, checked in tm.json and ref.json:
  - «صحرا کی سیر» and «خیمہ زنی» appear in the published arbaa summary («جو خیمہ زنی اور صحرا کی سیر کے لیے پسندیدہ مقام ہیں»).
  - «جو خاندان کے ساتھ گھومنے پھرنے کی جگہ ہے» is the published jawatha-park summary (tm.json, 2026-10-15, en "a destination for family outings").
- Grammar:
  - «جو» refers back to «جبل الاربع» (m., termbase). «جگہ ہے» is the predicate, and there is no participle that would need to agree.
  - «سیر» appears once in the sentence and does not repeat tip.family's «سیر و تفریح», so the split that R3 recorded holds.
- Punctuation: «،» comes before «جو», and the sentence ends with «۔» U+06D4. There is no space before either mark, no U+00A0, and no Latin «.» or «,». The letterform regex finds nothing.

---

## (b) base_amendments N336 — PASS

- **`before` matches the current `termbase.json` `_meta.calibration_rulings[N336].ruling` byte for byte.** Script check: strict equality, 1648 = 1648 characters.
- **`after` = `before` + the appended record line only.** `after.startsWith(before)` is true. The remainder is exactly:
  `" ‖ RECORD (ur-home-1, judge r2, 2026-10-21): the «تجویز کردہ راستہ» / «اپنا راستہ خود ترتیب دیں» pair of the home page, named above as approved, retired with the old home page by N612, which takes N336 as an analogy and does not reopen visa-guide. N336's decision, its guard and every visa-guide string (incl. «سفر کا بنا بنایا راستہ») are unchanged."`
- This is character for character the line that proofread r2 M2 prescribed. That includes the label «judge r2», which proofread r2 wrote itself. The owner's 2026-10-17 text, including «approved», is untouched.
- Only `ruling` changes. `guard`, `binds`, `title` and `ruled_by` are not in the amendment.

---

## (c) Rulings, amendments, tm_retire

### Amendments to N612 / N622 / N624
- **N612 (round-3 amendment): PASS.** The analogy sentence now reads «it decided regulatory routes (the visa routes and later regulatory options), not itineraries», which is proofread r2 R1 verbatim. The tm_retire / N633 cross-reference and the append-only N336 record are described correctly. The forms it quotes are all present in judge-r3 strings: plan.routeTitle «آپ کا سفری منصوبہ», plan.kindTrail «سیر کا راستہ», and rail.ch-plan / finale.plan «سفر کا منصوبہ بنائیں».
- **N622 (amended): PASS.** It quotes the new form. It adds the sentence r2 M1 asked for («سیدھے» before «سفر» reads as the adjective). It records why «براہِ راست سفر کی …» and «سیدھا منصوبہ بندی پر جائیں» were refused. Its citations are correct: plan.link «سفر کی منصوبہ بندی کی مکمل رہنمائی» and rail.ch-plan «سفر کا منصوبہ بنائیں» are present.
- **N624 (amended): PASS.** It quotes the new form. It records the deliberate split of the two «رحلات» (proofread r2 R3) and binds later pages to it. It cites the jawatha-park and arbaa wording correctly, as verified in (a). It refuses «کیمپنگ» under P16. The round-2 line "Agreement with the nearest conjunct «سفر»" has rightly been dropped, because no verb agrees with it any more.

### New rulings
- **N630: PASS, with a wording note (R1).** It agrees with N622 and with the gate.skip edit.
- **N631: PASS.** Its premise checks out: N621 does name the candidate «جبل القارہ: پٹی سرکائیں اور دن کا وقت اپنے ہاتھ سے بدلیں» for "a round of its own" if a third reader stumbles. qarah.title in judge-r3 is unchanged («جبل القارہ: دن کا وقت اپنے ہاتھ سے بدلیں»). owner_questions[qarah-title] exists and gives the candidate as an option. See R3 for one word in that question.
- **N632: PASS.** The chips «خاندان» / «دوست» / «اکیلے» and the legend «آپ کس کے ساتھ سفر کر رہے ہیں؟» are present as quoted, and the fallback is recorded.
- **N633: PASS.** Its claims all check out against the files:
  - Neither retired English source matches any `en` in pack.json.
  - events.ctaD «… اپنا راستہ ترتیب دیں۔» and visa-guide next.items.4.parts «… سفر کا بنا بنایا راستہ …» are both in tm.json and are not in the retire list.

### tm_retire — PASS
Both pairs are in tm.json exactly as given, and each matches once by `en` and once by `ur`:
1. `{"en":"Suggested route","ur":"تجویز کردہ راستہ","page":"ui","field":"home.route.eyebrow","date":"2026-10-12"}`
2. `{"en":"Arrange your own route in “My saved places”","ur":"“میرے محفوظ کردہ مقامات” میں اپنا راستہ خود ترتیب دیں","page":"ui","field":"home.route.link","date":"2026-10-12"}`

The `page` and `field` values in tm_retire match the tm.json records.

---

## MANDATORY

None.

## RECOMMENDED

### R1. N630: state the agreement condition fully, and give «براہِ راست» its own reason
- As written, N630 forbids adverbial «سیدھے» "before a masculine noun in the oblique". The same adjective reading arises before a masculine plural noun in the direct case («سیدھے راستے»).
- Suggested wording: "never directly before a masculine noun it can agree with (oblique singular or plural)".
- «براہِ راست» does not inflect, so "for the same reason" is loose. It is refused because an invariable word placed before a noun reads as attributive («براہِ راست پرواز»), not because of agreement.
- No string moves.

### R2. tm_retire: one more old-home «راستہ» pair
- tm.json also holds ui `home.route.lead`, which ends «یہ راستہ جوں کا توں اپنا لیں، یا اس کے پڑاؤ اپنی مرضی سے بدل لیں۔» ("Take the route as it stands…"). It uses «راستہ» in the same sense of a generated or suggested itinerary that N612 retires.
- Suggestion: either add it to tm_retire, or record in N633 why it is left. Other old-home pairs (the times, «پہلا دن») are used as precedent by the brief, so retiring the whole page is not intended.
- Neither choice affects this pack: its English does not match any pack string.

### R3. owner_questions[qarah-title]: «Keep as published»
- The first option reads «Keep as published». qarah.title is a string of this batch and is not yet published on /ur/.
- Suggested wording: «Keep as approved in this batch».
