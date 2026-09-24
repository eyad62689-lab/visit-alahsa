# المرحلة 6 — القارئ الأعمى · دفعة `de-blog-7` (jabal-qarah)

قرأ **مخرج `dist` وحده**: نصّ `/de/blog/jabal-al-qarah-guide/` من `<body>` كاملاً (الملاحة والمقال والتذييل) + أجوبة `FAQPage` الثلاثة **منفردةً** في جزء ب. لم يرَ المصدر الإنجليزي ولا العربي ولا المعجم، ولم يُخبَر أنها ترجمة.

**55 ملاحظة.**

---

## ⚠ تحقّقٌ مقيس أجريتُه قبل تسليمك — ثلاث ملاحظات بُتّت سلفاً

| # | الدعوى | الحكم المقيس |
|---|---|---|
| **41** | «بنود *ما يستحق المشاهدة* تبدأ أسطرها بنقطة (‏`. Ein Kulturerbe-Dorf`)، ونقطة وحيدة في سطر» | **مرفوضة — عَرَضٌ من أداة القصّ لا من الصفحة.** التصيير الفعلي `<strong><a href="/de/attractions/ardh-alhadarat/">„Land of Civilisations“</a>.</strong> Ein Kulturerbe-Dorf…` — وأداتي كانت تقطع سطراً عند `</a>` وهو عنصر **سطري**، فتُلقي النقطة في أول السطر. أُصلحت الأداة (كتلٌ فقط) وأُعيد القصّ: **أسطر تبدأ بنقطة = 0**. |
| **42** | «في الأسئلة الثلاثة يلتصق الجواب بالسؤال بلا مسافة (‏`…im Sommer?Ja –`)» | **مرفوضة — عَرَضٌ من الأداة.** التصيير `<details><summary>س</summary><p>ج</p></details>`، والأداة لم تكن تقطع عند `</summary>`. أُصلحت وأُعيد القصّ: **التصاق `?Ja` = 0**. |
| **31** | «كلمة **Saudi-Arabien** لا ترد في الصفحة كلها» | **مؤكَّدة بالقياس.** فحصتُ الصفحة المصيَّرة: غائبة من النصّ المرئي **ومن كتل `ld+json` معاً**. وهي **علّة مصدر تصيب اللغات الخمس** (الإنجليزي والعربي لا يسمّيان البلد أيضاً)، لا عملَ الخطّ الألماني. |

**فيما عدا الثلاث، الملاحظات مسلَّمة إليك كما كتبها، وعليك أن تبتّ كلاً منها: مطبَّقة أو مرفوضة بتعليل أو خارج النطاق (علّة مصدر).**

---

## تقرير القارئ بنصّه

### ما اشتغل جيداً (بنصّه)

> البناء واضح: مقدمة، «لماذا الكهوف باردة؟»، «ما يستحق المشاهدة»، «متى تأتي»، «إرشادات عملية»، «الخلاصة»، «أسئلة شائعة» — عرفتُ في كل لحظة أين أنا. و**قاعدة الحرّ** («المحطات المكشوفة صباحاً وعند الغروب، والكهوف في الساعات بينهما») أنفعُ جملةٍ في الصفحة كلها؛ حفظتُها. والأسئلة الثلاثة هي بالضبط الثلاثة التي كنت سأسألها.

### جملٌ لزمني أن أقرأها مرتين

