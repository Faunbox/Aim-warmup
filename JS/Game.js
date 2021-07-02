import { Cell } from "./Cell.js";
import { Ui } from "./Ui.js";
import { Timer } from "./Timer.js";
import { Streak } from "./Streak.js";

class Game extends Ui {
  #config = {
    easy: {
      rows: 8,
      cols: 8,
      targets: 2,
      vanishTime: 1000,
    },
    normal: {
      rows: 16,
      cols: 16,
      targets: 3,
      vanishTime: 800,
    },
    expert: {
      rows: 16,
      cols: 30,
      targets: 4,
      vanishTime: 600,
    },
  };

  #cells = [];
  #cellsElement = [];
  #timer = new Timer();
  #streak = new Streak();

  #numberOfRows = null;
  #numberOfCols = null;
  #numberOfTargets = null;
  #numberOfActiveTargets = null
  #timeToVanish = null;

  #board = null;
  #modal = null;

  #buttons = {
    easy: null,
    normal: null,
    expert: null,
    modalReset: null,
    reset: null,
  };

  #handleElements() {
    this.#board = this.getElement(this.UiSelectors.board);
    this.#buttons.easy = this.getElement(this.UiSelectors.easyButton);
    this.#buttons.normal = this.getElement(this.UiSelectors.normalButton);
    this.#buttons.expert = this.getElement(this.UiSelectors.expertButton);
  }

  #generateCells() {
    for (let row = 0; row < this.#numberOfRows; row++) {
      this.#cells[row] = [];
      for (let col = 0; col < this.#numberOfCols; col++) {
        this.#cells[row].push(new Cell(col, row));
      }
    }
  }

  #renderBoard() {
    this.#cells.flat().forEach((cell) => {
      this.#board.insertAdjacentHTML("beforeend", cell.createElement());
      cell.element = cell.getElement(cell.selector);
    });
  }

  #newGame(
    rows = this.#config.easy.rows,
    cols = this.#config.easy.cols,
    targets = this.#config.easy.targets,
    vanishTime = this.#config.easy.vanishTime
  ) {
    this.#numberOfCols = cols;
    this.#numberOfRows = rows;
    this.#numberOfTargets = targets;
    this.#timeToVanish = vanishTime;

    this.#generateCells();
    this.#renderBoard();
    setInterval(this.#checkNumberOfActiveTargets(), 1000)
    this.#timer.startTimer();

    this.#cellsElement = this.getElements(this.UiSelectors.cell);
    this.#addCellsEventListener();
  }


  ////////////////nei dziala////////////////
  #checkNumberOfActiveTargets() {
    if (this.#numberOfActiveTargets >= 10) return
    else this.#targetCellsGenerator();
  }

  #getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #generateTargets = () => {
    let targetsToGenerate = this.#numberOfTargets;

    if (this.#numberOfActiveTargets >= 10) return
    while (targetsToGenerate) {
      const rowIndex = this.#getRandomInteger(0, this.#numberOfRows - 1);
      const colIndex = this.#getRandomInteger(0, this.#numberOfCols - 1);

      const cell = this.#cells[rowIndex][colIndex];

      const hasCellTarget = cell.isTarget;
      
    if (this.#numberOfActiveTargets >= 10) return
      this.#numberOfActiveTargets++

      if (!hasCellTarget) {
        cell.addTarget();
        targetsToGenerate--;
      }
    }
  }

  

  #targetCellsGenerator = () => {
    setInterval(this.#generateTargets, this.#timeToVanish)
  }

  #handleCellClick = (e) => {
    const target = e.target;
    const rowIndex = parseInt(target.getAttribute("data-y"), 10);
    const colIndex = parseInt(target.getAttribute("data-x"), 10);

    const cell = this.#cells[rowIndex][colIndex];

    this.#clickCell(cell);
  };

  #clickCell(cell) {
    if (cell.isTarget) {
      cell.clickOnTarget();
      this.#streak.increaseStreak();
    } else {
      this.#streak.startCount();
    }
  }

  #addCellsEventListener() {
    this.#cellsElement.forEach((cell) => {
      cell.addEventListener("click", this.#handleCellClick);
    });
  }

  init() {
    this.#handleElements();
    this.#newGame();
  }
}

window.onload = () => {
  const game = new Game();
  game.init();
};
