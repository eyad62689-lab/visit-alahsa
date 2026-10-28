# 05d proof of judge round 2 (tr-ui-1): two edited strings

Scope: `search.escHint` and `trails.partOf` in `07-judge.r2.json` (strings, changes, rulings, tm_pairs), checked against the other 93 strings (95 keys in all), the pack entries and `05-proofreader.md` items 1-11. No file was changed and no `.check.txt` was created.

## 1. search.escHint: "ile kapatın · ok tuşlarıyla seçin · Enter ile açın"

Verdict: **OK**. No mandatory fix and no optional fix.

- Letters: ı, ş, ç are present and correct. No capitalised i/ı occurs inside the string, so there is no İ/I issue. No ASCII-stripped forms.
- Suffix: "ok tuşlarıyla" is correct. "ok tuşu" is a compound, so its plural is "ok tuşları" (tuş-lar-ı) and the instrumental is "ok tuşlarıyla". It is not "tuşlarla". The back-vowel harmony after "tuş-" holds.
- "Esc ile": the key cap is a separate element and "ile" is written apart, which is correct for a Latin key name. "Enter ile açın" is also correct. Capital E in Enter matches the key name. The lowercase "ile" opening the string is right, since it follows the cap (the source "to close" is lowercase too).
- Register: kapatın, seçin and açın are polite-plural imperatives, consistent with UI1-controls and the other buttons such as "Aramayı kapatın".
- "seçin" for "arrows to move" is ruled by UI1-gezinmek (no "gezinmek" next to "gezi"). The text covers the same function as the source and adds nothing.
- Punctuation: the separator is U+00B7 with single spaces, as in the source. The string has no NBSP, no U+2019, no straight quote and no final full stop. The hint line keeps the source's three-part order.
- Consistency: "ok tuşları" appears nowhere else in the batch, so nothing conflicts. The UI1-controls and UI1-gezinmek amendments name it explicitly. The pack precedents (de "Pfeiltasten", zh 方向键) also name the keys.
- Length: it is 6 characters longer, with no overflow risk beyond the judge's note. The phone-width fit is unmeasured, as the judge already says in `notes`.

## 2. trails.partOf: "Bu yeri içeren rotalar"

Verdict: **OK**. No mandatory fix. One optional remark, with no action required.

- Letters and suffixes: "yeri" is the accusative of yer (no consonant change) and "içeren" is the participle of içermek, with front harmony. Both are correct. "rotalar" is correct. There is no apostrophe, since no proper name is involved.
- P9: sentence case with the initial B and the rest lowercase. There is no final full stop, which suits an h2 heading.
- Consistency: "rota" matches nav.trails "Rotalar" and det.nearby.d "Rotanıza". "Bu yeri" matches fav.add "Bu yeri kaydedin" and the "yer" = place line of UI1-yer-heading. The old "Yer aldığı" garden-path problem is gone, as the new ruling says. The TM pair (en "Part of these trails" to "Bu yeri içeren rotalar") is recorded.
- Register: a noun phrase for a section heading, as UI1-controls requires. No gloss inside the heading.
- Faithfulness (optional, no action): "Bu yeri" names the place, which the source "Part of these trails" and ar "ضمن المسارات" leave implicit. Turkish needs an explicit subject here, and the h2 sits on the attraction page, so "Bu yeri" is the same place as the page. This is acceptable and is not an added fact. The precedents show the same choices: ru "Входит в маршруты" is subject-less, de "Station auf empfohlenen Routen" adds "recommended", and zh/ur are subject-less. "Bu yeri içeren rotalar" is the closest natural Turkish form that is not read as the noun "yer". "Dahil olduğu rotalar" would again lack a subject. I would not change it.

## Rulings and cross-check

- UI1-controls, UI1-gezinmek and UI1-yer-heading are internally consistent with the two edits and with the other strings.
- A scan of the 95 strings for ok/tuş/rota/içer finds only these four strings, with no clash.
- Character scan: the non-ASCII code points in the two strings are only ı, ş, ç and the middle dot (U+00B7). There is no U+00A0, no U+2019 and no straight quote.
- Not verifiable by proofreading and already flagged by the judge: the fresh blind read of these two spots and the phone-width fit of the longer escHint line.
