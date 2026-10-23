# دفعة `ur-static-1` — أربع صفحات ثابتة بالأوردية: اليونسكو، أبلغ عن خطأ، شكر البلاغ، الخريطة التضاريسية

BATCH = `C:\Users\truyr\node-store\va-wt\ur-rest\ur-translation\output\ur-static-1` · REPO = `C:\Users\truyr\node-store\va-wt\ur-rest`

34 سلسلة (`BATCH/pack.json`) لأربع صفحات منشورة بالعربية والإنجليزية والصينية والألمانية والروسية، تُبنى الآن بالأوردية. درجة الدفعة = أدنى صفحة.

## الصفحات
### 1) `/ur/unesco/` — «واحة الأحساء في قائمة التراث العالمي» (`unesco.*`، كتلة localize في `UnescoView.astro`)
الهيرو: eyebrow منشور (`ui.home.hero.eyebrow` «یونیسکو کا عالمی ورثہ · 2018»)، ثم H1 `unesco.title`، ثم `unesco.lead` (تحمل النائب `{comps.length}` = عدد المكوّنات ذات الصفحات، يكتبه القالب). ثم بطاقات المكوّنات: على كل بطاقة سطر `unesco.comp` + رقم المكوّن «1563-004» + الفئة، ثم اسم المعلم الأوردي المنشور ونبذته المنشورة (ليست في الدفعة). ثم صندوق `unesco.officialH` / `unesco.official` / رابط `unesco.officialLink` (يحمل «↗» ثابتاً) إلى صفحة الموقع في مركز التراث العالمي. و`unesco.seoTitle` عنوان التبويب، و`unesco.seoDesc` وصف meta يحمل النائبين `{comps.length}` و`{names.join(', ')}` (قائمة أسماء المكوّنات بالأوردية يكتبها القالب — **اكتب النائب حرفاً كما في المصدر الإنجليزي**، والفاصل الأوردي يضعه القالب).
- «World Heritage List» بصيغتها المنشورة: `ui.fact.unesco.l` «یونیسکو کے عالمی ورثے میں شمولیت» و`ui.det.unescoNo` «یونیسکو کے عالمی ورثے کا حصہ نمبر {n}»؛ والبند المفتوح UNESCO-LIST-PAIR («یونیسکو کی عالمی ورثے کی فہرست» مطعون فيه من خمسة قرّاء، والمالك يبقيه حتى مراجعة شاملة): **لا تكتب «کی … کی» المزدوجة**، واكتب «یونیسکو کے عالمی ورثے کی فہرست» وعلّل في `notes` أنها صيغة الواجهة المنشورة (N2) لا حسماً للبند.
- «twelve components» = 12 مكوّناً: اكتب العدد كما في المصدر («بارہ» كلمة حيث كتبها كلمة؛ الفاحص يقبل الكلمة ويطلب «1563» و«2018» رقماً).
- «component» اسم الجزء في الموقع المنشور «حصہ» (det.unescoNo) — الاتساق.

### 2) `/ur/report/` — «أبلغ عن خطأ» (`report.*`، كتلة localize في `ReportView.astro`)
نموذج Netlify: eyebrow `report.eyebrow`، H1 `report.title`، فقرة `report.lead` (وصف meta). حقل «الصفحة المعنية» (`report.pageL` تسمية، `report.pagePh` نائب)، حقل الرسالة (`report.msgL` سؤال، `report.msgPh` نائب)، حقل البريد (`report.emailL` تسمية تقول إنه اختياري، `report.emailPh` نائب «name@example.com» ثابت حرفاً)، زرّ `report.submit`، وملاحظة `report.note`. التذييل يسمّي الصفحة بـ`ui.foot.l.report` المنشورة «غلطی کی اطلاع دیں»، وصفحات المعالم بـ`ui.det.report` — H1 يطابق أو يعلَّل.
### 3) `/ur/report/thanks/` — شكر البلاغ (`thanks.*`، `ReportThanksView.astro`)
H1 `thanks.title`، فقرة `thanks.d`، زرّ `thanks.back` إلى الرئيسية /ur/ (اسمها المنشور `ui.crumb.home` «صفحہ اول»).
### 4) `/ur/terrain-map/` — الخريطة التضاريسية ثلاثية الأبعاد (`tmap.*`، مفاتيح ui.ts)
eyebrow منشور (`ui.map.eyebrow` «سیاحتی معلومات»)، H1 `tmap.title`، فقرة `tmap.lead` (وصف meta)، رابط `tmap.classic` إلى الخريطة التقليدية (`ui.map.title` «سیاحتی مقامات کا نقشہ» — سمّها باسمها)، ثم زرّ `tmap.open` يحمّل الخريطة (نص `tmap.loading` أثناء التحميل)، وداخل الخريطة زرّ تبديل `tmap.3d.on`/`tmap.3d.off` (قصير جداً)، وتلميحات الإيماءات `tmap.gest.win` (يحمل «Ctrl» حرفاً) و`tmap.gest.mac` (يحمل «⌘» حرفاً) و`tmap.gest.touch`. تحت الخريطة H2 `tmap.list.title` وقائمة المعالم بالفئات، وعلى كل معلم زرّ تسميته `tmap.locate` (يُلحق به «: اسم المعلم»).
- «3D» بالكلمات الأوردية (سابقة `ui.map.terrain` المنشورة — ابحث عنها في ui.ur واعتمد لفظها لـ«ثلاثية الأبعاد»).
- «terrain / elevation / tilt / rotate / drag / scroll»: كلمات أوردية شائعة لا دخيلاً إلا بمدخل معجمي (P16).

## الملفات
`BATCH/pack.json` (`en`، `ar`، `ctx` — **اقرأه لكل مفتاح**، `precedent`) و`BATCH/ref.json` (`ui`، `siblings`، `places`، `terms`، `tm`). القوالب: `REPO/src/components/views/{UnescoView,ReportView,ReportThanksView,TerrainMapView}.astro`. المعجم والذاكرة والأدوار في RUNBOOK-r5.md.

## النبرة
صفحات واجهة عملية: جمل قصيرة واضحة، تسميات بلا وقفة، **آپ**. اليونسكو وصفية موجزة.

## أفخاخ
1. **النوائب** `{comps.length}` و`{names.join(', ')}` حرفاً مرة واحدة كلٌّ حيث يحملها المصدر؛ لا نائب في غيرها.
2. **الثوابت** «↗»، «Ctrl»، «⌘»، «name@example.com»، «1563» تبقى حرفاً (الفاحص يطلبها).
3. **لا اختلاق**: لا عدد مكوّنات غير «12/بارہ»، لا مدة ولا وعد.
4. **الإملاء**: ی ک ہ، P22، «۔» «،» «؟» “…”، لا «؛»، لا وقفة في آخر العناوين والأزرار والتسميات والنوائب، لا U+00A0، أرقام 0-9.
5. **لا تُحرَّر ملفات المستودع.** مخرجك ملف JSON واحد في BATCH.

## أرقام الأحكام
المرحلة 4: N745–N749 حصراً؛ الحاكم من N750.
