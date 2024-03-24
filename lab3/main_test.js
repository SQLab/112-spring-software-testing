const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
const test = require('node:test');

test('Calculator exp', () => {
    const testcase1 = [
        {param: 0, expected: 1},
        {param: 1, expected: 2.718281828459045},
        {param: 2, expected: 7.38905609893065},
    ]

    const testcase2 = [
        {param: Infinity, expected: "unsupported operand type"},
        {param: "not number", expected: "unsupported operand type"},
        {param: 100000000000000, expected: "overflow"}
    ]

    let calculator = new Calculator();
    for (const tc of testcase1) {
        assert.strictEqual(calculator.exp(tc.param), tc.expected);
    }
    for (const tc of testcase2) {
        assert.throws(() => calculator.exp(tc.param), {message: tc.expected});
    }
});

test('Calculator log', () => {
    const testcase1 = [
        {param: 1, expected: 0},
        {param: 2.718281828459045, expected: 1},
        {param: 20.0855369232, expected: 3.0000000000006137}
    ]

    const testcase2 = [
        {param: 0, expected: "math domain error (1)"},
        {param: -1, expected: "math domain error (2)"},
        {param: "not number", expected: "unsupported operand type"},
        {param: Infinity, expected: "unsupported operand type"}
    ]

    let calculator = new Calculator();
    for (const tc of testcase1) {
        assert.strictEqual(calculator.log(tc.param), tc.expected);
    }
    for (const tc of testcase2) {
        assert.throws(() => calculator.log(tc.param), {message: tc.expected});
    }
});