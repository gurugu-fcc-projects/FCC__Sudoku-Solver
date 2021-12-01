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
});
