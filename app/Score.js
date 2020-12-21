export default class Score {
  score = 0;
  strick = 0;
  misses = 0;

  scoreIncrease() {
    this.score++;
    this.strick++;
  }

  resetScore() {
    this.score = 0;
    this.strick = 0;
    this.misses = 0;
    this.printScore();
  }

  printScore() {
    document.querySelectorAll(
      ".score"
    )[0].innerHTML = `Twoje trafienia to: ${this.score}`;
    document.querySelectorAll(
      ".score"
    )[1].innerHTML = `Twoje trafienia z rzędu to: ${this.strick}`;
    document.querySelectorAll(
      ".score"
    )[2].innerHTML = `Twoje pudła to: ${this.misses}`;
  }
}
