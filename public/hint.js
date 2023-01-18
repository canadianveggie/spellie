// @ts-check

// NOTE: this file should require('./wordHints') instead of using global

const VOWELS = new Set("AEIOU".split(""));
const CLUSTERS = ["ST", "TH", "CH", "SH", "NT", "CK", "ND"];

// generated from scripts/puzzlestats
const LETTERS_BY_FREQUENCY = [
  "E",
  "A",
  "S",
  "T",
  "R",
  "O",
  "L",
  "N",
  "I",
  "H",
  "C",
  "D",
  "U",
  "G",
  "P",
  "M",
  "B",
  "K",
  "W",
  "F",
  "Y",
  "V",
  "J",
  "Z",
  "Q",
  "X",
];

/**
 * @param {string[]} letters
 * @returns {string | null} - the multiple letter
 */
function findMultiple(letters) {
  /** @type {{ [letter: string]: boolean; }} */
  const seen = {};
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    if (seen[letter]) {
      return letter;
    }

    seen[letter] = true;
  }
  return null;
}

/** @type {{ [letter: string]: string; }} */
const hintLetterMap = {
  a: "ⓐ",
  b: "ⓑ",
  c: "ⓒ",
  d: "ⓓ",
  e: "ⓔ",
  f: "ⓕ",
  g: "ⓖ",
  h: "ⓗ",
  i: "ⓘ",
  j: "ⓙ",
  k: "ⓚ",
  l: "ⓛ",
  m: "ⓜ",
  n: "ⓝ",
  o: "ⓞ",
  p: "ⓟ",
  q: "ⓠ",
  r: "ⓡ",
  s: "ⓢ",
  t: "ⓣ",
  u: "ⓤ",
  v: "ⓥ",
  w: "ⓦ",
  x: "ⓧ",
  y: "ⓨ",
  z: "ⓩ",
};

/**
 * @param {string} letter
 * @param {import("../types").Settings["case"]} caseSetting
 * @returns {string}
 */
function hintLetter(letter, caseSetting) {
  const hint = hintLetterMap[letter.toLowerCase()];
  return caseSetting === "uppercase" ? hint.toUpperCase() : hint;
}

/**
 * Convert keys into a usable state object
 *
 * @param {import("../types").KeyState[]} keys - the state of the keyboard
 * @returns {import("../types").Knowledge}
 */
function keysToKnowledge(keys) {
  return {
    matches: keys
      .filter((key) => key.type === "letter" && key.state === "match")
      .map((key) => key.label)
      .sort(),
    presents: keys
      .filter((key) => key.type === "letter" && key.state === "present")
      .map((key) => key.label)
      .sort(),
    misses: keys
      .filter((key) => key.type === "letter" && key.state === "miss")
      .map((key) => key.label)
      .sort(),
    availables: keys
      .filter((key) => key.type === "letter" && key.state === "available")
      .map((key) => key.label)
      .sort(),
  };
}

/**
 * Merges two Knowledge objects and ensures each letter is only present in one state
 *
 * @param {import("../types").Knowledge} k1
 * @param {import("../types").Knowledge} k2
 * @returns {import("../types").Knowledge}
 */
function combineKnowledge(k1, k2) {
  const newKnowledge = {
    matches: [...new Set(k1.matches.concat(k2.matches))].sort(),
    presents: [...new Set(k1.presents.concat(k2.presents))].sort(),
    misses: [...new Set(k1.misses.concat(k2.misses))].sort(),
    availables: [...new Set(k1.availables.concat(k2.availables))].sort(),
  };

  // If a letter is a match it can't also be present
  newKnowledge.presents = newKnowledge.presents.filter((letter) => !newKnowledge.matches.includes(letter));
  // Only letters not in any other state are available
  newKnowledge.availables = newKnowledge.availables.filter(
    (letter) =>
      !newKnowledge.matches.includes(letter) &&
      !newKnowledge.presents.includes(letter) &&
      !newKnowledge.misses.includes(letter)
  );

  return newKnowledge;
}

const finalGuessIndex = 6 - 1;

