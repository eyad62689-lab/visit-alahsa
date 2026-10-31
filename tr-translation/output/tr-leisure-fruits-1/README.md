# دفعة `tr-leisure-fruits-1` — فهرس الأسواق والمنتزهات والمزارع وصفحة الثمار (`/tr/souqs-parks-farms/` و`/tr/fruits/`، 114 سلسلة)

صفحتان منشورتان باللغات الست تُبنيان بالتركية: **فهرس الأسواق والمنتزهات والمزارع** (النطاق leisure من AttractionsView: مفاتيح `list2.*` الثلاثة في `ui.tr`؛ بطاقاته الـ18 منشورة من دفعات المعالم)، و**صفحة الثمار** (كتلة TR في FruitsView: 22 سلسلة؛ الوصف؛ رؤوس جدول المواسم الثلاثة؛ `palms.short.tr` و`fruitTrees.short.tr` و`fruitsStatsSrc.tr` في oasis-facts — كانت نوائب إنجليزية «2.5M»/«400K»؛ و`FRUIT_GROUPS_TR` في fruits.ts: 4 مجموعات و15 ثمرة = 81 سلسلة على مرآة الكتلة الإنجليزية). **السياق في `pack.json` كُتب من كود المكوّنات**. التنفيذ بوكلاء Sonnet 5.5 بطلب إياد. **بناء تجريبي بنصوص إنجليزية** قبل الترجمة أثبت البنية (الإخفاقان C22 78% وC77 من النصّ المؤقت وحده).

