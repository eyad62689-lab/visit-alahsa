# المرحلتان 2 و3 · `batch-de-6` — المحرّر الألماني الأم ثم الموائم الثقافي (DACH)

`fields.stage2.json` مولَّدٌ من `fields.stage1.json` بسكربتٍ **يتحقّق من النصّ القديم حرفياً قبل كل استبدال** (فلا تحريرَ أعمى)، و`fields.stage3.json` من `fields.stage2.json` بالطريقة نفسِها. البنيةُ وترتيبُ المفاتيح متطابقةٌ في الثلاثة (مفحوصٌ آلياً).

| | حقولٌ مغيَّرة | حقولٌ بايتاً ببايت |
|---|---|---|
| **المرحلة 2** (من مخرج 1) | **12 من 37** | 25 |
| **المرحلة 3** (من مخرج 2) | **1 من 37** | 36 |

بنودُ «Öffnungszeiten und Eintritt» الاثنا عشرَ المنشورةُ سلفاً **خارج ملفّ الدفعة أصلاً** فلم تُقارَب. ولا `answer_de` ولا حقلَ خارج القائمة.

---

## صفر. تصحيحُ المعجم الملزِم — اسمُ الجنس لـ`Salwa` وَ`Al-Taraf`

وصلني أثناء العمل تصحيحٌ ملزِم: «بلدة» ⇒ **`der Ort`** لا `die Stadt` (‏`die Stadt` لـ«مدينة» وحدها، و`das Dorf` لـ«قرية»)، بسند `Al-Jafr` المنشور الذي يردّ `Stadt` («zu groß») و`Dorf` («zu klein») **واقعةً مضافة**. وهو **بتُّ التضارب الذي رفعته المرحلة 1 في `notes.stage1.md` و-1** — وقد التزمت المرحلةُ 1 حينها المدخلَين المخصوصين لأنهما كانا مُلزِمَين بالاسم، فبطل التزامُها ببطلانهما. أعدتُ قراءة مدخلَي `Salwa` وَ`Al-Taraf` بعد التصحيح وطبّقتُه في المواضع الخمسة، وهو مطبَّقٌ في `fields.stage2.json` و`fields.stage3.json` معاً:

| # | الحقل | قبل | بعد |
|---|---|---|---|
| 1 | `salwa-beach.summary_de` | „bei **der Stadt** Salwa“ | „**beim Ort** Salwa“ |
| 2 | `salwa-beach.body_de` | „bei **der Stadt** Salwa und am Landübergang“ | „liegt **der Ort** Salwa, am Landübergang“ |
| 3 | `salwa-beach.area_de` | „**Stadt** Salwa – der äußerste Südosten Al-Ahsas“ | „**Salwa** – der äußerste Südosten Al-Ahsas“ |
| 4 | `arbaa.body_de` | „**Die Stadt** Al-Taraf liegt etwa sechs Kilometer nördlich“ | „**Der Ort** Al-Taraf liegt etwa sechs Kilometer nördlich“ |
| 5 | `arbaa.area_de` | „nahe **der Stadt** Al-Taraf“ | „nahe **Al-Taraf**“ |

**صيغةُ `area_de` — الحذفُ لا الاستبدال، وعلّتُه مقيسة.** في المتن (2 و4) اسمُ الجنس **يبقى** لأن المصدرين معاً يحملانه («بلدة سلوى» / „the town of Salwa“؛ «بلدة الطرف» / „The town of Al-Taraf“) — وهي بعينها حجّةُ مدخل `die Stadt Al-Omran` المعتمد. أمّا في `area_de` فحذفتُه في الحقلين، لسببين:

1. **`area_en` في الحقلين لا يحمله**: „Salwa — the far southeast of Al-Ahsa“ · „Southeast of Hofuf — near Al-Taraf“. فحملُه في الألمانية وحدها يفارق نظيرتَها.
2. **النمطُ المنشور يحذفه**: `Al-Jafr – östlich von Al-Ahsa` (مدخلُ `Al-Jafr` نفسُه يكتب `area_de` هكذا). وبقيَ `Dorf Al-Tuwaither` في `tuwaither.area_de` **لأن `area_en` هناك يحمله** („Al-Tuwaither village“) — فالقاعدةُ واحدةٌ مطبَّقةٌ في الاتجاهين، لا استثناء.

وثالثةٌ لغوية: „Ort Salwa –“ بلا أداةٍ في سطرٍ مقتضَبٍ تُقرأ برقيةً، بينما „Dorf Al-Tuwaither –“ مسنودةٌ بالإنجليزية فتُحتمل.

**أثرٌ تبعيٌّ واحد** (في القسم أ-3 تفصيلاً): لمّا صار `der Ort` اسمَ جنسِ سلوى في الفقرة نفسِها، صار „ein bekannter **Ort** zum Meeresangeln“ في آخرها لبساً بين معنيين، فنُقل إلى `Platz`.

---

## أ. المرحلة 2 — الاثنا عشرَ حقلاً المغيَّرة، والعلّةُ اللغوية

### 1. `uqair-beach` — أربعةُ حقول (ومنها طرفا تكرارين ملزَمين)

**1.1 `body_de`** — الجملةُ الأخيرة:

> قبل: `… die gern fotografieren, und in direkter Nachbarschaft **gibt es** Schattendächer und Einrichtungen für Besucher.`
> بعد: `… die gern fotografieren**; in direkter Nachbarschaft finden Sie** Schattendächer und Einrichtungen für Besucher.`

