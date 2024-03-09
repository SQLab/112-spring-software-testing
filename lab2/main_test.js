const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const name = 'Deron';
const context = 'Congrats, ' + name + '!';
const name_list = 'Naruto\nSasuke\nSakura';

test('Test on MailSystem.write', (t) => {
    const ms = new MailSystem();
    function write() {
        return ms.write(name);
    }
    const fn = t.mock.fn(write);
    assert.strictEqual(fn(), context);
});

test('Test on MailSystem.send', (t) => {
    const ms = new MailSystem();
    function send() {
        return ms.send(name, context);
    }
    const fn = t.mock.fn(send);
    Math.random = () => 1;
    assert.strictEqual(fn(), true);
    Math.random = () => 0;
    assert.strictEqual(fn(), false);
});

test('Test on Application.getNames', async (t) => {
    // Create 'name_list.txt'
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['Naruto', 'Sasuke', 'Sakura']);
    assert.deepStrictEqual(selected, []);
    assert.strictEqual(app.people.length, 3);
    assert.strictEqual(app.selected.length, 0);
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});

test('Test on Application.getRandomPerson', async (t) => {
    // Create 'name_list.txt'
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    app.people = ['Naruto', 'Sasuke', 'Sakura'];
    Math.random = () => 0;
    assert.strictEqual(app.getRandomPerson(), 'Naruto');
    Math.random = () => 0.4;
    assert.strictEqual(app.getRandomPerson(), 'Sasuke');
    Math.random = () => 0.8;
    assert.strictEqual(app.getRandomPerson(), 'Sakura');
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});

test('Test on Application.selectNextPerson', async (t) => {
    // Create 'name_list.txt'
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    app.people = ['Naruto', 'Sasuke', 'Sakura'];
    function selectNextPerson() {
        return app.selectNextPerson();
    }
    const fn = test.mock.fn(selectNextPerson);
    Math.random = () => 0;
    assert.strictEqual(fn(), 'Naruto');
    Math.random = () => 0.4;
    assert.strictEqual(fn(), 'Sasuke');
    Math.random = () => 0.8;
    assert.strictEqual(fn(), 'Sakura');
    assert.strictEqual(fn(), null);
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});

test('Test on Application.notifySelected', async (t) => {
    // Create 'name_list.txt'
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    app.selected = ['Naruto', 'Sasuke', 'Sakura'];
    assert.strictEqual(app.notifySelected(), undefined);
    app.selected = [];
    assert.strictEqual(app.notifySelected(), undefined);
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});