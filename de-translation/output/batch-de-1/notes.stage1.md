# ملاحظات المرحلة 1 — دفعة المعالم الألمانية 1

المصدر الإنجليزي (`*_en` + متن Markdown حيث لزم) والفيصل العربي (متن Markdown + الحقول العربية). الحقول `_ru`/`_zh` قُرئت **للمدى البنيوي وحده** (أي حقل يُترجم وأيّه لا، كم سؤالاً وكم بند بطاقة) ولم تُترجم عنها كلمة.

---

## 1. العبارات المعادة حرفياً — ومن أين

| العبارة الألمانية | مصدرها | الموضع |
|---|---|---|
| `Öffnungszeiten` | `tm-extract.json` ← `jabal-al-qarah`/`practical.label` | `qaisariyah` و`craftsmen-souq` |
| `Eintritt` | `tm-extract.json` ← `jabal-al-qarah`/`practical.label` | `qaisariyah` |
| `Genehmigter Entwurf des Al-Ahsa-Reiseführers` | `tm-extract.json` ← `jabal-al-qarah`/`practical.source` | `qaisariyah` (بندان) |
| `Kostenlos` | `src/content/attractions/qasr-ibrahim.md` → `value_de` لبند «Fees / Free entry» (معتمد) | `qaisariyah`/`practical[1]` |
| `das Töpferhaus, das die Familie Al-Gharash über Generationen weitergegeben hat und das zu den bekanntesten Stätten dieses Handwerks in Saudi-Arabien zählt` | `tm-extract.json` ← `24-hours-itinerary`/`body` | `duqat-algharash`/`summary_de` |
| `auf der Besucher die berühmte Hasawi-Limette (Lomi) pflücken` | `tm-extract.json` ← `48-hours-itinerary`/`body` | `lemon-farm` |
| `Hier leisteten die Bewohner von Al-Ahsa 1913 den Treueid auf König Abdulaziz` | `src/content/blog/24-hours-de.md` و`48-hours-de.md` (معتمدان، الحاكم 2026-09-10) | `baiah`/`summary_de` |
| `Qasr Ibrahim (dem Ibrahim-Palast)` | `tm-extract.json` ← `24-hours-itinerary`/`body` | `baiah`/`body_de` |
| `Besuchsinformationen` | `src/i18n/ui.ts` → `de['det.visitInfo']` (معتمد) | `qaisariyah`/`body_de` |

### عبارات أُعيدت مكيَّفة — والسبب في كل حالة
- `dessen Geschichte mehr als zwei Jahrhunderte zurückreicht` — من زوج «a heritage market over two centuries old …»؛ كُيِّف `Markt` ← `Souk` لأن C18 يفرض `Souk` في نصّ `/de/`، ولأن الصفحة صفحة السوق نفسه لا إشارة عابرة إليه.
- `wenn die Geschäfte ihre Türen öffnen und der Souk zu pulsieren beginnt` — من زوج «Evening is its best hour, when the shops open their doors and the souq finds its pulse»؛ صُدِّر بـ`Am Abend,` بدل `Der Abend ist seine beste Zeit,` لأن الحقل قيمةُ بطاقة تحت تسمية «Beste Tageszeit» فلا تُعيد التسمية في قيمتها (وزن جملة `jabal-al-qarah`: `Am frühen Morgen oder kurz vor Sonnenuntergang, wenn …`).
- `Der Richter von Al-Ahsa … erbaute dieses Haus im Jahr 1203 …` — من المقالين المعتمدين؛ أُضيف `von 705 Quadratmetern` و`bin Muhammad` لأن مصدر هذه الصفحة يحملهما، وأُبدلت `nach der Hidschra` بـ`n. H.` في المتن (السبب في §4).
- `Am Fuß des … im Dorf Al-Qarah` و`Dorf Al-Qarah – …, östlich von Al-Ahsa` — على وزن `24-hours-de.md` و`jawatha-mosque.md`/`area_de` («Dorf Al-Kilabiyah – nordöstlich von Al-Ahsa») على التوالي.
- `in der Saison` أُقحمت في جملة `lemon-farm` لأن الزوج المعتمد استغنى عنها اعتماداً على جملةٍ سابقة في المقال تحمل الموسم، ولا سابقة لها هنا — وحذفُها يُسقط واقعة من المصدر.

