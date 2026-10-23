# proofread-r1 — ur-blog-2, judge round 1 — 1 MANDATORY, 3 RECOMMENDED

Files read: RUNBOOK-r5.md, PROOFREAD-BRIEF-r1.md, judge-r1.json, ur-05.json, pack.json (with its links table), ref.json, termbase.json (terms, calibration_rulings), tm.json, blind-input.r1.txt, and for comparison ur-blog-1/judge-r3.json. No file was edited except this report.

## Machine lines (quoted)
- `verify.mjs ur-blog-2 judge-r1.json` -> `OK judge-r1.json: 87 strings, 93 termbase additions, 61 notes`
- `merge-memory.mjs ur-blog-2 judge-r1.json` (dry run, no --write) -> `termbase +93 (pending), 0 identical skipped, 1 notes appended; rulings 494 (+5 stage 4, +5 judge); amendments 0; owner questions 0; tm 2007 -> 2094`

## What was checked and passes
1. Diff. The keys of judge-r1.strings that differ from ur-05.strings are exactly 11, and they are exactly the 11 keys of judge_edits (jabal-qarah.body, crafts.body, souvenirs.body, hasawi-lomi.description, hasawi-lomi.body, hasawi-lomi-history.body, hasawi-lomi-history.faq.3.a, tarafa-ibn-al-abd.description, .faq.2.a, .faq.3.a, .body). I replayed all 35 before->after pairs in order on ur-05; every `before` occurs exactly once at its turn and the result equals judge-r1's string byte for byte for all 87 keys. There is no silent change; the other 76 strings are byte-identical to ur-05.
2. Letters and punctuation. All 87 strings: no ي ك ة ه ى أ إ ۃ, no Arabic-Indic digits, no «؛», no U+2013/2014, no NBSP, no ASCII quotes, no zero-width characters; “ ” and ( ) balance in every changed string.
3. Skeleton and links. For the six bodies, H2/H3, bullet, numbered, blockquote, bold counts equal ur-05 and the English source (5/5/5/7/10/8 H2). Every link target equals ur-05 and the English source mapped through pack.links, in order (62 in Tarafa, 50 in lime history; the only differences are percent-encoding of the two Arabic-path URLs, identical to ur-05). The only changed link markdown is `[اس کے مدخل](https://shamela.ws/book/23735/107)` -> `[اس کے اندراج](https://shamela.ws/book/23735/107)`, target byte-identical.
4. Facts. The Tarafa reworkings agree with both sources: the «بحرین» sentence (EN "assumes that some land other than Al-Ahsa is meant"), the Mu'allaqa sentence ("The closest the Mu'allaqa ... comes to Hajar is a seafaring image near its opening"), the Saudipedia sentence ("the silence of the early sources" kept as «ابتدائی ماخذ ... خاموش ہیں»), the FAQ letter sentence («طرفہ کے لیے ... حاکم کے نام», as AR «كتب لطرفة إلى عامله» and body block 12), «جس شخص نے الاحساء کو» ("the man who built it up and fortified it"), «ان (یعنی اپنی قوم)» (both sources carry "meaning his own people"). The «قصبہ ہجر» gloss «یعنی (عربی لفظ کے مطابق) اس کا صدر شہر» is the sources' "that is, its principal town" / AR «أي مدينتها الرئيسة»; no new fact. C15 «دنیا کا سب سے بڑا نخلستان» exact in jabal-qarah.body (twice); C16 holds (warmth in «سردیوں» in body and faq.0.a, none at night). Lakh forms per P10 unchanged (25 لاکھ, 1 لاکھ, 10 لاکھ, 70 سے 80 لاکھ, دسیوں لاکھ). All 11 death years in the Tarafa body are `(متوفی N ہجری)` (N12), matching the 11 English `(d. N AH)`. «زائر» is gone from the Tarafa article (N29: not a mosque page); the remaining «زائر» hit is inside «جزائر». No «بادزہر», «مدخل», «مادہ», «اہل اخبار» remains. blind-input.r1.txt carries the final text (پادزہر 3, اندراج 4, نتیجہ 3, عربی لفظ کے مطابق 1).
5. Record. N810–N814 are in range and unused: the live termbase holds 484 rulings, with no N805–N819 and N820+ from dining-3; no other output/ur-* folder uses them; N805–N809 are in ur-04.json notes. Cited rulings exist in the termbase (N671, N792, N790, N793, N795, N12, N7, N27, N29, N17, N66, N156, N367). No withdrawn ruling is contradicted; base_amendments = []. Rulings carry no `guard` field, as in ur-blog-1 judge-r3, so nothing to confine. `termbase_additions`: 93 entries, each with en/ur/source/gender; no «؛» anywhere; no key already in the termbase (no same-key or same-en collision, so nothing to compare for `en`). `termbase_notes`: one, on the existing key «سیاح». `tm_pairs`: 87, one per key, `ur` and `en` identical to the final strings and pack. `scores_row`: a 5-cell CSV string like ur-blog-1's; 28+25+19+8+10 = 90 = batch_score; per_page minimum 90 equals the decision threshold.

