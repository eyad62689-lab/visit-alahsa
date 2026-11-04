# Judge brief — batch `tr-dining-2`, round 2

BATCH = `C:\Users\truyr\node-store\va-wt\tr-sd\tr-translation\output\tr-dining-2` · REPO read only.

Your input text is `BATCH\stages\07-judge.r1.json`. Two new inputs:
1. `BATCH\stages\05d-proof-of-judge.md` — an independent proofread of your round-1 edits: 15 bodies with a comma between subject and predicate, plus «fırın ürünleri ve tatlı» (baking-up) and «et suları» (dar-basma).
2. `BATCH\stages\06-blind-reader.on-r1.md` — a fresh blind reader on the pages built from r1 (132 items, per page: cite as R2:P<page>.<n>).

## Rules for this round
- **E1-subject-comma binds** (tr-events-1): after a plain subject no comma, **unless the next word could fuse with the subject** — two proper names or a name and a capitalised word running together («El-Kut, Kasr İbrahim'i …», «Ratio, El-Ahsa'da …», «Al-Sayed Café, Hüfuf'taki …», «Dar Huwaija, Hüfuf'taki …», «Sharq Restaurant, Hüfuf'un …» keep the comma). Go through each of the proof's items and apply or reject it on that test; one line each in `proof_rulings`. The byte-identical stay-body sentence stays.
- **Do not reopen** DN1–DN14, «nitelikli kahve», «meclis salonu», D1-r3 (no new dish glosses: R2:P4.7, P8.9, P17.3–6), the three authority names (R2:P4.5, P8.3, P11.6), the Qaisariyah/Hamidiyah data (R2:P8.1, P17.1), the editorial «bulamadık» content (R2:P1.5, P14.3, P19.4), the published card blurbs/alts/search descriptions (R2:P9.6, P11.7, P18.4), the nearby-sights list (R2:P1.8, P2.9, P9.5, P19.5 — data), the place names and their pronunciation (R2:P1.3, P2.1, P7.1, P12.1, P13.6, P14.5, P17.9). A reader item that names no Turkish fault and repeats a ruled point is `rejected` with the ruling id — **a reader who names no new fault does not open a new form** (tr-events-1).
- **Apply where the reader names a real Turkish fault the English allows you to fix**, at least:
  - R2:P15.5 — the pun description must be accurate: «trEAT» puts «eat» inside «treat», and «butter» sounds like «better» («where we can treat you better»); one clause, no new claim.
  - R2:P16.4/5 — «bu fikri» has no referent (the English «sums up the idea» — the idea of the place: make it plain, e.g. «işletmenin fikrini»); the doubt/Dot clause may say the line reads «şüphedeyseniz, Dot» only if that is a plain rendering of the quoted words.
  - R2:P14.1 «özenle döşenmiş bir bina» (a building is not furnished; the English «well-appointed») — a plain form.
  - R2:P19.2 «rafine bir çizgide» — plain Turkish for «in a refined register».
  - R2:P16.1 «çıktı» twice; R2:P16.3 «üç şubesini belirtir» («lists three branches»); R2:P15.4 «önce … öne çıkarır»; R2:P13.4 «öbürü» → «diğeri»; R2:P12.5 «Sinyar restoranı ile Raslan» (parallel form); R2:P9.1 «kullanılır» ×4 (vary without changing a fact); R2:P7.4 the «onu … onlara» pronoun chain; R2:P7.7 the shipping/«yani» logic (the English: «it also ships through an online store, so a visit is one way to reach it rather than the only one» — «it» = the shop's goods/the shop: make the Turkish follow); R2:P10.4 the triple «bulamadık / bulamamış / bulamadığımızı» (DN12 content kept, one verb fewer if it reads); R2:P10.6 «bu sayfanın kapsadığı yerler» (the English «among what this page covers»; the owner question stands — use the DN3 referent if it fits the English); R2:P5.4 «yerleştirir»; R2:P3.5 «bu konum» referent; R2:P11.1 «ortasından yola çıktı».
  - Anything else the reader names that is a real Turkish fault.
- No sentence reordered; no fact added or dropped; keep every name byte-identical to ref.cards / ref.stayDining / termbase.

## Output — `BATCH\stages\07-judge.r2.json`
Same shape as r1 (`"round": 2`), `strings` all 25, `changes` = every edit vs 07-judge.r1.json (full text, no "..."), `blind_reader_rulings` for all 132 R2 items, plus `proof_rulings` (each proof item: applied/rejected + why), `rulings` = only new or revised ones (ids DN15…, or `DNx-r2` with the revised text), `tm_pairs` for all 25, `scores`, `batch_score`, `decision`, `scores_row` "tr-dining-2,2026-11-04,2,<score>,<decision>". Raise no score without a stated per-unit reason.
Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-dining-2 C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-dining-2/stages/07-judge.r2.json --prev C:/Users/truyr/node-store/va-wt/tr-sd/tr-translation/output/tr-dining-2/stages/07-judge.r1.json` until `RESULT [OK]`. Turkish only via Write or a node script reading the JSON. Do not edit any repository file.

## Report back
The RESULT line verbatim; scores and decision; keys changed; new rulings one line each; proof items applied/rejected counts.
