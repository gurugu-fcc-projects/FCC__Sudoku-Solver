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
});
