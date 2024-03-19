const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe('Calculator', () => {
    describe('exp', () => {

        const testcase = [
            [0, 1],
            [1, 2.718281828459045],
            [-1, 0.36787944117144233],
            [Infinity, Error],
            [1000, Error]
        ];

        testcase.forEach(([input, expected]) => {
            it(`should return ${expected} for ${input}`, () => {
                const calculator = new Calculator();
                if (expected === Error) {
                    assert.throws(() => calculator.exp(input), Error);
                } else {
                    assert.strictEqual(calculator.exp(input), expected);
                }
            });
        }
        );

    });

    describe('log', () => {

        const testcase = [
            [1, 0],
            [1000, 6.907755278982137],
            [Math.E, 1],
            [0, Error],
            [-1, Error],
            [Infinity, Error]
        ];

        testcase.forEach(([input, expected]) => {
            it(`should return ${expected} for ${input}`, () => {
                const calculator = new Calculator();
                if (expected === Error) {
                    assert.throws(() => calculator.log(input), Error);
                } else {
                    assert.strictEqual(calculator.log(input), expected);
                }
            });
        }
        );

    });
}
);