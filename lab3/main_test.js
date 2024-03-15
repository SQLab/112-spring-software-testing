const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("test exp function", () => {

    var cal = new Calculator(); 

    // parameterization for error case
    it("error results test", () => {

        const test_cases = [
            { x: NaN, error_msg: "unsupported operand type" },    // for unsupported operand type error
            { x: 55555555555555555, error_msg: "overflow" }       // for overflow error
        ]

        for(const test_case of test_cases){
            assert.throws(() => cal.exp(test_case.x), new Error(test_case.error_msg))
        }

    });

    // parameterization for normal case 
    it("non error results test", () => {

        const test_cases = [
            { x: 0, expected: Math.exp(0) },
            { x: -1, expected: Math.exp(-1)},
            { x: 25, expected: Math.exp(25)}
        ];
        
        for(const test_case of test_cases){
            assert.strictEqual(cal.exp(test_case.x), test_case.expected);
        }

    });

});

describe("test log function", () => {

    var cal = new Calculator(); 

    // parameterization for error case
    it("error results test", () => {

        const test_casess = [
            { x: Infinity, error_msg: "unsupported operand type" },  // for unsupported operand type error
            { x: 0, error_msg: "math domain error (1)" },            // for -Infinity error
            { x: -1, error_msg: "math domain error (2)" }            // for NaN error
        ]

        for(const test_case of test_casess){
            assert.throws(() => cal.log(test_case.x), new Error(test_case.error_msg));
        }

    });

    // parameterization for normal case 
    it("non error results test", () => {

        const test_cases = [
            { x: 1, expected: Math.log(1)},
            { x: 50, expected: Math.log(50)},
            { x: 100, expected: Math.log(100)}
        ]

        for(const test_case of test_cases){
            assert.strictEqual(cal.log(test_case.x), test_case.expected);
        }

    });

});

