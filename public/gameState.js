export function todaysPuzzle() {
  return 'PATH'; // hardcoded for now
}

export class GameState {
  constructor(target) {
    this.target = target
    this.guesses = [];
    this.currentGuess = '';
    this.keyboard = new Keyboard();
  }

  addLetter(letter) {
    this.currentGuess += letter.toUpperCase();

    // probably overkill
    document.dispatchEvent(new CustomEvent('guess', { detail: null }));

    if (this.currentGuess === todaysPuzzle()) {
      setTimeout(this.victory, 1000);
    }
  }

  victory() {
    alert('You win!');
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

