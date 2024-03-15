const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

it("test Calculator", ()=>{
    const calculator = new Calculator();
    const testCase = [
        {num:1, exp:Math.exp(1), log: Math.log(1)},
        {num:10, exp:Math.exp(10), log: Math.log(10)},
        {num:20, exp:Math.exp(20), log: Math.log(20)}
    ]

    for(const test of testCase){
        assert.strictEqual(calculator.exp(test.num), test.exp);
        assert.strictEqual(calculator.log(test.num), test.log);
    }


    assert.throws(()=>calculator.exp(Number.POSITIVE_INFINITY), {name: 'Error', message: 'unsupported operand type'});
    assert.throws(()=>calculator.exp(Number.NEGATIVE_INFINITY), {name: 'Error', message: 'unsupported operand type'});
    assert.throws(()=>calculator.exp(99999), {name: 'Error', message: 'overflow'});

    assert.throws(()=>calculator.log(Number.POSITIVE_INFINITY), {name: 'Error', message: 'unsupported operand type'});
    assert.throws(()=>calculator.log(Number.NEGATIVE_INFINITY), {name: 'Error', message: 'unsupported operand type'});
    assert.throws(()=>calculator.log(0), {name: 'Error', message: 'math domain error (1)'});
    assert.throws(()=>calculator.log(-1), {name: 'Error', message: 'math domain error (2)'});


})

