const test = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');

const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


test ("Test MailSystem", (t)=>{
    const MyMailSystem = new MailSystem();
    function write() {
        return MyMailSystem.write('Jane');
    }
    function send() {
        return MyMailSystem.send('Jane', 'Congrats, Jane!');
    }
    
    const fn = t.mock.fn(write);
    assert.strictEqual(fn(), 'Congrats, Jane!', 'write() failed');
    
    Math.random = () => 0.9;
    fn.mock.mockImplementation(send);
    assert.strictEqual(fn(), true, 'send() failed');
    
    Math.random = () => 0.1;
    fn.mock.mockImplementation(send);
    assert.strictEqual(fn(), false, 'send() failed');
}); 

test ("Test Application", async()=>{
    const arr = ['Jane','Emma'];
    const name_list = "Jane\nEmma";
    await writeFile('name_list.txt', name_list, 'utf-8');
    const app = new Application();
    const [people, selected] = await app.getNames();
    
    // test fot getNames
    assert.deepStrictEqual(people, arr, 'getNames() failed');
    assert.deepStrictEqual(selected, [], 'getNames() failed');
    

    // test for getRandomPerson()
    const ret1 = app.getRandomPerson();
    assert(people.includes(ret1));
    

    // test for selectNextPerson()
    app.getRandomPerson = () => 'Jane';
    const ret2 = app.selectNextPerson();
    assert.strictEqual(ret2, 'Jane', 'selectNextPerson() failed');

    app.getRandomPerson = () => 'Emma';
    const ret3 = app.selectNextPerson();
    assert.strictEqual(ret3, 'Emma', 'selectNextPerson() failed');

    app.selected = ['Jane'];
    var cnt=0;
    app.getRandomPerson = () => {
        if (cnt%2==0) {
            cnt++;
            return 'Jane';
        }
        else {
            cnt--;
            return 'Emma';
        }
    }
    const ret4 = app.selectNextPerson();
    assert.strictEqual(ret4, 'Emma', 'selectNextPerson() failed');

    const ret5 = app.selectNextPerson();
    assert.strictEqual(ret5, null);

    // test for notifySelected()
    const ret6 = app.notifySelected();
    assert.strictEqual(ret6, undefined);
    fs.unlinkSync('name_list.txt');
});
