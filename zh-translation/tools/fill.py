# -*- coding: utf-8 -*-
"""تعبئة حقول *_zh في ملفات المعالم من مخرج دفعة معتمدة.

الاستعمال:
    python3 zh-translation/tools/fill.py <batch.json> <الدفعة> <الدرجة> [notes.json]
مثال:
    python3 zh-translation/tools/fill.py .../batch-5.json "دفعة المعالم 5" 92 notes.json

يرفض التشغيل إن كانت الحقول الصينية موجودة سلفاً — التعديل يدوي لا بإعادة التعبئة.
"""
import json, io, re, sys, os, datetime

if len(sys.argv) < 4:
    sys.exit(__doc__)
ROOT  = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
pages = json.load(io.open(sys.argv[1], encoding="utf-8"))
label, score = sys.argv[2], sys.argv[3]
notes = json.load(io.open(sys.argv[4], encoding="utf-8")) if len(sys.argv) > 4 else {}
today = datetime.date.today().isoformat()

def yq(v):  # اقتباس مزدوج آمن لـYAML
    return '"' + v.replace('\\', '\\\\').replace('"', '\\"') + '"'

for slug, p in pages.items():
    path = os.path.join(ROOT, "src/content/attractions", slug + ".md")
    text = io.open(path, encoding="utf-8").read()
    assert "title_zh:" not in text, f"{slug}: الحقول الصينية موجودة سلفاً"
    m = re.search(r'^title_en: .*$', text, re.M)
    assert m, f"{slug}: لا يوجد سطر title_en"

    block = [f"# الحقول الصينية: من خط zh-translation-pipeline — {label} بدرجة {score}/100 ({today})"]
    block += ["# " + n for n in notes.get(slug, [])]
    block += [f"title_zh: {p['title_zh']}",
              f"kicker_zh: {p['kicker_zh']}",
              f"summary_zh: {yq(p['summary_zh'])}",
              f"body_zh: {yq(p['body_zh'])}",
              f"area_zh: {yq(p['area_zh'])}"]

    io.open(path, "w", encoding="utf-8").write(text[:m.end()] + "\n" + "\n".join(block) + text[m.end():])
    print(f"✓ {slug}: أُضيفت {len(block)-1-len(notes.get(slug,[]))} حقول")
