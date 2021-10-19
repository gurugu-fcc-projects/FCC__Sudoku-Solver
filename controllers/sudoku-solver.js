class SudokuSolver {
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

  checkRegionPlacement(parsedBoard, row, column, value) {
    let columnCorner = 0;
    let rowCorner = 0;
    let squareSize = 3;

    // find column corner
    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    // find row corner
    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    // check placement
    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        if (parsedBoard[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  }

  checkValue(parsedBoard, column, row, value) {
    return (
      this.checkRowPlacement(parsedBoard, row, value) &&
      this.checkColPlacement(parsedBoard, column, value) &&
      this.checkRegionPlacement(parsedBoard, row, column, value)
    );
  }

  solve(puzzleString) {
    // 1. validation
    const errors = [
      "Invalid puzzle string",
      "Expected puzzle to be 81 characters long",
      "Invalid characters in puzzle",
    ];

    const validation = this.validate(puzzleString);

    if (errors.includes(validation)) {
      return { error: validation };
    }

    // 2. convert to array
    const puzzleArray = this.parseBoard(puzzleString);

    // 3. get empty positions
    const emptyPositions = this.saveEmptyPositions(puzzleArray);

    return { valid: true, solution: puzzleString };
  }
}

module.exports = SudokuSolver;
