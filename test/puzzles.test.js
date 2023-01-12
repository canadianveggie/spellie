const {
  daysBetween,
  compareTargetAndGuess,
  emojiMatchThemes,
  futureWords,
  getPuzzlesForDate,
  guessesAsEmojis,
  words,
} = require("../public/puzzles");

describe("puzzles", () => {
  describe("futureWords", () => {
    it("easy are length 4", () => {
      expect(futureWords.easy.length).toBeGreaterThanOrEqual(400); // 496
      futureWords.easy.forEach((word) => {
        expect(word).toMatch(/^[A-Z]{4}$/);
      });
    });
    it("medium are length 5", () => {
      expect(futureWords.medium.length).toBeGreaterThanOrEqual(400); // 512
      futureWords.medium.forEach((word) => {
        expect(word).toMatch(/^[A-Z]{5}$/);
      });
    });
    it("hard are length 6", () => {
      expect(futureWords.hard.length).toBeGreaterThanOrEqual(400); // 400
      futureWords.hard.forEach((word) => {
        expect(word).toMatch(/^[A-Z]{6}$/);
      });
    });
    it("no duplicates", () => {
      const allWords = []
        .concat(futureWords.easy)
        .concat(futureWords.medium)
        .concat(futureWords.hard);
      expect(allWords.length).toEqual([...new Set(allWords)].length);
    });
  });

  describe("historical puzzles", () => {
    it("do not change", () => {
      expect(getPuzzlesForDate(new Date(2023, 1 - 1, 10))).toEqual({
        easy: "CANS",
        medium: "FRONT",
        hard: "SLEEK",
      });
    });
  });

  describe("compareTargetAndGuess", () => {
    it("full match", () => {
      expect(compareTargetAndGuess("feet", "feet")).toEqual([
        "match",
        "match",
        "match",
        "match",
      ]);
    });

    it("miss", () => {
      expect(compareTargetAndGuess("feet", "pqrs")).toEqual([
        "miss",
        "miss",
        "miss",
        "miss",
      ]);
    });

    it("double letter, no matches", () => {
      expect(compareTargetAndGuess("feet", "fame")).toEqual([
        "match",
        "miss",
        "miss",
        "present",
      ]);
    });

    it("double letter, one match", () => {
      expect(compareTargetAndGuess("feet", "mere")).toEqual([
        "miss",
        "match",
        "miss",
        "present",
      ]);
    });

    it("single letter, two guesses", () => {
      expect(compareTargetAndGuess("fate", "feel")).toEqual([
        "match",
        "present",
        "miss",
        "miss",
      ]);
    });
  });

  describe("guessesAsEmojis", () => {
    const guesses = [
      [
        { state: "miss" },
        { state: "present" },
        { state: "miss" },
        { state: "miss" },
      ],
      [
        { state: "present" },
        { state: "miss" },
        { state: "match" },
        { state: "miss" },
      ],
      [
        { state: "match" },
        { state: "match" },
        { state: "match" },
        { state: "match" },
      ],
      [
        { state: "pending" },
        { state: "pending" },
        { state: "pending" },
        { state: "pending" },
      ],
    ];

    const expectedResults = {
      fruit: "🥥🍊🥥🥥\n🍊🥥🍏🥥\n🍏🍏🍏🍏",
      vegetable: "🍽️🍄🍽️🍽️\n🍄🍽️🥦🍽️\n🥦🥦🥦🥦",
      nature: "🕸️🌻🕸️🕸️\n🌻🕸️🍀🕸️\n🍀🍀🍀🍀",
      tree: "🪨🍁🪨🪨\n🍁🪨🌳🪨\n🌳🌳🌳🌳",
      circle: "⚫️🟠⚫️⚫️\n🟠⚫️🟢⚫️\n🟢🟢🟢🟢",
      poop: "🧻💩🧻🧻\n💩🧻🤢🧻\n🤢🤢🤢🤢",
    };

    it("random", () => {
      for (let i = 0; i < 10; i++) {
        const emojiString = guessesAsEmojis(guesses);
        expect(Object.values(expectedResults)).toContain(emojiString);
      }
    });

    it("themed", () => {
      for (const theme of Object.keys(emojiMatchThemes)) {
        expect(guessesAsEmojis(guesses, theme)).toEqual(expectedResults[theme]);
      }
    });
  });
});
