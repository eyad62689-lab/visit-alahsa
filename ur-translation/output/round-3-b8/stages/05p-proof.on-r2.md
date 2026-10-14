RESULT: must-fix=0 should-fix=0 note=8

Proof pass (stage-5 role, report only) on b8 judge round 2 (`stages/07-judge.round2.json`). Nothing was modified. The previous text is `07-judge.round1.json`, and the earlier proof is `05p-proof.on-r1.md`. Rulings in force: the termbase (148 rulings), `b0-ui` round 3 and `b7` round 2. Helper scripts: `b8/p2-dump.mjs`, `p2-scan.mjs` and `p2-verify.mjs`. Their outputs are in `p2-dump.txt`, `p2-scan.txt` and `p2-verify.txt`.

Checker, re-run (verbatim): `RESULT [b8 07-judge round 2]: 0 mandated, 0 extra, 0 ruling finding(s), 3 note(s) | 6 page(s), 47 strings, 5337 code points | changes=2 over 2 leaf(s) | scores 93/97/92/91/91/90 batch_score=90 threshold=90 decision=APPROVE | rulings=38 proof_rulings=14 | termbase_final=33 | selftest PASS`. These are the same 3 NOTEs as in round 1: P20 on khalifa-museum::area (N128), and TM on the two parks' feminine Hours value (N65).

`check-final b8` (verbatim): `RESULT [b8 final]: 0 problem(s), 2 evidence gap(s) | batch_score 90 APPROVE | rounds 88/90 | owner overrides 0 | text 6632437551f8 | CURRENT AND CHECKED, NOT VERIFIED`. The two gaps are this proof and the fresh blind read on r2.

A script compared the two rounds. Exactly two leaves differ from round 1, and they are the two leaves in the change log: ahsa-museum::body and ahsa-house-museum::summary. `final.json` matches r2 exactly: the text has 0 differences, and `calibration` and `termbase_final` are byte-identical.

## Eleven-item checklist (r2 text, all 47 leaves; the 2 changed leaves read in place)
- 1 Letterforms: PASS. A script ran `[يكةهىأإۃ]` over every leaf. Hits: none. Other marks found: tanween (U+064B) in «تقریباً» ×4 and in «معاً» (the Arabic name), and superscript alif (U+0670) in «الموسیٰ» ×3 (N82). All of these are allowed. No Latin letter, no Arabic-Indic or Extended digit, and no NBSP.
- 2 Name forms: PASS. All six titles are termbase_final keys byte for byte. Five of them stand byte for byte in their body; stadium-park's body does not name the park, which is the source's form. Four retired keys are absent from every leaf and are not keys of termbase_final: «الخلیفہ ورثہ عجائب گھر», «عبد الرزاق العرب عجائب گھر», «الاحساء کے گھر کا عجائب گھر», and b7's «تاروں پر چلنے والی ہوائی سواری». In the changed summary, «“النعاثل” عجائب گھر» is the same string as in the body.
- 3 Grammar: PASS. In «اسے “النعاثل” عجائب گھر بھی کہتے ہیں» the impersonal plural verb takes «اسے» as its object. «جو … کھولا گیا، اور جس کا رقبہ … ہے» coordinates two relative clauses on «عجائب گھر» (masculine). Both edits are correct Urdu.
- 4 Address: PASS. No «تم» and no non-honorific form.
- 5 Headings: PASS. No title, kicker or label was changed. No final «۔» and no bracket.
- 6 Termbase: PASS. No form changed in this round. Record checks are in items 7 and 8.
- 7 Punctuation: PASS on both changed leaves. No ASCII comma or point after a letter, no space before «۔/،», no NBSP, no «؛», no guillemets or straight quotes. The curly marks are balanced 1/1 (N16, N72). The summary has one colon, as it did in round 1.
- 8 Numbers: PASS. The edits move no figure. «چار ہزار» stays in words, as both sources write it. 1980 and 1404 are unchanged.
- 9 Loans: PASS. The edits add no loan.
- 10 Glossing: PASS. «النعاثل» keeps its marks (N72). No gloss is added to the summary.
- 11 Structure: PASS. The leaves are in pack order and there is no `source*` key.

Every cell checked in place: ahsa-museum::body (S1–S7, with S2 read closely); ahsa-house-museum::title together with ::summary (S1–S2) and ::body S1, because the page shows them in that order. As a cross-check for a ruled form applied on one page and not another, I also read khalifa-museum::body for «الاحساء کے گھر» (N132 scope). A script found no sentence of either changed leaf in b7 round 2. No b7 leaf has an "also called" or "whose area" frame to compare against.

## Items

