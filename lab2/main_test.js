const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

const fs = require('fs');

test ("Test MailSystem", (t)=>{
    const MyMailSystem = new MailSystem();
    function write() {
        return MyMailSystem.write('Jane');
    }
    function send_true() {
        Math.random = () => 0.9;
        return MyMailSystem.send('Jane', 'Hello World!');
    }
    function send_false() {
        Math.random = () => 0.1;
        return MyMailSystem.send('Jane', 'Hello World!');
    }
    
    const fn = t.mock.fn(write);
    assert.strictEqual(fn(), 'Congrats, Jane!', 'write() failed');
    
    fn.mock.mockImplementation(send_true);
    assert.strictEqual(fn(), true, 'send() failed');
    
    fn.mock.mockImplementation(send_false);
    assert.strictEqual(fn(), false, 'send() failed');
}); 

test ("Test Application", async(t)=>{
    const arr = ['Jane','Emma','Dora','Alexandra','Eric'];
    const name_list = 'Jane\nEmma\nDora\nAlexandra\nEric';
    fs.writeFileSync('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();
    
    // test fot getNames
    assert.deepStrictEqual(people, arr, 'getNames() failed');
    assert.deepStrictEqual(selected, [], 'getNames() failed');
    
    console.log('this.people.length is ', people.length);

    function getRandomPerson() {
        Math.random = () => 0.1;
        app.getRandomPerson();
    }

    function getRandomPerson() {
        Math.random = () => 0.1;
        return app.getRandomPerson();
    }

    function selectNextPerson() {
        Math.random = () => 0.1;
        return app.selectNextPerson();
    }

    function notifySelected() {
        Math.random = () => 0.9;
        app.notifySelected();
    }
    
    const fn = t.mock.fn(getRandomPerson);

    // test for getRandomPerson()
    assert.strictEqual(fn(), 'Jane', 'getRandomPerson() failed');
    
    // test for selectNextPerson()
    fn.mock.mockImplementation(selectNextPerson);
    assert.strictEqual(fn(), 'Jane', 'selectNextPerson() failed');
    assert.strictEqual(app.selected.length, 1, 'selectNextPerson() failed');
    app.selected = arr;
    fn.mock.mockImplementation(selectNextPerson);
    assert.strictEqual(fn(), null);

    // // test for notifySelected()
    fn.mock.mockImplementation(notifySelected);
    assert.strictEqual(fn(), undefined);
    fs.unlinkSync('name_list.txt');
});
