import fs from 'node:fs';
const dir='output/hours-google-1/';
const b=JSON.parse(fs.readFileSync(dir+'batch.json','utf8'));
const dr=JSON.parse(fs.readFileSync(dir+'stage-1-5-draft.json','utf8'));
const it={...dr.items};
it['blog24.ibrahim-bayah']=it['blog24.ibrahim-bayah'].replace('музей, но сейчас он временно закрыт.','музей, но он временно закрыт.');
it['blog48.bayah-amiriya']=it['blog48.bayah-amiriya'].replace('музей, но сейчас он временно закрыт.','музей, но он временно закрыт.').replace('дом культуры; школа тоже временно закрыта.','дом культуры, но и он временно закрыт.');
for (const i of b.items) if(!(i.id in it)) throw new Error('missing '+i.id);
const rulings=[
 {n:1,ruling:'source issue',note:'«когда открываются лавки» vs morning hours 8:00–11:30: pre-existing sentence, kept as published per batch scope; mirrors EN/AR «when the shops open». Raised to owner.'},
 {n:2,ruling:'rejected',note:'«вход свободный» is in source (Entry is free).'},
 {n:3,ruling:'rejected',note:'each item keeps its own previously approved format (minimal-change rule).'},
 {n:6,ruling:'applied',note:'dropped «сейчас» after «сегодня» in both blogs: «сегодня в доме музей, но он временно закрыт».'},
 {n:7,ruling:'source issue',note:'what to do at temporarily closed sites (exterior viewing?) not stated in source; not invented.'},
 {n:13,ruling:'applied',note:'«школа тоже временно закрыта» → «дом культуры, но и он временно закрыт» (what is closed is now unambiguous; AR: وهي أيضاً مغلقة).'},
 {n:14,ruling:'source issue',note:'same as 7.'},
 {n:18,ruling:'source issue',note:'trail intro still advises morning or late afternoon; with new hours fortress closes 16:00 and souq morning shift ends 11:30. Pre-existing sentence unchanged by EN/AR; raised to owner.'},
 {n:19,ruling:'rejected/source',note:'«Однако…оставьте рынок на вечер» mirrors source («save it for the evening»); «рынок» instead of «его» kept to avoid antecedent clash with inserted Каср-Ибрахим. Friday-morning-nothing-open raised to owner with 18.'},
 {n:20,ruling:'source issue',note:'same as 7.'},
 {n:'4,5,8,9,10,11,12,15,16,17,21',ruling:'deferred',note:'pre-existing approved text outside this batch scope.'}
];
fs.writeFileSync(dir+'stage-6-blind-reader.json',JSON.stringify({reader:'fresh subagent, Russian text only, not told translation',observations:21,high:[1,13,18]},null,2));
fs.writeFileSync(dir+'stage-7-judge.json',JSON.stringify({score:92,axes:{accuracy:29,naturalness:26,compliance:19,fit:8,structure:10},loops:1,decision:'APPROVE',rulings,note_batch_defect:'plan.faq.qaisariyah: batch.json source_en/authority_ar/current_target point at the wrong FAQ entries (q «ما هي أبرز الأماكن» / «Is Al-Ahsa worth visiting?»). Translated the real target: PlanTripView ru Qaisariyah FAQ a: (line «Когда открывается рынок Эль-Кайсария в Аль-Ахсе?»), source EN line 144 and AR line 96 of the worktree; value below is the a: string only, second sentence kept as published.'},null,2));
fs.writeFileSync(dir+'final.json',JSON.stringify({score:92,items:it},null,2));
const tm=JSON.parse(fs.readFileSync('memory/tm.json','utf8'));
const planEn='From Saturday to Thursday the souq trades in the morning from 8 to 11:30 am and in the evening from 4 to 11 pm; on Fridays it opens in the evening only, from 4 to 11 pm. Entry is free. Evenings are the best time, when the shops open and the market comes alive.';
for (const i of b.items){ const en=i.id==='plan.faq.qaisariyah'?planEn:i.source_en;
  for (const p of tm.pairs) if (p.page===i.where && !p.superseded_by && p.field===i.id) p.superseded_by='hours-google-1';
  tm.pairs.push({en,ru:it[i.id],page:i.where,field:i.id,date:'2026-11-17',note:'hours-google-1 (ru)'}); }
fs.writeFileSync('memory/tm.json',JSON.stringify(tm,null,2)+'\n');
fs.appendFileSync('memory/scores.csv','"hours-google-1 (ru): owner ruling 2026-11-17 hours per Google Maps, 10 strings",2026-11-17,1,92,"APPROVE 92 (29/26/19/8/10; minimal edits to approved text; blind reader 21 observations: 2 applied, 3 rejected, 11 deferred out of scope, 5 source issues to owner (trail intro morning/late-afternoon advice vs new hours, Friday-morning nothing open, closed sites with no exterior-viewing guidance, «когда открываются лавки» vs morning hours); batch.json plan.faq.qaisariyah fields mis-pointed, real FAQ translated; no termbase change)"\n');
console.log(JSON.stringify(it,null,1));
