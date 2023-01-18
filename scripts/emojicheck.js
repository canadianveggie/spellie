// @ts-check

const axios = require("axios");
const { emojis } = require("../public/emojis");

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
const url = "https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json";

/**
 * @returns {Promise<{emoji: string, description: string, category: string, aliases: string[],
 *            tags: string[], unicode_version: string, ios_version: string}[]>}
 */
async function getEmojis() {
  // @ts-ignore
  const result = await axios.get(url);
  if (result.data) {
    console.log(`loaded ${Object.keys(result.data).length} definitions`);
    return result.data;
  }
  throw new Error(`Failed to load emojis from ${url}`);
}

async function main() {
  const emojiJson = await getEmojis();
  const takenEmojis = Object.values(emojis);
  const takenKeys = Object.keys(emojis).map((key) => key.toLowerCase());

  const versionBlockList = ["14.0"];

  const categoryBlockList = ["Flags", "Symbols"];

  const remaining = emojiJson
    .filter((item) => !versionBlockList.includes(item.unicode_version))
    .filter((item) => !categoryBlockList.includes(item.category))
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
        .filter((word) => word.match(/^[A-Za-z]{3,6}$/))
        .forEach((word) => {
          mapping[word] = item.emoji;
        });
      return mapping;
    },
    {}
  );
  console.log(suggestions);
  console.log(remaining.length);
}

main();
