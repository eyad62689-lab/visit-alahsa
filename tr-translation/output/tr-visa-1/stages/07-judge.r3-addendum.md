# tr-visa-1 — judge closing addendum (round 3)

Batch score 91 (head 91, table 91, routes 91, arrive-next 91, faq-links 91) — APPROVE. 23 keys changed vs r2; r2 proof fault (`routes.tourist.who.text`) fixed.

## Three-reader threshold as applied

| Point | Readers | Applied |
|---|---|---|
| Statement buttons (family, business) | P1.23 · P2.34 · P3.30 | **Fixed — VG7-r3.** «Davet eden kişinin resmî başvuru platformu» / «Davet eden kuruluşun resmî başvuru platformu»: destination named, inviter fact inside, same shape. |
| «hazır rota(nız)» | P1.30 · P2.44 · P3.38 | **Fixed — VG13-r3.** «… [Kayıtlı yerlerim] bölümüne ekleyin; site bu yerlerden sizin için bir rota hazırlar.» Frame note: ui.ts `plan.lead` / `plan.empty.d` still say «hazır rotanızı alın». |
| resmî platform / kaynak / sayfa | P1.2 · P2.5 · P3.4 | **Fixed — VG14-official.** «resmî platform» = application site only; stopover/package buttons «resmî bilgi sayfası»; verifyLine «ilgili resmî kaynak». |
| Suudi ziyaret vizesi / turist vizesi / turist e-vizesi | P1.6 · P2.9 · P3.43 (+P3.7, P3.8) | **Fixed — VG3-r3.** FAQ 4–5 questions and FAQ 5 answer say «turist e-vizesi»; intro adds once «Turist e-vizesi de bu vizenin sekiz türünden biridir» (from the caption). Umbrella kept. |
| «Cebel el-Kare» read as «kare» | P1.3 · P2.7a · P3.5 | **Frame.** Site-wide termbase form; not changed in one batch, no gloss. Note for the line. |
| GCC residents in two rows | P1.8 · P2.13 · P3.10 | source_defect; owner question stands. |
| Host must be related vs personal visit | P1.18 · P2.47 · P3.40 | source_defect; owner question stands. |
| «Can it be extended» answered by expiry before entry | P1.31 · P2.45 · P3.42 | source_defect; **owner question added.** |
| Türkiye not in any row | P1.7 · P2.51 · P3.17 | source_defect; owner question stands (eligible countries). |
| «mola» for a connection | P2.29 · P3.27 | **Fixed on the merits — VG12-r3.** «Suudi Arabistan'da aktarmalı uçuşlar için». |
| Two «Kral Fahd» places | P1.26 · P3.34 | Frame (termbase names). |
| «Paket vizesi / pilot aşama» | P1.24 · P2.38 · P3.32 | source_defect (the English). |

Superseded: VG3 → VG3-r3, VG7 → VG7-r3, VG12 → VG12-r3, VG13 → VG13-r3. New: VG14-official. A fourth reader with no new fault does not open another round.

## Round 4 (narrow fix)

Batch score 91 — APPROVE. 7 keys changed vs r3; nothing else touched.

- `routes.family.cta.label` → «Resmî platform: davet eden kişi başvuruyu başlatır» (proof r3 fault 1; **VG7-r4** supersedes VG7-r3: destination first, the English fact whole).
- `routes.business.cta.label` → «Resmî platform: davet eden kuruluş başvuruyu başlatır» (proof r3 fault 2; same shape).
- `routes.business.who.text` → «Suudi Arabistan'daki bir şirket veya kuruluştan davet alan ve o şirket veya kuruluşla iş ilişkisi olan kişiler» (proof r3 fault 3; P4.29).
- `intro.parts` → «…arıyorsanız, ihtiyacınız olan Suudi ziyaret vizesidir…» (proof r3 fault 4; P4.9).
- `routes.family.who.text` → «birinci derece yakınları (anne-babası, eşi ve çocukları)» restored (proof r3 fault 5); and «akrabalık ya da iş ilişkisi olmayanlar» (P4.27).
- `lead` → «başvuru platformunu» for «başvuru adresini» (P4.4).
- `arrive.more` → «geliş ayrıntılarını, ayrıca Riyad ve Dammam'dan uzaklıkları» (P4.36).
- Other 42 P4 items: source_defect / frame / rejected, citing the earlier rulings. The fourth reader opens no new point, so there is no further round.
