# Judge brief — batch {BATCH} ({PAGES}), round {ROUND}

OUT   = C:\Users\truyr\node-store\va-wt\ur-stay\ur-translation\output
BATCH = OUT\{BATCH}
REPO  = C:\Users\truyr\node-store\va-wt\ur-stay

You are stage 7, the final judge. Read, in this order:
1. REPO\ur-translation\prompts\07-judge.md — your role and decision rules (pass threshold 90 from REPO\ur-translation\config.json; batch score = lowest string score).
2. BATCH\BRIEF.md — the pages and their traps (Arabic).
3. BATCH\pack.json ({N} strings: `en` source, `ar` arbiter, `ctx`) and BATCH\ref.json (published Urdu that binds).
4. Your input text: {INPUT} — with every note of the stages before you. Numbered stage-4 rulings in the notes ("[s4] N6xx (title): …") of this batch and of its sibling batches bind as the termbase rulings do: OUT\ur-stay-1\ur-04.json (N660–N666, incl. N660 on venue names, binding all three batches), OUT\ur-dining-1\ur-04.json (N680–N689) where it exists, OUT\ur-dining-2\ur-04.json (N700–N709) where it exists. Earlier judges' approved text of sibling batches (OUT\<batch>\judge-r*.json, highest round) binds where this batch must agree with it (shared strings, district names, venue names).
5. The blind reader's notes on the page(s) as built from that text: {READER}. The reader saw only the pages (BATCH\{BLIND}), never the sources.
{EXTRA}
Search (do not read whole) REPO\ur-translation\glossary\termbase.json (terms, _meta.calibration_rulings, _meta.open_items; a ruling with status "withdrawn" does not bind) and REPO\ur-translation\memory\tm.json. Approved sibling texts: the zh/de/ru blocks in the page's view (REPO\src\components\views\StayView.astro / StayDetailView.astro / DiningView.astro) and the *_de/*_ru card fields in REPO\src\content\stay|dining\*.md; German judges for the same pages in REPO\de-translation\output\de-stay and de-dining\b1–b5.

## Standing facts for the blind reader rulings
- **Out of scope (not this batch's text):** the header and footer; the Latin card titles (the names the places use for themselves); the «گوگل میپس پر دیکھیں ↗» button; «اشتراک کریں»; text from a sibling batch that the reader saw on the same page (rule it `out_of_scope` and name the batch). A real defect found there goes into `notes` for that batch's judge.
- **Live-only texts** (rating label, closure badges, open/closed badges, hours, the last-update line, the live variant of the seventh restaurant FAQ) appear on the site only when it has fetched Google Maps data; the reader saw them in a marked section, without their context — weigh that.
- Every source defect is recorded, not deducted from the translation score. Invent nothing to cover one.
- Do not ask the owner for approvals; settle by rulings and precedents. Only facts the sources do not settle become owner questions.

## Your output — BATCH\judge-r{ROUND}.json (Write tool)
Same schema as C:\Users\truyr\node-store\va-wt\ur-plan\ur-translation\output\ur-plan-1\judge-r1.json (read its keys and a few entries, not the whole file):
`batch, stage: 7, round: {ROUND}, scores {per_string:{key:score}}, batch_score, breakdown {method, axes with score/of/note}, decision (APPROVE|RETURN), return_to_stage, strings (all {N}, pack order — the final text after your edits), termbase_additions (cumulative, amended where you rule), notes (cumulative, yours prefixed "[j{ROUND}]"), rulings [{id, title, binds, ruling, evidence?}] — new ids from {NEXT_ID} up to {LAST_ID} only, base_amendments [{id, field, before, after, why}] (before must match the termbase byte for byte; a stage-4 ruling of this PR is not in the termbase yet — to withdraw one use the top-level field withdrawn: [{id, by, why}]), owner_questions [{id, question, options, from}], blind_reader_rulings [{n, quote, severity, verdict: accepted|rejected|source_defect|out_of_scope, reason, edit?}] — one per reader item, none unruled, blind_reader_counts, judge_edits [{key, before, after, why}], tm_pairs [{en, ur, page: "{PAGE}", field}] — one per string of the final text, source_defects [{id, keys, defect}], scores_row`.
Earlier rounds keep their record: carry every field of {INPUT} forward cumulatively; put the previous round's judge_edits / blind_reader_rulings / blind_reader_counts under `_r<round>` suffixed keys.
`scores_row` is one CSV line in this exact shape: `"{ROWLABEL}",2026-10-21,{ROUND},<batch_score>,"<decision and a one-paragraph summary>"`.

A guard you add in a ruling binds every later batch: confine any automatic guard to exactly what your ruling decides.

After writing, run `node BATCH/verify.mjs BATCH judge-r{ROUND}.json` until it prints ✓, and read the file back to confirm it parses. Do not edit any other repository file; write with Write (a script file you write with Write and run with node is fine), never `node -e` in Bash.

Reply with one short paragraph: batch score, decision, number of judge edits (keys), new ruling ids, owner questions, source defects.
