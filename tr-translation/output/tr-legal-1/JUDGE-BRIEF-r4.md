# Judge brief — batch `tr-legal-1`, round 4 (narrow fix)

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r3.json` (carry its
`ui_changes` over unchanged); write `stages\07-judge.r4.json` (round 4, `changes` = every edit vs r3), checker with
`--prev` set to 07-judge.r3.json. **Touch only the keys named below**; every other string stays byte-identical.

Evidence: the final proof `BATCH\stages\05d-proof-of-judge-r3.md` (3 findings, S<n>) and the fourth blind reader
`BATCH\stages\06-blind-reader.on-r3.md` (57 items, P4.<n>; rule all 57 in one line each — most repeat items you
have already classed).

## Fix
1. **The decree clause** (`legal.intro.0`) — four readers now (P1.5, P2.6, P3.4, P4.2): the threshold is passed.
   Recast in the Turkish legal word order the readers name, number and date before the noun: «… (M/19) sayılı ve
   Hicri 9 Safer 1443 (16 Eylül 2021) tarihli Kraliyet Kararnamesi ile yayımlanan Suudi Arabistan Kişisel Verilerin
   Korunması Kanunu …» — or two sentences in that order — so that «Bu kanun» is not ambiguous between the law and
   its implementing regulation. Keep A2-Hijri-date / LG8 and every element (decree number, both dates, the law, its
   implementing regulation). Supersede LG8's clause shape if you change it.
2. **«beyond reasonable control»** (`legal.sec.2.sub.1.list.3`) — three readers on the calque (P1.45, P2.57, P4.34)
   plus S1 (the hedge reads on «teknik arıza» alone). Write the item so the hedge governs both faults and errors
   and only the interruption is «in access», in a Turkish that does not calque the English (e.g. «… kesintiler ile
   elimizde olmayan nedenlerle ortaya çıkan teknik arızalar ve yazılım hataları» — weigh «elimizde olmayan
   nedenlerle» / «makul ölçüde önlenemeyen» against the English «beyond reasonable control» and the Arabic).
3. **The liability list after its lead-in** (`legal.sec.2.sub.1.before.0` and its four items) — P1.41 and P4.32: two
   readers read the bare nouns after «aşağıdaki konularda hiçbir sorumluluk taşımaz:» as ungrammatical. Choose a
   lead-in that takes nominative list items in Turkish (e.g. «… aşağıdakilerden sorumlu tutulamaz:» with ablative
   items, or «Aşağıdakiler … sorumluluğu dışındadır:») and make the four items fit it.
4. **S3 — the third head of damage** (`legal.sec.2.sub.1.list.0`): the English and Arabic («تبعية») have three heads
   (direct, indirect, consequential) in a liability exclusion; r3 printed two. A liability head is not dropped from an
   owner-approved text. Render the third head descriptively in plain Turkish without the calques readers rejected
   («sonuçsal», «sonuç olarak ortaya çıkan»): e.g. «doğrudan veya dolaylı zararlar ile bunlardan doğan diğer
   zararlar», or the attested Turkish phrasing you find. Withdraw owner question 3 (a wording choice is the line's
   to make, not the owner's).
5. **`legal.contactPre`** — S2 and P4.54: «her türlü sorularınız» → singular («her türlü sorunuz») or «tüm
   sorularınız»; keep the final colon and one space; «resmî e-posta adresi» stays.

Everything else is ruled, not edited. Report back as in r1, with the final scores.
