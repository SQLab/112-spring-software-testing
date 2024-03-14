const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

const { test } = require('node:test');

test('test exp', (t) => {
    const calculator = new Calculator();
    const correct_test = [
        { param: 1, expected: 2.718281828459045 },
        { param: 5, expected: 148.4131591025766 },
        { param: 10, expected: 22026.465794806718 },
    ];
    for (const tc of correct_test) {
        assert.strictEqual(calculator.exp(tc.param), tc.expected);
    }

    const error_test = [
        { param: Infinity, expected: 'unsupported operand type' }, // !Number.isFinite(x))  throw Error('unsupported operand type');
        { param: 10000, expected: 'overflow' },                    // result === Infinity   throw Error('overflow');
    ];
    for (const tc of error_test) {
        assert.throws(() => { calculator.exp(tc.param) }, { message: tc.expected });
    }

});

test('test log', (t) => {
    const calculator = new Calculator();
    const correct_test = [
        { param: 3, expected: 1.0986122886681096 },
        { param: 5, expected: 1.6094379124341003 },
        { param: 7, expected: 1.9459101490553132 },
    ];

    for (const tc of correct_test) {
        assert.strictEqual(calculator.log(tc.param), tc.expected);
    }



    // { param: 0, expected: -Infinity },
    // { param: 1 / 0, expected: Infinity },
    // { param: 'ABC', expected: NaN }

    const error_test = [
        { param: Infinity, expected: 'unsupported operand type' },    // !isFinite(x)      throw Error('unsupported operand type')
        { param: 0, expected: 'math domain error (1)' },              // log(x) === -Infinity     throw Error('math domain error (1)');
        { param: -1, expected: 'math domain error (2)' },      // isNaN(log(x))     throw Error('math domain error (2)'); 
    ];
    for (const tc of error_test) {
        assert.throws(() => { calculator.log(tc.param) }, { message: tc.expected });
    }
});