علّتان: `es gibt` الفارغةُ **منصوصٌ على حذفها في نصّ الدور**؛ و`und … und` يعطفان في جملةٍ واحدة جملتين مستقلّتين. و`finden Sie` ليست اختياري بل صيغةُ المنشور: `craftsmen-souq` → „Auf mehr als 12.000 Quadratmetern **finden Sie** 112 Geschäfte“، و`women-souq` → „Hier **finden Sie** Kleidung, Butterschmalz, Aqit …“.

**1.2 `faq[2].a_de`** — حُرِّر **بالصيغة نفسِها بايتاً ببايت** لأن التكرارَ ملزَم (‏`a_en` ≈ الجملةُ الثانية من `body_en`). الطرفان يتحرّكان معاً أو لا يتحرّكان.

**1.3 `practical[0].value_de`** — تغييران:

> قبل: `Der Strand hat einen eigenen Caravanstellplatz, **den die Kommunalverwaltung von Al-Ahsa eingerichtet hat, mit Stellflächen**, Frischwasser- und Entsorgungsstationen; **die Buchung erfolgt** online`
> بعد: `Der Strand hat einen eigenen Caravanstellplatz **mit Stellflächen**, Frischwasser- und Entsorgungsstationen, **den die Kommunalverwaltung von Al-Ahsa eingerichtet hat**; **der Platz lässt sich** online **buchen**`

- **حجزُ النعت (Attributsperre):** `mit …` كانت منزوعةً عن متبوعها بصلةِ موصولٍ من سبع كلمات فتُقرأ متعلّقةً بالجهة لا بالموقع. أُعيدت ملاصقةً؛ و`den` يبقى بلا لبسٍ لأن البدائل بينهما مؤنّثةٌ جمع (`Stellflächen` · `Stationen`) فلا تحتمل `den`.
- **`die Buchung erfolgt`** هي حرفياً بنيةُ `Nominalstil` الممنوعةُ في نصّ الدور (`die Durchführung der Besichtigung erfolgt`) ⇒ فعلٌ مصرَّف. و`der Platz` لا الضميرُ `er`، لأن `der Strand` مرشّحٌ مذكّرٌ أقربُ في الجملة نفسِها.

**1.4 `faq[0].a_de`** — حُرِّر **بالصيغة نفسِها** (‏`Ja. ` + القيمة + نقطة)، والتطابقُ مفحوصٌ آلياً بعد التحرير.

> **التكرارُ الثالث لم يُمَسّ أصلاً**: `bestTime_de` وَ`faq[1].a_de` متطابقان بايتاً ببايت في مخرج المرحلة 1، ولم أقاربهما لا هنا ولا في المرحلة 3.

### 2. `arbaa` — حقلان

**2.1 `body_de`** — ثلاثة تغييرات:

> قبل: `**Die Stadt** Al-Taraf liegt etwa sechs Kilometer nördlich davon**, und der Berg gehört zu den bekanntesten Zielen im Süden Al-Ahsas für Camping, Wüstenausflüge und Wanderungen.**`
> بعد: `**Der Ort** Al-Taraf liegt etwa sechs Kilometer nördlich davon**. Für Camping, Wüstenausflüge und Wanderungen gehört der Berg zu den bekanntesten Zielen im Süden Al-Ahsas.**`

- `und` يصل خبرين لا رابطَ بينهما (موقعُ بلدةٍ ⇒ شهرةُ جبل) ⇒ وقفٌ تامّ.
- تتمّةُ `für` كانت تبعد ستَّ كلماتٍ عن متبوعها `Zielen` فتلتصق قراءةً بـ`Al-Ahsas` (ركضُ تخييمٍ في جنوب الأحساء لا وجهةُ تخييم) ⇒ قُدِّمت إلى الصدارة فالتصقت بفعلها.
- `Die Stadt` ⇒ `Der Ort` (القسم صفر).

**2.2 `area_de`** — القسم صفر.

**لم يُمَسّ:** الجملةُ الأولى بصدرها الظرفيّ (سبعُ كلماتٍ، وهو نمطُ المنشور: „Westlich von Al-Mubarraz liegt der Ain-Najm-Park“)، وگلوسُ „die Vier“، والجملةُ الأخيرة (انظر ب-4).

### 3. `salwa-beach` — ثلاثةُ حقول

**3.1 `summary_de`** و**3.3 `area_de`** — القسم صفر.

**3.2 `body_de`** — خمسةُ تغييرات:

> قبل: `Im äußersten Südosten Al-Ahsas, bei der Stadt Salwa und am Landübergang des Königreichs nach Katar, erstreckt sich der Salwa-Strand am Golf entlang, rund 150 Kilometer von Hofuf entfernt.`
> بعد: `Im äußersten Südosten Al-Ahsas liegt der Ort Salwa, am Landübergang des Königreichs nach Katar. Dort erstreckt sich der Salwa-Strand am Golf entlang, rund 150 Kilometer von Hofuf entfernt.`

**أ.** صدرٌ يحمل خمسَ عشرةَ كلمةً قبل الفعل — أثقلُ Vorfeld في الدفعة. قُسمت جملتين، والفعلُ في الثانية من رتبةٍ ثانية. **وهذا ترتيبُ النظيرة الروسية المعتمدة نفسُه** (‏90/100): «Город Сальва лежит на крайнем юго-востоке Аль-Ахсы, у сухопутных ворот … **Здесь** вдоль берега Залива тянется пляж Сальва».

> قبل: `Sein Sand gilt als einer der schönsten am Golf**, im Westen grenzen die Dünen der Jafurah-Wüste an ihn, und** die Gegend ist reich an Vögeln.`
> بعد: `Sein Sand gilt als einer der schönsten am Golf**. Im Westen grenzen die Dünen der Jafurah-Wüste an den Strand, und** die Gegend ist reich an Vögeln.`

