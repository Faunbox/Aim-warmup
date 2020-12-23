export default class Menu {
  names = ["łatwy", "średni", "trudny"];

  delayGlowTime = 1000;
  delayGlowEnds = 1500;

  show() {
    for (let i = 0; i < this.names.length; i++) {
      const btn = document.createElement("button");
      btn.addEventListener("click", () => {
        if (btn.innerHTML === "łatwy") {
          this.delayGlowEnds = 2000;
          this.delayGlowTime = 1000;
        } else if (btn.innerHTML === "średni") {
          this.delayGlowEnds = 1500;
          this.delayGlowTime = 750;
        } else {
          this.delayGlowEnds = 1000;
          this.delayGlowTime = 500;
        }
        document.querySelector("#wrapper").style.display = "none";
      });
      btn.classList.add("level");
      btn.innerHTML = this.names[i];
      document.querySelector("#menu").appendChild(btn);
    }
  }
}
