# -*- coding: utf-8 -*-
"""المرحلة 5 من خط zh-translation-pipeline — المدقق اللغوي الآلي.

الاستعمال:
    python3 zh-translation/tools/proof.py <batch.json> [required-terms.json]

batch.json:  {"slug": {"title_zh":…, "kicker_zh":…, "summary_zh":…, "body_zh":…, "area_zh":…}, …}
required-terms.json (اختياري): {"slug": ["مصطلح ملزم", …]} — المصطلحات التي يجب
    أن ترد في الصفحة، تُشتق يدوياً من termbase لكل دفعة.

القواعد العامة أدناه تراكمية: كل سطر فيها ثمن خطأ وقع فعلاً في دفعة سابقة.
لا تحذف بنداً دون قراءة سبب إضافته في zh-translation/memory/flagged.md.
"""
import json, re, io, sys, os

if len(sys.argv) < 2:
    sys.exit(__doc__)
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
pages = json.load(io.open(sys.argv[1], encoding="utf-8"))
MUST  = json.load(io.open(sys.argv[2], encoding="utf-8")) if len(sys.argv) > 2 else {}

fail = []
def bad(page, check, detail): fail.append((page, check, detail))

# ١) ترقيم نصف العرض داخل النص الصيني (اللاتيني مسموح داخل الگلوس وحده)
HALF = re.compile(r'[一-鿿]\s*[,;:!?"\'](?!\S*[A-Za-z])|[,;:!?]\s*[一-鿿]')

# ٢) أفخاخ الالتباس. الصنف الأول عبر حدود الكلمات (دفعات 1-3): 遇上海湾.
#    الصنف الثاني داخل الصينية نفسها (دفعة 4، كشفه القارئ الأعمى لا المدقق):
#    供求学者 تُقرأ «العرض والطلب»، و宗教学科学生 يبتلعها 科学生.
TRAPS = ["上海","北京","中国","环卫","东北约","时下","日更","天津","广州","日本",
         "科学生","供求","学科学","国民","民主"]

# ٣) حروف تقليدية شائعة (المبسّطة حصراً)
TRAD = ("與體萬對開關無專為產這學術後歷點國齊嚴實際線繼續傳統節導覽區當個時見證還處樓層構園實現進運營設備衛醫務"
        "裝飾繪畫棟階邊際權責義務營築牆廟壇殯禮舊獻鄉鎮縣議書寫將爾勒羅維薩蘭滿華響類願證據轉營")

# ٤) الأرقام: الصينية ممنوعة في المسافات والمساحات والعملة والحرارة وفي سنة تقويمية.
#    المدد (约五年) والتقريب (数百年) تبقى بالحروف — عرف صيني لا يخالف القاعدة.
NUMRULE = re.compile(r'[一二三四五六七八九十百千]+\s*(公里|平方米|里亚尔|摄氏)'
                     r'|(?<![数几])[一二三四五六七八九十百千]+\s*米(?!哈拉布)'
                     r'|(公元|伊历|伊斯兰历)\s*[一二三四五六七八九十百千]+\s*年')

# ٥) محظورات دلالية — كل بند قرار موثّق، والتعليق يذكر البديل وسببه
BANNED = {
  "哈萨人":"التباس بـ哈萨克族 الكازاخ — 当地居民",
  "柠檬":"اللومي أخضر = 青柠 (تحقيق إياد الميداني)",
  "波斯湾":"الخليج = 海湾 حصراً", "阿拉伯湾":"الخليج = 海湾 حصراً",
  "皈依":"اعتناق الإسلام = 归信",
  "酋长府":"مبنى الإمارة = 埃米尔府 (توحي بالقبلية)",
  "泥砖":"يدّعي قوالب طوب — 生土", "泥筑":"مصطلح مُختلق — 生土 القياسي",
  "信息更新中":"وسم إداري مسرَّب من لوحة التحرير — 尚待考证",
  "尚无定论":"توحي بتنازع أقوال والعربية «بانتظار التأكيد» — 尚待考证",
  "哈萨维":"لا نقحرة لـHasawi — 哈萨 + الاسم",
  "三一体":"Thuluth = 苏鲁斯体",
  "街坊":"في مندرين البر الصيني = «الجيران» لا المحلة — 一带",
  "性质上是":"翻译腔 (in nature)",
  "崇文重教":"إسقاط ثقافي صيني على مؤسسة وقفية إسلامية",
  "本篇所记":"لهجة مكتبية داخل نص سياحي",
  "正常使用":"لغة إدارية", "往来其间":"文言 داخل白话",
  "活着的清真寺":"ترجمة حرفية لـliving mosque",
  "三排列柱":"غير نحوي — 三排立柱",
  "屋顶正中覆着":"إسناد مقلوب — القبة تغطي السقف لا العكس",
  "沿用":"سوء استعمال (= يواصل عادته) — 采用",
  "若干":"لغة إدارية في نص سياحي — 几座",
}

for slug, p in pages.items():
    whole = " ".join(p.values())
    for f, v in p.items():
        m = HALF.search(v)
        if m: bad(slug, "punctuation", f"{f}: …{v[max(0,m.start()-8):m.end()+8]}…")
        if "  " in v: bad(slug, "spacing", f"{f}: مسافة مزدوجة")
        if v != v.strip(): bad(slug, "spacing", f"{f}: مسافة طرفية")
    for t in TRAPS:
        if t in whole: bad(slug, "misparse", f"فخ التباس: {t}")
    for ch in TRAD:
        if ch in whole: bad(slug, "traditional", f"حرف تقليدي: {ch}")
    m = NUMRULE.search(whole)
    if m: bad(slug, "numbers", f"رقم صيني في وحدة قياس/سنة: {m.group(0)}")
    for b, why in BANNED.items():
        if b in whole: bad(slug, "banned", f"{b} — {why}")
    # التقويم: أول ذكر هجري في المتن 伊斯兰历 وما بعده 伊历، بقوسين لا شرطة مائلة
    seq = [h[0] for h in re.findall(r'(伊斯兰历|伊历)\s*\d{3,4}\s*年（(约)?公元\s*\d{3,4}\s*年）', p["body_zh"])]
    if seq and seq[0] != "伊斯兰历": bad(slug, "calendar", f"أول ذكر ليس 伊斯兰历: {seq}")
    if any(s == "伊斯兰历" for s in seq[1:]): bad(slug, "calendar", f"تكرار 伊斯兰历: {seq}")
    if re.search(r'\d\s*年\s*/', p["body_zh"]): bad(slug, "calendar", "شرطة مائلة في التقويم")

for slug, terms in MUST.items():
    whole = " ".join(pages[slug].values())
    for t in terms:
        if t not in whole: bad(slug, "termbase", f"مصطلح ملزم غائب: {t}")

print("=" * 60)
if not fail:
    print("جميع فحوص المرحلة 5: PASS")
else:
    print(f"إخفاقات ({len(fail)}):")
    for f in fail: print(" ✗", " | ".join(f))
print("=" * 60)
for slug, p in pages.items():
    print(f"{slug}: body {len(p['body_zh'])} حرفاً | summary {len(p['summary_zh'])} | {p['title_zh']}")
sys.exit(1 if fail else 0)
