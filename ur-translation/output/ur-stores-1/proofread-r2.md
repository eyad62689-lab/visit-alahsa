0 MANDATORY, 2 RECOMMENDED

# Proofread after judge round 2 — ur-stores-1 (/ur/online-stores/)

Files read: RUNBOOK-r5.md, PROOFREAD-BRIEF-r2.md, judge-r2.json (under review), judge-r1.json (its input), ur-05.json, ur-04.json, pack.json, ref.json, termbase.json, tm.json, blind-input.r2.txt, blind-reader.r1.md. Nothing edited except this file.

## Tool lines (quoted)

- verify.mjs: `OK judge-r2.json: 157 strings, 82 termbase additions, 55 notes`
- merge-memory.mjs (dry run, no --write): `termbase +81 (pending), 1 identical skipped, 1 notes appended; rulings 459 (+5 stage 4, +8 judge); amendments 1; owner questions 0; tm 1708 -> 1865`
  The amendment step throws on a `before` mismatch, so it ran clean; I also compared byte for byte against the [s4] N779 note of ur-04.json: identical (N779 enters the termbase only through that note; `grep N779 termbase.json` = 0 today, which is expected).

## (1) Diff — clean

- Same 157 keys, same order. Changed vs judge-r1.json: exactly 6 keys: `stores.empty`, `stores.store.store-27.description`, `stores.store.store-28.description`, `stores.faq.1.a`, `stores.faq.2.a`, `stores.faq.7.a`. They are exactly the 6 new tail entries of `judge_edits`. No silent change.
- `judge_edits` is cumulative (19 entries over 14 keys). The first 13 entries are byte-identical to judge-r1.json's `judge_edits`. Chain checked per key from ur-05.json: before→after links byte for byte, final `after` equals judge-r2 `strings` for all 14 keys (store-28: 2 steps, faq.1.a: 2, faq.2.a: 3 incl. the r1 pair, faq.7.a: 2, others 1). The other 143 strings equal ur-05.
- All 157 strings appear verbatim in blind-input.r2.txt, except the three placeholder strings (`stores.lead` {n}, `stores.shotAlt`/`stores.logoAlt` {name}), which render. No r1 text of the 6 changed keys survives there.

## (2) Text of the 6 changed strings — clean

- Letterforms: no ي ك ة ه ى أ إ ۃ, no U+0660–0669/06F0–06F9, no «؛», no U+00A0, no zero-width, no double or edge spaces, in any of the 157 strings. Only diacritics: tanween in «تقریباً»/«مثلاً», damma in «بُنا» — pre-existing, correct.
- Stops: all six end in «۔»; `stores.empty` is a sentence and its published sibling (tm ui/list.empty «تلاش کے مطابق کوئی مقام ابھی نہیں ملا۔») ends in «۔» too; no ASCII punctuation except the comma inside «27,000».
- store-28: «27,000 سے زیادہ پیروکار» matches en «more than 27,000 followers» and P10 («thousands as the source», candidate A «grouped as the English source groups it»; scale starts at one lakh). No «ہزار» left anywhere. Rest of the card unchanged.
- stores.empty: «تلاش کے مطابق کوئی دکان نہیں ملی۔» — the sibling's wording; «دکان» + feminine «ملی» agree; no «ابھی» added (en has no «yet»). Correct.
- store-27: «دانے اور … سامان ملتے ہیں» — plural masculine, agreement correct; nothing added or dropped (en: beans, brewing equipment, fast delivery inside Al-Ahsa).
- faq.1.a: «ان معیارات سے» names the subject of «ensuring» (ar «مما يضمن»); antecedent now clear; facts identical to en/ar (Khalas, Razeez, KSA and Gulf, fresh). Stands alone (Visit Al-Ahsa carried as «یہ ویب سائٹ» per N1).
- faq.2.a: «اس بات کی تسلی کر لیں کہ …» is idiomatic Urdu for «make sure that»; «حساوی چوغہ» per N643; N779/N787 claim «یونیسکو میں درج ورثہ مانا جاتا ہے» intact; no fact moved.
- faq.7.a: «… فریج میں رکھنا بہتر ہے، اور … فریزر زیادہ موزوں ہے» — same advice, same «several months» limit, no duplicated predicate; stands alone.
- Placeholders: `{n}` once in `stores.lead`, `{name}` once each in `stores.shotAlt`/`stores.logoAlt` (script compared all 157 against pack en).
- N780: the five «معمول» brackets (03, 04, 08, 09, 12) are the byte-identical «(کھجور کی بھرائی والی مٹھائی)»; each of the five strings has exactly one «معمول»; «عقال (سر کے پہناوے کی ڈوری)» in store-19, faq.0.a, faq.8.a (the eight occurrences the ruling names).

