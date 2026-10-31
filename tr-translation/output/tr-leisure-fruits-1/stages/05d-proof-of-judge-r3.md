# Independent proof of the judge's round-3 (closing) edits — batch `tr-leisure-fruits-1`

## Scope

Fresh-eye check (role file `prompts/05-proofreader.md`) of the 12 `changes` of `stages/07-judge.r3.json` against `07-judge.r2.json`, the rulings F30-r3 … F46-r3, `pack.json` (`en`, `ar`, `ctx`), `ref.json`, the termbase and the TM. Nothing was edited; the strings of `07-judge.r3.json` are the object of the check.

**Result: 9 SOUND · 0 FAULT · 3 NOTE**

## Per key

1. **fv.heroSum — SOUND.** «kışın sidr meyvesi (kanar)» keeps the English «winter kanar»; the descriptor is the termbase's own gloss («sidr ağacının meyvesi») shortened to a compound, nothing added; «kanar» stays byte-identical inside the bracket; the parallel with «yazın altın sarısı rutab (taze, yumuşak evredeki hurma)» is kept; «dünyanın en büyük vahası» and «misket limonu» untouched. The card title «El-Ahsa kanarı (Nabk)» and the card body («sidr ağacında yetişir») agree with the hero: the reader meets fruit, then word, then «Nabk» only as the English's second name. The gloss of the stage word is given once, here.
2. **fv.description — NOTE.** Content SOUND: same descriptor-first order as the hero, «hurma ve rutab», «misket limonu», «sarı kavun» (the ctx's «watermelon» is a recorded source defect), no final stop problem (a sentence). Length: 165 characters (r2: 150, English: 147). The site's snippet limit is 160 (`SEO_LIMITS.descMax`, C72 guards ar/en only), so a search result may cut the last words. The judge recorded the growth openly. Optional fix if the owner wants it inside 160: end with «Resmî kaynaklarla doğrulanmıştır.» (155 characters in total) instead of «Bilgiler resmî kaynaklardan doğrulanmıştır.»; not required.
3. **fv.stats.1.l — SOUND.** «diğer meyve ağacı» under «400 bin», parallel with «vahadaki hurma ağacı» above it; singular after the numeral; lower case, no stop; «other than the palms» is what «alongside the palms» counts and the first stat gives the palm. No fact added.
4. **fg.0.intro — SOUND.** «El-Ahsa Hurma ve Hurma Ağacı Merkezi» follows the Guinness listing order (Date and Palm Centre), «Hurma Ağacı» is the palm word of A12-Hurma (termbase «Hurma Ağacı Müzesi»), the city prefix matches «El-Ahsa Ticaret Odası»/«El-Ahsa Geliştirme Kurumu» (tm); the Arabic (مركز النخيل والتمور بالأحساء) is covered. Unattested and marked so. Numbers as the English (100.000, 120.000, 200.000, 2021, 127, Ekim 2024); suffixes U+0027 («2021'de», «127'den», «2024'te»); «Suudi Basın Ajansı (SPA)» and the rest of the paragraph untouched.
5. **fg.0.f1.pre — SOUND.** «alt kısmı altın sarısıdır» for «golden-yellow base» (AR قاعدة): no foot; «tabanı» is gone. The single connector «Bu yüzden saklanmaya ve dondurulmaya uygundur, yıl boyu yenebilir.» keeps both English facts (storing, freezing, year-round eating); «dibs» appears once, glossed «Hurma pekmezi (dibs)».
6. **fg.1.f0.name — SOUND.** «El-Ahsa misket limonu (ya da “Bin Züheyri”)»: the name «Züheyri» agrees with the termbase stem (Ez-Züheyri); quotes “…”; «ya da» marks the second name the English bracket implies; sentence case, no final stop. Alt text «Yeşil El-Ahsa misket limonları ve kesilmiş yarım meyve» uses the same «El-Ahsa misket limonu» stem; the table cell prints the same string (one key). Side remark, no action: the three card titles with a bracket now use three conventions (lime «ya da “…”», pomegranate «(“Suvari”)», kanar «(Nabk)»); each is justified by its source (collision with «bin» for the lime; the pomegranate bracket names its largest specimens, not a second name).
7. **fg.1.f0.pre — NOTE.** SOUND on every ruled point: the cemid sentence names the product first and keeps the P7 text («güneşte kurutulup bekletilmiş misket limonu suyu», no «kara»); «cemid» once; the exhibition sentence «Sergiyi El-Ahsa Ticaret Odası ile El-Ahsa Geliştirme Kurumu birlikte düzenler.» takes no suffix and no apostrophe on the institutions (tm form «El-Ahsa Geliştirme Kurumu»); «iş birliği içinde» is gone; numbers 100.000 and 25–30 as the English; «Lomi Sergisi'yle» keeps U+0027 on a title. NOTE: «hurmadan sonra El-Ahsa'nın ikinci ürünüdür» follows the English «second crop after dates» as ruled (F41-r3); «ikinci ürün» is also an agricultural term for a second sowing in the same field, but «hurmadan sonra» and the intro («en önemli ürünü hurmadır») fix the reading; no change needed.
8. **fg.2.f0.pre — SOUND.** The card opens with the heading as subject (no «Bu kavun»); «Bu seçim» points at the sentence before it («seçip saklamasıyla»); «kendine özgü sarı rengini kazandırmış, … dayanıklılık vermiştir» carries both English facts (colour; tolerance of heat and scarce water) with the stray «da» gone; the rest of the card is unchanged.
9. **fg.2.f2.post — SOUND.** «meyve eti yapışkanlığıyla ünlüdür» keeps «proverbial» as being known for it without praise or a calque. The sentence with its neighbours is grammatical: «…bilimsel adı » + «Cordia myxa» + « olup sebestan, muheyt ve hambu adlarıyla da bilinir.» (keepSpace edges intact: pre ends with a space, post starts with one; the Latin name is byte-identical to the English).
10. **fg.2.f3.pre — SOUND.** Two sentences, one claim each; «Onlara göre» carries the English attribution («according to farmers and vendors quoted in the local press») into the extinction claim; «bu üzüm çeşidi» keeps the variety apart from «iki çeşidi» (red/green); «Ancak» is dropped because the sentence before gives no contrast. Both facts and the cause (water scarcity, shrinking farmland) kept.
11. **fg.2.f4.pre — SOUND.** «bugün nadirdir» renders «finding it today is rare» without the stronger «çok az rastlanır»; the hedge «birkaçı gibi» and the card's subject «bunun da» kept; «öyle ki olgunlaşınca çatlar» is the English's causal shape (F38-r3).
12. **fg.3.f1.pre — NOTE.** «Vaha, bu meyve için hâlâ verimli bir yerdir.» replaces the calque «verimli yurdudur»; «hâlâ» keeps «remains». «Çarşılarda bu meyveyi satın almanın kendine özgü halk ezgileri vardır.» matches «buying it in the souqs comes with folk chants of its own» without adding an act; «Kur'an-ı Kerim'de anılan sidr ağacında» keeps only the mention (the English has no «blessed» there) and U+0027. NOTE (optional): the comma after the one-word subject «Vaha,» separates subject from predicate; «Vaha bu meyve için hâlâ verimli bir yerdir.» is the strict TDK form; the comma is also defensible as setting off the subject before an adverbial phrase.

### Checklist of the proofreader role on the 12 strings

| # | Item | Result |
|---|---|---|
| 1 | Letters (ç ğ ı İ ö ş ü); I/İ, ı/I case errors | PASS — none found |
| 2 | Name forms byte-identical (Züheyri, Şişi/Halas context, Kur'an-ı Kerim, El-Ahsa, kanar) | PASS |
| 3 | Suffix vowel + apostrophe U+0027 only on proper names | PASS (26 apostrophes in the 114 strings, all U+0027; none on common nouns, none on the institution names of the exhibition sentence) |
| 4 | Address (siz) | PASS — no second person in these strings |
| 5 | Headings/labels: sentence case, no final stop (fg.1.f0.name, fv.stats.1.l) | PASS |
| 6 | Termbase compliance (kanar, misket limonu, Hurma Ağacı, El-Ahsa prefix rule, no «kara») | PASS |
| 7 | Punctuation: “…” only, no «», no straight quote, en dash in 25–30, no space before punctuation | PASS |
| 8 | Numbers (Latin digits, 100.000, 200.000, 25–30, 2021, 127, Ekim 2024) | PASS — digits equal the English in all 12 afters |
| 9 | Anglicisms/Ottomanisms/bureaucratic chains | PASS — «iş birliği içinde», «Bu sayede», «ikinci sırada gelen», «verimli yurdu» removed |
| 10 | Glossing once per page (sidr meyvesi (kanar) in hero; cemid once; dibs once) | PASS |
| 11 | Structure (keepSpace edges, no links, alts without stop) | PASS |

## Consistency and script checks

Script: node, ASCII-only, reads `07-judge.r3.json`, `07-judge.r2.json`, `pack.json`; no Turkish typed in a shell (Turkish patterns by \u escapes).

- 114 keys in r3, r2 and `pack.json`; identical key sets.
- `changes`: 12 entries, 12 distinct keys; every `after` equals `strings[key]`; every `before` equals the r2 string; no no-op entry.
- Diff r2 -> r3 over all 114 strings: exactly the 12 changed keys; none outside `changes`; no `changes` key that does not differ.
- Straight double quote: 0. U+2019 and other curly single quotes: 0. U+00A0: 0. «» guillemets: 0. Double spaces: 0. Space before punctuation: 0. Edge spaces: only on the 4 keepSpace keys (`fv.countPrefix` trailing; `fg.2.f2.pre` trailing; `fg.2.f2.post` leading; `fg.2.f2.sci` none). Control whitespace: 0. Arabic letters in Turkish: 0. NFC: all 114 pass. Apostrophes: 26, all U+0027.
- `tm_pairs`: 114 entries covering 114 distinct fields; every `tr` equals `strings[field]`; every `en` equals the pack English.
- Absent: «Zamli» 0, «delici» 0, «Pirinç bir kasede» 0, «iş birliği içinde» 0, «örnek gösterilir» 0, «tabanı» 0, «yurdu» 0, «Bu sayede» 0, «ikinci sırada» 0, «kara» 0. «Pirinç metalinden bir kasede» stays once, in `fg.0.f2.alt` (F14-r2/F46-r3).
- «dibs»: exactly once (`fg.0.f1.pre`).
- `fv.description` length: 165 characters (r2: 150; English: 147; site descMax for ar/en: 160) — see NOTE under key 2.
- No label/pill/alt/head ends with a final stop (checked on `.name .alt .k .season .l .short` keys and the chip/tag/head keys).
- Digits of the 12 afters equal the English digit sequence (thousand separators removed): intro 100000/120000/2024/200000/2021/127; lime 100000/25/30; other keys carry no digits.
- Cross-string agreement: hero and description both read «sidr meyvesi (kanar)»; the card title is «El-Ahsa kanarı (Nabk)» and the alt «Kanar meyveleri» (unchanged) with the termbase word «kanar» unchanged; lime name, alt and table cell use one stem «El-Ahsa misket limonu»; `fg.2.f2.pre`/`sci`/`post` read as one sentence with «Cordia myxa».

Not verified: the rendered pages (no browser run), a fourth blind reader on these 12 edits, and the unattested institution name against a Turkish source (the judge marked it unattested).
