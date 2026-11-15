# Blind reader report: /zh/emergency/ (post)

Overall: the page reads as natural, fluent Chinese. I found no garbled sentences and no mistranslation-looking lines. The imperative safety register is consistent. Findings are low or medium only.

## Findings

1. Quote: `胡富夫法赫德国王医院`
   Problem: "胡富夫" (Hofuf) and "法赫德国王医院" run together with no separator. A reader can parse "法赫德国" or "夫法" wrongly, and the town is not marked as a location.
   Severity: medium
   Fix: `胡富夫的法赫德国王医院` or `法赫德国王医院（胡富夫）`.

2. Quote: `沙特·本·吉卢维王子医院`
   Problem: Here "沙特" is a personal name (Saud). A Chinese reader will read it as "Saudi Arabia". The text also uses "沙特" for the country everywhere else (沙特卫生部, 沙特国家平台), so the page is ambiguous.
   Severity: medium
   Fix: Use the usual transliteration of the name, `索德·本·贾拉维王子医院`, or at least `沙特·本·吉卢维` with a first-use gloss in brackets. Check this against the termbase.

3. Quote: `以上短号适用于在沙特阿拉伯境内拨打，请勿加拨国家代码 +966。`
   Problem: In Chinese, "短号" mostly means a mobile "short number" (虚拟网短号). It does not mean "short emergency number".
   Severity: medium
   Fix: `以上号码仅适用于在沙特阿拉伯境内拨打` or `以上简短号码…`.

4. Quote: `本站的电子邮箱、WhatsApp 和助手布勒布勒都不是报告紧急情况的渠道。`
   Problem: "布勒布勒" is an unexplained transliteration. It is not clear that it is the name of the site's assistant. It could be read as a word.
   Severity: medium
   Fix: `智能助手“布勒布勒”`, or keep the brand name in Latin letters with a gloss on first use.

5. Quote: `如果您在农场、公园或岩石通道内，请说明地点名称、大门，以及车辆能够到达的最近地点。`
   Problem: "岩石通道" is an odd literal phrase. It is unclear what it refers to. It may be rock passages, caves or canyons. "大门" next to it is also vague.
   Severity: medium
   Fix: Name the actual place type (`洞穴或岩缝步道`) and say `入口大门`.

6. Quote: `拨打 911拨打 997`
   Problem: Two buttons run together with no space. This is probably an extraction artifact. Check the rendered page. If it is real, the labels are missing a separator.
   Severity: low
   Fix: Check the button spacing in the DOM.

7. Quote: `先说位置：先说哈萨，再说城镇或村庄……`
   Problem: "先说…先说" repeats awkwardly. The first "先说位置" already covers it.
   Severity: low
   Fix: `先说位置：哈萨，然后是城镇或村庄……`.

8. Quote: `告知联系电话：之后不要挂断，按照指示操作……`
   Problem: "之后" has nothing to attach to. The sentence is also slightly broken in its connection, because telling the operator a phone number and staying on the line are two different actions.
   Severity: low
   Fix: `留下联系电话，并且不要挂断，按照指示操作，直到……`.

9. Quote: `Visit Al-Ahsa 是独立的游览指南网站。`
   Problem: "游览指南" is slightly archaic or off. The page and its title use "游客指南" and "旅游".
   Severity: low
   Fix: `独立的旅游指南网站`.

10. Quote: `一位可信赖的联系人，以及所有城外出行的路线。`
    Problem: This checklist item has no verb. It reads as a bare noun phrase next to the other items ("存放在安全的地方" etc.). It is unclear what the traveller should do with the contact and the routes.
    Severity: low
    Fix: `告知一位可信赖的联系人您的全部城外出行路线`.

11. Quote: `不要以为到处都有手机信号。`
    Problem: A slight calque. It is understandable, but "手机信号并非处处都有" is more natural.
    Severity: low
    Fix: `请注意，并非所有地方都有手机信号。`

12. Quote: `在身体状况允许的情况下定时喝水`
    Problem: Slightly awkward and roundabout.
    Severity: low
    Fix: `定时喝水（有饮水限制的病人除外）` or `按时补水`.

13. Quote: `资料来源：沙特国家平台：紧急电话号码 （在新窗口中打开）`
    Problem: There is a stray space before the full-width bracket. The source list also uses `：` twice in the same line.
    Severity: low
    Fix: Remove the space before the bracket, or put the link label in 《》.

14. Quote: `资料来源：沙特卫生部：夏季高温 （在新窗口中打开）、中暑急救 （在新窗口中打开）`
    Problem: The second source has no publisher, so it looks like a different type of item from the first.
    Severity: low
    Fix: `沙特卫生部：中暑急救`.

15. Quote: `沙特全国紧急电话号码`, `沙特国家平台：紧急电话号码`
    Problem: The same source is named in two ways: `沙特国家平台` and `沙特全国紧急电话号码`. A reader may think they are two sources.
    Severity: low
    Fix: Unify the source name.

16. Quote: `通过奈杰姆（Najm）的官方应用程序或客服电话 199033 与其联系，确认在其服务范围和服务条款内应如何报案`
    Problem: This is an overlong, abstract sentence with a repeated "其". It reads heavy, but it is not wrong.
    Severity: low
    Fix: Split into two sentences: `请联系奈杰姆（Najm）：使用其官方应用，或拨打客服电话 199033。奈杰姆会告知您在其服务范围内应如何报案。`

## Terminology consistency

- Place name "哈萨" is used consistently throughout. "东部省" is also consistent.
- The report channels vary: 拨打 / 致电 / 联系. This is fine.
- "紧迫危险" and "紧急情况" are used consistently as two separate concepts.
- Agency names are consistent (沙特红新月会, 民防部门, 边防部队, 沙特卫生部). The one exception is item 15.

## Content questions

- 112 is mentioned only in the FAQ and not in the main emergency number table. The reader may wonder whether it is an official number, and whether it differs from 911.
- The 920000560 row says `据沙特国家平台紧急电话号码列表` as its description. It is unclear what the number is for (insured vehicle accidents is only in the label above).
- 993 is called the traffic police number, but the "交通事故" row also says to call Najm for accidents with no injury. The relationship between the two is only explained in the long paragraph.
- Line `请拨打 999 或通过 911 联系警方`: it is unclear why two routes are given.
- The 4 hospitals are listed without any address or phone, which is deliberate according to the page, but a visitor may still expect a way to reach them.
