# Batch `tr-attr-10` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The tenth Turkish attractions batch, after `tr-attr-1` to `tr-attr-9` (all 90/100) — a museum, two souqs, a heritage
village and a pottery house: **najim-museum** (Walid Al-Najim Museum), **qaisariyah** (Qaisariyah Souq),
**ardh-alhadarat** (Land of Civilisations), **craftsmen-souq** (Craftsmen Souq), **duqat-algharash** (Dougha
Al-Gharash Pottery) — 65 strings in `pack.json`: title, summary, body (plain text), area, visit-card rows (Hours;
Fees where the English has one), `bestTime` on qaisariyah, and **FAQ** on qaisariyah (5), ardh-alhadarat (4) and
craftsmen-souq (4). The name rulings in `_meta.batch_rulings` for `tr-ui-1`, `tr-attr-1` … `tr-attr-9` bind.

**Names already ruled — byte-binding, read them in `ref.json` `terms`/`places` and in the termbase:**
«El-Kaysariye Çarşısı» (the title of qaisariyah: termbase pair Qaisariyah Souq, suffix ı — Çarşısı'nın; the
Kayseri echo is accepted, A1), «Medeniyetler Diyarı» (Land of Civilisations, suffix ı — Diyarı'nda; the calibration
quoted it “…” inside running text — as a page title it is bare; stage 4 and the judge rule the quotes in this
page's own body and FAQ where the English has none), «Duğa el-Garaş Çömlek Atölyesi» (the title of
duqat-algharash: termbase pair Dougha Al-Gharash Pottery, apostrophe as a place — Atölyesi'nin; a reader once took
«Duğa» for a typo of «Doğa» and it was not respelt), «Cebel el-Kare» (places, byte-binding) and «El-Kare» for the
village (termbase; «El-Kare köyü»), «El-Umran» always with «şehri/şehrinde» (A7), «El-Ahsa Belediyesi» (no
apostrophe, institution), «Google Haritalar» (frame), «Arap Körfezi» (P5), «meclis salonu» for majlis (A2; A9
raised the parliament first-read but the ruling stands — never bare «meclis»), «Güney er-Rifa mahallesi» (A4; this
batch's «Al-Rifaa district» is the plain one — propose «Er-Rifa mahallesi»), «Suudi Arabistan» for "the Kingdom"
(A9 precedent: «Suudi Arabistan'ın en eski okul müfredatları»), the country before a Saudi ministry or body (A6:
«Suudi Arabistan'ın …»; precedent «Suudi Arabistan'ın Tarım Bakanlığı»; title form «Çevre, Su ve Tarım
Bakanlığı» attested). **Not** «Suudi Turizm Otoritesi» for a lower-case "tourism and heritage authority" in the
English (A9-saudi-bodies: descriptive, lower case).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Müze, …», «Çarşı, …») when the previous sentence's subject was something else; after a
   genitive or place chain, end the sentence and name the place again.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the
   English and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and
   for flagging.
3. **Who does the verb.** Name the place with a locative («çarşıda», «müzede») or make the people the subject.
   Words readers misread before: «sınırlıdır», «eski» before a name, «simge», «diğer» before a list, bare
   «meclis», a comma between a participle subject and its predicate («Müzeyi farklı kılan, …» — use «… şey»),
   «izlemek» for "tracing" (use «izini sürmek»).

