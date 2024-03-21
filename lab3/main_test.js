const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('exp', () => {
    const valid_testcase = [
        {inputvalue: 1, expected: Math.exp(1)},
        {inputvalue: -1, expected: Math.exp(-1)},
        {inputvalue: 0, expected: Math.exp(0)}
    ];
    const invalid_testcase = [
        {inputvalue: 9999999999, expected: {name: 'Error', message: 'overflow'}},
        {inputvalue: NaN, expected: {name: 'Error', message: 'unsupported operand type'}},
        {inputvalue: 1000, expected: {name: 'Error', message: 'overflow'}}
    ];
    const calculator = new Calculator();

    for(const tc of valid_testcase)
        assert.strictEqual(calculator.exp(tc.inputvalue) , tc.expected);
    for(const tc of invalid_testcase)
        assert.throws(() => calculator.exp(tc.inputvalue), new Error(tc.expected.message)) ;
});

describe('log', () => {
    const valid_testcase = [
        {inputvalue: 100, expected: Math.log(100) },
        {inputvalue: 0.5, expected: Math.log(0.5) },
        {inputvalue: 1, expected: Math.log(1) }
    ];
    const invalid_testcase = [
        {inputvalue: Infinity, expected: {name: 'Error', message: 'unsupported operand type'}},
        {inputvalue: NaN, expected: {name: 'Error', message: 'unsupported operand type'}},
        {inputvalue: 0, expected: {name: 'Error', message: 'math domain error (1)'}},
        {inputvalue: -100, expected: {name: 'Error', message: 'math domain error (2)'}}  
    ];
    const calculator = new Calculator();

    for (const tc of valid_testcase)
        assert.strictEqual(calculator.log(tc.inputvalue) , tc.expected);
    for (const tc of invalid_testcase)
        assert.throws(() => calculator.log(tc.inputvalue) , new Error(tc.expected.message));
});
