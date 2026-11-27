# notes.stage2 — article-qaisariyah-souq (de) — المحرّر

المدخل `qaisariyah-souq.stage1.md`، المخرج `qaisariyah-souq.stage2.md`. 35 تعديلاً في 26 سطراً، كلها صياغة؛ لا واقعة ولا رقم ولا تاريخ ولا رابط تغيّر، وعدد الكتل (45) والعناوين (13) والبنود (9) والتغميق (4) وسطور المصادر (18) كما هو. لم يُجرَ أي جلب من الشبكة.

## حسمان من القائد طُبّقا هنا
1. **اسم الوكالة**: المعجم يعلو مثال الموجز. «die Saudi Press Agency (SPA)» ثم «die SPA»، ونص روابط المصادر «Saudi Press Agency». بلا تغيير عن stage1 (موضع الشك 1 أُغلق).
2. **صحيفة الجزيرة**: «Die Zeitung Al-Jazirah» عند أول ذكر ثم «Al-Jazirah» و«Der Zeitung zufolge»؛ حُذفت «saudische» و«Tages-» (المصدران لا يقولانهما). نص رابط المصدر 8 «Zeitung Al-Jazirah» كما كان (موضع الشك 11 أُغلق).
   **ملف `termbase-additions.stage1.json` لم يُمسّ** (ممنوع عليّ تعديل ملفات المرحلة 1): مدخل «Al-Jazirah newspaper» فيه ما زال يحمل «die saudische Tageszeitung Al-Jazirah (Erstnennung)»، وعلى المرحلة 4 أن تكتبه في `termbase-additions.stage4.json` بالصيغة المحسومة «die Zeitung Al-Jazirah» مع إبقاء ملاحظة التفريق عن القناة القطرية.

## الفحص الآلي
السكربت `check-stage3.mjs` (نسخة `check-stage1.mjs`؛ الفروق موصوفة في `notes.stage3.md`) شُغّل على stage2 بنسخة مؤقتة خارج المستودع تشير إليه: **41/41، رمز الخروج 0**. نسخة `check-stage1.mjs` بتغيير اسم الملف وحده أعطت 39/40 والإخفاق الوحيد فحص «saudische Tageszeitung» الذي نقضه حسم القائد.
„ 34 = “ 34 · لا CR · `Sie` في مطلع جملة مرة واحدة وهي صيغة الخطاب («Sie treten»).

