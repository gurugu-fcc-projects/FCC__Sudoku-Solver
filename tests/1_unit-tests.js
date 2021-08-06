const chai = require("chai");
const assert = chai.assert;
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

const Solver = require("../controllers/sudoku-solver.js");
let solver = new Solver();

suite("UnitTests", () => {
  test("Logic handles a valid puzzle string of 81 characters", done => {
    const [puzzleString] = puzzlesAndSolutions[0];

    const result = solver.validate(puzzleString);

    assert.equal(result, "All is good");
    done();
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", done => {
    const puzzleStrings = [
      "1.5..2.84..63.12.7.2..5...,.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....-.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.367fd3.7.2..9.47...8..1..16....926a14.37.",
      "1.5..2.84..63.12.7.2..5.....9+1=10..8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
    ];

    puzzleStrings.forEach(puzzleString => {
      const result = solver.validate(puzzleString);
      assert.equal(result, "Invalid characters in puzzle");
    });

    done();
  });

  test("Logic handles a puzzle string that is not 81 characters in length", done => {
    const puzzleStrings = [
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.2d",
    ];

    puzzleStrings.forEach(puzzleString => {
      const result = solver.validate(puzzleString);
      assert.equal(result, "Expected puzzle to be 81 characters long");
    });

    done();
  });

  test("Logic handles a valid row placement", done => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 3 },
      { row: "A", column: 4, value: 6 },
      { row: "A", column: 4, value: 7 },
      { row: "C", column: 4, value: 6 },
    ];

    data.forEach(item => {
      const result = solver.checkRowPlacement(
        puzzleString,
        item.row,
        item.column,
        item.value
      );
      assert.isTrue(result);
    });

    done();
  });

  test("Logic handles an invalid row placement", done => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 1 },
      { row: "A", column: 4, value: 8 },
      { row: "A", column: 4, value: 1 },
      { row: "C", column: 4, value: 2 },
    ];

    data.forEach(item => {
      const result = solver.checkRowPlacement(
        puzzleString,
        item.row,
        item.column,
        item.value
      );
      assert.isFalse(result);
    });

    done();
  });

  test("Logic handles a valid column placement", done => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 3 },
      { row: "B", column: 5, value: 6 },
      { row: "D", column: 5, value: 6 },
      { row: "C", column: 4, value: 7 },
      { row: "H", column: 4, value: 7 },
    ];

    data.forEach(item => {
      const result = solver.checkColPlacement(
        puzzleString,
        item.row,
        item.column,
        item.value
      );
      assert.isTrue(result);
    });

    done();
  });

  test("Logic handles an invalid column placement", done => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 6 },
      { row: "B", column: 5, value: 1 },
      { row: "D", column: 5, value: 2 },
      { row: "C", column: 4, value: 6 },
      { row: "H", column: 4, value: 3 },
    ];

    data.forEach(item => {
      const result = solver.checkColPlacement(
        puzzleString,
        item.row,
        item.column,
        item.value
      );
      assert.isFalse(result);
    });

    done();
  });

  test("Logic handles a valid region (3x3 grid) placement", done => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 7 },
      { row: "B", column: 5, value: 4 },
      { row: "D", column: 5, value: 4 },
      { row: "F", column: 4, value: 9 },
      { row: "H", column: 4, value: 9 },
    ];

    data.forEach(item => {
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

  test("Logic handles an invalid region (3x3 grid) placement", done => {
    const [puzzleString] = puzzlesAndSolutions[0];
    const data = [
      { row: "A", column: 2, value: 1 },
      { row: "B", column: 5, value: 1 },
      { row: "D", column: 5, value: 3 },
      { row: "F", column: 4, value: 2 },
      { row: "H", column: 4, value: 4 },
    ];

    data.forEach(item => {
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
});
