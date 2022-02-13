const { emojis } = require("../public/emojis");
// get from https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json
const json = require("./emoji.json");

const takenEmojis = Object.values(emojis);
const takenKeys = Object.keys(emojis).map((key) => key.toLowerCase());

// too new
const versionBlockList = ["13.0", "13.1", "13.2", "14.0"];

// adjust as needed to find
const categoryBlockList = [
  "Flags",
  "People & Body",
  "Smileys & Emotion",
  "Animals & Nature",
];

const remaining = json
  .filter((item) => !versionBlockList.includes(item.ios_version))
  .filter((item) => !categoryBlockList.includes(item.category))
  .filter((item) => !takenEmojis.includes(item.emoji))
  .filter((item) => {
    const keywords = item.aliases.concat(item.tags);
    return !takenKeys.find((taken) => keywords.includes(taken));
  });
console.log(JSON.stringify(remaining, null, 2));
console.log(remaining.length);
