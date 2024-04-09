const {describe, it, default: test} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

it("test Caculator's exp", () => {
    const calculator = new Calculator();
    var normalCases = [
        { param: 0, expected: Math.exp(0) },
        { param: 1, expected: Math.exp(1) },
        { param: -10, expected: Math.exp(-10) },
        { param: 5.3, expected: Math.exp(5.3)}
    ];

    for(let nc of normalCases){
        assert.strictEqual(calculator.exp(nc.param), nc.expected, 'exp fail');
    }

    let errCases = [
        { param : Infinity, exp : 'unsupported operand type'},
        { param : 10000, exp : 'overflow'},
    ];

    for(let ec of errCases){
        assert.throws(()=>calculator.exp(ec.param), Error);
    }

    
});

it("test Caculator's log", () => {
    const calculator = new Calculator();
    var normalCases = [
        { param: 1, expected: Math.log(1) },
        { param: 2, expected: Math.log(2) },
        { param: 0.00003678794411714447, expected: Math.log(0.00003678794411714447) },
    ];
    for(let nc of normalCases){
        assert.strictEqual(calculator.log(nc.param), nc.expected, 'log fail');
    }

    let infiniteCases = [
        { param: -0 },//-Infinity
        { param: NaN},//!isFinite
        { param: -5}//isNaN
    ];
    for(let ic of infiniteCases){
        assert.throws(()=>calculator.log(ic.param), Error);
    }

    
});