const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

const test = require('node:test');
// TODO: write your tests here
test("Calculator's exp",()=>{ 
    const testcases = [
        {param:0,expected:1},
        {param:1,expected:Math.exp(1)},
        {param:87,expected:Math.exp(87)},
    ];
    const cal = new Calculator();
    for (const tc of testcases){
        assert.strictEqual(cal.exp.apply(this,[tc.param]),tc.expected);
    }
});

test("Calculator's log",()=>{
    const testcases = [
        {param:1,expected:Math.log(1)},
        {param:10,expected:Math.log(10)},
        {param:48763,expected:Math.log(48763)},
    ];
    const cal = new Calculator();
    for (const tc of testcases){
        assert.strictEqual(cal.log.apply(cal,[tc.param]),tc.expected);
    }
});

test("Calculator's error of exp",()=>{
    const cal = new Calculator();
    const err = () => {cal.exp('a');}
    assert.throws(()=>{
        err();
    },{
        name: 'Error',
        message: 'unsupported operand type'
    });

    const err1 = () => {cal.exp(10000000);}
    assert.throws(()=>{
        err1();
    },{
        name: 'Error',
        message: 'overflow'
    });
});

test("Calculator's error of log",()=>{
    const cal = new Calculator();
    const err = () => {cal.log('a');}
    assert.throws(()=>{
        err();
    },{
        name: 'Error',
        message: 'unsupported operand type'
    });

    const err1 = () => {cal.log(-0);}
    assert.throws(()=>{
        err1();
    },{
        name: 'Error',
        message: 'math domain error (1)'
    });

    const err2 = () => {cal.log(-1);}
    assert.throws(()=>{
        err2();
    },{
        name: 'Error',
        message: 'math domain error (2)'
    });
});
