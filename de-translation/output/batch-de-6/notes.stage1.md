# المرحلة 1 · `batch-de-6`

**37 حقلاً جديداً · 5 صفحات** (‏`uqair-beach` 17 · `arbaa` 5 · `salwa-beach` 5 · `shaban` 5 · `tuwaither` 5) — مطابقٌ لجدول الموجز. ولم يُكتب `answer_de` ولا مُسّت الاثنا عشرَ حقلاً المنشورة (‏`Öffnungszeiten und Eintritt` في الأربع): قُرئت من `source.json` والتُزم اتساقُها (‏`Frei zugängliches Gelände – kein Eintrittsgeld` بشرطة U+2013، و`Bestätigung durch das Redaktionsteam von Visit Al-Ahsa`).

## أ. المُعاد عن المنشور والذاكرة

| الموضع | المصدر المعتمد |
|---|---|
| `Naturlandschaft` في الخمس | `asfar.md` (‏`attr-de-2`، 94) — الصيغة المنشورة الوحيدة لـ«معلم طبيعي» |
| `An der Golfküste` · `das Blau/der Golf` | tm ‏`uqair-mosque.body` ‏(«An der Golfküste östlich von Al-Ahsa») — ولا `Arabischer/Persischer Golf` |
| `das Tor Al-Ahsas zum Meer` | مبنيّ على `al-uqair.body_de` المنشور («das Tor Al-Ahsas zur Welt») مع تغيير «الوجهة» كما في المصدر («to the sea» / «بوّابة الأحساء البحرية») |
| `Am frühen Morgen …` | tm ‏`jabal-al-qarah.bestTime` — مفتتحُ `bestTime` المستقر |
| `Schattendächer` لـ«مظلات» | `national-park.body_de` المنشور + قرار `batch-de-5` (ب-6) |
| `Spazierweg` لـ«ممشى» | `koot-park.body_de` المنشور (‏`Spazierwege`) |
| `die Kommunalverwaltung von Al-Ahsa` | tm ‏`craftsmen-souq` · `women-souq` |
| `des Jabal al-Qarah (des Qarah-Bergs)` | tm ‏`tahimiyah-e.body` — ترتيبُ الگلوس بعنوان الصفحة المقصودة (‏`titel_de: Jabal al-Qarah`) |
| `Dorf Al-Tuwaither – die östlichen Dörfer, Al-Ahsa` | نمطُ `tahimiyah-e.area_de` المنشور حرفاً بحرف |

## ب. اختلافُ الإنجليزية والعربية — وكيف حسمته العربية

