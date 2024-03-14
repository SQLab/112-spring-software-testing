const { describe, it } = require("node:test");
const assert = require("assert");
const { Calculator } = require("./main");

describe("Test Function of Calculator", () => {
  it("exp's non-error case", () => {
    const calculator = new Calculator();
    const testcases = [
      { param: 2, expected: 7.38905609893065 },
      { param: 3, expected: 20.085536923187668 },
      { param: 5, expected: 148.4131591025766 },
    ];
    for (const tc of testcases) {
      assert.strictEqual(calculator.exp.apply(this, [tc.param]), tc.expected);
    }
  });

  it("exp's error case", () => {
    const calculator = new Calculator();
    const testcases = [
      { param: Infinity, expected: "unsupported operand type" },
      { param: "n", expected: "unsupported operand type" },
      { param: 123456789101112131415, expected: "overflow" },
    ];
    for (const tc of testcases) {
      assert.throws(
        () => {
          calculator.exp.apply(this, [tc.param]);
        },
        {
          name: "Error",
          message: tc.expected,
        }
      );
    }
  });

  it("log's non-error case", () => {
    const calculator = new Calculator();
    const testcases = [
      { param: 10, expected: 2.302585092994046 },
      { param: 100, expected: 4.605170185988092 },
      { param: 1000, expected: 6.907755278982137 },
    ];
    for (const tc of testcases) {
      assert.strictEqual(calculator.log.apply(this, [tc.param]), tc.expected);
    }
  });

  it("log's error case", () => {
    const calculator = new Calculator();
    const testcases = [
      { param: "n", expected: "unsupported operand type" },
      { param: 0, expected: "math domain error (1)" },
      { param: -1, expected: "math domain error (2)" },
    ];
    for (const tc of testcases) {
      assert.throws(
        () => {
          calculator.log.apply(this, [tc.param]);
        },
        {
          name: "Error",
          message: tc.expected,
        }
      );
    }
  });
});
