import assert from 'node:assert/strict';
import { boardFrom, fits, place, scoreMove, deal, mulberry32 } from '../src/scripts/play-blocks-engine.js';
import { LEVELS, PIECES } from '../src/data/play-blocks.ts';

const dot = [[0, 0]];
const empty = boardFrom([]);
const cross = boardFrom(['.#######', '#.......', '#.......', '#.......', '#.......', '#.......', '#.......', '#.......']);
assert(fits(empty, dot, 7, 7));
assert(!fits(empty, dot, -1, 0));
assert(!fits(empty, [[0, 0], [0, 1]], 7, 7));
assert(!fits(cross, dot, 0, 1));
assert.equal(place(cross, dot, 0, 1), null);
const result = place(cross, dot, 0, 0);
assert.equal(result.lines, 2);
assert.equal(result.cleared.length, 15);
assert(result.board.every(cell => !cell));
assert.equal(cross[0], 0);
assert.equal(place(empty, dot, 2, 3).board[19], 1);
for (const [lines, score] of [[1, 10], [2, 40], [3, 90]]) {
  assert.deepEqual(scoreMove(1, lines, 0, false), { points: score + 1, streak: 1 });
}
assert.deepEqual(scoreMove(4, 2, 2, false), { points: 84, streak: 3 });
assert.deepEqual(scoreMove(1, 1, 1, true), { points: 116, streak: 2 });
assert.deepEqual(scoreMove(3, 0, 5, false), { points: 3, streak: 0 });

const nearFull = Array(64).fill(1);
nearFull[63] = 0;
const pool = { square2: 1, dot: 1 };
assert(deal(nearFull, pool, PIECES, () => 0).includes('dot'));
assert.deepEqual(deal(Array(64).fill(1), pool, PIECES, mulberry32(17)), []);
for (let seed = 0; seed < 200; seed++) {
  const tray = deal(nearFull, pool, PIECES, mulberry32(seed));
  assert(tray.includes('dot'));
  assert.deepEqual(tray, deal(nearFull, pool, PIECES, mulberry32(seed)));
}

function isolated(board) {
  let count = 0;
  for (let i = 0; i < 64; i++) {
    if (!board[i] && (i % 8 === 0 || board[i - 1]) &&
        (i % 8 === 7 || board[i + 1]) && (i < 8 || board[i - 8]) &&
        (i >= 56 || board[i + 8])) count++;
  }
  return count;
}

function play(level, seed) {
  const random = mulberry32(seed);
  let board = boardFrom(level.stones);
  let tray = [];
  let lines = 0;
  while (lines < level.goalLines) {
    if (!tray.length) tray = deal(board, level.pool, PIECES, random);
    let best = null;
    let bestIsolated = Infinity;
    let bestSlot = 0;
    for (const [slot, id] of tray.entries()) {
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const move = place(board, PIECES[id].cells, row, col);
          if (!move || (best && move.lines < best.lines)) continue;
          const holes = isolated(move.board);
          if (!best || move.lines > best.lines || holes < bestIsolated) {
            best = move;
            bestSlot = slot;
            bestIsolated = holes;
          }
        }
      }
    }
    if (!best) return false;
    board = best.board;
    lines += best.lines;
    tray.splice(bestSlot, 1);
  }
  return true;
}

for (const level of LEVELS) {
  let passed = 0;
  for (let seed = 0; seed < 200; seed++) passed += Number(play(level, seed));
  const percentage = passed / 2;
  console.log(`Level ${level.id}: ${passed}/200 (${percentage}%)`);
  if (percentage < (level.id <= 6 ? 90 : 60)) process.exitCode = 1;
}
