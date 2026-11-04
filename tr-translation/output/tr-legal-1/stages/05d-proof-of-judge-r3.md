# Independent proof of the judge's round 3 (`07-judge.r3.json`), batch tr-legal-1

Method: all 16 round-3 `changes` read against `pack.json` en/ar and against r2 (`before`); the 117 `strings` searched for «resmî» (no un-circumflexed «resmi» remains), «kendi» (only Google's own policy, correct), «izinsiz» (none left; «yetkisiz» in sec.0.sub.4 and sec.1.sub.3.list.2), «ifşa», «tanımlama» (none), «çerez» (one term), «Hicri», «üçüncü». LG1-r3 / LG2 / LG3 / LG7 / DN16-r2 / A2-Hijri-date / LG8 read in the termbase `_meta`.

Checked and correct (not findings):
- `legal.intro.0`: «Visit Al-Ahsa (visit-alahsa.com) sitesine hoş geldiniz» is grammatical (brand as a compound with «sitesi», dative on «site»); no fact moved; decree sentence unchanged (9 Safer 1443 = 16 Eylül 2021, LG8).
- `legal.closing.0`: comma removal is only punctuation; matches intro.1, sec.0.sub.5, sec.4.sub.2.after.0.
- `legal.contactPre`: «resmî» restored; ends with colon and one space; the other five «resmî» keys (sec.0.sub.3.after.0, sec.3.sub.2.list.1, sec.4.sub.2.before.0, sec.4.sub.3.before.0, sec.5.sub.1.before.0) are all present and agree with EN «official» / AR «الرسمي(ة)».
- `legal.sec.0.sub.1.list.1`, `sec.0.sub.2.before.0` (actor «Site», comma under DN16-r2/LG7), `sec.0.sub.4.before.0` (one «yetkisiz» for the series, as in the Arabic where «غير المصرح به» also stands before the first noun only), `sec.1.sub.0.before.0` («ilgi duyanlar»), `sec.3.sub.1.after.0` («ziyaretçileri hedeflemeye yönelik»), `sec.3.sub.2.list.1` (Google's official add-on), `sec.3.sub.2.list.2` (gizli pencere / özel gezinme modu): faithful, no suffix, apostrophe, agreement or spelling error found.
- Footer `foot.l.privacy` «Politikalar ve koşullar» is the short form of the H1 «Politikalar ve yasal koşullar» (as ar «السياسات والشروط» / en «Policies & Terms»); fits.
- Terminology across 117 strings: «çerez» only; «iletişim kanalları» / «e-posta adresi» only; Saudi law names carry the country in all five occurrences (LG3); no residual «kendi» for the site's channels.

Findings:

1. **`legal.contactPre` — number agreement: «her türlü sorularınız».**
   Printed: «Bu politikalarla ilgili her türlü sorularınız, kişisel verilerinize ilişkin haklarınızı kullanma talebiniz ya da bir hak ihlali veya kurallara aykırı bir bağlantı bildiriminiz için sitenin resmî e-posta adresi üzerinden bize ulaşmanızdan memnuniyet duyarız: »
   Problem: «her türlü» takes a singular noun («her türlü soru»); with the plural possessive «sorularınız» the quantifier and the plural clash. The judge replaced «sorunuz» (misread as «sorun-unuz») with the plural but kept «her türlü», so a new agreement fault appears. The «any» of «For any enquiry» is the only thing «her türlü» carries.
   Fix: «Bu politikalarla ilgili tüm sorularınız, kişisel verilerinize ilişkin haklarınızı kullanma talebiniz ya da …» («tüm» + plural possessive is grammatical and keeps «any»), rest unchanged, colon and one space kept.
   Evidence: EN «For any enquiry regarding these policies, to exercise your rights … or to report an infringement of rights or a non-compliant link, we welcome hearing from you through the site's official email: »; AR «لأي استفسار يتعلق بهذه السياسات، … يسعدنا تواصلكم عبر البريد الرسمي للموقع: ».

2. **`legal.sec.2.sub.1.list.3` — the control clause may not govern «yazılım hatası», and «ile … veya» leaves the grouping open.**
   Printed: «Siteye erişimdeki her türlü kesinti ile makul bir kontrolle önlenemeyen teknik arıza veya yazılım hatası.»
   Problem: (a) the access scope is now right (only the interruption has «siteye erişimdeki»). But (b) «makul bir kontrolle önlenemeyen» sits directly before «teknik arıza» and a Turkish reader can attach it to that noun alone, leaving «yazılım hatası» unqualified; the English «beyond reasonable control» governs both «technical failures» and «software errors» (the Arabic «خارجة» agrees with the two plural non-human nouns). (c) «kesinti ile … arıza veya hatası» mixes «ile» and «veya», so «(kesinti ile arıza) veya hata» is also a possible grouping. The judge's why-note claims the clause "stands before the two nouns it follows in the English" but the Turkish form does not make the two-noun scope explicit.
   Fix: put the two qualified items in parallel plurals so the modifier visibly spans both: «Siteye erişimdeki her türlü kesinti ile makul bir kontrolle önlenemeyen teknik arızalar veya yazılım hataları.» If a stronger separator is wanted: «Siteye erişimdeki her türlü kesinti; makul bir kontrolle önlenemeyen teknik arızalar veya yazılım hataları.» (list items elsewhere on the page do use semicolons inside an item.)
   Evidence: EN «Any interruption in access to the site, technical failures or software errors beyond reasonable control.»; AR «أي انقطاع في الوصول إلى الموقع أو أعطال تقنية أو أخطاء برمجية خارجة عن السيطرة المعقولة.»

3. **`legal.sec.2.sub.1.list.0` — «consequential» is no longer printed (residual omission, owner-recorded).**
   Printed: «Sitenin kullanımından veya sitedeki bilgilere güvenilmesinden doğan her türlü doğrudan veya dolaylı zarar.»
   Problem: the source has three heads of damage («direct, indirect or consequential» / «مباشرة أو غير مباشرة أو تبعية»); the Turkish prints two. The judge records that «dolaylı zarar» covers the third and puts the choice to the owner, which is honest, but in a liability exclusion that may not be narrowed or reduced, the text as printed drops a named head, and the brief's rule is "nothing is summarised". The earlier «sonuç olarak ortaya çıkan» was rejected as heavy and «tali» as unattested, so I have no attested third term to offer; this stays a finding only so that the printed omission is not mistaken for an equivalence.
   Fix: keep the owner question open and, if the owner does not approve the merge, print the three heads with «sonuçsal zarar» («doğrudan, dolaylı veya sonuçsal zarar»), which is short, lay-readable and not a calque; otherwise leave as is. Not verified online.
   Evidence: EN «Any direct, indirect or consequential damages»; AR «أي أضرار مباشرة أو غير مباشرة أو تبعية».

TOTAL: 3 findings
