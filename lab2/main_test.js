const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (path, options, callback) => callback(null, 'John\nDoe'));
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test('getNames should read names from file and return people and selected arrays', async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['John', 'Doe']);
    assert.deepStrictEqual(selected, []);
});

test('getRandomPerson should return a random person from the list', () => {
    const app = new Application();
    app.people = ['John', 'Doe', 'Jane'];

    test.mock.method(Math, 'random', () => 0);

    const selected = app.getRandomPerson();
    assert.strictEqual(selected, 'John');
});


test('selectNextPerson should handle when all people are selected', () => {
    const app = new Application();
    app.people = ['John'];
    app.selected = ['John'];

    const selected = app.selectNextPerson();
    assert.strictEqual(selected, null);
});

test('selectNextPerson call getRandomPerson twice', () => {
    const app = new Application();
    app.people = ['John', 'Doe', 'Jane'];
    app.selected = ['John'];

    //第一次 call random 回傳 0，第二次 call 回傳 0.5
    const randomMock = test.mock.method(Math, 'random', () => 0.5);
    randomMock.mock.mockImplementationOnce(() => 0);

    const selected = app.selectNextPerson();
    assert.strictEqual(selected, 'Doe');
});

test('notifySelected should send mail to all selected people', () => {
    const app = new Application();
    app.selected = ['John', 'Doe'];

    test.mock.method(app.mailSystem, 'write', (name) => `Congratulations, ${name}!`);
    test.mock.method(app.mailSystem, 'send', (name, context) => true);

    app.notifySelected();
    assert.equal(app.mailSystem.write.mock.calls.length, 2);
    assert.equal(app.mailSystem.send.mock.calls.length, 2);

    const call1 = app.mailSystem.send.mock.calls[0];
    const call2 = app.mailSystem.send.mock.calls[1];
    assert.deepEqual(call1.arguments, ['John', 'Congratulations, John!']);
    assert.deepEqual(call2.arguments, ['Doe', 'Congratulations, Doe!']);
});

test('MailSystem write should return mail context for the given name', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('Alice');
    assert.strictEqual(context, 'Congrats, Alice!');
});

test('MailSystem send randomly succeed or fail to send mail', () => {
    const mailSystem = new MailSystem();

    // fail
    test.mock.method(Math, 'random', () => 0);
    const result1 = mailSystem.send('Alice', 'Message');
    assert(result1 === false);

    // success
    test.mock.method(Math, 'random', () => 1);
    const result2 = mailSystem.send('Alice', 'Message');
    assert(result2 === true);
});
