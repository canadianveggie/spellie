const { validWords } = require("../public/dictionary");
const { emojis } = require("../public/emojis");
const { words } = require("../public/puzzles");

describe("validWords", () => {
  it("puzzles are valid words", () => {
    const allWords = [].concat(words.easy).concat(words.medium).concat(words.hard);
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
    expect(valid.length).toBeGreaterThan(100);
    expect(valid.length).toBeGreaterThan(invalid.length * 0.05);
    // grandfather in some existing invalids but try not to add any more
    expectedInvalid = ["ABCD", "ABCS", "DANGO", "ODEN", "ROFL", "SANTA", "TADA", "WIFI", "YOYO"];
    expect(invalid).toEqual(expectedInvalid);
  });
});
