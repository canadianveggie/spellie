const { getHintText } = require("../public/hint");

function getDefaultKeys() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => ({
    type: "letter",
    label: letter,
    state: "available",
  }));
}

describe("hint", () => {
  describe("getHintText", () => {
    it("find a vowel", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "T").state = "present";
      expect(getHintText(target, keys)).toBe(`How about a vowel like "e"?`);
    });
    it("multiples", () => {
      const target = "FEET";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      expect(getHintText(target, keys)).toBe(
        `You know, there could be more than one "e"...`
      );
    });
    it("cluster - ch", () => {
      const target = "CHAT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      keys.find((key) => key.label === "H").state = "present";
      expect(getHintText(target, keys)).toBe(
        `I heard that "h" is really good friends with "c".`
      );
    });
    it("cluster - th", () => {
      const target = "DENT";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      keys.find((key) => key.label === "N").state = "match";
      expect(getHintText(target, keys)).toBe(
        `I heard that "n" is really good friends with "t".`
      );
    });
    it("e at the end", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "A").state = "present";
      expect(getHintText(target, keys)).toBe(
        `Quite a few words end with "e"...`
      );
    });
    it("first letter", () => {
      const target = "GAME";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "E").state = "present";
      expect(getHintText(target, keys)).toBe(
        `I just love the letter "g", don't you?`
      );
    });
    it("next letter", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "match";
      keys.find((key) => key.label === "O").state = "match";
      keys.find((key) => key.label === "E").state = "present";
      expect(getHintText(target, keys)).toBe(
        `I just love the letter "p", don't you?`
      );
    });
    it("encouragement if all present", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "H").state = "present";
      keys.find((key) => key.label === "O").state = "present";
      keys.find((key) => key.label === "P").state = "present";
      keys.find((key) => key.label === "E").state = "present";
      expect(getHintText(target, keys)).toBe(`You're almost there!`);
    });
    it("encouragement if 3 matches", () => {
      const target = "HOPE";
      const keys = getDefaultKeys();
      keys.find((key) => key.label === "O").state = "match";
      keys.find((key) => key.label === "P").state = "match";
      keys.find((key) => key.label === "E").state = "match";
      expect(getHintText(target, keys)).toBe(`You're almost there!`);
    });
  });
});
