# المرحلتان 4 و5 · `batch-de-7` — سياجُ الوقائع والمقارنُ المرجعيّ، ثم المدقّقُ اللغويّ

`fields.stage4.json` مولَّدٌ من `fields.stage3.json`، و`fields.stage5.json` من `fields.stage4.json`، كلاهما بسكربتٍ **يتحقّق من النصّ القديم حرفياً ويرفض الاستبدال إن لم يرد مرّةً واحدةً بالضبط** — فلا تحريرَ أعمى ولا استبدالَ ثانٍ صامت. عددُ الحقول وترتيبُ مفاتيحها متطابقٌ في الثلاثة (مفحوصٌ آلياً: 43 · 43 · 43، والترتيبُ متطابقٌ بايتاً ببايت).

| | حقولٌ مغيَّرة | حقولٌ بلا مساس | العلّة |
|---|---|---|---|
| **المرحلة 4** (من مخرج 3) | **2 من 43** | 41 | سياجُ الوقائع في الاتجاهين + مصطلحٌ مقيسٌ على المنشور |
| **المرحلة 5** (من مخرج 4) | **2 من 43** | 41 | البند 5: التزامُ زوجٍ منشورٍ في الذاكرة |

الستةُ المنشورةُ سلفاً (`Öffnungszeiten und Eintritt` وقيمتُها ومصدرُها في `kanzan` و`thulaim`) **لم تُقارَب ولا تظهر في المخرج**، و`kanzan`/`kanzan-park`/`thulaim` بلا مفتاحَي `practical` و`faq` كما يشترط الموجز.

## تحقّقٌ من دعوى المدخل (لم تُؤخذ تسليماً)

قيس آلياً بتسطيحِ الحقول الثلاثة والمقارنةِ حقلاً حقلاً:

- **المرحلة 3 غيّرت حقلين اثنين لا غير**: `delfoon-lake.body_de` و`kanzan-park.body_de`. ✔ مطابقٌ للدعوى.
- المرحلة 2 غيّرت **عشرة** حقول من مخرج المرحلة 1 (منها إصلاحُ كسر الصيغة الثابتة في `hubail-lake` و`kanzan-park`). ✔
- ملاحظاتُ المرحلة 3 تحمل **أربع** ملاحظات `fence_risk`. ✔ وكلُّها فُصل فيها أدناه (القسم و).

---

## أ. الجملُ المغيَّرة — قبل ⇐ بعد

### المرحلة 4 — حقلان (ثلاثةُ مواضع)

**1) `kanzan-park.body_de`** — واقعةُ مصدرٍ ساقطةٌ أُعيدت

> قبل: `… baut die Kommunalverwaltung von Al-Ahsa in mehreren Bauabschnitten einen großen **Erholungspark**; offiziell …`
> بعد: `… baut die Kommunalverwaltung von Al-Ahsa in mehreren Bauabschnitten einen großen **Bergpark zur Erholung**; offiziell …`

**2) `kanzan-park.body_de`** — مصطلحٌ مقيسٌ على المنشور، ومنعُ تضييق

> قبل: `… einer Seilrutsche, **Kinderspielplätzen** und Fußwegen.`
> بعد: `… einer Seilrutsche, **Spielbereichen für Kinder** und Fußwegen.`

**3) `thulaim.body_de`** — صفةُ نشاطٍ مرفوعةٌ فوق المصدر

> قبل: `… ein leicht erreichbares Ziel für Ausflüge in die Wüste und für **Wanderungen**.`
> بعد: `… ein leicht erreichbares Ziel für Ausflüge in die Wüste und für **Spaziergänge**.`

### المرحلة 5 — حقلان (الصياغةُ نفسُها في صفحتين)

**`delfoon-lake.faq[2].a_de`** و**`hubail-lake.faq[2].a_de`**

> قبل: `Nein. … ist ein öffentlich zugängliches Naturgelände; **der Besuch** ist kostenlos.`
> بعد: `Nein. … ist ein öffentlich zugängliches Naturgelände; **der Eintritt** ist kostenlos.`

لا كلمةَ أخرى تغيّرت في الحقول الثلاثةِ والأربعين، ولا رقمَ، ولا علامةَ ترقيم، ولا اسمَ علم.

---

## ب. سياجُ الوقائع — ما حذفه السياجُ ومن أين جاء

