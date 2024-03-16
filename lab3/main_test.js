const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Calculator class', () => {
    describe('exponential', () => {
        it('should throw for invalid input', () => {
            const testcases = [
                {
                    param: [Infinity],
                    expected_error: Error('unsupported operand type')
                },
                {
                    param: ['string'],
                    expected_error: Error('unsupported operand type')
                },
                {
                    param: [null],
                    expected_error: Error('unsupported operand type')
                },
            ];
            const calc = new Calculator();
            for (const tc of testcases) {
                assert.throws(() => {
                    calc.exp.apply(null, tc.param);
                }, tc.expected_error);
            }
        });
        it('should throw for overflow', () => {
            const testcases = [
                {
                    param: [1000],
                    expected_error: Error('overflow')
                },
                {
                    param: [10000],
                    expected_error: Error('overflow')
                },
                {
                    param: [12345],
                    expected_error: Error('overflow')
                },
            ];
            const calc = new Calculator();
            for (const tc of testcases) {
                assert.throws(() => {
                    calc.exp.apply(null, tc.param);
                }, tc.expected_error);
            }
        });
        it('should return exponential otherwise', () => {
            const testcases = [];
            for (var i = 0; i < 100; ++i) {
                testcases.push({
                    param: [i],
                    expected: Math.exp(i)
                });
            }
            const calc = new Calculator();
            for (const tc of testcases) {
                assert.strictEqual(calc.exp.apply(null, tc.param), tc.expected);
            }
        });
    });
    describe('logarithm', () => {
        it('should throw for invalid input', () => {
            const testcases = [
                {
                    param: [Infinity],
                    expected_error: Error('unsupported operand type')
                },
                {
                    param: ['string'],
                    expected_error: Error('unsupported operand type')
                },
                {
                    param: [null],
                    expected_error: Error('unsupported operand type')
                },
            ];
            const calc = new Calculator();
            for (const tc of testcases) {
                assert.throws(() => {
                    calc.log.apply(null, tc.param);
                }, tc.expected_error);
            }
        });
        it('should throw for domain error', () => {
            const testcases = [
                {
                    param: [0],
                    expected_error: Error('math domain error (1)')
                },
                {
                    param: [-1],
                    expected_error: Error('math domain error (2)')
                },
                {
                    param: [-420],
                    expected_error: Error('math domain error (2)')
                },
            ];
            const calc = new Calculator();
            for (const tc of testcases) {
                assert.throws(() => {
                    calc.log.apply(null, tc.param);
                }, tc.expected_error);
            }
        });
        it('should return logarithm otherwise', () => {
            const testcases = [];
            for (var i = 1; i < 100; ++i) {
                testcases.push({
                    param: [i],
                    expected: Math.log(i)
                });
            }
            const calc = new Calculator();
            for (const tc of testcases) {
                assert.strictEqual(calc.log.apply(null, tc.param), tc.expected);
            }
        });
    });
});
