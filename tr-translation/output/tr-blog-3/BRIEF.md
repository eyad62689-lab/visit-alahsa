# Batch `tr-blog-3` — the Turkish blog: the two long sourced articles (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The Turkish blog `/tr/blog/` is live with seven articles (`tr-blog-1`, `tr-blog-2`). This batch adds the **last two**,
**34 strings** in `pack.json` (read `ctx` for every string). No ui key. For each article `src/content/blog/<stem>-en.md`:
`title`, `description`, `topic`, `tags.N`, `faq.N.q` / `faq.N.a`, and **`body`** (Markdown).
- `hasawi-lomi-history` — where the Hasawi lime came from: botany, the routes west, Eastern Arabia, Al-Ahsa or Qatif,
  the name «Bin Zuhairi», witches' broom disease, and a numbered **Sources** list of 17 entries (the body has three more «1. » items elsewhere)
  (`/tr/blog/hasawi-lime-history/`).
- `tarafa-ibn-al-abd` — the pre-Islamic poet Tarafa ibn al-Abd and Al-Ahsa: what the classical sources say and where
  they are silent, the letter of al-Mutalammis, Hajar / al-Bahrayn / Al-Ahsa, the ship verses of the Mu'allaqa, what a
  visitor finds today, and a numbered **Sources** list of 25 entries (`/tr/blog/tarafa-ibn-al-abd-and-al-ahsa/`).
Both are **scholarly in content, travel-magazine in register**: every claim is tied to a cited source, and the hedges
(«the books say», «we found no …», «as reported») are content — keep each one exactly as strong as the English.

## What is new in this batch (read twice)
1. **Arabic verse and quoted Arabic stay byte for byte.** Every Arabic line of the English body — the ten verse lines
   in blockquotes («> وظُلمُ ذَوِي القُرْبى …») and the half-line «لِخَوْلةَ أَطلالٌ ببُرْقَةِ ثَهْمَدِ» in «…» — is
   copied **exactly**, with every diacritic, every space and the «> » prefix, and the «…» around the half-line kept as
   the English has them. Never retype it: copy from `pack.json → strings[*].en`. The Turkish rendering of a verse is the
   italic line inside the same blockquote, as in the English («>» empty line, then «> *…*»). The checker (`VERSE`)
   compares every Arabic run with the English and counts the «>» lines. The published German, Russian and Chinese
   articles do exactly this (the Urdu respells in Urdu orthography — not a model for Latin-script Turkish).
2. **External links stay byte for byte**: every `https://…` href (shamela.ws, saudipedia.com with an Arabic path,
   almaany.com, journals, PubMed, Wikipedia, SPA …) is copied unchanged and in the same order — the checker compares
   the hrefs in order. Internal `/en/…` hrefs map through `pack.json → links`.
