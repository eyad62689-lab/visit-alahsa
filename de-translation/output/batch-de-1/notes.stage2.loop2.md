# المرحلة 2 (المحرّر الألماني الأم) — لفّة التصحيح، الدورة 2 من 3

**المدخل:** `fields.stage5.json` (مخرج الدورة 1، درجة الحاكم 86).
**المخرج:** `fields.stage2.loop2.json`.
**الطبيعة:** تصحيحٌ جراحيّ لا إعادة ترجمة. **22 تحريراً في 10 حقول من 52.** والحقول الاثنان والأربعون الباقية مطابقةٌ لمخرج الدورة 1 **حرفاً** (فُحص آلياً).

| الصفحة | الحقول التي مُسّت |
|---|---|
| `qaisariyah` | `summary_de` · `body_de` |
| `craftsmen-souq` | `summary_de` · `body_de` · `faq[1].a_de` |
| `baiah` | `body_de` |
| `duqat-algharash` | `summary_de` · `body_de` |
| `lemon-farm` | `summary_de` · `body_de` |

---

## 1 — بنود `must_fix` الثمانية: بندٌ بندٌ وكيف نُفِّذ

### البند 1 · `craftsmen-souq.summary_de` — فكّ الطريق المسدود
نُفِّذ بصيغة الحاكم **حرفاً بلا زيادة ولا نقص**:
> `Ein Souk im Herzen des historischen Hofuf: Er vereint Handwerker, ihre Geschäfte und eine Akademie für Kunsthandwerk – unter der Aufsicht der Kommunalverwaltung von Al-Ahsa.`

العلّة التي زالت: `des historischen Hofuf` كانت تنتهي بمضافٍ إليه مفتوح، فتُقرأ `der Handwerker` بعده مضافاً إليه ثانياً معلَّقاً به، ولا ينكسر التركيب إلا عند `ihre Geschäfte`. النقطتان تُغلقان المضاف إليه عند `Hofuf`، والمسنَد إليه الصريح `Er` يستأنف جملةً تامّة، فصار `Handwerker` مفعولاً بعد فعلٍ تامّ لا مضافاً إليه. و`Kommunalverwaltung` لم تُمسّ (`must_not_change`).

### البند 2 · `craftsmen-souq.body_de` و`faq[1].a_de` — الملكية
`112 Geschäfte für Handwerker` ← **`112 Geschäfte von Handwerkern`** في الموضعين كليهما (فُحص آلياً: صفر بقيّة من الصيغة القديمة). و**لم تُدخل `Werkstätten`** (واقعة ليست في المصدر، ردّها الحاكم نصّاً).

### البند 3 · `craftsmen-souq.body_de` — الفعل وتراكب المضاف إليه
- `steht` ← **`liegt`**: الفيصل العربي «يقع»، و`liegt` خيارٌ مسنَد بلا كلفة واقعة (‏`partly` 29). ونمط «Im/Am X … Y» المعتمد في `jawatha-mosque` باقٍ كما هو — غُيّر الفعل وحده لا البنية.
- التراكب الثلاثي: `im Rahmen der Projekte zur Entwicklung der historischen Innenstadt **von Hofuf**` ← **`… der historischen Innenstadt`**. صار المضاف إليه اثنين كالمصدر (`the projects to develop historic downtown Hofuf`). وإطار «المشاريع» باقٍ كاملاً، **ولم تُؤخذ صيغة القارئ** `als die historische Innenstadt saniert wurde` (تُسقط الإطار وتُدخل `saniert`).
- سند رفع `von Hofuf` بلا فقد واقعة: المدينة مذكورة في مفتتح الفقرة نفسها (`Im historischen Zentrum von Hofuf`) وفي `area_de`؛ و`faq[2].a_de` المعتمدة من الحاكم بلا اعتراض تكتب العبارة **بالصيغة المختصرة نفسها**، فالإسقاط يوحّد المتن مع السؤال لا يفارقه.

