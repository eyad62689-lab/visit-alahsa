# ملاحظات المرحلة 1 (المترجم) — article-qaisariyah-souq

المصدر: `src/content/blog/qaisariyah-souq-en.md` · المرجع عند الغموض: `src/content/blog/qaisariyah-souq-ar.md`
المخرج: `qaisariyah-souq.stage1.md` · مقترحات المعجم: `termbase-additions.stage1.json` (28 مدخلاً) · الفاحص: `check-stage1.mjs`

لم يُجرَ في هذه المرحلة أي جلب من الشبكة. كل علم أو مصطلح جديد **مشتق من الداخل** (من الإنجليزية، أو من ألمانية منشورة في المستودع، أو من المعجم القائم) حتى تثبته المرحلة 4 أو تستبدله.

## الفحوص الآلية التي أُجريت

`node check-stage1.mjs` ← **40/40 ناجحة، رمز الخروج 0**. `node check-stage1.mjs --break` ← **14/14 كسراً مُمسَكاً** (الكسر على النص في الذاكرة، لا على القرص).

| الفحص | النتيجة |
|---|---|
| الروابط الخارجية | 34 = 34، مطابقة للإنجليزي عنواناً وترتيباً |
| الروابط الداخلية | 13، كلها `/de/…/` بشرطة ختامية، ومطابقة لقائمة الموجز بالترتيب |
| عناوين `##` | 13 |
| سطور المصادر المرقّمة | 18، والسطر 17 بلا رابط |
| U+00A0 · U+2014 · U+2009 · U+202F | صفر |
| أرقام غير لاتينية | صفر (الحروف العربية الوحيدة: «كبنك» مرة واحدة، وعنوانا رابطَي سعوديبيديا) |
| `osmanisch` / `Osman` · «Al Jazeera» | صفر |
| `schwarz` · `Zitrone` · `Souq` · `Golfregion` · `Persisch` | صفر (مع استثناء سطرَي `key:` و`slug:` المنسوخين حرفياً بأمر الموجز) |
| علامات تنصيص مستقيمة في المتن · Denglisch · `du` | صفر |
| الترويسة | `key`/`slug`/`pubDate`/`heroImage` منسوخة · `lang: de` · `topic` · 4 أسئلة · 5 وسوم · لا `seoDescription` |
| البنية | 45 كتلة = 45، أنواعها مطابقة، 9 نقاط، 4 مقاطع غامقة، لا سطر مطابق للإنجليزي |
| قيود الموجز | جملة مواد البناء فقرة مستقلة بجملة واحدة وبلا رابط سببي · تنبيه الجمعة بفعل وبلا ساعات · «saudische Tageszeitung Al-Jazirah» عند أول ذكر · Kolonnade و„neuen Basar“ لتشيزمان · رسم الرحالة محفوظ |

معلومتان يطبعهما الفاحص بلا حكم: (1) 16 نص رابط مطابق للإنجليزي؛ (2) «Sie» في مطلع جملة مرة واحدة وهي صيغة الخطاب («Sie treten»).

## قرارات هذه المرحلة

