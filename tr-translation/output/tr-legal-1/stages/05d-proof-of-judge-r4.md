# 05d proof of judge r4 (tr-legal-1)

Checks run (script: va-scratch/tr-r1/p4.mjs, p4c.mjs):
- Differing keys r3 vs r4 `strings`: exactly legal.intro.0, legal.contactPre, legal.sec.2.sub.1.before.0, legal.sec.2.sub.1.list.0, legal.sec.2.sub.1.list.3. `ui_changes` identical (JSON equal).
- intro.0: decree (M/19), «Hicri 9 Safer 1443 (16 Eylül 2021)» (9/2/1443 = 9 Safar, matches AR/EN; "Hicri 9 Safer" form is the batch-wide form, 28 other uses), the Law and its Implementing Regulation all present; "(M/19) sayılı ve ... tarihli Kraliyet Kararnamesi ile yayımlanan ... Kanunu ve bu kanunun Uygulama Yönetmeliği" is unambiguous; apostrophes/suffixes correct.
- sec.2.sub.1: lead-in «Aşağıdakiler hiçbir şekilde Visit Al-Ahsa'nın ve siteyi işletenlerin sorumluluğunda değildir:» reads grammatically before all four items (list.0-3 are noun phrases; plural subject + "değildir" fine). "hiçbir şekilde" corresponds to EN "any liability"/AR «أي مسؤولية»; not a material emphasis addition. list.3: only "kesinti" carries «Siteye erişimdeki»; "makul ölçüde önlenemeyen" scopes over "teknik arızalar veya yazılım hataları" (ile-split), matching the brief. list.0: "ile bunlardan doğan diğer zararlar" renders «تبعية»/consequential; acceptable, no added head of damage.
- contactPre: ends with ": " (colon + exactly one space, regex verified); "tüm sorularınız" grammatical.

No real faults found.

TOTAL: 0 findings