### البند 4 · `qaisariyah.body_de` — ستة مواضع
| الموضع | قبل | بعد |
|---|---|---|
| نسبة الأسر | `Familien der Oase` | `Familien aus Al-Ahsa` |
| وصل جملة العمارة | `… seine Architektur. Die dicht an dicht …` | `… seine Architektur, und die dicht an dicht …` |
| البدل الثالث المعلَّق | `… für große Anlässe, ein Zeichen von Ansehen.` | `… für Ansehen und große Anlässe.` |
| خاتمة الفقرة | `den Besuch legen Sie am besten auf den Abend` | `die beste Zeit ist der Abend` |
| ازدواج الظرف | `weiter unten unter „Besuchsinformationen“` | `weiter unten in der Karte „Besuchsinformationen“` |
| فصل صنفي القائمة | `… und Keramik, Datteln aller Sorten` | `… und Keramik sowie Datteln aller Sorten` |

- **الوصل**: أُبقيت صدارة `Unverwechselbar` (لم يعترض عليها الحاكم؛ اعتراضه على **العزل** وحده) ووُصلت بـ`, und` كما يصل المصدر بـ`and`. ولم يُضف وصفٌ للعمارة — غيابه علّة مصدر (SD-7) وإضافته اختلاق.
- **`in der Karte`** لا تُدخل واقعة: «البطاقة» في المصدرين معاً (`the visit-information card below` · «بطاقة «معلومات الزيارة» أدناه»)، والتسمية „Besuchsinformationen“ مطابقة لواجهة الموقع الألمانية الفعلية (تحقّق الحاكم من `ui.de['det.visitInfo']`).

### البند 5 · `qaisariyah.summary_de`
`eine Adresse für` ← **`ein Ziel für`** (مطابقة `a destination for`). و**لم تُؤخذ `die erste Adresse`**: تفضيلٌ مطلق لا يقوله المصدر.

### البند 6 · `baiah.body_de` — خمسة مواضع (أربعةٌ هنا والخامس في المرحلة 3)
1. **شطر المفتتح جملتين**: `Im Al-Koot-Viertel mitten in Hofuf steht Bayt Al-Bay'ah (das Haus des Treueids), bekannt als Bayt Al-Mulla.` ثم `Von dort sind es nur wenige Schritte zu Qasr Ibrahim (dem Ibrahim-Palast) und zum Qaisariyah-Souk.` — جملةٌ للموقع وجملةٌ للجوار كما فعلت الروسية المعتمدة. الكلمات قبل الفعل: **23 ← 6**. والگلوس باقٍ مصرَّفاً بالمجرور بعد `zu` (زوج `tm.json`: «am Jabal al-Qarah (dem Qarah-Berg)»).
2. `Wahrzeichen der Oase` ← **`Stätten Al-Ahsas`**: تعود النسبة إلى `its` في المصدر، وتزول الواحة المعرَّفة بلا تقديم، ويزول وصف `Wahrzeichen` (المرئيّ) بـ`politisch`. و`Stätten` مقرّة في المعجم تسميةً للفئة (`Historische Stätten`).
3. `auf den innen liegende Balkone blicken` ← **`überblickt von innen liegenden Balkonen`**: بناءٌ **لا يبدأ بـ`auf den`** كما اشترط الحاكم، واسم المفعول متصدّر فلا تُقرأ `von` مادةً أو أصلاً.
4. `Ausstellungen von Kleidung und persönlichen Gegenständen` ← **`ausgestellte Kleidung und persönliche Gegenstände`**، مفصولةً عن الجلسات بـ`sowie`. الجمع `Ausstellungen` كان يقرأ فعالياتٍ لا معروضات.
5. تقديم `(n. H.)` — **مؤجَّل إلى المرحلة 3 بقصد**: گلوس التقويم الهجري شغل المموائم نصّاً في `03-localizer.md` («gloss … the Hijri calendar»). نُفِّذ هناك، انظر `notes.stage3.loop2.md`.

وزيادةً على الخمسة: `der Älteste der Familie` ← **`das Oberhaupt der Familie`** (‏`applied` 47) — «الأكبر سنّاً» ← «رأس الأسرة»، والفيصل «كبير أسرة آل الملا».

### البند 7 · `duqat-algharash.summary_de` و`body_de` — أربعة مواضع
1. **فكّ صلتَي `das` المتتاليتين** في النبذة إلى **اسم فاعل وبدل** كما في `summary_en` حرفاً (`handed down through … — one of the Kingdom's best-known homes of the craft`):
   > `Ein traditionelles Töpferhaus am Jabal al-Qarah, von der Familie Al-Gharash über Generationen weitergegeben – eine der bekanntesten Stätten des Töpferhandwerks in Saudi-Arabien.`
