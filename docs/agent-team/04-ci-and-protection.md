# خطوات التنفيذ اليدوية — دفع الفحوص وحماية الإنتاج

**التاريخ:** 2026-09-03 · **من ينفّذ:** إياد.

**الحالة 2026-09-04 (محدَّثة ظهراً):** §١–§٧ **منفَّذة كلها**. دُمج #6 (‏`9979bd8`) فصارت workflows الثلاثة على `main`، ثم طُبِّقت قاعدة `main protection` بالـCLI — **ruleset 22260725، enforcement active**. الاختبار الحي: دفعٌ مباشر من فرع مؤقت `git push origin HEAD:main` **رُفض** بـ`GH013: Repository rule violations found for refs/heads/main` («Changes must be made through a pull request» + «Required status check "Build & consistency checks" is expected»)، وحُذف الفرع المؤقت. وحُدِّث #7 و#8 من `main` بـ`gh pr update-branch` فعمل عليهما الفحص الإلزامي ونجح (‏7m29s و5m37s). و§٦ كانت مفعّلة أصلاً (ظهرت معاينة النشر على #6 تلقائياً). **المرحلة (أ) مغلقة**، ودُمج #7 و#8 بالطريق النظامي (سجل rule-suites: pass بلا التفاف). **المرحلة (ب) مفتوحة** بتأكيد إياد §٦ مساء 2026-09-04 (التفصيل في آخر §٦).

---

## ١. اكتشاف يختصر الطريق

`CLAUDE.md` يسجّل أن الدفع إلى `.github/workflows/` مرفوض لأن رمز git على هذا الجهاز بلا نطاق `workflow`. الفحص اليوم يكشف أن الصورة أدقّ:

```
$ gh auth status
  ✓ Logged in to github.com account eyad62689-lab (keyring)
    Token scopes: 'gist', 'read:org', 'repo', 'workflow'      ← النطاق موجود

$ git config --get-all credential.helper
  manager                                                      ← لكن git لا يستعمله
```

**رمزان لا رمز واحد:**
- رمز **`gh` CLI** — في keyring، **ويحمل `workflow`**.
- رمز **Git Credential Manager** — في Windows Credential Manager، وهو ما يدفع به `git push`، **وهو الذي ينقصه النطاق**.

فالحلّ ليس دورة تفويض جديدة، بل **توجيه git إلى الرمز الذي يملك النطاق أصلاً**.

---

## ٢. دفع فرع الفحوص — الطريق الأقصر

### الخطوة ١: وجّه git إلى بيانات اعتماد `gh`

```bash
gh auth setup-git
```

يضبط `credential.https://github.com.helper` على `gh auth git-credential`، فتستعمل كل دفعة قادمة رمز `gh` بنطاقاته الأربعة.

### الخطوة ٢: تأكّد أنه طُبّق

```bash
git config --get-all credential.https://github.com.helper
```

يجب أن يظهر `!gh auth git-credential` (أو ما يعادله). إن لم يظهر شيء، انتقل إلى §٣.

### الخطوة ٣: ادفع الفرع

```bash
git -C "C:/Users/truyr/OneDrive/Documents/Claude/Projects/Visit-Alahsa/astro-site" push -u origin ci/restore-security-checks
```

### الخطوة ٤: افتح طلب دمج

```bash
gh pr create --repo eyad62689-lab/visit-alahsa --base main --head ci/restore-security-checks --title "استعادة خط الفحوص الأمنية + بوابة بناء على كل طلب دمج" --body "يعيد CodeQL وSemgrep من الفرع المنظّف، ويضيف Snyk محروساً بالسرّ، وbuild.yml بوابةً على كل طلب دمج. التفاصيل في رسالة الالتزام و docs/agent-team/04-ci-and-protection.md."
```

**لا تدمجه فوراً.** انتظر أن تعمل الفحوص على طلب الدمج نفسه — فهذا أول دليل عملي أنها تشتغل.

---

## ٣. إن فشلت §٢ — الطريق الاحتياطي

إن ظهرت الرسالة:

```
refusing to allow an OAuth App to create or update workflow `.github/workflows/build.yml` without `workflow` scope
```

فمعناه أن git ما يزال يستعمل رمز GCM. عالجه بأحد أمرين:

**(أ) جدّد نطاقات `gh` ثم أعد ربط git** — يفتح المتصفح مرة واحدة:

```bash
gh auth refresh -h github.com -s workflow
```

ثم أعد `gh auth setup-git` والدفع.

