export function todaysPuzzle() {
  return 'PATH'; // hardcoded for now
}

export class GameState {
  constructor(target) {
    this.target = target
    this.guesses = [];
    this.keyboard = new Keyboard();
  }
}

export class Keyboard {
  constructor() {
    const a_z = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.letters = [];
    for (const letter of a_z) {
      this.letters.push({
        letter,
        state: 'AVAILABLE',
      });
    }
  }
}

