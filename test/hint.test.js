// @ts-check

require("../public/wordHints");
const {
  combineKnowledge,
  getHint,
  keysToKnowledge,
} = require("../public/hint");

/**
 * @param {string[]} matches
 * @param {string[]} presents
 * @param {string[]} misses
 * @returns {import("../types").Knowledge} */
function getKnowledge(matches, presents, misses) {
  return {
    matches,
    presents,
    misses,
    availables: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((letter) => {
      return (
        !matches.includes(letter) &&
        !presents.includes(letter) &&
        !misses.includes(letter)
      );
    }),
  };
}

/** @returns {import("../types").Knowledge} */
function getDefaultKnowledge() {
  return getKnowledge([], [], []);
}

/** @type {import("../types").Settings} */
const settings = {
  difficulty: "easy",
  case: "lowercase",
  keyboardLayout: "atoz",
  theme: "blue",
  sharingEmojis: "nature",
  spellChecker: "off",
};

describe("hint", () => {
  describe("combineKnowledge", () => {
    it("is associative", () => {
      const k1 = {
        matches: "AT".split(""),
        presents: "DM".split(""),
        misses: "XYZ".split(""),
        availables: "BCEFGHIJKLNOPQRSUVW".split(""),
      };
      expect(
        k1.matches.length +
          k1.presents.length +
          k1.misses.length +
          k1.availables.length
      ).toEqual(26);
      const k2 = {
        matches: "AG".split(""),
        presents: "DT".split(""),
        misses: "OPXY".split(""),
        availables: "BCEFHIJKLMNQRSUVWZ".split(""),
      };
      expect(
        k2.matches.length +
          k2.presents.length +
          k2.misses.length +
          k2.availables.length
      ).toEqual(26);
      const expected = {
        matches: "AGT".split(""),
        presents: "DM".split(""),
        misses: "OPXYZ".split(""),
        availables: "BCEFHIJKLNQRSUVW".split(""),
      };
      expect(
        expected.matches.length +
          expected.presents.length +
          expected.misses.length +
          expected.availables.length
      ).toEqual(26);

      expect(combineKnowledge(k1, k2)).toEqual(expected);
      expect(combineKnowledge(k2, k1)).toEqual(expected);
    });
    it("handles partials", () => {
      const noKnowledge = getDefaultKnowledge();
      const partial1 = {
        matches: [],
        presents: ["A"],
        misses: [],
        availables: [],
      };
      const partial2 = {
        matches: [],
        presents: [],
        misses: ["R", "S", "T"],
        availables: [],
      };
      const expected1 = {
        matches: [],
        presents: ["A"],
        misses: [],
        availables: "BCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      };
      const expected2 = {
        matches: [],
        presents: [],
        misses: ["R", "S", "T"],
        availables: "ABCDEFGHIJKLMNOPQUVWXYZ".split(""),
      };

      expect(combineKnowledge(noKnowledge, partial1)).toEqual(expected1);
      expect(combineKnowledge(partial1, noKnowledge)).toEqual(expected1);
      expect(combineKnowledge(noKnowledge, partial2)).toEqual(expected2);
      expect(combineKnowledge(partial2, noKnowledge)).toEqual(expected2);

      expect(
        combineKnowledge(combineKnowledge(noKnowledge, partial1), partial2)
      ).toEqual(combineKnowledge(expected1, expected2));
    });
  });

  describe("keysToKnowledge", () => {
    it("converts keys into knowledge", () => {
      /** @type {import("../types").KeyState[]} */
      const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
        type: "letter",
        label: letter,
        state: "available",
      }));
      keys.push({
        type: "back",
        label: "",
        state: "unavailable",
      });
      keys.push({
        type: "enter",
        label: "guess",
        state: "unavailable",
      });
      const tKey = keys.find((key) => key.label === "T");
      const eKey = keys.find((key) => key.label === "E");
      const rKey = keys.find((key) => key.label === "R");
      if (!tKey || !eKey || !rKey) {
        throw Error("Unable to find key");
      }
      tKey.state = "present";
      eKey.state = "miss";
      rKey.state = "match";

      const knowledge = keysToKnowledge(keys);

      expect(knowledge.matches).toEqual(["R"]);
      expect(knowledge.presents).toEqual(["T"]);
      expect(knowledge.misses).toEqual(["E"]);
      expect(knowledge.misses.length).toEqual(1);
      expect(knowledge.availables.length).toEqual(23);
    });
  });

  describe("getHint", () => {
    it("find a vowel", () => {
      const target = "FEET";
      const knowledge = getKnowledge([], ["T"], []);

      const hint = getHint(target, knowledge, settings, 2);
      expect(hint).toHaveProperty("message", "How about a vowel like ⓔ?");
      expect(hint).toHaveProperty("letter", "E");
    });
    it("uses settings.case", () => {
      const target = "FEET";
      const knowledge = getKnowledge([], ["T"], []);

      /** @type {import("../types").Settings} */
      const customSettings = { ...settings, ...{ case: "uppercase" } };

      const hint = getHint(target, knowledge, customSettings, 2);
      expect(hint).toHaveProperty("message", "How about a vowel like Ⓔ?");
    });

    it("multiples", () => {
      const target = "FEET";
      const knowledge = getKnowledge([], ["E"], []);

      const hint = getHint(target, knowledge, settings, 3);
      expect(hint).toHaveProperty("message", "There could be more than one ⓔ");
      expect(hint).toHaveProperty("letter", "E");
    });
    it("multiples but guess shows they already figured that out", () => {
      const target = "GREEN";
      const knowledge = getKnowledge(["E"], ["R"], []);

      const hint = getHint(target, knowledge, settings, 3, "SPREE");
      expect(hint).not.toHaveProperty(
        "message",
        "There could be more than one ⓔ"
      );
    });

    it("cluster - ch", () => {
      const target = "CHAT";
      const knowledge = getKnowledge([], ["A", "H"], []);

      const hint = getHint(target, knowledge, settings, 3);
      expect(hint).toHaveProperty(
        "message",
        "Did you know ⓗ and ⓒ often go together?"
      );
      expect(hint).toHaveProperty("letter", "C");
    });
    it("cluster - th", () => {
      const target = "DENT";
      const knowledge = getKnowledge(["N"], ["E"], []);

      const hint = getHint(target, knowledge, settings, 3);
      expect(hint).toHaveProperty(
        "message",
        "Did you know ⓝ and ⓣ often go together?"
      );
      expect(hint).toHaveProperty("letter", "T");
    });
    it("cluster - when cluster already found", () => {
      const target = "STEAM";
      const knowledge = getKnowledge(["S", "T", "A"], [], []);

      const hint = getHint(target, knowledge, settings, 3);
      expect(hint).toHaveProperty(
        "message",
        "I just love the letter ⓔ, don't you?"
      );
      expect(hint).toHaveProperty("letter", "E");
    });
    it("e at the end", () => {
      const target = "GAME";
      const knowledge = getKnowledge([], ["A"], []);

      const hint = getHint(target, knowledge, settings, 2);
      expect(hint).toHaveProperty("message", "Quite a few words end with ⓔ");
      expect(hint).toHaveProperty("letter", "E");
    });
    it("first letter", () => {
      const target = "GAME";
      const knowledge = getKnowledge([], ["E"], []);

      const hint = getHint(target, knowledge, settings, 3);
      expect(hint).toHaveProperty(
        "message",
        "I just love the letter ⓖ, don't you?"
      );
      expect(hint).toHaveProperty("letter", "G");
    });
    it("next letter", () => {
      const target = "HOUR";
      const knowledge = getKnowledge(["H", "O"], [], []);

      const hint = getHint(target, knowledge, settings, 3);
      expect(hint).toHaveProperty(
        "message",
        "I just love the letter ⓤ, don't you?"
      );
      expect(hint).toHaveProperty("letter", "U");
    });
    it("no hint when all present", () => {
      const target = "HOPE";
      const knowledge = getKnowledge([], ["H", "O", "P", "E"], []);

      expect(getHint(target, knowledge, settings, 3)).toBeNull();
    });
    it("word-specific category hint", () => {
      const target = "SALT";
      const knowledge = getKnowledge(["S", "A"], [], []);

      const hint = getHint(target, knowledge, settings, 4);
      expect(hint).toHaveProperty("message", "Something you put on food");
    });
    it("word-specific emoji hint if available", () => {
      const target = "SALT";
      const knowledge = getKnowledge(["S", "A"], [], []);

      const hint = getHint(target, knowledge, settings, 5);
      expect(hint).toHaveProperty("message", "🧂");
    });
    it("word hints even all letters are known", () => {
      const target = "SALT";
      const knowledge = getKnowledge(["S", "A"], ["L", "T"], []);

      const hint4 = getHint(target, knowledge, settings, 4);
      expect(hint4).toHaveProperty("message", "Something you put on food");
      const hint5 = getHint(target, knowledge, settings, 5);
      expect(hint5).toHaveProperty("message", "🧂");
    });
    it("subtle hint when only 1 remaining", () => {
      const target = "HUNT";
      const knowledge = getKnowledge(["H", "U"], ["N"], ["S"]);

      const hint = getHint(target, knowledge, settings, 4);
      expect(hint).toHaveProperty(
        "message",
        "It's definitely *not* these: ⓒ, ⓛ, ⓡ"
      );
      expect(hint).toHaveProperty("letter", undefined);
      expect(hint).toHaveProperty("misses", ["R", "L", "C"]);
    });
    it("unique misses on subsequent hints", () => {
      const target = "HUNT";
      let knowledge = getKnowledge(["H", "U"], ["N"], ["S"]);

      const expectedMissesArray = [
        ["R", "L", "C"],
        ["D", "G", "P"],
        ["M", "B", "K"],
        ["W", "F", "Y"],
        ["V", "J", "Z"],
      ];
      for (const expectedMisses of expectedMissesArray) {
        const hint = getHint(target, knowledge, settings, 4);
        expect(hint).toHaveProperty("misses", expectedMisses);

        knowledge = combineKnowledge(knowledge, {
          misses: (hint && hint.misses) || [],
          matches: [],
          presents: [],
          availables: [],
        });
      }

      const lastHint = getHint(target, knowledge, settings, 5);
      expect(lastHint).toHaveProperty("letter", "T");
    });
  });
});
