#!/usr/bin/env python3
"""ناشر دفعة ترجمة معتمدة (judge.decision == APPROVE و batch_score >= 90) إلى المستودع.

الاستعمال: python3 tools/translation/publish-batch.py <zh|de|ru>   (يقرأ <lang>-translation/output/batch-20260910/)
يكتب: مقالَي المدونة، وحقول صفحات المعالم (بيت البيعة وبند جواثا)، ومفاتيح ui.ts، ويدمج tm.json وscores.csv وtermbase.json.
لا ينشر شيئاً بلا حكم معتمد — التأكيد في أول السكربت.
"""
import json, os, re, sys
lang = sys.argv[1]; today = '2026-09-10'
root = '/home/user/visit-alahsa'; B = f'{root}/{lang}-translation/output/batch-20260910'
judge = json.load(open(f'{B}/judge.json', encoding='utf-8'))
assert judge['decision'] == 'APPROVE' and judge['batch_score'] >= 90, judge['decision']
# 1) المقالان
for key, short in [('24-hours-itinerary', '24-hours'), ('48-hours-itinerary', '48-hours')]:
    src = f'{B}/{key}.final.md'; dst = f'{root}/src/content/blog/{short}-{lang}.md'
    t = open(src, encoding='utf-8').read()
    assert re.search(rf'^lang: {lang}\s*$', t, re.M) and re.search(rf'^key: {key}\s*$', t, re.M), src
    assert '\u00a0' not in t, f'U+00A0 in {src}'
    open(dst, 'w', encoding='utf-8', newline='\n').write(t if t.endswith('\n') else t + '\n'); print('wrote', dst)
# 2) ذاكرة الترجمة (+ حذف الأزواج المتقادمة)
tmp = f'{root}/{lang}-translation/memory/tm.json'; tm = json.load(open(tmp, encoding='utf-8')); pairs = tm['pairs']
add = json.load(open(f'{B}/tm-additions.json', encoding='utf-8'))
addl = (add.get('pairs') or add.get('additions') or []) if isinstance(add, dict) else add
rem = (add.get('remove') or []) if isinstance(add, dict) else []
removed = 0   # الحذف أولاً: مواصفة الحذف (page+field) تصف زوجاً متقادماً قائماً، ولو طُبّقت بعد الإضافة لابتلعت الزوج الجديد الذي يحمل المفتاح نفسه (وقع فعلاً في دفعة zh 2026-09-10)
for r in rem:
    if isinstance(r, str): r = {lang: r}
    def hit(p):
        if r.get('page') and r.get('field') and p.get('page') == r['page'] and p.get('field') == r['field']: return True
        if r.get(lang) and p.get(lang) == r[lang]: return True
        if r.get('en') and not r.get('page') and p.get('en') == r['en'] and (not r.get(lang) or p.get(lang) == r[lang]): return True
        return False
    before = len(pairs); pairs[:] = [p for p in pairs if not hit(p)]; removed += before - len(pairs)
have = {(p.get('en'), p.get(lang)) for p in pairs}; n = 0
for a in addl:
    if lang not in a or 'en' not in a or (a['en'], a[lang]) in have: continue
    pairs.append({'en': a['en'], lang: a[lang], 'page': a.get('page', 'blog'), 'field': a.get('field', 'body'), 'date': a.get('date', today)}); n += 1
