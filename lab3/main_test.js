const test = require("node:test");
const assert = require("assert");
const { Calculator } = require("./main");

// TODO: write your tests here

test("Test Calculator exp data", () => {
    const calculator = new Calculator();

    const testcases = [
        {
            input: 1,
            output: 2.718281828459045,
        },
        {
            input: -1,
            output: 0.36787944117144233,
        },
        {
            input: 10,
            output: 22026.465794806718,
        },
    ];

    for (const { input, output } of testcases) {
        assert.strictEqual(calculator.exp(input), output);
    }
});

test("Test Calculator exp error", () => {
    const calculator = new Calculator();

    const testcases = [
        {
            input: Infinity,
            msg: "unsupported operand type",
        },
        {
            input: Number.MAX_SAFE_INTEGER,
            msg: "overflow",
        },
    ];

    for (const { input, msg } of testcases) {
        assert.throws(() => calculator.exp(input), Error(msg));
    }
});

test("Test Calculator log data", () => {
    const calculator = new Calculator();

    const testcases = [
        {
            input: Math.exp(1),
            output: 1,
        },
        {
            input: 100,
            output: 4.605170185988092,
        },
        {
            input: 10000,
            output: 9.210340371976184,
        },
    ];

    for (const { input, output } of testcases) {
        assert.strictEqual(calculator.log(input), output);
    }
});

test("Test Calculator log error", () => {
    const calculator = new Calculator();

    const testcases = [
        {
            input: Infinity,
            msg: "unsupported operand type",
        },
        {
            input: 0,
            msg: "math domain error (1)",
        },
        {
            input: -1,
            msg: "math domain error (2)",
        },
    ];

    for (const { input, msg } of testcases) {
        assert.throws(() => calculator.log(input), Error(msg));
    }
});
