const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('Parameterize', ()=>{
    it('exp', ()=>{
        const cal = new Calculator;
        const testcase = [
            {param: 0, ans: Math.exp(0)},
            {param: 1, ans: Math.exp(1)},
            {param: 5, ans: Math.exp(5)},
            {param: -5, ans: Math.exp(-5)},
        ];
        for(const tc of testcase)
            assert.strictEqual(cal.exp(tc.param), tc.ans);

        const excep_testcase = [
            {param: Infinity, ans: 'unsupported operand type'},
            {param: 1000000000, ans: 'overflow'},
        ];
        for(const tc of excep_testcase)
            assert.throws(() => {cal.exp(tc.param)}, {message: tc.ans});
    });

    it('log', ()=>{
        const cal = new Calculator;
        const testcase = [
            {param: 1, ans: Math.log(1)},
            {param: 5, ans: Math.log(5)},
        ];
        for(const tc of testcase)
            assert.strictEqual(cal.log(tc.param), tc.ans);

        const excep_testcase = [
            {param: Infinity, ans: 'unsupported operand type'},
            {param: 0, ans: 'math domain error (1)'},
            {param: -1, ans: 'math domain error (2)'},
        ];
        for(const tc of excep_testcase)
            assert.throws(() => {cal.log(tc.param)}, {message: tc.ans});
    });

});