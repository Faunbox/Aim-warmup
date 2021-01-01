import Menu from "./Menu.js";
import Score from "./Score.js";

export class Game {
  constructor({ backgroundWrapper, gameWrapper, scoreWrapper, buttonsWraper }) {
    this.gameWrapper = gameWrapper;
    this.scoreWrapper = scoreWrapper;
    this.buttonsWraper = buttonsWraper;
    this.backgroundWrapper = backgroundWrapper;
    this.scoreClass = new Score();
    this.menu = new Menu(buttonsWraper);
  }

  numbersOfDivs = 190 - 10;

  reset() {
    const resetBtn = document.createElement("button");
    resetBtn.type = "submit";
    resetBtn.classList.add("reset");
    resetBtn.textContent = "Wybór poziomu";
    resetBtn.addEventListener(
      "click",
      window.location.reload.bind(window.location)
    );
    this.buttonsWraper.appendChild(resetBtn);
  }

  buildDivs() {
    for (let i = 0; i < this.numbersOfDivs; i++) {
      const div = document.createElement("div");
      div.classList.add("head");
      div.addEventListener("click", () => {
        if (div.classList.contains("active")) {
          div.style.opacity = 0;
          this.scoreClass.scoreIncrease();
          setTimeout(() => {
            div.style.opacity = 1;
          }, 2000);
        } else {
          this.scoreClass.misses++;
          this.scoreClass.strick = 0;
        }
        this.scoreClass.printScore();
      });
      this.gameWrapper.appendChild(div);
    }
  }

  init() {
    this.menu.showButtonsLevel();
    this.menu.startButton();
    this.buildDivs();
    this.scoreClass.printScore();
    this.reset();
  }
}

const game = new Game({
  backgroundWrapper: document.querySelector("#AimWarmUp"),
  gameWrapper: document.querySelector("#game"),
  scoreWrapper: document.querySelector("#score"),
  buttonsWraper: document.querySelector("#buttons"),
});
game.init();
