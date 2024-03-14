const {describe,it} = require('node:test');
const assert = require('assert');
const { Calculator } = require('./main');

describe("calculator exp test", () => {
    const cal = new Calculator();
    const x = 'a'
    assert.throws(()=>cal.exp(x),Error('unsupported operand type'));
    const y = 1000
    assert.throws(()=>cal.exp(y),Error(('overflow')));
    const z = 0
    assert.strictEqual(cal.exp(z),1);
});

describe("calculator log test",() => {
    const cal = new Calculator();
    const a = 'a'
    assert.throws(()=>cal.log(a),Error('unsupported operand type'));
    const b = 0
    assert.throws(()=>cal.log(b),Error('math domain error (1)'));
    const c = -1
    assert.throws(()=>cal.log(c),Error('math domain error (2)'));
    const d = 1
    assert.strictEqual(cal.log(d),0);
})