import fs from 'node:fs';
const b = JSON.parse(fs.readFileSync('batch.json','utf8'));
const d = JSON.parse(fs.readFileSync('stage-1-5-draft.json','utf8')).items;
fs.writeFileSync('stage-6-blind-reader.json', JSON.stringify({reader:'fresh subagent, Russian text only (the two changed items), not told translation', observations:14, high:[1,2,3], summary:{
 1:'A says go in the morning because the souq closes by noon, never says it reopens; B says evening is best — reader cannot tell morning vs evening (high)',
 2:'four stops listed, but two temporarily closed and the fortress closes in the afternoon/Fridays — what can I see? (high)',
 3:'Friday morning: nothing open, no advice for the rest of the route (high)',
 4:'names in sentences 2–4 not tied to the descriptions in sentence 1',
 5:'ungoverned nominative list after colon in sentence 1',
 6:'is the «крытый рынок» the same as Эль-Кайсария?',
 7:'«во второй половине дня» vague, no exact time',
 8:'sentence 3 restates «вечером … на вечер»; «Однако» weak',
 9:'«сейчас временно закрыты» no time frame',
 10:'register: «кипит жизнь», «Точки маршрута», «пешком утром» adverb stack',
 11:'Эль- vs Аль- inconsistency',
 12:'B best-time advice clashes with A (same as 1)',
 13:'B time format «утром 8:00–11:30» vs «с … до …»',
 14:'B «вход свободный» museum-like'}},null,2));
const rulings = [
 {n:1,ruling:'source issue',note:'the changed sentence mirrors EN/AR exactly (morning, before the souq closes at midday); neither says the souq reopens at 16:00 or reconciles with the FAQ «evenings are the best time». Adding the reopening would go beyond the source sentence; raised to owner.'},
 {n:12,ruling:'source issue',note:'same as 1 (B mirrors EN/AR «Evenings are the best time»).'},
 {n:7,ruling:'rejected',note:'«во второй половине дня» = EN «in the afternoon» / AR عصراً; exact 16:00 is on the attraction card, not in this sentence; not added.'},
 {n:10,ruling:'rejected (part on changed sentence)',note:'«обойти их лучше пешком утром:» is idiomatic; the rest is pre-existing approved text.'},
 {n:'2,3',ruling:'source issue (already raised in hours-google-1)',note:'closed sites / Friday morning guidance not in source; not invented.'},
 {n:'4,5,6,8,9,11,13,14',ruling:'deferred',note:'pre-existing approved text outside this batch scope.'}];
fs.writeFileSync('stage-7-judge.json', JSON.stringify({score:92,axes:{accuracy:29,naturalness:26,compliance:19,fit:8,structure:10},threshold:90,loops:1,decision:'APPROVE',judge_changes:0,rulings,checks:['only the scoped sentence changed in each item (diff vs current_target)','«к полудню»/«во второй половине дня» match AR ظهراً/عصراً; no new fact','Каср-Ибрахим, Эль-Кайсария per termbase; U+2014 untouched; Latin digits','no termbase change']},null,2));
fs.writeFileSync('final.json', JSON.stringify({score:92,items:d},null,2)+'\n');
// TM
const tmP='../../memory/tm.json'; const tm=JSON.parse(fs.readFileSync(tmP,'utf8'));
const tag='hours-google-2 2026-11-17';
for (const p of tm.pairs) if ((p.field in d) && p.note==='hours-google-1 (ru)' && !p.superseded_by) p.superseded_by=tag;
const en = {'trail.historic-hofuf.intro':b.items[0].source_en,'plan.faq.qaisariyah':b.items[1].source_en.match(/a: `([^`]*)`/)[1]};
const page = {'trail.historic-hofuf.intro':'src/data/trails.ru.json trail historic-hofuf intro (edit minimally)','plan.faq.qaisariyah':'src/components/views/PlanTripView.astro ru Qaisariyah FAQ a: (second sentence only)'};
for (const k of Object.keys(d)) tm.pairs.push({en:en[k],ru:d[k],page:page[k],field:k,date:'2026-11-17',note:'hours-google-2 (ru)'});
fs.writeFileSync(tmP, JSON.stringify(tm,null,2)+'\n');
fs.appendFileSync('../../memory/scores.csv','"hours-google-2 (ru): trail intro timing sentence + Qaisariyah FAQ best-time sentence, 2 strings",2026-11-17,1,92,"APPROVE 92 (29/26/19/8/10; one sentence each; blind reader 14 observations: 0 applied, 2 rejected, 8 deferred out of scope, 4 source issues (trail says go in the morning before the souq closes at midday but never that it reopens at 16:00, vs FAQ evenings best; closed sites; Friday morning); no termbase change; 2 TM pairs superseded)"\r\n');
