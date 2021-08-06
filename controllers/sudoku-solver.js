class SudokuSolver {
  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return "Length is not good";
    }

    const regExp = new RegExp(/^(\d?|\.?)+$/);
    const testResults = regExp.test(puzzleString);

    if (testResults) {
      return "All is good";
    } else {
      return "Not good";
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {}

  checkColPlacement(puzzleString, row, column, value) {}

  checkRegionPlacement(puzzleString, row, column, value) {}

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
