# Judge brief — batch `tr-stay-dining-1` (the Turkish stay and dining pages, 3 pages, 174 strings), round 1

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-stay-dining-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge. Read, in this order:
1. `REPO\tr-translation\prompts\07-judge.md` — role and rubric (threshold 90 from `REPO\tr-translation\config.json`; batch score = lowest scored unit; a judge who scores below 90 cannot APPROVE).
2. `BATCH\BRIEF.md` — the standing brief (paths, binding sources, the lessons, this batch's traps).
3. `BATCH\pack.json` (174 strings: `en`, `ar`, `ctx` written from the component code, `placeholders`, `allowNums`, `unit`, `precedent`; `latinNames` = the card titles as the places write them) and `BATCH\ref.json` (approved frame `ui`, `food`, `places`, `siblings`, `terms`, `tm`).
4. Stage files `BATCH\stages\01-translator.json` … `05-proofreader.json` (notes, `changes`, termbase proposals, source defects, open items). Your input text is `05-proofreader.json`.
5. The blind reader's notes `BATCH\stages\06-blind-reader.on-05.md` on the pages as built from stage 05 (61 items over 3 pages; numbered continuously). Its input `BATCH\stages\06-blind-reader-input.on-05.filtered.txt` was cut mechanically from dist. The reader saw no source and was not told it is a translation. The build had no fetched Google data, so the pages show the «else» variants (`*.srcNote.else`, `dv.faqs.6.else.*`); the «then» variants and the badges are listed at the end of the cut.
Search (do not read whole) `REPO\tr-translation\glossary\termbase.json` (`terms`, `_meta.calibration_rulings`, `_meta.batch_rulings` — especially `tr-ui-1` (UI1-controls), `tr-attr-1` (A1-collisions), `tr-attr-6` (A6-governorate), `tr-attr-9` (meclis salonu), `tr-food-1` (D1-r3 foreign dish word, D19 name the owner, «haris adlı yemek»), `tr-events-1` (E1-subject-comma, E1-calendar-case-r4), `_meta.open_items`, `style_rules`) and `REPO\tr-translation\memory\tm.json`.

## Units and scores
Score six units and take the lowest as the batch score: `sv` (StayView), `sd` (StayDetailView), `sc` (stay cards + the Al-Koot body), `dv` (DiningView), `dn` (district names), `dc` (dining cards).

## Standing rules
- **The English is the translation source; a source defect is recorded, never repaired.** Source shape, not Turkish faults — record each once in `source_defects` with the reader item numbers:
  - the region filter counts (12 districts add to 24 of 29; five cards have no area line) and «Arap Körfezi Yolu» offered as a region (#32, #33 first part): the component counts cards by their `district` field; the English page is the same — frame/data, not text;
  - `dv.faqs.4.a` «the rest is in Hofuf» against `dv.faqs.5.a` and the El-Kare cards (#57) — already recorded since stage 1;
  - `dv.faqs.6.else.a` «we only publish hours, prices or ratings once verified from official sources» against the rating sentences elsewhere (#27, #59), and «each restaurant» on a page of cafés and bakeries (#59): the English. You may smooth the Turkish only where the English allows it;
  - many cards describe only a façade (#39, #42, #51) and the bakery card naming a person (#50): the English blurbs/titles («describing each place as it appears in its photo» is the method the page states);
  - the Kasr İbrahim count in `dv.faqs.1.a` vs `dv.faqs.2.a` (#54): check against the English — if the English says two and lists two, it is source shape; record;
  - two princes with no role, the 963 m² figure, «several languages» unnamed (#20, #22, #25): the English body.
  The six source defects of stages 1–5 carry over.
- **Frame, not text** (verdict `frame`, no edit): the brand «Visit Al-Ahsa» and the card titles in `latinNames` (#1, #35, #36, #49 — the places' own Latin names, not in this batch; «Hasawi» in a bakery's own name is not translated); «Arap Körfezi» (#33: binding site ruling, never «Basra Körfezi» — reject and record); «El-Kare», «Cebel el-Kare», «El-Kut», «Hüfuf», «Ukayr», «Kasr İbrahim» (#2, #6, #34 — termbase; A1-collisions class: accept, record); «Paylaşın» (#18 — ref.ui, the approved share button); «Google Haritalar'da açın» (#8 second part, ref.ui det.openMaps; which card has a single page is data); «meclis salonu» (#45 second part — the tr-attr-9 ruling); the FAQ dish list in `dv.faqs.0.a` byte-identical to ref.food (#52: «haris», «mandi» are defined on the food page the answer links to — the list form is ruled; but check «El-Ahsa, El-Ahsa pilavı» opening for a fix the English allows).
- **Rulings are not reopened**: termbase names; «hurma ekmeği» + «“Kırmızı ekmek”» (ref.food, termbase gloss); A6-governorate (stage 3's «El-Ahsa'daki ilk tarihî otel»); sentence case for labels (P9); siz imperatives for buttons and links (UI1-controls); the shared strings `sv.*` copied into sd/dv.

## Items to rule (reader item numbers)
1. **The licensing sentence** (#10, #23): «Otel, Suudi Turizm ve Millî Miras Kurumundan ruhsat alan El-Ahsa'daki ilk tarihî otel oldu.» — split the participial chain (lesson 1), keep the body name in official-name style, byte-identical in `sv.faqs.0.a` and `sc.alkoot-heritage.body`. Decide the apostrophe question on «Kurumundan» against the termbase's handling of institution names (e.g. «El-Ahsa Belediyesi üzerinden», «Müzeler Kurumu») and record it.
2. **`dv.bakeriesNote`** (#48): the second sentence is garbled («kil tandırı bu ekmek için yakılan fırınlar»). Rewrite it from the English («these are the bakeries whose clay ovens are fired for it») so «yakılan» attaches to the ovens; keep the C5b pair (hurma ekmeği + “kırmızı ekmek”) and the one-gloss-per-page pattern.
3. **«büyümeye devam» ×3** (#3, #31): `sv.*` «büyümeye devam eder», `dv.methodP1` «büyümeye devam edecek bir ilk listedir» and the dv lead. Rule one natural Turkish form for «will keep growing» (e.g. «genişlemeye devam edecek», «zamanla genişleyecek») and apply it to every occurrence; «ilk liste» — make it read as «the first version of the list» if that is what the English says.
4. **The method paragraph** (#16, #60): «kısa tanıtım yazıları her yeri fotoğrafında göründüğü hâliyle anlatır» — the English «brief introductions describing each place as it appears in its photo». Find the plain Turkish (e.g. «… her yeri fotoğrafında görüldüğü gibi tanıtır») in `sv.methodP1` and `dv.methodP1`, one form. The contradiction with the Al-Koot body (#16 second part) is source.
5. **«Bir mekânı ötekinin önüne koymuyoruz», «Kartlar bilgilendiricidir», «bilgilendirme amaçlıdır»** (#3, #15): the site's promise (no ranking) in plain Turkish — rule each phrase.
6. **FAQ register** (#11, #12, #13, #14, #53): «hizmet verir», «kalınabilecek» (→ «konaklayabileceğiniz»? keep siz), «Karavan sahipleri», the link labels «… göz atın →», «… keşfedin →», «… okuyun →» and the «sayfasında / sayfasından» mismatch (#53) — rule one link-label pattern for the three FAQ links (UI1-controls) and apply it.
7. **The Al-Koot body** (#19, #20, #21, #22, #24, #26): «bir saray durur», «eski El-Ahsa mimari üslubundadır», «kişisel bir girişimle» (→ «kendi girişimiyle»?), «Konukevinin açılışını … yaptı», «Odalar sekiz süitten oluşur», the closing line (#26 — the English has it; keep the content, plain register), «konukevi» vs «otel» alternation (#22: follow the English's own alternation; do not add). Hicri: keep the E1-calendar-case-r4 form already in the text unless the ruling says otherwise; record.
8. **Card sentences** (#5, #7, #37, #38, #39, #40, #41, #42, #43, #47): «oturak» (#37 — a real collision: chamber pot; replace with the plain word for the English seat), «taçlanan» (#39), «Arap harfleriyle» (#38, #40 — «Arapça yazılı/Arapça harflerle»?), «tabak tabak», «sıcak sıcak» (#42 — keep only if the English has the figure), the verbless Baking Up blurb and «Google Haritalar'da kendini tanıttığı gibi» (#43 — the English «as it introduces itself on Google Maps»? check; keep the attribution, smooth the form), «bar adası», «asma ahşap merdiven» (#47), «yarık» (#7), the Stay card noun phrase (#5 — split if the English allows), «listenin modern ve gündelik seçeneği» (#41 — the English; keep but check it does not read as a ranking).
9. **«nitelikli kahve»** (#29): the open item of stages 1–5. Rule one form for «specialty coffee» (the card «7st. Speciality Coffee» is a Latin title, not in the batch) and record the evidence; «karak çayı» (#46: an unexplained foreign word — D1-r3 says define a foreign drink word at its first mention only if the English defines it; the English does not: decide whether «karak çayı» alone is enough, record).
10. **«Kasr İbrahim» / «kale» / «saray»** (#6, #55): the dining FAQ calls it «kale» while the stay page says «saray» for Al-Koot. Check the English of each («the fort», «palace»), keep each English noun, and fix the attachment in #55 («kalenin tam karşısındaki El-Kut mahallesinde bulunan Al-Koot Heritage Hotel'in restoranı» — make it plain which is opposite the fort, per the English).
11. **`dv.faqs.5.a`** (#58): the nine-name parenthesis and the run-on tail. Split per lesson 1; keep the district forms byte-identical to `dn.*`.
12. **UI strings** (#8 first part, #61, #30): `sv.moreLabel` «Yerin ayrıntılarını inceleyin» (stiff; rule the link label for «details»), `dv.searchPh` «Restoranlarda ve kafelerde arayın» (the English names what it names — keep if so), «bir tık ya da dokunuş uzaklığında» (#30 — the English figure? smooth to the Turkish register of the page), «mekânın bağlantısına bakın».
13. **«Hüfuf» introduced, «doğusu»** (#17): «El-Ahsa'nın doğusu» as a location — fix the case if the sentence needs «doğusunda»; «Eski Hüfuf» vs «Hüfuf tarihî merkezi» — one form if the English is one.
14. **«Ziyaret saatleri» vs «Çalışma saatleri»** (`dv.hoursLabel`, `dv.srcNote.then`, `dv.faqs.6.*`): the open item of stages 1–5. The sibling rule binds one form per meaning; decide whether «Opening hours» of a café is the meaning of the attraction pages' «Ziyaret saatleri» (opening hours of a site you visit) and rule — if you choose «Çalışma saatleri», it is a new meaning-specific form for businesses; record why.
15. **«tarihî konukevi»** (heritage inn type label) and **«Er-Ravda»** (district) — the open items: rule and record.
16. Everything else: applied or rejected with the Turkish a travel-guide writer uses.

- Each termbase proposal of stages 1–5 becomes a `termbase_additions` entry with `"status": "unattested"` unless a stage gave an attested source.
- **Check against the English, sentence by sentence, at least**: sv.heroSum, sv.faqs.*.a, sv.methodP1, sd.aboutP, sc.alkoot-heritage.body, dv.heroSum, dv.bakeriesNote, dv.faqs.*.a (all variants), dv.methodP1, dv.srcNote.*, the 29 `dc.*.blurb`.

## Output (Write tool, UTF-8 JSON) — `BATCH\stages\07-judge.r1.json`
```
{ "batch": "tr-stay-dining-1", "stage": "07", "round": 1, "date": "2026-11-04",
  "scores": { "sv": n, "sd": n, "sc": n, "dv": n, "dn": n, "dc": n },
  "batch_score": <lowest>, "breakdown": { per unit: accuracy, terminology, fluency, register, orthography — one line each },
  "decision": "APPROVE" | "RETURN", "return_to_stage": null | "02" | …,
  "strings": { all 174, your final text },
  "changes": [ { "key", "before", "after", "why" } ],          // every edit vs 05-proofreader.json
  "blind_reader_rulings": [ { "item": n, "verdict": "applied" | "rejected" | "source_defect" | "frame" | "published", "key": "…", "why": "…" } ],   // all 61 reader items
  "rulings": [ { "id": "SD1-…", "title", "ruling", "evidence" } ],   // binding for later batches
  "termbase_additions": [ { "tr", "ar", "en", "suffix_vowel", "kind", "gloss", "source", "status", "note" } ],
  "tm_pairs": [ { "en", "tr", "page": "stay-dining", "field" } ],   // every approved string (field = the key)
  "source_defects": [ … ], "owner_questions": [ … ], "notes": [ … ],
  "scores_row": "tr-stay-dining-1,2026-11-04,1,<batch_score>,<decision>" }
```
Write the file with the Write tool, or with a node script that reads 05-proofreader.json (Turkish text never through a shell heredoc or `node -e`; scratch scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`). Every repeated English must stay byte-identical across sv/sd/dv/sc/dc and the district forms across `dn.*`/`dc.*.area`/`dv.faqs.5.a` after your edits — check it with a node script. Then run the checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-stay-dining-1 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-stay-dining-1/stages/07-judge.r1.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-stay-dining-1/stages/05-proofreader.json` until `RESULT [OK]`. Do not edit any file of the repository.

## Report back
Plain text, ASCII console output: the checker's RESULT line verbatim; the six scores and the decision; the number of keys changed; the rulings in one line each; what you could not verify.
