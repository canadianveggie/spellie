/* eslint-disable no-console */
// @ts-check

const axios = require("axios");
const { emojis } = require("../public/emojis");
const { words } = require("../public/puzzles");

async function getDefinitions(letter) {
  // @ts-ignore
  const result = await axios.get(
    `https://github.com/wordset/wordset-dictionary/blob/master/data/${letter}.json?raw=true`
  );
  if (result.data) {
    console.log(`loaded ${Object.keys(result.data).length} definitions`);
    return result.data;
  }
  console.warn(`failed to load ${letter}`);
}

// conclusion:
// the definitions are too complicated, and synonyms too
// need to write our own hints

async function main(letter) {
  const dictionary = await getDefinitions(letter);

  const wordHints = {};
  const start = 1 + words.easy.indexOf("BELT"); // focus on after Feb 27
  const remaining = words.easy.slice(start, words.easy.length);

  remaining
    .filter((word) => word.startsWith(letter.toUpperCase()))
    .forEach(async (word) => {
      let entry = dictionary[word.toLowerCase()];
      if (!entry && word.endsWith("S")) {
        entry = dictionary[word.toLowerCase().slice(0, -1)];
      }

      wordHints[word] = {
        emoji: emojis[word.toUpperCase()],
        meaning: entry ? JSON.stringify(entry.meanings, null, 2) : undefined,
        hints: [``, ``],
      };
    });
  console.log(wordHints);
  console.log(Object.keys(wordHints).length);
}

main("b");
