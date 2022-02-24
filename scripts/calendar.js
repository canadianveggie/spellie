// @ts-check

const { getPuzzlesForDate, words } = require("../public/puzzles");

function lookupDay(date) {
  if (date.getMonth() === 1 - 1 && date.getDate() === 1) {
    return "New Year's";
  }
  if (date.getMonth() === 2 - 1 && date.getDate() === 2) {
    return "Groundhog";
  }
  if (date.getMonth() === 2 - 1 && date.getDate() === 14) {
    return "Valentine's";
  }
  if (date.getMonth() === 3 - 1 && date.getDate() === 17) {
    return "St. Patrick's";
  }
  if (date.getMonth() === 3 - 1 && date.getDate() === 20) {
    return "Spring Equinox";
  }
  if (date.getMonth() === 4 - 1 && date.getDate() === 1) {
    return "April Fool's";
  }
  if (date.getMonth() === 4 - 1 && date.getDate() === 22) {
    return "Earth";
  }
  if (date.getMonth() === 6 - 1 && date.getDate() === 21) {
    return "Summer Solstice";
  }
  if (date.getMonth() === 7 - 1 && date.getDate() === 1) {
    return "Canada";
  }
  if (date.getMonth() === 7 - 1 && date.getDate() === 4) {
    return "Independence (USA)";
  }
  if (date.getMonth() === 9 - 1 && date.getDate() === 22) {
    return "Autumn Equinox";
  }
  if (date.getMonth() === 9 - 1 && date.getDate() === 30) {
    return "Truth / Reconciliation";
  }
  if (date.getMonth() === 10 - 1 && date.getDate() === 31) {
    return "Halloween";
  }
  if (date.getMonth() === 11 - 1 && date.getDate() === 5) {
    return "Guy Fawkes";
  }
  if (date.getMonth() === 11 - 1 && date.getDate() === 11) {
    return "Remembrance";
  }
  if (date.getMonth() === 12 - 1 && date.getDate() === 21) {
    return "Winter Solstice";
  }
  if (date.getMonth() === 12 - 1 && date.getDate() === 25) {
    return "Christmas";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 2 - 1 &&
      date.getDate() === 1) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 1 - 1 &&
      date.getDate() === 22)
  ) {
    return "Lunar New Year";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 2 - 1 &&
      date.getDate() === 21) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 2 - 1 &&
      date.getDate() === 20)
  ) {
    return "Family";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 4 - 1 &&
      date.getDate() === 17) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 4 - 1 &&
      date.getDate() === 9)
  ) {
    return "Easter";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 5 - 1 &&
      date.getDate() === 8) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 5 - 1 &&
      date.getDate() === 14)
  ) {
    return "Mother's";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 6 - 1 &&
      date.getDate() === 19) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 6 - 1 &&
      date.getDate() === 18)
  ) {
    return "Father's";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 10 - 1 &&
      date.getDate() === 10) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 10 - 1 &&
      date.getDate() === 9)
  ) {
    return "Thanksgiving (Canada)";
  }
  if (
    (date.getFullYear() === 2022 &&
      date.getMonth() === 11 - 1 &&
      date.getDate() === 24) ||
    (date.getFullYear() === 2023 &&
      date.getMonth() === 11 - 1 &&
      date.getDate() === 23)
  ) {
    return "Thanksgiving (USA)";
  }

  return "";
}

const date = new Date(2022, 2 - 1, 10, 12);
const calendar = [];
const days = Math.min(
  words.easy.length,
  words.medium.length,
  words.hard.length
);
for (let i = 0; i < days; i++) {
  const puzzles = getPuzzlesForDate(date);
  const holiday = lookupDay(date);
  calendar.push({
    date: date.toISOString().split("T")[0],
    ...puzzles,
    holiday,
  });
  date.setDate(date.getDate() + 1);
}
console.table(calendar);
