# batch-de-7 — الدفعة السابعة الألمانية · المرحلة 3 من جدول إكمال الترجمة

**المستودع:** `/home/user/visit-alahsa` · الفرع `claude/alahsa-site-audit-plan-u7kp5v`
**مجلَّد الدفعة:** `/tmp/claude-0/-home-user-visit-alahsa/a79938ce-ccf2-4011-a51d-c5d4ee092709/scratchpad/batch-de-7`

## الصفحات الخمس والحقول الثلاثة والأربعون

المصدر `src/content/attractions/<slug>.md` — **اقرأ الإنجليزية والعربية معاً**: الإنجليزية مصدر الترجمة، والعربية الفيصل عند أي اختلاف واقعة (‏`PLAN.md` §1.2).

| الصفحة | الحقول التي تُكتب | ملاحظة |
|---|---|---|
| `delfoon-lake` | 14 | `title_de` `kicker_de` `summary_de` `body_de` `area_de` + `practical[0]`: `label_de` `value_de` `source_de` + `faq[0..2]`: `q_de` `a_de` |
| `hubail-lake` | 14 | نفس الشكل تماماً |
| `kanzan` | 5 | `title_de` `kicker_de` `summary_de` `body_de` `area_de` فقط |
| `kanzan-park` | 5 | نفس الخمسة |
| `thulaim` | 5 | نفس الخمسة |

**‏43 حقلاً بالضبط.** والمجموع اللازم 49، وستةٌ منها **منشورةٌ سلفاً**: بندا «Öffnungszeiten und Eintritt» في `kanzan` و`thulaim` (‏`label_de` و`value_de` و`source_de` لكلٍّ).
**لا تُعاد كتابتها ولا تُمَسّ ولا تُخرَج في مخرجك.** ‏`kanzan-park` بلا `practical` أصلاً و`kanzan`/`thulaim` بلا `faq`.

## المعجم — ثمانيةُ مداخلَ أُضيفت قبل البدء خصيصاً لهذه الدفعة

‏`de-translation/glossary/termbase.json` صار **263 مدخلاً** (كان 255). المداخل الثمانية الجديدة **ملزمة** ومعها جنسُها ومصدرُها:

| الاسم | الألمانية | الجنس |
|---|---|---|
| Delfoon Lake | `der Delfoon-See` | der |
| Al-Hubail Lake | `der Al-Hubail-See` | der |
| Al-Jurn | `Al-Jurn` | — (artikellos، والجنس المرافق `das Dorf`) |
| Prince Saad | `Prinz Saad` | der |
| Battle of Kanzan | `die Schlacht von Kanzan` | die |
| the city of Al-Oyoun | `die Stadt Al-Oyoun` | die |
| Kanzan Adventure Park | `der Kanzan-Bergpark (Al-Shu'bah)` | der |
| Shu'bah Mountain Park | `der Al-Shu'bah-Bergpark` | der |

**اقرأ حقل `note` في كلٍّ منها — فيه قيدٌ تنفيذيٌّ لا يُستنتج من الاسم.** وقائمٌ سلفاً ويلزم الالتزام به: `der Kanzan-Berg` · `Al-Shu'bah` · `Al-Thulaim-Berg` · `Al-Kilabiyah` · `Al-Battaliyah` · `die Jawatha-Moschee` · `König Abdulaziz` · `Hofuf` · `Al-Ahsa` · `die Al-Ahsa-Municipality`/الصيغة المنشورة.

## سبعةُ مزالقَ مقيسةٍ في هذه الدفعة بعينها

1. **قيد القسمة — اسمٌ واحدٌ في صفحتين.** `Al-Hubail` يرد في `hubail-lake` (عنواناً) وفي `delfoon-lake` (ظرفَ مكان)؛ و`Kanzan` يرد في `kanzan` و`kanzan-park`. **تهجئةٌ واحدةٌ لكلٍّ في الصفحتين، بلا استثناء** — وهو سببُ جمع الخمس في دفعةٍ واحدة.

2. **‏`Delfoon-See` مفردٌ اسماً، جمعٌ واقعةً.** المصدران متطابقان: „a cluster of small seasonal lakes“ / «الديلفوون بحيرات صغيرة موسمية». العنوان يبقى مفرداً بقاعدة `titel_regel`، **والمتن يجب أن يحمل الجمع**. الدمجُ يُنتج واقعةً جغرافيةً زائفة **لا يكشفها القارئُ الأعمى** لأن النص يبقى متماسكاً بذاته.

