const fs = require('fs');
const test = require('node:test');
const assert = require('assert');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// mock fs.readFile to simulate the file content before import main.js
test.mock.method(fs, 'readFile', (path, encoding, callback) => {
    callback(null, test_file_data);
});
const { Application, MailSystem } = require('./main');
const { type } = require('os');

const test_people = ['Alice', 'Bob', 'Charlie'];
const test_file_data = test_people.join('\n');

test('MailSystem.write', () => {
    const mailSystem = new MailSystem();
    const name = test_people[0];
    const expected = 'Congrats, ' + name + '!';

    const context = mailSystem.write(name);
    assert.strictEqual(context, expected);
});

test('MailSystem.send', () => {
    const mailSystem = new MailSystem();
    const name = test_people[0];
    const context = 'Congrats, ' + name + '!';

    // use test.mock to simulate Math.random() with return value = 1
    test.mock.method(Math, 'random', () => 1);
    let success = mailSystem.send(name, context);
    assert.strictEqual(success, true);

    // use test.mock to simulate Math.random() with return value = 0
    test.mock.method(Math, 'random', () => 0);
    success = mailSystem.send(name, context);
    assert.strictEqual(success, false);

    test.mock.restoreAll();
});

test('Application.getNames', async () => { 
    const application = new Application();

    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, test_people); 
    assert.deepStrictEqual(selected, []);
});

test('Application.getRandomPerson', async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();

    test.mock.method(Math, 'random', () => 0);
    const person = application.getRandomPerson();
    assert.strictEqual(person, test_people[0]);

    test.mock.restoreAll();
});

test('Application.selectNextPerson', async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();

    test.mock.method(Math, 'random', () => 0);
    const person = application.selectNextPerson();
    assert.strictEqual(person, test_people[0]);

    // for the case when getRandomPerson returns the person that has already been selected
    let dup = true;
    test.mock.method(application, 'getRandomPerson', () => {
        // return the person already selected once and return another person next time
        if (dup) {
            dup = false;
            return test_people[0];
        } else {
            return test_people[1];
        }
    });
    const person_after_dup = application.selectNextPerson();

    // reset test.mock
    test.mock.restoreAll();
    // select all people (except the two which are already selected before)
    for (let i = 0; i < people.length-2; i++) {
        let person_temp = application.selectNextPerson();
    }

    // when all people are already selected
    const person_null = application.selectNextPerson();
    assert.strictEqual(person_null, null);
    
});

test ('Application.notifySelected', async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();

    test.mock.method(Math, 'random', () => 0);
    const person = application.selectNextPerson();

    // set random to 1 to simulate mail sent successfully
    test.mock.method(Math, 'random', () => 1);
    application.notifySelected();

    test.mock.restoreAll();
});
