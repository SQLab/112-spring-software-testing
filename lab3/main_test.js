const {describe, it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

const test = require('node:test') ;
test ('exp', () => {
    const testcases = [
        { param : 0, expected : 1}, 
        { param : 1, expected : 2.718281828459045 },
        { param : 87, expected : 6.076030225056873e+37 }
    ] ;
    const testcases2 = [
        { param : Infinity, expected : 'unsupported operand type'},
        { param : 'a', expected : 'unsupported operand type'},
        { param : 10000000000000, expected : 'overflow'} ,
    ] ;
    let stub = test.mock.fn(Calculator.prototype.exp) ;
    for (const tc of testcases) {
        assert.strictEqual(stub.apply(this, [tc.param]), tc.expected) ;
    }
    for (const tc of testcases2) {
        assert.throws( () => {
            stub.apply(this, [tc.param])
        }, {
            name : 'Error',
            message : tc.expected
        })
    }
}) ;

test ('log', () => {
    const testcases = [
        { param : 1, expected : 0}, 
        { param : 2.718281828459045, expected : 1 },
        { param : 6.076030225056873e+37, expected : 87 }, 
        { param : 48763, expected : 10.794727107543425 }
    ] ;
    const testcases2 = [
        { param : Infinity, expected : 'unsupported operand type'},
        { param : 'a', expected : 'unsupported operand type'},
        { param : 0, expected : 'math domain error (1)'},
        { param : -1, expected : 'math domain error (2)'}
    ] ;
    let stub = test.mock.fn(Calculator.prototype.log) ;
    for (const tc of testcases) {
        assert.strictEqual(stub.apply(this, [tc.param]), tc.expected) ;
    }
    for (const tc of testcases2) {
        assert.throws( () => {
            stub.apply(this, [tc.param])
        }, {
            name : 'Error',
            message : tc.expected
        })
    }
}) ;