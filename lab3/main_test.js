const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe('Test the class `Caluculator`', () => {
    describe('Test exp(x)', () => {
        it('should throw errors', () => {
            const instance = new Calculator();
            const testcases = [
                {param: [Infinity], expected: {name: 'Error', message: 'unsupported operand type'}},
                {param: [1e+10], expected: {name: 'Error', message: 'overflow'}},
            ];
            for (const tc of testcases) {
                assert.throws(() => {instance.exp.apply(this, tc.param);}, tc.expected);
            }
        });
        it('should throw no error', () => {
            const instance = new Calculator();
            const testcases = [
                {param: [0], expected: 1},
                {param: [1], expected: 2.718281828459045},
                {param: [-1], expected: 0.36787944117144233},
            ];
            for (const tc of testcases) {
                assert.strictEqual(instance.exp.apply(this, tc.param), tc.expected);
            }
        });
    });

    describe('Test log(x)', () => {
        it('should throw errors', () => {
            const instance = new Calculator();
            const testcases = [
                {param: [Infinity], expected: {name: 'Error', message: 'unsupported operand type'}},
                {param: [0], expected: {name: 'Error', message: 'math domain error (1)'}},
                {param: [-1], expected: {name: 'Error', message: 'math domain error (2)'}}
            ];
            for (const tc of testcases) {
                assert.throws(() => {instance.log.apply(this, tc.param);}, tc.expected);
            }
        });
        it('should throw no error', () => {
            const instance = new Calculator();
            const testcases = [
                {param: [1], expected: 0},
                {param: [2.718281828459045], expected: 1},
                {param: [0.36787944117144233], expected: -1},
            ];
            for (const tc of testcases) {
                assert.strictEqual(instance.log.apply(this, tc.param), tc.expected);
            }
        });
    });
}); 