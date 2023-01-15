// @ts-check

const { emojis } = require("../public/emojis");
const { getPuzzlesForDate, words } = require("../public/puzzles");
const { holidayPuzzle } = require("../public/holidays");

const date = new Date(2022, 2 - 1, 10, 12);
const calendar = [];
const days = Math.max(
  words.easy.length,
  words.medium.length,
  words.hard.length
);
for (let i = 0; i < days; i++) {
  const puzzles = getPuzzlesForDate(date);
  const puzzleEmojis = Object.values(puzzles)
    .map((word) => {
      return emojis[word] || "  ";
    })
    .join("");
  const holiday = holidayPuzzle(date);
  calendar.push({
    date: date.toISOString().split("T")[0],
    ...puzzles,
    emojis: puzzleEmojis,
    holiday: holiday?.name,
  });
  date.setDate(date.getDate() + 1);
}
console.table(calendar);
