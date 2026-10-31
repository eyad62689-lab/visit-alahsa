# Batch `tr-map-plan-1` — the Turkish map and planning pages (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
Three pages, published already in ar/en/zh/de/ru/ur from the same sources, built now in Turkish. **101 strings**
in `pack.json`, in page order:
- **`/tr/map/`** — `ui.map.*` (11 keys of `src/i18n/ui.ts`, unit `map`): the attractions map (MapView): kicker, H1,
  the lead with the landmark count, the search box, the category chips' aria-label, the 3D terrain-map link, the
  locate button, the side list (its aria-label, the «Showing: N» label, the no-match message) and the popup link.
  Around them the page prints published Turkish: the 59 landmark names and categories (`ref.all_places`,
  `ref.categories`), the approved «Tümü», «Bu yeri kaydedin»/«Kaydedildi ✓», the distance labels, the share button.
- **`/tr/plan/`** — `ui.plan.*` (27 keys, unit `mytrip`): «My saved places» (PlanView) — the page name is the
  approved **«Kayıtlı yerlerim»** (`ref.ui nav.myTrip`, the home page's `finale.open`/`saved.*`): the hero, the count
  line (`<N> <suffix>`), five action buttons, the empty state with two buttons, the shared-list note with two
  buttons, the confirm question, the WhatsApp line, the print-only line, and the «(event)» tag the hours/fees table
  prints after «Hurma Köyü». The cards themselves print published Turkish (`title_tr`/`summary_tr`).
- **`/tr/plan-your-trip/`** — `pt.*` (63 strings; units `pt-arrive`, `pt-practical`, `pt-tips`, `pt-faq`,
  `pt-close`): «Plan your trip» (PlanTripView `localize()` block + the first column head of the generated table):
  kicker = the approved **«Gezinizi planlayın»** (`ref.ui nav.plan`), H1 and lead; «How to get there» (three cards:
  air, road, train); «Practical information» (four label/value pairs, then the generated **hours/fees table** whose
  column heads 2–3 are the published visit-card labels «Ziyaret saatleri» / «Ücretler» and whose rows are published
  card values — `ref.practical_table`); four numbered tips; **13 FAQ pairs** (each also a FAQPage node in JSON-LD —
  every answer must stand alone, plain text); the closing band with two buttons; `seoTitle`/`seoDesc`.

**Read `ctx` for every string — it was written from the component code** (what renders where, what precedes and
follows, which element is a label, a button, an aria-label or a placeholder; which page a button opens). The
`unit` field names the judge's scoring unit.

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Two short sentences rather than a chain; an explicit subject when it changes. The FAQ
   answers and the arrive cards are the long ones here.
2. **The English is the translation source.** Where the Arabic differs on a fact (the FAQ has several: «الرطب» vs
   "fresh dates", «مملكة البحرين» vs "Bahrain"), the Turkish follows the English and the divergence goes into
   `source_defects`. The Arabic is the arbiter for **name spellings** (Abqaiq = بقيق, hisy = حِسْي, harees/balaleet,
   kanar, Suwari) and for a fact the English leaves ambiguous.
3. **Who does the verb.** Readers misread before: a comma between a participle subject and its predicate; long
   participial chains; «eski» before a proper name; «yer almak» opening a heading (UI1-yer-heading).
4. **Buttons and action aria-labels are polite-plural imperatives** (UI1-controls: «Kaydedin», «Haritada
   görüntüleyin»); section labels, headings and nouns are not. No final stop on a button, label or heading.
5. **The approved frame binds byte-identically** where a batch string names the same thing: «Kayıtlı yerlerim»,
   «Gezinizi planlayın», «Gezilecek yerler», «Bu yeri kaydedin», «Harita», «Gezi rehberi», «Gezilecek yer arayın…»,
   «Sıkça sorulan sorular», «Google Haritalar'da açın ↗», «Bağlantı kopyalandı ✓», «Ulaşım» — see `ref.ui`; and the
   tm pair is reused verbatim when its English recurs («dünyanın en büyük vahası», the UNESCO forms).

## This batch's own traps
- **Facts that have a published visit card must agree with it**: the hours and fee of Cebel el-Kare (`pt.faq.2.a`)
  and the hours of El-Kaysariye Çarşısı (`pt.faq.3.a`) — `ref.places.*.practical` gives the published Turkish rows
  («Her gün 08.00–23.00 (tatillerde uzatılabilir)», «Yetişkinler için 50 SAR — …», «08.00–12.00 ve 15.30–22.00»,
  «Giriş ücretsiz»). The same rows are printed in the table on the same page a few lines above the FAQ. Clock
  times in the TDK shape the cards use (P10: «08.00–23.00»); day names capitalised in schedules (A10-days: «Cuma
  günleri yalnızca akşam»).
- **«SAR» is two things on this page**: the currency (`pt.practical.3.v`, `pt.faq.2.a`: first mention in a field
  «50 Suudi riyali (SAR)», then «50 SAR» — A7/A10-SAR) and the railway company «Saudi Arabia Railways (SAR)»
  (`pt.getThere.2.d`, `pt.faq.5.a`, `.6.a`, `.7.a`; the Arabic «شركة سار»). Write the company so that «SAR» cannot
  be read as money — its Turkish name is a **new termbase entry for stage 4 to attest** (tr.wikipedia / the
  company's own Turkish-language material if any; else the English name with a gloss, status `unattested`).
  `sar.com.sa` and `splonline.com.sa` stay byte-identical.
- **New proper nouns, all for stage 4 to attest with a source**: Al-Ahsa International Airport; King Fahd
  International Airport (Dammam); the King Fahd Causeway; Abqaiq (Buqayq — from بقيق; the English gives both, keep
  the bracketed second form as the precedents do); Saudi Post (SPL); Saudi Arabia Railways (SAR); the national
  address service. Hofuf, Al-Mubarraz, Dammam, Khobar, Riyadh, Bahrain, the Eastern Province are in the termbase
  (`ref.terms`: Hüfuf, Müberrez, Dammam, El-Huber, Riyad as the exonym, Bahreyn, Doğu Bölgesi).
- **Food, fruit and craft names** (`pt.faq.10.a`, `.12.a`): Khalas = termbase «Halas»; «Hasawi red rice» = the
  Hasawi rule for things (A9/A11: «El-Ahsa …», tm «El-Ahsa pirinci»); harees, balaleet = transliterate from هريس,
  بلاليط (P1/P4 plain journalistic form) and gloss once in the answer where the reader needs it; «date bread (also
  called red bread)» keeps both names in one sentence; the fruits: Hasawi fig, lomi = «misket limonu» (termbase),
  kanar (الكنار; the Arabic arbiter glosses it «النبق» — the sidr fruit; transliterate + gloss once, no new botany),
  Suwari pomegranate (from السواري); the «Hasawi bisht embroidered with zari thread» = «El-Ahsa bişti» + «sırma»
  (termbase); pottery, palm-frond ware, incense and perfumes. **Names byte-identical between the two answers.**
- **«Al-Ahsa» is the plural of «hisy»** (`pt.faq.11.a`): a quoted Arabic word (حِسْي), not a Turkish one — plain
  journalistic transliteration (P4), quoted “…” as the English quotes it; the image of water under a thin layer of
  sand kept; the closing fixed phrase «dünyanın en büyük vahası» (C15 — never «hurma», never «doğal»).
- **The Dates Festival** (`pt.faq.4.a`): no Turkish events page exists, so there is no published festival name —
  describe it generically (a dates festival early in the year), invent no proper name (the Urdu ruling).
- **Neutrality** (`pt.faq.9.a`, `.12.a`): no hotel, platform, restaurant or brand; the bracketed disclaimer stays
  in brackets.
- **Numbers**: every digit as the English (the checker holds digits to the two sources): 326 km, «around 3 hours
  20 minutes» (digits where the English has digits), «around two hours and ten minutes» (words where the English
  has words), 150 km, «1,5 saat» (Turkish decimal comma), 36, the two 10s of `ui.plan.routeLimit`, «3D»
  (`ui.map.terrain`, the Latin D as the Arabic keeps it). Latin digits only.
- **`ui.map.lead.a` carries `{n}`** (required): the component puts the landmark count there — write the sentence so
  the number sits naturally before its noun («… {n} gezilecek yer …»). It is also the page's meta description.
- **`ui.plan.saved*`**: Turkish plural rules select only `savedOne` (1) and `savedSuffix` (other); `savedTwo` and
  `savedFew` must exist and are made identical to `savedSuffix`. The line reads «3 <suffix>» / «1 <savedOne>».
- **Quoted page names inside sentences** (`ui.plan.empty.d`, `ui.plan.shared.d`, `pt.faq.1.a`, `pt.ctaD`): the
  approved names in “…” byte-identical («Bu yeri kaydedin», «Kayıtlı yerlerim», «Gezilecek yerler»).
- **Links to pages not built in Turkish**: `ui.map.terrain` leads to the English 3D terrain map — name the page,
  promise no Turkish version. Everything else the three pages link to is Turkish (attractions, map, my saved
  places, plan your trip, the landmark pages).
- **Register**: a practical page — plain, warm, exact; no «eşsiz»/«büyüleyici»/«muhteşem», no «must-see», no
  «destinasyon»/«lokasyon»; «çarşı» for souq; «gezilecek yer» for a landmark/attraction (the frame word);
  «konum» for a map location; sentence case for headings (P9); quotes “…”; the brand «Visit Al-Ahsa» Latin;
  «Google Haritalar», «WhatsApp» as the termbase/English; the Gulf «Arap Körfezi» (P5) if it occurs.
- **Times of day in the tips** (`pt.tips.2.d`): the plain register ruled in H4-r3 («sabah erken», «öğleden sonra»),
  not prayer-time words.
- **Pairs that must agree**: `pt.ctaBrowse` = `ui.plan.empty.browse` (same English) and both consistent with the
  home page's browse button (`ref.home finale.*`); `pt.ctaTrip` = «Kayıtlı yerlerim»; `pt.faqH` = «Sıkça sorulan
  sorular»; `pt.eyebrow` = «Gezinizi planlayın»; `ui.map.eyebrow` ~ «Gezi rehberi»; `ui.map.search.ph` ~ «Gezilecek
  yer arayın…»; `ui.plan.printNote` ~ `det.hoursNotice`; `ui.plan.route` ~ `det.openMaps`; the four tip headings
  parallel; the three arrive headings parallel; the four practical labels parallel.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-mapplan` (branch `i18n/tr-map-plan-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-map-plan-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-mapplan node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-map-plan-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it. (The checker's SPELLING rule flags «q w x sh kh th dh» inside words: a Latin brand or
  domain it does not know — e.g. «WhatsApp» is allowed, «Saudi Arabia Railways» is not — is then the judge's call.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-12`, `tr-trails-1`, `tr-home-1`). **A ruling supersedes any role-file sentence that still
   calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs (search by
   a distinctive English phrase first).
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `allowNums`; `unit`; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr frame), `home`
   (the approved Turkish home page), `categories`, `places` (published fields + verified visit-card rows of the
   landmarks the FAQ names), `all_places`, `practical_table`, `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; "the largest oasis in the world" (never palm/natural); plain text —
   no links, no bold, no headings, no lists; the brand «Visit Al-Ahsa» stays Latin.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-map-plan-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 101 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
