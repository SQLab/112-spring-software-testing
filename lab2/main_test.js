const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const { Application, MailSystem } = require('./main');

function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}

function createFile(fileName, disable) {
    if (disable) return;
    fs.writeFileSync(fileName, "Alice\nBob\nCharlie");
}

function deleteFile(fileName, disable) {
    if (disable) return;
    fs.unlinkSync(fileName);

}

const createApplication = async () => {
    const existed = fileExists("name_list.txt");
    createFile("name_list.txt", existed);

    const app = new Application();

    const data = await readFile('name_list.txt', 'utf8');
    const people = data.split('\n');
    const selected = [];
    deleteFile("name_list.txt", existed);

    app.people = people;
    app.selected = selected;

    return app;
};

test('Application - getRandomPerson', async (t) => {

    await createApplication().then(app => {
        assert.strictEqual(app.people.length, 3);

        const randomPerson = app.getRandomPerson();
        assert.ok(app.people.includes(randomPerson));
    });

});

test('Application - getRandomPerson', async (t) => {

    await createApplication().then(app => {
        assert.strictEqual(app.people.length, 3);

        const randomPerson = app.getRandomPerson();
        assert.ok(app.people.includes(randomPerson));
    });

});

test('Application - selectNextPerson',async (t) => {

    await createApplication().then(app => {

        assert.strictEqual(app.people.length, 3);

        randomPerson = app.selectNextPerson();
        assert.ok(app.people.includes(randomPerson));
        assert.ok(app.selected.includes(randomPerson));
        assert.strictEqual(app.selected.length, 1);

        randomPerson = app.selectNextPerson();
        assert.ok(app.people.includes(randomPerson));
        assert.ok(app.selected.includes(randomPerson));
        assert.strictEqual(app.selected.length, 2);
        
        t.mock.method(app, 'getRandomPerson', () => randomPerson, { times: 1 });

        randomPerson = app.selectNextPerson();
        assert.ok(app.people.includes(randomPerson));
        assert.ok(app.selected.includes(randomPerson));
        assert.strictEqual(app.selected.length, 3);

        nullPerson = app.selectNextPerson();
        assert.strictEqual(nullPerson, null);
        assert.strictEqual(app.selected.length, 3);

    });


});

test('Application - notifySelected', async (t) => {
    await createApplication().then(app => {

        assert.strictEqual(app.people.length, 3);
        t.mock.method(app, 'getRandomPerson', () => app.people[0]);

        app.selectNextPerson();
        t.mock.method(app.mailSystem, 'write', (name) => 'Congrats, ' + name + '!');
        t.mock.method(app.mailSystem, 'send', (name, context) => {
            assert.strictEqual(context, 'Congrats, ' + name + '!');
            return true
        });

        app.notifySelected();
    });


});

test('MailSystem - write', () => {
    const mailSystem = new MailSystem();
    const context = mailSystem.write('Alice');

    assert.strictEqual(context, 'Congrats, Alice!');
});

test('MailSystem - send', (t) => {
    const mailSystem = new MailSystem();

    t.mock.method(Math, 'random', () => 1.0);

    const result_true = mailSystem.send('Alice', 'Congratulations!');

    assert.strictEqual(result_true, true);

    t.mock.method(Math, 'random', () => 0.0);

    const result_false = mailSystem.send('Alice', 'Congratulations!');

    assert.strictEqual(result_false, false);

});

