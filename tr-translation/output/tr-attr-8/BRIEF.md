# Batch `tr-attr-8` — five attractions (standing brief for every stage)

Every agent on this batch reads this file first. The message that started you only names your stage.

## What the batch is
The eighth Turkish attractions batch, after `tr-attr-1` to `tr-attr-7` (all 90/100) — four parks and a museum:
**kanzan-park** (Kanzan Adventure Park (Al-Shu'bah) — being built, not open), **koot-park** (Al-Koot Park),
**musa-park** (Al-Moosa Park), **stadium-park** (Sports Stadium Park — a one-sentence body), **ahsa-museum**
(Al-Ahsa Museum) — 39 strings in `pack.json`: title, summary, body (plain text), area (none on stadium-park),
and two visit-card rows on every page (Hours, Fees). No FAQ. The name rulings in `_meta.batch_rulings` for
`tr-attr-1` … `tr-attr-7` bind (e.g. translated generics «Gölü/Plajı/Parkı» (A6) and «Müzesi»; «Cebel Kanzan»,
«Eş-Şube» and «Cebel eş-Şube» (A5); «El-Kut mahallesi»; «Kasr İbrahim»; «Müberrez» article-less; «El-Ahsa
Belediyesi»; «16.00–24.00» for midnight; «iyileştirecek» for "humanise" (A5-words); the country before a Saudi
ministry (A6); the leisure frame «Çarşılar ve parklar» / «Tüm çarşılar ve parklar →» (A7-frame) is now
approved frame).

**Three lessons of the earlier batches — apply them from stage 1:**
1. **Split, don't reorder.** Never three place complements before the verb; two short sentences instead; an
   explicit subject («Park, …», «Müze, …») when the previous sentence's subject was something else; after a
   genitive or place chain, end the sentence and name the place again (A6-r2-subject).
2. **The English is the translation source.** Where the Arabic differs on a fact, the Turkish follows the
   English and the divergence goes into `source_defects`. The Arabic is the arbiter for *name spellings* and
   for flagging.
3. **Who does the verb.** With play equipment, visitors or exhibits, name the place with a locative («parkta»,
   «müzede») or make the people the subject. Words readers misread before: «sınırlıdır», «eski» before a name,
   «simge», «diğer» before a list that is itself the content.

**This batch's own traps:**
- **kanzan-park is not open yet.** Keep the English's tense and status exactly («is building», «will», planned
  features) — never present planned slides, bridges or waterfalls as existing. The card says «Daily 4:00 pm –
  midnight» and «Free entry»: translate it as given and record the contradiction with an unbuilt park as a
  `source_defect`, not an edit.
- **Programme names in quotes** («humanising cities», «We Play Together»): render the meaning plainly in Turkish
  inside “”, consistent with A5-words for "humanise"; record the Arabic (أنسنة المدن, …) in a termbase proposal.
- **Disability wording**: plain, respectful current Turkish («engelli çocuklar») — no pity words, nothing the
  English does not say.
- **Museum hours**: P10 with days «Pazar–Perşembe 08.00–14.30 (cuma ve cumartesi kapalı)» — keep every fact.

## Paths
- REPO = `C:\Users\truyr\node-store\va-wt\tr-a8` (branch `i18n/tr-attr-8`). READ ONLY for every stage.
- BATCH = `REPO\tr-translation\output\tr-attr-8`. Stage outputs go in `BATCH\stages\` with the file
  name your message gives you.
- Checker: `TR_REPO=C:/Users/truyr/node-store/va-wt/tr-a8 node C:/Users/truyr/node-store/va-scratch/tr-r1/tools/verify.mjs tr-attr-8 <file> [--prev <file>]`
  (in Bash). Run it until `RESULT [OK]`. If a finding looks wrong, do not shape the text to it — leave it
  and report it.

## What binds every stage
1. `REPO\.claude\skills\tr-translation-pipeline\SKILL.md`, `REPO\tr-translation\PLAN.md`,
   `REPO\tr-translation\config.json`, your role file in `REPO\tr-translation\prompts\`.
2. `REPO\tr-translation\glossary\termbase.json`: `terms` (byte-identical, with their suffix vowel),
   `_meta.calibration_rulings` (P1–P5, P8–P10 and the named rulings — **P3**: generics follow title_en and are
   translated; **P10**: «16.00–24.00», «08.00–14.30», days «Pazar–Perşembe») and `_meta.batch_rulings`
   (`tr-ui-1`, `tr-attr-1` … `tr-attr-7`). **A ruling supersedes any role-file sentence that still calls the
   item open.** `_meta.open_items` (P6 P7 P11 P12) are not decided silently.
3. `REPO\tr-translation\memory\tm.json`: an approved pair is reused **verbatim** when its English recurs —
   «Hours» → «Ziyaret saatleri», «Fees» → «Ücretler», «Free entry» → «Giriş ücretsiz», «Open 24 hours» →
   «24 saat açık», «Daily 4:00 pm – midnight» → the King Abdullah park value without its bracket.
4. `pack.json`, per string: `en` source; `ar` arbiter on facts to *flag* (for `body`, `arabic_body`); `ctx`
   says where it renders; `precedent` = published zh/de/ru/ur (for understanding, never copied). `ref.json`:
   approved frame (`ui`), calibration page, `places` (**byte-binding** — «Kasr İbrahim»), termbase entries
   present in the sources, `tm`.
5. Site rules: invent nothing (opening dates, equipment, exhibits, ticket rules, superlatives the English does
   not have); Latin digits; "the largest oasis in the world" (never palm/natural); plain-text bodies — no
   Markdown, no links; the Gulf is «Arap Körfezi» (P5); the brand «Visit Al-Ahsa» stays Latin.

## Names in this batch (P1–P4: from the Arabic spelling, Turkish orthography, article as the Arabic writes it)
Every proper noun not in the termbase is **proposed with its Arabic spelling, suffix vowel and a source**
(tr.wikipedia.org · islamansiklopedisi.org.tr · sozluk.gov.tr · aa.com.tr; record the URL and what it
showed — never claim a hit you did not see), or marked `unattested` with the Arabic it was built from.
Expect at least: منتزه كنزان / الشعبة (rule the title against «Cebel Kanzan» and «Eş-Şube»: «Kanzan Macera
Parkı (Eş-Şube)»?) · حديقة الكوت (El-Kut is ruled: «El-Kut Parkı»?) · حديقة الموسى (El-Musa — from the Arabic) ·
حي الفيصل (El-Faysal mahallesi) · منتزه الملعب الرياضي · متحف الأحساء (El-Ahsa Müzesi; the Saudi heritage body
that runs it, if named — on A6 with its country) · any ministry, initiative or programme the bodies name.

## Body text
Plain paragraphs separated by one blank line exactly where the English has them; the structure (number of
paragraphs, order of facts, attributions «X'e göre») follows the English; no sentence opens two in a row with
«X'e göre». Clock times per P10, Hijri per the calibration (P11 open), Gregorian years bare.

## Output shape (Write tool, UTF-8 JSON)
```
{ "batch": "tr-attr-8", "stage": "<01|02|03|04|05|07>", "strings": { "<key>": "<Turkish>", … all 39 … },
  "changes": [ { "key", "before", "after", "why" } ],   // stages 02–05 and 07: every edit, nothing else
  "notes": [ "…" ], "termbase_proposals": [ { "tr", "ar", "en", "suffix_vowel", "kind", "source", "note" } ],
  "source_defects": [ { "keys", "defect" } ] }
```
Body strings contain `\n\n` between paragraphs. Write Turkish only with the Write tool, or with a node script
that reads an earlier stage's JSON (never through a shell heredoc or `node -e`). Keep console output ASCII.

## Report back
Plain text, short: the checker's RESULT line verbatim; the three most consequential decisions with one line
of reasoning each; termbase proposals; source defects; what you could not verify.