**ب.** ثلاثُ جملٍ مستقلّةٍ مصفوفةٍ بفاصلتين ⇒ وقفٌ تامّ بعد الأولى. **ج.** `an ihn` صار بعد الفصل يجاور `Sand` (مذكّرٌ أيضاً) ⇒ سُمّي المرجع.

> قبل: `… ein bekannter **Ort** zum Meeresangeln …`
> بعد: `… ein bekannter **Platz** zum Meeresangeln …`

**د.** أثرٌ مباشرٌ لتصحيح المعجم: `der Ort` صار اسمَ جنسِ سلوى في مطلع الفقرة نفسِها.

> قبل: `… am Ufer spazieren zu gehen**; die Gemeindeverwaltung hat ihn samt Park mit Schattendächern, Spielplätzen, einem Spazierweg und Fitnessgeräten im Freien ausgebaut.**`
> بعد: `… am Ufer spazieren zu gehen**. Die Kommunalverwaltung hat ihn samt Park ausgebaut – mit Schattendächern, Spielplätzen, einem Spazierweg und Fitnessgeräten im Freien.**`

**هـ.** جملةٌ من 42 كلمةً ⇒ جملتان؛ والفعلُ `ausgebaut` كان يبعد عن فاعله أربعَ عشرةَ كلمةً (Satzklammer مفتوحة) ⇒ أُغلقت والتعدادُ نَسَقاً بعد الشرطة. و`Gemeindeverwaltung` ⇒ `Kommunalverwaltung` بحكم القسم ج.

### 4. `shaban` — حقلان (أدقُّ صفحتين في الدفعة)

**4.1 `summary_de`** — **تصحيحُ مرجعٍ يقلب واقعة**:

> قبل: `…, auch „Aba Al-Kabari“ genannt; in den alten Quellen trug der Jabal al-Qarah **diesen Namen**.`
> بعد: `…, auch „Aba Al-Kabari“ genannt; in den alten Quellen trug der Jabal al-Qarah **den Namen „Al-Shaban“**.`

أقربُ مرجعٍ لفظيٍّ لـ`diesen Namen` هو „Aba Al-Kabari“ **لا** اسمُ الصفحة. فالنبذةُ كانت تقول للقارئ إنّ جبل القارة كان يُسمّى «أبا الكباري» — وهي واقعةٌ لا يقولها المصدر، **ولا يستطيع القارئُ الأعمى كشفَها** لأن النصّ متماسكٌ في ذاته. وهذه هي العهدةُ 4 بعينها (اسمان لمرجعين) واقعةً في النبذة لا في المتن.

**4.2 `body_de`** — خمسةُ تغييرات:

> قبل: `**Der heutige Al-Shaban-Berg ist** ein eigenständiger Felsberg …, nahe dem Dorf Al-Tuwaither östlich von Hofuf**, und er trägt einen weiteren örtlichen Namen:** „Aba Al-Kabari“.`
> بعد: `**Der Al-Shaban-Berg, wie er heute heißt, ist** ein eigenständiger Felsberg …, nahe dem Dorf Al-Tuwaither östlich von Hofuf**; örtlich trägt er einen zweiten Namen:** „Aba Al-Kabari“.`

**أ.** „der heutige X“ بالألمانية يصف **الشيءَ** لا الاسم (‏`das heutige Deutschland`) — وصفحةٌ مدارُها كلُّه أنّ **الاسمَ** انتقل من جبلٍ إلى جبل لا تحتمل هذا اللبس. والمصدر: „The mountain **known today as** Al-Shaban“. **ب.** `und` بعد جملةٍ فيها قوسٌ وثلاثةُ محدّداتِ مكان ⇒ فاصلةٌ منقوطة.

> قبل: `… in dessen Höhlen man Kühlung sucht“**, und der Name** – „der Satte“ – soll …`
> بعد: `… in dessen Höhlen man Kühlung sucht“**. Der Name** – „der Satte“ – soll …`

**ج.** جملةٌ من 56 كلمةً تحمل نقطتين واقتباساً وقوساً معقوفاً واعتراضاً بشرطتين ⇒ قُسمت عند حدّ الاقتباس، وهو الحدُّ الطبيعيُّ الوحيد فيها.

> قبل: `… der Name „Al-Qarah“ nach dem **benachbarten Ort** durchsetzte, wurde der Name **Al-Shaban** zum Eigennamen dieser **benachbarten** Erhebung.`
> بعد: `… der Name „Al-Qarah“ nach dem **Nachbarort** durchsetzte, wurde der Name **„Al-Shaban“** zum Eigennamen dieser **benachbarten** Erhebung.`

**د.** `benachbart` مرّتين في جملةٍ واحدةٍ **لمرجعين مختلفين** (البلدة ثم الجبل) — أسوأُ تكرارٍ ممكنٍ في جملةٍ مدارُها التمييز. **هـ.** `der Name „Al-Shaban“` بالقوسين اتّساقاً مع „Al-Qarah“ في الجملة نفسِها ومع „Al-Shaban“ في الجملة السابقة: استعمالٌ لغويٌّ للاسم (mention) لا مرجعيّ، وهو حكمُ المعجم في السياق التاريخي. **زيادةُ علامتين، لا كلمة** — مرفوعةٌ في القسم ز.

> قبل: `**Die Höhlen** des berühmten Bergs und die Hinweise für einen Besuch **finden Sie auf der Seite** zum Jabal al-Qarah.`
> بعد: `**Mehr über die Höhlen** des berühmten Bergs und die Hinweise für einen Besuch **finden Sie auf der Seite** zum Jabal al-Qarah.`

**و.** بالألمانية لا «تَجد الكهوفَ على صفحة»، بل تجد ما عنها. و`Mehr` مسنودةٌ بالمتن نفسِه: الفقرةُ ذكرت كهوفَ الجبل الشهير في اقتباس ياقوت („in dessen Höhlen man Kühlung sucht“)، فالإحالةُ زيادةٌ على مذكور.

