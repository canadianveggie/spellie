const fs = require("fs");
const { emojis } = require("../public/emojis");

describe("emojis", () => {
  it("uppercase keys", () => {
    Object.keys(emojis).forEach((key) => {
      expect(key).toBe(key.toUpperCase());
    });
  });
  it("values have length", () => {
    Object.keys(emojis).forEach((key) => {
      const emoji = emojis[key];
      if (emoji.length < 1) {
        throw new Error(`Emoji for ${key} has no length`);
      }
    });
  });
  it("unique keys", () => {
    // read file as string to avoid treating as JS
    // (object keys silently overwrite one another)
    const input = fs.readFileSync("./public/emojis.js", "utf8");
    const matches = input.matchAll(/\s*([A-Z]+)/g);
    const keys = Array.from(matches).map((result) => result[1]);
    if (keys.length != new Set(keys).size) {
      Object.values(keys).reduce((memo, key) => {
        memo[key] = 1 + (memo[key] || 0);
        if (memo[key] >= 2) {
          throw new Error(`Found duplicate key ${key}`);
        }
        return memo;
      }, {});
    }
  });
  it("unique values", () => {
    Object.values(emojis).reduce((memo, value) => {
      memo[value] = 1 + (memo[value] || 0);
      if (memo[value] >= 2) {
        throw new Error(`Found duplicate for emoji ${value}`);
      }
      return memo;
    }, {});
  });
});
