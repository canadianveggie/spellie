const words = ["path", "into", "cats", "from", "pizza"];
const fallback = words[0];

const start = new Date(2022, 1 - 1, 18);

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(first, second) {
  return Math.floor((second - first) / MILLIS_PER_DAY);
}

function getTodayPuzzle() {
  const index = daysBetween(start, new Date());
  const puzzle = words[index % words.length];
  return puzzle.toUpperCase();
}

// TODO - add test cases
function compareTargetAndGuess(target, guess) {
  target = target.toUpperCase();
  guess = guess.toUpperCase();
  const length = target.length;
  const result = Array(length);
  const letterUsed = Array(length).fill(false);

  // 1st pass - matches
  for (let i = 0; i < length; i++) {
    if (target[i] === guess[i]) {
      result[i] = "match";
      letterUsed[i] = true;
    }
  }

  // 2nd pass - miss and present positions
  for (let i = 0; i < target.length; i++) {
    if (result[i] !== "match") {
      const otherLetters = target.split("").map((letter, j) => {
        if (i === j || letterUsed[j]) {
          return "";
        } else {
          return letter;
        }
      });
      const targetIndex = otherLetters.indexOf(guess[i]);
      if (targetIndex >= 0) {
        result[i] = "present";
        letterUsed[targetIndex] = true;
      } else {
        result[i] = "miss";
      }
    }
  }
  return result;
}