**(ب) امسح بيانات GCM القديمة** فيُعاد التفويض من الصفر عند أول دفعة:

Windows ← **إدارة بيانات الاعتماد** (Credential Manager) ← *بيانات اعتماد Windows* ← احذف كل مدخل يبدأ بـ`git:https://github.com`. ثم `git push` ووافق في المتصفح مع بقاء خانة **workflow** مؤشَّرة.

---

## ٤. ما الذي يُدفع بالضبط

الفرع `ci/restore-security-checks` (الالتزام `289b618`) — **ثلاثة ملفات، لا شيء غيرها**:

| الملف | المحتوى | يُفشل الدمج؟ |
|---|---|---|
| `.github/workflows/security-scans.yml` | مستعاد حرفياً من الفرع المحلي `security-workflow-cleanup`: CodeQL (‏`security-extended` + `security-and-quality`) و Semgrep في حاوية مثبّتة، مع تعليق ملخّص على طلب الدمج | لا — النتائج تذهب إلى تبويب Security |
| `.github/workflows/snyk.yml` | **جديد لا منسوخ.** Snyk بالـCLI الرسمي بإصدار مثبّت (1.1307.0) بدل `snyk/actions/setup@master` المتغيّر، ومحروس بوجود `SNYK_TOKEN`: بلا السرّ يُتخطّى بنظافة | لا |
| `.github/workflows/build.yml` | `npm run build` كاملاً على كل طلب دمج — 47 حالة اختبار، `astro check`، البناء، pagefind، فاحص التضارب | **نعم** — وهذا المقصود |

**تحقّق أُجري قبل الالتزام:** الملفات الثلاثة مرّت `yaml.parse` بنجاح، و`npm run build` أخضر على الفرع (306 صفحة · 16 سطر فحص).

**سرّان اختياريان** — كلاهما يُتخطّى بنظافة إن غاب، فلا شيء يمنع الدمج بدونهما:
- `SNYK_TOKEN` — من app.snyk.io ← Account settings ← Auth Token.
- `SEMGREP_APP_TOKEN` — يعمل Semgrep بلا حساب أيضاً.

يُضافان من: Settings ← *Secrets and variables* ← *Actions* ← **New repository secret**.

---

## ٥. حماية الفرع `main`

> **لا تفعّلها قبل أن تنجح `build.yml` مرة واحدة على طلب دمج فعلي.** قبل ذلك لن يكون الفحص مسجَّلاً في قائمة GitHub، ولن تجد ما تختاره في الخطوة ٥.

**المسار:** `https://github.com/eyad62689-lab/visit-alahsa` ← **Settings** ← **Branches** ← *Add branch ruleset* (أو *Add classic branch protection rule*).

### بقواعد الفروع الحديثة (Rulesets) — المفضّل

1. **Ruleset Name:** `main protection` · **Enforcement status:** `Active`.
2. **Target branches** ← *Add target* ← **Include default branch**.
3. فعّل **Restrict deletions** و**Block force pushes**.
4. فعّل **Require a pull request before merging**:
   - *Required approvals:* **1**
   - ✅ *Dismiss stale pull request approvals when new commits are pushed*
5. فعّل **Require status checks to pass**:
   - ✅ *Require branches to be up to date before merging*
   - ← *Add checks* ← ابحث عن **`Build & consistency checks`** واخترها.
   - **هذا الاسم حرفي** — هو `jobs.build.name` في `build.yml`. تغييره في الملف يكسر القاعدة **بصمت**: تبقى القاعدة تنتظر فحصاً لم يعد له وجود، فلا يُدمج شيء أبداً.
   - *(اختياري)* أضف `CodeQL` و`Semgrep` إن أردتهما حاجزين — التوصية: **لا**. اتركهما تقريريين لئلا يوقف اكتشافٌ في تبعية إصلاحاً عاجلاً في المحتوى.
6. **Bypass list:** أضف نفسك (‏*Repository admin*) — وإلا حجبت نفسك عن إصلاح عاجل. الالتفاف يبقى مسجَّلاً في سجل التدقيق.
7. **Create**.

### الطريق الآلي — الملف الجاهز `main-protection.ruleset.json`