1. **`Im Herzen von Al-Ahsa – der größten Oase der Welt, seit 2018 UNESCO-Welterbe – ragt Jabal al-Qarah (der Qarah-Berg) zwischen den Hainen auf wie ein uralter Wächter.`** — أول جملة فيها اعتراضٌ بطبقتَي بدل، ثم قوس، ثم تشبيه؛ رجعتُ إلى صدر الجملة لأجد الفاعل. **و`zwischen den Hainen` — أيّ بساتين؟** لم يُذكر بستانٌ قبلها، والأداة المعرِّفة تفترض معلوماً لا أعرفه.
2. **`Wasser und Wind haben dieses Gestein über Jahrtausende geformt`** — **`dieses` Gestein — أيّ صخر؟** أول ذكرٍ للصخر في القسم. إشارةٌ بلا مشارٍ إليه؛ صعدتُ أتحقّق أنني لم أُغفل شيئاً.
3. **`Treten Sie mittags im August ein, so empfängt Sie eine unerwartete Kühle; treten Sie in einer Winternacht ein, so fühlt es sich darin warm an.`** — شرطيّتان متتاليتان بصدر الفعل و`so`: ألمانيةٌ رفيعةٌ تكاد تكون قديمة، وفي دليل سفرٍ تعثّرتُ بها؛ واحتجتُ أن أستأنف عند الشقّ الثاني.
4. **`Seine Basis bedeckt rund 14 km², und von Norden nach Süden erstreckt er sich über etwa tausend Meter.`** — **وقفتُ أحسب.** 14 كم² قاعدةً مقابل نحو كيلومترٍ واحدٍ شمالاً-جنوباً يعني جبلاً عرضه 14 كم — أي حاجزاً مستطيلاً جداً، ولا يوافق «الظِّلّ» و«القمة». أحد الرقمين يبدو خطأً ولا أستطيع أن أحدّد أيّهما. وفي الجملة نفسها: **`14 km²` بالأرقام و`tausend Meter` بالحروف.**
5. **`Es ist dieser Anblick, der begreiflich macht, warum Al-Ahsa zur größten Oase der Welt wurde.`** — لا يستقيم منطقاً: المنظر يفسّر **أنها** أكبر واحة، لا **لماذا صارت** كذلك. و`wurde` يَعِد بقصة نشأةٍ لا تجيء.
6. **`die Kühle des Felsens im Gesicht nach dem grellen Licht der Mittagsstunde, der Gang, der sich verengt, dann die Halle, die sich öffnet, und zuletzt das Meer aus Dattelpalmen vom Gipfel.`** — تعدادٌ بلا فعل عبر ثلاثة أسطر؛ بحثتُ رجوعاً عمّا يتعلّق به (`um ihn zu spüren:`). موحٍ، لكنني فقدتُ المسند.
7. **`prüfen Sie beides vor Ihrem Besuch über die offiziellen Kanäle nach.`** — `nach` المنفصلة تجيء متأخرةً جداً؛ كنت قد أنهيتُ الجملة عند `prüfen Sie` فاضطررتُ أن أصحّح رجوعاً.

### مواضع لا أعرف إلامَ يعود فيها الضمير

8. **`auf der Seite der Sehenswürdigkeit finden Sie den Kartenlink und die Koordinaten`** — ثم ثلاث مرات أخرى. **أيّ صفحة؟ لا اسم لها.** أقرأ مقالاً عن جبل القارة — أثمّة صفحة ثانية؟ ولماذا الأهمّ هناك لا هنا؟ وكيف أعرفها في القائمة؟ في الترويسة `Sehenswertes`، وفي الفتات `Blog`، وفوق العنوان `Sehenswürdigkeiten Al-Ahsas` — ثلاث كلماتٍ متشابهة وليس فيها «صفحة المعلم».
9. **`die offiziellen Kanäle`** — ثلاث مرات، ولا تُسمّى ولا مرّة. أيّ جهة؟ أيّ موقع؟ لا أستطيع اتّباع النصيحة لأني لا أعرف إلى أين.
10. **`und mit „Meine Reise“`** — يظهر في المتن كأنني أعرف ما هو. وفي الشريط `Meine Reise 0` — والصفر لم يقل لي شيئاً. ولا أعرف إلا في **الجواب الثالث** أنها تبني مساراً يُفتح في خرائط قوقل. الشرح غائبٌ حيث أحتاجه أولاً.
11. **`dank Pfaden, Einrichtungen und Aussichtspunkten`** — `Einrichtungen` كلمةُ لا-شيء: دورات مياه؟ مقهى؟ موقف؟ منحدر كرسيّ متحرك؟ **وهنا `Aussichtspunkten` جمعاً، وقبل فقرةٍ `Der Aussichtspunkt` مفرداً.** أهو واحدٌ من عدّة أم الواحد؟
12. **`Der Aussichtspunkt … Vom Gipfel aus`** — أهما شيءٌ واحد؟ وهل أصعد مشياً، أثمّة درجات، كم يستغرق؟ العنوان الفرعي يقول «متى **تصعد**» ولا شيء عن شكل الصعود.
13. **`Auch die Tickets werden hier ausgegeben, und sie schließen das Höhlenerlebnis ein.`** — تذاكرُ **لماذا**؟ الجملة تقول إن التذكرة **تشمل** الكهوف، أي أن ثمّة تذكرةً رئيسية لشيءٍ آخر. للقرية؟ للمعرض؟ لكليهما؟ بعد ثلاث قراءاتٍ للصيغة نفسها حرفياً في ثلاثة مواضع، ما زلتُ لا أعرف ما الذي أشتريه.

### تناقضات

