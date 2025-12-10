// test/auth.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);          // now chaiHttp IS a function
const expect = chai.expect;

describe("API Smoke Test", () => {
  it("app should load without crashing", () => {
    expect(app).to.exist;
  });
});
