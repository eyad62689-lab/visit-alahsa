// اختبارات المستشار الذكي — منطق core.mjs الصافي بلا شبكة، وبطاقة المعرفة المولَّدة إن وُجدت.
// التشغيل: node tools/test-advisor.mjs   (بعد npm run build لاختبار البطاقة الفعلية، وإلا تُستعمل بطاقة مصغّرة)
// حلقة التحقق تُكسر عمداً في المنتصف (طلب مشوّه، سطر روابط ناقص، تجاوز السقف) لتثبت أن الحارس يمسكها.

import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateRequest, renderKb, buildSystem, pageContext, storeRotation, extractLinks, resolveCards,
  estimateCostUsd, bump, readSpend, addSpend, memoryStore, LIMITS, LANGS, originAllowed, ipBucket, usageStat, classifyTopics,
} from '../netlify/functions/advisor/core.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
let passed = 0; const failures = [];
const ok = (cond, label, extra = '') => { if (cond) { passed++; console.log(`  ✓ ${label}`); } else { failures.push(label); console.log(`  ✗ ${label}${extra ? ' — ' + extra : ''}`); } };

// ── بطاقة: الفعلية من postbuild إن وُجدت، وإلا مصغّرة ──────────────────────────
const KB_PATH = join(ROOT, 'netlify', 'functions', 'advisor', 'kb.generated.json');
const MINI = { entries: [
  { id: 'jabal-al-qarah', kind: 'attraction', name: { ar: 'جبل القارة', en: 'Jabal Al-Qarah', ur: 'جبل القارہ' }, href: { ar: '/معالم/جبل-القارة/', en: '/en/attractions/jabal-al-qarah/' }, summary: { ar: 'كهوف', en: 'Caves' }, facts: [{ label: { ar: 'المواعيد', en: 'Hours' }, value: { ar: 'يومياً 8:00 ص – 11:00 م', en: 'Daily 8:00 am – 11:00 pm' } }], faq: [], pending: false, img: '/img/jabal-al-qarah-400w' },
  { id: 'mushaqar', kind: 'attraction', name: { ar: 'مشقر', en: 'Mushaqar' }, href: { ar: '/معالم/مشقر/', en: '/en/attractions/mushaqar/' }, pending: true },
  { id: 'page/plan', kind: 'page', name: { ar: 'خطّط لرحلتك', en: 'Plan your trip' }, href: { ar: '/خطط/', en: '/en/plan-your-trip/' } },
] };
const kb = existsSync(KB_PATH) ? JSON.parse(readFileSync(KB_PATH, 'utf8')) : MINI;
console.log(existsSync(KB_PATH) ? `· البطاقة الفعلية: ${kb.entries.length} مدخلاً` : '· بطاقة مصغّرة (لا kb.generated.json بعد)');

console.log('\n[1] validateRequest');
const good = { lang: 'ar', page: '/معالم/جبل-القارة/', messages: [{ role: 'user', content: 'متى يفتح؟' }] };
ok(validateRequest(good).ok, 'طلب سليم يُقبل');
ok(!validateRequest({ ...good, lang: 'fr' }).ok, 'لغة خارج الست تُرفض');
ok(!validateRequest({ ...good, messages: [] }).ok, 'بلا رسائل يُرفض');
ok(!validateRequest({ ...good, messages: [{ role: 'assistant', content: 'x' }] }).ok, 'أول دور ليس الزائر يُرفض');
ok(!validateRequest({ ...good, messages: [{ role: 'user', content: 'a' }, { role: 'user', content: 'b' }] }).ok, 'دوران متتاليان للزائر يُرفضان');
ok(!validateRequest({ ...good, messages: [{ role: 'user', content: 'x'.repeat(LIMITS.maxUserChars + 1) }] }).ok, 'رسالة أطول من الحد تُرفض');
ok(!validateRequest({ ...good, messages: Array.from({ length: LIMITS.maxMessages + 1 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: 'x' })) }).ok, 'أدوار أكثر من الحد تُرفض');
ok(!validateRequest({ ...good, messages: [{ role: 'user', content: { $: 1 } }] }).ok, 'محتوى غير نصّي يُرفض');
ok(!validateRequest({ ...good, messages: [{ role: 'constructor', content: 'x' }] }).ok && !validateRequest({ ...good, messages: [{ role: 'toString', content: 'x' }] }).ok, 'دور باسم خاصية من النموذج الأولي يُرفض');
const long = validateRequest({ ...good, page: '/x'.repeat(400) });
ok(long.ok && long.page.length === LIMITS.maxPathChars, 'المسار الطويل يُقصّ لا يُرفض');

