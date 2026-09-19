# دفعة `de-stay` — صفحة الإقامة `/de/stay/` وصفحة فندق الكوت `/de/stay/alkoot-heritage-hotel/` (ج5، دفعة واحدة)

REPO = `astro-site` (جذر المستودع)
BATCH = مجلد الدفعة المؤقت (أرشيفه هنا: `de-translation/output/de-stay/`)

## النطاق — 33 سلسلة مقيسة (`BATCH/pack.json → strings`)
لكل مفتاح: `en` (المصدر) · `ar` (الفيصل عند اختلاف واقعة) · `context` (أين يُصيَّر — **اقرأه لكل مفتاح**).

| المجموعة | المفاتيح |
|---|---|
| إطار الفهرس (13) | `ix.heroEyebrow` · `ix.title` · `ix.heroSum` · `ix.listEyebrow` · `ix.listH` · `ix.kind.heritage-inn` · `ix.kind.hotel` · `ix.newWindow` · `ix.moreLabel` · `ix.ratingLabel` · `ix.closedPerm` · `ix.closedTemp` · `ix.srcNote` |
| الأسئلة الشائعة وصندوق المنهج (10) | `ix.faqH` · `ix.faq0.q/a` · `ix.faq1.q/a/linkText` · `ix.faq2.q/a` · `ix.methodH` · `ix.methodP1` |
| إطار صفحة المكان (3) | `dv.backLabel` · `dv.areaH` · `dv.noteP` |
| البطاقتان (6) | `koot.area/blurb/alt` · `cont.area/blurb/alt` |
| متن فندق الكوت (1) | `koot.body` |

**ما لا يُترجم هنا**: زرّ «In Google Maps öffnen ↗» (`det.openMaps` منشور)، والفتات «Startseite»، وتسمية الترويسة `nav.stayShort` «Übernachten» والتذييل `nav.stay` «Unterkünfte» (منشورتان — في context). **عنوان الصفحة في المتصفح** يُركَّب آلياً: `ix.title` + « – » + «Al-Ahsa»، و**الوصف** = `ix.heroSum` نفسه. وعلى صفحة المكان: تسمية النوع = `ix.kind.*`، وعنوان صندوق «حول هذه الصفحة» = `ix.methodH`، والفتات الوسطى = `ix.title`، والنص البديل والنبذة والموقع = حقول البطاقة نفسها — **فكلّ سلسلة هنا تُقرأ في موضعين**.

الملفات: `BATCH/pack.json` · `BATCH/context.json` (‏`_meta` + 104 مداخل ذات صلة + 84 زوج ذاكرة + الجيران المنشورون + عناوين المعالم المنشورة (Qasr Ibrahim · Qaisariyah-Souk · Al-Uqair-Strand · Al-Uqair) + **مقتطفات ألمانية منشورة** تشهد للصيغ المستقرة: «Al-Koot-Viertel»، «Kommission für Tourismus und Nationalerbe»، «n. H. (… n. Chr.)»). المعجم الكامل `REPO/de-translation/glossary/termbase.json`.