| المرحلة | الملف | النتيجة |
|---|---|---|
| 1 المترجم | `stages/01-translator.json` | 114 (أُضيف `of.palms.short` أثناء العمل)؛ «rutab» مقتبسة مشروحة مرة، «olgun hurma» للتمر، الأصناف من الرسم العربي، «Kasım Bölgesi»، «Suudi Arabistan Demiryolları»-style institutions |
| 2 المحرر · 3 الموائم | `02-editor.json` · `03-localizer.json` | 23 («Ümm» على A4؛ كلشيهات وكالكات) · 2 (تفسير الكنار من المعجم؛ «Misket limonu (lomi)») |
| 4 المقارن وسياج الوقائع · 5 المدقق | `04-benchmarker.json` · `05-proofreader.json` | 4 («El-Kasım Bölgesi» عن tr.wikipedia وTDV؛ «ağaç kavunu» عن TDK؛ «Kur'an-ı Kerim»؛ غير مُثبت: sebestan، Lomi Sergisi، مركز النخيل والتمور، Suudi Posta-class names) · 0 (قائمة الأحد عشر PASS) |
| بناء مرحلي | `t4-build-s05.log` | أخضر؛ C22 على `/tr/fruits/` 1% |
| 6 القارئ الأعمى (على 05) | `06-blind-reader.on-05.md` | 86 (30 · 56) |
| 7 الحاكم، الدورة 1 | `07-judge.r1.json` | 90 (leisure 92 · fv 91 · fg 90)، 18 مفتاحاً، F1–F13: أطوار التمر، الأصناف، «El-Kasım Bölgesi»، ثلاثة أشكال لحالة الأشهر، «dondurulmaya»، «ocak ayından»، «Devamını gizleyin»، «çeşit» لا «tür» |
| تدقيق مستقل + قارئ طازج | `05d-proof-of-judge.md` · `06-blind-reader.on-r1.md` | 13 سليمة · 116 |
| الدورة 2 | `07-judge.r2.json` | 91، 17 مفتاحاً، F14–F29-r2: «Pirinç metalinden bir kasede»، «… çeşitleri» للاسم المتصادم في القوائم، «“Bin Züheyri”»، «Zamili»، «Hurma pekmezi (dibs)» مرة، «keskin kokusu»، «hurma gen bankası» |
| تدقيق + قارئ ثالث | `05d-proof-of-judge-r2.md` · `06-blind-reader.on-r2.md` | 14 سليمة · 101 |
| الدورة 3 | `07-judge.r3.json` | 92، 12 مفتاحاً، F30–F46-r3: «(ya da “Bin Züheyri”)»، «alt kısmı»، «El-Ahsa Hurma ve Hurma Ağacı Merkezi» (غير مُثبت)، «mübarek» على المصدر، «Bu ürüne “cemid” denir: …»، الجملة المؤسسية بلا «iş birliği içinde»، **«sidr meyvesi (kanar)»** بعد ثلاثة قرّاء على فعل «kanar» |
| تدقيق + قارئ رابع | `05d-proof-of-judge-r3.md` · `06-blind-reader.on-r3.md` | 9 سليمة · 74 |
| الدورة الختامية | `07-judge.r4.json` · `07-judge.r4-addendum.md` | 92؛ تعديل واحد تقني: الوصف 165 → 155 محرفاً (F47-r4: الأوصاف التركية ≤160 لأن C72 لا يحرس tr)؛ 74 حكماً (29 مرفوض · 23 منشور · 12 علّة مصدر · 7 إطار · 3 سؤال) |
| النهائي | `final.json` | = الدورة 4 بأحكام الدورات الأربع (47) |

- **الدرجة 92** (leisure 92 · fv 92 · fg 92).
- **أحكام F (47):** «rutab» مقتبسة ومشروحة مرة في المقدمة و«olgun hurma» للتمر و«sarı balah (bisr)»؛ الأصناف من الرسم العربي بالإملاء الصحفي (Şişi، Raziz، Barhi، Gar، Micnaz، Tayyar، Huneyzi، Ümm Rahim، **Zamili**، Hilali، Şubeybi، Şahl، Vuseyli، Hatimi، Kasbi، Bavakir، Tuffahi، Ümm Suleym، “Sini”)؛ الاسم المتصادم في قائمة أصناف يحمل «çeşitleri» لا تنصيصاً؛ «El-Kasım Bölgesi» بالأداة؛ **ثلاثة أشكال لحالة الأشهر** (مؤرَّخ بالسنة «Ekim 2020»؛ فترة متكررة «temmuz ortası – ağustos sonu»؛ تاريخ بيوم «15–25 Eylül») و«ocak ayından»؛ «Teyit bekleniyor» (A12) لا يُصيَّر؛ «ağaç kavunu» للأترنج؛ «sidr meyvesi (kanar)» في المقدمة والوصف وعنوان البطاقة «El-Ahsa kanarı (Nabk)» ثابت؛ H1 الفهرس بالجمع وتسمية التنقل بالمفرد؛ الأوصاف التركية ≤160 محرفاً.
- **المعجم:** 19 مدخلاً (مُثبت: El-Kasım Bölgesi، ağaç kavunu، Kur'an-ı Kerim، Halas/Barhi؛ الباقي `unattested`). الذاكرة +99 زوجاً.
- **أسئلة إياد (16):** الرمان بلا صف في الجدول (14/15)؛ رقما الإنتاج المتباعدان (100–120 ألف مقابل 200+ ألف)؛ ثلاثة أرباع الإنتاج من ثلاثة أصناف أحدها «نادر»؛ نهاية الرطب المتأخر (منتصف أغسطس) مقابل بطاقة الخلاص (أواخر أغسطس)؛ التين يُغرس بجوار الرمان المنقرض؛ سجلّا غينيس 2020/2021 وغرض الرقم القياسي غير مذكور؛ «Chamber» بلا «Ticaret»؛ «blessed» في بطاقة التين؛ «Bin Züheyri» قرأه أربعة قرّاء «ألف»؛ «أهازيج شراء الكنار» بلا من ينشدها؛ تفسير «sidr»؛ سطر العدّ «12»؛ الزرّ العاري في بطاقات الفهرس؛ «gezi noktası» في البطاقات المنشورة؛ بطاقتا الأترنج والبابايا رقيقتان؛ معرض اللومي بلا تاريخ.
- **علل المصدر (22):** «yellow melon» (ctx قال بطيخاً)؛ النحاس/النحاس الأصفر؛ الفئة الخامسة «Rutab & dates»؛ Suwari = أكبر الثمار مقابل اسم الصنف؛ «Verified from official sources» مقابل متن متحفّظ…
- **البنية:** `src/pages/tr/{souqs-parks-farms,fruits}/index.astro`؛ `tr` في alt الصفحتين بلغاتهما الست وsitemap؛ الترويسة والتذييل وAttractionsView وDetailView (رابط العودة للفهرس) وFruitsView إلى `/tr/`؛ `FRUIT_GROUPS_BY_LANG.tr` (الجدول وبطاقة المستشار)؛ فهرس الثمار في بطاقة المستشار.
- **المعاينة** (4346، 375px): لا تجاوز أفقي في الصفحتين؛ الفلتر يعمل («Kış» ← بطاقتان، «Gösterilen meyve sayısı: 2»)؛ رابط الخريطة `/tr/map/`؛ صفر أخطاء كونسول.
- **أفخاخ:** `oasis-facts.ts` يستورد `../lib/schema` بلا امتداد فلا يُستورد من node (يُقرأ بالتعابير)؛ وصفا ur/en في سطر واحد في FruitsView؛ `fv.pending` لا يُصيَّر؛ الاسم العلمي اللاتيني يُفشل SPELLING (راية `latin`)؛ كتل zh/de/ru ثوابت لا localize.
- العُدّة: `va-scratch/tr-r1/tools/{mkpack-lf,apply-lf,cut-blind-lf}.mjs` (+ `verify` بـ`latin`، `apply-ui-keys`، `mk-blind-prompt`، `finish-ui`)؛ `t4-structural.mjs`، `t4-finalize.mjs`، `t4-docs.mjs`، `t4-memory.mjs`.
