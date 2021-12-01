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
          // console.log(res);
          assert.isObject(res);
          assert.property(res.body, "valid");
          assert.property(res.body, "solution");
          assert.equal(res.body.valid, true);
          assert.equal(res.body.solution, item[1]);
        })
    );

    done();
  });
});