**الحصيلة: موضعان.** ولم يُعثر على رقمٍ مختلَق ولا موعدٍ ولا رسمٍ ولا مسافةٍ ولا نصيحةٍ ولا صفةٍ مطلقةٍ أضافتها المرحلتان 2 و3 — الأرقامُ السبعةُ كلُّها (15 · 1333 · 1915 · 2022 · 1.100 · 1.500 · «واحد») ترد في المصدرين، ولا رقمَ ثامن.

| # | المحذوف | الحقل | من أين جاء | ماذا يقول المصدر |
|---|---|---|---|---|
| 1 | **`Wanderungen`** (ارتقاءُ نشاطٍ إلى «المشي الجبليّ») | `thulaim.body_de` | **المرحلة 1** — ثبتت بلا مراجعةٍ في 2 و3 | `body_en` «desert outings and **walking**» · العربية «للرحلات البرية و**المشي**». والعربيةُ نفسُها تفرّق: `arbaa` تكتب «**الهايكنج**» حيث تعني hiking، والمنشورُ الألمانيُّ يقابلها بـ`Wanderungen`. فوضعُها على «المشي» يرفع النشاطَ ويدمج مصطلحين. والنظيرتان المعتمدتان محايدتان: ru «ходить пешком» · zh 漫步 |
| 2 | **`Kinderspielplätze`** (تضييقٌ إلى منشأةٍ مسوَّرةٍ مجهَّزة) | `kanzan-park.body_de` | **المرحلة 1** — ثبتت في 2 و3 | `body_en` «children's **play areas**» · العربية «و**ألعاب أطفال**». والمنشورُ يقابل «play area» بـ`Spielbereich` مرّتين (`koot-park` · `mushaqar`) ويحجز `Spielplätze` لـ«playgrounds»/«ملاعب» (`salwa-beach`). فـ«Spielplatz» تقول للقارئ الألمانيّ ما لا يقوله المصدر عن هيئة المكان |

**ما فُحص ولم يُحذف** (فُحص لأنه احتُمل أنه إضافة، وثبت أنّ المصدر يحمله):

- `Erst wenn …` في `delfoon-lake.body_de` — القسم و-1.
- `öffentlich zugängliches` (لا `frei zugängliches` كـ`asfar`) — المصدرُ هنا يزيد «public»/«عام … مفتوح»، فالفرقُ فرقُ مصدرٍ لا فرقُ أسلوب.
- `das Meer aus Dattelpalmen` — صيغةٌ منشورةٌ سلفاً في مدوّنة جبل القارة وفي نصوص الواجهة، مقابلَ «بحر النخيل»، لا زيادةَ هذه الدفعة.
- `freistehende Felsformation` في `thulaim` — القسم و، الفقرة الأخيرة.
- `am Hang` في `Rutschbahnen am Hang` — تعبيرٌ عن «جبلية»/«mountain»، والمكانُ نفسُه مذكورٌ في الجملة؛ لا يضيف شيئاً وقد أُغلق بابُ البدائل الثلاثة في مدخل المعجم.

---

## ج. الاتجاهُ الآخر — وقائعُ المصدر الساقطةُ من الألمانية

**واحدةٌ، وأُعيدت.**

| # | الواقعةُ الساقطة | الحقل | ماذا يقول المصدر | الإجراء |
|---|---|---|---|---|
| 1 | **«جبليّ» / «mountain»** في اسم جنس المنتزه | `kanzan-park.body_de` | `body_en` «a large **mountain** recreation park» · العربية «منتزهاً ترفيهياً **جبلياً** كبيراً» | أُعيدت: `einen großen **Berg**park zur Erholung` |

وهي ليست تفصيلاً بلاغياً: `summary_de` للصفحة نفسِها تقول `Der Bergpark`، والجملةُ تنتهي إلى الاسم الرسميّ `Al-Shu'bah-Bergpark`، فبقي وسطُها وحده بلا «جبل». **والقرينةُ القاطعة أنّ السقوطَ خطأ لا اختيار**: النظيرتان المعتمدتان تحملان الصفة في `kanzan-park` (ru «горный парк отдыха» · zh 山地休闲公园) وتُسقطانها في `kanzan` (ru «парк отдыха» · zh 休闲公园) — لأنّ المصدر الإنجليزيَّ والعربيَّ يُسقطانها هناك («a major recreational park» / «منتزهاً ترفيهياً كبيراً»). فبقيت `kanzan` بلا مساس، والتفاوتُ بين الصفحتين مقصودٌ ومقيس.

