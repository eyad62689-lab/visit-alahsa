# tr-home-1 — independent proof of the round-2 judge edits (07-judge.r2 vs 07-judge.r1)

Scope: the 10 entries of `changes` in `07-judge.r2.json`, the round-2 rulings H2-r2, H6-r2, H7-r2, H8-r2, H10-r2,
H11-r2, H12-r2, H16-r2, read against `pack.json` (en / ar / ctx / allowNums), `ref.json`, termbase and tm.

## Script checks (node, on the JSON files)
- 10 changes; every `before` equals the r1 string, every `after` equals the final r2 `strings` value.
- 97 keys in r1 and r2; no key outside the 10 differs from r1.
- No straight double quote, no U+2018/U+2019 in any of the 97 strings; no double space; no leading/trailing space
  outside the `keepSpace` pieces. Apostrophes are U+0027 («Suudi Arabistan'ın», «Listesi'ne», «280'den», «Hüfuf'un»).
- Sources line pieces unchanged from r1, byte for byte: «Kaynaklar: » · «Guinness Dünya Rekorları, “En büyük vaha”» ·
  « (hurma ağaçları ve pınarlar); Çevre, Su ve Tarım Bakanlığı istatistikleri (hurma ağaçları); » ·
  «UNESCO Dünya Mirası Listesi» · « (2018).»
- `07-judge.r2.json.check.txt` is empty (1 byte): no checker RESULT line recorded for r2. I did not run the checker
  (it writes beside the stage file; this proof changes no stage file).

## Per key
- **gate.lead** — SOUND. «nesillerdir yaşayan çarşılar» carries "passed down through generations" as continuity
  across generations to today (Arabic «تعاقبت عليها الأجيال»); no age figure added, «asırlık» rightly avoided.
  «nesillerdir» is the everyday adverb; «yaşayan çarşı» is ordinary Turkish for a market still in use. Rest
  unchanged; names (Suudi Arabistan, Doğu Bölgesi, El-Ahsa) as the termbase.
- **memory.lead** — SOUND. «Toprak kaleler» (attributive, as «toprak ev/sur») = "clay fortresses" without the
  sandcastle reading of «Topraktan kaleler» and without the brick claim of «kerpiç» (H8-r2 scope a). «İslam
  tarihinin ilk camilerinden bazıları» = "some of Islam's earliest mosques": «ilk» = earliest (not «en eski» =
  oldest, per ctx), hedge «bazıları» kept; «tarihinin» adds no fact (ru precedent «в истории ислама»). Generations
  phrase byte-identical to gate.lead.
- **water.palmsN** — SOUND. «2,5 milyondan fazla»: decimal comma; «milyon» back vowel o, voiced final n → «-dan»
  correct. Reads with its label «2,5 milyondan fazla hurma ağacı — dünyanın en büyük vahası» (fixed phrase as tm,
  no «doğal», no «hurma» before «vaha»). The suffix sits on «milyon», so every animated frame («1,3 milyondan
  fazla» …) stays grammatical.
- **water.springsN** — NOTE (text SOUND). «280'den fazla»: 280 = «iki yüz seksen», last vowel e, voiced final n →
  «'den» correct; apostrophe after the numeral (TDK), U+0027. NOTE: the count-up runs from 0 and keeps the fixed
  «'den», so intermediate frames show wrong harmony/voicing for many values (e.g. «0'den» for sıfır→'dan, «3'den»
  for üç→'ten, «6'den»/«276'den» for altı→'dan, «40'den» for kırk→'tan, «90'den» for doksan→'dan) for at most
  ~1.8 s; final text and reduced-motion are correct. Not a text fault; a code-side fix (e.g. animate only to a
  value whose suffix agrees, or keep the suffix hidden until the last frame) would remove it.
