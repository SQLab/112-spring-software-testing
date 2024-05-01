const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (a, b, callback) => callback(null, "Amy\nBenson\nCharlie"));
const { Application, MailSystem } = require('./main');

// Remember to use Stub, Mock, and Spy when necessary
test("Test MailSystem's write", () => {
    const mailSys = new MailSystem();
    // 1. test return type
    assert.strictEqual(typeof mailSys.write("Amy"), "string");
    // 2. validate legality of context returned
    assert.strictEqual(mailSys.write("Amy"), "Congrats, Amy!");
});

test("Test MailSystem's send", (t) => {
    const mailSys = new MailSystem();
    // 1. test return type
    assert.strictEqual(typeof mailSys.send("testing", "random test"), "boolean");
    // 2. Asume that Math.random() works, check if the tested function provide a valid output (spy?)
    t.mock.method(Math, "random", () => 1.0, { times: 5 });
    for(let i = 0; i < 5; i++) {
        assert.strictEqual(mailSys.send("testing", "random test"), true);
    }
    t.mock.method(Math, "random", () => 0.0, { times: 5 });
    for(let i = 0; i < 5; i++) {
        assert.strictEqual(mailSys.send("testing", "random test"), false);
    }
});

test("Test Application's getNames", async () => {
    // Stub inputs via mocking fs.writeFile
    // Assume fs.writeFile works functionally, the tested function would have a correct behaviour.
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['Amy', 'Benson', 'Charlie']);
    assert.deepStrictEqual(selected, []);
});

test("Test Application's getRandomPerson", (t) => {
    const app = new Application();
    // Stub
    testcase = ['Amy', 'Benson', 'Charlie'];
    app.people = testcase;
    // Spy on output via mocking Math.random()
    t.mock.method(Math, "random", () => 0.3, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Amy");
    t.mock.method(Math, "random", () => 0.6, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Benson");
    t.mock.method(Math, "random", () => 0.9, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Charlie");
    // Spy on output via mocking Math.floor()
    t.mock.method(Math, "floor", (_) => 0, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Amy");
    t.mock.method(Math, "floor", (_) => 1, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Benson");
    t.mock.method(Math, "floor", (_) => 2, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Charlie");
});

test("Test Application's selectNextPerson", (t) => {
    const app = new Application();
    //Stub
    testcase = ['Amy', 'Benson', 'Charlie'];
    app.people = testcase;
    assert(app.people.includes(app.selectNextPerson()));
    // Mock Implementation: call the selected person for five times
    const proxy = t.mock.method(app, "getRandomPerson", ()=>app.selected[0], { times: 5 });
    assert(app.people.includes(app.selectNextPerson()));
    assert.strictEqual(proxy.mock.calls.length, 5);
    for (let i = 0; i < 5; i++) {
        assert.strictEqual(proxy.mock.calls[i].result, app.selected[0]);
    }
    // All the people are selected
    assert(app.people.includes(app.selectNextPerson()));
    assert.deepStrictEqual(app.people.toSorted(), app.selected.toSorted());
    assert.strictEqual(app.selectNextPerson(), null);
});

test("Test Application's notifySelected", (t) => {
    const app = new Application();
    // Stub
    testcase = ['Amy', 'Benson', 'Charlie'];
    app.people = testcase;
    app.selected = testcase;
    // Mock cross-platform API
    const ms_write = test.mock.method(app.mailSystem, "write");
    const ms_send = test.mock.method(app.mailSystem, "send");
    // Call tested function once and Examine info about function calls and data returned
    app.notifySelected(); 
    assert.strictEqual(ms_write.mock.calls.length, app.selected.length);
    assert.strictEqual(ms_send.mock.calls.length, app.selected.length);
    for (let i = 0; i < app.selected.length; i++) {
        assert.strictEqual(ms_write.mock.calls[i].result, 'Congrats, ' + app.selected[i] + '!');
        assert.strictEqual(ms_write.mock.calls[i].result, ms_send.mock.calls[i].arguments[1]);
        assert.strictEqual(ms_send.mock.calls[i].arguments[0], ms_send.mock.calls[i].arguments[0]);
    }
});