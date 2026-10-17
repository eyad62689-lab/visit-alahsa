// مولَّد بـtools/translation/apply-visa-guide.mjs من zh-translation/output/visa-guide/judge.json (2026-10-17، الدرجة 93) — لا يُحرَّر يدوياً؛
// أي تعديل يمرّ بخط zh-translation-pipeline ثم يُعاد التطبيق.
import type { VisaGuideContent } from './visa-guide';

export const VISA_ZH: VisaGuideContent = {
  "seo": {
    "title": "哈萨之旅的沙特访问签证：选对申请途径",
    "description": "几分钟内为您的哈萨之旅选对沙特访问签证：8 种途径，逐一说明各自适合谁、有效期多长，并附官方申请链接。现在就开始规划您的行程。"
  },
  "h1": "沙特访问签证：哈萨之旅简明指南",
  "lead": "您的哈萨之旅，从一张适合您的沙特访问签证开始。本指南将 8 种签证办理途径汇于一页，简要说明每种途径适合谁、签证有效期多长、到哪里申请，随后引导您前往政府部门的官方平台，在那里完成申请。",
  "feesLine": "签证费用将在官方平台提交申请时显示。",
  "verifyLine": "相关条件可能变动，申请前请先通过官方渠道核实。",
  "updatedLine": "最后更新：2026 年 10 月 16 日",
  "intro": {
    "h": "哈萨有什么值得期待？",
    "parts": [
      "哈萨绿洲已列入联合国教科文组织世界遗产名录，卡拉山、易卜拉欣宫、凯撒利亚集市，以及绿洲的泉眼与椰枣林都在这里。您可以浏览",
      {
        "t": "哈萨景点",
        "href": "/zh/attractions/"
      },
      "，查看您出行日期前后的",
      {
        "t": "活动",
        "href": "/zh/events/"
      },
      "，挑选",
      {
        "t": "住宿",
        "href": "/zh/stay/"
      },
      "，再到",
      {
        "t": "行程规划",
        "href": "/zh/plan-your-trip/"
      },
      "页面细细安排。若您要找的是专门针对哈萨的旅游签证，请注意：哈萨是沙特的一座城市，您需要的是沙特访问签证。"
    ]
  },
  "table": {
    "h": "选择您的办理途径",
    "caption": "沙特访问签证 8 种办理途径一览",
    "head": [
      "途径",
      "适用人群",
      "有效期与停留时长",
      "官方平台"
    ],
    "rows": [
      [
        "旅游电子签证",
        "符合条件国家的公民，申根、美国或英国签证持有人及上述地区的永久居民，以及海湾合作委员会（海合会）国家居民",
        "有效期 1 年，多次入境，停留最长 3 个月",
        "visa.visitsaudi.com"
      ],
      [
        "海合会国家居民",
        "持有有效期不少于 3 个月的海合会国家居留许可者",
        "多次入境：有效期 1 年，停留 90 天；单次入境：90 天",
        "ksavisa.sa"
      ],
      [
        "通过 Nusuk 平台办理副朝",
        "有意履行副朝者",
        "有效期 365 天，多次入境，累计停留最长 90 天",
        "umrah.nusuk.sa"
      ],
      [
        "中转停留（过境）",
        "乘坐沙特阿拉伯航空（Saudia）或纳斯航空（flynas）且行程含沙特境内中转停留的乘客",
        "停留最长 96 小时",
        "订机票时办理"
      ],
      [
        "家庭与个人访问",
        "受沙特公民或居民邀请者",
        "申请时确定",
        "visa.mofa.gov.sa"
      ],
      [
        "商务访问",
        "受沙特境内企业或机构邀请者",
        "申请时确定",
        "ksavisa.sa"
      ],
      [
        "套餐签证",
        "印度、巴基斯坦、孟加拉国、印度尼西亚、埃及、约旦和墨西哥护照持有人",
        "申请时确定",
        "获得许可的服务商"
      ],
      [
        "电子旅行许可",
        "英国公民",
        "2 年内可多次访问",
        "ksavisa.sa"
      ]
    ]
  },
  "routes": [
    {
      "id": "tourist",
      "h": "沙特旅游电子签证：适合哪些人？",
      "who": {
        "label": "这种签证适合谁？",
        "text": "平台所列符合条件国家的公民；持有有效的申根、美国或英国访问签证者；美国、欧盟或英国的永久居民；以及海合会国家居民。可用于旅游、参加活动、探亲与副朝；不可用于朝觐、工作或学习。"
      },
      "validity": {
        "label": "有效期与停留时长：",
        "text": "自签发之日起 1 年有效，多次入境，停留最长 3 个月。"
      },
      "cta": {
        "label": "前往官方平台申请",
        "href": "https://visa.visitsaudi.com/Registration/Verify"
      }
    },
    {
      "id": "gcc",
      "h": "以海合会国家居民身份游览哈萨",
      "who": {
        "label": "这种签证适合谁？",
        "text": "持有有效期不少于 3 个月居留许可的海合会国家居民。"
      },
      "validity": {
        "label": "有效期与停留时长：",
        "text": "两种选择：多次入境，有效期 1 年，停留 90 天；或单次入境，有效期 90 天，停留 90 天。"
      },
      "cta": {
        "label": "前往官方平台申请",
        "href": "https://ksavisa.sa/visa/tourism/details"
      }
    },
    {
      "id": "umrah",
      "h": "通过 Nusuk 平台办理副朝签证",
      "who": {
        "label": "这种签证适合谁？",
        "text": "有意通过获得许可的服务商提供的套餐履行副朝者。Nusuk 还为海合会国家公民与居民，以及所有类型签证的持有人提供免签套餐。"
      },
      "validity": {
        "label": "有效期与停留时长：",
        "text": "自签发之日起 365 天有效，多次入境，累计停留最长 90 天。"
      },
      "cta": {
        "label": "前往官方平台申请",
        "href": "https://umrah.nusuk.sa/"
      }
    },
    {
      "id": "stopover",
      "h": "中转停留（过境）签证：在沙特阿拉伯转机停留",
      "who": {
        "label": "这种签证适合谁？",
        "text": "预订沙特阿拉伯航空或纳斯航空航班且行程含沙特境内中转停留的乘客。签证在订机票时申请。"
      },
      "validity": {
        "label": "停留时长：",
        "text": "最长 96 小时。"
      },
      "cta": {
        "label": "在官方页面查看详情",
        "href": "https://www.visitsaudi.com/en/campaigns/saudi-stopover"
      }
    },
    {
      "id": "family",
      "h": "家庭与个人访问签证",
      "who": {
        "label": "这种签证适合谁？",
        "text": "受沙特公民或居民邀请者。家庭访问面向亲属：海合会国家公民的直系亲属（父母、妻子和子女），以及居民的亲属。个人访问面向与邀请人既无亲属关系也无商务关系者。由邀请人在沙特外交部平台在线发起申请。"
      },
      "cta": {
        "label": "前往官方平台申请",
        "href": "https://visa.mofa.gov.sa/Home/Index2?service_type=2"
      }
    },
    {
      "id": "business",
      "h": "商务访问签证",
      "who": {
        "text": "面向与沙特境内公司或机构有商务往来并受其邀请者。由邀请机构发起申请，随后在沙特外交部平台完成。"
      },
      "cta": {
        "label": "前往官方平台申请",
        "href": "https://ksavisa.sa/visa/business-visit/apply"
      }
    },
    {
      "id": "package",
      "h": "套餐签证（试行阶段）",
      "who": {
        "text": "面向印度、巴基斯坦、孟加拉国、印度尼西亚、埃及、约旦和墨西哥护照持有人，通过获得许可的服务商提供的机票与住宿套餐办理。"
      },
      "cta": {
        "label": "在官方页面查看详情",
        "href": "https://www.visitsaudi.com/en/campaigns/package-visa"
      }
    },
    {
      "id": "uk",
      "h": "英国公民电子旅行许可",
      "who": {
        "text": "面向英国公民，每人须单独申请，儿童也不例外。可在 2 年内多次访问。"
      },
      "cta": {
        "label": "前往官方平台申请",
        "href": "https://ksavisa.sa/explore-visa-options/aab79697-b721-4907-b772-62a9bb42c36e"
      }
    }
  ],
  "arrive": {
    "h": "拿到签证后，如何前往哈萨？",
    "air": [
      "乘飞机：经哈萨国际机场（Al-Ahsa International Airport），或经达曼的法赫德国王国际机场（King Fahd International Airport）再换乘汽车或火车前往。"
    ],
    "land": [
      "从巴林陆路入境：经法赫德国王大桥。出行前，请在",
      {
        "t": "法赫德国王大桥管理局",
        "href": "https://kfca.sa/en/"
      },
      "网站查看大桥的入境条件，并在 ",
      {
        "t": "Visit Saudi 帮助中心",
        "href": "https://www.visitsaudi.com/en/help-center"
      },
      "查看各口岸的入境条件。"
    ],
    "more": [
      "乘火车与自驾抵达的详情，以及自利雅得、达曼出发的距离，请见",
      {
        "t": "如何抵达",
        "href": "/zh/plan-your-trip/#getting-there"
      },
      "一节。"
    ]
  },
  "next": {
    "h": "拿到签证后的下一步",
    "items": [
      {
        "label": "如何抵达：",
        "parts": [
          {
            "t": "公路、机场与火车",
            "href": "/zh/plan-your-trip/#getting-there"
          },
          "。"
        ]
      },
      {
        "label": "住宿：",
        "parts": [
          {
            "t": "哈萨的住宿选择",
            "href": "/zh/stay/"
          },
          "。"
        ]
      },
      {
        "label": "何时出行：",
        "parts": [
          {
            "t": "最佳游览季节",
            "href": "/zh/plan-your-trip/#practical"
          },
          "。"
        ]
      },
      {
        "label": "看什么：",
        "parts": [
          {
            "t": "景点",
            "href": "/zh/attractions/"
          },
          "、",
          {
            "t": "活动",
            "href": "/zh/events/"
          },
          "与",
          {
            "t": "互动地图",
            "href": "/zh/map/"
          },
          "。"
        ]
      },
      {
        "label": "收藏心仪景点：",
        "parts": [
          "将喜欢的地方存入",
          {
            "t": "“我的收藏”",
            "href": "/zh/plan/"
          },
          "，即可获取一条现成路线。"
        ]
      }
    ]
  },
  "faq": {
    "h": "沙特访问签证常见问题",
    "items": [
      {
        "q": "沙特旅游电子签证有效期多久？",
        "a": "自签发之日起 1 年有效，多次入境，每次停留最长 3 个月。"
      },
      {
        "q": "旅游电子签证可以延期吗？",
        "a": "不可以。如果签证在您入境沙特前过期，须重新申请。"
      },
      {
        "q": "海合会国家居民去哈萨需要签证吗？",
        "a": "需要。海合会国家居民符合旅游途径的申请条件，可通过沙特外交部平台申请。"
      },
      {
        "q": "持旅游签证可以履行副朝吗？",
        "a": "可以。副朝属于旅游电子签证允许的活动，但朝觐不在允许之列。"
      },
      {
        "q": "持旅游签证可以工作吗？",
        "a": "不可以。旅游签证用于旅游、副朝和探亲，不允许工作或学习。"
      },
      {
        "q": "如何邀请亲属来哈萨探望我？",
        "a": "由邀请人在沙特外交部签证平台在线发起申请，且邀请人须与受邀人有亲属关系。"
      },
      {
        "q": "我在沙特阿拉伯中转，可以出机场吗？",
        "a": "可以。沙特阿拉伯航空和纳斯航空的乘客可在订机票时办理中转停留签证，停留最长 96 小时。"
      }
    ]
  },
  "links": {
    "h": "官方链接",
    "head": [
      "途径",
      "链接",
      "主管部门"
    ],
    "rows": [
      {
        "route": "旅游电子签证",
        "href": "https://visa.visitsaudi.com/Registration/Verify",
        "org": "沙特旅游部"
      },
      {
        "route": "海合会国家居民",
        "href": "https://ksavisa.sa/visa/tourism/details",
        "org": "沙特外交部"
      },
      {
        "route": "通过 Nusuk 平台办理副朝",
        "href": "https://umrah.nusuk.sa/",
        "org": "沙特朝觐和副朝部"
      },
      {
        "route": "中转停留（过境）",
        "href": "https://www.visitsaudi.com/en/campaigns/saudi-stopover",
        "org": "沙特旅游部"
      },
      {
        "route": "家庭与个人访问",
        "href": "https://visa.mofa.gov.sa/Home/Index2?service_type=2",
        "org": "沙特外交部"
      },
      {
        "route": "商务访问",
        "href": "https://ksavisa.sa/visa/business-visit/apply",
        "org": "沙特外交部"
      },
      {
        "route": "套餐签证",
        "href": "https://www.visitsaudi.com/en/campaigns/package-visa",
        "org": "沙特旅游部"
      },
      {
        "route": "电子旅行许可",
        "href": "https://ksavisa.sa/explore-visa-options/aab79697-b721-4907-b772-62a9bb42c36e",
        "org": "沙特外交部"
      },
      {
        "route": "法赫德国王大桥",
        "href": "https://kfca.sa/en/",
        "org": "法赫德国王大桥管理局"
      }
    ]
  }
};
