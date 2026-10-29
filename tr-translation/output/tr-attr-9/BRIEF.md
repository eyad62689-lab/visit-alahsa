# Batch `tr-attr-9` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The ninth Turkish attractions batch, after `tr-attr-1` to `tr-attr-8` (all 90/100) — five private heritage museums:
**ahsa-house-museum** (Al-Ahsa House Museum, the "Naathel" museum), **khalifa-museum** (Al-Khalifa Heritage
Museum), **abdulrazaq-museum** (Abdulrazaq Al-Arab Museum), **dar-alturath** (Dar Al-Turath (Heritage House)),
**dhafar-museum** (Saleh Al-Dhafar Museum) — 34 strings in `pack.json`: title, summary, body (plain text), area,
and one or two visit-card rows (Hours; Fees on dar-alturath and dhafar-museum). No FAQ. The name rulings in
`_meta.batch_rulings` for `tr-ui-1`, `tr-attr-1` … `tr-attr-8` bind (e.g. translated generics «Müzesi»/«Parkı»
(A6); «El-Ahsa Müzesi» (A8, byte-binding in `ref.json` places); «Müberrez» and «Hüfuf» article-less (P1); «bint»
(A3) and the same treatment for «bin»; the country before a Saudi body or ministry (A6); «Kasr İbrahim»).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Müze, …») when the previous sentence's subject was something else; after a genitive or
   place chain, end the sentence and name the place again (A6-r2-subject).
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the
   English and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and
   for flagging.
3. **Who does the verb.** With exhibits and visitors, name the place with a locative («müzede») or make the
   people the subject. Words readers misread before: «sınırlıdır», «eski» before a name (read as "former"),
   «simge», «diğer» before a list that is itself the content, «meclis» alone (read as parliament — the
   termbase has «meclis salonu»).

**This batch's own traps:**
- **Three names collide with ordinary Turkish words** (the calibration's Kare = "square" trap): الخليفة →
  «Halife» = caliph; الظفر → «Zafer» = victory; العرب → «Arap» = Arab. They are family names of private
  founders. Build each from the Arabic spelling (P1–P4), and mitigate the way the calibration did: the founder's
  full name (given name + family name) at the first mention in the body, so the reader meets it as a person's
  name; in titles the given name where the English has it. Do not invent a different spelling to dodge the
  collision. Stage 4 rules the article/hyphenation of each and records the collision in the termbase note.
- **Known names already in the termbase (not in ref.json because the English differs):** "the Qaisariyah" →
  «El-Kaysariye Çarşısı» (suffix ı — «El-Kaysariye Çarşısı'nın»); "Naathel" (النعاثل) → «En-Naasil»
  (unattested); "majlis" → «meclis salonu»; Al-Shu'bah → «Eş-Şube»; the Saudi Heritage Commission → «Miras
  Kurumu» (attested). Read `REPO\tr-translation\glossary\termbase.json` itself, not only `ref.json`.
- **"Hasawi" (أحسائي)** has no attested Turkish adjective. The precedent is «El-Ahsa mutfağı» (Hasawi
  Cuisine): El-Ahsa + noun, or «El-Ahsa'ya özgü …». No invented demonym («Ahsalı», «Hasavi») unless stage 4
  finds it attested.
- **dar-alturath** has a sub-heading inside its body: the English body ends with a paragraph `## Other heritage
  museums in Al-Ahsa` and one paragraph under it. Keep exactly that structure: a paragraph that starts with
  `## ` and the Turkish heading (sentence case), a blank line, then the paragraph. The three museums it names
  must be byte-identical to this batch's own titles and to «El-Ahsa Müzesi». That section is newer than the
  zh/de/ru/ur precedents (they lack it) — translate it all the same.
- **The title «Dar Al-Turath (Heritage House)»** follows the A2 precedent of «Beyt el-Biat» (transliterated
  name, the meaning glossed once). Rule the transliteration of دار التراث from the Arabic (ث←s).
- **Saudi bodies:** "licensed by the Museums Commission" (هيئة المتاحف) — country first (A6), proposed with a
  source or marked unattested; "the Al-Ahsa office of the tourism and national heritage authority" (lower-case
  in the English: the former body, الهيئة العامة للسياحة والتراث الوطني) — NOT «Suudi Turizm Otoritesi», which is
  a different, current body. Aramco stays «Aramco».
- **Hedges the English carries are kept:** "described as the first of its kind", "one of … most prominent",
  "some 180 square metres", "more than", "some twenty years". Add no superlative it does not have.
- **Visit-card values:** P10 times («Her gün 16.00–22.00»; «16.30–21.30»); "by prior arrangement / booking"
  translated as given — no phone, no times the English lacks ("Evenings, by prior booking" has no clock). Fees:
  the first SAR mention on a card is «… Suudi riyali (SAR)» (A7), «Kişi başı» for "per person".

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a9` (branch `i18n/tr-attr-9`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-9`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a9 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-9 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings — **P3**: generics follow title_en and are
   translated; **P10**: «16.00–22.00», days «Pazar–Perşembe») and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-8`). **A ruling supersedes any role-file sentence that still calls the item open.**
   `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs —
   «Hours» → «Ziyaret saatleri», «Fees» → «Ücretler»; the area pattern «Hüfuf — El-Ahsa».
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, `arabic_body`); `ctx`
   says where it renders; `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`:
   approved frame (`ui`), calibration page, `places` (**byte-binding** — «El-Ahsa Müzesi»), termbase entries
   present in the sources, `tm`.
5. Site rules: invent nothing (opening dates, exhibits, ticket rules, superlatives the English does not have);
   Latin digits («180 metrekare», «750 saat», «150'den fazla»); "the largest oasis in the world" (never
   palm/natural); plain-text bodies — no links, no bold (the one `## ` heading above is the only mark-up);
   the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: متحف البيت الأحسائي · متحف الخليفة التراثي · حسين علي الخليفة · حي الشروفية · القرين ·
متحف عبد الرزاق العرب · دار التراث · جعفر الخواهر · المنصورة (بلدة) · متحف صالح عبد اللطيف الظفر (title_en drops
عبد اللطيف; the title follows title_en, the body has the full name) · سليمان بن محمد الماجد · هيئة المتاحف ·
the former tourism and national heritage authority · Aramco.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions) follows the English. Gregorian years bare («Mayıs 2017», «2019»).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-9", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 34 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool, or with a node script
that reads an earlier stage's JSON (never through a shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
