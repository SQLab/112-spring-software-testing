const {mock, test} = require('node:test');
const assert = require('assert');
const fs = require('fs');
mock.method(fs, 'readFile', (x, y, callback) => callback(null, 'Alice\nBob\nCarl'));
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary
test("Test MailSystem's write", (t) => {
    const log = t.mock.method(global.console, 'log');

    const mail_system = new MailSystem();

    const output = mail_system.write("test");
    assert.strictEqual(output, 'Congrats, test!');
    const call1 = log.mock.calls[0];
    assert.deepEqual(call1.arguments, ['--write mail for test--']);
});

test("Test MailSystem's send", (t) => {
    const log = t.mock.method(global.console, 'log');

    const fn = t.mock.method(global.Math, 'random', () => 0.1);
    const mail_system = new MailSystem();

    mail_system.send("test", "hi");
    const call1 = log.mock.calls[0];
    const call2 = log.mock.calls[1];
    assert.deepEqual(call1.arguments, ['--send mail to test--']);
    assert.deepEqual(call2.arguments, ['mail failed']);

    fn.mock.mockImplementationOnce(() => 0.9);
    mail_system.send("test", "hi");
    const call3 = log.mock.calls[2];
    const call4 = log.mock.calls[3];
    assert.deepEqual(call3.arguments, ['--send mail to test--']);
    assert.deepEqual(call4.arguments, ['mail sent']);
});

test("Test Application's getNames", async (t) => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.strictEqual(selected.length, 0)
    assert.deepEqual(people, ['Alice', 'Bob', 'Carl']);
    assert.deepEqual(app.people, ['Alice', 'Bob', 'Carl']);
});

test("Test Application's selectNextPerson", async (t) => {
    const random_vals = [0.1, 0.3, 0.5, 0.9];
    let i = 0;
    const fn = t.mock.method(global.Math, 'random', () => random_vals[i++]);
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Carl'];

    app.selectNextPerson();
    assert.deepEqual(app.selected, ['Alice']);
    app.selectNextPerson();
    assert.deepEqual(app.selected, ['Alice', 'Bob']);
    app.selectNextPerson();
    assert.deepEqual(app.selected, ['Alice', 'Bob', 'Carl']);
    app.selectNextPerson();
    assert.deepEqual(app.selected, ['Alice', 'Bob', 'Carl']);
});

test("Test Application's notifySelected", async (t) => {
    const fn = t.mock.method(global.Math, 'random', () => 0.1);
    
    const app = new Application();
    app.people = ['Alice', 'Bob', 'Carl'];
    const mocked_send = t.mock.method(app.mailSystem, 'send', (name, context) => true);

    app.selectNextPerson();
    app.notifySelected();
    assert.deepEqual(mocked_send.mock.calls[0].arguments, ['Alice', 'Congrats, Alice!']);
});