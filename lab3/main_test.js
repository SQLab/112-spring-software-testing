const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe("test calculator funtions", ()=>{
    it("exp", ()=>{
        const calc = new Calculator;
        const testcase = [
            {param: 0, ans: Math.exp(0)},
            {param: 5, ans: Math.exp(5)},
            {param: 10, ans: Math.exp(10)},
        ];
        for(const tc of testcase)
            assert.strictEqual(calc.exp(tc.param), tc.ans);

        const excep_testcase = [
            {param:"kelvin", expected: {message: 'unsupported operand type',name: 'Error'}},
            {param:100000, expected: {message: 'overflow',name: 'Error'}},
        ];
        for(const tc of excep_testcase)
            assert.throws(() => calc.exp(tc.param),tc.expected);
    });

    it("log", ()=>{
        const calc = new Calculator;
        const testcase = [
            {param: 1, ans: Math.log(1)},
            {param: 5, ans: Math.log(5)},
            {param: 10, ans: Math.log(10)},
        ];
        for(const tc of testcase)
            assert.strictEqual(calc.log(tc.param), tc.ans);

        const excep_testcase = [
            {param:"kelvin", expected: {message: 'unsupported operand type',name: 'Error'}},
            {param:10^10, expected: {message: 'math domain error (1)',name: 'Error'}},
            {param:-1, expected: {message: 'math domain error (2)',name: 'Error'}},
        ];
        for(const tc of excep_testcase)
            assert.throws(() => {calc.log(tc.param)}, tc.expected);
    });

});