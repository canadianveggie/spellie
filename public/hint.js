// @ts-check

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
 * @returns {string | null}
 */
function findMultiple(letters) {
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

/**
 * Provide a hint based on letters found so far and unique features of target.
 *
 * Goal: educate where possible and nudge in the right direction.
 *
 * @param {string} target - the answer to today's puzzle
 * @param {import("../types").KeyState[]} keys - the state of the keyboard
 * @returns {import("../types").Hint | null}
 */
function getHint(target, keys) {
  const match = keys
    .filter((key) => key.state === "match")
    .map((key) => key.label)
    .sort();
  const present = keys
    .filter((key) => key.state === "present")
    .map((key) => key.label)
    .sort();

  if (match.length + present.length === target.length) {
    return null;
  }

  if (match.length + present.length === target.length - 1) {
    // they're almost there, so don't just give the answer
    // instead, tell them a few things NOT in the answer
    const remainingOptions = new Set(
      keys.filter((key) => key.state === "available").map((key) => key.label)
    );
    const hinted = [];
    for (const letter of LETTERS_BY_FREQUENCY) {
      if (VOWELS.has(letter)) continue; // will usually have the vowel
      if (target.includes(letter)) continue;

      if (remainingOptions.has(letter)) {
        hinted.push(letter);
      }
      if (hinted.length >= 3) break;
    }
    if (hinted.length === 3) {
      return {
        message: `It's definitely *not* ${hinted[0]}, ${hinted[1]}, or ${hinted[2]}`,
      };
    }
  }

  const targetLetters = target.split("");
  const isVowelMatched = match.some((letter) => VOWELS.has(letter));
  const isVowelPresent = present.some((letter) => VOWELS.has(letter));

  // first priority: find a vowel
  if (!isVowelMatched && !isVowelPresent) {
    const firstVowel = targetLetters.find((letter) => VOWELS.has(letter));
    if (firstVowel) {
      return {
        message: `How about a vowel like ${firstVowel}?`,
        letter: firstVowel,
      };
    }
  }

  // warn about multiples
  const multiple = findMultiple(targetLetters);
  if (multiple) {
    return {
      message: `There could be more than one ${multiple}`,
      letter: multiple,
    };
  }

  // common clusters:
  // if you have one of these matched/present, suggest the other
  const combinedMatchPresent = new Set(match.concat(present));
  const clustersInTarget = CLUSTERS.filter((cluster) =>
    target.includes(cluster)
  );
  if (clustersInTarget.length > 0) {
    for (const cluster of clustersInTarget) {
      const clusterLetters = new Set(cluster.split(""));
      const [firstFound] = Array.from(clusterLetters).filter((letter) =>
        combinedMatchPresent.has(letter)
      );
      const [firstNotFound] = Array.from(clusterLetters).find(
        (letter) => !combinedMatchPresent.has(letter)
      );
      if (firstFound && firstNotFound) {
        return {
          message: `Did you know ${firstFound} and ${firstNotFound} often go together?`,
          letter: firstNotFound,
        };
      }
    }
  }

  // e at the end is common
  const eKey = keys.find((key) => key.label === "E");
  if (target.endsWith("E") && eKey.state === "available") {
    return { message: `Quite a few words end with E`, letter: "E" };
  }

  // fallback: next unfound letter of the target
  for (const letter of targetLetters) {
    if (!match.includes(letter) && !present.includes(letter)) {
      return {
        message: `I just love the letter ${letter}, don't you?`,
        letter,
      };
    }
  }

  return null;
}

if (typeof module !== "undefined") {
  module.exports = { getHint };
}