1. **العنوان يتبع العربي.** «Herkunft des Namens» عن «أصل اسمه»، والإنجليزي يقول «Name» فقط.
2. **«die Qaisariyah» مؤنثة للاسم المختصر وللنوع معاً.** حيث يقول المصدر «the Qaisariyah» بلا «Souq» فهي «die Qaisariyah»، والصيغة الكاملة تبقى «der Qaisariyah-Souk» (مدخل المعجم). النوع: «die Qaisariyah»، جمعه «Qaisariyahs»، والكلمة ككلمة بين „…“. لم أُضف جسراً شارحاً عند أول ورود للاسم المختصر (العنوان الثالث) لأن المصدر لا يضعه.
3. **«Läden» للدكان و«Geschäfte» للمحل.** الإنجليزي يقول «shops» للاثنين، والعربي يفرّق؛ تبعت العربي: Geschäfte للمحلات المعدودة (422، «معظم محلاته»، 80 %)، وLäden للدكان التقليدي (الكبنك، الرحالة، الملا، غرناطة، العطارة). «shopkeeper» = «Händler» في كل موضع.
4. **وكالة الأنباء على المعجم لا على مثال الموجز.** «die Saudi Press Agency (SPA)» ثم «die SPA»، ونص رابط المصادر «Saudi Press Agency» (كما في المقالين الألمانيين المنشورين). الموجز يمثّل بـ«Saudische Presseagentur». انظر موضع الشك 1.
5. **التاريخ الهجري.** أول ورود في المتن وفي السؤال الأول مكتوب كاملاً «1238 nach der Hidschra (1822 n. Chr.)» على سابقة `ameeriah.md`، ثم المختصر «1368 n. H. (1948 n. Chr.)» و«1422 n. H. (2001 n. Chr.)» و«1238 n. H. (1822 n. Chr.)» في الخلاصة. المدد بـ«von 1862 bis 1863» و«zwischen 1917 und 1923» في النثر؛ الشرطة القصيرة في بيانات المصادر وحدها («S. 840–841»، «Iran–Kha»). «gegen 5:40 Uhr» · «80 %» بمسافة عادية.
6. **«Kabank» و«Quffa» بحرف كبير وبين „…“.** الجنس المقترح: der Kabank، die Quffa — مشتق غير موثّق. «(كبنك)» مرة واحدة كما في المصدر.
7. **ثلاث كلمات للرواق.** «Arkadengang» لبلجريف، «Kolonnade» لتشيزمان، «Arkaden» لتعريف دائرة المعارف — على تفريق الإنجليزي (arcade / colonnade) لا على العربي الذي يقول «رواق» للجميع، حتى لا يُسوّى بناء تشيزمان ببناء بلجريف لفظاً. «neuer Basar» بين „…“ كلمةً لتشيزمان، ولا يُسمّى رواقه «Qaisariyah».
8. **«Kurz gefasst» لعنوان «In Brief».** المقالان السابقان يضعان «Fazit» مقابل «The Bottom Line»؛ العنوان الإنجليزي هنا مختلف فتبعته. انظر موضع الشك 4.
9. **الشروح، مرة واحدة لكل مصطلح:** «Bischte (traditionelle Umhänge)» · «(„Hasawi“ heißt „aus Al-Ahsa“)» بعد أول مركّب Hasawi- · «Sadu-Gewebe (Webstoff)» · «Qasr Ibrahim (dem Ibrahim-Palast)» · «Ostprovinz (asch-Scharqiyya)» · «getrocknete Limetten (Lomi)». بلا شرح: Saudipedia، Bayt Al-Bay'ah، Abaya.
10. **اقتباس سعوديبيديا قُصّر ليخرج الشرح منه.** «„eine der ältesten kommerziellen Buchhandlungen“ in der Ostprovinz (asch-Scharqiyya)»: الاقتباس يقف قبل اسم المنطقة حتى لا يدخل شرح المعجم داخل علامتي التنصيص.
11. **ألفاظ التراث العالمي.** «In die Liste aufgenommen ist die Al-Ahsa-Oase als Ganzes, nicht der Souk allein» · «Bestandteile» · «Integrität der Stätte» · «Welterbekomitee» · «ICOMOS-Evaluierung». الفعل «aufnehmen / Aufnahme» دائماً، والمُدرَج الواحة لا السوق في كل موضع (الترويسة، السؤال 3، المتن، الخلاصة، المصادر 11 و12).
12. **دائرة المعارف الإسلامية.** العنوان الإنجليزي حرفياً في المتن بلا أداة («laut The Encyclopaedia of Islam») على سابقة مقال اللومي، ثم «die Enzyklopädie». المصدر 17: الوصف مترجم («Artikel», «Neue (Zweite) Ausgabe», «Bd. 4», «S. 840–841») والعنوان والناشر حرفيان.
13. **«in der 13. Runde» بلا ضمير ملكية.** «دورتها» تحتمل الجائزة والمنظمة؛ الألمانية لا تحسم.
14. **الأفعال الخمسة للبناء مفرَّقة:** built anew = neu erbaut · rebuilt = wiederaufgebaut · renewed = erneuert · rehabilitated = saniert · managed = betreibt. و«still selling» = «wird noch immer verkauft» (مبني للمجهول، يتكرر في الافتتاح والقسم والخاتمة).
15. **الأعلام:** Kairo · Fès · Granada · Manama · Doha · al-Maqrizi · Alcaicería · «das Römische und das Byzantinische Reich» · «Buchhandlung Al-Taawun Al-Thaqafi» · «Festival „Layali Al-Qaisariyah 2026“» بلا ترجمة.
16. **نصوص الروابط الداخلية** تتبع العناوين الألمانية المنشورة لصفحاتها: «die Handwerke Al-Ahsas» · «Ein Tag in Al-Ahsa» · «48 Stunden in Al-Ahsa» · «Was kauft man in Al-Ahsa?» · «Karte der Sehenswürdigkeiten» (ذاكرة الترجمة) · «Vor Ihrem Besuch» (ذاكرة الترجمة).
17. **مفتاحا ملف الإضافات.** الموجز يطلب `genus` والدفعة السابقة والمعجم يستعملان `artikel`؛ وضعت المفتاحين بالقيمة نفسها.

