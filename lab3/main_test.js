const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('Calculator', () => {
    calculator = new Calculator();
    const testcase_exp = [
        { param: [1], expected: Math.E },
        { param: [calculator.log(2)], expected: 2 },
    ];
    const testcase_log = [
        { param: [1], expected: 0 },
        { param: [Math.E], expected: 1 },
    ];
    it('test exp normal', () => {
        for (const {param, expected} of testcase_exp) {
            assert.strictEqual(calculator.exp(...param), expected);
        }
    });
    it('test log normal', () => {
        for (const {param, expected} of testcase_log) {
            assert.strictEqual(calculator.log(...param), expected);
        }
    });
    it('test exp infinite', () => {
        assert.throws(() => calculator.exp(Infinity), { message: 'unsupported operand type' });
    });
    it('test exp overflow', () => {
        assert.throws(() => calculator.exp(1000), { message: 'overflow' });
    });
    it('test log zero', () => {
        assert.throws(() => calculator.log(Infinity), { message: 'unsupported operand type' });
    });
    it('test log infinite', () => {
        assert.throws(() => calculator.log(0), { message: 'math domain error (1)' });
    });
    it('test log nan', () => {
        assert.throws(() => calculator.log(-1), { message: 'math domain error (2)' });
    });

});
