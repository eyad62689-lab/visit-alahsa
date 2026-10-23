2 MANDATORY, 5 RECOMMENDED

# Proofread after judge round 1 — ur-stores-1 (/ur/online-stores/)

Text before: ur-05.json. Judge: judge-r1.json (13 edits in 12 keys, N780–N787, one withdrawal, 80 termbase_additions). Independent reader, not a scorer.

## What was checked and is clean

- Diff of the two `strings` objects: exactly 12 keys differ (store-04, 08, 09, 10, 12, 19, 28 descriptions; faq.1.a, 2.a, 3.a, 7.a, 8.a). They are exactly the `judge_edits` keys (faq.2.a has two chained edits; the second `before` equals the first `after`; every `before` equals ur-05 or the previous edit byte for byte; every final `after` equals `strings`). No silent change; 145 strings byte-identical to ur-05; key order identical; 157 keys.
- Letterforms in all 157 final strings: zero hits for ي ك ة ه ى أ إ ۃ, U+00A0, U+06F0–06F9, U+0660–0669, «؛», «», straight quotes, zero-width and bidi controls. No ASCII . , ? ; ! after Urdu, no space before ۔ ، and no double or edge spaces. Every changed description or answer ends in ۔ (not a card value, so P26 does not apply). No Latin letters in the changed strings. No ھ on a non-aspirate. No banned anglicism, arabism or hindi-leaning word from `style_rules`, no تم/تیرا forms.
- Placeholders: stores.lead {n} once, shotAlt and logoAlt {name} once; untouched. `verify.mjs ur-stores-1 judge-r1.json` prints OK.
- «معمول» bracket «(کھجور کی بھرائی والی مٹھائی)» is byte-identical to the bracket on card 03, and occurs exactly once on each of cards 04, 08, 09 and 12. Every English «maamoul» key (03, 04, 08, 09, 12) is covered. «عقال (سر کے پہناوے کی ڈوری)» is byte-identical in store-19, faq.0.a and faq.8.a. Every English «iqal» answer or description carries it; faq.8.q is a heading and takes no bracket. Card 09 «حلقوم» bracket is untouched.
- Facts: nothing added or dropped against en and ar in any of the 12 strings. The store-28 split keeps imports, local roasting, insulated cups, whole-oat granola with no added sugar, the Hofuf cafe and the Instagram account. «جس کا کہنا ہے کہ» is the same claim as «states it was founded». «خوشبودار اقسام» stands for «scented options». faq.1.a, 3.a, 7.a, 8.a keep the source claims; faq.2.a keeps the UNESCO claim (N779 content). «کئی مہینوں تک» becomes «جو کئی مہینوں تک ہو سکتی ہے» ('up to several months'). Every FAQ answer still stands alone.
- Agreement checked in each changed sentence (ملتے ہیں with the masculine plural, بکتے ہیں for پیالے plus گرینولا, بکتی ہیں for دستکاریاں, ہو سکتی for مدت, کھانی ہوں for کھجوریں); address forms are آپ-honorific («تسلی کر لیں», «رکھیں»).
- Rulings N780–N787: ids are in the batch range (pack ids: s4 775–779, judge 780; the next batch starts at 790) and unused in the termbase (its highest id is N755) and in every other batch's judge files. No `guard` is added anywhere, and N780 states that the termbase entries keep `gloss: null` so the once-per-page P3b guard does not engage. The N780 scope (five «معمول» plus three «عقال» occurrences, eight in all) matches the strings. The cited precedents exist and say what is claimed: N338 and N660 (4) (a unit read alone, JSON-LD), N660 (5) and N700 (2)/(3) (names), N777 (the eleven loans, and the refused «کپ», «پلیٹ فارم», «ڈائریکٹری», «ڈلیوری»), P16-test, P23–P25, N3 and N733 (اشتراک). N785's published evidence checks out in tm.json («چھانٹیں» in ui/fruits.chipsAria and restaurants-cafes/ix.kindAria; «اواخر» in ui/fruits.g0.f0.season; «چنائی» in lemon-farm/bestTime; «ضوابط» in «شرائط و ضوابط»). Reader items cited in the rulings (accepted 10, rejected 33, source defect 13, out of scope 3 = 59) agree with `blind_reader_rulings`, `blind_reader_counts` and `source_defects` (SD-S1…S13, all keys exist). `base_amendments` is empty, so no `before` is exposed to a byte mismatch.
- `withdrawn` N779: the target exists in the `[s4]` notes of ur-04.json, which merge-memory.mjs pushes before the withdrawal, so the merge will not fail on it.
- `tm_pairs`: 157, one per key, `ur` identical to the final `strings`, `en` identical to pack, page `online-stores`. The only same-`en` collision with tm.json is «Dates» (a calendar-date label elsewhere), a different sense.
- `scores_row` matches the merge regex.

## MANDATORY

### M1. termbase_additions[47] «دکان» collides with an existing termbase key and makes merge-memory.mjs refuse the batch

