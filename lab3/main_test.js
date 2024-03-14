const { describe, it, mock } = require("node:test");
const assert = require("assert");
const { Calculator } = require("./main");

describe("Test Calculator's exp", () => {
    it("Test if x is finite", (testContext) => {
        const calculator = new Calculator();
        testContext.mock.fn(Number.isFinite).mock.mockImplementationOnce(() => false);
        assert.throws(() => calculator.exp(), new Error("unsupported operand type"));
    });

    it("Test if exp(x) is overflow", (testContext) => {
        const calculator = new Calculator();
        testContext.mock.fn(Math.exp).mock.mockImplementationOnce(() => Infinity);
        assert.throws(() => calculator.exp(Number.MAX_VALUE), new Error("overflow"));
    });

    it("Test otherwise", () => {
        const calculator = new Calculator();
        assert.strictEqual(calculator.exp(0), Math.exp(0));
        assert.strictEqual(calculator.exp(1), Math.exp(1));
        assert.strictEqual(calculator.exp(10), Math.exp(10));
    });
});

describe("Test Calculator's log", () => {
    it("Test if x is finite", (testContext) => {
        const calculator = new Calculator();
        testContext.mock.fn(Number.isFinite).mock.mockImplementationOnce(() => false);
        assert.throws(() => calculator.log(), new Error("unsupported operand type"));
    });

    it("Test if log(x) is math domain error (1)", (testContext) => {
        const calculator = new Calculator();
        testContext.mock.fn(Math.log).mock.mockImplementationOnce(() => -Infinity);
        assert.throws(() => calculator.log(0), new Error("math domain error (1)"));
    });

    it("Test if log(x) is math domain error (2)", (testContext) => {
        const calculator = new Calculator();
        testContext.mock.fn(Math.log).mock.mockImplementationOnce(() => NaN);
        assert.throws(() => calculator.log(-1), new Error("math domain error (2)"));
    });

    it("Test otherwise", () => {
        const calculator = new Calculator();
        assert.strictEqual(calculator.log(1), Math.log(1));
        assert.strictEqual(calculator.log(10), Math.log(10));
    });
});
