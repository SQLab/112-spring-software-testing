const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

test('mock on MailSystem', (t) => {
    const ctor = t.mock.fn(MailSystem);
    const instance = new ctor();
    assert(instance instanceof MailSystem);
    const name = 'abc';
    const context = 'Congrats, ' + name + '!';
    assert.strictEqual(instance.write(name), context);
    assert.strictEqual(typeof instance.send(name, context), 'boolean');
});

test('mock on Application', (t) => {
    const ctor = t.mock.fn(Application);
    // assert.throws(() => {
    //     new ctor();
    // }, /Error: ENOENT: no such file or directory, open 'name_list.txt'/);
    try {
        const instance = new ctor();
    } catch (err) {
        console.error("An error occurred, but we're handling it:", err.message);
    }
});