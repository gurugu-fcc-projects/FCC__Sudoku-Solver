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

  checkValuePlacement(parsedBoard, row, column, value) {
    return parsedBoard[row][column] === value;
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
    // Validation
    const errors = [
      "Invalid puzzle string",
      "Expected puzzle to be 81 characters long",
      "Invalid characters in puzzle",
    ];

    const validation = this.validate(puzzleString);

    if (errors.includes(validation)) {
      return { error: validation };
    }

    // Convert to array
    const puzzleArray = this.parseBoard(puzzleString);

    // Get empty positions
    const emptyPositions = this.saveEmptyPositions(puzzleArray);

    // Variables to track our position in the solver
    const limit = 9;
    let row;
    let column;
    let value;
    let found;
    let valid = true;

    for (let i = 0; i < emptyPositions.length; ) {
      // If puzzle is invalid, break from the loop
      if (i < 0) {
        valid = false;
        break;
      }

      row = emptyPositions[i][0];
      column = emptyPositions[i][1];

      // Try the next value
      value = puzzleArray[row][column] + 1;

      // Was a valid number found?
      found = false;

      // Keep trying new values until either the limit
      // was reached or a valid value was found
      while (!found && value <= limit) {
        // If a valid value is found, mark found true,
        // set the position to the value, and move to the
        // next position
        if (this.checkValue(puzzleArray, column, row, value)) {
          found = true;
          puzzleArray[row][column] = value;
          i++;
        }
        // Otherwise, try the next value
        else {
          value++;
        }
      }
      // If no valid value was found and the limit was
      // reached, move back to the previous position
      if (!found) {
        puzzleArray[row][column] = 0;
        i--;
      }
    }

    if (!valid) {
      return { error: "Puzzle cannot be solved" };
    }

    // return the solution
    return { valid: true, solution: puzzleArray.flat().join("") };
  }
}

const string =
  "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const solver = new SudokuSolver();

solver.solve(string);

module.exports = SudokuSolver;
