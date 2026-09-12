# المرحلة 4 — سجلّ التغييرات وسياج الوقائع · `batch-de-4`

نُسخ `fields.stage3.json` ثم حُرّر المتغيّر وحده بـEdit: **حقلان من 65 تغيّرا، و63 بقيت بايتاً ببايت** (فحصٌ آليّ). 10 مفاتيح · 65 حقلاً · JSON صالح.

## أ. التغييران

### 1. `uqair-mosque.body_de` — خرقُ معجمٍ وخرقُ قاعدةِ الدور نفسه
- **قبل:** «An der Küste des **Arabischen Golfs** östlich von Al-Ahsa …»
- **بعد:** «An der **Golfküste** östlich von Al-Ahsa …»
- **العلّة:** مدخل المعجم `the Gulf / Arabian Gulf ⇒ die Golfregion · der Golf · die Golfküste` (مصدره `unesco.de`) ينصّ حرفياً: **لا يُكتب «Persischer Golf» ولا «Arabischer Golf» في نصوص الموقع** (تفادي النزاع التسموي، مطابقةً لقرار الخط الصيني). وملفُّ دور المرحلة 4 يكرّر المنع نصّاً. مرّ الخرقُ بالمراحل الثلاث الأولى بلا التقاط.
- **السند للصيغة البديلة (لا ابتكار):** الألمانيةُ المنشورة تحملها ثلاثَ مرات — `al-uqair.md` ⇒ `area_de: "Die Golfküste – östlich von Al-Ahsa"` و`body_de` («am Golf» · «das Blau des Golfs»)، و`48-hours-de.md` («an der Golfküste östlich von Al-Ahsa»). وهي كذلك `area_de` لهذه الصفحة نفسها.
- **تكرارُ `Golfküste` بين `area_de` و`body_de` ليس عيباً:** المصدرُ يكرّرها كذلك (`area_en` «the Gulf coast east of Al-Ahsa» مقابل `body_en` «On the Arabian Gulf coast east of Al-Ahsa»).

### 2. `abubakr-mosque.body_de` — حاملُ تاريخِ الإنجاز (حذفُ دعوى)
- **قبل:** «… wurde sie instand gesetzt; **die Arbeiten** waren 1441 nach der Hidschra (2020 n. Chr.) abgeschlossen.»
- **بعد:** «… wurde sie instand gesetzt; **diese Phase** wurde 1441 nach der Hidschra (2020 n. Chr.) abgeschlossen.»
- **الدعوى المحذوفة:** «أعمالُ ترميم *هذا المسجد* أُنجزت عام 1441هـ». المصدر لا يقولها.
- **العلّة (ثلاثة أسانيد):**
 1. **الفيصل العربيّ:** «ضمن المرحلة الأولى من مشروع … **المنجزة** عام 1441هـ/2020م» — «المنجزة» مؤنّثة، ووصفُ «المساجد التاريخية المنجزة» لا معنى له، فالموصوفُ **المرحلة الأولى**.
 2. **قرينةٌ داخل الإنجليزية:** حين تريد الإنجليزيةُ تأريخَ التأهيل نفسِه تقولها صراحةً — `hubaish`: «**Rehabilitated in 2020** within the first phase». وصيغةُ `abubakr` مختلفةٌ عمداً: «in the first phase …, **completed in** 1441 AH / 2020 CE».
 3. **النظيرُ المعتمد الأحدث:** `abubakr.body_ru` (‏2026-09-06، 90/100) يقرؤها مرحلةً: «этот **этап** завершился в 1441 году хиджры».
- **وإفصاحٌ واجب:** `abubakr.body_zh` المعتمد يقرؤها بالوجه الآخر («该寺的**修复工程**…完成»). فالوجهان مقروءان في نصٍّ ملتبس، وقد اخترتُ الوجهَ الذي **لا يزيد** دعوى على المصدر. للحاكم أن ينقض.
- **مرجعُ الضمير في الناتج:** `sie` = المسجد (موضوعُ الصفحة)، و`diese Phase` مرجعُها ظاهرٌ في الشطر الأول من الجملة نفسها.

## ب. الوقائع التي فحصها السياج ولم يجد فيها ما يُحذف

