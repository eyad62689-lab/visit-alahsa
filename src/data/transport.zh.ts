// مولَّد من zh-translation/output/transport/judge.json (92، APPROVE) — لا يُحرَّر يدوياً؛
// أي تعديل يمرّ بخط zh-translation-pipeline ثم يُعاد التطبيق.
// الفقرة الثانية والمصدر الثالث في قسم access من zh-translation/output/transport-assist/judge.json.
import type { TransportPage } from './transport';

export const TRANSPORT_ZH: TransportPage = {
  "seoTitle": "抵达哈萨与当地交通：飞机、火车与大巴",
  "seoDesc": "如何乘飞机、火车、大巴或自驾抵达哈萨，以及如何在当地出行：市内公交、出租车、网约车应用与停车，并附各官方运营方的链接。",
  "eyebrow": "行程规划",
  "title": "抵达哈萨与当地交通",
  "lead": "先选好前往哈萨的方式，再安排各景点之间的往来。本页汇集官方机构和运营方发布的信息，每条都附有来源链接；时刻和票价时有变动，预订前请先点开来源核对。",
  "reviewed": "本页信息最近复核日期：",
  "date": "2026-11-18",
  "tocLabel": "本页内容",
  "srcLabel": "来源：",
  "listSep": "、",
  "checked": "——最近核实日期：",
  "newWindow": "（在新窗口中打开）",
  "groups": [
    {
      "h": "前往哈萨",
      "sections": [
        {
          "id": "air",
          "h": "乘飞机",
          "paras": [
            "哈萨国际机场（Al-Ahsa International Airport）的代码为 HOF，航空公司将其标注为胡富夫（Hofuf）。阿迪尔航空（flyadeal）的页面显示，该公司有往返胡富夫与吉达、麦地那等地的航班；请在其订票系统中输入出行日期，查看有哪些航班、是否直飞以及票价。",
            "在该机场运营的航空公司和航线随季节而变，因此本页不提供固定的时刻表或票价。"
          ],
          "links": [
            {
              "id": "flyadeal",
              "t": "阿迪尔航空胡富夫出发航班",
              "href": "https://www.flyadeal.com/flights/en/flights-from-hofuf"
            }
          ],
          "src": [
            {
              "label": "阿迪尔航空",
              "href": "https://www.flyadeal.com/flights/en/flights-from-hofuf"
            },
            {
              "label": "阿迪尔航空：麦地那至胡富夫",
              "href": "https://www.flyadeal.com/flights/en-sa/flights-from-medina-to-hofuf"
            }
          ]
        },
        {
          "id": "dammam",
          "h": "经达曼机场",
          "paras": [
            "如果您在达曼的法赫德国王国际机场（King Fahd International Airport）落地，可在机场的交通页面找到出租车、网约车、租车和机场接驳巴士等信息。东部铁路的列车在达曼火车站和胡富夫均设站停靠，因此落地后需要从机场前往达曼火车站；这段接驳请在火车票之外另行安排。"
          ],
          "links": [
            {
              "id": "kfia",
              "t": "法赫德国王国际机场交通信息",
              "href": "https://kfia.sa/en/Parking-Transport"
            }
          ],
          "src": [
            {
              "label": "法赫德国王国际机场",
              "href": "https://kfia.sa/en/Parking-Transport"
            },
            {
              "label": "沙特铁路公司（SAR）",
              "href": "https://www.sar.com.sa/about-sar/railnetwork/"
            }
          ]
        },
        {
          "id": "train",
          "h": "乘火车",
          "paras": [
            "沙特铁路公司运营东部铁路，线路连接利雅得与达曼，途经胡富夫和布盖格（Abqaiq）。车票分为四个等级：经济优惠座、经济座、商务座和高级商务座。",
            "可在沙特铁路公司的网站、应用程序或车站售票处购票：网上购票可用银行卡支付，车站售票处可付现金，也可刷卡。如有疑问，请通过沙特铁路公司网站上的“联系我们”页面咨询。"
          ],
          "links": [
            {
              "id": "sar-booking",
              "t": "预订沙特铁路公司火车票",
              "href": "https://tickets.sar.com.sa/"
            },
            {
              "id": "sar-contact",
              "t": "联系沙特铁路公司",
              "href": "https://www.sar.com.sa/help/contactus/"
            }
          ],
          "src": [
            {
              "label": "沙特铁路公司：铁路网",
              "href": "https://www.sar.com.sa/about-sar/railnetwork/"
            },
            {
              "label": "沙特铁路公司：车票类别",
              "href": "https://www.sar.com.sa/east-train/ticketcategories/"
            },
            {
              "label": "沙特铁路公司：购票",
              "href": "https://www.sar.com.sa/northern-train/buyingtickets/"
            }
          ]
        },
        {
          "id": "bus",
          "h": "乘长途大巴",
          "paras": [
            [
              "SAT（全称 SAPTCO Alsa 运输公司）在其网站和应用程序上出售前往哈萨的城际大巴车票，其中包括从利雅得出发的班次。客服全天候服务，电话：",
              {
                "tel": "920018221"
              },
              "。"
            ],
            [
              "达尔卜瓦坦（Darb Alwatan）的 NN25 线路每天往返哈萨汽车站，班次见下表；可通过其网站、应用程序或售票处预订。咨询电话：",
              {
                "tel": "8003040155"
              },
              "。"
            ]
          ],
          "table": {
            "caption": "达尔卜瓦坦 NN25 线路每日班次（以其时刻表公布为准）",
            "head": [
              "方向",
              "发车",
              "到达"
            ],
            "rows": [
              [
                "哈萨至海夫吉",
                "14:00",
                "22:40"
              ],
              [
                "海夫吉至哈萨",
                "09:00",
                "17:30"
              ],
              [
                "朱拜勒至哈萨",
                "09:30",
                "13:30"
              ],
              [
                "哈萨至朱拜勒",
                "18:00",
                "22:00"
              ]
            ]
          },
          "after": [
            "达尔卜瓦坦的时刻表页面未注明日期，请在订票系统中确认您出行当天的班次。"
          ],
          "links": [
            {
              "id": "sat-booking",
              "t": "预订 SAT 大巴",
              "href": "https://booking.satrans.com.sa/"
            },
            {
              "id": "darb",
              "t": "达尔卜瓦坦线路",
              "href": "https://darbalwatan.com/en/routes.php"
            }
          ],
          "src": [
            {
              "label": "SAT：如何订票",
              "href": "https://satrans.com.sa/news/how-to-book-sat-bus-ticket/"
            },
            {
              "label": "达尔卜瓦坦：线路",
              "href": "https://darbalwatan.com/en/routes.php"
            },
            {
              "label": "达尔卜瓦坦：如何订票",
              "href": "https://darbalwatan.com/en/how.php"
            }
          ]
        },
        {
          "id": "car",
          "h": "驾车",
          "paras": [
            "据哈萨市政局介绍，绿洲外围有一条外环路，城区则由内环的阿卜杜拉国王环路环绕。出发前请先确定好住处的地址。"
          ],
          "src": [
            {
              "label": "哈萨市政局",
              "href": "https://unesco.alhasa.gov.sa/Ar/Details.aspx?ArticleID=3138"
            }
          ]
        },
        {
          "id": "gcc",
          "h": "从海合会国家经陆路前往",
          "paras": [
            [
              "沙特阿拉伯与海湾合作委员会（海合会）其他成员国之间设有多个官方陆路口岸，下表列出其中几个，请选择适合您出发国家的口岸。签证与入境要求请参阅本站的",
              {
                "t": "签证指南",
                "page": "visa"
              },
              "。"
            ]
          ],
          "table": {
            "caption": "沙特阿拉伯与海合会国家之间的陆路口岸",
            "head": [
              "国家",
              "口岸"
            ],
            "rows": [
              [
                "巴林",
                "法赫德国王大桥"
              ],
              [
                "卡塔尔",
                "萨尔瓦口岸"
              ],
              [
                "阿拉伯联合酋长国",
                "巴特哈口岸"
              ],
              [
                "阿曼",
                "鲁卜哈利口岸"
              ],
              [
                "科威特",
                "海夫吉口岸"
              ]
            ]
          },
          "src": [
            {
              "label": "法赫德国王大桥管理局",
              "href": "https://kfca.sa/ar/aboutus"
            },
            {
              "label": "沙特天课税务和海关总局：萨尔瓦口岸",
              "href": "https://zatca.gov.sa/ar/MediaCenter/News/Pages/Salwa-Port-Preperation.aspx"
            },
            {
              "label": "沙特天课税务和海关总局：鲁卜哈利口岸",
              "href": "https://zatca.gov.sa/ar/MediaCenter/News/Pages/Services-Begin-at-Empty-Quarter-Port.aspx"
            },
            {
              "label": "沙特天课税务和海关总局：2024 年年度报告",
              "href": "https://zatca.gov.sa/ar/HelpCenter/Documents/ZATCA_REPORT_2024.pdf"
            }
          ]
        },
        {
          "id": "vehicles",
          "h": "外国车辆与法赫德国王大桥",
          "paras": [
            "根据沙特天课税务和海关总局的临时入境指南，在海合会以外国家注册的旅游车辆须满足以下条件：车辆行驶证有效；所投保险在整个入境期间覆盖沙特阿拉伯；驾驶执照有效；您本人是车主，或持有经认证的授权书。出行前请通读该指南全文。",
            [
              "通过 Jesr 应用可以预缴过桥费，也可以申请协助。法赫德国王大桥的道路救援电话为 ",
              {
                "tel": "8004000999"
              },
              "，或通过该应用求助。"
            ]
          ],
          "src": [
            {
              "label": "沙特天课税务和海关总局：外国旅游车辆临时入境",
              "href": "https://eservices.zatca.gov.sa/sites/sc/ar/CustomsGuideNew/HQweb/Pages/newGuide1438/%D8%A7%D9%84%D8%A5%D8%AF%D8%AE%D8%A7%D9%84-%D8%A7%D9%84%D9%85%D8%A4%D9%82%D8%AA-%D9%84%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A%D8%A9-%D8%A7%D9%84%D8%A3%D8%AC%D9%86%D8%A8%D9%8A%D8%A9.aspx"
            },
            {
              "label": "法赫德国王大桥：电子服务",
              "href": "https://kfca.sa/ar/eservices"
            },
            {
              "label": "法赫德国王大桥：道路救援",
              "href": "https://kfca.sa/ar/roadassistance"
            }
          ]
        }
      ]
    },
    {
      "h": "哈萨当地出行",
      "sections": [
        {
          "id": "city-bus",
          "h": "哈萨市内公交",
          "paras": [
            [
              "沙特公共交通公司（SAPTCO）运营的哈萨公交每天早上 5:30 至晚上 11:30 运行，车上配有方便残障乘客的设施。车票可在哈萨公交应用（Hafilat Al Ahsa）中购买，也可使用公交卡；上车时在读卡器上刷公交卡或应用内的乘车码即可。咨询电话：",
              {
                "tel": "920000877"
              },
              "。"
            ]
          ],
          "table": {
            "caption": "票价与线路（以沙特公共交通公司指南公布为准）",
            "head": [
              "项目",
              "详情"
            ],
            "rows": [
              [
                "单程票",
                "3.45 沙特里亚尔"
              ],
              [
                "公交卡",
                "10 里亚尔（含税）"
              ],
              [
                "1 路",
                "总站至阿卜杜拉国王军事城；每 20 分钟一班"
              ],
              [
                "2 路",
                "环线：从总站出发，途经凯撒利亚集市和火车站；每 15 分钟一班"
              ],
              [
                "3 路",
                "总站至瓦西塔 1；每 20 分钟一班"
              ],
              [
                "4 路",
                "总站至格拉纳达区；发车间隔待确认"
              ],
              [
                "5 路",
                "总站至乌尤恩市（Al-Oyoun）；每 30 分钟一班"
              ],
              [
                "6 路",
                "凯撒利亚集市至欧姆兰市 6；每 30 分钟一班"
              ],
              [
                "7 路",
                "政府部门综合区至哈萨机场；每 120 分钟一班"
              ],
              [
                "8 路",
                "总站至工业城 4；每 30 分钟一班"
              ],
              [
                "9 路",
                "总站至舒阿巴镇；每 30 分钟一班"
              ]
            ]
          },
          "after": [
            "线路与发车间隔以沙特公共交通公司指南（未注明日期）为准；各线路的首末班时间请在应用中查询。"
          ],
          "links": [
            {
              "id": "hafilat-app",
              "t": "哈萨公交应用（Hafilat Al Ahsa）",
              "href": "https://play.google.com/store/apps/details?id=com.saptco.android.afch"
            }
          ],
          "src": [
            {
              "label": "沙特公共交通公司：哈萨公交",
              "href": "https://www.saptco.com.sa/al-ahsa-bus"
            },
            {
              "label": "沙特公共交通公司：线路图与票价",
              "href": "https://saptco.com.sa/pdf/2025-06/al_ahsa_buses_brochure.pdf"
            }
          ]
        },
        {
          "id": "taxi",
          "h": "出租车",
          "paras": [
            [
              "沙特运输总局制定了公共出租车收费标准（最多载客 4 人），见下表。上车后请确认计价器已开启；根据收费标准卡的说明，计价器未开启则本次乘车免费。咨询与意见反馈电话：",
              {
                "tel": "19929"
              },
              "。"
            ]
          ],
          "table": {
            "caption": "公共出租车收费标准，单位：沙特里亚尔（沙特运输总局文件，2024 年 10 月）",
            "head": [
              "项目",
              "收费标准"
            ],
            "rows": [
              [
                "起步价",
                "6.4（夜间 10）"
              ],
              [
                "每公里",
                "2.1"
              ],
              [
                "等候或车速低于每小时 20 公里时，每分钟",
                "0.9"
              ],
              [
                "最低车费",
                "10"
              ]
            ]
          },
          "after": [
            "夜间时段：周日至周四为午夜 12 点至早上 6 点；周五和周六为凌晨 2 点至早上 6 点。此为公共出租车收费标准，并非机场出租车的价格。"
          ],
          "src": [
            {
              "label": "沙特运输总局：公共出租车规范",
              "href": "https://www.tga.gov.sa/ar/WebSiteFile/5455136d-91fc-46f3-99ee-066c08ee59cf"
            }
          ]
        },
        {
          "id": "apps",
          "h": "网约车应用",
          "paras": [
            "在哈萨，可通过优步（Uber）应用叫 UberX，下单前即可看到价格。Careem 在其应用中提供从哈萨国际机场出发的行程；请按应用显示的上车点候车，并在确认前查看预估价格。"
          ],
          "src": [
            {
              "label": "优步：哈萨",
              "href": "https://www.uber.com/sa/en/r/cities/taxi/al-ahsa-al-mintaqah-al-sharqiyah-sa/"
            },
            {
              "label": "Careem：哈萨机场",
              "href": "https://www.careem.com/en-sa/rides/airport/hof/"
            }
          ]
        },
        {
          "id": "rental",
          "h": "租车",
          "paras": [
            "Lumi 的网站上列有一家哈萨门店，Budget Saudi 的网站上则提供了其哈萨服务的联系电话。租车条件（年龄、国际驾照、保险和付款方式）由各公司自行规定，请在预订时向租车公司确认。"
          ],
          "links": [
            {
              "id": "lumi",
              "t": "Lumi：哈萨门店",
              "href": "https://lumirental.com/en/car-rental/cities/branches/al-ahsa-city-branch"
            },
            {
              "id": "budget",
              "t": "Budget Saudi：东部省",
              "href": "https://www.budgetsaudi.com/en/Emergency-Support-Contact/Eastern-Region"
            }
          ],
          "src": [
            {
              "label": "Lumi",
              "href": "https://lumirental.com/en/car-rental/cities/branches/al-ahsa-city-branch"
            },
            {
              "label": "Budget Saudi",
              "href": "https://www.budgetsaudi.com/en/Emergency-Support-Contact/Eastern-Region"
            }
          ]
        },
        {
          "id": "arrival",
          "h": "从机场和车站出发",
          "paras": [
            "哈萨公交指南中有一条通往机场的线路（7 路），还有一条途经火车站的线路（2 路），详见线路表。优步和 Careem 也提供从哈萨机场出发的行程；抵达后打开应用，即可查看上车点和价格。"
          ],
          "src": [
            {
              "label": "沙特公共交通公司：线路指南",
              "href": "https://saptco.com.sa/pdf/2025-06/al_ahsa_buses_brochure.pdf"
            },
            {
              "label": "优步",
              "href": "https://www.uber.com/sa/en/r/cities/taxi/al-ahsa-al-mintaqah-al-sharqiyah-sa/"
            },
            {
              "label": "Careem",
              "href": "https://www.careem.com/en-sa/rides/airport/hof/"
            }
          ]
        },
        {
          "id": "parking",
          "h": "停车",
          "paras": [
            "哈萨市政局与国家停车公司合作，在胡富夫市中心推行收费停车系统 Mawgif。可用硬币或 Mawgif 应用钱包付费；请停在划定的车位内，停车时间不要超过已付费的时长。"
          ],
          "table": {
            "caption": "胡富夫市中心 Mawgif 停车收费标准与收费时段",
            "head": [
              "项目",
              "详情"
            ],
            "rows": [
              [
                "收费标准",
                "每小时 2.30 里亚尔"
              ],
              [
                "周六至周四",
                "上午 8 点至中午 12 点，下午 4 点至晚上 10 点"
              ],
              [
                "周五",
                "免费"
              ]
            ]
          },
          "after": [
            "斋月期间的收费时段公布在停车缴费机上。该收费标准仅适用于胡富夫市中心。"
          ],
          "src": [
            {
              "label": "哈萨市政局：Mawgif",
              "href": "https://www.alhasa.gov.sa/Pages/AboutMawgif.aspx"
            }
          ]
        },
        {
          "id": "access",
          "h": "无障碍出行",
          "paras": [
            "沙特公共交通公司表示，哈萨公交配有方便残障乘客的设施。沙特铁路公司为已登记的残障乘客提供成人经济座车票 50% 的折扣，与其一同预订的一名陪同人员也可享受，具体以沙特铁路公司的规定为准。优步哈萨页面显示，目前在哈萨无法通过优步叫到可供轮椅乘客使用的无障碍车辆。",
            "如果您在车站内或上车时需要协助，请在列车发车前至少 1 小时到达车站，并在到达时告知沙特铁路公司的工作人员。"
          ],
          "src": [
            {
              "label": "沙特公共交通公司",
              "href": "https://www.saptco.com.sa/al-ahsa-bus"
            },
            {
              "label": "沙特铁路公司：车票类别",
              "href": "https://www.sar.com.sa/east-train/ticketcategories/"
            },
            {
              "label": "沙特铁路公司：特殊协助",
              "href": "https://www.sar.com.sa/help/specialhelp/"
            },
            {
              "label": "优步",
              "href": "https://www.uber.com/sa/en/r/cities/taxi/al-ahsa-al-mintaqah-al-sharqiyah-sa/"
            }
          ]
        }
      ]
    }
  ],
  "faqH": "常见问题",
  "faqs": [
    {
      "q": "哈萨有公交车吗？",
      "a": "有。沙特公共交通公司每天早上 5:30 至晚上 11:30 运营哈萨公交；可在哈萨公交应用中购票，或使用公交卡。"
    },
    {
      "q": "如何乘火车前往哈萨？",
      "a": "沙特铁路公司的东部铁路往返于利雅得与达曼之间，途中停靠哈萨的胡富夫。可通过沙特铁路公司的网站、应用程序或车站售票处购票。"
    },
    {
      "q": "哈萨有优步和 Careem 吗？",
      "a": "优步在哈萨提供 UberX 服务，Careem 提供从哈萨国际机场出发的行程。打开应用即可查看价格和上车点。"
    },
    {
      "q": "在哈萨乘出租车要多少钱？",
      "a": "沙特运输总局制定的公共出租车收费标准为：起步价 6.4 沙特里亚尔（夜间 10 里亚尔），每公里 2.1 里亚尔，最低车费 10 里亚尔。"
    }
  ],
  "keepH": "在路上",
  "keepP": "如需查询紧急电话（包括交通警察、道路安全部门和救护车），或了解发生事故、车辆故障后该怎么做，请查看本站页面",
  "keepLink": "紧急情况与求助",
  "disclaimer": "以上信息均为所列机构在核实当日公布的内容，不保证服务一定可用或价格不变。Visit Al-Ahsa 不售票，也不代订行程。"
};
