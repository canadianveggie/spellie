// @ts-check

// constraints:
// - 4-6 letter words
// - prefer shorter where possible
// - avoid obscure things
// - avoid words not in valid words list (unless they should be, like "wifi")
// - choose fun

// TODO: would schools take issue with pictures of WINE, BEER?

// TODO: should we allow multiple ways to unlock emoji?
// eg "⚾️" could be PITCH, BUNT, CATCH, etc
// also DOLL, DOLLS

const { emojis } = require("../public/emojis");
// get from https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json

/** @type {{emoji: string, description: string, category: string, aliases: string[],
 *          tags: string[], unicode_version: string, ios_version: string}[]} */
const emojiJson = require("./emoji.json");

const takenEmojis = Object.values(emojis);
const takenKeys = Object.keys(emojis).map((key) => key.toLowerCase());

// too new
// TODO: allow 13 now that we're using twemojis
const versionBlockList = ["13.0", "13.1", "13.2", "14.0"];

const categoryBlockList = [
  "Smileys & Emotion",
  "Animals & Nature",
  "Travel & Places",
  // below have been thoroughly reviewed for version < 13:
  "Activities",
  "Flags",
  "Food & Drink",
  "Objects",
  "People & Body",
  "Symbols",
];

const remaining = emojiJson
  .filter((item) => !versionBlockList.includes(item.ios_version))
  .filter((item) => !categoryBlockList.includes(item.category))
  .filter((item) => !takenEmojis.includes(item.emoji))
  .filter((item) => {
    const keywords = item.aliases.concat(item.tags);
    return !takenKeys.find((taken) => keywords.includes(taken));
  });
console.log(JSON.stringify(remaining, null, 2));

const suggestions = remaining.reduce(
  /**
   * @param {{[word: string]: string}} mapping
   */
  (mapping, item) => {
    item.aliases
      .concat(item.tags)
      .filter((word) => word.length >= 4 && word.length <= 6)
      .forEach((word) => {
        mapping[word] = item.emoji;
      });
    return mapping;
  },
  {}
);
console.log(suggestions);
console.log(remaining.length);