**وفُحصت ولم تسقط**: وحدةُ التحفّظ في «**any** visitor facilities» (`hubail-lake`) — الفيصلُ العربيُّ يقول «و**مرافقها**» بضميرٍ بلا تحفّظ (‏PLAN §1.2)، والنظيرتان المعتمدتان تتبعانه، والجملةُ الألمانيةُ تضع الأمرين معاً تحت `werden noch bestätigt` فلا تثبت وجودَ مرافق. و`Einrichtungen für Besucher` هو الزوجُ المعتمدُ في الذاكرة لـ«visitor facilities» (‏`uqair-beach`).

---

## د. المرحلة 5 — القائمةُ العشريةُ بنداً بنداً

| # | البند | الحكم | التفصيل |
|---|---|---|---|
| 1 | **Rechtschreibung (Duden de-DE)** | **PASS** | ‏`ß` بعد الطويل والمزدوج صحيحةٌ في `groß*`/`heißt`/`Fußweg*`/`Straße` (في `Oasenstraße`)، ولا صيغةَ سويسرية (مقيسٌ آلياً على `gross/Strasse/heiss`)؛ و`ss` بعد القصير صحيحةٌ في `verlässliche`/`Massiv`. المركّباتُ موصولةٌ لا مفصولة: `Dattelpalmen` · `Sedimenthügeln` · `Drainagewasser` · `Naturgelände` · `Hängebrücken` · `Bauabschnitten` · `Felsformation` · `Eingangstor` · `Ideenstadium`، والعطفُ الناقص سليمٌ في `Sediment- und Sandhügeln`. |
| 2 | **Durchkopplung** | **PASS** | ثمانيةُ مركّباتِ أعلامٍ موصولةٌ بالشرطة: `Delfoon-See` · `Al-Hubail-See` · `Kanzan-Berg` · `Al-Shu'bah-Berg` · `Al-Thulaim-Berg` · `Jawatha-Moschee` · `Kanzan-Bergpark` · `Al-Shu'bah-Bergpark`. ولا حشوَ اسمِ جنس (لا `Jabal-…-Berg`). و`die Stadt Al-Oyoun` و`das Massiv Al-Shu'bah/Kanzan` و`die Dörfer … Al-Jurn` بلا شرطةٍ عمداً — نمطُ «اسمُ جنسٍ سابقٌ + علم» المنصوصُ عليه في مدخلَي `Al-Oyoun` و`Al-Jurn`. |
| 3 | **Grammatik** | **PASS** | جنسُ كلِّ اسمٍ طوبق بمدخله: `den/der/dem Delfoon-See`، `dem/den Al-Hubail-See`، `des Sees`، `des Kanzan-Bergs`، `des Al-Shu'bah-Bergs` (جرُّ الإضافةِ بـ`-s` في العلمين)، `der Al-Thulaim-Berg`، `der Stadt Al-Oyoun` (جرٌّ بعد `westlich`)، `die Kommunalverwaltung`، `die Schlacht von Kanzan`، `Prinz Saad`، `der Jawatha-Moschee`، `Al-Jurn` بلا أداة. تصريفُ الصفة بعد العدد المجرّد قويٌّ صحيح: `drei hölzernen Hängebrücken` · `künstlichen Wasserfällen`. والقوسُ الفعليُّ مغلقٌ في كل جملة (`ging … in Betrieb`، `hat … gemacht`، `sind … nicht hinausgekommen`). |
| 4 | **Anrede** | **PASS** | صفرُ ورودٍ لـ`du`/`dein`/`dir`/`dich` (مقيسٌ آلياً بحدود الكلمة). ولا مخاطبةَ مباشرةَ في الحقول الثلاثةِ والأربعين أصلاً، فلا موضعَ لـ`Sie`؛ وضميرُ السائل في `faq[2].q_de` («Muss **ich** … zahlen?») هو الصيغةُ المنشورةُ حرفياً في `asfar` و`qaisariyah`. |
| 5 | **Termbase compliance 100 %** | **FIXED** (خرقان، كلاهما في الحقل نفسِه من صفحتين) | **الخرق:** `der **Besuch** ist kostenlos` مقابل «… with no fee». الزوجُ المنشورُ لهذه الفِقرة بعينها هو `asfar`: «No. Al-Asfar Lake is an open natural site **with no fee**» ⇒ «… Naturgelände; **der Eintritt ist kostenlos**». و`der Besuch … ist kostenlos` محجوزٌ في الذاكرة لصياغةٍ أخرى: «and **visiting** the mosque **is free**» (‏`jawatha-park`، 2026-09-12). أُصلح في الصفحتين. **ولا خرقَ آخر**: كلُّ أعلام الدفعة طوبقت بمداخلها، والصيغةُ الثابتةُ سليمةٌ (البند 7)، وعشرُ ثغراتٍ سُدّت بمداخلَ جديدة (القسم هـ). |
| 6 | **Interpunktion** | **PASS** | شرطةُ الاعتراض **U+2013** بمسافتين في كل المواضع، وصفرُ **U+2014** (مقيسٌ — وهو ما يُفشل `C17`). لا اقتباسَ في هذه الحقول فلا موضعَ لـ„…“، ولا اقتباسَ مستقيمٌ (مقيس). فاصلةٌ قبل كلِّ جملةٍ موصولةٍ ومصدريةٍ وتابعة (`die sich … bilden` · `das alle empfängt, die …` · `unter dem ihn …` · `den die Kommunalverwaltung … baut` · `sobald …` · `Erst wenn …, entstehen sie` · `Vorschläge, ihn … auszubauen`). ولا فاصلةَ سَرْدٍ إنجليزيةً قبل `und` (‏`… Al-Battaliyah und Al-Jurn` · `… Spielbereichen für Kinder und Fußwegen`). |
| 7 | **Zahlen, Datum, Währung, Hidschra** | **PASS** | أرقامٌ لاتينيةٌ حصراً وصفرُ رقمٍ عربيٍّ-هنديّ (‏C4، مقيس). نقطةُ الآلاف: `1.100` · `1.500`. المسافةُ قبل الوحدة **U+0020** وصفرُ **U+00A0** (مقيس — وهو الفشلُ الصامت). `15 Kilometer` بالرقم لأنّ الفيصلَ العربيَّ يكتبه رقماً، و`rund einen Kilometer` بالحرف في `thulaim` لأنّ **المصدرين معاً** يكتبانه حرفاً («كيلومتر واحد» / «a kilometre»). `Ende 2022`. والهجريُّ بصيغة أوّل ذكرٍ كاملةً: `1333 nach der Hidschra (n. H.; 1915 n. Chr.)` — وهو نمطُ ستّ ملفّاتٍ منشورةٍ (`najm-park` · `baiah` · `jabri-mosque` · `bubakr-ribat` · `dibs` · `jalaniyah`) ونمطُ `_meta.style_rules.hidschra` نفسِه. لا عملةَ ولا وقتَ ولا تاريخَ في هذه الحقول. |
| 8 | **Denglisch** | **PASS** | صفرُ ورودٍ لكلِّ كلمةٍ من قائمة `denglisch_verboten` (‏Spot · Location · Must-see · Hotspot · Guide · Feeling · Vibe)، و`Highlight` صفرُ مرّة. و**`Zipline` صفرٌ أيضاً** بقرارٍ مسنَدٍ لا بالمصادفة (القسم هـ، الثغرة 5). |
| 9 | **Glossierung** | **PASS** | لا مصطلحَ عربياً دخيلاً يحتاج شرحاً في هذه الصفحات الخمس (الأعلامُ كلُّها لاتينيةٌ أصلاً بحكم `naming_policy.default`، بخلاف zh/ru اللتين تُلحِقان القوس اللاتينيَّ لأنهما تنقحران). والگلوسُ الوحيدُ هو الهجريُّ: يقع مرّةً واحدةً عند أوّل ورودٍ في المتن لا في العنوان ولا في القرن. **استثناءٌ واحدٌ موثَّق**: ترتيبُ الاسمين في `kanzan-park.body_de` يقدّم `Al-Shu'bah` على `Kanzan` خلافاً لظاهر `gloss_regel`، لأنّ المصدر يقول «Al-Shu'bah Mountain (**historically** Kanzan)» — فالعكسُ يقلب واقعةً لا أسلوباً، والسابقةُ في المدخل 261. |
| 10 | **Struktur** | **PASS** | 43 حقلاً، وأسماءُ الحقول وترتيبُها ومسارُ كلِّ مفتاحٍ متطابقةٌ بايتاً ببايت مع مخرج المرحلة 4 ومع مخرج المرحلة 3 (مفحوصٌ آلياً). لا مفتاحَ frontmatter مسَّ، ولا رابطَ، ولا مسارَ صورة. ولا `alt` ولا `meta description` في نطاق هذه الدفعة. وصفرُ حرفٍ عربيٍّ أو صينيٍّ أو سيريليٍّ في أيِّ قيمة (مقيس). |

