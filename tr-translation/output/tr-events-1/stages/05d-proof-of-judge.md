# Proof of the judge's edits, tr-events-1 (07-judge.r1 vs 05-proofreader)

Method: pack.json (en/ar/ctx) against each of the 39 changed keys; node scripts in va-scratch/tr-r1 (pj2-pj5) for characters, repeated-English consistency, ruling vocabulary and lengths.
Script results: no U+2019, NBSP, «», straight quotes, double spaces or spaces before punctuation in any of the 187 strings; every English that repeats (Winter x6, Several weeks x4, Location, Organisers, Approximate length, Highlights, 3 status and 6 countdown badges, Palm Village, the org pair) has exactly one Turkish form across vl/vd/e; seoDesc 158 and 155 chars, seoTitle 60 (all within limits); no «Bişti» or «Belediyesi Kalesi» or «yaklaşık + month» left anywhere.

## Defects (3)
1. **e.kafu-nights.intro** - comma between subject and predicate, twice: «Kafu Geceleri, her yıl ramazanda … halk festivalidir» and «Gabka, halk arasında sevilen bir yemek … gelenektir». Breaks the batch rule (no comma after the subject). Fix: delete both commas («Kafu Geceleri her yıl ramazanda El-Ahsa'da düzenlenen bir halk festivalidir.» / «Gabka halk arasında sevilen bir yemek ve toplumsal bir gelenektir; …»). Meaning otherwise kept; «holy» and «Governorate» are dropped (ruling E1-ramadan-cells covers «holy»; «Governorate» lost silently, acceptable).
2. **e.lomi.intro** - same comma: «Misket limonu (lomi), vahanın hurmadan sonra en ünlü ürünüdür». Fix: delete the comma after «(lomi)». Advisory: «… adlarıyla da bilinir» leaves the first name sitting inside the alias list with no subject; the earlier «… olarak da bilinir» read the first name as the subject. Optional one-edit: restore «olarak da bilinir».
3. **vl.ctaH** - «Festival ziyaretinizi …» adds «festival» (the eleven pages include nights, winters, an exhibition and a racing season, so «festival» narrows the English «your season») and departs from E1-season-vocab, which lists the CTA among the «sezon» places. Fix: «Etkinlik ziyaretinizi tam bir geziye dönüştürün».

## Judge's own additions (flagged as asked)
- **e.bisht.org** «(Suudi Arabistan'ın Kültür Bakanlığına bağlı)»: «Suudi Arabistan'ın Kültür Bakanlığı» is the termbase name (country first, A6/A7); «bağlı» renders the English parenthesis (affiliation). Sound.
- **e.bisht.acts.0** «Bişt (erkek pelerini) sergisi»: «erkek pelerini» is not in en/ar, but it is the approved two-word gloss from tm (plan-your-trip faq.10, «bir erkek pelerini») and the termbase note; a lexical gloss in a list item, not a heading. Sound.
- **ui.ev.shopNote** «Mağazada …»: adds the store as subject place, from ctx («note beside the store button»). No fact added. Sound.
- **vl.ctaH** «Festival»: see defect 3.

## Sound (36)
vl.eyebrow, vl.lead, vl.notice, vl.nowBadge, vl.orderNote, vl.notes.0.d, vl.notes.2.d (note: «sunar» renders «focused on» slightly looser, acceptable), vl.ctaD, vl.seoTitle, vl.seoDesc, vd.eyebrow, vd.mapNone, vd.notice, vd.moreH, ui.ev.shopNote, e.bisht.name, e.bisht.time, e.bisht.org, e.bisht.acts.0, e.qaisariyah-nights.acts.0, e.qaisariyah-nights.acts.1, e.kafu-nights.season, e.kafu-nights.span (note: «birçok gecesi» is a quantity where the English says «extended»; the judge's choice, follows ur precedent), e.dates-festival.place, e.dates-festival.acts.0, e.lomi.sec.0.p.1, e.lomi.faq.1.a, e.lomi.rel.0 (fruits title «El-Ahsa'nın mevsim meyveleri» byte-identical to ref.fruits fv.title), e.lomi.after.time, e.lomi.after.seoDesc, e.wafrah-winter.time, e.wafrah-winter.org, e.wafrah-winter.acts.0, e.wafrah-winter.acts.1, e.horse-racing.sec.0.p.0, e.creative-ahsa.place.

Ruling application (d): «sezon» is used in vl.eyebrow/lead/nowBadge/orderNote/seoTitle/seoDesc, vd.eyebrow/moreH and the status «Beklenen sezon» in both blocks; «mevsim» remains only for the key, the notices' «aynı mevsimlerde» and weather seasons (per the ruling). «… civarında» is applied in all four approximate-month cells and the after.seoDesc; «El-Ahsa Bişt Festivali» is byte-identical in e.bisht.name and vl.seoDesc; Ramadan cells match the ruling (Ramazan ayı / Ramazan boyunca / Ramazanın birçok gecesi); «El-Ahsa Belediye Kalesi» is one form in both places.

**Count: 36 sound, 3 defects (e.kafu-nights.intro, e.lomi.intro, vl.ctaH).**
