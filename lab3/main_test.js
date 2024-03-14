// const {describe, it} = require('node:test');
const test = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

test("Test Calculator.exp()", () => {
    const cal = new Calculator();

    const testcases = [
        { input: 0, expected: 1 },
        { input: 1, expected: Math.exp(1) },
        { input: -1, expected: 1/Math.exp(1) },
        { input: -1e100, expected: 0 },
    ];

    for (const t of testcases) {
        assert.strictEqual(cal.exp(t.input), t.expected);
    }

    const errorTestCases = [
        {input: Infinity, expected:"unsupported operand type"},
        {input: NaN, expected:"unsupported operand type"},
        {input: "1", expected:"unsupported operand type"},
        {input: 1e100, expected:"overflow"},
    ]

    for (const et of errorTestCases) {
        assert.throws(() => {cal.exp(et.input)}, Error(et.expected));
    }
})

test("Test Calculator.log()", () => {
    const cal = new Calculator();

    const testcases = [
        { input: 1, expected: 0 },
        { input: Math.exp(1), expected: 1 },
        { input: 1/Math.exp(1), expected: -1 },
        { input: 1e-100, expected: Math.log(1e-100) },
    ];

    for (const t of testcases) {
        assert.strictEqual(cal.log(t.input), t.expected);
    }

    const errorTestCases = [
        {input: 0, expected:"math domain error (1)"},
        {input: -1, expected:'math domain error (2)'}, //NaN
        {input: -Infinity, expected:"unsupported operand type"},
        {input: NaN, expected:"unsupported operand type"},
    ]

    for (const et of errorTestCases) {
        assert.throws(() => {cal.log(et.input)}, Error(et.expected));
    }
});