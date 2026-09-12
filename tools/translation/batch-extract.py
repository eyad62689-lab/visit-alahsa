#!/usr/bin/env python3
"""مستخرَجا المعجم والذاكرة لدفعة ترجمة — سياقٌ ملزمٌ مركّز بدل تحميل الملفات كاملة.

الاستعمال:
    python3 tools/translation/batch-extract.py <zh|de|ru> <batch-dir> <page> [page …]
    (‏`page` اسم ملف في `src/content/attractions/` بلا امتداد، أو `blog:<stem>`)

يكتب في `<lang>-translation/output/<batch-dir>/`:
    termbase-extract.json  — `_meta` وقواعد الأسلوب كاملةً (ملزمة دائماً) + المداخل
                             التي يرد نصّها الإنجليزي في مصادر الدفعة.
    tm-extract.json        — أزواج الذاكرة التي تخصّ صفحات الدفعة أو يرد نصّها فيها.

العلّة: معجم الصينية 246 كيلوبايت وذاكرتها 205 — تحميلهما في كل مرحلة يزاحم العمل
نفسه. والمستخرَج يُبقي ما يُلزِم ويُسقط ما لا يخصّ الدفعة، ويبقى الملفّ الكامل
مقروءاً بـgrep عند الحاجة (المراحل مأمورةٌ بذلك في الموجز).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# صفحات تُضمّ دائماً إلى مرشّح الذاكرة: الواجهة والرئيسية ومقالات الجدولين، فنصوصها
# تتكرّر في كل صفحة معلم تقريباً (الروابط والعبارات المشتركة).
ALWAYS = {'ui', 'home', '24-hours-itinerary', '48-hours-itinerary'}


def source_text(page):
    if page.startswith('blog:'):
        stem = page.split(':', 1)[1]
        return open(os.path.join(ROOT, f'src/content/blog/{stem}-en.md'), encoding='utf-8').read()
    return open(os.path.join(ROOT, f'src/content/attractions/{page}.md'), encoding='utf-8').read()


def main():
    lang, batch, pages = sys.argv[1], sys.argv[2], sys.argv[3:]
    if not pages:
        raise SystemExit('لا صفحات — مرّر اسم ملفٍ واحداً على الأقل')
    out_dir = os.path.join(ROOT, f'{lang}-translation/output/{batch}')
    os.makedirs(out_dir, exist_ok=True)

    blob = '\n'.join(source_text(p) for p in pages)
    low = blob.lower()

    tb = json.load(open(os.path.join(ROOT, f'{lang}-translation/glossary/termbase.json'), encoding='utf-8'))
    hits, seen = [], set()
    for t in tb['terms']:
        en = (t.get('en') or '').strip()
        if not en or (en, t.get(lang)) in seen:
            continue
        # المطابقة على الجزء قبل القوس: مداخل كثيرة تكتب الشرح بين قوسين
        probe = re.split(r'\s*[（(]', en)[0].strip().lower()
        if probe and probe in low:
            seen.add((en, t.get(lang)))
            hits.append(t)
    out_tb = {k: v for k, v in tb.items() if k != 'terms'}
    out_tb['terms_matching_this_batch'] = hits
    with open(os.path.join(out_dir, 'termbase-extract.json'), 'w', encoding='utf-8') as fh:
        json.dump(out_tb, fh, ensure_ascii=False, indent=1)

    tm = json.load(open(os.path.join(ROOT, f'{lang}-translation/memory/tm.json'), encoding='utf-8'))['pairs']
    keep = ALWAYS | {p.split(':', 1)[-1] for p in pages}
    norm = lambda s: re.sub(r'\s+', ' ', (s or '').strip().lower())
    nblob = norm(blob)
    picked = []
    for pr in tm:
        en = pr.get('en') or ''
        if not en:
            continue
        by_page = pr.get('page') in keep
        by_text = len(en) > 12 and norm(en) in nblob
        if by_page or by_text:
            picked.append(dict(pr, _reason='page' if by_page else 'text'))
    with open(os.path.join(out_dir, 'tm-extract.json'), 'w', encoding='utf-8') as fh:
        json.dump({'pairs': picked}, fh, ensure_ascii=False, indent=1)

    print(f'{lang} · {batch} · {len(pages)} صفحة')
    print(f'  المعجم: {len(hits)} من {len(tb["terms"])} مدخلاً')
    print(f'  الذاكرة: {len(picked)} من {len(tm)} زوجاً '
          f'(بالصفحة {sum(1 for p in picked if p["_reason"] == "page")} · بالنصّ '
          f'{sum(1 for p in picked if p["_reason"] == "text")})')
    for t in hits:
        art = t.get('artikel')
        print(f'   {(t.get("en") or "")[:44]:46s} -> {(t.get(lang) or "")[:36]:38s}'
              + (f' [{art}]' if art else ''))


if __name__ == '__main__':
    main()
