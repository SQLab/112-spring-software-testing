const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { promisify } = require('util');
const { Application, MailSystem } = require('./main');

const writeFile = promisify(fs.writeFile);

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('John');
    assert.strictEqual(context, 'Congrats, John!');
});

test("Test MailSystem's send", () => {
    const mailSystem = new MailSystem();

    // Stubbing Math.random to always return a value > 0.5
    const originalMathRandom = Math.random;
    Math.random = () => 0.6;
    const result = mailSystem.send('John', 'Test context');
    assert.strictEqual(result, true);

    // Stubbing Math.random to always return a value < 0.5
    Math.random = () => 0.4;
    const result2 = mailSystem.send('John', 'Test context');
    assert.strictEqual(result2, false);

    // Restore the original Math.random
    Math.random = originalMathRandom;
});

test("Test Application's getNames with a fake file", async () => {
    const fakeData = 'John\nJane\nDoe\nSmith';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['John', 'Jane', 'Doe', 'Smith']);
    assert.deepStrictEqual(selected, []);

    fs.unlinkSync(fakeFile);
});

test("Test Application's getRandomPerson", async () => {
    const fakeData = 'John\nJane\nDoe\nSmith';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['John', 'Jane', 'Doe', 'Smith']);
    assert.deepStrictEqual(selected, []);

    // See if the random person is in the list
    const person = application.getRandomPerson();
    assert.ok(application.people.includes(person));

    fs.unlinkSync(fakeFile);
});

test("Test Application's selectNextPerson", async () => {
    const fakeData = 'John\nJane';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['John', 'Jane']);
    assert.deepStrictEqual(selected, []);

    // Stubbing getRandomPerson method to return a predictable value
    application.getRandomPerson = () => 'John';

    // Select the first person
    let person = application.selectNextPerson();
    assert.strictEqual(person, 'John');
    assert.deepStrictEqual(application.selected, ['John']);

    // Select the next person
    application.getRandomPerson = () => 'Jane';
    person = application.selectNextPerson();
    assert.strictEqual(person, 'Jane');
    assert.deepStrictEqual(application.selected, ['John', 'Jane']);

    // All people are selected
    person = application.selectNextPerson();
    assert.strictEqual(person, null);
    assert.deepStrictEqual(application.selected, ['John', 'Jane']);

    let cnt = 0;
    application.getRandomPerson = () => {
        if (cnt++ % 2 === 0) {
            return 'John';
        } else {
            return 'Jane';
        }
    }
    application.selected = ['John'];
    person = application.selectNextPerson();
    assert.strictEqual(person, 'Jane');
    assert.deepStrictEqual(application.selected, ['John', 'Jane']);
    
    fs.unlinkSync(fakeFile);
});

test("Test Application's notifySelected", async () => {
    const fakeData = 'John\nJane\nDoe\nSmith';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['John', 'Jane', 'Doe', 'Smith']);
    assert.deepStrictEqual(selected, []);

    // Create a spy for the MailSystem's write and send methods
    const mailSystemSpy = {
        write: test.mock.fn(MailSystem.prototype.write),
        send: test.mock.fn(MailSystem.prototype.send)
    };
    application.mailSystem = mailSystemSpy;
    application.selected = ['John', 'Jane', 'Doe'];

    application.notifySelected();

    // Ensure that write and send methods are called for each selected person
    assert.strictEqual(mailSystemSpy.write.mock.callCount(), 3);
    assert.strictEqual(mailSystemSpy.send.mock.callCount(), 3);

    assert.deepStrictEqual(mailSystemSpy.write.mock.calls.map(call => call.arguments[0]), ['John', 'Jane', 'Doe']);
    assert.deepStrictEqual(mailSystemSpy.send.mock.calls.map(call => call.arguments[0]), ['John', 'Jane', 'Doe']);

    fs.unlinkSync(fakeFile);
});