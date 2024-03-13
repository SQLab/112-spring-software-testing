const {mock, test} = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

const fs = require('fs');
const filePath = 'name_list.txt';

function writeFile(content) {
    return new Promise((resolve) => {
        fs.writeFile(filePath, content, resolve);
    });
}

function unlink() {
    return new Promise((resolve) => {
        fs.unlink(filePath, resolve);
    });
}

test('Test Application\'s getNames', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('John\nDoe');

    let myApp = new Application();
    await fn('John\nDoe');
    assert.deepEqual(await myApp.getNames(), [['John', 'Doe'], []]);

    fn.mock.mockImplementation(unlink);
    await fn();
});

test('Test Application\'s getRandomPerson', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('John\nDoe');
    let myApp = new Application();
    myApp.people = ['John', 'Doe'];

    const floor = t.mock.method(Math, 'floor');
    const random = t.mock.method(Math, 'random');
    assert.strictEqual(floor.mock.callCount(), 0);
    assert.strictEqual(random.mock.callCount(), 0);

    for (let i = 0; i < 20; i++) {
        result = myApp.getRandomPerson();
        assert.strictEqual(floor.mock.callCount(), i + 1);
        assert.strictEqual(random.mock.callCount(), i + 1);

        resultIndex = floor.mock.calls[i].result;
        assert.strictEqual(myApp.people.includes(result), true);
        assert.strictEqual(myApp.people[resultIndex], result);
    }
    fn.mock.mockImplementation(unlink);
    await fn();
});

test('Test Application\'s selectNextPerson', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('John\nDoe');
    myApp = new Application();
    myApp.people = ['John', 'Doe', 'Amy', 'Mark', 'Jane'];

    for (let i = 0; i < myApp.people.length + 1; i++) {
        count = myApp.selected.length;
        result = myApp.selectNextPerson();

        if (count < myApp.people.length) {
            assert.strictEqual(myApp.selected.length, count + 1);
        }
        else
        {
            assert.strictEqual(myApp.selected.length, count);
        }
    }
    fn.mock.mockImplementation(unlink);
    await fn();
});

test('Test Application\'s notifySelected', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('John\nDoe');
    myApp = new Application();
    myApp.selected = ['John', 'Doe', 'Amy', 'Mark', 'Jane'];
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

    fn.mock.mockImplementation(unlink);
    await fn();
});

test('Test MailSystem\'s write', (t) => {
    myMailSystem = new MailSystem();
    assert.strictEqual(myMailSystem.write('John'), 'Congrats, John!');
});

test('Test MailSystem\'s send', (t) => {
    myMailSystem = new MailSystem();
    const random = t.mock.method(Math, 'random');
    assert.strictEqual(random.mock.callCount(), 0);

    for (let i = 0; i < 20; i++) {
        result = myMailSystem.send(null, null);
        assert.strictEqual(random.mock.callCount(), i + 1);
        
        const call = random.mock.calls[i];
        assert.strictEqual(result, call.result > 0.5);
    }
});