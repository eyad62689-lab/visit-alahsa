# Stage 5d — proof of the judge's round-3 (locked) text

Page: `jabal-al-qarah` (ur-PK). Text proofread: `fields` of `stages/07-judge.round3.json` (29 strings), i.e. the round-2 text plus the 7 edits of round 3. Report only — no file was changed.

**Result: no error (`must-fix`) and no `should-fix`. Two `note`s, both on the ticket line. The eleven items all pass.**

## Method

- Role file `05-proofreader.md`, read with the rulings in the round-3 `calibration`: P15 («“ارض الحضارات” نامی ثقافتی گاؤں»), P3b (the meaning gloss once, at the first mention in render order, directly after the closing mark), P21 («کس کے لیے موزوں»), P16 («فیملی» and «فوٹوگرافی» admitted, «ہال» withdrawn), P26 (no final stop on a card value; an FAQ answer keeps its stop), and the earlier P2, P3a, P7, P12, P13, P17, P20.
- Own scan, `s5d-scan.mjs` → `s5d-scan-out.txt`: every code point of all 29 strings; do-chashmi-he context and the code points of each word new in this round; punctuation mechanics, including both sides of every bracket and quotation mark; guards for the rulings above and for C15 / C16; the fee cell against faq[1].a and the hours cell against faq[0].a; names against the round-3 `termbase_final`; a replay of the 7 changes from the round-2 fields; the joints of every edit.
- The scan was shown to bite on in-memory copies of the final strings (never a file): letters 22/22 probes, punctuation 13/13, rulings 22/22, do-chashmi 1/1.
- The base was checked: the round-2 `fields` are the ones proofed in stage 5c.
- Then the 7 changed strings were read in context against the English source and the Arabic authority in `pack.json`. Dictionary pages read in this run are in `s5d-rk-out.txt`.

## The eleven items

| # | Item | Result | Basis |
|---|---|---|---|
| 1 | حروف (letterforms) | **PASS** | Code points found: **none**. 1662 code points, 61 distinct. U+064A, U+0643, U+0629, U+0647, U+0649, U+0623, U+0625, U+06C3: 0. No U+06C2, no harakat, no tatweel, no U+00A0, no invisible or directional character, no non-Latin digit, no Latin letter outside «{op}». U+06BE x23 in 18 words, each after an aspirable consonant. The 36 words written with U+06C1 were read one by one. Words new in this round, letter by letter: «تہذیبوں» (U+062A U+06C1 U+0630 …), «سرزمین», «نامی», «فیملی» (U+0641 U+06CC U+0645 U+0644 U+06CC), «فطرت» — all in Urdu letterforms. One code point is back on the page: «ذ» U+0630, in «تہذیبوں». |
| 2 | نقل حرفی (name forms) | **PASS** | Byte-identical to the keys of the round-3 `termbase_final`: «جبل القارہ» x6, «الاحساء» x4, «ہفوف» x1, «ارض الحضارات» x2 (inside “ ” both times), «گوگل میپس» x1, «فوٹوگرافی» x1, and the two new entries «ثقافتی گاؤں» x2 and «فیملی» x1. The gloss on the page is the entry's gloss field, byte for byte, once. All fourteen entries occur. The withdrawn «ثقافتی ورثے کا گاؤں» and «ہال» do not. No Latin-script name. |
| 3 | قواعد (grammar) | **PASS** | «ٹکٹ … نامی ثقافتی گاؤں سے ملتے ہیں»: ٹکٹ m. pl. «ملتے ہیں»; «نامی» and «ثقافتی» do not inflect and «گاؤں» has the same form before «سے», so nothing in the phrase can carry a wrong case. «تہذیبوں کی سرزمین»: سرزمین f. «کی». No other agreement was touched; the body is identical to round 2. |
| 4 | خطاب (address) | **PASS** | No «تم / تمہارا / تیرا»; «تو» x3, the particle. Honorific forms only. |
| 5 | عنوانات (headings) | **PASS** | No final «۔», no bracket, no gloss on the title, the kicker, the three card labels («اوقات», «فیس», «کس کے لیے موزوں») or the template labels and headings. The gloss stands in a card value, not in a label. |
| 6 | Termbase compliance | **PASS** | 100 %. Fourteen entries, all present, none misspelt; genders and plurals as recorded (غار m.: «غار» x3, «غاروں» x1). |
| 7 | رموز (punctuation) | **PASS** | «۔» x15 (one fewer than round 2: the best-time cell), «،» x9, «؟» x5, «؛» x1. No Latin `.` `,` `?` `;`. Quotes U+201C…U+201D balanced, in order, not glued to a word. Two brackets, both U+0028 / U+0029, balanced, a space outside and none inside, no mark before a closing bracket. No space was left where the stop was removed from «دن میں». |
| 8 | اعداد، کرنسی، وقت | **PASS** | Latin digits only: 8, 10, 50. P13 and P7 as in stage 5c; neither line was touched. |
| 9 | انگریزیت، تعریب، ہندی، دفتری | **PASS** | English loans in Urdu letters are the ones P16 admits and nothing else: «فیس», «ٹکٹ», «فوٹوگرافی», «فیملی», «گوگل میپس». No word of the banned lists, no «موجود ہے» chain, no verbal-noun passive. (The entry for «فیملی» itself records that the written corpus prefers «خاندان», 714 pages to 19, and the judge has put the loan line to the owner; under the ruling as it stands this is not a finding.) |
| 10 | گلوس (glossing) | **PASS** | P3a: no bracket on «جبل القارہ»; «پہاڑ» alone once in the body. P3b: «“ارض الحضارات” (تہذیبوں کی سرزمین)» exactly once, at the first mention in render order (the fee cell comes before the FAQ), directly after the closing mark; the answer carries the name without it. |
| 11 | ساخت (structure) | **PASS** | 29 leaf paths, identical to the pack and to round 2, same order. Body one paragraph, no line break, no Markdown. «{op}» once; « ↗» kept. Replaying the 7 changes on the round-2 fields gives the final text exactly; the six fields that differ from round 2 are exactly the fields in the change list. |

