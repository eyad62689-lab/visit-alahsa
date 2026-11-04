# Batch `tr-events-1` — the Turkish events pages /tr/events/ and the ten season pages (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
Eleven pages, published already in ar/en/zh/de/ru/ur from the same sources, built now in Turkish: the list
`/tr/events/` and one page per recurring season `/tr/events/<slug>/`. **187 strings** in `pack.json`:
- unit **`vl`** (35) — the EventsView block: the list page hero, notice, card keys (location, map, organisers,
  length, highlights, booking), status badges, countdown badges, the «you are here now» badge, the order note,
  three notes, the source line, the closing CTA, the tab title and meta description.
- unit **`vd`** (29) — the EventDetailView block: the single-page kicker, the fact-row keys, headings (highlights,
  FAQ, see also, map, other seasons), the map texts, the notice, status/countdown badges, the breadcrumb, the back
  link.
- unit **`ui`** (4) — `ui.ev.shop`, `ui.ev.shopNote`, `ui.ev.live`, `ui.ev.social`: the event buttons (store,
  live channel, X account). Not in the Turkish frame yet.
- unit **`e`** (119) — the texts of the ten seasons, `e.<id>.<field>`: name, place, season, time, span, org, the
  highlights `acts.<i>`; where the event has them: `intro`, sections `sec.<s>.h` / `sec.<s>.p.<p>`, FAQ
  `faq.<f>.q/a`, «see also» labels `rel.<r>`, the post-edition values `after.*` (lomi), the tab title `seoTitle`
  (palm village only — it must differ from the attraction page «Hurma Köyü»).
  Events: bisht (Hasawi Bisht Festival), qaisariyah-nights, kafu-nights, dates-festival (Processed Dates
  Festival), palm-village, lomi (Hasawi Lomi Exhibition — the long page: intro, «What is the Hasawi lomi?»,
  three FAQ, two links, after.*), uqair-winter, wafrah-winter, horse-racing (one section: the 2026–2027 season),
  creative-ahsa.

The 2026 lomi edition items (tickets section, dated FAQ, hours, the edition title/description) are **not** in the
pack: the edition ended on 13 September and those items no longer render (as in TEXT_DE/RU/UR). Around these
strings the pages print published Turkish: the header/footer (`nav.events`, `foot.l.events`), the breadcrumb home,
the share button, the footer. **Read `ctx` for every string — it was written from the component code.**

## Lessons of the earlier batches — apply them from stage 1
1. **Split, don't reorder.** Long English chains (the lomi intro, the kafu intro, the notes) become two or three
   plain sentences, an explicit subject when it changes, no participle chains before the verb.
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the English
   and the divergence goes into `source_defects`. The Arabic is the arbiter for **name spellings**: every name new
   to the termbase (Kafu, Ghabqa, Al-Wafrah, King Faisal University, Al-Ahsa Expo Center, Al-Salam St / Ain Najm
   Rd, Somewhere …) is transliterated from the Arabic spelling in the plain journalistic form (P1/P4: ق→k, ج→c,
   ش→ş, خ→h, غ→ğ/g as the termbase does; no circumflex, no ʿayn mark), never from the English romanisation.
3. **Who does the verb.** No comma between a participle subject and its predicate; no ambiguous «onun» (name the
   owner, D19 of tr-food-1); the event is the subject of its intro unless the English makes the people the subject.
4. **Buttons are polite-plural imperatives** (UI1-controls); headings, kickers, keys, card values are nouns in
   sentence case (P9); no final stop on them. Badges are short phrases.
5. **A foreign dish or custom word is defined at its first mention, with no case suffix on it in the running
   text** (D1-r3 of tr-food-1, three readers tripped on «aside»): «Ghabqa» in the kafu intro, «bisht» if it needs
   it (termbase «El-Ahsa bişti»; bare «bişt» is attested).
6. **The approved frame binds byte-identically**: `ref.ui` (nav.events, foot.l.events, the saved-places feature
   name, «Open in Google Maps», the plan-your-trip and attractions labels, the FAQ heading), the termbase names
   (El-Ahsa, Hüfuf, Müberrez, El-Ahsa Belediyesi, El-Ahsa Geliştirme Kurumu, Miras Kurumu, El-Ahsa Ticaret Odası,
   El-Ahsa Lomi Sergisi, El-Kaysariye Çarşısı, Kasr İbrahim / İbrahim Sarayı, Hurma Köyü, Muheyris mahallesi,
   Ukayr, Ukayr Plajı, Et-Taraf / Et-Taraf kasabası, Kral Abdullah Çevre Parkı, misket limonu, Arap Körfezi), the
   Hasawi rule (A9/A11: «El-Ahsa …» for things, never a demonym adjective; «El-Ahsalı» only for persons), the
   lime rule (A11-lime: «misket limonu», «(lomi)» Latin once per page at the first mention, never kara/siyah;
   P7 open — `ref.food` printed «kurutulmuş misket limonu (lomi)» for the dried fruit), «Arap Körfezi» (never
   «Basra Körfezi», never «Körfez» alone for the region).

