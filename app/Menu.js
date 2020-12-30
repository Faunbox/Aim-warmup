export default class Menu {
  constructor(buttons) {
    this.buttons = buttons;
  }
  names = ["łatwy", "średni", "trudny"];

  delayGlowTime = 1000;
  delayGlowEnds = 1500;
  startStop = true;

  startButton() {
    const start = document.createElement("button");
    start.classList.add("start");
    this.startStop ? (start.innerHTML = "start") : (start.innerHTML = "stop");
    start.addEventListener(
      "click",
      this.glowElement.bind(this, this.delayGlowTime, this.delayGlowEnds)
    );
    this.buttons.appendChild(start);
  }

  glowElement() {
    const divs = document.querySelectorAll(".head");
    setInterval(() => {
      let index = Math.floor(Math.random() * divs.length);
      const div = divs[index];
      div.classList.add("active");
      setTimeout(() => div.classList.remove("active"), this.delayGlowEnds);
    }, this.delayGlowTime);
  }

  showButtonsLevel() {
    for (let i = 0; i < this.names.length; i++) {
      const btn = document.createElement("button");
      btn.addEventListener("click", () => {
        if (btn.innerHTML === "łatwy") {
          this.delayGlowEnds = 1500;
          this.delayGlowTime = 1500;
          console.log(this.delayGlowTime, this.delayGlowEnds);
        } else if (btn.innerHTML === "średni") {
          this.delayGlowEnds = 1000;
          this.delayGlowTime = 750;
          console.log(this.delayGlowTime, this.delayGlowEnds);
        } else if (btn.innerHTML === "trudny") {
          this.delayGlowTime = 300;
          this.delayGlowEnds = 1300;
          console.log(this.delayGlowTime, this.delayGlowEnds);
        }
        document.querySelector("#wrapper").style.display = "none";
      });
      btn.classList.add("level");
      btn.innerHTML = this.names[i];
      document.querySelector("#menu").appendChild(btn);
    }
  }
}
