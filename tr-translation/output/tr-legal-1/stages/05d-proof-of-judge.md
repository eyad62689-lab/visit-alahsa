# Proof of judge round 1, tr-legal-1

Checked clean (not listed below): contactPre ends with a colon and one space; the split decree sentence still carries (M/19), the Hijri date, the Gregorian date and the Implementing Regulation (in the sentence before); DN16-r2 (the only comma after a bare subject is «Site, içeriğini», which the ruling allows); VG2; P8 (no U+2019 anywhere); P9 and no final stop on headings; no «izleme dosyaları», «Siber Suçlarla», «denetim», «rehberlik» left; every «resmî» left on the page names a government body or authority; no silent edits (all 60 differences from stage 05 are in `changes`, before/after match).

1. **legal.sec.4.sub.2.after.0** (serious: a condition shifted). The judge joined the notification sentence into the conditional, so telling the reporter the outcome now happens only if the claim is proven.
   Printed: «Her ciddi bildirimi makul bir süre içinde inceleriz. İddianın doğru olduğu kanıtlanırsa, kaynak gösterimini düzeltmekten içeriği kaldırmaya kadar uygun önlemi alırız ve sonucu bildirimde bulunan kişiye iletiriz.»
   Fix: «Her ciddi bildirimi makul bir süre içinde inceleriz. İddianın doğru olduğu kanıtlanırsa kaynak gösterimini düzeltmekten içeriği kaldırmaya kadar uygun önlemi alırız. Sonucu da bildirimde bulunan kişiye iletiriz.» (stage 05 kept the notification as its own sentence; the comma after «kanıtlanırsa» also disagrees with the page's other -sa clauses, which have none.)
   EN: «...take the appropriate action ... where the claim is proven valid, and notify the reporter of the outcome.» AR: «متى ثبتت صحة الادعاء، مع إشعار مقدم البلاغ بالنتيجة» (the notice is a separate «مع» phrase, not part of the condition).

2. **legal.sec.2.sub.1.list.3** (scope narrowed). «Siteye erişimde yaşanan» now governs all three nouns, so «teknik arıza» and «yazılım hatası» are limited to ones occurring in access to the site.
   Printed: «Siteye erişimde yaşanan ve makul kontrolün dışında kalan her türlü kesinti, teknik arıza veya yazılım hatası.»
   Fix: «Siteye erişimdeki her türlü kesinti, teknik arıza veya yazılım hatası; yeter ki bunlar makul kontrolün dışında kalsın.» Or shorter and keeping the English ambiguity about what «beyond reasonable control» covers: «Makul kontrolün dışında kalan, siteye erişimdeki her türlü kesinti, teknik arıza veya yazılım hatası.» (the second form is acceptable only if the first is judged too heavy).
   EN: «Any interruption in access to the site, technical failures or software errors beyond reasonable control.» AR: «أي انقطاع في الوصول إلى الموقع أو أعطال تقنية أو أخطاء برمجية خارجة عن السيطرة المعقولة» (only the interruption is «in access»).

3. **legal.sec.0.lead** (grammar, and the string disagrees with LG6 as written). «önem vermek» is a light-verb compound whose noun takes no accusative; LG6 itself rules «en büyük önem», the string prints «önemi».
   Printed: «Visit Al-Ahsa olarak ziyaretçilerimizin gizliliğine en büyük önemi veriyoruz.»
   Fix: «Visit Al-Ahsa olarak ziyaretçilerimizin gizliliğine en büyük önem veriyoruz.» (keeps the ruled superlative, drops the accusative).
   EN: «we place the utmost importance on our visitors' privacy». AR: «نولي ... خصوصية زوارنا أهمية قصوى».

4. **legal.sec.2.sub.0.before.0** (nuance: «general guidance» became a hedge). «genel olarak» before a verb reads «generally / for the most part», not «general in kind»; the English is a type of guidance, not a frequency.
   Printed: «Sitedeki bilgiler genel olarak yol göstermek amacıyla sunulur.»
   Fix: «Sitedeki bilgiler genel nitelikte yol gösterici bilgi olarak sunulur.» (keeps LG6 «yol gösterici»).
   EN: «is offered as general guidance». AR: «على سبيل الإرشاد العام».

5. **legal.contactPre** (coordination reads as «A için ya da B, C için»; the third purpose looks attached to the second instead of being the third alternative).
   Printed: «Bu politikalarla ilgili her türlü sorunuz için ya da kişisel verilerinize ilişkin haklarınızı kullanmak, bir hak ihlalini veya kurallara aykırı bir bağlantıyı bildirmek için sitenin kendi e-posta adresi üzerinden bize ulaşmanızdan memnuniyet duyarız: »
   Fix: «Bu politikalarla ilgili her türlü sorunuz, kişisel verilerinize ilişkin haklarınızı kullanma talebiniz ya da bir hak ihlalini veya kurallara aykırı bir bağlantıyı bildirmeniz için sitenin kendi e-posta adresi üzerinden bize ulaşmanızdan memnuniyet duyarız: » (colon and one space kept; the comma after «sorunuz» is a list comma, not a subject comma). Simpler: put each purpose in the same form («sorunuz için», «haklarınızı kullanmak için», «... bildirmek için») joined by «,» and «ya da».
   EN: «For any enquiry ..., to exercise your rights ..., or to report an infringement ... or a non-compliant link». AR: «لأي استفسار ... أو لممارسة ... أو للإبلاغ عن ...».

6. **legal.intro.0** (the decree sentence, low). A bare sentence-initial «Kanun» right after a sentence that names both the Kanun and the Yönetmelik can be read as the Turkish law or as either text; the facts are all present, but the subject is ambiguous.
   Printed: «Kanun (M/19) sayılı Kraliyet Kararnamesi ile yayımlandı.»
   Fix: «Bu kanun (M/19) sayılı Kraliyet Kararnamesi ile yayımlandı.» (rest of the judge's sentence pair unchanged).
   EN: «the Personal Data Protection Law issued by Royal Decree No. (M/19) ... and its Implementing Regulation» (the decree belongs to the law). AR: same, «الصادر بالمرسوم الملكي رقم (م/19) ... ولائحته التنفيذية».

7. **legal.sec.3.sub.1.list.1** (one term per concept, plus an ambiguous participle). «source of access» is «siteye hangi kaynaktan erişildiği» in sec.0.sub.0.list.0 but «siteye erişilen kaynaklar» here; the second can also be read as «the sources that are accessed on the site».
   Printed: «...gezinme süresi ve siteye erişilen kaynaklar.»
   Fix: «...gezinme süresi ve siteye geliş kaynakları.» and, for the same concept, sec.0.sub.0.list.0 «ve siteye geliş kaynağı» (or both «siteye erişim kaynakları», the stage 05 form, which matched «مصادر الوصول»).
   EN: «sources of access». AR: «مصادر الوصول».

8. **legal.sec.2.sub.0.before.0 / legal.sec.2.sub.2.before.0** (one term per concept). The same verb «verify» and noun «verification» are «teyit etmelerini» in sub.0 and «bağımsız bir doğrulama» in sub.2. The tm (M9-print-note) uses «teyit» for «verify»; the termbase and tm elsewhere use «doğrula-» for the same sense, so one of the two must be chosen for this page.
   Printed: «...doğrudan resmî kurumlardan veya ... işletmecilerinden teyit etmelerini daima öneririz.» / «...gerekli özeni kendisi göstermeli ve bağımsız bir doğrulama yapmalıdır.»
   Fix: use «doğrulamalarını» in sub.0 («...bu bilgileri doğrudan resmî kurumlardan veya ... işletmecilerinden doğrulamalarını daima öneririz.»), or «bağımsız bir teyit» in sub.2; the judge's LG list does not decide it.
   EN: «verify it directly» / «independent verification». AR: «التحقق منها مباشرة» / «التحقق المستقل».

9. **legal.sec.1.sub.3.list.0** (reading chosen where the sources are ambiguous, low). The judge moved «ticari amaçla» to bind only «yeniden yayımlamak», so copying is barred for every purpose; stage 05 bound it to both verbs. The Arabic has no comma between the two verbs («نسخ المحتوى أو الصور أو إعادة نشرها كليًا أو جزئيًا لأغراض تجارية»), so the arbiter's chain is read more naturally with the qualifiers on both; the English comma favours the judge. Sec.1.sub.1 bars copying without permission anyway, so the effect is small, but it is a decision made in the translation, not recorded as one.
   Printed: «Önceden yazılı izin almadan içeriği veya görselleri kopyalamak ya da bunları ticari amaçla tamamen veya kısmen yeniden yayımlamak.»
   Fix: either keep it and record in `source_defects` that the Arabic and English differ on the reach of «for commercial purposes» (the judge says it is logged; confirm the owner_question text names the Arabic), or return to the stage 05 order if the owner confirms both verbs.
   EN: «Copying content or images, or republishing them in whole or in part for commercial purposes without prior written permission.» AR as above.

TOTAL: 9 findings