14. **شتاءٌ أم ليل؟** المقدمة `im tiefsten Winter halten sie stille Wärme`، والسؤال `im tiefsten Winter warm`. وبينهما `treten Sie in einer Winternacht ein, so fühlt es sich darin warm an` — وهذا شيءٌ آخر: مرةً فصل ومرةً وقتٌ من اليوم. **ولا يوافق `ganzjährig eine gleichbleibende Temperatur`**: إن كان الصخر 20 °م دائماً فلا أثر لليل. ارتبتُ هنا في أن النصّ فهم تفسيره الخاص.
15. **أتجنّب الحرّ أم أقصده؟** `Der Ort eignet sich für Familien wie für Fotografen – besonders an heißen Tagen` ثم بعد أسطر `Die beste Zeit für den Aufstieg: am frühen Morgen oder kurz vor Sonnenuntergang, wenn … die Hitze nachlässt`. المقصود كهفٌ مقابل قمة، لكنّي قرأتُهما أولَ وهلةٍ تناقضاً.
16. **في القرية أم عندها؟** `Am Fuß des Berges, im Dorf Al-Qarah` مقابل `Lage: östlich von Hofuf, beim Dorf Al-Qarah`.
17. **`rund 20 °C` = `Wärme`؟** عشرون درجة عندي معتدلة لا دافئة. (أفهم أنها دافئةٌ نسبةً إلى هواء الشتاء — لكن `Wärme` اسماً أوقفتني.)
18. **ثلاثة أسماء للتخطيط**: الزرّ `Besuch planen`، وفي القائمة `Reise planen`، وفي التذييل `Reise planen` و`Meine Reise`. أصفحاتٌ ثلاث أم واحدة؟ والنمط نفسه في `Gastronomie` (قائمة) مقابل `Restaurants und Cafés` (تذييل)، و`Übernachten` مقابل `Unterkünfte`، و`Sehenswertes` مقابل `Sehenswürdigkeiten`. **شعرتُ عند التذييل أنني في موقعٍ آخر.**

### وعودٌ لا تُوفى

19. **`Praktische Hinweise`** — العنوان يَعِد بالعمليّ، وليس تحته **بيانٌ عمليٌّ واحد**: لا موعد ولا سعر ولا عنوان ولا مدة. بل ثلاث إحالات إلى صفحةٍ أخرى. **هنا خاب ظنّي كمخطِّط رحلة — وهنا كنتُ سأتوقف وأبحث في قوقل.**
20. **`Alles für einen Besuch am Jabal al-Qarah`** — «كلّ» كلمةٌ كبيرة. الناقص: السعر، المواعيد، مدة جولة الكهوف، الحذاء، أأحتاج كشافاً، الإتاحة، أيضيق المكان على من يخاف الأماكن المغلقة، أأحتاج مرشداً، أتمرّ عربة الطفل، الموقف.
21. **`Warum sind die Höhlen kühl?`** — العنوان سؤالُ «لماذا»، والجواب في لبّه `Die tiefe Gesteinsmasse hält ganzjährig eine gleichbleibende Temperatur von rund 20 °C` — وهذا **وصفٌ لا تفسير**. *لماذا* تحفظها؟ ثم إن الفقرة الثانية من القسم (`Dabei ist der Berg kein einziger durchgehender Gang … Seine Basis bedeckt rund 14 km²`) لا تتكلم عن البرودة أصلاً بل عن الحجم والعدد.
22. **`In ihm liegen zwölf Höhlen von unterschiedlicher Form, darunter die Höhlen Naqah, Eid und Mahyoub.`** — اثنتا عشرة يُعلَن عنها، وثلاثٌ تُسمّى، ثم **لا أعرف عن الثلاث شيئاً بعدها**: لا أيُّها أجمل، ولا أيُّها يُدخَل، ولا أأراها كلها أم واحدة. الأسماء بلا أثر.
23. **`finden Sie im Blog einen vollständigen Rundgang durch die Handwerke Al-Ahsas`** — الإحالة بلا عنوان مقال. «في المدونة» ليست وجهةً بل أرشيف.
24. **`Anreise`** في التذييل — وجواب «كيف أصل؟» لا يحيل إليه. الصفحة عندها الجواب ولا ترسلني إليه.

### كلماتٌ وأسماءٌ غريبة عليّ

