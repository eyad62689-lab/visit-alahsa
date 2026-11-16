# Blind reader report (Turkish, /tr/emergency/)

Overall: the page is mostly clear, calm and idiomatic. Suffixes on numbers (911'i, 997'yi, 999'u, 993'ü, 994'ü, 937'ye) are all correct. The real problems are the Najm paragraph, a few places where I could not tell whom to call, and some foreign-sounding institutional phrasing.

## HIGH

1. Quote: "Najm'a, yani resmî uygulaması trafik kazalarını bildirmeyi kolaylaştıran Najm Sigorta Hizmetleri şirketine, uygulama üzerinden ya da 199033 numaralı müşteri hizmetlerinden ulaşın."
   Problem: a long relative clause is wedged between the dative noun and its verb. I lost the thread before "ulaşın" arrived, and "Najm'a, yani ... şirketine" says the same thing twice. A visitor under stress will not parse it.
   Severity: high
   Fix: split it up. For example: "Najm, trafik kazalarını bildirmek için kullanılan resmî uygulamadır. Uygulama üzerinden ya da 199033 numaralı müşteri hizmetlerinden ulaşın."

2. Quote: "Birleşik Ulusal Platformun listesinde sigortalı araçların karıştığı kazalar için 920000560 numarası yer alır. Kaza Najm'ın yetki alanı dışındaysa Najm'ın yönlendirmesi üzerine Trafik Polisi için 993'ü arayın."
   Problem: I could not tell what to do in a minor crash. There are two Najm numbers (199033 and 920000560), and the text never says which one I should dial. "Najm'ın yetki alanı dışındaysa" is never explained: what kind of accident is outside Najm's scope? "Najm'ın yönlendirmesi üzerine ... 993'ü arayın" is a chain (call Najm, they redirect, then I call 993) that I would not follow. The earlier table also lists 993 plainly as "Trafik kazası", so the page seems to contradict itself about when to call 993 directly.
   Severity: high (misunderstanding whom to call)
   Fix: say in one line which number is for what, and name the case where 993 is called directly. If something is missing from the source, state that it is missing and do not fill it in.

## MEDIUM

3. Quote: "Bu numarayı verdikten sonra hatta kalın; size kapatabileceğiniz söylenene kadar talimatlara uyun."
   Problem: "size kapatabileceğiniz söylenene kadar" stumbled. The object (the phone) is missing and the word order is odd.
   Severity: medium
   Fix: "telefonu kapatabileceğiniz size söylenene kadar" or "görevli kapatmanızı söyleyene kadar".

4. Quote: "Birleşik Ulusal Platformun listesinde ..." (the lines before the 112 note, the Najm paragraph and the 920000560 table row), against "Kaynaklar: Ulusal Platform — acil durum numaraları" and "Ulusal acil durum numaraları".
   Problem: the same body appears as "Birleşik Ulusal Platform", "Ulusal Platform" and "Ulusal acil durum numaraları". I wondered whether these are three different sites. A Turkish reader also gets no hint of what it is: a website, an app, or a government portal?
   Severity: medium
   Fix: use one name everywhere. Say what it is once, for example "Birleşik Ulusal Platform (resmî bilgi portalı)".

5. Quote: "Birleşik Ulusal Platformun listesinde SIM kart olmadan yapılan aramalar için 112 numarası yer alır (Sıkça sorulan sorular bölümüne bakın)." and, in the FAQ: "112, SIM kart olmadan da aranabilen bir acil durum numarasıdır; ancak bu, şebeke yokken de arayabileceğiniz anlamına gelmez."
   Problem: nowhere does it say who answers 112 or what to ask for there. I would not know whether it is a replacement for 911. "şebeke yokken de" with "de" reads oddly after "SIM kart olmadan da", and the two "de"s blur the point. The first mention also gives the page's most important fallback only as a passing note.
   Severity: medium
   Fix: say what 112 is for (if known), and rephrase the last clause: "ancak bu, hiç şebeke olmasa da arama yapabileceğiniz anlamına gelmez."

6. Quote: "Doğu Bölgesi'ndeki 911 merkezi birçok dilde bildirim alır; ancak her dilin her kanalda bulunduğunu varsaymayın."
   Problem: "her kanalda" is abstract. Which channels? Phone, text, app? I could not tell what to do differently. It is also left hanging: can I get English help or not? The Arabic phrase "İngilizce yardım" just above suggests yes.
   Severity: medium
   Fix: name the channels, or drop the second clause.

7. Quote: "İfadeyi size yardım eden kişiye gösterin ya da ona okuyun."
   Problem: the Arabic lines are in Arabic script. A Turkish visitor cannot read them aloud, so "ona okuyun" cannot be done. There is no transliteration, and the singular "İfadeyi" for a whole grid of phrases is slightly off. This is a content question, but the instruction as written is not workable.
   Severity: medium
   Fix: "Uygun ifadeyi size yardım edecek kişiye gösterin" (drop "okuyun"), or add a pronunciation line.

8. Quote: "Kazayı Najm'ın kapsamı ve hizmet koşulları çerçevesinde nasıl bildireceğinizi sorun."
   Problem: bureaucratic register ("kapsamı ve hizmet koşulları çerçevesinde") and it tells me nothing concrete. It sounds like a legal disclaimer in the middle of practical advice.
   Severity: medium
   Fix: "Kazayı nasıl bildireceğinizi Najm'a sorun."

