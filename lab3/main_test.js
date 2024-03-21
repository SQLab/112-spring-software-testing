const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Parameterize', () => {
    const calculator = new Calculator();

    //Parameterize for exp()
    const exp_testcases = [
        { param: [0], expected: 1 },// Expected output: Math.exp(0)
        { param: [1], expected: 2.718281828459045 },// Expected output: Math.exp(1)
        { param: [-1], expected: 0.36787944117144233 },// Expected output: Math.exp(-1)
        { param: [2], expected: 7.38905609893065 }// Expected output: Math.exp(2)

    ];

    for (const tc of exp_testcases) {
        assert.strictEqual(calculator.exp.apply(this, tc.param), tc.expected);
    }

    //Parameterize for log()
    const log_testcases = [
        { param: [10], expected: 2.302585092994046 },
        { param: [100], expected: 4.605170185988092 },
        { param: [1], expected: 0 }
    ];
    for (const tc of log_testcases) {
        assert.strictEqual(calculator.log.apply(this, tc.param), tc.expected);
    }
});


describe('Errors', () => {
    const calculator = new Calculator();

    //Errors for exp()
    const exp_testcases = [
        { param: [Math.pow(10, 1000)], expected: { name: 'Error', message: 'unsupported operand type' } },
        { param: [Math.exp(800)], expected: { name: 'Error', message: 'unsupported operand type' } },
        { param: [5e+8], expected: { name: 'Error', message: 'overflow' } }
    ];
    for (const tc of exp_testcases) {
        assert.throws(() => { calculator.exp.apply(this, tc.param); }, tc.expected);
    }

    //Errors for log()
    const log_testcases = [
        { param: [-0], expected: { name: 'Error', message: 'math domain error (1)' } },
        { param: [0], expected: { name: 'Error', message: 'math domain error (1)' } },
        { param: [-1], expected: { name: 'Error', message: 'math domain error (2)' } },
        { param: [Infinity], expected: { name: 'Error', message: 'unsupported operand type' } }
    ];

    for (const tc of log_testcases) {
        assert.throws(() => { calculator.log.apply(this, tc.param); }, tc.expected);
    }

});