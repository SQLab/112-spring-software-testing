const fs = require('fs');
const { mock, test } = require('node:test');
const assert = require('assert');
mock.method(fs, 'readFile', (path, opt, cb) => {
    cb(null, 'Bob\nAlice');
});
const { Application, MailSystem } = require('./main');

test('MailSystem write', (t) => {
    const mailsys = new MailSystem();
    const expected_logs = '--write mail for Bob--';
    let logs = '';
    t.mock.method(console, 'log', (msg) => {
        logs += msg;
    });
    assert.strictEqual(mailsys.write('Bob'), 'Congrats, Bob!');
    assert.strictEqual(logs, expected_logs);
});

test('MailSystem send', (t) => {
    const mailsys = new MailSystem();
    const expected_logs = 
        '--send mail to Alice--' +
        'mail failed' +
        '--send mail to Alice--' +
        'mail sent';
    let logs = '';
    t.mock.method(console, 'log', (msg) => {
        logs += msg;
    });
    t.mock.method(Math, 'random', () => 0.0);
    assert.strictEqual(mailsys.send('Alice'), false);
    t.mock.method(Math, 'random', () => 0.9);
    assert.strictEqual(mailsys.send('Alice'), true);
    assert.strictEqual(logs, expected_logs);
});

test('Application getNames', async () => {
    const app = new Application();
    assert.deepStrictEqual(await app.getNames(), [['Bob', 'Alice'], []]);
});

test('Application getRandomPerson', (t) => {
    const app = new Application();
    app.people = ['Bob', 'Alice', 'Mallory'];
    t.mock.method(Math, 'random', () => 0);
    assert.strictEqual(app.getRandomPerson(), 'Bob');
    t.mock.method(Math, 'random', () => 0.9);
    assert.strictEqual(app.getRandomPerson(), 'Mallory');
});

test('Application selectNextPerson', (t) => {
    const app = new Application();
    const expected_logs =
        '--select next person--' +
        '--select next person--' +
        'all selected';
    let logs = '';
    t.mock.method(console, 'log', (msg) => {
        logs += msg;
    });
    app.people = ['Bob', 'Alice'];
    app.selected = ['Bob'];
    let visit = false;
    t.mock.method(app, 'getRandomPerson', () => {
        if (visit) return 'Alice';
        visit = true;
        return 'Bob';
    });
    assert.strictEqual(app.selectNextPerson(), 'Alice');
    assert.deepStrictEqual(app.selected, ['Bob', 'Alice']);
    assert.strictEqual(app.selectNextPerson(), null);
    assert.strictEqual(logs, expected_logs);
});

test('Aplication notifySelected', (t) => {
    const app = new Application();
    const expected_logs =
        '--notify selected--' +
        '--write mail for Bob--' +
        '--send mail to Bob--' +
        'mail sent' +
        '--write mail for Alice--' +
        '--send mail to Alice--' +
        'mail sent';
    let logs = '';
    t.mock.method(console, 'log', (msg) => {
        logs += msg;
    });
    t.mock.method(Math, 'random', () => 0.9);
    app.selected = ['Bob', 'Alice'];
    app.notifySelected();
    assert.strictEqual(logs, expected_logs);
});