### 5. `tuwaither` — حقلٌ واحد

**5.1 `body_de`** — ثلاثةُ تغييرات:

> قبل: `Im Viertel Al-Qou' nördlich des Dorfes Al-Tuwaither, **mitten im Gürtel der östlichen Dörfer Al-Ahsas und rund zwanzig Kilometer östlich von Hofuf, erhebt sich** der Abu-Husais-Berg**;** im Westen grenzen …`
> بعد: `Im Viertel Al-Qou' nördlich des Dorfes Al-Tuwaither **erhebt sich der Abu-Husais-Berg – mitten im Gürtel der östlichen Dörfer Al-Ahsas, rund zwanzig Kilometer östlich von Hofuf.** Im Westen grenzen …`

**أ.** عشرون كلمةً قبل الفعل. أُبقي الظرفُ الأول وحده في الصدارة (نمطُ المنشور)، والباقي نَسَقاً (Nachtrag) بعد الشرطة، والفاصلةُ المنقوطة وقفاً تامّاً.

> قبل: `Bekannt ist der Berg für seine engen Grotten**, aus denen das ganze Jahr über kühle Luft strömt – eine Eigenheit der Sedimenthügel Al-Ahsas –,** für seine vom Wind gemeißelten Felsformationen und für Hänge, die sich leicht erklimmen lassen.`
> بعد: `Bekannt ist der Berg für seine engen Grotten**, für seine vom Wind gemeißelten Felsformationen und für Hänge, die sich leicht erklimmen lassen. Aus den Grotten strömt das ganze Jahr über kühle Luft – eine Eigenheit der Sedimenthügel Al-Ahsas.**`

**ب.** تعدادٌ ثلاثيٌّ بـ`für` مقطوعٌ باعتراضين متداخلين (صلةُ موصولٍ ثم شرطتان)، فيبعد الطرفُ الثاني عشرين كلمةً عن الأول. التعدادُ وُصل، وواقعةُ الهواء الباردِ صارت جملةً مستقلّة — **ولا تُنقَص بذلك**: «الجبلُ مشهورٌ بمغاراته» باقيةٌ في التعداد. (وهذا يخدم المرحلة 3 سلفاً — القسم هـ.)

> قبل: `… um den Berg **als touristische Ferienanlage mit umweltfreundlichen ländlichen Unterkünften auf einer Fläche von 100.000 Quadratmetern** zu entwickeln …`
> بعد: `… um den Berg **auf einer Fläche von 100.000 Quadratmetern als touristische Ferienanlage mit umweltfreundlichen ländlichen Unterkünften** zu entwickeln …`

**ج.** `auf einer Fläche von 100.000 Quadratmetern` كانت ملاصقةً لـ`Unterkünften` فتُقرأ مساحةَ **النُّزل**؛ والمصدرُ يجعلها مساحةَ المشروع („develop and operate the mountain as a tourist resort … over an area of 100,000 square metres“). نُقلت بعد `den Berg` فعادت إلى متبوعها. **الرقمُ وصيغتُه لم يُمَسّا.**

---

## ب. ما لم أمسّه في المرحلة 2 — وعلّةُ الإبقاء

1. **`kicker_de` = `Naturlandschaft` في الخمس** — خريطةُ التسميات مقيسةٌ في الموجز على 41 صفحة، وابتكارُ ثانيةٍ يكسر ستَّ صفحات. لا رأيَ لي فيها.
2. **`historische` مرّتين متجاورتين في `uqair-beach`** (الشاطئ ثم الميناء) — المصدرُ يقولهما في العربية والإنجليزية معاً. حذفُ إحداهما عملُ وقائع لا تحرير.
3. **`bekannt` مقابل `favourite` في `arbaa.summary_de`** — العربيةُ «شهيرة» وهي الفيصل، فـ`bekannt` أدقُّ من `beliebt`. أُبقيت.
4. **الجملةُ الأخيرة في `arbaa`** (‏`… gestartet, das den Zugang erleichtert`) — الصلةُ تبعد ثماني كلماتٍ عن `Projekt` لكنّها **المرشّحُ المحايدُ الوحيد** في الجملة، والبدائلُ كلُّها تُدخل جهةً (`soll`) أو غرضاً (`um … zu`) ليسا في المصدر.
5. **`Caravans` وَ`Caravanstellplatz`** — القسم ز-1.
6. **الاقتباسُ المحوَّلُ إلى النصب** (‏`verzeichnete ihn als „einen Berg in Bahrain …“`) — الإنجليزيةُ تحوّله كذلك (`recorded it as 'a mountain in Bahrain'`)، والقوسُ المعقوفُ داخل الاقتباس باقٍ كما تأمر العهدة 3.
7. **`Jabal al-Qarah (des Qarah-Bergs)`** — النقحرةُ تتصدّر، وهو نمطُ المنشور على الصفحات الأخرى (‏`tahimiyah-e`: „dicht bei den Hängen **des Jabal al-Qarah (des Qarah-Bergs)**“)، لا نمطُ صفحة الجبل نفسِها.
8. **أسئلةُ `uqair-beach` الأربعة بصيغة المتكلّم** (‏`Kann ich …`) — نمطٌ منشورٌ في ستّ صفحاتٍ على الأقلّ (`Muss ich für den Al-Asfar-See Eintritt zahlen?` · `Was kann ich im Qaisariyah-Souk kaufen?`).

---

## ج. حكمي في `Gemeindeverwaltung` — **يُوحَّد على جذر المعجم، ويبقى بلا اسمِ جهة**

