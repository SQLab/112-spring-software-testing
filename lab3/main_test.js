const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');
const test = require('node:test');

// node --test --experimental-test-coverage

describe('Test on exp', async () => {
    const calc = new Calculator();
    function exp(x) {
        return calc.exp(x);
    }
    const fn = test.mock.fn(exp);
    it('Without error', () => {
        const testcases = [
            {param: [0], expected: 1}
        ];
        for (const tc of testcases) {
            assert.strictEqual(fn.apply(this, tc.param), tc.expected);
        }
    });
    it('With error', () => {
        const testcases = [
            {param: [Infinity], expected: 'unsupported operand type'},
            {param: [Number.MAX_SAFE_INTEGER], expected: 'overflow'}
        ];
        for (const tc of testcases) {
            assert.throws(() =>{
                fn.apply(this, tc.param);
            }, {
                name: 'Error',
                message: tc.expected
            });
        }
    });
});

describe('Test on log', async () => {
    const calc = new Calculator();
    function log(x) {
        return calc.log(x);
    }
    const fn = test.mock.fn(log);
    it('Without error', () => {
        const testcases = [
            {param: [Math.E], expected: 1},
            {param: [1], expected: 0}
        ];
        for (const tc of testcases) {
            assert.strictEqual(fn.apply(this, tc.param), tc.expected);
        }
    });
    it('With error', () => {
        const testcases = [
            {param: [Infinity], expected: 'unsupported operand type'},
            {param: [0], expected: 'math domain error (1)'},
            {param: [-1], expected: 'math domain error (2)'}
        ];
        for (const tc of testcases) {
            assert.throws(() =>{
                fn.apply(this, tc.param);
            }, {
                name: 'Error',
                message: tc.expected
            });
        }
    });
});