---

## هـ. الثغراتُ المعجميةُ العشر — قرارُ كلٍّ منها

المخرجُ في `termbase-additions.stage4.json` (**مصفوفةٌ عاريةٌ**، 12 مدخلاً بصيغة `{en, de, artikel, source, note, stage, added}`). والتحقّقُ الويبيُّ محجوبٌ (‏`de.wikipedia.org` و`unesco.de` يردّان 403 عند بوّابة الخروج — لم تُهدر عليه دورة)، فالسندُ **داخليٌّ بالملفّ والحقل** ومعلَنٌ في كلِّ مدخلٍ على سابقة `König Abdulaziz` و`Al-Omran` والمداخلِ الثمانيةِ المضافةِ لهذه الدفعة.

| # | الثغرة | القرار | العلّة الحاسمة |
|---|---|---|---|
| 1 | `Besuch` | **مدخلٌ جديد** — `Besuch`، **der** | ليس مشمولاً بالمدخل 30 (‏`Öffnungszeiten · Eintritt · Geeignet für`): بندُ هاتين الصفحتين `label_en: "Visiting"` لا `"Hours & entry"`، فنسخُ المنشورِ في `kanzan`/`thulaim` **ممنوع** (مزلق الموجز 4). اسمٌ لا فعل، كسائر التسميات، ومطابقٌ للنظيرين المعتمدَين ru «Посещение» · zh 游览 |
| 2 | `Al-Shu'bah-Berg` | **مدخلٌ جديد** — `der Al-Shu'bah-Berg`، **der** (‏der Berg) | مقيسٌ: يُكتب في **ثلاثة** حقولٍ ولا رأسَ له. المدخل 250 يذكره في كشفه وسنده فقط، والمدخل 115 هو **قريةُ** الشعبة. و`kanzan.body_de` تحمل الاثنين في نصٍّ واحد — القريةَ بلا أداةٍ في التعداد، والجبلَ موصولاً بالشرطة — فبقاؤهما بلا فصلٍ معجميٍّ خطرُ اسمٍ واحدٍ لمسمَّيين |
| 3 | `Dünenfahrten` | **مدخلٌ جديد** — `die Dünenfahrt`، **die** | صفرُ وردٍ في المنشور. مركّبٌ ألمانيٌّ محايدٌ يقول ما تقوله «التطعيس» ولا يزيد. رُفض `Dune Bashing` (‏Denglisch)، و`Wüstensafari` (تفترض جولةً منظَّمةً ومشغِّلاً — واقعةٌ مضافة، وهي بعينها ما امتنعت عنه المرحلة 3)، و`Sandboarding`، و`Offroad-Fahrten` |
| 4 | `Rutschbahnen am Hang` | **مدخلٌ جديد** — `Flächen für Rutschbahnen am Hang · die Rutschbahn`، **die** | رُفضت `Sommerrodelbahn` لأنها تفترض زحّافةً وسكّة (تضييقٌ على نمط تحذير المدخل 253)، ورُفض المركّب `Bergrutschbahn` لأنّ `Bergrutsch` في الألمانية **انزلاقٌ أرضيّ** فيقرؤها الألمانيُّ كارثةً؛ فحُمل معنى «جبلية» ظرفاً `am Hang`. و`Flächen` لـ«ساحات» لا `Arenen` (مبانٍ بمدرّجات) ولا `Plätze` (محجوزةٌ لـ`Spielplätze`) |
| 5 | `Seilrutsche` (zipline) | **مدخلٌ جديد** — `die Seilrutsche`، **die** · و`Zipline` **مرفوضة** | قرارٌ مسنَدٌ بسندين: (أ) `denglisch_verboten` — ولو بقيت `Zipline` لكانت الألمانيةُ **وحدها** بين الأربع تُبقي الكلمةَ الإنجليزيةَ بحروفها اللاتينية، فـru نقلتها إلى الكيريلية «зиплайн» وzh بنت لها لفظاً 滑索. (ب) **الأقوى**: `cable car` ⇒ `die Seilbahn` في الجملة نفسِها، فلزم الفصلُ بين `Seilrutsche` و`Seilbahn` — وهي عينُ حالةِ المدخل 254 (‏Grotte ⇄ Höhle): مصطلحان مختلفان لا يندمجان، **والقارئُ الأعمى لا يكشف الدمج** |
| 6 | `Seilbahn` (cable car) | **مدخلٌ جديد** — `die Seilbahn`، **die** | اللفظُ الألمانيُّ القياسيُّ ويغطّي ما يقوله المصدر (مسارٌ ومحطات). رُفضت `Gondelbahn` و`Sessellift` لأنهما يحدّدان بنيةً لا يذكرها مصدر (تضييق)، ورُفضت `Teleférique`/`Cable Car` |
| 7 | `Hängebrücken` | **مدخلٌ جديد** — `die Hängebrücke`، **die** | مقابلٌ مباشرٌ لـ«جسر معلق». الخشبُ **صفةٌ** لا مركّب (`drei hölzernen Hängebrücken`) لأنّ `Holzhängebrücke` تُقرأ اسمَ نوعٍ ولا سندَ لها. والنبذةُ بلا «خشبية» لأنّ نبذتَي المصدرين كذلك — لا تُملأ القصيرةُ من الطويلة |
| 8 | `künstliche Wasserfälle` | **مدخلٌ جديد** — `der künstliche Wasserfall`، **der** | صفةُ «صناعية»/«artificial» **لازمة**: بدونها يقرأ الألمانيُّ شلالاً طبيعياً في واحةٍ صحراوية. وهي غائبةٌ عن `summary_de` لأنها غائبةٌ عن نبذتَي المصدرين. والطولُ `rund 1.100 Metern` بنقطة الآلاف ومسافةِ U+0020 |
| 9 | `Kinderspielplätze` | **مرفوضة ⇐ `Spielbereiche für Kinder`** — مدخلٌ جديدٌ بالمقابلة، **der** (‏der Spielbereich) | ليست مشمولةً بمدخلٍ قائم، والبديلُ مقيسٌ في المنشور: «play area» ⇒ `Spielbereich` مرّتين (`koot-park` بالصياغة الإنجليزية نفسِها «children's play area»، و`mushaqar`)، بينما `Spielplätze` محجوزةٌ لـ«playgrounds»/«ملاعب» (`salwa-beach`). فالإبقاءُ عليها يدمج مصطلحين **ويضيّق** هيئةَ المكان |
| 10 | `Fußwege` | **مدخلٌ جديد** — `der Fußweg`، **der** | ثلاثُ صيغِ مصدرٍ وثلاثةُ ألفاظٍ ألمانيةٍ بلا دمج: «ممرات **مشاة**» (هذه الصفحة) ⇒ `Fußwege` · «ممرات **للمشي**» ⇒ `Spazierwege` (‏`koot-park` منشور) · «ممرات» ⇒ `Wege` (‏`national-park` منشور). و`Spazierweg` تحمل قصدَ التنزّه الذي لا تقوله «مشاة» |

**ومدخلان زائدان على العشرة**، لأنهما يوثّقان تغييرين أجراهما السياج فلا يجوز أن يمرّا بلا سند:

| # | المدخل | القرار |
|---|---|---|
| 11 | `Erholungspark` ⇄ `Bergpark zur Erholung` | مدخلٌ بالمقابلة، **der**: `kanzan` تبقى `Erholungspark` و`kanzan-park` تصير `Bergpark zur Erholung` — لأنّ المصدرين يُسقطان «جبلي» هناك ويثبتانها هنا، وهو ما فعلته النظيرتان المعتمدتان بحذافيره |
| 12 | `Spaziergänge` ⇄ `Wanderungen` | مدخلٌ بالمقابلة: العربيةُ نفسُها تفرّق («المشي» مقابل «الهايكنج»)، والمنشورُ الألمانيُّ يفرّق سلفاً (`king-abdullah-park` مقابل `arbaa`)، فـ`thulaim` تنتقل إلى `Spaziergänge` |

---

## و. الملاحظاتُ الأربعُ `fence_risk` من المرحلة 3 — فُصل فيها

1. **`Erst wenn …` (‏`delfoon-lake.body_de`)** — **تبقى.** الحصريّةُ منصوصةٌ في المصدر نفسِه لا مستنتجة: `faq[0]` تسأل «Is Delfoon Lake permanent?» وتجيب «**No.** It is a cluster of small seasonal lakes that form in the rainy spells» (والعربيةُ «هل بحيرة الديلفوون دائمة؟» ⇒ «لا»). نفيُ الدوام + النشوءُ عند المطر = «لا تنشأ إلا عند المطر». والرجوعُ الذي عرضته المرحلة 3 لم يُؤخذ.
2. **شرحُ `Dünenfahrten` (‏`kanzan`)** — **يبقى غيرَ مشروح.** لا مشغِّلَ ولا مركبةَ ولا موسمَ في أيّ من المصدرين؛ وقد نُقل النقصُ إلى `source_defects_for_owner` أدناه، ولم تُكتب كلمةٌ في النصّ.
3. **«nördlich von Al-Ahsa» في `delfoon-lake.summary_de`** — **يبقى خارجَها.** الامتناعُ صحيح: الحقلُ `area_de` المجاورُ بصرياً يحمل التوطئةَ نفسَها، ونقلُها إلى النبذة تعديلُ حقلٍ بمحتوى حقلٍ آخر.
4. **زمنُ `Der obere Bereich ging Ende 2022 … in Betrieb` (‏`kanzan-park`)** — **يبقى ماضياً.** المصدرُ يخبر عن **بدءٍ** («Partial operation … began» / «بدأ التشغيل الجزئي») لا عن حالٍ مستمرّة؛ والمضارعُ يدّعي أنّ القسم مفتوحٌ اليوم، وهو ما لا يقوله مصدر — بل تقول الجملةُ التاليةُ إنّ التشغيل الكامل «بانتظار التأكيد».

**وفُحصت زيادةً على الأربع** (ولم تُغيَّر): `freistehende Felsformation` في `thulaim`. المدخل 198 يربط «free-standing» بـ`freistehend` ويذكر `shaban` («جبل صخري **مستقل**»)، وهذه الصفحة تقول «a **solitary** rocky formation» / «تكوين صخري **منفرد**» — لفظُ مصدرٍ آخر. الحاسمُ أنّ النظيرتين المعتمدتين تستعملان **اللفظَ نفسَه** في الصفحتين (ru «отдельно стоящая» في الاثنتين · zh 孤立的 في الاثنتين)، ولأنّ اللفظين يصفان **الصفةَ نفسَها** لا شيئين مختلفين، فلا تنشأ واقعةٌ زائفةٌ بخلاف حالة المدخل 254. فُحص وقُيِّد ولم يُغيَّر.

---

## ز. المزالقُ السبعةُ للموجز — حالةُ كلٍّ منها بعد المرحلتين

1. **قيدُ القسمة** ✔ مقيسٌ آلياً: `Al-Hubail-See` بتهجئةٍ واحدةٍ في `hubail-lake` و`delfoon-lake`، و`Kanzan` بتهجئةٍ واحدةٍ في `kanzan` و`kanzan-park`، و`Al-Shu'bah` بالبادئة `Al-` في كل موضعٍ من الصفحتين (والإنجليزيةُ تكتب «Shu'bah» مجرّدةً مرّةً — لم تُتبع).
2. **‏`Delfoon-See` مفردٌ اسماً جمعٌ واقعةً** ✔ العنوانُ والقرنُ مفردان (`Delfoon-See` · `Saisonaler See`)، والنبذةُ والمتنُ و`faq[0].a_de` جمعٌ (`Kleine saisonale Seen` · `eine Gruppe kleiner saisonaler Seen` · `sie bilden sich`). **لم تُوحَّد** كما نصّ الأمر.
3. **الصيغةُ الثابتة** ✔ `Angaben werden noch bestätigt` **متّصلةٌ ومتطابقةٌ حرفياً** في الثلاث (مقيسةٌ آلياً): `Weitere Angaben werden noch bestätigt, sobald …` (‏delfoon) · `Weitere Angaben werden noch bestätigt, sobald … – zur Ausdehnung …` (‏hubail) · `Angaben werden noch bestätigt – zur vollständigen Inbetriebnahme des Parks` (‏kanzan-park). كسرُ المرحلة 1 لم يعد.
4. **بندُ `practical`** ✔ `Besuch` (لا `Öffnungszeiten und Eintritt`)، والقيمةُ تتبع نصَّ هذه الصفحة لا نصَّ `asfar` (‏«public» حاضرةٌ والترتيبُ معكوس)، و`source_de` **زوجُ الذاكرة معادٌ حرفياً**: `Bestätigung durch das Redaktionsteam von Visit Al-Ahsa` (مقيسٌ بايتاً ببايت مقابل `tm.json`، الزوج 99).
5. **الاسمان المزدوجان** ✔ لم يُدمجا: `kanzan` تقول «Kanzan ist der Name, unter dem ihn die Geschichtsbücher kennen; heute heißt er meist Al-Shu'bah-Berg»، و`kanzan-park` تقول «offiziell ist das Vorhaben als Al-Shu'bah-Bergpark bekannt» مقابلَ عنوان الصفحة `Kanzan-Bergpark (Al-Shu'bah)`.
6. **الهجريُّ والأرقام** ✔ القسم د، البند 7 — والصيغةُ المختارةُ مقيسةٌ على ستّ ملفّاتٍ منشورة، لا على المدخل 259 الذي اقترح `(n. H.) / …` بلا سندٍ في المنشور.
7. **مصطلحاتُ `kanzan-park` الثمانية** ✔ كلُّها لها مدخلٌ الآن، و`Zipline` مرفوضةٌ بقرارٍ مسنَد.

---

## ح. `source_defects_for_owner` — نواقصُ المصدر (لم يُكتب منها حرفٌ في النصّ)

1. **`kanzan-park` — تعارضُ العنوانين**: الإنجليزيةُ `title_en: "Kanzan Adventure Park"` والعربيةُ «منتزه جبل كنزان» بلا «مغامرات» وبكلمة «جبل». اتُّبع الفيصلُ العربيُّ (‏PLAN §1.2) ونظيراه المعتمدان، والتعارضُ نفسُه يبقى عيبَ مصدرٍ للمالك (مقيَّدٌ سلفاً في المدخل 261).
2. **`delfoon-lake` — تعارضٌ داخليٌّ في الإنجليزية**: `summary_en` تقول «small seasonal **pools**» و`body_en` تقول «a cluster of small seasonal **lakes**»؛ والعربيةُ تقول «بحيرات» في الموضعين. اتُّبعت العربية (‏`Seen` في الاثنين).
3. **`hubail-lake` — تعارضُ تحفّظ**: الإنجليزيةُ «**any** visitor facilities» والعربيةُ «و**مرافقها**» بلا تحفّظ. اتُّبعت العربيةُ ونظيراها المعتمدان؛ يُرفع للمالك لأنّ التحفّظ إمّا أن يسقط من الإنجليزية أو يُضاف إلى العربية.
4. **`kanzan-park` — التباسٌ تركيبيٌّ في الإنجليزية**: «a 1,500-metre cable car with three stations **and two lakes**» تحتمل أن تكون البحيرتان من عناصر التلفريك؛ والعربيةُ تحسمها برفع «وبحيرتان». الألمانيةُ تحسمها بمطابقة الفعل الجمعِ `gehören`، لكنّ الإنجليزيةَ تبقى ملتبسةً للقارئ ولمن يترجم عنها لاحقاً.
5. **`kanzan` — «fifteen» حرفاً مقابل «15» رقماً**: الإنجليزيةُ تكتب العددَ حرفاً والعربيةُ رقماً؛ قاعدةُ C4 والفيصلُ العربيُّ يحسمانها للرقم، والتفاوتُ يبقى عيبَ مصدر.
6. **نواقصُ تخطيطٍ لا سندَ لها في أيّ مصدر — لم تُكتب**: لا موعدَ ولا رسمَ ولا طريقَ وصولٍ لـ`delfoon-lake` و`hubail-lake` و`kanzan-park` (ولا بندَ `practical` في `kanzan-park` أصلاً)؛ ولا حرارةَ ولا وقتَ نهارٍ ولا مدّةَ صعودٍ ولا حذاءَ ولا مشغِّلَ «تطعيس» في `kanzan`؛ ولا حالةَ طريقٍ ولا موقفَ سيّاراتٍ في `thulaim`. وهي بعينها أسئلةُ القارئ الألمانيّ، ولا تُكتب كلمةٌ منها بلا مصدر.

---

## ط. ما لم يُمَسّ

- `de-translation/glossary/termbase.json` وكلُّ ملفٍّ في `/home/user/visit-alahsa/` — **قراءةٌ فقط**. المداخلُ الاثنا عشرَ في `termbase-additions.stage4.json` **اقتراحٌ** للمالك والحاكم، وسكربتُ النشر يدمجها إن اعتُمدت.
- الستةُ المنشورةُ في `kanzan` و`thulaim`، والعربيةُ والإنجليزيةُ والصينيةُ والروسيةُ في الملفّات الخمسة.
- `answer_de` وأيُّ حقلٍ خارج القائمة — لا وجودَ لها في المخرج.
