"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      return res.json({ error: "Required field(s) missing" });
    }

    if (coordinate.length > 2) {
      return res.json({ error: "Invalid coordinate" });
    }

    const parsedNumber = Number(value);

    if (typeof parsedNumber !== "number" || parsedNumber > 9) {
      return res.json({ error: "Invalid value" });
    }

    const validation = solver.validate(puzzle);

    if (
      validation === "Invalid characters in puzzle" ||
      validation === "Expected puzzle to be 81 characters long"
    ) {
      return res.json({ error: validation });
    }

    const parsedBoard = solver.parseBoard(puzzle);
    const [row, column] = coordinate.split("");
    const numberedRow = "abcdefghi".indexOf(row.toLowerCase());

    const isValueAlreadyPlaced = solver.checkValuePlacement(
      parsedBoard,
      numberedRow,
      column - 1,
      parsedNumber
    );

    const isRowValid = solver.checkRowPlacement(
      parsedBoard,
      numberedRow,
      parsedNumber
    );
    const isColumnValid = solver.checkColPlacement(
      parsedBoard,
      column - 1,
      parsedNumber
    );
    const isRegionValid = solver.checkRegionPlacement(
      parsedBoard,
      numberedRow,
      column - 1,
      parsedNumber
    );

    const conflict = [
      isRowValid ? null : "row",
      isColumnValid ? null : "column",
      isRegionValid ? null : "region",
    ].filter((conflict) => conflict);

    if (
      (isRowValid && isColumnValid && isRegionValid) ||
      isValueAlreadyPlaced
    ) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false, conflict });
    }
  });

  app.route("/api/solve").post((req, res) => {
    if (req.body?.puzzle) {
      const result = solver.solve(req.body.puzzle);

      res.json(result);
    } else {
      res.json({ error: "Required field missing" });
    }
  });
};
