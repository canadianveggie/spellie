// @ts-check

const { getPuzzleIdForDate, getPuzzlesForDate, getHolidayPuzzlePossibilities, words } = require("../public/puzzles");

const date = new Date(2022, 2 - 1, 10, 12);
const days = Math.max(words.easy.length, words.medium.length, words.hard.length) * 2;
console.log("word, date, puzzleId");
for (let i = 0; i < days; i++) {
  const puzzles = getPuzzlesForDate(date);
  const id = getPuzzleIdForDate(date);
  const holiday = getHolidayPuzzlePossibilities(date);

  /** @type {import("../types").Difficulty[]} */
  const difficulties = ["easy", "medium", "hard"];
  difficulties.forEach((difficulty) => {
    console.log([puzzles[difficulty], date.toISOString().split("T")[0], `${difficulty}-${id}`].join(","));
  });
  date.setDate(date.getDate() + 1);
}
