# Source issues (advisor-ui, zh) - recorded, not fixed

1. advisor.chip3: English "Hasawi food" deviates from the Arabic «المطبخ الأحسائي» (site rule: Ahsai not Hasawi). Followed the Arabic.
2. advisor.intro: English "Hala!" under-renders «يا هلا والله!» (a hearty Gulf welcome) and English drops "ما يعرفها إلا" nuance only partially; Arabic line 3 says «طلعة» (an outing), English "an outing" is fine. English "palm by palm" is an idiom for «نخلة نخلة».
3. advisor.chip2: English "hours and fees?" is not a full question and has no first-person form; Arabic is a full question «ما مواعيد جبل القارة ورسومه؟». Followed the Arabic. Note fees are asked while the site marks Jabal Al-Qarah fees as owner-confirmed only; the model answers from site content.
4. advisor.rate: Arabic «بين يديك» / English "all yours" are idiomatic; both mean freely available.
5. advisor.notice: "not stored" is a legal claim of the owner; kept as is, not verified here.
6. Pack context says nav.plan zh «行程规划»; confirmed in ui.ts line 925.
