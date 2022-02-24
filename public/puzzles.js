// @ts-check

// spoiler alert
const words_easy = [
  "TOLD",
  "POND",
  "WORD",
  "TEAM",
  "LOVE",
  "DOGS",
  "CUPS",
  "SAME",
  "PIGS",
  "CLAW",
  "BIKE",
  "LEGS",
  "GIFT",
  "WIDE",
  "RATE",
  "MIND",
  "MOLD",
  "LUMP",
  "THEY",
  "JOBS",
  "DUMP",
  "MEAL",
  "HOME",
  "COOL",
  "GLAD",
  "BAND",
  "ROPE",
  "LAKE",
  "SEAT",
  "PETS",
  "SOFA",
  "SNUG",
  "CHOP",
  "WITH",
  "DATE",
  "LUCK",
  "RAGE",
  "MOON",
  "MATS",
  "BUMP",
  "BASK",
  "SAID",
  "DUCK",
  "FANG",
  "MATE",
  "LAST",
  "MINE",
  "BRAG",
  "BATH",
  "BIRD",
  "JOKE",
  "CHIN",
  "FLAT",
  "TAKE",
  "KEEP",
  "GREW",
  "SOME",
  "BARK",
  "PRAY",
  "FINE",
  "EASY",
  "WASH",
  "FAST",
  "MINT",
  "LAWN",
  "WAIT",
  "EGGS",
  "RATS",
  "GATE",
  "EAST",
  "SICK",
  "OVER",
  "PAIN",
  "ZERO",
  "CAGE",
  "SEND",
  "CLAP",
  "DEER",
  "SHOW",
  "HIKE",
  "LENT",
  "DUST",
  "HELP",
  "CROW",
  "GIVE",
  "LIKE",
  "PART",
  "HUGS",
  "INTO",
  "CLAY",
  "ROCK",
  "TALE",
  "COWS",
  "PINK",
  "MORE",
  "HEAT",
  "KIND",
  "HOLD",
  "TELL",
  "WHEN",
  "NEAT",
  "BEST",
  "NAIL",
  "NEXT",
  "REST",
  "FILL",
  "NOTE",
  "SAVE",
  "SALE",
  "DRAW",
  "WALL",
  "KING",
  "MADE",
  "RUST",
  "BELT",
  "JUMP",
  "BEEP",
  "RODE",
  "HILL",
  "SELL",
  "STAY",
  "GOLF",
  "HANG",
  "HARM",
  "CAME",
  "MUCH",
  "PAWS",
  "THEN",
  "FATE",
  "BALL",
  "UPON",
  "BLUE",
  "RANG",
  "FORK",
  "DENT",
  "PICK",
  "CRIB",
  "FOOT",
  "LION",
  "CAKE",
  "CLUB",
  "FLAG",
  "BONE",
  "SHIP",
  "FOUR",
  "FACE",
  "GIRL",
  "COOK",
  "SLOW",
  "WINS",
  "SHOP",
  "WING",
  "PAVE",
  "PLAN",
  "TASK",
  "ONCE",
  "ROOM",
  "PEST",
  "HINT",
  "STEP",
  "NETS",
  "HAVE",
  "NAPS",
  "LAMP",
  "SOLD",
  "SIDE",
  "CANE",
  "COLD",
  "CARD",
  "CLAM",
  "CREW",
  "DESK",
  "TREE",
  "SAND",
  "MANY",
  "FORT",
  "CHAT",
  "TOAD",
  "MICE",
  "WEST",
  "WANT",
  "MILK",
  "DOLL",
  "LATE",
  "DEEP",
  "FROG",
  "POTS",
  "BOLD",
  "STEW",
  "FROM",
  "SNOW",
  "TIME",
  "STOW",
  "USED",
  "MUST",
  "HOPE",
  "THEM",
  "PAGE",
  "STOP",
  "SIZE",
  "BEAT",
  "DIME",
  "BATS",
  "CUBE",
  "NECK",
  "KITE",
  "HUMP",
  "HATE",
  "HORN",
  "THIS",
  "ZONE",
  "BUSH",
  "FIVE",
  "TUBE",
  "EACH",
  "READ",
  "ROAD",
  "MASK",
  "FAKE",
  "TANK",
  "BELL",
  "SNAP",
  "PLAY",
  "KNOW",
  "FALL",
  "FLEW",
  "SUCH",
  "HIDE",
  "BORN",
  "SANK",
  "PEAR",
  "SEED",
  "HEAL",
  "TRIP",
  "GAME",
  "LINE",
  "SLED",
  "GONE",
  "FOLD",
  "LIPS",
  "DAMP",
  "BOWL",
  "YAMS",
  "GUST",
  "HIND",
  "MAID",
  "BLEW",
  "SPIT",
  "VERY",
  "SLIP",
  "LIVE",
  "COAT",
  "BOAT",
  "HARD",
  "RAIN",
  "GAVE",
  "CONE",
  "BOOK",
  "CANS",
  "MAKE",
  "BUNS",
  "OPEN",
  "SENT",
  "DARK",
  "BAKE",
  "WALK",
  "CRAM",
  "DIRT",
  "STAR",
  "SHUT",
  "VEST",
  "VOTE",
  "FRAY",
  "RIDE",
  "BANG",
  "SAIL",
  "CARS",
  "LIME",
  "LAND",
  "DINE",
  "TALL",
  "FREE",
  "FIND",
  "TURN",
  "COME",
  "BEDS",
  "CASE",
  "STIR",
  "HAND",
  "DROP",
  "SODA",
  "RANK",
  "NOSE",
  "JUST",
  "SINK",
  "TOYS",
  "TAIL",
  "CORN",
  "CART",
  "EARS",
  "CATS",
  "PIKE",
  "NAME",
  "NEST",
  "DEAL",
  "MEAT",
  "BENT",
  "JAWS",
  "RAGS",
  "TAPS",
  "DOTS",
  "TOES",
  "CUBS",
  "BUGS",
  "KEYS",
  "SWAN",
  "BABY",
  "BEAR",
  "ANTS",
  "ARMS",
  "CRAB",
  "DART",
  "FIRE",
  "GERM",
  "GOLD",
  "HEAD",
  "HERO",
  "HOLE",
  "KALE",
  "LEAF",
  "LINK",
  "OWLS",
  "PINS",
  "RING",
  "ROSE",
  "SALT",
  "SHOE",
  "SWIM",
  "TACO",
  "TENT",
  "TRAP",
  "WAVE",
  "WEBS",
  "SPOT",
  "DRIP",
  "SING",
  "PLUM",
  "BOOT",
  "GROW",
  "GRIN",
  "FISH",
  "CAST",
  "GOAT",
  "WIRE",
  "WARM",
  "KICK",
  "KISS",
  "MESS",
  "TOWN",
  "PARK",
  "JARS",
  "LOOK",
  "TALK",
  "SEAL",
  "WORM",
  "WORK",
  "BEND",
  "SOAP",
  "MOPS",
  "FEED",
  "HOOK",
  "PAST",
  "POOL",
  "TEST",
  "CAVE",
  "HAIR",
  "DRUM",
  "SOFT",
  "BOIL",
  "DOCK",
  "MOVE",
  "RENT",
  "FOOD",
  "CURL",
  "VANS",
  "PACK",
  "RUGS",
  "SONG",
].map(btoa);

