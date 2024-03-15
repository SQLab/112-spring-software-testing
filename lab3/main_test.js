const test = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');


test('test exp', () => {
    const calculator = new Calculator();
    const testcases = [
        { param: 0, expected: 1 },
        { param: 1, expected: Math.E },
        { param: 10, expected: Math.exp(10) },
    ]
    testcases.forEach(testcase => {
        assert.strictEqual(calculator.exp(testcase.param), testcase.expected);
    });

    assert.throws(() => calculator.exp(NaN), {
        name: 'Error',
        message: 'unsupported operand type'
    });

    // overflow
    test.mock.method(Math, 'exp', () => { return Infinity; });

    assert.throws(() => calculator.exp(0), {
        name: 'Error',
        message: 'overflow'
    });
});

test('test log', () => {
    const calculator = new Calculator();
    const testcases = [
        { param: 1, expected: 0 },
        { param: Math.E, expected: 1 },
        { param: 10, expected: Math.log(10) },
    ]
    testcases.forEach(testcase => {
        assert.strictEqual(calculator.log(testcase.param), testcase.expected);
    });

    assert.throws(() => calculator.log(NaN), {
        name: 'Error',
        message: 'unsupported operand type'
    });

    // math domain error (1)
    assert.throws(() => calculator.log(0), {
        name: 'Error',
        message: 'math domain error (1)'
    });

    // math domain error (2)
    assert.throws(() => calculator.log(-1), {
        name: 'Error',
        message: 'math domain error (2)'
    });
});
