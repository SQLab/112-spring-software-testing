const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test("Test MailSystem's write", (t) => {
    const sys = new MailSystem();
    const ret = sys.write('Wayne');
    assert.strictEqual(ret, 'Congrats, Wayne!');
});

function unlink() {
    return new Promise((resolve) => {
        fs.unlink(filePath, resolve);
    });
}

test("Test MailSystem's send", (t) => {
    const sys = new MailSystem();

    t.mock.method(Math, 'random', () => 0.75);
    const ret1 = sys.send('Wayne', 'xxx');
    assert.strictEqual(ret1, true);

    t.mock.method(Math, 'random', () => 0.25);
    const ret2 = sys.send('Wayne', 'xxx');
    assert.strictEqual(ret2, false);
});

const fs = require('fs');
const filePath = 'name_list.txt';

function writeFile(content) {
    return new Promise((resolve) => {
        fs.writeFile(filePath, content, resolve);
    });
}

test('Test Application\'s getNames', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('Wayne\nJay');

    let app = new Application();
    await fn('Wayne\nJay');

    assert.deepEqual(await app.getNames(), [['Wayne', 'Jay'], []]);
    await unlink();
});

test('Test Application\'s getRandomPerson', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('Wayne\n');

    let app = new Application();
    app.people = ['Wayne'];

    let person = app.getRandomPerson();

    assert.strictEqual(person, 'Wayne');
    await unlink();
});

test('Test Application\'s selectNextPerson', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('Wayne\n');

    let app = new Application();
    app.people = ['a', 'b', 'c', 'd', 'e'];

    let current = 0;
    t.mock.method(Math, 'random', () => {
        current += 0.01;
        return current - 0.01;
    });

    for (let i = 0; i < 5; i++) {
        let person = app.selectNextPerson();
        assert.strictEqual(person, app.people[i]);
    }
    let person = app.selectNextPerson();
    assert.strictEqual(person, null);
    await unlink();
});

test('Test Application\'s selectNextPerson', async (t) => {
    const fn = t.mock.fn(writeFile);
    await fn('Wayne\n');

    let app = new Application();
    app.people = ['a', 'b', 'c', 'd', 'e'];

    app.notifySelected();
    app.selectNextPerson();
    app.notifySelected();

    await unlink();
});