9. Quote: 911 "Acil tehlike ya da yetkililerin müdahalesini gerektiren acil durum", 999 "Güvenlik ihbarı, saldırı ya da hırsızlık", 998 "Yangın, mahsur kalan biri ya da kurtarma", 997 "Ambulans gerektiren yaralanma ...".
   Problem: content question. Several numbers cover the same situations (fire: 911 or 998; assault: 911 or 999; injury: 911 or 997). The page says "911'i arayın" first, but a panicked visitor still has to choose. The text near the table does not say "if unsure, call 911".
   Severity: medium
   Fix: add a one-line fallback after the table: "Hangi numarayı arayacağınızdan emin değilseniz 911'i arayın." (only if the source supports it).

10. Quote: "Sıcak bitkinliği ve sıcak çarpması" (heading) with the following paragraphs.
    Problem: the heading names heat exhaustion, but the text only describes prevention and the emergency stage (heat stroke). A visitor with only mild exhaustion symptoms gets no guidance. This is a content gap.
    Severity: medium
    Fix: only if the source has it, say what to do for the milder stage.

## LOW

11. Quote: "El-Ahsa'da acil bir tehlike ya da acil bir durum mu var? 911'i arayın."
    Problem: "acil ... acil" repeats within the sentence, and "acil durum" (in the next line, "Acil tehlike ya da yetkililerin müdahalesini gerektiren acil durum") repeats it again. It reads clumsily.
    Severity: low
    Fix: "El-Ahsa'da hayati bir tehlike ya da acil bir durum mu var?" (if the source supports "hayati"); otherwise leave.

12. Quote: "... ardından şehir ya da köy, mahalle, yol adı ya da bilinen bir yer adı ve en yakın giriş."
    Problem: "en yakın giriş" (entrance to what?) is unclear, and the list of "ya da" is hard to scan. The "Önce konum: El-Ahsa, ardından ..." sentence is fragmentary.
    Severity: low
    Fix: name what the entrance belongs to, or drop it.

13. Quote: "özellikle açıkta kalan yerlere ve şehirler dışındaki yollara gidecekseniz"
    Problem: "açıkta kalan yerler" is unusual (it suggests places left exposed). I read it twice.
    Severity: low
    Fix: "açık arazilere" or "kırsal alanlara".

14. Quote: "Kendi durumunuz araç kullanmanızı etkileyebilecekse direksiyona geçmeyin."
    Problem: "Kendi durumunuz" is vague (your own condition after the incident?). It is understandable but foreign-sounding.
    Severity: low
    Fix: "Kendinizi iyi hissetmiyorsanız ya da şoktaysanız ..." (only if the source allows it).

15. Quote: "Sağlık durumunuzun elverdiği ölçüde düzenli olarak su içmeye özen gösterin"
    Problem: heavy and slightly bookish for a simple tip, and the caveat is fuzzy (is there a health reason not to drink water?).
    Severity: low
    Fix: "Düzenli olarak su için (doktorunuz kısıtlamadıysa)."

16. Quote: "Kaybolan pasaport ya da belgeler: bildirim işlemleri konusunda yönlendirilmek için polise 999'u arayarak başvurun."
    Problem: "arayarak başvurun" (apply by calling) is a mismatched verb for a phone call. "bildirim işlemleri konusunda yönlendirilmek için" is bureaucratic.
    Severity: low
    Fix: "Polisi 999'dan arayın; size bildirimin nasıl yapılacağını söylerler."

17. Quote: "Ambulans yerine 937'yi mi aramalıyım?" with the answer "... 937'yi ise danışmanlık, yönlendirme ve sağlık hizmetleri için kullanın."
    Problem: the answer does not open with a clear "Hayır", and "sağlık hizmetleri" is vague next to "danışmanlık". The first sentence is fine; the second leaves me unsure what 937 is for.
    Severity: low
    Fix: begin with "Hayır." and use "acil olmayan sağlık danışmanlığı" as on the page above.

18. Quote: "Arapça bilmiyorum. İngilizce yardıma ihtiyacım var."
    Problem: grammatical, but "İngilizce yardıma ihtiyacım var" is a little translation-flavoured.
    Severity: low
    Fix: "İngilizce yardım almam gerekiyor."

19. Quote: "Kral Fahd Hastanesi, Hüfuf Sağlık Bakanlığı"
    Problem: "Hüfuf" is an unfamiliar spelling to me (I know Hofuf/Hufuf), and the hospital row reads like a bare name pair with no punctuation or dash separating hospital and operator ("Prens Suud bin Cilevi Hastanesi Sağlık Bakanlığı"). This may be only the extraction artifact.
    Severity: low
    Fix: check the spelling of Hofuf; ensure the name and operator are visually separated on the page.

20. Quote: "Birinin güvenliği tehlikedeyse kendi arayışınızın bitmesini beklemeden hemen haber verin."
    Problem: repeats the earlier "hemen ... 911'i arayın", and "kendi arayışınız" is vague (your own search?).
    Severity: low
    Fix: "Birinin güvenliği tehlikedeyse aramayı bırakıp hemen 911'i arayın."

21. Quote: "911 ve 997 numaraları; kaldığınız yerin adı, adresi ve resepsiyon numarası."
    Problem: the list items in "Gezinizden önce ..." are bare noun phrases with no verb, while the heading promises "hazır bulundurun". It works as a list but reads as a fragment.
    Severity: low
    Fix: none needed.

## Content questions (short)

- Poisoning: the page says to call 937 first and 997 only if the person is unconscious or severely unwell. Is that the intended order for the visitor? It differs from the "call the ambulance first" tone elsewhere.
- Is 999 for police and 911 for emergencies a real split, or can either be used?
- Does 112 reach the same service as 911? The page never says.
- Najm: what is the "yetki alanı" (scope), and how do I know a crash is outside it?
- Arabic phrases: will a transliteration be provided for visitors who cannot read Arabic?
