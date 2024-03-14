const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

test("Test MailSystem's write", () => {
    const system = new MailSystem();
    const context = system.write('Kelvin');
    assert.strictEqual(context, 'Congrats, Kelvin!');
});

test("Test MailSystem's send", () => {
    const system = new MailSystem();
    const MathRandom = Math.random;
    Math.random = () => 0.7;
    const result = system.send('Kelvin', 'hi');
    assert.strictEqual(result, true);

    Math.random = () => 0.4;
    const result2 = system.send('Kelvin', 'hi');
    assert.strictEqual(result2, false);
    Math.random = MathRandom;
});

test('test getNames', async() =>{
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Kelvin','Neil','088','Jyw','wei']);
    assert.deepStrictEqual(selected, []);
});


test('test getRandomPerson', async() =>{
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();

    for(var i=0; i<app.people.length; i++){
        person = app.getRandomPerson();
        assert(people.includes(person));
    }
});

test("Test Application's notifySelected", async () => {
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf8');

    const app = new Application();
    const [people, selected] = await app.getNames();

    assert.deepStrictEqual(people, ['Kelvin','Neil','088','Jyw','wei']);
    assert.deepStrictEqual(selected, []);

    const spy = {
        write: test.mock.fn(MailSystem.prototype.write),
        send: test.mock.fn(MailSystem.prototype.send)
    };
    app.mailSystem = spy;
    app.selected = ['Kelvin','Neil','088'];

    app.notifySelected();

    assert.deepStrictEqual(spy.write.mock.calls.map(call => call.arguments[0]), ['Kelvin','Neil','088']);
    assert.deepStrictEqual(spy.send.mock.calls.map(call => call.arguments[0]), ['Kelvin','Neil','088']);

    fs.unlinkSync('name_list.txt'); 
});