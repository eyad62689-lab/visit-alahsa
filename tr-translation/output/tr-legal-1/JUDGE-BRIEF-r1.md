# Judge brief — batch `tr-legal-1` (the Turkish policies and legal terms page `/tr/legal/`, 117 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-legal-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (the page's rule: translation only of an owner-approved document; the Arabic is the original and decides divergences; the Saudi law must not read as Türkiye's KVKK; brand Latin).
3. `BATCH\pack.json` (117 strings: `en`, `ar`, `ctx`, `precedent`) and `BATCH\ref.json`.
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (read every `notes`; stage 04 holds the attestations and what stayed unattested: the Saudi PDPL compound, «Kraliyet Kararnamesi», «Uygulama Yönetmeliği», the cyber-crime and copyright law names, the Berne title). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the page as built from stage 05 (66 items: cite as P1.<n>). Its input `BATCH\stages\06-blind-reader-input.on-05.filtered.txt` was cut mechanically from dist; the reader saw no source and was not told it is a translation.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` — especially `tr-ui-1`, `tr-dining-2` (DN16-r2 comma rule), `tr-events-1` / `tr-trails-1` (Hijri date), `tr-stores-1` (OS19), `tr-visa-1` (VG2 «Suudi Arabistan», VG4/VG14 «resmî»); skip rulings with `superseded_by`) and `REPO\tr-translation\memory\tm.json`, and the published tr block of `REPO\src\i18n\ui.ts` for frame names. You may use web search to attest a legal title.

## Units and scores
Score five units and take the lowest as the batch score: `head` (legal.title, updated, introH, intro.*, closingH, closing.*, contactPre, copyright, seoDesc — 11), `privacy` (legal.sec.0.* — 29), `terms` (legal.sec.1.* — 23), `disclaimer-cookies` (legal.sec.2.*, legal.sec.3.* — 29), `ip-links` (legal.sec.4.*, legal.sec.5.* — 25).

## Standing rules
- **This is an owner-approved legal document: translate, never amend.** The reader judges the page, not the source. Reader items that are the document's own content get verdict `source_defect` (list each in `source_defects` with the key; no Turkish change beyond fixing a Turkish fault inside the sentence): «independent» of whom (P1.3 second part), «largely anonymous» vs IP collected vs «anonymous statistics» (P1.12), contact forms / channels that the page does not show (P1.13, P1.64 last part), where Google's servers are (P1.17), the vague time promises and no retention period (P1.21, P1.23), the under-18 logic (P1.24 first part — check the English: keep its logic exactly), operators unnamed (P1.27), section 2 item 2 vs section 5 overlapping (P1.28), the moral-values ban (P1.35 content), «currently» / tools «that may be added» (P1.48 second part, P1.49), the mascot unexplained (P1.53 — do not add an explanation), «serious» reports and who proves a claim (P1.57, P1.58 second part), which authority (P1.65), the two copyright formulas (P1.66 — only if the English writes both; then keep both), the education-quotation vs licence line (P1.59). Do not add a fact, a period, a country or an explanation the source lacks.
- **But a Turkish fault that creates the problem is yours.** Where the reader's confusion comes from the Turkish (an ambiguous scope the English does not have — P1.29: does «ticari amaçla» govern all five verbs? read the English and the Arabic and make the Turkish scope match; P1.24 «fark edersek … öğrenir öğrenmez» doubling; P1.41 the list after «aşağıdakilerden» in the nominative; P1.33 the robots.txt exception — make its scope unmistakable as the English states it), fix it.
- **Frame and brand are not reopened** (verdict `frame`): «Visit Al-Ahsa» Latin beside «El-Ahsa» the place (P1.2 — termbase and brand rule; you may restructure the first sentence so the two do not collide); the footer link «Politikalar ve kullanım koşulları» is published (`foot.l.privacy`, P1.1) — you may align the H1 with it or keep «Politikalar ve yasal koşullar»; rule which and why.

## Items to rule
1. **Register** (P1.6, P1.7, P1.9, P1.14, P1.42, P1.44, P1.62): a Turkish privacy policy / terms page is formal but current. Replace Ottoman-bookish or calqued words where a current legal Turkish word exists («zımnen» → «örtülü olarak» / recast; «beyan edersiniz»; «azami önem»; «sonuçsal zararlar» → «dolaylı zararlar» is already there — the English «direct, indirect or consequential»: find the attested Turkish triple; «sözleşmesel» → «sözleşmeye dayalı»; «bunların ticaretini yapmayız»). Keep the legal force of every clause.
2. **One voice for the actor** (P1.8, P1.24, P1.36, P1.46): the English alternates «the site» / «we» / «the user» / «you». Follow the English sentence by sentence; where Turkish makes the switch jarring inside one paragraph, the subject may be made explicit — do not normalise the whole document.
3. **«resmî» three ways** (P1.26): right after «not a government body», «sitenin resmî iletişim kanalları / e-posta adresi» reads as a contradiction in Turkish. Rule a Turkish rendering of the English «official (channels/email)» for the site's own channels that does not suggest a state body (e.g. «sitenin kendi iletişim kanalları», «sitenin iletişim adresi»), keep «resmî kurumlar» for government, and «resmî eklenti» → Google's own add-on wording. Record it as a ruling (LG…), consistent with VG4/VG14.
4. **Cookies vocabulary** (P1.18, P1.47, P1.49, P1.51, P1.52): the English uses «cookies», «tracking files», «tracking means», «file types». Rule one Turkish pattern («çerez» as the main term; «izleme dosyaları» / «dosya türleri» only where the English needs the distinction; «çerez türleri» if the English heading means cookie types) and the quote-plus-suffix form («“Çerez politikası” başlıklı bölümde» instead of «“Çerez politikası”nda»).
5. **Law names** (P1.31, P1.55, P1.5): the Saudi Anti-Cyber Crime Law — the Arabic title is «نظام مكافحة الجرائم المعلوماتية»; stage 4 notes «Bilişim Suçlarıyla Mücadele» as the Turkish for «information crimes». Rule the form, with the country before it so it cannot read as a Turkish law. The Berne Convention: the reader expects «Edebî ve Bediî Eserlerin Korunmasına Dair Bern Sözleşmesi»; stage 4 printed the tr.wikipedia title. Attest the title Türkiye's own instruments use (Resmî Gazete / law 4117 / TÜRKPATENT) and print that. The decree sentence (P1.5): split it so the date reads as Hijri at once and «(M/19)» reads as the decree number, keeping the binding Hijri form.
6. **Long chains and misreads** (P1.4, P1.10, P1.11, P1.15, P1.16, P1.19, P1.20, P1.22, P1.25, P1.30, P1.32, P1.34, P1.37, P1.38, P1.39, P1.40, P1.43, P1.45, P1.50, P1.54, P1.56, P1.60, P1.61, P1.63, P1.64): fix where the reader names a real Turkish fault — split, don't reorder; the genitive the ear needs («Sitenin nasıl kullanıldığını», «sitenin kimliğine»); «bilgimiz olmaksızın» → «haberimiz olmadan»; «denetim» → «kontrol»; «zorunlu olarak gelmez» → «mutlaka … anlamına gelmez»; «İçeriği ayıklamak» → the Turkish for scraping content. Every clause, hedge and exception stays.
7. **Everything else**: applied or rejected with the reason. One line per reader item in `blind_reader_rulings` — all 66.

- `legal.contactPre` keeps its final colon and one space; `legal.updated` «Son güncelleme: 10 Temmuz 2026»; `legal.copyright` stays the Turkish copyright-line shape; no Markdown; Latin digits.
- Each termbase proposal of stages 1–5 becomes a `termbase_additions` entry (attested ones with `"status": "attested"` and the source URL; anything else `unattested`), using the forms you finally print.
- **Check against the English and the Arabic, sentence by sentence, all 117 strings** after your edits.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-legal-1", "stage": "07", "round": 1, "date": "2026-11-04",
  "scores": { "head": n, "privacy": n, "terms": n, "disclaimer-cookies": n, "ip-links": n }, "batch_score": <lowest>,
  "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 117, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json, full text, no "..."
  "blind_reader_rulings": [ { "item": "P1.1", "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published", "key": "…", "why": "…" } ],   // all 66 reader items
  "rulings": [ { "id": "LG1-…", "title", "ruling", "evidence" } ],   // binding for later batches; ids LG1, LG2, …
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "legal", "field" } ],   // every approved string (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ] }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-legal-1 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-legal-1/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-legal-1/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository other than your output.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the five scores and the decision; the number of keys changed; the rulings in one line each; owner questions (facts only — wording is yours); what you could not verify.
