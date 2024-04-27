const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { promisify } = require('util');
const { Application, MailSystem } = require('./main');

const writeFile = promisify(fs.writeFile);

//test.mock.method(fs, 'readFile', async (file, encoding) => {

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('a');
    assert.strictEqual(context, 'Congrats, a!');
});

test("Test MailSystem's send", () => {
    const mailSystem = new MailSystem();
    const originalMathRandom = Math.random;
    Math.random = () => 0.51;
    const result = mailSystem.send('SUNGOD', 'Test context');
    assert.strictEqual(result, true);
    Math.random = () => 0.49;
    const result2 = mailSystem.send('SUNGOD', 'Test context');
    assert.strictEqual(result2, false);
    Math.random = originalMathRandom;
});

test("Test Application's getRandom&selectNextPerson", async () => {
    const fakeData = 'John\nJane';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const application = new Application();
    const [people, selected] = await application.getNames();

    assert.deepStrictEqual(people, ['John', 'Jane']);
    assert.deepStrictEqual(selected, []);

    const rd_person = application.getRandomPerson();
    assert.ok(people.includes(rd_person));

    application.getRandomPerson = () => 'John';
    let person = application.selectNextPerson();
    assert.deepStrictEqual(application.selected, ['John']);

    // Select the next person
    application.getRandomPerson = () => 'Jane';
    person = application.selectNextPerson();
    assert.deepStrictEqual(application.selected, ['John', 'Jane']);

    // All people are selected
    person = application.selectNextPerson();
    assert.strictEqual(person, null);

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