## أفخاخ مقيسة بقراءة المصدرين — اقرأها كلها
1. **تسمية الصفحة ثلاث مرات**: الترويسة «Übernachten» والتذييل «Unterkünfte» منشورتان. `ix.title` هو H1 والفتات وعنوان التبويب، و`dv.backLabel` يسمّي الفهرس نفسه («All places to stay»). **اختر لـ`ix.title` ما يتّسق مع التذييل** (القارئ الأعمى الألماني أمسك سابقاً «الصفحة تناقض نفسها» حين افترقت الترويسة عن التذييل) — وسابقة `Übernachten`/`Unterkünfte` (مدخل 38 في المعجم) انقسامٌ مقصود للشريط وحده. و`dv.backLabel` يسمّي الفهرس **بالاسم نفسه** («Alle Unterkünfte» إن كان H1 «Unterkünfte»).
2. **«heritage inn / نُزل تراثي»** يرد في خمسة مواضع (`ix.kind.heritage-inn` · `ix.heroSum` · `ix.faq0.q` · `koot.blurb` · `koot.body`، والعربية «نُزل» في `faq0.a` أيضاً) — **مصطلح واحد في المواضع كلها**. حكم الفعاليات الملزم: البادئة «Kulturerbe-» **خاصة بـ«heritage»** (Kulturerbe-Dorf · Kulturerbe-Moschee · Kulturerbe-Souks في المعجم)؛ و«inn» ليست «Hotel» (المصدر يميّز النوعين في `ix.kind`). سجّل الاختيار في المعجم مع شاهده.
3. **اسما الفندقين يبقيان كما يسمّي الفندق نفسه**: «Al-Koot Heritage Hotel» و«Continent Hotel Al Uqayr» حرفياً (العلم لا يُترجم؛ «Al Uqayr» بلا شرطة **في الاسم وحده** لأنها تهجئة الفندق). وخارج الاسم: «Al-Uqair» (المعجم). **ولا تُكتب «Heritage» الإنجليزية خارج اسم الفندق** (الحارس يُفشلها).
4. **«Al Ahsa» بلا شرطة في الإنجليزية** (`heroSum` · `faqH`) تفاوتٌ في المصدر؛ **الألمانية «Al-Ahsa» دائماً** (المعجم) — وتصريفه «Al-Ahsas» عند الإضافة، و`die Al-Ahsa-Oase`.
5. **`koot.body`** — المتن نصّ خام لا ماركداون. **فقرتان** يفصلهما سطر فارغ واحد (`\n\n`) عند الموضع العربي نفسه (قبل «Die Zimmer…/The rooms are eight suites»). وقائعه كلها في `faq0.a` أيضاً بأسمائها — **اتّسق حرفاً بين الموضعين**:
   - الهجري: اصطلاح المعجم `hidschra`: أول ذكر في الصفحة «1439 nach der Hidschra (n. H.; 2018 n. Chr.)» أو «im Jahr 1439 n. H. (2018 n. Chr.)» بصيغة المعجم — انظر المقتطفات المنشورة (baiah · bubakr-ribat).
   - الهيئة: `die Kommission für Tourismus und Nationalerbe` (المعجم، ومنشورة في `abdulrazaq-museum`). الإنجليزية «Saudi Commission…» والعربية «الهيئة العامة للسياحة والتراث الوطني» بلا «السعودية» — العربية الفيصل؛ والحارس يشترط الصيغة المعتمدة.
   - «the governorate / المحافظة» ⇐ المعجم `das Gouvernorat`.
   - الأمير سلطان بن سلمان والأمير سعود بن نايف: «Prinz Sultan bin Salman» و«Prinz Saud bin Nayef» (نقحرة الإنجليزية). المرمِّم «Abdulaziz bin Mohammed Al-Abdulqader» كما في الإنجليزية.
   - «963-square-metre» ⇐ «963 Quadratmeter(n)» (مسافة عادية)؛ «close to two hundred years old» ⇐ بالكلمة كالمصدر؛ «about half a kilometre» ⇐ بالكلمة.
   - «Hasawi architectural style» ⇐ المعجم لصفة «Hasawi» (`Hasawi-` مركّبةً كما في `Hasawi-Küche`)؛ «sadu weaving / نسيج سدو» بلا صيغة ألمانية في المعجم: اسم حرفة عربي ⇐ **گلوس مرة واحدة في الصفحة** (`gloss_regel`) — أول ورود في المتن (`koot.body`)؛ وفي `koot.alt` (نصّ بديل قصير) بلا گلوس. **لا تختلق وصفاً للسدو لا يحمله المصدر** («بدوي»، «صوف»…) — إن احتاج الگلوس واقعةً فابحث لها عن شاهد مسنَد، وإلا گلوس بالمعنى الحرفي وحده (Webarbeit/Webstoff).
   - «Qaisariyah Souq» ⇐ المنشور «Qaisariyah-Souk»؛ «Al-Fawaris Souq / سوق الفوارس» بلا مدخل ⇐ بالنمط نفسه «Al-Fawaris-Souk» (`Souk` لا Souq — `C18`)، ويُسجَّل مدخلاً `pending` أو بشاهد.
   - «Qasr Ibrahim» منشور هكذا (والگلوس «der Ibrahim-Palast» في المعجم — لا يلزم هنا، فالمتن لا يحتاجه).
   - «a stay inside the historic city rather than on its edge» — الخاتمة بالشرطة؛ الألمانية U+2013.
