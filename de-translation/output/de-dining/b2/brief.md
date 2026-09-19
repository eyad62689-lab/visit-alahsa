# دفعة `de-din-2` — الأسئلة الشائعة وصندوق المنهج وأسماء الأحياء في `/de/restaurants-cafes/` (ج6، الدفعة 2 من 5)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-dining/`)

## النطاق — 33 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| الأسئلة الشائعة (19) | `ix.faqH` · `ix.faq0.q/a/linkText` · `ix.faq1.q/a` · `ix.faq2.q/a` · `ix.faq3.q/a/linkText` · `ix.faq4.q/a` · `ix.faq5.q/a` · `ix.faq6live.q/a` · `ix.faq6static.q/a` |
| صندوق «حول هذه الصفحة» (2) | `ix.methodH` · `ix.methodP1` |
| أسماء المواقع في القائمة المنسدلة (12) | `dist.alkoot` · `dist.downtown` · `dist.rafah-north` · `dist.khalidiyah` · `dist.rawdah` · `dist.mazrou` · `dist.uwaimriyah` · `dist.olaya` · `dist.khaleej` · `dist.mubarraz` · `dist.khudud` · `dist.qarah` |

السؤال السابع بصيغتين **يظهر منهما واحد**: `faq6live` حين تُحمَّل بيانات Google (الإنتاج)، و`faq6static` حين لا تُحمَّل. الأسئلة تُصدَّر أيضاً `FAQPage` في JSON-LD (السهم يُنزع من نصّ الرابط هناك). إطار الصفحة (العنوان والهيرو والبحث…) في دفعة `de-din-1` الموازية: H1 = **«Restaurants und Cafés»** (المنشور `nav.dine`) — اسمُ القائمة في الأسئلة يتّسق معه.

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` المعجم + مداخل ذات صلة + أزواج ذاكرة + الجيران المنشورون + **كتلة `/de/stay/` المنشورة** (أسئلتها وصندوق منهجها — نظائر مباشرة) + كتلة `/de/food/` وبطاقات أطباقها + بنود BINDING التسعة من حاكم ج5). المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **الأحياء الاثنا عشر تُقرأ في ثلاثة مواضع**: خيار القائمة المنسدلة (بعدده: «Al-Koot-Viertel (3)»)، والسؤال 3 (`faq2.a`)، والسؤال 6 (`faq5.a`) — **الاسم الواحد حرفٌ واحد في المواضع الثلاثة** (الحارس ينبّه). الصيغ المنشورة سلفاً على الموقع الألماني **ملزمة**:
   - `dist.alkoot` ⇐ المعجم **«Al-Koot-Viertel»** (das).
   - `dist.downtown` «Historic downtown Hofuf / وسط الهفوف التاريخي» ⇐ المنشور في صفحات المعالم الألمانية **«im historischen Zentrum von Hofuf»** (craftsmen-souq · koot-park) — والتسمية المستقلة في القائمة بصيغة الاسم (Historisches Zentrum von Hofuf). **لا «Altstadt»** هنا: المنشور يستعملها لـ«الهفوف القديمة» (`faq2.q` «old Hofuf» ⇐ «Altstadt von Hofuf» منشورة في ameeriah وفي سؤال `/de/stay/`).
   - `dist.rafah-north` «Al-Raf‘ah North / الرفعة الشمالية» ⇐ المنشور **«Al-Rifaa-Nord-Viertel»** (hamidiyah-souq: area_de وbody_de وa_de) — النقحرة الألمانية المستقرة للموقع **Rifaa** لا «Raf‘ah». قرّر: الاسم المجرّد «Al-Rifaa-Nord» أم «Al-Rifaa-Nord-Viertel» كالمنشور، واتّسق به في الموضعين الآخرين. العربية «الرفعة الشمالية» بلا «حي» في القائمة، و«حي الرفعة الشمالية» في `faq2.a`.
   - `dist.mazrou` «Al-Mazrou‘ / المزروع» ⇐ **فخّ**: المعجم فيه «das Al-Mazrouiyah-Viertel» وهو **المزروعية، حيٌّ آخر** — لا يُستعمل هنا. انقحر «المزروع» بنمط المعجم في العين (`naming_policy`) وسجّله مدخلاً جديداً بمصدره.
   - `dist.uwaimriyah` ⇐ المعجم «das Al-Uwaimriyah-Viertel»؛ `dist.khaleej` ⇐ المعجم **«die Al-Khaleej-Straße»** (تسمية القائمة بلا أداة: «Al-Khaleej-Straße»)؛ `dist.mubarraz` ⇐ «Al-Mubarraz» (مدينة، بلا أداة)؛ `dist.qarah` ⇐ «Al-Qarah» (قرية — المعجم: «Al-Qarah (village)»).
   - الباقي (`khalidiyah` · `rawdah` · `olaya` · `khudud`) بلا مدخل: نقحرة الإنجليزية، ولا «-Viertel» إلا حيث تقول العربية «حي» (الخدود: «حي الخدود») — **قرار واحد متّسق** يُسجَّل في notes. كل اسم جديد مدخلُ معجم بمصدره.
2. **السؤال 2 (`faq1`)**: «Dar Basma» و«Al-Koot Heritage Hotel» **لاتينيان كما تسمّي المنشأتان نفسيهما** (BINDING ج5: بلا شرطة داخل الاسم). «the Al-Koot Heritage Hotel Restaurant» ⇐ مطعم الفندق («das Restaurant des Al-Koot Heritage Hotel») — اسم الفندق يبقى حرفاً. «the Qasr Ibrahim park / حديقة قصر إبراهيم» ⇐ Durchkopplung. **«directly opposite the fort» والعربية «مقابل القصر»** — العربية الفيصل؛ والمنشور على `/de/stay/`: «gegenüber Qasr Ibrahim» (Qasr Ibrahim مذكّر في المعجم).
3. **السؤال 3 (`faq2`)**: أسماء المقاهي الستة لاتينية كما هي: Baithana · Bait Al-Koot · Dar Huwaija · Al-Sayed Café · Ratio Al-Koot · 7st. «King Abdulaziz Road» ⇐ المعجم **«König-Abdulaziz-Straße»** (منشورة)؛ «King Fahd Road / شارع الملك فهد» ⇐ بالنمط نفسه «König-Fahd-Straße» (مدخل جديد مشتقّ). «beside Qasr Ibrahim».
4. **السؤالان 1 و4 وروابطهما**: الأطباق بأسمائها المنشورة على `/de/food/` حرفاً — **Hasawi-Reis · Mandi · Harees · Dattelbrot** (الحارس يشترطها). و`faq3.a` **يحمل الزوج „rotes Brot“ و«Dattelbrot» معاً** (`C5b`) — «red bread and date bread being the same thing». «Hasawi red bread / الخبز الأحمر الحساوي» ⇐ «Hasawi» صفةً مركّبة بنمط المعجم (Hasawi-Reis · Hasawi-Küche). الرابطان يقصدان `/de/food/` (H1 المنشور **«Hasawi-Küche»**) وينتهيان بـ« →»، ونظيرهما المنشور على `/de/stay/`: «Details auf der Seite Al-Uqair-Strand →».
5. **السؤال 5 (`faq4`)**: «Ain Najm Road» ⇐ المعجم **«die Ain-Najm-Straße»**؛ «Baking Up» و«Dot Bakery & Café» لاتينيان حرفاً؛ «Al-Mubarraz» بلا أداة.
6. **السؤال 6 (`faq5`)**: «Al Hofuf» بلا شرطة في الإنجليزية ⇐ **«Hofuf»** (المعجم). القائمة طويلة بشرطتين اعتراضيتين U+2013 ثم فاصلة منقوطة — أعد بناءها ألمانياً مقروءاً بلا إسقاط اسم واحد (تسعة في الهفوف · المبرز على طريق عين نجم · القارة شرق الواحة). «the historic Al-Koot district / حي الكوت التراثي» ⇐ `Kulturerbe-`؟ المعجم يخصّ البادئة بـ«heritage»؛ تحقّق.
7. **السؤال 7 (`faq6live` / `faq6static`)**: `{date}` مرة واحدة حرفياً في `faq6live.a`. «verified from official sources» في `faq6static.a` بقوّتها بالضبط. **Sie** في «افتح رابط…». لا وعد بتحديث لا يقوله المصدر.
8. **`ix.methodP1`** — BINDING ج5: عبارة «وصفية لا ترشيحية» بفعلٍ («… beschreibt nur, ohne zu empfehlen» أو ما يوازيها بفعل)، **لا** «ist beschreibend, keine Empfehlung». «not reviews or dish recommendations / لا تقييماً ولا توصية بأصناف بعينها» — الأمران كلاهما. نظيره المنشور على `/de/stay/` في context. `ix.methodH` ⇐ المنشور «Über diese Seite».
9. **`ix.faqH`** ⇐ نظير «Häufige Fragen zum Übernachten in Al-Ahsa» المنشور؛ «Al Ahsa» ⇐ «Al-Ahsa».

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel). أسماء الأحياء والمدن بلا أداة تُسجَّل `artikel: "— (Ortsname, artikellos)"` على سابقة المعجم.
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي**.
- ممنوع Denglisch: `Event(s)` · `Spot(s)` · `Location` · `Must-see` · `Hotspot` · `Guide`.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-din-2"`، `stage`، `strings` (**المفاتيح الـ33 كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
