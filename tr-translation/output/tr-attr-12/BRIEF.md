# Batch `tr-attr-12` — three attractions, the last attractions batch (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The twelfth and last Turkish attractions batch, after `tr-attr-1` to `tr-attr-11` (all 90/100): a heritage souq, a
farm and a seasonal event site — **women-souq** (Women's Folk Souq), **zaki-alsalem-farm** (Zaki Al-Salem Farm),
**palm-village** (Palm Village) — **49 strings** in `pack.json`: title, summary, body, area, one to three visit-card
rows each, **FAQ** on women-souq (5) and palm-village (5), and on palm-village also `galleryTitle` (heading of the
photo section) and **`cta.label` / `cta.note`** (the booth-registration box at the foot of the page: button text
and the sentence beside it — without a Turkish label the whole box disappears from the /tr/ page, and FAQ answer 3
points to it). The name rulings in `_meta.batch_rulings` for `tr-ui-1`, `tr-attr-1` … `tr-attr-11` bind.

**palm-village.body is the longest body of the line (2,422 characters, five paragraphs separated by blank lines —
`\n\n` in the JSON; no `##` headings, no lists, no links: the English is plain prose and so is the Turkish).** Keep
the five paragraphs. The Arabic body is longer (headings, a tips list, a sources list): it is not the source; the
English is.

**Names already ruled — byte-binding (see `ref.json` `terms` and the termbase):** «Hüfuf», «Müberrez», «El-Ahsa»,
«Güney er-Rifa mahallesi» (South Al-Rifaa district, A4), «Kral Abdülaziz Yolu» (King Abdulaziz Road, A11-road),
«El-Ahsa Belediyesi» (Al-Ahsa Municipality, no apostrophe), «Doğu Bölgesi» (the Eastern Province — written
«Suudi Arabistan'ın Doğu Bölgesi» at the first mention, A4-Dogu-Bolgesi), «El-Ahsa Valiliği» (A6-governorate —
for "Governor of Al-Ahsa" the person is «El-Ahsa Valisi»), «Muheyris» (محيرس, A2 — the district «Muheyris
mahallesi»), «Suud bin Abdülaziz» (the given-name form «Suud» for سعود), the Hasawi rule (El-Ahsa + noun, no
demonym; A9: «El-Ahsa pirinci», «El-Ahsa kırsal ürünleri»), «Suudi Arabistan». tm pairs reused verbatim where the
English recurs: «Ziyaret saatleri» (Hours), «Ücretler» (Fees), «Ziyaret» (Visiting), «Kişi başı 20 Suudi riyali
(SAR)» → the same shape for SAR 25 (A7: first mention on a card «Suudi riyali (SAR)», later «SAR»).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Çarşı, …», «Çiftlik, …», «Köy, …») when the previous sentence's subject was something else.
   A title chain like "HRH Prince Saud bin Nayef bin Abdulaziz, Emir of the Eastern Province" is one apposition,
   not a stack: «Suudi Arabistan'ın Doğu Bölgesi Emiri Prens Suud bin Nayif bin Abdülaziz» or split.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects` (zaki: the English adds "east of the oasis"; palm-village: the
   Arabic body carries tips and sources the English drops). The Arabic is the arbiter for *name spellings*.
3. **Who does the verb.** Locatives for places («çarşıda», «çiftlikte», «köyde»), people as subjects. Words readers
   misread before: «sınırlıdır», «eski» before a name, «simge», «diğer» before a list, a comma between a participle
   subject and its predicate, «ortam/atmosfer» for "amid the atmosphere" (A11: «havasında»), a participial chain
   before the head noun in a card lead (two sentences instead).

**This batch's own traps:**
- **women-souq title** «Women's Folk Souq» / سوق النساء الشعبي: P3 (generics follow title_en, translated) — propose
  «Kadınlar Halk Çarşısı» vs «Kadınlar Çarşısı» with reasons; "folk souq" elsewhere is «halk çarşısı» (khalifa-museum,
  hamidiyah). The name recurs in all five FAQ questions byte-identically with the title.
- **Suwaiq** (سوق السويق, "the old Suwaiq market area"): build from the Arabic by P1–P4 («Es-Süveyk»; the article as
  the Arabic writes it, sun letter) and attest or mark unattested; "market area" → «çarşı bölgesi»/«eski Es-Süveyk
  çarşı bölgesi» — split rather than stack with «Güney er-Rifa mahallesinde».