const words_medium = [
  "PLOT",
  "FOUND",
  "THINK",
  "BLACK",
  "DREAM",
  "CHORE",
  "SHIRT",
  "GOING",
  "TRICK",
  "VASE",
  "THING",
  "HOPS",
  "SLAM",
  "SLANT",
  "BARE",
  "LUNCH",
  "COIL",
  "WHITE",
  "TEACH",
  "CRANK",
  "SLID",
  "NEVER",
  "SPACE",
  "SACK",
  "SHARK",
  "THANK",
  "BEAN",
  "THERE",
  "SHARE",
  "TOAST",
  "STACK",
  "SPOKE",
  "PULL",
  "BLEND",
  "SAYS",
  "FRESH",
  "CLASH",
  "TWIG",
  "THIRD",
  "HORSE",
  "SHALL",
  "CHOKE",
  "RIVER",
  "FLESH",
  "PURE",
  "ONLY",
  "JOIN",
  "WEAK",
  "BEING",
  "STICK",
  "CROWD",
  "WISH",
  "STONE",
  "LEAN",
  "WEEK",
  "SOUND",
  "SMELL",
  "TUNE",
  "BRAND",
  "SPEED",
  "DRIVE",
  "DASH",
  "TRAIL",
  "TABLE",
  "BAIT",
  "RAMS",
  "SHOCK",
  "CLEAR",
  "TREAT",
  "CLOUD",
  "STAIN",
  "SNACK",
  "ROBIN",
  "BUNCH",
  "BRING",
  "AGES",
  "SEAM",
  "MIGHT",
  "CASH",
  "ALARM",
  "FIELD",
  "YARD",
  "HARE",
  "LOCK",
  "PALE",
  "NOTES",
  "FLAW",
  "WENT",
  "JAIL",
  "ROLE",
  "BEAD",
  "AFTER",
  "SOCK",
  "THESE",
  "ARMY",
  "QUIT",
  "TRIM",
  "GRAPE",
  "HURT",
  "RICH",
  "CHEST",
  "LIMP",
  "WIND",
  "FRONT",
  "BREAD",
  "WHEEL",
  "CHESS",
  "STOVE",
  "REACH",
  "WHILE",
  "FIRST",
  "STOOL",
  "SHAPE",
  "PLUS",
  "WOMEN",
  "BROWN",
  "GOOSE",
  "BLIMP",
  "COULD",
  "PIES",
  "HUNT",
  "BRICK",
  "PLATE",
  "SHORT",
  "SLOT",
  "LOUD",
  "AWAY",
  "GUTS",
  "SNAIL",
  "CHAIN",
  "SHAKE",
  "STUCK",
  "MUGS",
  "MINUS",
  "STRAW",
  "BLOCK",
  "DRINK",
  "ANGRY",
  "HEARD",
  "TRIBE",
  "THROB",
  "THOSE",
  "HALF",
  "GRADE",
  "FINCH",
  "HEAVY",
  "SLEEP",
  "PRINT",
  "WHERE",
  "FIGHT",
  "BLINK",
  "GLOBE",
  "CURE",
  "RUDE",
  "TODAY",
  "CLICK",
  "CHALK",
  "LIST",
  "UNDER",
  "DOES",
  "SPIN",
  "STEEP",
  "CLOCK",
  "LOAF",
  "DONE",
  "WIGS",
  "TRAIN",
  "TRADE",
  "CRAWL",
  "FLASH",
  "ROUND",
  "WHAT",
  "SCALE",
  "CHILD",
  "GRIT",
  "WOMAN",
  "BRIDE",
  "SIGHT",
  "CLASS",
  "SHORE",
  "WATER",
  "LIGHT",
  "PATH",
  "BIRTH",
  "RAKE",
  "RAISE",
  "CLEAN",
  "OTHER",
  "MAYBE",
  "YOUR",
  "GRIND",
  "LIONS",
  "TRUTH",
  "SLIDE",
  "HUGE",
  "SWING",
  "WHICH",
  "NIGHT",
  "PUSH",
  "PANTS",
  "SLICE",
  "LUNG",
  "BOTH",
  "APART",
  "TRUST",
  "APPLE",
  "SHOES",
  "BLOW",
  "ZEBRA",
  "GOES",
  "TRAY",
  "PRIME",
  "PINT",
  "CROWN",
  "FLOP",
  "SHARP",
  "DEAR",
  "UNCLE",
  "PAIL",
  "HOUSE",
  "DROVE",
  "FLAP",
  "LEAVE",
  "STRAY",
  "BURN",
  "STORE",
  "SURE",
  "CAMP",
  "PIECE",
  "LONG",
  "TEAR",
  "SMART",
  "SLEET",
  "SCREW",
  "PINE",
  "FLOW",
  "WHALE",
  "SLICK",
  "BARN",
  "MEAN",
  "COUNT",
  "AGAIN",
  "SNORE",
  "DISH",
  "STATE",
  "FULL",
  "NONE",
  "STAMP",
  "BUSY",
  "TIGER",
  "TRUCK",
  "FLAKE",
  "WOOL",
  "GLUE",
  "BLAST",
  "LOST",
  "RIGHT",
  "TWIST",
  "START",
  "AUNT",
  "GRAND",
  "TIGHT",
  "BEAM",
  "JUICE",
  "PLANT",
  "CHAIR",
  "SPEAK",
  "MARK",
  "SPARK",
  "WORDS",
  "CURLS",
  "FACES",
  "SWIMS",
  "PARKS",
  "HORNS",
  "LUNGS",
  "BUNNY",
  "CAMEL",
  "CANDY",
  "CLOWN",
  "HONEY",
  "ACTOR",
  "STEAM",
  "EXTRA",
  "GROWS",
  "FRAME",
  "UNTIL",
  "REPLY",
  "BEANS",
  "BRAIN",
  "OCEAN",
  "GOATS",
  "EARLY",
  "GUIDE",
  "MOUTH",
  "GRINS",
  "LEAST",
  "PRICE",
  "FEAST",
  "FRUIT",
  "MATCH",
  "MONEY",
  "MELON",
  "CREAM",
  "ANGER",
  "BERRY",
  "TOADS",
  "BAKER",
  "PINCH",
].map(btoa);