1. **`shaban`: العربية تحمل تعليلَ اسم «القارة» والإنجليزيةُ تُسقطه.** العربية: «وبعدما غلبت على ذلك الجبل الشهير تسمية «القارة» **نسبةً إلى البلدة المجاورة**»؛ الإنجليزية: «As the name 'Al-Qarah' prevailed for that famous mountain». أُثبتت بالعربية (القاعدة 6): `… der Name „Al-Qarah“ nach dem benachbarten Ort durchsetzte`. وكُتبت `Ort` لا `Dorf` ولا `Stadt`: المصدر لا يسمّي البلدة هنا، وسابقةُ مدخل `Al-Jafr` تجعل `der Ort` الترجمةَ المحايدةَ لـ«بلدة».
2. **`shaban`: «من كل جانب» عربيةٌ فقط** («أحاطت به من كل جانب حتى شبع») ⇒ `von allen Seiten`. و«حتى شبع» محمولةٌ في الگلوس المعتمد `„der Satte“` فلم تُكرَّر.
3. **`uqair-beach` ‏`faq[0].q`: العربية «المبيت» والإنجليزية «stay».** العربيةُ أدقّ ⇒ `übernachten` لا `sich aufhalten`.
4. **`arbaa.summary`: العربية «شهيرة» والإنجليزية «a favourite».** ⇒ `ein bekanntes Ziel` (لا `beliebt`، فهي دعوى تفضيلٍ لا سندَ لها). ومتنُ الصفحة يقول «أشهر/best-known» ⇒ `zu den bekanntesten Zielen` — فرقُ الدرجة محفوظ بين الحقلين كما في المصدرين.
5. **`arbaa`: گلوسُ «الأربع» في الإنجليزية وحدها** («('the Four')»)، والعربيةُ تقول «ومن هنا جاء الاسم» بلا شرح. أُبقي الگلوس `„die Vier“` لأن مدخلَ المعجم يقضي بأنه **موثَّق لا مضاف** (‏`Al-Arba Mountain`, note).
6. **`arbaa.area`/`salwa-beach.area`: العربية تحمل «بلدة» والإنجليزيةُ تُسقطها** ⇒ `nahe der Stadt Al-Taraf` · `Stadt Salwa` (بصيغة المعجم، انظر و-1).
7. **`shaban.area`: العربية «قرب التويثير» بلا «قرية»** بينما المتنُ يقول «قرية التويثير» ⇒ `Nahe Al-Tuwaither – östlich von Hofuf` في البطاقة و`nahe dem Dorf Al-Tuwaither` في المتن. الفرقُ مقصودٌ ومسنَد.
8. **الأرقام — العربيةُ تضبط الصيغة:** «22» و«150» بالأرقام في العربية ⇒ `22` و`150`؛ و«ستة كيلومترات» و«عشرين كيلومتراً» بالحروف ⇒ `sechs` و`zwanzig` (سابقةُ `batch-de-5` ب-6 و`national-park.body_de` المنشور: «über zwanzig Kilometer»). و**الاستثناءُ بأمر الموجز**: «مائة ألف متر مربع» العربيةُ بالحروف والإنجليزيةُ «100,000» ⇒ `100.000 Quadratmeter` بنقطة الآلاف ومسافة U+0020. و`2024` ميلاديةٌ مجرّدةٌ بلا هجريّ (المصدر لا يحمله).

## ج. أسماءُ الأعلام المستعملة ومداخلُها (مسحٌ في الاتجاهين)

| المستعمَل | المدخل |
|---|---|
| `Al-Uqair-Strand` · `der Hafen von Al-Uqair` · `Küste von Al-Uqair` | `Al-Uqair` (+ Durchkopplung) — ولا `Uqair` مجرَّدة |
| `der Al-Arba-Berg (Jabal Al-Arba)` ثم `der Berg` | `Al-Arba Mountain / Jabal Al-Arba` — الگلوس أوّلَ ورودٍ في المتن، والعنوان بلا أداة |
| `der Salwa-Strand` · `die Stadt Salwa` | `Salwa Beach` · `Salwa` |
| `der Al-Shaban-Berg` (اليوم) · `„Al-Shaban“` (تاريخياً) | `Al-Shaban Mountain` — المرجعان مفصولان كما توجب العهدة 4 |
| `„Aba Al-Kabari“` | `Aba Al-Kabari` — بأقواسٍ ألمانية، بلا ترجمةٍ ولا Durchkopplung |
| `der Abu-Husais-Berg` | `Abu Husais Mountain` — العنوان `Abu-Husais-Berg` بلا أداة |
| `im Viertel Al-Qou'` | `Al-Qou'` — بلا Durchkopplung، والفاصلةُ العليا U+0027 كما في المصدر |
| `das Dorf Al-Tuwaither` · `Al-Tuwaither` | `Al-Tuwaither` — الدفعةُ لا تخلط القريةَ بالجبل (‏`tuwaither.md` عنوانُها `Abu-Husais-Berg`) |
| `die Stadt Al-Taraf` | `Al-Taraf` |
| `die Jafurah-Wüste` | `the Jafurah desert` |
| `der Geograph Yaqut al-Hamawi` | `Yaqut al-Hamawi` — بلا تواريخَ ولا عنوانِ كتاب |
| `in Bahrain [den historischen Ostküstenlanden]` | `Bahrain` — **الگلوسُ جزءٌ من الواقعة**، بقوسٍ معقوفٍ داخل الاقتباس كما في المصدر |
| `Katar` | `Qatar ⇒ Katar` — في `arbaa` و`salwa-beach`؛ ولا `Qatar` في الدفعة |
| `Jabal al-Qarah (der Qarah-Berg)` · `Al-Qarah` (النخيل) | `Al-Qarah Mountain` · `Al-Qarah (village)` |
| `die Kommunalverwaltung von Al-Ahsa` / `das Gouvernorat al-Ahsa` | مدخلان مستقلان — **لم يُوحَّدا** في بطاقة `uqair-beach` (العهدة 1) |
| `Hofuf` · `Al-Ahsa` · `der Golf` / `die Golfküste` | مداخلُها |

