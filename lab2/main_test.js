const test = require('node:test');
const assert = require('assert');

const fs = require('fs');
test.mock.method(fs, 'readFile', (path, encoding, callback) => { // Mocking the fs.readFile method
    callback(null, 'Alice\nBob\nCharlie');
});

const { Application, MailSystem } = require('./main'); //先導入fs.readFile的mock再導入main.js

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('name');
    assert.strictEqual(context, 'Congrats, name!');
});

test("Test MailSystem's send", () => {
    const mailSystem = new MailSystem();
    const out = mailSystem.send('name', 'Congrats, name!');
    assert.ok(out === true || out === false);

    test.mock.method(Math, 'random', () => 0.99);
    assert.strictEqual(mailSystem.send('name'), true);

    test.mock.method(Math, 'random', () => 0);
    assert.strictEqual(mailSystem.send('name'), false);

    test.mock.restoreAll(); // reset mock
});


test("Test Application's getNames", async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, ['Alice', 'Bob', 'Charlie']);
    assert.deepStrictEqual(selected, []);
    
});

test("Test Application's getRandomPerson", async () => {

    test.mock.method(Application.prototype, "getNames", async () => [
        ['Alice', 'Bob', 'Charlie'],
        []
    ]);
    const application = new Application();
    const [people, selected] = await application.getNames();
    const randomPerson = application.getRandomPerson();
    assert.ok(people.includes(randomPerson));

    test.mock.method(Math, "random", () => 0.3);
    assert.strictEqual(application.getRandomPerson(), 'Alice');

    test.mock.method(Math, "random", () => 0.6);
    assert.strictEqual(application.getRandomPerson(), 'Bob');

    test.mock.method(Math, "random", () => 0.9);
    assert.strictEqual(application.getRandomPerson(), 'Charlie');

    test.mock.restoreAll();
});

test("Test Application's selectNextPerson", async () => {
    const application = new Application();
    application.people = ['Alice', 'Bob', 'Charlie'];
    application.selected = [];
    let index = 0;

    test.mock.method(Application.prototype, "getRandomPerson", () => {
        return application.people[index++ % application.people.length];
    });

    const selectedPerson = application.selectNextPerson();
    assert.ok(application.people.includes(selectedPerson));
    
    application.selected = ['Alice', 'Bob'];
    const selectedPerson2 = application.selectNextPerson();
    assert.strictEqual(selectedPerson2, 'Charlie');

    const selectedPerson3 = application.selectNextPerson();
    assert.strictEqual(selectedPerson3, null);

    test.mock.restoreAll();
});

test("Application.notifySelected", async () => {
    
    const application = new Application();
    test.mock.method(MailSystem.prototype, "send"); // 使用原本的send方法觀察呼叫次數

    application.people = ['Alice', 'Bob', 'Charlie'];
    application.selected = ['Alice'];
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, 1); //send to Alice

    application.selected = ['Bob', 'Charlie'];
    application.notifySelected();
    assert.strictEqual(application.mailSystem.send.mock.calls.length, (1+2)); //send to Bob and Charlie

    test.mock.restoreAll();
});