## The questions put to this pass

**The bracket between the closing quotation mark and «نامی» — spacing correct; reading order sound, with one thing to know (note 2).** Character by character the cell runs: closing mark U+201D, space, «(», the three words of the gloss, «)», space, «نامی», space, «ثقافتی گاؤں». One space on each side of the bracket, none inside it. Every letter next to the bracket and the marks is an Urdu letter — no digit and no Latin character adjoins them — so in a right-to-left cell the visual order is the order written: name, its meaning, «نامی», the generic.

**«نامی» + noun + «سے» — correct.** «X نامی Y» is the ordinary frame for «a Y called X» (ur.wikipedia: «نامی گاؤں سے» on 17 pages, e.g. «سیکری نامی گاؤں سے»). None of the three words changes its form before «سے».

**P26 — no card value ends in «۔».** Last character of each: `area` «ں», `bestTime` «ں», `practical[0].value` «)» (and no stop inside the bracket), `practical[1].value` «ں», `practical[2].value` «ن». **The four FAQ answers keep theirs**, as do the summary, the body and the notice line.

**Fee cell against faq[1].a — identical apart from the bracket.** Remove « (تہذیبوں کی سرزمین)» from the cell, read «۔» for «؛» and add the answer's final stop: the result is faq[1].a character for character (checked by the script). The hours cell and faq[0].a agree in the same way.

**«ثقافتی گاؤں» for «heritage village» — it loses something and adds nothing (note 1).**

## Findings

### 1. `note` — practical[1].value and faq[1].a — «ثقافتی» says cultural where the source says heritage

- Fields: `practical[1].value`, `faq[1].a` (edits 0 and 2).
- Text: «ٹکٹ “ارض الحضارات” (تہذیبوں کی سرزمین) نامی ثقافتی گاؤں سے ملتے ہیں» / «ٹکٹ “ارض الحضارات” نامی ثقافتی گاؤں سے ملتے ہیں۔»
- Source: EN «tickets via the “Land of Civilisations” heritage village»; the owner's decision under P15: «قرية تراثية». (The Arabic field has the bare name: SD6.)
- What left: the sense of something handed down from the past. Rekhta entry pages read in this run: «ثَقافَتی — صفت: ثقافت سے منسوب یا متعلق … تہذیبی»; «ثقافت» is a people's culture in its religion, ethics, learning and arts. Heritage is «ورثہ / میراث», and that word is no longer in the line. «ثقافتی» is the wider term: every heritage village is a cultural one, not the reverse.
- What entered: nothing. No age, no fame, no official status is claimed. «نامی» only marks what stands in the marks as a name; it makes the village «a village called …» where the English has «the … village», which adds no fact. The change also removes the second reading that round 2's «ثقافتی ورثے کے گاؤں» allowed (a village listed as cultural heritage).
- One caution from usage: on ur.wikipedia the phrase stands for places whose English name is «Cultural Village» («کٹارا ثقافتی گاؤں», «کمبوڈیا ثقافتی گاؤں»; 2 pages). It is the attested Urdu of that English term, which is not the source's; a reader who knows Katara may picture an arts venue.
- Status: ruled under P15, charged by the judge under accuracy, entry pending. Listed so that the owner, who decided «heritage village», knows the Urdu says «cultural village». No correction proposed.

