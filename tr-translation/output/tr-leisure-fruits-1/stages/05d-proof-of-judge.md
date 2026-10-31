# 05d - Independent proofread of the judge's round-1 edits (tr-leisure-fruits-1)

## Scope

Fresh-eyes check of the 18 `changes` in `stages/07-judge.r1.json` (judge round 1), each `after` read against the English
(Arabic where they diverge), the `ctx`, the motivating ruling (F1-F13), the termbase and tm, and the strings around it
(the `k` kickers in a group, `fg.2.f2.pre` / `sci` / `post`, the pill set). Plus a script pass over all 114 strings.
Files read: BRIEF.md, prompts/05-proofreader.md, 07-judge.r1.json, 05-proofreader.json, pack.json, ref.json,
termbase.json, tm.json. Nothing else was edited.

**Result: 13 SOUND · 0 FAULT · 5 NOTE**

## Per key

1. `fv.heroSum` - SOUND. Two sentences; the list form "Bu meyveler arasinda ... vardir" carries every item of the English
   (golden summer rutab, winter kanar, the famous lime) with no fact moved. Gloss of rutab "(taze, yumusak evredeki hurma)"
   once, per F1(b); kanar gloss is the termbase one; "misket limonu" and "dunyanin en buyuk vahasi" as bound. Bare
   "rutab" / "kanar" match every pill and the termbase. Month/place-free as ruled.
2. `fv.stats.1.l` - SOUND. Prints after the count-up "400 bin": "400 bin meyve agaci, hurma agaclarinin yani sira" reads as
   "in addition to the palms", which is the English "alongside"; parallel with `fv.stats.0.l`, no final stop, sentence case.
3. `fv.frEyebrow` - SOUND. Plain noun phrase, no final stop, sentence case; "tour" calque gone; no added fact.
4. `fv.frH` - SOUND. "Her mevsimin kendi meyvesi" keeps "a fruit for every season"; no final stop; no count claim.
5. `fv.less` - SOUND. Polite-plural imperative, pair with `fv.more` ("Devamini okuyun" / "Devamini gizleyin") is one noun;
   UI1-controls respected. (The English noun "description" is not carried on the closing label - the judge says so; accepted.)
6. `fg.0.f0.alt` - SOUND. One phrase, no final stop; "Halas" byte-identical; "Halas rutabi" (izafet, vowel i) and
   "olgun Halas hurmasi" use the F1 stage words; "iki kasede ... tek tabakta duran" reads once (two bowls, one platter).
7. `fg.0.f1.pre` - NOTE. Passive "saklanmaya ve dondurulmaya" fixes the ice-cream misreading; "Halas'tan" has the right
   suffix/apostrophe; "Dibs (hurma pekmezi)" gloss kept once; six short sentences. Point for the judge: the English
   "relatively soft, thick texture" now reads "eti kalin ve nispeten yumusak" - texture became flesh thickness, a small
   semantic move that is defensible (hedge "nispeten" kept) but not literal. No change required.
8. `fg.0.f2.alt` - NOTE. "Pirinc bir kasede" is correct Turkish for a brass bowl (TDK pirinc = brass alloy) and follows the
   English, not the Arabic copper (defect recorded). Residual ambiguity remains for a reader who sees only "pirinc kase"
   (rice); if the judge wants it closed, "Pirinc metalinden bir kasede" adds no fact. Not a fault.