- **water.springsL** — SOUND. «artezyen kaynak vahayı sular» → «280'den fazla artezyen kaynak vahayı sular»:
  singular noun after a numeral, singular verb, "artesian" kept, «kaynak» the neutral geographic noun; «artezyen»
  as an attributive adjective is acceptable (no compound «kaynağı» needed). Parallel with the other three labels.
- **ui.fact.unesco.l** — SOUND. «vahanın UNESCO Dünya Mirası Listesi'ne alındığı yıl» → «2018 / vahanın … alındığı
  yıl»: the genitive subject answers "what was inscribed" and the inscribed property is the El-Ahsa Oasis (no new
  fact); verb «alınmak» as the tm. Lower-case start is right here: the four labels are continuations of the number
  above them (all four start lower-case: «hurma», «artezyen», «vahanın», «keşfedilecek»), so P9 sentence case is
  not breached; no final stop.
- **map.title** — SOUND. «İlginizi çeken yeri seçin»: natural Turkish H2, sentence case, no stop; the attraction
  image of "what calls you" in site idiom, echoing «Sizi ne çekiyor?» (plan.int.legend). It is plainer than the
  English image, but two readers rejected the literal «Sizi çağıran»; no fact added.
- **saved.count** — SOUND. «Kayıtlı yerleriniz:» + count → «Kayıtlı yerleriniz: 3»; siz possessive matches the
  bar's button «Bu yerlerden rota oluşturun», finale.open «Kayıtlı yerleri açın» and plan.kindSaved «Kayıtlı
  yerlerinizden». The approved «Kayıtlı yerlerim» (ref.ui nav.myTrip) stays the nav link name, untouched.
- **memory.date.qaisariyah** — SOUND. «200 yılı aşkın geçmiş» = "over two centuries" (200 years = two centuries,
  allowNums 200); «aşkın» with the accusative («200 yılı aşkın») correct; three words; «geçmiş» names what spans the
  time without adding a fact; consistent with the summary printed under it («İki yüzyıldan eski»).
- **tip.friends** — SOUND. «… Cebel el-Erba bir kamp ve gezinti noktasıdır.»: removes the second «gezi»;
  «gezinti» = outing/excursion. Names byte-identical (Cebel el-Erba = ref.places.arbaa.title_tr; Hüfuf as termbase);
  sentence keeps its stop (a paragraph, not a label).

## Consistency
- gate.lead and memory.lead carry the identical phrase «nesillerdir yaşayan çarşılar» (H7-r2). «kuşaktan kuşağa
  aktarılan» remains only for crafts (tm), as ruled.
- Four fact cards as phrases: «2,5 milyondan fazla hurma ağacı — dünyanın en büyük vahası» · «280'den fazla
  artezyen kaynak vahayı sular» · «2018 vahanın UNESCO Dünya Mirası Listesi'ne alındığı yıl» · «59 keşfedilecek
  yer» — all read as one phrase, number first, lower-case labels, no stops. The two counted numbers share one word
  shape (H2-r2).
- The sources line says «(hurma ağaçları ve pınarlar)» while the card says «kaynak»: synonyms for one spring, and
  the ruling's reason (avoid a second «kaynaklar» beside «Kaynaklar:») is sound. Acceptable.
- Saved-places person: bar «Kayıtlı yerleriniz: 3» + «Bu yerlerden rota oluşturun», finale «Kayıtlı yerleri
  açın», tag «Kayıtlı yerlerinizden» — one person (siz) throughout; nav name «Kayıtlı yerlerim» kept as approved.
- memory.lead «İslam tarihinin ilk camilerinden» sits on the same chapter as published card summaries with «İslam'ın
  en eski camilerinden biri»; the published text binds, the lead follows its own ctx (H16-r2). Acceptable.
- Date badges: «Hicri beşinci yüzyıl» (words) beside «200 yılı aşkın geçmiş» (digits) — mixed numeral style across
  the two badges, but each follows its own source form/allowNums; no change proposed.
- Names in the edited strings are byte-identical to termbase/ref; «UNESCO Dünya Mirası Listesi» as tm.
