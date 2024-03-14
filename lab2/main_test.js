const { describe, it, mock } = require('node:test');
const assert = require('assert');
const fs = require('fs');

// Stub readFile to return 'John\nJane\n' when called with 'name_list.txt'
const nameList = ['John', 'Jane'];
mock.method(fs, 'readFile', (path, options, callback) => callback(null, nameList.join('\n')));
const { Application, MailSystem } = require('./main');

describe('MailSystem', () => {
    it('write', (t) => {
        const mailSystem = new MailSystem();
        const context = mailSystem.write('John');
        assert.strictEqual(context, 'Congrats, John!');

        const context2 = mailSystem.write(null);
        assert.strictEqual(context2, 'Congrats, null!');

        const context3 = mailSystem.write(undefined);
        assert.strictEqual(context3, 'Congrats, undefined!');

        const context4 = mailSystem.write(123);
        assert.strictEqual(context4, 'Congrats, 123!');
    });

    it('send', (t) => {
        const mailSystem = new MailSystem();

        // Stub Math.random to always return 0.6
        t.mock.method(Math, 'random', () => 0.6);
        const success = mailSystem.send('John', 'Congrats, John!');
        assert.strictEqual(success, true);

        // Stub Math.random to always return 0.4
        t.mock.method(Math, 'random', () => 0.4);
        const failure = mailSystem.send('John', 'Congrats, John!');
        assert.strictEqual(failure, false);
    });
});

describe('Application', () => {
    // Stub readFile to return 'John\nJane\n'
    it('getNames', async (t) => {
        const app = new Application();
        const names = await app.getNames();
        assert.deepStrictEqual(names, [nameList, []]);
    });

    it('getRandomPerson', async (t) => {
        const app = new Application();
        const [people, selected] = await app.getNames();

        for (let i = 0; i < people.length; i++) {
            t.mock.method(Math, 'random', () => i / people.length);
            const person = app.getRandomPerson();
            assert.strictEqual(person, people[i]);
        }
    });

    describe('selectNextPerson', () => {
        it('selectNextPerson', async (t) => {
            const app = new Application();
            const [people, selected] = await app.getNames();

            for (let i = 0; i < people.length; i++) {
                t.mock.method(Math, 'random', () => i / people.length);
                const person = app.selectNextPerson();
                assert.strictEqual(person, people[i]);
                assert.deepStrictEqual(app.selected, people.slice(0, i + 1));
            }
        });

        it('all selected', async (t) => {
            const app = new Application();
            const [people, selected] = await app.getNames();
            app.selected = people;

            const person = app.selectNextPerson();
            assert.strictEqual(person, null);
        });
    });

    it('notifySelected', async (t) => {
        const app = new Application();
        const [people, selected] = await app.getNames();
        app.selected = people;

        // count mail sent times
        const mockSend = t.mock.method(MailSystem.prototype, 'send', () => true);
        const mockWrite = t.mock.method(MailSystem.prototype, 'write', (name) => 'Congrats, ' + name + '!');
        app.notifySelected();
        assert.strictEqual(mockSend.mock.calls.length, people.length);
        assert.strictEqual(mockWrite.mock.calls.length, people.length);
    });
});