- **كلُّ رقمٍ في العشر تتبَّعتُه آلياً إلى ملف مصدره**: `125 · 318 · 90 · 350 · 1.600 · 214 · 30 · 94 · 50 · 13 · 19 · 11 · 12 · 40 · 1000` وكلُّ سنةٍ هجريةٍ وميلادية — **ولا رقمَ من خارج مصدره، ولا رقمَ مُقرَّب أو محوَّل**.
- **لا صفةَ مطلقة مستحدثة**: كلُّ تفضيلٍ («eine der ältesten» · «das markanteste» · «des ältesten Seehafens») يقابل تفضيلَ حقلِه في المصدر، مفرداً حيث أفرد المصدر وجزئياً حيث جزّأ.
- **لا موعد ولا رسم ولا مسافة ولا دعوةَ زيارة** زائدة؛ بندُ البطاقة الوحيد نصُّ مصدره.
- **الحقبُ والتقويم**: «13. Jahrhundert nach der Hidschra» بقي قرناً بلا تحويلٍ ولا تقريب · «vierzig Moscheen» بقيت أربعين · POL-DE-16 مفحوصٌ حقلاً حقلاً آلياً (لا `n. H.` إلا بعد `nach der Hidschra` كاملةً في الحقل نفسه) — **عشرةُ حقولٍ كلُّها OK**.
- **دعوى الحماية النظامية — فُحصت في تسعة مواضع**: `abubakr` · `hubaish` · `umzurainiq` (تأهيل) · `dibs` · `bubakr-ribat` · `jabri` · `jalaniyah` · `uqair` (ترميم) · و«الإدراج» في `jalaniyah` و`tahimiyah-e`. **الألمانيةُ داخل ما يقوله المصدر في كلٍّ**: `instand gesetzt`/`restauriert` للترميم، و`in die Liste der amtlich registrierten historischen Moscheen … aufgenommen` للإدراج — **سجلٌّ لا حماية**. ولا وجودَ لـ`denkmalgeschützt` ولا `Baudenkmal` ولا `unter Denkmalschutz` ولا `Stätte des Kulturerbes` (مسحٌ بحدود الكلمات).
- **ثلاثةُ برامجَ رسمية بثلاث تسميات** (`Entwicklung` · `Pflege` · `Wiederherstellung`) كما يفرّقها المصدر — لم تُوحَّد.
- **الأسماءُ الخارجية**: `Saudi-Arabien` · `Ostprovinz (asch-Scharqiyya)` · `Nadschd` كلُّها الصيغُ المعجمية؛ ولا `Riyadh`/`Jeddah`/`Mecca` في الدفعة.

## ج. ما نُظر فيه وأُبقي على حاله (نقضٌ مرفوض بعلّة)

1. **`hubaish`: البدلُ المجرور بعد صلة الموصول** (`… des Scheichs Abdulaziz Al-Alji, dessen Lehrstunden hier stattfanden – eines der führenden Gelehrten des Fiqh …`). ثقيلٌ، لكنّ كلَّ ترتيبٍ أخفّ يعيد العلّةَ التي قاستها المرحلة 2: `dessen` مذكّر/محايد، وأقربُ مذكّرٍ قبله `des Fiqh` — فيلتقطه. والبديلُ بفاصلةٍ منقوطة (`; seine Lehrstunden fanden hier statt`) يعيد الالتباسَ نفسه بضميرٍ ملكيّ. **تصحيحٌ يستبدل غموضاً بغموض مرفوض** (‏POL-DE-9).
2. **`das Gebäude des Emirats`** — أُقرّ. المصدران (`the emirate building` · «مبنى الإمارة») يقولان المالكَ لا الوظيفة، وغموضُه في الألمانية هو غموضُه في الإنجليزية؛ و`Verwaltungsgebäude` كانت الموضعَ الوحيد في الدفعة الذي تزيد فيه الألمانيةُ على المصدر. **ردُّ المرحلة 2 صحيح.**
3. **`der alte Zuhairi-Fluss`** — أُبقي: «نهر» في العربية الفيصل مقابل `stream` الإنجليزية، اختلافُ واقعةٍ لا رجستر.
4. **`Jabal al-Qarah (des Qarah-Bergs)`** — أُبقي: صدارةُ النقحرة تطابق عنوانَ الصفحة المنشورة للجبل (`title_de: Jabal al-Qarah`) ومتنَها المعتمد، والمجرورُ متطابقُ الحالة.
