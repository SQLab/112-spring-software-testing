const {test, mock} = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

test('should write a mail for a given name', () => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const context = mailSystem.write(name);
    assert.strictEqual(context, 'Congrats, John!');
})

test('send email to a given name', (context) => {
    const mailSystem = new MailSystem();
    const name = 'John';
    const context = 'Congrats, John!';

    mock.method(MailSystem, MailSystem.send.sleep.mockImplementation())

    mock.method(Math, 'random', () => 0.6);
    const success = mailSystem.send(name, context);
    assert.strictEqual(success, true);

    mock.method(Math, 'random', () => 0.4);
    const failure = mailSystem.send(name, context);
    assert.strictEqual(failure, false);
})