// @ts-check

const { getHint } = require("../public/hint");

/**
 *
 * @returns {import("../types").KeyState[]}
 */
function getDefaultKeys() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    type: "letter",
    label: letter,
    state: "available",
  }));
}

describe("hint", () => {
  describe("getHint", () => {
    it("find a vowel", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "T").state = "present";
      expect(getHint(target, keys).message).toBe(`How about a vowel like ⓔ?`);
      expect(getHint(target, keys).letter).toBe("E");
    });
    it("multiples", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys).message).toBe(
        `There could be more than one ⓔ`
      );
      expect(getHint(target, keys).letter).toBe("E");
    });
    it("cluster - ch", () => {
      const target = "CHAT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      keys.find((key) => key.label === "H").state = "present";
      expect(getHint(target, keys).message).toBe(
        `Did you know ⓗ and ⓒ often go together?`
      );
      expect(getHint(target, keys).letter).toBe("C");
    });
    it("cluster - th", () => {
      const target = "DENT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      keys.find((key) => key.label === "N").state = "match";
      expect(getHint(target, keys).message).toBe(
        `Did you know ⓝ and ⓣ often go together?`
      );
      expect(getHint(target, keys).letter).toBe("T");
    });
    it("e at the end", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      expect(getHint(target, keys).message).toBe(
        `Quite a few words end with ⓔ`
      );
      expect(getHint(target, keys).letter).toBe("E");
    });
    it("first letter", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys).message).toBe(
        `I just love the letter ⓖ, don't you?`
      );
      expect(getHint(target, keys).letter).toBe("G");
    });
    it("next letter", () => {
      const target = "HOUR";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "O").state = "match";
      expect(getHint(target, keys).message).toBe(
        `I just love the letter ⓤ, don't you?`
      );
      expect(getHint(target, keys).letter).toBe("U");
    });
    it("no hint when all present", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "present";
      keys.find((key) => key.label === "O").state = "present";
      keys.find((key) => key.label === "P").state = "present";
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys)).toBeNull();
    });
    it("subtle hint when only 1 remaining", () => {
      const target = "HUNT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "U").state = "match";
      keys.find((key) => key.label === "N").state = "match";
      keys.find((key) => key.label === "S").state = "miss";
      expect(getHint(target, keys).message).toBe(
        `It's definitely *not* these: ⓒ, ⓛ, ⓡ`
      );
      expect(getHint(target, keys).letter).toBeUndefined();
    });
  });
});