const words_hard = [
  "SAUCY",
  "LOYAL",
  "CRANE",
  "SCARF",
  "FLOWER",
  "MONTH",
  "MAYOR",
  "SWEAT",
  "SKILL",
  "STRING",
  "BENCH",
  "FAMILY",
  "COOKIE",
  "SUNNY",
  "MOTOR",
  "GIANT",
  "MUNCH",
  "UNTIE",
  "PARENT",
  "HAPPY",
  "BLAZE",
  "LARGE",
  "NORTH",
  "WINTER",
  "FLUTE",
  "BRAVE",
  "AWARE",
  "WEAVE",
  "SISTER",
  "NOISE",
  "BOAST",
  "CENTER",
  "GREEN",
  "STUNG",
  "COVET",
  "CREPT",
  "LOCAL",
  "SPEECH",
  "SPEND",
  "SCRAP",
  "COURT",
  "METER",
  "WEIRD",
  "LAUGH",
  "SERVE",
  "EXIST",
  "SWIFT",
  "SILLY",
  "GUESS",
  "BRUSH",
  "GREET",
  "MAGIC",
  "HURRY",
  "BRASS",
  "DOCTOR",
  "FROWN",
  "SHAVE",
  "SCENE",
  "CHARGE",
  "POINT",
  "MOUSE",
  "ADOPT",
  "BRIGHT",
  "RABBIT",
  "CRATE",
  "LATER",
  "GROWL",
  "SMALL",
  "CAMPS",
  "HOIST",
  "ANIMAL",
  "DIRTY",
  "ANNOY",
  "BADGE",
  "AROUND",
  "GLOVE",
  "FLIGHT",
  "FRIED",
  "ALONE",
  "BARNS",
  "GLOSS",
  "CHUTE",
  "FLUNG",
  "VOCAL",
  "MOTHER",
  "PITCH",
  "TOOTH",
  "BEFORE",
  "SWEET",
  "FLEET",
  "DWELL",
  "ARGUE",
  "READY",
  "POUND",
  "EMPTY",
  "EXCEL",
  "STOLE",
  "ROUGH",
  "USING",
  "ALONG",
  "SMOKE",
  "PATCH",
  "TORCH",
  "BUILT",
  "KITTEN",
  "FLOCK",
  "BOARD",
  "DRANK",
  "LEVEL",
  "SOLVE",
  "BEGIN",
  "SPOON",
  "ARISE",
  "LEARNS",
  "SOUTH",
  "BROOM",
  "AGREE",
  "SCENT",
  "QUICK",
  "ORDER",
  "ELBOW",
  "VENOM",
  "FORTH",
  "HATCH",
  "FATHER",
  "SUMMER",
  "ENJOY",
  "METAL",
  "GUILD",
  "GUEST",
  "TOUCH",
  "CYCLE",
  "COACH",
  "FAIRY",
  "MYSELF",
  "MAPLE",
  "LINEN",
  "EQUAL",
  "THREE",
  "TRIED",
  "VALUE",
  "GRASS",
  "CARRY",
  "TAUNT",
  "WRING",
  "ISSUE",
  "BASIN",
  "DOZEN",
  "EVERY",
  "CANAL",
  "NOISY",
  "PERSON",
  "WHOLE",
  "EAGER",
  "TRACE",
  "CABLE",
  "PORCH",
  "SCOWL",
  "MUSIC",
  "GRAVY",
  "FROZE",
  "DAILY",
  "ALOUD",
  "YOUNG",
  "OFFER",
  "SUGAR",
  "KNACK",
  "BURST",
  "SLEEK",
  "ELEVEN",
  "SHEET",
  "CHOSE",
  "IMAGE",
  "CHASE",
  "BUILD",
  "STILL",
  "WRONG",
  "CRUSH",
  "BLESS",
  "PRIZE",
  "BASIC",
  "NUMBER",
  "CRAYON",
  "SECOND",
  "THROW",
  "ABOVE",
  "USUAL",
  "RANCH",
  "TOILS",
  "STAGE",
  "THICK",
  "GRAIN",
  "SEVEN",
  "LEDGE",
  "GUARD",
  "CRIED",
  "THRIFT",
  "WIDTH",
  "INSIDE",
  "ROUTE",
  "AWFUL",
  "CLOSE",
  "RANGE",
  "BLAME",
  "FLOUR",
  "QUILT",
  "PENCIL",
  "ALWAYS",
  "COAST",
  "STUDY",
  "FIRED",
  "EXERT",
  "DRUMS",
  "GLORY",
  "BEAST",
  "BUYER",
  "SKATE",
  "AHEAD",
  "FOGGY",
  "AWAKE",
  "ALERT",
  "ORANGE",
  "FAULT",
  "PURPLE",
  "WRIST",
  "THEIR",
  "STAFF",
  "ABOUT",
  "ROAST",
  "STUMP",
  "BLANK",
  "PRETTY",
  "WORRY",
  "HEART",
  "EIGHT",
  "ALIKE",
  "SHOOK",
  "SHEEP",
  "GHOST",
  "GROVE",
  "WRITE",
  "VOICE",
  "HOBBY",
  "FIFTH",
  "AROSE",
  "WORTH",
  "CHILI",
  "TOTAL",
  "WHOSE",
  "QUIET",
  "AMONG",
  "TOUGH",
  "WOULD",
  "CRASH",
  "CROSS",
  "PLANET",
  "QUEEN",
  "BANJO",
  "GEESE",
  "AVOID",
  "COUGH",
  "NAIVE",
  "GRILL",
  "WINDY",
  "OWNER",
  "OFTEN",
  "CLIMB",
  "JEANS",
  "SPENT",
  "CLOTH",
  "AWARD",
  "FRIEND",
  "BEGAN",
  "TIDAL",
  "SORRY",
  "BETTER",
  "GLASS",
  "ROYAL",
  "GROUP",
  "FROST",
  "JUDGE",
  "SLEPT",
  "DRESS",
  "AWHILE",
  "COMING",
  "SEARCH",
  "STATUE",
  "CIRCUS",
  "EMPLOY",
  "GENTLE",
  "ENOUGH",
  "BUBBLE",
  "RETURN",
  "PILLOW",
  "TIPPED",
  "LITTLE",
  "ITSELF",
  "AVENUE",
  "DOLLAR",
  "MANAGE",
  "COLLAR",
  "NATION",
  "REMOVE",
  "PLEASE",
  "STREAM",
  "RIDDLE",
  "HOLLOW",
  "INSIST",
  "PEOPLE",
  "GATHER",
  "MARKET",
  "SCARCE",
  "SQUIRT",
  "THIRST",
  "THRONE",
  "INVENT",
  "DEVICE",
  "CELERY",
  "STREET",
  "FLAVOR",
  "STRAIN",
  "EXCUSE",
  "CHOOSE",
  "COBWEB",
  "SLIGHT",
  "IGNORE",
  "UNLOAD",
  "SURELY",
  "MARBLE",
  "BOUGHT",
  "REMARK",
  "CHERRY",
  "WORKER",
  "JUGGLE",
  "HOPING",
  "MOPPED",
  "UNLOCK",
  "REMAIN",
  "BOTTLE",
  "UNABLE",
  "DINNER",
  "SHRIMP",
  "TAUGHT",
  "SEASON",
  "COUPLE",
  "FORGET",
  "ANSWER",
  "AMOUNT",
  "DONKEY",
  "BASKET",
  "VOYAGE",
  "PEBBLE",
  "BUTTER",
  "REPORT",
  "HEIGHT",
  "MIDDLE",
  "STRONG",
  "SCRAPE",
  "BATTLE",
  "AUTHOR",
  "BUCKET",
  "FOLLOW",
  "BRANCH",
  "INCOME",
  "BREATH",
  "PUSHES",
  "SIMPLE",
  "GENIUS",
  "TICKET",
  "THROAT",
  "HAPPEN",
  "BUSHES",
  "WANDER",
  "WONDER",
  "PRAISE",
  "BECOME",
  "ZIPPED",
  "TURTLE",
  "BEETLE",
  "MONKEY",
  "INVITE",
  "UNFAIR",
  "ADVICE",
  "ISLAND",
  "TIMING",
  "FINGER",
  "DOUBLE",
  "ALMOST",
  "THRILL",
  "THROWN",
  "WRENCH",
  "PLIGHT",
  "SHOULD",
  "FREEZE",
  "CACTUS",
  "STRIKE",
  "BORROW",
  "SOUGHT",
  "BRIDGE",
  "TURKEY",
  "REPAIR",
  "SLEEVE",
  "COUSIN",
  "SCREAM",
  "UNKIND",
  "CELLAR",
  "TARGET",
  "REMIND",
  "ACTION",
  "BANKER",
  "BORDER",
  "DAMAGE",
  "DECIDE",
  "DEFINE",
  "GUITAR",
  "HEALTH",
  "LAWYER",
  "LUMBER",
  "NATURE",
  "PICKLE",
  "POCKET",
  "REASON",
  "RECESS",
  "RECORD",
  "REDUCE",
  "REWARD",
  "SPEEDY",
  "SQUARE",
  "STOLEN",
  "TEMPER",
  "THREAD",
  "TRIPLE",
  "USEFUL",
  "VIRTUE",
  "VISUAL",
  "WEALTH",
  "WRITER",
].map(btoa);