2. `dieses Handwerks` ← **`des Töpferhandwerks`** في النبذة: مرجعٌ حرٌّ بدل الإشارة إلى جزءٍ مدفونٍ في مركّب `Töpferhaus`. ولا واقعة زائدة — الكلمة نفسها ترد في `body_de`.
   **وكلفة مسجَّلة**: الصيغة تفارق زوج `tm.json` «das Töpferhaus, das … und das zu den bekanntesten Stätten dieses Handwerks …» (‏`24-hours-itinerary`). فارقتُه لأن `must_fix` يأمر به صراحةً، ولأن علّة الزوج غير قائمة هنا: في المدوّنة `Töpferhaus` اسمٌ حرّ سبق الإشارة، وفي النبذة هو **المركّب نفسه** الذي تشير إليه.
3. `eines seiner Erzeugnisse` ← **`eines der Erzeugnisse des Hauses`**: كان `seiner` يقع على `bis zum Brennofen` (أقرب مذكّر). و**لم تُؤخذ صيغة القارئ `ein fertiges Stück`** (تُسقط نسبة المنتجات إلى الدوغة، وهي في المصدر `its wares`).
   ورُفعت `nach Hause` معها لأن التصحيح نفسه أوجبه: `des Hauses … nach Hause` تلاصقٌ لفظيّ في خمس كلمات يردّه أي محرّر ألماني؛ والفيصل العربي «ويقتني من منتجاتها» بلا «بيته»، و`mitnehmen` تحفظ معنى الاقتناء كاملاً.
   ولم أستعمل مثال الحاكم `der Töpferei` لأن `die Töpferei` بالألمانية تحتمل **الحرفة** و**الورشة** معاً، فتُدخل التباساً جديداً مكان القديم؛ و`des Hauses` مرجعها مسمّى في الجملة نفسها (`Heute ist das Töpferhaus …`)، وتوازي تكرار الضمائر في العربية («أفرانه» · «حرفيوه» · «منتجاتها»).
4. `nach alter Art` ← **`auf die alte Art`**: علّة الحاكم أن الصيغة «ليست الدارجة»، والاقتران الدارج `auf die alte Art`. وهذا **أصغر تحريرٍ يرفع العلّة** (حرف جرّ وأداة)، ويحفظ «القديمة» بحرفها. ولم أستعمل مثال الحاكم `auf traditionelle Weise` لأنه يجعل `traditionell` **رابعةً** في صفحةٍ من ستّ جمل (‏`kicker_de` · `summary_de` · مفتتح المتن)، وهو خصمُ نصاعةٍ يُدخله التصحيح بيده.

**وزيادةً**: `dieses Handwerks` ← **`dieses Volkshandwerks`** في `body_de`. سندها `pages.duqat-algharash.notes[1]` نصّاً: «وسقطت `folk`/«الشعبية» من `body_de` مع أنها في المصدرين» — وهي أحد سببي خصم الدقة (27/30)، فتركها يُبقي الخصم قائماً. والمرجع `das Töpferhandwerk` حرٌّ في الشطر السابق من الجملة نفسها.

### البند 8 · `lemon-farm.body_de` — نقض القرار 3
عاد `body_de` إلى **صيغة المرحلة 1 المطابقة لـ`summary_de`**، و«dieser» زالت. وأُبقي الگلوس `die Limette aus Al-Ahsa` — وهو **واجب `gloss_regel` لـ`Hasawi`** وأقرّه الحاكم — **فوُضع في الحقلين معاً** كما اشترط:
> `Eine Zitrusfarm, auf der Besucher in der Saison die berühmte Hasawi-Limette (Lomi) pflücken – die Limette aus Al-Ahsa.`

الشرطة U+2013 بمسافتين لا الفاصلة: البدل بعد الفعل في صلة موصولٍ يُقرأ بالفاصلة لاحقةً مرتجلة، والشرطة علامته المقرّرة في الألمانية. والحقلان **متطابقان حرفاً** (فُحص آلياً).

**الحصيلة: 8 من 8 بنود مسّها التصحيح؛ سبعةٌ نُفِّذت كاملةً في هذه المرحلة، والثامن (البند 6) أربعةُ مواضع هنا وخامسها في المرحلة 3 بحكم توزيع الأدوار.**

