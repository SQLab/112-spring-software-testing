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

// test data
const test_people = ['Alice', 'Bob', 'Charlie'];
const test_file_data = test_people.join('\n');

test('MailSystem.write', () => {
    const mailSystem = new MailSystem();
    const name = test_people[0];
    const expected = 'Congrats, ' + name + '!';

    const actual = mailSystem.write(name);
    assert.strictEqual(actual, expected);
});

test('MailSystem.send', () => {
    const mailSystem = new MailSystem();
    const name = test_people[0];
    const context = 'Congrats, ' + name + '!';
    
    // use stub to simulate Math.random() with return value = 1
    test.mock.method(Math, 'random', () => 1);
    let actual = mailSystem.send(name, context);
    assert.strictEqual(actual, true);

    // use stub to simulate Math.random() with return value = 0
    test.mock.method(Math, 'random', () => 0);
    actual = mailSystem.send(name, context);
    assert.strictEqual(actual, false);
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

    // use stub to simulate Math.random() with return value = 0
    test.mock.method(Math, 'random', () => 0);
    const person = application.getRandomPerson();
    assert.strictEqual(person, test_people[0]);
});

test('Application.selectNextPerson', async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();

    // use stub to simulate application.getRandomPerson() with return value = test_people[0]
    test.mock.method(application, 'getRandomPerson', () => {
        return test_people[0];
    });
    const person = application.selectNextPerson();
    assert.strictEqual(person, test_people[0]);
    test.mock.restoreAll(); 
    
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
    test.mock.restoreAll();

    // use stub to simulate application.getRandomPerson() with return value = test_people[2]
    test.mock.method(application, 'getRandomPerson', () => {
        return test_people[2];
    });
    
    // select all people (adding the last one)
    const last_person = application.selectNextPerson();

    // when all people are already selected
    const person_null = application.selectNextPerson();
    assert.strictEqual(person_null, null);
    
});

test ('Application.notifySelected', async () => {
    const application = new Application();
    const [people, selected] = await application.getNames();

    test.mock.method(application, 'getRandomPerson', () => {
        return test_people[0];
    });
    const person = application.selectNextPerson();

    // use spy to check if mailSystem.write/send is called
    const writeSpy = test.mock.fn(() => 'Congrats, ' + person + '!');
    test.mock.method(application.mailSystem, 'write', writeSpy);
    const sendSpy = test.mock.fn(() => true);
    test.mock.method(application.mailSystem, 'send', sendSpy);

    const actual = application.notifySelected();
    assert.strictEqual(writeSpy.mock.calls.length, 1);
    assert.strictEqual(sendSpy.mock.calls.length, 1);
    assert.strictEqual(actual, undefined);
});
