# Game design: "Oasis Blocks" (كتل الواحة) — A Journey Through Al-Ahsa

## 1. Summary
An original block-placement puzzle. You place sets of three pieces on an 8x8 board, and
full rows or columns clear.

- **Journey mode:** 12 levels. Each level is an Al-Ahsa landmark. Finishing a level stamps
  a passport and reveals the landmark's photo, its one-line description from the site, and
  a link to its page.
- **Classic mode:** endless, with the best score kept on the device.

It is free, ar/en only (RTL for Arabic), has no sign-up, no backend, no ads and no music,
works offline and can be installed.

## 2. Placement in the site
| | ar | en |
|---|---|---|
| Page | `/ألعاب/كتل-الواحة/` | `/en/play/oasis-blocks/` |
| Hub card | 4th card on `/ألعاب/` | 4th card on `/en/play/` |

- Routes go in `src/lib/routes.ts` as `BLOCKS_ALT`, following `MERGE_ALT`.
- The page uses the site layout: `Base`, `Header`, `PageHero` (compact), and `Footer`.
- The game itself lives in one scoped section, `.blocks-app`, with ids prefixed `bk-`. This
  is the same pattern as the three existing games.

## 3. Rules
1. **Board:** 8x8 cells. A cell is empty or filled. A level may start with some cells
   pre-filled ("stones").
2. **Tray:** three pieces. Pieces are placed in any order, without rotation. The tray
   refills, with three new pieces, only when all three are used.
3. **Placing:** a piece fits if every cell it covers is inside the board and empty.
4. **Clearing:** after each placement, every full row *and* every full column is found
   first, and then all of them are cleared together. A cell that sits in a full row and a
   full column is cleared once.
5. **End of a run:** the game ends when no remaining tray piece fits anywhere. There are no
   revives, no timer and no move limit.
6. **Fair dealing:** every new tray contains at least one piece that fits the board at the
   moment of dealing.
   - The generator draws randomly from the level's piece pool.
   - If no piece in the draw fits, it redraws, up to 50 tries.
   - After that, it replaces one piece with the smallest pool piece that fits.
   - If even the 1x1 piece doesn't fit, the board is full, and the run ends normally.

   The generator never peeks ahead to make a tray *harder*.
7. **Randomness:** use a seedable PRNG (mulberry32) and `crypto.getRandomValues` for the
   seed. Do not use `Math.random` in game logic. Tests must be able to inject a seed.

## 4. Scoring (our own formula)
- **Placing:** +1 point per cell of the placed piece.
- **Clearing:** a placement that clears `L` lines (rows plus columns) scores
  `10 * L * L`. So 1 line = 10, 2 = 40, 3 = 90.
- **Streak:**
  - Each consecutive placement that clears at least one line adds 1 to the streak.
  - A placement that clears nothing resets the streak to 0.
  - The clear score is multiplied by `1 + 0.5 * (streak - 1)` for streak ≥ 2, then floored.
- **Board clear:** if the whole board is empty after a clear, add +100.
- **Display:** the score updates immediately. A short, calm label shows multi-line clears
  ("خطّان" / "2 lines") and streaks ("سلسلة 3" / "Streak 3"). No hyperbolic praise.

## 5. Pieces
Pieces are defined in data as cell offsets. All of them use this one standard set
(polyomino shapes are generic):

| Group | Shapes |
|---|---|
| Small | 1x1, 1x2, 2x1 |
| Lines | 1x3, 3x1, 1x4, 4x1, 1x5, 5x1 |
| Squares | 2x2, 3x3 |
| L corners | small 2x2 L in 4 orientations, big 3x3 L in 4 orientations |
| T | 4 orientations |
| S/Z | 4 orientations |

Each level names its **pool** (a subset) and per-piece **weights**. Early levels use small
pieces, and later levels add 3x3 and 5-long lines.

## 6. Journey levels (data-driven)
**Data:** each level lives in `src/data/play-blocks.ts` with these fields:
- `id`: a number.
- `attraction`: an attraction collection id.
- `img`: an `/img` base name.
- `goalLines`: how many lines to clear to finish the level.
- `stones`: an 8-string pattern where `#` is a pre-filled cell.
- `pool`: the piece ids, with weights.

The **fact shown is not stored in the game**. It is read at build time from the
attraction's `summary` (ar) or `summary_en` (en), verbatim, and the link comes from
`attractionHref`. The build fails if the attraction or the summary is missing. This
guarantees every fact is the site's own text.

| # | Landmark (attraction id) | Image | Goal (lines) | Notes |
|---|---|---|---|---|
| 1 | jabal-al-qarah | jabal-al-qarah | 3 | tutorial level; small pieces only |
| 2 | qasr-ibrahim | qasr-ibrahim | 4 | |
| 3 | qaisariyah | qaisariyah | 5 | |
| 4 | jawatha-mosque | jawatha-mosque | 6 | first stones |
| 5 | khuzam | khuzam-01 | 7 | |
| 6 | sahood | sahood | 8 | |
| 7 | asfar | asfar | 9 | |
| 8 | baiah | baiah-v2 | 10 | |
| 9 | national-park | alahsa-national-park | 11 | |
| 10 | najm-park | najm-park-v2 | 12 | |
| 11 | tahimiyah-e | tahimiyah-e | 13 | |
| 12 | al-uqair | al-uqair | 15 | finale; full pool |

