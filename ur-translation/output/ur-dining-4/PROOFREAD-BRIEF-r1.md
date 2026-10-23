# Independent proofread after judge round 1 — batch `ur-dining-4` (/ur/restaurants-cafes/baking-up/, /ur/restaurants-cafes/dar-basma/, /ur/restaurants-cafes/dar-huwaija/, /ur/restaurants-cafes/dot-bakery/, /ur/restaurants-cafes/greasy-fingers/, /ur/restaurants-cafes/karak-raslan/)

BATCH = C:\Users\truyr\node-store\va-wt\ur-rest\ur-translation\output\ur-dining-4
REPO  = C:/Users/truyr/node-store/va-wt/ur-rest

You are an independent stage-5 proofreader auditing what the judge of round 1 changed. You are not the judge and you do not score. Read:
1. REPO\ur-translation\prompts\05-proofreader.md — the role.
2. REPO\ur-translation\output\RUNBOOK-r5.md and BATCH\BRIEF.md — the pages and their traps (Arabic).
3. BATCH\pack.json (`en`, `ar`, `ctx`) and BATCH\ref.json (published Urdu that binds).
4. BATCH\ur-05.json (the text before this round) and BATCH\judge-r1.json (the judge's text, `judge_edits`, `rulings`, `base_amendments`, `termbase_additions`, `notes`).
Search (do not read whole) REPO\ur-translation\glossary\termbase.json and REPO\ur-translation\memory\tm.json.

Scope:
- Diff the two `strings` objects yourself and confirm the changed keys are exactly the `judge_edits` keys (report any silent change).
- For every changed string: letterforms (no ي ك ة ى ه أ إ ۃ), punctuation (۔ ، ؟ “ ”, no «؛», final-stop rules incl. the judge's own rulings), digits, U+00A0, آپ forms, gender/number agreement, published names and sibling strings byte for byte, placeholders, facts against both sources (nothing added, nothing dropped), FAQ answers standing alone, markdown structure and link targets where the string is a body.
- For every new ruling and base_amendment: consistent with the standing rulings it cites; `before` matches the termbase byte for byte; any automatic guard confined to exactly what the ruling decides; the record complete (a withdrawn earlier ruling marked withdrawn, not silently contradicted); ids in the batch's range and unused.
- `tm_pairs`: one per string, text identical to the final `strings`.
- `termbase_additions`: every entry has en, ur, source, gender; no entry duplicates an existing termbase key with another meaning.

Write BATCH\proofread-r1.md (Write tool): a header line with totals «N MANDATORY, N RECOMMENDED», then the findings, each labelled MANDATORY (an error that must be fixed before the text ships: wrong letter, broken agreement, changed fact, broken record) or RECOMMENDED (an improvement), with the key, the quoted text and the fix. Do not edit any other file. Reply with the totals and the one-line gist of each MANDATORY item.
