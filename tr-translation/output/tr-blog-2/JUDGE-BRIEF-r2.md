# Judge brief — batch `tr-blog-2`, round 2

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r1.json`; write
`stages\07-judge.r2.json` (round 2, `changes` = every edit vs r1), checker with `--prev` set to 07-judge.r1.json.

Evidence:
- the independent proof `BATCH\stages\05d-proof-of-judge.md` (15 findings, S<n>; 4 serious: S1, S2, S3, S7);
- the second blind reader `BATCH\stages\06-blind-reader.on-r1.md` (104 items, numbered per page: cite P2.<page>.<n>,
  page 1 = jabal-qarah, 2 = crafts, 3 = souvenirs, 4 = hasawi-lomi, 5 = elsewhere). Rule every item in one line.

The three-reader threshold: a fault named by three independent readers (the proof counts as one) is fixed even against
an earlier ruling; two readers = weigh it.

## Fix — the proof's serious findings
- **S1** «Cebel el-Kare'yi ziyaret için» → «… ziyaret etmek için».
- **S3** and S4 «Köy, gezi yolları, …» / «Atölye, …» / «Gördüğünüz, …»: commas after a plain subject (DN16-r2) and the
  list misparse (P2.1.14, P2.1.11). S5: «yalnızca» is not in the source — drop it.
- **S7** the pilaf sentence reads «Pilav, lomi, tarçın ve kakule» as one list (P1.4.13, P2.4.15, S7 = three readers):
  recast so the rice is plainly the subject and lomi, cinnamon and cardamom its spices.
- **S2** «sıcaktan kaçmak için ideal bir yer»: weigh. The sentence itself says «yaz öğle vaktinde bile … iç serinlikleri
  sayesinde», so heat is the source's context, not an addition; but BL2-refuge's wording must add no purpose the
  English lacks («an ideal refuge»). Choose a Turkish that is neither «sığınak» (P1.1.21: bomb shelter) nor adds a
  purpose (e.g. «ideal bir mola yeri», «serin bir kaçış» — weigh), and revise BL2-refuge (-r2).

## The three-reader threshold — fix
1. **The bisht: «dokuma» defined as «nakış»** (P1.2.6, P1.3.11, P2.2.6, P2.3.10, S13): readers cannot tell whether it is
   woven or embroidered. The Arabic «الحياكة الحساوية» names the Hasawi hand-craft of the bisht, which in this usage is
   the stitching/embroidering of the cloak, defined by the zari embroidery — and whether it is woven or stitched is an
   **open owner question**. So do not commit to «dokuma» (weaving): name the craft with a neutral Turkish for the
   hand-work («El-Ahsa el işçiliği» or similar — weigh; record the attestation) and keep the zari hand embroidery as what
   defines it. One wording in the crafts description, body and FAQ and in the souvenirs bullet and FAQ. Revise
   BL2-bisht-weave (-r2) and the termbase entry if needed (`termbase_additions` with the form you print).
2. **Cemid: "sun-dried juice" kept in jars** (P1.4.11, P1.4.26, P2.4.13, P2.4.14, P2.4.28, S9): the English «lime juice
   sun-dried and aged» is the source's own description — do not add what it becomes. Make the Turkish say exactly
   that and read as one thing (product in body and FAQ, the custom described with verbs) — and make BL2-cemid agree
   with the description's «cemid yapma geleneği» (S9). Record the reader's question in `source_defects`.
3. **12 caves, 28 passages, 1,5 km** (P1.1.11, P2.1.7, P2.1.8, S6): the relation and the «total or each» are the
   source's (owner question already raised); but «tavanı yüksek» is an interpretation — S6: «28 yüksek, uzunlamasına
   geçit», or a Turkish of «towering lengthwise passages» that adds nothing.

## Fix — real Turkish faults one reader or the proof named
S10 / P2.4.18 the governorate dropped and «bu itibarı» without referent: keep El-Ahsa as the place, not a person
(«El-Ahsa'da her yıl … kutlanır» kind) · S11 / P2.3.21 «en değerlisi» → the rank «Çeşitlerin başı» · S12 / P2.3.12
coffee and spices: no «buradan alabilirsiniz» the English lacks; a fragment that parses · S14 «güçlüdür» not in the
source · S15 the FAQ landmark-page wording (one convention, rule) · P2.1.27 «yüzünüze vurur» (the reproach idiom) ·
P2.1.13 «bu miras köyü ve sergi bölgenin» misparse («sergi bölgesi») and «miras köyü» · P2.2.2 «Bişti …» at the start
reads as "it cooked" — reorder · P2.3.11 «onları» refers to the stages, not the pots · P2.4.2 the description jumps
from «anlatıyor» to «sunuyoruz» · P2.1.28 «gününüzü … kurun» · P2.3.9 the heading «yolculuktan sonra da kalanlar» ·
P2.2.9 «bu noktada» (calque "at this point").

## Weigh (two readers or one)
«Bin Züheyri» read as "thousand" (P1.3.8, P2.3.6, P2.4.6 — two readers; F30-r3 holds the quoted name: weigh a frame
that adds no fact, e.g. «yerel adıyla “Bin Züheyri”» if the Arabic «ويسمى» supports it) · «Şişi» / «Halas» read as words
(P1.3.3, P2.3.4 — two readers: «Halas hurması» is done; weigh «Şişi, Raziz ve Barhi çeşitleri») · «kuşaktan kuşağa» and
«kalbi» as tics (P1.2.7, P2.3.14) · the -yor drift in -mıştır/-ir paragraphs (P2.1.18, P2.2.9, P2.2.13) · «Biletler …
verilir» (P2.1.15 — keep no price; weigh «buradan temin edilir») · «erzak» (P2.4.12) · «El-Ahsa Geliştirme Kurumu» vs
«Kalkınma» (P2.4.19 — check the termbase entry and its source; change only on evidence) · «asırlık bir bekçi»
(P2.1.2) · «sakin bir ılıklık» (P2.1.4) · «koku katar» for food (P2.3.7) · «imzası» (P2.4.25) · «Deneyimin kalbi»
(P2.1.10) · «hiç tartışmasız» (P2.3.2) · «vahanın temposunda» (P2.5.1 — a published tr-blog-1 title: not reopened).

**Source content, not to be added** (`source_defect`): how to climb / reach the summit, hours, fees, booking, distance,
how to tell a real bisht, whether you can watch the academy, the exhibition's dates, the FAQ lemon/citrus mismatch
(P2.4.27 — check the English: if its answer also compares with all citrus, it is the source's).

Touch only the keys these items need; every other string stays byte-identical. Check every edited string against the
English and the Arabic sentence by sentence. Report back as in r1, with the final scores.
