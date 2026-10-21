# ur-trails-1: proofread of the judge's round 3 (stage 5 role, independent)

Scope: (a) the strings that differ between `judge-r2.json` and `judge-r3.json` (computed: exactly 7, equal to the 7 `judge_edits`; none missing, none extra; 90 keys in both files); (b) the 4 `base_amendments`; (c) rulings N540–N547 and the round-3 amendments to N521, N530 and N536. No file other than this report was edited.

`node verify.mjs . judge-r3.json` → `✓ judge-r3.json: 90 سلسلة، 32 مدخل معجم، 70 ملاحظة`.

**Result: MANDATORY 0 · RECOMMENDED 2**

---

## MANDATORY

None.

---

## RECOMMENDED

**R1. ui.trails.mode «سفر کا ذریعہ» and its values (N542). For a later interface batch; no change in this round.**
- A label that asks for a "means" («ذریعہ») expects a noun as its answer («گاڑی»). The values are manner adverbs («گاڑی سے», «فور وہیل ڈرائیو گاڑی سے»), so «سفر کا ذریعہ: گاڑی سے» says "by" twice. Stage 4 had already raised this, and the judge has weighed it in N542. This is not an error: the pairing is understood.
- On the trail page, the same root also appears as «ذرائع» ('sources', ui.trails.sources). The compound «سفر کا ذریعہ» makes the meaning clear, so this is a remark only.
- If a later interface batch revisits the card, the cleaner pair is the label «سفر کا ذریعہ» with noun values («پیدل», «گاڑی», «فور وہیل ڈرائیو گاڑی»), or the present values under a label that asks "how". Record this next to N532's recorded option.

**R2. N521's round-1 sentence still gives «مدرسہ امیریہ (“بیت الثقافہ”)» as an example and admits "the key's own P3b quotation marks".**
- The ROUND 3 clause withdraws both explicitly ("the clause admitting the key's P3b marks … is withdrawn with its only case"; amiriya bare under N283), so nothing contradicts in the end.
- However, someone who reads N521 from the top meets the withdrawn example first. P3c-labels.ruling handles the same situation by keeping its history and saying it is "superseded by the appended clause". Optionally, add «(superseded in round 3, below)» after the round-1 example, so that the entry reads correctly from the top. This is a wording matter only.

---

## (a) The seven changed strings

| Check | ui.trails.mode | meta.unescoNote | bayt-al-bayah.text | al-amiriya-school.name | jawatha-mosque.text | oasis intro | natural-springs.text |
|---|---|---|---|---|---|---|---|
| Letterforms `[يكةهىأإۃ]`, U+00A0, U+06F0–06F9 / U+0660–0669 | none | none | none | none | none | none | none |
| Punctuation (no Latin `.` `,` `"`, no `«»` `؛`, no space before `۔`/`،`; label/heading without `۔`) | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| Agreement / grammar | PASS: «ذریعہ» m. (label, not exercised) | PASS: «پڑاؤ … جو … کسی میں ہو» | PASS: «سعودی عرب کے متحد ہونے کی تاریخ» (oblique infinitive + «کی») | n/a | PASS: «جس مسجد میں … ادا کی گئی، وہ … مسجد تھی» (f.); «دونوں ہی … شامل ہیں» | PASS: «آپ دیکھیں گے» (honorific future) | PASS: «پانی کی مقدار … سب سے زیادہ تھی، پھر گھٹنے لگی» (f., by «مقدار») |
| Published names | — | «الاحساء کا نخلستان», «یونیسکو», «عالمی ورثے» (N2; N16 (1): no marks) | «سعودی عرب», «بیت البیعہ», «الدارہ», «محلہ الکوت»: unchanged | «مدرسہ امیریہ» = `ref.places.al-amiriya-school.title`, byte for byte | «مدینہ منورہ» (P9), «مسجد نبوی», «جواثا», «عبد القیس», «الکلابیہ», «ہفوف» | «الاحساء» | «عین ام سبعہ», «عین الحارہ», «عین علی», «عین النجم», «عین الجوہریہ», «ورثہ کمیشن»: unchanged |
| Added fact? | No | No: «بارہ» = 'twelve'/«الاثني عشر»; the restated listing is the first sentence's | No: 'unification of the Kingdom' | No: a name is removed from the H3 but kept on the page (see below) | No: the report = EN 'first Friday prayer held after the one in the Prophet's Mosque … was held at the mosque of Abd Al-Qays' and the hadith; no honorific added | No | No: 'output peaked in 1387 AH / 1967 CE, then declined' |

