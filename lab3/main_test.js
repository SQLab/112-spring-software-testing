const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

const { Calculator } = require('./main');

test("Calculator's exp", () => {
    
    const calculator = new Calculator();

    const testcases = [
        {param: 0, expected: 1}, //normal
        {param: 1, expected: Math.exp(1)}, //normal
        {param: 2, expected: Math.exp(2)}, //normal
        {param: Infinity, expected: 'unsupported operand type'}, //if input infinite
        {param: 'test', expected: 'unsupported operand type'}, //if input not number
        {param: 1000, expected: 'overflow'} //if output infinite
    ]

    for (let i = 0; i < testcases.length; i++) {
        if (i < 3){
            assert.strictEqual(calculator.exp(testcases[i].param), testcases[i].expected);
        }
        else{//exception
            assert.throws(() => {calculator.exp(testcases[i].param)}, { message: testcases[i].expected });
        }
    }
});

test("Calculator's log", () => {
   
    const calculator = new Calculator();

    const testcases = [
        {param: 1, expected: 0}, //normal
        {param: Math.exp(1), expected: 1}, //normal
        {param: 2, expected: Math.log(2)}, //normal
        {param: Infinity, expected: 'unsupported operand type'}, //if input infinite
        {param: 'test', expected: 'unsupported operand type'}, //if input not number
        {param: 0, expected: 'math domain error (1)'}, //if output -infinite
        {param: -1, expected: 'math domain error (2)'} //if output not number
    ]

    for (let i = 0; i < testcases.length; i++) {
        if (i < 3){
            assert.strictEqual(calculator.log(testcases[i].param), testcases[i].expected);
        }
        else{//exception
            assert.throws(() => {calculator.log(testcases[i].param)}, { message: testcases[i].expected });
        }
    }
});

