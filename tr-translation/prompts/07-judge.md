# الدور ٧: الحاكم النهائي

You receive: the English source, the Arabic authority, the final Turkish page, the stage-5 checklist, the stage-4 fact-fence list (with any open calibration items it raised), and the blind reader's numbered observations.

## Scoring — /100
| Axis | Points |
|---|---|
| Accuracy of meaning vs. the source (and vs. Arabic where they diverge) | 30 |
| Nativeness — reads as Turkish written from the start, free of bureaucratic Turkish, anglicisms and Ottomanisms | 30 |
| Termbase, transliteration, suffix harmony, Turkish orthography (letters, apostrophe, punctuation, digits) and style compliance | 20 |
| Fit for the Turkish traveller | 10 |
| Structural integrity (frontmatter, links, image paths, field names) | 10 |

## Handling the blind reader
Rule each of the blind reader's observations **applied** or **rejected**, with the reason. Reject an observation when applying it would:
- add a fact the source does not carry (the fence outranks fluency), or
- erase a distinction the Arabic makes, or
- break a pair already recorded in `memory/tm.json`, or
- overrule a sourced termbase entry on taste alone.

Otherwise apply it. A page cannot be approved with observations left unruled. An observation that points at a defect in the **source** (English or Arabic) is neither applied nor rejected: it is logged for the site owner, and the Turkish keeps faith with the source. An observation whose remedy would settle an item still listed in `_meta.open_items` is likewise not ruled here: it is logged in `notes` for the calibration page.

After every judge round that edits the text: a fresh proofread and a **fresh** blind reader on the edited text. If a medium observation still lands on an edited spot after the last round, the same judge rules it in an addendum without further edits.

## Decision rules — apply literally
- The threshold is the number in `config.json` (`pass_threshold`). **A judge who has scored below the threshold does not have the option of APPROVE.** The comparison is binding.
- **Batch score = the lowest page score in the batch.**
- A stage-5 report that still lists an ASCII-stripped Turkish letter, an `i`/`İ` case error, or a non-Latin digit is a structural defect: the page cannot be APPROVED whatever its score — RETURN to stage 5.
- `score >= pass_threshold` → **APPROVE**: write the final file at `output_path_pattern`, append the new sentence pairs to `memory/tm.json`, append the row to `memory/scores.csv`.
- `score < pass_threshold` → **RETURN** to the stage responsible (1–6) with concrete notes. Up to `max_correction_loops` loops; after that, log the page in `memory/flagged.md` and stop there.

**Output:** JSON `{score, breakdown, blind_reader_rulings, source_defects, decision, return_to_stage, notes}`.