الخطوات السبع أعلاه مكتوبة كاملةً في [`main-protection.ruleset.json`](main-protection.ruleset.json) بجوار هذه الوثيقة (موافقات **0** وإسقاط الموافقات القديمة عند الدفع، والفحص مقيَّد بتطبيق GitHub Actions `integration_id: 15368` كي لا ينتحله فحص خارجي بالاسم نفسه، والالتفاف لدور *Repository admin* — معرّفه 5 — **عبر طلب دمج فقط** `bypass_mode: pull_request`: كل الجلسات تدفع بحساب المالك، فالالتفاف الدائم `always` كان سيُبقي الدفع المباشر إلى `main` مفتوحاً وتصير القاعدة شكلية). التطبيق والتحقق:

```bash
gh api -X POST repos/eyad62689-lab/visit-alahsa/rulesets --input docs/agent-team/main-protection.ruleset.json
gh api repos/eyad62689-lab/visit-alahsa/rulesets --jq '.[] | {id, name, enforcement}'
```

**قيسَ 2026-09-04 قبل التطبيق**: الفحص `Build & consistency checks` مسجَّل عند GitHub على رأس طلب الدمج #6 من التطبيق 15368 بنتيجة `success` — فالشرط في رأس هذا الباب («لا تفعّلها قبل أن تنجح مرة») مستوفى.

**طُبِّقت 2026-09-04 بعد دمج #6**: الأمر الأول أعاد `id: 22260725` و`enforcement: active` بالقواعد الأربع (‏deletion · non_fast_forward · pull_request · required_status_checks) والالتفاف `pull_request` لدور 5؛ والثاني أكّد وجودها وحيدةً في المستودع. وأثبت الاختبار الحي الرفض بالنص المذكور في سطر الحالة أعلاه.

**أثر جانبي مقيس على الطلبات المفتوحة**: `strict` يشترط أن يكون الفرع محدَّثاً مع `main`، وملفات workflow لا تعمل على طلبٍ فرعُه لا يحملها. فبعد دمج #6 احتاج كل طلب مفتوح (‏#7 و#8) إلى تحديث فرعه — **نُفِّذ 2026-09-04 ونجح الفحص عليهما** — من `main` — `gh pr update-branch <n> --repo eyad62689-lab/visit-alahsa` (الأمر الأصلي في gh؛ نداء الـAPI المباشر بـ`PUT .../pulls/<n>/update-branch` يؤدي الغرض نفسه لكنه يقع تحت مصنّف الأذونات في auto mode) — فيعمل الفحص عليه ويصير قابلاً للدمج.

### أثرٌ يجب أن تعرفه قبل التفعيل

الدفع المباشر إلى `main` **ينتهي**. كل تغيير — بما فيه سطر واحد في ملف محتوى — يصير: فرع ← طلب دمج ← بناء أخضر ← موافقة ← دمج.

**وأنت المالك الوحيد**، فـ«موافق واحد» تعني أن تفتح الطلب وتوافق عليه بنفسك. GitHub يمنع الموافقة على طلبك أنت في المستودعات المنظَّمة، لكنه يسمح بها للمالك الفرد. **إن أعاقك ذلك فاضبط *Required approvals* على `0`** وأبقِ اشتراط طلب الدمج والفحص الأخضر — تكسب البوابة الآلية بلا حاجز بشري لا يوجد من يرفعه.

> هذا قرارك أنت: البوابة البشرية تفيد حين يعمل فريق وكلاء يقترحون تغييرات، وتعطّل حين تعمل وحدك.

---

## ٦. معاينات النشر (Deploy Previews) في Netlify

الغرض: كل طلب دمج يحصل على رابط حيّ لنسخته من الموقع، فتُراجَع الصفحة بالعين لا بقراءة الفرق.

**المسار:** `https://app.netlify.com/projects/visit-ahsa` ← **Site configuration** ← **Build & deploy** ← **Continuous deployment**.

1. **Branches and deploy contexts** ← *Configure*:
   - *Production branch:* `main`
   - *Deploy Previews:* اختر **Any pull request against your production branch** ← *Save*.
2. **Deploy Preview controls** (اختياري): فعّل **Netlify Drawer** ليظهر شريط في المعاينة للتعليق ولقطات الشاشة. لا تفعّله على الإنتاج.
3. **Branch deploys:** أبقِها **None** (أو `main` وحده). كل فرع يُنشر يستهلك دقائق بناء بلا مقابل.
4. **تحقّق:** بعد فتح طلب دمج `ci/restore-security-checks` سيظهر فيه تعليق من Netlify برابط `deploy-preview-<رقم>--visit-ahsa.netlify.app`. افتحه — إن عمل فالإعداد صحيح.

### تنبيهان مقيسان