## MANDATORY (1)
### M1 — termbase_additions[35] «خولہ» (and [39] «ابن یامن') wrongly typed: a woman recorded as a masculine place, a man as a place
- Quote: `{"en":"Khawla (the woman of the opening line)", "ur":"خولہ", "gender":"مذکر", "kind":"place"}` and `{"en":"Ibn Yamin (sailor of Hajar, in Ibn al-Anbari)", "ur":"ابن یامن", "gender":"مذکر", "kind":"place"}`.
- Problem: the judge's note says «gender of place names stays مذکر provisional», but these two are persons. Khawla is a woman's name; recording it masculine would bind a wrong agreement on any later page that speaks of her. Merged as written, the termbase carries a wrong gender.
- Fix: in judge-r1.json termbase_additions set «خولہ» to `"kind":"person","gender":"مؤنث"` and «ابن یامن» to `"kind":"person"` (gender مذکر stays). Then re-run verify.mjs and the dry merge. No string changes.

## RECOMMENDED (3)
### R1 — the record lacks a note line for N813
- Every judge ruling of ur-blog-1 judge-r3 (N795–N797) and of this file (N810, N811, N812, N814) is also named in `notes`; N813 is only in `rulings`.
- Fix: add a `[j1]` note, e.g. `[j1] N813 (Yaqut's «قصبہ ہجر»): the quoted word kept, in-place gloss «یعنی (عربی لفظ کے مطابق) اس کا صدر شہر», the subject of the "who built it" clause named (جس شخص نے الاحساء کو ... اس نے اسے); no sentence added on the Hajar/al-Bahrayn/Al-Ahsa relation (SD-15, N806).`

### R2 — genders of two title entries look wrong for Urdu
- Quote: `{"ur":"خزانہ الادب","gender":"مؤنث"}` and `{"ur":"المکتبہ الشاملہ","gender":"مؤنث"}` (also «طبقات فحول الشعراء» مؤنث).
- Problem: Urdu «خزانہ» and «مکتبہ» are masculine nouns (the Arabic ة feminine was carried over); the head word decides agreement in Urdu. The judge's note says the Rekhta gender of these was not opened. Not used with any agreement in the 87 strings, hence not blocking.
- Fix: set «خزانہ الادب» to مذکر after a Rekhta check; set «المکتبہ الشاملہ» likewise; check «طبقات» (rekhtadictionary). Otherwise mark gender "provisional" in the entry's note.

### R3 — one word for "principal town" in the Yaqut passage
- Quote (tarafa body, after the edit): `“قصبہ ہجر” قرار دیا، یعنی (عربی لفظ کے مطابق) اس کا صدر شہر` while the same body and faq.1.a say «صدر مقام» for the same English "principal town" (`ہجر کا صدر مقام الصفا اور المشقر ہے`, `جسے ہجر کا صدر مقام بنایا گیا`).
- Fix (optional): `یعنی (عربی لفظ کے مطابق) اس کا صدر مقام`. AR «مدينتها الرئيسة» allows «شہر», so this is style only; if changed, also fix N813's `ruling` text, which quotes «صدر شہر».
