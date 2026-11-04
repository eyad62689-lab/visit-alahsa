# Judge brief — batch `tr-visa-1`, round 2

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-visa-1` · REPO read only.

Your round-1 text (`stages\07-judge.r1.json`) was applied and built; two independent checks ran on it:
1. `stages\05d-proof-of-judge.md` — the independent proof of your 47 edits: **2 faults** (faq.items.5.q «ziyaretime» makes the asker the traveller — the English: a relative visits me in Al-Ahsa; faq.items.3.a comma after the plain subject «Umre», DN16-r2). Both must be fixed.
2. `stages\06-blind-reader.on-r1.md` — a fresh blind reader on the built page (51 items, cite P2.<n>); input `stages\06-blind-reader-input.on-r1.filtered.txt` (cut from dist with the fixed cutter: no link-edge spaces).

## Reader counts so far (two readers: P1 on 05, P2 on r1)
- Already ruled `source_defect` in round 1 and raised again by P2 (keep the verdict; do not add explanations the English lacks): eligible countries / is Türkiye listed (P2.11, P2.51), GCC residents in two rows (P2.10, P2.13, P2.46 last part), compressed / mixed units (P2.14, P2.15 second part, P2.24 second part, P2.39 numerals vs words — the English mixes them too), non-platform cells and the causeway row (P2.16, P2.50 first part), Nusuk / Saudia / flynas unexplained (P2.15, P2.17), Umrah route beside the tourist visa (P2.23 second part, P2.48 last part), «determined during application» (P2.18), «pilot phase» (P2.38), ETA stay length and UK overlap (P2.20, P2.21), the «Who is this visa for?» label and its absence in three sections (P2.22 — follow the English: check which sections the English labels), the SEO heading (P2.25), «in minutes» / «Start planning now» / «one step» (P2.2, P2.3 — the English), personal visit vs «must be related» (P2.47 second part), «at least 3 months» (P2.26), three ministry platforms (P2.35), English-language official pages (P2.50 second part), no row for my nationality (P2.51), FAQ 2's second sentence about expiry before entry (P2.45 first part — the English says exactly that; already ruled).
- Frame / published (`frame`): «Cebel el-Kare» (P1.3, P2.7a — termbase), «Kayıtlı yerlerim» and «hazır rota» (P1.30, P2.44 — published ui.ts tr `nav.myTrip`, `plan.empty.d`; **two readers now on «hazır rotanızı alın»**: the noun phrase is published; you may recast the verb around it — e.g. «… ve size hazırlanan rotayı görün» — only if it keeps the published name and the English fact).
- New with one reader each: decide on the Turkish merits.

## Items to rule (real Turkish faults the English allows you to fix)
1. The two proof faults above.
2. P2.40 «uçabilir ya da … devam edebilirsiniz» — the person ending is missing on the first verb (a real fault).
3. P2.1 H1 genitive chain «El-Ahsa gezinizin kısa rehberi» reads as a guide to the trip (the English «A Short Guide for Your Al-Ahsa Trip»; reader proposes «El-Ahsa gezisi için kısa rehber»).
4. P2.29 «aktarma molası» (not a Turkish phrase), «rezerve eden yolcular» and the long chain; P2.30 «istenir» (requested vs demanded — check the English «is requested during flight booking»?: compare and say it so the traveller knows they ask for it).
5. P2.32 the family-visit sentence (split; who the visitors are, as the English says), P2.33 «ne aile ne de iş ilişkisi» (parallel nouns), P2.36 the business relative clause, P2.37 the agent of «tamamlanır» (follow the English: if the English is passive, keep the fact; you may say «başvuru sahibi» only if the English or Arabic says who).
6. P2.41 the bridge named three times and «köprünün giriş koşulları» (the English: «entry conditions for the causeway» — say crossing by the causeway), P2.42 «gelişin» misread and «Riyad ile Dammam'dan mesafeleri».
7. P2.4 three stacked nominalisations, P2.7b «Vahada … vahanın», P2.7c the UNESCO sentence implying the four places are on the list (compare the English), P2.9 «Özellikle … burası» (the English «If you are looking for a tourist visa for Al-Ahsa specifically, Al-Ahsa is a Saudi city» — keep the fact, fix «burası»), P2.24 «Çoklu girişlidir», P2.28 the genitive–possessive–postposition chain, P2.43 mixed voice in the next-steps list (compare the English labels), P2.45 the stranded «siz», P2.46 the heavy FAQ question, P2.48 «bunun dışındadır», P2.5 «resmî platform / kaynak / sayfa» (the English: «official platform», «official source», «official page» — keep the English's three where they are three things).
8. Everything else: applied or rejected. One line per P2 item in `blind_reader_rulings` — all 51.

Your rulings VG1–VG9 stand unless a ruling here changes one (then `superseded_by`). Hard limits, links, `updatedLine`, no fee/currency/doubt word: as round 1. Check all 138 strings against the English after your edits.

## Output — `BATCH\stages\07-judge.r2.json`
The round-1 shape with `"round": 2`; `changes` = every edit vs `07-judge.r1.json` (full text); `blind_reader_rulings` for P2.1–P2.51; `rulings` = only new or revised rulings (VG10…, or `VGn-r2` with the reason); `termbase_additions` complete (the final forms); `tm_pairs` for all 138. Checker with `--prev` pointing at `07-judge.r1.json` until RESULT [OK]. Report back as in round 1.
