// node apply.mjs <batch-dir> <final.json> [--dry]
// يطبّق النص المعتمد على المستودع: body_zh في ملفات المحتوى، وكتلة zh في قالبَي الصفحة
// المفردة (من سلاسل dv.*/sd.* مع المقفلات المنسوخة من كتلة ZH في الفهرس)، ومفتاحَي ev.shop*.
// كل مرسى يجب أن يطابق مرة واحدة بالضبط وإلا يتوقف بلا كتابة.
import fs from 'node:fs';
import path from 'node:path';

const REPO = '/home/user/visit-alahsa';
const [dir, finalFile, flag] = process.argv.slice(2);
const dry = flag === '--dry';
const pack = JSON.parse(fs.readFileSync(path.join(dir, 'pack.json'), 'utf8'));
const fin = JSON.parse(fs.readFileSync(path.join(dir, finalFile), 'utf8'));
const S = fin.strings;
const writes = [];
const once = (file, text, anchor) => {
  const n = text.split(anchor).length - 1;
  if (n !== 1) throw new Error(`${file}: المرسى يطابق ${n} مرة: ${anchor.slice(0, 60)}`);
};
const q = (s) => JSON.stringify(s); // YAML double-quoted متوافق مع JSON لهذه السلاسل

// 1) المتون
for (const [k, v] of Object.entries(pack.strings)) {
  if (!k.endsWith('.body')) continue;
  const { coll, id } = v._meta;
  const file = `${REPO}/src/content/${coll}/${id}.md`;
  let t = fs.readFileSync(file, 'utf8');
  if (/^body_zh:/m.test(t)) throw new Error(`${file}: body_zh موجود سلفاً`);
  const m = t.match(/^body_de: .*$/m);
  if (!m) throw new Error(`${file}: لا سطر body_de`);
  once(file, t, m[0] + '\n');
  t = t.replace(m[0] + '\n', `${m[0]}\nbody_zh: ${q(S[k])}\n`);
  writes.push([file, t]);
}

// 2) كتلة القالب — DiningDetailView
const lit = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
if (S['dv.kindRestaurant']) {
  const file = `${REPO}/src/components/views/DiningDetailView.astro`;
  let t = fs.readFileSync(file, 'utf8');
  const anchor = `  // الروسية — خط ru-translation-pipeline (دفعة ru-dining-detail-1)`;
  once(file, t, anchor);
  const block = `  // الكتلة الصينية — خط zh-translation-pipeline (دفعة zh-dind-1، المرحلة د1). المقفلات (أوقات العمل
  // وصيغ خرائط Google وعنوان الفهرس وعنوان صندوق المنهج) منسوخة من كتلة ZH المنشورة في فهرس المطاعم.
  zh: {
    kindLabel: d.kind === 'cafe' ? ${lit(S['dv.kindCafe'])} : d.kind === 'bakery' ? ${lit(S['dv.kindBakery'])} : ${lit(S['dv.kindRestaurant'])},
    backLabel: ${lit(S['dv.backLabel'])},
    openMaps: t('det.openMaps'),
    newWindow: '（在新窗口中打开谷歌地图）',
    hoursH: '营业时间',
    hoursNote: '营业时间来自谷歌地图，可能随时变动，请以各场所谷歌地图页面的最新信息为准。',
    ratingLabel: '谷歌地图评分',
    openNow: '营业中',
    closedNow: '已打烊',
    closedPerm: '已永久停业（据谷歌地图）',
    closedTemp: '已暂停营业（据谷歌地图）',
    areaH: ${lit(S['dv.areaH'])},
    noteH: '关于本页',
    noteP: ${lit(S['dv.noteP'])},
    indexName: '餐厅与咖啡馆',
    sightsH: ${lit(S['dv.sightsH'])},
  },
`;
  t = t.replace(anchor, block + anchor);
  writes.push([file, t]);
}

// 3) كتلة القالب — StayDetailView
if (S['sd.backLabel']) {
  const file = `${REPO}/src/components/views/StayDetailView.astro`;
  let t = fs.readFileSync(file, 'utf8');
  const anchor = `  ru: {\n    // الكتلة الروسية — خط ru-translation-pipeline (دفعة ru-stay-1`;
  once(file, t, anchor);
  const block = `  zh: {
    // الكتلة الصينية — خط zh-translation-pipeline (دفعة zh-dind-1، المرحلة د1). تسميتا النوع وعنوان الفهرس
    // وصيغ خرائط Google منسوخة من كتلة ZH المنشورة في فهرس الإقامة، وareaH مشترك مع قالب المطاعم.
    kindLabel: d.kind === 'heritage-inn' ? '传统客栈' : '酒店',
    backLabel: ${lit(S['sd.backLabel'])},
    indexName: '住宿',
    openMaps: t('det.openMaps'),
    newWindow: '（在新窗口中打开谷歌地图）',
    ratingLabel: '谷歌地图评分',
    closedPerm: '已永久停业（据谷歌地图）',
    closedTemp: '已暂停营业（据谷歌地图）',
    areaH: ${lit(S['dv.areaH'])},
    noteH: '关于本页',
    noteP: ${lit(S['sd.noteP'])},
  },
`;
  t = t.replace(anchor, block + anchor);
  writes.push([file, t]);
}

// 4) ev.shop / ev.shopNote في ui.zh
if (S['ev.shop']) {
  const file = `${REPO}/src/i18n/ui.ts`;
  let t = fs.readFileSync(file, 'utf8');
  const anchor = `    'foot.l.unesco': '联合国教科文组织世界遗产',\n  } as Record<string, string>,`;
  once(file, t, anchor);
  t = t.replace(anchor, `    'foot.l.unesco': '联合国教科文组织世界遗产',
    // زرّ متجر معرض اللومي — خط zh-translation-pipeline (دفعة zh-dind-2، المرحلة د1)
    'ev.shop': ${lit(S['ev.shop'])},
    'ev.shopNote': ${lit(S['ev.shopNote'])},
  } as Record<string, string>,`);
  writes.push([file, t]);
}

// ملفان يُكتبان من دفعتين مختلفتين؟ لا — كل ملف مرة واحدة في الدفعة الواحدة
const seen = new Set();
for (const [f] of writes) { if (seen.has(f)) throw new Error(`كتابتان لملف واحد: ${f}`); seen.add(f); }
for (const [f, t] of writes) { console.log((dry ? '[dry] ' : '') + 'write', path.relative(REPO, f)); if (!dry) fs.writeFileSync(f, t); }
