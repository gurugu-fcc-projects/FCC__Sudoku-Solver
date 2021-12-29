const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
    puzzlesAndSolutions.forEach((item) =>
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: item[0] })
        .end((err, res) => {
          assert.isObject(res);
          assert.property(res.body, "valid");
          assert.property(res.body, "solution");
          assert.equal(res.body.valid, true);
          assert.equal(res.body.solution, item[1]);
        })
    );

    done();
  });

  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
    chai
      .request(server)
      .post("/api/solve")
      .send({})
      .end((err, res) => {
        assert.isObject(res);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field missing");
        done();
      });
  });

  test("Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
    const invalidPuzzleStrings = [
      "1.5..2.84..63.12.7.2..5...,.9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....-.2.3674.3.7.2..9.47...8..1..16....926914.37.",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.367fd3.7.2..9.47...8..1..16....926a14.37.",
      "1.5..2.84..63.12.7.2..5.....9+1=10..8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
    ];

    for (const puzzleString of invalidPuzzleStrings) {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: puzzleString })
        .end((err, res) => {
          assert.isObject(res);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid characters in puzzle");
        });
    }

    done();
  });

  test("Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
    const invalidPuzzleStrings = [
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37",
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.2d",
    ];

    for (const puzzleString of invalidPuzzleStrings) {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: puzzleString })
        .end((err, res) => {
          assert.isObject(res);
          assert.property(res.body, "error");
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
        });
    }

    done();
  });

  test("Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
    const unsolvablePuzzle =
      "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/solve")
      .send({ puzzle: unsolvablePuzzle })
      .end((err, res) => {
        assert.isObject(res);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Puzzle cannot be solved");
      });

    done();
  });

  test("Check a puzzle placement with all fields: POST request to /api/check", (done) => {
    const puzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "7" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "valid");
        assert.isTrue(res.body.valid);
      });

    done();
  });

  test("Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
    const puzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "3" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "valid");
        assert.equal(res.body.valid, false);
        assert.lengthOf(res.body.conflict, 1);
        assert.equal(res.body.conflict[0], "region");
      });

    done();
  });

  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
    const puzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "1" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "valid");
        assert.equal(res.body.valid, false);
        assert.isArray(res.body.conflict);
        assert.lengthOf(res.body.conflict, 2);
      });

    done();
  });

  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
    const puzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "5" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "valid");
        assert.equal(res.body.valid, false);
        assert.isArray(res.body.conflict);
        assert.lengthOf(res.body.conflict, 3);
      });

    done();
  });

  test("Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
    const puzzle =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, value: "7" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
      });

    done();
  });

  test("Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
    const puzzle =
      "1.5..2.84..63.12.7.2..5.....9+1=10..8.2.3674.3.7.2..9.47...8..1..16....926914.37.";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "7" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid characters in puzzle");
      });

    done();
  });

  test("Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
    const puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "7" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "error");
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );
      });

    done();
  });

  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
    const puzzle =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a111", value: "7" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid coordinate");
      });

    done();
  });

  test("Check a puzzle placement with correct value already placed: POST request to /api/check", (done) => {
    const puzzle =
      "7.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    chai
      .request(server)
      .post("/api/check")
      .send({ puzzle, coordinate: "a1", value: "7" })
      .end((err, res) => {
        assert.isObject(res.body);
        assert.property(res.body, "valid");
        assert.isTrue(res.body.valid);
      });

    done();
  });

  test("Check a puzzle placement with an invalid placement value: POST request to /api/check", (done) => {
    const puzzle =
      "7.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

    const invalidValues = [-4, 10, 1212, "12312", "X", "y"];

    for (const invalidValue of invalidValues) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate: "a1", value: invalidValue })
        .end((err, res) => {
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid value");
        });
    }

    done();
  });
});