- **Goods words**: ghee = «sadeyağ» (TDK); aqit (الإقط, dried yoghurt) = a transliterated Arabic word → «akit» with
  the gloss the English gives, «(kurutulmuş yoğurt)», once in the body at first mention; in faq.4.a the English
  repeats the gloss — follow it (a FAQ answer stands on its own). Bedouin = «Bedevi» (TDK bedevi); "both local women
  and Bedouin" → «hem yerli hem Bedevi kadınlar». "living folk-trade scenes" (×2 on the page) — no «sahne» calque;
  find the Turkish a travel writer would use («halk ticaretinin hâlâ yaşadığı yerlerden biri» or better) and keep
  the same wording in summary and body.
- **women-souq card**: «Her gün 08.00–23.00» (P10; the jabal pair has a bracket, this one none); faq.0.a "Daily from
  8:00 am to 11:00 pm." → P10 running form «Her gün 08.00–23.00 saatleri arasında.» or the tm shape.
- **Zaki Al-Salem** (زكي السالم): person names take the established Turkish forms of Arabic names as the termbase
  does (Süleyman, Abdürrezzak, Velid, Salih): «Zeki es-Salim Çiftliği» (title per P3: "Farm" translated → «Çiftliği»;
  «es-» as the Arabic writes السالم) — propose, attest or mark unattested. «"Aryaf Zaki"» (أرياف زكي, the huts): the
  English quotes it and does not gloss — «“Eryaf Zeki”» in Turkish quotes, no gloss (أرياف → Eryaf by P2; record the
  alternative «Aryaf»).
- **Al-Khaleej Road** (طريق الخليج): P1/P3 build «El-Halic Yolu» (خ → h, ج → c, A11-road «Yolu») — **collision**: Turkish
  «Haliç» is the Golden Horn; «El-Halic» (no cedilla) still echoes it. The alternative is the translated «Körfez
  Yolu» (the road is named for the Gulf, P5 «Arap Körfezi»); de/ru transliterated. Stage 1 proposes both with
  reasons, stage 4 attests, the judge rules (A1-collisions: no respelling; the generic «Yolu» is the mitigation).
- **Hasawi red rice** = «El-Ahsa kırmızı pirinci» (A9 Hasawi rule; the summary says "Hasawi rice farms" → «El-Ahsa
  pirinci»); "harvest season" «hasat mevsimi»; "festival-like experiences" — no «festival havası» cliché unless it
  is the plain word; "sulphur-water spring rising from the ground" → the najm-park page has «kükürtlü pınar»;
  "traditional palm-frond huts" → «hurma yaprağından/dalından geleneksel kulübeler» (سعف = fronds — pick the word a
  Turkish reader knows; the tm has «hurma ağaçları» for palms, «hurmalıklar» for groves).
- **zaki card**: «Perşembe, Cuma ve Cumartesi 15.30–22.00» (A10-days: capitals in a schedule); «Kişi başı 25 Suudi
  riyali (SAR)»; **«Visiting: Pending confirmation» — P6 is OPEN** (`_meta.open_items`): no card pair exists yet (the
  bodies used page-local «teyit edilmeyi bekliyor», A6/A8). **This batch forces a card value — twice** (zaki
  `practical.2.value` and palm-village `practical.2.value` "Fees: Pending confirmation"): write the two
  byte-identically, propose the form («Teyit bekleniyor» / «Henüz teyit edilmedi» / …) with reasons, and the judge
  rules it and says whether P6 closes.
- **Palm Village** (قرية النخيل): the palm here is the date palm. Propose «Hurma Köyü» (hurma = the date/date palm in
  everyday Turkish; the tm uses «hurma ağaçları», «hurmalıklar») vs «Palmiye Köyü» (palmiye = ornamental palms) with
  reasons; stage 4 looks for any Turkish press form (AA) and attests or marks unattested. The same word carries
  «Palm Museum» (→ «Hurma Müzesi» / «Hurma Ağacı Müzesi» — choose one, use it in summary, body and faq.3.a
  byte-identically) and "palm crafts". The event is also on the site's events page — out of scope here.
- **Organisers**: هيئة تطوير الأحساء "Al-Ahsa Development Authority" — pattern هيئة → «Kurumu» (Miras Kurumu, Müzeler
  Kurumu); تطوير → «Geliştirme» (as in the historic-mosques project name) vs «Kalkınma»: propose «El-Ahsa Geliştirme
  Kurumu» vs «El-Ahsa Kalkınma Kurumu»; stage 4 checks tr.wikipedia/AA; byte-identical across summary, body,
  practical.1.value and faq.1.a. «El-Ahsa Belediyesi» from the termbase.
