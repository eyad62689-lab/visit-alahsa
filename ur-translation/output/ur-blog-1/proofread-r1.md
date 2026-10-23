# Proofread r1 — ur-blog-1 (judge round 1)

**Totals: 3 MANDATORY, 8 RECOMMENDED.**

Scope: `ur-05.json` (before) against `judge-r1.json` (judge text, 13 `judge_edits`, rulings N795–N797, `termbase_additions`, `tm_pairs`, `notes`). The three MANDATORY items are all in the record (`termbase_additions`). No MANDATORY error was found in the Urdu text of the six changed strings.

## Diff confirmation

- `strings` has the same 43 keys in the same order in both files.
- Exactly 6 keys differ: `24-hours.body`, `48-hours.description`, `48-hours.faq.1.a`, `48-hours.body`, `worth-visiting.description`, `worth-visiting.body`. These are exactly the keys of the 13 `judge_edits`. There is no silent change.
- I applied the 13 `before`→`after` pairs, in order, to the `ur-05.json` strings. Each `before` occurs exactly once, and the result equals the judge's `strings` byte for byte, so there is no change inside a key beyond the 13 edits.
- `notes`: the first 50 are identical to `ur-05.json`, followed by 7 `[j1]` notes. `termbase_additions` is identical to `ur-05.json` (9 entries).

## Mechanical checks on the 6 changed strings (and a scan of all 43): PASS

- **Letterforms.** The regex `[يكةهىأإۃ]` finds nothing in any of the 43 strings. U+0624 (ؤ) and U+0626 (ئ) are legitimate Urdu letters (پڑاؤ, ئ in بنائے/چاہئیں), and U+064B appears only once, in «تقریباً». `ھ` stands only after an aspirate letter everywhere. There is no U+06C0, no U+06C2 and no ZWNJ.
- **Digits and NBSP.** There are no Arabic-Indic or Persian digits and no U+00A0. The digits present are 2018, 1203, 1788, 1913, 1937 and 48 (in «(48 گھنٹے)»), and «25 لاکھ» for the 2.5 million (P10/N66).
- **Punctuation.** There is no `؛`, `«»`, straight quote, U+2013/2014, Latin `,` or `.` after Urdu, no space before `۔` or `،`, and no double or trailing space. `“ ”` are balanced in every string. No heading ends in a stop. Every body sentence closes with `۔`.
- **Address.** There is no `تم`, `تمہارا` or `تیرا`. Every `تو` is a conditional or connective particle. All imperatives are the honorific `-یں` form.
- **Markdown (the three bodies).** Against `ur-05.json` and against the English source:

| body | H2 | H3 | `- ` items | bold pairs | links | link targets vs `pack.links` | link texts |
|---|---|---|---|---|---|---|---|
| 24-hours | 5 | 0 | 6 | 4 | 12 | all 12 equal | unchanged |
| 48-hours | 3 | 7 | 3 | 6 | 14 | all 14 equal | unchanged |
| worth-visiting | 4 | 0 | 5 | 13 | 13 | all 13 equal | unchanged |

  The bold contents are identical to `ur-05.json`. Italics are 0 in all three, which is the recorded owner ruling N7 (the etymology italics are not carried).
- **Published names.** All 21 attraction link texts (6 + 9 + 6) equal `ref.places[...].title` byte for byte. The page names are verbatim from `ref.ui`: «کھانے پینے کی جگہیں», «میرے محفوظ کردہ مقامات», «سفر کا منصوبہ بنائیں», «الاحساء کے پکوان», «بازار، پارک اور زرعی فارم». «سیاحتی مقامات کا نقشہ» is the map page title used in ur-04's N792 note.
- **Facts.** I read the six strings sentence by sentence against `en` and `ar`. Nothing is added or dropped by the 13 edits.
  - The season «وسط جون سے اگست کے آخر تک» equals the published home.route.s5.d form (N268).
  - «الاحساء کے لیموں» follows N281/N794.
  - The «(lomi)» is not written (N794).
  - The lime-season, hours and Friday clauses are intact.
  - 48-hours.faq.1.a stands alone, and its «ان مقامات» mirrors the English "these stops".
- **C15/C16.** «دنیا کا سب سے بڑا نخلستان» has no «کھجور» or «قدرتی». The cave sentence says summer and winter.
- **Agreement in the edited sentences.**
  - «منصوبہ … پیش کر دیتا ہے» (m.).
  - «پہاڑ … شامل ہے».
  - «کھانے کی جگہیں اور قہوہ خانے جمع ہیں» (pl.).
  - «وقت … موزوں ہے».
  - «آپ کو … راستہ مل جائے گا».
  - «احوال … ملے گا» (m. sg.).
  - «پرسکون … باب» (invariable adjective, m.).
  - «سعودی عرب کی کسی اور جگہ».
  - «اسے کتنے دن چاہئیں».
