# Judge brief — batch `ur-blog-1` (/ur/blog/, /ur/blog/one-day-in-al-ahsa/, /ur/blog/48-hours-in-al-ahsa/, /ur/blog/is-al-ahsa-worth-visiting/), round 2

BATCH = C:\Users\truyr\node-store\va-wt\ur-rest\ur-translation\output\ur-blog-1
REPO  = C:/Users/truyr/node-store/va-wt/ur-rest

You are stage 7, the final judge. Read, in this order:
1. REPO\ur-translation\prompts\07-judge.md — your role and the decision rules (pass threshold 90 from REPO\ur-translation\config.json; batch score = lowest page score; a judge who scored below 90 cannot APPROVE).
2. REPO\ur-translation\output\RUNBOOK-r5.md and BATCH\BRIEF.md — the pages and their traps (Arabic).
3. BATCH\pack.json (43 strings: `en` source, `ar` arbiter, `ctx`, `precedent`) and BATCH\ref.json (published Urdu that binds).
4. Your input text: BATCH\judge-r1.json — with every note of the stages before you. Stage 4's rulings N790–N794 ("[s4] Nxxx (title): …" in the notes of ur-04.json) bind as the termbase rulings do.
5. The blind reader's notes on the pages as built from that text: BATCH\blind-reader.r1.md. The reader saw only the page text (BATCH\blind-input.r1.txt), never the sources, and was not told it is a translation.
6. The previous round: BATCH\judge-r1.json (your predecessor's text, rulings, edits and blind-reader rulings) and the independent proofread of it, BATCH\proofread-r1.md: every MANDATORY item there must be settled in this round (fixed, or refused with a reason in notes).
Search (do not read whole) REPO\ur-translation\glossary\termbase.json (terms, _meta.calibration_rulings — 438 rulings, highest id N755 — and _meta.open_items) and REPO\ur-translation\memory\tm.json.

## Standing rules for the blind-reader rulings
- Out of scope: the header, footer, language switcher, and any text the page renders from published approved Urdu that is not a string of this batch (ref.json names it). A reader note on such text is `out_of_scope`; if it shows a real contradiction in published data, log it under `source_defects` for the site owner — do not edit.
- Tool artefacts: the reading cut marks buttons "[button]", hidden blocks, collapsed answers and action-only strings; a note that treats a marker as page text is `out_of_scope` with that reason.
- Every source defect (English or Arabic) is recorded, not deducted from the translation score; invent nothing to cover one.
- Do not ask the owner for approvals; settle by rulings and precedents. Only facts the sources do not settle become owner questions.
- A guard you add in a ruling binds every later batch: confine any automatic guard to exactly what your ruling decides.
- Write facts only from what you read; never claim a web count from a non-200 answer.

## Your output — BATCH\judge-r2.json (Write tool)
Same schema as REPO\ur-translation\output\ur-plan-1\judge-r1.json (read its keys and the shape of a few entries, not the whole file):
`batch: "ur-blog-1", stage: 7, round: 2, scores {per_string:{key:score}}, batch_score (the lowest PAGE score when the batch has several pages: give per_page too), breakdown {method, axes with score/of/note}, decision (APPROVE|RETURN), return_to_stage, strings (all 43, pack order — the final text after your edits), termbase_additions (cumulative from the input, amended where you rule), notes (cumulative, yours prefixed "[j2]"), rulings [{id, title, binds, ruling, evidence?}] — new ids from N798 upward, never reusing an id in the termbase or in N790–N794, base_amendments [{id, field, before, after, why}] (before must match the termbase text byte for byte), withdrawn [{id, by, why}] (only for a stage-4 ruling of this batch you overrule), owner_questions [{id, question, options, from}], blind_reader_rulings [{n, quote, severity, verdict: accepted|rejected|source_defect|out_of_scope, reason, edit?}] — one per reader item, none left unruled, blind_reader_counts, judge_edits [{key, before, after, why}], tm_pairs [{en, ur, page: "blog", field}] — one per string of the final text (field = the pack key), source_defects [{id, keys, defect}], scores_row`.
`scores_row` is one CSV line in the exact shape: `"ur-blog-1 (ur): /ur/blog/, /ur/blog/one-day-in-al-ahsa/, /ur/blog/48-hours-in-al-ahsa/, /ur/blog/is-al-ahsa-worth-visiting/ — 43 strings",2026-10-23,2,<batch_score>,"<decision and one-paragraph summary>"`.

After writing, run in Bash `node C:\Users\truyr\node-store\va-scratch\ur-r5\tools\verify.mjs ur-blog-1 judge-r2.json` until it prints OK, and read the file back to confirm it parses. Do not edit any other repository file; write with Write, never `node -e` in Bash.

Reply with one short paragraph: batch score (and per page), decision, number of judge edits (keys), new ruling ids, owner questions, source defects, and whether any reader item was accepted that changed text.
