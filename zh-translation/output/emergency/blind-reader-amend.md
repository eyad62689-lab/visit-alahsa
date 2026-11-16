# Blind reader report: /zh/emergency/ (amend round)

Overall: the page reads as natural, mostly fluent Chinese. Numbers, who-to-call mapping and safety instructions are clear. No HIGH items. Findings below are ordered by severity.

## Medium

1. Quote: "告知联系电话：之后不要挂断，按照指示操作，直到对方告诉您可以结束通话。"
   Problem: "之后" is ambiguous and the colon structure is broken. A reader may take it as "after giving the number, do not hang up" (correct), but "告知联系电话：之后不要挂断" reads like a fragment, and the other bullets in this list are noun-phrase labels (位置 / 发生了什么 / 有多少人) while this one mixes two instructions.
   Severity: medium
   Fix: "留下联系电话：并保持通话，按照指示操作，直到接线员告诉您可以挂断。"

2. Quote: "请通过该应用程序或客服电话 199033 与其联系，并询问在其服务范围和服务条款内应如何报告这起事故。沙特国家统一平台列出的保险车辆事故电话为 920000560。"
   Problem: Two different numbers for the same situation in one paragraph, and the second is introduced without saying when to use which. A visitor will not know which to dial. The phrase "询问在其服务范围和服务条款内应如何报告" is also stiff translationese. "其官方应用程序便于报告交通事故" is slightly unnatural.
   Severity: medium
   Fix: say when each applies, e.g. "可使用奈杰姆官方应用程序报告事故，或拨打客服电话 199033，询问这起事故是否属于其受理范围以及如何报告。若是保险车辆事故，也可拨打 920000560（沙特国家统一平台列出的号码）。"

3. Quote: "如果您的身体状况可能影响驾驶，请勿自行开车。"
   Problem: Unclear subject and purpose. It sits in a paragraph about helping an injured person, so it could be read as "do not drive the patient yourself" or as "do not drive if you are unwell". The meaning is not clear in context.
   Severity: medium
   Fix: state who: "如果您自己身体不适，不宜驾车，请勿自行开车前往医院。" (or move it out of the paragraph).

4. Quote: "请把这句常用语出示给帮助您的人，或念给对方听。"
   Problem: "这句" (this one sentence) but the block holds seven phrases. Also the Chinese visitor cannot pronounce Arabic; "念给对方听" is only workable for the English line, which is not said.
   Severity: medium
   Fix: "请把这些常用语出示给帮助您的人，或用英语念给对方听。"

## Low

5. Quote: "沙特·本·吉卢维王子医院" and "胡富夫法赫德国王医院"
   Problem: "沙特" here is a personal name (Saud) but identical to the country name 沙特, so the hospital name reads as "Saudi · bin Jalawi". "法赫德国王" can be mis-segmented as "法赫德国 + 王". Mild comprehension friction only.
   Severity: low
   Fix: consider "沙特王子……" kept but without the middle dot confusion, or add the Latin name in brackets once; "法赫德国王医院" is acceptable as is.

6. Quote: "本站的电子邮箱、WhatsApp 和助手布勒布勒都不是报告紧急情况的渠道。"
   Problem: "布勒布勒" is unexplained; a Chinese reader will not know it is an AI assistant/mascot.
   Severity: low
   Fix: "智能助手“布勒布勒”".

7. Quote: "帮您求助的常用语" (heading and TOC) and "本指南旨在帮您求助"
   Problem: "帮您求助" is slightly off: the phrases help you ask for help, not someone helping you. Reads as a calque.
   Severity: low
   Fix: "求助常用语"; "本指南旨在帮助您及时求助".

8. Quote: "岩石通道" (line on location sharing) and "行洪通道"
   Problem: "岩石通道" is vague (cave/gorge/wadi path?). "行洪通道" is a technical flood-control term; a tourist may not map it to a dry riverbed (wadi).
   Severity: low
   Fix: "岩石峡谷/洞穴通道"; "行洪通道（干涸河谷）".

9. Quote: "996 道路安全部门 / 城外公路上的突发事件"
   Problem: The description is vague; it does not say what kind of incident or that 993 (traffic police) and 996 differ. A visitor may hesitate between 993, 996 and 911.
   Severity: low
   Fix: clarify scope (e.g. "城外公路上的道路安全相关求助"), or note "有危险时仍先拨 911".

10. Quote: "统一旅游中心"
    Problem: Name sounds like a physical office; better as a service hotline.
    Severity: low
    Fix: "统一旅游服务热线".

11. Quote: "以上短号适用于在沙特阿拉伯境内拨打"
    Problem: "短号" in Chinese usually means mobile-network short codes; for emergency numbers "三位号码/短号码" is clearer. Minor.
    Severity: low
    Fix: "以上三位号码仅限在沙特阿拉伯境内拨打".

12. Quote: "先说位置：先说哈萨，再说城镇或村庄……"
    Problem: "先说位置：先说" repeats itself.
    Severity: low
    Fix: "位置：先说哈萨，再说……".

13. Quote: "在身体状况允许的情况下定时喝水" (heat section) versus "不要给疑似中暑者喝任何东西"
    Problem: First clause is oddly hedged ("if your condition allows"); the second is an absolute that may feel contradictory to a reader told to drink regularly. Both are plausible, but the contrast is not signposted.
    Severity: low
    Fix: "按时补充水分（有特殊健康情况请遵医嘱）"; and qualify the second as "对意识不清的疑似中暑者，不要喂任何东西".

14. Quote: "哈萨" as the place name throughout
    Problem: Consistent within the page, but many Chinese readers know the oasis as "艾哈萨/胡富夫"; "哈萨" alone may not be recognised by a search or a taxi driver. Terminology is consistent, so this is a naming choice, not an error.
    Severity: low
    Fix: optionally give "哈萨（艾哈萨，Al-Ahsa）" once near the top.

15. Quote: "拨打 911拨打 997" (buttons) and run-together phone/label lines
    Problem: Extraction artifact (no space between the two buttons). Ignore if the rendered page shows separate buttons.
    Severity: low
    Fix: none needed if visually separate.

## Content questions (not language)

- 999 is given as "警方" and also as the number for passport loss, while 911 is the unified centre; clarify for a visitor when 999 vs 911 (non-urgent report vs danger).
- 199033 vs 920000560 for Najm: confirm which is the primary line for tourists.
- The 112 statement ("no SIM card") is hedged in the FAQ; make sure the main table note does not read as a promise that it connects without any network.
- Does 996 (road safety) overlap with 993; consider whether both are needed for a tourist.

## Counts

HIGH: 0
MEDIUM: 4 (items 1-4)
LOW: 11 (items 5-15)
