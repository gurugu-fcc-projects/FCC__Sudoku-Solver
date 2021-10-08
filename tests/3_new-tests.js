const chai = require("chai");
const expect = chai.expect;

const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const board =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
let parsedBoard;

suite("Sudoku Solver", () => {
  suite("#parseBoard()", () => {
    test("should parse a string into a proper 2D array", () => {
      parsedBoard = solver.parseBoard(board);
      const expectedBoard = [
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

      expect(parsedBoard.length).to.equal(9);
      expect(parsedBoard[0].length).to.equal(9);
      expect(parsedBoard).to.eql(expectedBoard);
    });
  });
});