---

## 2. أحكام ترجمة غير بديهية (سطر لكل حكم)

**qaisariyah**
- `title_de: "Qaisariyah-Souk"` — مدخل معجم قائم؛ و`titel_regel` تطابقه (الإنجليزي ترجم اسم الجنس ⇒ الألمانية تترجمه بالشرطة الواصلة).
- `kicker_de: "Traditioneller Souk"` — «تراثي» رُدّت إلى `traditionell` لأنها الصيغة المعتمدة لها ولـ«شعبي» في المقالين («a heritage market» ⇐ `einem traditionellen Markt`، «folk souqs» ⇐ `traditionelle Souks`).
- `summary_de` تقول `einer der ältesten Märkte seiner Art` لا `Volksmärkte`: «الأسواق الشعبية» صيغتها المعتمدة `traditionelle Souks`، وتكرارها بعد `Ein traditioneller Souk` في الجملة نفسها كان يُنتج حشواً؛ و`seiner Art` تحفظ القصر المحدود للدعوى بلا زيادة نطاق.
- `die Feinheit ihrer Handstickerei` لـ«دقّة التطريز اليدوي» — `Feinheit` هي كلمة الشغل اليدوي بالألمانية؛ `Präzision` تنتمي لسجل القياس والهندسة.
- `hier schlägt das Herz des traditionellen Einkaufens` — `Shopping` محظورة (Denglisch)، و`Handel` تزيح المعنى من «التسوّق» إلى «التجارة».
- `Öffnungszeiten und Eintritt finden Sie weiter unten unter „Besuchsinformationen“` — تُرجمت إحالةً إلى موضع في الصفحة لا إلى «بطاقة»: `Karte` بالألمانية تُقرأ **خريطة** أولاً، وفي صفحةٍ فيها خريطة فعلاً يصير اللبس حقيقياً.
- صيغة الأسئلة بضمير المتكلم (`Muss ich …`, `Was kann ich …`, `Wann besuche ich …`) — سجلّ الأسئلة المعتمد في `24-hours-de.md`/`48-hours-de.md` («Wie bewege ich mich zwischen den Stationen …»)، والمخاطبة `Sie` محفوظة في المتن وبطاقة الزيارة.
- المواعيد `8:00–12:00 und 15:30–22:00 Uhr`: صيغة `8–12 Uhr` المختصرة (المستعملة في `qasr-ibrahim`) تنكسر مع النصف ساعة، فوُحِّدت الصيغة الكاملة داخل القيمة الواحدة.

**craftsmen-souq**
- `title_de: "Handwerker-Souk"` — نصّ الموجز والوزن القائم `Qaisariyah-Souk`؛ والمقطع الأول `Handwerker-` لا `Handwerks-` لأن الأصل «سوق **الحرفيين**» (أشخاص) لا «سوق الحرفة».
- `kicker_de: "Souk des Handwerks"` — «سوق حرفي»؛ عُدل عن `Handwerks-Souk` لأنه يقع فوق العنوان `Handwerker-Souk` في بطاقة الرئيسية فيُقرأ خطأً مطبعياً لا تسميةً، والصيغة المضافة تحفظ المعنى وتفرّق الشكل (ووزنها ألمانيٌّ قائم في الموقع: `Haus der Kultur`).
- `eine Bäckerei mit Tanur (Lehmofen)` لا `Tanur-Bäckerei` — الگلوس واجب عند أول ورود، والتركيب الاسمي كان يدفع الگلوس إلى داخل المركّب؛ والصيغة المختارة تُبقيه في موضعه الطبيعي.
- الگلوس **لا يتكرر في السؤال الثاني** (`eine Bäckerei mit Tanur` بلا قوس) — `gloss_regel`: مرة واحدة لكل مصطلح في الصفحة، والمتن يسبق الأسئلة في الترتيب المصيَّر.
- `steht unter der Aufsicht der Stadtverwaltung von Al-Ahsa` في الموضعين — العربية (الفيصل) تقول «بإشراف» و«تشرف عليه» في الموضعين معاً، بينما الإنجليزية تتنقّل بين `overseen by` و`run by`؛ وُحِّدت على العربية.
- السؤال الثالث صار «wer hat die **Aufsicht**» لا «wer betreibt ihn» ليطابق جوابه وليطابق «ومن يشرف عليه؟» العربية.
- `12.000 Quadratmetern` و`112 Geschäfte` — نقطة الآلاف حسب `_meta.style_rules.zahlen`، والأرقام لاتينية (C4).

