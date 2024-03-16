const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');
const test = require('node:test');

// node --test --experimental-test-coverage

describe('Test on exp', async () => {
    const calc = new Calculator();
    it('Without error', () => {
        const testcases = [
            {param: [0], expected: 1}
        ];
        for (const tc of testcases) {
            assert.strictEqual(calc.exp.apply(this, tc.param), tc.expected);
        }
    });
    it('With error', () => {
        // !Number.isFinite(x)
        assert.throws(() =>{
            calc.exp(Infinity);
        }, {
            name: 'Error',
            message: 'unsupported operand type'
        });
        // result === Infinity
        assert.throws(() =>{
            calc.exp(Number.MAX_SAFE_INTEGER);
        }, {
            name: 'Error',
            message: 'overflow'
        });
    });
});

describe('Test on log', async () => {
    const calc = new Calculator();
    it('Without error', () => {
        const testcases = [
            {param: [Math.E], expected: 1},
            {param: [1], expected: 0}
        ];
        for (const tc of testcases) {
            assert.strictEqual(calc.log.apply(this, tc.param), tc.expected);
        }
    });
    it('With error', () => {
        // !Number.isFinite(x)
        assert.throws(() =>{
            calc.log(Infinity);
        }, {
            name: 'Error',
            message: 'unsupported operand type'
        });
        // result === -Infinity
        assert.throws(() =>{
            calc.log(0);
        }, {
            name: 'Error',
            message: 'math domain error (1)'
        });
        // Number.isNaN(result)
        assert.throws(() =>{
            calc.log(-1);
        }, {
            name: 'Error',
            message: 'math domain error (2)'
        });
    });
});