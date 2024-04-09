const test = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

test("test Calculator's exp - normal", () => {
    const testcases = [
        {param: 0, expected: 1},
        {param: 1, expected: Math.E},
        {param: 2, expected: Math.exp(2)},
    ];

    const calc = new Calculator();
    for (const tc of testcases) {
        assert.strictEqual(calc.exp(tc.param), tc.expected);
    }
})

test("test Calculator's exp - error", () => {
    const testcases = [
        {param: Infinity, expected: { name: 'Error', message: 'unsupported operand type' }},
        {param: -Infinity, expected: { name: 'Error', message: 'unsupported operand type' }},
        {param: 10000000, expected: { name: 'Error', message: 'overflow' }},
    ];

    const calc = new Calculator();
    for (const tc of testcases) {
        assert.throws(() => {
            calc.exp(tc.param);
        }, tc.expected);
    }
})

test("test Calculator's log - normal", () => {
    const testcases = [
        {param: 1, expected: 0},
        {param: Math.E, expected: 1.0},
        {param: Math.E * Math.E, expected: 2.0},
    ];

    const calc = new Calculator();
    for (const tc of testcases) {
        assert.strictEqual(calc.log(tc.param), tc.expected);
    }
})

test("test Calculator's log - error", () => {
    const testcases = [
        {param: Infinity, expected: { name: 'Error', message: 'unsupported operand type' }},
        {param: 0, expected: { name: 'Error', message: 'math domain error (1)' }},
        {param: -1, expected: { name: 'Error', message: 'math domain error (2)' }},
    ];

    const calc = new Calculator();
    for (const tc of testcases) {
        assert.throws(() => {
            calc.log(tc.param);
        }, tc.expected);
    }
})