**Progression rules:**
- Level 1 is open. Finishing level N opens level N+1. Finished levels can be replayed.
- A failed run restarts the same level at once.
- Each level records its best score and whether its stamp is earned.

**Solvability check:** a test bot must pass every level, playing greedily (it picks the
placement that clears the most lines, and otherwise the one leaving the fewest isolated
empty cells).
- Over 200 seeds, levels 1–6 must reach `goalLines` in ≥ 90% of seeds and levels 7–12 in
  ≥ 60%.
- Tune `stones`, `pool` and weights until they do. Record the measured rates in
  `decisions-log.md`.

**Completion card:**
- The landmark photo (`-800w.webp`, with explicit width and height), its name, and its
  site summary.
- The link "اكتشف المعلم" / "Visit this landmark's page".
- The passport stamp, then the "next level" button.

## 7. Classic mode
- **Full piece pool, no stones, no goal.**
- **Best score** is stored on the device and shown as "أفضل نتيجة" / "Best".
- **Game over** shows the final score and the best score, with "العب مجدداً" / "Play again".

## 8. Controls and accessibility
- **Pointer:** drag a tray piece onto the board.
  - Use Pointer Events, so mouse, touch and pen all work.
  - While dragging, the piece floats slightly above the finger, so the finger doesn't hide it.
  - A ghost shows where the piece would land, green if it fits and muted red if it doesn't.
  - Releasing on an invalid spot returns the piece to the tray.
- **Tap alternative:** tap a tray piece to select it, then tap a board cell to place it
  (anchored at the piece's top-left cell).
- **Keyboard:**
  - `1`–`3` select a piece, and the arrow keys move the ghost.
  - `Enter` or `Space` places the piece, and `Esc` cancels.
  - Every control is reachable with Tab, and the focus ring is visible.
  - Arrow directions are physical (left means left) in both RTL and LTR.
- **Screen readers:**
  - The board is a `role="grid"` with a label.
  - A polite live region announces the result of each placement: lines cleared, score, and
    level progress.
  - Tray pieces are buttons with an accessible name such as "قطعة 3 خلايا: خط أفقي" /
    "3-cell piece: horizontal line".
- **Motion:** `prefers-reduced-motion` turns off clear animations, which become an instant
  change.
- **Contrast:** all text meets WCAG AA. Filled cells are told apart from empty ones by more
  than colour (inset border and texture).
- **Layout:** works from 320px wide to desktop, with no horizontal page scroll. Touch
  targets are ≥ 44px. The board scales to the viewport.

## 9. Audio (sound effects only, no music)
- Five short cues are synthesised at runtime with the Web Audio API: pick, place, clear
  (pitch rises with lines), level complete, and game over. There are no audio files.
- The audio context is created only after the first user gesture.
- A sound toggle, on by default, is saved in local storage, and its state is shown with
  `aria-pressed`.

## 10. Storage
- One `localStorage` key, `va-oasis-blocks-v1`, holds JSON:
  `{ v:1, journey:{ unlocked, levels:{ [id]:{ done, best } } }, classic:{ best }, sound }`.
- Every read and write is wrapped in try/catch. A corrupt or missing value falls back to
  defaults, and the game works with storage blocked.
- Nothing is sent anywhere. The site-wide analytics page view is the only network
  reporting, and it is not part of the game.
- A "reset progress" button in the help dialog asks for confirmation.

## 11. Installable and offline (PWA)
- **Manifests:** one per language, at `/oasis-blocks/manifest.ar.webmanifest` and
  `/oasis-blocks/manifest.en.webmanifest`.
  - `start_url` and `scope` are the game page path. `display` is `standalone`, and `lang`
    and `dir` are set.
  - Icons reuse the site icons.
  - `Base.astro` gains an optional `manifest` prop. It defaults to the current behaviour,
    and only the game page passes it.
- **Service worker:** `/oasis-blocks-sw.js`, generated at build time by an Astro endpoint
  so it can embed the 12 image URLs and a build version.
  - Each page registers it with `scope` set to that page's path, so it controls only the
    game page.
  - **Install:** precache the page URL, the 12 `-400w.webp` and `-800w.webp` images, and
    the icons.
  - **Activate:** delete old `oasis-blocks-*` caches.
  - **Fetch, navigations in scope:** network first, falling back to the cached page.
  - **Fetch, same-origin GET for `/_astro/`, `/fonts/` and `/img/`:** cache first, with a
    network fill. Nothing cross-origin is ever cached.
  - After registration, the page posts the URLs of its loaded same-origin resources, from
    `performance.getEntriesByType('resource')`, to the worker so the first visit is fully
    cached.
- **Offline behaviour:** a reload of the game page with the network off must load and play.
- **CSP:** nothing new. Everything is `'self'`.

## 12. Visual direction
- **Tokens:** use only the site's tokens (`tokens.css`) and fonts. There is no new font.
- **Board:** a warm sand surface with mud-brick cells.
- **Pieces:** tinted from the site palette (turquoise, gold, palm green, terracotta-sand),
  with a subtle inset that reads as a brick.
- **Text:** headings use the site's heading font, and body text the site's body font.
- **Digits:** Latin digits everywhere (0-9), Arabic included.
- **No mascot:** the site mascot is not animated or distorted. If it is used at all, it
  sits on the completion card at ≥ 48px, unmodified.

## 13. Out of scope
- No other languages. zh/de/ru/ur/tr need their translation pipelines first; this is
  declared, not done.
- No leaderboard, accounts, sharing endpoints, daily challenges or events.