console.log('\n[2] renderKb / buildSystem / pageContext');
for (const lang of LANGS) {
  const text = renderKb(kb, lang);
  ok(text.includes('### ATTRACTIONS') && text.includes('[jabal-al-qarah]'), `بطاقة ${lang} تحمل المعالم ومعرّفاتها`);
  ok(!/[٠-٩۰-۹]/.test(text), `بطاقة ${lang} بأرقام لاتينية`);
}
const ar = renderKb(kb, 'ar');
ok(ar.includes('جبل القارة') && !ar.includes('Jabal Al-Qarah (English only)'), 'العربية باسمها لا الإنجليزي');
ok(/\[mushaqar\][\s\S]*?NOT PUBLISHED/.test(ar), 'المعلم بلا بند موثّق موسوم NOT PUBLISHED');
const firstRender = renderKb(kb, 'ar');
const secondRender = renderKb(kb, 'ar');
ok(firstRender === secondRender, 'الصياغة حتمية (شرط الخزن المؤقت)');
const sys = buildSystem('ur', 'KB');
ok(sys.length === 2 && sys.every((b) => b.cache_control?.type === 'ephemeral'), 'كتلتا نظام مخزَّنتان');
ok(sys[0].text.includes('Reply in Urdu') && sys[0].text.includes('Latin digits'), 'القواعد تسمّي اللغة وتُلزم بالأرقام اللاتينية');
ok(sys[0].text.includes('Never invent') && sys[0].text.includes('[[links:'), 'القواعد تمنع الاختلاق وتطلب سطر الروابط');
ok(pageContext(kb, 'ar', '/معالم/جبل-القارة/?x=1#y').includes('[jabal-al-qarah]'), 'سياق الصفحة يطابق الرابط بلا استعلام أو علامة');
ok(pageContext(kb, 'ar', '/لا-شيء/') === '', 'صفحة بلا مدخل → بلا سياق');

