# Stage 5b — proof of the judge's final text

Page: `jabal-al-qarah` (ur-PK). Text proofread: `fields` of `stages/07-judge.json` (29 strings: 20 content, 9 frame), i.e. the stage-5 text plus the 20 edits of stage 7. Report only — no file was changed.

**Result: no error (`must-fix`) found. One `should-fix` (faq[2].a, a clause left without its verb by edit 16). Three `note`s, all on source fidelity of edits the judge made on purpose and logged.**

## Method

- Role file `05-proofreader.md`, read with the rulings of this run that supersede it: P3a (no bracket gloss on «جبل القارہ»), P7 (no Latin currency code), P12 (غار masculine), P17 (ta marbuta = U+06C1), and the particle «تو» is not the banned pronoun. The clock form «8:00–22:00» is a pending owner decision and is not reported.
- Own scan, `s5b-scan.mjs` → `s5b-scan-out.txt`, independent of the stage-4/5 checker and of the `s7-*` scripts: every code point of all 29 strings, do-chashmi-he context, punctuation mechanics, name forms against `termbase_final`, a replay of the 20 changes from the stage-5 fields, and the two joints of every edit.
- The scan was shown to bite by breaking in-memory copies of the final strings (never a file): letters 19/19 probes caught, punctuation 8/8, do-chashmi 1/1. On its first run one punctuation probe was missed (a missing space after «۔» in a string that also holds a clock time); the test was corrected and re-run. The real text gave 0 findings before and after the correction.
- Then each of the 20 changed strings was read in context against the English source and the Arabic authority in `pack.json`.

## The eleven items

| # | Item | Result | Basis |
|---|---|---|---|
| 1 | حروف (letterforms) | **PASS** | Code points found: **none**. 1606 code points, 59 distinct. Class `[يكةهىأإ]` (U+064A U+0643 U+0629 U+0647 U+0649 U+0623 U+0625): 0. U+06C3: 0. U+06C2, U+06C0, U+06D5, harakat U+064B–065F / U+0670, tatweel: 0. U+06BE x23 in 18 distinct words, every one after an aspirable consonant (ٹھ کھ چھ دھ پھ بھ). The 35 distinct words written with U+06C1 were read one by one; none is an aspirate that lost its «ھ». All strings NFC- and NFKC-stable; no invisible or presentation-form character. |
| 2 | نقل حرفی (name forms) | **PASS** | «جبل القارہ» x6, «الاحساء» x4, «ہفوف» x1, «ارض الحضارات» x2, «گوگل میپس» x1 — byte-identical to the keys of `termbase_final` (and to the seven keys of the worktree termbase). No «جبل قارہ», «القارۃ», «الہفوف», «الاحسا», «احساء». No bracket after the name, no «جبل القارہ پہاڑ». No Latin-script name. |
| 3 | قواعد (grammar) | **FINDING** | Finding 1 (faq[2].a). Every other agreement, postposition and number on the page is right — list under "The 20 edits" below. No transitive perfective verb occurs, so no «نے» is due. |
| 4 | خطاب (address) | **PASS** | No «تم / تمہارا / تیرا». «تو» x3 (body x2, faq[2].a x1), each the correlative particle after a subjunctive («ہو تو», «گزریں تو»). Reader-addressed verbs are honorific only: «گزریں», «تصدیق کر لیں», «دیکھیں», «بتائیں». |
| 5 | عنوانات (headings) | **PASS** | No final «۔» and no bracket on the title, the kicker, the three card labels or the six template labels/headings; the four questions end in «؟». (The card value «دن میں۔» keeps a stop; a value is not a heading under this item, and the judge logged it as SD3.) |
| 6 | Termbase compliance | **PASS** | 100 %. Genders and plurals as `termbase_final` has them: غار m. (direct plural «غار» x3, oblique «غاروں» x1, no «غاریں»), نخلستان m., ٹکٹ m. plural «ٹکٹ», فیس f., ہال m., ریال unchanged after the numeral. |
| 7 | رموز (punctuation) | **PASS** | «۔» x16, «،» x10, «؟» x5; no Latin `.` `,` `?` `;`, no `«»`, no straight quote, no U+00A0. Quotes U+201C…U+201D balanced and in order (x2). No space before a mark, no doubled mark, no double space, no leading/trailing space, a space after every mark (clock colons excepted). The one colon in running text (faq[2].a) is U+003A, which is the Urdu colon. |
| 8 | اعداد، کرنسی | **PASS** | Latin digits only (0 in U+0660–0669, 0 in U+06F0–06F9). Currency under P7: «50 سعودی ریال» in the fee card and in faq[1].a (each read on its own), no «SAR», no bare «ریال». Clock form not reported (P13). |
| 9 | انگریزیت، تعریب، ہندی، دفتری | **PASS** | No word of the banned lists. English loans in Urdu letters are the four admitted under P16 and nothing else: «فیس», «ٹکٹ», «ہال», «گوگل میپس». No «موجود ہے» chain, no verbal-noun passive. |
| 10 | گلوس (glossing) | **PASS** | Under P3a: no bracket on the name; «پہاڑ» stands alone once in the body («پہاڑ کی تنگ راہداریوں»), away from the name. Under P3b: «“ارض الحضارات” (تہذیبوں کی سرزمین)» once, at the first mention in render order (fee card); bare in faq[1].a; inside “ ” both times. |
| 11 | ساخت (structure) | **PASS** | 29 leaf paths, identical to the pack and to stage 5, same order. Body is one paragraph, no line break, no Markdown. «{op}» once in `det.hoursNotice`, not in `det.hoursNotice.op`. `det.openMaps` ends in « ↗». Replaying the 20 changes on the stage-5 fields gives the final text exactly; the fields that differ from stage 5 are exactly the fields in the change list. |