## أبرز التعديلات
- **عنوان كتاب وهمي (زويمر):** «in seinem 1900 erschienenen Buch „Kaisariyeh oder Basar von Hofhoof“ als gut … versorgt» كانت تُقرأ كأن المقتبَس عنوان الكتاب. قُدّم المفعول: «beschrieb S. M. Zwemer „Kaisariyeh oder Basar von Hofhoof“ in seinem 1900 erschienenen Buch als gut mit Waren versorgt und nannte darunter …». الرسم بين „…“ والرابط كما هما.
- **مرجع النقطتين في المقدمة:** «und nennen jede Quelle beim Namen: wann er erbaut wurde …» كانت تعلّق التعداد بأسماء المصادر. صارت «…, wie die Quellen sie überliefern, jede beim Namen genannt: wann er erbaut und wann er erneuert wurde, …» (على «each by name:»).
- **«die Enzyklopädie» لمرجعين (موضع الشك 13):** في فقرة المكتبة صارت «Saudipedia beschreibt sie als …»، فبقيت «die Enzyklopädie» لدائرة المعارف الإسلامية وحدها (القسم التالي). تسمية المرجع باسمه ليست واقعة جديدة: المصدر يقول «the encyclopedia» عن سعوديبيديا نفسها.
- **تفكيك الجمل الطويلة داخل الفقرة نفسها:** الكبنك (4 جمل بدل 2؛ موضع الشك 15)؛ فقرة المكتبة (جملتان، والـKonjunktiv I محفوظ: «habe … gehabt und … verkauft. Im Jahr 1368 n. H. (1948 n. Chr.) habe er … gegründet»)؛ افتتاح المقال («… in Al-Ahsa. Die Saudi Press Agency (SPA) hat …» بدل الوصل بـ«und»)؛ جواب السؤال 1 (فاصلة منقوطة).
- **Satzklammer:** خبر الجائزة («habe in der 13. Runde [den Preis …] gewonnen»)؛ سعوديبيديا («sei … neu erbaut und seine Gestaltung bewahrt worden» بدل «worden … worden»).
- **Nominalstil وحشو ⇒ أفعال:** «gibt die SPA Historiker mit der Aussage wieder» ⇒ «gibt die SPA wieder, was Historiker sagen: Der Souk habe … bestanden. Ihr Argument: …»؛ «der die Aufsicht über die Alhambra obliegt» ⇒ «der die Alhambra untersteht»؛ «der durch Tore und Mauern … abgeschlossen ist» ⇒ «Tore und Mauern schließen ihn vom Rest der Stadt ab»؛ «ihr Wiederaufbau begann ein Jahr später» ⇒ «ein Jahr später begann der Wiederaufbau».
- **تكرار وثقل:** «aus seinem Buch über seine Reise» ⇒ «aus dem Buch des Reisenden W. G. Palgrave über seine Reise»؛ «eine Beschreibung schrieb» ⇒ «stammt von … Palgrave, der über seine Reise von 1862 bis 1863 schrieb» (السؤال 1 والخلاصة)؛ «die die Oase … qualifizierten» ⇒ «mit denen sich die Oase für die Liste qualifizierte»؛ «über … mehr über ihn» ⇒ «finden Sie mehr zu ihm in unserem Artikel über …»؛ «Für alle, die für die Küche einkaufen, nennt die SPA» ⇒ «Wer für die Küche einkauft: Unter den Lebensmitteln des Souks nennt die SPA»؛ «Wo der Beschluss aufzählt» ⇒ «Wo dieser aufzählt»؛ «auf ihren Bügeln» ⇒ «auf Bügeln».
- **وضوح المرجع:** «zu seinem Kunsthandwerk» ⇒ «zum Kunsthandwerk des Souks»؛ «, als fünfte saudische Stätte, die auf diese Liste kam» (بدل معلّق) ⇒ «; die Oase kam als fünfte saudische Stätte auf diese Liste».
- **أزمنة بلجريف موحّدة على المضارع لمضمون الكتاب:** «sagt er … vorbehalten gewesen» و«schrieb er, lägen» ⇒ «schreibt er, seien kostbaren Waren vorbehalten … Ringsum lägen Gassen, die … gedeckt seien». الـKonjunktiv I يحمل النسبة، وحالة التعداد بعد النقطتين Dativ (Waffen, Stoffen, Stickereien, Schmuck).
- **ألفاظ:** «kommt mit einem … Vorbehalt» ⇒ «steht unter einem ausdrücklichen Vorbehalt»؛ «ist Teil der Information» ⇒ «gehört zur Auskunft» (موضع الشك 14)؛ «bestimmt» ⇒ «definiert» ومعها «Herkunft und Definition des Wortes» في المصدر 17؛ «wie sie dasteht» ⇒ «wie sie bei ihm steht»؛ «Er sagte, es sei ein lateinisches Wort, und schrieb» ⇒ «Er nannte ihn ein lateinisches Wort und schrieb»؛ «Ausgabe von Freitag» ⇒ «Ausgabe vom Freitag» (المتن والمصدر 8)؛ «zählte darunter … auf» ⇒ «nannte darunter».
- **`Sie` غائبة في مطلع الجملة (حكم de-blog-8):** صياغة أولى لي «Sie war ummauert» (عن الـAlcaicería) أمسكها سطر المعلومات في الفاحص فرُدّت إلى «Die Alcaicería war ummauert» مع «dies sei der Ort gewesen» كما في stage1.

## ما لم يُمسّ عمداً
- **فقرة مواد البناء** حرفاً بحرف كما في stage1: جملة واحدة، فقرة مستقلة، بلا أداة تعليل أو نتيجة.
- **تنبيه الجمعة** بفعله وبلا ساعات؛ «Kolonnade» و«„neuen Basar“» لتشيزمان؛ «In die Liste aufgenommen ist die Al-Ahsa-Oase als Ganzes, nicht der Souk allein»؛ جملتا غرناطة («Gemeinsam sind ihnen der Name und der Markttyp; eine Quelle, die eine direkte historische Verbindung … belegt, haben wir nicht gefunden»).
- **أزواج الذاكرة:** «Vor Ihrem Besuch» · «Karte der Sehenswürdigkeiten» · «Öffnungszeiten» · «Kommunalverwaltung von Al-Ahsa» · «(dem Ibrahim-Palast)».
- **Läden / Geschäfte (موضع الشك 12):** أُبقي التفريق. يقرأ طبيعياً: «Geschäfte» للمعدود في أخبار الوكالة والصحيفة، و«Läden» للدكان التقليدي عند الرحالة والكبنك. لا موضع يتجاور فيه اللفظان لشيء واحد.
- **«Kurz gefasst» (موضع الشك 4):** أُبقي على العنوان الإنجليزي «In Brief». القسم تلخيص وقائع لا حكم ختامي، و«Fazit» يوحي بالحكم. الاتساق مع «Fazit» في المقالين السابقين قرار للمرحلة 4 أو للمالك.
- **«die Qaisariyah» بلا جسر (موضع الشك 2):** لم يُضف جسر. أول ورود في المتن بعد العنوان الثالث يقرنها بـ«den er „Keysareeyah“ nennt»، والقسم التالي يبدأ بـ«Die Qaisariyah wurde … erneuert» تحت عنوان يسمّي «Qaisariyah-Souk». يُسأل القارئ الأعمى.
- **«laut The Encyclopaedia of Islam»** (3 مواضع): العنوان بلفظه بلا أداة ألمانية (قيد الموجز وسابقة مقال اللومي). انظر المرفوع 6.