**baiah**
- `kicker_de: "Historische Stätte"` — الصيغة المعتمدة لـ«معلم تاريخي» في `ameeriah.md` و`sahood.md` (الكيكر العربي نفسه حرفياً في الملفين).
- `Bayt Al-Bay'ah (das Haus des Treueids)` — `gloss_regel`: العنوان أبقى النقحرة فتتصدّر النقحرةُ أول ورود في المتن والترجمة في القوس.
- `zu einem der bedeutendsten … Wahrzeichen der Oase` — الضمير في «معالمها» عائد على الأحساء لا على الدولة؛ رُدَّ إلى `der Oase` بدل `Al-Ahsas` تفادياً لتكرار الاسم مرتين في الجملة الواحدة بعد `Anschluss Al-Ahsas`.
- `leisteten ihm die Bewohner … den Treueid` — الضمير بدل تكرار `König Abdulaziz`، تنفيذاً لحكم الحاكم المسجَّل في مدخل المعجم نفسه (حلّ «الحشو» في الجملة المجاورة).
- `Sammlungsstücke` لـ«المقتنيات» (`artefacts`) — `Fundstücke` تعني المكتشَف أثرياً، و«المقتنيات» مقتنيات بيتٍ ومتحف.
- `Rechtsgelehrter` لـ«فقيه» (`jurist`) — `Jurist` بالألمانية هو خرّيج الحقوق الحديث.
- `der Älteste der Familie` لـ«كبير الأسرة» (`elder`) — لا `der Ältere` (صيغة المقارنة).
- الطابقان: `Im Erdgeschoss` / `im Obergeschoss` — الترقيم العربي/الإنجليزي («الأول»/«ground floor») يقع على طابقين مختلفين بين العُرفين، والتسمية الألمانية تحسمه بلا رقم.

**duqat-algharash**
- `title_de: "Dougha Al-Gharash"` بلا اسم جنس — **أهم قرار في الدفعة**، تفصيله في مدخل المعجم الأخير وفي §5 أدناه.
- `600 Jahren` بالأرقام لا `sechshundert` — قاعدة الأرقام اللاتينية في الموقع، ووزن النسختين الروسية والصينية («более 600 лет» / «600 多年»).
- `das Töpferhandwerk … fortbesteht` لا `die Töpferei` — `Töpferei` تحتمل «الورشة» فتلتبس بـ`Töpferhaus` في الجملة نفسها.
- `Heute ist das Töpferhaus eine Station für Besucher` — الإنجليزية تقول `the dougha`؛ لم أستعمل الكلمة مفردةً لأن جنسها المفرد غير محسوم في المعجم (المدخل القائم يحمل الاسم كاملاً)، فأبدلتها بمرادفها الذي منه اشتُقّ جنس المدخل.
- `eine Station für Besucher` لا `ein touristischer Stopp` — `Stopp`/`Spot` من طبقة Denglisch المرفوضة، و`Station` هي كلمة المقالين المعتمدين.

**lemon-farm**
- `summary_de` و`body_de` نصّان متطابقان — كما في `summary_en`/`body_en` وكما فعلت الروسية والصينية؛ الصفحة رقيقة بحكم C23، وإثراؤها قرار محتوى للمالك لا قرار ترجمة (التعليق نفسه مثبت في رأس الملف منذ الدفعة الصينية).
- `Zitrusfarm` لـ«مزرعة للحمضيات» — و`Limette` لا `Zitrone` قاعدةً غير قابلة للتفاوض.

