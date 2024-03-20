const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("test calculator funtions", ()=>{
    it("exp", ()=>{
        const calc = new Calculator;
        const correct = [
            {param: 0, expected: Math.exp(0)},
            {param: 5, expected: Math.exp(5)},
            {param: 10, expected: Math.exp(10)},
        ];
        for(const tc of correct)
            assert.strictEqual(calc.exp(tc.param), tc.expected);

        const error = [
            {param: Infinity, expected: 'unsupported operand type'},
            {param: 1000000000, expected: 'overflow'},
        ];
        for(const tc of error)
        assert.throws(() => {calc.exp(tc.param)}, {message: tc.expected});
    });

    it("log", ()=>{
        const calc = new Calculator;
        const correct = [
            {param: 1, expected: Math.log(1)},
            {param: 5, expected: Math.log(5)},
            {param: 10, expected: Math.log(10)},
        ];
        for(const tc of correct)
            assert.strictEqual(calc.log(tc.param), tc.expected);

        const error = [
            {param: Infinity, expected: 'unsupported operand type'},
            {param: 0, expected: 'math domain error (1)'},
            {param: -1, expected: 'math domain error (2)'},
        ];
        for(const tc of error)
            assert.throws(() => {calc.log(tc.param)}, {message: tc.expected});
    });