## Findings

### 1. `should-fix` — faq[2].a — the «جب … تو» clause has no verb

- Field: `faq[2].a` (edit 16).
- Text: «ان غاروں کا درجہ حرارت سال بھر معتدل رہتا ہے: جب گرمی عروج پر ہو تو خوشگوار ٹھنڈک، اور عین سردیوں میں ہلکی سی گرمائش۔»
- What is wrong: «جب گرمی عروج پر ہو تو» opens a conditional that needs a main clause, and what follows «تو» is a bare noun phrase and a comma. In the body the same words carry their verb («تو ان میں خوشگوار ٹھنڈک رہتی ہے»); here the wording was carried over without it. The verb cannot be taken from the clause before the colon either: that one is masculine («معتدل رہتا ہے», agreeing with «درجہ حرارت»), and «ٹھنڈک» is feminine. Before the edit the text after the colon was two parallel noun phrases with no conjunction («گرمیوں کے عروج پر خوشگوار ٹھنڈک اور …»), which needs no verb; the new «جب … تو» frame does.
- Why `should-fix` and not `must-fix`: the sentence is understood and a clipped list after a colon is a known style; it is a seam, not a wrong form.
- Rule: role file item 3 (grammar); seam of an edit.
- Minimal correction (two words, the body's own): «ان غاروں کا درجہ حرارت سال بھر معتدل رہتا ہے: جب گرمی عروج پر ہو تو خوشگوار ٹھنڈک **رہتی ہے**، اور عین سردیوں میں ہلکی سی گرمائش۔» The second half then gaps the same verb, as it does in the body. The two segments the judge wants shared with the body («خوشگوار ٹھنڈک», «عین سردیوں میں ہلکی سی گرمائش») stay intact.

### 2. `note` — faq[2].q — the question is no longer the source's question

- Field: `faq[2].q` (edit 15).
- Text: «جبل القارہ کے غار کس وجہ سے مشہور ہیں؟»
- Source: EN «Why are the Jabal Al-Qarah caves known for their mild temperature?»; AR «لماذا تشتهر كهوف جبل القارة باعتدال حرارتها؟».
- What changed: the Urdu asks what the caves are known for; both sources ask why they are known for their mild temperature. «mild temperature» has left the question and stands only in the answer. No fact enters or leaves the pair, and the Urdu is grammatical (غار m. pl. «مشہور ہیں»).
- Status: made on purpose and logged by the judge (SD7, with a literal fallback). The precedent he cites is real: the worktree file has `q_ru: "Чем славятся пещеры Джабаль-эль-Кара?"`; the Chinese line keeps the source's form. It is the one place where this run repairs a source defect in the Urdu instead of logging it (SD1–SD5 are logged and left).
- No correction proposed: the owner's choice between this and the judge's literal fallback.

### 3. `note` — body, first sentence — the oasis is named where the source sentence does not name it

- Field: `body` (edit 1).
- Text: «الاحساء کے نخلستان کے بیچوں بیچ جبل القارہ کسی قدیم نگہبان کی طرح سر اٹھائے کھڑا ہے»
- Source: EN «Jabal Al-Qarah rises from the middle of the oasis like an ancient guardian»; AR «يرتفع جبل القارة من وسط الواحة».
- What changed: «الاحساء کے» is not in that sentence in either language. It is not a new fact: the last sentence of the same body names Al-Ahsa as the oasis, the area field places the site in Al-Ahsa, and `answer_en` in the attraction file reads «rises in the middle of the Al-Ahsa oasis» (checked, line 42). Grammar and name form are right.
- Consequence to know: the head name now stands three times in the body and four times on the page, so the pending decision P2 touches one more string.
- No correction proposed.

### 4. `note` — body, fourth sentence — «قدرتی خوبی» is neither source's word

- Field: `body` (edit 4).
- Text: «اسی قدرتی خوبی کی وجہ سے الاحساء کے لوگ قدیم زمانے سے یہاں پناہ لیتے آئے ہیں۔»
- Source: EN «a natural wonder that drew the people of Al-Ahsa to shelter here since antiquity»; AR «ظاهرةٌ طبيعيةٌ جعلت أهل الأحساء يأوون إليها منذ القِدم».
- What changed: «خوبی» (a good quality; first dictionary sense «خوبصورتی، حسن») is neither «wonder» nor «phenomenon». Grammar is right (خوبی f., «کی وجہ سے»). This is the only content word on the page whose meaning the edits moved.
- Status: ruled under P19 and logged as SD8; the judge also records that the exact phrase has 0 pages on ur.wikipedia. Listed so that the approval does not rest on his reading alone, not to reopen the ruling.
- No correction proposed.

## The 20 edits, one by one

| # | Field | Read for | Verdict |
|---|---|---|---|
| 0 | body | bracket removed, locative moved in front | OK. «جبل القارہ … کھڑا ہے» m.; no «)» or space left behind. |
| 1 | body | «الاحساء کے نخلستان کے بیچوں بیچ» | Grammar OK. Source: note 3. |
| 2 | body | «چٹانوں میں غار ہیں اور راستے بل کھاتے چلے گئے ہیں۔» | OK. غار m. pl. «ہیں»; راستے m. pl. «چلے گئے ہیں». Nothing added («its» was already absent at stage 5). «ان میں» of the next sentence still finds its plural antecedent. |
| 3 | body | «جب گرمی عروج پر ہو تو ان میں خوشگوار ٹھنڈک رہتی ہے، اور عین سردیوں میں ہلکی سی گرمائش۔» | OK. ٹھنڈک f. «رہتی ہے»; گرمائش f. «ہلکی سی»; the second half gaps a verb of the same gender. Warmth stays on «سردیوں» (C16). «the peak of summer» as the heat at its peak is the Arabic «ذروة القيظ». |
| 4 | body | «اسی قدرتی خوبی کی وجہ سے» | Grammar OK. Source: note 4. |
| 5 | body | «… سے گزریں تو چٹانیں کندھوں کو چھوتے چھوتے رہ جاتی ہیں، پھر اچانک …» | OK. Honorific subjunctive + «تو»; چٹانیں f. pl. «رہ جاتی ہیں» with the invariable doubled participle. The merged sentence keeps no stray «۔» and no orphaned «جہاں». |
| 6 | body | «اونچی چھت والے ہال میں جا نکلتا ہے، جہاں روشنی کی ایک باریک کرن چھن کر آتی ہے» | OK. چھت f. «اونچی»; ہال m. oblique «والے»; راستہ m. «جا نکلتا ہے»; کرن f. «کی … آتی ہے». |
| 7 | area | «الاحساء میں، ہفوف کے مشرق میں» | OK (P20). No final stop. |
| 8 | bestTime | «دن میں۔» | OK. |
| 9 | practical[0].value | «زیادہ دیر تک کھلا» | OK. Understood subject m. sg., as in faq[0].q. |
| 10 | practical[1].value | «بڑوں کے لیے» | OK. |
| 11 | practical[1].value | «50 سعودی ریال،» | OK. With «(SAR)» gone the comma sits on «ریال» with no space before it. |
| 12 | faq[0].a | «زیادہ دیر تک کھلا» | OK. (The answer now has «تک» twice four words apart — an echo, not an error.) |
| 13 | faq[1].a | «بڑوں کے لیے» | OK. |
| 14 | faq[1].a | «50 سعودی ریال۔» | OK. ٹکٹ m. pl. «ملتے ہیں». |
| 15 | faq[2].q | «کس وجہ سے مشہور ہیں؟» | Grammar OK. Source: note 2. |
| 16 | faq[2].a | «جب گرمی عروج پر ہو تو خوشگوار ٹھنڈک، اور …» | **Finding 1.** |
| 17 | faq[4].a | «دن کا وقت۔» | OK. Answers «کون سا وقت». |
| 18 | frame.det.hoursNotice.op | «وہاں کی انتظامیہ» | OK. انتظامیہ f. «کی». In the slot: «جانے سے پہلے وہاں کی انتظامیہ سے تصدیق کر لیں۔»; reads alone as link text. |
| 19 | frame.det.openMaps | «گوگل میپس پر دیکھیں ↗» | OK. Honorific; arrow and its space kept. |