---

## 2 — بنود `blind_reader.applied` (20) و`partly` (8)

| # | الصفحة | نُفِّذ كيف |
|---|---|---|
| 3 | qaisariyah | `ein Ziel für` — ورُدّت `die erste Adresse` |
| 8 | qaisariyah | وُصلت جملة العمارة بـ`, und`؛ ولا وصفَ أُضيف للعمارة |
| 11 | qaisariyah | `des traditionellen Einkaufs` — ورُدّت `des alten Handels` |
| 13 | qaisariyah | رُفع البدل الثالث، وعاد الوصف بدلاً واحداً |
| 17 | qaisariyah | `Familien aus Al-Ahsa` |
| 18 | qaisariyah | `sowie` قبل `Datteln` — ورُدّت صيغة القارئ (تدمج التمور في قائمة الحِرف) |
| 19 | qaisariyah | رُفع ازدواج الظرف، وعادت الخاتمة؛ **والإحالة نفسها بقيت** (من المصدر، والتسمية مطابقة للواجهة) |
| 25 | craftsmen-souq | صيغة الحاكم حرفاً |
| 26 | craftsmen-souq | الشقّ المطبَّق زال بإصلاح 25؛ **والشقّان المردودان لم يُمسّا** (تكرار الجهة ثلاثاً · `Kommunalverwaltung`) |
| 29 | craftsmen-souq | `steht` ← `liegt`؛ ونمط المفتتح المعتمد باقٍ |
| 30 | craftsmen-souq | `von Handwerkern` في الموضعين — ولا `Werkstätten` |
| 36 | craftsmen-souq | خُفّف التراكب بإسقاط `von Hofuf`؛ ورُدّت صيغة القارئ |
| 46 | baiah | شُطر المفتتح جملتين |
| 47 | baiah | `das Oberhaupt der Familie`؛ **وشقّ صلة القرابة بالباني لم يُمسّ** (علّة مصدر) |
| 49 | baiah | `Stätten Al-Ahsas`؛ **وشقّ انعدام التوازي مردودٌ فلم يُمسّ** |
| 54 | baiah | بناءٌ لا يبدأ بـ`auf den` |
| 55 | baiah | `ausgestellte Kleidung`؛ **وشقّ «جلسات الضيوف» مردودٌ فلم يُمسّ** |
| 59 | duqat | اسم فاعل وبدل |
| 60 | duqat | `des Töpferhandwerks`؛ **وشقّ `bekanntesten/berühmtesten` مردودٌ فبقيت الصيغتان** |
| 64 | duqat | `auf die alte Art`؛ **وشقّ `Die Gefäße` مردودٌ فبقي التعريف** |
| 69 | duqat | `eines der Erzeugnisse des Hauses`؛ ورُدّت `ein fertiges Stück` |
| 78 | lemon-farm | عودة المتن إلى صيغة المرحلة 1 |
| 81 | عابر | موضعا `der Oase` زالا معاً (17 و49) — **وصفر `Oase` في الدفعة كلها الآن** |
| 43 | baiah | الشقّ المسجَّل (تقديم `n. H.`) نُفِّذ في المرحلة 3؛ **والشقّان المردودان لم يُمسّا** |
| 14 · 57 · 48 · 65 | — | **لم يُنفَّذ منها شيء**: كلها «يُسجَّل ولا يُنفَّذ» (گلوس `Hasawi` الصريح قرار معجم · غموض «Dougha» كلفة القرار 1 · `Dschumada I` مدخل معجم بمصدر · التحوّط الصحفي في المصدر). |

**و`blind_reader.rejected` (57): لم يُؤخذ منها بندٌ واحد.** فُحص آلياً أنّ `Souk`/`einheimisch`/`Kupfer … duftet`/`erbaute`/`Beitritt`/`Dschumada I`/`Töpferhaus`/`Hasawi-Limettenfarm`/`Jabal al-Qarah`/`Kommunalverwaltung von Al-Ahsa`/`Netzwerk der UNESCO Creative Cities` كلها باقية بحرفها.

---

## 3 — فحص «الجملة وحدها» على كل جملةٍ في كل حقلٍ مسّته اللفّة

