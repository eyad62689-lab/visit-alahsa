"""مسارات آمنة لسكربتات خط الترجمة.

كل معرّف يأتي من سطر الأوامر أو من ملفات الدفعة يُقيَّد بحروف لاتينية صغيرة وأرقام
وشرطات، واللغة بقائمة مغلقة، وكل مسار ناتج يُتحقَّق أنه تحت جذر المستودع.
"""
import os
import re

LANGS = ('zh', 'de', 'ru', 'ur')
_SLUG = re.compile(r'^[a-z0-9][a-z0-9-]*$')


def lang_code(value):
    if value not in LANGS:
        raise SystemExit(f'لغة غير معروفة: {value!r} — المسموح {", ".join(LANGS)}')
    return value


def slug(value, what='المعرّف'):
    if not isinstance(value, str) or not _SLUG.match(value):
        raise SystemExit(f'{what} غير صالح: {value!r} — حروف لاتينية صغيرة وأرقام وشرطات فقط')
    return value


def under(root, *parts):
    """يركّب المسار تحت root ويرفض أي خروج عنه."""
    base = os.path.realpath(root)
    full = os.path.realpath(os.path.join(base, *parts))
    if full != base and not full.startswith(base + os.sep):
        raise SystemExit(f'مسار خارج المستودع: {full}')
    return full
