# Judge brief — batch `tr-blog-3`, round 4 (narrow fix)

Same paths, rules, units and output shape as `JUDGE-BRIEF-r1.md`. Input: your `stages\07-judge.r3.json`; write
`stages\07-judge.r4.json` (round 4, `changes` = every edit vs r3), checker with `--prev` set to 07-judge.r3.json.

Evidence:
- the proof of round 3 `BATCH\stages\05d-proof-of-judge-r3.md` (0 serious, 7 minor — apply or rule each);
- the fourth blind reader `BATCH\stages\06-blind-reader.on-r3.md` (83 items: page 1 = lime 39, page 2 = Tarafa 44; cite
  P4.<page>.<n>). Rule all of them in one line each; nearly all repeat classes you have ruled (cite the ruling). The
  fourth reader read your r3 edits without stumbling on «Hecer şehri», «kasabetü Hecer», «hevdeç» or «ibn»
  (P4.2.8, P4.2.15, P4.2.33) — those rulings stand.

## Fix (proof r3)
1. BL3-quote-suffix in every string: «“badzehr”dir» in `hasawi-lomi-history.body` and `faq.3.a` (and any other suffix
   on a closing quote in the 34 strings — search).
2. The two «ayrıca»: the English has one «also» (al-Azhari); drop the one you added.
3. «onun zamanında»: Turkish «onun» leans to the nearest referent (the builder). Find a form that leaves it as open as
   «in his own time» / «في زمنه» (e.g. a construction where «kendi zamanında» has Yaqut's verb and the builder both in
   reach), or — if none reads naturally — keep it and record in BL3-his-time that the lean is accepted and why. Add no
   name.
4. «Havle'nin yurdundan kalıntılar»: «yurt» = homeland; the English «ruins of a camp». Pick a word for a pre-Islamic
   encampment that none of the four readers misread («konak yeri» → mansion, «kamp yeri» → campsite, «oba»?): weigh
   «obasının kalıntıları» / «konakladığı yerin kalıntıları»; record.
5. «onuruna yediremedi» → the nobility of «held himself above» / «تكرّم عن قتله» (e.g. «kendine yakıştıramadı»).
6. «develer üzerindeki örtülü oturakları»: «örtülü» is not in the English «camel litters»; «oturak» also = a potty /
   child's seat. Use the English's sense with no addition (e.g. «develerin sırtındaki kadın mahfeleri», «deve
   mahfelleri» — verify the Turkish word).
7. `faq.1.q` bare «Hecer»: apply BL3-hecer-first per unit (the FAQ is read alone in search results) or record why not.

## Weigh (one reader)
P4.2.24 «Tarafe'yi öldüren ise Abdülkays kabilesinden bir adamdı» — the «ise» suggests a different person from the new
governor: does the English? · P4.2.43 the grave on «a plot» vs «does not fix the place» (the English's?) · P4.2.37
«geçip gitti» (the English «it has passed») · anything else the fourth reader names as a misparse of the Turkish.

This is the closing narrow round: touch only the keys these items need; every other string stays byte-identical.
Never retype an Arabic line; hrefs and structure as the checker holds them. Check every edited string against the
English and the Arabic sentence by sentence. Report back as in r1, with the final scores.
