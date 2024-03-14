const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('calaulator exp testing', function() {
    it('parameterization testing non-error-result', () => {
        const calculator = new Calculator();
        const testcases = [
            { inp: 0, outp: 1},
            { inp: 1, outp: 2.718281828459045},
            { inp: 2, outp: 7.38905609893065}
        ];
        for (const tc of testcases) {
            assert.strictEqual(calculator.exp(tc.inp), tc.outp);
        }
    })
    it('parameterization testing error-result', () => {
        const calculator = new Calculator();
        const testcases = [
            { inp: Infinity, outp: Error('unsupported operand type')},
            { inp: 123, outp: Error('overflow')}
        ];
        const bufexp = Math.exp;
        Math.exp = () => Infinity;
        for (const tc of testcases) {
            assert.throws(() => {
                calculator.exp(tc.inp);
            }, tc.outp);
        }
        Math.exp = bufexp;
    })
})

describe('calaulator log testing', () => {
    it('parameterization testing non-error-result', () => {
        const calculator = new Calculator();
        const testcases = [
            { inp: 1, outp: 0},
            { inp: 2, outp: 0.6931471805599453},
            { inp: 3, outp: 1.0986122886681096}
        ];
        for (const tc of testcases) {
            assert.strictEqual(calculator.log(tc.inp), tc.outp);
        }
    })

    it('parameterization testing error-result', () => {
        const calculator = new Calculator();
        const testcases = [
            { inp: Infinity, outp: Error('unsupported operand type')},
            { inp: -Infinity, outp: Error('math domain error (1)')},
            { inp: NaN, outp: Error('math domain error (2)')}
        ];
        const buflog = Math.log;
        for (const tc of testcases) {
            Math.log = () => tc.inp;
            if (tc.inp == Infinity) {
                assert.throws(() => {
                    calculator.log(tc.inp);
                }, tc.outp);
            }
            else {
                assert.throws(() => {
                    calculator.log(123);
                }, tc.outp);
            }  
        }
        Math.log = buflog;
    })
})

