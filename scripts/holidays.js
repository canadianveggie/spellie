// @ts-check

const { getPuzzlesForDate, getHolidayPuzzlePossibilities } = require("../public/puzzles");

const date = new Date(2022, 2 - 1, 10, 12);
const holidays = [];
const days = 5 * 365;
for (let i = 0; i < days; i++) {
  const holiday = getHolidayPuzzlePossibilities(date);

  if (holiday) {
    const puzzles = getPuzzlesForDate(date);
    holidays.push({
      date: date.toISOString().split("T")[0],
      ...puzzles,
      holiday: holiday.name,
    });
  }
  date.setDate(date.getDate() + 1);
}
console.table(holidays);
