# المرحلة 1 (المترجم) — ملاحظات دفعة 2026-09-10 (الألمانية)

**المصادر:** `src/content/blog/24-hours-en.md` و`48-hours-en.md` (مصدر الترجمة)، و`24-hours-ar.md` و`48-hours-ar.md` (الفيصل)، و`src/content/attractions/jawatha-mosque.md` (بند `practical` الجديد)، و`baiah.md` (المتن العربي فيصلاً لصياغة بيت البيعة)، و`src/data/fruits.ts` (موسم الليمون الحساوي: `Summer: from mid-June`)، و`changes.diff` (حدود ما يُترجم من جديد).
**المرجع المعتمد للإعادة الحرفية:** `src/content/blog/24-hours-de.md` و`48-hours-de.md` — تحقّقتُ أنهما مطابقان بايتاً بايتاً لـ`de-translation/output/blog/*.final.md` (اعتماد 2026-09-10، 92 و90).
**لم يُمسّ أي ملف خارج مجلد الدفعة:** لا `termbase.json` ولا `tm.json` ولا `src/`.

## 1. خريطة التغيير — ما تُرجم جديداً وما أُعيد حرفياً

فرق `stage1` عن المنشور يقع **حصراً** على الأسطر التي غيّرها `changes.diff` في الإنجليزية (تحقّق آلي بـ`diff`):

### مقال 24 ساعة (14 سطراً مترجَماً جديداً من 46)
| السطر | ما تغيّر في المصدر | ما فعلتُه |
|---|---|---|
| `description` | ترتيب جديد (الجبل باكراً ← القصر والكوت ضحى ← القيصرية مساءً) | ترجمة جديدة على القالب المعتمد «Ein kompakter Tagesplan für Al-Ahsa – …» |
| FAQ 1 | الترتيب نفسه | الجملة الأولى جديدة؛ **الجملة الثانية حرفياً** من tm («Die Oase in ihrem eigenen Tempo … Zwei-Tage-Route») |
| FAQ 2 | «الجبل أول الصباح» + صيغة «يلين الضوء وتعتدل الحرارة» | جديدة؛ عبارة الضوء والحرارة حرفياً من زوج tm المعتمد لـ`bestTime` جبل القارة («wenn das Licht weicher wird und die Hitze nachlässt»)؛ والشطر الأخير («im Qaisariyah-Souk öffnen dann die Geschäfte, und der Souk erwacht zum Leben») حرفياً من المعتمد |
| المقدمة | ترتيب التعداد | إعادة ترتيب العناصر المعتمدة نفسها، و«sowie» بدل «und» الثانية لتفادي «und … und» |
| الفقرة 2 (إيقاع النهار) | لم تتغيّر | **حرفياً** |
| عنوانا القسمين 1 و2 | تبادلا | «Früher Morgen» و«Vormittag» على جدول أوقات النهار المعتمد في الدفعة السابقة (C1) — العناوين نفسها المستعملة في مقال 48 ساعة فتتطابق الصفحتان |
| فقرة جبل القارة | صارت أول الصباح؛ سقطت جملة «الظهيرة لا تمنع»؛ أُضيفت جملة الصباح الباكر | جديدة؛ عبارة التغميق أعيد بناؤها في جملة صلة («dessen Höhlen **im Sommer kühl und im Winter warm bleiben**») والتغميق في موضع المصدر؛ جملة «Der frühe Morgen ist seine beste Zeit: Dann ist das Licht weich und die Hitze mild» **حرفياً** من زوج tm مقال 48 ساعة (حكم الحاكم A2-16: حالٌ لا صيرورة)؛ جملة دوغة الغراش **حرفياً** (تغيير المصدر «Kingdom's ← Saudi Arabia's» كان الألماني قد سبق إليه بحكم A1-15: «in Saudi-Arabien») |
| فقرة قصر إبراهيم وبيت البيعة | «عُد إلى وسط الهفوف»، ضوء الضحى، صياغة بيت البيعة الجديدة | جديدة؛ گلوس «(dem Ibrahim-Palast)» انتقل مع أول ورود في المتن؛ «Die Palastfestung vereint Moschee, Kaserne und Turm hinter einer einzigen Mauer» حرفياً؛ جملة بيت البيعة — انظر §2 |
| سطر الغداء | «وأنت في قلب المدينة» | جديدة: «Zum Mittagessen sind Sie bereits mitten in der Stadt: …» («mitten in Hofuf/der Stadt» هي صيغة tm المعتمدة لـ«central») |
| عنوان المساء | لم يتغيّر | **حرفياً** |
| فقرة القيصرية | **صيغت من جديد قصداً** كي لا تكون نسخة من مقال 48 ساعة | ترجمة جديدة مستقلة عن زوج tm الخاص بجملة 48 ساعة **عمداً** (لو أُعيد الزوج لعادت النسخة المكرّرة التي أراد المالك إزالتها — فلا تُعاد في المراحل 4/5). «wenige Schritte von Qasr Ibrahim entfernt» للعربية «على خطوات»؛ «die Einheimischen von Hand besticken» لـ«أهل الأحساء» (مدخل المعجم `locals`) على وزن زوج tm `cat.crafts.d`؛ «vollen Tag» بحكم A1-21؛ «bevor Sie abreisen» لـ«قبل مغادرتك» (كانت ساقطة من الإنجليزية القديمة وعادت في الجديدة) |
| بند جواثا | «في قرية الكلابية» + جملة غير المسلمين | إضافة «im Dorf Al-Kilabiyah» (الصيغة المعتمدة في `area_de` ومدخل المعجم: بلا Durchkopplung) + الجملة الجديدة — انظر §3 |
| بند صفحة الأسواق | «تجمع الأسواق الشعبية والمنتزهات والمزارع… فاختر محطة قريبة من مسارك» | جديدة: «bündelt die traditionellen Souks, Parks und Farmen der Oase – wählen Sie daraus eine Station nahe Ihrer Route» |
| نصيحة «رحلتي» | «من صفحة كل معلم» | أُدمجت الصيغة المعتمدة في مقال 48 ساعة (حكم A2-27) «auf der Seite jeder Sehenswürdigkeit» في الجملة المعتمدة نفسها |
| نصيحة «لديك ليلة؟» | تعداد جديد: الأميرية، مزرعة الليمون في موسمها، ساحل العُقير | «dort kommen die Amiriah-Schule, in der Saison die Hasawi-Limettenfarm und die Küste von Al-Uqair hinzu» — الأسماء الثلاثة من المعجم |
| نصيحتا السيارة وأول مرة | لم تتغيّرا | **حرفياً** |

