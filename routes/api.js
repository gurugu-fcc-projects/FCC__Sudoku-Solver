"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    // puzzleString, coords, value
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
