// @ts-check

const { getPuzzlesForDate } = require("../public/puzzles");

const date = new Date(2022, 2 - 1, 10);
const calendar = [];
for (let i = 0; i < 365; i++) {
  const puzzles = getPuzzlesForDate(date);
  calendar.push({ date: date.toISOString().split("T")[0], ...puzzles });
  date.setDate(date.getDate() + 1);
}
console.table(calendar);
