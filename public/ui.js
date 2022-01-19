const targetLength = 4; // TODO: game state

export class UI {

  constructor(game, selectors) {
    this.game = game;
    this.containers = {
      keyboard: document.querySelector(selectors.keyboard),
      guesses: document.querySelector(selectors.guesses),
    };

    document.addEventListener('guess', () => {
      this.renderGuesses();
    })

    this.renderGuesses();
    this.renderKeyboard();
  }

  renderGuesses() {
    const guessLetters = this.game.currentGuess.split('')
    const allTiles = Array.from({ length: targetLength })
    this.containers.guesses.innerHTML = allTiles
      .map((_, i) => `<div class="guesses-tile">${guessLetters[i] || " "}</div>`)
      .join('\n');
  }

  renderKeyboard() {
    const container = this.containers.keyboard;
    container.addEventListener('click', () => {
      const { target } = event;
      if (target.matches('.key')) {
        this.game.addLetter(target.innerText);
      }
    });

    const letters = this.game.keyboard.letters;
    container.innerHTML = letters.map(letterState => `<div class="key">${letterState.letter}</div>`).join('\n');
  }

}