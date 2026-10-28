# 05d - proofread of the 7 judge edits (tr-ui-1, 07-judge.r1.json)

Verdict: 7 OK, 0 MANDATORY, 1 OPTIONAL (non-blocking).

Mechanical: each edit equals its `strings` value; 95 keys; no NBSP, no U+2019, no straight quote, no «»; İ in "İsme" is U+0130; all Turkish letters present; checker RESULT [OK] 0 findings (run on the judge file; the check file it wrote was deleted again).

## Per edit

1. inline.attractions.groupsHint - "İsme göre arayın ya da aşağıdaki gruplara göz atın." - OK.
   Letters, suffixes and P9 correct. Faithful to en/ar (search by name, browse the groups). The "ada" homograph is gone. "ya da" and "göz atın" match the rest of the batch.

2. list.map - "Haritada görüntüleyin" - OK.
   Polite-plural button form per UI1-controls. Consistent with det.openMaps ("Google Haritalar'da açın ↗") and nav.map ("Harita"). Faithful to en "View on the map" and ar استعرض.

3. search.escHint - "ile kapatın · oklarla seçin · Enter ile açın" - OK.
   It follows the rendered Esc key cap ("Esc ile kapatın"), so the leading lowercase is right. It obeys UI1-gezinmek: no "gezin" is left anywhere in the 95 strings, and the only "Gezinti yolu" is the aria-label that ruling keeps. "seçin" matches the published zh precedent (方向键选择). The en/ar source says "move/تنقّل", so "seçin" is a small shift in sense, but the arrows do move the highlight.
   OPTIONAL: "yön tuşlarıyla seçin" (or "ok tuşlarıyla seçin") is the more usual Turkish name for the arrow keys. "oklarla" is understood, so no change is required.

4. foot.l.privacy - "Politikalar ve kullanım koşulları" - OK.
   Sentence case, no final full stop. Faithful to en "Policies & Terms" and ar السياسات والشروط; the judge read the target page to settle the sense. The de precedent "Nutzungsbedingungen" agrees. It is a noun-phrase footer link per UI1-controls and does not conflict with UI1-legal.

5. foot.col.site - "Site hakkında" - OK.
   Footer.astro shows the column holds legal, report, contact and WhatsApp (and "About Visit Al-Ahsa" for ar/en only). That is information about the website. "foot.l.about" ("El-Ahsa hakkında") sits in the Discover column; a code comment records the owner's 2026-10-04 move of the about-the-place link out of the Site column. The two "hakkında" labels therefore name different things and do not clash. The edit adds one word, but the bare source "Site" would read as "konut sitesi", and the published zh and ru headings do the same. The string is also the footer nav aria-label; a noun phrase is right there.

6. det.nearby.note - "Mesafeler kuş uçuşu, yaklaşık değerlerdir." - OK.
   Grammatical: "kuş uçuşu" is an adverbial set off by a comma, and "yaklaşık değerlerdir" is the predicate. "yaklaşık" is consistent with data.dist.about. "kuş uçuşu" renders en "in a straight line" and ar بخطٍّ مستقيم, and nothing is added. The sentence is slightly formal but natural enough for a UI note.

7. inline.404.heading - "Vahada yolunuzu şaşırmış gibisiniz" - OK.
   "Vahada" is a common noun, so no apostrophe and a lowercase locative, as the termbase generic_nouns rule requires. "yolunu şaşırmak" is the correct neutral idiom, and "yolunuzu" carries the right siz possessive. P9 sentence case, no final full stop. The oasis image of en/ar is kept. It is consistent with "Vaha meyveleri" and the tagline's lowercase "vaha". It is not the El-Ahsa Vahası proper name, so capitalisation is correct.

## Conflicts with the rest of the 95 strings
None found.
- No "gezin-" forms are left (UI1-gezinmek holds).
- "Gezinizi planlayın" (nav.plan, nav.planVisit) no longer sits next to "gezinin" in the same view.
- "görüntüleyin" appears only in list.map, so there is no mixed verb for "view".
- "seçin" appears in list.lead and search.escHint, and both mean "choose".
- "yaklaşık" is used the same way in det.nearby.note and data.dist.about.
- "Politikalar ve kullanım koşulları" appears nowhere else.
- "hakkında" (foot.col.site, foot.l.about) is used in two different columns for two different referents.

## OPTIONAL suggestions (do not block)
- search.escHint: "yön tuşlarıyla seçin" instead of "oklarla seçin" (more standard name for the arrow keys). Only if length is not a concern in the 'p.sm-foot' line.
- None other.
