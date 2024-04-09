const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
it("Test Calculator log", () => {   
    const calculator = new Calculator();
    const testcase = [
        {num: 5, log_expected: Math.log(5)},
        {num: 37, log_expected: Math.log(37)},
        {num: 52, log_expected: Math.log(52)}
    ];
    for (const test of testcase) {
        assert.strictEqual(calculator.log(test.num), test.log_expected);
    }

    const test_error = [
        {num: 'test', log_expected: 'unsupported operand type'},
        {num: 0, log_expected: 'math domain error (1)'},
        {num: -1, log_expected: 'math domain error (2)'}
    ]

    for (const test of test_error) {
        assert.throws(() => calculator.log(test.num), new Error(test.log_expected));
    }
});

it("Test Calculator exp", () => {   
    const calculator = new Calculator();
    const testcase = [
        {num: 5, exp_expected: Math.exp(5)},
        {num: 37, exp_expected: Math.exp(37)},
        {num: 52, exp_expected: Math.exp(52)}
    ];
    for (const test of testcase) {
        assert.strictEqual(calculator.exp(test.num), test.exp_expected);
    }

    const test_error = [
        {num: 'test', exp_expected: 'unsupported operand type'},
        {num: 10000, exp_expected: 'overflow'}
    ]

    for (const test of test_error) {
        assert.throws(() => calculator.exp(test.num), new Error(test.exp_expected));
    }
});
