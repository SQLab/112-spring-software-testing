const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    it('exp paramaterize testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : 0, expected: Math.exp(0)}, 
            {param : 1, expected: Math.exp(1)},
            {param : 10, expected: Math.exp(10)}  
        ];
        testcases.forEach(testcase => {
            assert.strictEqual(calculator.exp(testcase.param), testcase.expected);
        });
       
    })
    it('exp error unsupport type testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : 'a', expected: 'unsupported operand type'}, 
            {param : [], expected: 'unsupported operand type'},
            {param : {}, expected: 'unsupported operand type'}  
        ];
        testcases.forEach(testcase => {
            assert.throws(() => calculator.exp(testcase.param), new Error(testcase.expected));
        });
      
    })
    it('exp error overflow testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : 1000, expected: 'overflow'}, 
            {param : 10000, expected: 'overflow'},
            {param : 100000, expected: 'overflow'}  
        ];
        testcases.forEach(testcase => {
            assert.throws(() => calculator.exp(testcase.param), new Error(testcase.expected));
        });
      
    })
    it('log paramaterize testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : 1, expected: Math.log(1)}, 
            {param : 2, expected: Math.log(2)},
            {param : 3, expected: Math.log(3)}  
        ];
        testcases.forEach(testcase => {
            assert.strictEqual(calculator.log(testcase.param), testcase.expected);
        });
       
    })
    it('log error unsupport type testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : 'a', expected: 'unsupported operand type'}, 
            {param : [], expected: 'unsupported operand type'},
            {param : {}, expected: 'unsupported operand type'}  
        ];
        testcases.forEach(testcase => {
            assert.throws(() => calculator.log(testcase.param), new Error(testcase.expected));
        });
    })
    it('log error math domain error (1) testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : -0, expected: 'math domain error (1)'}, 
            {param : 0, expected: 'math domain error (1)'},
        ];
        testcases.forEach(testcase => {
            assert.throws(() => calculator.log(testcase.param), new Error(testcase.expected));
        });
    })
    it('log error math domain error (2) testing', () => {
        const calculator = new Calculator();
        const testcases = [
            {param : -1, expected: 'math domain error (2)'}, 
            {param : -10, expected: 'math domain error (2)'},
            {param : -100, expected: 'math domain error (2)'}  
        ];
        testcases.forEach(testcase => {
            assert.throws(() => calculator.log(testcase.param), new Error(testcase.expected));
        });
    })
})