- Key: `termbase_additions` index 47 (kind generic, `en` "store (shop)", gender مؤنث, plural «دکانیں»).
- The termbase already holds `terms["دکان"]` with `en` = `booth (at a fair; "register for a booth")` (palm-village judge entry, status pending). The meaning differs. I ran `node va-scratch/ur-r5/tools/merge-memory.mjs ur-stores-1 judge-r1.json` (no `--write`): it stops with `Error: existing entry with another en: دکان`. The merge skips an addition only when the `en` is equal case-insensitively, and entry 47's is not.
- The carried [s5] note that calls this "harmless" (same gender and plural) is wrong, because `en` is the test. The judge's [j1] note says nothing about it.
- Fix: delete addition 47 («دکان», "store (shop)") from `termbase_additions`, leaving 79 entries. Correct the [s5] note that says «دکان» "duplicates the termbase headword … harmless" so it records the removal and the reason (the existing «دکان» entry means booth; the page's shop sense is the ordinary word and needs no second entry under the same key), and change the [j1] note's "80 entries, as ur-05" to 79. Re-run `merge-memory.mjs` without `--write` to confirm it prints the totals. The other 79 entries pass: apart from «دکان» only [79] «کھجور کے درختوں اور کھجوروں کا قومی مرکز» matches an existing key, and it has the same `en`, so it is skipped as identical. There are no duplicates inside the list. Every entry has en, ur, source, gender and kind. The 79 non-«دکان» entries carry no Arabic letterform, and the gender spellings use ک U+06A9.

### M2. store-28: «27 ہزار سے زیادہ پیروکار» breaks P10 (figures below one lakh keep the source's digits)

- Key: `stores.store.store-28.description`, quoted «…جس کے 27 ہزار سے زیادہ پیروکار ہیں۔».
- en: "more than 27,000 followers"; ar: "27 ألف". P10 says «thousands as the source («16,000»)» and, for a figure below one lakh, «written in digits, grouped as the English source groups it («10,000», «1,600»); the Urdu scale begins at one lakh»; checklist item 8 repeats it ("below one lakh, digits grouped as the English groups them"). No published Urdu in tm.json writes a digit plus «ہزار», and no ruling licenses it. Stage 5's checklist passed it as "below one lakh", which is not the same as correct. verify.mjs accepts it only because the digit 27 occurs in the Arabic source.
- Fix: «…جس کے 27,000 سے زیادہ پیروکار ہیں۔». The string is in the judge's changed set, so the judge's final text should carry it. The [s1] note that lists «27 ہزار» can stay as history.

## RECOMMENDED

### R1. N787 withdraws all of N779, but only the pronoun «اسے» changes

- merge-memory.mjs turns a `withdrawn` entry into `status: "withdrawn"` for the whole ruling, and the runbook treats withdrawn rulings as non-binding. The judge's own `why` says N779's claim, source-defect log and literal fallback "still bind", and N779 also binds "any later /ur/ text repeating the claim". N787 binds `faq.2.a` only, so after the merge the termbase marks N779 dead while a later batch repeating the UNESCO claim is no longer bound by it.
- Better: drop the `withdrawn` entry and add a `base_amendments` item on N779 (`field: "ruling"`, `before` = the full N779 text exactly as the [s4] note gives it after «): », `after` = the same text with the quoted wording changed to «… ہاتھ سے بُنا ہوتا ہے اور یونیسکو میں درج ورثہ مانا جاتا ہے»). Alternatively keep the withdrawal and widen N787's `binds` and `ruling` to restate the part of N779 that continues to bind later batches (keep the claim, log it, literal fallback). This is not mandatory because the judge brief allows `withdrawn` and the record is not silent.

### R2. termbase_additions[55] is a four-in-one key with a single gender

- The key is «سکری / صقعی / عجوہ / حلیبی» (kind plant, gender مؤنث); the termbase has no separate «سکری», «صقعی», «عجوہ» or «حلیبی» (only «خلاص»). A lookup by one variety name will not find it, and the text uses the varieties without any form of the combined key. Split it into four entries (en Sukkari, Saqai, Ajwa, Halibi), as the [s5] pass already did for «پھولوں کی سجاوٹ / گلدستہ». Not a merge blocker.

### R3. store-04: three «کھجور» in a row around the new bracket

- «کھجور کا شیرہ، کھجور کے معمول (کھجور کی بھرائی والی مٹھائی) اور کھجور کی مٹھائیاں». The bracket must stay byte-identical (N780), so the only lever is the head: «معمول (کھجور کی بھرائی والی مٹھائی)» without the preceding «کھجور کے» would drop the English "date maamoul" qualifier, so the judge's choice is defensible. The judge already records it as repetitive; leave it unless the reader flags it.

### R4. faq.7.a: «… فریج میں رکھنا بہتر ہے، اور … فریزر میں رکھنا بہتر ہے»

- The parallel is correct and the verb is restored, but «رکھنا بہتر ہے» repeats within one sentence. Optional tightening: «… اور زیادہ مدت کے لیے، جو کئی مہینوں تک ہو سکتی ہے، فریزر زیادہ موزوں ہے»; no fact changes. Leave if the next reader finds it clear.

### R5. faq.2.a: «یہ تسلی کر لیں کہ دکان منظور شدہ ہے»

- Grammatical and a clear repair of «یقین کر لیں». The slightly more idiomatic frame is «اس بات کی تسلی کر لیں کہ …»; optional.
