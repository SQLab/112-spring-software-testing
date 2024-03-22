const { describe, it } = require("node:test");
const assert = require("assert");
const { Calculator } = require("./main");

// TODO: write your tests here

describe("Calculator", () => {
  describe("exp", () => {
    it("Unsupported operand type", () => {
      const calculator = new Calculator();
      const cases = ["Number", { Number: 1 }, ["Number"]];

      for (const c of cases) {
        assert.throws(
          () => calculator.exp(c),
          Error,
          "unsupported operand type"
        );
      }
    });

    it("Overflow", () => {
      const calculator = new Calculator();
      const cases = [1.79e308, 1.87e308, 1.69e308];
      for (const c of cases) {
        assert.throws(() => calculator.exp(c), Error, "overflow");
      }
    });
    it("Normal cases", () => {
      const calculator = new Calculator();
      const cases = [
        { param: 87, result: 6.076030225056873e37 },
        { param: 69, result: 9.253781725587789e29 },
        { param: 42, result: 1739274941520501000 },
      ];
      for (const c of cases) {
        assert.strictEqual(calculator.exp(c.param), c.result);
      }
    });
  });
  describe("log", () => {
    it("Unsupported operand type", () => {
      const calculator = new Calculator();
      const cases = ["Number", { Number: 1 }, ["Number"]];

      for (const c of cases) {
        assert.throws(
          () => calculator.log(c),
          Error,
          "unsupported operand type"
        );
      }
    });

    it("-Infinity result inputs", () => {
      const calculator = new Calculator();
      const cases = [0];
      for (const c of cases) {
        assert.throws(() => calculator.log(c), Error, "math domain error (1)");
      }
    });

    it("NaN result inputs", () => {
      const calculator = new Calculator();
      const cases = [-1, ["69"], "69"];
      for (const c of cases) {
        assert.throws(() => calculator.log(c), Error, "math domain error (2)");
      }
    });

    it("Normal cases", () => {
      const calculator = new Calculator();
      const cases = [
        { param: 87, result: 4.465908118654584 },
        { param: 6969, result: 8.84922702143852 },
        { param: 4242, result: 8.352790135124629 },
      ];
      for (const c of cases) {
        assert.strictEqual(calculator.log(c.param), c.result);
      }
    });
  });
});
