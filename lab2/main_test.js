const { mock, test } = require('node:test');
const assert = require('assert');
const { Application, MailSystem } = require('./main');
const fs = require('node:fs');
const content = 'Amy\nBob\nCindy\nDanny';

test("Test MailSystem write", () => {
    const mail_ = new MailSystem();
    assert.strictEqual(mail_.write("Ben"),'Congrats, Ben!');
});

test("Test MailSystem send", () => {
    const mail_ = new MailSystem();
    Math.random = () => 0.6;
    assert.strictEqual(mail_.send("Frank","Congrats, Frank!"),true);
    Math.random = () => 0.3;
    assert.strictEqual(mail_.send("Frank","Congrats, Frank!"),false);
});

test("Test Applicaiton getNames", () => {
    fs.writeFile('name_list.txt', content, async () => {
            const application_ = new Application();
            assert.deepStrictEqual(await application_.getNames(), [['Amy', 'Bob', 'Cindy', 'Danny'],[]]);
            fs.unlink('name_list.txt', ()=> {});
    });
});

test("Test Applicaiton getRandomPerson", () => {
    const application_ = new Application(); 
    application_.people = ['Amy', 'Bob', 'Cindy', 'Danny'];
    Math.random = () => 0;
    assert.strictEqual(application_.getRandomPerson(), 'Amy');
    Math.random = () => 0.3;
    assert.strictEqual(application_.getRandomPerson(), 'Bob');
    Math.random = () => 0.5;
    assert.strictEqual(application_.getRandomPerson(), 'Cindy');
    Math.random = () => 0.8;
    assert.strictEqual(application_.getRandomPerson(), 'Danny');
});

test("Test Applicaiton selectNextPerson", async () => {
    const application_ = new Application();
    assert.strictEqual(application_.selectNextPerson(),null);
    application_.people = ['Amy', 'Bob'];
    
    application_.getRandomPerson = () => "Amy";
    assert.strictEqual(application_.selectNextPerson(),'Amy');
    assert.deepStrictEqual(application_.selected,["Amy"]);
    let cnt = 1;
    application_.getRandomPerson = () => {
        if (cnt % 2){
            cnt++;
            return "Amy";
        }
        return "Bob";
    };
    assert.strictEqual(application_.selectNextPerson(),'Bob');
    assert.deepStrictEqual(application_.selected,["Amy","Bob"]);
});

test("Test Applicaiton notifySelected", async (t) => {
    const application_ = new Application();
    function write(name){
        //fake func for test
        return 0;
    };
    function send(name,context){
        //fake func for test
        return 0;
    };
    const fn_write = t.mock.fn(write);
    application_.mailSystem.write = fn_write;
    const fn_send = t.mock.fn(send);
    application_.mailSystem.send = fn_send;

    application_.selected = [];
    application_.notifySelected();
    assert.strictEqual(fn_write.mock.calls.length,0);
    assert.strictEqual(fn_send.mock.calls.length,0);

        
    application_.selected = ['Amy', 'Bob'];
    application_.notifySelected();
    assert.strictEqual(fn_write.mock.calls.length,2);
    assert.strictEqual(fn_send.mock.calls.length,2);

    mock.reset();
});