- **Princes and titles**: "HRH Prince X" / "HH Prince X": Turkish press writes «Prens X» (termbase: «Prens Muhammed
  bin Selman», «Prens Saad»); the honorifics HRH/HH have no running Turkish form in tourism text (de/ru dropped
  them) — drop them and record the ruling, or render them and say why. Names from the Arabic: سعود بن نايف بن
  عبدالعزيز → «Suud bin Nayif bin Abdülaziz»; سعود بن طلال بن بدر → «Suud bin Talal bin Bedr» (or «Bedir» — the
  Turkish form of بدر; rule it); سعود بن بندر بن عبدالعزيز → «Suud bin Bender bin Abdülaziz» (بندر → «Bender», the
  Turkish form; alternative «Bandar»). Titles: «Doğu Bölgesi Emiri», «Doğu Bölgesi Emir Yardımcısı» (Deputy Emir —
  check AA usage), «El-Ahsa Valisi» (Governor). "under the patronage of" → «himayesinde».
- **Numbers and dates**: «50.000 metrekareden büyük bir alan», «90.000 metrekare», «yaklaşık 5.000 ziyaretçi»
  (thousands point, P-sayilar); «Aralık 2024», «22 Nisan 2025 Salı akşamı», «27 Ocak 2026», «Kasım 2026» (month and
  day names capitalised in a specific date — TDK; A11-bestTime lower case applies only to recurring seasons);
  «2025 El Sanatları Yılı» for "the Year of Handicrafts 2025" (attest; it is a Saudi programme name).
- **"edition" vs "season"**: the page uses both ("the second edition", "that first season", "the length of the
  season"). Pick one Turkish word for *edition* («dönem»? «sürüm» is for software; «edisyon» is on the anglicism
  watch-list — propose and reason) and keep «sezon»/«mevsim» for *season*, consistently across body, galleryTitle
  («Photos from past editions»), faq.3.q/a and faq.4.
- **The four groups** "traders, farmers, craftspeople and home-based producers" (الأسر المنتجة = home-based producing
  families) appear three times (body last sentence, faq.2.a, cta.note): one wording, byte-identical. "booth" →
  «stant» (TDK), "register for a booth" → «stant kaydı» / «stant için kayıt» — the cta.label is a button: short,
  siz-polite («Stant için kayıt olun»), sentence case.
- **Facts and hedges kept exactly**: "an estimate announced at the opening rather than a recorded attendance
  figure", "These figures belong to the second edition; facilities may change from one edition to the next", "The
  exact opening date, the length of the season, opening hours and fees have not been announced, so check the
  organisers' announcements before you go" (siz, polite), "Plan two to three hours", "ask at the date shops about
  variety, origin and storage before you buy". Invent no dates, hours, fees, counts.
- **palm-village card**: labels «Tarihler» (Dates), «Düzenleyenler» (Organisers — or the word the summary uses for
  "organised by"), «Ücretler» (tm); value 0 «Kasım 2026 — kesin tarihler ve süre henüz açıklanmadı» (shape; the dash
  as the English); value 2 = the P6 card form above.
- **area rows**: «Hüfuf, Güney er-Rifa mahallesi» (women-souq; cf. tm «Hüfuf, Er-Rifa mahallesi»); «El-Halic Yolu —
  El-Ahsa» or the ruled road form (zaki); «Muheyris mahallesi, Müberrez» (palm-village).
- **Hedges kept**: "famed for", "one of the largest", "one of the city's living folk-trade scenes"; add no
  «eşsiz»/«büyüleyici»/«muhteşem».

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a12` (branch `i18n/tr-attr-12`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-12`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a12 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-12 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths — a repo-relative path gets doubled). Run it until `RESULT [OK]`. If a finding looks
  wrong, do not shape the text to it — leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-11`; A10-days: day names capitalised in schedules; A7/A10-SAR; A11-bestTime). **A ruling
   supersedes any role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not
   decided silently — P6 is forced by this batch's two cards (see above) and goes to the judge explicitly.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag*; `ctx` says where it renders; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: approved frame (`ui`), calibration page,
   termbase entries present in the sources, `tm`. The Arabic bodies are the Markdown after the frontmatter in
   `REPO\src\content\attractions\<slug>.md`.
5. Site rules: invent nothing (opening dates, prices, seasons, phone numbers, superlatives the English does not have);
   Latin digits; "the largest oasis in the world" (never palm/natural); plain-text bodies — no links, no bold, no
   headings, no lists in this batch; the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it showed —
never claim a hit you did not see), or marked `unattested` with the Arabic it was built from. Expect at least:
سوق النساء الشعبي · سوق السويق · مزرعة زكي السالم · طريق الخليج · أرياف زكي · قرية النخيل · متحف النخلة ·
هيئة تطوير الأحساء · سعود بن نايف بن عبدالعزيز · سعود بن طلال بن بدر · سعود بن بندر بن عبدالعزيز · عام الحرف
اليدوية 2025 · حي محيرس.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-12", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 49 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII. palm-village.body keeps its five paragraphs separated by `\n\n`.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