## (3) Record — clean

- «دکان» addition: gone from `termbase_additions` (80 → minus «دکان» → minus the combined variety entry → plus four = 82). `termbase_notes` has one item `{ur: "دکان", append: "[ur-stores-1 j2] Also the sense «store (shop)» …"}` on the existing entry (en «booth …», gender مؤنث, plural «دکانیں» — the note's gender and plural agree with it). The cited sibling nav.stores «Online Stores» → «آن لائن دکانیں» exists in ref.json/tm.json.
- Variety entries «سکری», «صقعی», «عجوہ», «حلیبی»: each has en, ar, ur, gender «مؤنث», kind plant, source, note; none exists in the termbase; unchanged otherwise vs r1. All 82 additions have en, ur, source, gender; no duplicate `ur`; the only key already in the termbase is the identical National Center entry (skipped by the tool); no normalised-key collision.
- N779 `base_amendments`: `before` equals the [s4] note text byte for byte; `after` differs only by the ellipsis wording; `withdrawn` is `[]`; N787 title/ruling now say "amended, not withdrawn", explain why withdrawal would free later batches, and keep the owner fallback. IDs N780–N787 inside `ids.judge` (780+), none present in the termbase (highest existing N797 is outside this line's range as the dry run accepted the push; N775–N779 are stage 4's). Cited rulings (N338, N660, N682, N3, N733, N700, N284, N292, N377, N643, N281, N174, P16, P16-test, P23–P25) exist.
- `tm_pairs`: 157, one per key (field), same order, every `ur` identical to the final string, every `en` identical to pack en, page «online-stores».
- `scores_row`: 5 CSV columns (page, date, loop=2, score=90, quoted decision); matches `batch_score` 90, the lowest `per_string` (faq.9.a = 90), axes 28/25/19/8/10 = 90, counts 4+39+17+1 = 61 = `blind_reader_rulings` length, 19 edits / 14 keys, TM 157.
- Source defects SD-S1…SD-S15 present; SD-S14 (follower count) and SD-S15 match the cards.

## MANDATORY

None.

## RECOMMENDED

### R1. notes[44] ([j1]) is stale after round 2
Quote: `Twelve strings changed in thirteen edits; the other 145 strings are byte-identical to ur-05.`
It sits beside notes[54] which says 19 edits in 14 keys and 143 identical, so the two notes contradict each other once merged into the notes record.
Fix: replace that last sentence of notes[44] with `Cumulative against ur-05 at the end of round 2: fourteen strings changed in nineteen edits; the other 143 strings are byte-identical (see the [j2] count).` (Re-run verify.mjs after; it only checks the notes exist.)

### R2. The termbase notes of «معمول» still say the gloss stands once
Quote (additions[«معمول»].note): `[s1] … الشرح مرة في بطاقة 3؛ …` followed by `[j1] N780: the bracket … stands on every card that carries the word (03, 04, 08, 09, 12)`. Same for «عقال»: `[s1] الشرح … مرة في أول ذكر (بطاقة 19 والسؤال 0)` vs `[j1] N780: bracket in store-19, faq.0.a and faq.8.a`.
The [j1] tail corrects it, but the entry reads as self-contradicting to the next batch.
Fix: in both notes replace the [s1] clause "مرة …" by `(superseded: see N780 below)` — e.g. `[s1] الشرح في بطاقة 3 (حلّ محله N780 أدناه)` and `[s1] الشرح عند أول ذكر (حلّ محله N780 أدناه)`.

No other change advised. Considered and left alone: faq.1.a «معیار اور ڈبہ بندی کے معیارات … ان معیارات» repeats the root (the source's own "quality and packing standards"; the judge rejected the replacement «ضوابط», which is published in the sense of "terms"); card 04 triple «کھجور» (bracket must stay byte-identical, N780).
