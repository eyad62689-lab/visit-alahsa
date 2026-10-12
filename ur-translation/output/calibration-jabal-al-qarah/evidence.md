# Calibration evidence — measured 2026-10-11 by the coordinator

Everything below was measured directly (API calls and page fetches, code points inspected), not recalled.
Raw logs: `evidence/wd-out.txt`, `evidence/wd2-out.txt`, `evidence/un-out.txt`, `evidence/gender-run.log`, `evidence/spa-out.txt`, `evidence/alt-out.txt`, `evidence/udb-out.txt`.

## E1 — The reference set in PLAN §٤ is partly wrong
- **`spa.gov.sa` has NO Urdu edition.** `GET https://www.spa.gov.sa/ur` → `307 Location: /ar`. The site's language switcher lists exactly: `ar en id es fa fr ja ru tr zh`. The PLAN, the termbase `sources_priority`, SKILL.md and prompts 01/04 all cite "the spa.gov.sa Urdu service" as reference no. 2 — that service does not exist.
- **`saudipedia.com` has no Urdu edition either** (`/ur` → 404; hreflang: `ar fr de ru zh` + en).
- `whc.unesco.org` and `visitsaudi.com`: no Urdu edition (as the PLAN already states).
- **What does exist:** `urdunews.com` — «اردو نیوز», the Urdu daily published from Saudi Arabia (SRMG), which carries SPA copy in Urdu (photo credits read «فوٹو: ایس پی اے»). Six of its Al-Ahsa articles were fetched and scanned: **zero** Arabic letterforms (`ي ك ة ه`) in their text — it is clean native-edited Urdu. It is the paper the target reader (Urdu speakers resident in the Kingdom) actually reads. It is press usage, not an official gazetteer.
- `ur.wikipedia.org` API works. Caveat measured: its article «جبل القارہ (سعودی عرب)» is a machine-assisted rendering of the Arabic article (an untranslated Arabic sentence is left in the text, and the title of the Eastern Province article is «الشرقيہ علاقہ» with a leaked Arabic `ي` U+064A). **Use it for name forms and frequencies, never for style.**
- `rekhtadictionary.com` and `udb.gov.pk` are reachable. `udb.gov.pk/result.php?search=…` returns definitions; the result list does not print the gender label (the entry page must be opened).

