# Judge brief — batch `ur-plan-1` (/ur/plan-your-trip/), round {ROUND}

BATCH = C:\Users\truyr\node-store\va-wt\ur-plan\ur-translation\output\ur-plan-1
REPO  = C:\Users\truyr\node-store\va-wt\ur-plan

You are stage 7, the final judge. Read, in this order:
1. REPO\ur-translation\prompts\07-judge.md — your role and the decision rules (pass threshold 90 from REPO\ur-translation\config.json; batch score = lowest string score).
2. BATCH\BRIEF.md — the page and its traps (Arabic).
3. BATCH\pack.json (63 strings: `en` source, `ar` arbiter, `ctx`) and BATCH\ref.json (published Urdu that binds).
4. Your input text: {INPUT} — with every note of the stages before you. Stage 4's rulings N640–N646 ("[s4] N64x (title): …") bind as the termbase rulings do.
5. The blind reader's notes on the page as built from that text: {READER}. The reader saw only the page (blind-input {BLIND}), never the sources.
{EXTRA}
Search (do not read whole) REPO\ur-translation\glossary\termbase.json (terms, _meta.calibration_rulings, _meta.open_items) and REPO\ur-translation\memory\tm.json. Approved sibling texts of this page: the zh/de/ru blocks in REPO\src\components\views\PlanTripView.astro.

## Standing facts for the blind reader rulings
- **Out of scope (not this batch's text):** the header and footer, and the rows of the "اوقات / فیس" table except its first header cell «table.nameHead». The table cells are approved Urdu from the attraction cards. A reader note on a cell is `out_of_scope`; if it shows a contradiction in the published data (e.g. one row referring to another row's hours that differ), log it under `source_defects` for the site owner — do not edit.
- **Tool artefacts:** in the round-0 reading the buttons were not marked, so the visa button «ویزے کی معلومات» (an existing approved UI string, `ui.plan.visa`, not in this batch) read as a heading with nothing under it. That is an artefact of the reading tool, now fixed (buttons are marked "[button → opens another page]"); rule it `out_of_scope` with that reason.
- The "Save this place"/"My saved places" page (ctaTrip) is the English /en/plan/ — not yet built in Urdu.
- Every source defect is recorded, not deducted from the translation score (the line's standing practice). Invent nothing to cover one.
- Do not ask the owner for approvals; settle by rulings and precedents. Only facts the sources do not settle become owner questions.

## Your output — BATCH\judge-r{ROUND}.json (Write tool)
Same schema as REPO\ur-translation\output\ur-home-1\judge-r1.json (read its keys and the shape of a few entries, not the whole file):
`batch, stage: 7, round: {ROUND}, scores {per_string:{key:score}}, batch_score, breakdown {method, axes with score/of/note}, decision (APPROVE|RETURN), return_to_stage, strings (all 63, pack order — the final text after your edits), termbase_additions (cumulative from the input, amended where you rule), notes (cumulative, yours prefixed "[j{ROUND}]"), rulings [{id, title, binds, ruling, evidence?}] — new ids from {NEXT_ID} upward, never reusing an id in the termbase or in N640–N646, base_amendments [{id, field, before, after, why}] (before must match the termbase text byte for byte), owner_questions [{id, question, options, from}], blind_reader_rulings [{n, quote, severity, verdict: accepted|rejected|source_defect|out_of_scope, reason, edit?}] — one per reader item, none left unruled, blind_reader_counts, judge_edits [{key, before, after, why}], tm_pairs [{en, ur, page: "plan-your-trip", field}] — one per string of the final text, source_defects [{id, keys, defect}], scores_row`.
`scores_row` is one CSV line in the exact shape: `"plan-your-trip (ur): /ur/plan-your-trip/ — 63 strings (ur-plan-1)",2026-10-21,{ROUND},<batch_score>,"<decision and one-paragraph summary>"`.

A guard you add in a ruling binds every later batch: confine any automatic guard to exactly what your ruling decides.

After writing, run `node BATCH/verify.mjs BATCH judge-r{ROUND}.json` until it prints ✓, and read the file back to confirm it parses. Do not edit any other repository file; write with Write, never `node -e` in Bash.

Reply with one short paragraph: batch score, decision, number of judge edits (keys), new ruling ids, owner questions, source defects.
