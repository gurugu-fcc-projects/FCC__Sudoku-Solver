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
      "1231231.....,.....",
      "1231231.....-.....",
      "1231231...dsd....d.ds.",
      "hello",
      "1+5=15",
    ];

    puzzleStrings.forEach(puzzleString => {
      const result = solver.validate(puzzleString);
      assert.equal(result, "Not good");
    });

    done();
  });
});
