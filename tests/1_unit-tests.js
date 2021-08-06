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
      assert.equal(result, "Not good");
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
      assert.equal(result, "Length is not good");
    });

    done();
  });
});
