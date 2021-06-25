import { Ui } from "./Ui.js";

export class Streak extends Ui {
  streak = 0;
  element = this.getElement(this.UiSelectors.streak);

  #addStreakValueToElement(streak) {
    this.element.textContent = streak;
  }

  startCount() {
    this.streak = 0;
    this.#addStreakValueToElement(this.streak);
  }

  increaseStreak() {
    this.streak++;
    this.#addStreakValueToElement(this.streak);
  }
}
