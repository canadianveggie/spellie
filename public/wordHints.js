// @ts-check

/** @type {import("../types").WordHints} */
const wordHints = {
  SALT: {
    category: "Something you put on food",
    emoji: "🧂",
  },
  LOOK: {
    category: "Something you do",
    emoji: "👁️",
  },
  CREAM: {
    category: "Something to eat or drink",
    emoji: "🍦",
  },
  BAKE: {
    category: "Something you do",
    emoji: "🧑‍🍳",
  },
  PARTY: {
    category: "A fun time",
    emoji: "🥳",
  },
  SPARK: {
    category: "Something you can see",
    emoji: "⚡",
  },
  CAVE: {
    category: "A rocky place",
    emoji: "🦇",
  },
  HONEY: {
    category: "Something to eat",
    emoji: "🍯",
  },
  PARK: {
    category: "A place to go",
    emoji: "🏞",
  },
  MELON: {
    category: "Something to eat",
    emoji: "🍈",
  },
  LAND: {
    category: "A place not covered with water",
    emoji: "🌍",
  },
  BLAME: {
    category: "Something not kind we do",
    emoji: "😠",
  },

  LUCK: { category: "Something good", emoji: "☘️" },
  HORN: { category: "Something sharp", emoji: "🦏" },
  CHILD: { category: "A kind of person", emoji: "🧒" },
  CLAM: { category: "A sea creature" },
  BLOW: { category: "Something you do", emoji: "😮" },
  GROW: { category: "Something you do", emoji: "👩‍👧" },
  FRESH: { category: "Opposite of rotten" },
  GIVE: { category: "Something you do", emoji: "🎁" },
  THIRD: { category: "Not first", emoji: "🥉" },
  NAIL: { category: "A part of your body", emoji: "💅" },
  MINUS: { category: "Something you do in math", emoji: "➖" },
  LENT: { category: "Like a library book" },
  BEANS: { category: "Something you eat" },
  HOLD: { category: "Squeeze tightly" },
  SKUNK: { category: "A striped animal", emoji: "🦨" },
  MICE: { category: "They ran up the clock", emoji: "🐁" },
  FINCH: { category: "A kind of bird" },
  FAKE: { category: "Not real" },
  TRUCK: { category: "Something you drive", emoji: "🚙" },
  OWLS: { category: "Night birds", emoji: "🦉" },
  BLEND: { category: "Combine together" },
  TAPS: { category: "Parts of a sink", emoji: "🚰" },
  WHITE: { category: "Like some bread or rice", emoji: "⚪️" },
  JOKE: { category: "Knock, knock" },
  GRINS: { category: "Has a big smile", emoji: "😃" },
  TREE: { category: "Spot for a nest", emoji: "🌳" },
  HORNS: { category: "Beep, beep" },
  BELL: { category: "Ring, ring", emoji: "🔔" },
  ALARM: { category: "Wake-up buzzer", emoji: "⏰" },
  PRAY: { category: "Really hope", emoji: "🙏" },
  SKATE: { category: "Glide on ice", emoji: "⛸" },
  VANS: { category: "Vehicles", emoji: "🚐" },
  FLOP: { category: "A belly dive" },
  JUMP: { category: "Spring or leap" },
  WENT: { category: "Opposite of came" },
  RODE: { category: "Took a bike" },
  WRITE: { category: "Use a pencil", emoji: "✍️" },

  // later:
  // COMET: { hints: [" ☄️"] },
  // KALE: { hints: ["🥬"] },
  // SPOKE: { hints: ["Said something", "In a bike wheel"] },
  // FORT: { hints: ["You might build one with blankets", "Like a castle"] },
  // ANTS: {
  //   hints: [`It's a thing`, `It's a kind of bug`],
  // },
  // ARMS: {
  //   hints: [`They are a body part`, `Most people have two`],
  // },
  // CHAT: {
  //   hints: [`It's an action`, `To talk`],
  // },
  // CHOP: {
  //   hints: [`You do it to vegetables`, "🔪"],
  // },
  // CARE: {
  //   hints: [`A feeling`, `To take ____`],
  // },
  // CAST: {
  //   hints: [`A hard bandage`, `To ____ a spell`],
  // },
  // CAKE: {
  //   hints: [`Something you eat`, "🎂"],
  // },
  // COOL: {
  //   hints: [`Not warm`, "Not cold"],
  // },
  // CROW: {
  //   hints: [`A kind of bird`, `It's black`],
  // },
  // CARD: {
  //   hints: [`Made of paper`, `Used in many games`],
  // },
  // CAME: {
  //   hints: ["Moved closer", 'Opposite of "went away"'],
  // },
  // COAT: {
  //   hints: [`Something you wear`, "🧥"],
  // },
  // CANE: {
  //   hints: [`Candy ____`, "🦯"],
  // },
  // CORN: {
  //   hints: ["Something to eat", "🌽"],
  // },
  // CONE: {
  //   hints: ["A shape", "Eaten with ice cream"],
  // },
  // CART: {
  //   hints: ["Something you push", "🛒"],
  // },
  // COOK: {
  //   hints: ["Something you do to food", "🍳"],
  // },
  // CUBE: {
  //   hints: [`A shape`, "🧊"],
  // },
  // COWS: {
  //   hints: ["Tame animals", "🐮"],
  // },
  // CASE: {
  //   hints: [`A container`, `A pillow ____`],
  // },
  // CREW: {
  //   hints: [`Group of workers`, `People working on a boat`],
  // },
  // CRAM: {
  //   hints: [`Put a lot of things inside`],
  // },
  // CLAP: {
  //   hints: ["Hand noise", "👏"],
  // },
  // CLUB: {
  //   hints: [`A golf ____`, "♣️"],
  // },
  // CRAB: {
  //   hints: ["Creature that pinches", "🦀"],
  // },
  // COLD: {
  //   hints: [`Feeling in winter`, "🐧"],
  // },
  // CLAY: {
  //   hints: [`Like mud`, `Used to make pottery`],
  // },
  // CURL: {
  //   hints: [`A twisty shape`, `When hair is not straight`],
  // },
  // CAGE: {
  //   hints: [`Animals could be kept inside`, `Made of metal`],
  // },
  // CANS: {
  //   hints: [`Made of metal`, `Food or drink are kept inside`],
  // },
  // CATS: {
  //   hints: ["A pet", "🐈"],
  // },
  // CARS: {
  //   hints: ["Have wheels", "🚗"],
  // },
  // COME: {
  //   hints: [`Move toward`, `____ on, you can do it!`],
  // },
  // CUBS: {
  //   hints: [`Young creatures`, `Baby bear`],
  // },
  // CRIB: {
  //   hints: [`Small bed`, "Bed for baby"],
  // },
  // CHIN: {
  //   hints: [`On your face`, `Below your mouth`],
  // },
  // CAMP: {
  //   hints: [`Sleeping in nature`, `🏕️`],
  // },
};

window.wordHints = wordHints;

if (typeof module !== "undefined") {
  module.exports = {
    wordHints,
  };
}
