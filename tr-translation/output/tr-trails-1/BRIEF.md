# Batch `tr-trails-1` — the suggested trails (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The Turkish «Suggested trails» section: the index `/tr/trails/` and five trail pages `/tr/trails/<slug>/`, built from
`src/data/trails.json` (owner-verified ar/en; **no distances, opening hours or fees in the texts; durations are
editorial suggestions**). **89 strings** in `pack.json`:
- `ui.trails.*` — 20 frame keys of `src/i18n/ui.ts` (index H1 and lead, card labels and values, stop labels, badge,
  sources heading, landmark link, map heading and note, back link). The nav word already approved is «Rotalar»
  (`nav.trails`) and the attraction-page heading «Bu yeri içeren rotalar» (`trails.partOf`) — the trail word is
  **rota** (A: «… Rotası» as the generic of every trail title, P3: the English translates "Trail", so Turkish does).
- `meta.attribution` (index head and foot of every trail page), `meta.unescoNote` (once per trail page), `seoDesc`
  (index meta description with `{n}` and `{titles}`).
- `sources.*` — 25 link texts under the stops (outlet — document title).
- `trails.<slug>.title|tagline|intro` for 5 trails and `trails.<slug>.stops.<key>.name|text` for 13 stops.

The trail titles and stop names also become the stop labels of the home-page planner (chapter 6, batch `tr-home-1`
after this one) and the «Bu yeri içeren rotalar» list on every attraction page, so they must stand alone.

**Names already ruled — byte-binding** (`ref.json` `places` and `terms`, and the termbase): the eleven stops that
link to an attraction page carry its published Turkish title: «Kasr İbrahim», «Beyt el-Biat» (Bayt Al-Bay'ah; the
English adds "(Al-Mulla House)" → keep the name, translate the descriptor: «(El-Mulla Evi)» — the family is
«El-Mulla ailesi» in the termbase), «El-Emiriye Okulu» (Al-Amiriya School; the English adds "(House of Culture)"),
«El-Kaysariye Çarşısı», «Cebel el-Kare», «Duğa el-Garaş Çömlek Atölyesi» (the stop "Dougha Al-Gharash Pottery"),
«Cüvasa Camii», «El-Ahsa Millî Parkı», «El-Asfar Gölü», «Ukayr» / «Ukayr Limanı» (the stop "Historic Al-Uqair Port"
→ «Tarihî Ukayr Limanı»), «Ukayr Plajı». Also «El-Ahsa», «Hüfuf», «Arap Körfezi» (P5), «El-Kut mahallesi» (tm),
«Kral Abdülaziz», «Necid», «Dammam», «Medine», «Mescid-i Nebevî», «El-Kilabiye», «Miras Kurumu», «El-Ahsa
Belediyesi», «Çevre, Su ve Tarım Bakanlığı», «Ayn en-Necm», «El-Garaş ailesi», «Medeniyetler Diyarı», «El-Kubbe
Camii», «han», «revak», «dört çekerli araç» (4x4, A6-words), «El-Yevm» (Al-Yaum newspaper), «Saudipedia» (Latin),
and the inscribed site «“El-Ahsa Vahası, Gelişen Kültürel Peyzaj”» (quoted as the tm does). The two stops with no
attraction page (oasis-farms, natural-springs) take generic Turkish («vaha bahçeleri …», «doğal pınarlar …») — no
new proper noun.

**Three lessons of the attractions batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an explicit
   subject when the previous sentence's subject was something else. The stop texts are dense (dates, builders,
   titles): one fact per clause.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English and
   the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings*.
3. **Who does the verb.** Locatives for places, people as subjects. Readers misread before: «eski» before a proper
   name (reads "former"), «durak» (A12-r2 ruled «bölüm» for the *sections of an event*; for a route stop «durak» is the
   ordinary Turkish — propose it with that reasoning, the judge rules), «simge», a comma between a participle subject
   and its predicate, long participial chains in a lead.

**This batch's own traps:**
- **Not official.** The trails are the site's suggestions. No «resmî», «onaylı», «onaylanmış», «tescilli», «yetkili
  … tarafından» or any wording implying endorsement in any title, tagline, intro or the attribution (guard C27 on the
  build). Stop texts may say «resmî» where the English does ("official government museum" is not in this batch).
- **"Roman Theatre"** (al-uqair-beach stop): a local name for a modern municipal amphitheatre. Write the local name
  as «“Roma Tiyatrosu”» (in “…”) and keep the denial **byte-exactly** as «Roma dönemine ait bir eser değildir» in the
  same text — the build guard (`tools/check-trails.mjs` ROMAN_L10N.tr) looks for exactly these two strings.
