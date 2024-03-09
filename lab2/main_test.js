const test = require('node:test');
const fs = require('fs');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

// create name_list.txt for testing
fs.writeFileSync('name_list.txt', 'John\nJane');

test('MailSystem write function', () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write('John'), 'Congrats, John!');
    assert.strictEqual(mailSystem.write(123), 'Congrats, 123!');
    assert.strictEqual(mailSystem.write(''), 'Congrats, !');
    assert.strictEqual(mailSystem.write(), 'Congrats, undefined!');
    assert.strictEqual(mailSystem.write(null), 'Congrats, null!');
    assert.strictEqual(mailSystem.write(true), 'Congrats, true!');
});

test('MailSystem send function', (t) => {
    // mock Math.random to control the return value
    const mailSystem = new MailSystem();
    const mock_random = t.mock.method(Math, 'random');
    mock_random.mock.mockImplementation(() => 0.6);
    assert.strictEqual(mailSystem.send('John', 'Congrats, John!'), true);
    mock_random.mock.mockImplementation(() => 0.4);
    assert.strictEqual(mailSystem.send('John', 'Congrats, John!'), false);
});


test('Application constructor', () => {
    const application = new Application();
    assert.strictEqual(application.people.length, 0);
    assert.strictEqual(application.selected.length, 0);
    assert.strictEqual(application.mailSystem instanceof MailSystem, true);
    assert.strictEqual(application.getNames() instanceof Promise, true);
});

test('Application getNames function', async () => {
    const application = new Application();
    const [people, select] = await application.getNames();
    assert.deepStrictEqual(people, ['John', 'Jane']);
    assert.deepStrictEqual(select, []);
});

test('Application getRandomPerson function', async (t) => {
    // mock Math.floor to control the return value
    const mock_floor = t.mock.method(Math, 'floor');
    const application = new Application();
    await application.getNames();
    mock_floor.mock.mockImplementation(() => 0);
    assert.strictEqual(application.getRandomPerson(), 'John');
    mock_floor.mock.mockImplementation(() => 1);
    assert.strictEqual(application.getRandomPerson(), 'Jane');
    mock_floor.mock.mockImplementation(() => 2);
    assert.strictEqual(application.getRandomPerson(), undefined);
});

test('Application selectNextPerson function', async (t) => {
    // mock getRandomPerson to control the return value
    const application = new Application();
    application.count = 0;
    const mock_getRandomPerson = t.mock.method(application, 'getRandomPerson');
    mock_getRandomPerson.mock.mockImplementation(() => {
        if (application.count !== 2) {
            application.count++;
            return 'John';
        } else {
            return 'Jane';
        }
    });
    await application.getNames();
    assert.strictEqual(application.selectNextPerson(), 'John');
    assert.strictEqual(application.selectNextPerson(), 'Jane');
    assert.strictEqual(application.selectNextPerson(), null);
});

test('Application notifySelected function', (t) => {
    // spy on send and write functions
    const application = new Application();
    application.selected = ['John', 'Jane'];
    const spy_send = t.mock.method(application.mailSystem, 'send');
    const spy_write = t.mock.method(application.mailSystem, 'write');
    application.notifySelected();
    assert.strictEqual(spy_send.mock.calls.length, 2);
    assert.strictEqual(spy_write.mock.calls.length, 2);
}).then(() => {
    fs.unlinkSync('name_list.txt');
});