const { validWords } = require("../public/dictionary");
const { emojis } = require("../public/emojis");
const { getAllHolidayPuzzles, words } = require("../public/puzzles");

describe("validWords", () => {
  it("puzzles are valid words", () => {
    const holidayPuzzles = getAllHolidayPuzzles();
    const allWords = []
      .concat(words.easy)
      .concat(words.medium)
      .concat(words.hard)
      .concat(holidayPuzzles.easy)
      .concat(holidayPuzzles.medium)
      .concat(holidayPuzzles.hard);
    const notInDictionary = allWords.filter((word) => {
      return !validWords.has(word);
    });
    expect(notInDictionary).toHaveLength(0);
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
