const {describe, it, default: test} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator exp', ()=>{
    const cal = new Calculator();
    const testcases = [
        {param:10/0, expected: {message: 'unsupported operand type',name: 'Error'}},
        {param:100000, expected: {message: 'overflow',name: 'Error'}},
    ];
    for(const tc of testcases){
        assert.throws(() => cal.exp(tc.param),tc.expected);
    }

    const testcases2 = [
        {param: 1, expected: Math.exp(1)},
        {param:10, expected: Math.exp(10)},
        {param:-1, expected: Math.exp(-1)},
        {param:0, expected: Math.exp(0)},
    ];
    for(const tc of testcases2){
        assert.strictEqual(cal.exp(tc.param),tc.expected);
    }
})

describe('Calculator log', ()=>{
    const cal2 = new Calculator();
    const testcases3 = [
        {param:10/0, expected: {message: 'unsupported operand type',name: 'Error'}},
        {param:10^10, expected: {message: 'math domain error (1)',name: 'Error'}},
        {param:-1, expected: {message: 'math domain error (2)',name: 'Error'}},

    ];
    for(const tc of testcases3){
        assert.throws(() => cal2.log(tc.param),tc.expected);
    }

    const testcases4 = [
        {param: 1, expected: Math.log(1)},
        {param:1000, expected: Math.log(1000)},
        {param:1/2, expected: Math.log(1/2)},
    ];
    for(const tc of testcases4){
        assert.strictEqual(cal2.log(tc.param),tc.expected);
    }
})

