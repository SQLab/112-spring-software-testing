const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const { promisify } = require('util');
const { Application, MailSystem } = require('./main');

const writeFile = promisify(fs.writeFile);

test("Test Application's getRandomPerson", async() => {
    const fakeData = 'Alex\nAlbert\nTuna';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Alex', 'Albert', 'Tuna']);
    assert.deepStrictEqual(selected, []);

    const person = await app.getRandomPerson();
    assert.ok(app.people.includes(person));

    //fs.unlinkSync(fakeFile);
});

test("Test MailSystem's write", () => {
    const mailSystem = new MailSystem();
    const testName = 'Alex';
    const context = mailSystem.write(testName);
    assert.strictEqual(context, 'Congrats, Alex!');
});

test("Test MailSystem's send", () => {
    const mailSystem = new MailSystem();

    const originalRandom = Math.random;
    Math.random = () => 0.7;

    let success = mailSystem.send('Alex', 'Congratulations!');
    assert.strictEqual(success, true);

    Math.random = () => 0.3;

    success = mailSystem.send('Albert', 'Congratulations!');
    assert.strictEqual(success, false);

    Math.random = originalRandom;
});


test("Test Application's selectNextPerson", async () => {
    const fakeData = 'Alex\nAlbert\nTuna';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Alex', 'Albert', 'Tuna']);
    assert.deepStrictEqual(selected, []);

    app.selected = ['Alex', 'Albert', 'Tuna'];
    const allSelected = app.selectNextPerson();
    assert.strictEqual(allSelected, null);
    assert.strictEqual(app.selected.length, people.length);

    app.selected = [];
    while (app.selected.length < people.length) {
        const person = app.selectNextPerson();
        assert.ok(app.people.includes(person));
    }
    assert.strictEqual(app.selected.length, people.length);
    assert.strictEqual(app.selectNextPerson(), null);

    app.selected = ['Alex'];
    const person1 = app.selectNextPerson();
    assert.ok(people.includes(person1));

    app.selected = ['Albert'];
    const person2 = app.selectNextPerson();
    assert.ok(people.includes(person2));

    app.selected = ['Tuna'];
    const person3 = app.selectNextPerson();
    assert.ok(people.includes(person3));

    app.selected = ['Alex', 'Tuna'];
    const person4 = app.selectNextPerson();
    assert.ok(people.includes(person4));

    app.selected = ['Tuna', 'Albert'];
    const person5 = app.selectNextPerson();
    assert.ok(people.includes(person5));

    app.selected = ['Alex', 'Albert'];
    const person6 = app.selectNextPerson();
    assert.ok(people.includes(person6));

    fs.unlinkSync(fakeFile);
});



test("Test Application's notifySelected", async() => {    
    const fakeData = 'Alex\nAlbert\nTuna';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');
    
    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Alex', 'Albert', 'Tuna']);
    assert.deepStrictEqual(selected, []);

    const mockWrite = test.mock.fn(MailSystem.prototype.write);
    const mockSend = test.mock.fn(MailSystem.prototype.send);

    MailSystem.prototype.write = mockWrite;
    MailSystem.prototype.send = mockSend;

    app.selected = ['Alex', 'Albert', 'Tuna'];
    app.notifySelected();

    assert.strictEqual(mockWrite.mock.calls.length, 3);
    assert.strictEqual(mockSend.mock.calls.length, 3);

    assert.deepStrictEqual(mockWrite.mock.calls.map(call => call.arguments[0]), ['Alex', 'Albert', 'Tuna']);
    assert.deepStrictEqual(mockSend.mock.calls.map(call => call.arguments[0]), ['Alex', 'Albert', 'Tuna']);

    fs.unlinkSync(fakeFile);
});

test("Test Application's notifySelected with no selected people", async () => {
    const fakeData = 'Alex\nAlbert\nTuna';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Alex', 'Albert', 'Tuna']);
    assert.deepStrictEqual(selected, []);

    const mockWrite = test.mock.fn(MailSystem.prototype.write);
    const mockSend = test.mock.fn(MailSystem.prototype.send);

    MailSystem.prototype.write = mockWrite;
    MailSystem.prototype.send = mockSend;

    app.selected = [];
    app.notifySelected();

    assert.strictEqual(mockWrite.mock.calls.length, 0);
    assert.strictEqual(mockSend.mock.calls.length, 0);

    fs.unlinkSync(fakeFile);
});

test("Test Application's getNames", async () => {
    // const mockReadFile = test.mock.fn(async () => {
    //     return 'Alex\nAlbert\nTuna';
    // });
    
    // fs.readFile = mockReadFile;

    const fakeData = 'Alex\nAlbert\nTuna';
    const fakeFile = 'name_list.txt';
    await writeFile(fakeFile, fakeData, 'utf8');

    const app = new Application();

    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Alex', 'Albert', 'Tuna']);
    assert.deepStrictEqual(selected, []);
    
    fs.unlinkSync(fakeFile);
});