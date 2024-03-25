const {mock, test} = require('node:test');
const assert = require('assert');
const fs = require('fs');

mock.method(fs, 'readFile', (path, encoding, callback) => {
    callback(null, 'John\nDoe');
});

const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test('Test Application\'s getNames', async (t) => {
    let myApp = new Application();
    assert.deepEqual(await myApp.getNames(), [['John', 'Doe'], []]);
});

test('Test Application\'s getRandomPerson', async (t) => {
    let myApp = new Application();
    await new Promise((resolve) => { setTimeout(resolve, 1); });

    const floor = t.mock.method(Math, 'floor');
    const random = t.mock.method(Math, 'random');
    let length = myApp.people.length;

    for (let i = 0; i < length; i++) {
        Math.random.mock.mockImplementation(() => i / length);
        result = myApp.getRandomPerson();
        assert.strictEqual(myApp.people.includes(result), true);
        assert.strictEqual(result, myApp.people[i]);
    }
});

test('Test Application\'s selectNextPerson', async (t) => {
    myApp = new Application();
    await new Promise((resolve) => { setTimeout(resolve, 1); });

    for (let i = 0; i < myApp.people.length + 1; i++) {
        count = myApp.selected.length;
        result = myApp.selectNextPerson();

        if (count < myApp.people.length) {
            assert.strictEqual(myApp.selected.length, count + 1);
            assert.strictEqual(myApp.selected.includes(result), true);
        }
        else
        {
            assert.strictEqual(myApp.selected.length, count);
        }
    }
});

test('Test Application\'s notifySelected', async (t) => {
    myApp = new Application();
    await new Promise((resolve) => { setTimeout(resolve, 1); });
    myApp.selected = myApp.people;
    myApp.mailSystem = new MailSystem();

    const notifySelected = t.mock.method(myApp, 'notifySelected');
    const send = t.mock.method(myApp.mailSystem, 'send');
    const write = t.mock.method(myApp.mailSystem, 'write');

    assert.strictEqual(notifySelected.mock.calls.length, 0);
    assert.strictEqual(send.mock.calls.length, 0);
    assert.strictEqual(write.mock.calls.length, 0);

    myApp.notifySelected();
    assert.strictEqual(notifySelected.mock.callCount(), 1);
    assert.strictEqual(send.mock.calls.length, myApp.selected.length);
    assert.strictEqual(write.mock.calls.length, myApp.selected.length);
});

test('Test MailSystem\'s write', (t) => {
    myMailSystem = new MailSystem();
    assert.strictEqual(myMailSystem.write('John'), 'Congrats, John!');
});

test('Test MailSystem\'s send', (t) => {
    myMailSystem = new MailSystem();
    const random = t.mock.method(Math, 'random');
    assert.strictEqual(random.mock.callCount(), 0);

    Math.random.mock.mockImplementation(() => 0.6);
    result = myMailSystem.send(null, null);
    assert.strictEqual(random.mock.callCount(), 1);
    assert.strictEqual(result, true);

    Math.random.mock.mockImplementation(() => 0.4);
    result = myMailSystem.send(null, null);
    assert.strictEqual(random.mock.callCount(), 2);
    assert.strictEqual(result, false);
});