#!/usr/bin/env python3
"""نسخة القارئ الأعمى لدفعة حقول معالم مترجَمة (‏`fields.stageN.json`).

الاستعمال:
    python3 tools/translation/blind-copy-fields.py <fields.json> <lang> <out.md>

يُخرج كل معلم صفحةً كما يقرؤها زائرُ الموقع بلغة الهدف وحدها: العنوان واللصيقة
والنبذة والموقع وأفضل وقت والمتن وبطاقة الزيارة والأسئلة الشائعة — **بلا أي مفتاح
frontmatter، ولا اسم حقل، ولا هدف رابط، ولا حرفٍ من لغة المصدر.**

العلّة (‏`SKILL.md` مرحلة 6): المراحل التي تسبق كلها ترى المصدر فتسامح صياغةً
تُفهم بالمقارنة لا بذاتها. القارئ الأعمى لا يُعطى إلا هذا الملف.

عناوين الأقسام تُؤخذ من `src/i18n/ui.ts` بلغة الهدف، وما لم يكن فيها يُكتب من
`SECTION_FALLBACK` أدناه — لا من الإنجليزية، وإلا سرّبنا لغة المصدر إلى القارئ.
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# عناوين الأقسام حين يغيب مفتاحها من كتلة اللغة في ui.ts. تُكتب هنا صراحةً كي لا
# يتسرّب عنوان إنجليزي متراجَع إليه إلى نسخة القارئ فيكشف له لغة المصدر.
SECTION_FALLBACK = {
    'de': {'det.visitInfo': 'Besuchsinformationen', 'det.bestTime': 'Beste Tageszeit',
           'det.area': 'Lage', 'det.faq': 'Häufige Fragen'},
    'zh': {'det.visitInfo': '参观信息', 'det.bestTime': '最佳时段',
           'det.area': '位置', 'det.faq': '常见问题'},
    'ru': {'det.visitInfo': 'Информация для посетителей', 'det.bestTime': 'Лучшее время',
           'det.area': 'Расположение', 'det.faq': 'Частые вопросы'},
}


def ui_value(lang, key):
    """قيمة مفتاح من كتلة لغةٍ في ui.ts — مسحٌ نصّي بلا تعبير نمطي مبنيٍّ من مدخل."""
    text = open(os.path.join(ROOT, 'src/i18n/ui.ts'), encoding='utf-8', newline='').read()
    start = text.find(f'  {lang}: {{')
    if start < 0:
        return None
    end = text.find('\n  }', start)
    block = text[start:end if end > 0 else len(text)]
    needle = f"'{key}':"
    i = block.find(needle)
    if i < 0:
        return None
    j = block.find("'", i + len(needle))
    if j < 0:
        return None
    out, j = [], j + 1
    while j < len(block):
        c = block[j]
        if c == '\\' and j + 1 < len(block):
            out.append(block[j + 1]); j += 2; continue
        if c == "'":
            break
        out.append(c); j += 1
    return ''.join(out)


def label(lang, key):
    return ui_value(lang, key) or SECTION_FALLBACK.get(lang, {}).get(key) or key


def strip_links(s):
    """يُبقي نصّ الرابط ويحذف هدفه — القارئ يرى ما يُعرض لا إلى أين يذهب."""
    return re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', s or '')


def kicker_is_rendered(page):
    """أتُعرض اللصيقة على زائر هذه الصفحة فعلاً؟

    قياسٌ لا تقدير: `kicker` يرد في `src/` في موضعٍ واحد — شبكة `featuredEntries`
    في `HomeView.astro` — فلا تُعرض إلا لمعلمٍ `featured: true`، و`DetailView`
    لا يعرضها أصلاً. وأربعةٌ من 58 معلماً مميَّزة.

    وعلّة هذا الفحص واقعةٌ مقيسة (POL-DE-17، دفعة المعالم الألمانية 2): القارئ
    الأعمى تعثّر في لصيقةِ صفحةٍ غير مميَّزة، فصدر أمرُ تصحيحٍ كاملٌ على نصٍّ لا
    يراه زائر. فما لا يُعرَض لا يُعطى للقارئ.
    """
    p = os.path.join(ROOT, 'src/content/attractions', f'{page}.md')
    if not os.path.exists(p):
        return True                                  # ليس معلماً — لا نحجب بالظنّ
    return bool(re.search(r'^featured:\s*true\s*$', open(p, encoding='utf-8').read(), re.M))


def main():
    src, lang, dst = sys.argv[1], sys.argv[2], sys.argv[3]
    data = json.load(open(src, encoding='utf-8'))
    S = lambda k: label(lang, k)
    sfx = f'_{lang}'
    parts, hidden = [], []
    for name, page in data.items():                 # الاسم للفحص وحده — لا يُكتب في المخرج
        g = lambda k: (page.get(k + sfx) or '').strip()
        parts.append(f"# {g('title')}\n")
        if g('kicker'):
            if kicker_is_rendered(name):
                parts.append(f"*{g('kicker')}*\n")
            else:
                hidden.append(name)
        if g('summary'):
            parts.append(f"{strip_links(g('summary'))}\n")
        if g('area'):
            parts.append(f"**{S('det.area')}:** {strip_links(g('area'))}\n")
        if g('bestTime'):
            parts.append(f"**{S('det.bestTime')}:** {strip_links(g('bestTime'))}\n")
        if g('body'):
            parts.append(f"{strip_links(g('body'))}\n")
        prac = page.get('practical') or []
        if prac:
            parts.append(f"## {S('det.visitInfo')}\n")
            for it in prac:
                lb = (it.get('label' + sfx) or '').strip()
                vl = strip_links((it.get('value' + sfx) or '').strip())
                sr = strip_links((it.get('source' + sfx) or '').strip())
                parts.append(f"- **{lb}:** {vl}" + (f" ({sr})" if sr else ''))
            parts.append('')
        faq = page.get('faq') or []
        if faq:
            parts.append(f"## {S('det.faq')}\n")
            for it in faq:
                parts.append(f"**{(it.get('q' + sfx) or '').strip()}**\n")
                parts.append(f"{strip_links((it.get('a' + sfx) or '').strip())}\n")
        parts.append('\n---\n')

    out = '\n'.join(parts).rstrip() + '\n'
    open(dst, 'w', encoding='utf-8', newline='\n').write(out)

    # حارس تسريب: لا حرف عربي، ولا اسم حقل، ولا مسار صفحة في نسخة القارئ
    leaks = []
    if re.search(r'[؀-ۿ]', out):
        leaks.append('حرف عربي')
    if re.search(r'\b[a-zA-Z]+_(?:de|zh|ru|en)\b', out):
        leaks.append('اسم حقل')
    if re.search(r'\((?:/|https?://)', out):
        leaks.append('هدف رابط')
    note = f" | لصيقة محجوبة (غير مميَّزة فلا تُعرض): {len(hidden)}" if hidden else ''
    print(dst, len(out), 'chars', ('| تسريب: ' + ' · '.join(leaks)) if leaks else '| بلا تسريب', note)
    sys.exit(1 if leaks else 0)


if __name__ == '__main__':
    main()
