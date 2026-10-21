# Proofread after judge round 1: ur-stay-1 (/ur/stay/ + /ur/stay/alkoot-heritage-hotel/)

**2 MANDATORY, 3 RECOMMENDED**

Inputs: ur-05.json (before), judge-r1.json (after), pack.json, ref.json, stage-4 notes N660–N666 (ur-stay-1/ur-04.json; ur-dining-1/ur-04.json has no [s4] N66x notes of its own; ur-dining-2 has no ur-04.json yet), termbase.json and tm.json searched.

## Checks that passed

- **Diff vs judge_edits:** the changed keys are exactly the 6 `judge_edits` keys (`stay.alkoot-heritage.blurb`, `stay.continent-uqayr.blurb`, `ix.methodP1`, `dv.noteP`, `stay.alkoot-heritage.body`, `stay.alkoot-heritage.alt`). There are no silent changes, and key order is unchanged. Every `before` matches ur-05 byte for byte, and every `after` matches the final `strings`.
- **Letterforms:** I ran a regex scan `[يكةهىأإۃ]` over the 6 changed strings and found none. There is no U+00A0, no «؛», no `«»` or straight quotes, no U+2013, no Arabic-Indic digits, no Latin letters and no space before «۔» or «،».
- **Vowel signs:** U+064F appears once each in the body and the alt («بُنا»), on a common word and not a name. P17/N82 bar vowel signs only on names, so N671's pesh is not barred. The «اً» in «تقریباً» is standard.
- **Final stops:** the blurbs, methodP1, noteP and the body end in «۔». The alt ends without a stop, as before.
- **Agreement:** «پرانے ایک محل کے اندر» (oblique), «چھتیں … بنی ہیں», «کپڑا آویزاں ہے» (masculine; «آویزاں» does not inflect) and «یہ … عمارت ہے» all agree. «درجہ بندی … لی جاتی ہے، … بدل سکتی ہے» (feminine) still agrees in dv.noteP.
- **Facts:** nothing was added or dropped in any changed string, checked against both the EN and AR sources. The licence sentence is still byte-identical in `ix.faqs.0.a` and the body. The body keeps exactly one `\n\n` (N666). The names «سوق القیصریہ», «قصر ابراہیم», «محلہ الکوت», «شہزادہ …» and «عبد العزیز بن محمد العبد القادر» are unchanged.
- **N670 guard:** «ستاروں کے درجے» appears in no string. «ہوٹلوں کے ستارہ درجے» is byte-identical in `ix.methodP1` and `dv.noteP`. **N671 guard:** «سدو نامی بنائی» appears nowhere. «سدو نامی بُنا ہوا کپڑا» appears in the body and the alt. Both guards are confined to the stay pages and are proofreader-only, so neither is a wide automatic guard.
- **Rulings:** N670 and N671 cite P23, P16-test, P3c (2) and N661 consistently. There are no `base_amendments` and nothing is `withdrawn`, and both are correct, because no earlier ruling is contradicted. The rulings' ids, N670 and N671, are free in the termbase.
- **tm_pairs:** there are 34 pairs, one per key. Each `ur` is identical to the final `strings` and each `en` to pack.json.
- **Sibling agreement:** the venue names «فندق الکوت التراثی» and «فندق کانٹینینٹ العقیر» are unchanged this round. Neither the dining batches nor any other batch mentions sadu or star classifications.
- `node verify.mjs BATCH judge-r1.json` prints ✓.

## MANDATORY

1. **The merge-memory dry run FAILS: `termbase_additions` → «ہوٹل»**
   - `node merge-memory.mjs REPO BATCH judge-r1.json` (no `--write`) stops with `Error: مدخل قائم: ہوٹل`. «ہوٹل» is already a termbase key (pending, from ur-plan-1), and `merge-memory.mjs` throws on any existing key.
   - The entry's own note says it is "to be appended to the existing entry, not a second entry", but the tool has no path that appends to a term.
   - **Fix:** remove the «ہوٹل» object from `judge-r1.json.termbase_additions`. N661 is already carried into the rulings by the [s4] note. Append its text («[s4] N661: …» plus the rekhta 503 remark) to the existing entry's `note` by hand when merging, or give it a mechanism.
   - I verified the fix on a scratch copy without that entry: the dry run then passes with `termbase +12 (pending)، أحكام 388 (+2 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1424 → 1458`.

2. **Duplicate person key: `termbase_additions` → «شہزادہ سعود بن نایف»**
   - The entry's note says "To be appended to the key's entry as its attested short form (not a second person)". N665 says "A person's key identifies the person".
   - The verified key «سعود بن نایف بن عبد العزیز» already exists. The merge would create a second key, with the title «شہزادہ» inside it, for the same man. The record would then contradict its own note and N665.
   - **Fix:** remove this object from `termbase_additions`. Add the short form «سعود بن نایف» (the attested short form, title before the name) to the note of the verified key «سعود بن نایف بن عبد العزیز» with the evidence line.
   - Optionally, align «شہزادہ سلطان بن سلمان» with the line's usual key shape (name without title, title in the note, as «سعود بن طلال بن بدر» does). This part is RECOMMENDED only, because that is a new person and the merge accepts it.

## RECOMMENDED

3. **The N670 record overstates the separation (`ix.methodP1`, `dv.noteP`)**
   - The ruling and the `why` say «ہوٹلوں کے ستارہ درجے» "shares no word with the rating «درجہ بندی»". But «درجے» is the plural of «درجہ», the head of «درجہ بندی». On dv.noteP the two stand two sentences apart: «درجہ بندی بھی وہیں سے لی جاتی ہے … نہ ہوٹلوں کے ستارہ درجے».
   - **Fix:** reword the claim in N670 and the entry note to «shares no phrase; the two differ by "ہوٹلوں کے ستارہ" against "بندی"». Ask the next blind reader specifically whether he can tell the two apart.
   - Bare «ستارہ درجے», without a numeral (cf. «پانچ ستارہ ہوٹل»), is also an uncommon collocation and worth that same question.

4. **The body's `why` misdescribes the new syntax (`stay.alkoot-heritage.body`)**
   - The judge says the relative clause now sits "straight after its head «محل»". In the text it is extraposed: «… ایک محل کے اندر ٹھہرتے ہیں، جس کی مرمت کر کے اسے روایتی مہمان خانہ بنایا گیا ہے۔».
   - This is correct and natural Urdu, and «جس» can only refer to «محل». The text needs no change; correct the record's description only, so that a later stage does not "fix" it to match.

5. **dv.noteP on the inn's own page**
   - «یہاں نہ قیمتیں دی گئی ہیں نہ ہوٹلوں کے ستارہ درجے» stands on the Al-Koot page, whose kind label is «روایتی مہمان خانہ». A reader may take «ہوٹلوں» as calling the inn a hotel. This is acceptable, because the sentence is generic and the same string serves every detail page.
   - Note it in N670 as a known cost. If the owner adopts the literal fallback «ستاروں کے درجے», the issue disappears together with the N670 change.
