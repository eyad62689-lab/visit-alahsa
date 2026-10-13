# Amendment: dress phrase of the mosque visiting row (2026-10-13)

Owner decision of 2026-10-13 on the open item `VISITING-ROW-dress-phrase`: the dress phrase of the fixed
row is «مناسب لباس», and «اس مقام» stays. The row is now, for every mosque page:

«زائرین کے لیے کھلی ہے۔ مناسب لباس پہن کر آئیں اور اس مقام کے تقدس کا خیال رکھیں»

Changed together, by one phrase each: the row in `src/content/attractions/jawatha-mosque.md` and
`jabri-mosque.md`, the two pairs in `memory/tm.json`, the two files in `output/attractions/`, and
`VISIT_VALUE.ur` in `tools/check-mosque-card.mjs` (build check C29). Ruling `VISITING-ROW` in the termbase
records the decision; the open item is removed (five remain: P4, P22, BRAND, N7, N30). The stage files
of round 1 are the record of what was approved then and are not rewritten.

- `05p-proof.md`: independent proof pass on the amended row. RESULT: must-fix=0 should-fix=2 note=7.
  Both should-fix items were statements in the documentation around the row (a stale list of open items
  in the skill file; a sentence in PLAN.md about where the closed item's record is kept) and were
  corrected after the pass. On record from its notes: «مناسب» says less than the source's 'modest'
  (the owner's choice); the three earlier readers wrote the adjective, none the sentence as it stands.
- `blind-input.md`: the reader's text, cut from the built page (`dist/ur/attractions/jawatha-mosque/`).
- `06-blind-reader.md`: a fresh blind read. One moderate item on this row (item 5): the bare label,
  status and advice in one value, «مناسب لباس» left to the reader, and no stop at the end (ruling P26).
  It is on record for the owner and does not reopen the row. The three serious items concern text this
  amendment did not touch (the adjacent park's hours and fee in the card, the park absent from the body,
  the state of the building): defects of the source already logged for the owner.
- Build check C29: the earlier dress phrase is added to the retired forms. Break test on in-memory
  copies: the old row restored in each built Urdu page fails the check (2/2), one code point changed
  fails it (2/2), the old row restored in each source file fails it (2/2), and the retired phrase
  injected into another page's card fails it (1/1).