6. **`ix.faq1.a`**: «Caravan owners… a dedicated site on the beach itself, bookable online through Al-Ahsa Municipality» ⇐ المعجم: `der Caravanstellplatz` و`die Kommunalverwaltung von Al-Ahsa`. **ولا تُسمَّ الوسيلة («Wohnmobil») خلاف المعجم.** و`ix.faq1.linkText` يقصد `/de/attractions/uqair-beach/` بعنوانها المنشور «Al-Uqair-Strand» وينتهي بـ`→`.
7. **`ix.moreLabel`** بلا سهم (القالب يضيف →). **`ix.srcNote`** يحمل `{date}` مرة واحدة حرفياً (يُستبدل بـ«September 2026»). **`ix.closedPerm/Temp`** متوازيتان، بـU+2013 بمسافتين.
8. **`ix.heroSum`** هو الوصف في نتائج البحث أيضاً: كامل الوقائع أولاً (نُزل في المدينة القديمة · فندق على ساحل العقير · صورة وموقع في Google Maps · وصفية لا ترشيحية · تنمو)، والطول ثانياً.
9. **لا ادعاء جودة ولا أسعار ولا نجوم** إلا حيث يقولها المصدر نفياً («no prices, star ratings or recommendations») — «Sterne-Klassifizierung/Sternebewertung» هناك وحده. و`ix.faq2.a` («trusted booking platforms») ⇐ «vertrauenswürdige(n) Buchungsplattformen» بلا تسمية منصة.
10. **النصان البديلان** (`koot.alt` · `cont.alt`) وصفٌ للصورة بلا حكم: «crenellated parapets» ⇐ مصطلح معماري ألماني صحيح (Zinnen/zinnenbekrönte Brüstung — تحقّق)؛ «narrow slot openings» (`cont.blurb`) ⇐ «schmale Schlitzöffnungen/Schießscharten-artig»؟ **لا «Schießscharten»** — المصدر لا يقول إنها للرمي، فهي واقعة زائدة.
11. **`ix.listEyebrow`** «The first batch / الدفعة الأولى» = المجموعة الأولى من الأماكن المدرجة (القائمة تنمو) — لا «Charge» إنتاجية.

## القيود الملزمة (الخطة §2.1 و§2.4)
- الإنجليزية مصدر والعربية فيصل · **لا اختلاق** · **سياج الوقائع أعلى من السلاسة** · الحذف الخاطئ كالإضافة.
- **Sie** بلا خلط · Duden **بـß** · **Durchkopplung** · جنس نحوي لكل مدخل معجم جديد **بشاهد حرفي ومصدر URL** (لا جنس مخمَّن؛ ما لا شاهد له يبقى `status: "pending"` بلا artikel).
- **U+2013** (لا U+2014 — `C17`) · „…“ للاقتباس · **لا U+00A0** · أرقام لاتينية · `Souk` لا Souq (`C18`) · **سياج الأرقام آلي** (كل رقم في الألمانية وارد في مصدر مفتاحه).
- ممنوع Denglisch: `Event(s)` · `Spot` · `Location` · `Must-see` · `Hotspot` · `Guide`.
- النصوص نصٌّ خام (لا ماركداون). **لا تُحرَّر ملفات المستودع.**

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/de-0N.json` (‏01–05): `batch: "de-stay"`، `stage`، `strings` (**المفاتيح الـ33 كلها وبترتيب `pack.json`**)، `termbase_additions` (كل مدخل: `en`، `de`، `artikel`، `source`، `status`)، `notes` (مصفوفة، تراكمية)، `stage_specific` (المرحلة 4: `changed`/`fence_removed` و**شاهد حرفي بـURL لكل جنس نحوي**؛ المرحلة 5: `checklist` بالبنود العشرة).

**تحقّق آلياً قبل الانتهاء**: `node "<local>" "<BATCH>" de-0N.json` — يجب أن يخرج بـ`✓`. **ثم اقرأ ملفك من القرص وتأكد أنه موجود وصالح.**
