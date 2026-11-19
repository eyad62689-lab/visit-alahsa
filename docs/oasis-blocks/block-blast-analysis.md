# Reference analysis: the block-placement genre and "Block Blast!"

Purpose: understand what makes the genre work so the Visit Al-Ahsa game can be an
**original** member of it. Nothing here is copied into the game. No name, logo, artwork,
sound, text, colour scheme or screen layout of "Block Blast!" is reused.

Confidence labels:
- **High:** stated by the publisher's own store listing.
- **Medium:** consistent across several independent descriptions, but not from the publisher.
- **Low:** commentary or third-party estimates.
- **Gap:** not established.

## 1. Identity

| Claim | Confidence | Source |
|---|---|---|
| "Block Blast!" is by Hungry Studio. The App Store seller is ARETIS LIMITED. | High | [App Store listing](https://apps.apple.com/us/app/block-blast/id1617391485) |
| The listing says "Contains Advertising". | High | same |

## 2. Core loop (genre mechanics)

Genre mechanics are not protectable expression. They are listed so the design can decide
consciously what to keep and what to change.

| Mechanic | Confidence | Source |
|---|---|---|
| 8x8 board. | High | App Store listing |
| Pieces come in a "set of blocks" and are dragged onto the board. The player chooses each position. | High | App Store listing |
| A complete row or column clears and scores. | High | App Store listing |
| Clearing several lines at once and chaining combos scores more. | High (exists) / Gap (exact formula) | App Store listing; [fan guide](https://blockblast-free-nocms-publish.pages.dev/wiki/how-to-play-blockblast) |
| Three pieces per set. A new set appears only after all three are placed. | Medium | [fan guide](https://blockblast-free-nocms-publish.pages.dev/wiki/how-to-play-blockblast), [bubbleshooter.com](https://www.bubbleshooter.com/g/block-blast) |
| Pieces cannot be rotated. | Medium | fan guides (the publisher's listing says nothing) |
| The game ends when none of the remaining pieces fits. | Medium | fan guides |
| Modes: endless high-score play, an "Adventure" mode with progressive levels and themes, and daily puzzles. | High | App Store listing |
| Exact scoring values, combo multiplier, streak rules and piece-generation algorithm. | **Gap** | No official source. Fan sites contradict each other. |

## 3. Why it engages (interpretations)

| Claim | Confidence | Source |
|---|---|---|
| "Easy to learn, hard to master". Retention is reported to be above the industry average. | Low (self-reported, no figures) | Developer interview reported in search results. The primary page could not be fetched (404). |
| D1 26.7%, D7 13.4%, D30 7.1%, and more than 30 million daily active users in 2025. | Low (third-party estimate, AppMagic data) | maf.ad analysis (now redirects to a 404) |
| Praise text ("Amazing!") and haptics after combos act as reinforcement. | Low | [Lilach Bullock](https://www.lilachbullock.com/what-makes-block-blast-style-puzzle-games-popular/), [EmpowHer](https://www.empowher.com/groups/blogs/posts/why-block-blast-keeps-players-coming-back) |
| Piece randomness and near-misses resemble variable-reward loops. | Low (opinion) | [The Shield](https://whstheshield.com/2025/03/17/synapse-spark-the-invisible-grip-of-block-blast/) |
| Tension rises naturally as the board fills, and there is no timer. | Medium | several commentaries |

## 4. What we take, what we reject

**Kept as genre conventions:**
- The 8x8 board.
- A set of three pieces with no rotation.
- Row and column clears.
- Bonuses for multi-line clears and streaks.
- An endless mode.

These are what make a block-placement puzzle recognisable at all.

**Rejected deliberately (see `decisions-log.md`):**
- **Ads, purchases, revives-for-ads and any currency.** The site has no commercial layer, and the brief forbids them.
- **Unbounded variable-reward tricks.** There are no fake near-misses. The piece generator is *fair*: every set it deals contains at least one piece that fits the board at that moment. It is never rigged against the player.
- **Praise pop-ups and haptic spam.** Feedback is short, calm and optional. Sound can be turned off, and reduced motion is respected.
- **Daily streak pressure and timed events.** Progress is never lost or time-gated.
- **Its visual identity.** We use the site's own identity instead: mud-brick, palm and water tones from `tokens.css`, and real photos of Al-Ahsa landmarks.

## 5. Gaps declared

- **No exact scoring formula is published.** Ours is our own (see `game-design.md` §4) and does not attempt to match the original's.
- **No retention figure here is verified.** None is used to justify a design choice.
