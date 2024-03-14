const { describe, it, mock } = require('node:test');
const assert = require('assert');
const fs = require('fs');

// Stub readFile to return 'John\nJane\n' when called with 'name_list.txt'
const nameList = ['John', 'Jane', 'Joe'];
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

        const context5 = mailSystem.write({});
        assert.strictEqual(context5, 'Congrats, [object Object]!');

        const context6 = mailSystem.write([]);
        assert.strictEqual(context6, 'Congrats, !');

        const context7 = mailSystem.write(true);
        assert.strictEqual(context7, 'Congrats, true!');
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
            app.people = nameList;
            app.selected = [nameList[0]];

            let count = 0;
            t.mock.method(app, 'getRandomPerson', () => {
                if (count == 0) {
                    count++;
                    return 'John'
                } else if (count == 1) {
                    count++;
                    return 'Jane';
                }
                else {
                    return 'Joe'
                }
            })

            assert.strictEqual(app.selectNextPerson(), 'Jane');
            assert.deepStrictEqual(app.selected, ['John', 'Jane']);

            assert.strictEqual(app.selectNextPerson(), 'Joe');
            assert.deepStrictEqual(app.selected, ['John', 'Jane', 'Joe'])

            assert.strictEqual(app.selectNextPerson(), null);
        });
    });

    it('notifySelected', async (t) => {
        const app = new Application();
        const [people, selected] = await app.getNames();
        app.selected = people;

        // count mail sent times
        app.mailSystem.send = t.mock.fn(app.mailSystem.send);
        app.mailSystem.write = t.mock.fn(app.mailSystem.write);
        app.notifySelected();
        assert.strictEqual(app.mailSystem.send.mock.calls.length, people.length);
        assert.strictEqual(app.mailSystem.write.mock.calls.length, people.length);
    });
});