3. **صيغةُ «بانتظار التأكيد» ثابتةٌ ولا تُعاد صياغتها**: مدخلُ المعجم `awaiting confirmation (بانتظار التأكيد) ⇒ Angaben werden noch bestätigt`، وPLAN §3 ينصّ أنها «صيغةٌ ثابتةٌ لا يُعاد صوغها».
   **وهذه أولُ دفعةٍ تستعملها فعلاً: صفرُ ورودٍ لها في `src/` كلِّه (مقيسٌ).** وتردُ في **ثلاثٍ** من الخمس بثلاث صياغاتٍ إنجليزيةٍ مختلفة:
   - `delfoon-lake`: „Further details are pending confirmation from reliable sources.“ / «التفاصيل الأخرى عنها بانتظار التأكيد من مصادر موثوقة.»
   - `hubail-lake`: „Further details about the lake — its extent and any visitor facilities — are pending confirmation from reliable sources.“ / «تفاصيل البحيرة الأخرى — امتدادها ومرافقها — بانتظار التأكيد من مصادر موثوقة.»
   - `kanzan-park`: „full operation is yet to be confirmed“ / «اكتمال التشغيل الكامل بانتظار التأكيد.»
   الصيغةُ المعتمدة تُحمل في الثلاث، والسياقُ حولها يختلف باختلاف المصدر. **تنبيه: صفرُ سابقةٍ منشورةٍ يعني أنّ اتّساقَ الثلاث مسؤوليةُ هذه الدفعة وحدها.**

4. **بندُ `practical` في `delfoon-lake` و`hubail-lake` ليس بندَ `kanzan`.** إنجليزيتُه `label_en: "Visiting"` و`value_en: "Open public natural site — no fee"` — **لا** `"Hours & entry"` و`"Open public site — no entry fee"`. فلا يُنسخ الألمانيُّ المنشورُ في `kanzan`/`thulaim` نسخاً.
   - `source_de` **زوجُ ذاكرةٍ ملزمٌ يُعاد حرفياً**: „Confirmed by the Visit Al-Ahsa team“ ⇒ **`Bestätigung durch das Redaktionsteam von Visit Al-Ahsa`** (‏`tm.json`، `jawatha-mosque`).
   - وأقربُ سابقةٍ منشورةٍ للقيمة هي `asfar.md`: „No fee — open natural site“ ⇒ `Kostenlos – frei zugängliches Naturgelände` (مفرداتٌ معتمدةٌ يُستأنس بها) — **لكنّ ترتيب الجملة هنا معكوسٌ وفيها „public“**، فالصياغةُ تتبع نصَّ هذه الصفحة لا نصَّ asfar.
   - و`label_en: "Visiting"` بلا نظيرٍ ألمانيٍّ منشور (المنشورُ: `Öffnungszeiten und Eintritt` ×12 · `Öffnungszeiten` ×8 · `Eintritt` ×7). والنظيران المعتمدان: zh ‏游览 · ru ‏Посещение.

5. **‏`kanzan` تحمل اسمين لجبلٍ واحد، والمصدر يفصلهما صراحة**: تاريخياً `Kanzan`، واليومَ `Al-Shu'bah`. لا تدمجهما. و`kanzan-park` تحمل **اسمين لمنتزهٍ واحد**: عنوانُ الصفحة `der Kanzan-Bergpark` والاسمُ الرسميُّ للمشروع `der Al-Shu'bah-Bergpark` — والمصدر يقول „officially known as“ / «يُعرف رسمياً باسم». **دمجُهما يمحو ما تقوله الجملة، ولا يستطيع القارئُ الأعمى كشفَه.**

6. **الهجريّ والأرقام في `kanzan` و`kanzan-park`.**
   - „1333 AH / 1915 CE“ ⇒ بقاعدة `_meta.style_rules.hidschra`: أولُ ذكرٍ في الصفحة يُكتب مقروءاً كاملاً ثم يُختصر — `1333 nach der Hidschra (n. H.) / 1915 n. Chr.` والصيغةُ المنشورةُ للنمط `(n. H.; …)` قائمةٌ في خمسة ملفّات، فقِسها قبل الاختيار.
   - **الإنجليزيةُ تكتب „fifteen kilometres“ لفظاً والعربيةُ «نحو 15 كيلومتراً» رقماً.** قاعدةُ الموقع C4 أرقامٌ لاتينية، والفيصلُ العربيّ — فالألمانيةُ `15 Kilometer` رقماً.
   - `1,100 metres` ⇒ `1.100 Meter` · `1,500-metre` ⇒ `1.500 Meter` (نقطةُ آلاف، `_meta.style_rules.zahlen`). `late 2022` ⇒ `Ende 2022`.

