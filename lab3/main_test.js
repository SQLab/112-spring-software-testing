const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('exp function', () => {
    // parameterized test
    const testCases = [
        {input: 0, expected: 1},
        {input: 1, expected: Math.exp(1)},
        {input: 2, expected: Math.exp(2)},
        {input: 3, expected: Math.exp(3)}
    ];
    testCases.forEach(testCase => {
        it(`should return the exponentiation of the given number`, () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.exp(testCase.input), testCase.expected);
        });
    });
    const invalidTestCases = [
        {input: NaN, expected: 'unsupported operand type'},
        {input: 1000, expected: 'overflow'}
    ];
    invalidTestCases.forEach(testCase => {
        it(`should throw an error when the given number is not finite`, () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.exp(testCase.input), 
            {
                name: 'Error',
                message: testCase.expected
            });
        });
    });
});

describe('log function', () => {
    // parameterized test
    const testCases = [
        {input: 1, expected: 0},
        {input: Math.E, expected: 1},
        {input: 2, expected: Math.log(2)},
        {input: 3, expected: Math.log(3)}
    ];
    testCases.forEach(testCase => {
        it(`should return the natural logarithm of the given number`, () => {
            const calculator = new Calculator();
            assert.strictEqual(calculator.log(testCase.input), testCase.expected);
        });
    });
    const invalidTestCases = [
        {input: Infinity, expected: 'unsupported operand type'},
        {input: 0, expected: 'math domain error (1)'},
        {input: -1, expected: 'math domain error (2)'},
    ];
    invalidTestCases.forEach(testCase => {
        it(`should throw an error when the given number is not finite`, () => {
            const calculator = new Calculator();
            assert.throws(() => calculator.log(testCase.input),
            {
                name: 'Error',
                message: testCase.expected
            });
        });
    });
});
