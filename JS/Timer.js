import { Ui } from "./Ui.js";

export class Timer extends Ui {
  #time = 0;
  #interval = null;
  #element = this.getElement(this.UiSelectors.timer);

  startTimer() {
    this.#interval = setInterval(() => {
      if (this.#time < 999) this.#time++;
      this.#element.textContent = this.#time;
    }, 1000);
  }

  stopInterval() {
    clearInterval(this.#interval);
    this.#time = 0;
  }
}
