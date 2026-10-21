# Independent proofread after judge round {ROUND} — batch {BATCH} ({PAGES})

OUT   = C:\Users\truyr\node-store\va-wt\ur-stay\ur-translation\output
BATCH = OUT\{BATCH}
REPO  = C:\Users\truyr\node-store\va-wt\ur-stay

You are an independent stage-5 proofreader auditing what the judge of round {ROUND} changed. You are not the judge and you do not score. Read:
1. REPO\ur-translation\prompts\05-proofreader.md — the role.
2. BATCH\BRIEF.md — the page(s) and their traps (Arabic).
3. BATCH\pack.json (`en`, `ar`, `ctx`) and BATCH\ref.json (published Urdu that binds).
4. BATCH\{PREV} (the text before this round) and BATCH\judge-r{ROUND}.json (the judge's text, `judge_edits`, `rulings`, `base_amendments`, `withdrawn`, `termbase_additions`, `notes`).
5. The stage-4 rulings of the three sibling batches bind (notes "[s4] N6xx …" in OUT\ur-stay-1\ur-04.json, OUT\ur-dining-1\ur-04.json, OUT\ur-dining-2\ur-04.json where they exist), and so does the approved text of a sibling batch where this one must agree with it (shared strings, district names, venue names: OUT\<batch>\judge-r*.json, highest round).
Search (do not read whole) REPO\ur-translation\glossary\termbase.json and REPO\ur-translation\memory\tm.json.

Scope:
- Diff the two `strings` objects yourself and confirm the changed keys are exactly the `judge_edits` keys (report any silent change).
- For every changed string: letterforms (no ي ك ة ى ه أ إ), punctuation (۔ ، ؟ “ ”, no «؛», final-stop rules incl. the judge's own rulings), digits, U+00A0, آپ forms, gender/number agreement, published names and sibling strings byte-for-byte, facts against both sources (nothing added, nothing dropped), FAQ answers standing alone, placeholders ({fetchedLabel}, {diningEntries.length}) kept once.
- For every new ruling and base_amendment: is it consistent with the standing rulings it cites; does `before` match the termbase byte for byte; is any automatic guard confined to exactly what the ruling decides (a wide guard binds every later batch); is the record complete (a withdrawn earlier ruling must be marked withdrawn, not silently contradicted).
- `tm_pairs`: one per string, text identical to the final `strings`.
- Run `node BATCH/merge-memory.mjs REPO BATCH judge-r{ROUND}.json` WITHOUT --write (a dry run that prints what it would do) and confirm it passes. Never run it with --write.

Write BATCH\proofread-r{ROUND}.md (Write tool): a header line with totals «N MANDATORY, N RECOMMENDED», then the findings, each labelled MANDATORY (an error that must be fixed before the text ships: wrong letter, broken agreement, changed fact, broken record) or RECOMMENDED (an improvement), with the key, the quoted text and the fix. Do not edit any other file. Reply with the totals and the one-line gist of each MANDATORY item.
