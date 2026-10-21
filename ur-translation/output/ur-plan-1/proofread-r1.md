# Proofread after judge round 1 — ur-plan-1 (/ur/plan-your-trip/)

**2 MANDATORY, 1 RECOMMENDED**

Inputs: `ur-05.json` (before) against `judge-r1.json` (judge text, `judge_edits`, `rulings`, `base_amendments` = [], `termbase_additions`, `notes`, `tm_pairs`); `pack.json`, `ref.json`, the termbase (P26, N222, N201, N69, N645 as staged in `ur-04.json`), `merge-memory.mjs`, and the approved zh/de/ru blocks of `PlanTripView.astro`.

## Mechanical checks (all PASS)

- **Diff against `judge_edits`:** 63 keys in both files, same order. Changed keys = exactly the 9 `judge_edits` keys (getThere.2.d, practical.0.v, practical.1.v, practical.2.v, practical.3.v, tips.1.d, faq.0.a, faq.1.a, faq.9.a). No silent change. Every edit's `before` equals the ur-05 text byte for byte, and every `after` equals the final `strings`.
- **Letterforms** `[يكةهىأإۃ]` over all 63 final strings: none.
- **Digits** U+0660–0669 / U+06F0–06F9: none. **U+00A0:** none. **«» ؛ and straight "**: none. **Latin `.` or `,` after an Urdu letter:** none. **Space before ۔ or ،:** none. **Latin SAR:** none. **U+2013:** none. **تم / تمہارا / تیرا:** none.
- **آپ forms:** practical.1.v «آپ … رہ سکتے ہیں»; faq.9.a «اپنی … موازنہ کریں» (the reflexive is bound to the implied آپ of the imperative); faq.1.a «آپ … شامل کر سکتے ہیں». All honorific.
- **Agreement:** practical.2.v «جس نے اپنی روایات کو سنبھال رکھا ہے»: the object is marked with «کو», so the default masculine singular «رکھا ہے» is correct. getThere.2.d «… چلنے والی … ریل گاڑیاں رکتی ہیں»: feminine plural (termbase «ریل گاڑی», مؤنث). practical.1.v «سیاحتی تفریح گاہیں ہیں»: feminine plural.
- **Published names, byte for byte:** in faq.0.a and faq.1.a, every `ref.places` title the sources name is present byte-identical: جبل القارہ، “ارض الحضارات”، قصر ابراہیم، سوق القیصریہ، مسجد جواثا، جھیل الاصفر، قصر صاہود. Also «المبرز» and «ہفوف» as in the termbase. The P3b gloss «(تہذیبوں کی سرزمین)» stays once, at faq.1.a, followed by «نامی». The page titles in faq.1.a are “سیاحتی مقامات” and “میرے محفوظ کردہ مقامات”, matching the siblings.
- **Facts against both sources:** in getThere.2.d, the station, the Riyadh–Dammam line, the company, both durations, Abqaiq and the closing clause all stand. In faq.0.a, 2020, 2018 and every name stand. 'Welcoming' is folded into «مہمان نوازی», which the Arabic supports (its closing has no 'welcoming'). In faq.1.a, the list is complete and «شامل ہیں» stays non-exhaustive. In faq.9.a, budget, location, comparing options and reviews, booking sites and the neutrality bracket all stand. In practical.1.v, «ٹھہرنے کے لیے» restates the label and adds no new fact. For tips.1.d see R1.
- **Colon in running text (faq.1.a «… یہ شامل ہیں: …»):** this has precedent in the published Urdu (tm: «… معتدل رہتا ہے: …»; N547).
- **N650:** the ruling holds. The four practical values now end in U+06D4. The approved en, zh, de and ru values of the same four keys all end with a full stop (checked in `PlanTripView.astro`). P26's `binds` names attraction-card fields only (`area_ur`, `bestTime_ur`, `value_ur`), so N650 does not contradict it. Its guard is confined to the four keys and is not machine-read. No other string ends differently because of it.
- **`tm_pairs`:** 63 pairs, one per key, no duplicate. `ur` is identical to the final `strings` and `en` is identical to `pack.json` for every key.
- **`verify.mjs` on judge-r1.json:** `✓` (63 strings, 10 entries, 65 notes).
- **`base_amendments`:** empty, so there is no `before` to match.

## Findings

### M1 — MANDATORY — broken record: N645 enters the termbase live, not marked withdrawn