3. **Classical names and titles in their established Turkish form.** Turkish has a scholarly tradition for these
   (TDV İslâm Ansiklopedisi, Turkish editions of the Mu'allaqât): Tarafe, Muallaka, İbn Kuteybe, Yâkūt el-Hamevî and
   so on. Rules:
   - Use the established Turkish form where one exists, and **verify it on the web** (TDV İslâm Ansiklopedisi entry
     titles are the reference); record each in `notes` with its source. Where none exists, transliterate by the same
     convention (Turkish letters; â î û for long vowels where the convention writes them; ' for hamza/ayn; no q w x
     and no sh kh th dh digraphs).
   - One form per name across both articles, the body, the FAQ and the Sources list. In running text a reader-friendly
     form («Tarafe bin el-Abd» or «Tarafe b. el-Abd» — decide once, `notes`); the Sources list may use the bibliographic
     convention of Turkish scholarship for author and work titles (e.g. «İbn Kuteybe, eş-Şi'r ve'ş-şuarâ»).
   - The historic names: Hajar, al-Bahrayn (the old region, not the modern state — keep the distinction the English
     draws), al-Hira, al-Mutalammis, Amr ibn Hind, Bakr ibn Wa'il … — the established Turkish forms, verified.
   - Al-Ahsa stays «El-Ahsa» (termbase); its old names as the termbase or the established form gives.
4. **Dates of death and years**: «d. 232 AH» → a short Turkish scholarly form («ö. 232 h.» or «(ö. h. 232)» — decide
   once, `notes`). **No converted Gregorian year the English does not give** (the checker flags any number not in the
   source). «vol. 1, p. 137» → «c. 1, s. 137» (Turkish citation convention); «pp. 132, 135 and 138» likewise. «Links
   checked on 2026-10-10» → a Turkish date with Latin digits.
5. **The Sources lists**: numbered «1. » items, as many as the English, in the same order (the checker counts them). Each
   entry: author, work, volume/page, the colon and what it supports (translated), then the link. Link texts: «Al-Maktaba
   Al-Shamela» → its established Turkish name (verify: «el-Mektebetü'ş-Şâmile» or the form Turkish scholarship uses);
   a site name written in Latin by the site itself («Saudipedia», «Almaany», «Nature», «PubMed», «Wikipedia», a
   journal) stays as written. The title of a cited English paper, if quoted, stays in English inside “…”.
6. **Botany and medicine** (the lime article): Latin binomials byte-identical (*Citrus × aurantiifolia* …), the Turkish
   common names established in Turkish botany/plant pathology (verify: e.g. witches' broom disease of lime = the
   Turkish phytopathology term); «Key lime» / «Mexican lime» as the Turkish literature names them (verify, `notes`).
7. **The name «Bin Zuhairi»**: in the blog it is «El-Bin Züheyri» (ruling F30-r4, tr-blog-2 — three readers took «Bin»
   for the number). The article explains the name itself (Persian «banzahir», «antidote»): keep the etymology exactly as
   the English and the Arabic give it; the transliterated word «banzahir» stays a quoted foreign word.

## Rulings that bind this batch (beyond the termbase)
- **tr-blog-1 and tr-blog-2 rulings** (`termbase.json → _meta.batch_rulings`, the live ones; `superseded_by` = replaced):
  BL1-titles-r2 (sentence case after the colon), BL1-headings (Sonuç …), BL1-blog-phrases («(yerel adıyla lomi)» at the
  first bare «lomi» of an article; «kesin bilgi için resmî kanallara bakın» for the hedge), BL2-second-crop-r3,
  BL2-signature-r2, BL2-press-hedge and BL2-blog-tense («Basında çıkan haberlere göre …», tense of the paragraph),
  BL2-subject-comma-r2 (no comma after a plain subject), F30-r4.
- **The lime**: «El-Ahsa misket limonu» (termbase), «Lomi Sergisi», the farm «El-Ahsa Misket Limonu Çiftliği». **Dried
  lomi is never described as black.** The article compares Al-Ahsa and Qatif: keep the English's even-handedness to the
  word — no side strengthened.
- **Tarafa and Al-Ahsa**: the article's whole point is what the sources do and do not say. Never turn «the books say his
  road ended at Hajar» into a fact, never turn the modern Saudipedia statement into a classical one, never drop «we
  found no …». The festival is past («it has passed») — keep its tense; add no date or place the English lacks.
- C15 «dünyanın en büyük vahası». «Arap Körfezi». UNESCO «UNESCO Dünya Mirası Listesi» if it appears.
- **Nothing invented**: no hours, fees, years, distances. The Arabic decides a divergent fact (`source_defects`).
- Siz throughout; split rather than chain; quotes “…” for Turkish quotations (the Arabic «…» half-line is the one
  exception, byte-identical); Latin digits.

## Decisions to make in stage 1 (and list in `notes`)
- The running-text form of Tarafa's name, and the bibliographic forms of the Sources lists (each verified).
- The death-date form, the citation abbreviations, the Turkish name of Al-Maktaba Al-Shamela.
- Topic labels: both topics are already published — «From the Oasis's Bounty» = «Vahanın bereketinden»
  (`hasawi-lomi-tr.md`), «Heritage & Crafts» = «Kültür ve zanaat» (`crafts-tr.md`): byte-identical.
- The verse layout (where the italic Turkish lines go, one per verse or one per couplet) exactly as the English body.
- Tags as a Turkish reader would search; FAQ questions as typed into a search engine, answers that stand alone.

## Register
A Turkish cultural feature (the register of a good Turkish culture/travel magazine: Atlas, Skylife's long reads): clear,
varied sentences, siz, no academic jargon in the body, no promotional padding, no calques of English connectors. A
heading is a phrase in sentence case, no final stop; a heading that is a question keeps its «?».

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-sd` (branch `i18n/tr-blog-3`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-blog-3`. Stage outputs go in `BATCH\stages\` with the file name your message
  gives you.
- Sources: `REPO\src\content\blog\<stem>-{en,ar,de,ru,zh}.md`; the published Turkish articles
  `REPO\src\content\blog\*-tr.md` (seven — the register and the rulings applied, especially `hasawi-lomi-tr.md`); the
  records `REPO\tr-translation\output\tr-blog-{1,2}\README.md`.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-sd node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-blog-3 <absolute stage file> [--prev <absolute file>]`
  (in Bash; absolute paths). Run it until `RESULT [OK]`. For bodies it checks: hrefs in order (internal ones mapped
  through `pack.links`), the structure counts (h2, paragraphs, «- » items, «1. » items, «>» lines, bold), the Arabic
  runs byte for byte (`VERSE`). If a finding looks wrong, do not shape the text to it — leave it and report it.
  (SPELLING flags «q w x sh kh th dh» inside words; a capitalised word copied from the English and a quoted span the
  English carries pass.)

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` and `_meta.batch_rulings` (`tr-ui-1` … `tr-blog-2`). **A ruling supersedes any
   role-file sentence that still calls the item open**; a ruling with `superseded_by` is replaced by the named one.
   `_meta.open_items` are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs.
4. `pack.json`, per string: `en` source; `ar` arbiter on names and facts; `ctx`; `precedent` = published zh/de/ru/ur
   (for understanding, never copied; the German and Russian articles show the structure, the verse layout and the
   Sources lists). `ref.json`: the approved tr frame (`ui`), the linked landmarks (`places`), `terms`, `tm`.
5. Site rules: invent nothing; Latin digits.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-blog-3", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 34 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit with full before/after text
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
A body is one JSON string with `\n` line breaks. A `changes` entry carries the whole string before/after (the checker
compares them with the texts). Write Turkish only with the Write tool, or with a node script that reads an earlier
stage's JSON (never through a shell heredoc or `node -e`). **The bodies are long (16–22 KB of English each)**: if one
Write is too large, write the file with the two bodies as placeholders first, then fill each body with a node script
that reads a UTF-8 text file you wrote with Write — and copy the Arabic lines from `pack.json` in that script, not by
retyping. Write the file as soon as the strings are done, before further checking. Keep console output ASCII. Leave no
scratch files in BATCH (use `C:\Users\truyr\node-store\va-scratch\tr-r1\blog3j\` for scratch).

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line of
reasoning each; termbase proposals; source defects; what you could not verify.
