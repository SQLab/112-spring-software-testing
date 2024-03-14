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
    const oMathRandom = Math.random;
    Math.random = () => 0.7;
    const result = system.send('Kelvin', 'hi');
    assert.strictEqual(result, true);

    Math.random = () => 0.4;
    const result2 = system.send('Kelvin', 'hi');
    assert.strictEqual(result2, false);
    Math.random = oMathRandom;
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

test('Test on Application.selectNextPerson', async (t) => {
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    app.people = ['Kelvin','Neil','088'];
    function selectNextPerson() {
        return app.selectNextPerson();
    }
    const fn = test.mock.fn(selectNextPerson);
    Math.random = () => 0;
    assert.strictEqual(fn(), 'Kelvin');
    Math.random = () => 0.4;
    assert.strictEqual(fn(), 'Neil');
    Math.random = () => 0.7;
    assert.strictEqual(fn(), '088');
    assert.strictEqual(fn(), null);

    fs.unlinkSync('name_list.txt');
});

test('Test on Application.notifySelected', async (t) => {
    const name_list = 'Kelvin\nNeil\n088\nJyw\nwei';
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    app.people = ['Kelvin','Neil','088'];
    app.selected = [];
    assert.strictEqual(app.notifySelected(), undefined);
    function selectNextPerson() {
        return app.selectNextPerson();
    }
    const fn = test.mock.fn(selectNextPerson);
    let cnt = 0;
    app.getRandomPerson = () => {
        if(cnt % 3 == 0) {
            cnt++;
            return 'Kelvin';
        } else if (cnt % 3 == 1) {
            cnt++;
            return 'Neil';
        } else {
            cnt++;
            return '088';
        }
    };
    app.selected = ['Kelvin'];
    assert.strictEqual(app.notifySelected(), undefined);
    assert.strictEqual(fn(), 'Neil');
    assert.strictEqual(app.notifySelected(), undefined);
    assert.strictEqual(fn(), '088');
    assert.strictEqual(app.notifySelected(), undefined);
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});