## This batch's own traps
- **One Turkish form per repeated English, across all eleven pages.** «Winter» ×6, «Several weeks» ×4, «A few
  days», «About a week», «Location», «Organisers», «Approximate length», «Highlights», the three status badges and
  six countdown badges — byte-identical in `vl.*` and `vd.*` and across the events. A stage that changes one
  changes all.
- **Months and seasons.** Turkish writes month names lower case unless part of a full date (TDK: «aralıkta»,
  «kasımdan şubata»; but «19 Ağustos 2026», «31 Ekim 2026», «Kasım 2026»? — a month + year is a date: capital).
  Seasons lower case in running text. A card value begins with a capital (it is a cell). **One range pattern**
  for «February – March»-type values across all events and `e.lomi.after.time` — record it as a batch ruling.
- **Countdown badges.** Turkish takes no plural after a number («{n} gün kaldı», never «günler»); `{n}` kept
  exactly; «1 day left» keeps the digit.
- **Event names** are proper names: capitalise each word of the festival's own name (Turkish custom for event
  titles: «… Festivali», «… Geceleri», «… Kışı», «… Sergisi»); «El-Ahsa Lomi Sergisi» is fixed. The «Hasawi»
  in «Hasawi Bisht Festival» follows A9 (El-Ahsa …). Each name is byte-identical in the H1, the card, the meta
  description of /tr/events/ (`vl.seoDesc`) and in any FAQ or intro that names it.
- **Palm Village**: the attraction is «Hurma Köyü» (termbase); the event held there may share the H1 but its tab
  title `e.palm-village.seoTitle` must differ (the English adds «Event»); `e.palm-village.rel.0` links to the
  attraction page — its name.
- **Kafu Nights**: «Kafu» comes from an Arabic verb meaning «to be rewarded» — keep the gloss as the English has
  it; the name keeps one spelling in the H1, the card, the intro and the highlights («Interactive Kafu kitchen»).
- **Lomi page**: the section «What is the Hasawi lomi?» comes from the approved fruits page — `ref.fruits` has the
  approved Turkish lime card: reuse its sentences byte-identically where the English sentence is the same. The
  intro keeps both alternative names («Hasawi Lemon Exhibition», «Al-Ahsa Lemon Festival») — search names.
- **Horse racing**: the 2026–2027 season began on 31 October 2026 — a fact from the owner; the arena's X account
  and YouTube channel are the two buttons `ui.ev.social` / `ui.ev.live` — the paragraph says both are linked on
  the page.
- **Organisers** (`org`): bodies by their termbase names, comma-separated; «Private operators under Al-Ahsa
  Municipality supervision» is a phrase, not a name. King Faisal University: the Turkish university-name pattern
  («Kral Faysal Üniversitesi»; «Kral» as the termbase does for «Kral Abdullah»).
- **ui.ev.\***: keep the structure and the arrow «↗»; the apostrophe is U+0027 (P8 — the checker flags ’);
  «Al-Ahsa Chamber» = «El-Ahsa Ticaret Odası».
- **Register**: a warm, exact events guide — no «eşsiz»/«büyüleyici»/«muhteşem», no brochure cheers, no fact the
  source does not carry; the notices are polite (siz) and plain.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-events` (branch `i18n/tr-events-1`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-events-1`. Stage outputs go in `BATCH\stages\` with the file name your
  message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-events node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-events-1 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it —
  leave it and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-food-1`). **A ruling supersedes any
   role-file sentence that still calls the item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided
   silently — P7 is touched by the lime: apply the site rule, raise P7 in stage 4.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter; `ctx`; `placeholders`; `allowNums`; `unit`; `precedent` =
   published zh/de/ru/ur (for understanding, never copied). `ref.json`: `ui` (the whole approved tr frame),
   `home`, `fruits`, `food`, `terms`, `tm`.
5. Site rules: invent nothing; Latin digits; the dried lime is never «black»; plain text — no links, no bold, no
   headings, no lists; the brand «Visit Al-Ahsa» stays Latin; «Arap Körfezi».

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-events-1", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 187 … },
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