json.dump(tm, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, indent=2); print('tm added', n, 'removed', removed, 'total', len(pairs))
# 3) سجل الدرجات
row = open(f'{B}/scores-row.txt', encoding='utf-8').read().strip()
sc = f'{root}/{lang}-translation/memory/scores.csv'; s = open(sc, encoding='utf-8').read()
if row and row not in s: open(sc, 'a', encoding='utf-8').write(('' if s.endswith('\n') else '\n') + row + '\n'); print('scores row appended')
# 4) المعجم
tp = f'{B}/termbase-additions.stage4.json'
if os.path.exists(tp):
    adds = json.load(open(tp, encoding='utf-8')); entries = adds.get('additions', adds) if isinstance(adds, dict) else adds
    tbp = f'{root}/{lang}-translation/glossary/termbase.json'; tb = json.load(open(tbp, encoding='utf-8'))
    ens = {t['en'] for t in tb['terms']}; k = 0
    for e in entries:
        if not isinstance(e, dict) or 'en' not in e or lang not in e: continue
        if e['en'] in ens: print('termbase: exists, skipped', e['en']); continue
        clean = {kk: vv for kk, vv in e.items() if kk != 'replaces'}
        if lang == 'de' and clean.get('artikel') and clean['de'].startswith(clean['artikel'] + ' '):
            usage = clean['de']; clean['de'] = re.sub(r'^(?:die|der|das) ', '', usage.split(' · ')[0]).strip(); clean['note'] = f"Gebrauch: {usage}. " + clean.get('note', '')
        if not clean.get('added'): clean['added'] = today
        tb['terms'].append(clean); ens.add(e['en']); k += 1
    json.dump(tb, open(tbp, 'w', encoding='utf-8'), ensure_ascii=False, indent=2); print('termbase entries added', k)
# 5) الحقول
f = json.load(open(f'{B}/fields.final.json', encoding='utf-8'))
jp = f.get('jawatha.practical') or (f.get('jawatha') or {}).get('practical')
if jp:
    p = f'{root}/src/content/attractions/jawatha-mosque.md'; t = open(p, encoding='utf-8').read()
    m = re.search(r'^  - \{ label: "زيارة غير المسلمين".*$', t, re.M); line = m.group(0)
    assert f'label_{lang}' not in line, 'already published'
    esc = lambda v: v.replace('"', '\\"')
    line2 = line.replace('value_en: "Welcome, with modest dress", ', f'value_en: "Welcome, with modest dress", label_{lang}: "{esc(jp[f"label_{lang}"])}", value_{lang}: "{esc(jp[f"value_{lang}"])}", ')
    line2 = line2.replace('source_en: "Confirmed by the Visit Al-Ahsa team", ', f'source_en: "Confirmed by the Visit Al-Ahsa team", source_{lang}: "{esc(jp[f"source_{lang}"])}", ')
    assert line2.count(f'label_{lang}:') == 1 and line2.count(f'source_{lang}:') == 1, line2
    open(p, 'w', encoding='utf-8').write(t.replace(line, line2)); print('jawatha practical fields written')
bf = f.get('baiah')
if bf:
    p = f'{root}/src/content/attractions/baiah.md'; t = open(p, encoding='utf-8').read()
    for fld in (f'summary_{lang}', f'body_{lang}'):
        if fld not in bf: continue
        val = bf[fld].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        m = re.search(rf'^{fld}:.*$', t, re.M); assert m, fld
        t = t.replace(m.group(0), f'{fld}: "{val}"'); print('baiah', fld, 'written')
    open(p, 'w', encoding='utf-8').write(t)
uf = f.get('ui')
if uf:
    flat = {}
    def fl(o, pre=''):
        for k, v in o.items():
            if isinstance(v, dict): fl(v, pre + k + '.')
            else: flat[pre + k] = v
    fl(uf)
    p = f'{root}/src/i18n/ui.ts'; t = open(p, encoding='utf-8', newline='').read(); eol = '\r\n' if '\r\n' in t else '\n'
    start = t.index(f'  {lang}: {{'); end = t.index(f'{eol}  }}', start); nb = t[start:end]
    for key, val in flat.items():
        if not isinstance(val, str): continue
        v = val.replace('\\', '\\\\').replace("'", "\\'")
        m = re.search(rf"^(\s*)'{re.escape(key)}':\s*'(?:[^'\\]|\\.)*',?[^\n]*$", nb, re.M)
        if m: nb = nb.replace(m.group(0), f"{m.group(1)}'{key}': '{v}',"); print('ui replaced', key)
        else:
            i = nb.index("    'det.openMaps': "); j = nb.index(eol, i) + len(eol)
            nb = nb[:j] + f"    '{key}': '{v}',{eol}" + nb[j:]; print('ui inserted', key)
    open(p, 'w', encoding='utf-8', newline='').write(t[:start] + nb + t[end:])
print('done', lang)
