const { test } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

test ("Test Calculator exp", () => {
    const calculator = new Calculator();
    const testcases = [
        { param: 1, expected: Math.exp(1) },
        { param: 2, expected: Math.exp(2) },
        { param: 3, expected: Math.exp(3) },
    ];
    for (const tc of testcases) {
        assert.strictEqual(calculator.exp(tc.param), tc.expected);
    }

    const error_cases = [
        { param: 'aa', expected: 'unsupported operand type' },
        { param: 1000, expected: 'overflow' },
    ];
    for (const tc of error_cases) {
        assert.throws(() => {calculator.exp(tc.param)}, {message: tc.expected});
    }
});

test ("Test Calculator log", () => {
    const calculator = new Calculator();
    const testcases = [
        { param: 1, expected: Math.log(1) },
        { param: 2, expected: Math.log(2) },
        { param: 3, expected: Math.log(3) },
    ];
    for (const tc of testcases) {
        assert.strictEqual(calculator.log(tc.param), tc.expected);
    }

    const error_cases = [
        { param: 'aa', expected: 'unsupported operand type' },
        { param: 0, expected: 'math domain error (1)' },
        { param: -1, expected: 'math domain error (2)' },
    ];
    for (const tc of error_cases) {
        assert.throws(() => {calculator.log(tc.param)}, {message: tc.expected});
    }
});
