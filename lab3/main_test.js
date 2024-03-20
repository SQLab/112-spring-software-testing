const {describe, it, before, test} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here

describe('Calculator', () => {
    var calculator;
    
    before(() => {
        calculator = new Calculator();
    })

    it('exp', async (t) => {
        // test infinity input
        await t.test('unsupported operand type Error', () => {
            const inputList = [Infinity, -Infinity];
            const error = {
                name: 'Error',
                message: 'unsupported operand type'
            }
            for(var num of inputList){
                const testFunction = () => calculator.exp(num);
                assert.throws(testFunction,error);
            }
        })
    
        await t.test('overflow Error', () => {
            const inputList = [800, 900, 1000]
            const error = {
                name: 'Error',
                message: 'overflow'
            }
            for(var num of inputList){
                const testFunction = () => calculator.exp(num);
                assert.throws(testFunction,error);
            }
        })
        // normal case
        await t.test('normal case', () => {
            const input = [1, 2, 3, 4, 5];
            for(var num of input){
                const result = calculator.exp(num);
                assert.strictEqual(result, Math.exp(num));
            }
        })
    });

    it('log', async (t) => {
        await t.test('unsupported operand type Error', () => {
            // test infinity input
            // using Object to check the error message
            const testFunction = () => calculator.log(Infinity);
            const error = {
                name: 'Error',
                message: 'unsupported operand type'
            }
            assert.throws(testFunction,error);
        })

        await t.test('math domain error (1) Error', () => {
            // test infinity input
            // using Object to check the error message
            const testFunction = () => calculator.log(0);
            const error = {
                name: 'Error',
                message: 'math domain error (1)'
            }
            assert.throws(testFunction,error);
        })

        await t.test('math domain error (2) Error', () => {
            // test infinity input
            // pass negative number or zero
            var parameter = [-1, -2, -3, -4]
            
            const error = {
                name: 'Error',
                message: 'math domain error (2)'
            }
            for(let input of parameter){
                var testFunction = () => calculator.log(input);
                assert.throws(testFunction, error);
            }
        })

        await t.test('normal case', () => {
            // normal case
            var result = calculator.log(1);
            assert.strictEqual(result, Math.log(1));
        })

        // t.test('math domain error (2) Error', () => {
        //     // test infinity input
        //     const testFunction = () => calculator.log(0);
        //     const error = {
        //         name: 'Error',
        //         message: 'math domain error (2)'
        //     }
        //     assert.throws(testFunction,error);
        // })

    });
})