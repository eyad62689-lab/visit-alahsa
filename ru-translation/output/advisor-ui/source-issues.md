# Source issues, advisor-ui (ru), 2026-10-27

Recorded, not fixed.

1. pack.context calls the bird "white-cheeked" (the owner's 2026-10-23 Arabic: «أبيض الخدين»), while the termbase entry for the mascot still has ar «أبيض الأذنين» / ru «белоухий бюльбюль» (superseded ar, en kept "white-eared"). The termbase flags the Arabic as superseded but the entry has no ar update. None of the 17 strings names the species, so no effect here.
2. advisor.intro: en "Hala!" does not render the Arabic «يا هلا والله!» (hearty, with God's name); en line 2 "palm by palm" drops the exclamation mark of the Arabic. Arabic line 3 «جاي تتمشى» ("are you coming to stroll") reads as a pre-arrival or on-site ambiguity; English "Just strolling" fixes it as on-site. ru follows a neutral «Хотите просто прогуляться».
3. advisor.chip3: en «Hasawi food» deviates from ar «المطبخ الأحسائي» (pack already notes this).
4. advisor.chip1: ar «ماذا أزور» is first person; en "What should I see" is a recommendation request. Both sent as the visitor's question; no conflict in ru.
5. advisor.rate: ar «بلغت الحد اليومي» is literally "you reached the limit" (en matches). No defect.
6. advisor.open role says "≤ 14 Latin characters"; the natural ru («Спросите Бюльбюля», 17) exceeds it; the limit is a Latin-script measure and should be restated per language.
7. Termbase maps the brand "Visit Al-Ahsa" to «Аль-Ахса» (site name), while the pack requires the Latin «Visit Al-Ahsa» in advisor.title; ui.ru foot.independence already uses Latin «Visit Al-Ahsa», so there is precedent, but the termbase entry does not state the exception.
8. Termbase evidence gap: ru.wikipedia.org/wiki/Белоухий_бюльбюль returned 404 on 2026-10-27, and the "Настоящие бюльбюли" page has no Russian name for Pycnonotus leucotis, so «белоухий бюльбюль» is not corroborated by what could be fetched.
9. advisor.you: reserved label, not rendered; the one-word capital «Вы» conflicts mechanically with the "zero capitalized Вы" proofreader check.
