import Score from "./Score.js";

class Game {
  constructor({ backgroundWrapper, gameWrapper, scoreWrapper, buttonsWraper }) {
    this.gameWrapper = gameWrapper;
    this.scoreWrapper = scoreWrapper;
    this.buttonsWraper = buttonsWraper;
    this.backgroundWrapper = backgroundWrapper;
    this.scoreClass = new Score();
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
      setTimeout(() => div.classList.remove("active"), 1500);
    }, 1000);
  }

  // makeButtons() {
  //   const resetBtn = document.createElement("button");
  //   const startBtn = document.createElement("button");
  //   resetBtn.classList.add("reset");
  //   startBtn.classList.add("start");
  //   startBtn.innerHTML = "Start";
  //   resetBtn.innerHTML = "Reset";
  //   resetBtn.addEventListener("click", this.scoreClass.resetScore());
  //   this.buttonsWraper.append(startBtn, resetBtn);
  // }

  start() {
    this.buildDivs();
    this.scoreClass.printScore();
    this.glowElement();
    // this.makeButtons();
  }
}

const game = new Game({
  backgroundWrapper: document.querySelector("#AimWarmUp"),
  gameWrapper: document.querySelector("#game"),
  scoreWrapper: document.querySelector("#score"),
  buttonsWraper: document.querySelector("#buttons"),
});
game.start();