- **الأسرار لا تنتقل تلقائياً إلى المعاينات.** إن كانت متغيرات البيئة محصورة بسياق `production`، فمعاينات النشر ستُبنى بلا `GOOGLE_PLACES_API_KEY` (تقييمات ناقصة — لا يُفشل البناء) وبلا `IP_HASH_SALT` (الحماية تخزّن بلا بصمة IP). راجع نطاق كل متغير في *Environment variables* ← عمود *Scopes*.
### تأكيد إياد من لوحة التحكم — 2026-09-04 مساءً

- **Deploy Previews**: لكل طلب دمج على `main`. **Branch deploys**: None.
- **سياسة المتغيرات الحساسة**: *Require approval* — مؤكَّدة بإشعارات deploy request (pending/accepted/rejected).
- **الأسرار**: `RESEND_API_KEY` و`SERPER_API_KEY` صارا *Secret* بنطاق Functions وقيمة في Production فقط. `GITHUB_TOKEN` حُذفت قيمتاه في Deploy Previews وBranch deploys. `IP_HASH_SALT` صار *Secret* بتوزيعه الحالي.
- **تصحيح للتنبيه أعلاه**: `GOOGLE_PLACES_API_KEY` **يبقى متاحاً في Deploy Previews** لأنه يُستهلك وقت البناء (‏`prebuild` ← `tools/fetch-places.mjs`)، وحصره في Production الآن يُفشل بناء المعاينات. الحلّ بنداً مستقلاً بطلب دمج مستقل (الطابور في `../خطة-العمل-والتنفيذ.md`): السكربت يتخطّى نداء Places API حين `CONTEXT !== 'production'` **ثم** يُحصر المفتاح. **قيد يصحّح صياغة البند**: `places-live.json` في `.gitignore` بشرط قوقل (لا تخزين للتقييمات والمواعيد)، فليست في المستودع «بيانات مخزّنة» تُستعمل بديلاً — المعاينات ستُبنى **بلا تقييمات** كما يفعل السكربت أصلاً عند غياب المفتاح (يحذّر ولا يُفشل)، و`place-ids.json` وحده المخزَّن.
- **المتغيرات الفعلية في Netlify ستة** (‏`GOOGLE_PLACES_API_KEY` · `IP_HASH_SALT` · `SERPER_API_KEY` · `RESEND_API_KEY` · `ALERT_EMAIL_TO` · `ALERT_EMAIL_FROM`). **لا `NETLIFY_AUTH_TOKEN` في Netlify** — هو و`NETLIFY_SITE_ID` محليان لسكربت `pull-reports.mjs` فقط، كما تقول `00-current-state.md`، و`.env.example` يدرجهما لهذا الغرض لا لأنهما على المنصة.

- **إضافة IndexNow تعمل عند `onSuccess`** — وهو يشمل معاينات النشر مبدئياً. راقب أول معاينة: إن أُشعِر IndexNow بروابط معاينة فاضبط `INDEXNOW_DRY_RUN=1` **بنطاق Deploy Previews وحده** (الأسماء والأغراض في `../../.env.example`).

---

## ٧. ترتيب التنفيذ الموصى به

| # | الخطوة | لماذا هذا الترتيب |
|---|---|---|
| 1 | `gh auth setup-git` ثم دفع `ci/restore-security-checks` | لا شيء يعمل قبل وصول الملفات إلى GitHub |
| 2 | افتح طلب الدمج **ولا تدمجه** | أول دليل عملي أن الفحوص تشتغل |
| 3 | فعّل Deploy Previews (‏§٦) | يظهر أثرها على طلب الدمج نفسه فوراً |
| 4 | راجع نتائج الفحوص الثلاثة على الطلب | إن سقط شيء فالإصلاح قبل الإلزام لا بعده |
| 5 | ادمج الطلب | `main` صار محمياً بفحص عامل |
| 6 | فعّل حماية الفرع (‏§٥) | **بعد** ظهور `Build & consistency checks` في قائمة GitHub |
| 7 | *(اختياري)* أضف `SNYK_TOKEN` | Snyk نائم بنظافة حتى ذلك الحين |

**فرعان آخران بانتظارك** خارج هذه الوثيقة:
- `feature/german-integration` — **مدفوع** (‏33 ملفاً، بناء أخضر). ينتظر مراجعتك ولم يُدمج.
- `chore/agent-team-groundwork` — **غير مدفوع** (وثائق مرحلة صفر و`.env.example`). قل لي إن أردت دفعه.
