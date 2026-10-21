# Proofread r1 — ur-home-1 (judge round 1 edits)

Scope: the 13 `judge_edits`, rulings N610–N613, and the 3 `termbase_additions`.
I confirmed the scope with a diff of `ur-05.json` against `judge-r1.json` `strings`. Exactly 13 keys differ and they are the 13 `judge_edits` (gate.title, water.lead, water.springsL, qarah.title, qarah.drag, map.title, map.lead, plan.lead, plan.wait, plan.routeTitle, tip.friends, tip.soloMuseum, finale.lead). No key is missing, and no other key changed.

**Totals: 2 MANDATORY, 5 RECOMMENDED.**

---

## Mechanical checks on the 13 changed strings: PASS

- **Letterforms.** A regex over the 13 strings for `[يكةهىأإۃ]`, U+00A0, U+06F0–06F9 and U+0660–0669 found **none**. In the ruling and termbase-addition text, the only hits are Arabic source words quoted by design (ارتوازية، يغذّي، تروي، عين، حرّك، اليوم، بيدك، يناديك، عيون، الضحى، مسارك).
- **Punctuation.**
  - Sentences close with `۔`.
  - The headings and labels have no final stop: gate.title, qarah.title, map.title, plan.routeTitle, water.springsL.
  - None of these occurs anywhere: `؛`, `«»`, straight `"`, Latin `.` or `,`.
  - No string has leading or trailing whitespace.
  - tip.friends dropped a colon that stood before a full clause, which is correct.
- **آپ forms and the button pattern.** Every new imperative takes the polite -یں form: بدلیں، سرکائیں، چنیں. There is no تم / تمہارا / تیرا and no address تو.
- **Agreement.**
  - «سفری منصوبہ» is masculine (منصوبہ, m.). Checked in every string that refers to it:
    - plan.lead: «آپ کا سفری منصوبہ … سامنے آ جائے گا»; «اس میں … شامل ہوں گے» agrees with مقامات.
    - plan.wait: «اپنا سفری منصوبہ».
    - plan.routeTitle: «آپ کا سفری منصوبہ».
    - No other pack string names the generated itinerary. saved.build «ان سے اپنا سفر ترتیب دیں» and tip.family «اپنے سفر میں» use سفر (m.) and are consistent.
  - gate.title: نخلستان (m.) takes «کھلتا ہے».
  - water.lead: ذخیرہ (m.) takes «دیتا … رکھتا».
  - water.springsL: چشمے (m. pl.) takes «کرتے ہیں».
  - qarah.drag: پٹی (f.) takes «دی گئی».
  - map.lead: مقام (m.) takes «دکھایا گیا ہے».
  - tip.friends: «خیمہ زنی اور سیر و تفریح کی جا سکتی ہے» uses feminine singular agreement with the nearest conjunct. This is acceptable for two abstract feminine nouns.
- **Published names.** Each is verbatim from the termbase or ref: جبل القارہ، جبل الاربع (m.)، ہفوف (bare exonym)، الاحساء کا عجائب گھر، جھیل الاصفر (f.).
- **C15.** gate.title keeps «دنیا کا سب سے بڑا نخلستان», with no «کھجور کا» and no «قدرتی».
- **Pairs.** These are unchanged and still hold: rail.ch-plan = finale.plan = nav.planVisit «سفر کا منصوبہ بنائیں», and plan.title «تین سوالوں میں سفر کا منصوبہ بنائیں». The new «سفری منصوبہ» is built on that pair, as N612 says.
- **qarah.drag.** It matches the slider's tick labels qarah.time.dawn «فجر» and qarah.time.sunset «غروب آفتاب».
- **«سیر و تفریح».** The judge says this is "the page's" wording. It is: tip.family carries it.
- **TM.** No `tm.json` pair matches the English of any of the 13 keys, so no verbatim TM sentence was overridden.

---

## MANDATORY

### M1. map.lead: «ہر» adds a universal claim the source does not make