- **Hijri dates**: the tm/termbase form «Hicri 1203 (1788)» → "1331 AH / 1913 CE" → «Hicri 1331 (1913)»; "10th
  century AH (16th century CE)" → the tm has «Hicri on üçüncü yüzyıldan kalma» — write «Hicri onuncu yüzyıl (on
  altıncı yüzyıl)» or the equivalent; "the 5th century AH" likewise. P11 is open: follow the tm form, flag nothing new.
- **Source titles** (`sources.*`, 25): shape «Outlet — Document title» with the dash as the English. Outlets are
  Arabic proper nouns → P1–P4 from the Arabic spelling in Turkish orthography: الوطن «El-Vatan», سبق «Sebak»/«Sabk»
  (propose, attest on tr.wikipedia or AA, else mark unattested), الاقتصادية «El-İktisadiye», اليوم «El-Yevm»
  (termbase), المدينة «El-Medine», الرياض «Er-Riyad», الجزيرة «El-Cezire», عاجل «Acil» and جهات «Cihat» — **both
  collide with ordinary Turkish words** (acil = urgent, cihat = jihad): A1-collisions says no respelling, the
  mitigation is the generic beside the name («Acil haber sitesi», «Cihat Haber») — propose, the judge rules.
  «SPA» (واس, Saudi Press Agency): keep the Latin acronym as the English does, or «Suudi Basın Ajansı (SPA)» — one
  form for all seven SPA sources. «Darah» (دارة الملك عبدالعزيز): the de/ru/ur precedents in `precedent` show the
  shape; propose «Kral Abdülaziz Darası» or «Kral Abdülaziz Vakfı (Darah)» with reason. «Saudipedia», «Visit
  Saudi», «UNESCO» stay Latin; «42 COM 8B.16» stays. Document titles are translated (a title, sentence case P9).
  The checker rejects q/w/x/sh/kh/th/dh inside words — an outlet left in English romanisation will fail it; that
  is the rule, not a checker fault.
- **meta.unescoNote**: "the twelve component parts" → the termbase/tm wording for component («bileşen», det.unesco
  «UNESCO Dünya Mirası alanının bileşenlerinden biri»); the site name quoted; «2018».
- **seoDesc**: keep `{n}` and `{titles}` exactly once each; the titles are joined by «, » by the build.
- **ui values are labels**: no full stop on labels/buttons/headings; `trails.stopsCount` renders after a number («4
  Durak»), `trails.stop` before a number («Durak 1»); `trails.unesco` is a badge word — «UNESCO» alone is allowed
  (the English badge is "UNESCO"); `trails.mode.4x4` = «Dört çekerli araç» (termbase, capitalised as a value).
- **Durations are suggestions**: «Önerilen süre» for "Suggested duration" (not «Süre»).
- **Hedges kept exactly**: "best explored on foot in the morning or late afternoon", "still very much alive", "one
  of the inscribed UNESCO component parts". Add no «eşsiz»/«büyüleyici»/«muhteşem», no distances, no times.
- **Quotes** “…” only; numbers Latin; thousands «16.000»; ranges with «–».

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-trails` (branch `i18n/tr-trails-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-trails-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-trails node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-trails-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-12`). **A ruling supersedes any role-file sentence that still calls the item open.**
   `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs (several
   stop texts overlap the published attraction bodies: Qasr Ibrahim, Bayt Al-Bay'ah, Al-Amiriya, Al-Qaisariya,
   Jawatha, Al-Asfar, the national park, Al-Uqair — search the tm by a distinctive English phrase first).
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx` says where it renders; `placeholders`; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: approved frame (`ui`), the stop→attraction
   map with published Turkish fields (`places`), termbase entries present in the sources (`terms`), `tm`.
5. Site rules: invent nothing; Latin digits; "the largest oasis in the world" (never palm/natural); plain text —
   no links, no bold, no headings, no lists; the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it showed —
never claim a hit you did not see), or marked `unattested` with the Arabic it was built from. Expect at least:
the nine outlets above · دارة الملك عبدالعزيز · بيت الملا · بيت الثقافة · العمران (Al-Omran, in the tm) · any person
or dynasty named in the stop texts (Ottomans «Osmanlılar», the Jabrids «Cebriler» are in the tm).

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-trails-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 89 … },
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