### 2. `note` — practical[1].value — the bracket separates «نامی» from the name it depends on

- Field: `practical[1].value` (edit 1 on top of edit 0).
- Text: «“ارض الحضارات” (تہذیبوں کی سرزمین) نامی ثقافتی گاؤں»
- What is at stake: «نامی» means «called» only by leaning on the name before it. With the gloss in between, what stands directly before «نامی» is a closing bracket. Two second readings open, neither likely: «نامی» taken with the gloss («called Land of Civilisations») — harmless, since the gloss is the name's meaning; and «نامی» taken as the free-standing adjective, which on its Rekhta entry page (read in this run) has «مشہور، معروف، نامور» as its first sense — «the renowned cultural village», a claim no source makes.
- Why only a note: a name, a bracket, then «نامی» is a common order in Urdu prose, the quotation marks hold the name together, and P3b fixes the bracket's place directly after the closing mark; moving it behind «گاؤں» would make it explain the village instead of the name. The answer in faq[1].a, where nothing stands between the name and «نامی», has no second reading.
- It is the one composite on the page that no blind reader has seen (the judge says so): the third reader's frame and the restored bracket were each read, never together.
- No correction proposed.

## The 7 edits, one by one

| # | Field | Final text | Seam and grammar | Meaning against the source |
|---|---|---|---|---|
| 0 | practical[1].value | «ٹکٹ “ارض الحضارات” … نامی ثقافتی گاؤں سے» | OK. «ٹکٹ» is now followed by the quoted name, so the run-on the third reader met («ٹکٹ ثقافتی ورثے کے…») is gone. | Note 1. |
| 1 | practical[1].value | «“ارض الحضارات” (تہذیبوں کی سرزمین) نامی» | OK. Spacing as above; gloss identical to the termbase field. | The meaning of the name is back, as the English gives it («Land of Civilisations»). Note 2 on the reading. |
| 2 | faq[1].a | «ٹکٹ “ارض الحضارات” نامی ثقافتی گاؤں سے ملتے ہیں۔» | OK. Identical to the cell apart from the bracket; final stop kept. | Note 1. |
| 3 | practical[2].label | «کس کے لیے موزوں» | OK. The wording of stages 1 to 5; no stop. | «Good for» / «مناسب لـ»: the relation is stated again. |
| 4 | practical[2].value | «فیملی · فوٹوگرافی · گرم دن» | OK. Separators and spaces intact; spelling as the termbase key. | «Families» / «العائلات»: same sense, a loan for the native word (P16). |
| 5 | frame.cat.nature | «فطرت» | OK. | «Nature» / «الطبيعة»: the word whose first dictionary sense is the natural world. |
| 6 | bestTime | «دن میں» | OK. One character removed; no trailing space. | Unchanged. |

The 23 strings this round did not touch were scanned and read again against the round-3 rulings: nothing departs from them. The body is identical to round 2.

## Not verified

- This is a model's reading, not a native human's. The fee cell in its final form has been read by no blind reader.
- Rendering in Nastaliq: the quotation marks, «؛», the arrow, and the two brackets. Both brackets rely on the cell having right-to-left base direction; the hours cell ends in a bracket, which is where a wrong base direction would show first.
- Whether «ثقافتی گاؤں» is heard as an attraction or as a settlement (the third reader pictured a real settlement at «گاؤں»; the English «village» has the same double sense).
- Printed gender labels for «فیملی», «فوٹوگرافی» and «انتظامیہ»; nothing on the page agrees with the first two.
- Corpus counts are from ur.wikipedia only and show attestation, not idiom.
- `stage45-check.mjs` and the `s7-r3-*` scripts were not run.

## Files

Created in the work directory, nothing else touched: `stages/05d-proof-of-round3.md`, `s5d-scan.mjs`, `s5d-scan-out.txt`, `s5d-rk.mjs`, `s5d-rk-out.txt`, `s5d-round3-view.json` (a read-only extract of the round-3 judge file made for reading).
