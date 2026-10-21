# Proofread after judge round 2: ur-stay-1 (/ur/stay/ + /ur/stay/alkoot-heritage-hotel/)

**1 MANDATORY, 4 RECOMMENDED**

Inputs: judge-r1.json (before), judge-r2.json (after), pack.json, ref.json, the stage-4 notes N660–N666 (ur-stay-1/ur-04.json) and N680–N687 (ur-dining-1/ur-04.json; ur-dining-2/ur-04.json has no [s4] N6xx ruling of its own), dining sibling text (ur-dining-1 ur-05.json, the highest file, since no dining judge file exists yet), and the blind-reader reports r0 and r1. termbase.json and tm.json were searched.

## Checks that passed

- **Diff against judge_edits:** the changed keys are exactly the 4 `judge_edits` keys: `ix.heroSum`, `ix.methodP1`, `dv.noteP` and `stay.alkoot-heritage.body` (three changes). There is no silent change and the key order is unchanged. Every `before` matches judge-r1 byte for byte, and every `after` matches the final `strings`.
- **Letterforms:** I ran the regex `[يكةهىأإۃ]` over the 4 changed strings and found none. The scan also found no U+00A0, no «؛», no `«»` or straight quotes, no U+2013 or U+2014, no bidi or ZWNJ marks, no Arabic-Indic or Extended digits, no Latin letters, no space before «۔ ، ؟», no Latin point after an Urdu letter and no CR. The diacritics in the body are the existing ones (the «اً» of «تقریباً» twice and the pesh of «بُنا», N671).
- **Punctuation:** all four strings close with «۔». The new colon in `ix.heroSum` («الاحساء میں ٹھہرنے کی جگہیں: …») replaces the source's em dash and matches the dining sibling's meta description («… آپ کا رہنما: …»). The body keeps exactly one `\n\n` (N666).
- **آپ forms:** the body's new close «یوں یہاں ٹھہر کر آپ تاریخی شہر کے اندر رہتے ہیں، اس کے کنارے پر نہیں۔» has an honorific plural verb. There is no تم, تمہارا or address-تو.
- **Agreement:** «… ایک محل کے اندر ٹھہرتے ہیں، جو … قصر ابراہیم کے سامنے ہے اور جس کی مرمت کر کے اسے روایتی مہمان خانہ بنایا گیا ہے». Here the singular «ہے» rules out «مہمان» as the antecedent of «جو», so both relatives can refer only to «محل». In «سوق القیصریہ اور سوق الفوارس نامی بازار … فاصلے پر ہیں» the plural agrees with the two souqs. In «درجہ بندی … لی جاتی ہے اور بدل سکتی ہے» the feminine subject governs both verbs. «ہر جگہ کے مختصر تعارف میں وہی بیان کیا گیا ہے جو …» is the impersonal passive and agrees correctly.
- **Facts against EN and AR:** no change adds or drops a fact. The body keeps Hofuf, the Al-Koot district, the position opposite Qasr Ibrahim, «تقریباً دو سو سال», the restoration as a heritage inn, «چند قدم», «تقریباً آدھے کلومیٹر» and "inside the city, not on its edge". «اندر» renders AR «داخل», and the reader's «بیچ میں» was rightly not taken. `dv.noteP` adds no «صارفین کی», and `ix.methodP1` adds no «صرف». The body's location matches `ix.faqs.0.a` and the area line «محلہ الکوت، قصر ابراہیم کے سامنے». The licence sentence is still byte-identical in `ix.faqs.0.a` and the body.
- **Names:** «الاحساء», «ہفوف», «محلہ الکوت», «قصر ابراہیم», «سوق القیصریہ», «سوق الفوارس», «گوگل میپس», «روایتی مہمان خانہ» and «ہوٹلوں کے ستارہ درجے» (byte-identical in `ix.methodP1` and `dv.noteP`, N670) are all unchanged. No venue name, district form or shared caption moved, so the dining batches are not affected.
- **Rulings:** this round adds no new ruling. N670 is re-issued with its claim corrected to «shares no phrase», and an `amended` line records round 2 (proofread r1 items 3 and 5). The decision and the guard are unchanged, and the guard is still proofreader-only and confined to the stay pages. N671 is unchanged. There are no `base_amendments` and nothing is `withdrawn`, and neither is owed: the corrected claim is in a ruling that has not yet entered the termbase. N670 and N671 are still free ids in the termbase.
- **termbase_notes (new field):** both target keys exist byte for byte: «ہوٹل» (pending, from ur-plan-1) and «سعود بن نایف بن عبد العزیز» (verified). Both `append` texts are non-empty. `merge-memory.mjs` appends them to the existing `note` with « · ur-stay-1 (2026-10-21): » and creates no second key. This fixes both MANDATORY items of proofread r1.
  - The Saud note agrees with the verified entry. Its source already records the ur.wikipedia article title «سعود بن نایف», and the note cites N665 correctly.
  - The «ہوٹل» note agrees with the entry's existing «سرائے = khan» remark and with N661.
