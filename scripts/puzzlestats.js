// @ts-check

const { words } = require("../public/puzzles");

const allWords = words.easy.concat(words.medium).concat(words.hard);

const frequency = allWords.reduce(
  /**
   * @param {{[word: string]: number}} memo
   */
  (memo, word) => {
    const letters = word.split("");
    letters.forEach((letter) => (memo[letter] = 1 + (memo[letter] || 0)));
    return memo;
  },
  {}
);

const sorted = Object.keys(frequency)
  .map((key) => ({ letter: key, count: frequency[key] }))
  .sort((a, b) => b.count - a.count);
console.log(sorted);
