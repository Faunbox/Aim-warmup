class Game {
  constructor({ backgroundWrapper, gameWrapper, scoreWrapper, buttonsWraper }) {
    this.gameWrapper = gameWrapper;
    this.scoreWrapper = scoreWrapper;
    this.buttonsWraper = buttonsWraper;
    this.backgroundWrapper = backgroundWrapper;
  }

  numbersOfDivs = 290;
  score = 0;
  strick = 0;
  misses = 0;

  scoreIncrease() {
    this.score++;
    this.strick++;
  }

  buildDivs() {
    for (let i = 0; i < this.numbersOfDivs; i++) {
      const div = document.createElement("div");
      div.classList.add("head");
      div.addEventListener("click", () => {
        if (div.classList.contains("active")) {
          div.style.opacity = 0;
          this.scoreIncrease();
          setTimeout(() => {
            div.style.opacity = 1;
          }, 2000);
        } else {
          this.misses++;
        }
        this.printScore();
      });

      this.gameWrapper.appendChild(div);
    }
  }

  printScore() {
    document.querySelectorAll(
      ".score"
    )[0].innerHTML = `Twoje trafienia to: ${this.score}`;
    document.querySelectorAll(
      ".score"
    )[1].innerHTML = `Twoje trafienia z rzędu to: ${this.strick}`;
    document.querySelectorAll(
      ".score"
    )[2].innerHTML = `Twoje pudła to: ${this.misses}`;
  }

  glowElement() {
    const divs = document.querySelectorAll(".head");
    setInterval(() => {
      const div = divs[Math.floor(Math.random() * divs.length)];
      div.classList.add("active");
      setTimeout(() => div.classList.remove("active"), 1500);
    }, 1000);
  }

  start() {
    this.buildDivs();
    this.printScore();
    this.glowElement();
  }
}

const game = new Game({
  backgroundWrapper: document.querySelector("#AimWarmUp"),
  gameWrapper: document.querySelector("#game"),
  scoreWrapper: document.querySelector("#score"),
  buttonsWraper: document.querySelector("#buttons"),
});
game.start();