- **N792 forms in the edits.** «رہنما “[…](…)” میں» and «“[…](…)” کے صفحے میں» keep the class word outside the marks and the link inside.
- **Rulings, ids and dry run.**
  - New ids N795, N796 and N797 are inside the judge range (795 upward, from `pack.ids`).
  - They are unused anywhere in `ur-translation/` (termbase top id N739; other batches' ranges are 730–854 elsewhere and disjoint).
  - No `guard` field is written, so no automatic guard is added.
  - `base_amendments` is `[]` and `withdrawn` is `[]`. No stage-4 ruling of this batch is overruled: N796 states that it applies N602, and N795 builds on P3c (2) and N660 (4).
  - A dry run of `ur-plan-1/merge-memory.mjs` (no `--write`) on a scratch copy of `judge-r1.json` without the three existing-key entries (M1) passes: `termbase +6 (pending)، أحكام 436 (+3 حاكم + المرحلة 4)، تعديلات 0، أسئلة 0؛ tm 1631 → 1674`.
- **N795 against the text.** Every first mention of «سوق القیصریہ» in a unit carries «نامی بازار» once: 24-hours.description, 24-hours.faq.0.a, 24-hours.body, 48-hours.body and worth-visiting.body. Headings and the faq.1.q list-of-two are bare, and faq.1.a («سوق القیصریہ کی دکانیں») is bare under point (4).
- **N797 against the text.** «حساوی لیموں کا باغ» is never followed by a postposition anywhere in the batch.
- **tm_pairs.** There are 43 pairs, one per string, no duplicate and no extra. Each `ur` equals the final `strings` and each `en` equals the pack `en`. The page is `blog` throughout (merge-safe: no existing `blog` page). The five whole-string TM matches (nav.blog, det.faq ×2, home.why.eyebrow, ui.trails.unesco) are reproduced byte for byte.
- **Score record.** Per-page minima 92/91/90/90 equal `scores.per_page`, and the batch score 90 is the lowest. The axes sum to 90. The `scores_row` passes the merge regex, and `verify.mjs ur-blog-1 judge-r1.json` prints `OK`.

## MANDATORY

### M1. `termbase_additions`: three entries are keys that already exist in the termbase, so the merge stops

- **Keys:** «سفری منصوبہ» (ur-home-1, N612), «چاشت» (ur-home-1, N602) and «پڑاؤ» (ur-trails-1 / N526).
- **Evidence:** `node ur-plan-1/merge-memory.mjs REPO ur-blog-1 judge-r1.json` (no `--write`) stops with `Error: مدخل قائم: سفری منصوبہ`. The tool throws on any existing key. The same would follow for «چاشت» and «پڑاؤ».
- **Why it matters:** the entries are not harmless duplicates. Their `en`/`ar` differ from the existing entries.
  - «سفری منصوبہ»: existing en "your route / itinerary (home planner result)", ar «مسارك». The addition says "itinerary (a plan of stops for a trip)", ar «جدول سياحي / خطط وبرامج».
  - «پڑاؤ»: existing en "stop (of a trail)", whose note carries N526.
  - The notes of the additions also say "Pending in the termbase until the coordinator enters it", which cannot happen for an existing key.
- **Same case as** ur-stay-1 proofread r1 (M1, «ہوٹل»).
- **Fix:** remove the three objects from `termbase_additions` (6 remain). Carry their evidence as appended text on the existing entries, as ur-dining-2 did with `termbase_notes`:
  - «سفری منصوبہ»: used for the blog itineraries, with plural «سفری منصوبے» and the topic label (N790/N791).
  - «چاشت»: used in the blog headings (N796).
  - «پڑاؤ»: used for the stops of a blog itinerary, in running text and descriptions (N790). N526 stays reserved for trail pages, as N734 reads it.
- **Cross-effect:** M3 below is the same kind of defect. Fix both in one pass.

### M2. `termbase_additions`: «بے لاگ» has `gender: null`

- **Entry:** `en` "honest / frank (of a guide)", `ur` «بے لاگ», `gender: null`.
- **Rule:** every entry needs `en`, `ur`, `source` and `gender` (batch rule). The termbase schema allows «مذکر | مؤنث», and all 536 existing entries have one except «شریک حیات» (explicitly common gender). This is the same finding as ur-static-1 proofread r1 (M1: gender null on two entries).
- **Fix:** set `"gender": "مذکر/مؤنث (invariable adjective, agrees with the noun it qualifies)"`, in the form of the existing «شریک حیات» entry. Alternatively set `مذکر` and add "adjective, invariable" to the note. The text needs no change («ایک بے لاگ رہنما» is masculine, agreeing with «رہنما»).

### M3. `termbase_additions`: «شیخ عبد الرحمن بن عمر الملا» is a second key for a person who already has one

- **Entry:** `en` "Sheikh Abdulrahman bin Omar Al-Mulla (short form)". Its own note says "Proposed as a recorded variant of the existing key, not a new person".
- **Existing key:** «شیخ عبد الرحمن بن عمر بن محمد الملا» (kind person, pending).
- **Rule:** N665 says "A person's key identifies the person". A merge would create a second `person` key for the same man, so the record would contradict its own note and N665.
- **Precedent:** ur-stay-1 proofread r1 (M2, «شہزادہ سعود بن نایف»).
- **Fix:**
  - Remove the object from `termbase_additions`.
  - Append the short form «شیخ عبد الرحمن بن عمر الملا» to the note of the existing key, with the evidence: both EN and AR of this batch give the short form, the text keeps «شیخ» and the family article (N27), and N700 (3) is the analogy for a shorter form.
  - Say in that note that N665's "attested in the reference" condition is not met for any Urdu form of this name (the key's own source says he was not found in Urdu), so the licence is the two sources.
  - The text stays as it is.