**القاعدة المطبَّقة (الموسَّعة):** قُرئت **كل** جملةٍ في الحقول العشرة الممسوسة — مشطورةً كانت أم لا — وحدَها ومصدرُها مغطّى. والأسئلة الثلاثة على كلٍّ: (أ) فاعلٌ ومسنَدٌ إليه؟ (ب) مرجع كل ضمير وكل صلة موصولٍ ظاهر؟ (ج) هل تنعقد قراءةٌ أولى خاطئة على مضافٍ إليه أو على `der`/`die`/`das`؟

**37 جملة. 37 اجتازت. صفر طريقٍ مسدود.** (وأربعة مواضع يقع فيها الگلوس أو البنية على جملةٍ لم تُشطر — وهي بعينها ما فات فحص الدورة 1: `S09` و`S28` و`S35/36`.)

| # | الحقل | أ | ب | ج | ملاحظة الفحص |
|---|---|---|---|---|---|
| S01 | qais.summary | كتلة اسمية | ✓ | ✓ | بلا فعلٍ تامّ **كـ`summary_en`** (ردّ الحاكم مأخذ القارئ 2 على هذا الأساس). `dessen`→Souk · `einer`/`seiner`→Souk. |
| S02 | qais.body | ✓ | ✓ | ✓ | `Seine`→Souk (الوحيد المذكّر). `Souks der Golfregion` مضافٌ إليه واحدٌ مغلق. |
| S03 | qais.body | ✓ | ✓ | ✓ | جملتان بـ`und`؛ `führen Sie` لا تُقرأ أمراً لأن الفاعل `die … Geschäfte` يسبقها. `in denen`→Gassen. `seine`→Souk (‏S02، جملةٌ واحدة قبلها). |
| S04 | qais.body | ✓ | ✓ | ⚠︎ منخفض | `den Umhang` بدلٌ لا مفعولٌ ثانٍ: لا `und` قبله، والبشت **هو** العباءة فالبدل بيّن دلالياً. |
| S05 | qais.body | ✓ | ✓ | ✓ | (لم تُمسّ) `die … sind` جمعاً ⇒ `Zari-Fäden` لا `die Feinheit` المفردة. قوس `zeichnet sich … aus` مغلق. |
| S06 | qais.body | ✓ | ✓ | ✓ | `Dieses Handwerk` مفعولٌ متصدّر — يحسمه `geben` جمعاً مع `Familien`. المرجع: الحياكة في S05. |
| S07 | qais.body | ✓ | ✓ | ⚠︎ منخفض | `sowie` هي الفاصل الذي أمر به الحاكم؛ وقراءة «تمورٍ تُصنع منها الحِرف» ممتنعةٌ دلالياً. |
| S08 | qais.body | ✓ | ✓ | ✓ | جملتان بفاصلة منقوطة، لكلٍّ فاعلها. لا ازدواج ظرفيّ. |
| S09 | craft.summary | كتلة + جملة | ✓ | ✓ | **موضع أخطر عيوب الدفعة**: `des historischen Hofuf` يُغلق بالنقطتين، و`Er` مسنَدٌ إليه صريح، فـ`Handwerker` مفعولٌ لا مضافٌ إليه. الشرطة تعلّق على فعلٍ تامّ. |
| S10 | craft.body | ✓ | ✓ | ✓ | `der Handwerker-Souk` مركّبٌ بشرطة فلا يُقرأ `der Handwerker` مضافاً إليه. |
| S11 | craft.body | ✓ | ✓ | ✓ | (لم تُمسّ) `Er`→الـSouk. |
| S12 | craft.body | ✓ | ✓ | ✓ | `von Handwerkern` ملكيةٌ صريحة لا غاية. القائمة كلها منصوبة متوازية. |
| S13 | craft.body | ✓ | ✓ | ✓ | (لم تُمسّ) `in der`→Akademie · `ihr`→Handwerker · `der`→Auftrag. |
| S14 | craft.body | ✓ | ✓ | ✓ | المضاف إليه اثنان كالمصدر. `steht unter der Aufsicht` اصطلاحٌ لا يتصادم مع `liegt` في S10. |
| S15 | baiah.body | ✓ | ✓ | ✓ | 6 كلمات قبل الفعل (كانت 23). الگلوس بالرفع موافقاً `das Haus`. |
| S16 | baiah.body | ✓ | ✓ | ✓ | `Von dort` إشارةٌ مكانية صريحة إلى موضع S15؛ الگلوس بالجرّ بعد `zu` وفق زوج `tm.json`. |
| S17 | baiah.body | ✓ | ✓ | ✓ | `das … Haus` معرّفاً ⇒ بيت S15. (صيغة التاريخ تُستكمل في المرحلة 3.) |
| S18 | baiah.body | ✓ | ✓ | ✓ | `das Oberhaupt` = رأس الأسرة لا الأكبر سنّاً. بدلان بالرفع موافقان للفاعل. |
| S19 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) `Es`→das Haus (محايد؛ وAbdullatif مذكّر فلا تزاحم). `das König Abdulaziz … betrat`: ما بعد `das` اسمُ علمٍ بلقب فينحسم الموصول فوراً. |
| S20 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) `ihm`→König Abdulaziz. |
| S21 | baiah.body | ✓ | ✓ | ✓ | `wurde zu A und zu B` متوازٍ. `einer` مؤنثاً موافقاً `die Stätte`. **كلفة مسجَّلة**: `Al-Ahsas` مرتين في جملة — وهي صيغة الحاكم حرفاً، وبديلها ضميرٌ عائدٌ على مضافٍ إليه (أضعف). |
| S22 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) `es`→das Haus. |
| S23 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) `hier`→البيت. |
| S24 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) `die … erzählen` جمعاً ⇒ المعروضات الأربعة. |
| S25 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) |
| S26 | baiah.body | ✓ | ✓ | ✓ | اسم المفعول `überblickt` **متصدّر**، فلا `auf den` ينتظر منعوتاً ولا `von` تُقرأ مادةً. `sowie` تفصل الجلسات عن المعروضات. |
| S27 | baiah.body | ✓ | ✓ | ✓ | (لم تُمسّ) `ihren`→die Räume. |
| S28 | duqat.summary | كتلة اسمية | ✓ | ✓ | بنية `summary_en` نفسها (اسم فاعل + بدل). الفاصلة تمنع تعليق `von der Familie` بـ`Jabal al-Qarah`، واسم الفاعل الأخير يحكم الفاعل بـ`von`. البدل بالرفع وإن خالف جنس الرأس — بدلٌ حرّ قياسيّ. |
| S29 | duqat.body | ✓ | ✓ | ✓ | (لم تُمسّ) الگلوس مصرَّفٌ بالجرّ. |
| S30 | duqat.body | ✓ | ✓ | ✓ | `auf die alte Art` اقترانٌ دارج. قوس المبني للمجهول مغلق مرتين. `des Hauses`→Töpferhaus (S29). |
| S31 | duqat.body | ✓ | ✓ | ✓ | (لم تُمسّ) |
| S32 | duqat.body | ✓ | ✓ | ✓ | `dieses Volkshandwerks`→`das Töpferhandwerk` في شطر الجملة الأول، اسمٌ حرٌّ لا جزء مركّب. |
| S33 | duqat.body | ✓ | ✓ | ✓ | (لم تُمسّ) |
| S34 | duqat.body | ✓ | ✓ | ✓ | `des Hauses` مرجعه `das Töpferhaus` في صدر الجملة نفسها. قوس `nehmen … mit` مغلق. زال `seiner` الواقع على `Brennofen`. |
| S35 | lemon.summary | كتلة اسمية | ✓ | ⚠︎ منخفض | مطابقة `summary_en`/`body_en` (سطرٌ واحد في اللغات الأربع). `auf der`→Zitrusfarm. البدل بعد الشرطة يقع على الليمونة: المزرعة ليست ليمونة، فالقراءة الخاطئة ممتنعةٌ دلالياً فوراً. |
| S36 | lemon.body | — | — | — | **مطابقة S35 حرفاً** (حكم الحاكم). |
| S37 | craft.faq[1] | جواب بلا فعل | ✓ | ✓ | نمط الأجوبة المعتمد (منصوبٌ يجيب «ما الذي يوجد؟»). `in der`→Akademie · `ihr`→Handwerker. |

