import fs from 'node:fs';
const b = JSON.parse(fs.readFileSync('batch.json','utf8'));
const cur = Object.fromEntries(b.items.map(i=>[i.id,i.current_target]));
const plan_cur = 'Рынок работает утром 8:00–12:00 и вечером 15:30–22:00 (по пятницам — только вечером), вход свободный. Лучшее время — вечер, когда открываются лавки и рынок оживает.';
const d = {
 'qaisariyah.hours': 'Сб–чт 8:00–11:30 и 16:00–23:00 · пт 16:00–23:00',
 'qaisariyah.faq.hours': 'С субботы по четверг с 8:00 до 11:30 и с 16:00 до 23:00, в пятницу — только с 16:00 до 23:00.',
 'qasr-ibrahim.hours': 'Сб–чт 8:00–16:00 · пт — выходной',
 'qasr-ibrahim.faq.hours': 'С субботы по четверг 8:00–16:00, в пятницу — выходной.',
 'plan.faq.qaisariyah': 'С субботы по четверг рынок работает утром 8:00–11:30 и вечером 16:00–23:00, по пятницам — только вечером, 16:00–23:00; вход свободный. Лучшее время — вечер, когда открываются лавки и рынок оживает.',
 'blog24.ibrahim-bayah': cur['blog24.ibrahim-bayah'].replace('внутреннего двора. Рядом', 'внутреннего двора. По пятницам крепость закрыта. Рядом').replace(/сегодня в доме музей\.$/, 'сегодня в доме музей, но сейчас он временно закрыт.'),
 'blog24.tip48': cur['blog24.tip48'].replace('в нем есть еще школа «Эль-Амирия», ферма', 'в нем есть еще ферма'),
 'blog48.ibrahim': cur['blog48.ibrahim'] + ' По пятницам крепость закрыта.',
 'blog48.bayah-amiriya': cur['blog48.bayah-amiriya'].replace('сегодня в доме музей. Затем', 'сегодня в доме музей, но сейчас он временно закрыт. Затем').replace(/сегодня — дом культуры\.$/, 'сегодня — дом культуры; школа тоже временно закрыта.'),
 'trail.historic-hofuf.intro': cur['trail.historic-hofuf.intro'].replace('Однако по пятницам рынок Эль-Кайсария открыт только вечером, поэтому в этот день оставьте его на вечер.', 'Однако по пятницам Каср-Ибрахим закрыт, а рынок Эль-Кайсария открыт только вечером, поэтому в этот день оставьте рынок на вечер. Байт-эль-Бая и школа «Эль-Амирия» сейчас временно закрыты.'),
};
for (const [k,v] of Object.entries(d)) { const base = k==='plan.faq.qaisariyah'?plan_cur:cur[k]; if (v===base) console.log('UNCHANGED',k); }
fs.writeFileSync('stage-1-5-draft.json', JSON.stringify({plan_faq_current_target_actual: plan_cur, items:d},null,2));
console.log(Object.values(d).join('\n\n'));
