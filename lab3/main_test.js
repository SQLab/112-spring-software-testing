const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', function () {
    it('exp', function () {
        const calculator = new Calculator();
        const testCases = [
            { param: 0, expected: Math.exp(0) },
            { param: 1, expected: Math.exp(1) },
            { param: 2, expected: Math.exp(2) },
            { param: Number.MAX_VALUE, expected: Error , errorMess: 'overflow'},
            { param: NaN, expected: Error , errorMess: 'unsupported operand type'},
        ];

        for (const { param, expected, errorMess } of testCases) {
            if (expected === Error) {
                assert.throws(() => calculator.exp(param), Error(errorMess));
            } else {
                assert.strictEqual(calculator.exp(param), expected);
            }
        }
    });
    it('log', function () {
        const calculator = new Calculator();
        const testCases = [
            { param: Math.exp(0), expected: 0 },
            { param: Math.exp(1), expected: 1 },
            { param: Math.exp(2), expected: 2 },
            { param: NaN, expected: Error , errorMess: 'unsupported operand type'},
            { param: 0, expected: Error , errorMess: 'math domain error (1)'},
            { param: -1, expected: Error , errorMess: 'math domain error (2)'},
        ];

        for (const { param, expected, errorMess } of testCases) {
            if (expected === Error) {
                assert.throws(() => calculator.log(param), Error(errorMess));
            } else {
                assert.strictEqual(calculator.log(param), expected);
            }
        }
    });
});
