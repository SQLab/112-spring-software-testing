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
        // !Number.isFinite(x)
        assert.throws(() =>{
            fn(Infinity);
        }, {
            name: 'Error',
            message: 'unsupported operand type'
        });
        // result === Infinity
        assert.throws(() =>{
            fn(Number.MAX_SAFE_INTEGER);
        }, {
            name: 'Error',
            message: 'overflow'
        });
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
        // !Number.isFinite(x)
        assert.throws(() =>{
            fn(Infinity);
        }, {
            name: 'Error',
            message: 'unsupported operand type'
        });
        // result === -Infinity
        assert.throws(() =>{
            fn(0);
        }, {
            name: 'Error',
            message: 'math domain error (1)'
        });
        // Number.isNaN(result)
        assert.throws(() =>{
            fn(-1);
        }, {
            name: 'Error',
            message: 'math domain error (2)'
        });
    });
});