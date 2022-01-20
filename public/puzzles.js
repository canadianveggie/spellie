const words = ["path", "into", "cats", "from"];
const fallback = words[0];

const start = new Date(2022, 1 - 1, 18);

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(first, second) {
  return Math.floor((second - first) / MILLIS_PER_DAY);
}

function getTodayPuzzle() {
  const index = daysBetween(start, new Date());
  const puzzle = words[index];
  if (!puzzle) {
    console.error(`ran out of puzzles at ${index}; using fallback`);
    return fallback.toUpperCase();
  }
  return puzzle.toUpperCase();
}
