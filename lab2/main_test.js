const { describe, it } = require('node:test');
const assert = require('assert');
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