## جرد التحفّظات (كلها محمولة)

| في المصدر | في الألمانية | المواضع |
|---|---|---|
| "according to what some sources report" | „nach dem, was einige Quellen überliefern“ — بلفظ واحد حرفياً | السؤال 1 · المتن · الخلاصة · المصدر 3 |
| "the oldest description … we have found" | „die älteste Beschreibung …, die wir gefunden haben“ | السؤال 1 · المتن · الخلاصة |
| "the agency reports, it does not assert" | „Die Agentur gibt wieder, sie behauptet nicht“ | قسم البناء |
| "we give the year with its caveat" | „wir nennen die Jahreszahl mit ihrem Vorbehalt“ | قسم البناء |
| historians reported by SPA (existed in the 19th century) | „gibt die SPA Historiker mit der Aussage wieder“ + Konjunktiv I | قسم البناء |
| the governor quoted by SPA (more than 200 years) | „hat den Gouverneur … mit der Aussage zitiert“ + „reiche … zurück“ | الافتتاح · السؤال 1 · المصدر 1 |
| "according to the ICOMOS evaluation" | „so die Evaluierung von ICOMOS“ · „laut der ICOMOS-Evaluierung“ | قسم التجديد · السؤال 1 · الخلاصة |
| Cheesman does not call it Qaisariyah; we add nothing | „nennt diese Kolonnade nicht „Qaisariyah“ … und fügen ihr nichts hinzu“ | قسم التجديد |
| "Historians mention, SPA reports" (kabank) | „Historiker erwähnen, so berichtet die SPA“ | قسم الكبنك |
| Al-Jazirah's account of the fire | „berichtete …, … sei … ausgebrochen“ · „Der Zeitung zufolge“ | قسم الحريق |
| building materials, as the newspaper described them | „beschrieb Al-Jazirah … als einen Bau aus Lehm …“ — فقرة مستقلة بلا «weil/daher/deshalb/also/so dass» | قسم الحريق |
| Saudipedia states (rebuilt in its style) | „Saudipedia hält fest, … sei … neu erbaut worden“ | قسم الحريق |
| the oasis as a whole, not the souq alone | „als Ganzes, nicht der Souk allein“ · „aufgenommen ist die Oase, nicht der Souk allein“ | السؤال 3 · قسم التراث · الخلاصة |
| SPA lists the souq among the landmarks that qualified the oasis | „Die SPA zählt den Souk zu den Sehenswürdigkeiten, die die Oase für die Liste qualifizierten“ | قسم التراث |
| the Encyclopaedia vs Palgrave on the word's origin | „Für Palgrave ist das Wort also lateinisch, der Enzyklopädie zufolge griechischen Ursprungs“ | قسم الاسم |
| Palgrave: countries that apparently had little contact | „die offenbar wenig Berührung … gehabt hätten“ | قسم الاسم |
| why Hofuf's souq bears the name: no source, question left open | „haben wir keine Quelle gefunden, die antwortet, und wir lassen die Frage offen“ | قسم الاسم |
| "according to what the chronicles report" (200 shops, Granada) | „nach dem, was die Chroniken überliefern“ | قسم غرناطة |
| no source for a direct historical link | „eine Quelle, die eine direkte historische Verbindung … belegt, haben wir nicht gefunden“ | قسم غرناطة |
| opening hours change; check the page, Fridays above all | „Sehen Sie dort nach, bevor Sie aufbrechen, vor allem freitags: Dann gelten andere Zeiten …“ — فعل، بلا ساعات | قبل الزيارة |

## مواضع الشك (تُرفع للمراحل 2–4)

