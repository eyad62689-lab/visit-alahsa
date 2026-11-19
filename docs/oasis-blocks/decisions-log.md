# Decisions log — Oasis Blocks

Each entry records the date, the decision, why it was made, and what was considered instead.

## D1 — The game lives in the existing games hub (2026-11-19)
- **Decision:** the game is the fourth game in `/ألعاب/` and `/en/play/`. It uses the site layout and the routing pattern of the three existing games (`*_ALT` in `routes.ts`).
- **Why:** visitors already find games there. This reuses the header, footer and SEO plumbing, and it keeps site-wide changes to entry points.
- **Rejected:**
  - A standalone `/game/` app outside the site. It would need a separate identity and duplicated chrome.
  - A subdomain. It needs a backend or a deploy change.

## D2 — Name: «كتل الواحة» / "Oasis Blocks" (2026-11-19)
- **Decision:** the game is called «كتل الواحة» / "Oasis Blocks", with the subtitle «رحلة عبر الأحساء» / "A Journey Through Al-Ahsa".
- **Why:** the name is descriptive, original, and not confusable with "Block Blast!".
- **Rejected:** any "Blast" wording.

## D3 — Facts come from the attraction collection at build time (2026-11-19)
- **Decision:** level data stores only the attraction id. The shown fact is that attraction's `summary` or `summary_en`, verbatim, and the build throws if it is missing.
- **Why:** this makes invented facts structurally impossible, and keeps the game in step with future edits to the site.

## D4 — No new dependencies (2026-11-19)
- **Decision:** the game adds no new dependencies. The engine is plain TypeScript or JS, the audio is the Web Audio API, and the service worker is handwritten.
- **Why:** the brief forbids heavy dependencies. Workbox and a game engine are unnecessary at this size.

## D5 — A fair dealer, never an adversarial one (2026-11-19)
- **Decision:** every tray the generator deals has at least one piece that fits, and the generator never selects pieces to make the board harder.
- **Why:** no dark patterns, and losses should be the player's own decisions.

## D6 — Our own scoring formula (2026-11-19)
- **Decision:** the scoring formula in game-design §4 is our own.
- **Why:** the original's formula is unpublished (see the analysis §5), and copying a guessed formula would add nothing.

## D7 — The service worker is scoped to the game page only (2026-11-19)
- **Decision:** the service worker controls only the game page.
- **Why:** the rest of the site has no service worker today. A site-wide one would change caching for every page, which is outside the brief. A narrow scope keeps the change reversible.

## D8 — Seeded PRNG (2026-11-19)
- **Decision:** game logic uses mulberry32, seeded once from `crypto.getRandomValues`.
- **Why:** tests can be deterministic, and CodeQL flags biased crypto-random arithmetic (the lesson from PR 292). We avoid that pattern because game randomness is not security-sensitive.

## D9 — ar/en only (2026-11-19)
- **Decision:** the game ships in ar and en only.
- **Why:** the project rule is that text in other languages goes only through its translation pipeline. That is a separate batch after approval.

## D10 — Board cells on narrow screens (2026-11-19)
- **Decision:** the 8×8 board scales to fit a 320px viewport. The board is a continuous tap and drag surface, with individually addressable cells and keyboard navigation. Buttons outside the board have touch targets of at least 44px.
- **Why:** 8 cells of 44px need 352px before padding. Individual board cells are smaller on narrow screens so the full board remains visible without horizontal scrolling.

## Measured level solvability

200 seeds per level (0–199). The bot maximizes lines cleared on the current move, then minimizes empty cells with no orthogonally adjacent empty neighbor. Ties follow tray slot and row-major board order. The finale keeps the full piece pool and gives smaller pieces higher weights.

| Level | Cleared the goal | Pass rate | Minimum |
|---|---:|---:|---:|
| 1 | 200/200 | 100% | 90% |
| 2 | 200/200 | 100% | 90% |
| 3 | 200/200 | 100% | 90% |
| 4 | 200/200 | 100% | 90% |
| 5 | 200/200 | 100% | 90% |
| 6 | 199/200 | 99.5% | 90% |
| 7 | 199/200 | 99.5% | 60% |
| 8 | 199/200 | 99.5% | 60% |
| 9 | 157/200 | 78.5% | 60% |
| 10 | 153/200 | 76.5% | 60% |
| 11 | 140/200 | 70% | 60% |
| 12 | 129/200 | 64.5% | 60% |
