const {
  daysBetween,
  compareTargetAndGuess,
  emojiMatchThemes,
  futureWords,
  getHolidayPuzzle,
  getPuzzlesForDate,
  guessesAsEmojis,
  getPuzzlesForId,
} = require("../public/puzzles");

describe("puzzles", () => {
  describe("futureWords", () => {
    test.each([
      ["easy", 4],
      ["medium", 5],
      ["hard", 6],
    ])("%s are length %i", (difficulty, length) => {
      futureWords[difficulty].forEach((word) => {
        expect(word).toHaveLength(length);
      });
    });

    test.each([
      ["easy", 450], // 471
      ["medium", 450], // 482
      ["hard", 365], // 383
    ])("%s has at least %i puzzles", (difficulty, minPuzzles) => {
      expect(futureWords[difficulty].length).toBeGreaterThanOrEqual(minPuzzles);
    });

    it("no duplicates", () => {
      const allWords = [].concat(futureWords.easy).concat(futureWords.medium).concat(futureWords.hard);
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

  describe("getPuzzlesForId", () => {
    it("has no duplicates", () => {
      const allWords = new Set();
      for (let i = 365; i < 365 * 2; i++) {
        const words = getPuzzlesForId(i);
        expect(allWords).not.toContain(words.easy);
        expect(allWords).not.toContain(words.medium);
        expect(allWords).not.toContain(words.hard);
        allWords.add(words.easy);
        allWords.add(words.medium);
        allWords.add(words.hard);
      }
    });
  });

  describe("holiday puzzles", () => {
    const holidayWords = {
      easy: [],
      medium: [],
      hard: [],
    };
    const date = new Date(2023, 1 - 1, 15);
    const endDate = new Date(2027, 1 - 1, 1);

    while (date <= endDate) {
      for (const difficulty of Object.keys(holidayWords)) {
        const puzzle = getHolidayPuzzle(date, difficulty);
        if (puzzle) {
          holidayWords[difficulty].push(puzzle);
        }
      }
      date.setDate(date.getDate() + 1);
    }

    test.each([
      ["easy", 4],
      ["medium", 5],
      ["hard", 6],
    ])("%s words are %i characters", (difficulty, length) => {
      holidayWords[difficulty].forEach((word) => {
        expect(word).toHaveLength(length);
      });
    });

    test.each([["easy"], ["medium"], ["hard"]])("unique %s words", (difficulty) => {
      const repeats = holidayWords[difficulty].filter((i) => futureWords[difficulty].indexOf(i) >= 0);
      // console.log(repeats.map((word) => btoa(word)));
      expect(repeats).toHaveLength(0);
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
      expect(compareTargetAndGuess("feet", "feet")).toEqual(["match", "match", "match", "match"]);
    });

    it("miss", () => {
      expect(compareTargetAndGuess("feet", "pqrs")).toEqual(["miss", "miss", "miss", "miss"]);
    });

    it("double letter, no matches", () => {
      expect(compareTargetAndGuess("feet", "fame")).toEqual(["match", "miss", "miss", "present"]);
    });

    it("double letter, one match", () => {
      expect(compareTargetAndGuess("feet", "mere")).toEqual(["miss", "match", "miss", "present"]);
    });

    it("single letter, two guesses", () => {
      expect(compareTargetAndGuess("fate", "feel")).toEqual(["match", "present", "miss", "miss"]);
    });
  });

  describe("guessesAsEmojis", () => {
    const guesses = [
      [{ state: "miss" }, { state: "present" }, { state: "miss" }, { state: "miss" }],
      [{ state: "present" }, { state: "miss" }, { state: "match" }, { state: "miss" }],
      [{ state: "match" }, { state: "match" }, { state: "match" }, { state: "match" }],
      [{ state: "pending" }, { state: "pending" }, { state: "pending" }, { state: "pending" }],
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
