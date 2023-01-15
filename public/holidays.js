// @ts-check

/**
 * @param {Date} date
 * @returns {import("../types").HolidayPuzzles || undefined}
 */
function holidayPuzzle(date) {
  if (date.getMonth() === 1 - 1 && date.getDate() === 1) {
    return {
      name: "New Year's",
      easy: ["TIME", "YEAR"],
      medium: ["HAPPY", "CLOCK"],
      hard: [],
    };
  }
  if (date.getMonth() === 2 - 1 && date.getDate() === 14) {
    return {
      name: "Valentine's",
      easy: ["PINK", "KISS", "ROSE", "LOVE"],
      medium: ["HEART", "CANDY", "SWEET"],
      hard: ["ARROW", "POETRY", "FLOWER"],
    };
  }
  if (date.getMonth() === 3 - 1 && date.getDate() === 14) {
    return {
      name: "Pi Day",
      easy: ["MATH", "AREA"],
      medium: ["SHAPE", "THREE"],
      hard: ["CIRCLE", "RADIUS"],
    };
  }
  if (date.getMonth() === 3 - 1 && date.getDate() === 17) {
    return {
      name: "St. Patrick's",
      easy: [],
      medium: ["GREEN", "SAINT", "LUCKY"],
      hard: [],
    };
  }
  if (date.getMonth() === 3 - 1 && date.getDate() === 20) {
    return {
      name: "Spring Equinox",
      easy: ["NEST", "GROW"],
      medium: ["HATCH", "FRESH", "ROBIN"],
      hard: ["SPRING", "SPROUT"],
    };
  }
  if (date.getMonth() === 4 - 1 && date.getDate() === 1) {
    return {
      name: "April Fool's",
      easy: ["FOOL", "JOKE"],
      medium: ["SILLY", "TRICK", "APRIL"],
      hard: ["BANANA", "MAMMAL", "COCOON", "ONION"],
    };
  }
  if (date.getMonth() === 4 - 1 && date.getDate() === 22) {
    return {
      name: "Earth",
      easy: ["TREE", "LAND"],
      medium: ["EARTH", "REUSE", "CLEAN", "OCEAN"],
      hard: ["PLANET", "REDUCE", "FOREST"],
    };
  }
  if (date.getMonth() === 5 - 1 && date.getDate() === 4) {
    return {
      name: "May the Fourth",
      easy: ["STAR", "SOLO"],
      medium: ["FORCE", "SPACE", "REBEL"],
      hard: ["EMPIRE", "FOURTH"],
    };
  }
  // Sometime June 20
  if (date.getMonth() === 6 - 1 && date.getDate() === 21) {
    return {
      name: "Summer Solstice",
      easy: [],
      medium: ["LIGHT", "SUNNY"],
      hard: ["SUMMER", "YELLOW"],
    };
  }
  // Sometimes September 22
  if (date.getMonth() === 9 - 1 && date.getDate() === 23) {
    return {
      name: "Autumn Equinox",
      easy: ["RAKE", "FALL"],
      medium: ["APPLE", "ACORN"],
      hard: ["LEAVES", "AUTUMN", "ORANGE"],
    };
  }
  if (date.getMonth() === 10 - 1 && date.getDate() === 31) {
    return {
      name: "Halloween",
      easy: ["BATS", "MASK", "CATS"],
      medium: ["GHOST", "TREAT", "SCARY", "WITCH"],
      hard: ["GOBLIN", "SPOOKY", "SPIDER"],
    };
  }
  // Sometimes December 22
  if (date.getMonth() === 12 - 1 && date.getDate() === 21) {
    return {
      name: "Winter Solstice",
      easy: ["DARK", "SNOW"],
      medium: ["NIGHT", "SCARF"],
      hard: ["WINTER", "FROZEN"],
    };
  }
  if (date.getMonth() === 12 - 1 && date.getDate() === 25) {
    return {
      name: "Christmas",
      easy: ["GIFT", "CARD"],
      medium: ["BELLS", "ELVES"],
      hard: ["FROSTY", "SLEIGH"],
    };
  }

  if (
    date.getFullYear() === 2023 &&
    date.getMonth() === 1 - 1 &&
    date.getDate() === 22
  ) {
    return {
      name: "Lunar New Year",
      easy: [],
      medium: [],
      hard: ["RABBIT"],
    };
  }
  if (
    date.getFullYear() === 2024 &&
    date.getMonth() === 2 - 1 &&
    date.getDate() === 10
  ) {
    return {
      name: "Lunar New Year",
      easy: [],
      medium: [],
      hard: ["DRAGON"],
    };
  }
  if (
    date.getFullYear() === 2025 &&
    date.getMonth() === 1 - 1 &&
    date.getDate() === 29
  ) {
    return {
      name: "Lunar New Year",
      easy: [],
      medium: ["SNAKE"],
      hard: [],
    };
  }
  if (
    date.getFullYear() === 2026 &&
    date.getMonth() === 2 - 1 &&
    date.getDate() === 17
  ) {
    return {
      name: "Lunar New Year",
      easy: [],
      medium: ["HORSE"],
      hard: [],
    };
  }
  if (
    (date.getFullYear() === 2023 &&
      date.getMonth() === 4 - 1 &&
      date.getDate() === 9) ||
    (date.getFullYear() === 2024 &&
      date.getMonth() === 4 - 1 &&
      date.getDate() === 9) ||
    (date.getFullYear() === 2025 &&
      date.getMonth() === 4 - 1 &&
      date.getDate() === 9) ||
    (date.getFullYear() === 2026 &&
      date.getMonth() === 4 - 1 &&
      date.getDate() === 9)
  ) {
    return {
      name: "Easter",
      easy: ["EGGS", "HUNT"],
      medium: ["TULIP", "BUNNY"],
      hard: ["BASKET", "PASTEL"],
    };
  }

  return null;
}

window.holidayPuzzle = holidayPuzzle;

if (typeof module !== "undefined") {
  module.exports = {
    holidayPuzzle,
  };
}