---

## 3. الأجناس النحوية المختارة — وعلّتها

| المدخل | الجنس | العلّة |
|---|---|---|
| `der Handwerker-Souk` | der | من الكلمة الأساس في المعجم: «souq (generic) → der Souk» |
| `das Al-Rifaa-Viertel` | das | Duden: `das Viertel` — ووزن `das Al-Koot-Viertel` المعتمد |
| `der Hasawi-Bischt` | der | من الكلمة الأساس: «bisht → der Bischt» |
| `die „Hasawi-Weberei“` | die | Duden: كل اسم بلاحقة `-ei` مؤنث |
| `das Zari` | das | اسم مادة (لا يظهر مفرداً في هذه الصفحة؛ يرد في مركّب `die Zari-Fäden` وجنسه من `der Faden`) — مؤشَّر للتحقق |
| `die Stadtverwaltung von Al-Ahsa` | die | Duden: `die Verwaltung` |
| `das UNESCO-Netzwerk der Kreativstädte` | das | Duden: `das Netz(werk)` — ووزن `die UNESCO-Welterbeliste` من الكلمة الأخيرة |
| `das Haus des Treueids` · `das Bayt Al-Mulla` | das | Duden: `das Haus` — والمدخل القائم `Bayt Al-Bay'ah` اشتُقّ جنسه بالطريقة نفسها |
| `der Scheich …` · `Abdullatif …` | der | مذكّر بالإحالة إلى شخص؛ ووزن `der König Abdulaziz` القائم |
| `die … Agentur für Altertümer und Museen` | die | Duden: `die Agentur` |
| `der saudische Nationalfeiertag` | der | Duden: `der Tag` ⇐ `der Feiertag` |
| `Jumada I` | der | `der Monat` |
| `die Vereinigten Staaten` | die (جمع) | اسم جمع يلزمه أداة حتى حيث تُهمل أسماء البلدان أداتها |

---

## 4. مواضع رجعتُ فيها إلى العربية — واختلافٌ واحد مسجَّل

1. **`qaisariyah`/`summary`: «أعرق» مقابل `oldest`.** العربية «من أعرق الأسواق الشعبية» (الأرسخ/الأعرق)، والإنجليزية «one of the oldest folk markets». اختلاف درجةٍ لا واقعة، والمتن الإنجليزي نفسه يجمعهما («oldest and most storied»)؛ فحُملت الصفتان: `ältesten` في النبذة و`ältesten und traditionsreichsten` في المتن والسؤال الخامس، وهو ما تحتمله النسختان معاً. **مسجَّل ولم يُلفَّق حلّ.**
2. **`craftsmen-souq`: «تشرف عليه» مقابل `run by`.** العربية تقول الإشراف في الموضعين، والإنجليزية تتنقّل؛ الألمانية على العربية (`Aufsicht`) في المتن والنبذة والسؤال الثالث.
3. **`baiah`: نهاية المتن.** العربية تختم «صور تاريخية وإرشادية **تروي حكاية الدار**»، والإنجليزية تحذف الإحالة الأخيرة. ليس اختلافاً في واقعة بل إيجازاً أسلوبياً، والإحالة نفسها وردت قبل جملتين (`die seine Geschichte erzählen`)؛ فاتُّبعت الإنجليزية لتفادي تكرارها مرتين في فقرة واحدة.
4. **`baiah`: صيغة التاريخ الهجري.** `_meta.style_rules.hidschra` توجب كتابة `nach der Hidschra` كاملةً **عند أول ذكر في الصفحة** ثم اختصارها. وقد تحققتُ من `src/components/views/DetailView.astro` أن `summary_de` يُصيَّر فعلاً على الصفحة (`<p class="ah-sum">`) وأنه أيضاً وصفُ الصفحة (`const description = answer ?? summary` — و`answer` غير معرّف للألمانية أصلاً). فالنبذة هي أول ذكر: فيها الصيغة الكاملة `1203 nach der Hidschra (1789 n. Chr.)`، وفي المتن الصيغة المختصرة `1203 n. H. (1789 n. Chr.)` ثم `1331 n. H. (4. Mai 1913)`. **ثمنه أن التاريخ نفسه يظهر بصيغتين على بُعد سطرين** — تنبيهٌ صريح للمرحلتين 4 و7: البديل الوحيد الآخر هو إسقاط الهجري من النبذة، وهو إسقاط واقعةٍ يحملها `summary_en`، فرجّحتُ القاعدة النصّية.
5. **`baiah`/`duqat-algharash`: لا رقم ولا تاريخ خارج المصدر.** لم يُضف تاريخ اليوم الوطني (23 سبتمبر) ولا مساحة ولا رسم ولا موعد زيارة — لا شيء منها في أي من النسختين.

