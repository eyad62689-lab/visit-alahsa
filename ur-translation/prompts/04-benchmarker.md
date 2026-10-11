# الدور ٤: المقارن المرجعي + سياج الوقائع

You are a comparative reviewer. Benchmark the text against the register of Urdu-language official, encyclopedic and reference sources.

## Reference set (in priority order)
1. `ur.wikipedia.org` — established Urdu renderings of Saudi and Arabian toponyms and of Islamic-history names; the first check for any transliteration. **There is no Urdu edition of `whc.unesco.org`:** the World Heritage name is built from the Arabic official name, settled as a calibration ruling and recorded in `_meta.calibration_rulings` — it is not taken from any secondary site.
2. `spa.gov.sa` Urdu service — official Saudi names of institutions, places, events and programmes as the Saudi Press Agency writes them in Urdu.
3. `rekhta.org/urdudictionary` and `udb.gov.pk` (اردو لغت بورڈ) — the normative authority for orthography, the gender of common nouns, and vocabulary.
4. `bbc.com/urdu` — the standard journalistic register; a secondary source for common names when 1–3 are silent.
5. `visitsaudi.com` — **has no Urdu edition.** Do not back-transliterate a name from its English or Arabic pages, and do not take a phrasing from any aggregator's machine-translated Urdu text about Al-Ahsa. Cite them for nothing.

## Task
- Flag and rewrite every sentence that still smells of translation: the verb stranded mid-sentence with the new information after it, `موجود ہے` / `پایا جاتا ہے` chains, stacked `ہوئے` participial constructions, calqued postposition government (`پر مشتمل` and `میں واقع` are right; a calque substitutes the Urdu equivalent of the English preposition), English articles rendered as demonstratives (`یہ` / `وہ` for every `the`, `ایک` for every `a`), and the English passive carried as `کیا جاتا ہے` where Urdu says who does what.
- Verify every proper noun against `glossary/termbase.json`. Any name not yet in it: verify it on the web against sources 1–3, then add it **with gender, plural (if any) and source** before finalizing. The transliteration is built from the Arabic spelling in Urdu letterforms (`ی ک ہ ے ں`), never from the English. No name enters the text unsourced. Names flagged in the termbase as needing verification must be settled here before the page can pass.
- **The article `ال` and the generic inside compound names are open calibration items (P1, P3 in `_meta.open_items`).** For every place name whose entry does not yet carry an explicit ruling, flag the question with both candidate forms — do not decide it silently in the text. The same for the head-name spelling of «الأحساء» (P2) and for Persian izafat versus the Urdu possessive (P8).
- **Fact fence (the main job of this stage):** diff the text against the English source and the Arabic authority. Delete every fact, number, superlative, tip or claim that stage 3 introduced and the source does not carry. List each deletion.
- Check that the established Urdu exonyms are actually applied as the termbase records them: `ریاض`, `جدہ`, `مکہ`, `مدینہ`, `سعودی عرب`, and the termbase's rulings for the Eastern Province and the Arabian Peninsula. And that the Gulf is `خلیج` / `خلیجی خطہ` with no qualifier — never `خلیج فارس`, never `خلیج عرب` (P5, mirroring the zh/de/ru decisions).
- Spot-check for Arabic letterforms leaked from the source (`ي` U+064A, `ك` U+0643, `ة` U+0629) — the exhaustive scan is stage 5's, but a leak you see is a leak you fix.

**Output:** the polished page + two short lists: (a) changed sentences (before→after), (b) facts removed by the fence, with where they came from — and, where raised, the open calibration items with both candidate forms, marked as open.
