# دفعة `zh-legal-1` — المرحلة هـ (الصفحات الخمس بلغة ثالثة)

BATCH = `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/zh-legal-1`
REPO = `/home/user/visit-alahsa`
TOOLS = `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe`

## النطاق (`BATCH/pack.json → strings`، 40 سلسلة)
Legal page frame (title, date, introduction, closing, contact line, copyright, meta description) + section One (Privacy Policy).
لكل مفتاح: `en` (**المصدر** ونطاقه) · `ar` (**الفيصل** في الواقعة) · `ctx` (**اقرأه لكل مفتاح**).

## منشورٌ بلغتك — ملزم حرفاً حيث يتقاطع
site.name «哈萨» · foot.l.report «内容纠错» · foot.l.privacy «政策与条款» · foot.l.unesco «联合国教科文组织世界遗产» · det.unesco «联合国教科文组织世界遗产十二处组成部分之一» · home.hero.eyebrow «联合国教科文组织世界遗产 · 2018» · crumb.home «首页» · map.title «景点地图» · map.terrain «3D 地形图» (زرّ الوصول إلى صفحة التضاريس المنشور — tmap.title يتّسق معه) · nav.map «地图»

## القيود المشتركة (الخطة §2.1)
1. الإنجليزية **مصدر** ونطاقه، والعربية **الفيصل** عند اختلاف واقعة (وتُبلَّغ علّةَ مصدر في `notes`).
2. **لا اختلاق** ولا حذف: كل التزام وحقّ وشرط واستثناء ينتقل بنطاقه بالضبط. **سياج الوقائع أعلى من السلاسة.**
3. **سلسلة لا تملكها الدفعة لا تُحرَّر** — المنشور أعلاه يُستعمل حرفاً.
4. **النوائب والثوابت حرفاً**: `{count}` · `{names}` · `info@visit-alahsa.com` · `visit-alahsa.com` · `name@example.com` · `↗` · `Ctrl` · `⌘` · الأرقام (1563 · 2018 · 1443 · (م/19) …) · أسماء الخدمات (Google Analytics · GA4 · Google · Netlify).
5. **نصٌّ خام**: لا ماركداون ولا وسوم. **أرقام لاتينية**، ولا U+00A0.
6. كل اسم علم من معجم لغتك؛ وما ليس فيه يُضاف إلى `termbase_additions` **بمصدره**.
7. **لا تُحرَّر ملفات المستودع** — مخرجك ملف JSON واحد في `BATCH`.

## المخرجات — ملف واحد لكل مرحلة، بأداة Write
`BATCH/zh-0N.json`:
```json
{ "batch": "<اسم الدفعة>", "stage": N,
  "strings": { "<كل مفاتيح pack.json بترتيبها>": "النص" },
  "termbase_additions": [ { "en": "...", "ar": "...", "zh": "...", "source": "...", "note": "..." } ],
  "notes": [ "تراكمية: انسخ ملاحظات المراحل قبلك ثم أضف ملاحظاتك مسبوقة بـ[sN]" ],
  "stage_specific": { } }
```
المرحلة 4: `stage_specific.changed` = قائمة {key, before, after, why} و`fence_removed`/`fence_restored`. المرحلة 5: `stage_specific.checklist` بنودها PASS/FIXED.

**تحقّق آلياً قبل الانتهاء**: `node /tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/verify.mjs <BATCH> zh-0N.json` حتى يطبع `✓`. ثم اقرأ ملفك من القرص وتأكد أنه صالح.


## قواعد الصينية (الخطة §2.2)
- **مبسّطة فقط**، وترقيم **كامل العرض** （，。、；：“”《》）، ولا ترقيم لاتيني ولا مسافة بين حرفين صينيين، و**مسافة بين الحرف الصيني والحرف/الرقم اللاتيني المتلاصقين** (أسلوب المنشور بلا استثناء)، والشرطة «——».
- التقويم: `伊斯兰历 1443 年 2 月 9 日` ونحوه للتاريخ الهجري؛ الأشهر أرقام بمسافة («2026 年 7 月 10 日»).
- المعجم `REPO/zh-translation/glossary/termbase.json` ملزم (ابحث فيه)، والذاكرة `REPO/zh-translation/memory/tm.json`.
- الأدوار: `REPO/zh-translation/prompts/0N-*.md`.

## أفخاخ هذه الدفعة
- **نصّ قانوني**: العربية هي الأصل المعتمد من المالك، والإنجليزية ترجمته الأمينة ومصدرك. **لا تلخيص، ولا تليين أو تشديد لالتزام أو حقّ أو إخلاء مسؤولية، ولا بند مضاف** — ولا جملة من قبيل «في حال التعارض يُعتمد النص العربي» (ليست في المصدر؛ إن رأيتها لازمة فارفعها في notes لإياد).
- «نظام حماية البيانات الشخصية» الصادر بالمرسوم الملكي (م/19) وتاريخ 1443/2/9هـ ولائحته التنفيذية — الاسم الرسمي للنظام بلغتك إن وُجدت له ترجمة رسمية أو شائعة (تحقّق)، والرقم والتاريخ حرفاً.
- `legal.seoDesc` يسرد عناوين الأقسام الستة — يجب أن يطابق عناوينها (`legal.sN.h`)؛ الخمسة الأخرى تُكتب في دفعتي legal-2/legal-3 بالتوازي، فاختر لها أقصر الصيغ القياسية في لغتك: Privacy Policy · Terms of Use · Disclaimer · Cookie Policy · Intellectual Property Policy · External Links Policy.
- `legal.sN.n` ترتيبيّ قبل عنوان القسم («One: Privacy Policy» ⇐ «<n>: <h>»).

## أحكام المنسّق العابرة للدفعات
اقرأ `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/CROSS.md` — ملزمة من المرحلة 4 وتعلو ما سبقها.
