# Stage 5c — proof of the judge's round-2 text

Page: `jabal-al-qarah` (ur-PK). Text proofread: `fields` of `stages/07-judge.round2.json` (29 strings), i.e. the round-1 text plus the 12 edits of round 2. Report only — no file was changed.

**Result: no error (`must-fix`) and no `should-fix`. Four `note`s, all on meaning or reading of edits that are grammatical and within the rulings. The eleven items all pass. The should-fix of stage 5b is applied correctly.**

## Method

- Role file `05-proofreader.md`, read with the rulings in the round-2 `calibration`: P13 (12-hour clock, «صبح 8 بجے سے رات 10 بجے تک», no «:00», no dash between clock times), P15 (heritage village: «ثقافتی ورثے کے گاؤں “ارض الحضارات”»), P3b as revised (no meaning gloss once the generic stands), P2 («الاحساء»), P16 («فوٹوگرافی» admitted, «ہال» withdrawn), P20 and P21 as restated, and the earlier P3a, P7, P12, P17.
- Own scan, `s5c-scan.mjs` → `s5c-scan-out.txt`: every code point of all 29 strings; do-chashmi-he context and the code points of each word that is new in round 2; punctuation mechanics including «؛»; guards for the rulings above and for C15 / C16; names against the round-2 `termbase_final`; a replay of the 12 changes from the round-1 fields; both joints of every edit.
- The scan was shown to bite on in-memory copies of the final strings (never a file): letters 22/22 probes, punctuation 12/12, rulings 16/16, do-chashmi 1/1. One probe of mine was badly chosen at first («جگھ» for «جگہ» — «گ» can be aspirated, so the context test passes it by construction) and was replaced. That limit is real: a «ھ» wrongly written after an aspirable consonant is caught only by reading the words, which is why the eleven new words are listed with their code points and were read letter by letter.
- The base was checked: `stages/07-judge.json` is byte-identical to `07-judge.round1.json`, the text proofed in stage 5b.
- Then the 12 changed strings were read in context against the English source and the Arabic authority in `pack.json`.

## The eleven items