### ما امتنعتُ عنه في هذا الفحص ولماذا
- **لم أشطر S03 ولا S26 ولا S34** رغم طولها: أقواسها مغلقة ومراجعها ظاهرة، والشطر تحريرٌ بلا سند في الحكم = ارتداد.
- **لم أمسّ S05 · S13 · S19 · S22 · S24 · S25 · S27 · S29 · S31 · S33** مع قراءتها معزولةً: اجتازت، ولا بند في الحكم يمسّها.
- **الإحالات بين الجمل** (‏`Seine` في S03 · `Es` في S19 · `es` في S22 · `Von dort` في S16): مراجعها ظاهرةٌ في الحقل الألماني نفسه بلا رجوعٍ إلى الإنجليزية، والجنس يحسمها في كل موضع.

---

## 4 — ما امتنعتُ عنه في الحقول، ولماذا

| الامتناع | العلّة |
|---|---|
| `qaisariyah.faq[2].a_de` فيها القائمة نفسها بلا `sowie` | الحاكم سمّى `body_de` وحده (‏`applied` 18)؛ ومطابقة الحقلين تحريرٌ بلا سند، والجواب سياقُ تعدادٍ لا سردٍ متّصل. |
| `baiah.summary_de` (صيغة التاريخ) | زوجٌ قائم في `tm.json` و`erbaute` في `must_not_change`؛ والحاكم أقرّ الترتيب صراحةً. |
| `baiah.body_de`: `steht` باقية | الحاكم أثار الفعل في `craftsmen-souq` وحدها (منشأة فوق 12.000 م²)؛ والبيت «يقوم» بالألمانية بلا تعثّر. |
| `duqat.title_de` · `Töpferhaus` · `Dougha` بلا شرح | `must_not_change` والقرار 1؛ ونقضها ينقض تعليل جنس المدخل. |
| أسطر الإسناد `source_de` («Genehmigter Entwurf») | قرار تصميم يحرسه C12، مرفوعٌ للمالك (‏POL-DE-2). |
| گلوس `Hasawi` الصريح | قرار معجمٍ يمسّ صفحاتٍ منشورة (‏POL-DE-4 · `partly` 14). |
| `Dschumada I` ← الصيغة الكاملة | مدخل معجمٍ بمصدرٍ مكتوب (‏`partly` 48). |
| `det.faq` في `src/i18n/ui.ts` | الحاكم علّق التطبيق إلى **اعتماد** الدفعة (`apply_when`)، والقرار ردّ. |
| `title_de` · `kicker_de` · `area_de` · `bestTime_de` (15 حقلاً) | لم يرد لها ذكرٌ في `must_fix` ولا في `applied`/`partly` — فُحص آلياً أنها ثابتة حرفاً. |

