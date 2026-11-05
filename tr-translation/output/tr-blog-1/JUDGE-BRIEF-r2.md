# Judge brief — batch `tr-blog-1`, round 2

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r1.json`; write
`stages\07-judge.r2.json` (round 2, `changes` = every edit vs r1), checker with `--prev` set to 07-judge.r1.json.

Evidence:
- the independent proof `BATCH\stages\05d-proof-of-judge.md` (5 minor findings, S<n>);
- the second blind reader `BATCH\stages\06-blind-reader.on-r1.md` (106 items, numbered per page: cite P2.<page>.<n>,
  page 1 = index, 2 = one day, 3 = 48 hours, 4 = worth visiting, 5 = elsewhere). Rule every item in one line.

**Artifacts** (verdict `artifact`): P2.2.1 the slashes («Ana sayfa/ / Blog/ /», «Paylaşın /») are the cutter's
separator for adjacent elements, not page text; P2.2.35 curly vs straight apostrophes = the Markdown renderer (r1 ruled).

**The three-reader threshold** (a fault named by three independent readers — the proof counts as one — is fixed even
against an earlier ruling; two readers = weigh it):
- **«Cebel el-Kare» read as "square"** (P1.7, P2.1.4, P2.2.7, P2.4.7, and three readers in earlier batches): the
  name is published across the site and is not changed in this batch. Where the English itself says «the mountain»
  next to the name, Turkish may put «dağ» beside it in a body sentence (not in a title, not as a gloss the English
  lacks). Record the line note.
- **Title case before the colon** (P1.3, P2.1.3): two readers; the published landmark body quotes «El-Ahsa'da 48
  Saat». Weigh it and rule: either keep BL1-titles, or switch to sentence case and list the published quote in
  `notes` as a follow-up edit of that landmark body (key and new text) — a wording change is the line's, not the
  owner's. Decide on the reader evidence.
- **Morning vs before noon** (P2.1.6, P2.2.3, P2.3.6, P2.3.17): «Sabah» and «Öğleden önce» read as the same slot.
  The English «Morning» / «Mid-morning» are two slots; BL1-times needs a Turkish second slot that a reader tells
  apart from «Sabah» (e.g. «Öğleye doğru» was readable to the first reader; weigh «Kuşluk vakti» against P1 and P2).
  Revise BL1-times (BL1-times-r2) and apply it to both itineraries and the index card.
- **«Kasr İbrahim kalesi»** (P1.16, P2.2.11): two readers on the doubling — decide once, one form across pages.
- **«halk çarşısı» / «haftalık pazar»** (P1.91, P2.3.30, P2.4.26): three readers — one Turkish for the English term
  across all pages (read the English: «souqs», «weekly markets»).
- **«Vahadan …» in the index lead** (P1.2, P2.1.2): two readers — weigh.
- **«Hayat … canlı/canlılığıyla sürer»** (P1.40, P1.67, P2.3.2): three readers — recast without the calque.
- **The «Hepsini görmek» sentence** (S1, P2.4.18), **the «var» sentence** (S2, P2.4.6), **«bu kısmı»** (S5, P2.2.33):
  proof + reader = fix as the proof says or better.

**Also fix** where the reader names a real Turkish fault: «taklit edemez» illogical (P2.4.1), «deniz limanı» (P2.3.25,
P2.4.13 — the English «seaport»: weigh the Turkish usage), «hatırayı taşır» (P2.4.9), «içinde hayatın sürdüğü»
(P2.4.15), «aynı buluşma» without antecedent (P2.4.23), «dolaşım» / «nasıl dolaşırım» (P2.2.31, P2.3.29, P2.3.31),
quotes around «Kayıtlı yerlerim» in FAQs vs none in bodies (P2.3.32, P2.4.28 — one convention, BL1-features),
«yöre halkının elinde işlenir» (P2.2.20 — your BL1-souq-wording; weigh), «Bu yerden söz eden yazılar» (P2.5.1 — one
reader; weigh against P1.92), «yoğun bir günlük» (P2.1.5), «daha dolu bir ziyaret» (P2.1.2), «Dürüst bir rehber»
(P2.1.10 — the English «An Honest Guide»), «öne çıkarır» (P2.2.12), «El-Mulla / el-Mulla» capitalisation (P2.2.14 —
check the termbase «El-Mulla ailesi» and the published body), S3 «çömlekçi çarkında» (not in the source — remove),
S4 the bold phrase in 48-hours paragraph 2.

**Source content, not to be added** (verdict `source_defect`, already listed or add): cave activities, entry and fees
(P2.2.10, 2.16, 2.9), distances and times (P2.2.23, 3.9, 3.24), the afternoon gap of day one (P2.3.12 — the English
has none), the «water» day (P2.3.14, 4.16), taxis (P2.2.27, 4.27), climbing the mountain (P2.4.8), the Friday
morning (P2.2.21), «kültür evi» content (P2.3.11 — keep the published summary), the FAQ day count (P2.4.25 — keep
the English order).

Everything else is ruled, not edited. Check the edited strings against the English and the Arabic sentence by
sentence. Report back as in r1, with the final scores.
