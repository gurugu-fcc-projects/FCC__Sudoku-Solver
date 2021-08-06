class SudokuSolver {
  constructor() {
    this.rows = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8 };
    this.grid = [
      { id: "ABC123", origin: ["A", 1] },
      { id: "ABC456", origin: ["A", 4] },
      { id: "ABC789", origin: ["A", 7] },
      { id: "DEF123", origin: ["D", 1] },
      { id: "DEF456", origin: ["D", 4] },
      { id: "DEF789", origin: ["D", 7] },
      { id: "GHI123", origin: ["G", 1] },
      { id: "GHI456", origin: ["G", 4] },
      { id: "GHI789", origin: ["G", 7] },
    ];
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

  checkColPlacement(puzzleString, row, column, value) {
    const fragment = [];
    const startingPoint = column - 1;

    for (let i = startingPoint; i < puzzleString.length; i += 9) {
      fragment.push(puzzleString[i]);
    }

    return !fragment.join("").includes(value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const { origin } = this.grid.find(
      item => item.id.includes(row) && item.id.includes(column)
    );
    const area = [];
    let startingPoint = this.rows[origin[0]] * 9 + origin[1] - 1;

    while (area.length < 3) {
      area.push(puzzleString.slice(startingPoint, startingPoint + 3));
      startingPoint = startingPoint + 9;
    }

    return !area.join("").includes(value);
  }

  solve(puzzleString) {
    const errors = [
      "Invalid puzzle string",
      "Expected puzzle to be 81 characters long",
      "Invalid characters in puzzle",
    ];
    const validation = this.validate(puzzleString);

    if (errors.includes(validation)) {
      return { error: validation };
    }

    return { valid: true };
  }
}

module.exports = SudokuSolver;
