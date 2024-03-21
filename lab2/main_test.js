const { test, mock } = require("node:test");
const assert = require("assert");
const { Application, MailSystem } = require("./main");
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const MATH_RANDOM = Math.random;
const FILE_NAME = "name_list.txt";
const CONTENT = "name 0\nname 1\nname 2";

test("Test Mail's write", () => {
    const mailSystem = new MailSystem();
    assert.strictEqual(
        mailSystem.write("Pudding0803"),
        "Congrats, Pudding0803!"
    );
});

test("Test Mail's send", () => {
    const mailSystem = new MailSystem();
    Math.random = mock.fn(() => 0.6);
    assert.strictEqual(mailSystem.send("Pudding0803", "Hello, world!"), true);
    Math.random = mock.fn(() => 0.5);
    assert.strictEqual(mailSystem.send("Pudding0803", "Hello, world!"), false);
    Math.random = MATH_RANDOM;
});

test("Test Application's getNames", async () => {
    await writeFile(FILE_NAME, CONTENT, () => {});
    const app = new Application();
    assert.deepStrictEqual(
        await app.getNames(),
        [["name 0", "name 1", "name 2"], []]
    );
    fs.unlink(FILE_NAME, () => {});
});

test("Test Application's getRandomPerson", async () => {
    await writeFile(FILE_NAME, CONTENT, () => {});
    const app = new Application();
    await app.getNames();
    Math.random = mock.fn(() => 0);
    assert.strictEqual(app.getRandomPerson(), "name 0");
    Math.random = mock.fn(() => 0.99);
    assert.strictEqual(app.getRandomPerson(), "name 2");
    Math.random = MATH_RANDOM;
    fs.unlink(FILE_NAME, () => {});
});

test("Test Application's selectNextPerson", async () => {
    await writeFile(FILE_NAME, CONTENT, () => {});
    const app = new Application();
    await app.getNames();
    Math.random = mock.fn(() => 0);
    assert.strictEqual(app.selectNextPerson(), "name 0");
    Math.random = mock.fn(() => 0.4);
    assert.strictEqual(app.selectNextPerson(), "name 1");
    let r = 0;
    Math.random = mock.fn(() => r += 0.2);
    assert.strictEqual(app.selectNextPerson(), "name 2");
    Math.random = MATH_RANDOM;
    assert.strictEqual(app.selectNextPerson(), null);
    fs.unlink(FILE_NAME, () => {});
});

test("Test Application's notifySelected", async () => {
    await writeFile(FILE_NAME, CONTENT, () => {});
    const app = new Application();
    await app.getNames();
    app.mailSystem.write = mock.fn((name) => name);
    app.mailSystem.send = mock.fn((name, context) => true);
    app.selectNextPerson();
    app.selectNextPerson();
    app.notifySelected();
    assert.strictEqual(app.mailSystem.write.mock.calls.length, 2);
    assert.strictEqual(app.mailSystem.send.mock.calls.length, 2);
    Math.random = MATH_RANDOM;
    fs.unlink(FILE_NAME, () => {});
});