Unchanged strings (title, kicker, summary, labels, faq[0].q, faq[1].q, faq[4].q, the other seven frame strings) were read as well: nothing to report. «ایک» occurs twice in the body («ایک باریک کرن», «یہی ایک منظر»), both meant, as stage 5 found.

## Not verified

- This is a model's reading, not a native human's.
- How the page renders in Nastaliq: the direction of «8:00–22:00», the orientation of the unmirrored quotation marks, the arrow.
- A printed dictionary gender for «ہال» (pending in `termbase_final`, masculine by usage) and for «انتظامیہ» (feminine from my own knowledge). کرن, خوبی and گرمی are feminine by the Rekhta labels in the judge's `s7-rk-out.txt`.
- Attestation of the reader-supplied wordings in a corpus. Exact-phrase page counts on ur.wikipedia (`s5b-wiki-out.txt`): «عین سردیوں میں» 0, «گرمی عروج پر» 0, «ہلکی سی گرمائش» 0, «کس وجہ سے مشہور» 0 — and 0 as well for the control «عین گرمیوں میں»; «میں جا نکلتا ہے» 1, «دیر تک کھلا» 2, «وہاں کی انتظامیہ» 1, «چھن کر آتی» 1, «الاحساء کے نخلستان» 2. An encyclopaedia does not decide spoken idiom, so the zeros are not findings; these four wordings rest on the blind reader's proposal and on this reading.
- `stage45-check.mjs` and the `s7-*` scripts were not run; the judge reports that the former still encodes three superseded rules.

## Files

Created in the work directory, nothing else touched: `stages/05b-proof-of-final.md`, `s5b-scan.mjs`, `s5b-scan-out.txt`, `s5b-wiki.mjs`, `s5b-wiki-out.txt`, `s5b-quotecheck-out.txt` (every «…» fragment of this report that claims to be page text was matched verbatim against the final fields).

The worktree shows one uncommitted change, `ur-translation/glossary/termbase.json`, last written 2026-10-11 21:38 — before this stage started; this stage only read it.
