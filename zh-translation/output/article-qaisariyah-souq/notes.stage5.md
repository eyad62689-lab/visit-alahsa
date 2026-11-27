# Stage 5 notes: qaisariyah-souq (zh) — proofreader

Input `qaisariyah-souq.stage4.md`, output `qaisariyah-souq.stage5.md`. Checklist in `stage5-checklist.md`.

## Outcome
- One correction: `有门和墙把它同城里其他地方隔开` → `有门和墙把它与城里其他地方隔开` (the Fez sentence). `同城` is a Chinese word («same-city», as in 同城快递), so `把它同城里` read across the word boundary; this is the kind of slip the mandatory misparse sweep exists for. `与` removes it; nothing else in the sentence moved. `同城` joins the sweep list proposed for `style_rules_additions.misparse_sweep`.
- Everything else is PASS. `stage5.md` differs from `stage4.md` in that one character.
- Mechanical checks: `check-stage5.mjs` (in this folder) passes, 49 of 49. A stage-5 add-on script kept outside the repo passes, 41 of 41.

## `check-stage5.mjs`
A copy of `check-stage3.mjs` with the file name changed. One assertion had to follow the stage-4 ruling on quffa: the stage-3 line required `“库法”（quffa）`, the stage-5 line requires `“卡班克”（kabank）`, `“quffa”` exactly once, and no 库法 anywhere. The other 48 assertions are unchanged. It was also run on a corrupted copy outside the repo (the stage-3 quffa form restored, 因此 put before the mud sentence, one URL altered): it failed exactly those 3 checks.

## What the add-on checks cover
- Paired marks balanced on every line (“ ” 37/37, （ ） 35/35), no ASCII quotes in the body, the frontmatter text values delimited by exactly two ASCII quotes.
- One space between Chinese and Latin letters or digits everywhere; no stray space next to full-width marks; no doubled marks or particles; no trailing whitespace, no tab, single final newline.
- Simplified characters only (probe of common Traditional forms); 您 throughout, no 你.
- Retired forms absent: 麦格里齐, 阿巴亚, 库法, 被烧, 点名, 限定语, 同城.
- Frontmatter parses as YAML; keys in the English order minus `seoDescription`; 5 tags; 4 FAQ pairs; FAQ question 3 equals heading 7.
- Every zh form of `termbase-additions.stage4.json` (52 entries) occurs in the article; every entry has `en`, `zh`, one tag and a source.
- Each Latin gloss occurs once (14 glosses); `国际古迹遗址理事会（ICOMOS）` three times by design (FAQ answer 1, first body mention, source line 6); no Latin in headings.
- Every 凯撒利亚 is either 凯撒利亚集市 or the quoted word “凯撒利亚”; 19 bound forms present; the hedge “据部分来源所述” four times in one wording.
- 伊斯兰历 twice (FAQ answer 1, first body mention), 伊历 three times.
- Source list: URLs identical line by line, Latin titles and publishers on the same lines as the English, every description closed with 。.
- Numbers: digit runs of the body against the English. The only differences are month numbers (January to November written as digits in Chinese dates) and 19 for «nineteenth» (twice).

## Notes for the next stages
- The blind reader will meet one bare Latin word in running text, `“quffa”`, followed at once by its definition. If that stops the reader, the fallback is in `stage4-changes.md`, G.1.
- `哈萨比什特长袍与哈萨阿巴雅长袍` repeats 哈萨 on purpose (the Arabic adjective governs both nouns).
- The article mixes 星期五 / 星期四 (the dated newspaper issue) with 周五 (the recurring day in the visiting tip). This is the house pattern, not a slip.
- Closed sets are in Chinese numerals (十二处组成部分, 九座门, 三块, 两块, 第五处), statistics in digits (14 座, 422 家, 200 多, 80%, 第 13 届), per the termbase numeral rule.
- Open items for the judge and the owner are unchanged from `stage4-changes.md`, sections G and H.
- The publisher should not merge `termbase-additions.stage4.json` before the judge rules on the quffa form and on 马克里齐.
