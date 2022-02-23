const {
  daysBetween,
  compareTargetAndGuess,
  emojiMatchThemes,
  guessesAsEmojis,
  words,
} = require("../public/puzzles");

describe("puzzles", () => {
  describe("words", () => {
    it("easy are length 4", () => {
      expect(words.easy.length).toBeGreaterThan(300);
      words.easy.forEach((word) => {
        expect(word).toMatch(/^[A-Z]{4}$/);
      });
    });
    it("medium are length 4-5", () => {
      expect(words.medium.length).toBeGreaterThan(300);
      words.medium.forEach((word) => {
        expect(word).toMatch(/^[A-Z]{4,5}$/);
      });
    });
    it("hard are length 5-6", () => {
      expect(words.hard.length).toBeGreaterThan(300);
      words.hard.forEach((word) => {
        expect(word).toMatch(/^[A-Z]{5,6}$/);
      });
    });
    it("no duplicates", () => {
      const allWords = []
        .concat(words.easy)
        .concat(words.medium)
        .concat(words.hard);
      expect(allWords.length).toEqual([...new Set(allWords)].length);
    });
  });

  describe("daysBetween", () => {
    it("same day", () => {
      const start = new Date(2022, 1 - 1, 18);
      const end = new Date(2022, 1 - 1, 18);
      expect(daysBetween(start, end)).toBe(0);
    });

    it("exactly one day", () => {
      const start = new Date("2022-01-23T00:00Z");
      const end = new Date("2022-01-24T00:00Z");
      expect(daysBetween(start, end)).toBe(1);
    });

    it("month later", () => {
      const start = new Date(2022, 1 - 1, 18);
      const end = new Date(2022, 2 - 1, 18);
      expect(daysBetween(start, end)).toBe(31);
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