25. **`Land of Civilisations`** — اسمٌ **إنجليزي** وسط نصّ ألماني، بين قوسين، بلا بيانٍ كيف يُقال بالعربية ولا ما المكتوب على اللوحة هناك. إن وقفتُ عند سفح الجبل أبحث عن لوحةٍ عربية فلن ينفعني هذا الاسم.
26. **`Dougha Al-Gharash`** — لا أدري ما «Dougha»: ورشة؟ بيت؟ اسم عائلة؟ ولا أحزر إلا من الجملة التالية أن الغرش هي العائلة. و«Dougha» يبقى عندي صوتاً.
27. **النقحرة غير مطّردة وتبدو إنجليزية**: `Jabal al-qarah` بـ«al» صغيرة مقابل `Dorf Al-Qarah` بكبيرة؛ و`Mahyoub` و`Dougha` بـ«ou» و«y» إنجليزيّتين؛ و`Hofuf`، `Naqah`، `Hasawi`. لعينٍ ألمانية يبدو هذا كلُّه عن أصلٍ إنجليزي.
28. **`Eid`** اسمَ كهف: أقرأ أولاً الكلمة الألمانية *Eid* (القَسَم) ثم العَلَم. وفي التعداد `die Höhlen Naqah, Eid und Mahyoub` أخرجني ذلك عن الإيقاع لحظة.
29. **`Hasawi-Küche`** في القائمة — ما «Hasawi»؟ أحزر «من الأحساء» ولا يُقال في موضع. وكذلك **`Oasenfrüchte`**: أهي معرفةُ أصناف؟ دليلُ شراء؟ بابُ وصفات؟
30. **`Hofuf`** يُستعمل نقطةَ إسناد (`östlich von Hofuf`) ولا يُعرَّف قطّ. أمدينةٌ هي؟ ما حجمها؟ كم تبعد؟ «شرق الهفوف» عندي كـ«شرق X».
31. **`Saudi-Arabien` لا ترد في الصفحة كلها ولا مرة.** عرفتُها مصادفةً — ومن النصّ وحده ما كنتُ لأعرف البلد. *(مؤكَّدة بقياسي — انظر الجدول أعلاه.)*
32. **`Markenhandbuch`** في التذييل — بندٌ عجيبٌ جداً لمسافر.

### صياغاتٌ لا تُسمَع ألمانيةً أصلية

33. **`Station`** للمعلَم، **أربع مرات**: `zu den besten Stationen in Al-Ahsa` · `die natürliche erste Station jedes Besuchs` · `Stationen unter freiem Himmel` · `Planen Sie Ihre Stationen`. في الألمانية المحطةُ موقفٌ على خطّ سير (درب الصليب، القطار) — وللمعلَم تبدو مفردةً منقولةً حرفياً.
34. **`Höhlenerlebnis`** — ثلاث مرات، دائماً في التركيب نفسه `sie schließen das Höhlenerlebnis ein`. ألمانيةُ أنظمة تذاكر لا نبرةُ بقيّة النصّ.
35. **`Die Hitzeregel für Al-Ahsa lautet`** — `Hitzeregel` كلمةٌ لا أعرفها. قاعدةُ مَن؟ تبدو كأن النصّ يستشهد بقاعدةٍ ذائعة لا وجود لها على الأرجح.
36. **`Dieser Reiseführer bündelt, was Sie vor dem Besuch brauchen`** — `bündelt` لنصٍّ غريبة؛ تُبندَل العروضُ والقوى لا الإفادات.
37. **`Im Hochsommer bewahren sie sanfte Kühle, und im tiefsten Winter halten sie stille Wärme`** — `stille Wärme` و`sanfte Kühle` و`bewahren`/`halten` في بناءٍ متوازٍ: شعرٌ مترجَم. جميلُ القصد، لكنّي أسمع الأصل من خلفه.
38. **`Verfolgen Sie die Schritte des Handwerks`** — أتتبّع الخُطى بمعنى أن ألحق بأحد؛ والمراد هنا أن أشاهد. الأمرُ يبدو غريباً.
39. **`Presseberichten zufolge besteht das Töpferhandwerk an diesem Ort seit mehr als 600 Jahren fort.`** — `besteht … fort` ثقيلة، و`Presseberichten zufolge` مصدرٌ ليس بمصدر: أيّ صحافة، ومتى؟ حذرُ الصياغة يريبني أكثر مما يقنعني.
40. **`Der Ort eignet sich für Familien wie für Fotografen`** — `für X wie für Y` صحيحة لكنها بدت متكلَّفة؛ ومضمونها ينطبق على كل معلم تقريباً.
41. *(عَرَضُ أداة — مرفوضة سلفاً)* خللُ تصيير في بنود «ما يستحق المشاهدة».
42. *(عَرَضُ أداة — مرفوضة سلفاً)* التصاق الجواب بالسؤال في الأسئلة الثلاثة.
43. **`Souks & Parks`** في القائمة بالعطف التجاري، وفي التذييل `Traditionelle Souks` و`Parks und Gärten` مبسوطة. غير مطّرد.

