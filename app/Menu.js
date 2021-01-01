import Score from "./Score.js";

export default class Menu {
  constructor(buttons) {
    this.buttons = buttons;
    this.scoreClass = new Score();
  }
  names = ["łatwy", "średni", "trudny"];

  delayGlowTime = 1000;
  delayGlowEnds = 1500;
  startStop = true;
  runGameOnce = false;

  startButton() {
    const start = document.createElement("button");
    start.classList.add("start");
    start.textContent = "start";
    start.addEventListener("click", this.glowElement.bind(this));
    this.buttons.appendChild(start);
  }

  glowElement() {
    if (!this.runGameOnce) {
      const divs = document.querySelectorAll(".head");
      this.startStop = !this.startStop;
      setInterval(() => {
        let index = Math.floor(Math.random() * divs.length);
        const div = divs[index];
        div.classList.add("active");
        setTimeout(() => div.classList.remove("active"), this.delayGlowEnds);
      }, this.delayGlowTime);
    } else null;
    this.runGameOnce = true;
    if (!this.startStop) {
      document.querySelector(".start").textContent = "reset";
    } else if (this.startStop) {
      document
        .querySelectorAll(".active")
        .forEach((glowing) => glowing.classList.remove("active"));
      this.scoreClass.resetScore();
      document
        .querySelectorAll("div.head")
        .forEach((div) => (div.style.opacity = 1));
    }
    this.startStop = !this.startStop;
  }

  showButtonsLevel() {
    for (let i = 0; i < this.names.length; i++) {
      const btn = document.createElement("button");
      btn.addEventListener("click", () => {
        if (btn.innerHTML === "łatwy") {
          this.delayGlowEnds = 1500;
          this.delayGlowTime = 1500;
        } else if (btn.innerHTML === "średni") {
          this.delayGlowEnds = 1000;
          this.delayGlowTime = 750;
        } else if (btn.innerHTML === "trudny") {
          this.delayGlowTime = 400;
          this.delayGlowEnds = 1500;
        }
        document.querySelector("#wrapper").style.display = "none";
      });
      btn.classList.add("level");
      btn.innerHTML = this.names[i];
      document.querySelector("#menu").appendChild(btn);
    }
  }
}
