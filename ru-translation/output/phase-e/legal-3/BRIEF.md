# دفعة `ru-legal-3` — المرحلة هـ (الصفحات الخمس بلغة ثالثة)

BATCH = `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/ru-legal-3`
REPO = `/home/user/visit-alahsa`
TOOLS = `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe`

## النطاق (`BATCH/pack.json → strings`، 41 سلسلة)
Legal page sections Four (Cookie Policy), Five (Intellectual Property Policy) and Six (External Links Policy).
لكل مفتاح: `en` (**المصدر** ونطاقه) · `ar` (**الفيصل** في الواقعة) · `ctx` (**اقرأه لكل مفتاح**).

## منشورٌ بلغتك — ملزم حرفاً حيث يتقاطع
site.name «Аль-Ахса» · foot.l.report «Сообщить об ошибке» · foot.l.privacy «Правила и условия использования» · foot.l.unesco «Всемирное наследие ЮНЕСКО» · det.unesco «Компонент объекта Всемирного наследия ЮНЕСКО» · home.hero.eyebrow «Объект Всемирного наследия ЮНЕСКО · 2018» · crumb.home «Главная» · map.title «Карта достопримечательностей» · map.terrain «3D-карта рельефа» (زرّ الوصول المنشور — tmap.title يتّسق معه) · nav.map «Карта»

## القيود المشتركة (الخطة §2.1)
1. الإنجليزية **مصدر** ونطاقه، والعربية **الفيصل** عند اختلاف واقعة (وتُبلَّغ علّةَ مصدر في `notes`).
2. **لا اختلاق** ولا حذف: كل التزام وحقّ وشرط واستثناء ينتقل بنطاقه بالضبط. **سياج الوقائع أعلى من السلاسة.**
3. **سلسلة لا تملكها الدفعة لا تُحرَّر** — المنشور أعلاه يُستعمل حرفاً.
4. **النوائب والثوابت حرفاً**: `{count}` · `{names}` · `info@visit-alahsa.com` · `visit-alahsa.com` · `name@example.com` · `↗` · `Ctrl` · `⌘` · الأرقام (1563 · 2018 · 1443 · (م/19) …) · أسماء الخدمات (Google Analytics · GA4 · Google · Netlify).
5. **نصٌّ خام**: لا ماركداون ولا وسوم. **أرقام لاتينية**، ولا U+00A0.
6. كل اسم علم من معجم لغتك؛ وما ليس فيه يُضاف إلى `termbase_additions` **بمصدره**.
7. **لا تُحرَّر ملفات المستودع** — مخرجك ملف JSON واحد في `BATCH`.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/ru-0N.json`:
```json
{ "batch": "<اسم الدفعة>", "stage": N,
  "strings": { "<كل مفاتيح pack.json بترتيبها>": "النص" },
  "termbase_additions": [ { "en": "...", "ar": "...", "ru": "...", "source": "...", "note": "..." } ],
  "notes": [ "تراكمية: انسخ ملاحظات المراحل قبلك ثم أضف ملاحظاتك مسبوقة بـ[sN]" ],
  "stage_specific": { } }
```
المرحلة 4: `stage_specific.changed` = قائمة {key, before, after, why} و`fence_removed`/`fence_restored`. المرحلة 5: `stage_specific.checklist` بنودها PASS/FIXED.

**تحقّق آلياً قبل الانتهاء**: `node /tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/verify.mjs <BATCH> ru-0N.json` حتى يطبع `✓`. ثم اقرأ ملفك من القرص وتأكد أنه صالح.


## قواعد الروسية (الخطة §2.3)
- **`вы` بحرف صغير** · العناوين بحرف كبير للكلمة الأولى والأعلام فقط · «ёлочки» وداخلها „лапки“ · شرطة الاعتراض **U+2014 بمسافتين** والنطاق U+2013 بلا مسافات.
- الأداة: `Аль-Ахса` رأساً و`Эль-` لما عداه (`C20`) · التاريخ الهجري `9.2.1443 г. хиджры` بنمط الخط · لا `локация`/`гайд`/`является` المكرّرة ولا كنتسيليريت (والنص القانوني يحتمل السجلّ الرسمي دون تكلّف).
- كل مدخل معجم جديد بـ`rod` و`sklonenie` ومصدره. المعجم `REPO/ru-translation/glossary/termbase.json` ملزم (وأحكامه في `_meta.batch_rulings`)، والذاكرة `REPO/ru-translation/memory/tm.json`. `visitsaudi.com/ru` لا يُتّخذ مرجعاً.
- الأدوار: `REPO/ru-translation/prompts/0N-*.md`.

## أفخاخ هذه الدفعة
- **نصّ قانوني**: العربية هي الأصل المعتمد من المالك، والإنجليزية ترجمته الأمينة ومصدرك. **لا تلخيص، ولا تليين أو تشديد لالتزام أو حقّ أو إخلاء مسؤولية، ولا بند مضاف** — ولا جملة من قبيل «في حال التعارض يُعتمد النص العربي» (ليست في المصدر؛ إن رأيتها لازمة فارفعها في notes لإياد).
- عناوين الأقسام بأقصر صيغها القياسية في لغتك (Terms of Use · Disclaimer · Cookie Policy · Intellectual Property Policy · External Links Policy) — لأنها تُسرد أيضاً في وصف الصفحة الذي تكتبه دفعة legal-1.
- `legal.sN.n` ترتيبيّ قبل عنوان القسم («Two: Terms of Use» ⇐ «<n>: <h>»)، وعناوين الأقسام الفرعية مرقّمة («1. …») فالرقم يبقى في رأسها.
- الإحالات الداخلية بين الأقسام («the fourth section of this document»، «Cookie Policy») تُترجم بالأسماء نفسها التي تكتبها للأقسام.

## أحكام المنسّق العابرة للدفعات
اقرأ `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/CROSS.md` — ملزمة من المرحلة 4 وتعلو ما سبقها.
