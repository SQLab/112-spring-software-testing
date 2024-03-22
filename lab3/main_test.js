const test = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

test("Test Calculator exp", () => {
    const happy_path_testcases = [
        { input: 0, expected: 1 },
        { input: 1, expected: Math.exp(1) },
        { input: -1, expected: 1/Math.exp(1) },
        { input: -1e308, expected: 0 },
    ];

    const calculator = new Calculator();
    for (const testcase of happy_path_testcases) {
        assert.strictEqual(calculator.exp(testcase.input), testcase.expected);
    }

    const exception_testcases = [
        { input: Infinity, expected: 'unsupported operand type' },
        { input: NaN, expected: 'unsupported operand type' },
        { input: '10', expected: 'unsupported operand type' },
        { input: 1e308, expected: 'overflow' },
    ];
    for (const testcase of exception_testcases) {
        assert.throws(() => {calculator.exp(testcase.input)}, { message: testcase.expected });
    }
});

test("Test Calculator log", () => {
    const happy_path_testcases = [
        { input: 1, expected: 0 },
        { input: Math.exp(1), expected: 1 },
        { input: 1/Math.exp(1), expected: -1 }
    ];

    const calculator = new Calculator();
    for (const testcase of happy_path_testcases) {
        assert.strictEqual(calculator.log(testcase.input), testcase.expected);
    }

    const exception_testcases = [
        { input: Infinity, expected: 'unsupported operand type' },
        { input: NaN, expected: 'unsupported operand type' },
        { input: '10', expected: 'unsupported operand type' },
        { input: 0, expected: 'math domain error (1)' },
        { input: -1e308, expected: 'math domain error (2)' },
    ];
    for (const testcase of exception_testcases) {
        assert.throws(() => {calculator.log(testcase.input)}, { message: testcase.expected });
    }
});