1. NOTE. **ahsa-museum::body, change 0: «… جو 1980 کی دہائی کے اوائل (1404 ہجری) میں کھولا گیا، اور جس کا رقبہ تقریباً چار ہزار مربع میٹر ہے۔»** This is exactly the cure from proof item 2 on r1. «جس» is parallel to «جو», so the area now belongs to the museum and cannot first be read as the oasis's. Meaning against EN "on a site of roughly four thousand square metres" and AR «على مساحة تقارب أربعة آلاف متر مربع»: the same fact, approximate as in the sources, in the present tense like ru "занимает". Nothing entered or left. On rhythm, S1 and S2 now carry three relative frames («جو … قائم ہے» / «جو … کھولا گیا، اور جس کا …»), as r1 note 10 foresaw. The sentence is readable and the judge accepted it.

2. NOTE. **ahsa-house-museum::summary, change 1: «اسے “النعاثل” عجائب گھر بھی کہتے ہیں: الاحساء کا ایک پرانا گھر، اپنی بیٹھکوں، باورچی خانے اور دلہن کے کمرے سمیت۔ اسے سلیمان الماجد نے قائم کیا۔»**
   - Source: these are the second reader's words, verbatim (06 on r1, item 26).
   - What entered: «بھی» ("also") and the verb frame. EN «The 'Naathel' museum — …» and AR «متحف «النعاثل» — …» set the name first, with a dash. The "also known as" is the body's (EN "known as", AR «المعروف بمتحف «النعاثل»»), so no new fact is added. The judge charges the change of form under accuracy, which is fair.
   - Precedent the judge did not cite, which supports the edit: (a) the approved zh summary of this very page opens «人称“纳阿西勒”博物馆» ("commonly called the 'Naathel' museum"); (b) the approved shaban summary has «… جسے “ابا الکباری” بھی کہتے ہیں۔» (tm.json), although there the English itself says "also called".
   - What left: nothing. The house, its rooms and the founder all stay.
   - The colon seam: after a full clause ending in «کہتے ہیں», the verbless phrase after the colon explains what the museum is. That is a clean reading. A reader could take it as the meaning of «النعاثل», but the risk is low, because the phrase describes a house, not a word.

3. NOTE. **Repeated words in the changed summary (read with the title above it).**
   - «اسے» now opens both sentences of the summary («اسے … کہتے ہیں: … سمیت۔ اسے سلیمان الماجد نے قائم کیا۔»). The parallel makes both point to the museum. The second «اسے» still follows a phrase headed by «گھر», so "he founded the house" stays possible. That ambiguity was in round 1 and is in the English ("an old Hasawi house …, founded by"), so the judge did not introduce it.
   - «گھر» occurs 4 times across title and summary: «…روایتی گھر کا عجائب گھر» / «… عجائب گھر بھی کہتے ہیں: الاحساء کا ایک پرانا گھر». «عجائب گھر» occurs 2 times across title and summary, and once in the summary alone. These counts are unchanged from round 1. «عجائب گھر» is one lexical compound (N132 evidence) and the name requires it.
   - New with this edit: the page now says "also called" twice in a row. The summary has «اسے “النعاثل” عجائب گھر بھی کہتے ہیں». The body's first sentence has «جو “النعاثل” عجائب گھر کے نام سے بھی معروف ہے» («النعاثل» appears 2 times on the page, both with «بھی»). This mirrors the sources, which name it in both fields.
   - I raise no finding: the fresh reader on r2 is the test. If he remarks on it, the smallest cure is to drop the second «اسے»: «… سمیت، جسے سلیمان الماجد نے قائم کیا۔». Note that «جسے» would then attach to «گھر», so the "founded the house" reading would get stronger. The alternative is «اس کے بانی سلیمان الماجد ہیں۔», which has the same ambiguity with a different frame. Neither cure is clearly better, so this is not a should-fix.

4. NOTE. **The summary now opens on a pronoun.** By N131's evidence the summary is also the page's meta description and its index-card text. In both places the title stands next to it (the search result's title, the card's title), so «اسے» has an antecedent wherever it is shown. No approved Urdu summary opened on «اسے» before. The approved pattern is the relative «جسے … بھی کہتے ہیں» after a noun (shaban). This is for the fresh reader. No ruling is touched: N72 asks for marks only, and P3c-labels concerns glosses.