**مُهمَلٌ بتعليل:** مدخلُ `das Programm „Humanisierung der Städte“` **لم يُستعمل اسماً للبرنامج** في `arbaa`: المصدر يقول «a project to humanise the Jabal Al-Arba road» / «مشروعاً لأنسنة طريق جبل الأربع» ولا ينسبه إلى البرنامج المسمّى. فكُتبت `Humanisierung` اسمَ جنسٍ (`ein Projekt zur Humanisierung der Straße zum Al-Arba-Berg`) — ونسبتُه إلى البرنامج كانت ستكون واقعةً مضافة.

## د. قراراتٌ ذاتُ وجهين

1. **تكرارُ `uqair-beach` أُبقي تكراراً** (أمرُ الموجز): `faq[1].a_de` == `bestTime_de` بايتاً ببايت · `faq[0].a_de` == `„Ja. “ + practical[0].value_de + „.“` · `faq[2].a_de` == `„Ja. “ + الجملة الثالثة من body_de`. فُحصت الثلاثةُ آلياً بعد آخر تحرير: PASS.
2. **العنوانُ بلا أداةٍ في الخمس** (‏`Al-Uqair-Strand` · `Al-Arba-Berg` · `Salwa-Strand` · `Al-Shaban-Berg` · `Abu-Husais-Berg`) على قياس 41 حقلَ `title_de` منشوراً، والأداةُ في المتن وحده.
3. **`Grotten` لـ«مغارات» و`Höhlen` لـ«كهوف»**: المصدر يفرّق (‏`grottoes` في `tuwaither`، `caves` في اقتباس ياقوت وفي إحالة جبل القارة)، والألمانيةُ تفرّق. دمجُهما كان سيقول إن مغارات أبو حصيص كهوفُ القارة نفسُها.
4. **آخرُ جملةٍ في `shaban` تسمّي الصفحةَ المقصودة بعنوانها المنشور**: `auf der Seite zum Jabal al-Qarah` لا `zum Qarah-Berg` — القارئُ سيرى `title_de: Jabal al-Qarah`، والصيغتان مدخلٌ واحد. (وسابقُ ذكرِ الجبل في الصفحة مگلوسٌ، فالقاعدةُ مستوفاة.)
5. **`Ferienanlage` لا `Resort`** في `tuwaither`: ‏`Resort` تتماسّ بصرياً مع `Ressort` الألمانية (دائرة/قسم) فتُقرأ خطأً؛ و«نُزل ريفية» ⇒ `ländliche Unterkünfte` لا `Landhäuser` (بيتُ الريف دعوى نوعِ بناءٍ لا يحملها المصدر). والعقدُ **موقَّعٌ لا مفتَّح**: `unterzeichnete … einen Investitionsvertrag, um … zu entwickeln und zu betreiben` — بلا موعدِ افتتاحٍ ولا زعمِ وجود.
6. **`Caravanstellplatz` لموقع الكرفانات** و`Stellflächen` للمواقف داخله (تفادياً لتكرار `Stellplatz` بمعنيين)، و`Frischwasser- und Entsorgungsstationen` لـ«نقاط تزويد بالمياه وتصريف» — `Punkte` غيرُ مستعملةٍ في معجم التخييم الألماني. انظر هـ-4.
7. **`die Gemeindeverwaltung` في `salwa-beach`** ≠ `die Kommunalverwaltung von Al-Ahsa`: المصدر يقول «البلدية»/«the municipality» مجرّدةً، لا «أمانة الأحساء». استعمالُ مدخل الأمانة كان سيُسند العملَ إلى جهةٍ أعلى بلا سند. انظر هـ-1.
8. **الأداةُ المحفوظة للحدَث**: `am Landübergang des Königreichs nach Katar` لـ«بوابة المملكة البرية» — ولم تُكتب `Grenzübergang` لأنها اسمُ منشأةٍ نظاميةٍ لا يقولها المصدر.
9. **الحدودُ المُبقاة على تحفّظها**: `Sein Sand gilt als einer der schönsten am Golf` — «توصف … بأنها» / «are described as» تحفّظٌ في المصدرين، فلا `ist der schönste`.
10. **لا `Sie` مفتتحةً جملة** (سابقة `batch-de-5` ج-10). والمخاطبةُ تردُ مرةً واحدةً في الدفعة (‏`finden Sie` في `shaban`) وهي في موضعِ إحالةٍ للقارئ — بلا خلطٍ مع `du`.

