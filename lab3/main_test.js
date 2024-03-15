const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
it('exp', () => {
    let calc = new Calculator();

    const testcases = [
        {'param': [0], 'expected': 1},
        {'param': [1.7], 'expected': Math.exp(1.7)},
        {'param': [-1], 'expected': 1 / Math.E}
    ];

    for(const tc of testcases){
        assert.strictEqual(calc.exp.apply(this, tc.param), tc.expected)
    }

    assert.throws(() => calc.exp(NaN), {
        name: 'Error',
        message: 'unsupported operand type'
    });

    assert.throws(() => calc.exp(999999999999999), {
        name: 'Error',
        message: 'overflow'
    });
});

it('log', () => {
    let calc = new Calculator();

    const testcases = [
        {'param': [Math.E], 'expected': 1},
        {'param': [1], 'expected': 0},
        {'param': [1/Math.E], 'expected': -1}
    ];

    for(const tc of testcases){
        assert.strictEqual(calc.log.apply(this, tc.param), tc.expected)
    }

    assert.throws(() => calc.log(NaN), {
        name: 'Error',
        message: 'unsupported operand type'
    });

    assert.throws(() => calc.log(0), {
        name: 'Error',
        message: 'math domain error (1)'
    });

    assert.throws(() => calc.log(-1), {
        name: 'Error',
        message: 'math domain error (2)'
    });
});