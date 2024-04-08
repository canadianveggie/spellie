// @ts-check

const { futureWords, getAllHolidayPuzzles, words } = require("../public/puzzles");
const { emojis } = require("../public/emojis");

const holidayPuzzles = getAllHolidayPuzzles();
const allWords = words.easy
  .concat(words.medium)
  .concat(words.hard)
  .concat(holidayPuzzles.easy)
  .concat(holidayPuzzles.medium)
  .concat(holidayPuzzles.hard);

console.table(
  Object.keys(emojis)
    .filter((emojiWord) => {
      return allWords.indexOf(emojiWord) === -1;
    })
    .map((word) => {
      return [word, btoa(word)];
    })
);
