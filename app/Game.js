import Menu from "./Menu.js";
import Score from "./Score.js";
import Buttons from "./Buttons.js";

class Game {
  constructor({ backgroundWrapper, gameWrapper, scoreWrapper, buttonsWraper }) {
    this.gameWrapper = gameWrapper;
    this.scoreWrapper = scoreWrapper;
    this.buttonsWraper = buttonsWraper;
    this.backgroundWrapper = backgroundWrapper;
    this.scoreClass = new Score();
    this.menu = new Menu();
    this.buttons = new Buttons(buttonsWraper);
  }

  numbersOfDivs = 290;

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

  glowElement() {
    const divs = document.querySelectorAll(".head");
    setInterval(() => {
      let index = Math.floor(Math.random() * divs.length);
      const div = divs[index];
      div.classList.add("active");
      setTimeout(() => div.classList.remove("active"), this.menu.delayGlowEnds);
    }, this.menu.delayGlowTime);
  }

  init() {
    this.menu.show();
    this.buildDivs();
    this.scoreClass.printScore();
    this.buttons.dziala();
    document.querySelector(".start").addEventListener("click", this.start());
  }

  start() {
    this.glowElement();
  }
}

const game = new Game({
  backgroundWrapper: document.querySelector("#AimWarmUp"),
  gameWrapper: document.querySelector("#game"),
  scoreWrapper: document.querySelector("#score"),
  buttonsWraper: document.querySelector("#buttons"),
});
game.init();