console.log('\n[2b] storeRotation');
const first = storeRotation(kb, 'ar', () => 0);
const dates = kb.entries.filter((e) => e.kind === 'store' && e.category === 'dates');
ok(first.startsWith('(Only if the visitor asks where to buy') && first.endsWith('\n'), 'التشكيلة سطر شرطي يسبق رسالة الزائر');
ok(dates.slice(0, 3).every((e) => first.includes(`[${e.id}] ${e.name.ar}`)), 'بلا عشوائية: أول ثلاثة متاجر تمور بترتيب البطاقة');
const lastPick = storeRotation(kb, 'ar', (max) => max - 1);
ok(lastPick !== first && lastPick.includes(`[${dates.at(-1).id}]`), 'اختيار آخر: تشكيلة مختلفة تبدأ بآخر متجر تمور');
ok((first.match(/\[store\//g) || []).length === 7, '3 تمور + 2 حرف + 2 منتجات أخرى = 7 معرّفات');
ok(storeRotation({ entries: kb.entries.filter((e) => e.kind !== 'store') }, 'ar') === '', 'بلا متاجر → بلا سطر');
ok(storeRotation(kb, 'ur', () => 0).includes(`[${dates[0].id}] ${dates[0].name.ur ?? dates[0].name.en}`), 'الأوردو: الاسم بلغتها وإلا الإنجليزية');

console.log('\n[3] extractLinks / resolveCards');
let r = extractLinks('جبل القارة يفتح يومياً.\n\n[[links: jabal-al-qarah, page/plan]]');
ok(r.clean === 'جبل القارة يفتح يومياً.' && r.ids.join() === 'jabal-al-qarah,page/plan', 'سطر الروابط يُفصل ويُقرأ');
r = extractLinks('نصّ بلا روابط');
ok(r.clean === 'نصّ بلا روابط' && r.ids.length === 0, 'بلا سطر روابط → نصّ كما هو');
r = extractLinks('x [[links: a, a, b, c, d]]');
ok(r.ids.length === 3 && r.ids[0] === 'a' && r.ids[1] === 'b', 'التكرار يُسقط والعدد يُقصّ إلى 3');
r = extractLinks('x [[LINKS:jabal-al-qarah]]');
ok(r.ids[0] === 'jabal-al-qarah', 'حالة الأحرف والمسافات لا تهم');
r = extractLinks('نصّ.\n\n[[links: [page/attractions], [post/souvenirs-guide], [page/fruits]]]');
ok(r.clean === 'نصّ.' && r.ids.join() === 'page/attractions,post/souvenirs-guide,page/fruits', 'أقواس حول كل معرّف لا تُفسد القراءة ولا تُسرّب السطر (واقعة 2026-10-24)');
r = extractLinks('نصّ [[links: "page/stores", store/alsheraa ]]');
ok(r.clean === 'نصّ' && r.ids.join() === 'page/stores,store/alsheraa', 'التنصيص والفراغات تُسقط');
r = extractLinks('أول [[links: a]] ثم [[links: b]]');
ok(r.ids.join() === 'b' && r.clean === 'أول [[links: a]] ثم', 'آخر سطر روابط هو المعتمد');
r = extractLinks('نصّ [[links: ليس-معرّفاً, page/plan]]');
ok(r.ids.join() === 'page/plan', 'ما ليس معرّفاً لاتينياً يُسقط');
const noUr = kb.entries.find((e) => e.kind === 'attraction' && e.href.en && !e.href.ur);
if (noUr) {
  const cards = resolveCards([noUr.id, 'ghost', 'page/plan'], kb, 'ur');
  ok(cards.length === 2 && cards[0].href === noUr.href.en, 'المعرّف المجهول يُسقط، والأوردو بلا صفحة تحيل إلى الإنجليزية');
} else console.log('  · كل المعالم لها صفحة أوردية — اختبار التراجع يُتخطّى');
ok(resolveCards(['jabal-al-qarah', 'ghost'], kb, 'ur').length === 1, 'المعرّف المجهول يُسقط');
ok(resolveCards(['jabal-al-qarah'], kb, 'ar')[0].name === 'جبل القارة', 'البطاقة بالاسم العربي على الصفحة العربية');

console.log('\n[3b] المتاجر الإلكترونية في البطاقة');
const stores = kb.entries.filter((e) => e.kind === 'store');
ok(stores.length === kb.counts.stores && stores.length > 0, `${stores.length} متجراً في البطاقة = العدّ المعلن`);
const dateStore = stores.find((e) => e.category === 'dates');
ok(!!dateStore && /#sec-dates$/.test(dateStore.href.ar) && /التمور/.test(dateStore.summary.ar), 'متجر تمور يحيل إلى قسم التمور في صفحة المتاجر وملخّصه يسمّي القسم');
ok(stores.every((e) => e.href.ar.startsWith('/متاجر-الأحساء-الإلكترونية/#sec-')), 'كل متجر يحيل إلى صفحة المتاجر عند قسمه');
const storesIdx = kb.entries.find((e) => e.id === 'page/stores');
ok(!!storesIdx?.summary?.ar && storesIdx.summary.ar.includes(String(stores.length)) && storesIdx.summary.ar.includes('تمور'), 'صفحة المتاجر لها ملخّص بالعدد الفعلي ويذكر التمور');
ok(renderKb(kb, 'ar').includes('### ONLINE STORES') && renderKb(kb, 'ar').includes(`[${dateStore.id}]`), 'قسم المتاجر يُعرض في نصّ البطاقة');
ok(resolveCards([dateStore.id], kb, 'ur')[0].href.endsWith('#sec-dates'), 'بطاقة المتجر بالأوردو تتراجع إلى صفحة لها نسخة مبنية مع المرساة');

console.log('\n[4] الكلفة والحدود');
const usage = { input_tokens: 1000, output_tokens: 300, cache_read_input_tokens: 40000, cache_creation_input_tokens: 0 };
const haiku = estimateCostUsd('claude-haiku-5-5', usage);
ok(Math.abs(haiku - (1000 * 0.10 + 300 * 0.5 + 40000 * 0.01) / 1e6) < 1e-9, 'كلفة Haiku تُحسب من الأسعار الأربعة');
ok(estimateCostUsd('unknown-model', usage) > haiku, 'نموذج مجهول يُقدَّر بسعر Sonnet (محافظ)');
ok(estimateCostUsd('claude-haiku-5-5', {}) === 0, 'usage فارغ → صفر لا NaN');
const st = memoryStore();
let last;
for (let i = 0; i < 3; i++) last = await bump(st, 'ip/d/h', 2);
ok(last.count === 3 && !last.allowed, 'العدّاد اليومي يرفض الرسالة الثالثة عند حد 2');
ok((await bump(st, 'ip/d/other', 2)).allowed, 'زائر آخر لا يتأثر');
ok((await readSpend(st)) === 0, 'إنفاق الشهر يبدأ من صفر');
await addSpend(st, 0.004); await addSpend(st, 0.006);
ok(Math.abs((await readSpend(st)) - 0.01) < 1e-9, 'الإنفاق يتراكم');
const broken = { async get() { throw new Error('blobs down'); }, async setJSON() { throw new Error('blobs down'); } };
const b = await bump(broken, 'k', 1);
ok(!b.allowed && b.error === true && (await readSpend(broken)) === null, 'تعطّل المخزن يُغلق الحدّ اليومي والسقف الشهري (fail closed)');

console.log('\n[4ب] الأصل ودلو العنوان');
ok(originAllowed('https://visit-alahsa.com') && originAllowed('https://www.visit-alahsa.com'), 'نطاقا الموقع مقبولان');
ok(originAllowed('https://visit-ahsa.netlify.app') && originAllowed('https://deploy-preview-225--visit-ahsa.netlify.app') && originAllowed('https://feat-x--visit-ahsa.netlify.app'), 'نطاق Netlify الخاص بالموقع ومعايناته مقبولة');
ok(!originAllowed('https://evil.netlify.app') && !originAllowed('https://visit-ahsa.netlify.app.evil.com') && !originAllowed('https://xvisit-ahsa.netlify.app'), 'موقع Netlify آخر أو نطاق مشابه يُرفض');
ok(!originAllowed('') && !originAllowed(null) && !originAllowed('not a url'), 'بلا Origin أو مشوّه → يُرفض');
ok(originAllowed('http://localhost:8788') && originAllowed('http://127.0.0.1:4331'), 'التطوير المحلي مقبول');
ok(ipBucket('203.0.113.7') === '203.0.113.7', 'IPv4 كما هو');
ok(ipBucket('2001:db8:85a3:8d3:1319:8a2e:370:7348') === '2001:db8:85a3:8d3::/64', 'IPv6 يُجمَّع على /64');
ok(ipBucket('2001:db8::1') === ipBucket('2001:db8:0:0:ffff::9') && ipBucket('2001:db8::1') === '2001:db8:0:0::/64', 'الصيغة المختصرة :: تُفكّ قبل التجميع');
const loop6 = ipBucket('::1');
ok(ipBucket('[::1]') === loop6 && loop6.endsWith('::/64') && loop6.startsWith('0:0:0:0'), 'loopback IPv6 يُجمَّع كغيره والأقواس تُنزع');
const loop4 = '127.0.0.1';
ok(ipBucket(`::ffff:${loop4}`) === loop4 && ipBucket(`0:0:0:0:0:ffff:${loop4}`) === loop4, 'IPv4 المضمَّن في IPv6 يعود IPv4 (لا دلو مشترك)');
ok(ipBucket('garbage') === 'garbage' && ipBucket('') === '', 'غير الصالح يُعاد خاماً فيُجزَّأ كاملاً');

if (existsSync(KB_PATH)) {
  console.log('\n[5] البطاقة الفعلية');
  const kinds = new Set(kb.entries.map((e) => e.kind));
  ok(['attraction', 'dining', 'stay', 'post', 'event', 'trail', 'dish', 'fruit', 'page'].every((k) => kinds.has(k)), 'كل الأنواع التسعة حاضرة');
  ok(kb.entries.every((e) => e.href && Object.keys(e.href).length), 'كل مدخل له رابط واحد على الأقل');
  ok(new Set(kb.entries.map((e) => e.id)).size === kb.entries.length, 'المعرّفات فريدة');
  const qarah = kb.entries.find((e) => e.id === 'jabal-al-qarah');
  ok(qarah && !qarah.pending && qarah.facts.length >= 2, 'جبل القارة ببنديه الموثّقين وغير معلّق');
  const pending = kb.entries.filter((e) => e.kind === 'attraction' && e.pending).length;
  console.log(`  · معالم بلا مواعيد/رسوم موثّقة: ${pending} من ${kb.entries.filter((e) => e.kind === 'attraction').length}`);
  for (const lang of LANGS) {
    const n = renderKb(kb, lang).length;
    ok(n > 20_000, `بطاقة ${lang} غير فارغة (${n.toLocaleString('en')} محرفاً)`);
  }
}

console.log('\n[9] usageStat و classifyTopics — إحصاء مجهول');
ok(classifyTopics('وش أفضل مطعم للفطور؟').includes('food'), 'مطعم/فطور → food');
ok(classifyTopics('متى يفتح جبل القارة وبكم الرسوم؟').includes('hours'), 'متى/بكم/الرسوم → hours');
ok(classifyTopics('أبي أشتري تمور هدية').includes('shopping'), 'تمور/هدية → shopping');
ok(classifyTopics('سوّ لي برنامج يومين').includes('plan'), 'برنامج يومين → plan (مع الشدة)');
ok(classifyTopics('Where can I buy dates?').includes('shopping'), 'buy/dates بالإنجليزية → shopping');
ok(!classifyTopics('Is it sunday today?').includes('plan'), 'اللاتينية بالكلمة الكاملة: today لا تطابق days');
ok(classifyTopics('مرحبا').length === 0, 'تحية بلا موضوع → []');
const secret = 'رقمي 0551234567 وأبي مطعم';
const fakeCards = [{ id: 'jabal-al-qarah', kind: 'attraction', name: 'جبل القارة', href: '/x/' }];
const statObj = usageStat({ src: 'web', env: 'production', lang: 'ar', page: '/', messages: [{ role: 'user', content: secret }], cards: fakeCards, outcome: 'ok', usage: { output_tokens: 120 } });
const line = JSON.stringify(statObj);
const leaks = (l) => l.includes('0551234567') || l.includes('رقمي') || l.includes('جبل القارة') || /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(l);
ok(!leaks(line), 'سطر الإحصاء بلا نصّ السؤال ولا اسم البطاقة ولا عنوان');
ok(statObj.topics.includes('food') && statObj.ids[0] === 'jabal-al-qarah' && statObj.kinds[0] === 'attraction' && statObj.turn === 1 && statObj.out === 120, 'الحقول: مواضيع، معرّف، نوع، دور، رموز');
ok(Object.keys(statObj).sort().join() === 'env,ids,kinds,lang,out,outcome,page,src,topics,turn,v', 'مفاتيح السطر ثابتة لا يُضاف إليها حقل خفية');
ok(leaks(JSON.stringify({ ...statObj, q: secret })), 'كسر الحلقة: حقن نصّ السؤال يُمسَك');
ok(leaks(JSON.stringify({ ...statObj, ip: ['203', '0', '113', '9'].join('.') })), 'كسر الحلقة: حقن عنوان يُمسَك');

console.log(`\n${failures.length ? '✗' : '✓'} test-advisor: ${passed} ناجحاً، ${failures.length} مخفقاً`);
if (failures.length) {
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