9. `fg.0.f2.pre` - SOUND. English order kept (base of sifsif, the sweet's description, then "as well as of molasses itself");
   three subjects explicit (Raziz / Bu tatlı / Raziz); "temel malzeme" twice, once per head; hedges "sayilir", "nispeten" kept;
   "Sifsif" capital is sentence-initial; "meclis salonlarinda" per A2-meclis.
10. `fg.1.f0.pre` - NOTE (three small points, no fault). (a) "ikinci en onemli urunudur" for "second crop after dates"
    adds "onemli" that the English/Arabic ("second crop") do not state; it is consistent with the intro's "en onemli urunu"
    and is a defensible ranking reading. (b) "The governorate celebrates it" has become an agentless passive ("kutlanir");
    the governorate is not named (it was already so in stage 05). (c) The comma in "Ticaret Odasi, El-Ahsa Gelistirme
    Kurumuyla is birligi icinde" is optional and could be read as the start of a list until "-yla" is reached; harmless.
    Everything else is sound: custom sentence split in three, "cemid" gloss once with "kurutulup bekletilmis" (no "kara",
    P7 respected), "(lomi)" gloss before "Lomi Sergisi'nde", institution names without apostrophe ("Kurumuyla" per the
    termbase entry "El-Ahsa Gelistirme Kurumu") and the event name with it, "100.000", "25-30 kg" as the source.
11. `fg.1.f1.season` - SOUND. F4 shape (2): "ocak ayindan mart basina kadar", lower case, stage-less season label with colon,
    "from ... to" kept; matches the other January pill (`fg.3.f1.season`).
12. `fg.2.f0.pre` - SOUND. The first sentence now has its subject ("Bu kavun"); every fact of the English present (heirloom,
    selective cultivation and seed keeping, yellow colour, tolerance of heat and scarce water, five nutrients, low calories,
    summer hydration); "yerel bir cesit" for "local strain"; "tur" absent; "dogal bir kaynak" keeps "natural", no C15 issue.
13. `fg.2.f1.pre` - SOUND. "tur" -> "cesit" for "type" of fig; the planting sentence split at the semicolon, "Bu yuzden"
    opens the next; "tek lokmalik", "birçok incirin aksine", "mubarek", "Kur'an-i Kerim'de" (U+0027, termbase form) as source.
14. `fg.2.f2.post` - NOTE. Leading space kept (keepSpace), reads as one sentence with `pre` ("... bilimsel adi " + "Cordia myxa"
    + " olup sebestan, muheyt ve hambu adlariyla da bilinir"). "Tatlidir" fixes the tautology; "ornek gosterilir" renders
    "proverbial". Point: "o kadar yapiskandir ki yapiskanligiyla ornek gosterilir" repeats the root twice in one clause; a
    shorter option is "meyve eti ise yapiskanlikta ornek gosterilir" (drops "o kadar ... ki" and the repeated root; "proverbial"
    kept). Style only, not a fault.
15. `fg.2.f3.pre` - NOTE. "iki cesidi vardir" for "red and green varieties" is right and the rest of the paragraph is unchanged.
    Point: two senses of "cesit" in four sentences ("iki cesidi" = the red/green sorts, "cesit de ... tehdidi altina girmistir" =
    the whole Hasawi grape); the English does the same ("varieties" / "the variety"), so it is faithful. No change required.
16. `fg.2.f4.pre` - SOUND. "birkaçinda" = "several of" (English "several of Al-Ahsa's traditional fruits", Arabic aded min);
    "neredeyse yok oldu" agrees with the tag `fv.rare` "Yok olmak uzere"; "Suvari" quoted (F7).
17. `fg.3.f1.season` - SOUND. "yaklasik ocak ayindan mart sonuna kadar" = "from around January to late March"; same January shape.
18. `fg.3.f1.pre` - SOUND. "cesit" for the sidr fruit's types, three quoted cultivar names byte-identical with the termbase
    additions (Tuffahi, Ümm Suleym, Sini), "armut bicimli ve Hint cesitleri"; the last sentence now has a visible owner
    ("bu meyvenin satin alinmasina") and keeps "folk chants of its own"; "Kur'an-i Kerim'de" correct.

Cross-set points checked: the `k` kickers are identical within each group (Hurma x5, Narenciye x2, Yaz meyveleri x6, then
Ilkbahar meyveleri / Kis meyveleri as the English); `fg.2.f2.sci` "Cordia myxa" is untouched and byte-identical; the
pills as a set use one shape (see below).

## Consistency and script checks

Script (ASCII only, reads the JSON, no Turkish typed into a shell):
- 114 keys in `strings`, 114 in 05, 114 in pack; none missing, none extra: PASS.
- every `changes[i].after` equals `strings[key]`; every `before` equals the stage-05 string; no no-op change: PASS (18/18).
- diff of `strings` against 05: exactly 18 keys, all in `changes`, none outside: PASS.
- straight double quote U+0022: 0; U+2019: 0; U+00A0: 0; guillemets: 0; apostrophes: 27, all U+0027: PASS.
- curly quotes balanced in every string: PASS. Not NFC: 0. Space before punctuation: 0. Double spaces: 0.
- edge spaces: only `fv.countPrefix` (trailing, keepSpace), `fg.2.f2.pre` (trailing) and `fg.2.f2.post` (leading) - all
  `keepSpace` in pack: PASS.
- digits: every string's digits equal the English or the Arabic digits (no "digit diff" line): PASS.
- tm_pairs: 114 entries, covers all 114 fields, `tr` equals `strings[field]` for every one, `en` equals the pack English: PASS.
- tm.json: no English of the 18 changed keys has an earlier approved pair (no verbatim-reuse conflict): PASS.
- «tur» as a word for variety: 0 occurrences (only "kulturel", "dusuktur"); "cesit" used for variety in 11 fg strings.
  No "yas hurma"/"taze hurma" as a name; no "kara"; no "sen/senin"; no "-mektedir/-maktadir"; no "yer almak"; no "eski" before a name.
- «Rutab:» / «olgun hurma»: pills read "Rutab:" x4 and "Olgun hurma:" x4 (and "Rutab ve olgun hurma:" once); alts use
  "rutabi / rutab" and "olgun ... hurmasi"; `fg.0.f3.pre` uses "rutab" and "olgun hurma"; "tamr" absent: PASS.
- F4 month shapes: "Ekim 2020 tarihli", "Ekim 2024'te" (capital), "15-25 Eylul" (capital), all recurring periods lower case,
  both January pills "ocak ayindan": PASS.
- Names in the edited strings: Halas (+ -tan), Raziz, El-Ahsa (+'nin, 'da), El-Ahsa Gelistirme Kurumu (no apostrophe, as the
  termbase entry), El-Ahsa Ticaret Odasi, El-Ahsa Lomi Sergisi('nde), Kur'an-i Kerim('de), Tuffahi, Ümm Suleym, Sini
  (quoted): PASS.
- Final stops on labels/pills/alts/heads: none (the only strings ending with "." are leads, descriptions and sentences).

Out-of-scope observation (not one of the 18, not a fault of the judge's round): `fg.0.f1.season` prints "ağustos ortası - sonu"
with spaces round the en dash, whereas the English there is "mid-late August" with no spaces and the ctx asks for no
spaces where the English has none; `fg.0.f0.season` ("temmuz ortası - ağustos sonu") is correctly spaced because its English is.
A decision for the judge's next round if desired: "ağustos ortası–sonu" (unspaced).
(Note: Turkish words in this report are partly written without diacritics for ASCII safety; the quoted strings are cited from the JSON.)