### أسئلةٌ تثيرها الصفحة ولا تجيب عنها

44. **كم يكلّف؟** لا سعرَ في موضع، ولا حتى رتبة. والسؤال يقول «أيلزم تذكرة للكهوف؟» فيجيب «نعم» — **بلا مبلغ.** هو أكثر الأسئلة وروداً، والصفحة تتحاشاه صراحةً.
45. **كم أحتاج من الوقت؟** ساعة؟ نصف يوم؟ النصّ يقول إن الجبل «المحطة الأولى الطبيعية» ولا يقول متى أنصرف.
46. **ما مقدار الضيق؟** `Gänge …, die so eng sind, dass der Fels beinahe Ihre Schultern streift` — أأنحني؟ أهو لمن يخاف الأماكن الضيقة؟ لطفلٍ بيدي؟ بعصا مشي؟
47. **أمضاءٌ هو؟** `in die ein schmaler Lichtstrahl dringt` يوحي بضوء نهار. أأحتاج كشافاً؟ أالممرات ممهّدة؟
48. **كيف أصل بلا سيارة؟** السؤال يجيب `Das Auto ist die praktische Wahl` فحسب. أجرة؟ تطبيق؟ مسافةٌ بالكيلومترات أو الدقائق؟ موقفٌ هناك؟
49. **أالجبل نفسه من تراث اليونسكو؟** المقدمة تذكر التراث **للواحة**، ثم لا يعود الذكر. كنتُ أودّ أن أعرف أأقف على أرض تراثٍ عالمي.
50. **متى رُوجعت هذه المعلومات؟** `Veröffentlicht am 23. August 2026` هو التاريخ الوحيد. وإن كانت المواعيد تتغيّر «بحسب الموسم وفي الأعياد» فأريد أن أعرف كم عمر الإفادة.
51. **أأدخل الفخّارة ببساطة؟** `nehmen Sie eines der Erzeugnisse des Hauses mit` يوحي بمتجر — وهل هي مفتوحة، وهل ثمّة رسم، وهل أُزعج؟
52. **أأرى فعلاً 2.5 مليون نخلة؟** `Mehr als 2,5 Millionen Palmen breiten sich unter Ihnen aus` — أحسبه عدد الواحة كلها لا مدى النظر. وبهذه الصياغة يُقرأ وعداً للمَطلّ.

### جزء ب — كلُّ جوابٍ وحده

53. **السؤال 1** — أفضل الثلاثة. أفهمه بلا المقال. اعتراضان: `zu den besten Stationen in Al-Ahsa` — بلا المقال لا أعرف ما «Station» هنا، و«Al-Ahsa» بلا موقع (لا بلد ولا إقليم). **ولا يقول إنّ للكهوف تذكرة** — فمن قرأ هذا الجواب وحده ذهب غافلاً.
54. **السؤال 2** — أنقصها. `Der Berg ragt mitten aus der Oase auf` — **من أيّ واحة؟** الأداة المعرِّفة وحدها بلا مرجع، والجواب لا يذكر الأحساء أصلاً. و`östlich von Hofuf` يشرح مجهولاً بمجهولٍ ثانٍ. **لا بلد، ولا مسافة، ولا زمن طريق، ولا أقرب مطار.** والسؤال «كيف أصل؟» وجوابه في لبّه «بالسيارة» — وهذا كنتُ أحزره. وفيه `die Seite „Meine Reise“ macht aus dem Berg und seiner Umgebung eine fertige Route` — وفي نتيجة بحثٍ هي عندي اسمٌ بلا مكان: صفحةُ أيّ موقع؟ بلا رابطٍ ولا دليل. يبدو إعلاناً لخاصيّةٍ لا أستطيع بلوغها.
55. **السؤال 3** — يقول «نعم» ويذكر مكان الصرف، **بلا سعر**، وهو أوّل ما يُطلب في سؤال تذكرة. و`Die geprüften Angaben zu Öffnungszeiten und Eintritt stehen auf der Seite der Sehenswürdigkeit` وحدها طريقٌ مسدود: لا «صفحة معلم» أبلغها من هنا، ولا أعرف حتى اسمها. وكذلك `das letzte Wort haben die offiziellen Kanäle` — أيُّها؟ و`„Land of Civilisations“` اسمٌ إنجليزي بلا موضعٍ إلا «عند سفح الجبل»، وأيّ جبلٍ لا يقوله إلا السؤال. **وهذا الجواب أكثر الثلاثة اعتماداً على أن القارئ في الموقع سلفاً.**
