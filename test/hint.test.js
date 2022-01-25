const { getHint } = require("../public/hint");

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
      expect(getHint(target, keys).text).toBe(`How about a vowel like "e"?`);
      expect(getHint(target, keys).letter).toBe("E");
    });
    it("multiples", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys).text).toBe(
        `There could be more than one "e".`
      );
      expect(getHint(target, keys).letter).toBe("E");
    });
    it("cluster - ch", () => {
      const target = "CHAT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      keys.find((key) => key.label === "H").state = "present";
      expect(getHint(target, keys).text).toBe(
        `Did you know "h" and "c" often go together?`
      );
      expect(getHint(target, keys).letter).toBe("C");
    });
    it("cluster - th", () => {
      const target = "DENT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      keys.find((key) => key.label === "N").state = "match";
      expect(getHint(target, keys).text).toBe(
        `Did you know "n" and "t" often go together?`
      );
      expect(getHint(target, keys).letter).toBe("T");
    });
    it("e at the end", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      expect(getHint(target, keys).text).toBe(
        `Quite a few words end with "e".`
      );
      expect(getHint(target, keys).letter).toBe("E");
    });
    it("first letter", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys).text).toBe(
        `I just love the letter "g", don't you?`
      );
      expect(getHint(target, keys).letter).toBe("G");
    });
    it("next letter", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "O").state = "match";
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys).text).toBe(
        `I just love the letter "p", don't you?`
      );
      expect(getHint(target, keys).letter).toBe("P");
    });
    it("encouragement if all present", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "present";
      keys.find((key) => key.label === "O").state = "present";
      keys.find((key) => key.label === "P").state = "present";
      keys.find((key) => key.label === "E").state = "present";
      expect(getHint(target, keys).text).toBe(`You're almost there!`);
      expect(getHint(target, keys).letter).toBeUndefined();
    });
    it("encouragement if 3 matches", () => {
      const target = "HUNT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "U").state = "match";
      keys.find((key) => key.label === "N").state = "match";
      expect(getHint(target, keys).text).toBe(`You're almost there!`);
      expect(getHint(target, keys).letter).toBeUndefined();
    });
  });
});
