# دفعة `zh-ui` — المرحلة هـ (الصفحات الخمس بلغة ثالثة)

BATCH = `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe/zh-ui`
REPO = `/home/user/visit-alahsa`
TOOLS = `/tmp/claude-0/-home-user-visit-alahsa/90c5a49c-cc9d-5d7e-b274-7cf70423da47/scratchpad/phe`

## النطاق (`BATCH/pack.json → strings`، 34 سلسلة)
Terrain-map UI keys (tmap.*), the Report-an-error page and its thanks page, and the UNESCO page.
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
- **`report.*` و`thanks.*` صفحتان noindex** (نموذج Netlify): نبرة خدمة مهذّبة وقصيرة؛ `report.emailPh` مثال بريد يبقى كما هو.
- **`unesco.lead` و`unesco.seoDesc`** فيهما النائبان `{count}` (= 6 اليوم) و`{names}` (أسماء المكوّنات بفاصل لغتك) — يبقيان حرفاً مرة واحدة، والجملة نحوية مع العدد. الوقائع: 2018، الموقع 1563، اثنا عشر مكوّناً — لا غيرها.
- **`tmap.*`**: `tmap.title` يتّسق مع `map.terrain` المنشور (زرّ الوصول إليها). `tmap.3d.on`/`tmap.3d.off` زوجٌ متوازٍ قصير. «Ctrl» و«⌘» رمزا مفاتيح يبقيان. `tmap.classic` بلا سهم (القالب يضيفه).
