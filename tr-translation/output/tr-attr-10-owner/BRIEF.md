# Owner rulings on `tr-attr-10` — five Turkish strings (judge pass only)

The owner answered the five `owner_questions` of `tr-attr-10` on 2026-10-30. Two answers change facts on two of the
batch's pages; the Arabic and English have already been edited to carry them. This mini-batch carries the same facts
into the approved Turkish, under the `tr-attr-10` rulings (A10-days, A10-SAR, A10-titles) — nothing else moves.

**The rulings (facts, binding):**
1. **qaisariyah — best hours**: morning *and* evening (the English body now says "its best hours are in the morning
   and the evening"; bestTime and FAQ 4 already said morning or evening).
2. **qaisariyah — Friday**: not "evenings only"; the owner's words: «الجمعة صباحاً وبعد العصر» = Friday: morning and
   after the afternoon (ʿAsr) prayer — no clock given, none invented. The English card now reads «8 am–12 noon &
   3:30–10 pm (Friday: morning and after the afternoon prayer)» and FAQ 1 «8 am to 12 noon and 3:30 to 10 pm; on
   Fridays, the morning and after the afternoon prayer.» Turkish has the native word «ikindi» for the ʿAsr prayer
   («ikindi sonrası» = after ʿAsr); day-name capitalisation per A10-days («Cuma»).
3. **ardh-alhadarat — fees**: adults SAR 50, **children SAR 10**. English card: «SAR 50 for adults and SAR 10 for
   children — one ticket covers the Land of Civilisations and Jabal Al-Qarah»; FAQ 2: «SAR 50 for adults and SAR 10
   for children, and tickets include the Al-Qarah Mountain caves experience.» A10-SAR: first mention on the card
   «Suudi riyali (SAR)», then «SAR».
4. najim-museum booking channel: kept as it is. craftsmen-souq fees: none — a «Giriş ücretsiz» row is added from
   the approved tm pair (not part of this pass).

**Keys to re-rule (5), everything else in `pack.json` stays byte-identical to `tr-attr-10/stages/final.json`:**
`qaisariyah.body` (only the last sentence under the `## ` heading), `qaisariyah.practical.0.value`,
`qaisariyah.faq.0.a`, `ardh-alhadarat.practical.1.value`, `ardh-alhadarat.faq.1.a`.

Paths: REPO = `C:\Users\truyr\node-store\va-wt\tr-a10` (read only). BATCH = `REPO\tr-translation\output\tr-attr-10-owner`
(`pack.json` = the current English/Arabic after the owner's edits; `ref.json`). Checker:
`TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a10 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-10-owner <absolute stage file>`.
Output: `BATCH\stages\07-judge.json` — `{ "batch": "tr-attr-10-owner", "stage": "07", "round": 1, "date", "decision": "APPROVE",
"strings": { all keys of pack.json }, "changes": [ the five, with before/after/why ], "tm_pairs": [ five ], "notes": [] }`,
Turkish written only with the Write tool or a node script reading `tr-attr-10/stages/final.json`.