## RECOMMENDED

1. **`48-hours.description` is now 161 code points (it was 144).**
   - The window for descriptions is 110–160 (`SEO_LIMITS`). C72 skips `/ur/`, so nothing fails, but the string is also the meta description and the index-card text.
   - Fix: drop «اس کے» — «… دوسرا دن نخلستان، پانی اور ساحل کے لیے۔ پڑاؤ دن کے آہنگ کے مطابق ترتیب دیے گئے ہیں۔» (155). The English "its water" is carried by the body.
2. **N796 record is slightly off.**
   - Its `binds` names «24-hours.title», but the title («الاحساء میں ایک دن: مختصر قیام والے سیاح کے لیے 24 گھنٹے کا سفری منصوبہ») has no «چاشت».
   - The ruling says "the five places". The word occurs six times: 24-hours.description, 24-hours.faq.0.a, the 24-hours H2, «چاشت کی روشنی», and the two 48-hours H3s.
   - Fix: "24-hours.description/faq.0.a/body (H2 and «چاشت کی روشنی»), 48-hours.body (two H3s)" and "six places". The same wording appears in ur-04 note [s4] «چاشت» (`ur-05.json` note 30, "each of the five places"). Do not edit that earlier note; give the count in the ruling only.
3. **`24-hours.body` bullet and `48-hours.faq.1.a`: the judge's `why` says the sentence "takes the form the 48-hours body already has".**
   - 48-hours.body has a comma, «شامل کریں، اور آپ کو …».
   - The two repaired sentences have none, «شامل کر لیں اور آپ کو …» and «ترتیب دے لیں اور آپ کو …».
   - Both are correct Urdu, but the three sentences are the one repeated sentence of SD-B8. Either add the comma in the two (`، اور`) or reword the `why`.
4. **`48-hours.body` lime sentence: the object is still far from its verb** («ڈھلتی سہ پہر، جب گرمی کم ہونے لگے، [حساوی لیموں کا باغ] دیکھنے کے لیے رکھیں»).
   - `blind-reader.r1.md` #30 (a reader of the judge text) still marks it medium for that reason.
   - N797 form kept, option: «اگر آپ کا سفر انہی دنوں میں ہو تو [حساوی لیموں کا باغ](/ur/attractions/lemon-farm/) دیکھنے کے لیے ڈھلتی سہ پہر رکھیں، جب گرمی کم ہونے لگے۔»
5. **`24-hours.body`: «رہنما “کھانے پینے کی جگہیں” میں کھانے کی جگہیں اور قہوہ خانے جمع ہیں» repeats the page title inside the same clause.**
   - `blind-reader.r1.md` #14 reads it as circular.
   - The English "the restaurants and cafés are gathered in the … guide" has the same repetition, so this is only a possible smoothing, not an error; the form may stay.
6. **`termbase_additions` «تاریخ اشاعت / آخری ترمیم» is one composite key with " / ".**
   - The termbase has no slash keys, so a check for the byte-identical key «آخری ترمیم» (a published visa-guide label) or «تاریخ اشاعت» would not find either.
   - Fix: two entries (both feminine, as the entry already says).
7. **`termbase_additions` «العلا»: `kind` is "place".**
   - The termbase uses "toponym" (162 entries, none "place"). Set `"kind": "toponym"` (the neighbour «ریاض» is a toponym).
   - Not verified here: the ur.wikipedia HTTP 200 claim in `source` (I did not fetch it).
8. **The «ہرا بھرا، پرسکون، جیتا جاگتا باب» edit changes the English "slow" to the Arabic «الهادئة» (calm).**
   - The reason is in the edit's `why`, but not in `source_defects` or `notes`, and stage 1's divergence list has no line for it.
   - Add a one-line divergence (EN "slow" / AR «الهادئة» → «پرسکون», Arabic arbiter) so that a later reader of the record can see it. The text is acceptable.
