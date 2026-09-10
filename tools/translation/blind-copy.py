#!/usr/bin/env python3
"""نسخة القارئ الأعمى لمقال مترجَم: العنوان والوصف والمتن والأسئلة بلا أي مفتاح frontmatter ولا هدف رابط.

الاستعمال: python3 tools/translation/blind-copy.py <ملف-المرحلة.md> <ملف-الخرج.md> "<عنوان قسم الأسئلة بلغة الهدف>"
العلّة: مراحل 1–5 كلها ترى المصدر فتسامح صياغةً تُفهم بالمقارنة لا بذاتها؛ القارئ الأعمى لا يُعطى إلا هذا الملف.
"""
import re, sys
src, dst, faq_heading = sys.argv[1], sys.argv[2], sys.argv[3]
t = open(src, encoding='utf-8').read()
m = re.match(r'^---\n([\s\S]*?)\n---\n([\s\S]*)$', t); fm, body = m.group(1), m.group(2)
def field(k):
    mm = re.search(rf'^{k}:\s*"?(.*?)"?\s*$', fm, re.M); return mm.group(1) if mm else ''
faq = re.findall(r'-\s*q:\s*"(.*?)"\s*\n\s*a:\s*"(.*?)"', fm)
# الروابط تُبقى نصاً فقط (القارئ يرى نص الرابط لا هدفه)
body = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', body)
out = f"# {field('title')}\n\n{field('description')}\n\n{body.strip()}\n"
if faq:
    out += f"\n## {faq_heading}\n\n" + "\n\n".join(f"**{q}**\n\n{a}" for q, a in faq) + "\n"
open(dst, 'w', encoding='utf-8').write(out)
print(dst, len(out.split()), 'tokens-ish')
