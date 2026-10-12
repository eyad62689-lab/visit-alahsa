# قالب ملف مرشد سياحي مرخّص

انسخ الكتلة أدناه إلى `src/content/guides/<slug_en>.md` واملأها من إفادة المرشد ورخصته وحدهما.
القواعد الحاكمة في `CLAUDE.md` (قسم «دليل المرشدين السياحيين المرخّصين»)، والمخطط في
`src/content.config.ts`. القيم بين `<…>` أماكن تُستبدل، لا بيانات.

- لا يُكتب الملف قبل وصول **صورة الرخصة** ومطابقتها، و**موافقة المرشد المكتوبة** على النشر.
  الصورة والموافقة لا تُودَعان في المستودع.
- `license.expires` آخر يوم سريان كما في الرخصة؛ بعده يُحجب المرشد تلقائياً عند أول بناء.
- `whatsapp` أرقام دولية بلا `+` ولا مسافات، و`phone` بصيغة دولية تبدأ بـ`+`. لا تُكتب وسيلة
  تواصل في النبذة أو السطر التعريفي أو أي حقل آخر — الفاحص يُفشل البناء.
- `specialties` و`languages` من مفاتيح `src/data/guides.ts` وحدها. لا مستوى لغة ولا شهادة غير الرخصة.
- لا سعر ولا تقييم ولا عدد جولات في أي حقل.
- الأرقام لاتينية (0-9) في كل الحقول.

```yaml
---
name: <الاسم العربي كما في الرخصة>
name_en: <Name in Latin letters>
slug_ar: <الاسم-بشرطات>
slug_en: <name-with-hyphens>
gender: <male | female>
photo: /img/guides/<slug_en>          # اختياري — بلا امتداد
tagline: <سطر تعريفي واحد بإفادة المرشد>
tagline_en: <One-line tagline as stated by the guide>
specialties: [<heritage | unesco | farms | souqs | desert | families | food | mosques | nature>]
languages: [<ar | en | fr | …>]
areas:
  - { ar: <المدينة أو البلدة>, en: <Town> }
license:
  number: <رقم الرخصة>
  expires: <YYYY-MM-DD>
  verifiedAt: <YYYY-MM-DD>            # يوم طابق الفريق صورة الرخصة
contact:                              # واحدة على الأقل
  whatsapp: "<9665XXXXXXXX>"
  phone: "<+9665XXXXXXXX>"
  email: <name@example.com>
tours:                                # اختياري
  - title: <اسم الجولة>
    title_en: <Tour name>
    duration: <المدة>
    duration_en: <Duration>
    groupSize: <حجم المجموعة>
    groupSize_en: <Group size>
    attractions: [<slug_en لمعلم قائم>]
service:                              # اختياري — كل بند بلغتيه أو يُحذف
  tourLength: <مدة الجولة>
  tourLength_en: <Tour length>
  groupSize: <حجم المجموعة>
  groupSize_en: <Group size>
  meetingPoint: <نقطة الالتقاء المعتادة>
  meetingPoint_en: <Usual meeting point>
  contactHours: <أوقات التواصل>
  contactHours_en: <Contact hours>
gallery:                              # اختياري — صور يملك المرشد حق نشرها
  - { src: /img/guides/<slug_en>-1, alt: <وصف الصورة>, alt_en: <Image description> }
bio_en: |-
  <English bio, plain paragraphs separated by a blank line.>
consent: true                         # موافقة المرشد المكتوبة على النشر
draft: false
---
<النبذة العربية: فقرات نصّية عادية يفصلها سطر فارغ، بلا روابط ولا وسائل تواصل.>
```