## E2 — Head name «الأحساء» (open item P2)
| form | ur.wikipedia exact-phrase hits | Urdu News (6 articles) |
|---|---|---|
| `الاحساء` | 156 — also the title «محافظہ الاحساء» | 4 (one headline + the site's tag page `/tags/الاحساء`) |
| `الاحسا` | — (not counted separately) | **36** (headlines and running text) |
| `الحسا` | 64 (airport article «الحسا بین الاقوامی ہوائی اڈا») | 0 |
| `الحساء` | 41 — the title of the city article, whose first line reads «الحساء یا الاحساء» | 0 |
| `احساء` (no article) | 33 (mostly biographies: «احساء کے ممتاز علما») | 0 standalone |
| `الأحساء` (Arabic hamza kept) | 27 | 0 |
- Both sources keep the article `ال` on the head name. Nobody writes it with a Latin name.
- Urdu orthography commonly drops a word-final hamza after alef in Arabic loans and names (`علماء`→`علما`, `حراء`→`حرا` as in «غار حرا», `صنعاء`→`صنعا`): that is what «الاحسا» does. «الاحساء» is the Arabic spelling with only the hamza-alef normalized (`أ`→`ا`), i.e. what the pipeline's "build from the Arabic spelling" rule yields mechanically.
- The site's brand is «زوروا الأحساء» / "Visit Al-Ahsa".

## E3 — The article `ال` in place names (open item P1)
- `جبل القارہ`: ur.wikipedia title «جبل القارہ (سعودی عرب)» = Wikidata Q12204761 Urdu label. `"جبل قارہ"` → **0** hits. The article is kept.
- `ہفوف`: ur.wikipedia title and Wikidata Q27136 label; `"ہفوف"` 104 hits vs `"الہفوف"` 4. The article is dropped (established exonym).
- Same split across the gazetteer: `ریاض`, `دمام`, `قطیف`, `ظہران`, `جدہ`, `مکہ`, `مدینہ` drop it; `المبرز`, `الخبر`, `الاحساء/الاحسا`, `القارہ` keep it.
- So attested Urdu usage is a per-name split, exactly like the Russian line's P1: well-known cities carry an Urdu exonym without the article; everything else is the Arabic name as written.

## E4 — Other names on or near this page
- `سعودی عرب`, `سعودی ریال` (ur.wikipedia titles; Wikidata Q851, Q199857). `ریاض`, `دمام`, `ظہران`, `قطیف`, `الخبر`, `المبرز`, `مسجد جواثا`, `قصر ابراہیم` — ur.wikipedia titles.
- Eastern Province: ur.wikipedia title «الشرقيہ علاقہ» (defective, see E1); running text there says «مشرقی صوبے»; Urdu News says «مشرقی ریجن» (×3) and «مشرقی علاقے» (×1). Not on this page.
- «أرض الحضارات» / "Land of Civilisations": **no Urdu attestation found** (ur.wikipedia, Urdu News). Any Urdu form is built by us from the Arabic.
- World Heritage: ur.wikipedia «یونیسکو عالمی ثقافتی ورثہ» (603 hits); Urdu News «عالمی ورثے کی فہرست», «یونیسکو». Not on this page.

## E5 — Common nouns
- oasis: `نخلستان` 461 hits on ur.wikipedia vs `واحہ` 9; Urdu News `نخلستان` ×26, `واحہ` ×0; **`udb.gov.pk` has no entry for «واحہ» at all** (0 results). Rekhta: «نخلستان — فارسی، عربی - اسم، مذکر — کھجور کے درختوں کا باغ». Oblique plural `نخلستانوں` 44 hits.
- cave: `غار`. Gender is **contested in usage**: masculine agreement «بڑا غار» 2, «یہ غار واقع ہے» 2, «غار دریافت ہوا» 2, «غار پائے جاتے» 1; feminine «بڑی غار» 3 and the feminine plural «غاریں» 75 hits (the ur.wikipedia Jabal Al-Qarah article and an Urdu News headline «300 سے زیادہ غاریں دریافت» both use it). The classical dictionaries are understood to give masculine (to be verified on the entry page, not assumed). → raised as **new open item P12**.
- date palm / dates: «کھجور کے درخت» 64, «کھجور کا درخت» 21, «کھجوریں» 76 (feminine plural of the fruit); Urdu News «کھجوروں کے درخت», «کھجور کے سایہ دار درختوں کے جھنڈ».
- lime/lemon (P6): `لیموں` 154 hits; `لائم` 278 (mostly inside other words/names — not a clean count); an Urdu News headline about Al-Ahsa's own limes reads «الاحسا کے خوشبو دار لیموں».
- large numbers (P10): ur.wikipedia `"2.5 ملین"` 58 vs `"25 لاکھ"` 81; Urdu News on Al-Ahsa: «25 لاکھ سے زیادہ کھجوروں کے درخت», «20 لاکھ کے قریب», «ڈھائی لاکھ» (×4 `لاکھ`) vs «33 ملین درخت» (×1).
- Gulf (P5): ur.wikipedia `خلیج فارس` 658 vs `خلیج عرب` 30; `خلیجی ممالک` 116, `خلیجی خطے` 5.
- holy cities (P9): `مکہ مکرمہ` 1277 / `مکہ میں` 1194; `مدینہ منورہ` 2480 / `مدینہ میں` 737 (ur.wikipedia article title is «مدینہ منورہ»).

## E6 — Template facts that shape the page (read from `DetailView.astro`, 2026-10-11)
- The body is rendered as ONE plain-text `<p>`; no Markdown.
- `practical[].source*` and `verifiedAt` are internal and are **not rendered**. The visit card instead shows one fixed line (`det.hoursNotice`) whenever it lists hours or fees.
- `kicker` is rendered only on the home-page featured card, never on the detail page.
- There is no English kicker in the repo.