**This batch's own traps:**
- **qaisariyah.body has a sub-heading**: the English body ends with a paragraph `## Qaisariyah Souq hours` and one
  paragraph under it. Keep exactly that structure: a paragraph starting with `## ` + the Turkish heading (sentence
  case; the souq's name byte-identical to the title), a blank line, then the paragraph. The other bodies have none.
- **Craft words, plain Turkish**: the Hasawi bisht (the cloak) — Turkish has no attested «bişt»; build on the
  Hasawi rule (El-Ahsa + noun) and propose the noun with a source or mark it unattested; "zari thread washed with
  gold or silver" — Turkish «sırma» is the native word for gold/silver embroidery thread (stage 4 checks TDK);
  "tannour bakery" → «tandır fırını» (TDK tandır); "dougha" as a common noun in the body ("the dougha is today a
  tourist stop") — the title carries «Duğa …»; in the body say what it is at first mention once («Duğa el-Garaş …,
  … bir çömlek atölyesi») and do not invent a Turkish generic for «duğa»; "the wheel" (potter's) → «çömlekçi
  çarkı»; "kiln" → «fırın». "handicrafts academy" / "craftspeople" — plain current words («el sanatları
  akademisi», «zanaatkârlar»/«ustalar»).
- **UNESCO**: no Turkish UNESCO site is a source for *facts*; the name of the programme ("UNESCO Creative Cities
  Network") is a proper name — stage 4 attests its Turkish form (tr.wikipedia / AA; Turkish cities are members,
  so the press form exists) or marks it unattested.
- **Hedges the English carries are kept**: "one of the oldest and most storied", "press accounts record",
  "have praised it as", "one of the region's most notable", "more than six hundred years", "some 400 square
  metres". Add no superlative the English lacks; «eşsiz»/«büyüleyici» banned.
- **Visit-card values and FAQ answers**: P10 clock times; «24.00» for midnight (P10); «08.00–12.00 ve 15.30–22.00
  (cuma yalnızca akşam)» shape for qaisariyah (the English has no "Daily" there — add none; an earlier draft of
  this brief wrongly wrote «Her gün», fenced out in stage 4); craftsmen «Her gün 07.30–24.00 (Pazar ve Pazartesi
  07.00'den · Cuma 14.30'dan)» shape; FAQ answers stand on their own with the same facts; the Google Maps
  attribution in craftsmen FAQ 1 is kept as the English has it. **tm pairs reused verbatim** where the English
  recurs: «Her gün 08.00–23.00 (tatillerde uzatılabilir)», «Her gün 08.00'den 23.00'e kadar açıktır; tatillerde
  saatler uzatılabilir.», «15 Suudi riyali (SAR)», «Giriş ücretsiz», «Ziyaret saatleri», «Ücretler». "Evenings,
  by prior arrangement" builds on A9-hours-evenings («Akşamları, önceden randevuyla»). SAR: the first mention on a
  card is «… Suudi riyali (SAR)» (A7), later «50 SAR»; the calibration page's own pair («Yetişkinler için 50 SAR —
  …») predates A7 — do not copy it for this page's differently worded card; the judge records the tension.
- **Names of people**: from the Arabic spelling (Velid en-Nacim? — rule it), given name + family name at first
  body mention; «El-Garaş ailesi» for the Al-Gharash family (from the ruled «el-Garaş»).

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a10` (branch `i18n/tr-attr-10`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-10`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a10 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-10 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings — **P3**: generics follow title_en and are
   translated; **P10**: «16.00–24.00», days «Pazar–Perşembe») and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-9`). **A ruling supersedes any role-file sentence that still calls the item open.**
   `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, `arabic_body`); `ctx`
   says where it renders; `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`:
   approved frame (`ui`), calibration page, `places` (**byte-binding**), termbase entries present in the
   sources, `tm`.
5. Site rules: invent nothing (opening dates, equipment, prices, superlatives the English does not have);
   Latin digits («12.000 metrekare», «112 dükkân», «400 metrekare»); "the largest oasis in the world" (never
   palm/natural); plain-text bodies — no links, no bold (the one `## ` heading above is the only mark-up);
   the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: متحف وليد الناجم · بلدة الجفر · وزارة الثقافة · حي الرفعة · البشت الحساوي / «الحياكة الحساوية»
· أرامكو (no) · سوق الحرفيين · أكاديمية الحرف · شبكة المدن الإبداعية لليونسكو · أمانة الأحساء (ruled) · دوغة
الغراش (ruled) · أسرة الغراش · قرية القارة (ruled).

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions) follows the English. Gregorian years bare («Mart 2020»).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-10", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 65 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool, or with a node script
that reads an earlier stage's JSON (never through a shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
