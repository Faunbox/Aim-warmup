import { Ui } from "./Ui.js";

export class Cell extends Ui {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    // this.isFake = false;
    this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
    this.element = null;
    this.isTarget = false;
  }

  createElement() {
    const element = `<div class="cell border border--concave" data-cell data-x="${this.x}" data-y="${this.y}"></div>`;
    return element;
  }

  addTarget() {
    this.isTarget = true;
    this.element.classList.add("cell--is-target");
  }

  clickOnTarget() {
    if (this.isTarget) {
      this.element.classList.remove("cell--is-target");
    }
  }
}
