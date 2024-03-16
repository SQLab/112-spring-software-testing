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
    t.mock.method(Math, 'random', () => {
        return 1;
    });
    assert.strictEqual(fn(), true);
    t.mock.method(Math, 'random', () => {
        return 0;
    });
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
    function getRandomPerson() {
        return app.getRandomPerson();
    }
    const fn = t.mock.fn(getRandomPerson);
    t.mock.method(Math, 'random', () => {
        return 0;
    });
    assert.strictEqual(fn(), 'Naruto');
    t.mock.method(Math, 'random', () => {
        return 0.4;
    });
    assert.strictEqual(fn(), 'Sasuke');
    t.mock.method(Math, 'random', () => {
        return 0.8;
    });
    assert.strictEqual(fn(), 'Sakura');
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
    t.mock.method(Math, 'random', () => {
        return 0;
    });
    assert.strictEqual(fn(), 'Naruto');
    t.mock.method(Math, 'random', () => {
        return 0.4;
    });
    assert.strictEqual(fn(), 'Sasuke');
    t.mock.method(Math, 'random', () => {
        return 0.8;
    });
    assert.strictEqual(fn(), 'Sakura');
    assert.strictEqual(fn(), null);
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});

test('Test on Application.notifySelected', async (t) => {
    // Create 'name_list.txt'
    await writeFile('name_list.txt', name_list, 'utf8');
    const app = new Application();
    app.people = ['Naruto', 'Sasuke', 'Sakura'];
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
            return 'Naruto';
        } else if (cnt % 3 == 1) {
            cnt++;
            return 'Sasuke';
        } else {
            cnt++;
            return 'Sakura';
        }
    };
    app.selected = ['Naruto'];
    assert.strictEqual(app.notifySelected(), undefined);
    assert.strictEqual(fn(), 'Sasuke');
    assert.strictEqual(app.notifySelected(), undefined);
    assert.strictEqual(fn(), 'Sakura');
    assert.strictEqual(app.notifySelected(), undefined);
    // Remove 'name_list.txt'
    fs.unlinkSync('name_list.txt');
});