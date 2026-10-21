# ur-trails-1: proofread of the judge's round 2 (stage 5 role, independent)

Scope: (a) the 4 strings that differ between `judge-r1.json` and `judge-r2.json` (computed: exactly the 4 `judge_edits`, none missing, none extra); (b) `base_amendments` (3) and rulings N530–N536, against proofread-r1 M1 and the standing rulings in `termbase.json`. No file other than this report was edited.

`node verify.mjs . judge-r2.json` → `✓ judge-r2.json: 90 سلسلة، 32 مدخل معجم، 64 ملاحظة`.

**Result: MANDATORY 1 · RECOMMENDED 4**

---

## MANDATORY

**M1. The third case names «مدرسہ امیریہ (“بیت الثقافہ”)» under a test that standing ruling N283 says this kind of source fails. The record needs one explicit sentence; no string has to change if the judge rules it a name.**
- The amended P3c-labels guard (third case), and N294 before it, need "a second name with which BOTH source stop names close in a bracket". The amended `P3c-labels.binds` lists `trails.historic-hofuf.stops.al-amiriya-school.name` as a case of it.
- N283 (b18-ui) is the standing reading of "both": where the English bracket is a **gloss** (the English meaning of the Arabic second name, 'Citron' for «الأترج»), only the Arabic closes with a second name, and **no bracket is admitted**.
- Here the sources are EN 'Al-Amiriya School **(House of Culture)**' and AR «المدرسة الأميرية (بيت الثقافة)». 'House of Culture' is the English meaning of «بيت الثقافة», just as 'Citron' is the meaning of «الأترج». The site's own records treat it as a gloss: the termbase entry «بیت الثقافہ» has en «Bait Al-Thaqafa (House of Culture)» and gloss «ثقافت کا گھر», and the published English ameeriah body writes «'Bait Al-Thaqafa' (House of Culture)». Against that, the English trail text uses it as a name («Now known as the House of Culture»).
- By contrast, «بیت البیعہ (بیت الملا)» passes N283: the English 'Al-Mulla House' carries the proper name, as kanzan's '(Al-Shu'bah)' does under N103.
- Neither N521, N530 nor the base amendments mention N283. A later proofreader who applies N283's test to the guard as amended will flag the amiriya H3. That is the same failure M1 of round 1 was raised to prevent.
- **Fix (judge's choice):** (i) record in N521/N530 that 'House of Culture' is the building's English **name** (its use as a name in the English trail text), not a gloss in N283's sense, and say that N283 is distinguished for this reason. No string change. Or (ii) apply N283: the H3 becomes «مدرسہ امیریہ» with no bracket. «“بیت الثقافہ”» stays in the stop text, and the amiriya binds entry comes out of `P3c-labels.binds`.

---

## RECOMMENDED

**R1. Jawatha text: «دونوں نخلستان کے حصوں» invites the misreading "both oases".**
The grammar is correct: «نخلستان کے» is singular oblique, and "both oases" would be «نخلستانوں». Even so, «دونوں» directly before «نخلستان» makes a reader stop. Round 1 had «دونوں اس کے حصوں», where this could not happen. Options:
- «… کا مقام، دونوں الاحساء کے نخلستان کے حصوں میں شامل ہیں»
- or reorder: «… کا مقام، نخلستان کے حصوں میں دونوں شامل ہیں»

Either way N534 still holds, because the oasis is named.

**R2. meta.unescoNote: the bare «نخلستان کے بارہ حصوں» now stands alone in its own sentence.**
- N16 (2) puts the count in the same sentence as the inscription, so that it "hangs on what was listed" and is not read as geography.
- Here the count was already in the second sentence in round 1, so this is not new. But «اس کے» pointed back to the listed property, while the bare noun now reads more easily as the physical oasis having twelve parts.
- Optional fix: «… جو عالمی ورثے میں شامل نخلستان کے بارہ حصوں میں سے کسی میں ہو» (N2 form). This is a judge's call, because no reader has stumbled on it.

**R3. Oasis intro: the colon now follows an indirect question of manner.**
«آپ دیکھتے ہیں کہ یہاں کے لوگ نخلستان میں کیسے زندگی گزارتے ہیں: دور تک پھیلے کھجور کے باغات، …» sets a list of places after a "how" clause. The list does not answer "how". The source's colon introduces what the trail shows. Possible repair: «… کیسے زندگی گزارتے ہیں۔ راستے میں دور تک پھیلے کھجور کے باغات … آتے ہیں …». This would need a recast of the list, so it is the judge's call. No fact is affected.

**R4. The P3c-labels `ruling` field still says the guard «now names its one exception».**
That text was already out of date after N294, and the base amendments update `guard` and `binds` but not `ruling`. A fourth amendment (or a note) should change "its one exception" to "three exceptions (N103, N294, N521)", so that ruling, guard and binds agree when read on their own. N294's own `guard` field ("P3c-labels' guard carries this as its second case") stays accurate.

---

## (a) The four changed strings

| Check | meta.unescoNote | jawatha-mosque.text | oasis-and-springs.intro | al-ahsa-national-park.text |
|---|---|---|---|---|
| Letterforms `[يكةهىأإۃ]`, U+00A0, U+06F0–06F9 / U+0660–0669 | none | none | none | none |
| Punctuation (`۔` `،`, no Latin `.` `,` `"` `«»` `؛`, no space before `۔`/`،`) | PASS | PASS | PASS | PASS |
| Agreement | PASS: «نشان … دکھایا جاتا ہے»; «پڑاؤ … جو … شامل ہو» | PASS: «مسجد اور … مقام، دونوں … شامل ہیں» | PASS: «آپ دیکھتے ہیں» (honorific); «لوگ … زندگی گزارتے ہیں» | PASS: «درخت لگائے گئے» (m. pl.); «یہ پارک … ایک موزوں آغاز ہے» (m.) |
| Published names | «الاحساء کا نخلستان», «یونیسکو», «عالمی ورثے کی فہرست» (N2) | «مدینہ منورہ» (P9), «مسجد نبوی», «جواثا», «الکلابیہ», «ہفوف» (P1, no article), «الاحساء کا نخلستان» | «الاحساء», «نخلستان» | «العمران», «الاصفر», «پارک» (owner 2026-10-15) |
| Added fact? | No. «نخلستان» names the referent; the count is from the source ('twelve' / «الاثني عشر») | No. Number-free, as the source ('both inscribed component parts') | No. 'experience the oasis as its people live it'; «روزمرہ» correctly refused | No. Belts kept (N535, published body «ایک پٹی میں»); the closing clause now matches the Arabic «بداية مناسبة للمسار», and round 1's unsupported «یوں» is gone |
| Notes | R2 | R1 | R3 | — |

N47: both N534 edits use the bare «نخلستان» after «الاحساء کا نخلستان» has been named on the page, and in jawatha's case in the same sentence. This is allowed.

## (b) Base amendments and N530–N536

- **Does the round resolve M1 of round 1?** Yes, as M1 asked:
  - `P3c-labels.guard` now writes the third case into the guard text, in N294's own way, and admits the key's P3b marks inside the bracket.
  - `N294.binds` now explicitly excepts trail stop names from «Not other interface headings…».
  - `P3c-labels.binds` records where the case is used.
  - All three `before` texts match the current termbase byte for byte (checked), so they apply cleanly.
  - The guard text in `P3c-labels.guard.after` («مدرسہ امیریہ (“بیت الثقافہ”)») is clean Urdu with no Arabic letterforms.
  - What is left is the N283 question in M1 above, which round 1 did not raise, and the stale `ruling` field (R4).
- **N530:** consistent; it records the amendments. See M1 (N283) and R4.
- **N531:** resolves proofread-r1 R1. «اخبار» is limited to press mastheads, the brand analogy is withdrawn, and «وزٹ سعودی — جبل القارہ» stays bare. No conflict with P3c-labels, whose scope it states (P3c names).
- **N532:** rejecting proofread-r1 R2 is within the judge's discretion. N525's scope (ui.trails.landmark only) is now stated, and the option is recorded. No conflict.
- **N533:** resolves proofread-r1 R3. The termbase key is again the noun «سیاحتی مقام کا صفحہ» (m., N507), and the link label is in the note. Consistent with mapNote's oblique «… صفحے سے».
- **N534:** consistent with N16 (2). The order (inscription first, in its own clause) is unchanged. The model wording «اس کے بارہ حصوں میں سے ایک» stays wherever no second «اس کے» competes, and the published bodies are untouched. See R1 and R2 for side effects of the bare noun.
- **N535:** consistent. It uses the image of the published national-park body. «پٹی لگانا» = bandage is a sound reason. The plural "belts" follows the source «أحزمة».
- **N536:** consistent with stage-4 N506. The condition for switching is recorded and nothing changes.
