class SudokuSolver {
  constructor() {
    this.rows = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8 };
  }

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return "Expected puzzle to be 81 characters long";
    }

    const regExp = new RegExp(/^(\d?|\.?)+$/);
    const testResults = regExp.test(puzzleString);

    if (testResults) {
      return "All is good";
    } else {
      return "Invalid characters in puzzle";
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const startingPoint = this.rows[row] * 9;
    const fragment = puzzleString.slice(startingPoint, startingPoint + 9);
    return !fragment.includes(value);
  }

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
