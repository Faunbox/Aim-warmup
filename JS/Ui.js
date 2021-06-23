export class Ui {
  UiSelectors = {
    board: "[data-board]",
    resetButton: "[data-reset-button]",
    easyButton: "[data-easy-button]",
    normalButton: "[data-normal-button]",
    expertButton: "[data-expert-button]",
    streak: "[data-streak]",
    timer: "[data-timer]",
  };

  getElement(selector) {
    return document.querySelector(selector);
  }

  getElements(selectors) {
    return document.querySelectorAll(selectors);
  }
}
