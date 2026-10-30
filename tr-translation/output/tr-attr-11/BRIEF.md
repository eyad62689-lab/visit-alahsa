# Batch `tr-attr-11` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The eleventh Turkish attractions batch, after `tr-attr-1` to `tr-attr-10` (all 90/100) — three one-sentence farm/garden
pages, a zoo and a heritage souq building: **lemon-farm** (Hasawi Lime Farm), **strawberry-farm** (Strawberry Farm),
**sawsan-gardens** (Al-Sawsan Bird Gardens), **taraf-zoo** (Al-Taraf Zoo), **hamidiyah-souq** (Al-Hamidiyah Souq) —
34 strings in `pack.json`: title, summary, body (on lemon-farm, strawberry-farm and sawsan-gardens the body is the
same single sentence as the summary — translate it identically, byte for byte), area (taraf-zoo, hamidiyah-souq),
`bestTime` (lemon-farm), one visit-card row each (Hours; on hamidiyah-souq «Current status»), and **FAQ** on
hamidiyah-souq (3). The name rulings in `_meta.batch_rulings` for `tr-ui-1`, `tr-attr-1` … `tr-attr-10` bind.

**Names already ruled — byte-binding (see `ref.json` `terms`/`places` and the termbase):** «Ukayr» (Al-Uqair,
article-less, P1), «El-Kaysariye Çarşısı», «Zanaatkârlar Çarşısı» (both titles of published pages), «Kral
Abdülaziz» (→ «Kral Abdülaziz Caddesi» or «Yolu» for "King Abdulaziz Road" — rule with TDK/press usage),
«Et-Taraf» (termbase: collision with «taraf» = side; the body carries «kasabası» where the English has "the town
of"), «Er-Rifa mahallesi» (A10) and «Güney er-Rifa mahallesi» (A4) → this batch's "North Al-Rifaa district" =
«Kuzey er-Rifa mahallesi», «Hüfuf», «El-Ahsa», the Hasawi rule (El-Ahsa + noun, no demonym; A9), «Suudi Arabistan»
for the country. tm pairs reused verbatim: «Her gün 16.00–21.30» (Daily 4:00–9:30 pm), «Güncel durum» (Current
status — the khuzam page), «Ziyaret saatleri», «Şunlar için uygun».

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Çarşı, …», «Park, …») when the previous sentence's subject was something else.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and for flagging.
3. **Who does the verb.** Locatives for places («çiftlikte», «çarşıda»), people as subjects. Words readers misread
   before: «sınırlıdır», «eski» before a name, «simge», «diğer» before a list, a comma between a participle subject
   and its predicate, «izlemek» for "tracing"; a participial chain before the head noun in a card lead (tr-attr-10:
   two sentences instead).

**This batch's own traps:**
- **The Hasawi lime (lomi)**: the English "lime (lomi)", the Arabic «الليمون الأحسائي» / the farm's proper name
  «مزرعة الليمون الحساوي» (the site keeps «الحساوي» only in such proper names). Turkish distinguishes «limon» (lemon)
  from «misket limonu» (lime, TDK) — stage 4 attests which Turkish word the Hasawi lime takes (tr.wikipedia
  «Misket limonu»; the lomi is a small dried-or-fresh lime, *never described as black*). Keep «(lomi)» as the English
  does, Latin. Title per P3 (generics follow title_en, translated): propose e.g. «El-Ahsa Misket Limonu Çiftliği» vs
  «El-Ahsa Limon Çiftliği» with reasons; the de/ru/zh precedents in `pack.json` show how they handled it.
- **Al-Sawsan** (السوسن = the iris): Turkish «süsen» is the iris too — a collision of the Kare kind; the name is
  built from the Arabic («Es-Sevsen»), not translated; the generic «Kuş Bahçeleri» follows title_en (P3). Record the
  echo in the termbase note; mitigate only if a reader stumbles.
- **Al-Taraf**: «Et-Taraf» (termbase); «kasabası» where the English says "the town of"; the area row «Et-Taraf —
  Hüfuf'un doğusu» (English "Al-Taraf — east of Hofuf"; the Arabic row has بلدة — the A5 open option: rule it).
- **Al-Hamidiyah Souq is a heritage landmark, not a working souq** (owner's ruling, site rule): every string keeps
  that status exactly — "no longer trading", "Sharq Restaurant occupies it today", and the body's last sentence
  "Further details … are pending confirmation from reliable sources before being published here" is translated as
  it stands (it is the site's own editorial sentence; invent nothing). «Sharq Restaurant» — a named restaurant with
  its own dining page `src/content/dining/sharq-alqaisariah.md` (read its `title`/`title_en` and any `title_tr`; if
  the dining page has no Turkish title, build the name from the Arabic «مطعم شرق» by P1–P4: «Şark Restoranı»
  — note the collision with the Turkish word «şark» (the East/Orient, dated) and record it; Latin «Sharq» is not
  used, per P2's precedent of building from the Arabic script).
- **Hamidiyah body**: "in the North Al-Rifaa district on King Abdulaziz Road" — two place complements; "alongside
  the reconstruction of Qaisariyah Souq and the creation of the Craftsmen Souq" — the two souq names byte-identical
  to their titles; "joining the cluster of heritage souq buildings at the city's core".
- **taraf-zoo**: "a variety of animals up close", "simple, unhurried family outings", "Check locally before
  planning the trip" (an instruction to the reader — siz, polite; invent no phone/season); "the nearby Al-Taraf
  countryside and the southern reaches of the oasis".
- **Visit-card values**: P10 («Her gün 15.30–22.30»); "Daily in the growing seasons, 4:00–9:30 pm" (lemon-farm) and
  "Winter and spring season, 3:30–9:30 pm" (strawberry-farm) — plain season words, no dates added; bestTime "From
  mid-June to August, the lime-picking season" → month names per `Intl` tr-TR («Haziran ortasından Ağustos'a»).
  The «Current status» row on hamidiyah-souq: its value is a status sentence, not hours — translate as given.
- **Hedges kept**: "one of the area's simple, unhurried family outings", "famous"; add no «eşsiz»/«büyüleyici».

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a11` (branch `i18n/tr-attr-11`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-11`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a11 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-11 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths — a repo-relative path gets doubled). Run it until `RESULT [OK]`. If a finding looks
  wrong, do not shape the text to it — leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings) and `_meta.batch_rulings` (`tr-ui-1`,
   `tr-attr-1` … `tr-attr-10`; A10-days: day names capitalised in schedules; A10-SAR). **A ruling supersedes any
   role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag*; `ctx` says where it renders; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: approved frame (`ui`), calibration page,
   `places` (**byte-binding**), termbase entries present in the sources, `tm`.
5. Site rules: invent nothing (opening dates, prices, seasons, phone numbers, superlatives the English does not have);
   Latin digits; "the largest oasis in the world" (never palm/natural); plain-text bodies — no links, no bold, no
   headings in this batch; the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it showed —
never claim a hit you did not see), or marked `unattested` with the Arabic it was built from. Expect at least:
مزرعة الليمون الحساوي · مزرعة الفراولة · حدائق السوسن للطيور · حديقة حيوانات الطرف · سوق الحميدية · مطعم شرق ·
حي الرفعة الشمالية · طريق الملك عبدالعزيز · طريق العقير.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-11", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 34 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Write Turkish only with the Write tool, or with a node script that reads an earlier stage's JSON (never through a
shell heredoc or `node -e`). Write the file as soon as the strings are done, before further checking. Keep console
output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
