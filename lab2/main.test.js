const MailSystem = require('./main');

describe('MailSystem', () => {
    let mailSystem;

    beforeEach(() => {
        mailSystem = new MailSystem();
    });

    it('should write a mail for a given name', () => {
        const name = 'John';
        const context = mailSystem.write(name);
        expect(context).toBe('Congrats, John!');
    });

    it('should send a mail to a given name', () => {
        const name = 'John';
        const context = 'Congrats, John!';
        const success = mailSystem.send(name, context);
        expect(success).toBeTruthy();
    });
});