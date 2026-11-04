# Judge brief — batch `tr-stay-dining-1`, closing addendum (round 3)

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-stay-dining-1`
REPO  = `C:\Users\truyr\node-store\va-wt\tr-sd` (read only)

You are stage 7, the final judge, writing a **narrow closing addendum** on round 2 (`BATCH\stages\07-judge.r2.json`, 91, 22 keys changed). This is not a full round. Read:
1. `REPO\tr-translation\prompts\07-judge.md`; `BATCH\BRIEF.md`; `BATCH\JUDGE-BRIEF-r1.md` (standing rules) and `BATCH\JUDGE-BRIEF-r2.md`.
2. `BATCH\pack.json` (en/ar/ctx, `latinNames`), `BATCH\stages\07-judge.r2.json` (strings, rulings, blind_reader_rulings, source_defects).
3. **The independent proof of round 2**: `BATCH\stages\05d-proof-of-judge-r2.md` (20 sound, 2 defects, 1 note outside the edited set).
4. **The third fresh blind reader** on round 2: `BATCH\stages\06-blind-reader.on-r2.md` (78 items: page 1 #1–13, page 2 #1–14, page 3 #1–51; cite P1 #n …), input `BATCH\stages\06-blind-reader-input.on-r2.filtered.txt`.

## Scope — rule only these; every other item of the 78 is a verdict by reference (source_defect / frame / rejected as already ruled in rounds 1–2), no text change
1. **The proof's two defects and its note**: `dv.faqs.5.a` (subject comma «Her kart, …»; P3 #41 also finds «tam konumun … bağlantısını içerir» stiff and «Hüfuf'taki bölgeler şunlardır: … Hüfuf tarihî merkezi» circular — smooth the frame of the list as the English allows, district forms byte-identical to `dn.*`); `dc.abu-fahd-alrabee.blurb` vs its alt — one Turkish form for the English «floor tannour»; `dv.faqs.1.a` «Her kart, …» — the same comma.
2. **`dc.bun.blurb`/`.alt` «Tavandan zemine pencereli»** (P3 #26): Turkish says «yerden tavana pencereler» — fix in both.
3. **Card chains round 2 left or made** (P3 #25 Aknan «teras zeminine yerleştirilmiş bir cam ışıklık» — check the English: a glass skylight set into the terrace floor? say it so it can be pictured; P3 #27 VOLK «üstünde» — make clear it is above the bar; P3 #28 SHYLM three stacked modifiers — split per lesson 1 / SD13-r2; P3 #17 «ışık dizileri» — the usual Turkish for string lights; P1 #7 Continent chain — split if the English allows; P3 #20 «Işıklığın altında» definite with no antecedent).
4. **Three readers now on «meclis salonu»** (on-05 #45, on-r1 P3 #23, on-r2 P3 #19) and **three on «nitelikli kahve»** (on-05 #29, on-r1 P3 #2, on-r2 P3 #2). Both are ruled (tr-attr-9; SD2). Lesson of tr-events-1: a reader with no new named fault does not open a new form. Decide: is the named fault a real one (meclis = parliament: a real collision, A1 class — a gloss the English allows, e.g. «Arap tarzı misafir salonu (meclis)», only if the termbase ruling allows it on cards; otherwise keep and record the three readers as evidence); «nitelikli kahve»: the attested term (SD2) — keep unless you find the attestation wrong. Record the evidence either way.
5. Any trip the third reader had on text **round 2 changed** (check its 78 items against round 2's 22 keys) — fix if it is a real fault the English allows.

## Score
The addendum scores the text as it stands after these rulings. **Do not raise a unit's score unless you state, per unit, which concrete fault the addendum removed.** If nothing changes the score, it stays 91.

## Output — `BATCH\stages\07-judge.r3.json` (+ `BATCH\stages\07-judge.r3-addendum.md`, a short Markdown summary of the rulings)
The shape of round 2 (`round: 3`; `strings` all 174; `changes` vs 07-judge.r2.json — may be few; `blind_reader_rulings` for the 78 items of on-r2 with `page` and `item`; `rulings` new/revised only (`…-r3`); `termbase_additions` the full list; `tm_pairs` every approved string; `source_defects`, `owner_questions` (the full, deduplicated list for the owner), `notes`; `scores_row` `tr-stay-dining-1,2026-11-04,3,<batch_score>,<decision>`). Repeated English byte-identical across sv/sd/dv/sc/dc, districts across `dn.*`/`dc.*.area`/`dv.faqs.5.a` (node script). Turkish only via the Write tool or a node script reading JSON (scripts in `C:\Users\truyr\node-store\va-scratch\tr-r1\`) — never a shell heredoc or `node -e` with Turkish. Then run: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-stay-dining-1 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-stay-dining-1/stages/07-judge.r3.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-stay-dining-1/stages/07-judge.r2.json` until `RESULT [OK]`. Do not edit any repository file.

## Report back
Plain text, ASCII: the RESULT line; the six scores (with the reason for any change) and decision; keys changed; the rulings one line each; the owner questions one line each.