- Judge's text: «نقشے پر **ہر** سیاحتی مقام اپنی اصل جگہ پر دکھایا گیا ہے۔»
- Source: Arabic «المعالم في مواضعها الحقيقية»; English "Landmarks in their true positions."
- Problem: the map shows six landmarks (BRIEF ch. 4: «خريطة بستة معالم»). «نقشے پر ہر سیاحتی مقام … دکھایا گیا ہے» reads first as "every tourist site is shown on the map", which is a completeness claim the page cannot keep.
- Ruling: P19 says «صيغة التفضيل أو الإطلاق (الأكبر، الأقدم، الوحيد) دعوى وتلزمها العربية». «ہر» is an absolute of exactly that kind, and the Arabic has none.
- The judge's goal was the passive «دکھایا گیا ہے», which stops the reading that places move. The plural keeps that and drops the quantifier.
- **Exact form:** «نقشے پر سیاحتی مقامات اپنی اصل جگہوں پر دکھائے گئے ہیں۔ کسی مقام کو چھو کر اسے دیکھیں اور اپنے سفر کے لیے محفوظ کریں۔»
- The second sentence is unchanged. مقامات (m. pl.) takes «دکھائے گئے ہیں».

### M2. N612: its ground misstates N336, an owner decision

- N612 says: «N336 (owner, 2026-10-17) replaced «راستہ» on the same ground».
- What N336 actually did: it replaced «راستہ» only for the eight **visa routes**. It explicitly **kept** the itinerary sense: «"راستہ" keeps its two other senses on the page untouched: the road or way of arrival … and the itinerary ("سفر کا بنا بنایا راستہ", the approved "تجویز کردہ راستہ" pair of the home page)».
- Effect on rulings: N612 does not contradict N336 in effect. N336 binds visa-guide, and N612 does not reopen other pages or `events.ctaD`. But N612 presents N336 as precedent for replacing the *itinerary* «راستہ», which is the one sense N336 preserved.
- Why it is mandatory: a binding ruling must not attribute to the owner a decision he did not make.
- **Exact correction to N612's ground sentence (replace it):** «Ground: the blind reader took «آپ کا راستہ» as road directions and met «راستہ» at two levels in one panel (ur-home-1 #26). The same reading (route word taken as a road) led the owner in N336 (2026-10-17) to replace «راستہ» for the visa routes; N336 kept the itinerary «راستہ» on visa-guide («سفر کا بنا بنایا راستہ»), and N612 does not reopen that page.»
- The rest of N612 stands. That includes retiring the old-home pair «تجویز کردہ راستہ» / «اپنا راستہ خود ترتیب دیں» with the old home.
- N336's own text still names that pair as "approved". The coordinator should add a cross-reference to N336 when N612 is written into `_meta.calibration_rulings`: "home pair retired by N612". This is a record update only, and no visa-guide string moves.

---

## RECOMMENDED

### R1. N610's rationale contradicts N600's evidence; the string itself stands

- N600 placed the artesian component in «خود بخود»: «"خود بخود" spells out the defining component of artesian (rising under its own pressure)».
- N610 drops «خود بخود» but says «زمین سے پھوٹتے» "keeps the artesian component". It also rejects «قدرتی چشمے» because it "drops «ارتوازية»".
- The published evidence N610 cites works against that. In `src/content/attractions/zaki-alsalem-farm.md` the phrase is «… ایک **قدرتی چشمہ** بھی ہے جو زمین سے پھوٹتا ہے»: the site's wording for an *ordinary natural* spring, standing right beside «قدرتی».
- The string adds no fact and is true to the Arabic «عيناً … تروي الواحة». The artesian nuance is carried only partly, by «پھوٹنا» (gush).
- Suggested fix: word N610 as a cost rather than a keep. "«پھوٹتے» carries the gush of water rising out of the ground; the full artesian sense (rising under its own pressure) is not spelled out, after «خود بخود» failed the blind reader; recorded as a known cost."

### R2. water.lead repeats «پانی»

