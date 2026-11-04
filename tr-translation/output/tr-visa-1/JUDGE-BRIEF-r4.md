# Judge brief — batch `tr-visa-1`, narrow fix (round 4)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-visa-1` · REPO read only.

Your round-3 text was applied and built. Two checks ran on it:
1. `stages\05d-proof-of-judge-r3.md`: **5 faults** in your round-3 edits — fix all five:
   - `routes.family.cta.label` and `routes.business.cta.label` («Davet eden kişinin/kuruluşun resmî başvuru platformu») read as the inviter's own platform and lose the English fact that the inviter starts the application. VG7-r3 stands (a label the visitor can act on, the fact inside it); find the form that keeps both — e.g. «Davet eden kişi için resmî başvuru platformu» or a colon form; same shape for both. Record `VG7-r4` if the shape changes.
   - `routes.business.who.text`: «Suudi Arabistan'da» attaches to the relationship, not the company (the fourth reader P4.29 hit the same) — the English: invited by a company or organisation in the Kingdom with which they have a business relationship.
   - `intro.parts`: «arıyorsanız, aradığınız … vizesidir» is circular and drops «need» (P4.9 hit the same) — the English «a Saudi visit visa is what you need».
   - `routes.family.who.text`: «first-degree relatives» dropped in round 3 (P3.29) — the English and Arabic carry it; restore the qualifier in a form that does not mislead (the reader stumbled on «birinci derece» with «eş»; «birinci derece yakınları (anne-babası, eşi ve çocukları)» is the proof's suggestion).
2. `stages\06-blind-reader.on-r3.md`: the **fourth** blind reader (45 items, P4.<n>). It opens no new point beyond the proof's; by precedent (tr-events-1, tr-stores-1) a fourth reader with no new fault does not open another round. Rule on these only, on the merits: P4.4 «başvuru adresi» read as a street address (one word with the page's «resmî platform»?), P4.27 «ne akrabalığı ne de iş ilişkisi olanlar» — the reader expected «olmayanlar» (TDK: «ne … ne» takes the affirmative verb; keep it correct and, if a reader misreads it, recast so it cannot misread — e.g. «akrabalık ya da iş ilişkisi olmayanlar»), P4.36 two objects of different shape joined by a comma. All other P4 items: one line each in `blind_reader_rulings` (most repeat source defects or frame already ruled — cite the ruling).

Change nothing else. Hard limits, links, `updatedLine`, no fee/currency/doubt word: as before. Sweep all 138 strings for every standing ruling.

## Output — `BATCH\stages\07-judge.r4.json`
The round-3 shape with `"round": 4`; `changes` = every edit vs `07-judge.r3.json` (full text); `blind_reader_rulings` for P4.1–P4.45; `rulings` = new or revised only; `termbase_additions` complete; `tm_pairs` for all 138. Append a «Round 4» section to `stages\07-judge.r3-addendum.md` (what was fixed, one line each). Checker with `--prev` pointing at `07-judge.r3.json` until RESULT [OK]. Report back as before.
