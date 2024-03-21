const {describe, it} = require('node:test');
const assert = require('node:assert');
const { Calculator } = require('./main');


describe('Test Calculator.exp', () => {
    const calculator = new Calculator();

    it('should throw error if input is not finite', () => {
        const err = new Error('unsupported operand type');
        
        // test inputs should all produce error: unsupported operand type
        const testcases = [
            { input: [Infinity], expected: err },
            { input: [-Infinity], expected: err },
            { input: [Number.NaN], expected: err },
            { input: ['string'], expected: err },
        ];

        /**
         * Test Notes:
         * assert.throws() - fn should be a function name, not calling the function and throwing an error directly
         */

        // expect the arrow function calling the class method exp() to throw error
        for (const tc of testcases) {
            assert.throws(() => calculator.exp.apply(this, tc.input), tc.expected);
        }
    });

    it('should throw error if result is Infinity', () => {
        const err = new Error('overflow');

        // test inputs should all produce error: overflow
        const testcases = [
            { input: [Math.pow(10, 308)], expected: err },
            { input: [Math.pow(10, 100)], expected: err },
            { input: [1000], expected: err },
        ];

        for (const tc of testcases) {
            assert.throws(() => calculator.exp.apply(this, tc.input), tc.expected);
        }
    });

    it('should not throw any error', () => {
        
        // test inputs should not produce any error and return calculated value
        const testcases = [
            { input: [0], expected: 1 },
            { input: [1], expected: 2.718281828459045 },
            { input: [-1], expected: 0.36787944117144233},    
        ];

        for (const tc of testcases) {
            assert.strictEqual(calculator.exp.apply(this, tc.input), tc.expected);
        }
    });
});

describe('Tetst Calculator.log', () => {
    const calculator = new Calculator();
    
    it('should throw error if input is not finite', () => {
        
        // using regex to match the error message
        const err = /^Error: unsupported operand type$/;
        
        // test inputs should all produce error: unsupported operand type
        const testcases = [
            { input: [Infinity+1], expected: err },
            { input: [-Infinity+1], expected: err },
            { input: [Number.NaN], expected: err },
            { input: ['string'], expected: err },
        ];

        for (const tc of testcases) {
            assert.throws(() => calculator.log.apply(this, tc.input), tc.expected);
        }
    });

    it('should throw error if result is -Infinity', () => {
        const err = new Error('math domain error (1)');

        // test input should all produce error: math domain error (1)
        const testcases = [
            { input: [0], expected: err },
        ];

        for (const tc of testcases) {
            assert.throws(() => calculator.log.apply(this, tc.input), tc.expected);
        }
    });

    it('should throw error if result is NaN', () => {
        const err = new Error('math domain error (2)');

        // test input should all produce error: math domain error (2)
        const testcases = [
            { input: [-1], expected: err },
            { input: [Math.pow(10, 308) * -1], expected: err },
            { input: [-Number.MAX_VALUE], expected: err },
        ];

        for (const tc of testcases) {
            assert.throws(() => calculator.log.apply(this, tc.input), tc.expected);
        }
    });

    it('should not throw any error', () => {
        
        // test inputs should not produce any error and return calculated value
        const testcases = [
            { input: [1], expected: 0 },
            { input: [Number.MAX_VALUE], expected: 709.782712893384 },
            { input: [Number.MIN_VALUE], expected: -744.4400719213812 },
            { input: [Math.E], expected: 1 },
            { input: [2.718281828459044], expected: 0.9999999999999996 },
        ];

        for (const tc of testcases) {
            assert.strictEqual(calculator.log.apply(this, tc.input), tc.expected);
        }
    });
});

/**
 * Test Question:
 * how to choose the test inputs to cover the wide variety of cases (including edge cases)?
 * can we use 3rd party libraries in test cases (e.g., Math.exp())?
 */
