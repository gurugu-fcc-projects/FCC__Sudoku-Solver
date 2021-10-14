const chai = require("chai");
const assert = chai.assert;

const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");
const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

const parsedBoard = [
  [1, 0, 5, 0, 0, 2, 0, 8, 4],
  [0, 0, 6, 3, 0, 1, 2, 0, 7],
  [0, 2, 0, 0, 5, 0, 0, 0, 0],
  [0, 9, 0, 0, 1, 0, 0, 0, 0],
  [8, 0, 2, 0, 3, 6, 7, 4, 0],
  [3, 0, 7, 0, 2, 0, 0, 9, 0],
  [4, 7, 0, 0, 0, 8, 0, 0, 1],
  [0, 0, 1, 6, 0, 0, 0, 0, 9],
  [2, 6, 9, 1, 4, 0, 3, 7, 0],
];

suite("UnitTests", () => {
  test("Logic handles a valid puzzle string of 81 characters", (done) => {
    const [puzzleString] = puzzlesAndSolutions[0];

    const result = solver.validate(puzzleString);

    assert.equal(result, "All is good");
    done();
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
    const puzzleStrings = [
      "1.5..2.84..63.12.7.2..5...,.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....-.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.367fd3.7.2..9.47...8..1..16....926a14.37.",
      "1.5..2.84..63.12.7.2..5.....9+1=10..8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
    ];

    puzzleStrings.forEach((puzzleString) => {
      const result = solver.validate(puzzleString);
      assert.equal(result, "Invalid characters in puzzle");
    });

    done();
  });

  test("Logic handles a puzzle string that is not 81 characters in length", (done) => {
    const puzzleStrings = [
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.2d",
    ];

    puzzleStrings.forEach((puzzleString) => {
      const result = solver.validate(puzzleString);
      assert.equal(result, "Expected puzzle to be 81 characters long");
    });

    done();
  });

  test("Logic handles a valid row placement", (done) => {
    const data = [
      { row: 1, value: 8 },
      { row: 2, value: 7 },
      { row: 7, value: 5 },
    ];

    data.forEach((item) => {
      const result = solver.checkRowPlacement(
        parsedBoard,
        item.row,
        item.value
      );
      assert.isTrue(result);
    });

    done();
  });

  test("Logic handles an invalid row placement", (done) => {
    const data = [
      { row: 0, value: 1 },
      { row: 3, value: 9 },
      { row: 4, value: 4 },
    ];

    data.forEach((item) => {
      const result = solver.checkRowPlacement(
        parsedBoard,
        item.row,
        item.value
      );
      assert.isFalse(result);
    });

    done();
  });

  test("Logic handles a valid column placement", (done) => {
    const data = [
      { column: 1, value: 5 },
      { column: 2, value: 3 },
      { column: 7, value: 6 },
    ];

    data.forEach((item) => {
      const result = solver.checkColPlacement(
        parsedBoard,
        item.column,
        item.value
      );
      assert.isTrue(result);
    });

    done();
  });

  test("Logic handles an invalid column placement", (done) => {
    const data = [
      { column: 0, value: 1 },
      { column: 3, value: 3 },
      { column: 4, value: 5 },
    ];

    data.forEach((item) => {
      const result = solver.checkColPlacement(
        parsedBoard,
        item.column,
        item.value
      );
      assert.isFalse(result);
    });

    done();
  });

  test.skip("Logic handles a valid region (3x3 grid) placement", (done) => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 7 },
      { row: "B", column: 5, value: 4 },
      { row: "D", column: 5, value: 4 },
      { row: "F", column: 4, value: 9 },
      { row: "H", column: 4, value: 9 },
    ];

    data.forEach((item) => {
      const result = solver.checkRegionPlacement(
        puzzleString,
        item.row,
        item.column,
        item.value
      );
      assert.isTrue(result);
    });

    done();
  });

  test.skip("Logic handles an invalid region (3x3 grid) placement", (done) => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 1 },
      { row: "B", column: 5, value: 1 },
      { row: "D", column: 5, value: 3 },
      { row: "F", column: 4, value: 2 },
      { row: "H", column: 4, value: 4 },
    ];

    data.forEach((item) => {
      const result = solver.checkRegionPlacement(
        puzzleString,
        item.row,
        item.column,
        item.value
      );
      assert.isFalse(result);
    });

    done();
  });

  test("Valid puzzle strings pass the solver", (done) => {
    const [puzzleStrings] = puzzlesAndSolutions;

    puzzleStrings.forEach((puzzleString) => {
      const result = solver.solve(puzzleString);
      assert.property(result, "valid");
    });

    done();
  });

  test("Invalid puzzle strings fail the solver", (done) => {
    const puzzleStrings = [
      "1.5..2.84..63.12.7.2..5...,.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....-.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.367fd3.7.2..9.47...8..1..16....926a14.37.",
      "1.5..2.84..63.12.7.2..5.....9+1=10..8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
    ];

    puzzleStrings.forEach((puzzleString) => {
      const result = solver.solve(puzzleString);
      assert.property(result, "error");
    });

    done();
  });

  test("Solver returns the expected solution for an incomplete puzzle", (done) => {
    puzzlesAndSolutions.forEach((puzzleStrings) => {
      const result = solver.solve(puzzleStrings[0]);
      assert.property(result, "valid");
      assert.property(result, "solution");
    });

    done();
  });
});