---

## 5. القرار المعلّق الذي حُسم: عنوان `duqat-algharash`

`title_en` = «Dougha Al-Gharash **Pottery**»، و`title` العربي = «دوغة الغراش» **بلا اسم جنس**. والقاعدتان تتعارضان:

- `titel_regel`: الإنجليزي ترجم اسم الجنس ⇒ الألمانية تترجمه بالشرطة الواصلة ⇐ `Dougha-Al-Gharash-Töpferei`.
- `no_pleonasm`: «دوغة» **هي** بيت الفخار — ومدخل المعجم القائم لهذا الاسم (المعتمد من الحاكم 2026-09-10) يشتقّ جنسه صراحةً «nach Duden über den Gattungsbegriff „das Töpferhaus“» ويمنع «Dougha-Al-Gharash-Töpferhaus» بالاسم.

رجّحتُ `no_pleonasm` لأنها قاعدة صريحة في `SKILL.md` ومطبَّقة على هذه الحالة **بعينها** في نصّ المعجم، بينما `titel_regel` عامة لم تُطبَّق عليها. فالعنوان `Dougha Al-Gharash`، واسم الجنس يصل القارئ الألماني في ثلاثة مواضع أسبق: `kicker_de` و`summary_de` (وهي وصف الصفحة) وأول ورود في المتن (`steht Dougha Al-Gharash, ein traditionelles Töpferhaus, …`) — وهو تماماً موضع الگلوس الذي تطلبه `gloss_regel`. **القرار مرفوع للمرحلتين 4 و7 للبتّ.**

---

## 6. فحص الحرّاس قبل التسليم

- **C18** — صفر `Souq` في كل النصوص الألمانية؛ `Souk`/`Souks`/`Souks` (جمع) و`Qaisariyah-Souk` و`Handwerker-Souk` فقط. يمسّ ثلاث صفحات: `qaisariyah` و`craftsmen-souq` و`baiah`.
- **C17** — صفر U+2014. كل شرطات الاعتراض U+2013 بمسافتين، وكل نطاقات الأرقام والتواريخ U+2013 بلا مسافة (`1853–1921`، `8:00–12:00`، `15:30–22:00`، `7:30–24:00`).
- **C14** — `bestTime_de` واحد في الدفعة (`qaisariyah`)، ونصّه `Am Abend, wenn …`: صفر كلمة موسمية من قائمة `SEASONAL_DE` (لا شهر، ولا `Frühling/Sommer/Herbst/Winter`، ولا `Saison`، ولا `Monat`). كلمة `Saison` وردت في `lemon-farm` وحدها وهي بلا `bestTime` أصلاً، فخارج نطاق الحارس.
- **C4** — كل الأرقام لاتينية: `12.000` · `112` · `705` · `600` · `1203` · `1331` · `1789` · `1913` · `1853–1921` · `2005` · `2007` · `2020` · الأوقات.
- **C15** — لا دعوى «أكبر واحة» في أي من الصفحات الخمس.
- **C16** — لا ذكر لكهوف القارة ولا لدفئها؛ ذكر `Jabal al-Qarah` في `duqat-algharash` جغرافيٌّ بحت.
- **Denglisch** — صفر من `Spot · Location · Must-see · Hotspot · Guide · Feeling · Vibe`؛ و`Highlight` **صفر مرة**.
- **`Sie`** — مخاطبةُ المتن `Sie` في `qaisariyah` و`duqat-algharash`؛ لا `du` في أي موضع؛ ضمير المتكلم في الأسئلة هو صوت السائل لا مخاطبة القارئ.
- **الاقتباس** — `„Hasawi-Weberei“` و`„Besuchsinformationen“` بـ U+201E/U+201C؛ صفر `"` مستقيمة.
- **المسافات** — كل المسافات قبل الوحدات والعملات U+0020 عادية (لا U+00A0)، تنفيذاً لـ`_meta.style_rules.einheiten`.
- **الروابط** — لا رابط داخل أي `body_de`؛ متون هذه الصفحات لا تحمل روابط في المصدر، فلا خطر على `check-links`.

