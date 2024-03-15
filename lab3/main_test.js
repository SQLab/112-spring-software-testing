const { describe, it, test } = require("node:test");
const assert = require("assert");
const { Calculator } = require("./main");

test("Test Calculator's exp", () => {
    const cal = new Calculator();
    const testcases = [
        { param : 87, expected : 6.076030225056873e+37 },
        { param :  0, expected : 1                     },
        { param : -1, expected : 0.36787944117144233   }
    ];
    for( const tc of testcases ) {
        assert.strictEqual(cal.exp(tc.param), tc.expected);
    }
});

test("Test Calculator's exp's Error('unsupported operand type')", () => {
    const cal = new Calculator();
    const testcases = [
        { param :  Infinity, name : "Error", message : "unsupported operand type" },
        { param : -Infinity, name : "Error", message : "unsupported operand type" },
        { param :       NaN, name : "Error", message : "unsupported operand type" },
        { param :     "aaa", name : "Error", message : "unsupported operand type" },
        { param : undefined, name : "Error", message : "unsupported operand type" }
    ];
    for( const tc of testcases ) {
        assert.throws(() => cal.exp(tc.param), {
            name    : tc.name,
            message : tc.message
        });
    }
});

test("Test Calculator's exp's Error('overflow')", () => {
    const cal = new Calculator();
    const testcases = [
        { param : 1337, name : "Error", message : "overflow" }
   ];
    for( const tc of testcases ) {
        assert.throws(() => cal.exp(tc.param), {
            name    : tc.name,
            message : tc.message
        });
    }
});

test("Test Calculator's log", () => {
    const cal = new Calculator();
    const testcases = [
        { param : 48763, expected : 10.794727107543425  },
        { param :     2, expected :  0.6931471805599453 },
        { param :     1, expected :  0                  }
    ];
    for( const tc of testcases ) {
        assert.strictEqual(cal.log(tc.param), tc.expected);
    }
});

test("Test Calculator's log's Error('unsupported operand type')", () => {
     const cal = new Calculator();                                                       
     const testcases = [
         { param :  Infinity, name : "Error", message : "unsupported operand type" },
         { param : -Infinity, name : "Error", message : "unsupported operand type" },
         { param :       NaN, name : "Error", message : "unsupported operand type" },
         { param :     "aaa", name : "Error", message : "unsupported operand type" },
         { param : undefined, name : "Error", message : "unsupported operand type" }
     ];
     for( const tc of testcases ) {
         assert.throws(() => cal.log(tc.param), {
             name    : tc.name,
             message : tc.message
         });
     }
});

test("Test Calculator's log's Error('math domain error (1)')", () => {
    const cal = new Calculator();
    const testcases = [
        { param : 0, name : "Error", message : "math domain error (1)" }
   ];
    for( const tc of testcases ) {
        assert.throws(() => cal.log(tc.param), {
            name    : tc.name,
            message : tc.message
        });
    }
});

test("Test Calculator's log's Error('math domain error (2)')", () => {
    const cal = new Calculator();
    const testcases = [
        { param : -1, name : "Error", message : "math domain error (2)" }
   ];
    for( const tc of testcases ) {
        assert.throws(() => cal.log(tc.param), {
            name    : tc.name,
            message : tc.message
        });
    }
});




