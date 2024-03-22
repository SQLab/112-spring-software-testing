const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe("Test Calculator's exp by Parametrized Test", () => {
    const testcase = [
        [1, Math.exp(1), false],
        [0, Math.exp(0), false],
        [87, Math.exp(87), false],
        [Infinity, Math.exp(Infinity), true],
        [312551004, Math.exp(312551004), true],
        ['a', Math.exp('a'), true]
    ];
    const calculator = new Calculator();
    testcase.forEach(([input, expected, isThrow]) => {
        if (isThrow) {
            assert.throws(() => calculator.exp(input), Error);
        } else {
            assert.strictEqual(calculator.exp(input), expected);
        }
    });
});

describe("Test Calculator's log by Parametrized Test", () => {
    const testcase = [
        [312551004, Math.log(312551004), false],
        [87, Math.log(87), false],
        [48763, Math.log(48763), false],
        [0, Math.log(0), true],
        [-1, Math.log(-1), true],
        ['a', Math.log('a'), true]
    ];
    const calculator = new Calculator();
    testcase.forEach(([input, expected, isThrow]) => {
        if (isThrow) {
            assert.throws(() => calculator.log(input), Error);
        } else {
            assert.strictEqual(calculator.log(input), expected);
        }
    });
});