| # | Item | Result | Basis |
|---|---|---|---|
| 1 | حروف (letterforms) | **PASS** | Code points found: **none**. 1640 code points, 60 distinct. U+064A, U+0643, U+0629, U+0647, U+0649, U+0623, U+0625, U+06C3: 0. No U+06C2, no harakat, no tatweel, no U+00A0, no invisible character, no non-Latin digit, no Latin letter outside «{op}». U+06BE x23 in 18 words, each after an aspirable consonant. The 35 words written with U+06C1 were read one by one. New words of this round, letter by letter: «والی», «کشادہ» (…U+06C1), «جگہ» (…U+06C1), «صبح», «بجے», «رات», «ثقافتی», «ورثے», «گاؤں» (U+06AF U+0627 U+0624 U+06BA), «فوٹوگرافی», «قدرت» — all in Urdu letterforms. New on the page and legitimate: «ؤ» U+0624 (in «گاؤں»), «ث» U+062B, «؛» U+061B. |
| 2 | نقل حرفی (name forms) | **PASS** | «جبل القارہ» x6, «الاحساء» x4, «ہفوف» x1, «ارض الحضارات» x2 (inside “ ” both times), «گوگل میپس» x1, «فوٹوگرافی» x1 — byte-identical to the keys of the round-2 `termbase_final`. The generic of P15 stands twice as «ثقافتی ورثے کے گاؤں», which is the oblique of the key «ثقافتی ورثے کا گاؤں» and byte-identical to the form the entry records; the key itself (direct case) does not occur, rightly. No «الاحسا», «الہفوف», «جبل قارہ», «ہال», «ہیریٹیج», «تصویر کشی». No Latin-script name. |
| 3 | قواعد (grammar) | **PASS** | New agreements: جگہ f. «اونچی چھت والی کشادہ جگہ میں»; ٹھنڈک f. «رہتی ہے» (faq[2].a, the 5b correction); ورثہ m. → oblique «ورثے»; «کے» before the oblique head «گاؤں»; ٹکٹ m. pl. «ملتے ہیں»; in «غار ہیں اور بل کھاتے راستے» the gapped verb is the same «ہیں» for both nouns. No «نے» is due anywhere. |
| 4 | خطاب (address) | **PASS** | No «تم / تمہارا / تیرا»; «تو» x3, each the particle after a subjunctive. Honorific forms only. |
| 5 | عنوانات (headings) | **PASS** | No final «۔», no bracket, no gloss on the title, the kicker, the labels («اوقات», «فیس», «موزوں») or the template headings. |
| 6 | Termbase compliance | **PASS** | 100 %. Thirteen entries; «ہال» is gone from the termbase and from the text. Genders as recorded: جگہ is not an entry (f. by the Rekhta label in `s7-r2-last-out.txt`); گاؤں m.; غار m. with «غار» x3 direct, «غاروں» x1. |
| 7 | رموز (punctuation) | **PASS** | «۔» x16, «،» x9, «؟» x5, «؛» x1 (U+061B, no space before, one after, no comma left beside it). No Latin `.` `,` `?` `;`. Quotes U+201C…U+201D balanced, in order, not glued to a word. No en dash is left on the page. The one colon is in faq[2].a. No double space where the bracket gloss was removed. |
| 8 | اعداد، کرنسی، وقت | **PASS** | Latin digits only: 8, 10, 50. P13: «صبح 8 بجے سے رات 10 بجے تک» in the hours cell and in faq[0].a, identical; no «:00», no hour above 12, no dash between clock times, every «بجے» after a figure and a part of the day. P7: «50 سعودی ریال» in the fee cell and in faq[1].a; no «SAR». |
| 9 | انگریزیت، تعریب، ہندی، دفتری | **PASS** | English loans in Urdu letters are the admitted ones and nothing else: «فیس», «ٹکٹ», «فوٹوگرافی», «گوگل میپس». No word of the banned lists, no «موجود ہے» chain, no verbal-noun passive. |
| 10 | گلوس (glossing) | **PASS** | P3a: no bracket on «جبل القارہ»; «پہاڑ» alone once in the body. P3b as revised: the name is preceded by its generic at both mentions and carries no bracket; the entry's gloss field is null. |
| 11 | ساخت (structure) | **PASS** | 29 leaf paths, identical to the pack and to round 1, same order. Body one paragraph, no line break, no Markdown. «{op}» once; « ↗» kept. Replaying the 12 changes on the round-1 fields gives the final text exactly; the fields that differ from round 1 are exactly the fields in the change list. |

## The questions put to this pass

**«چٹانوں میں غار ہیں اور بل کھاتے راستے۔» — acceptable ellipsis, not a fault.** The sentence is an existential with a second subject added after the verb, the pattern of «کمرے میں ایک میز تھی اور دو کرسیاں». The verb left out of the second half is the one already said, and in the same form: «ہیں» serves «غار» and «راستے» alike (both plural; «ہیں» marks no gender). «بل کھاتے» is the participle used as an adjective and agrees with «راستے» (m. pl.); the same construction is on ur.wikipedia («بل کھاتے راستے» 1 page, «بل کھاتی سڑک» 3). «ان میں» of the next sentence now takes both nouns, which is what the source says. One thing to know, not a fault: the next sentence closes the same way («…رہتی ہے، اور عین سردیوں میں ہلکی سی گرمائش۔»), as does the summary, so the page's first four sentences end three times on a noun phrase after «اور».

**«ثقافتی ورثے کے گاؤں» before «سے» — correct.** «ورثہ» is masculine (Rekhta entry page read in this run: «وِرْثہ — اسم، مذکر») and takes «ورثے» before the possessive; the possessive is «کے», not «کا», because its head «گاؤں» is in the oblique singular, governed by «سے»; «گاؤں» does not change its form in the oblique singular; the quoted name stands in apposition between the head and «سے». Usage agrees: «ثقافتی ورثے کے» 104 pages and «کے گاؤں سے» 30 pages on ur.wikipedia. The form is spelled like the direct plural («villages»); one quoted name after it and «سے» settle the reading. The same segment, character for character, is in the fee cell and in faq[1].a.

**The «؛» in the fee cell — correct.** U+061B, the Urdu semicolon the role file names; no space before, one after; the comma it replaced is gone. It stands where the source has a dash, between the price and the ticket line; the FAQ answer has «۔» at the same place.

