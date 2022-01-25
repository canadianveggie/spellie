const VOWELS = "AEIOU".split("");
const CLUSTERS = ["ST", "TH", "CH", "SH", "NT", "CK", "ND"];

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
 * Goal: educate where possible and encourage if close.
 */
function getHintText(target, keys) {
  const match = keys
    .filter((key) => key.state === "match")
    .map((key) => key.label)
    .sort();
  const present = keys
    .filter((key) => key.state === "present")
    .map((key) => key.label)
    .sort();

  if (match.length === target.length - 1) {
    return `You're almost there!`;
  }

  const targetLetters = target.split("");
  const isVowelMatched = match.some((letter) => VOWELS.includes(letter));
  const isVowelPresent = present.some((letter) => VOWELS.includes(letter));

  // first priority: find a vowel
  if (!isVowelMatched && !isVowelPresent) {
    const firstVowel = targetLetters.find((letter) => VOWELS.includes(letter));
    if (firstVowel) {
      return `How about a vowel like "${firstVowel.toLowerCase()}"?`;
    }
  }

  // warn about multiples
  const multiple = findMultiple(targetLetters);
  if (multiple) {
    return `There could be more than one "${multiple.toLowerCase()}".`;
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
        return `Did you know "${firstFound.toLowerCase()}" and "${firstNotFound.toLowerCase()}" often go together?`;
      }
    }
  }

  // e at the end is common
  const eKey = keys.find((key) => key.label === "E");
  if (target.endsWith("E") && eKey.state === "available") {
    return `Quite a few words end with "e".`;
  }

  // TODO: most common letters in English?

  // fallback: next unfound letter of the target
  for (letter of targetLetters) {
    if (!match.includes(letter) && !present.includes(letter)) {
      return `I just love the letter "${letter.toLowerCase()}", don't you?`;
    }
  }

  return `You're almost there!`;
}

if (typeof exports !== "undefined") {
  module.exports = { getHintText };
}