**الحكم:** `die Gemeindeverwaltung` ⇒ **`die Kommunalverwaltung`** — بجذر المعجم نفسِه، **ومن غير** `von Al-Ahsa`.

الخيارات ثلاثة، وسقط منها اثنان:

- **توحيدٌ كاملٌ على `die Kommunalverwaltung von Al-Ahsa`** — **مرفوض، لأنه يضيف واقعة.** المصدرُ الإنجليزيُّ يقول `the municipality` مجرَّدةً، والعربيةُ تقول «البلدية» مجرَّدةً — بينما الصفحاتُ الأخرى كلُّها تقول `Al-Ahsa Municipality` / «أمانة الأحساء» صراحةً. فالتجريدُ **مقصودٌ في المصدر**، وسلوى تبعد 150 كم عن الهفوف. وتسميةُ الجهة تُسنِد إلى «أمانة الأحساء» عملاً لا يسنده مصدر — وهو خرقُ سياج الوقائع لا إصلاحُ اتّساق.
- **إبقاءُ `Gemeindeverwaltung`** — مرفوض: مصطلحٌ ثالثٌ بلا سند. `Kommunalverwaltung` تردُ **سبعَ مرّاتٍ في الألمانية المنشورة** (‏`craftsmen-souq` ×3 · `najm-park` ×2 · `koot-park` ×1 · `women-souq` ×1) و`Gemeindeverwaltung` **صفراً**.
- **`die Kommunalverwaltung` مجرّدةً** — **المعتمَد**: الجذرُ المعجميُّ واحدٌ فلا مصطلحَ ثالث، والتجريدُ محفوظٌ فلا واقعةَ مضافة.

**وهذا لا يردّ المرحلة 1 بل يُبقي حجّتَها ويُسقط لفظَها.** ‏`notes.stage1.md` د-7 علّلت `Gemeindeverwaltung` بأن «المصدر يقول البلدية مجرّدةً، واستعمالُ مدخل الأمانة كان سيُسند العملَ إلى جهةٍ أعلى بلا سند» — **وهذا صحيحٌ بحرفه وهو ما حفظتُه**. الذي أسقطتُه هو أنّ حفظَ التجريد لا يحتاج **لفظاً ثالثاً**: التجريدُ يُحمَل بحذف `von Al-Ahsa` لا بتبديل الاسم. وبه **يسقط مقترحُ المرحلة 1 في و-3** (إضافةُ مدخل `die Gemeindeverwaltung` للمعجم): لا مدخلَ جديدٌ لازم، والمدخلُ القائم يكفي مقيَّداً ومجرَّداً. وإن رأى المالكُ خلافَه فهو قرارُ معجمٍ لا قرارُ نصّ.

**والسابقةُ مقيسةٌ في النظيرتين المعتمدتين، وهي التي حسمت:** النسختان الروسيةُ والصينيةُ لهذه الصفحة بالذات تصرّفان الجهةَ **مجرّدةً** — ru: «**Муниципалитет** благоустроил пляж и парк при нём» · zh: 「**市政部门**还为海滩及附属公园修建了…」 — بينما تسمّيانها في `uqair-beach` حيث يسمّيها المصدر — ru: «**Муниципалитет Аль-Ахсы** устроил на пляже площадку…» · zh: 「由**哈萨市政局**设立」. فالألمانيةُ تفعل ما فعلتاه: لفظٌ واحد، مقيَّدٌ حيث قيّده المصدر، مجرَّدٌ حيث جرّده.

> وتبقى العهدةُ 1 على حالها ولم تُمَسّ: `Kommunalverwaltung` (أمانة) و`Gouvernorat` (محافظة) في بطاقة `uqair-beach` **جهتان مختلفتان** لم أقاربهما بحرف.

---

## د. المرحلة 3 — الحقلُ الواحد المغيَّر، والگلوسُ وسندُه

الحقلُ الوحيد: **`salwa-beach.body_de`**. وفيه تدخّلان، كلاهما **گلوسٌ** لا محتوى — والگلوسُ بندٌ منصوصٌ عليه في نصّ الدور نفسِه („Gloss what a German reader cannot be assumed to know — Arabic terms, the Hijri calendar, **a governorate as an administrative unit**“).

**د-1. المحافظةُ وحدةً إدارية**

> قبل: `**Verwaltungsmäßig gehört** Salwa zum Gouvernorat al-Ahsa.`
> بعد: `**Salwa gehört** zum Gouvernorat al-Ahsa, **dem übergeordneten Verwaltungsbezirk**.`

**السند:** (1) نصُّ الدور يسمّي هذا الگلوسَ بعينه. (2) **النظيرةُ الروسيةُ المعتمدةُ تحمله حرفياً**: «Сам город относится к мухафазе **(административному округу)** Аль-Ахса». (3) `übergeordnet` ترجمةُ `falls … **under**` / «تتبع» لا زيادةٌ عليها. (4) `Verwaltungsmäßig` حُذفت لأن `Verwaltungsbezirk` تحملها، ولئلّا يتكرّر الجذرُ مرّتين في جملةٍ من ثماني كلمات. و**هذا أولُ ورودٍ لـ`Gouvernorat` في متنٍ ألمانيٍّ منشور** (صفرُ ورودٍ في `src/` قبل هذه الدفعة)، فالگلوسُ في موضعه تماماً: أولَ مرّةٍ في المتن، لا في عنوان.

**د-2. «المملكة» أيُّ مملكة**

> قبل: `… am Landübergang **des Königreichs** nach Katar.`
> بعد: `… am Landübergang **des Königreichs Saudi-Arabien** nach Katar.`