## هـ. `source_defects_for_owner`

1. **`salwa-beach`: الجهةُ المطوِّرةُ غيرُ مسمّاة.** «وقد طوّرت **البلدية** الشاطئ وحديقته» — أهي بلديةُ سلوى إحدى بلديات الأمانة التسع أم أمانةُ الأحساء؟ الألمانيةُ كتبت `die Gemeindeverwaltung` (محايدةً في المستوى). تسميةُ الجهة في المصدر تُغلق الباب.
2. **`salwa-beach`: «ملاعب» مبهمة.** الإنجليزيةُ تقرؤها `playgrounds` (أطفال) والعربيةُ تحتمل ملاعبَ رياضية. كُتبت `Spielplätze` اتّباعاً للإنجليزية (والعربيةُ لا تنقضها) — **قرارٌ يحتاج تثبيتاً من المالك**، فـ`Spielplatz` بالألمانية للأطفال حصراً.
3. **`uqair-beach`: البطاقةُ تنسب الإنشاءَ لأمانة الأحساء والمصدرُ يخصّ إعلانَ محافظة الأحساء.** جهتان مختلفتان في بندٍ واحد (العهدة 1) — أُبقيتا كما هما ولم تُوحَّدا. يُستحسن أن يذكر المالكُ أيَّهما أنشأ الموقعَ فعلاً إن توفّر سند.
4. **`uqair-beach`: «كرفان» بلا تحديد نوع.** المصدر لا يقول أهي `Wohnmobile` (متحركة بمحرك) أم `Wohnwagen` (مقطورة)؛ الألمانيةُ استعملت المظلّةَ الجامعة `Caravan/Caravanstellplatz`، والقارئُ الألمانيُّ قد يقرؤها «مقطورة» وحدها.
5. **`uqair-beach`: `answer`/`answer_en` وحدهما يحملان حجزَ الكرفانات ضمن المتن**، وبقيةُ المتن لا تذكره. لم يُترجَما (القاعدة 8) ولم يُنقَل منهما شيءٌ إلى `body_de` — فالمتنُ الألمانيُّ يطابق `body_en`/العربية، والكرفاناتُ في البطاقة والسؤال وحدهما.
6. **`shaban`: اقتباسُ ياقوت بلا إسنادٍ إلى كتاب أو طبعة.** نُقل كما هو، ولم يُضَف تعريفٌ بالكتاب ولا بالعصر (سياجُ الوقائع). لو أراد المالكُ إسناداً، فمكانه المصدرُ لا الترجمة.
7. **`arbaa`: «أنسنة الطريق» بلا نسبةٍ إلى برنامجٍ مسمّى** (انظر ج، المُهمَل) — إن كان المشروعُ فعلاً ضمن «أنسنة المدن» فالمصدرُ لا يقوله، والإضافةُ ممنوعة.
8. **`tuwaither`: «أبو حصيص» اسمُ الصفحة و«التويثير» اسمُ الملف/القرية.** ليست علّةَ ترجمةٍ بل مَزلّةَ نسخٍ لمن يأتي بعد: الملفُّ `tuwaither.md` وعنوانُه `Abu-Husais-Berg`.

## و. ما أراه ناقصاً في المعجم