- **termbase_additions:** I searched the termbase for all 11 keys, including the reshaped «سلطان بن سلمان», and none exists. A substring search for «سلطان بن سلمان», «درجہ بندی», «ستارہ», «کونتننت» and «کانٹینینٹ» also found no other key. Both persons now carry `kind: "person"`, which is the termbase's existing kind value.
- **tm_pairs:** there are 34 pairs, exactly one per key, all on page `stay`. Every `ur` is identical to the final `strings` and every `en` to pack.json.
- `node verify.mjs BATCH judge-r2.json` prints ✓ (34 strings, 11 entries, 69 notes).
- **Merge dry run:** `node merge-memory.mjs REPO BATCH judge-r2.json` without `--write` passes, exit 0: `termbase +11 (pending)، أحكام 388 (+2 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1424 → 1458`. I did not run it with `--write`.

## MANDATORY

1. **The «سلطان بن سلمان» addition would merge as unverified, which contradicts its own record (`termbase_additions` → «سلطان بن سلمان»)**
   - The entry's `source` cites the ur.wikipedia article «سلطان بن سلمان آل سعود», read 2026-10-21. Its note says «[s4] VERIFIED by N665».
   - The object has no `status` field. `merge-memory.mjs` therefore writes `status: "pending"` and appends «: pending — لا شاهد متحقَّق في الدفعة» to that note.
   - The merged entry would then say "VERIFIED" and "no verified evidence" in one breath. This is a broken record.
   - Precedent: the verified entry «سعود بن نایف بن عبد العزیز» is likewise a key that differs from its article title, and other judge files set `"status": "verified"` on such additions (for example visa-guide/judge.json).
   - **Fix:** add `"status": "verified"` to this object. If the judge holds that the short key is not itself attested, replace «VERIFIED by N665» in the [s4]/[j2] note with «pending: the reference title is «سلطان بن سلمان آل سعود»». Either way, the record must say one thing.
   - (Not a text change. `strings` is unaffected.)

## RECOMMENDED

2. **The stage_specific record is stale after this round's edits (`stage_specific.checklist`)**
   - `aap` still reads «PASS — no «آپ» needed». The body now addresses the reader with «آپ … رہتے ہیں».
   - `tone` still lists «بنائی آویزاں ہے», a form N671 retired in round 1. The text has «بُنا ہوا کپڑا آویزاں ہے».
   - `punctuation` counts «۔ (30) ، (29)» and lists the colons as "srcNote, faqs.2.a and the alt". `ix.heroSum` has since lost a «،» and gained a colon.
   - `stage_specific.changed` is `[]`.
   - **Fix:** add a «[j2]» line to `aap`, `tone` and `punctuation` with the current facts (the آپ close in the body, the «بُنا ہوا کپڑا» form, the heroSum colon), or mark the checklist as the stage-5 record of ur-05.json. A later stage that trusts it would otherwise "verify" text that no longer exists.

3. **The «ہوٹل» termbase note: the use list is incomplete and the reader claim is overstated (`termbase_notes` → «ہوٹل»)**
   - **Use list:** the note's «In use: ix.kindLabels.hotel, ix.heroSum, ix.faqs.1.a, ix.faqs.2.q» copies N661's binds list. The final text also has «ہوٹل» in `ix.faqs.0.a` and the body («پہلا ہوٹل», «روایتی ہوٹل کا اجازت نامہ»), and «ہوٹلوں» in `ix.methodP1` and `dv.noteP` (N670). **Fix:** list all eight keys, or write «In use: every string of the batch; see N661, N662, N670».
   - **Reader claim:** «The Pakistani roadside-eatery sense was put to two blind readers» overstates. Neither blind input asks about it, and neither report mentions eateries. What the reports show is that neither reader flagged it, and both treated the place as lodging: r0 #3 says «a hotel I book», and r1 #3 asks «what kind of place I would be staying in». **Fix:** «Two blind readers of this batch met «ہوٹل»; neither raised the eatery sense, and both treated it as lodging (r0 #3, r1 #3).»
   - **Prefix:** the opening «[s4] N661 (ur-stay-1):» doubles the « · ur-stay-1 (2026-10-21): » prefix that the merge adds. This is harmless and optional to trim.

4. **P16-test still lists «ہوٹل» as REFUSED with no pointer to N661 (`base_amendments`)**
   - N661 cites P16-test openly and confines its refusal of «ہوٹل» to the navigation label, so this is not a silent contradiction. But the standing P16-test record, which every later batch reads for its lists, will still read «REFUSED: … «ہوٹل» (the native «رہائش» stands …)» with no qualifier. N661 sits 300 rulings further down.
   - **Fix:** add a `base_amendments` entry on P16-test, field `ruling`, whose `before` is the current text byte for byte. In `after`, append to the «ہوٹل» clause: «— as the navigation label only; as a kind label and in running text «ہوٹل» stands (N661, ur-stay-1)». The merge's exact-`before` check guards it.

5. **For the dining judge: this reader's objection meets the sibling's methodP1 (`ix.methodP1`, informational)**
   - The stay `ix.methodP1` was rewritten this round because the blind reader read «مختصر تعارف … بیان کرتا ہے» as translated (r1 #13). The dining frame (ur-dining-1 ur-05.json `ix.methodP1`) still has that construction: «ہر جگہ کا مختصر تعارف اسے اسی طرح بیان کرتا ہے جیسے وہ اپنی تصویر میں نظر آتی ہے۔».
   - Its source differs, so byte agreement is not owed. **Suggest:** note this in a [j2] dining line so that the dining judge weighs the same passive, «ہر جگہ کے مختصر تعارف میں اسے اسی طرح بیان کیا گیا ہے جیسے …».
