const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe("Calculator Test", () => {

    const calculator = new Calculator();

    describe("exp Test", () => {
         
        it("Error Result Test", () => {
            const testcase = [
                {param: Infinity, expected: Error('unsupported operand type')},
                {param: Math.log(Number.MAX_VALUE) + 1, expected: Error('overflow')}
            ];
            testcase.forEach(({param, expected}) => {
                assert.throws(() => {
                    calculator.exp(param);
                }, {
                    name: expected.name,
                    message: expected.message
                });
            });
        });

        it("Non-Error Result Test", () => {
            const testcase = [
                {param: 0, expected: 1},
                {param: 1, expected: Math.exp(1)},
                {param: 2, expected: Math.exp(2)}
            ]
            testcase.forEach(({param, expected}) => {
                assert.strictEqual(calculator.exp(param), expected);
            });
        });
    });

    describe("log Test", () => {

        it("Error Result Test", () => {
            const testcase = [
                {param: Infinity, expected: Error('unsupported operand type')},
                {param: 0, expected: Error('math domain error (1)')},
                {param: -1, expected: Error('math domain error (2)')}
            ];
            testcase.forEach(({param, expected}) => {
                assert.throws(() => {
                    calculator.log(param);
                }, {
                    name: expected.name,
                    message: expected.message
                });
            });
        });

        it("Non-Error Result Test", () => {
            const testcase = [
                {param: 1, expected: 0},
                {param: Math.E, expected: 1},
                {param: Math.exp(2), expected: 2}
            ];
            testcase.forEach(({param, expected}) => {
                assert.strictEqual(calculator.log(param), expected);
            });
        });
    })
});