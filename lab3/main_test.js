const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('Calculator.exp', () => {
    it('return value', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: 87, expected: 6.076030225056873e+37 },
            { param: 0, expected: 1 },
        ];
        testcases.forEach(testcase => {
            assert.strictEqual(calculator.exp(testcase.param), testcase.expected);
        });
    });

    it('error', () => {
        const calculator = new Calculator();
        const errorcases = [
            { param: NaN, type: 'Error', message: 'unsupported operand type' },
            { param: Infinity, type: 'Error', message: 'unsupported operand type' },
            { param: 1e3, type: 'Error', message: 'overflow' },
        ];
        errorcases.forEach(errorcase => {
            assert.throws(() => calculator.exp(errorcase.param), {
                name: errorcase.type,
                message: errorcase.message,
            });
        });
    })
});

describe('Calculator.log', () => {
    it('return value', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: 48763, expected: 10.794727107543425 },
            { param: 1, expected: 0 },
        ];
        testcases.forEach(testcase => {
            assert.strictEqual(calculator.log(testcase.param), testcase.expected);
        });
    });

    it('error', () => {
        const calculator = new Calculator();
        const errorcases = [
            { param: NaN, type: 'Error', message: 'unsupported operand type' },
            { param: Infinity, type: 'Error', message: 'unsupported operand type' },
            { param: 1e-400, type: 'Error', message: 'math domain error (1)' },
            { param: -1, type: 'Error', message: 'math domain error (2)' },
        ];
        errorcases.forEach(errorcase => {
            assert.throws(() => calculator.log(errorcase.param), {
                name: errorcase.type,
                message: errorcase.message,
            });
        });
    })
});