**السند:** (1) **النظيرتان المعتمدتان تفكّان الإحالة في هذه الجملة بعينها**: ru «у сухопутных ворот **Саудовской Аравии** в Катар» · zh 「这里也是**沙特阿拉伯**通往卡塔尔的陆路门户」. (2) `naming_policy.exception` في المعجم يعدّ `Saudi-Arabien` الصيغةَ الألمانيةَ المستقرّة. (3) **بدلٌ باسم الدولة الرسميّ** („Königreich Saudi-Arabien“) فلا كلمةَ محتوىً جديدة ولا حذفَ لكلمة المصدر `Königreich` — فكُّ إحالةٍ لا إضافةُ واقعة. (4) الجملةُ تصف **معبراً حدوديّاً دوليّاً**، وهو أسوأُ موضعٍ يُترك فيه طرفُ الحدود غيرَ مسمّى لقارئٍ أجنبيّ.

> وهذا التدخّلُ **مرفوعٌ للمرحلة 4** في القسم ز-5: المنشورُ `najm-park` يُبقي „im Königreich“ مجرّدةً، وإن رُدّ فالردُّ حذفُ كلمتين لا إعادةُ صياغة.

**فرقُ الكلمات آلياً على الحقل الوحيد المغيَّر** (وهو كلُّ ما تغيّر في المرحلة 3):

| زادت | نقصت |
|---|---|
| `Saudi-Arabien` · `dem` · `übergeordneten` · `Verwaltungsbezirk` | `Verwaltungsmäßig` |

**ولا كلمةَ محتوىً أخرى.** لا زاويةَ تصوير · لا أدبَ زيارة · لا أفضلَ وقت · لا مدّةَ زيارة · لا مقارنةَ بوجهة · لا موسمَ ولا حرارة · لا مرفقَ غيرَ مذكور. ومجموعةُ الأرقام في الدفعة كلِّها متطابقةٌ بين المرحلة 1 والمرحلة 3 آلياً (`22` · `150` · `2024` · `100.000`)، وكذلك مجموعةُ الأعلام عدا ثلاثةٍ معلَّلة: `Al-Shaban` +1 (أ-4.1) · `Kommunalverwaltung` +1 (القسم ج) · `Saudi-Arabien` +1 (د-2).

---

## هـ. ما فحصتُه بعين DACH ولم أغيّره

**الگلوسات — مسحٌ على كلّ اسمٍ ومصطلحٍ في الدفعة:** التغطيةُ كاملةٌ سلفاً، فلم أضِف گلوساً ثالثاً ولم أضاعف واحداً:

| المصطلح | الگلوسُ القائم | الحكم |
|---|---|---|
| `Al-Arba` | „daher der Name **„die Vier“**“ | قائمٌ ومسنودٌ بالمصدر — لا يُكرَّر |
| `Al-Shaban` | „der Name – **„der Satte“** –“ | قائمٌ ومسنود |
| `Bahrain` | „**[den historischen Ostküstenlanden]**“ | العهدةُ 3 — لم يُمَسّ بحرف |
| `Jabal al-Qarah` | „**(des Qarah-Bergs)**“ | قائم، مرّةً واحدةً في المتن |
| `Yaqut al-Hamawi` | „**Der Geograph** Yaqut al-Hamawi“ | اسمُ الجنس يكفي؛ ولا تواريخَ ولا عصر (المعجم يمنع) |
| `Al-Qou'` · `Al-Tuwaither` · `Salwa` · `Al-Taraf` | „im **Viertel**“ · „des **Dorfes**“ · „der **Ort**“ | كلُّها تحمل اسمَ جنسِها |
| `Aba Al-Kabari` | **بلا گلوس — عمداً** | المصدرُ لا يعطي له معنى، والمعجم ينصّ صراحةً على ألّا يُختلق |
| `Humanisierung der Straße` | **بلا گلوس** | المتنُ يذكر أثرَها („das den Zugang erleichtert“)؛ وأيُّ شرحٍ لماهية البرنامج اختلاق |
| `der Golf` | بلا گلوس | حكمُ المعجم: تُتفادى التسميةُ المتنازَعُ عليها |

**محاورُ التخطيط الستّة** — فُحصت صفحةً صفحة، والمقدَّمُ منها مقدَّمٌ سلفاً بعد المرحلتين 1 و2:

- **الحرّ والموسم**: `uqair-beach` وحدها تحملهما (`bestTime_de`)، وهو **محجوزٌ بتكرارٍ ملزَمٍ مع `faq[1]`** فلا يُقارَب. والأربعُ الباقيةُ لا تحملهما في المصدر ⇒ القسم و-1.
- **الظلُّ والمرافق**: `uqair-beach` تُنهي متنَها بها، و`salwa-beach` تُنهي متنَها بها والمظلّةُ أولُ التعداد. موضعُ الخاتمةِ أقوى مواضع الإبراز، فلا نقل.
- **الهواءُ الباردُ في `tuwaither`** — أهمُّ واقعةٍ تخطيطيةٍ في الدفعة عند قارئٍ يخشى الحرّ. **صارت جملةً مستقلّةً في المرحلة 2** (أ-5.1-ب) فبرزت من داخل اعتراضٍ إلى وقفةٍ كاملة؛ ونقلُها فوقَ التعداد كان سيُخرج المغاراتِ من «ما اشتُهر به الجبل» — أي يحذف واقعة. تُرك.
- **الوصلُ ببقية اليوم**: خاتمةُ `shaban` إحالةٌ إلى صفحة جبل القارة، وخاتمةُ `arbaa` تيسيرُ الوصول، ومطلعُ `arbaa` «على الطريق نحو سلوى وقطر»، و`salwa-beach` «150 كم من الهفوف» — أربعتُها في مواضع إبرازٍ سلفاً.
- **العائلاتُ وكبارُ السنّ**: `uqair-beach` „für Familien“ · `salwa-beach` „mit der Familie zusammenzusitzen“ · `tuwaither` „Hänge, die sich leicht erklimmen lassen“. لا مزيدَ في المصدر.
- **المواعيدُ قيداً**: البطاقاتُ الأربعُ المنشورةُ تقول «موقعٌ مفتوح»، وبطاقةُ `uqair-beach` عن الكرفانات. لا عملَ هنا.

