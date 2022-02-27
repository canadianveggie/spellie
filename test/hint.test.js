// @ts-check

const { getHint } = require("../public/hint");

/** @returns {import("../types").KeyState[]} */
function getDefaultKeys() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    type: "letter",
    label: letter,
    state: "available",
  }));
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
  describe("getHint", () => {
    it("find a vowel", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "T").state = "present";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty("message", "How about a vowel like ⓔ?");
      expect(hint).toHaveProperty("letter", "E");
    });
    it("uses settings.case", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "T").state = "present";

      /** @type {import("../types").Settings} */
      const customSettings = { ...settings, ...{ case: "uppercase" } };

      const hint = getHint(target, keys, customSettings);
      expect(hint).toHaveProperty("message", "How about a vowel like Ⓔ?");
    });

    it("multiples", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty("message", "There could be more than one ⓔ");
      expect(hint).toHaveProperty("letter", "E");
    });
    it("cluster - ch", () => {
      const target = "CHAT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      keys.find((key) => key.label === "H").state = "present";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty(
        "message",
        "Did you know ⓗ and ⓒ often go together?"
      );
      expect(hint).toHaveProperty("letter", "C");
    });
    it("cluster - th", () => {
      const target = "DENT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      keys.find((key) => key.label === "N").state = "match";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty(
        "message",
        "Did you know ⓝ and ⓣ often go together?"
      );
      expect(hint).toHaveProperty("letter", "T");
    });
    it("cluster - when cluster already found", () => {
      const target = "STEAM";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "S").state = "match";
      keys.find((key) => key.label === "T").state = "match";
      keys.find((key) => key.label === "A").state = "match";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty(
        "message",
        "I just love the letter ⓔ, don't you?"
      );
      expect(hint).toHaveProperty("letter", "E");
    });
    it("e at the end", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty("message", "Quite a few words end with ⓔ");
      expect(hint).toHaveProperty("letter", "E");
    });
    it("first letter", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty(
        "message",
        "I just love the letter ⓖ, don't you?"
      );
      expect(hint).toHaveProperty("letter", "G");
    });
    it("next letter", () => {
      const target = "HOUR";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "O").state = "match";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty(
        "message",
        "I just love the letter ⓤ, don't you?"
      );
      expect(hint).toHaveProperty("letter", "U");
    });
    it("no hint when all present", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "present";
      keys.find((key) => key.label === "O").state = "present";
      keys.find((key) => key.label === "P").state = "present";
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys, settings)).toBeNull();
    });
    it("subtle hint when only 1 remaining", () => {
      const target = "HUNT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "U").state = "match";
      keys.find((key) => key.label === "N").state = "match";
      keys.find((key) => key.label === "S").state = "miss";

      const hint = getHint(target, keys, settings);
      expect(hint).toHaveProperty(
        "message",
        "It's definitely *not* these: ⓒ, ⓛ, ⓡ"
      );
      expect(hint).toHaveProperty("letter", undefined);
    });
  });
});