## جرد التحفّظات (كلها محمولة؛ ما تغيّر لفظه فقط)
| المصدر | stage2 |
|---|---|
| the oldest description … we have found was written by … Palgrave about his journey | Die älteste Beschreibung …, die wir gefunden haben, stammt von dem Reisenden Palgrave, der über seine Reise von 1862 bis 1863 schrieb (السؤال 1، الخلاصة) · stammt aus dem Buch des Reisenden W. G. Palgrave über seine Reise … (المتن) |
| The qualification is part of the information | Der Vorbehalt gehört zur Auskunft |
| SPA also reports historians as saying … their argument is | Außerdem gibt die SPA wieder, was Historiker sagen: Der Souk habe … bestanden. Ihr Argument: Reisende hätten …, und Dokumente wiesen … hin |
| He says its shops were given over … Around it, he wrote | Dessen Läden, schreibt er, seien … vorbehalten … Ringsum lägen Gassen, die … gedeckt seien |
| we report his description as it stands and add nothing | so wieder, wie sie bei ihm steht, und fügen ihr nichts hinzu |
| Historians, as reported by SPA, mention a small detail | Historiker erwähnen, so berichtet die SPA, ein kleines Detail. |
| Saudipedia states … built anew … its design was preserved | Saudipedia hält fest, … sei … neu erbaut und seine Gestaltung bewahrt worden |
| SPA counts it among the landmarks that qualified the oasis | zu den Sehenswürdigkeiten, mit denen sich die Oase für die Liste qualifizierte |
| which the encyclopedia describes as | Saudipedia beschreibt sie als |
| He said it was a Latin word, and wrote that he could not tell | Er nannte ihn ein lateinisches Wort und schrieb, er könne nicht sagen |
| we found no source that answers, and we leave the question open | beantwortet keine Quelle, die wir gefunden haben; wir lassen die Frage offen |
| states that it was the place … and that it had more than 200 shops, according to what the chronicles relate | gibt an, dies sei der Ort gewesen …; nach dem, was die Chroniken überliefern, habe es dort mehr als 200 Läden gegeben |
البقية في جرد `notes.stage1.md` بلفظها: „nach dem, was einige Quellen überliefern“ (4 مواضع) · «Die Agentur gibt wieder, sie behauptet nicht» · «wir nennen die Jahreszahl mit ihrem Vorbehalt» · «so die Evaluierung von ICOMOS» / «laut der ICOMOS-Evaluierung» · «Cheesman nennt diese Kolonnade nicht „Qaisariyah“» · «berichtete …, … sei … ausgebrochen» / «Der Zeitung zufolge» · «als Ganzes, nicht der Souk allein» · «Für Palgrave ist das Wort also lateinisch, der Enzyklopädie zufolge griechischen Ursprungs» · «die offenbar wenig Berührung … gehabt hätten» · «eine Quelle, die eine direkte historische Verbindung … belegt, haben wir nicht gefunden» · «Sehen Sie dort nach, bevor Sie aufbrechen, vor allem freitags».

## مواضع الشك في `notes.stage1.md` — ما بُتّ وما رُفع
- **بُتّ:** 1 و11 (حسما القائد) · 13 («die Enzyklopädie») · 14 («gehört zur Auskunft») · 15 (جملة الكبنك) · 12 (Läden/Geschäfte يبقى) · 4 («Kurz gefasst» يبقى، والاتساق للمرحلة 4).
- **يُرفع للمرحلة 4 كما هو:** 3 (جنس «Kabank» و«Quffa») · 5 («Fès» أم «Fes») · 6 («Organisation Arabischer Städte»، «Preis für architektonisches Erbe»، «Runde») · 7 («Welterbekomitee»، «Integrität der Stätte») · 8 («Neue (Zweite) Ausgabe») · 9 («Lomi» أم «Loomi») · 16 (لا تحقق شبكي بعد).
- **يُرفع للقارئ الأعمى:** 2 («die Qaisariyah» بلا جسر) · 10 (16 نص رابط مطابق للإنجليزي يُقاس على dist).
- **جديد من هذه المرحلة للمرحلة 4:** «der die Alhambra untersteht» مقابل «oversees» / «المشرفة على» (تُطابَق بالعربية؛ البديل «die für die Alhambra zuständige Einrichtung») · «seien kostbaren Waren vorbehalten» بلا «gewesen» (الحال في زمن الوصف) · «Wer für die Küche einkauft:» بنية نقطتين صحفية، تُردّ إلى جملة تامة إن عثر عندها القارئ.
