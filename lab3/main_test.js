const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

const { mock } = require('node:test');

describe('Calculator', () => {
    it('should throw an error on non-numeric input when calculate exponential of a number', () => {
        const calculator = new Calculator();
        const testcases = [
            { params: 'a', expected: Error('unsupported operand type') },
            { params: '123abc', expected: Error('unsupported operand type') },
            { params: '1', expected: Error('unsupported operand type') },
            { params: '0', expected: Error('unsupported operand type') },
            { params: true, expected: Error('unsupported operand type') },
            { params: false, expected: Error('unsupported operand type') },
            { params: NaN, expected: Error('unsupported operand type') },
            { params: Infinity, expected: Error('unsupported operand type') },
            { params: -Infinity, expected: Error('unsupported operand type') },
        ]
        for (const testcase of testcases) {
            assert.throws(() => calculator.exp(testcase.params), testcase.expected);
        }
    });
    it('show throw an error on overflow when calculate exponential of a number', () => {
        const calculator = new Calculator();
        mock.method(Math, 'exp', () => Infinity);
        assert.throws(() => calculator.exp(1), Error('overflow'));
        mock.reset();
    });
    it('should return the exponential of a number', () => {
        const calculator = new Calculator();

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        for (let i = 0; i < 20; i++) {
            const number = getRndInteger(-100, 100);
            assert.strictEqual(calculator.exp(number), Math.exp(number));
        }
    });
    it('should throw an error on non-numeric input when calculate logarithm of a number', () => {
        const calculator = new Calculator();
        const testcases = [
            { params: 'a', expected: Error('unsupported operand type') },
            { params: '123abc', expected: Error('unsupported operand type') },
            { params: '1', expected: Error('unsupported operand type') },
            { params: '0', expected: Error('unsupported operand type') },
            { params: true, expected: Error('unsupported operand type') },
            { params: false, expected: Error('unsupported operand type') },
            { params: NaN, expected: Error('unsupported operand type') },
            { params: Infinity, expected: Error('unsupported operand type') },
            { params: -Infinity, expected: Error('unsupported operand type') },
        ]
        for (const testcase of testcases) {
            assert.throws(() => calculator.log(testcase.params), testcase.expected);
        }
    });
    it('show throw an error on math domain error when calculate logarithm of a number', () => {
        const calculator = new Calculator();

        mock.method(Math, 'log', () => -Infinity);
        assert.throws(() => calculator.log(1), Error('math domain error (1)'));
        mock.reset();

        mock.method(Math, 'log', () => NaN);
        assert.throws(() => calculator.log(1), Error('math domain error (2)'));
        mock.reset();
    });
    it('should return the logarithm of a number', () => {
        const calculator = new Calculator();

        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        for (let i = 0; i < 20; i++) {
            const number = getRndInteger(1, 1000);
            assert.strictEqual(calculator.log(number), Math.log(number));
        }
    });
});