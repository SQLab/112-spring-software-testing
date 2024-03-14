const test = require('node:test');
const { describe, it, beforeEach, mock } = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

describe('Test MailSystem', () => {
    beforeEach(() => mock.restoreAll());

    it('sould write mail for a person',(t) => {
        const mailsys = new MailSystem();

        assert.strictEqual(mailsys.write('Immypeko'), 'Congrats, Immypeko!');


        t.mock.method(mailsys, 'write');
        assert.strictEqual(mailsys.write.mock.calls.length, 0);
        assert.strictEqual(mailsys.write('Immypeko'), 'Congrats, Immypeko!');
        assert.strictEqual(mailsys.write.mock.calls.length, 1);

        const call = mailsys.write.mock.calls[0];

        assert.deepStrictEqual(call.arguments, ['Immypeko']);
        assert.strictEqual(call.result, 'Congrats, Immypeko!');
        assert.strictEqual(call.this, mailsys);
    });

    it('should send mail to a person', (t) => {
        const mailsys = new MailSystem();

        t.mock.method(mailsys, 'send');
        t.mock.mockReturnValue(mailsys, 'send', true);
        // assert.strictEqual(mailsys.send('Immypeko', 'Congrats, Immypeko!'), true);
        t.mock.mockReturnValue(mailsys, 'send', false);
        // assert.strictEqual(mailsys.send('Immypeko', 'Congrats, Immypeko!'), false);

        assert.strictEqual(mailsys.send.mock.calls.length, 2);
    });
});