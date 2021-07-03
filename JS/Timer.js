import { Ui } from "./Ui.js";

export class Timer extends Ui {
  #time = 0;
  #maxTimeValue = 999;
  #interval = null;
  #element = null;

  timerInit() {
    this.#element = this.getElement(this.UiSelectors.timer);
    this.#setTimerElementValue();
    this.startTimer();
  }

  startTimer() {
    this.#interval = setInterval(() => this.#timeUpdate(), 1000);
  }

  stopTimer() {
    clearInterval(this.#interval);
  }

  resetTimer() {
    this.#time = 0;
    this.#setTimerElementValue(this.#time);
    this.stopTimer();
    this.startTimer();
  }

  #setTimerElementValue(time) {
    this.#element.textContent = time;
  }

  #timeUpdate() {
    this.#time++;

    this.#time <= this.#maxTimeValue
      ? this.#setTimerElementValue(this.#time)
      : this.stopInterval();
  }
}
