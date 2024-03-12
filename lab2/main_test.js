const fs = require("fs");
const test = require("node:test");
const assert = require("assert");

test.mock.method(fs, "readFile", (path, encoding, callback) => {
    callback(null, "Wilson\nTim\nMina");
});
const { Application, MailSystem } = require("./main");

test("MailSystem.write", () => {
    const mailsystem = new MailSystem();
    assert.strictEqual(mailsystem.write("emily"), 'Congrats, emily!');
    assert.strictEqual(mailsystem.write(true), 'Congrats, true!');
    assert.strictEqual(mailsystem.write(123), 'Congrats, 123!');
});

test("MailSystem.send", () => {
    const mailSystem = new MailSystem();
    const mock_fn = test.mock.fn(mailSystem.send);
    test.mock.method(Math, "random", () => 0.9);
    assert.strictEqual(mock_fn("send", "send_success"), true);
    test.mock.method(Math, "random", () => 0.1);
    assert.strictEqual(mock_fn("send", "send_fail"), false);
});

test("Application.getNames", async () => {
    const app = new Application();
    const names = await app.getNames();
    assert.deepEqual(names, [['Wilson', 'Tim', 'Mina'], []]);
});

test('Application', async (test) => {

    //test getRandomPerson
    const app1 = new Application();
    app1.people = ['Wilson', 'Tim', 'Mina'];

    test.mock.method(global.Math, 'random', () => 0);
    assert.deepEqual(app1.getRandomPerson(), 'Wilson');
    test.mock.method(global.Math, 'random', () => 0.6);
    assert.deepEqual(app1.getRandomPerson(), 'Tim');
    test.mock.method(global.Math, 'random', () => 0.9);
    assert.deepEqual(app1.getRandomPerson(), 'Mina');

    //test selectNextPerson
    const app2 = new Application();
    app2.people = ['Wilson', 'Tim', 'Mina'];
    app2.selected = ['Wilson'];
    let count = 0;
    test.mock.method(app2, 'getRandomPerson', () => {
        if (count == 0) {
            count++;
            return 'Wilson';
        } else if (count == 1) {
            count++;
            return 'Tim';
        }
        else {
            return 'Mina';
        }
    })
    assert.strictEqual(app2.selectNextPerson(), 'Tim');
    assert.deepStrictEqual(app2.selected, ['Wilson', 'Tim']);

    assert.strictEqual(app2.selectNextPerson(), 'Mina');
    assert.deepStrictEqual(app2.selected, ['Wilson', 'Tim', 'Mina'])

    assert.strictEqual(app2.selectNextPerson(), null);

    //test notifySelected  
    const app3 = new Application();
    app3.people = ['Wilson', 'Tim', 'Mina'];
    app3.selected = ['Wilson', 'Tim', 'Mina'];
    app3.mailSystem.send = test.mock.fn(app3.mailSystem.send);
    app3.mailSystem.write = test.mock.fn(app3.mailSystem.write);
    app3.notifySelected();
    assert.strictEqual(app3.mailSystem.send.mock.calls.length, 3);
    assert.strictEqual(app3.mailSystem.write.mock.calls.length, 3);
});