**تُرك عمداً**: تكرارُ `Kommunalverwaltung` ثلاثَ مرّاتٍ في الدفعة (المصدرُ يقوله في ثلاث صفحات) · `Katar` ثلاثاً · صيغةُ `im Jahr 2024` بلا هجريّ (العهدة 5) · وكلُّ ما في القسم ب.

---

## و. `source_defects_for_owner` — نقصٌ يضرّ المسافر، لم أسدّه

> **قائمةُ المرحلة 1 تبقى كما رُفعت ولم أبتّ في شيءٍ منها**: `notes.stage1.md` هـ-1 … هـ-8 (ومنها إبهامُ «ملاعب» في هـ-2 — أُبقي `Spielplätze` كما هو، ولم أقاربه) وَب-1 (اختلافُ العربية والإنجليزية في `shaban`). وما يلي **زيادةٌ عليها بعينِ المسافر**، لا إعادةُ رفعٍ لها.

1. **أربعٌ من خمسٍ بلا `bestTime`** — `arbaa` وَ`salwa-beach` وَ`shaban` وَ`tuwaither` مواقعُ **مكشوفةٌ تماماً** (جبالٌ وشاطئٌ وصحراء) في إقليمٍ حارّ، ولا كلمةَ عن الموسم ولا عن وقت اليوم. أثقلُ فجوةٍ في الدفعة، وهي الفجوةُ نفسُها التي رُفعت في الدفعة 5.
2. **`arbaa` وجهةُ تخييمٍ معلَنةٌ بلا كلمةٍ عن التخييم عملياً**: أيُسمح بالمبيت؟ أين؟ أثمّةَ مرافق؟ المصدرُ صامت، والقارئُ الذي جاء من أجل «Camping» يخرج بلا جواب.
3. **`tuwaither`: عقدُ 2024 بلا حالة** — أقائمٌ المنتجعُ اليوم أم قيدَ الإنشاء؟ الصياغةُ الألمانيةُ تُبقيه غرضاً للعقد (`um … zu entwickeln`) كما في المصدر، لكنّ القارئَ الذي يريد الحجزَ لا يعرف.
4. **`uqair-beach`: «يُحجز إلكترونياً» بلا قناةٍ ولا رسم** — لا رابطَ ولا اسمَ منصّةٍ ولا سعر، والجملةُ تَعِد بإجراءٍ لا تدلّ عليه.
5. **`shaban` صفحةُ اسمٍ لا صفحةُ زيارة**: كلُّ متنِها نحوُ الاسم وتاريخِه؛ ولا كلمةَ عمّا يراه الزائرُ إن ذهب، ولا عن الوصول، ولا عن مسار. تتجاوز C23 عدداً لا معنى.
6. **`salwa-beach` 150 كم و`arbaa` 22 كم** — مسافاتٌ بلا زمنِ طريقٍ ولا وصفِ طريق، وهي أوّلُ ما يحسبه مسافرُ DACH الذي يقود بنفسه.
7. **لا ماءَ شربٍ ولا دورةَ مياهٍ ولا مقهى في أيٍّ من الخمس** (عدا مرافقِ `uqair-beach` المجملةِ ومرافقِ سلوى).
8. **إضافةٌ إلى ب-1 للمرحلة 1** (اختلافُ العربية والإنجليزية في `shaban`): العلّةُ العربيةُ «نسبةً إلى البلدة المجاورة» باقيةٌ في الألمانية بصيغة `nach dem Nachbarort` (القسم أ-4.2-د)، **فالألمانيةُ الآن أتمُّ من `body_en`** — وهي حالٌ لا ينبغي أن تدوم: إمّا تُستكمل الإنجليزيةُ وإمّا يُبتّ بحذفها من الألمانية. القرارُ للمالك، والخطُّ لا يملكه.
9. **إضافةٌ إلى هـ-1 للمرحلة 1** (الجهةُ المطوِّرةُ في `salwa-beach`): وزيادةً على إبهام المستوى، **لا يعرف القارئُ أهي الجهةُ نفسُها التي أنشأت موقعَ الكرفانات في العقير** — والصفحتان في دفعةٍ واحدةٍ يقرؤهما زائرٌ واحد.

---

## ز. ما أرفعه للمرحلة 4 — لا أبتّ فيه

