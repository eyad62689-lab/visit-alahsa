#!/usr/bin/env python3
"""ناشر دفعة مقالات مدونة مترجمة معتمدة إلى المستودع.

الاستعمال:
    python3 tools/translation/publish-blog-batch.py <zh|de|ru> <batch-dir-name> [--dry]

يقرأ  <lang>-translation/output/<batch>/ ويطلب فيه:
    posts.json            — [{"key": "...", "stem": "..."}]  (‏stem = اسم ملف المصدر بلا لغة)
    judge.json            — decision == APPROVE و batch_score >= 90
    <key>.final.md        — لكل مقال
    tm-additions.json     — {"pairs": [...], "remove": [...]}  (اختياري)
    scores-row.txt        — سطر سجل الدرجات (اختياري)
    termbase-additions.stage4.json — مداخل المعجم المعتمدة (اختياري)

ولا ينشر شيئاً بلا حكم معتمد، ولا مقالاً يخالف فحوص السلامة أدناه:
    lang/key/slug/heroImage/pubDate/updatedDate مطابقة للمصدر الإنجليزي حرفاً،
    ولا U+00A0، ولا رقم عربي-هندي (‏C4)، وكل رابط صفحة داخلي بشرطة ختامية،
    وكل هدف داخلي يقصد بادئة لغة الملف (يحرسه check-links في البناء أيضاً).
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ARABIC_INDIC = re.compile('[٠-٩۰-۹]')
FM = re.compile(r'^---\r?\n([\s\S]*?)\r?\n---', re.M)
# مفاتيح تُنسخ من الإنجليزي حرفاً ولا تُترجم
COPIED = ('key', 'slug', 'heroImage', 'pubDate', 'updatedDate')


def head(text, path):
    m = FM.match(text)
    assert m, f'{path}: بلا frontmatter'
    return m.group(1)


def field(fm, k):
    m = re.search(rf'^{k}:\s*"?([^"\r\n]*?)"?\s*$', fm, re.M)
    return m.group(1).strip() if m else None


def check_post(text, key, lang, en_path, src_path):
    fm = head(text, src_path)
    en = head(open(en_path, encoding='utf-8').read(), en_path)
    assert field(fm, 'lang') == lang, f'{src_path}: lang ليست {lang}'
    assert field(fm, 'key') == key, f'{src_path}: key ليست {key}'
    for k in COPIED:
        a, b = field(fm, k), field(en, k)
        assert a == b, f'{src_path}: {k} = {a!r} والمصدر {b!r} — تُنسخ حرفاً'
    assert ' ' not in text, f'{src_path}: مسافة غير فاصلة U+00A0'
    bad = ARABIC_INDIC.search(text)
    assert not bad, f'{src_path}: رقم عربي-هندي {bad.group(0)!r} (‏C4)'
    for href in re.findall(r'\]\((/[^)]*)\)', text):
        assert href.endswith('/'), f'{src_path}: رابط بلا شرطة ختامية — {href}'
        assert href.startswith(f'/{lang}/'), f'{src_path}: رابط خارج بادئة اللغة — {href}'
    return len(text)


def main():
    lang = sys.argv[1]
    batch = sys.argv[2]
    dry = '--dry' in sys.argv
    B = os.path.join(ROOT, f'{lang}-translation/output/{batch}')
    posts = json.load(open(os.path.join(B, 'posts.json'), encoding='utf-8'))
    judge = json.load(open(os.path.join(B, 'judge.json'), encoding='utf-8'))
    assert judge.get('decision') == 'APPROVE', f"الحكم {judge.get('decision')} — لا نشر"
    assert judge.get('batch_score', 0) >= 90, f"درجة الدفعة {judge.get('batch_score')} دون 90"

    written = []
    for p in posts:
        key, stem = p['key'], p['stem']
        src = os.path.join(B, f'{key}.final.md')
        dst = os.path.join(ROOT, f'src/content/blog/{stem}-{lang}.md')
        en_path = os.path.join(ROOT, f'src/content/blog/{stem}-en.md')
        text = open(src, encoding='utf-8').read()
        check_post(text, key, lang, en_path, src)
        if not text.endswith('\n'):
            text += '\n'
        if not dry:
            open(dst, 'w', encoding='utf-8', newline='\n').write(text)
        written.append(dst)
        print(('would write' if dry else 'wrote'), os.path.relpath(dst, ROOT))

    # ذاكرة الترجمة — الحذف أولاً ثم الإضافة (مواصفة الحذف تصف زوجاً قائماً؛
    # لو طُبّقت بعد الإضافة لابتلعت زوجاً جديداً يحمل المفتاح نفسه)
    tp = os.path.join(B, 'tm-additions.json')
    if os.path.exists(tp):
        tmp = os.path.join(ROOT, f'{lang}-translation/memory/tm.json')
        tm = json.load(open(tmp, encoding='utf-8'))
        pairs = tm['pairs']
        add = json.load(open(tp, encoding='utf-8'))
        addl = (add.get('pairs') or add.get('additions') or []) if isinstance(add, dict) else add
        rem = (add.get('remove') or []) if isinstance(add, dict) else []
        removed = 0
        for r in rem:
            if isinstance(r, str):
                r = {lang: r}
            def hit(q, r=r):
                if r.get('page') and r.get('field') and q.get('page') == r['page'] and q.get('field') == r['field']:
                    return True
                if r.get(lang) and q.get(lang) == r[lang]:
                    return True
                if r.get('en') and not r.get('page') and q.get('en') == r['en'] and (not r.get(lang) or q.get(lang) == r[lang]):
                    return True
                return False
            before = len(pairs)
            pairs[:] = [q for q in pairs if not hit(q)]
            removed += before - len(pairs)
        have = {(q.get('en'), q.get(lang)) for q in pairs}
        n = 0
        for a in addl:
            if lang not in a or 'en' not in a or (a['en'], a[lang]) in have:
                continue
            pairs.append({'en': a['en'], lang: a[lang], 'page': a.get('page', 'blog'),
                          'field': a.get('field', 'body'), 'date': a.get('date', judge.get('date', ''))})
            have.add((a['en'], a[lang]))
            n += 1
        if not dry:
            json.dump(tm, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print(f'tm added {n} removed {removed} total {len(pairs)}')

    # سجل الدرجات
    rp = os.path.join(B, 'scores-row.txt')
    if os.path.exists(rp):
        row = open(rp, encoding='utf-8').read().strip()
        sc = os.path.join(ROOT, f'{lang}-translation/memory/scores.csv')
        s = open(sc, encoding='utf-8').read()
        if row and row not in s and not dry:
            open(sc, 'a', encoding='utf-8').write(('' if s.endswith('\n') else '\n') + row + '\n')
            print('scores row appended')
        elif row in s:
            print('scores row already present')

    # المعجم
    ap = os.path.join(B, 'termbase-additions.stage4.json')
    if os.path.exists(ap):
        adds = json.load(open(ap, encoding='utf-8'))
        entries = adds.get('additions', adds) if isinstance(adds, dict) else adds
        tbp = os.path.join(ROOT, f'{lang}-translation/glossary/termbase.json')
        tb = json.load(open(tbp, encoding='utf-8'))
        ens = {t['en'] for t in tb['terms']}
        k = 0
        for e in entries:
            if not isinstance(e, dict) or 'en' not in e or lang not in e:
                continue
            if e['en'] in ens:
                print('termbase: exists, skipped', e['en'])
                continue
            clean = {kk: vv for kk, vv in e.items() if kk != 'replaces'}
            if not clean.get('added'):
                clean['added'] = judge.get('date', '')
            tb['terms'].append(clean)
            ens.add(e['en'])
            k += 1
        if not dry:
            json.dump(tb, open(tbp, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print('termbase entries added', k)

    print('done', lang, batch, '(dry run)' if dry else '')


if __name__ == '__main__':
    main()
