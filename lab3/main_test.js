const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('Calculator', () => {
    const calculator = new Calculator();

    //Normal test exp
    const expTests = [
        { input: 1, expected: Math.E },
        { input: 0, expected: 1 },
        { input: Math.log(1), expected: 1 },
    ];

    describe('Test exp', () => {
        expTests.forEach(test => {
            it('Test exp cases', () => {
                assert.strictEqual(calculator.exp(test.input), test.expected);
            });
        });
    });

    // Error test for exp with unsupported operand type
     const expErrorTestsNaN = [
        { input: 'string' },
        { input: undefined },
        { input: NaN },
    ];

    describe('Test exp for errors with unsupported operand types', () => {
        expErrorTestsNaN.forEach(test => {
            it(`exp unsupported`, () => {
                assert.throws(() => calculator.exp(test.input), /unsupported operand type/);
            });
        });
    });

    // Error test for exp with Infinity
    const expErrorTestsInfinity = [
        { input: 710},
    ];

    describe('Test exp for overflow', () => {
        expErrorTestsInfinity.forEach(test => {
            it(`exp(${test.input}) should throw "overflow" error`, () => {
                assert.throws(() => calculator.exp(test.input), /overflow/);
            });
        });
    });

    //Normal test log
    const logTests = [
        { input: 1, expected: 0 },
        { input: Math.E, expected: 1 },
        { input: Math.E ** 2, expected: 2 },
    ];

    describe('Test log', () => {
        logTests.forEach(test => {
            it('Test log case', () => {
                assert.strictEqual(calculator.log(test.input), test.expected);
            });
        });
    });

    // Error test for log with unsupported operand type
    const logErrorTestsUnsupported = [
        { input: 'string' },
        { input: undefined },
        { input: Infinity },
    ];

    describe('Error log for unsupported types', () => {
        logErrorTestsUnsupported.forEach(test => {
            it(`should throw "unsupported operand type" for log(${test.input})`, () => {
                assert.throws(() => calculator.log(test.input), /unsupported operand type/ );
            });
        });
    });

    // Error test for log with math domain error 1
    const logErrorTestsDomainError1 = [
        { input: 0 },
    ];

    describe('Error log for math domain error (1)', () => {
        logErrorTestsDomainError1.forEach(test => {
            it(`should throw "math domain error (1)" for log(${test.input})`, () => {
                assert.throws(() => calculator.log(test.input), /math domain error \(1\)/);
            });
        });
    });

    // Error test for log with math domain error 2
    const logErrorTestsDomainError2 = [
        { input: -1 },
    ];

    describe('Error log for math domain error (2)', () => {
        logErrorTestsDomainError2.forEach(test => {
            it(`should throw "math domain error (2)" for log(${test.input})`, () => {
                assert.throws(() => calculator.log(test.input), /math domain error \(2\)/);
            });
        });
    });
});