5. NOTE. **Each item of the r1 proof, handled as the judge says (verified field by field):**
   - (1) N132's ruling, binds and guard now limit the item to ahsa-house-museum's title and body, and name khalifa-museum's list topic as exempt. khalifa-museum::body still reads «الاحساء کے گھر، کھیتی باڑی، …», consistent with the exemption.
   - (2) Applied as change 0.
   - (3) The owner list in `notes`, item (6), names «ڈیجیٹل» with the missing headword and the loan-free fallback «برقی طور پر / برقی شکل». The entry's note carries the same flag, citing N90 as precedent, and names both cells. The cells are «ڈیجیٹل طور پر محفوظ کرنے» and «ڈیجیٹل شکل میں ڈھل گئیں»; a script found both in abdulrazaq-museum::body. The key stays the phrase, and the reason is given: an entry needs a gender. The note cites P16, so checklist item 9 reaches both cells.
   - (4a, 4b) The `source` of «الخلیفہ کا ورثہ عجائب گھر» and of «عبد الرزاق العرب کا عجائب گھر» now opens "construction on item N122 (2) … ruling N85 … is not reopened".
   - (4c) The «الاحساء کا عجائب گھر» note quotes «ہفوف میں الاحساء کا عجائب گھر واقع ہے، جو آثار قدیمہ اور لوک ورثے کے لیے قائم ہے». This string is a literal substring of the body.
   - (13) N122's gender sentence is corrected (feminine for musa-park, masculine for the two museums). N122's strings_affected adds khalifa-museum::body and the three live keys. N123 and N133 cite the new keys. N132 adds ahsa-house-museum::body and the new key.
   - (5–12, 14) Kept as notes. Each ruling's reason matches what the reader on r1 reported.

6. NOTE. **Calibration, read entry by entry.**
   - P4 and BRAND are untouched, as the termbase has them.
   - Every entry from N122 to N135 is `ruled`. Each ruling, binds, guard and strings_affected list agrees with the r2 text. A script checked that every Urdu form quoted in a ruling or guard either stands in the text or is named there as an alternative, a refused candidate or a retired form (`p2-verify.txt`).
   - N122: the ruling (A for a place, B for a private museum) matches the titles. Its binds name khalifa-museum::body. abdulrazaq-museum::body is covered by N123 ("unchanged; equals the key"), which is consistent. `termbase_keys_retired` (2) is complete.
   - N123: closed by N122. The body equals the key.
   - N132: the round-2 scope is consistent in its ruling, binds and guard. `termbase_keys_retired` (1) is complete.
   - N133: binds only khalifa-museum::title. The same compound also stands in the body, which N122's binds and guard ("every body mention … byte for byte") cover.
   - Record slip, no string affected: four candidate lists still label the withdrawn candidate "(in the text)". These are N122 A (the compounds), N129 A («پیشگی طے کرنے پر»), N132 A («الاحساء کے گھر کا عجائب گھر») and N133 A («الخلیفہ ورثہ عجائب گھر»). Those forms are no longer in the text, and each ruling says what replaced them. N133 rules "A" while its A candidate shows the retired compound. The ruling explains that A now means the compound «ورثہ عجائب گھر» after the possessive. To make the entries stand alone, the labels could read "(stage 4's text)". Record only.

7. NOTE. **termbase_final, read entry by entry (33 keys; none added, retired or restored, as the notes say).**
   - 30 keys stand literally in the text. The other three («عجائب گھروں کا کمیشن», «دیوان خانہ», «سیاحت اور قومی ورثے کا ادارہ») stand only in oblique forms, which their own notes quote: «عجائب گھروں کے کمیشن سے», «دیوان خانے», and «… کے ادارے کے دفتر نے».
   - «ڈیجیٹل شکل»: feminine by «شکل», kind generic, status pending, cites P16. Its round-1 and round-2 notes agree: the three conditions of P16-test, "pending as the browser loan", the owner flag, and both cells. The `ar` «إلكتروني / رقمنة» is accurate: the Arabic body has «إلكترونياً» and «رُقمن». The judge's compliance charge on abdulrazaq-museum (−2, pending and flagged) matches the entry.
   - «الاحساء کے روایتی گھر کا عجائب گھر»: its round-2 note quotes the new summary, and the quote stands in the text.
   - «الخلیفہ کا ورثہ عجائب گھر» and «عبد الرزاق العرب کا عجائب گھر»: their round-2 notes record the readers' homograph remarks and the owner flag, matching notes item (7).

8. NOTE. **Scores and notes against the edits.**
   - ahsa-house-museum: accuracy is 28 (the «روایتی» and "also called" charges) and fit is 9 (the summary's cure is unread). Both are consistent with items 2–4 above.
   - ahsa-museum: one unread word is acknowledged.
   - The notes' "UNREAD (round 2)" list names exactly the two changed strings.
   - The "VERIFIED vs INFERRED" line is accurate: no new count was taken in this round.
   - Nothing here moves a score. The batch is 90 at the threshold, held up by abdulrazaq-museum, which has no edit in this round.
