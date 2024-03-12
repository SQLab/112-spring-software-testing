const test = require('node:test');
const assert = require('assert');
const fs = require('fs');

test.mock.method(fs, "readFile", (path, encoding, callback) => {
    callback(null, "Amy\nJack\nJohn\nMary");
});

const names = ['Amy', 'Jack', 'John', 'Mary'];

const { Application, MailSystem } = require('./main');

test.mock.method(fs, 'readFile', (path, options, callback) => callback(null, 'John\nMary'));

test("Test MailSystem's write", () => {
    
    const mailSystem = new MailSystem();
    assert.strictEqual(mailSystem.write(names[0]), 'Congrats, ' + names[0] + '!');

});

test("Test MailSystem's send", () => {
    
    const mailSystem = new MailSystem();

    //case 1
    test.mock.method(Math, "random", () => true);
    for(let i = 0; i < names.length; i++) {
        assert.strictEqual(mailSystem.send(names[i]), true);
    }

    //case 2
    test.mock.method(Math, "random", () => false);
    for(let i = 0; i < names.length; i++) {
        assert.strictEqual(mailSystem.send(names[i]), false);
    }
    
});

test("Test Application's getNames", async () => {

    const application = new Application();
    application.people = names;
    const [people, selected] = await application.getNames();
    assert.deepStrictEqual(people, names);
    assert.deepStrictEqual(selected, []);

});

test("Test Application's getRandomPerson", () => {

    const application = new Application();
    application.people = names;

    for(let i = 0; i < names.length; i++) {
        test.mock.method(Math, "floor", () => i);
        assert.strictEqual(application.getRandomPerson(), names[i]);
    }

});

test("Test Application's selectNextPerson", () => {

    const application = new Application();
    assert.strictEqual(application.selectNextPerson(), null);

    application.people = names;

    for(let i = 0; i < names.length; i++) {
        test.mock.method(application, "getRandomPerson", () => names[i]);
        assert.strictEqual(application.selectNextPerson(), names[i]);
    }

});

test("Test Application's notifySelected", () => {

    const application = new Application();

    application.mailSystem.write = test.mock.fn(application.mailSystem.write);
    application.mailSystem.send = test.mock.fn(() => true);

    application.selected = names;
    application.notifySelected();


    //check call arguments
    assert.strictEqual(application.mailSystem.write.mock.calls[0].arguments[0], names[0]);
    assert.strictEqual(application.mailSystem.send.mock.calls[0].arguments[0], names[0]);
    assert.strictEqual(application.mailSystem.write.mock.calls[1].arguments[0], names[1]);
    assert.strictEqual(application.mailSystem.send.mock.calls[1].arguments[0], names[1]);
    assert.strictEqual(application.mailSystem.write.mock.calls[2].arguments[0], names[2]);
    assert.strictEqual(application.mailSystem.send.mock.calls[2].arguments[0], names[2]);

    // //check call times
    assert.strictEqual(application.mailSystem.write.mock.calls.length, names.length);
    assert.strictEqual(application.mailSystem.send.mock.calls.length, names.length);  

});