---

## 5 — الحرّاس: فحصٌ فعليّ **بعد آخر تحرير**

شُغّل الفحص على `fields.stage2.loop2.json`: **40 فحصاً، 39 اجتازت** — والوحيد غير المستوفى هو تقديم `nach der Hidschra (n. H.)`، **وهو متوقَّع بقصد** لأنه بند المرحلة 3 (گلوس التقويم). ثم أُعيد المسح كاملاً على مخرج المرحلة 3 (`fields.stage3.loop2.json`) فاجتاز **40 من 40، صفر إخفاق**. وتفصيل الفحصين:

`C18` صفر `Souq` (بتعبير الحارس `\bSouqs?\b`) · `C17` صفر U+2014 و19 موضع U+2013 كلها بمسافتين أو بين رقمين · `C4` صفر رقم عربي-هندي · `C14` صفر قيمة موسمية تحت `bestTime_de` · `C15` صفر `Palmenoase` · `C16` صفر نسبةٍ لليل · **صفر U+00A0** (كل المسافات U+0020) · **صفر اقتباس مستقيم** (والفاصلتان العلويتان U+0027 في `Bayt Al-Bay'ah` وحدهما، مطابقتين لـ`title_en`) · **صفر `\bdu\b` بحدود الكلمات** (والبحث الساذج يعطي 9: `durch` · `duftet` · `Duden`…) · صفر صيغة سويسرية و`ß` في 6 مواضع · صفر Denglisch و`Highlight` صفراً · الگلوس مرة واحدة لكل مصطلح في المتن وصفراً في العنوان (7 مصطلحات) · التغطية والترتيب مطابقان (5 صفحات · الحقول والمفاتيح والترتيب · `practical` و`faq` بالعدد والترتيب نفسيهما) · صفر `answer_de`.
