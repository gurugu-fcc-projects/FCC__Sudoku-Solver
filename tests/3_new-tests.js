const chai = require("chai");
const expect = chai.expect;

const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const board =
  "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
let parsedBoard;
let emptyPositions;

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

  suite("#saveEmptyPositions()", () => {
    test("should collect positions of all empty cells", () => {
      emptyPositions = solver.saveEmptyPositions(parsedBoard);

      const expectedEmptyPositions = [
        [0, 1],
        [0, 3],
        [0, 4],
        [0, 6],
        [1, 0],
        [1, 1],
        [1, 4],
        [1, 7],
        [2, 0],
        [2, 2],
        [2, 3],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 8],
        [3, 0],
        [3, 2],
        [3, 3],
        [3, 5],
        [3, 6],
        [3, 7],
        [3, 8],
        [4, 1],
        [4, 3],
        [4, 8],
        [5, 1],
        [5, 3],
        [5, 5],
        [5, 6],
        [5, 8],
        [6, 2],
        [6, 3],
        [6, 4],
        [6, 6],
        [6, 7],
        [7, 0],
        [7, 1],
        [7, 4],
        [7, 5],
        [7, 6],
        [7, 7],
        [8, 5],
        [8, 8],
      ];

      expect(emptyPositions.length).to.equal(43);
      expect(emptyPositions).to.eql(expectedEmptyPositions);
    });
  });

  suite("#checkRowPlacement()", () => {
    test("should check that each value in the row does not equal the input", () => {
      expect(solver.checkRowPlacement(parsedBoard, 0, 1)).to.not.be.ok;
      expect(solver.checkRowPlacement(parsedBoard, 1, 8)).to.be.ok;
      expect(solver.checkRowPlacement(parsedBoard, 2, 7)).to.be.ok;
      expect(solver.checkRowPlacement(parsedBoard, 3, 9)).to.not.be.ok;
      expect(solver.checkRowPlacement(parsedBoard, 4, 4)).to.not.be.ok;
      expect(solver.checkRowPlacement(parsedBoard, 7, 5)).to.be.ok;
    });
  });

  suite("#checkColPlacement()", () => {
    test("should check that each value in the column does not equal the input", () => {
      expect(solver.checkColPlacement(parsedBoard, 0, 1)).to.not.be.ok;
      expect(solver.checkColPlacement(parsedBoard, 1, 5)).to.be.ok;
      expect(solver.checkColPlacement(parsedBoard, 2, 3)).to.be.ok;
      expect(solver.checkColPlacement(parsedBoard, 3, 3)).to.not.be.ok;
      expect(solver.checkColPlacement(parsedBoard, 4, 5)).to.not.be.ok;
      expect(solver.checkColPlacement(parsedBoard, 7, 6)).to.be.ok;
    });
  });
});
