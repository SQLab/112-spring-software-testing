const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe("test exp",() => {

    const error_testcase = [
        { input:666666666666666 , expected:"overflow"},
        { input:NaN , expected:"unsupported operand type" }
    ];

    const pass_testcase = [
        { input:-10 , expected:Math.exp(-10)},
        { input:0 , expected:Math.exp(0)},
        { input:10 , expected:Math.exp(10)}
    ];


    const my_cal = new Calculator();

    for(const tc of error_testcase){
        assert.throws( () => my_cal.exp(tc.input) , new Error(tc.expected) ) 
    }

    for(const tc of pass_testcase){
        assert.strictEqual( my_cal.exp(tc.input) , tc.expected )
    }

})

describe("test log",() => {

    const error_testcase = [
        { input:0 , expected:"math domain error (1)"},
        { input:-10 , expected:"math domain error (2)"},
        { input:NaN , expected:"unsupported operand type" }
    ];

    const pass_testcase = [
        { input:620 , expected:Math.log(620)},
        { input:206 , expected:Math.log(206)},
        { input:10 , expected:Math.log(10)}
    ];


    const my_cal = new Calculator();

    for(const tc of error_testcase){
        assert.throws( () => my_cal.log(tc.input) , new Error(tc.expected) ) 
    }

    for(const tc of pass_testcase){
        assert.strictEqual( my_cal.log(tc.input) , tc.expected )
    }

})