const words = {
  easy: words_easy.map(atob),
  medium: words_medium.map(atob),
  hard: words_hard.map(atob),
};

const start = new Date(2022, 2 - 1, 10);

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;

function daysBetween(first, second) {
  return Math.floor((second - first) / MILLIS_PER_DAY);
}

function getPuzzleIdForDate(date) {
  return daysBetween(start, date);
}

function getPuzzlesForDate(date) {
  const index = getPuzzleIdForDate(date);
  const targets = {};
  for (const difficulty of Object.keys(words)) {
    const wordList = words[difficulty];
    targets[difficulty] =
      wordList[Math.abs(index % wordList.length)].toUpperCase();
  }
  return targets;
}

function getTodayPuzzleId() {
  return getPuzzleIdForDate(new Date());
}

function getTodayPuzzles() {
  return getPuzzlesForDate(new Date());
}

function compareTargetAndGuess(target, guess) {
  target = target.toUpperCase();
  guess = guess.toUpperCase();
  const length = target.length;
  const result = Array(length);
  const letterUsed = Array(length).fill(false);

  // 1st pass - matches
  for (let i = 0; i < length; i++) {
    if (target[i] === guess[i]) {
      result[i] = "match";
      letterUsed[i] = true;
    }
  }

  // 2nd pass - miss and present positions
  for (let i = 0; i < target.length; i++) {
    if (result[i] !== "match") {
      const otherLetters = target.split("").map((letter, j) => {
        if (i === j || letterUsed[j]) {
          return "";
        } else {
          return letter;
        }
      });
      const targetIndex = otherLetters.indexOf(guess[i]);
      if (targetIndex >= 0) {
        result[i] = "present";
        letterUsed[targetIndex] = true;
      } else {
        result[i] = "miss";
      }
    }
  }
  return result;
}

