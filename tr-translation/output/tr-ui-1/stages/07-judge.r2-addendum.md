# Round 2 addendum — the two round-2 edits after a fresh read and an independent proofread

Text: `07-judge.r2.json` (91/100, APPROVE). The two edits (`search.escHint`, `trails.partOf`) were proofread
independently (`05d-proof-of-judge-r2.md`: both OK, no mandatory fix) and read by a fresh Turkish reader who saw
only the two spots in context (`06-blind-reader.on-r2.md`: 6 observations). No further edit is made — a third
edit round would need a fourth reader; the rulings below close the batch.

| # | reader item | verdict | reason |
|---|---|---|---|
| 1 | «Esc Esc ile kapatın» — the key name appears twice | out_of_scope (brief artefact) | The stored string starts with «ile kapatın»; the rendered page shows the `<kbd>Esc</kbd>` cap once, then the string. The doubling came from the coordinator's paraphrase in the reader's brief, not from the page (`06-blind-input.on-r1.txt` line 4 shows the real rendering). |
| 2 | «ok tuşlarıyla» dry; «yön tuşlarıyla» more natural | rejected | Two readers' preference against the judge's and the proofreader's «ok tuşları» (standard name of the arrow keys in Turkish keyboard vocabulary); «ok» read briefly as "arrow/weapon" is the same word in both phrasings' referent. Recorded as an optional alternative for a later batch if a third reader stumbles. |
| 3 | Route card title in English | out_of_scope | English fallback of the trails data until the trails batch (noted in r1 as source of the page's remaining English). |
| 4 | «Cebel el-Kare» vs «Al-Qarah» spellings | out_of_scope / source_defect carried | Same cause as 3; resolves itself when the trails are translated (name from the termbase). |
| 5 | «Bu yeri içeren rotalar» a bit bookish; «Bu yerden geçen rotalar» | rejected | Faithfulness: the source says "part of these trails" (membership), not "passing through"; a trail may end at the place. «içeren» keeps the relation; the proofreader found it consistent with `fav.add` and UI1-yer-heading. |
| 6 | «Tüm gezilecek yerler →» after a routes section reads like it should be "all routes" | source_defect | Layout order of `det.allSights` after the trails block is the site's in every language (same in en/zh/de/ru/ur). Logged for the owner's navigation queue; not a translation matter. |

Decision unchanged: **APPROVE 91/100**. `07-judge.r2.json` is the final text.
