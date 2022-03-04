const fs = require("fs");
const { emojis, getEmojiImage } = require("../public/emojis");

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
  it("keys are between 4-6 characters", () => {
    Object.keys(emojis).forEach((key) => {
      if (key.length < 4) {
        throw new Error(`Emoji for ${key} is too short`);
      }
      if (key.length > 6) {
        throw new Error(`Emoji for ${key} is too long`);
      }
    });
  });
  it("keys are sorted", () => {
    expect(Object.keys(emojis)).toEqual(Object.keys(emojis).sort());
  });
  it("unique keys", () => {
    // read file as string to avoid treating as JS
    // (object keys silently overwrite one another)
    const input = fs.readFileSync("./public/emojis.js", "utf8");
    const matches = input.matchAll(/^\s\s([A-Z]+)/g);
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

describe("getEmojiImage", () => {
  it("unicode 13 character", () => {
    const src = getEmojiImage("🪰");
    expect(src).toBe(`https://twemoji.maxcdn.com/v/13.1.0/svg/1fab0.svg`);
  });
  it("variants", () => {
    const src = getEmojiImage("👩‍⚕️");
    expect(src).toBe(
      `https://twemoji.maxcdn.com/v/13.1.0/svg/1f469-200d-2695-fe0f.svg`
    );
  });
  it("trailing zero width joiner", () => {
    const src1 = getEmojiImage("⭐️");
    const src2 = getEmojiImage("\u2B50\uFE0F");
    expect(src1).toBe(`https://twemoji.maxcdn.com/v/13.1.0/svg/2b50.svg`);
    expect(src2).toEqual(src1);
  });
});
