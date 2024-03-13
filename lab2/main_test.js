const {test, mock} = require('node:test');
const fs = require('fs');
const util = require('util');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary



test('should write a mail for a given name', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const res = mailSystem.write(name);
    assert.strictEqual(res, 'Congrats, John!');
})

test('send email to a given name', (context) => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const res = 'Congrats, John!';

    mock.method(Math, 'random', () => 0.6);
    const success = mailSystem.send(name, context);
    assert.strictEqual(success, true);

    mock.method(Math, 'random', () => 0.4);
    const failure = mailSystem.send(name, context);
    assert.strictEqual(failure, false);
})


test('create Application instance', async () => {

    const content = 'Quan\nHenry\nBilly';
    const fileName = 'name_list.txt';
    fs.writeFileSync(fileName, content, 'utf8');

    const app = new Application();

    const people = await app.getNames();
    assert.deepStrictEqual(people, [['Quan', 'Henry', 'Billy'], []]);
    assert.deepStrictEqual(app.people.length, 3);
    assert.deepStrictEqual(app.selected.length, 0);
})

test('get random person', async () => {
    const content = 'Quan\nHenry\nBilly';
    const fileName = 'name_list.txt';
    fs.writeFileSync(fileName, content, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames()

    mock.method(Math, 'random', () => 0.5);
    const index = Math.floor(0.5 * people.length)
    const person = app.getRandomPerson();
    // console.log(person);

    assert.strictEqual(person, people[index])
})

test('select next person', async () => {
    const content = 'Quan\nHenry\nBilly';
    const fileName = 'name_list.txt';
    fs.writeFileSync(fileName, content, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames()

    const fn = mock.method(app, 'getRandomPerson');


    // all people are selected
    app.selected = people;
    const res = app.selectNextPerson();
    assert.strictEqual(res, null);

    // select a person
    // already selected Quan
    // Make the first call return Quan
    // Make the second call return Henry
    app.selected = ['Quan'];
    fn.mock.mockImplementation(() => 'Henry');
    fn.mock.mockImplementationOnce(() => 'Quan');
    const person = app.selectNextPerson();
    assert.strictEqual(person, 'Henry');
    assert.deepStrictEqual(app.selected.length, 2);
})

test('notify selected', async () => {
    const content = 'Quan\nHenry\nBilly';
    const fileName = 'name_list.txt';
    fs.writeFileSync(fileName, content, 'utf8');

    const app = new Application();

    const write = mock.method(app.mailSystem, 'write');
    const send = mock.method(app.mailSystem, 'send');

    app.selected = ['Quan', 'Henry', 'Billy'];
    app.notifySelected();
    assert.deepStrictEqual(write.mock.calls.length, 3);
    assert.deepStrictEqual(send.mock.calls.length, 3);
})