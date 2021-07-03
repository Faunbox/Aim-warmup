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
      vanishTime: 2000,
      cellGenerateTime: 800,
    },
    normal: {
      rows: 16,
      cols: 16,
      targets: 3,
      vanishTime: 1600,
      cellGenerateTime: 600,
    },
    expert: {
      rows: 16,
      cols: 30,
      targets: 4,
      vanishTime: 1200,
      cellGenerateTime: 600,
    },
  };

  #cells = [];
  #cellsElement = [];
  #timer = new Timer();
  #streak = new Streak();

  #numberOfRows = null;
  #numberOfCols = null;
  #numberOfTargets = null;
  #numberOfActiveTargets = null;
  #timeToVanish = null;
  #timeToGenerate = null;

  #targetsGeneratorInterval = null

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
    this.#buttons.reset = this.getElement(this.UiSelectors.resetButton);
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
    while (this.#board.firstChild) {
      this.#board.removeChild(this.#board.lastChild);
    }
    this.#cells.flat().forEach((cell) => {
      this.#board.insertAdjacentHTML("beforeend", cell.createElement());
      cell.element = cell.getElement(cell.selector);
    });
  }

  #newGame(
    rows = this.#config.easy.rows,
    cols = this.#config.easy.cols,
    targets = this.#config.easy.targets,
    vanishTime = this.#config.easy.vanishTime,
    generateTime = this.#config.easy.cellGenerateTime
  ) {
    this.#numberOfCols = cols;
    this.#numberOfRows = rows;
    this.#numberOfTargets = targets;
    this.#timeToVanish = vanishTime;
    this.#timeToGenerate = generateTime;

    this.#timer.resetTimer();
    this.#streak.startCount();
    this.#resetTargetCells()

    this.#generateCells();
    this.#renderBoard();
    this.#targetCellsGenerator();

    this.#cellsElement = this.getElements(this.UiSelectors.cell);
    this.#addCellsEventListener();
  }

  #getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #generateTargets = () => {
    let targetsToGenerate = this.#numberOfTargets;

    if (this.#numberOfActiveTargets >= 10) return;
    while (targetsToGenerate) {
      const rowIndex = this.#getRandomInteger(0, this.#numberOfRows - 1);
      const colIndex = this.#getRandomInteger(0, this.#numberOfCols - 1);

      const cell = this.#cells[rowIndex][colIndex];

      const hasCellTarget = cell.isTarget;

      this.#numberOfActiveTargets++;
      if (this.#numberOfActiveTargets >= 10) return;
      setTimeout(() => {
        this.#removeCellTarget(cell);
        this.#numberOfActiveTargets--;
      }, this.#timeToVanish);

      if (!hasCellTarget) {
        cell.addTarget();
        targetsToGenerate--;
      }
    }
  };

  #targetCellsGenerator = () => {
  this.#targetsGeneratorInterval = setInterval(this.#generateTargets, this.#timeToGenerate);
  };

  #resetTargetCells() {
    clearInterval(this.#targetsGeneratorInterval);
    this.#numberOfActiveTargets = 0;
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

  #removeCellTarget(cell) {
    if (cell.isTarget) cell.clickOnTarget();
  }

  #addCellsEventListener() {
    this.#cellsElement.forEach((cell) => {
      cell.addEventListener("click", this.#handleCellClick);
    });
  }

  #removeCellsEventListeners() {
    this.#cellsElement.forEach((cell) => {
      cell.removeEventListener("click", this.#handleCellClick);
    });
  }

  #addButtonsEventListeners() {
    this.#buttons.easy.addEventListener("click", () => {
      this.#handleNewGameClick(
        this.#config.easy.rows,
        this.#config.easy.cols,
        this.#config.easy.targets,
        this.#config.easy.vanishTime,
        this.#config.easy.cellGenerateTime
      );
    });
    this.#buttons.normal.addEventListener("click", () => {
      this.#handleNewGameClick(
        this.#config.normal.rows,
        this.#config.normal.cols,
        this.#config.normal.targets,
        this.#config.normal.vanishTime,
        this.#config.normal.cellGenerateTime
      );
    });
    this.#buttons.expert.addEventListener("click", () => {
      this.#handleNewGameClick(
        this.#config.expert.rows,
        this.#config.expert.cols,
        this.#config.expert.targets,
        this.#config.expert.vanishTime,
        this.#config.expert.cellGenerateTime
      );
    });
    this.#buttons.reset.addEventListener("click", () => {
      this.#handleNewGameClick();
    });
  }

  #handleNewGameClick(
    rows = this.#numberOfRows,
    cols = this.#numberOfCols,
    targets = this.#numberOfTargets,
    vanishTime = this.#timeToVanish,
    cellGenerateTime = this.#timeToGenerate
  ) {
    this.#removeCellsEventListeners();
    this.#newGame(rows, cols, targets, vanishTime, cellGenerateTime);
  }

  init() {
    this.#handleElements();
    this.#timer.timerInit();
    this.#newGame();
    this.#addButtonsEventListeners();
  }
}

window.onload = () => {
  const game = new Game();
  game.init();
};