/**
 * Provide a hint based on letters found so far and unique features of target.
 *
 * Goal: educate where possible and nudge in the right direction.
 *
 * @param {string} target - the answer to today's puzzle
 * @param {import("../types").Knowledge} knowledge - the state of what we know
 * @param {import("../types").Settings} settings - game settings
 * @param {number} guessIndex - 0-based guess number
 * @returns {import("../types").Hint | null}
 */
function getHint(target, knowledge, settings, guessIndex, lastGuess = "") {
  // last chance, so provide a strong hint
  const wordHint = window.wordHints[target];
  if (guessIndex === finalGuessIndex) {
    if (wordHint && wordHint.emoji) {
      return { message: wordHint.emoji };
    }
    if (wordHint && wordHint.category) {
      return { message: wordHint.category };
    }
  }

  if (guessIndex === finalGuessIndex - 1) {
    // Save the category for the last hint if there is no emoji
    if (wordHint && wordHint.category && wordHint.emoji) {
      return { message: wordHint.category };
    }
  }

  // You're so close
  if (knowledge.matches.length + knowledge.presents.length === target.length) {
    return null;
  }

  const prettyLetter = (/** @type {string} */ letter) => hintLetter(letter, settings.case);

  if (knowledge.matches.length + knowledge.presents.length === target.length - 1) {
    // they're almost there, so don't just give the answer
    // instead, tell them a few things NOT in the answer
    const hinted = [];
    for (const letter of LETTERS_BY_FREQUENCY) {
      if (VOWELS.has(letter)) continue; // will usually have the vowel
      if (target.includes(letter)) continue;

      if (knowledge.availables.includes(letter)) {
        hinted.push(letter);
      }
      if (hinted.length >= 3) break;
    }
    if (hinted.length === 3) {
      const label = hinted.map(prettyLetter).sort().join(", ");
      return {
        message: `It's definitely *not* these: ${label}`,
        misses: hinted,
      };
    }
  }

  const targetLetters = target.split("");
  const isVowelMatched = knowledge.matches.some((letter) => VOWELS.has(letter));
  const isVowelPresent = knowledge.presents.some((letter) => VOWELS.has(letter));

  // first priority: find a vowel
  if (!isVowelMatched && !isVowelPresent) {
    const firstVowel = targetLetters.find((letter) => VOWELS.has(letter));
    if (firstVowel) {
      return {
        message: `How about a vowel like ${prettyLetter(firstVowel)}?`,
        letter: firstVowel,
      };
    }
  }

  // warn about multiples
  const targetMultiple = findMultiple(targetLetters);
  const guessMultiple = findMultiple(lastGuess.split(""));
  if (targetMultiple && guessMultiple !== targetMultiple) {
    return {
      message: `There could be more than one ${prettyLetter(targetMultiple)}`,
      letter: targetMultiple,
    };
  }

  // common clusters:
  // if you have one of these matched/present, suggest the other
  const combinedMatchPresent = new Set(knowledge.matches.concat(knowledge.presents));
  const clustersInTarget = CLUSTERS.filter((cluster) => target.includes(cluster));
  if (clustersInTarget.length > 0) {
    for (const cluster of clustersInTarget) {
      const clusterLetters = new Set(cluster.split(""));
      const [firstFound] = Array.from(clusterLetters).filter((letter) => combinedMatchPresent.has(letter));
      const firstNotFound = Array.from(clusterLetters).find((letter) => !combinedMatchPresent.has(letter));
      if (firstFound && firstNotFound) {
        return {
          message: `Did you know ${prettyLetter(firstFound)} and ${prettyLetter(firstNotFound)} often go together?`,
          letter: firstNotFound,
        };
      }
    }
  }

  // e at the end is common
  if (target.endsWith("E") && knowledge.availables.includes("E")) {
    return {
      message: `Quite a few words end with ${prettyLetter("E")}`,
      letter: "E",
    };
  }

  // fallback: next unfound letter of the target
  for (const letter of targetLetters) {
    if (!knowledge.matches.includes(letter) && !knowledge.presents.includes(letter)) {
      return {
        message: `I just love the letter ${prettyLetter(letter)}, don't you?`,
        letter,
      };
    }
  }

  return null;
}

if (typeof module !== "undefined") {
  module.exports = { combineKnowledge, getHint, keysToKnowledge };
}
