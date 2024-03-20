const { describe, it } = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');


const EPSILON = 0.000001

describe('exp', async () => {
    it('infinite', () => {
        const c = new Calculator()

        const errTestcases = [
            [Infinity, Error('unsupported operand type')],
            [1000000000 + 7, Error('overflow')],
        ]

        for (const [i, e] of errTestcases) {
            assert.throws(() => c.exp(i), e)
        }

        const testcases = [
            [4.2, 66.68633104092515],
            [0.42, 1.5219615556186337],
            [0.042, 1.0428944787507632]
        ]
        for (const [i, o] of testcases) {
            assert.ok(Math.abs(o - c.exp(i)) < EPSILON)
        }
    })

    it('log', () => {
        const c = new Calculator()

        const errTestcases = [
            [Infinity, Error('unsupported operand type')],
            [0, Error('math domain error (1)')],
            [-1, Error('math domain error (2)')],
        ]

        for (const [i, e] of errTestcases) {
            assert.throws(() => c.log(i), e)
        }

        const testcases = [
            [4.2, 1.4350845252893227],
            [0.42, -0.8675005677047231],
            [0.042, -3.170085660698769]
        ]
        for (const [i, o] of testcases) {
            assert.ok(Math.abs(o - c.log(i)) < EPSILON)
        }
    })
})
