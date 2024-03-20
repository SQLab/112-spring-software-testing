const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator', () => {
    describe('exp', () => {
        it('Not a number', () => {
            const testcases = [
                { param: ['a'], expected_name: 'Error', expected_message: 'unsupported operand type'},
                { param: ['abc'], expected_name: 'Error', expected_message: 'unsupported operand type'},
                { param: [''], expected_name: 'Error', expected_message: 'unsupported operand type'}
            ];
            const calculator = new Calculator();
            for (const testcase of testcases) {
                assert.throws(() => {
                    calculator.exp(...testcase.param);
                }, {
                    name: testcase.expected_name,
                    message: testcase.expected_message
                });
            }
        });

        it('Overflow', () => {
            const testcases = [
                { param: [1000], expected_name: 'Error', expected_message: 'overflow'},
                { param: [10000], expected_name: 'Error', expected_message: 'overflow'},
                { param: [100000], expected_name: 'Error', expected_message: 'overflow'}
            ];
            const calculator = new Calculator();
            for (const testcase of testcases) {
                assert.throws(() => {
                    calculator.exp(...testcase.param);
                }, {
                    name: testcase.expected_name,
                    message: testcase.expected_message
                });
            }
        });

        it('Normal', () => {
            const testcases = [
                { param: [1], expected: 2.718281828459045},
                { param: [2], expected: 7.38905609893065},
                { param: [3], expected: 20.085536923187668},
            ];
            const calculator = new Calculator();
            for (const testcase of testcases) {
                assert.strictEqual(calculator.exp(...testcase.param), testcase.expected);
            }
        });
    });

    describe('log', () => {
        it('Not a number', () => {
            const testcases = [
                { param: ['a'], expected_name: 'Error', expected_message: 'unsupported operand type'},
                { param: ['abc'], expected_name: 'Error', expected_message: 'unsupported operand type'},
                { param: [''], expected_name: 'Error', expected_message: 'unsupported operand type'}
            ];
            const calculator = new Calculator();
            for (const testcase of testcases) {
                assert.throws(() => {
                    calculator.log(...testcase.param);
                }, {
                    name: testcase.expected_name,
                    message: testcase.expected_message
                });
            }
        });

        it('Math domain error (1)', () => {
            const calculator = new Calculator();
            assert.throws(() => {
                calculator.log(0);
            }, {
                name: 'Error',
                message: 'math domain error (1)'
            });
        });

        it('Math domain error (2)', () => {
            const testcases = [
                { param: [-1], expected_name: 'Error', expected_message: 'math domain error (2)'},
                { param: [-2], expected_name: 'Error', expected_message: 'math domain error (2)'},
                { param: [-3], expected_name: 'Error', expected_message: 'math domain error (2)'}
            ];
            const calculator = new Calculator();
            for (const testcase of testcases) {
                assert.throws(() => {
                    calculator.log(...testcase.param);
                }, {
                    name: testcase.expected_name,
                    message: testcase.expected_message
                });
            }
        });

        it('Normal', () => {
            const testcases = [
                { param: [1], expected: 0},
                { param: [2], expected: 0.6931471805599453},
                { param: [3], expected: 1.0986122886681096},
            ];
            const calculator = new Calculator();
            for (const testcase of testcases) {
                assert.strictEqual(calculator.log(...testcase.param), testcase.expected);
            }
        });
    });
});