Notes on (a):
- **Amiriya.** The bare H3 also fixes the gloss order. In round 2, the first mention of «بیت الثقافہ» in render order was the H3, where no gloss may stand. Now the first mention is in the stop text, as «آج یہ عمارت “بیت الثقافہ” (ثقافت کا گھر) کہلاتی ہے». That keeps the P3b marks and the entry's `gloss` verbatim, exactly once, and no other string on the historic-hofuf page names it. «بیت البیعہ (بیت الملا)» is unchanged: «بیت الملا» is a termbase key (`gloss: null`), and 'Al-Mulla House' is a proper name.
- **unescoNote.** N16 (2) holds. The inscription stands first, in its own clause, and the count now hangs on the listing within its own sentence (N2's «عالمی ورثے میں شامل … نخلستان», the summary frame N16 (2) admits). The repetition of the listing across the two sentences is redundancy, not a new fact.
- **jawatha.** The order of N16 (2) is unchanged, and N534 holds (the oasis named). «ہی» removes the "both oases" reading that proofread r2 R1 raised.
- **mode.** The value strings and the termbase entry agree. The r3 `termbase_additions` carry «سفر کا ذریعہ» (m.), and no addition is left for «آمد و رفت», which is kept in the note. No other string contains «آمد و رفت», «انتہا کو» or «اتحاد».

## (b) Base amendments (4)

- **`before` = current termbase, byte for byte: all four.** Checked with node against `glossary/termbase.json` `_meta.calibration_rulings` (strict `===`; lengths 753 / 174 / 781 / 303). Round 2's three amendments were therefore never applied. Round 3's set replaces them, as N530/N540 state, and is not chained on them.
- **Does it resolve proofread-r2 M1 consistently with N283? Yes, by option (ii).**
  - `P3c-labels.guard.after` writes the third case on N294's terms, with «بیت البیعہ (بیت الملا)» as its example. It adds N283's reading for every case: "a source bracket that holds a gloss on either side … gives no bracket". That is the same wording as N294's ruling ("a source bracket that holds a gloss on either side gives no bracket (N283 C)"). It names the amiriya as an instance, and drops the P3b-marks clause.
  - Extending N283's reading to N103's page-title case changes nothing there: N103 already requires a second *name* in both titles.
  - The Arabic «بيت الثقافة» inside the guard text is a source citation and Arabic by design.
- **`P3c-labels.binds.after`:** records bayt-al-bayah under the third case and amiriya as bare by N283. Consistent with the strings.
- **`P3c-labels.ruling.after` (N541, resolves r2 R4):** "now three" exceptions, each a second name that both source names close with, the name a termbase key; a gloss on either side gives no bracket (N283). The b7 sentence is kept as history, and the appended clause supersedes it. The ruling, guard and binds now agree when each is read on its own.
- **`N294.binds.after`:** excepts trail stop names on the same terms, with N283 included. N294's own `guard` ("P3c-labels' guard carries this as its second case") stays accurate and is rightly left untouched.
- **Contradictions with standing rulings:** none found. Checked against N103 (ruling and guard), N283 (ruling, guard, binds), N294 (ruling, guard), and N16 (points 1, 2 and 5: quotation marks only round a P3b phrase such as «“بیت الثقافہ”», which is now in running text only).

## (c) Rulings

- **N540:** sound. The site's own records (termbase en/gloss, the published English body) treat 'House of Culture' as a gloss. Refusing option (i) avoids distinguishing N283 on body text alone. Nothing is lost from the page.
- **N541:** consistent with base amendment 4.
- **N542:** the condition pre-registered in N536 is met, on a second reader. The gender reasoning by the head noun is sound (unverified on a dictionary page, as the entry says; the label does not exercise it). See R1.
- **N543:** (a) faithful to the EN report and the hadith; no honorific added (P9 rider). (b) resolves r2 R1.
- **N544:** «متحد ہونے» for «توحيد», on two readers of two. Fine.
- **N545:** «مقدار» (f.) with feminine verbs throughout. Fine.
- **N546:** resolves r2 R2 within N16 (2). The number stays a word, as the source has it.
- **N547:** the future tense is fine. Rejecting r2 R3 (the colon) is within the judge's discretion, and the option is recorded.
- **N521 (round-3 clause):** consistent with N540 and the base amendments. Its binds now point to round 3's amendments, "which replace round 2's". See R2.
- **N530 (round-3 clause):** correctly marked SUPERSEDED in its texts by N540/N541. Consistent.
- **N536 (round-3 clause):** "CONDITION MET … switched (N542)". Consistent with N542, the edit, and the termbase addition.