**Punctuation left behind — none.** The removed bracket left a single space («” سے»); the removed range dash left nothing; no stop was orphaned by the shortened body sentence.

**A clause without its verb — none.** faq[2].a now reads «…تو خوشگوار ٹھنڈک رہتی ہے، اور عین سردیوں میں ہلکی سی گرمائش۔»: the «جب … تو» clause has its verb and the second half gaps the same one.

## Findings

### 1. `note` — body, fifth sentence — «کشادہ» is stated by neither source; «chamber» has become «جگہ»

- Field: `body` (edit 1).
- Text: «پھر اچانک راستہ اونچی چھت والی کشادہ جگہ میں جا نکلتا ہے»
- Source: EN «then suddenly opens onto a high chamber»; AR «ثم ينفتح فجأةً على قاعةٍ عاليةٍ».
- What entered: «کشادہ» (spacious). Both sources give the chamber one attribute, height. Width is implied — by «chamber» / «قاعة» and by «opens onto» after the narrow corridors — but it is not said.
- What left: the noun. «جگہ» is any place; that it is a roofed room is now carried only by «اونچی چھت والی».
- No number, name or claim is involved, and the agreement is right (جگہ f., «والی»). The judge charges the phrase under accuracy as saying «less than hall»; the addition to his account is that it also says one thing more.
- No correction proposed: two blind readers have refused «ایوان» and «ہال» in turn.

### 2. `note` — practical[2].label — the bare «موزوں» no longer says «for»

- Field: `practical[2].label` (edit 6).
- Text: «موزوں», over «خاندان · فوٹوگرافی · گرم دن».
- Source: EN «Good for»; AR «مناسب لـ».
- What changed: nothing entered. The relation left: the row no longer says in words that the place suits these three; the reader supplies «کے لیے». It is the only label of the card that is a bare adjective («اوقات», «فیس», «علاقہ», «بہترین وقت» are nouns).
- Not wrong by the role file, by P21 as restated or by grammar (Rekhta entry page read in this run: «مَوزُوں — صفت», sense 3 «لائق حال … مناسب، درست»). Whether a one-word adjective is read as a label cannot be settled by a rule; the judge lists it as unread, and that stands.
- No correction proposed.

### 3. `note` — frame.cat.nature — by the dictionary, «قدرت» is first power and «فطرت» is first nature

- Field: `frame.cat.nature` (edit 11).
- Text: «قدرت»
- Source: EN «Nature»; AR «الطبيعة».
- What changed: Rekhta entry pages read in this run (`s5c-rk-out.txt`). «فِطْرَت — اسم، مؤنث», sense 1: «قدرتی طور پر پیدا کی ہوئی کائنات، آفرینش، قدرت، نیچر»; disposition is sense 4. «قُدْرَت — اسم، مؤنث», eleven Urdu senses, all of power, ability or divine power («طاقت، قوّت، زور» … «خدائی طاقت»); the natural world appears only as the figurative sense 11 and in the English gloss. So the edit exchanges one second reading (disposition) for another (power), and by the dictionary's order moves away from the word whose first sense is the source's.
- Against that: two blind readers, independently, asked for «قدرت»; both words are used of scenery (ur.wikipedia: «قدرت کے مناظر» 2 pages, «فطرت کے مناظر» 1).
- A UI string, not approved as UI. For the ui.ur batch with this evidence; the second reader's other candidate «قدرتی مقامات» has neither second reading.
- No correction proposed here.

### 4. `note` — area — a bare name before a locative can be read as an apposition

- Field: `area` (edit 2).
- Text: «الاحساء، ہفوف کے مشرق میں»
- Source: EN «East of Hofuf — Al-Ahsa»; AR «شرق الهفوف — الأحساء».
- What changed: no fact entered or left. The cell can now also be read «Al-Ahsa, which lies east of Hofuf» — the position taken as Al-Ahsa's, not the site's. The round-1 form («الاحساء میں، …») and the source's order both shut that reading out. The label «علاقہ» makes the intended reading the likely one, so this is small.
- No correction proposed.

## The 12 edits, one by one

