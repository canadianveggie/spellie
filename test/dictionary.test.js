const { validWords } = require("../public/dictionary.js");
const { emojis } = require("../public/emojis");
const { words } = require("../public/puzzles");

describe("validWords", () => {
  it("puzzles are valid words", () => {
    const allWords = []
      .concat(words.easy)
      .concat(words.medium)
      .concat(words.hard);
    allWords.forEach((word) => {
      expect(validWords.has(word)).toBe(true);
    });
  });
  it("emojis are mostly valid words", () => {
    const valid = [];
    const invalid = [];
    Object.keys(emojis).forEach((emojiWord) => {
      if (validWords.has(emojiWord)) {
        valid.push(emojiWord);
      } else {
        invalid.push(emojiWord);
      }
    });
    // console.log({ valid: valid.length, invalid: invalid.length });
    // Was { valid: 487, invalid: 13 }
    // console.log(invalid);
    // Invalid includes ABCD, ELSA, OLAF, TADA
    expect(invalid.length).toBeGreaterThan(0);
    expect(valid.length).toBeGreaterThan(invalid.length);
    expect(invalid.length).toBeLessThan(valid.length / 5); // Less than 20% are invalid
  });
});
