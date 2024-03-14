const test = require('node:test');
const { describe, it, beforeEach, mock } = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

// TODO: write your tests here
// Remember to use Stub, Mock, and Spy when necessary

describe('Test MailSystem', (t) => {
    // t.beforeEach((t) => t.mock.restoreAll());
    beforeEach(() => mock.restoreAll());

    it('sould write mail for a person',(t) => {
        const mailsys = new MailSystem();

        assert.strictEqual(mailsys.write('Immypeko'), 'Congrats, Immypeko!');
    });

    it('should send mail to a person', (t) => {
        const mailsys = new MailSystem();

        random = t.mock.method(Math, 'random');
        // t.mock.method(MailSystem, 'send');
        random.mock.mockImplementation(() => 0.6);
        assert.strictEqual(mailsys.send('Immypeko', 'Congrats, Immypeko!'), true);
        random.mock.mockImplementation(() => 0.4);
        assert.strictEqual(mailsys.send('Immypeko', 'Congrats, Immypeko!'), false);
    });
});


describe('Test Application', (t) => {
    // t.beforeEach((t) => t.mock.restoreAll());
    beforeEach(() => mock.restoreAll());

    it('should get names from file', async (t) => {
        t.mock.fn(readFile);
        t.mock.mockImplementation(() => 'Immypeko\nKorone');
        
        app = new Application();
        assert.strictEqual(app.people, ['Immypeko', 'Korone']);
        assert.strictEqual(app.selected, []);
    });    
});
