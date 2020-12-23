export default class Buttons {
  constructor(buttons) {
    this.buttons = buttons;
  }
  dziala() {
    const start = document.createElement("button");
    const stop = document.createElement("button");
    start.classList.add("start");
    start.innerHTML = "start";
    stop.innerHTML = "stop";
    this.buttons.appendChild(start, stop);
  }
}
