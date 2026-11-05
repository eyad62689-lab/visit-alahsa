# Judge brief — batch `tr-blog-2`, round 4 (narrow fix)

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r3.json`; write
`stages\07-judge.r4.json` (round 4, `changes` = every edit vs r3), checker with `--prev` set to 07-judge.r3.json.

Evidence:
- the proof of round 3 `BATCH\stages\05d-proof-of-judge-r3.md` (3 findings, all minor — apply S1–S3 or better);
- the fourth blind reader `BATCH\stages\06-blind-reader.on-r3.md` (81 items, cite P4.<page>.<n>). Rule all of them in one
  line each; most repeat classes you have already ruled (names «Kare», «Duğa», «Halas», «Şişi», «El-İd», «Kaysariye»;
  hours/fees/booking/distance/how to reach the summit; the exhibitions without years; how to tell a real bisht; FAQs
  that point to the landmark or exhibition page; cemid's physical state — owner question; «Arap Körfezi»; apostrophe
  style P4.1.21 = `artifact`). Note: P4.1.16 quotes «serinlikleri sayfasında» — the text reads «sayesinde» (reader's
  copying slip; rule `artifact`), but weigh its «mola yeri» point.

## Fix
1. **P4.1.3, a fault round 3 introduced**: «Bu doğa harikası eski çağlardan beri El-Ahsa halkını kendine çekmiş, bugün de
   dağı vahanın en ünlü yeri yapmıştır» — the subject is the mountain and the object is the mountain. Read the English and
   the Arabic and give the sentence one subject (the mountain, or what draws people to it if the source says so), adding
   nothing; keep BL2-refuge-r3's «kendine çek-».
2. **Proof S1 + P4.4.3** «ikinci sırayı lomi almıştır»: a race result. Use the proof's «… hurmadan sonra ikinci sırada lomi
   yer alır» or better; no measure the source lacks (the measure is a `source_defect`); amend the quoted form in
   BL2-second-crop-r2 (→ -r3 if the ruling text changes).
3. **Proof S2** «yaza özgü tadı» = "only summer", against the article's own year-round dried lomi: «vahanın yaz tadı» or
   better; amend BL2-signature.
4. **Proof S3 + P4.1.11** «Biletler de buradan alınır; mağara ziyareti de …» → drop the first «de», in every place the
   sentence prints (body, practical info, FAQ — check all).

## Check against the source, then fix only if the Turkish says what the source does not
P4.3.10 «Giriş ücretsizdir; en güzel saati akşamdır» (in the English souvenirs? if not, it is an addition — remove) ·
P4.3.14 the «İthal değil» FAQ question and its answer (workshops vs shops: follow the English) · P4.2.16 makers vs
resellers in the crafts FAQ vs body · P4.3.11 «kendi işlettiği» vs «ait» for the 112 shops (one wording, the source's) ·
P4.4.17 the FAQ drops the partner organisation (if the English FAQ has only the Chamber, it is the source's) · P4.2.4
«büyük günlerin» heading vs «törenlerin» body (one form only if the English uses one) · P4.3.9 «Bu zanaatların»
right after the coffee/spice bullet (source structure; fix the reference only if the Turkish breaks it).

## Weigh (one reader)
«El-Bin Züheyri» still read as "thousand" (P4.3.7, P4.4.6 — one reader on the -r4 form; reopen only with a form that
plainly adds no fact) · «mola yeri» for the main attraction (P4.1.16) · «ise» contrast (P4.1.16) · «Dağ aslında
dışarıdan göründüğünden daha büyüktür» (P4.1.6 — the English's?) · «Dağ tek bir kesintisiz geçitten ibaret değildir»
(P4.1.5 — the English's?) · «hissetmek» ×3 (P4.1.19) · «sahici hediye» (P4.3.1) · «rakipsiz ilk» (P4.3.3) · «kendi
yıllık sergisi» in the title (P4.4.1) · «lominin etrafında» (P4.4.10) · «Geleneksel bir yemek olan mufallak da» (P4.4.15).

This is the closing round: touch only the keys these items need; every other string stays byte-identical. Check every
edited string against the English and the Arabic sentence by sentence. Report back as in r1, with the final scores.