| # | Field | Final text | Seam and grammar | Meaning against the source |
|---|---|---|---|---|
| 0 | body | «چٹانوں میں غار ہیں اور بل کھاتے راستے۔» | OK. Acceptable ellipsis (above). «راستے۔ جب» — stop and space in place. | Nothing entered. Left: the action («thread through») for the caves; the winding stays on the passages. «its» was already absent at stage 5. |
| 1 | body | «اونچی چھت والی کشادہ جگہ میں» | OK. جگہ f. «والی»; «میں جا نکلتا ہے» with راستہ m.; «جگہ … جہاں». | Note 1. |
| 2 | area | «الاحساء، ہفوف کے مشرق میں» | OK. P20 as restated; no final stop; one «،». | Nothing entered or left. Note 4. |
| 3 | practical[0].value | «روزانہ صبح 8 بجے سے رات 10 بجے تک (…)» | OK. P13 form; space before the bracket. («تک» now stands twice in the cell, five words apart — an echo, not an error.) | 8:00 am – 10:00 pm, as the source. |
| 4 | practical[1].value | «…50 سعودی ریال؛ ٹکٹ ثقافتی ورثے کے گاؤں “ارض الحضارات”» | OK. Oblique and «؛» as above. | Entered: «heritage village», which the English field carries and the owner confirmed (the Arabic field does not: SD6). «ثقافتی» is the Urdu collocation for heritage, not a further fact. |
| 5 | practical[1].value | «” سے» | OK. One space; no bracket, no double space. | Left: the meaning of the name, which the English gives as the name itself («Land of Civilisations»). By P3b as revised. |
| 6 | practical[2].label | «موزوں» | OK. No stop. | Note 2. |
| 7 | practical[2].value | «خاندان · فوٹوگرافی · گرم دن» | OK. Separators and spaces intact; spelling as the termbase key. | «photography», as the source. |
| 8 | faq[0].a | «روزانہ صبح 8 بجے سے رات 10 بجے تک۔ …» | OK. Same segment as the cell; «تک۔ چھٹیوں». Mirrors the question «کب سے کب تک». | As the source. |
| 9 | faq[1].a | «ٹکٹ ثقافتی ورثے کے گاؤں “ارض الحضارات” سے ملتے ہیں۔» | OK. Same segment as the cell. | As edit 4. |
| 10 | faq[2].a | «…تو خوشگوار ٹھنڈک رہتی ہے، اور عین سردیوں میں ہلکی سی گرمائش۔» | OK. The 5b correction, applied as given. | No change of meaning. |
| 11 | frame.cat.nature | «قدرت» | OK. | Note 3. |

The 19 unchanged strings were read again against the new rulings: nothing departs from them. «رات» now stands in the two hours lines and in no sentence about warmth (C16); the largest-oasis sentence still carries neither «کھجور» nor «قدرتی» (C15).

## Not verified

- This is a model's reading, not a native human's; none of the twelve edits has been read blind.
- Rendering in Nastaliq: «؛», the unmirrored quotation marks, the arrow, digits inside a right-to-left line.
- Whether «موزوں» reads as a label, and whether «ثقافتی ورثے کا گاؤں» is heard as a heritage village (an attraction) or as a village listed as heritage — the English has the same double sense. The phrase is the judge's coinage and its entry is pending.
- The gender of «فوٹوگرافی» (pending in the termbase; nothing on this page agrees with it) and of «انتظامیہ» (my own knowledge). گاؤں, جگہ and کشادہ rest on the Rekhta labels in the judge's `s7-r2-last-out.txt`; ورثہ, قدرت, فطرت and موزوں on the entry pages read in this run.
- Corpus counts are from ur.wikipedia only (`s5c-wiki-out.txt`); as in stage 5b they show attestation, not idiom.
- `stage45-check.mjs` and the `s7-r2-*` scripts were not run.

## Files

Created in the work directory, nothing else touched: `stages/05c-proof-of-round2.md`, `s5c-scan.mjs`, `s5c-scan-out.txt`, `s5c-rk.mjs`, `s5c-rk-out.txt`, `s5c-wiki.mjs`, `s5c-wiki-out.txt`, `s5c-round2-view.json`, `s5c-round2-cal.json` (the last two are read-only extracts of the round-2 judge file made for reading).
