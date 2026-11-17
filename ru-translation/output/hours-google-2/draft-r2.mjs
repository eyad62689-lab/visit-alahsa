import fs from 'node:fs';
const f = JSON.parse(fs.readFileSync('final.json','utf8'));
const OLD = 'и обойти их лучше пешком утром: рынок Эль-Кайсария закрывается к полудню, а Каср-Ибрахим — во второй половине дня.';
const NEW = 'и обойти их лучше пешком утром: Каср-Ибрахим закрывается во второй половине дня, а рынок Эль-Кайсария — к полудню, но вечером снова открывается.';
const t = f.items['trail.historic-hofuf.intro']; if (!t.includes(OLD)) throw new Error('anchor');
const v = t.replace(OLD, NEW);
fs.writeFileSync('stage-1-5-draft-r2.json', JSON.stringify({round:2,source:'source_en_r2 / authority_ar_r2',changed_sentence:{old:OLD,new:NEW},notes:['order follows EN/AR r2: Qasr Ibrahim first, then the souq','«к полудню, но вечером снова открывается» = closes at midday and reopens in the evening / يُغلق ظهراً ثم يعود مساءً','no new fact; no termbase change'],items:{'trail.historic-hofuf.intro':v}},null,2));
console.log(v);