- «زیر زمین **پانی** کا وسیع ذخیرہ نخلستان کو **پانی** دیتا ہے» uses the word twice in one clause.
- «يغذّي» means "feeds / nourishes". Suggested: «… نخلستان کی پرورش کرتا ہے …». This keeps «سیراب» out, as N610 wants, and avoids the echo.
- If the judge keeps «پانی دیتا ہے», the cost should be recorded.

### R3. tip.friends: «سیر» twice, and two Arabic words merge

- «صحرا کی **سیر** کے شوقینوں کے لیے … جہاں خیمہ زنی اور **سیر** و تفریح کی جا سکتی ہے» repeats «سیر».
- «سیر و تفریح» now renders both tip.family «التنزّه» and tip.friends «رحلات». The two tips never show together, so this is a minor point.
- A possible form: «… جبل الاربع ہے، جہاں خیمہ زنی اور تفریحی سفر کیے جا سکتے ہیں۔» This is optional, and the facts are unchanged either way.

### R4. qarah.drag: «دی گئی» is stiff

- «تصویر پر **دی گئی** پٹی» reads like a textbook ("the strip given on the picture").
- More natural: «تصویر پر **بنی** پٹی» or «تصویر پر **لگی** پٹی». Either keeps the location and the guard against the bandage sense. The content is unchanged.

### R5. N611 "binds" is wider than its wording supports

- N611 binds "later /ur/ slider instructions".
- The location phrase «تصویر پر دی گئی» belongs to this page's layout, where the slider sits on the photo.
- Suggested binds: "later slider instructions locate the strip where it sits (the principle); the words «تصویر پر» only where the control sits on an image".

---

## Open question settled: does «سوق» or «عین» in an in-scope string owe a P3c gloss?

**Not required.**

1. **No in-scope string contains either name.**
   - A search of all 13 changed strings, and of every `judge-r1.strings` value, for «سوق» and «عین» found **0 hits**.
   - The names occur only in published `ref.json` text, which binds byte for byte (BRIEF trap 2): the card or label titles «عین النجم پارک» and «سوق القیصریہ», and two published summaries, «المبرز کے مغرب میں تاریخی عین النجم کے گرد بنا ایک پارک۔ …» and «سوق القیصریہ، جہاں عطر کی مہک ہے …».
2. **Titles and labels stand bare.** P3c-labels: «in a label, a list, a title and a meta description the name stands bare, byte-identical to its termbase key; the plain Urdu generic may stand in the neighbouring line and never touches the name».
3. **The gloss bracket is owed on the name's own page, never in a summary.** P3c point (1): «A gloss is owed only on the page whose own name it is, once, at the first mention in the body; never in a title, a kicker, a summary, a label or a question.» The home page is neither name's own page, and the only running-text occurrences are summaries.
4. **The «نامی» form of point (2) is for an attraction page's body.**
   - P3c's guard: «a termbase name that begins with «سوق » or «عین » and is not the page's title is followed by « نامی » and its Urdu generic at its first mention in the body».
   - P3c binds «Every attraction page», and later pages titled «سوق» / «عین» get «the gloss once in the body of their own page».
   - The home page has no attraction body. The summaries are published text this batch may not edit.
   - The Urdu generics already stand near the names, never touching them: «بازار» in memory.title / plan.int.markets, and «چشمے» in the عین النجم summary and water.springsL. This is what P3c-labels allows.
5. **Consequence.** The judge's candidate (b), «سوق القیصریہ نامی بازار» / «عین النجم نامی چشمہ» on the home page, is **not written**. If the owner ever wants the published summaries changed, that belongs in the site-wide amendment round the judge already offers in `owner_questions[published-ur-labels-flagged]`, not in this batch.

---

## Termbase additions

| ur | gender | Finding |
|---|---|---|
| «زمین سے پھوٹتے چشمے» | m. | PASS, with the N610 rationale caveat in R1 |
| «چاشت» | m. | PASS. Rekhta «اسم، مذکر». Unchanged by the judge's edits |
| «سفری منصوبہ» | m. | PASS. No key collision |

The «سفری منصوبہ» entry's source should cite N336 as amended by M2, as an analogy rather than precedent.
