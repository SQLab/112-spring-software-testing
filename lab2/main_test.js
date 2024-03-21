const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

test.mock.method(fs, 'readFile', (path, options, callback) => callback(null, 'John\nMary'));

const { Application, MailSystem } = require('./main');

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const result = mailSystem.write('John');
    assert.strictEqual(result, 'Congrats, John!');
});

test("Test MailSystem's send", () => {
    const mailSystem = new MailSystem();
    
    // success
    test.mock.method(Math, 'random', () => 0.6);
    let result = mailSystem.send('John', 'Congrats, John!');
    assert.strictEqual(result, true);

    // failure
    test.mock.method(Math, 'random', () => 0.4);
    result = mailSystem.send('John', 'Congrats, John!');
    assert.strictEqual(result, false);
});

test("Test Application's getNames", async () => {
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['John', 'Mary']);
    assert.deepStrictEqual(selected, []);
});

test("Test Application's getRandomPerson", () => {
    const app = new Application();
    app.people = ['John', 'Mary'];

    test.mock.method(Math, 'random', () => 0.6);
    let person = app.getRandomPerson();
    assert.strictEqual(person, 'Mary');

    test.mock.method(Math, 'random', () => 0.4);
    person = app.getRandomPerson();
    assert.strictEqual(person, 'John');
});

test("Test Application's selectNextPerson", () => {
    const app = new Application();

    // all selected
    app.people = ['John', 'Mary'];
    app.selected = ['John', 'Mary'];
    let person = app.selectNextPerson();
    assert.strictEqual(person, null);

    const mockRandom = test.mock.fn(() => 0.4);

    // always select John for 2 times, then select Mary
    test.mock.method(Math, 'random', () => {
        if (mockRandom.mock.calls.length < 2) {
            return mockRandom();
        }
        return 0.6;
    });

    app.selected = [];
    person = app.selectNextPerson();
    assert.strictEqual(person, 'John');

    person = app.selectNextPerson();
    assert.strictEqual(person, 'Mary');
    assert.deepStrictEqual(app.selected, ['John', 'Mary']);
});

test("Test Application's notifySelected", () => {
    const app = new Application();
    app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    app.mailSystem.send = test.mock.fn(() => true);

    app.selected = ['John', 'Mary'];
    app.notifySelected();

    // check calls
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);

    // check arguments
    assert.strictEqual(app.mailSystem.write.mock.calls[0].arguments[0], 'John');
    assert.strictEqual(app.mailSystem.write.mock.calls[1].arguments[0], 'Mary');
    assert.strictEqual(app.mailSystem.send.mock.calls[0].arguments[0], 'John');
    assert.strictEqual(app.mailSystem.send.mock.calls[1].arguments[0], 'Mary');
});
