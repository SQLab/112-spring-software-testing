const { describe, it, beforeEach, mock } = require('node:test');
const assert = require('assert');
const fs = require('fs');
const util = require('util');
const { Application, MailSystem } = require('./main');
const writeFile = util.promisify(fs.writeFile);


describe('Test MailSystem', (t) => {
    /** 
     * Programming Notes:
     * t.beforeEach((t) => t.mock.restoreAll()); is only available in test() function
     */
    beforeEach(() => mock.restoreAll());

    it('should write mail for a person',(t) => {
        const mailsys = new MailSystem();

        assert.strictEqual(mailsys.write('Immypeko'), 'Congrats, Immypeko!');
    });

    it('should send mail to a person', (t) => {
        const mailsys = new MailSystem();

        // test stub on Math.random()
        const random = t.mock.method(Math, 'random');

        // test spy on MailSystem.send()
        t.mock.method(mailsys, 'send');
        /** 
         * Programming Notes:
         * class.method (method) & instance_class.method (static method) are both undefined
         * => t.mock.method(MailSystem, 'send'); won't work
         */

        // check MailSystem.send() hasn't been called
        assert.strictEqual(mailsys.send.mock.calls.length, 0);

        // let Math.random() return 0.6
        // check that return value is true
        random.mock.mockImplementation(() => 0.6);
        assert.strictEqual(mailsys.send('Immypeko', 'Congrats, Immypeko!'), true);
        
        // check MailSystem.send() has been called once
        // check the arguments and result of the first call
        assert.strictEqual(mailsys.send.mock.calls.length, 1);
        assert.deepStrictEqual(mailsys.send.mock.calls[0].arguments, ['Immypeko', 'Congrats, Immypeko!']);
        assert.strictEqual(mailsys.send.mock.calls[0].result, true);

        // let Math.random() return 0.4
        // check that return value is false
        random.mock.mockImplementation(() => 0.4);
        assert.strictEqual(mailsys.send('Korone', 'Congrats, Korone!'), false);
        
        //check MailSystem.send() has been called twice
        //check the arguments and result of the second call
        assert.strictEqual(mailsys.send.mock.calls.length, 2);
        assert.deepStrictEqual(mailsys.send.mock.calls[1].arguments, ['Korone', 'Congrats, Korone!']);
        assert.strictEqual(mailsys.send.mock.calls[1].result, false);
    });
});


describe('Test Application', async(t) => {
    beforeEach(() => mock.restoreAll());

    // write name list to a temporary file ['Immypeko', 'Korone', 'ChipiChaba']
    await writeFile('name_list.txt', 'Immypeko\nKorone\nChipiChaba', 'utf8');
    
    // wait for getNames() in constructor of Application to finish
    const app = new Application();
    await app.getNames();

    it('should get names from file', async (t) => {        
        /* 
        Problem: tried to mock readFile but failed
        cb = (err, data) => {
            if (err) {
                console.log(err);
            }
            return data;
        }
        const read = t.mock.method(fs, 'readFile');
        read.mock.mockImplementation((pth, ops, cb) => {
            cb(null,'Immypeko\nKorone')
        });
        
        fs.readFile('name_list.txt', 'utf8', cb);
        
        
        const readFile = util.promisify(fs.readFile);
        readFile('name_list.txt', 'utf8').then((data) => {
            console.log(data);
        })
        */

        assert.deepStrictEqual(app.people, ['Immypeko', 'Korone', 'ChipiChaba']);
        assert.deepStrictEqual(app.selected, []);
    });

    it('should select a random person from the list', async (t) => {        
        // test stub on Math.random()
        random = t.mock.method(Math, 'random');

        // let Math.random() return 0.1
        // check that the return value is 'Immypeko'
        random.mock.mockImplementation(() => 0.1);
        assert.strictEqual(app.getRandomPerson(), 'Immypeko');

        // let Math.random() return 0.7
        // check that the return value is 'ChipiChaba'
        random.mock.mockImplementation(() => 0.7);
        assert.strictEqual(app.getRandomPerson(), 'ChipiChaba');
    });

    it('should select next person', async (t) => {
        /** 
         * Testing Notes:
         * can apply test stub on Math.random() or Application.getRandomPerson() (if getRandomPerson() has been tested previously)
         */

        // let the only person that can be selected in selectNextPerson() be 'Korone'
        // check that 'Korone' is selected and added to the list
        app.selected = ['Immypeko', 'ChipiChaba'];
        assert.strictEqual(app.selectNextPerson(), 'Korone');
        assert.deepStrictEqual(app.selected, ['Immypeko', 'ChipiChaba', 'Korone']);

        // test stub on Math.random()
        t.mock.method(Math, 'random');

        // let Math.random() return 0.7
        // check that no person is selected since all people have been selected
        random.mock.mockImplementation(() => 0.7);
        assert.strictEqual(app.selectNextPerson(), null);
        assert.deepStrictEqual(app.selected, ['Immypeko', 'ChipiChaba', 'Korone']);
    });

    it('should notify selected person', async (t) => {
        // test spy on MailSystem.write() and MailSystem.send()
        t.mock.method(app.mailSystem, 'write');
        t.mock.method(app.mailSystem, 'send');

        app.selected = ['Immypeko', 'Korone'];
        
        // check that MailSystem.write() and MailSystem.send() haven't been called
        assert.strictEqual(app.mailSystem.send.mock.calls.length, 0);
        assert.strictEqual(app.mailSystem.write.mock.calls.length, 0);

        assert.strictEqual(app.notifySelected(), undefined);

        // check that MailSystem.write() and MailSystem.send() have been called twice
        // (since there are two selected people)
        assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
        assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);

        // check the arguments of the calls
        assert.deepStrictEqual(app.mailSystem.send.mock.calls[0].arguments, ['Immypeko', 'Congrats, Immypeko!']);
        assert.deepStrictEqual(app.mailSystem.send.mock.calls[1].arguments, ['Korone', 'Congrats, Korone!']);
    });
});

/**
 * Testing Notes:
 * If returning the intended value, we still CAN'T ASSURE that the function is working properly
 * e.g., selectNextPerson() returns 'Korone' but the list of selected people is not updated
 * => check all DATA STRUCTURE that are INVOLVED in the function
 */

/**
 * Programming Questions:
 * Application.constructor() has then() to wait for getName() to finish, why still need to await 
 */