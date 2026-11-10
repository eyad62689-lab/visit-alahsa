# تدقيق جودة الكود والأمان — موقع «زوروا الأحساء» (2026-11-09)

- الفرع: `audit/code-review-2026-11-09` من `origin/main` عند `526bee7` (دمج #304).
- شجرة العمل: `C:\Users\truyr\node-store\va-wt\audit` (خارج OneDrive).
- البيئة: Astro 7.2.8 ثابت، Node 24.19.0 / npm 11.17.0 محلياً (Netlify يبني على Node 22)، Lighthouse 12.8.2، axe-core 4.14.0، Chrome المثبّت عبر puppeteer-core.
- الأدلة الخام (سجلات الأوامر وملفات JSON) محفوظة خارج المستودع في مجلد الجلسة `scratchpad/evidence/` (مذكورة بأسمائها في كل بند).

## 1. الملخص التنفيذي

| المستوى | قبل | بعد | ما تغيّر |
|---|---|---|---|
| الأمان | 6/10 | 8.5/10 | 7 ثغرات أُصلحت (حقن HTML/Markdown في بريد وتقرير theft-scan، JSON-LD بلا تهريب `<`، نتائج البحث بـinnerHTML بلا تهريب، copy-log بلا تحقق أصل ولا سقف يومي، المستشار يقبل localhost في الإنتاج). المتبقي قرارات: ترقية التبعيات على junction مشترك، وCSP ما زالت Report-Only. |
| الأداء | 9/10 | 9/10 | Lighthouse أصلاً 93–100 للجوال و99–100 للحاسوب. الإصلاح الوحيد في الكود: قراءة سجلات Blobs في theft-scan بتزامن محدود بدل تسلسل يصل إلى 5000 طلب. ما تبقّى توصيات (إعادة ترميز صور، رؤوس كاش pagefind). |
| الإتاحة وRTL | 8.5/10 | 9.5/10 | axe على 50 مسحاً: علّة حقيقية واحدة خطيرة (زر 2D/3D يغطّي زرّي التكبير في الصفحات RTL) + معلمان متطابقا الاسم + روابط إسناد بلا تمييز + حقل بحث بلا مؤشر تركيز. كلها أُصلحت؛ بلاغ التباين في /de/ و/ru/ تبيّن إيجابياً كاذباً. |
| SEO والبيانات المهيكلة | 9.5/10 | 9.5/10 | 823 صفحة مفهرسة: canonical/title/description/robots/og:image واحدة في كلٍّ، 5,671 رابط hreflang متبادلة بلا نقص، sitemap يطابق المفهرس تماماً، 2,569 عقدة JSON-LD كلها تُحلَّل وبلا حقول ناقصة. لا تعديل كود؛ المتبقي قرارات عناوين (مفصّلة في §5). |
| الصيانة والتوثيق | 7/10 | 8/10 | لا ESLint في المشروع (`astro check` هو البوابة الوحيدة). أُزيلت كل تلميحات `astro check` داخل `src/` و`tools/`، وصُحّح README، ونُقل تعريف `BOTISH_RE` قبل استعماله، وأُزيلت أربعة `as any` بتعريف نوع واحد. المتبقي: ازدواج رؤوس HTTP بين ملفين، وتلميحات سكربتات الدفعات. |

**الخلاصة:** الموقع في حالة ممتازة تقنياً؛ أثر التدقيق الأكبر في طبقة دوال Netlify (تهريب المخرجات غير الموثوقة وحدود الإغراق) وفي علّة واحدة مرئية للزائر العربي على الخريطة التضاريسية. البناء ناجح بعد كل مستوى بصفر أخطاء، وكل الفحوص الداخلية (83 فحص اتساق، فحص الروابط، 101 اختبار للمستشار) خضراء.

## 2. منهجية التدقيق

1. **خط الأساس (المرحلة 0):** بناء كامل مع قياس الزمن، `astro check`، `npm audit --json`، قياس dist (882 صفحة)، Lighthouse (وسيط 3 تشغيلات، جوال وحاسوب) على 3 صفحات، axe على 10 صفحات × 2 عرض.
2. **المستويات بالترتيب الصارم** (كل مستوى يُدقَّق ويُصلَح ويُبنى ويُلتزَم قبل التالي): الأمان ← الأداء ← الإتاحة وRTL ← SEO ← الصيانة.
3. **محرك المراجعة:** مهارة `/code-review` بجهد عالٍ (8 زوايا: فحص سطري، سلوك محذوف، تتبّع عبر الملفات، إعادة استعمال، تبسيط، كفاءة، عمق الإصلاح، قواعد CLAUDE.md) على شجرة العمل، وبلاغاتها العشرة مسجّلة بحالتها النهائية عبر ReportFindings (8 أُصلحت، 2 مؤجّلان).
4. **أدوات التحقق المستقلة لكل مخرج:** سكربتات node في مجلد الجلسة (`t1-verify.mjs` لدوال التهريب وبوابة copy-log، `t2-verify.mjs` لتزامن القراءة، `axe-run.mjs`، `lh-run.mjs`، `t4-verify.mjs`/`t4-lengths.mjs` لـSEO) + فحص يدوي في المتصفح المدمج لقياس المواضع والألوان المحسوبة.
5. **قواعد الصرامة:** لا بلاغ بلا دليل أداة أو مراجعة يدوية موثّقة؛ لا تغيير نص مرئي أو مسار أو وسم SEO بلا قرار المالك؛ لا مساس بالمتغيرات البيئية أو إعدادات Netlify؛ لا تبعيات جديدة.
6. **ما لم يُدقَّق:** `node_modules/`، `dist/`، محتوى المقالات والصور والفيديو (خارج النطاق)، وملف القفل إلا عبر `npm audit`.

## 3. خط الأساس مقابل النتيجة النهائية

| المقياس | قبل | بعد |
|---|---|---|
| `npm run build` | نجاح، 3 د 22 ث | نجاح، 2 د 47 ث |
| `astro check` | 0 خطأ، 32 تلميحاً (منها 10 في `src/` و`tools/`) | 0 خطأ، 21 تلميحاً (2 في `src/`: إهمال Zod المؤجّل D7؛ الباقي سكربتات دفعات تحت `docs/` و`*-translation/output/`) |
| `npm audit` | 5 (3 عالية، 2 متوسطة، 0 حرجة) | 5 (بلا تغيير — لم تُلمس التبعيات؛ انظر §5) |
| check-consistency | 83 ✓ | 83 ✓ |
| test-advisor | 100 ✓ | 101 ✓ (اختبار جديد لرفض localhost في الإنتاج) |
| axe (wcag2a/2aa/21a/21aa/22aa/best-practice) | 20 مسحاً / 0 مخالفة (خط الأساس)؛ المسح الموسّع 50 مسحاً / 5 صفحات بمخالفات | 50 مسحاً / 48 نظيفاً؛ البلاغان الباقيان هما التباين الإيجابي الكاذب نفسه على `/de/` و`/ru/` جوال (A5) |
| Lighthouse `/` جوال (أداء/إتاحة/ممارسات/SEO) | 93/100/100/100 — LCP 2651ms، TBT 159ms | 94/100/100/100 — LCP 2644ms، TBT 131ms (إعادة القياس؛ الجولة الأولى أعطت وسيط 77 لأن فيديو الهيرو دخل الأثر — D11؛ التشغيلات 71/77/93 ثم 73/94/94) |
| Lighthouse `/` حاسوب | 100/100/100/100 — LCP 721ms | 100/100/100/100 — LCP 724ms |
| Lighthouse `/en/attractions/jabal-al-qarah/` جوال | 93/100/100/100 — LCP 2874ms | 94/100/100/100 — LCP 2868ms، TBT 89ms |
| Lighthouse `/en/attractions/jabal-al-qarah/` حاسوب | 99/100/100/100 — LCP 825ms | 100/100/100/100 — LCP 822ms |
| Lighthouse `/en/plan/` جوال | 97/100/100/66 (SEO 66 = noindex مقصود) | 98/100/100/66 — LCP 2117ms |
| Lighthouse `/en/plan/` حاسوب | 100/100/100/66 | 100/100/100/66 — LCP 455ms |

ملاحظة: Lighthouse على جهاز محلي يتذبذب (أرقام الأداء الثلاثة لكل وسيط في السجلات)؛ الفروق دون ±3 نقاط ليست دلالة.

## 4. النتائج والإصلاحات حسب الأولوية

درجات الثقة: **أداة** = أكّدته أداة؛ **يدوي** = أكّدته مراجعة يدوية/قياس في المتصفح؛ **محتمل** = لم يُثبَت بالتشغيل.

### المستوى 1 — الأمان (التزامان: `e8a4076`، `6871426`)

| # | الخطورة | الموضع | ما المشكلة ولماذا | الثقة | الإصلاح |
|---|---|---|---|---|---|
| S1 | عالية | `netlify/functions/theft-scan.mjs:131-136` (sendAlertEmail) | رابط وعنوان نتيجة Serper (نص خارجي) يُضمَّنان في HTML بريد المالك بلا تهريب → حقن وسوم في البريد. | أداة (code-review) + t1-verify | `escapeHtml` و`safeHttpUrl` (يقبل http/https فقط). |
| S2 | متوسطة | `theft-scan.mjs:100` (buildReport) | الحقول نفسها في صفّ جدول Markdown بلا تهريب `|` والأسطر → كسر التقرير أو حقن Markdown. | أداة | `mdCell`. |
| S3 | عالية | `netlify/functions/copy-log.mjs:33-57` | فحص الأصل يُتخطّى عند غياب Origin ويقبل أي `*.netlify.app`؛ لا سقف لكل عنوان → إغراق المخزن بتدوير معرّف الجلسة. | أداة + t1-verify (بوابة 403) | Origin إلزامي عبر `originAllowed` من core، سقف يومي 300 بمفتاح `ip/<يوم>/<تجزئة دلو العنوان>` (IPv6 على /64 كما في المستشار — الالتزام الثاني بعد ما رصدته المراجعة الآلية)، لا تخزين بلا عنوان. |
| S4 | متوسطة | `netlify/functions/advisor/advisor.mjs:86-94`، `core.mjs:309-321` | `originAllowed` و`corsHeaders` يقبلان localhost/127.0.0.1 في الإنتاج → صفحة محلية على جهاز الزائر تستهلك حصص المستشار. | أداة + test-advisor (اختبار جديد) | `originAllowed(origin, allowLocal)` يقبل المحلي خارج `production` فقط؛ CORS للمحلي خارج الإنتاج فقط. |
| S5 | متوسطة | `src/components/Seo.astro:74` | JSON-LD عبر `set:html` بلا استبدال `<` → قيمة محتوى تحوي `</script` تُغلق الكتلة مبكراً. | أداة؛ تحقق: 2699 كتلة في dist تُحلَّل | `.replace(/</g, '\\u003c')` (النمط نفسه في TerrainMapView). |
| S6 | متوسطة | `src/components/home/ChapterPlan.astro:23` | حمولة `data-plan-data` بـJSON.stringify خام. | أداة | التهريب نفسه. |
| S7 | متوسطة | `src/components/Search.astro:86-89` | `d.url` و`d.meta.title` من فهرس Pagefind في innerHTML بلا تهريب. | أداة | دالة `esc` للرابط والعنوان؛ المقتطف يبقى HTML من Pagefind (وسم `<mark>`). |

مدقَّق بلا علّة: رؤوس الأمان (HSTS، X-Frame-Options، Referrer-Policy، Permissions-Policy) في `netlify.toml` و`public/_headers`؛ لا أسرار في المستودع (gitleaks سابقاً + فحص يدوي لـ`process.env` فقط)؛ CodeQL/Semgrep/Snyk في CI بإصدارات مثبّتة بـSHA؛ `rel="noopener"` على كل `target="_blank"`.

### المستوى 2 — الأداء (التزام `2b80639`)

| # | الخطورة | الموضع | ما المشكلة | الثقة | الإصلاح |
|---|---|---|---|---|---|
| P1 | متوسطة | `netlify/functions/theft-scan.mjs:48-65` (listEntries) | انتظار `store.get` مفتاحاً مفتاحاً حتى 5000 إدخال أسبوعياً → تجاوز مهلة الدالة المجدولة في أسبوع ثقيل. | أداة؛ t2-verify: 120 نداء، 114 محفوظة بالترتيب، ذروة تزامن 8 | مجموعة عمّال بتزامن 8 مع حفظ الترتيب والسقف وإسقاط الإدخالات التالفة. |

مقاسٌ بلا تعديل (ضمن الهدف): LCP جوال 2.1–2.9 ث على صفحات ثقيلة بالصور، CLS 0، TBT ≤ 159ms؛ JS الكلي 1449 KB منها 952 KB MapLibre كسول لا يدخل أي صفحة إلا عند الطلب؛ الخطوط مستضافة ذاتياً بـ`font-display: swap`؛ الفيديو `preload="none"`؛ GA4 مؤجّل. التوصيات في §7.

### المستوى 3 — الإتاحة وRTL (التزام `d9fc95e`)

| # | الخطورة | الموضع | ما المشكلة | الثقة | الإصلاح |
|---|---|---|---|---|---|
| A1 | خطيرة (axe target-size) | `src/scripts/terrain-map/core.ts:44` + `TerrainMapView.astro:216` | في الصفحات RTL يقع زر 2D/3D (`inset-inline-start` = اليمين) فوق أداة التكبير (أعلى اليمين افتراضياً): قياس المتصفح 23 من 29 بكسل من زر التكبير مغطّاة، و17 من 29 من زر التصغير. الصفحات LTR سليمة. | أداة + قياس في المتصفح | أداة التكبير إلى `top-left` حين اتجاه الحاوية rtl. **مرئي للزائر العربي/الأوردي:** زرّا التكبير انتقلا إلى أعلى اليسار ولم يعودا محجوبين. |
| A2 | خطيرة (axe link-in-text-block ×3) | `TerrainMapView.astro:258` | روابط إسناد MapLibre بلون 2.02:1 مع النص المجاور بلا تسطير (WCAG 1.4.1). | أداة | تسطير `.maplibregl-ctrl-attrib a`. |
| A3 | متوسطة (axe landmark-unique ×2) | `src/components/views/VisaGuideView.astro:84,136` | القسم وغلاف الجدول القابل للتمرير كلاهما معلم `region` بالاسم نفسه. | أداة | حُذف `aria-labelledby` من القسمين؛ الغلاف القابل للتركيز يحتفظ بالاسم. بلا أثر مرئي. |
| A4 | متوسطة (WCAG 2.4.7) | `src/components/Search.astro:167` | `outline: none` على حقل البحث بلا أي مؤشر تركيز بديل. | يدوي | خط تركوازي أسفل الشريط عند `:focus-within`. |
| A5 | — (إيجابي كاذب) | `/de/` و`/ru/` جوال `#ch-map .ch-link` | axe قاس #d9ae64 على #f7f3ea (1.86:1)؛ القياس في المتصفح: الرابط داخل القسم الداكن rgb(0,79,70) والنسبة الحقيقية 4.62:1 (AA). السبب: `content-visibility: auto` للقسم خارج الشاشة وقت المسح. | يدوي (elementsFromPoint + حساب النسبة) | لا تغيير. |
| A6 | معلومة | `src/styles/play-alwan.css`، `ChapterQarah.astro:70-79`، `Advisor.astro:525` | إزاحات فيزيائية left/right: شارة ركن داخل بطاقة لعبة، مسار الشمس الجغرافي، وعشّ البلبل داخل صندوق `direction: ltr` يُعكَس بـ`--mx`. | يدوي | مقصودة. |

مدقَّق بلا علّة: `lang`/`dir` صحيحان في اللغات السبع؛ تسلسل العناوين بلا قفز؛ h1 واحد في كل صفحة مفهرسة (404 تحمل 7 عمداً، واحد لكل لغة)؛ 1,914 صورة بـalt (13 منها `alt` فارغ لصور زخرفية داخل `aria-hidden`)؛ `prefers-reduced-motion` في 23 ملفاً؛ رابط التخطّي والتركيز العام `:focus-visible`.

### المستوى 4 — SEO والبيانات المهيكلة (بلا تعديل كود)

| # | الخطورة | الموضع | ما وُجد | الثقة |
|---|---|---|---|---|
| E1 | معلومة | `dist/404.html` | canonical إلى `/404/` على صفحة `noindex, nofollow` خارج sitemap — بلا أثر. | أداة |

مدقَّق بلا علّة (t4-verify): 882 ملفاً (823 مفهرسة، 59 noindex)؛ في كل صفحة canonical واحد مطابق لمسارها، title واحد، description واحد غير فارغ، robots واحد، og:image واحد وملفه موجود، viewport؛ hreflang: 5,671 رابطاً كلها لصفحات مبنية مفهرسة ومتبادلة، مع x-default؛ sitemap.xml: 823 رابطاً = المفهرس تماماً، lastmod على كلّها، 6,494 بديل xhtml؛ JSON-LD: 2,569 عقدة في 18 نوعاً، كلها تُحلَّل وبـ`@context` وبلا حقل إلزامي ناقص؛ robots.txt سليم. قرارات العناوين في §5.

### المستوى 5 — الصيانة والتوثيق (التزام `f989921`)

| # | الخطورة | الموضع | ما المشكلة | الثقة | الإصلاح |
|---|---|---|---|---|---|
| M1 | منخفضة | `README.md:3` | يصف الموقع بثنائي اللغة وهو بسبع لغات. | أداة (code-review) | عُدّل. |
| M2 | منخفضة | `netlify/functions/theft-scan.mjs:85` | `BOTISH_RE` معرَّف بعد الدالة التي تستعمله (يعمل لأن النداء لاحق؛ فخ TDZ عند أي إعادة ترتيب). | يدوي | نُقل قبل `analyzeCrawlers`. |
| M3 | منخفضة | `ChapterFinale.astro:32`، `ChapterPlan.astro:89,113`، `SavedBar.astro:22` | أربعة `(window as any)` لـVAPlan/VATrack مع أن `VATrack` معرَّف نوعياً في `analytics.ts`. | أداة (astro check) | `Window.VAPlan` معرَّف مرة واحدة والتحويلات أُزيلت. |
| M4 | منخفضة | 10 تلميحات `astro check` في `src/` و`tools/` | متغيرات واستيرادات غير مستعملة (`PageHero` lang، `Search` loaded/loadFailed/i، `DetailView` attractionHref، `FarmersMarketsView` SITE، `LegalView`/`ReportView` ar، `check-consistency` escapeRe الداخلية، `check-links` stat، `gen-image-widths` posix) و`webkitAudioContext` بلا نوع في `play-explorer.js`. | أداة | أُزيلت؛ `webkitAudioContext` عبر تحويل JSDoc. |

## 5. العناصر المؤجلة وبانتظار قرارك

| # | المجال | القرار المطلوب | لماذا لم يُنفَّذ |
|---|---|---|---|
| D1 | أمان/تبعيات | `npm audit`: 5 ثغرات (3 عالية: undici وvite وzod عبر astro و@anthropic-ai/sdk؛ 2 متوسطة: astro ≤7.3.2 وfast-uri). الحل: ترقية astro إلى 7.4.x وتحديث القفل. | `node_modules` junction مشترك بين ~85 شجرة عمل؛ أي `npm install` يمسّها كلها ويلزم إعادة الربط. قرارك بالتوقيت. |
| D2 | أمان | CSP ما زالت `Content-Security-Policy-Report-Only` بـ`'unsafe-inline'` وبلا نقطة استقبال تقارير (`netlify.toml` و`public/_headers`). | التشديد يحتاج nonce/hash للسكربتات المضمّنة (GA، VAPlan، MapLibre) وقد يكسر الواجهة؛ تغيير مرئي محتمل. |
| D3 | صيانة | ازدواج رؤوس HTTP بين `netlify.toml` و`public/_headers` مع انحراف قائم (قاعدة `llms.txt` في `_headers` وحده). | مقصود لرفع dist يدوياً بحسب التعليق؛ التوحيد يحتاج قراراً على المصدر الواحد. |
| D4 | SEO | عناوين الرئيسية في zh/de/ru/ur بلا لاحقة العلامة بينما ar/en/tr تحملها (والصفحات الداخلية في تلك اللغات تحملها). | وسم SEO بلغات تمرّ بخط ترجمة. |
| D5 | SEO | عناوين متطابقة بين `/attractions/palm-village/` و`/events/palm-village/` في de/ru/ur/zh (4 أزواج = 8 صفحات) بينما ar/en تميّزان («دليل الزيارة» مقابل «فعالية»). | المثل. |
| D6 | SEO | 77 صفحة بعنوان > 70 محرفاً (الأطول 145: مقال طرفة بن العبد بالألمانية؛ en 26، de 12، ar 12، tr 12، ru 8، ur 8)، و76 وصفاً > 170 محرفاً (الأطول 371 في `/ur/restaurants-cafes/`)، و48 وصفاً غير صيني < 70 محرفاً. القوائم الكاملة في `t4-lengths.log`. | محتوى. |
| D7 | صيانة | `z.string().url()` مهمل (Zod 4 ← `z.url()`) في `src/content.config.ts:168,176`. | تغيير مخطط محتوى منشور؛ آمن غالباً لكنه قرار. |
| D8 | صيانة/تصميم | `.mapch { background: #00332D }` في `ChapterMap.astro:114` تغلبها قاعدة `.ch--dark` فيُحسب اللون rgb(0,79,70). | أيُّ اللونين مقصود؟ |
| D9 | صيانة | 19 تلميحاً في سكربتات الدفعات تحت `docs/*/` و`*-translation/output/` تدخل `astro check`. | تنظيفها أو استثناء المجلدين في tsconfig قرار على نطاق الفحص. |
| D11 | أداء | فيديو الهيرو على الجوال (`/video/hero-home-v3-portrait.mp4`، 486 KB) يُحمَّل بعد 3 ثوانٍ من `load` عبر idle callback (`HeroVideo.astro:63-65`)؛ حين يدخل أثر Lighthouse يصير هو عنصر LCP (4.7 ث) فتهبط درجة الرئيسية جوالاً من 93–94 إلى 71–77 بين تشغيل وآخر (ظهر في خط الأساس أيضاً: تشغيل 68). لم تمسّه هذه الدفعة. خياران: ربط التحميل بأول تمرير/تفاعل على الجوال، أو ملصق `poster` صريح يُثبّت LCP على الصورة. | تغيير سلوك مرئي على الجوال. |
| D10 | أداء | إعادة ترميز صور المعالم الأثقل (تقدير توفير ~105–110 KB على الرئيسية)، رؤوس كاش طويلة لـ`/pagefind/*`، ووحدة المستشار (~10 KB) تُحمَّل على كل صفحة. | الصور خارج النطاق؛ الرؤوس تغيير إعدادات. |

## 6. التغييرات على مستوى الملفات

| الملف | الالتزام | التغيير |
|---|---|---|
| `netlify/functions/theft-scan.mjs` | e8a4076, 2b80639, f989921 | دوال تهريب (escapeHtml/mdCell/safeHttpUrl) وتطبيقها في البريد والتقرير؛ `listEntries` بتزامن محدود ومُصدَّرة؛ `BOTISH_RE` قبل استعماله. |
| `netlify/functions/copy-log.mjs` | e8a4076, 6871426 | Origin إلزامي، سقف يومي لكل عنوان بمفتاح دلو IPv6، لا تخزين بلا عنوان، تعليق الرأس. |
| `netlify/functions/advisor/advisor.mjs` | e8a4076 | ترتيب حساب `env`/`allowLocal` قبل CORS؛ رفض localhost في الإنتاج. |
| `netlify/functions/advisor/core.mjs` | e8a4076 | `LOCAL_HOSTS` و`originAllowed(origin, allowLocal)`. |
| `tools/test-advisor.mjs` | e8a4076 | اختبار رفض المحلي في الإنتاج (101 اختبار). |
| `src/components/Seo.astro` | e8a4076 | تهريب `<` في JSON-LD. |
| `src/components/home/ChapterPlan.astro` | e8a4076, f989921 | تهريب الحمولة؛ إزالة `as any`. |
| `src/components/Search.astro` | e8a4076, d9fc95e, f989921 | تهريب الرابط والعنوان؛ مؤشر تركيز؛ إزالة متغيرات غير مستعملة. |
| `src/components/views/VisaGuideView.astro` | d9fc95e | معلم واحد لكل جدول. |
| `src/components/views/TerrainMapView.astro` | d9fc95e | تسطير روابط الإسناد. |
| `src/scripts/terrain-map/core.ts` | d9fc95e | أداة التكبير أعلى اليسار في RTL. |
| `README.md` | f989921 | سبع لغات. |
| `src/scripts/analytics.ts` | f989921 | نوع `Window.VAPlan`. |
| `src/components/home/ChapterFinale.astro`, `SavedBar.astro` | f989921 | إزالة `as any`. |
| `src/components/PageHero.astro`, `views/DetailView.astro`, `views/FarmersMarketsView.astro`, `views/LegalView.astro`, `views/ReportView.astro`, `src/scripts/play-explorer.js`, `tools/check-consistency.mjs`, `tools/check-links.mjs`, `tools/gen-image-widths.mjs` | f989921 | إزالة غير المستعمل / تحويل نوع. |
| `docs/code-review-2026-11-09.md` | الالتزام الأخير على الفرع (`docs:`) | هذا التقرير. |

لم يُحذف أي ملف، ولم تُغيَّر تبعية، ولم يُمسّ أي متغير بيئي أو إعداد Netlify أو مسار أو نص مرئي (عدا موضع زرّي التكبير في الخريطة التضاريسية RTL، وهو إصلاح علّة إتاحة موثّق في A1).

## 7. التوصيات للمرحلة التالية

1. **ترقية astro إلى 7.4.x** في نافذة مخصصة (تصفّر `npm audit`) مع إعادة ربط junction حسب CLAUDE.md.
2. **تفعيل CSP حقيقية** تدريجياً: إضافة نقطة `report-to` أولاً، ثم نقل السكربتات المضمّنة (VAPlan، تحميل GA) إلى ملفات أو nonce، ثم رفع `'unsafe-inline'`.
3. **مصدر واحد للرؤوس:** توليد `public/_headers` من `netlify.toml` (أو العكس) في `postbuild` مع فحص اتساق يمنع الانحراف.
4. **ESLint بإعداد Astro + TypeScript** كبوابة ثانية بجانب `astro check`، مع استثناء سكربتات الدفعات أو تنظيفها.
5. **اختبار آلي لعلّة A1:** فحص في check-consistency أو axe في CI يمسح الخريطة التضاريسية بعد فتحها في اتجاه RTL (أمسكها axe هنا فقط لأن المسح شمل الصفحة العربية بعرض حاسوب).
6. **سياسة طول العناوين والأوصاف** في خطوط الترجمة (≤ 70 / ≤ 160 محرفاً) وإدراجها في قارئ الفاحص؛ وتوحيد لاحقة العلامة في الرئيسيات.
7. **أداء الصور:** إعادة ترميز الصور الأثقل بـsharp (ضمن قاعدة `-v2` للكاش) ورؤوس كاش طويلة لـ`/pagefind/*`.

## 8. سجل الأوامر المنفذة

كل الأوامر من شجرة العمل `C:\Users\truyr\node-store\va-wt\audit` ما لم يُذكر غيره؛ السجلات في `scratchpad/evidence/`.

```
git worktree add C:\Users\truyr\node-store\va-wt\audit -b audit/code-review-2026-11-09 origin/main
npm run build                                   # build-baseline.log (3m22s), build-tier1.log, build-tier2.log, build-tier3.log (2m57s), build-tier5.log
npm audit --json                                # npm-audit-before.json / npm-audit-after.json
node lh-run.mjs before http://localhost:4356 "/,/en/attractions/jabal-al-qarah/,/en/plan/"   # lh-before.log + lh/before/*.json
node lh-run.mjs after  http://localhost:4356 "/,/en/attractions/jabal-al-qarah/,/en/plan/"   # lh-after.log + lh/after/*.json
node lh-run.mjs after-home2 http://localhost:4356 "/"                                         # lh-after-home2.log (إعادة قياس الرئيسية بعد تذبذب الفيديو، D11)
node axe-run.mjs before|tier3|tier3-terrain|tier3-after|after http://localhost:4356 "<pages>"   # axe-*.log + axe/<label>/*.json
node t1-verify.mjs ; node t2-verify.mjs         # دوال التهريب/بوابة copy-log ؛ تزامن listEntries
node tools/test-advisor.mjs                     # 101 ✓
node t4-verify.mjs dist ; node t4-lengths.mjs dist   # t4-verify.log, t4-dupes-jsonld.log, t4-lengths.log
node t5-patch.mjs                               # تعديلات المستوى 5 بمطابقة حرفية (CRLF-aware)
node --check netlify/functions/theft-scan.mjs tools/check-consistency.mjs tools/check-links.mjs tools/gen-image-widths.mjs
git commit  ×6  (fix(security) ×2, fix(performance), fix(accessibility), fix(maintainability), docs)
```

الفحص اليدوي في المتصفح المدمج (localhost:4356): قياس مستطيلات زرّي التكبير وزر 2D/3D وطبقات `elementsFromPoint` قبل الإصلاح وبعده على `/خريطة-تضاريس/`، وقياس لون وخلفية `#ch-map .ch-link` على `/de/` بعرض 375px.