/** @type {import("../types").EmojiMatchThemes} */
const emojiMatchThemes = {
  nature: {
    match: "🍀",
    present: "🌻",
    miss: "🕸️",
  },
  fruit: {
    match: "🍏",
    present: "🍊",
    miss: "🥥",
  },
  vegetable: {
    match: "🥦",
    present: "🍄",
    miss: "🍽️",
  },
  tree: {
    match: "🌳",
    present: "🍁",
    miss: "🪨",
  },
  circle: {
    match: "🟢",
    present: "🟠",
    miss: "⚫️",
  },
};

/** @returns {import("../types").EmojiMatchThemeValue} */
function randomEmojiMatchTheme() {
  const themes = Object.values(emojiMatchThemes);
  return themes[Math.floor(Math.random() * themes.length)];
}

/**
 * @param {import("../types").Guess[]} guesses
 * @param {import("../types").EmojiMatchThemeKey} theme
 */
function guessesAsEmojis(guesses, theme) {
  const emojiTheme = emojiMatchThemes[theme] || randomEmojiMatchTheme();
  return guesses
    .map((guess) => {
      return guess
        .map((letter) => {
          return emojiTheme[letter.state] || "";
        })
        .join("");
    })
    .join("\n")
    .trim();
}

if (typeof module !== "undefined") {
  module.exports = {
    words,
    daysBetween,
    compareTargetAndGuess,
    emojiMatchThemes,
    guessesAsEmojis,
    getPuzzlesForDate,
  };
}
