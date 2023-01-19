const { wordHints } = require("../public/wordHints");
const { getUnicodeCodePoint } = require("../public/emojis");
const { twemoji } = require("./twemoji");

describe("wordHints", () => {
  it("emojis exist as twemoji images", () => {
    Object.keys(wordHints).forEach((key) => {
      const hint = wordHints[key];
      if (!hint.emoji) return;

      const codepoint = getUnicodeCodePoint(hint.emoji);
      if (!twemoji.has(codepoint) && !twemoji.has(`${codepoint}-fe0f`)) {
        throw new Error(`No twemoji image found for emoji hint ${key} as ${codepoint}`);
      }
    });
  });
});
