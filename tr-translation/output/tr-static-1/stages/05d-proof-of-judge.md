# tr-static-1 — proofread of the judge's round-1 edits (10 keys)

Result: 0 faults. Two observations that are not faults are at the end (nothing needs to change).

## Per key

- `unesco.lead` — 0 faults.
  - «2018'de»: «sekiz» ends in a front vowel, so «-de» is right. «1563'tür»: «üç» takes «-tür», and the apostrophe is present (P8).
  - There is no comma after the subject «El-Ahsa Vahası 2018'de…» (DN16-r2). «Listesi'ne alındı» matches fact.unesco.l.
  - «{comps.length}» occurs once, before «tanesinin», and takes no suffix.
  - Faithful to the English: inscription 2018, site 1563, twelve components, N with pages, listed in order. Nothing is added or dropped.
  - «Listedeki numarası 1563'tür» says «site 1563», in line with officialLink «1563 numaralı alan».
- `unesco.official` — 0 faults.
  - «Merkezi'nin» is right (apostrophe, possessive «-nin»). Object-first order, so there is no subject comma. «bulabilirsiniz» is natural.
  - «bu alana ait sayfa» = «the site's page». «On iki» is in words.
- `unesco.seoDesc` — 0 faults.
  - «{comps.length}» and «{names}» each occur once, and {names} sits after the colon as the brief asks. «2018'de», «Listesi'ne» and «alınan» are correct, and there is no stray comma.
  - The participle is grammatical. The genitive chain «alanının … bileşeninden» is heavy but reads.
  - Faithful: 2018, twelve, N with pages, names. See observation 1 on length.
- `report.eyebrow` — 0 faults. «vermemize yardımcı olun» is correct (nominalised dative object). «us» is kept. No final stop, sentence case.
- `report.lead` — 0 faults.
  - «bilgilerin doğruluğudur» is correct. The list commas in «Hatalı bir bilgi, açılmayan bir bağlantı ya da…» are not subject commas.
  - «ederseniz bize bildirin, biz de inceleriz» is a correct clause pair. The three examples are in the English order, and «bildirin» fits «bildirim» on the other pages.
  - Only «review» is promised; the English has no «correct».
- `report.pageL` — 0 faults. A noun-phrase label with no stop. It fits «Hata bildirin» and the pre-filled page field, and it agrees with the placeholder «Sayfa bağlantısı…».
- `report.note` — 0 faults. «ve hiçbir kısmı yayımlanmaz» is grammatical (a new subject joined by «ve», with no comma). «Visit Al-Ahsa ekibine» is Latin brand plus suffix, which is fine. «Bildiriminiz» is consistent with the thanks page.
- `thanks.title` — 0 faults.
  - A comma between two complete clauses, not after a plain subject. The ur precedent also uses a comma.
  - The tab title no longer carries two dashes. «Bildiriminiz» is consistent with `report.note` and `thanks.d`.
- `thanks.d` — 0 faults.
  - «hatalı olduğu doğrulanan her bilgiyi düzeltecek» is a correct participle and renders «whatever is confirmed».
  - «Katkınız sayesinde El-Ahsa rehberi … devam eder» is grammatical, and «rehberi» is the site's own word.
  - «bildiriminizi» is the same noun as the H1. «sayesinde» is positive, which fits. No new promise.
- `ui.tmap.lead` — 0 faults.
  - Three sentences with a colon after the fragment, and no subject comma.
  - «kabartma görünümü» agrees with the 3D/2D «görünüm». «Cebel el-Kare» is byte-identical. «Gezilecek her yer … gösterilir» covers «with every attraction in place».
  - The third sentence is unchanged (source defect logged). See observation 2 on «vahanın».

## Placeholders and suffixes

- `{comps.length}` occurs exactly once in `unesco.lead` and once in `unesco.seoDesc`. `{names}` occurs once, in `unesco.seoDesc`.
- Suffixes on digits and proper nouns are right: 2018'de, 1563'tür, Listesi'ne, Merkezi'nin, UNESCO'da.
- «bildirim» appears on both report pages: `report.submit`, `report.note`, `thanks.title`, `thanks.d`. No «not» remains.

## Observations (not faults)

1. `unesco.seoDesc` is now about 121 characters before the names, so it runs past the ctx guide of 150–200 with the names added (about 220). The before-text was shorter by about 20. The names come last, so a search engine's cut only trims the list. Accept, or say so in the notes.
2. `ui.tmap.lead` «vahanın doğusundaki kumullar» supplies a reference point («of the oasis») that the English leaves implicit, and it repeats «Vahanın» from the same sentence. «The oasis in relief» sets the frame, so the reading is safe. No fix is needed. If the owner prefers a bare form, «doğu tarafındaki kumullar» is the alternative.
