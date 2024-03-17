const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

// 使用 describe 定義一組關於 Calculator 的 Test
describe('Calculator', () => {
    // exp function 的 Test
    describe('exp', () => {
        // 使用 it 定義一個測試案例：應該返回給定數字的指數
        it('should return the exponential of a given number', () => {
            const calculator = new Calculator();
            const testcase = [
                { param: 1, expected: Math.exp(1) },
                { param: 0, expected: Math.exp(0) },
                { param: -1, expected: Math.exp(-1) },
            ]
            // 使用 for 迴圈依序執行測試案例
            for(const {param, expected} of testcase) {
                assert.strictEqual(calculator.exp(param), expected);
            }
        });

        // 當給定的數字不是有限的或結果為無窮大時，應該throw error
        it('should throw an error when the given number is not finite or the result is infinity', () => {
            const calculator = new Calculator();
            const testcase = [
                { param: NaN, expected: 'unsupported operand type' },
                { param: Infinity, expected: 'unsupported operand type' },
                { param: 1e4, expected: 'overflow' },
            ]
            for(const {param, expected} of testcase) {
                assert.throws(() => calculator.exp(param), { message: expected });
            }
        });
    });

    // 使用 describe 定義一組關於 log 的 Test
    describe('log', () => {
        // 使用 it 定義一個測試案例：應該返回給定數字的自然對數
        it('should return the natural logarithm of a given number', () => {
            const calculator = new Calculator();
            const testcase = [
                { param: 1, expected: Math.log(1) },
                { param: Math.E, expected: Math.log(Math.E) },
                { param: 10, expected: Math.log(10) },
            ]
            for(const {param, expected} of testcase) {
                assert.strictEqual(calculator.log(param), expected);
            }
        });

        // 當給定的數字不是有限的或結果為 -Infinity 或 NaN 時，應該拋出錯誤
        it('should throw an error when the given number is not finite or the result is -Infinity or NaN', () => {
            const calculator = new Calculator();
            const testcase = [
                { param: NaN, expected: 'unsupported operand type' },
                { param: Infinity, expected: 'unsupported operand type' },
                { param: 0, expected: 'math domain error (1)' },
                { param: -1, expected: 'math domain error (2)' },
            ]
            for(const {param, expected} of testcase) {
                assert.throws(() => calculator.log(param), { message: expected });
            }
        });
    });
});