import { Ui } from "./Ui.js";

export class Streak extends Ui {
  streak = 0;
  element = this.getElement(this.UiSelectors.streak);

  startCount() {
    this.streak = 0;
    this.element.textContent = this.streak;
  }
}
