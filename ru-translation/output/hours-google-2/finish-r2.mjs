import fs from 'node:fs';
const b = JSON.parse(fs.readFileSync('batch.json','utf8'));
const dr = JSON.parse(fs.readFileSync('stage-1-5-draft-r2.json','utf8')).items['trail.historic-hofuf.intro'];
const A='а рынок Эль-Кайсария — к полудню, но вечером снова открывается.', B='а рынок Эль-Кайсария закрывается к полудню и снова открывается вечером.';
if(!dr.includes(A)) throw new Error('anchor');
const v = dr.replace(A,B);
fs.writeFileSync('stage-6-blind-reader-r2.json', JSON.stringify({round:2,reader:'fresh subagent, Russian trail intro only, not told translation',observations:13,high:[3,9,11],on_changed_sentence:[6,7,8],summary:{
 1:'ungoverned list after colon',2:'covered market = Эль-Кайсария?',3:'stops not named in the list (high)',4:'«кипит жизнь» stock',5:'Эль-/Аль-',
 6:'«Точки маршрута», «пешком утром» adverb order',7:'no times for «во второй половине дня» / «вечером»',8:'elliptical «а рынок Эль-Кайсария — к полудню, но вечером снова открывается» holds three facts; read twice',
 9:'Friday sentence circular; Friday morning left hanging (high)',10:'«Однако» weak',11:'two stops closed, no exterior-viewing guidance (high)',12:'«Байт-эль-Бая» parsed as genitive',13:'«сейчас временно» redundant'}},null,2));
fs.writeFileSync('stage-7-judge-r2.json', JSON.stringify({round:2,score:92,axes:{accuracy:29,naturalness:26,compliance:19,fit:8,structure:10},threshold:90,decision:'APPROVE',judge_changes:1,changed_sentence_final:B,rulings:[
 {n:8,ruling:'applied',note:'ellipsis removed: «а рынок Эль-Кайсария закрывается к полудню и снова открывается вечером» (EN closes at midday and reopens in the evening; AR يُغلق ظهراً ثم يعود مساءً).'},
 {n:7,ruling:'rejected',note:'source sentence gives no times (afternoon / midday / evening); exact hours are on the attraction cards; not added.'},
 {n:6,ruling:'rejected/deferred',note:'«пешком утром» idiomatic and approved in round 1; «Точки маршрута» pre-existing.'},
 {n:'9,11',ruling:'source issue (already raised in hours-google-1)',note:'Friday-morning plan and closed-site guidance absent from source; not invented.'},
 {n:'1,2,3,4,5,10,12,13',ruling:'deferred',note:'pre-existing approved text outside scope.'}],
 resolves:'round-1 source issue (souq reopening) resolved by source_en_r2/authority_ar_r2; this reader did not raise the morning/evening clash.'},null,2));
const f = JSON.parse(fs.readFileSync('final.json','utf8'));
f.score = 92; f.items['trail.historic-hofuf.intro'] = v;
fs.writeFileSync('final.json', JSON.stringify(f,null,2)+'\n');
const tmP='../../memory/tm.json'; const tm=JSON.parse(fs.readFileSync(tmP,'utf8'));
for (const p of tm.pairs) if (p.field==='trail.historic-hofuf.intro' && p.note==='hours-google-2 (ru)' && !p.superseded_by) p.superseded_by='hours-google-2 r2 2026-11-17';
tm.pairs.push({en:b.items[0].source_en_r2,ru:v,page:'src/data/trails.ru.json trail historic-hofuf intro (edit minimally)',field:'trail.historic-hofuf.intro',date:'2026-11-17',note:'hours-google-2 r2 (ru)'});
fs.writeFileSync(tmP, JSON.stringify(tm,null,2)+'\n');
fs.appendFileSync('../../memory/scores.csv','"hours-google-2 r2 (ru): trail intro timing sentence after source change (souq reopens in the evening), 1 string",2026-11-17,2,92,"APPROVE 92 (29/26/19/8/10; fresh blind reader 13 observations: 1 applied (ellipsis removed in the souq clause), 2 rejected, 8 deferred out of scope, 2 source issues already raised (Friday morning, closed sites); morning/evening clash no longer raised; no termbase change; round-1 TM pair superseded)"\r\n');
console.log(v);
