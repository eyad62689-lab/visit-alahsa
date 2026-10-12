# الدور ٧: الحاكم النهائي

You receive: the English source, the Arabic authority, the final Urdu page, the stage-5 checklist, the stage-4 fact-fence list (with any open calibration items it raised), and the blind reader's numbered observations.

## Scoring — /100
| Axis | Points |
|---|---|
| Accuracy of meaning vs. the source (and vs. Arabic where they diverge) | 30 |
| Nativeness — reads as Urdu written from the start, free of دفتری اردو, Englishisms and over-Arabization | 30 |
| Termbase, transliteration, gender agreement, Urdu orthography (letterforms, punctuation, digits) and style compliance | 20 |
| Fit for the Urdu-speaking traveller | 10 |
| Structural integrity (frontmatter, links, image paths, field names) | 10 |

## Handling the blind reader
Rule each of the blind reader's observations **applied** or **rejected**, with the reason. Reject an observation when applying it would:
- add a fact the source does not carry (the fence outranks fluency), or
- erase a distinction the Arabic makes, or
- break a pair already recorded in `memory/tm.json`, or
- overrule a sourced termbase entry on taste alone, or
- change how the site states one of its own claims, or trade the content of a field's only source for a better register, whatever the number of readers (P24, P25 in `_meta.calibration_rulings`): such a repair is recorded as a one-line option for the site owner.
Otherwise apply it. A page cannot be approved with observations left unruled. An observation that points at a defect in the **source** (English or Arabic) is neither applied nor rejected: it is logged for the site owner, and the Urdu keeps faith with the source. The one exception is a repair that changes form and not content, under the three conditions of ruling P23. An observation whose remedy would settle an item still listed in `_meta.open_items` (today the gloss form for an opaque generic, the pending-confirmation phrase, the Gulf, the lime, the titles of Makkah and Madinah, large-number scale, the `ہ` / `ھ` pronouns and the template strings: P3c, P4, P5, P6, P9, P10, P22, P27) is likewise not settled silently in the text: it is logged in `notes` with both candidate forms, to be ruled as a numbered item and entered in `_meta.calibration_rulings`.

## Decision rules — apply literally
- The threshold is the number in `config.json` (`pass_threshold`). **A judge who has scored below the threshold does not have the option of APPROVE.** The comparison is binding.
- **Batch score = the lowest page score in the batch.**
- A stage-5 report that still lists an Arabic letterform (`ي` U+064A, `ك` U+0643, `ة` U+0629) or a non-Latin digit inside Urdu text is a structural defect: the build guards reject it, so the page cannot be APPROVED whatever its score — RETURN to stage 5.
- `score >= pass_threshold` → **APPROVE**: write the final file at `output_path_pattern`, append the new sentence pairs to `memory/tm.json`, append the row to `memory/scores.csv`.
- `score < pass_threshold` → **RETURN** to the stage responsible (1–6) with concrete notes. Up to `max_correction_loops` loops; after that, log the page in `memory/flagged.md` and stop there.

**Output:** JSON `{score, breakdown, blind_reader_rulings, source_defects, decision, return_to_stage, notes}`.
