const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('calculator', () => {
    it('exponent normal result', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: 1, expected: Math.exp(1)},
            { param: 2, expected: Math.exp(2)},
            { param: 3, expected: Math.exp(3)},
        ];
        for (const tc of testcases)
        {
            assert.strictEqual(calculator.exp(tc.param), tc.expected);
        }
    });
    it('exponent input is not a number', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: '1'},
            { param: '2'},
            { param: '3'},
        ];
        const fn = (tc) => { 
            calculator.exp(tc);
        };
        assert.throws(() =>{
            for (const tc of testcases)
            {
                fn(tc.param);
            }
        }, Error);
    });
    it('exponent result infinity', () =>{
        const calculator = new Calculator();
        const testcases = [
            { param: 1000},
            { param: 2000},
            { param: 3000},
        ];
        const fn = (tc) => { calculator.exp(tc); };
        assert.throws(() => {
            for (const tc of testcases)
            {
                fn(tc.param);
            }
        }, Error);
    });
    it('log input is not a number', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: '1'},
            { param: '2'},
            { param: '3'},
        ];
        const fn = (tc) => { calculator.log(tc); };
        assert.throws(() => {
            for (const tc of testcases)
            {
                fn(tc.param);
            }
        }, Error);
    });
    it('log normal result', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: 1, expected: Math.log(1)},
            { param: 2, expected: Math.log(2)},
            { param: 3, expected: Math.log(3)},
        ];
        for (const tc of testcases)
        {
            assert.strictEqual(calculator.log(tc.param), tc.expected);
        }
    });
    it('log result is NaN', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: -1},
            { param: -2},
            { param: -3},
        ];
        const fn = (tc) => {
            calculator.log(tc);
        };
        assert.throws(() => {
            for (const tc of testcases)
            {
                fn(tc.param);
            }
        }, Error)
    });
    it('log result is -Infinity', () => {
        const calculator = new Calculator();
        const testcases = [
            { param: 0},
        ];
        const fn = (tc) => {
            calculator.log(tc);
        }
        assert.throws(() => {
            for (const tc of testcases)
            {
                fn(tc.param);
            }
        }, Error);
    });
});

