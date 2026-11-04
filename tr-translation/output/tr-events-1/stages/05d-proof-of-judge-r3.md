# Proof of 07-judge.r3 (17 changes against r2), tr-events-1

Checked: each new Turkish against `en`/`ar`/`ctx` from pack.json, TDK spelling, U+0027 only (no U+2019, no NBSP, no double spaces in any of the 187 strings), the r3 rulings, and a node script (`va-scratch/tr-r1/c3.mjs`, `c4.mjs`) that groups all 187 keys by identical English.

Consistency (c): every repeated English has one Turkish form across vl/vd/e (Location, Organisers, Highlights, Approximate length, the 3 status badges, the 6 countdown badges, Winter, Several weeks, Palm Village, the org lists: all "ok", zero INCONSISTENT). «Extended …» spans use one adjective: «Uzun ramazan geceleri» / «Uzun bir kış sezonu» / «Uzun bir sezon». No «yinele…», «etkileşimli», «Ziyaretçilerin katıl…», «Sahil Parkı», «Şimdi tam zamanı» left anywhere. «tekrarlanır» is the only verb in vl.notice, vl.notes.0.d, vd.notice. «Uygulamalı» appears only in the kitchen and the lomi intro. «(lomi)» Latin appears once on the lomi page (intro). The link label's page title and «Kayıtlı yerlerim» are byte-identical with ref.

## Per key

| key | verdict | note |
|---|---|---|
| vl.nowBadge «Yılın bu dönemindesiniz» | sound | Says only "you are in this period of the year"; no verdict, no running/firm-date claim. Grammar fine (dönem+inde+siniz). «dönem» also means "edition" in vl.notes.0.d, but «yılın» disambiguates. |
| vl.orderNote | sound | Agrees with the badge («yılın bu dönemine denk gelen etkinlikler»). Every English clause carried: automatic, device date, nearest, starts with what is current. Deliberate shift "under way now" to "falls in this period" is the ruling, and matches how the script works. |
| e.kafu-nights.span «Uzun ramazan geceleri» | sound | Mirrors the English, adds no clock or quantity; «ramazan» lower case; consistent with the other «Uzun …» spans; differs from time cell «Ramazan boyunca». |
| ui.ev.shopNote | sound | Establishments are the subject; «yiyecek» and «bakım ürünleri» carry "foods" and "care items"; no store name or «kişisel» added. Reads as "who sells what"; the store is the adjacent button. |
| e.bisht.acts.2 «Bişt çarşısı» | sound (declared loss) | The adjective «interactive» is dropped by E1-interactive-r3; nothing else changes, and acts.0 on the same card glosses «Bişt (erkek pelerini)». The Arabic has «التفاعلي», so this is a conscious omission, not a slip. No fix needed. |
| e.kafu-nights.acts.2 «Uygulamalı Kafu mutfağı» | sound | «uygulamalı» (hands-on) is a fair rendering of "interactive" for a kitchen; «Kafu» spelling matches H1 and intro. |
| e.lomi.intro | sound | Only «uygulamalı olarak öğrenir» changed; sentence split (qualities/benefits/cultivation; farmers; stalls; programme) still carries every English item. Both alternative names kept; «(lomi)» once. |
| e.uqair-winter.place «Ukayr Plajı'ndaki park» | sound | Termbase «Ukayr Plajı» byte-identical, suffix correct (Plajı + 'nda + ki), U+0027, card value begins with the place name. «Beach Park» rendered as "the park at the beach": no fact added. |
| vl.notice | sound | «tekrarlanır» only change. (Note, not a defect: "with each edition" of the English has no Turkish counterpart; unchanged since r2 and covered by «yıldan yıla».) |
| **vl.notes.0.d** | **defect** | «hem Hicri hem Miladi takvimi» is capitalised and its own `ctx` says Turkish writes «hicrî/miladi takvim» as TDK does (calendar adjectives are lower case). Fix, one edit: «Etkinlikler hem hicrî hem miladi takvimi izler …» (rest unchanged, «tekrarlanır» stays). |
| vd.notice | sound | «tekrarlanır»; sibling of vl.notice, same wording where the English is the same. |
| vl.notes.2.d | sound | «öne çıkar» is a close, slightly looser reading of "focused on"; family-friendly claim and all four themes kept; the chain now splits at «;». |
| vl.ctaD | sound | «çevresindeki gezilecek yerler» carries "around it"; «oasis» folded (declared); «Kayıtlı yerlerim» matches ref.ui. |
| e.kafu-nights.intro | sound | One gloss «“ödül ve övgü kazanmak”» covers both halves; «Gabka» defined in the same sentence, no case suffix; «Arap Körfezi»; other sentences unchanged. |
| e.lomi.faq.1.q | sound | «… farkı nedir?» grammatical, "differ from a regular lemon" kept; «El-Ahsa misket limonunun» suffix correct. |
| e.lomi.rel.0 | sound | Topic, colon, page title byte-identical with ref; «our» dropped as ruled; no stop. |
| e.lomi.acts.0 | sound | «Kurutulmuş misket limonu ürünleri sergisi» is the same compound pattern as «Hurma ürünleri stantları»; "(dried lime)" carried by «Kurutulmuş»; no «(lomi)». |

## (d) Rulings applied everywhere

E1-season-vocab-r3 (badge and orderNote agree), E1-ramadan-cells-r3, E1-shop-r3, E1-interactive-r3, E1-event-names-r3 (no edit), E1-venues-r3, E1-notices-r3 (one verb in all three notices), E1-kafu-intro-r3, E1-lomi-page-r3: all applied; no leftover of any withdrawn form.

## Counts
17 changed keys: 16 sound, 1 defect (vl.notes.0.d, hicrî/miladi casing). Consistency check: 0 inconsistencies.