1. **تعارض الموجز والمعجم في اسم الوكالة.** الموجز يمثّل بـ«Saudische Presseagentur»؛ المعجم (مدخل موثّق) والألمانية المنشورة كلها «die Saudi Press Agency (SPA)». اتبعت المعجم. على المرحلة 4 أن تحسم؛ إن اختير اسم الموجز تغيّرت 3 مواضع في المتن والأسئلة و8 نصوص روابط في المصادر، ولزم تعديل مدخل المعجم.
2. **«die Qaisariyah» بلا جسر.** هل يدرك القارئ الأعمى أن «die Qaisariyah» (العنوان الثالث وما بعده) هي السوق نفسها، وأنها غير النوع العام في قسم الاسم؟ الاسم والنوع برسم واحد. يُسأل القارئ في المرحلة 3 صراحةً.
3. **جنس «Kabank» و«Quffa».** مقترَح بلا توثيق. إن لم يثبت للمرحلة 4 جنس، فالموضعان اللذان يحملان أداة («Was ist der „Kabank“ …»، «Suchen Sie den „Kabank“») يُعاد بناؤهما بلا أداة.
4. **«Kurz gefasst» أم «Fazit».** العنوان العربي «الخلاصة» في المقالات الثلاثة؛ الإنجليزي هنا «In Brief» وفي السابقَين «The Bottom Line». إن أُريد الاتساق بين مقالات المدونة الألمانية فـ«Fazit».
5. **«Fès» أم «Fes».** أربعة مواضع. تُحسم بترتيب المصادر (unesco.de ثم de.wikipedia ثم Duden).
6. **«Organisation Arabischer Städte» و«Preis für architektonisches Erbe».** ترجمتان وصفيتان بلا شاهد ألماني. موضعان (المتن والمصدر 10).
7. **«Welterbekomitee» و«Integrität der Stätte».** الصيغتان المتوقعتان عند اللجنة الألمانية لليونسكو، غير مفحوصتين هنا.
8. **«Neue (Zweite) Ausgabe» في المصدر 17.** مترجمة على طريقة العربي؛ قد تُفضَّل تسمية السلسلة الإنجليزية حرفياً («New (Second) Edition») لأنها جزء من بيان النشر.
9. **«Lomi» أم «Loomi».** ملاحظة مدخل المعجم تكتب «(Loomi)»، والمنشور ومدخل «die Lomi» يكتبان «Lomi». اتبعت المنشور؛ ملاحظة المعجم تحتاج تنظيفاً.
10. **16 نص رابط مطابق للإنجليزي** (Saudi Press Agency ×8 · Internet Archive ×3 · Saudipedia ×2 · Patronato de la Alhambra y Generalife ×1 · Qasr Ibrahim ×1 · Bayt Al-Bay'ah ×1). كلها أعلام. C22 يعدّ الكتل النصية ذات الكلمتين فأكثر؛ النسبة تُقاس على dist في المرحلة 6، والحد 20 %. إن اقتربت، فأول ما يُعدَّل «Internet Archive» (نص وظيفي على سابقة «Seite in der Maktaba Shamela»).
11. **«Tageszeitung» لصحيفة الجزيرة.** الصيغة مفروضة من الموجز عند أول ذكر، والمصدران (الإنجليزي والعربي) يقولان «الصحيفة السعودية» بلا «يومية». تُثبت المرحلة 4 أنها يومية أو تُرَدّ إلى «die saudische Zeitung Al-Jazirah».
12. **تفريق Läden / Geschäfte.** يتبع العربي لا الإنجليزي. إن رآه المراجع تكلّفاً يُوحَّد على لفظ واحد، مع الانتباه إلى أن `qaisariyah.md` المنشورة تقول «Geschäfte».
13. **«die Enzyklopädie» لمرجعين.** وردت لسعوديبيديا في قسم المبيعات (على «the encyclopaedia» في المصدر) ولدائرة المعارف في قسم الاسم الذي يليه. كل واحدة قريبة من مرجعها، لكن القارئ الأعمى يُسأل هل التبست.
14. **«Der Vorbehalt ist Teil der Information».** ترجمة «The caveat is part of the information»؛ البديل «gehört zur Auskunft». للمراجع الأسلوبي.
15. **جملة الكبنك.** طويلة بثلاثة أجزاء وبدل («einen Korb aus Palmwedeln») داخل جملة صلة؛ تتبع بناء المصدر. مرشحة للشطر في المرحلة 2 إن عثر عندها القارئ.
16. **لا تحقق شبكي.** لم تُفتح أي من الروابط الـ34؛ العناوين منسوخة من الإنجليزي حرفياً. فحص HTTP وأي تحقق من الصفحات على المراحل اللاحقة، دون تجاوز حجب أي موقع يرفض الجلب الآلي.
