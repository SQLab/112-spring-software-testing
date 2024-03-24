const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main'); 

const fakenames = 'Jones\nEusden\nBattlebrian\nMartial Hebert';

// createfakefile
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

// mailSystem
test('mailSystem write', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('name');
    assert.strictEqual(context, 'Congrats, name!');
});

test('mailSystem send', () => {
    const mailSystem = new MailSystem();
    Math.random = () =>  0.6;
    const success1 = mailSystem.send('name', 'context');
    assert.strictEqual(success1, true);
    Math.random = () =>  0.4;
    const success2 = mailSystem.send('name', 'context');
    assert.strictEqual(success2, false);
});

// application
test('application getNames', async () => {
    await writeFile('name_list.txt', fakenames, 'utf8');
    const application = new Application();
    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, ['Jones', 'Eusden', 'Battlebrian', 'Martial Hebert']);
    assert.deepStrictEqual(selected, []);
    await util.promisify(fs.unlink)('name_list.txt');
});

test('application getRandomPerson', async () => {
    await writeFile('name_list.txt', fakenames, 'utf8');
    const application = new Application();
    application.people = ['Jones', 'Eusden', 'Battlebrian', 'Martial Hebert'];
    const person = application.getRandomPerson();
    assert.ok(application.people.includes(person));
    await util.promisify(fs.unlink)('name_list.txt');
});

test('application selectNextPerson', async () => {
    await writeFile('name_list.txt', fakenames, 'utf8');
    const application = new Application();
    application.people = ['Jones', 'Eusden', 'Battlebrian', 'Martial Hebert'];
    application.selected = ['Jones', 'Eusden', 'Battlebrian', 'Martial Hebert'];
    let person = application.selectNextPerson();
    assert.strictEqual(person, null);

    application.selected = ['Jones', 'Eusden', 'Battlebrian'];
    let test = false;
    application.getRandomPerson = () => {
        if (!test) {
            test = true;
            return 'Jones';
        }
        else {
            return 'Martial Hebert';
        }
    }
    person = application.selectNextPerson();
    assert.strictEqual(person, 'Martial Hebert');
    
    await util.promisify(fs.unlink)('name_list.txt');
});

test('application constructor', async () => {
    await writeFile('name_list.txt', fakenames, 'utf8');
    const application = new Application();
    assert.deepStrictEqual(application.people, []);
    assert.deepStrictEqual(application.selected, []);
    await util.promisify(fs.unlink)('name_list.txt');
});

// spy on mailSystem
test('spies on a mailsystem', async () => {
    await writeFile('name_list.txt', fakenames, 'utf8');
    const application = new Application();
    const mailSystemSpy = { 
        write: test.mock.fn(MailSystem.prototype.write),
        send: test.mock.fn(MailSystem.prototype.send),
    };
    application.mailSystem = mailSystemSpy;

    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, ['Jones', 'Eusden', 'Battlebrian', 'Martial Hebert']);
    assert.deepStrictEqual(selected, []);

    application.selected = ['Jones', 'Eusden', 'Battlebrian', 'Martial Hebert'];

    application.notifySelected();
    assert.strictEqual(mailSystemSpy.write.mock.calls.length, 4);
    assert.strictEqual(mailSystemSpy.send.mock.calls.length, 4);

    for (const x of [0, 1, 2, 3]) {
        assert.strictEqual(mailSystemSpy.write.mock.calls[x].arguments[0], application.selected[x]);
        assert.strictEqual(mailSystemSpy.send.mock.calls[x].arguments[0], application.selected[x]);
    }
  
    // Reset the globally tracked mocks.
    test.mock.reset();
    await util.promisify(fs.unlink)('name_list.txt');
  });