---

## 7. تنبيهات للمراحل التالية (خارج نطاق المرحلة 1)

1. **`src/i18n/ui.ts` → الكتلة `de:` لا تحمل مفتاح `det.faq`.** فحصتُ الكتلة (السطور 675–838): فيها `blog.faq: 'Häufige Fragen'` وليس فيها `det.faq`، فيتراجع عنوان الأسئلة الشائعة في صفحة المعلم إلى الإنجليزية. هذه الدفعة **أول من يضيف أسئلةً ألمانية لصفحات المعالم** (لا `q_de` واحد في `src/content/` اليوم)، فستظهر العلّة لأول مرة معها — وتزيد نسبة النص الإنجليزي التي يقيسها C22. المطلوب عند التطبيق: `'det.faq': 'Häufige Fragen'` موازياً للمفتاح المعتمد `blog.faq`.
2. **الروابط الألمانية في المقالين تقصد الإنجليزية اليوم** (`/en/attractions/qaisariyah/` · `/en/attractions/duqat-algharash/` · `/en/attractions/baiah/` · `/en/attractions/lemon-farm/` في `24-hours-de.md` و`48-hours-de.md`) — وهذا هو الوعد المكسور الذي فتحت الدفعةُ لأجله. متى وُلِّدت الصفحات الخمس وجب تحويل الأربعة إلى `/de/…/`، وإلا بقي الكسر قائماً رغم وجود الصفحات.
3. **`lemon-farm` صفحة رقيقة بحكم C23** — تُبنى `noindex` وخارج sitemap بكل لغاتها. ترجمتها هنا لأن الرابط الألماني يقصدها، لا لتُفهرس.
4. **خمسة مداخل معجم من سبعة عشر بمصدر «بانتظار تحقق الويب — المرحلة 4»:** `das Zari` (جنس المفرد) · `die Stadtverwaltung von Al-Ahsa` · `das UNESCO-Netzwerk der Kreativstädte` · `die saudische Agentur für Altertümer und Museen` · `Jumada I`. كلٌّ منها معلَّل في حقل `note` مع بديله المحتمل وعدد المواضع المتأثرة (موضع واحد في كل حالة عدا `Stadtverwaltung` فثلاثة). تحقُّق اليوم: `unesco.de` و`unesco.at` و`de.wikipedia.org` و`duden.de` مغلقة كلها على هذه البيئة، و`WebSearch` وحدها تعمل ولم أعدّها سنداً على تسميةٍ رسمية.
   والمدخل السابع عشر (`Google Maps`) ليس اسماً جديداً بل **سدُّ ثغرة قائمة**: الاسم مستعمل في النص الألماني المعتمد (`ui.de['det.openMaps']` والمقالان) وليس في المعجم، فأُدرج كي تبقى قاعدة «لا اسم علم خارج المعجم» بلا خرق.
5. **تناقض بنيوي في المستودع مرفوع للمرحلة 7:** `ameeriah.md` → `area_de: "Viertel Al-Na'athil – …"` (تركيب تقديمي، 2026-09-03) مقابل `das Al-Koot-Viertel` المعتمد من الحاكم (شرطة واصلة، 2026-09-10). اتّبعتُ الأحدث في `Al-Rifaa-Viertel` و`Al-Koot-Viertel`؛ وسحبُ `ameeriah.md` إلى الصيغة نفسها قرارٌ خارج هذه الدفعة.