7. **مصطلحاتُ `kanzan-park` بلا مدخلٍ معجميٍّ بعد** (مقيسٌ: صفرُ مدخلٍ لكلٍّ): `zipline` · `cable car` · `suspended wooden bridges` · `mountain slide arenas` · `artificial waterfalls` · `children's play areas` · `walking paths` · `dune driving` (العربية «التطعيس»).
   **هذه وظيفةُ المرحلة 4** (‏«أيُّ اسمٍ ليس في المعجم يُضاف بمصدره وجنسه قبل الاستعمال»). و`Denglisch` محظورٌ (`_meta.style_rules.denglisch_verboten`) — و`Zipline` بالذات تحتاج قراراً مسنَداً لا ارتجالاً. النظيران المعتمدان يفيدان: ru «зиплайн» · «канатная дорога» · «подвесных деревянных моста» · zh ‏滑索 · 缆车 · 木制悬索桥.

## القواعد الحاكمة (من `PLAN.md` و`SKILL.md` و`_meta.style_rules`)

- **Sie** في كل الموقع، ولا `du`. إملاء Duden بـ**ß** لا `ss` السويسرية.
- **Durchkopplung** إلزاميةٌ إملائياً: `Al-Hubail-See` لا `Al-Hubail See`. ولا تكرارَ لاسم الجنس (`no_pleonasm`).
- الاقتباس `„…“` · شرطةُ الاعتراض **U+2013** بمسافتين (‏**U+2014 يُفشل الحارس C17**) · المسافةُ قبل الوحدة **U+0020 عادية** لا U+00A0 (‏U+00A0 يُفشل `check-consistency` **بصمت** وهو أسوأُ فشلٍ ممكن).
- **أرقامٌ لاتينية 0-9 حصراً** — الرقمُ العربيُّ-الهنديُّ يُفشل البناء (C4).
- الگلوس **مرةً واحدةً لكل مصطلحٍ في الصفحة** عند أول ورودٍ في المتن، **لا في العنوان** (`gloss_regel`)، وترتيبُه محكومٌ بالعنوان.
- **لا اختلاق**: لا موعدَ ولا رسمَ ولا مسافةَ ولا صفةَ مطلقةَ بلا سندٍ في المصدر. وما لا يسنده مصدرٌ يُدرَج تحت `source_defects_for_owner` **ولا يُكتب في النص**.
- `title_de` هو **بوابةُ توليد الصفحة الألمانية** — بدونه لا صفحة ولا hreflang.
- لا تُغيَّر مفاتيحُ frontmatter ولا المسارات ولا روابطُ الصور؛ **تُترجَم القيمُ النصيةُ وحدها**.
- **لا تُمَسّ العربيةُ ولا الإنجليزيةُ ولا الصينيةُ ولا الروسية**، ولا شيءَ خارج مجلَّد الدفعة.

## صيغةُ المخرج

كلُّ مرحلةٍ تكتب **JSON واحداً** في مجلَّدها داخل مجلَّد الدفعة بهذا الشكل:

```json
{
  "fields": {
    "delfoon-lake": {
      "title_de": "…", "kicker_de": "…", "summary_de": "…", "body_de": "…", "area_de": "…",
      "practical": [ { "label_de": "…", "value_de": "…", "source_de": "…" } ],
      "faq": [ { "q_de": "…", "a_de": "…" }, { "q_de": "…", "a_de": "…" }, { "q_de": "…", "a_de": "…" } ]
    },
    "hubail-lake": { … نفس الشكل … },
    "kanzan":      { "title_de": "…", "kicker_de": "…", "summary_de": "…", "body_de": "…", "area_de": "…" },
    "kanzan-park": { … الخمسة … },
    "thulaim":     { … الخمسة … }
  },
  "notes": []
}
```

‏`kanzan` و`kanzan-park` و`thulaim` **بلا مفتاح `practical` وبلا مفتاح `faq`** في المخرج — الستةُ القائمةُ لا تُمَسّ.