1. **تضاربٌ داخليٌّ في ترجمة «بلدة»:** مدخلُ `Al-Jafr` يقضي صراحةً بـ`der Ort` ويرفض `Stadt` («zu groß») و`Dorf` («zu klein») لأن المصدر يقول «بلدة»/«town»؛ ومدخلا `Salwa` و`Al-Taraf` الجديدان يقضيان بـ`die Stadt` لـ«بلدة» نفسِها. الدفعةُ التزمت المدخلَين المخصوصين (‏`die Stadt Salwa` · `die Stadt Al-Taraf`) لأنهما مُلزِمان بالاسم، واستعملت `der Ort` حيث لا يسمّي المصدرُ بلدةً (`shaban`). **يُستحسن بتُّ القاعدة مرةً واحدة** في `_meta.naming_policy` بدل مدخلٍ مدخل.
2. **أسماءُ أجناسٍ متكرّرةٌ تستحق مداخلَ ثابتة** (كلُّها مستعملةٌ بسابقةٍ منشورةٍ لا باجتهاد، لكنها بلا مدخل): «مظلات» ⇒ `Schattendächer` · «ممشى» ⇒ `Spazierweg` · «مغارات» ⇒ `Grotten` مقابل «كهوف» ⇒ `Höhlen` · «أجهزة لياقة» ⇒ `Fitnessgeräte im Freien` · «نُزل ريفية» ⇒ `ländliche Unterkünfte` · «منتجع سياحي» ⇒ `touristische Ferienanlage` (مع منعِ `Resort`).
3. **«البلدية» (مجرّدةً) تحتاج مدخلاً** يميّزها عن `أمانة الأحساء ⇒ die Kommunalverwaltung von Al-Ahsa`: المقترح `die Gemeindeverwaltung`، وبدونه ستُوحَّد الجهتان في أول صفحةٍ تاليةٍ تذكرهما.
4. **«عربات الكرفان»** بلا مدخل: المقترح `der Caravanstellplatz` للموقع و`Caravans` للتسمية، مع تنبيهٍ إلى التباس `Wohnmobil`/`Wohnwagen` (هـ-4).
5. **`Al-Uqair-Strand`** مشتقٌّ صحيحٌ من مدخل `Al-Uqair` + Durchkopplung كما نصّ مدخلُ `Salwa Beach`؛ لا حاجةَ لمدخلٍ جديد، لكن يُستحسن ذكرُه في المدخل نفسِه ليُقفل الاجتهاد.

## ز. فحوصٌ آليّةٌ بعد آخر تحرير

37 حقلاً (‏17·5·5·5·5) · لا `answer_de` · `kicker_de` = `Naturlandschaft` في الخمس · عقدُ التكرار الثلاثيّ PASS · صفرُ U+2014 · صفرُ U+00A0 · صفرُ شرطةٍ لينة · صفرُ اقتباسٍ مستقيم · `„…“` متوازنةٌ (7 أزواج) · صفرُ أرقامٍ عربية-هندية · لا `du`/`dein` · لا `Qatar`/`Souq`/`Persischer Golf`/`Arabischer Golf` · لا `ss` سويسرية (‏`weißem` · `außerhalb` · `größten` · `Straße` · `äußersten` · `gemeißelten`) · مسافتان حول كلِّ `–` · الفاصلةُ العليا الوحيدةُ في `Al-Qou'` وهي U+0027 كما يوجب المدخل · لا `Sie` مفتتحةً جملة.

**مسحُ المعجم في الاتجاهين:** كلُّ اسمِ علمٍ في الألمانية له مدخلٌ بصيغته، وكلُّ مدخلٍ تخصّه الدفعةُ مستعمَلٌ — عدا `das Programm „Humanisierung der Städte“` المُهمَل بتعليلٍ في ج.

**مقابلةُ `guards.md`** (قُرئ بعد كتابته في المجلَّد): `C23` لا رقيقةَ في الخمس ⇒ لا تخفيفَ درجةٍ يُطلب · `C21` الأسئلةُ الأربعةُ كاملةً بـ`q_de`+`a_de` معاً و**صفرُ رقمٍ فيها** (فحصٌ آليّ) · `C22` كلُّ حقلٍ معروضٍ مترجَمٌ في الخمس ⇒ المتوقَّع صفرُ كتلةٍ إنجليزية · `C26` الخمسةُ `title_de` كلُّها موجودة ⇒ مجموعةُ النظائر تامّة · `C24` لا `answer_de` · `C4`/`C17`/`C18`/U+00A0 مفحوصةٌ أعلاه.
