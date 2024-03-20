const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
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
            {param:"kelvin", expected: {message: 'unsupported operand type',name: 'Error'}},
            {param:100000, expected: {message: 'overflow',name: 'Error'}},
        ];
        for(const tc of error)
            assert.throws(() => calc.exp(tc.param),tc.expected);
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
            {param:"kelvin", expected: {message: 'unsupported operand type',name: 'Error'}},
            {param:10^10, expected: {message: 'math domain error (1)',name: 'Error'}},
            {param:-1, expected: {message: 'math domain error (2)',name: 'Error'}},
        ];
        for(const tc of error)
            assert.throws(() => {calc.log(tc.param)}, tc.expected);
    });

});