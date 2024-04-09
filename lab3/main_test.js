const {describe, it, before, beforeEach, after, afterEach, mock} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

// TODO: write your tests here
describe('Calculator.exp', ()=>{
    const calculator = new Calculator();
    const inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    beforeEach(()=>{
        mock.restoreAll();
    })

    it('testing not number or infinity input', (t)=>{
        const oppErr = new Error('unsupported operand type');
        t.mock.method(Number, "isFinite", (val)=> false )
        inputs.forEach(e=>{
            assert.throws(()=>{calculator.exp(e)}, oppErr)
        })
    })

    it('testing infinity result', (t)=>{
        const overflowErr = new Error('overflow');
        t.mock.method(Math, "exp", (val)=> Infinity )
        inputs.forEach(e=>{
            assert.throws(()=>{calculator.exp(e)}, overflowErr)
        })
    })

    it('testing normal input', (t)=>{
        inputs.forEach(e=>{
            t.mock.method(Math, "exp", (val)=> e )
            assert.equal(calculator.exp(e), e);
        })
    })
})

describe('Calculator.log', ()=>{
    const calculator = new Calculator();
    const inputs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    beforeEach(()=>{
        mock.restoreAll();
    })

    it('testing not number or infinity input', (t)=>{
        const oppErr = new Error('unsupported operand type');
        t.mock.method(Number, "isFinite", (val)=> false )
        inputs.forEach(e=>{
            assert.throws(()=>{calculator.log(e)}, oppErr)
        })
    })

    it('testing negative infinity result', (t)=>{
        const domainErr1 = new Error('math domain error (1)');
        t.mock.method(Math, "log", (val)=> -Infinity )
        inputs.forEach(e=>{
            assert.throws(()=>{calculator.log(e)}, domainErr1)
        })
    })

    it('testing negative infinity result', (t)=>{
        const domainErr2 = new Error('math domain error (2)');
        t.mock.method(Number, "isNaN", (val)=> -true )
        inputs.forEach(e=>{
            assert.throws(()=>{calculator.log(e)}, domainErr2)
        })
    })

    it('testing normal input', (t)=>{
        inputs.forEach(e=>{
            t.mock.method(Math, "log", (val)=> e )
            assert.equal(calculator.log(e), e);
        })
    })
})
