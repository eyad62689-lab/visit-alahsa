export function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), seed | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function boardFrom(stones) {
  return Array.from({ length: 64 }, (_, i) => Number(stones[i >> 3]?.[i % 8] === '#'));
}

export function fits(board, cells, row, col) {
  return cells.every(([dy, dx]) => {
    const y = row + dy;
    const x = col + dx;
    return y >= 0 && y < 8 && x >= 0 && x < 8 && !board[y * 8 + x];
  });
}

export function fitsAnywhere(board, cells) {
  for (let i = 0; i < 64; i++) {
    if (fits(board, cells, i >> 3, i % 8)) return true;
  }
  return false;
}

export function place(board, cells, row, col) {
  if (!fits(board, cells, row, col)) return null;
  const next = board.slice();
  for (const [dy, dx] of cells) {
    next[(row + dy) * 8 + col + dx] = 1;
  }
  let fullRows = 0;
  let fullCols = 0;
  let lines = 0;
  for (let i = 0; i < 8; i++) {
    if (next.slice(i * 8, i * 8 + 8).every(Boolean)) {
      fullRows |= 1 << i;
      lines++;
    }
    let y = 0;
    while (y < 8 && next[y * 8 + i]) y++;
    if (y === 8) {
      fullCols |= 1 << i;
      lines++;
    }
  }
  const cleared = [];
  if (lines) for (let i = 0; i < 64; i++) {
    if ((fullRows & (1 << (i >> 3))) || (fullCols & (1 << (i % 8)))) {
      next[i] = 0;
      cleared.push(i);
    }
  }
  return { board: next, lines, cleared };
}

export function scoreMove(size, lines, previousStreak, empty) {
  const streak = lines ? previousStreak + 1 : 0;
  const multiplier = streak >= 2 ? 1 + 0.5 * (streak - 1) : 1;
  return { points: size + Math.floor(10 * lines * lines * multiplier) + (lines && empty ? 100 : 0), streak };
}

export function deal(board, pool, pieces, random) {
  let total = 0;
  const entries = Object.entries(pool).map(([id, weight]) => [id, total += weight]);
  const fitting = new Set(entries.map(([id]) => id).filter(id => fitsAnywhere(board, pieces[id].cells)));
  if (!fitting.size) return [];
  const draw = () => {
    const value = random() * total;
    return entries.find(([, limit]) => value < limit)[0];
  };
  let tray;
  for (let attempt = 0; attempt < 50; attempt++) {
    tray = [draw(), draw(), draw()];
    if (tray.some(id => fitting.has(id))) return tray;
  }
  let smallest;
  for (const id of fitting) {
    if (!smallest || pieces[id].cells.length < pieces[smallest].cells.length) smallest = id;
  }
  tray[0] = smallest;
  return tray;
}