### مقال 48 ساعة (6 أسطر مترجَمة + سطر محذوف من 59)
| السطر | ما تغيّر | ما فعلتُه |
|---|---|---|
| `title`/`description`/FAQ 2 | لم تتغيّر | **حرفياً** |
| FAQ 1 | لم يعد يذكر «الأسواق الأسبوعية»؛ إحالة إلى صفحات المعالم ليوم ثالث | الجملة الأولى حرفياً؛ الثانية جديدة: «Wer mehr möchte, findet auf den Seiten der Sehenswürdigkeiten dieser Website Museen, Parks und traditionelle Souks, die einen dritten Tag füllen» |
| المقدمة | التغميق يشمل «in Hofuf» | نقل قوس التغميق فقط؛ لا كلمة تغيّرت |
| ملاحظة الإيقاع | «من الصباح إلى الغروب» بدل التعداد الثلاثي | «dem **Rhythmus des Tages**, vom Morgen bis zum Sonnenuntergang, und nicht festen Uhrzeiten» — يزيل تناقض «ثلاث فترات مقابل سبعة عناوين» (علة المصدر A2-6 في الحكم السابق) |
| الصباح (قصر إبراهيم) | لم يتغيّر | **حرفياً** |
| الضحى (بيت البيعة + الأميرية) | صياغة بيت البيعة الجديدة | جملة بيت البيعة **مطابقة حرفاً** لجملة مقال 24 ساعة (المصدر واحد فالألماني واحد)؛ جملة الأميرية حرفياً |
| المساء + اليوم الثاني/الصباح الباكر | لم يتغيّرا (تغيير «Kingdom's» كان مسبوقاً بـ«in Saudi-Arabien» A2-33) | **حرفياً** |
| الظهيرة (جواثا) | العربية «خصوصية ← حرمة» (الألماني «Heiligkeit» أصلاً فلا تغيير) + جملة غير المسلمين | الجملة المعتمدة حرفياً + جملة جديدة مستقلة (لا فاصلة منقوطة بعد أمر) — انظر §3 |
| العصر (المزارع) | «موسم الليمون الحساوي، صيفاً من منتصف يونيو» + «منتزهاً أو مزرعة قريبة من مسارك» | «Fällt Ihr Besuch in die Hasawi-Limettensaison – im Sommer, ab Mitte Juni –, gehört der Nachmittag …» (الرقم/الموسم من `fruits.ts`، لا من عندي)؛ «und wählen Sie einen Park oder eine Farm nahe Ihrer Route» (الأنيمة محفوظة بحكم A2-24) |
| الغروب | لم يتغيّر | **حرفياً** |
| نصيحة «المواعيد والرسوم» | **حُذفت من المصدر** | حُذفت؛ زوج tm الخاص بها يبقى صالحاً في الذاكرة (مستعمل في `plan.printNote` وغيره) |

## 2. جملة بيت البيعة — القرارات
المصدر الجديد (واحد في المقالين): «the Al-Mulla family house built by Al-Ahsa's judge, Sheikh Abdulrahman bin Omar Al-Mulla, in 1203 AH / 1789 CE, where the people of Al-Ahsa pledged allegiance to King Abdulaziz in 1913 and joined the Saudi state; today it is a museum» — والعربية مطابقة له.

الألمانية: «…, dem Haus der Familie Al-Mulla. Der Richter von Al-Ahsa, Scheich Abdulrahman bin Omar Al-Mulla, erbaute dieses Haus im Jahr 1203 nach der Hidschra (1789 n. Chr.); hier leisteten die Menschen von Al-Ahsa 1913 König Abdulaziz den Treueid und schlossen sich dem saudischen Staat an. Heute ist das Haus ein Museum.»

- **التقويم:** «1203 nach der Hidschra (1789 n. Chr.)» — أول ورود في الصفحة مكتوباً كاملاً (قاعدة `hidschra`) والسنة الميلادية في القوس بصيغة الدفعة `n. Chr.`؛ وهي **السابقة المعتمدة حرفاً** في `ameeriah.md` → `body_de`: «1356 nach der Hidschra (1937 n. Chr.)». لا ورود ثانٍ في الصفحة فلا حاجة لتقديم الاختصار «(n. H.)». **1789 لا 1788** في الموضعين (تحقّق آلي: لا «1788» في الملفين).
- **«1913»** مجرّدة بلا «n. Chr.» على سابقة `summary_de` الأميرية («eröffnet 1937»)؛ الاقتران بالهجري وحده يستدعي الصيغة المزدوجة.
- **«رمز لتأسيس الدولة» أُلغيت** كما قرّر المالك: سقطت «Symbol der Staatsgründung» وحلّ محلّها فعل الانضمام «schlossen sich dem saudischen Staat an» (الصفة «saudisch» بقرار المعجم لا «saudi-arabisch»).
- **«بايع» = «den Treueid leisten»** (بديلها المشهود «huldigen» أثقل وأقدم سجلاً؛ «die Treue schwören» جائزة). لا سابقة في الموقع؛ تُبتّ في المرحلتين 2 و4.
- **«أهل الأحساء» = «die Menschen von Al-Ahsa»** في هذا السياق التاريخي، لا مدخل المعجم «die Einheimischen» المقيَّد صراحةً بالسياق السياحي — بينما في فقرة القيصرية (سياق سياحي: «بأيدي أهل الأحساء») استُعمل المدخل «die Einheimischen». التفريق مقصود وموثَّق هنا لئلا يُوحَّد بحسن نية.
- **«erbaute dieses Haus»** بحكم الحاكم السابق A1-8، و«Heute ist das Haus ein Museum» جملة مستقلة بمرجع صريح (لا «es» بعد جملة فيها «Staat»).
- **الفاصلة المنقوطة** قبل «hier leisteten» تقابل بنية المصدر (جملة واحدة طويلة) دون جملة ألمانية بثلاث أسطر.

## 3. جملة غير المسلمين والبند الجديد في بطاقة جواثا
- الإنجليزية «visitors of other faiths are welcome, with modest dress» والعربية «متاحة لغير المسلمين مع المحافظة على اللباس المحتشم» — **الواقعة واحدة**، والفرق صياغي لا مضموني (المصدر الإنجليزي اختار صيغة الترحيب الجامعة).
- اعتمدتُ صيغة المصدر الإنجليزي: «Besucher anderer Religionen sind willkommen, bedeckende Kleidung vorausgesetzt» في المقالين، وبطاقة الزيارة على الوزن نفسه: `label_de` «Besucher anderer Religionen» / `value_de` «Willkommen – bedeckende Kleidung vorausgesetzt» / `source_de` **حرفياً** الصيغة المعتمدة في سبعة معالم: «Bestätigung durch das Redaktionsteam von Visit Al-Ahsa».
- «bedeckende Kleidung» هي العبارة الألمانية المستقرة للباس المحتشم في المواقع الدينية (أدق من «angemessen» المبهمة وأحدث من «züchtig/sittsam»).
- **للمرحلة 3 (DACH):** عرف الأدلة الألمانية «Auch Nichtmuslime dürfen die Moschee besuchen / für Nichtmuslime zugänglich» — وهو أقرب حرفياً إلى العربية. إن غُيّرت الصيغة فلتُغيَّر **في المواضع الثلاثة معاً** (المقالان + `label_de`) لأن البطاقة والمقال يحملان الواقعة نفسها.
- الشرطة في `value_de` هي U+2013 بمسافتين (قاعدة `gedankenstrich`)، والمسافات U+0020 (حكم `einheiten`: لا U+00A0 في ملفات المحتوى).

## 4. قرارات أخرى
- **الروابط:** لم يتغيّر هدف رابط واحد؛ مجموعة الأهداف في 24h مطابقة للمنشور (12) وترتيبها يطابق الإنجليزية الجديدة، و48h مطابق ترتيباً وهدفاً (14). القاعدة كما كانت: `/de/` حيث يوجد `title_de` (jabal-al-qarah، qasr-ibrahim، jawatha-mosque، ameeriah، al-uqair، ومقال 48 ساعة)، و`/en/` لما سواه (baiah، duqat-algharash، qaisariyah، lemon-farm، والصفحات الثابتة). المدرسة الأميرية ومزرعة الليمون في نصيحة «لديك ليلة؟» بلا رابط كما في المصدر.
- **البنية:** مفاتيح frontmatter كما هي؛ عدد الأسطر 46/58 = الإنجليزي؛ العناوين 5 و10 بمستوياتها؛ التغميق 4 و6 في مواضع المصدر؛ البنود 6 و3. صفر U+2014، صفر U+00A0، صفر أرقام عربية-هندية، صفر «du»، صفر «Souq/Highlight/Guide/Königreich»، صفر علامات اقتباس مستقيمة في المتن.
- **«folk souqs» (الأسواق الشعبية) = «traditionelle Souks»** — لا «Volksmärkte» (غير مستعملة) ولا «Wochenmärkte» (تضيف واقعة الأسبوعية التي حذفها المالك). موافقة لتسمية الفئة المعتمدة «Traditionelle Souks».
- **«the attractions pages» (48h FAQ 1):** العربية بالمفرد «صفحة المعالم» والإنجليزية بالجمع؛ ليس تعارض واقعة، فاتّبعتُ المصدر الإنجليزي: «auf den Seiten der Sehenswürdigkeiten dieser Website» — و«Sehenswürdigkeiten» لا «Sehenswertes» (المقصور على `nav.attractions`).
- **«first thing in the morning» = «als Erstes am Morgen»**، و«at night» = «am Abend» (قرار A2 في الدفعة السابقة: العربية «في المساء» فيصل، والسوق يفتح مساءً).
- **«Hasawi-Limettensaison»** مركّب بشرطة على وزن «Hasawi-Limettenfarm»؛ تكرار «Hasawi-Limette» ثلاث مرات في الجملة موجود في المصدر نفسه. **تنبيه للمرحلة 3:** مدخل `Hasawi cuisine` يوجب گلوس النسبة «Hasawi» في أول متن ألماني يذكرها؛ المقال المعتمد سابقاً بلا گلوس، ولم أضف واحداً لأنه خارج حدود التغيير — يُبتّ هناك.
- **«im Licht des Vormittags kommen Architektur und Innenhof zur Geltung»** لـ«the mid-morning light brings out …» — بلا تفضيل («am besten») لأن المصدر الجديد بلا تفضيل، بخلاف الجملة المعتمدة القديمة «im besten Licht» التي كان مصدرها «morning light is the best time».
- **«der Puls des Souks schlägt schneller»** لـ«the souq's pulse rises / يعلو نبض السوق»: استعارة ألمانية جارية («der Puls der Stadt schlägt schneller»)، وتُجنّب «pulsieren» الثالثة التي أنّبها الحاكم (A1-34).
- الحاكم السابق سجّل أربع علل مصدر أُصلحت الآن في المصدر وانعكست هنا: A1-9 (السنة الميلادية)، A1-23 (غير المسلمين)، A2-6 (ثلاث فترات مقابل سبعة عناوين)، A2-13 (تكرار فقرة القيصرية)، وA2-21 (فترة الموسم). وA2-17 (الجبل ظهراً في 24h وباكراً في 48h) زال بتغيير الترتيب.

## 5. أسماء أعلام غير موجودة في المعجم — مقترحان للمرحلة 4
لم أعدّل `termbase.json`؛ المقترحان بمصدرهما وجنسهما في `termbase-additions.stage1.json` في هذا المجلد:

1. **König Abdulaziz** (der) — «King Abdulaziz». المصدر: تهجئة النسخة الإنجليزية (`baiah.md` والمقالان) + `naming_policy.default` (النقحرة كما في الإنجليزية، ويُترجم اللقب وحده) + السابقة المعتمدة في `jawatha-mosque.md` → `body_de`: «Prinz Mohammed bin Salman» و«Scheich Muhammad bin Abi Bakr Al-Mulla» على النمط نفسه. الجنس من «der König». **يُبتّ في المرحلة 4:** de.wikipedia تعنون «Abd al-Aziz ibn Saud»، لكن استثناءات `naming_policy` مقصورة على أسماء الأماكن المعدودة، فالترجيح لنقحرة الموقع. لا «Ibn Saud» ولا تواريخ حكم (ليست في المصدر). ولا يمسّ هذا المدخل حظر «قصر الملك عبدالعزيز بالعقير» المثبت في مدخل «Al-Uqair».
2. **Scheich Abdulrahman bin Omar Al-Mulla** (der) — «Sheikh Abdulrahman bin Omar Al-Mulla». المصدر: المقالان الإنجليزيان (الصيغة القصيرة) و`baiah.md` → `body_en` (الصيغة الطويلة «… bin Omar bin Muhammad Al-Mulla»)؛ «Scheich» تهجئة Duden ومعتمدة في `body_de` جواثا؛ اسم الأسرة من مدخل «Al-Mulla (family)» القائم. المقالان يذكران الصيغة القصيرة كمصدرهما.

ليس اسم علم: «der saudische Staat» (الصفة «saudisch» بقرار المعجم)، و«Hasawi-Limettensaison» (مشتق من مدخل «die Hasawi-Limette»).

## 6. للمراحل التالية باختصار
- المرحلة 2: الجملة الطويلة لبيت البيعة (فاصلة منقوطة) وعبارة «den Treueid leisten» و«der Puls des Souks schlägt schneller» — أصلح مواضع النظر الأسلوبي.
- المرحلة 3: Nichtmuslime/Besucher anderer Religionen (§3)، وگلوس «Hasawi» (§4).
- المرحلة 4: المدخلان في §5؛ والتأكد أن فقرة القيصرية في 24h **لا تُعاد** إلى زوج tm الخاص بـ48h (§1).
- المرحلة 5: الصيغة «1203 nach der Hidschra (1789 n. Chr.)» تطابق سابقة `ameeriah.md`؛ «1913» مجرّدة.
