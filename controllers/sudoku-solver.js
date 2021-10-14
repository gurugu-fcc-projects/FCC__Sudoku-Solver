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

  parseBoard(boardString) {
    let newBoard = boardString.replace(/\./g, "0");
    let boardArray = [];

    for (let i = 0; i < newBoard.length; i += 9) {
      boardArray.push(
        newBoard
          .slice(i, i + 9)
          .split("")
          .map(Number)
      );
    }

    return boardArray;
  }

  saveEmptyPositions(parsedBoard) {
    const emptyPositions = [];

    for (let i = 0; i < parsedBoard.length; i++) {
      for (let j = 0; j < parsedBoard[i].length; j++) {
        if (parsedBoard[i][j] === 0) {
          emptyPositions.push([i, j]);
        }
      }
    }

    return emptyPositions;
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

  checkRowPlacement(parsedBoard, row, value) {
    return !parsedBoard[row].includes(value);
  }

  checkColPlacement(parsedBoard, column, value) {
    return parsedBoard.every((row) => row[column] !== value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const { origin } = this.grid.find(
      (item) => item.id.includes(row) && item.id.includes(column)
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

    const puzzleArray = puzzleString.split("");
    // const puzzleArray2 = puzzleString.split("").reduce(
    //   (acc, item) => {
    //     if (acc[acc.length - 1].length < 9) {
    //       acc[acc.length - 1].push(item);
    //       return acc;
    //     } else {
    //       return [...acc, [item]];
    //     }
    //   },
    //   [[]]
    // );
    // const puzzleArray3 = [];
    // for (let i = 0; i < puzzleString.length; i += 9) {
    //   puzzleArray3.push(puzzleString.slice(i, i + 9).split(""));
    // }

    // for (let i = 0; i < puzzleArray.length; i++) {
    //   const item = puzzleArray[i];

    //   if (item === ".") {
    //     const column = (i + 1) % 9 || 9;
    //     const row = (i - (i % 9)) / 9;
    //     const rowToLetter = Object.keys(this.rows).find(
    //       (key) => this.rows[key] === row
    //     );

    //     for (let j = 1; j <= 9; j++) {
    //       if (
    //         this.checkRowPlacement(
    //           puzzleArray.join(""),
    //           rowToLetter,
    //           column,
    //           j
    //         ) &&
    //         this.checkColPlacement(
    //           puzzleArray.join(""),
    //           rowToLetter,
    //           column,
    //           j
    //         ) &&
    //         this.checkRegionPlacement(
    //           puzzleArray.join(""),
    //           rowToLetter,
    //           column,
    //           j
    //         )
    //       ) {
    //         puzzleArray[i] = j;
    //         break;
    //       }
    //     }
    //   }
    // }

    return { valid: true, solution: puzzleString };
  }
}

module.exports = SudokuSolver;