N650 says «N645 is withdrawn», and the judge's notes say «N645 superseded by N650». But N645 exists only as the stage-4 note in `ur-04.json`:

> `[s4] N645 (practical.N.v take no final «۔»): P26 extends to the four dt/dd value cells of this page. …`

`merge-memory.mjs` (lines 37–41) parses every `[s4] Nxxx (title): …` note of `ur-04.json` and pushes it into `_meta.calibration_rulings` as a live ruling (`binds: ur-plan-1`). Nothing in judge-r1.json marks it withdrawn: `base_amendments` is `[]`. After the merge, the termbase would carry N645 («no final ۔ on practical.N.v») and N650 («final ۔ on practical.N.v») side by side. N645 would read as standing and would be silently contradicted, not withdrawn.

**Fix:** add to `judge-r1.json` `base_amendments`. These run after the stage-4 push (merge lines 44–50), so `R.find('N645')` succeeds.

```json
{ "id": "N645", "field": "title",
  "before": "practical.N.v take no final «۔»",
  "after": "WITHDRAWN by N650 (judge, ur-plan-1 round 1): practical.N.v take no final «۔»",
  "why": "Superseded by N650 on blind reader r0 #21/#22 and the approved en/zh/de/ru values; the record must show the withdrawal." }
```

The `before` above is the title as the merge regex extracts it from `ur-04.json`, byte for byte. Alternatively, amend `ruling` with a leading «WITHDRAWN (N650).» Either way, the merge dry run must show N645 marked.

### M2 — MANDATORY — faq.9.a: the resort stands without its offer, against N222's guard, decided only in a note

N222's guard says a resort is «سیاحتی تفریح گاہ» «with its offer named in the same sentence». It binds «every later resort (منتجع)», and N201 points the same way. The judge applied it in practical.1.v («ٹھہرنے کے لیے جدید ہوٹل اور سیاحتی تفریح گاہیں»), on the blind reader's #23: he read the bare phrase as an amusement spot. But the judge kept faq.9.a's first sentence bare:

> «الاحساء میں ہفوف اور المبرز بھر میں جدید ہوٹل اور سیاحتی تفریح گاہیں ہیں۔»

The reasoning is in a `[j1]` note: the question asks for places to stay, and the next sentence frames the list. Two problems:

- **(a)** An FAQ answer is emitted alone as `acceptedAnswer.text` in the FAQPage JSON-LD. It cannot lean on its question.
- **(b)** A standing guard is set aside by a note, with neither a ruling nor a `base_amendment`. That is a contradiction left in the record.

**Fix:** preferred, the text. Name the offer in the first sentence, and drop the second «ٹھہرنے» by letting «کرائے کے» govern both nouns. That matches the Arabic «… وشاليهات ومزارع للإيجار», and no fact is added or lost:

> «الاحساء میں ہفوف اور المبرز بھر میں ٹھہرنے کے لیے جدید ہوٹل اور سیاحتی تفریح گاہیں ہیں۔ ان کے علاوہ روایتی مہمان خانے اور چھٹیاں گزارنے کے لیے کرائے کے مکان اور فارم بھی ہیں، جہاں آپ کھجور کے درختوں کے بیچ ٹھیٹ مقامی ماحول میں رہ سکتے ہیں۔ …» (rest unchanged)

Then:
- withdraw the `[j1]` faq.9.a note
- update the `judge_edits` entry and the `tm_pairs` entry for faq.9.a
- rerun `verify.mjs`

If the judge keeps the text instead, the exception must be put on the record as a `base_amendment` to N222's `guard`, stating the case. The amendment's `before` must be N222's current guard byte for byte: «For the proofreader, not machine-read: a resort is «سیاحتی تفریح گاہ» (feminine) with its offer named in the same sentence; «تفریح گاہ» is never written for a park and never without «سیاحتی».» The exception must also not depend on the question, because of (a).

### R1 — RECOMMENDED — tips.1.d: «history» folded into the adjective

> «… اور تاریخی مقامات کی سیر کے لیے سردیوں میں۔»

EN 'winter for the landmarks and history' and AR «لزيارة المعالم والغوص في التاريخ» give two objects. The edit keeps one: history survives only as «تاریخی». The judge charged −1 accuracy for this himself.

**Fix:** a form that keeps both objects without the «تاریخی … تاریخ» echo the reader disliked: «… اور مشہور مقامات کی سیر اور یہاں کی تاریخ سے واقفیت کے لیے سردیوں میں۔». The judge chooses; this is not required for shipping.
