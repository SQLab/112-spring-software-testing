const test = require('node:test');
const assert = require('assert');
const fs = require('fs');
test.mock.method(fs, 'readFile', (a, b, callback) => callback(null, "Amy\nBenson\nCharlie"));
const { Application, MailSystem } = require('./main');

// Alternative of Stub: Write File
async function init_test(testcase) {
    if (!testcase instanceof Array) {
        return -1;
    }
    text = testcase.toString().replace(/,/g, "\n");
    await writeFile("name_list.txt", test, "utf-8");
    return 0;
}

// TODO: write your tests here
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
    // 2. Asume that Math.random() works, check if the function provide a valid output (spy?)
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
    // Stub?
    const app = new Application();
    const [people, selected] = await app.getNames();
    assert.deepStrictEqual(people, ['Amy', 'Benson', 'Charlie']);
    assert.deepStrictEqual(selected, []);
});

test("Test Application's getRandomPerson", (t) => {
    const app = new Application();
    testcase = ['Amy', 'Benson', 'Charlie'];
    app.people = testcase;// Stub
    // Spy on output
    t.mock.method(Math, "random", () => 0.3, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Amy");
    t.mock.method(Math, "random", () => 0.6, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Benson");
    t.mock.method(Math, "random", () => 0.9, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Charlie");
    t.mock.method(Math, "floor", (_) => 0, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Amy");
    t.mock.method(Math, "floor", (_) => 1, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Benson");
    t.mock.method(Math, "floor", (_) => 2, { times: 1 });
    assert.strictEqual(app.getRandomPerson(), "Charlie");
});

test("Test Application's selectNextPerson", (t) => {
    const app = new Application();
    testcase = ['Amy', 'Benson', 'Charlie'];
    app.people = testcase;// Stub
    assert(app.people.includes(app.selectNextPerson()));
    //app.getRandomPerson = t.mock.fn(app.getRandomPerson, ()=>app.selected[0], {times:2});
    const proxy = t.mock.method(app, "getRandomPerson", ()=>app.selected[0], { times: 5 });
    assert(app.people.includes(app.selectNextPerson()));
    assert.strictEqual(proxy.mock.calls.length, 5);// call the selected person for five times
    for (let i = 0; i < 5; i++) {
        assert.strictEqual(proxy.mock.calls[i].result, app.selected[0]);
    }
    assert(app.people.includes(app.selectNextPerson()));
    assert.deepStrictEqual(app.people.toSorted(), app.selected.toSorted());
    assert.strictEqual(app.selectNextPerson(), null);
});

test("Test Application's notifySelected", (t) => {
    // Mock cross-platform API
    // app.mailSystem.write = test.mock.fn(app.mailSystem.write);
    // app.mailSystem.send = test.mock.fn(app.mailSystem.send);
});