1. **`Caravans` (تسمية) وَ`Caravanstellplatz`** — أبقيتُهما بتعليل المرحلة 1 نفسِه (‏`notes.stage1.md` د-6 وَهـ-4). `Caravan` مدخلٌ في Duden وليس في قائمة Denglisch المحظورة، و`Caravanstellplatz` صيغةُ المواقع الألمانية المعتادة. وإن رأت المرحلة 4 `Wohnwagen`/`Wohnmobil` فهما **يضيّقان الواقعة** (المقطورُ مقابلَ ذاتيِّ الدفع، والإنجليزيةُ `caravan` تحتملهما)، و`Caravan` أوسعُ فأأمن. النظيرتان استعملتا اسماً محلياً (ru «Дома на колёсах» · zh 房车) فالسابقةُ لا تُلزم الألمانية.
2. **حذفُ اسم الجنس من `area_de` في الحقلين** (القسم صفر) — يُثبَّت أو يُردّ إلى „Ort Salwa –“ / „nahe dem Ort Al-Taraf“.
3. **قوسا الاقتباس حول „Al-Shaban“** في `shaban.body_de` (أ-4.2-هـ) — زيادةُ علامتين لا كلمة.
4. **`Nachbarort`** ترجمةً لـ«البلدة المجاورة» في `shaban` — **الجذرُ `Ort` اختيارُ المرحلة 1 نفسِه ولم أغيّره** (‏`notes.stage1.md` ب-1: «وكُتبت `Ort` لا `Dorf` ولا `Stadt`… وسابقةُ مدخل `Al-Jafr` تجعل `der Ort` الترجمةَ المحايدة»)، وتصحيحُ المعجم اليومَ يصدّقه؛ الذي غيّرتُه المركَّبُ وحده (`dem benachbarten Ort` ⇒ `dem Nachbarort`) لتكرارِ `benachbart` لا لاسم الجنس. **ويبقى وجهٌ ثانٍ للمرحلة 4**: مدخلُ `Al-Qarah (village)` يقول `das Dorf`، والجملةُ **لا تسمّي البلدة** فاتّبعتُ لفظَ المصدر لا مدخلَ المكان. إن رأت المرحلة 4 أنّ المرجعَ قريةُ القارة المعروفة فالصيغةُ `nach dem Nachbardorf`.
5. **`des Königreichs Saudi-Arabien`** (د-2) — تدخّلُ المرحلة 3، ومقابلَه سابقةُ `najm-park` المنشورة التي تُبقي „im Königreich“ مجرّدة.
6. **`Platz` بدل `Ort`** في `salwa-beach` (أ-3.2-د) — ناتجٌ عن تصحيح المعجم لا اختيارٌ أسلوبيّ.
7. **`Verwaltungsbezirk`** مصطلحاً للگلوس — البديلُ `Verwaltungseinheit`، وفضّلتُ الأول لأنه الأشيعُ في الألمانية الإدارية للوحدة المكانية.

---

## ح. فحوصٌ آليّة بعد آخر تحريرٍ لي (على `fields.stage2.json` و`fields.stage3.json` معاً)

- **البنية**: 37 حقلاً، ومفاتيحُ متطابقةٌ **بالترتيب** مع مخرج المرحلة 1 — `True`.
- **التكراراتُ الثلاثةُ الملزَمة**: `faq[1].a_de == bestTime_de` بايتاً ببايت ✓ · `faq[2].a_de` جملةٌ واردةٌ في `body_de` ✓ · `faq[0].a_de == "Ja. " + practical[0].value_de + "."` ✓ — الثلاثةُ **بعد** التحرير لا قبله.
- **C4**: صفرُ رقمٍ عربيٍّ-هنديّ. **C17**: صفرُ `U+2014`؛ و16 شرطةَ `U+2013` كلُّها بمسافتين (مفحوصةً محرفاً بمحرف). **C18**: صفرُ `Souq`.
- **صفرُ `U+00A0`** وصفرُ مسافةٍ ضيّقة/رفيعة وصفرُ شرطةٍ لينة.
- **صفرُ `Qatar`** · صفرُ `Stadt` · صفرُ `Gemeindeverwaltung` · صفرُ `du/dich/dir/dein`.
- **صفرُ Denglisch** (`Spot`·`Location`·`Must-see`·`Hotspot`·`Guide`·`Feeling`·`Vibe`·`Highlight`) · صفرُ `Erleben/Entdecken Sie` · صفرُ علامةِ تعجّب · صفرُ حشوٍ ومبالغة (`natürlich`·`wirklich`·`einfach`·`atemberaubend`·`weltberühmt`·`einzigartig`) · صفرُ `erfolgt`/`Durchführung`.
- **الاقتباس**: صفرُ `"` مستقيمة؛ و`„…“` متوازنةٌ في الحقول الثلاثة التي تحملها (1+1 · 2+2 · 6+6). والفاصلةُ العليا الوحيدةُ `Al-Qou'` هي `U+0027` كما يأمر المعجم صراحةً — **لا تُبدَّل بـ’**.
- **المخاطبة**: `Sie` ثلاثَ مرّات (‏`shaban.body_de` كما كانت + `uqair-beach.body_de` و`faq[2].a_de` الجديدتان من حذف `es gibt`)، **ولا جملةَ واحدةٌ تبتدئ بـ`Sie`** (سابقةُ `batch-de-5` ج-10، مفحوصةً جملةً جملة). والعددُ ارتفع من واحدٍ إلى ثلاثةٍ عمداً: `finden Sie` صيغةُ المنشور في `craftsmen-souq` و`women-souq`، وهي البديلُ الطبيعيُّ لـ`es gibt` المحذوفة.
- **تمييزُ المرحلة 1 بين `Grotten` و`Höhlen` محفوظٌ بعد التحرير** (قرارُها د-3): `tuwaither` ‏`Grotten` ×2 وصفرُ `Höhlen` · `shaban` ‏`Höhlen` ×2 وصفرُ `Grotten` — والجملةُ الجديدةُ في `tuwaither` تعيد `Grotten` إحالةً على ما قبلها لا مصطلحاً جديداً.
- **C21**: أسئلةُ `uqair-beach` الأربعةُ **صفرُ رقمٍ** بعد التحرير كما كانت قبله ⇒ يمرّ.
- **الأرقام**: مجموعةُ أرقام الدفعة متطابقةٌ بين المرحلة 1 والمرحلة 3 (`22` · `150` · `2024` · `100.000`)، و`100.000` بنقطة الآلاف ومسافةٍ عادية قبل `Quadratmetern`.
- **الأعلام**: مجموعةُ 21 علماً محسوبةٌ عدّاً بين المرحلتين 1 و3 — متطابقةٌ عدا الثلاثة المعلَّلة في القسم د.
