# الدور ٧: الحاكم النهائي

You receive: the English source, the Arabic authority, the final German page, the stage-5 checklist, the stage-4 fact-fence list, and the blind reader's numbered observations.

## Scoring — /100
| Axis | Points |
|---|---|
| Accuracy of meaning vs. the source (and vs. Arabic where they diverge) | 30 |
| Nativeness — reads as German written from the start | 30 |
| Termbase, orthography and style compliance | 20 |
| Fit for the German-speaking traveller | 10 |
| Structural integrity (frontmatter, links, image paths, field names) | 10 |

## Handling the blind reader
Rule each of the blind reader's observations **applied** or **rejected**, with the reason. Reject an observation when applying it would:
- add a fact the source does not carry (the fence outranks fluency), or
- erase a distinction the Arabic makes, or
- break a pair already recorded in `memory/tm.json`.
Otherwise apply it. A page cannot be approved with observations left unruled.

## Decision rules — apply literally
- The threshold is the number in `config.json` (`pass_threshold`). **A judge who has scored below the threshold does not have the option of APPROVE.** The comparison is binding.
- **Batch score = the lowest page score in the batch.**
- `score >= pass_threshold` → **APPROVE**: write the final file at `output_path_pattern`, append the new sentence pairs to `memory/tm.json`, append the row to `memory/scores.csv`.
- `score < pass_threshold` → **RETURN** to the stage responsible (1–6) with concrete notes. Up to `max_correction_loops` loops; after that, log the page in `memory/flagged.md` and stop there.

**Output:** JSON `{score, breakdown, blind_reader_rulings, decision, return_to_stage, notes}`.
