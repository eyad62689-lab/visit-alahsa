# Amendment: fee row of jabal-al-qarah (2026-10-13)

Ruling N33 (termbase `_meta.calibration_rulings`) asked for one code point to change in the approved
row `practical[1].value`: U+061B to U+06D4. Changed in three places, each by exactly one code point:
`src/content/attractions/jabal-al-qarah.md`, the pair in `memory/tm.json`, `output/attractions/jabal-al-qarah.md`.
The stage files of the calibration are the record of what was approved then and are not rewritten.

- `05p-proof.md`: independent proof pass on the amended row. RESULT: must-fix=0 should-fix=0 note=5.
- `blind-input.md`: the reader's text, cut from the built page (`dist/ur/attractions/jabal-al-qarah/`).
- `06-blind-reader.md`: a fresh blind read. No high item. One medium item on this row: a stop inside
  the value and none at its end reads as cut off. That form is ruling P26 (a card value holding two
  statements) and is not reopened here; the note is on record for the owner. The reader's other items
  concern text this amendment did not touch.
- Build check C65 no longer carries a by-name exemption. Break test on an in-memory copy of `dist`:
  the mark injected into each of the 11 attraction pages fails the check (11/11), and the old row
  restored on the calibration page fails it.
